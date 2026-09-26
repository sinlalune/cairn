#!/usr/bin/env node
/**
 * cairn-audit — scaffold the closing review of one exact candidate.
 *
 * Removing the integrator removed the person who noticed two paths drifting
 * apart architecturally. The owner's answer was to delegate the noticing to
 * whoever reviews the candidate, with four questions that a deterministic
 * gate cannot answer and a human or an agent can.
 *
 * Where the answers are written is the transport's business:
 *
 *   pull-request   the request's description IS the review, and its approval
 *                  the closing acceptance. This command prints the description
 *                  to paste, with the candidate, the base and the questions
 *                  filled in; a forge that carries the kit's request template
 *                  offers the same shape by itself.
 *   manual-git     one closing record in the path folder, `closing-<C>.md`,
 *                  carrying the acceptance fields and the same questions. This
 *                  command scaffolds it; the checker reads it under `acceptance`.
 *
 * The judgement is never machine-scored. What the checker proves on manual-git
 * is that the record names exactly C, its fields are present, it names a
 * verdict from the stated vocabulary and answers at least one of its own
 * questions — a missing record, an untouched scaffold and a hollowed-out one
 * must not look the same.
 *
 *   node tools/cairn-audit.mjs [--subject <C>] [--branch path/<id>]
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ADR_DIR,
  INTEGRATION_TRANSPORT,
  METADATA_NAMESPACE,
  PATH_DIR,
  PROJECT_DIR,
  TRUNK_BASE_CANDIDATES,
  parseWrites,
  readFrontmatter,
  resolveScopeSection,
  writesOverlaps
} from './cairn-check.mjs'
import { REPO, installedConfig, metadataOf, slash } from './cairn-config.mjs'

export const PLACEHOLDER = 'TO BE FILLED BY THE REVIEWER'

/** ADR-017 decision 4: the section's first line names who read it. */
export const READER = 'Read by `<a fresh context, and which kind | the writer, with the reason no reader was obtainable and how long was waited>`.'

/** ADR-041: where a deferral points. */
const DEFERRED = `each fixed, accepted, or deferred with its owner and a follow-up file under \`${slash(PROJECT_DIR)}backlog/\``

export const QUESTIONS = [
  'Does the diff contradict an accepted decision?',
  'Does it duplicate something another running path is building?',
  'Did it introduce architecture that belongs in a decision record and has none?',
  'Is anything now documented in two places that will drift apart?'
]

/** How much of an item leads its line. The record holds the item whole and the
 *  digest seals it there; a request that reproduced eight paragraphs would bury
 *  the three plain lines the owner is meant to read first. */
const LEAD = 110

/**
 * The items of a record's definition of done, in order, each led by enough of
 * its own words to be recognised — a plain `-` item as the template writes it
 * since ADR-042, or a boxed one as every record accepted before keeps it.
 *
 * ADR-018 decision 2: the request answers the definition of done ITEM BY ITEM,
 * and the lines are printed FROM THE RECORD for the writer to fill. Nothing
 * here ticks a box — the record's checkboxes stay as the digest sealed them,
 * and what the writer fills is beside them, in the description.
 *
 * Pure: the caller supplies the record's text.
 */
export function definitionItems(text) {
  const section = resolveScopeSection(String(text ?? ''), '#definition-of-done')
  if (!section) return []
  const items = []
  for (const line of section.split('\n')) {
    const opening = /^(\s*)[-*+]\s+(?:\[[ xX]\]\s*)?(.*)$/.exec(line)
    // An INDENTED checkbox is a sub-item of the one above it, not a sibling:
    // the writer who nests a list under an item did not add an item to the
    // definition of done, and promoting it would renumber every item after it.
    if (opening && !(opening[1] && items.length)) {
      items.push(opening[2])
      continue
    }
    if (!line.trim() || line.startsWith('#')) continue
    if (!items.length) continue
    // Indented, so it is this item wrapped or nested under it. Prose or a
    // table at column zero is SKIPPED, not joined and not a stop: markdown's
    // lazy continuation needs no indent, so a record that wraps without one
    // would lose every item after the wrap if this ended the list.
    if (/^\s/.test(line)) items[items.length - 1] += ` ${line.trim()}`
  }
  return items.map((item, index) => ({ n: index + 1, lead: leadOf(item) }))
}

