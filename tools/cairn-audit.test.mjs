/**
 * Tests for the closing scaffolder — `npm test`.
 *
 * The review of one exact candidate is written where the transport keeps it:
 * the request's description on `pull-request`, a closing record in the path
 * folder on `manual-git`. The checker reads the second under `acceptance`;
 * this file pins the shapes the scaffolder produces and what "filled" means.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { REPO } from './cairn-config.mjs'
import { CLOSING_RECORD, METADATA_NAMESPACE, closingRecordIn, fillErrors, findingsSections } from './cairn-check.mjs'
import { PLACEHOLDER, QUESTIONS, closingTemplate, coherenceFacts, definitionItems, requestDescription, resolveAuditBranch } from './cairn-audit.mjs'

/** The ceiling a lead is held to, written here rather than imported: a test
 *  that measures against the implementation's own constant cannot catch the
 *  constant being wrong. Two characters of slack for the ellipsis and for the
 *  backtick that closes a span the cut opened. */
const CEILING = 112

const PATH = 'CP-EX-010'
const HEAD = 'a'.repeat(40)
const TRUNK = 'd'.repeat(40)
const fields = { pathId: PATH, branch: 'path/cp-ex-010', subjectCommit: HEAD, base: TRUNK, scopeRef: 'project/coding-paths/CP-EX-010/index.md#definition-of-done' }

/** A record shaped as the template writes one: items that wrap across lines,
 *  one of them long enough that reproducing it whole would bury the request. */
const RECORD = `# ${PATH}

## Goal

Do the thing.

## Definition of done

- [ ] \`tools/thing.mjs\` exists with its test: it reads the record and
      prints what it read.
- [x] The skill gains one sentence.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, a self-review in the five tags and a
      \`#### Review\` section carrying the fresh-context read of its diff.

## Opening acceptance

Nothing here.
`

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
  assert.ok(fillErrors(text, PLACEHOLDER).some((e) => e.startsWith('still carries the scaffold placeholder')))
})

