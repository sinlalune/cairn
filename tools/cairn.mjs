#!/usr/bin/env node
/**
 * cairn — install, inspect, update and adopt Cairn in a repository.
 *
 *   npx cairn-protocol init   --target <dir> [--trunk main] [--remote origin]
 *                             [--namespace cairn] [--profile local|ci]
 *                             [--project-root project] [--docs-root docs]
 *                             [--source src,packages] [--transport pull-request|manual-git]
 *                             [--dry-run]
 *   npx cairn-protocol status [--target <dir>]
 *   npx cairn-protocol update [--target <dir>] [--dry-run]
 *   npx cairn-protocol adopt  [--target <dir>] [--dry-run]
 *
 * The npm name `cairn` belongs to another package, so the package is
 * `cairn-protocol` and its binary is `cairn`.
 *
 * THE KIT IS THIN. It installs the reference tools, the five skills, the host
 * files — bootloader, configuration, binding, workflow, request template — and
 * the folder indexes the roles need: under thirty files. It does not copy the
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
import { dirname, join, relative, resolve, sep } from 'node:path'
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
  'cairn-audit.mjs'
]

/** The procedures, as Agent Skills: copied whole, one folder per skill. */
export const SKILLS = 'skills'

/** Portable text the kit LINKS rather than copies. */
export const PORTABLE_DOCS = 'spec'

/** The commit this kit was cut from: the source repository's HEAD when it can
 *  be read, the commit recorded in the package otherwise, and `main` — the
 *  moving trunk, stated as such — when neither is known. */
export function sourceCommit(root = SOURCE_ROOT) {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return PACKAGE.cairn?.commit ?? 'unknown'
  }
}

export function specUrl(commit) {
  return `${REPOSITORY_URL}/blob/${commit && commit !== 'unknown' ? commit : 'main'}/${PORTABLE_DOCS}`
}

/** A portable file links the specification relatively in the protocol's own
 *  repository, where the `links` rule can check it; installed, it links the
 *  specification at the pinned commit. Only links into `spec/` are rewritten. */
export function pinSpecLinks(text, commit) {
  return String(text).replace(/\]\((?:\.\.\/)+spec\//g, `](${specUrl(commit)}/`)
}

export function digest(content) {
  return createHash('sha256').update(content).digest('hex')
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
    // The pull request is the default transport: a review that is recorded, a
    // required check on the exact commit that lands, and a merge that is the
    // same object CI tested are native there. `manual-git` is the fallback for
    // a repository with no forge.
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
    conceptsRoot: config.roots.concepts
  }
}

export function buildConfig(options) {
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
      architecture: `${options.docsRoot}/architecture`,
      decisions: `${options.docsRoot}/adr`,
      modules: `${options.docsRoot}/modules`,
      // The adopter's OWN wiki — the project scope of chapter 6. The
      // protocol's wiki is read at the release, never written into.
      concepts: options.conceptsRoot ?? `${options.docsRoot}/concepts`,
      source: options.sourceRoots
    },
    areas: [
      {
        name: 'application',
        match: options.sourceRoots.map((root) => `${root}/**`),
        note: `${options.docsRoot}/modules/application.md`
      }
    ],
    defaultRoute: 'lightweight',
    checkpointRetentionRef: null,
    pathHistoryPolicy: 'forbidden',
    scopeDigestAlgorithm: 'sha256',
    transport: { registration: options.transport, integration: options.transport },
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

const front = (type, title, description, tags) =>
  `---\ntype: ${type}\ntitle: ${title}\ndescription: ${description}\ntags: [${tags.join(', ')}]\ntimestamp: ${new Date().toISOString().slice(0, 10)}T00:00:00Z\n---\n`

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
   \`cairn-open\`, \`cairn-unit\`, \`cairn-close\`, and the \`cairn-code\` stance.

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
`
}

