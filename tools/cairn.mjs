#!/usr/bin/env node
/**
 * cairn — install, inspect, update and adopt Cairn in a repository.
 *
 *   npx cairn-protocol init   --target <dir> [--trunk main] [--remote origin]
 *                             [--namespace cairn] [--profile local|ci]
 *                             [--project-root project] [--docs-root docs]
 *                             [--source src,packages] [--transport pull-request|manual-git]
 *                             [--registration manual-git|pull-request] [--dry-run]
 *   npx cairn-protocol status [--target <dir>]
 *   npx cairn-protocol update [--target <dir>] [--dry-run] [--decline <path>] [--take <path>]
 *   npx cairn-protocol adopt  [--target <dir>] [--dry-run]
 *
 * `--transport` names the INTEGRATION transport alone; `init` declares
 * `transport.registration` from `REGISTRATION_TRANSPORT` unless
 * `--registration` names the other (ADR-024, ADR-032 d4).
 * `--decline` names a host file `update` must not write, now or later; `--take`
 * takes one back (ADR-033 d2).
 *
 * The npm name `cairn` belongs to another package, so the package is
 * `cairn-protocol` and its binary is `cairn`.
 *
 * THE KIT IS THIN. It installs the reference tools, the skills, the host
 * files — bootloader, configuration, binding, workflow, request template — and
 * the folder indexes the roles need, and nothing else. What that comes to is
 * measured and reported, never a target (ADR-022 d2). It does not copy the
 * specification: an adopter reads it at the release the kit was cut from, by
 * link, and every link the kit writes is pinned to that release's commit, so a
 * repository installed today still resolves to the text it was installed from.
 *
 * THREE CLASSES OF FILE, and the difference is the whole design (ADR-020):
 *
 *   PORTABLE  copied from this package — the tools and the skills. Never
 *             edited per host; an adopter who edits one is detectable through
 *             the lock manifest, and `update` leaves it alone.
 *   HOST      generated for this repository from the answers given here — the
 *             configuration, the bootloader, the binding, the workflow — and
 *             owned by the adopter thereafter. `update` migrates the
 *             configuration field by field and never rewrites the rest.
 *   GENERATED the live view, produced by its generator rather than shipped.
 *
 * `cairn.lock.json` records the release, the source commit and one digest per
 * kit file AS THE KIT WROTE IT, so `status` can tell a pristine file from an
 * edited one and `update` can rewrite the first and report the second.
 *
 * TRANSACTIONAL, stated precisely rather than sold as atomic: the complete file
 * set is resolved in memory, every conflict is detected before a single byte is
 * written, and a failure during writing removes what this run created. It does
 * not protect against a concurrent writer in the target.
 */

import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, posix, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

import { configErrors } from './cairn-config.mjs'

export const SOURCE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PACKAGE = JSON.parse(readFileSync(join(SOURCE_ROOT, 'package.json'), 'utf8'))

/** The protocol release this package carries, as the package's own version. */
export const PROTOCOL_RELEASE = PACKAGE.version

/** Where the specification is read from: the protocol's repository, at the
 *  commit this kit was cut from. */
export const REPOSITORY_URL = 'https://github.com/sinlalune/cairn'

/** Reference tools an installed repository runs. Their tests are deliberately
 *  NOT installed: they exercise this repository's fixtures, and shipping them
 *  would hand an adopter a failing suite on their first command. Nor is this
 *  command: it runs from the package, against the lock. */
export const REFERENCE_TOOLS = [
  'cairn-check.mjs',
  'cairn-config.mjs',
  'cairn-config.schema.json',
  'cairn-active.mjs',
  'cairn-audit.mjs',
  'cairn-postmortem.mjs'
]

/** The coding stance is Ponytail's: its two skills, fetched at \`init\` and
 *  \`update\` from the plugin's latest release and installed as kit files, the
 *  lock naming the version (ADR-036 d1). The plugin's other skills, hooks and
 *  server are the plugin's. */
export const PONYTAIL = {
  repo: 'DietrichGebert/ponytail',
  skills: [['ponytail', 'the coding stance'], ['ponytail-review', 'the review for over-engineering']]
}
const STANCE = PONYTAIL.skills.map(([name]) => name)

/** The procedures, as Agent Skills: copied whole, one folder per skill. */
export const SKILLS = 'skills'

/** Where Claude Code loads skills. Every skill is written there too, as a
 *  copy owned by the lock — a link is a second thing to digest and breaks on
 *  a Windows checkout — and Codex reads \`AGENTS.md\`, so it needs no second
 *  location (ADR-036 d2). */
export const HARNESS_SKILLS = '.claude/skills'

/** The one page an adopter finds by name at the root (ADR-013). A folder of
 *  its own, so the pointer is found by looking rather than by knowing. */
export const POINTER_PAGE = 'cairn/README.md'

/** What `init` declares for `transport.registration`: the one registration
 *  sequence `cairn-open` ships, the commit landing on the trunk directly, and
 *  it is that whichever transport integrates the candidate (ADR-024). A
 *  repository that declared the other value keeps it — see `optionsFromConfig`. */
export const REGISTRATION_TRANSPORT = 'manual-git'

/** Portable text the kit LINKS rather than copies. */
export const PORTABLE_DOCS = 'spec'

/** The commit this kit was cut from. A published package carries it in
 *  `tools/release.json`, stamped by `prepack`; the protocol's own repository
 *  reads its HEAD, but only when this directory IS that repository — asking
 *  Git from inside an adopter's `node_modules` walks up to the adopter's
 *  commit, and a link pinned there resolves to nothing. `unknown` otherwise,
 *  and `specUrl` says `main` for it, the moving trunk stated as such. */
export const RELEASE_FILE = join(SOURCE_ROOT, 'tools/release.json')

