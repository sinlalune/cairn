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
  INTEGRATION_TRANSPORT,
  METADATA_NAMESPACE,
  PATH_DIR,
  TRUNK_BASE_CANDIDATES,
  readFrontmatter
} from './cairn-check.mjs'
import { REPO, metadataOf } from './cairn-config.mjs'

export const PLACEHOLDER = 'TO BE FILLED BY THE REVIEWER'

export const QUESTIONS = [
  'Does the diff contradict an accepted decision?',
  'Does it duplicate something another running path is building?',
  'Did it introduce architecture that belongs in a decision record and has none?',
  'Is anything now documented in two places that will drift apart?'
]

/** The closing record on `manual-git`: acceptance fields and the review in
 *  one file, named after the candidate it binds. */
export function closingTemplate({ pathId, branch, subjectCommit, base, scopeRef }) {
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

${QUESTIONS.map((question) => `### ${question}\n\n${PLACEHOLDER}\n`).join('\n')}
## Advisories

Every advisory the checker raised at the candidate is listed in
\`advisories_at_candidate\`, and \`advisory_disposition\` carries one entry per
advisory: \`fixed\`, \`accepted\`, or \`deferred\` with an owner and a follow-up.

## Decision

Candidate accepted for administrative closure and exact integration.

*(verdict: clean · drift noted, proceeding · needs a conversation before merge)*
`
}

/** The request's description on `pull-request`: the same review, to paste. */
export function requestDescription({ pathId, subjectCommit, base, scopeRef }) {
  return `## Candidate

- path: ${pathId}
- candidate \`C\`: ${subjectCommit}
- base \`T\`, the trunk tip merged into the candidate: ${base}
- scope digest at \`C\`: \`node tools/cairn-check.mjs --scope-digest ${scopeRef}\` → ${PLACEHOLDER}; equals the opening acceptance: yes | no

## Coherence

${QUESTIONS.map((question) => `- [ ] ${question} ${PLACEHOLDER}`).join('\n')}

## Advisories at \`C\`

${PLACEHOLDER} — every advisory \`cairn-check\` raised at the candidate, each fixed, accepted, or deferred to a named owner and follow-up; or *none*.

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

/** The declaring record for a branch: the folder shape, and the flat one. */
function currentPath(branch) {
  const dir = join(REPO, PATH_DIR)
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.name.startsWith('CP-')) continue
    const file = entry.isDirectory() ? join(entry.name, 'index.md') : entry.name
    if (!file.endsWith('.md') || !existsSync(join(dir, file))) continue
    const front = metadataOf(readFrontmatter(readFileSync(join(dir, file), 'utf8'))?.data)
    if (front?.branch === branch) return { front, file: `${PATH_DIR}/${file}`, folder: entry.isDirectory() ? `${PATH_DIR}/${entry.name}` : null }
  }
  return null
}

function main() {
  const argv = process.argv
  const branch = resolveAuditBranch(argv, gitOrNull(['rev-parse', '--abbrev-ref', 'HEAD']) ?? 'HEAD')
  const path = currentPath(branch)
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
  const fields = { pathId: path.front.id, branch, subjectCommit: subject, base, scopeRef }

  if (INTEGRATION_TRANSPORT === 'pull-request') {
    console.log(requestDescription(fields))
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