export function hostBinding(options, commit) {
  const concepts = options.conceptsRoot ?? `${options.docsRoot}/concepts`
  return front('Cairn Binding', 'Host binding', 'How portable Cairn roles map onto this repository.', ['cairn', 'binding']) +
    `\n# Host binding

This page is classified **BINDING**. It names this repository and MAY carry local
paths, command names and runtime details. Portable protocol text never does.

| Portable role | This repository |
| :-- | :-- |
| documentation plane | \`${options.docsRoot}/\` |
| execution-state plane | \`${options.projectRoot}/\` |
| path records and live view | \`${options.projectRoot}/coding-paths/\` |
| accepted architecture | \`${options.docsRoot}/architecture/\` |
| decisions | \`${options.docsRoot}/adr/\` |
| implemented-area notes | \`${options.docsRoot}/modules/\` |
| concept wiki | \`${concepts}/\` |
| source roots | ${options.sourceRoots.map((r) => `\`${r}/\``).join(', ')} |
| trunk | \`${options.trunk}\` |
| remote | \`${options.remote}\` |
| metadata namespace | \`${options.namespace}\` |
| enforcement profile | \`${options.profile}\` |
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

## Flow

State the main flow in a paragraph, once the first unit lands.

## Boundaries

What this area owns, and what it deliberately does not.

## Tests

How the area is proved: the command, and what green means.
`
}

export function conceptIndex(commit) {
  return front('Cairn Folder Index', 'Concepts', "This repository's own vocabulary: one idea per page, borrowed terms kept apart from the ones this project defines.", ['index', 'cairn', 'concepts']) +
    `\n# Concepts

One specialised idea per page, from
[the one-concept template](${specUrl(commit)}/concepts/concept-template.md):
the plain definition first, the failure the concept prevents, how it is checked
or the honest sentence that nothing checks it. A concept no page outside this
folder links is an orphan and blocks the gate.

## Borrowed

Terms this project uses as others define them.

## Own

Terms this project defines.
`
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
    branches: [${options.trunk}, "path/**"]
jobs:
  protocol:
    runs-on: ubuntu-latest
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
      - name: cairn-check
        env:
          CAIRN_BASE_REF: origin/\${{ github.base_ref || '${options.trunk}' }}
        run: node tools/cairn-check.mjs --base "$CAIRN_BASE_REF"
`
}

/** The request template a forge fills into every pull request: the closing
 *  review's shape, so the description is the record from the first draft. */
export function requestTemplate() {
  return `<!-- Cairn closing review. On pull-request transport this description IS the
coherence review of one exact candidate and the approval IS the closing
acceptance. \`npm run cairn-audit\` prints this shape filled in for the current
candidate. The checker proves the candidate, its closure surface, the opening
digest and the trunk drift from Git; it reads none of the text below, which is
what the approver reads. -->

## Candidate

- path: CP-<ID>
- candidate \`C\`: <full object id>
- base \`T\`, the trunk tip merged into the candidate: <full object id>
- scope digest at \`C\`: <output of node tools/cairn-check.mjs --scope-digest <record>#definition-of-done>; equals the opening acceptance: yes | no

## Coherence

- [ ] Does the diff contradict an accepted decision?
- [ ] Does it duplicate something another running path is building?
- [ ] Did it introduce architecture that belongs in a decision record and has none?
- [ ] Is anything now documented in two places that will drift apart?

## Advisories at \`C\`

Every advisory \`cairn-check\` raised at the candidate, each fixed, accepted, or
deferred to a named owner and follow-up; or *none*.

## Roles

- reviewer: <who approves>, holding the roles <initiator | writer | reviewer | integrator> on this path
`
}

/** Refuse to install a corpus that only resolves where it came from.
 *
 *  Written because the first end-to-end run of the 0.2 installer produced a
 *  repository whose FIRST gate failed with seventeen broken links. Every
 *  relative link a kit file carries must land on another kit file; anything
 *  else is a URL, pinned. */
export function outwardLinks(files) {
  const link = /\]\(([^)]+)\)/g
  const offenders = []
  for (const [path, content] of files) {
    if (!path.endsWith('.md')) continue
    const dir = path.split('/').slice(0, -1)
    const text = content.toString('utf8').replace(/^(`{3,})[\s\S]*?^\1`*$/gm, '')
    for (const match of text.matchAll(link)) {
      const target = match[1].split('#')[0].trim()
      if (!target || !target.startsWith('.')) continue
      const parts = [...dir]
      for (const segment of target.split('/')) {
        if (segment === '.' || segment === '') continue
        if (segment === '..') parts.pop()
        else parts.push(segment)
      }
      const resolved = parts.join('/')
      if (!files.has(resolved)) offenders.push(`${path} -> ${target}`)
    }
  }
  return offenders
}