export function sourceCommit(root = SOURCE_ROOT) {
  const stamped = join(root, 'tools/release.json')
  if (existsSync(stamped)) {
    const release = JSON.parse(readFileSync(stamped, 'utf8'))
    if (/^[0-9a-f]{40,64}$/.test(release.commit ?? '')) return release.commit
  }
  try {
    const options = { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    const top = execFileSync('git', ['rev-parse', '--show-toplevel'], options).trim()
    if (resolve(top) !== resolve(root)) return 'unknown'
    return execFileSync('git', ['rev-parse', 'HEAD'], options).trim()
  } catch {
    return 'unknown'
  }
}

/** Written by `prepack`, so the tarball knows which commit it was cut from. */
export function stampRelease(root = SOURCE_ROOT) {
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
  const release = { release: PROTOCOL_RELEASE, commit, stampedAt: new Date().toISOString() }
  writeFileSync(join(root, 'tools/release.json'), `${JSON.stringify(release, null, 2)}\n`)
  return release
}

/** A file of the protocol's repository at the release's commit, or on the
 *  moving trunk, stated as such, when the commit is unknown. */
const atRelease = (commit, path) => `${REPOSITORY_URL}/blob/${commit && commit !== 'unknown' ? commit : 'main'}/${path}`

export function specUrl(commit) {
  return atRelease(commit, PORTABLE_DOCS)
}

/** What each release changed for an adopter, and which of their repairs it
 *  absorbed (ADR-039). */
const releaseNotes = (commit) => atRelease(commit, 'CHANGELOG.md')

/** A portable file links the specification relatively in the protocol's own
 *  repository, where the `links` rule can check it; installed, it links the
 *  specification at the pinned commit. Only links into `spec/` are rewritten. */
export function pinSpecLinks(text, commit) {
  return String(text).replace(/\]\((?:\.\.\/)+spec\//g, `](${specUrl(commit)}/`)
}

export function digest(content) {
  return createHash('sha256').update(content).digest('hex')
}

/** Ponytail's two skills at the plugin's latest release, or why they were not
 *  read — an error is an answer, never an exception. \`CAIRN_PONYTAIL\` names a
 *  local copy of the plugin's repository to read instead, its version its
 *  \`package.json\`'s: an offline mirror, and how the suite runs with no
 *  network. */
export async function readPonytail({ source = process.env.CAIRN_PONYTAIL, request = fetch } = {}) {
  try {
    if (source) {
      const version = `v${JSON.parse(readFileSync(join(source, 'package.json'), 'utf8')).version}`
      return { version, files: new Map(STANCE.map((name) => [name, readFileSync(join(source, SKILLS, name, 'SKILL.md'))])) }
    }
    const get = async (url) => {
      const response = await request(url, { signal: AbortSignal.timeout(5000), headers: { 'user-agent': 'cairn' } })
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`)
      return response
    }
    const { tag_name: version } = await (await get(`https://api.github.com/repos/${PONYTAIL.repo}/releases/latest`)).json()
    if (!version) throw new Error('the latest release names no tag')
    const files = new Map()
    for (const name of STANCE) {
      files.set(name, Buffer.from(await (await get(`https://raw.githubusercontent.com/${PONYTAIL.repo}/${version}/${SKILLS}/${name}/SKILL.md`)).arrayBuffer()))
    }
    return { version, files }
  } catch (error) {
    return { error: error?.name === 'TimeoutError' ? 'no answer in 5000ms' : String(error?.message ?? error) }
  }
}

/** The stance the repository already has, for a command that did not read
 *  Ponytail: \`status\`, which asks no network, and a fetch that failed, which
 *  keeps what is there rather than delete it. Only what the lock owns is
 *  kept, each copy — under \`skills/\` and the harness's — at its bytes on
 *  disk and its digest in the lock, so an edit still reads as an edit and a
 *  copy installed by hand is never claimed. */
export function keptPonytail(target) {
  const lock = readLock(target)
  const files = new Map()
  const harness = new Map()
  const recorded = {}
  for (const name of STANCE) {
    for (const [root, into] of [[SKILLS, files], [HARNESS_SKILLS, harness]]) {
      const path = `${root}/${name}/SKILL.md`
      if (!lock?.manifest[path] || !existsSync(join(target, path))) continue
      into.set(name, readFileSync(join(target, path)))
      recorded[path] = lock.manifest[path]
    }
  }
  return { version: files.size + harness.size > 0 ? lock.ponytail?.version ?? null : null, read: false, files, harness, recorded }
}

function walk(root, base = root, out = []) {
  for (const entry of readdirSync(root)) {
    const absolute = join(root, entry)
    if (statSync(absolute).isDirectory()) walk(absolute, base, out)
    else out.push(relative(base, absolute).split(sep).join('/'))
  }
  return out
}

export function defaultOptions() {
  return {
    trunk: 'main',
    remote: 'origin',
    namespace: 'cairn',
    profile: 'local',
    projectRoot: 'project',
    docsRoot: 'docs',
    sourceRoots: ['src'],
    // The INTEGRATION transport, and the pull request is its default: a review
    // that is recorded, a required check on the exact commit that lands, and a
    // merge that is the same object CI tested are native there. `manual-git` is
    // the fallback for a repository with no forge.
    transport: 'pull-request'
  }
}

/** The options an installed repository's configuration answers, so `status`,
 *  `update` and `adopt` plan against the host's own names. */
export function optionsFromConfig(config) {
  return {
    trunk: config.trunk,
    remote: config.remote,
    namespace: config.metadataNamespace,
    profile: config.enforcementProfile,
    projectRoot: config.roots.project,
    docsRoot: config.roots.documentation,
    sourceRoots: [...config.roots.source],
    transport: config.transport?.integration ?? 'pull-request',
    registrationTransport: config.transport?.registration ?? REGISTRATION_TRANSPORT,
    architectureRoot: config.roots.architecture,
    decisionsRoot: config.roots.decisions,
    modulesRoot: config.roots.modules,
    conceptsRoot: config.roots.concepts
  }
}

export function buildConfig(options) {
  const roots = rootsOf(options)
  return {
    $schema: './tools/cairn-config.schema.json',
    version: 2,
    trunk: options.trunk,
    remote: options.remote,
    metadataNamespace: options.namespace,
    enforcementProfile: options.profile,
    roots: {
      documentation: options.docsRoot,
      project: options.projectRoot,
      architecture: roots.architecture,
      decisions: roots.decisions,
      modules: roots.modules,
      // The adopter's OWN wiki — the project scope of chapter 6. The
      // protocol's wiki is read at the release, never written into.
      concepts: roots.concepts,
      source: options.sourceRoots
    },
    areas: [
      {
        name: 'application',
        match: options.sourceRoots.map((root) => `${root}/**`),
        note: `${roots.modules}/application.md`
      }
    ],
    defaultRoute: 'lightweight',
    checkpointRetentionRef: null,
    pathHistoryPolicy: 'forbidden',
    scopeDigestAlgorithm: 'sha256',
    // `pull-request` stays a value the field accepts, so a repository that
    // declared it keeps it: `update` and `adopt` plan from its own answers.
    transport: { registration: options.registrationTransport ?? REGISTRATION_TRANSPORT, integration: options.transport },
    migration: { unregisteredPaths: [], undeclaredOpenings: [], v02Records: [] }
  }
}

/** A schema-1 configuration, field by field, into schema 2. Roots, areas,
 *  the trunk, the remote and the namespace are the host's answers and are
 *  kept; the two fields whose rules were retired go; an adapter name outside
 *  the vocabulary becomes `manual-git`, the transport it described. Pure, so
 *  the migration has a test that is not a repository. */
export function migrateConfig(config) {
  const { sharedFiles: _shared, staleAfterDays: _stale, ...rest } = config
  const transportOf = (name) => (['pull-request', 'manual-git'].includes(name) ? name : 'manual-git')
  return {
    ...rest,
    $schema: './tools/cairn-config.schema.json',
    version: 2,
    transport: {
      registration: transportOf(config.transport?.registration),
      integration: transportOf(config.transport?.integration)
    },
    migration: {
      unregisteredPaths: config.migration?.unregisteredPaths ?? [],
      undeclaredOpenings: config.migration?.undeclaredOpenings ?? [],
      v02Records: config.migration?.v02Records ?? []
    }
  }
}

/** The role roots: each the one the configuration declares, derived under the
 *  documentation root only where none is (ADR-033 d1). A host may bind any of
 *  them outside that plane — this repository binds its wiki at `spec/concepts`. */
const rootsOf = (options) => ({
  architecture: options.architectureRoot ?? `${options.docsRoot}/architecture`,
  decisions: options.decisionsRoot ?? `${options.docsRoot}/adr`,
  modules: options.modulesRoot ?? `${options.docsRoot}/modules`,
  concepts: options.conceptsRoot ?? `${options.docsRoot}/concepts`
})

/** The day this release was cut: the stamp's, else the source commit's. Every
 *  generated page carries it, so two plans of one release are byte-equal on
 *  any two days and the lock does not churn on the clock (ADR-034 d2). */
export function releaseDay(root = SOURCE_ROOT) {
  const stamped = join(root, 'tools/release.json')
  if (existsSync(stamped)) {
    const { stampedAt } = JSON.parse(readFileSync(stamped, 'utf8'))
    if (stampedAt) return stampedAt.slice(0, 10)
  }
  try {
    return execFileSync('git', ['show', '-s', '--format=%cs', sourceCommit(root)],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    // ponytail: a package with neither a stamp nor its own Git stamps today; `prepack` always stamps.
    return new Date().toISOString().slice(0, 10)
  }
}

let day = null

const front = (type, title, description, tags) =>
  `---\ntype: ${type}\ntitle: ${title}\ndescription: ${description}\ntags: [${tags.join(', ')}]\ntimestamp: ${(day ??= releaseDay())}T00:00:00Z\n---\n`

function folderIndex(title, purpose, extra = '') {
  return front('Cairn Folder Index', title, purpose, ['index', 'cairn']) + `\n# ${title}\n\n${purpose}\n${extra}`
}

export function bootloader(options, commit) {
  const spec = specUrl(commit)
  return `# AGENTS.md — repository bootloader

This file points; it does not carry project memory.

## Start here, in order

1. [The path convention](${spec}/reference/paths.md) — PORTABLE:
   registration, one writer per worktree, checkpoints, closure.
2. \`${options.projectRoot}/coding-paths/binding.md\` — this repository's
   BINDING: exact roots, commands, branch and remote.
3. [The execution protocol](${spec}/reference/execution-protocol.md) —
   the portable per-session order.
4. \`${options.projectRoot}/coding-paths/ACTIVE.md\` — what is running now. It is
   generated; never hand-edit it.
5. \`${SKILLS}/\` — the procedures as Agent Skills: \`cairn-brainstorm\`,
   \`cairn-open\`, \`cairn-unit\`, \`cairn-close\`, \`cairn-update\`,
   \`cairn-learn\`, and the \`cairn-code\` stance.
6. \`${POINTER_PAGE}\` — which release is installed, the six chapters and the
   skills linked at its commit, and every file the kit owns. Generated.

The [specification](${spec}/index.md) is read at the release this repository
installed, release ${PROTOCOL_RELEASE}; \`npx cairn-protocol status\` says whether a
newer one exists and what \`update\` would touch.

## The mechanical contract

The exit code is the verdict. Never pipe a gate through another command — a
pipeline reports the LAST command's status, so \`gate | tail && commit\` commits
after a failure.

\`\`\`bash
npm run cairn-check     # the blocking and advisory rules, in full
npm run cairn-active    # regenerate the running-paths view
npm run cairn-audit     # the closing review: the request's description to paste, or the closing record on manual-git
\`\`\`

## Absolute rules

- No implementation work outside an accepted coding path.
- A path branch is \`path/<lowercase-id>\`, in its own worktree, with ONE writer.
- Every executed step updates code, tests, docs and the path's own record in the
  same work unit, and is pushed immediately.
- **A published path branch is never rewritten** — no rebase, amend,
  \`reset --soft\` fold or force-push. Reach a current base by merging
  \`${options.trunk}\` in. This repository declares
  \`pathHistoryPolicy: forbidden\`.
- Progress persists in files, never in a conversation.
- An abstraction explained persists as a concept note, in the folder its scope
  names, linked from where the explanation was needed.
- An explanation is written for the reader who is learning it — the plain
  meaning first, the failure it prevents, the shortest example — and stops
  there.
`
}

export function hostBinding(options, commit) {
  const { architecture, decisions, modules, concepts } = rootsOf(options)
  return front('Cairn Binding', 'Host binding', 'How portable Cairn roles map onto this repository.', ['cairn', 'binding']) +
    `\n# Host binding

This page is classified **BINDING**. It names this repository and MAY carry local
paths, command names and runtime details. Portable protocol text never does.

| Portable role | This repository |
| :-- | :-- |
| documentation plane | \`${options.docsRoot}/\` |
| execution-state plane | \`${options.projectRoot}/\` |
| path records and live view | \`${options.projectRoot}/coding-paths/\` |
| accepted architecture | \`${architecture}/\` |
| decisions | \`${decisions}/\` |
| implemented-area notes | \`${modules}/\` |
| concept wiki | \`${concepts}/\` |
| source roots | ${options.sourceRoots.map((r) => `\`${r}/\``).join(', ')} |
| trunk | \`${options.trunk}\` |
| remote | \`${options.remote}\` |
| metadata namespace | \`${options.namespace}\` |
| enforcement profile | \`${options.profile}\` |
| registration transport | \`${options.registrationTransport ?? REGISTRATION_TRANSPORT}\` |
| integration transport | \`${options.transport}\` |
| path-history policy | **forbidden** — a published branch is never rewritten |
| path branch | \`path/<lowercase-path-id>\` |

The machine-readable authority is \`cairn.config.json\`, validated by
\`tools/cairn-config.mjs\` before any repository rule runs. If this table and that
file disagree, that is a binding defect — and neither is permission to write a
name from this repository into portable protocol text.

## Where the concept wiki starts

This repository's own vocabulary goes in \`${concepts}/\`, one article per term,
following [the one-concept template](${specUrl(commit)}/concepts/concept-template.md).
The protocol's wiki is read at the release, never written into.

## Reaching a current base

\`\`\`bash
git fetch ${options.remote} ${options.trunk}
git merge ${options.remote}/${options.trunk}
\`\`\`

Do not rebase. Nothing published on a path branch is rewritten here.
`
}

export function moduleNote(options) {
  return front('Cairn Module Note', 'Application', 'The one implemented area a new repository starts with: what lives under its source roots, its boundaries, and how it is tested.', ['module', 'cairn']) +
    `\n# Application

The configuration binds ${options.sourceRoots.map((r) => `\`${r}/\``).join(', ')} to this note. Every
implementation unit that changes source there refreshes it in the same unit:
what the area does, where its boundaries are, and which tests prove it.

This note describes the area **as it is now**, and nothing else. A unit that
changes the area rewrites the sentences that stopped being true and adds none
about itself: no dated paragraphs, no record of what changed. What a path did
belongs to the journal, one entry per integration.

## Flow

State the main flow in a paragraph, once the first unit lands.

## Boundaries

What this area owns, and what it deliberately does not.

## Tests

How the area is proved: the command, and what green means.
`
}

/** The concept root is three folders, one per scope, each with its own index
 *  (ADR-011 decision 2). The scope decides which folder a note is written in;
 *  the shape of a note is the same in all three. */
const CONCEPT_SCOPES = [
  ['cairn', 'Cairn terms, for this project\'s reader',
    'What a word of the protocol means here: the plain meaning first, then what this repository actually does with it. Link the protocol\'s own article for the full definition rather than restating it. Written when someone asks what a Cairn term means.'],
  ['product', 'This product\'s own words',
    'The vocabulary this product\'s architecture uses — the domain ideas its own code and pages name. Written when a path or a session names a domain idea that carries complexity.'],
  ['learning', 'Knowledge from outside',
    'Anything that is nobody\'s domain — a language, a protocol, a piece of hardware, a model. Written when a session explains an abstraction the reader needed. A learning note lives here too: it is a concept note with an order, its body a sequence the reader follows, written by `cairn-learn` for what someone set out to learn.']
]

export function conceptIndex(commit, [name, title, purpose]) {
  return front('Cairn Folder Index', title, purpose, ['index', 'cairn', 'concepts', name]) +
    `\n# ${title}

${purpose}

One specialised idea per page, from
[the one-concept template](${specUrl(commit)}/concepts/concept-template.md):
the plain definition first, the failure the concept prevents, how it is checked
or the honest sentence that nothing checks it. A concept no page outside the
concept root links is an orphan and blocks the gate — the root is read through
all three of its folders.
`
}

/** The map a reader meets first: where each kind of page lives, and what the
 *  pages the kit does NOT install are for. */
export function documentationIndex(options) {
  const { architecture, decisions, modules, concepts } = rootsOf(options)
  const to = (path) => {
    const rel = relative(options.docsRoot, path).split(sep).join('/')
    return rel.startsWith('.') ? rel : `./${rel}`
  }
  const scopeRows = CONCEPT_SCOPES
    .map(([name, title]) => `| [\`${concepts}/${name}\`](${to(`${concepts}/${name}/index.md`)}) | ${title} |`)
    .join('\n')
  return front('Cairn Folder Index', 'Documentation plane', 'Durable knowledge: what the product is, how it is built, what was decided, and what its words mean.', ['index', 'cairn']) +
    `\n# Documentation plane

Durable knowledge. What is being done right now lives in \`${options.projectRoot}/\`,
not here.

| Where | What |
| :-- | :-- |
| [\`${options.docsRoot}/inputs/\`](./inputs/index.md) | documents this project had before the protocol, any format, unedited |
| \`${options.docsRoot}/<surface>.md\` | one page per product surface, at this root |
| [\`${architecture}/\`](${to(`${architecture}/index.md`)}) | accepted architecture, one page per feature, interface, contract or flow |
| \`${decisions}/\` | one record per decision, numbered from ADR-001 with no gaps |
| [\`${modules}/\`](${to(`${modules}/index.md`)}) | one note per implemented area, as the area is now |
${scopeRows}

## The page a newcomer reads first

A surface is what a user meets — a screen, a command, an API, a document set.
There is one page at this root per surface, as they are written, at
\`${options.docsRoot}/<surface>.md\`. It **opens with one worked example**: a user
doing the one thing the surface is for, start to finish, before any
explanation. Then it says what the surface does and how to use it, in plain
words.

It links the concept notes as its glossary instead of redefining the words, and
links the architecture page that governs the surface — nothing more technical
than that. Where the surface is an API, it links that API's documentation,
written and kept current where the language's ecosystem expects it; Cairn names
no API page and installs none.

A promotion unit that changes what a surface does writes that surface's page in
the same unit, and adds its line to the README, where the repository has one.
One that changes no surface leaves the pages alone and says so.
`
}

