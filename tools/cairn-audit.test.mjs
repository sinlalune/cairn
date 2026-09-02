/**
 * Tests for the coherence-audit record — `npm test`.
 *
 * A closing audit names the exact implementation candidate. The administrative
 * closure commit contains the record without changing that subject. Since
 * Cairn 1.0 the audit is checked under `acceptance`; this file pins the
 * scaffolder and the record shape that check reads.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { METADATA_NAMESPACE } from './cairn-check.mjs'
import {
  auditBindingErrors,
  auditName,
  auditPathRecordFiles,
  auditTemplate,
  fillErrors,
  findAudit,
  findingsSections,
  isFilled,
  resolveAuditBranch
} from './cairn-audit.mjs'

const PATH = 'CP-EX-010'
const HEAD = 'a'.repeat(40)
const PARENT = 'b'.repeat(40)
const TRUNK = 'd'.repeat(40)

const files = [auditName(PATH, HEAD), auditName(PATH, PARENT)]

test('audit path discovery sees flat and born-sliced records', () => {
  const entries = [
    { name: 'CP-FLAT.md', isDirectory: () => false },
    { name: 'CP-SLICED', isDirectory: () => true },
    { name: 'README.md', isDirectory: () => false }
  ]
  assert.deepEqual(auditPathRecordFiles(entries), ['CP-FLAT.md', 'CP-SLICED/index.md'])
  assert.deepEqual(auditPathRecordFiles(entries, (file) => file !== 'CP-SLICED/index.md'), ['CP-FLAT.md'])
})

test('the host-resolved branch overrides detached HEAD for audit checks', () => {
  assert.equal(resolveAuditBranch(['node', 'audit', '--branch', 'path/cp-ex-010'], 'HEAD'), 'path/cp-ex-010')
  assert.equal(resolveAuditBranch(['node', 'audit'], 'path/local'), 'path/local')
})

test('a record naming an earlier path commit does not satisfy the exact candidate', () => {
  assert.equal(findAudit([auditName(PATH, PARENT)], HEAD, PATH), undefined)
})

test('a record naming the exact candidate satisfies the check', () => {
  assert.equal(findAudit(files, HEAD, PATH), auditName(PATH, HEAD))
})

test('a commit outside this path proves nothing', () => {
  assert.equal(findAudit([auditName(PATH, TRUNK)], HEAD, PATH), undefined)
})

test('another path record is refused even when the sha matches', () => {
  assert.equal(findAudit([auditName('CP-EX-011', HEAD)], HEAD, PATH), undefined)
  assert.equal(findAudit([], HEAD, PATH), undefined)
  assert.equal(findAudit(files, HEAD.slice(0, 7), PATH), undefined)
})

test('a record naming a commit no branch contains any more is refused', () => {
  assert.equal(findAudit([auditName(PATH, 'e'.repeat(40))], HEAD, PATH), undefined)
})

test('a record naming a valid commit but still a scaffold does not count', () => {
  const scaffold = auditTemplate({ pathId: PATH, branch: 'path/cp-ex-010', subjectCommit: HEAD, base: TRUNK })
  assert.equal(isFilled(scaffold), false)
  assert.ok(fillErrors(scaffold).includes('still carries the scaffold placeholder'))
})

test('the audit frontmatter must bind the exact path, branch and full candidate', () => {
  const text = auditTemplate({ pathId: PATH, branch: 'path/cp-ex-010', subjectCommit: HEAD, base: TRUNK })
  assert.deepEqual(auditBindingErrors(text, { pathId: PATH, branch: 'path/cp-ex-010', subjectCommit: HEAD, baseCommit: TRUNK }), [])
  assert.equal(auditBindingErrors(text, { pathId: 'CP-OTHER', branch: 'path/cp-other', subjectCommit: PARENT }).length, 3)
  assert.ok(auditBindingErrors(text, { pathId: PATH, branch: 'path/cp-ex-010', subjectCommit: HEAD, baseCommit: PARENT })
    .some((error) => error.includes(`${METADATA_NAMESPACE}.base`)))
})

/** A record with the shape the template produces, parameterised where the
 *  rule looks. "Filled" once meant "the placeholder string is absent", which
 *  measured a DELETION rather than an audit. */
function record({ verdict = 'clean', answers = ['No.', '', '', ''] } = {}) {
  const questions = [
    'Does the diff contradict an accepted decision?',
    'Does it duplicate something another running path is building?',
    'Did it introduce architecture that belongs in an ADR and has none?',
    'Is anything now documented in two places that will drift apart?'
  ]
  return `---
type: Cairn Coherence Audit
title: Coherence audit — ${PATH}
timestamp: 2026-08-25T00:00:00.000Z
${METADATA_NAMESPACE}:
  path: ${PATH}
  branch: path/cp-ex-010
  subject_commit: ${HEAD}
  base: ${TRUNK}
  verdict: ${verdict}
---

# Coherence audit

## What to read

- the candidate diff for this branch, against the trunk it will land on

## Findings

${questions.map((q, i) => `### ${q}\n\n${answers[i]}\n`).join('\n')}
## Verdict

**${verdict}**
`
}

test('a hollowed-out record — placeholder deleted, nothing written — does not count', () => {
  const hollow = record({ answers: ['', '', '', ''] })
  assert.ok(!hollow.includes('TO BE FILLED BY THE AUDITING AGENT'))
  assert.equal(isFilled(hollow), false)
  assert.deepEqual(fillErrors(hollow), ['no findings section has been answered'])
  assert.equal(isFilled(record()), true)
})

test('the verdict must name an outcome from the stated vocabulary', () => {
  assert.equal(isFilled(record({ verdict: 'looks fine to me' })), false)
  assert.equal(isFilled(record({ verdict: '' })), false)
  assert.deepEqual(fillErrors(record({ verdict: '' })), ['no `verdict:` in its frontmatter'])
  for (const stated of ['clean', 'drift noted, proceeding', 'needs a conversation before merge']) {
    assert.equal(isFilled(record({ verdict: stated })), true, stated)
  }
})

test('a verdict may QUALIFY one of the three, because a real record does', () => {
  assert.equal(isFilled(record({ verdict: 'drift noted, repaired before merge' })), true)
  assert.equal(isFilled(record({ verdict: 'Clean' })), true)
})

test('findingsSections reads only the Findings block', () => {
  const sections = findingsSections(record({ answers: ['No.', 'No.', 'No.', 'No.'] }))
  assert.equal(sections.length, 4)
  assert.equal(sections[0].heading, 'Does the diff contradict an accepted decision?')
  assert.equal(sections[0].body, 'No.')
  assert.ok(!sections.some((s) => s.body.includes('**No.**')))
  assert.deepEqual(findingsSections('# a record with no Findings section at all'), [])
})