test('the request description carries the same review, to paste', () => {
  const text = requestDescription(fields)
  assert.ok(text.includes(HEAD) && text.includes(TRUNK))
  for (const question of QUESTIONS) assert.ok(text.includes(question))
  assert.match(text, /--scope-digest project\/coding-paths\/CP-EX-010\/index\.md#definition-of-done/)
})

/** ADR-021 decision 2: the owner reads three plain lines and a link before any
 *  ledger. On the first adopter a request was read in twenty seconds and a
 *  merge came twenty-nine seconds after the request opened; a ledger is what
 *  they were reading. */
test('the description opens in the order the template gives, not with the ledger', () => {
  const text = requestDescription({ ...fields, items: definitionItems(RECORD) })
  const order = ['## What this path did', '## Definition of done, item by item', '## Candidate', '## Coherence', '## Advisories', '## Roles']
  let at = -1
  for (const heading of order) {
    const next = text.indexOf(heading)
    assert.notEqual(next, -1, `${heading} is missing`)
    assert.ok(next > at, `${heading} comes after what precedes it`)
    at = next
  }
  // The three lines and the link are the writer's to fill, and are marked as
  // such rather than left blank — an empty line reads as an answered one. The
  // markers are the request template's, so one shape serves both routes in.
  const opening = text.slice(0, text.indexOf('## Definition of done'))
  for (const marker of ['`<what the path did>`', '`<why it is the least>`', '`<what it does not do>`', 'Surface: `<the page a newcomer reads']) {
    assert.ok(opening.includes(marker), marker)
  }
  // Every blank is BACKTICKED, in the tool's output AND in the template beside
  // it. A bare `<unit>` matches an HTML open tag and the forge strips it when
  // it renders, leaving a blank that reads as an answered one — which is the
  // whole failure this section exists to end. The ledger's blanks are the
  // worst case: a stripped `<full object id>` leaves a candidate line naming
  // no candidate.
  const template = readFileSync(join(REPO, '.github/pull_request_template.md'), 'utf8')
  const bare = /(^|[^`])<[A-Za-z][^>]*>/
  assert.ok(!bare.test(text), 'no blank of the description is a bare angle-bracket tag')
  for (const line of template.split('\n')) {
    if (line.startsWith('<!--') || line.includes('-->')) continue
    assert.ok(!bare.test(line), `a bare angle-bracket blank in the template: ${line}`)
  }
  // This repository's template offers the same shape. The KIT's generated one
  // is the roadmap's row 4 and carries none of this yet, which is why the
  // claim is about this repository and not about every adopter.
  for (const marker of ['`<what the path did>`', '`<why it is the least>`', '`<what it does not do>`', '`<unit>`', '`<command or page>`']) {
    assert.ok(template.includes(marker), `the template and the tool offer one shape: ${marker}`)
  }
  assert.match(template, /prints this whole shape filled in/, 'the template says what the tool actually prints')
})

/** ADR-018 decision 2: one line per item, READ FROM THE RECORD, each with a
 *  place for the unit that advanced it and the command or page that shows it.
 *  Nothing ticks a box: the record's checkboxes are what the digest seals. */
test('the items come from the record, one line each, with room for the answer', () => {
  const items = definitionItems(RECORD)
  assert.equal(items.length, 3)
  assert.equal(items[0].n, 1)
  assert.match(items[0].lead, /^`tools\/thing\.mjs` exists with its test/)
  assert.ok(items[2].lead.endsWith('…'), 'a long item is led, not reproduced: the record holds it whole')
  assert.ok(items[2].lead.length <= CEILING, `${items[2].lead.length} characters`)
  assert.ok(items[2].lead.startsWith('Every completed step has one'), 'and it is led by the item\'s own first words')

  const text = requestDescription({ ...fields, items })
  const section = text.slice(text.indexOf('## Definition of done'), text.indexOf('## Candidate'))
  const lines = section.split('\n').filter((line) => line.startsWith('- item '))
  assert.equal(lines.length, 3)
  for (const line of lines) {
    assert.match(line, /— advanced by `<unit>` — shown by `<command or page>`$/)
  }
  // The ledger below keeps the reviewer placeholder the closing record on
  // `manual-git` is checked against; the two sections above it do not.
  assert.ok(!section.includes(PLACEHOLDER), 'the new sections carry the template\'s markers')
  assert.ok(text.slice(text.indexOf('## Candidate')).includes(PLACEHOLDER), 'and the ledger keeps its own')
  assert.ok(!section.includes('- [ ]') && !section.includes('- [x]'), 'nothing here ticks a box')
})

test('an item is led, and the lead is never left in a state the reader has to repair', () => {
  const item = (body) => definitionItems(`## Definition of done\n\n- [ ] ${body}\n`)[0].lead

  // No space in the first LEAD characters: `lastIndexOf` answers -1, and
  // `slice(0, -1)` would return the whole item minus its last character.
  const unbroken = `\`${'x'.repeat(200)}\` and then some words`
  const long = item(unbroken)
  assert.ok(long.length <= CEILING, `${long.length} characters`)
  assert.ok(long.startsWith('`xxxx'), 'a lead is the item\'s first characters, not an empty string that fits every bound')
  assert.ok(long.endsWith('…'), 'and it says it was cut')

  // Cut INSIDE a backtick span — the span has to reach past LEAD for the cut
  // to land in it, which a one-line command easily does. Left open, the next
  // backtick on the rendered line closes it around the writer's own blanks.
  const words = 'node tools/cairn-check.mjs --base origin/main --branch path/cp-ex-010 --subject aaaaaaa --scope-digest project/coding-paths/CP-EX-010/index.md#definition-of-done'
  assert.ok(words.length > CEILING, 'the span must outrun the cut for this case to be the case')
  const cut = item(`\`${words}\` then prose`)
  assert.ok(cut.length <= CEILING, `${cut.length} characters`)
  assert.ok(cut.startsWith('`node tools/cairn-check.mjs'))
  assert.equal((cut.match(/`/g) ?? []).length % 2, 0, `an unclosed span: ${cut}`)
  assert.ok(cut.endsWith('`…'), 'the span closes BEFORE the ellipsis: inside it, a cut command renders as a whole one')

  // A short item is not touched at all.
  assert.equal(item('Short and done.'), 'Short and done.')
})

test('the list is read as a list, and stops where the list stops', () => {
  const record = `## Definition of done

* [ ] A star bullet is a task-list bullet too.
+ [x] So is a plus.
- [ ] A wrapped item
      continues while it is indented.

This paragraph is not an item, and neither is the table under it.

| a | b |
| - | - |
`
  const items = definitionItems(record)
  assert.equal(items.length, 3, 'three bullets, whatever marker they used')
  assert.equal(items[2].lead, 'A wrapped item continues while it is indented.')
  assert.ok(!items[2].lead.includes('paragraph'), 'prose at column zero is not part of the item above it')
  assert.ok(!items[2].lead.includes('|'))
})

test('a nested checkbox belongs to its item, and a lazy wrap loses no item', () => {
  const nested = definitionItems(`## Definition of done

- [ ] The parent item.
  - [ ] A sub-checkbox the writer nested under it.
- [ ] The item after it.
`)
  assert.equal(nested.length, 2, 'nesting a list under an item does not add an item, and does not renumber the rest')
  assert.match(nested[0].lead, /parent item\. - \[ \] A sub-checkbox/)

  // Markdown's lazy continuation needs no indent. Ending the list on prose at
  // column zero would drop every item after such a wrap.
  const lazy = definitionItems(`## Definition of done

- [ ] An item wrapped
without any indent at all.
- [ ] The item after it.
- [ ] And the last one.
`)
  assert.equal(lazy.length, 3, 'an unindented wrap costs the lead a few words, never the items below it')
  assert.equal(lazy[2].lead, 'And the last one.')
})

test('a record with no definition of done says so rather than printing an empty section', () => {
  assert.deepEqual(definitionItems('# A record\n\n## Goal\n\nx\n'), [])
  const text = requestDescription({ ...fields, items: [] })
  assert.match(text, /## Definition of done, item by item/)
  assert.match(text, /no item was read from the record/)
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
  const hollowErrors = fillErrors(hollow)
  assert.equal(hollowErrors.length, 1)
  assert.ok(hollowErrors[0].startsWith('no findings section has been answered'))
  assert.deepEqual(fillErrors(record()), [], 'one answered question is enough: the rule asks whether the reviewer answered, never whether the answer is good')
})

test('the verdict must name an outcome from the stated vocabulary, and may qualify it', () => {
  assert.ok(fillErrors(record({ verdict: 'looks fine to me' })).some((e) => /names none of/.test(e)))
  const unnamed = fillErrors(record({ verdict: '' }))
  assert.equal(unnamed.length, 1)
  assert.ok(unnamed[0].startsWith('no `verdict:` in its frontmatter'))
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

/** ADR-042: the template writes plain items now, and every record accepted
 *  before keeps its boxes — both are read, the same way. */
test('a plain list is read as a boxed one is', () => {
  const plain = definitionItems(RECORD.replace(/^- \[[ x]\] /gm, '- '))
  assert.deepEqual(plain, definitionItems(RECORD))
  assert.equal(plain.length, 3)
  const nested = definitionItems('## Definition of done\n\n- The parent item.\n  - A sub-item nested under it.\n- The item after it.\n')
  assert.equal(nested.length, 2, 'a nested plain bullet belongs to its item, as a nested box does')
})

/** ADR-043: under each question, what the tool can see, as the reader's
 *  starting point — and the first line naming the reader (ADR-017 d4). */
test('the coherence section names its reader and scaffolds what the tool can see', () => {
  const running = (id, writes) => ({ front: { id, status: 'running' }, writes })
  const facts = coherenceFacts({
    pathId: PATH,
    changed: ['docs/adr/ADR-009-x.md', 'docs/architecture/02-page.md', 'tools/a.mjs'],
    paths: [running(PATH, ['tools/a.mjs']), running('CP-EX-011', ['tools/**']), running('CP-EX-012', ['site/**']),
      { front: { id: 'CP-EX-013', status: 'done' }, writes: ['tools/a.mjs'] }],
    decisions: 'docs/adr/',
    architecture: 'docs/architecture/'
  })
  assert.equal(facts.length, QUESTIONS.length)
  assert.match(facts[0], /`docs\/adr\/ADR-009-x\.md`/)
  assert.match(facts[1], /CP-EX-011/)
  assert.ok(!/CP-EX-012|CP-EX-013/.test(facts[1]), 'a path whose writes do not meet, or that is not running, is not named')
  assert.match(facts[2], /none/, 'an architecture page with a record beside it is not the fact')
  assert.equal(facts[3], null, 'the fourth is a judgement on meaning; the tool sees nothing for it')

  const alone = coherenceFacts({ pathId: PATH, changed: ['docs/architecture/02-page.md'], paths: [running(PATH, ['docs/**'])], decisions: 'docs/adr/', architecture: 'docs/architecture/' })
  assert.match(alone[0], /none/)
  assert.match(alone[1], /none/)
  assert.match(alone[2], /`docs\/architecture\/02-page\.md`/)

  const text = requestDescription({ ...fields, facts })
  const coherence = text.slice(text.indexOf('## Coherence'), text.indexOf('## Advisories'))
  assert.match(coherence, /^Read by `<a fresh context, and which kind \| the writer, with the reason no reader was obtainable and how long was waited>`\.$/m)
  assert.ok(coherence.indexOf('Read by') < coherence.indexOf('- [ ]'), 'the reader is named first')
  assert.ok(coherence.includes('`docs/adr/ADR-009-x.md`') && coherence.includes('CP-EX-011'))
  const closing = closingTemplate({ ...fields, facts })
  assert.ok(closing.includes('CP-EX-011'), 'the closing record on manual-git carries the same scaffold')
  // A hollowed-out scaffold with a verdict: the tool's facts must not read
  // as the answer the checker asks for.
  const verdict = closing.replace(`verdict: ${PLACEHOLDER}`, 'verdict: clean')
  const hollowed = verdict.replaceAll(PLACEHOLDER, '')
  assert.ok(fillErrors(hollowed).some((error) => /no findings section has been answered/.test(error)), fillErrors(hollowed).join('\n'))
  // Every question answered, the reader unnamed: the reader line alone holds
  // the placeholder the checker refuses.
  const answered = verdict.replaceAll(`\n\n${PLACEHOLDER}\n`, '\n\nAnswered.\n').replaceAll(`: ${PLACEHOLDER}\n`, ': filled\n')
  assert.equal(answered.split(PLACEHOLDER).length, 2, 'only the reader line is left unfilled')
  assert.ok(fillErrors(answered).some((error) => /placeholder/.test(error)), 'the reader line carries the placeholder the checker refuses')
})

/** ADR-041: a deferral names its file under the backlog. */
test('the advisories placeholder points a deferral at the backlog', () => {
  const advisories = (text) => text.slice(text.indexOf('## Advisories'))
  assert.match(advisories(requestDescription(fields)), /deferred[^.]*`project\/backlog\/`/)
  assert.match(advisories(closingTemplate(fields)), /deferred[^.]*`project\/backlog\/`/)
})