/** The six chapters, in the order the specification gives them. They are six
 *  headings of ONE page, so each needs its own anchor: linking them all at
 *  `spec/index.md` gives a reader six labels over one destination, which is
 *  what the owner's try of 2026-09-15 found. The anchor is the heading
 *  slugged as the forge slugs it — lowercased, punctuation dropped, spaces
 *  hyphenated — and `anchorOf` derives it from the title rather than
 *  repeating it, so a chapter renamed here cannot keep a stale anchor. */
const SPEC_CHAPTERS = [
  ['1. Idea and ideation', 'where an idea is captured and turned into something a session can read'],
  ['2. Research', 'what is read before a decision, and where the notes land'],
  ['3. Vision and specifications', 'what the product is, and the pages a promotion writes'],
  ['4. Roadmap', 'the register of milestones, each with a coding path or none yet'],
  ['5. Coding cycle', 'how a path opens, runs unit by unit, and closes'],
  ['6. Learning loop', 'the concept wiki, learning notes, and what a cycle leaves behind']
]

const anchorOf = (title) => title.toLowerCase().replace(/[^a-z0-9 -]/g, '').trim().replace(/ +/g, '-')

const SKILL_LINES = [
  ['cairn-brainstorm', 'an idea arrives and is worked into a note'],
  ['cairn-open', 'a path is scoped, accepted and registered'],
  ['cairn-unit', 'one work unit: plan, change, self-review, review, verify, push'],
  ['cairn-close', 'a candidate is proposed, reviewed and integrated'],
  ['cairn-update', 'the kit is brought to a newer release, as a path'],
  ['cairn-learn', 'a learning session, ending in a note with an order'],
  ['cairn-code', 'the stance the change movement is written with']
]

/** The page an adopter finds by name at the root: which release this is, what
 *  to read, and what the kit owns. Nothing on it is written by hand (ADR-013).
 *  `edited` is the list the last `update` could not rewrite (ADR-015 d2); it
 *  is empty at `init` and until an update finds one. */
export function pointerPage(commit, { paths, edited = [], declined = [], ponytail = null }) {
  const spec = specUrl(commit)
  const chapters = SPEC_CHAPTERS
    .map(([title, purpose]) => `- [${title}](${spec}/index.md#${anchorOf(title)}) — ${purpose}`).join('\n')
  const stance = PONYTAIL.skills.filter(([name]) => ponytail?.files.has(name))
    .map(([name, what]) => [name, `${what}, Ponytail's, at ${ponytail.version}`])
  const skills = [...SKILL_LINES, ...stance]
    .map(([name, when]) => `- [\`${name}\`](../${SKILLS}/${name}/SKILL.md) — ${when}`).join('\n')
  const bullets = (list, none) => (list.length === 0 ? none : [...list].sort().map((path) => `- \`${path}\``).join('\n'))
  const owned = bullets(paths, '')
  const refused = bullets(declined, 'None.')
  const reconcile = bullets(edited, 'Nothing. The last update rewrote every file it owns.')
  return front('Cairn Pointer', 'Cairn here', `Release ${PROTOCOL_RELEASE} of the Cairn protocol, installed in this repository: what to read, and what the kit owns.`, ['cairn', 'pointer', 'generated']) +
    `\n# Cairn here

Cairn is the most lightweight and minimalistic harness-agnostic,
document-driven coding protocol.

This repository carries **release ${PROTOCOL_RELEASE}**, cut from commit
\`${commit}\`. Every link below resolves to the specification at that commit,
so what you read is what you installed. What each release changes for an
adopter, and which adopter repairs it absorbed, is in
[the release notes](${releaseNotes(commit)}).

This page is GENERATED, at \`init\` and at every \`update\`. Nothing on it is
written by hand.

## The specification, in six chapters

${chapters}

## The skills

${skills}

## What the kit owns

\`update\` rewrites any of these that still holds exactly what the kit wrote,
and never rewrites one you have edited. \`npx cairn-protocol status\` says
which is which, and \`update --take <path>\` takes the release's version of one
you name.

${owned}

## Declined

Files this repository declined with \`update --decline <path>\`. The kit does not
write them, now or at a later update; \`update --take <path>\` takes one back.

${refused}

## To reconcile by hand

Files you edited whose template this release changed. \`update\` left them
alone and printed the difference; this list stands until an update finds it
empty.

${reconcile}
`
}

export function inputsIndex() {
  return front('Cairn Folder Index', 'Inputs', 'Documents this project had before the protocol, any format, kept as they came.', ['index', 'cairn', 'inputs']) +
    `\n# Inputs

What existed before Cairn did: notes, sketches, exports, specifications
written elsewhere, in any format. They are kept **as they came** and never
edited into protocol shape — an input rewritten is an input you can no longer
check the protocol's output against.

The first ideation session of a project starts by reading this folder, and a
brainstorm note that draws on an input names it.
`
}

export function architectureIndex() {
  return front('Cairn Folder Index', 'Architecture', 'Accepted architecture: one page per feature, interface, contract or flow, each with its dependency sentence and its diagram.', ['index', 'cairn', 'architecture']) +
    `\n# Architecture

One page per thing the architecture decides — a feature, an interface, a
contract, or a **flow**: how one thing moves end to end through the components
the other pages name, from what starts it to what it leaves behind. Flow pages
live here with the rest and have no folder of their own; a flow inside a single
folder is that folder's module note's business, not a page.

A page that names components states **in one sentence** which way dependencies
point between them — a sentence a reader can check against an import line — and
carries **one Mermaid diagram** saying the same thing. The reader checks
whichever of the two they can read, so the two must agree.

Promotion units write these pages.
`
}

function feedbacksIndex() {
  return folderIndex('Feedbacks', 'What a writer met when the gate stayed green and the protocol still cost more than it should, one note per occasion.', `
Each observation names the movement it happened in, what it cost, and the
change that would remove it. A note is evidence for a change, never authority
for one. Each carries \`type: Cairn Feedback\`.

A note about how this repository runs the protocol — its own conventions, its
harness — stays here. A note about Cairn itself travels: it reaches
[the protocol's \`feedbacks/\`](${REPOSITORY_URL}/tree/main/feedbacks) as a pull
request against that repository, or the owner carries it there. A defect of
the harness goes to its vendor, not here.
`)
}