/** Resolve the complete kit in memory. Nothing touches the target here — a
 *  plan that cannot be built completely is never partially applied.
 *
 *  `files` is what the kit writes; `host` names the entries that are the
 *  adopter's from day one, which `update` and `adopt` never overwrite. */
export function planInstall(options = defaultOptions(), sourceRoot = SOURCE_ROOT) {
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
      'cairn-audit': 'node tools/cairn-audit.mjs'
    }
  }, null, 2)}\n`, 'host')

  for (const tool of REFERENCE_TOOLS) {
    const absolute = join(sourceRoot, 'tools', tool)
    if (!existsSync(absolute)) throw new Error(`cairn: missing reference tool ${tool}`)
    put(`tools/${tool}`, readFileSync(absolute))
  }
  const skillsRoot = join(sourceRoot, SKILLS)
  if (!existsSync(skillsRoot)) throw new Error(`cairn: missing skills at ${SKILLS}`)
  for (const relativePath of walk(skillsRoot)) {
    const text = readFileSync(join(skillsRoot, relativePath))
    put(`${SKILLS}/${relativePath}`, relativePath.endsWith('.md') ? pinSpecLinks(text.toString('utf8'), commit) : text)
  }

  put(`${options.projectRoot}/coding-paths/binding.md`, hostBinding(options, commit), 'host')
  put(`${options.projectRoot}/coding-paths/index.md`, registerIndex(), 'host')
  put(`${options.projectRoot}/index.md`, folderIndex('Project plane',
    'Durable execution state: one folder per coding path under `coding-paths/`, and the journal of integrated outcomes under `log/`.'), 'host')
  // A placeholder the generator overwrites at once: shipping the file it would
  // produce, by hand, is what failed `derived-view` on the first 0.2 install.
  put(`${options.projectRoot}/coding-paths/ACTIVE.md`,
    front('Cairn Generated View', 'Running paths', 'Generated live view of running coding paths.', ['cairn', 'generated', 'index']) +
    '\n# Running paths\n\nThis file is GENERATED by `npm run cairn-active`. Never hand-edit it.\n\n' +
    '<!-- cairn:paths:begin -->\n<!-- cairn:paths:end -->\n', 'generated')

  put(`${options.docsRoot}/index.md`, folderIndex('Documentation plane',
    'Durable knowledge: architecture, decisions, module notes, and this repository\'s own concepts.'), 'host')
  put(`${options.docsRoot}/modules/index.md`, folderIndex('Module notes', 'One note per implemented area: flow, boundaries and tests.'), 'host')
  // The one area the generated configuration names must exist, or the first
  // implementation unit is asked for a note the initializer never wrote.
  put(`${options.docsRoot}/modules/application.md`, moduleNote(options), 'host')
  const concepts = options.conceptsRoot ?? `${options.docsRoot}/concepts`
  put(`${concepts}/index.md`, conceptIndex(commit), 'host')

  if (options.profile === 'ci') put('.github/workflows/cairn.yml', workflow(options), 'host')
  if (options.transport === 'pull-request') put('.github/pull_request_template.md', requestTemplate())

  const dangling = outwardLinks(files)
  if (dangling.length) {
    throw new Error(
      `cairn: the planned installation contains ${dangling.length} link(s) that resolve nowhere in it — ` +
      `${dangling.slice(0, 4).join('; ')}${dangling.length > 4 ? '; …' : ''}. ` +
      'A kit that only resolves in the repository it came from is not a kit'
    )
  }

  return { files, host, config, sourceCommit: commit }
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
 *  from an installation. The generated view is recorded as written. */
export function lockFor(plan, target) {
  const manifest = {}
  for (const [path, content] of [...plan.files].sort(([a], [b]) => a.localeCompare(b))) {
    manifest[path] = digest(content)
  }
  const view = `${plan.config.roots.project}/coding-paths/ACTIVE.md`
  if (existsSync(join(target, view))) manifest[view] = digest(readFileSync(join(target, view)))
  return { release: PROTOCOL_RELEASE, sourceCommit: plan.sourceCommit, installedAt: new Date().toISOString(), manifest }
}

export function writeLock(target, plan) {
  const lock = lockFor(plan, target)
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
 *  plan and a reader of the tree, so it is testable on a synthetic tree. */
export function installationStatus(lock, plan, stateOf) {
  const files = []
  // The live view is generated, never compared with the placeholder the plan
  // carries: it is rewritten by its generator at every update, and reported
  // only when it is gone.
  const view = plan.config ? `${plan.config.roots.project}/coding-paths/ACTIVE.md` : null
  for (const [path, content] of plan.files) {
    const recorded = lock.manifest[path]
    const state = recorded === undefined ? (stateOf(path, digest(content)) === 'missing' ? 'missing' : 'unmanaged') : stateOf(path, recorded)
    const current = path === view || digest(content) === recorded
    files.push({ path, state, action: state === 'edited' || state === 'unmanaged' ? 'keep' : (state === 'missing' || !current) ? 'write' : 'none' })
  }
  const left = []
  for (const [path, recorded] of Object.entries(lock.manifest)) {
    if (plan.files.has(path)) continue
    const state = stateOf(path, recorded)
    if (state === 'missing') continue
    left.push({ path, state, action: state === 'pristine' ? 'delete' : 'report' })
  }
  return { installed: lock.release, available: PROTOCOL_RELEASE, files, left }
}

function describeStatus(status) {
  const counts = {}
  for (const file of status.files) counts[file.state] = (counts[file.state] ?? 0) + 1
  const lines = [
    `cairn — installed release ${status.installed}, this package is ${status.available}${status.installed === status.available ? ' (current)' : ' (an update is available)'}`,
    `kit files: ${Object.entries(counts).map(([state, n]) => `${n} ${state}`).join(', ')}`
  ]
  for (const file of status.files.filter((f) => f.action === 'write')) lines.push(`  update would write   ${file.path} (${file.state})`)
  for (const file of status.files.filter((f) => f.state === 'edited')) lines.push(`  update would keep    ${file.path} — edited here; review it against the kit's`)
  for (const file of status.left) lines.push(`  update would ${file.action === 'delete' ? 'delete ' : 'report '} ${file.path} — no longer part of the kit${file.action === 'report' ? ', and edited here' : ''}`)
  return lines.join('\n')
}