/** The first words of an item, cut so the request stays readable. */
function leadOf(item) {
  const whole = item.replace(/\s+/g, ' ').trim()
  if (whole.length <= LEAD) return whole
  // Cut on a word where there is one. `lastIndexOf` answers -1 for an item
  // whose first LEAD characters hold no space — a long backticked path is the
  // real case — and `slice(0, -1)` would then return the whole item minus its
  // last character, which is the opposite of a lead.
  const space = whole.lastIndexOf(' ', LEAD)
  const body = whole.slice(0, space === -1 ? LEAD : space)
  // A cut inside a backtick span leaves the span open, and the next backtick
  // on the rendered line closes it around the writer's own blanks — so the
  // places they are meant to fill disappear into a code span. The repair goes
  // BEFORE the ellipsis: inside it, a truncated command would render as a
  // whole one, which is the lead reading as a thing it is not.
  return (body.match(/`/g)?.length ?? 0) % 2 ? `${body}\`…` : `${body}…`
}

/**
 * ADR-043: under each coherence question, what this tool can see — the
 * decision records the diff touches, the running paths whose `writes:` meet
 * this path's, the architecture pages changed with no record beside them (the
 * fact `decision-drift` computes). The reader's starting point, never its
 * answer; the fourth question is a judgement on meaning and gets nothing.
 */
export function coherenceFacts({ pathId, changed = [], paths = [], decisions, architecture }) {
  const list = (files) => files.map((file) => `\`${file}\``).join(', ')
  const records = changed.filter((file) => file.startsWith(decisions))
  const pages = records.length ? [] : changed.filter((file) => file.startsWith(architecture))
  const meets = writesOverlaps(paths).filter(({ paths: pair }) => pair.includes(pathId))
    .map(({ paths: pair, patterns }) => `${pair.find((id) => id !== pathId)} (${patterns.join(', ')})`)
  return [
    `the decision records the diff touches: ${records.length ? list(records) : 'none'}`,
    `the running paths whose \`writes:\` meet this path's: ${meets.length ? meets.join('; ') : 'none'}`,
    `the architecture pages the diff changed with no record beside them: ${pages.length ? list(pages) : 'none'}`,
    null
  ]
}

/** A question with the tool's fact under it, as the reader starts from it. */
const seen = (fact) => (fact ? `*seen by \`cairn-audit\`: ${fact}*` : null)

/** The closing record on `manual-git`: acceptance fields and the review in
 *  one file, named after the candidate it binds. */
export function closingTemplate({ pathId, branch, subjectCommit, base, scopeRef, facts = [] }) {
  return `---
type: Cairn Closing Record
title: ${pathId} — closing of ${subjectCommit.slice(0, 7)}
timestamp: ${new Date().toISOString()}
${METADATA_NAMESPACE}:
  path: ${pathId}
  branch: ${branch}
  subject_commit: ${subjectCommit}
  base: ${base}
  accepted_by: ${PLACEHOLDER}
  accepted_roles: [reviewer]
  accepted_at: ${PLACEHOLDER}
  decision: accepted
  scope_ref: ${scopeRef}
  scope_digest: ${PLACEHOLDER}
  advisories_at_candidate: []
  advisory_disposition: []
  verdict: ${PLACEHOLDER}
---

# ${pathId} — closing of ${subjectCommit.slice(0, 7)}

The review of exactly \`${subjectCommit}\`, read against the documents pinned in
\`governs:\` at their pinned ids and against every path running beside it. The
judgement here is not a machine verdict; that this record names the candidate,
answers its questions and carries the acceptance is what the checker proves.

## Findings

Read by ${PLACEHOLDER} — a fresh context, and which kind, or the writer, with the reason no reader was obtainable and how long was waited.
${facts.some(Boolean) ? `
What \`cairn-audit\` saw, for the reader to start from — above the questions, so
no fact reads as an answer:

${facts.map((fact, at) => fact && `- *${QUESTIONS[at]}* ${fact}`).filter(Boolean).join('\n')}
` : ''}
${QUESTIONS.map((question) => `### ${question}\n\n${PLACEHOLDER}\n`).join('\n')}
## Advisories

Every advisory the checker raised at the candidate is listed in
\`advisories_at_candidate\`, and \`advisory_disposition\` carries one entry per
advisory, ${DEFERRED}.

## Decision

Candidate accepted for administrative closure and exact integration.

*(verdict: clean · drift noted, proceeding · needs a conversation before merge)*
`
}

/**
 * The request's description on `pull-request`: the same review, to paste.
 *
 * The order is the template's, and it is the order the OWNER reads in (ADR-021
 * decision 2): what the path did, why it is the least, what it does not do,
 * and the page a newcomer opens for the surface it changed — then the
 * definition of done item by item (ADR-018 decision 2) — and only then the
 * ledger the checker's twin reads. On the first adopter a request was read in
 * twenty seconds and a merge came twenty-nine seconds after the request
 * opened; what was there to read was a ledger.
 *
 * The blanks of the two new sections are THIS REPOSITORY's request template's
 * markers rather than the reviewer placeholder below, because a line that is
 * mostly boilerplate is a line nobody reads. They are backticked: a bare
 * `<unit>` matches an HTML open tag, and the forge's sanitiser strips it from
 * the rendered description — leaving a blank that reads as an answered one,
 * which is the failure this section exists to end. The kit's generated
 * template carries the same sections.
 */
export function requestDescription({ pathId, subjectCommit, base, scopeRef, items = [], facts = [] }) {
  return `## What this path did

- \`<what the path did>\`
- \`<why it is the least>\`
- \`<what it does not do>\`

Surface: \`<the page a newcomer reads for the surface this path changed, or the README section>\`

## Definition of done, item by item

${items.length === 0
  ? `*no item was read from the record — check that \`${scopeRef}\` still names a \`## Definition of done\` section*`
  : items.map(({ n, lead }) => `- item ${n} — ${lead} — advanced by \`<unit>\` — shown by \`<command or page>\``).join('\n')}

## Candidate

- path: ${pathId}
- candidate \`C\`: ${subjectCommit}
- base \`T\`, the trunk tip merged into the candidate: ${base}
- scope digest at \`C\`: \`node tools/cairn-check.mjs --scope-digest ${scopeRef}\` → ${PLACEHOLDER}; equals the opening acceptance: yes | no

## Coherence

${READER}

${QUESTIONS.map((question, at) => `- [ ] ${question} ${PLACEHOLDER}${facts[at] ? `\n  ${seen(facts[at])}` : ''}`).join('\n')}

## Advisories at \`C\`

${PLACEHOLDER} — every advisory \`cairn-check\` raised at the candidate, ${DEFERRED}; or *none*.

## Roles

- reviewer: ${PLACEHOLDER}, holding the roles ${PLACEHOLDER} on this path
`
}