function backlogIndex() {
  return folderIndex('Backlog', 'Deferred work: one file per item a path deferred, until a path takes it.', `
One file per deferred item, named as a journal entry is, the date first,
saying what the item is, which path deferred it and where — the unit or the candidate — who
owns it, and the shape of the work it wants: a decision unit, a promotion, a
coding path.

A \`deferred\` disposition, in a step's review section or in a closing review,
names the file. An advisory that fires at every run on the same fact is
deferred here once, rather than accepted again at every closing.

A path that takes an item names it in its goal and declares the file in
\`writes:\`; its last unit deletes the file. No rule reads this folder.
`)
}

export function registerIndex() {
  return folderIndex('Coding paths', 'One folder per bounded change, the generated live view, and the roadmap register.', `
## Roadmap

Every milestone is accounted for: it has a path, or it says it does not yet.

| Milestone | Outcome | Paths | State |
| :-- | :-- | :-- | :-- |
| M1 — the first milestone | what the product can do when it is reached | *no path yet* | planned |
`)
}

export function workflow(options) {
  return `# Cairn protocol gate. Installed ADAPTER, not portable protocol.
name: cairn
on:
  pull_request:
  push:
    # The trunk alone. Two runs on one commit can disagree and only the
    # request's is the merge gate, so a unit on a path branch is judged by the
    # writer's bare gate and by the request's run once one is open — as a draft
    # from the first unit, for a writer who wants the forge on every one
    # (ADR-005).
    branches: [${options.trunk}]
jobs:
  protocol:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      # The red-run reading asks the forge how many runs of this branch went
      # red, which is \`actions: read\`. An explicit block sets every scope it
      # does not name to \`none\`, so leaving this out would refuse exactly the
      # reading the post-mortem step exists to write.
      actions: read
      # The request reading and the one comment. Nothing here writes to the
      # REPOSITORY: a branch has one writer, and it is the writer of the path,
      # never this job. On a request from a fork the token is read-only
      # whatever this block says, so \`gh pr comment\` ends the step with a 403
      # instead of posting — the reading is still printed into the log.
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          # The gate must judge the branch that will land, so it needs history
          # rather than a shallow single commit.
          fetch-depth: 0
          ref: \${{ github.event.pull_request.head.sha }}
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      # Bare. A pipe would report the LAST command's exit code, which is how a
      # gate comes to pass over its own failure.
      #
      # No test step: the kit installs no suite and names none, and your own
      # \`npm test\` is yours to add here if you keep one (ADR-014 decision 2).
      - name: cairn-check
        id: cairn-check
        env:
          # The base must span what the run judges. On a request that is the
          # target branch. On a push to the TRUNK it is the commit the push
          # replaced, because the trunk's own remote ref after that push
          # already names the pushed commit, and comparing it with itself is
          # how an integrating unit reaches zero changed files under a green
          # run. On a push to a PATH branch it is the trunk: comparing a branch
          # push with the push before it judges each unit against the last
          # instead of against what it will merge into.
          CAIRN_BASE_REF: \${{ github.base_ref && format('origin/{0}', github.base_ref) || (github.ref_name == '${options.trunk}' && github.event.before || 'origin/${options.trunk}') }}
        run: node tools/cairn-check.mjs --base "$CAIRN_BASE_REF"
      # Only on the CHECKER's failure, so the incident is written while it
      # happens (ADR-014 decision 1). It prints, and commits nothing: a branch
      # has one writer, and the writer copies the reading into a learning note
      # when the incident deserves one.
      - name: cairn-postmortem
        if: failure() && steps.cairn-check.conclusion == 'failure'
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          CAIRN_BRANCH: \${{ github.head_ref || github.ref_name }}
          CAIRN_REQUEST: \${{ github.event.pull_request.number }}
        run: |
          # The shell is \`bash -e\`, so a non-zero exit would abort the step
          # before the reading is printed or posted, losing it on the one run
          # it was written for. stderr is captured with it: where the tool
          # stops, the reason it gives is written there.
          node tools/cairn-postmortem.mjs --branch "$CAIRN_BRANCH" > postmortem.txt 2>&1 || true
          cat postmortem.txt
          if [ -n "$CAIRN_REQUEST" ]; then
            gh pr comment "$CAIRN_REQUEST" --body-file postmortem.txt
          fi
`
}

/** The request template a forge fills into every pull request: the closing
 *  review's shape, so the description is the record from the first draft. */
export function requestTemplate() {
  return `<!-- Cairn closing review. On pull-request transport this description IS the
coherence review of one exact candidate and the approval IS the closing
acceptance. \`npm run cairn-audit\` prints this whole shape filled in for the
current candidate, the items below read from the record; every \`<blank>\` is
yours. The checker proves the candidate, its closure surface, the opening
digest and the trunk drift from Git; it reads none of the text below, which is
what the approver reads.

The blanks are backticked because a bare \`<unit>\` matches an HTML open tag and
the forge strips it when it renders — leaving a blank that reads as answered. -->

## What this path did

- \`<what the path did>\`
- \`<why it is the least>\`
- \`<what it does not do>\`

Surface: \`<the page a newcomer reads for the surface this path changed, or the README section>\`

## Definition of done, item by item

- item 1 — \`<the item, as cairn-audit leads it from the record>\` — advanced by \`<unit>\` — shown by \`<command or page>\`

## Candidate

- path: \`<CP-ID>\`
- candidate \`C\`: \`<full object id>\`
- base \`T\`, the trunk tip merged into the candidate: \`<full object id>\`
- scope digest at \`C\`: \`<the digest cairn-check --scope-digest printed for this record>\`; equals the opening acceptance: yes | no

## Coherence

Read by \`<a fresh context, and which kind | the writer, with the reason no reader was obtainable and how long was waited>\`.

- [ ] Does the diff contradict an accepted decision?
- [ ] Does it duplicate something another running path is building?
- [ ] Did it introduce architecture that belongs in a decision record and has none?
- [ ] Is anything now documented in two places that will drift apart?

## Advisories at \`C\`

Every advisory \`cairn-check\` raised at the candidate, each fixed, accepted, or
deferred to a named owner and follow-up; or *none*.

## Roles

- reviewer: \`<who approves>\`, holding the roles \`<initiator | writer | reviewer | integrator>\` on this path
`
}

/** Refuse to install a corpus that only resolves where it came from.
 *
 *  Written because the first end-to-end run of the 0.2 installer produced a
 *  repository whose FIRST gate failed with seventeen broken links. Every
 *  relative link a kit file carries must land on another kit file; anything
 *  else is a URL, pinned. */
export function outwardLinks(files) {
  const offenders = []
  for (const [path, content] of files) {
    if (!path.endsWith('.md')) continue
    for (const { target, resolved } of relativeLinks(path, content)) {
      if (!files.has(resolved)) offenders.push(`${path} -> ${target}`)
    }
  }
  return offenders
}

/** Every relative link of a Markdown file, code stripped, with the
 *  repository path it resolves to — read as the checker's \`links\` rule
 *  reads one: a target starting with a dot, up to whitespace or an anchor,
 *  backslashes dropped. */