/** Rewrite what the kit owns and the tree has not edited; migrate the
 *  configuration field by field; report the rest; write the new lock. */
export function applyUpdate(target, plan, lock, { dryRun = false } = {}) {
  const status = installationStatus(lock, plan, (path, recorded) => fileState(target, path, recorded))
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
    writeLock(target, plan)
  }
  return { status, written, deleted }
}

/** Shapes a 0.2 installation leaves behind, which the kit no longer defines.
 *  Reported, never deleted: they are the adopter's, and some of them are the
 *  adopter's history. */
export function staleShapes(target, config) {
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
  return stale
}

/** A repository that carries the protocol without a lock — an installation
 *  from before the lock existed, or from a copy — becomes an installation:
 *  the configuration is migrated, the tools and the skills are written, the
 *  host files are written only where absent, the view is regenerated, the
 *  lock is written, and everything the kit no longer defines is reported. */
export function applyAdopt(target, { dryRun = false } = {}) {
  if (readLock(target)) throw new Error('cairn: this repository carries a cairn.lock.json — it is installed; run `update`')
  const migrated = migrateConfig(readConfig(target))
  const errors = configErrors(migrated)
  if (errors.length) throw new Error(`cairn: the migrated configuration is invalid — ${errors.join('; ')}`)
  const plan = planInstall(optionsFromConfig(migrated))
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
      // The migrated configuration keeps the host's answers; the plan's is
      // only the shape a fresh install would have had.
      writeFileSync(absolute, path === 'cairn.config.json' ? `${JSON.stringify(migrated, null, 2)}\n` : content)
      written.push(path)
    }
    generateView(target)
    writeLock(target, plan)
  } else {
    for (const path of plan.files.keys()) (decide(path) === 'keep' ? kept : written).push(path)
  }
  return { written, kept, stale: staleShapes(target, migrated), config: migrated }
}

