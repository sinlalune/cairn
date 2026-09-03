/**
 * Tests for the closing scaffolder — `npm test`.
 *
 * The review of one exact candidate is written where the transport keeps it:
 * the request's description on `pull-request`, a closing record in the path
 * folder on `manual-git`. The checker reads the second under `acceptance`;
 * this file pins the shapes the scaffolder produces and what "filled" means.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CLOSING_RECORD, METADATA_NAMESPACE, closingRecordIn, fillErrors, findingsSections } from './cairn-check.mjs'
import { PLACEHOLDER, QUESTIONS, closingTemplate, requestDescription, resolveAuditBranch } from './cairn-audit.mjs'

const PATH = 'CP-EX-010'
const HEAD = 'a'.repeat(40)
const TRUNK = 'd'.repeat(40)
const fields = { pathId: PATH, branch: 'path/cp-ex-010', subjectCommit: HEAD, base: TRUNK, scopeRef: 'project/coding-paths/CP-EX-010/index.md#definition-of-done' }

test('the host-resolved branch overrides detached HEAD', () => {
  assert.equal(resolveAuditBranch(['node', 'audit', '--branch', 'path/cp-ex-010'], 'HEAD'), 'path/cp-ex-010')
  assert.equal(resolveAuditBranch(['node', 'audit'], 'path/local'), 'path/local')
})

test('a closing record is named after the candidate it binds, and only one shape is one', () => {
  assert.ok(CLOSING_RECORD.test(`closing-${HEAD}.md`))
  assert.ok(CLOSING_RECORD.test(`closing-${'b'.repeat(64)}.md`))
  assert.ok(!CLOSING_RECORD.test('closing-abc1234.md'), 'a prefix is never a candidate identity')
  assert.ok(!CLOSING_RECORD.test('closing.md'))
  const files = ['index.md', `closing-${'b'.repeat(40)}.md`, `closing-${HEAD}.md`, 'plan.md']
  assert.equal(closingRecordIn(files, 'p', HEAD), `p/closing-${HEAD}.md`)
  assert.equal(closingRecordIn(files, 'p', 'c'.repeat(40)), null, 'a record naming another candidate does not satisfy this one')
  assert.equal(closingRecordIn(files, 'p'), `p/closing-${'b'.repeat(40)}.md`, 'without a subject, the latest by name')
  assert.equal(closingRecordIn(['index.md'], 'p'), null)
})

test('the scaffold binds the exact path, branch, candidate and base, and is not yet a review', () => {
  const text = closingTemplate(fields)
  const front = text.slice(0, text.indexOf('\n---', 4))
  assert.match(front, new RegExp(`^${METADATA_NAMESPACE}:$`, 'm'))
  assert.match(front, /^  subject_commit: a{40}$/m)
  assert.match(front, /^  base: d{40}$/m)
  assert.match(front, /^  path: CP-EX-010$/m)
  assert.match(front, /^  scope_ref: project\/coding-paths\/CP-EX-010\/index\.md#definition-of-done$/m)
  for (const question of QUESTIONS) assert.ok(text.includes(`### ${question}`))
  assert.ok(fillErrors(text, PLACEHOLDER).includes('still carries the scaffold placeholder'))
})

test('the request description carries the same review, to paste', () => {
  const text = requestDescription(fields)
  assert.ok(text.includes(HEAD) && text.includes(TRUNK))
  for (const question of QUESTIONS) assert.ok(text.includes(question))
  assert.match(text, /--scope-digest project\/coding-paths\/CP-EX-010\/index\.md#definition-of-done/)
})

/** A record with the shape the template produces, parameterised where the
 *  rule looks. */
function record({ verdict = 'clean', answers = ['No.', '', '', ''] } = {}) {
  return `---
type: Cairn Closing Record
title: ${PATH} — closing
timestamp: 2026-08-25T00:00:00.000Z
${METADATA_NAMESPACE}:
  path: ${PATH}
  subject_commit: ${HEAD}
  verdict: ${verdict}
---

# Closing

## Findings

${QUESTIONS.map((q, i) => `### ${q}\n\n${answers[i]}\n`).join('\n')}
## Decision

**${verdict}**
`
}

test('a hollowed-out record — placeholder deleted, nothing written — does not count', () => {
  const hollow = record({ answers: ['', '', '', ''] })
  assert.ok(!hollow.includes(PLACEHOLDER))
  assert.deepEqual(fillErrors(hollow), ['no findings section has been answered'])
  assert.deepEqual(fillErrors(record()), [], 'one answered question is enough: the rule asks whether the reviewer answered, never whether the answer is good')
})

test('the verdict must name an outcome from the stated vocabulary, and may qualify it', () => {
  assert.ok(fillErrors(record({ verdict: 'looks fine to me' })).some((e) => /names none of/.test(e)))
  assert.deepEqual(fillErrors(record({ verdict: '' })), ['no `verdict:` in its frontmatter'])
  for (const stated of ['clean', 'Clean', 'drift noted, proceeding', 'drift noted, repaired before merge', 'needs a conversation before merge']) {
    assert.deepEqual(fillErrors(record({ verdict: stated })), [], stated)
  }
})

test('findingsSections reads only the Findings block', () => {
  const sections = findingsSections(record({ answers: ['No.', 'No.', 'No.', 'No.'] }))
  assert.equal(sections.length, 4)
  assert.equal(sections[0].heading, QUESTIONS[0])
  assert.equal(sections[0].body, 'No.')
  assert.ok(!sections.some((s) => s.body.includes('**No.**')))
  assert.deepEqual(findingsSections('# a record with no Findings section at all'), [])
})