function relativeLinks(path, content) {
  const dir = path.split('/').slice(0, -1)
  const text = content.toString('utf8').replace(/^(`{3,})[\s\S]*?^\1`*$/gm, '').replace(/`[^`\n]*`/g, '')
  const links = []
  for (const match of text.matchAll(/\[[^\]]*\]\((\.[^)#\s]+)(?:#[^)\s]*)?\)/g)) {
    const target = match[1].replace(/\\/g, '')
    const parts = [...dir]
    for (const segment of target.split('/')) {
      if (segment === '.' || segment === '') continue
      if (segment === '..') parts.pop()
      else parts.push(segment)
    }
    links.push({ target, resolved: parts.join('/') })
  }
  return links
}

/** Resolve the complete kit in memory. Nothing touches the target here — a
 *  plan that cannot be built completely is never partially applied.
 *
 *  `files` is what the kit writes; `host` names the entries that are the
 *  adopter's from day one, which `update` and `adopt` never overwrite. */
export function planInstall(options = defaultOptions(), sourceRoot = SOURCE_ROOT,
  ponytail = { version: null, read: false, files: new Map() }) {
  const files = new Map()
  const host = new Set()
  const put = (path, content, owner = 'portable') => {
    if (files.has(path)) throw new Error(`cairn: duplicate planned file ${path}`)
    files.set(path, typeof content === 'string' ? Buffer.from(content, 'utf8') : content)
    if (owner === 'host') host.add(path)
  }
  const commit = sourceCommit(sourceRoot)

  const config = buildConfig(options)
  const errors = configErrors(config)
  if (errors.length) {
    throw new Error(`cairn: generated configuration is invalid — ${errors.join('; ')}`)
  }

  put('cairn.config.json', `${JSON.stringify(config, null, 2)}\n`, 'host')
  put('AGENTS.md', bootloader(options, commit), 'host')
  put('package.json', `${JSON.stringify({
    name: 'cairn-repository',
    private: true,
    type: 'module',
    scripts: {
      'cairn-check': 'node tools/cairn-check.mjs',
      'cairn-active': 'node tools/cairn-active.mjs',
      'cairn-audit': 'node tools/cairn-audit.mjs',
      'cairn-postmortem': 'node tools/cairn-postmortem.mjs'
    }
  }, null, 2)}\n`, 'host')

  for (const tool of REFERENCE_TOOLS) {
    const absolute = join(sourceRoot, 'tools', tool)
    if (!existsSync(absolute)) throw new Error(`cairn: missing reference tool ${tool}`)
    put(`tools/${tool}`, readFileSync(absolute))
  }
  const skillsRoot = join(sourceRoot, SKILLS)
  if (!existsSync(skillsRoot)) throw new Error(`cairn: missing skills at ${SKILLS}`)
  // The stance is fetched, never copied from this package's tree — which, in
  // the protocol's own repository, is an installation that holds a copy.
  for (const relativePath of walk(skillsRoot).filter((path) => !STANCE.includes(path.split('/')[0]))) {
    const text = readFileSync(join(skillsRoot, relativePath))
    put(`${SKILLS}/${relativePath}`, relativePath.endsWith('.md') ? pinSpecLinks(text.toString('utf8'), commit) : text)
  }
  for (const [name, content] of ponytail.files) put(`${SKILLS}/${name}/SKILL.md`, content)
  for (const [path, content] of [...files].filter(([path]) => path.startsWith(`${SKILLS}/`))) {
    const rest = path.slice(SKILLS.length + 1)
    if (!STANCE.includes(rest.split('/')[0])) put(`${HARNESS_SKILLS}/${rest}`, content)
  }
  // The stance's harness copy follows the fetched skill, or — not read — is
  // kept on its own, whether or not its \`skills/\` twin is still there.
  for (const name of STANCE) {
    const copy = ponytail.harness ? ponytail.harness.get(name) : ponytail.files.get(name)
    if (copy) put(`${HARNESS_SKILLS}/${name}/SKILL.md`, copy)
  }

  put(`${options.projectRoot}/coding-paths/binding.md`, hostBinding(options, commit), 'host')
  put(`${options.projectRoot}/backlog/index.md`, backlogIndex(), 'host')
  put('feedbacks/index.md', feedbacksIndex(), 'host')
  put(`${options.projectRoot}/coding-paths/index.md`, registerIndex(), 'host')
  put(`${options.projectRoot}/index.md`, folderIndex('Project plane',
    'Durable execution state: one folder per coding path under `coding-paths/`, and the journal of integrated outcomes under `log/`.'), 'host')
  // A placeholder the generator overwrites at once: shipping the file it would
  // produce, by hand, is what failed `derived-view` on the first 0.2 install.
  put(`${options.projectRoot}/coding-paths/ACTIVE.md`,
    front('Cairn Generated View', 'Running paths', 'Generated live view of running coding paths.', ['cairn', 'generated', 'index']) +
    '\n# Running paths\n\nThis file is GENERATED by `npm run cairn-active`. Never hand-edit it.\n\n' +
    '<!-- cairn:paths:begin -->\n<!-- cairn:paths:end -->\n', 'generated')

  put(`${options.docsRoot}/index.md`, documentationIndex(options), 'host')
  put(`${options.docsRoot}/inputs/index.md`, inputsIndex(), 'host')
  const roots = rootsOf(options)
  put(`${roots.architecture}/index.md`, architectureIndex(), 'host')
  put(`${roots.modules}/index.md`, folderIndex('Module notes', 'One note per implemented area: flow, boundaries and tests, as the area is now.'), 'host')
  // The one area the generated configuration names must exist, or the first
  // implementation unit is asked for a note the initializer never wrote.
  put(`${roots.modules}/application.md`, moduleNote(options), 'host')
  for (const scope of CONCEPT_SCOPES) put(`${roots.concepts}/${scope[0]}/index.md`, conceptIndex(commit, scope), 'host')

  if (options.profile === 'ci') put('.github/workflows/cairn.yml', workflow(options), 'host')
  if (options.transport === 'pull-request') put('.github/pull_request_template.md', requestTemplate())

  // Last, because it names every other file — itself and the lock included,
  // since `status` reads both and an adopter looking for "what is Cairn's
  // here" must find them on the list.
  put(POINTER_PAGE, pointerPage(commit, { paths: [...files.keys(), POINTER_PAGE, 'cairn.lock.json'], ponytail }))

  // Every path lands under a declared root or in the kit's own places, so a
  // root the configuration names never gets an undeclared sibling (ADR-033 d1).
  const places = [...Object.values(config.roots).flat(), 'tools', SKILLS, HARNESS_SKILLS, dirname(POINTER_PAGE), 'feedbacks', '.github']
  const astray = [...files.keys()].filter((path) => path.includes('/') && !places.some((root) => path.startsWith(`${root}/`)))
  if (astray.length) throw new Error(`cairn: the plan writes outside every declared root — ${astray.join(', ')}`)

  const dangling = outwardLinks(files)
  if (dangling.length) {
    throw new Error(
      `cairn: the planned installation contains ${dangling.length} link(s) that resolve nowhere in it — ` +
      `${dangling.slice(0, 4).join('; ')}${dangling.length > 4 ? '; …' : ''}. ` +
      'A kit that only resolves in the repository it came from is not a kit'
    )
  }

  return { files, host, hostBaseline: new Set(), config, sourceCommit: commit, ponytail }
}

/** The live view is GENERATED, so it is generated rather than guessed. */
function generateView(target) {
  try {
    execFileSync(process.execPath, ['tools/cairn-active.mjs'], { cwd: target, stdio: 'pipe' })
  } catch (error) {
    const detail = [error.stdout, error.stderr].map((b) => b?.toString('utf8').trim()).filter(Boolean).join(' | ')
    throw new Error(detail || error.message)
  }
}

/** The manifest digests the kit's OWN bytes for every planned file, whether
 *  or not the tree still holds them: that is what lets `status` tell an edit
 *  from an installation. The generated view is recorded as written, and the
 *  host files are named, so a later update knows which files are the
 *  adopter's even after they have left the kit. */
export function lockFor(plan, target, declined = []) {
  const manifest = {}
  for (const [path, content] of [...plan.files].sort(([a], [b]) => a.localeCompare(b))) {
    if (!declined.includes(path)) manifest[path] = plan.ponytail.recorded?.[path] ?? digest(content)
  }
  // Digests that are deliberately the host's own bytes — the generated view,
  // the migrated configuration — are named, so *pristine* keeps meaning *what
  // the kit wrote* for every other file (Atomik's update note, observation 2).
  const baseline = [...plan.hostBaseline]
  const view = `${plan.config.roots.project}/coding-paths/ACTIVE.md`
  if (existsSync(join(target, view))) {
    manifest[view] = digest(readFileSync(join(target, view)))
    baseline.push(view)
  }
  return {
    release: PROTOCOL_RELEASE,
    sourceCommit: plan.sourceCommit,
    installedAt: new Date().toISOString(),
    // The version the stance was fetched at, and whether this run read it
    // or kept the repository's copy (ADR-036 d1).
    ponytail: { version: plan.ponytail.version, read: plan.ponytail.read },
    host: [...plan.host].sort(),
    // Host files the repository declined: never written, never digested, and
    // read by `status` as declined rather than missing (ADR-033 d2).
    declined: [...declined].sort(),
    hostBaseline: baseline.sort(),
    manifest
  }
}

export function writeLock(target, plan, declined = []) {
  const lock = lockFor(plan, target, declined)
  writeFileSync(join(target, 'cairn.lock.json'), `${JSON.stringify(lock, null, 2)}\n`)
  return lock
}

/** Apply a fresh installation. Conflicts are detected across the WHOLE plan
 *  before anything is written; a write failure removes what this run created. */
export function applyPlan(plan, target, { dryRun = false } = {}) {
  const conflicts = [...plan.files.keys()].filter((path) => existsSync(join(target, path)))
  if (conflicts.length) {
    throw new Error(
      `cairn: refusing to overwrite ${conflicts.length} existing file(s) — ` +
      `${conflicts.slice(0, 5).join(', ')}${conflicts.length > 5 ? ', …' : ''}. ` +
      'Silently replacing a file an adopter edited is how an upgrade destroys the work it was meant to preserve. ' +
      'Install into an empty target, or run `adopt` on a repository that already carries the protocol'
    )
  }
  if (existsSync(join(target, 'cairn.lock.json'))) {
    throw new Error('cairn: this repository already carries a cairn.lock.json — it is installed; run `status` or `update`')
  }
  if (dryRun) return { written: [], planned: [...plan.files.keys()] }

  const written = []
  const rollback = () => {
    for (const path of written.reverse()) {
      try { rmSync(join(target, path), { force: true }) } catch { /* best effort */ }
    }
  }
  try {
    for (const [path, content] of plan.files) {
      const absolute = join(target, path)
      mkdirSync(dirname(absolute), { recursive: true })
      writeFileSync(absolute, content)
      written.push(path)
    }
  } catch (error) {
    rollback()
    throw new Error(`cairn: installation failed and was rolled back — ${error.message}`)
  }
  try {
    generateView(target)
  } catch (error) {
    rollback()
    throw new Error(`cairn: could not generate the live view, so nothing was installed — ${error.message}`)
  }
  writeLock(target, plan)
  return { written: [...written, 'cairn.lock.json'], planned: [...plan.files.keys()] }
}

/* ------------------------------------------------------------------ *
 * status, update, adopt — against the lock
 * ------------------------------------------------------------------ */

export function readLock(target) {
  const file = join(target, 'cairn.lock.json')
  if (!existsSync(file)) return null
  return JSON.parse(readFileSync(file, 'utf8'))
}

export function readConfig(target) {
  const file = join(target, 'cairn.config.json')
  if (!existsSync(file)) throw new Error(`cairn: ${target} carries no cairn.config.json — nothing to inspect; run \`init\` on an empty repository`)
  return JSON.parse(readFileSync(file, 'utf8'))
}

/** The state of one installed file against the lock: `pristine` when the tree
 *  holds what the kit wrote, `edited` when it holds something else, `missing`
 *  when it holds nothing. */
export function fileState(target, path, recorded) {
  const absolute = join(target, path)
  if (!existsSync(absolute)) return 'missing'
  return digest(readFileSync(absolute)) === recorded ? 'pristine' : 'edited'
}

/** What `status` reports, and what `update` would do. Pure over the lock, the
 *  plan and a reader of the tree, so it is testable on a synthetic tree.
 *
 *  Portable files are the kit's: a pristine one whose template changed is
 *  rewritten, an edited one is kept and named, a missing one is restored, and
 *  one that left the kit is deleted when pristine. Host files are the
 *  adopter's from day one, pristine or not: they are written only when
 *  missing, REVIEWED — named, never rewritten — when their template changed,
 *  and never deleted. A lock from before host files were named treats every
 *  file that left the kit as one to report, because it cannot tell. */