/* ------------------------------------------------------------------ *
 * the command
 * ------------------------------------------------------------------ */

function parseArgs(argv) {
  const [command, ...rest] = argv
  const options = { ...defaultOptions() }
  let target = null
  let dryRun = false
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
    else if (arg === '--dry-run') dryRun = true
    else throw new Error(`cairn: unknown argument ${arg}`)
  }
  return { command, options, target: resolve(target ?? '.'), dryRun }
}

function main(argv) {
  const { command, options, target, dryRun } = parseArgs(argv)
  if (command === 'init') {
    if (options.profile === 'protected') {
      throw new Error('cairn: --profile protected is not installable — it asserts host protection this command cannot configure. Install local or ci and declare protected once the host is actually configured')
    }
    const plan = planInstall(options, SOURCE_ROOT)
    mkdirSync(target, { recursive: true })
    let scriptsNotice = null
    if (existsSync(join(target, 'package.json'))) {
      plan.files.delete('package.json')
      scriptsNotice = 'package.json already exists and was left alone — add: ' +
        '"cairn-check": "node tools/cairn-check.mjs", "cairn-active": "node tools/cairn-active.mjs", "cairn-audit": "node tools/cairn-audit.mjs"'
    }
    applyPlan(plan, target, { dryRun })
    console.log(`cairn — ${dryRun ? 'would install' : 'installed'} ${plan.files.size} file(s) and the lock into ${target}`)
    console.log(`release ${PROTOCOL_RELEASE} from ${plan.sourceCommit.slice(0, 7)}; trunk ${options.trunk} via ${options.remote}; profile ${options.profile}; transport ${options.transport}; path history forbidden`)
    if (scriptsNotice) console.log(scriptsNotice)
    if (!dryRun) console.log('next — commit this installation, then read AGENTS.md and open your first path')
    return
  }
  if (command === 'status') {
    const lock = readLock(target)
    if (!lock) throw new Error(`cairn: ${target} carries no cairn.lock.json — run \`adopt\` if it carries the protocol, \`init\` if it does not`)
    const plan = planInstall(optionsFromConfig(migrateConfig(readConfig(target))))
    console.log(describeStatus(installationStatus(lock, plan, (path, recorded) => fileState(target, path, recorded))))
    return
  }
  if (command === 'update') {
    const lock = readLock(target)
    if (!lock) throw new Error(`cairn: ${target} carries no cairn.lock.json — run \`adopt\` first`)
    const migrated = migrateConfig(readConfig(target))
    const errors = configErrors(migrated)
    if (errors.length) throw new Error(`cairn: the migrated configuration is invalid — ${errors.join('; ')}`)
    const plan = planInstall(optionsFromConfig(migrated))
    plan.files.set('cairn.config.json', Buffer.from(`${JSON.stringify(migrated, null, 2)}\n`, 'utf8'))
    const result = applyUpdate(target, plan, lock, { dryRun })
    console.log(describeStatus(result.status))
    console.log(`cairn — ${dryRun ? 'would update' : 'updated'} to release ${PROTOCOL_RELEASE}: ${result.written.length} written, ${result.deleted.length} deleted`)
    return
  }
  if (command === 'adopt') {
    const result = applyAdopt(target, { dryRun })
    console.log(`cairn — ${dryRun ? 'would adopt' : 'adopted'} ${target} at release ${PROTOCOL_RELEASE}: ${result.written.length} written, ${result.kept.length} host files kept`)
    for (const path of result.kept) console.log(`  kept     ${path} — yours; review it against the kit's`)
    for (const { path, why } of result.stale) console.log(`  stale    ${path} — ${why}`)
    if (!dryRun) console.log('next — run npm run cairn-check, read its findings, and commit the adoption as one unit')
    return
  }
  throw new Error('usage: cairn <init|status|update|adopt> [--target <dir>] [options]')
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('/cairn')) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