export function resolveAuditBranch(argv, gitBranch) {
  const at = argv.indexOf('--branch')
  return at === -1 ? gitBranch : argv[at + 1]
}

function git(args) {
  return execFileSync('git', args, { cwd: REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function gitOrNull(args) {
  try { return git(args) } catch { return null }
}

/** Every path record, in the folder shape and the flat one, with its writes. */
function allPaths() {
  const dir = join(REPO, PATH_DIR)
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.name.startsWith('CP-'))
    .map((entry) => ({ entry, file: entry.isDirectory() ? join(entry.name, 'index.md') : entry.name }))
    .filter(({ file }) => file.endsWith('.md') && existsSync(join(dir, file)))
    .map(({ entry, file }) => {
      const text = readFileSync(join(dir, file), 'utf8')
      return { front: metadataOf(readFrontmatter(text)?.data), text, writes: parseWrites(text), file: `${PATH_DIR}/${file}`, folder: entry.isDirectory() ? `${PATH_DIR}/${entry.name}` : null }
    })
}

function main() {
  const argv = process.argv
  const branch = resolveAuditBranch(argv, gitOrNull(['rev-parse', '--abbrev-ref', 'HEAD']) ?? 'HEAD')
  const paths = allPaths()
  const path = paths.find(({ front }) => front?.branch === branch)
  if (!path) {
    // Not an error: a review only has meaning on a path branch, and the first
    // thing a newcomer does with a documented command is run it on the trunk.
    console.log(`cairn-audit — nothing to review: "${branch}" is not a path branch`)
    process.exit(0)
  }
  const subject = argv.includes('--subject') ? argv[argv.indexOf('--subject') + 1] : git(['rev-parse', 'HEAD'])
  const trunk = TRUNK_BASE_CANDIDATES.find((ref) => gitOrNull(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`]))
  const base = trunk ? gitOrNull(['merge-base', trunk, subject]) ?? 'unresolved' : 'unresolved'
  const scopeRef = `${path.file}#definition-of-done`
  const changed = base === 'unresolved' ? [] : (gitOrNull(['diff', '--name-only', base, subject]) ?? '').split('\n').filter(Boolean)
  const facts = coherenceFacts({
    pathId: path.front.id,
    changed,
    paths,
    decisions: slash(ADR_DIR),
    architecture: slash(installedConfig().roots.architecture)
  })
  const fields = { pathId: path.front.id, branch, subjectCommit: subject, base, scopeRef, facts }

  if (INTEGRATION_TRANSPORT === 'pull-request') {
    // Only here: the closing record on `manual-git` carries the four questions
    // and no item-by-item section — ADR-018 decision 2 is about the request's
    // description, and parsing the record for the other transport would be
    // work whose output nothing prints.
    console.log(requestDescription({ ...fields, items: definitionItems(path.text) }))
    return
  }
  if (!path.folder) {
    console.error(`cairn-audit — ${path.file} is a flat record; a closing record needs the one-folder shape`)
    process.exit(1)
  }
  const file = `${path.folder}/closing-${subject}.md`
  if (existsSync(join(REPO, file))) {
    console.log(`cairn-audit — ${file} already exists`)
    return
  }
  mkdirSync(join(REPO, path.folder), { recursive: true })
  writeFileSync(join(REPO, file), closingTemplate(fields), 'utf8')
  console.log(`cairn-audit — scaffolded ${file}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}