export function installationStatus(lock, plan, stateOf) {
  const files = []
  // The live view is generated, never compared with the placeholder the plan
  // carries: it is rewritten by its generator at every update, and reported
  // only when it is gone. It and the other digests of the host's own bytes
  // read `host`, never pristine or edited: the kit did not write them.
  const view = plan.config ? `${plan.config.roots.project}/coding-paths/ACTIVE.md` : null
  const baseline = new Set([...(lock.hostBaseline ?? []), view])
  const declined = new Set(lock.declined ?? [])
  for (const [path, content] of plan.files) {
    if (declined.has(path)) { files.push({ path, state: 'declined', action: 'none' }); continue }
    const recorded = lock.manifest[path]
    const state = recorded === undefined ? (stateOf(path, digest(content)) === 'missing' ? 'missing' : 'unmanaged') : stateOf(path, recorded)
    const current = path === view || digest(content) === recorded
    let action = 'none'
    if (state === 'missing') action = 'write'
    else if (state === 'edited' || state === 'unmanaged') action = 'keep'
    // ADR-015 d1: a PRISTINE file holds exactly what the kit wrote, whoever
    // owns it, so there is nothing of the adopter's for a review to protect
    // and the release's version simply lands. Ownership decides only what
    // happens to a file that LEFT the kit, below.
    else if (!current) action = 'write'
    // To reconcile by hand: kept, and what is on disk DIFFERS FROM THE
    // TEMPLATE — a fact about now, recomputed every run. The obvious test, that
    // the template moved since the lock, evaporates: the lock records what the
    // kit WOULD have written, so a second update at the same release finds
    // template and lock equal and drops a file nobody settled. The view is on
    // this list never, as it is on the rewrite list never (ADR-034 d1).
    const reconcile = action === 'keep' && path !== view && stateOf(path, digest(content)) !== 'pristine'
    files.push({ path, state: baseline.has(path) && state !== 'missing' ? 'host' : state, action, reconcile })
  }
  const left = []
  const knownHost = Array.isArray(lock.host) ? new Set(lock.host) : null
  for (const [path, recorded] of Object.entries(lock.manifest)) {
    if (plan.files.has(path)) continue
    const state = stateOf(path, recorded)
    if (state === 'missing') continue
    const deletable = state === 'pristine' && knownHost !== null && !knownHost.has(path)
    left.push({ path, state, action: deletable ? 'delete' : 'report' })
  }
  return { installed: lock.release, available: PROTOCOL_RELEASE, files, left }
}

function describeStatus(status, { sourceCommit: commit, ponytail }) {
  const counts = {}
  for (const file of status.files) counts[file.state] = (counts[file.state] ?? 0) + 1
  // ponytail: numeric order, no prerelease tags — Cairn cuts none; compare the suffix apart if it ever does.
  const order = status.installed.localeCompare(status.available, 'en', { numeric: true })
  const lines = [
    `cairn — installed release ${status.installed}, this package is ${status.available}${order === 0 ? ' (current)' : order < 0 ? ' (an update is available)' : ' (older than what is installed — run the newer package)'}`,
    ...(order < 0 ? [`release notes: ${releaseNotes(commit)}`] : []),
    `ponytail ${ponytail.version ?? 'not installed'}`,
    `kit files: ${Object.entries(counts).map(([state, n]) => `${n} ${state}`).join(', ')}`
  ]
  for (const file of status.files.filter((f) => f.action === 'write')) lines.push(`  update would write   ${file.path} (${file.state})`)
  for (const file of status.files.filter((f) => f.state === 'host' && f.reconcile)) lines.push(`  update would keep    ${file.path} — the host's own, and the release's differs: to reconcile by hand`)
  for (const file of status.files.filter((f) => f.state === 'edited')) lines.push(`  update would keep    ${file.path} — edited here${file.reconcile ? ', and the release\'s differs: to reconcile by hand' : ''}`)
  for (const file of status.files.filter((f) => f.state === 'unmanaged')) lines.push(`  update starts managing ${file.path} — yours before the kit carried it; kept${file.reconcile ? ', and to reconcile by hand' : ''}`)
  for (const file of status.files.filter((f) => f.state === 'declined')) lines.push(`  update would skip    ${file.path} — declined here; \`update --take ${file.path}\` takes it back`)
  for (const file of status.left) lines.push(`  update would ${file.action === 'delete' ? 'delete ' : 'report '} ${file.path} — no longer part of the kit${file.action === 'report' ? (file.state === 'pristine' ? ', and yours to delete' : ', and edited here') : ''}`)
  return lines.join('\n')
}

/** What the release changed in a file it must not rewrite (ADR-015 d2).
 *
 *  Git's diff, not one written here: the kit already requires Git, and a diff
 *  implemented in this file would be more code than the thing it compares.
 *  `--no-index` needs two real paths, so the template goes to a temporary file
 *  and is removed afterwards. A diff that cannot be produced is reported as
 *  not produced — a missing diff must never read as "no difference". */
export function templateDiff(target, path, template) {
  const scratch = join(tmpdir(), `cairn-template-${digest(template).slice(0, 12)}`)
  try {
    writeFileSync(scratch, template)
    execFileSync('git', ['diff', '--no-index', '--no-color', '--', scratch, join(target, path)],
      { encoding: 'utf8', stdio: 'pipe' })
    return ''
  } catch (error) {
    // `git diff --no-index` exits 1 when the files differ; that is the answer,
    // not a failure. Anything with no stdout at all is a failure.
    const out = error.stdout?.toString('utf8') ?? ''
    if (!out) return `cairn: could not diff ${path} against the release's template — ${error.message}`
    // The hunks only. The headers `--no-index` writes name a temporary file
    // and an absolute target, which tell a reader nothing; the caller captions
    // the two sides instead.
    const hunks = out.split('\n').findIndex((line) => line.startsWith('@@'))
    return hunks === -1 ? out : out.split('\n').slice(hunks).join('\n').trimEnd()
  } finally {
    rmSync(scratch, { force: true })
  }
}

/** The plan \`status\`, \`update\` and \`adopt\` compare against: the kit planned
 *  from the host's own declaration, carrying the migrated configuration the
 *  command lands. Built here once, so \`status\` names no rewrite \`update\` will
 *  not make (ADR-034 d4). The configuration's digest is then the host's bytes,
 *  and the plan says so. */
export function hostPlan(target, ponytail = keptPonytail(target)) {
  const migrated = migrateConfig(readConfig(target))
  const errors = configErrors(migrated)
  if (errors.length) throw new Error(`cairn: the migrated configuration is invalid — ${errors.join('; ')}`)
  const plan = planInstall(optionsFromConfig(migrated), SOURCE_ROOT, ponytail)
  plan.files.set('cairn.config.json', Buffer.from(`${JSON.stringify(migrated, null, 2)}\n`, 'utf8'))
  plan.hostBaseline.add('cairn.config.json')
  plan.config = migrated
  return plan
}

/** What \`status\` prints and \`update\` applies, from one reading: the pointer
 *  page is planned with the reconcile and declined lists the tree gives, then
 *  the plan is read again, so the page the lock digests is the page that lands
 *  and the page lists exactly what the report does (ADR-034 d1). */
export function updateStatus(target, plan, lock) {
  const read = (path, recorded) => fileState(target, path, recorded)
  const declined = (lock.declined ?? []).filter((path) => plan.files.has(path))
  const reconcile = installationStatus(lock, plan, read).files.filter((f) => f.reconcile).map((f) => f.path)
  plan.files.set(POINTER_PAGE, Buffer.from(pointerPage(plan.sourceCommit, {
    paths: [...plan.files.keys(), 'cairn.lock.json'].filter((path) => !declined.includes(path)),
    edited: reconcile,
    declined,
    ponytail: plan.ponytail
  }), 'utf8'))
  return { ...installationStatus(lock, plan, read), declined }
}

/** Rewrite what the kit owns and the tree has not edited; migrate the
 *  configuration field by field; report the rest; write the new lock.
 *
 *  \`reconcile\` is the files the owner must settle by hand, with \`diffs\`
 *  saying what the release changed in each, and the pointer page carries the
 *  same list to disk, so the work outlives the terminal (ADR-015 d2).
 *  \`managed\` is the files the repository had before the kit carried them,
 *  kept and managed from this lock on (ADR-034 d3). */
export function applyUpdate(target, plan, lock, { dryRun = false } = {}) {
  const status = updateStatus(target, plan, lock)
  const reconcile = status.files.filter((f) => f.reconcile).map((f) => f.path)
  const diffs = Object.fromEntries(reconcile.map((path) => [path, templateDiff(target, path, plan.files.get(path))]))
  const managed = status.files.filter((f) => f.state === 'unmanaged').map((f) => f.path)

  const written = []
  const deleted = []
  if (!dryRun) {
    for (const file of status.files.filter((f) => f.action === 'write')) {
      const absolute = join(target, file.path)
      mkdirSync(dirname(absolute), { recursive: true })
      writeFileSync(absolute, plan.files.get(file.path))
      written.push(file.path)
    }
    for (const file of status.left.filter((f) => f.action === 'delete')) {
      rmSync(join(target, file.path), { force: true })
      deleted.push(file.path)
    }
    generateView(target)
    writeLock(target, plan, status.declined)
  }
  return { status, written, deleted, diffs, reconcile, managed }
}

/** Take the release's version of ONE edited file (ADR-015 d3). It says what it
 *  is about to discard and does nothing without a name: this is how an
 *  adopter's edited checker becomes a version bump once its repairs are
 *  upstream. */
export function takeRelease(target, plan, lock, path, { dryRun = false } = {}) {
  if (!plan.files.has(path)) {
    throw new Error(`cairn: ${path} is not a file this release carries — \`status\` lists the ones it does`)
  }
  // The PLAN says what the release would install; the LOCK says what this
  // repository actually received. `init` drops `package.json` when the adopter
  // already has one, so the plan carries it and the lock does not — and taking
  // "the release's version" of a file the release never installed here
  // overwrites the adopter's own manifest, scripts and dependencies with a
  // four-line template. Reproduced before this guard existed.
  const declined = lock.declined ?? []
  if (lock.manifest[path] === undefined && !declined.includes(path)) {
    throw new Error(
      `cairn: this installation does not carry ${path} — the kit never wrote it here, so there is no release version of it to take. ` +
      'A file the kit skipped at `init`, like a package.json you already had, stays yours')
  }
  const template = plan.files.get(path)
  // A declined file taken back is the kit's again (ADR-033 d2), and whatever
  // the repository kept at its path is what is discarded.
  const state = declined.includes(path) ? 'declined' : fileState(target, path, lock.manifest[path])
  // What is discarded, shown rather than described: the reason to run this is
  // that the repairs are upstream, and that is a claim about lines.
  const kept = state === 'edited' || (state === 'declined' && existsSync(join(target, path)))
  const discarded = kept ? templateDiff(target, path, template) : ''
  if (!dryRun) {
    mkdirSync(dirname(join(target, path)), { recursive: true })
    writeFileSync(join(target, path), template)
    // ADR-015 d3 makes the file pristine AT THE NEW RELEASE, and pristine is
    // a statement about the lock. Only this entry moves: the installation is
    // still at the release the rest of it carries, until `update` runs.
    const next = { ...lock, manifest: { ...lock.manifest, [path]: digest(template) } }
    if (state === 'declined') next.declined = declined.filter((p) => p !== path)
    writeFileSync(join(target, 'cairn.lock.json'), `${JSON.stringify(next, null, 2)}\n`)
  }
  return { state, discarded }
}

/** Shapes a 0.2 installation leaves behind, which the kit no longer defines.
 *  Reported, never deleted: they are the adopter's, and some of them are the
 *  adopter's history. */
export function staleShapes(target, config, planned = new Set()) {
  const project = config.roots.project
  const stale = []
  const note = (path, why) => { if (existsSync(join(target, path))) stale.push({ path, why }) }
  note(`${config.roots.documentation}/cairn/specification`, 'a copy of the 0.2 specification; the kit links the specification at its release instead — delete the copy, and point roots.concepts at your own wiki')
  note(`${project}/sessions`, 'opening acceptances live in the path record now, and closing is the pull request or a closing record in the path folder; the folder is history')
  note(`${project}/audits`, 'the coherence review is the pull request\'s description, or part of the closing record on manual-git; the folder is history')
  note(`${project}/briefs`, 'the brief is the resume section of the path record; the folder is history')
  for (const name of ['cairn-init.mjs', 'cairn-rules.mjs', 'cairn-spec-build.mjs']) {
    note(`tools/${name}`, 'a 0.2 tool the kit no longer installs — delete it')
  }
  if (existsSync(join(target, 'tools'))) {
    for (const name of readdirSync(join(target, 'tools')).filter((n) => n.endsWith('.test.mjs'))) {
      note(`tools/${name}`, 'a 0.2 test of tools this repository no longer has — delete it')
    }
  }
  if (existsSync(join(target, project, 'coding-paths'))) {
    for (const name of readdirSync(join(target, project, 'coding-paths'))) {
      if (/^CP-.+\.md$/.test(name)) note(`${project}/coding-paths/${name}`, 'a flat path record; conforming, and migrated to one folder when it is next touched')
    }
  }
  // A file whose relative links resolve nowhere is a shape, not a list of
  // repairs, when it portrays another repository or freezes a history; the
  // adopter declares it, and the field is named (ADR-037 d2). A link to a
  // file this adoption is about to write resolves.
  const exempt = (path) => (config.linkExemptions ?? []).some((e) => path === e.path || path.startsWith(e.path.endsWith('/') ? e.path : `${e.path}/`))
  for (const root of [config.roots.documentation, project]) {
    if (!existsSync(join(target, root))) continue
    for (const path of walk(join(target, root)).map((p) => `${root}/${p}`).filter((p) => p.endsWith('.md') && !exempt(p)).sort()) {
      const broken = relativeLinks(path, readFileSync(join(target, path)))
        .filter(({ resolved }) => !existsSync(join(target, resolved)) && !planned.has(resolved)).length
      if (broken > 0) stale.push({ path, why: `${broken} relative link(s) resolve nowhere — repair them, or, if the file portrays another repository or freezes a history, declare it under \`linkExemptions\` in cairn.config.json with its reason` })
    }
  }
  return stale
}

/** The host files `adopt` leaves in place — the manifest's scripts, the
 *  workflows' steps — that still call what it just reported stale, so the
 *  report can say the gate is red until they go (ADR-033 d4). A glob is read
 *  as a glob, and a workflow step reaches a stale file through one
 *  \`npm run\` of a script that calls it. */
export function staleCallers(target, stale) {
  // Pages are read, never called: a flat record or a page with dead links in
  // a workflow's text turns no gate red.
  const paths = stale.map((s) => s.path).filter((path) => !path.endsWith('.md'))
  const glob = (word) => new RegExp(`^${word.replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*\//g, '\u0000').replace(/\*/g, '[^/]*').replace(/\?/g, '[^/]').replace(/\u0000/g, '(?:.*/)?')}$`)
  const calls = (text) => text.split(/[\s'"`]+/).some((word) => paths.some((path) =>
    word === path || word.startsWith(`${path}/`) || (/[*?]/.test(word) && glob(word).test(path))))
  const read = (path) => readFileSync(join(target, path), 'utf8')
  const callers = []
  let scripts = []
  if (existsSync(join(target, 'package.json'))) {
    try {
      scripts = Object.entries(JSON.parse(read('package.json')).scripts ?? {}).filter(([, run]) => calls(String(run))).map(([name]) => name)
    } catch { /* a manifest that does not parse calls nothing we can name */ }
    if (scripts.length > 0) callers.push('package.json')
  }
  const runs = (text) => scripts.some((name) =>
    new RegExp(`npm run ${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w:-])`).test(text) ||
    (name === 'test' && /npm (?:test|t)(?![\w:-])/.test(text)))
  const workflows = '.github/workflows'
  if (existsSync(join(target, workflows))) {
    for (const name of readdirSync(join(target, workflows)).filter((n) => /\.ya?ml$/.test(n)).sort()) {
      // A comment calls nothing — the kit's own workflow names \`npm test\` in one.
      const text = read(`${workflows}/${name}`).replace(/(^|\s)#.*$/gm, '$1')
      if (calls(text) || runs(text)) callers.push(`${workflows}/${name}`)
    }
  }
  return callers
}

/** What `adopt` settles before it reads or writes anything: no lock, and a
 *  pairing that can work. \`protected\` declares that the host prevents a
 *  direct push to the trunk, \`manual-git\` registration that the writer makes
 *  one — refused from the two declarations alone, no host asked (ADR-032 d4). */
export function adoptable(target) {
  if (readLock(target)) throw new Error('cairn: this repository carries a cairn.lock.json — it is installed; run `update`')
  const migrated = migrateConfig(readConfig(target))
  if (migrated.enforcementProfile === 'protected' && migrated.transport.registration === 'manual-git') {
    throw new Error('cairn: cairn.config.json declares enforcementProfile: protected — the host prevents a direct push to the trunk — ' +
      'and transport.registration: manual-git — the writer pushes the registration commit to the trunk directly. Both cannot hold: ' +
      'declare transport.registration: pull-request, or the profile the host actually enforces')
  }
  return migrated
}

/** The installer's one reading of GitHub: whether the trunk requires a pull
 *  request of the owner running it, read from the trunk's rulesets with the
 *  owner's own token, which sees whether they may bypass (ADR-032 d4). It
 *  never throws; a reading it could not make says why, and nothing is
 *  refused on it. The checker asks the host nothing (ADR-029) — this runs
 *  once, at the owner's terminal, before a file is written. */
export async function readTrunk({ url, trunk, token, request }) {
  if (!url) return { read: false, why: 'there is no remote to read' }
  const slug = githubSlug(url)
  if (!slug) return { read: false, why: 'the remote is not on GitHub' }
  if (!token) return { read: false, why: 'no token — set GITHUB_TOKEN or GH_TOKEN, or log in with gh' }
  const api = `https://api.github.com/repos/${slug.owner}/${slug.repo}`
  const rules = await request(`${api}/rules/branches/${encodeURIComponent(trunk)}?per_page=100`)
  if (rules.error) return { read: false, why: `GitHub answered ${rules.error}` }
  // ponytail: rulesets only; classic branch protection is not read — add it when an adopter's trunk uses it.
  for (const id of new Set(rules.value.filter((rule) => rule.type === 'pull_request').map((rule) => rule.ruleset_id))) {
    const ruleset = await request(`${api}/rulesets/${id}`)
    if (ruleset.error) return { read: false, why: `GitHub answered ${ruleset.error} for ruleset ${id}` }
    // `exempt`: the ruleset does not apply to this owner at all. A host that
    // does not say is a reading not obtained.
    const bypass = ruleset.value.current_user_can_bypass
    if (bypass === undefined) return { read: false, why: `GitHub did not say whether you may bypass ruleset ${id}` }
    if (!['always', 'exempt'].includes(bypass)) return { read: true, direct: false, ruleset: ruleset.value.name }
  }
  return { read: true, direct: true }
}

/** The owner and repository of a GitHub remote, or null — the post-mortem's
 *  pattern, anchored, so a look-alike host is never read. The post-mortem
 *  has its own copy; importing it here loads the checker, which needs a host
 *  configuration the package command runs without (backlog, 2026-09-25). */
const githubSlug = (url) => {
  const match = /^(?:(?:https?|ssh|git)(?::\/\/)(?:[^@/]+@)?|(?:[^@/\s]+@))github\.com[:/]([^/\s]+)\/([^/\s]+?)(?:\.git)?$/i
    .exec(String(url ?? '').trim())
  return match ? { owner: match[1], repo: match[2] } : null
}

/** One GitHub read, an error an answer and never an exception. */
async function githubRequest(url, { token }) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(3000),
      headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${token}`, 'user-agent': 'cairn', 'x-github-api-version': '2022-11-28' }
    })
    return response.ok ? { value: await response.json() } : { error: `HTTP ${response.status}` }
  } catch (error) {
    return { error: error?.name === 'TimeoutError' ? 'no answer in 3000ms' : String(error?.message ?? error) }
  }
}

/** Refuse \`manual-git\` registration on a trunk that takes no direct push
 *  from this owner, where GitHub says so; say in one line when it was not read. */
async function refuseUnpushableTrunk(target, { remote, trunk, registration, wayOut }) {
  if (registration !== 'manual-git') return
  const quiet = { cwd: target, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  const attempt = (run) => { try { return run() } catch { return null } }
  const url = attempt(() => execFileSync('git', ['remote', 'get-url', remote], quiet).trim())
  const token = githubSlug(url) ? process.env.GITHUB_TOKEN || process.env.GH_TOKEN || attempt(() => execFileSync('gh', ['auth', 'token'], quiet).trim()) : null
  const reading = await readTrunk({ url, trunk, token, request: (url) => githubRequest(url, { token }) })
  if (!reading.read) {
    console.log(`cairn — did not read ${trunk}'s rules on GitHub: ${reading.why}; writing what was asked`)
    return
  }
  if (!reading.direct) {
    throw new Error(`cairn: ${trunk} on GitHub requires a pull request (ruleset "${reading.ruleset}") and gives you no bypass, ` +
      'so manual-git registration — the registration commit pushed to the trunk directly — cannot land. ' +
      `Two ways out: a bypass for you on that ruleset, or pull-request registration (${wayOut})`)
  }
}

/** A repository that carries the protocol without a lock — an installation
 *  from before the lock existed, or from a copy — becomes an installation:
 *  the configuration is migrated, the tools and the skills are written, the
 *  host files are written only where absent, the view is regenerated, the
 *  lock is written, and everything the kit no longer defines is reported. */
export function applyAdopt(target, { dryRun = false, ponytail } = {}) {
  adoptable(target)
  // The migrated configuration is what lands on disk, so it is what the lock
  // must digest. Locking the generated one instead made the very next
  // `status` call an untouched file edited (found by S01's review).
  const plan = hostPlan(target, ponytail)
  const migrated = plan.config
  const written = []
  const kept = []
  const decide = (path) => {
    if (path === 'cairn.config.json') return 'write'
    if (plan.host.has(path)) return existsSync(join(target, path)) ? 'keep' : 'write'
    return 'write'
  }
  if (!dryRun) {
    for (const [path, content] of plan.files) {
      if (decide(path) === 'keep') { kept.push(path); continue }
      const absolute = join(target, path)
      mkdirSync(dirname(absolute), { recursive: true })
      writeFileSync(absolute, content)
      written.push(path)
    }
    generateView(target)
    writeLock(target, plan)
  } else {
    for (const path of plan.files.keys()) (decide(path) === 'keep' ? kept : written).push(path)
  }
  const stale = staleShapes(target, migrated, new Set(plan.files.keys()))
  return { written, kept, stale, callers: staleCallers(target, stale), config: migrated }
}

/* ------------------------------------------------------------------ *
 * the command
 * ------------------------------------------------------------------ */

function parseArgs(argv) {
  const [command, ...rest] = argv
  const options = { ...defaultOptions() }
  let target = null
  let dryRun = false
  let take = null
  const decline = []
  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i]
    const next = () => {
      const value = rest[i + 1]
      if (value == null) throw new Error(`cairn: ${arg} needs a value`)
      i += 1
      return value
    }
    if (arg === '--target') target = next()
    else if (arg === '--trunk') options.trunk = next()
    else if (arg === '--remote') options.remote = next()
    else if (arg === '--namespace') options.namespace = next()
    else if (arg === '--profile') options.profile = next()
    else if (arg === '--project-root') options.projectRoot = next()
    else if (arg === '--docs-root') options.docsRoot = next()
    else if (arg === '--source') options.sourceRoots = next().split(',').map((s) => s.trim()).filter(Boolean)
    else if (arg === '--transport') options.transport = next()
    else if (arg === '--registration') options.registrationTransport = next()
    else if (arg === '--take') take = posix.normalize(next())
    else if (arg === '--decline') decline.push(posix.normalize(next()))
    else if (arg === '--dry-run') dryRun = true
    else throw new Error(`cairn: unknown argument ${arg}`)
  }
  return { command, options, target: resolve(target ?? '.'), dryRun, take, decline }
}

/** The stance for this run: fetched, or — offline, or on a failed fetch —
 *  the repository's own copy, said in one line (ADR-036 d1). */
async function stanceFor(target) {
  const read = await readPonytail()
  if (!read.error) return { version: read.version, read: true, files: read.files }
  const kept = keptPonytail(target)
  console.log(`cairn — Ponytail was not read: ${read.error}; ${kept.files.size > 0 ? `kept ${kept.version}` : 'nothing installed'}`)
  return kept
}

async function main(argv) {
  const { command, options, target, dryRun, take, decline } = parseArgs(argv)
  if (take !== null && decline.length > 0) throw new Error('cairn: --take and --decline are two runs — take the one file, then run update with --decline')
  if (command === 'init') {
    if (options.profile === 'protected') {
      throw new Error('cairn: --profile protected is not installable — it asserts host protection this command cannot configure. Install local or ci and declare protected once the host is actually configured')
    }
    await refuseUnpushableTrunk(target, { remote: options.remote, trunk: options.trunk,
      registration: options.registrationTransport ?? REGISTRATION_TRANSPORT, wayOut: '`init --registration pull-request`' })
    const plan = planInstall(options, SOURCE_ROOT, await stanceFor(target))
    mkdirSync(target, { recursive: true })
    let scriptsNotice = null
    if (existsSync(join(target, 'package.json'))) {
      // Read off the manifest the kit would have written, so a script added
      // there cannot go unmentioned to the adopters who never receive the file.
      const scripts = JSON.parse(plan.files.get('package.json').toString('utf8')).scripts
      plan.files.delete('package.json')
      scriptsNotice = 'package.json already exists and was left alone — add: ' +
        Object.entries(scripts).map(([name, run]) => `"${name}": "${run}"`).join(', ')
    }
    applyPlan(plan, target, { dryRun })
    console.log(`cairn — ${dryRun ? 'would install' : 'installed'} ${plan.files.size} file(s) and the lock into ${target}`)
    console.log(`release ${PROTOCOL_RELEASE} from ${plan.sourceCommit.slice(0, 7)}; trunk ${options.trunk} via ${options.remote}; profile ${options.profile}; registration ${plan.config.transport.registration}, integration ${plan.config.transport.integration}; path history forbidden`)
    if (scriptsNotice) console.log(scriptsNotice)
    if (!dryRun) console.log('next — commit this installation, then read AGENTS.md and open your first path')
    return
  }
  if (command === 'status') {
    const lock = readLock(target)
    if (!lock) throw new Error(`cairn: ${target} carries no cairn.lock.json — run \`adopt\` if it carries the protocol, \`init\` if it does not`)
    const plan = hostPlan(target)
    console.log(describeStatus(updateStatus(target, plan, lock), plan))
    return
  }
  if (command === 'update') {
    const lock = readLock(target)
    if (!lock) throw new Error(`cairn: ${target} carries no cairn.lock.json — run \`adopt\` first`)
    const plan = hostPlan(target, await stanceFor(target))
    if (take !== null) {
      const { state, discarded } = takeRelease(target, plan, lock, take, { dryRun })
      // The pointer page lists what is declined and what is to reconcile, so it
      // follows the take — the page and the lock agree after it, as after an
      // update. One the owner edited is kept, as \`update\` keeps it; across
      // releases the page would name a release the lock does not, so it waits
      // for the update the next line asks for.
      let page = false
      const taken = dryRun ? null : readLock(target)
      if (taken && taken.release === PROTOCOL_RELEASE && taken.manifest[POINTER_PAGE] !== undefined) {
        page = updateStatus(target, plan, taken).files.find((f) => f.path === POINTER_PAGE)?.action === 'write'
        if (page) takeRelease(target, plan, taken, POINTER_PAGE)
      }
      if (discarded) {
        console.log(`--- ${take} — about to be discarded (the + lines below)`)
        console.log(discarded)
      }
      console.log(`cairn — ${dryRun ? 'would take' : 'took'} the release's version of ${take}, ${state === 'declined' ? 'declined until now' : `discarding what was ${state} here`}; nothing else was touched${page ? ' but the pointer page, which follows it' : ''}`)
      console.log('next — run `update` with no --take to bring the rest of the kit to this release')
      return
    }
    for (const path of decline) {
      // The configuration is the authority every tool reads; it is migrated,
      // never declined.
      if (!plan.host.has(path) || path === 'cairn.config.json') {
        throw new Error(`cairn: ${path} is not a host file this release writes — only those can be declined; the kit's own files are kept when edited, and \`status\` lists both`)
      }
    }
    lock.declined = [...new Set([...(lock.declined ?? []), ...decline])]
    const result = applyUpdate(target, plan, lock, { dryRun })
    console.log(describeStatus(result.status, plan))
    for (const path of result.reconcile) {
      console.log(`\n--- ${path} — you edited this, and the release changed its template`)
      console.log('    (- the release\'s version, + yours)')
      console.log(result.diffs[path])
    }
    console.log(`cairn — ${dryRun ? 'would update' : 'updated'} to release ${PROTOCOL_RELEASE}: ${result.written.length} written, ${result.deleted.length} deleted, ${result.managed.length} newly managed`)
    if (result.reconcile.length > 0) {
      console.log(`to reconcile by hand (${result.reconcile.length}): ${result.reconcile.join(', ')}`)
      console.log(`they are listed on ${POINTER_PAGE} too, so the work is on disk and not only here`)
    }
    return
  }
  if (command === 'stamp') {
    const release = stampRelease()
    console.log(`cairn — stamped tools/release.json at ${release.release} from ${release.commit.slice(0, 7)}`)
    return
  }
  if (command === 'adopt') {
    const declared = adoptable(target)
    await refuseUnpushableTrunk(target, { remote: declared.remote, trunk: declared.trunk,
      registration: declared.transport.registration, wayOut: 'transport.registration: pull-request in cairn.config.json' })
    const result = applyAdopt(target, { dryRun, ponytail: await stanceFor(target) })
    console.log(`cairn — ${dryRun ? 'would adopt' : 'adopted'} ${target} at release ${PROTOCOL_RELEASE}: ${result.written.length} written, ${result.kept.length} host files kept`)
    for (const path of result.kept) console.log(`  kept     ${path} — yours; review it against the kit's`)
    for (const { path, why } of result.stale) console.log(`  stale    ${path} — ${why}`)
    if (result.callers.length > 0) console.log(`  ${result.callers.map((path) => `\`${path}\``).join(' and ')} call these; your gate is red until they go`)
    if (!dryRun) console.log('next — run npm run cairn-check, read its findings, and commit the adoption as one unit')
    return
  }
  throw new Error('usage: cairn <init|status|update|adopt> [--target <dir>] [options]; `update --take <path>` takes the release\'s version of one edited or declined file, `update --decline <path>` stops writing one host file; `stamp` is the package\'s own, run by prepack')
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('/cairn')) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
