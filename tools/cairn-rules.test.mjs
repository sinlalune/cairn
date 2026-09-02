/**
 * Tests for cairn-rules — `npm test`.
 *
 * Pins the live rule table generator against drift, missed rules, and
 * malformed Markdown tables — and pins the 1.0 inventory itself, so a rule
 * added or removed without a decision fails here first.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  conformanceLinkage,
  extractRules,
  generateLinkageTable,
  linkageIn,
  generateMarkdownTable,
  RULE_CONFORMANCE,
  RULES_OUTSIDE_CONFORMANCE,
  RULE_METADATA,
  SPEC_FILE,
  spliceTable,
  TABLE_BEGIN,
  TABLE_END,
  tableIn
} from './cairn-rules.mjs'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CHECK = join(REPO, 'tools/cairn-check.mjs')

const MOCK_SOURCE = `
function evaluate() {
  add('blocking', 'branch-path', 'error message')
  add('advisory', 'scope-drift', 'warning message')
  add('blocking', 'invented-rule', 'new rule')
}
function corpusFindings() {
  findings.push({ level: 'blocking', rule: 'schema', message: 'schema error' })
}
`

test('cairn-rules: extracts rules from evaluate and corpusFindings', () => {
  assert.deepEqual(extractRules(MOCK_SOURCE), [
    { name: 'branch-path', level: 'blocking', scope: 'diff' },
    { name: 'scope-drift', level: 'advisory', scope: 'diff' },
    { name: 'invented-rule', level: 'blocking', scope: 'diff' },
    { name: 'schema', level: 'blocking', scope: 'corpus' }
  ])
})

test('cairn-rules: a rule present in source but absent in metadata emits TBD, not dropped', () => {
  const table = generateMarkdownTable(MOCK_SOURCE)
  assert.match(table, /`invented-rule`/)
  assert.match(table, /\|\s*\*\*Blocking\*\*\s*\|\s*`invented-rule`\s*\|\s*diff\s*\|\s*TBD\s*\|\s*`TBD`\s*\|/)
})

test('cairn-rules: a rule removed from source disappears from the table', () => {
  const table = generateMarkdownTable(`function evaluate() { add('blocking', 'branch-path', 'msg') }`)
  assert.match(table, /`branch-path`/)
  assert.doesNotMatch(table, /`scope-drift`/)
  assert.doesNotMatch(table, /`schema`/)
})

test('cairn-rules: emitted table rows have exact 5 columns and no unescaped inner pipes', () => {
  RULE_METADATA['pipe-rule'] = { condition: 'A | B option', enforcing: "x === 'a' || 'b'" }
  const table = generateMarkdownTable(`function evaluate() { add('advisory', 'pipe-rule', 'msg') }`)
  for (const row of table.trim().split('\n').slice(2)) {
    const unescapedPipeCount = (row.replace(/\\\|/g, '').match(/\|/g) || []).length
    assert.equal(unescapedPipeCount, 6, `Row must have 5 columns (6 delimiter pipes): ${row}`)
  }
  delete RULE_METADATA['pipe-rule']
})

/* ------------------------------------------------------------------ *
 * The 1.0 inventory. Roughly thirty-nine names became twenty-four: nineteen
 * that block and five that only report. A change to this list is a change
 * to the protocol's enforcement and is made on purpose, in a unit that
 * regenerates the catalogue and rewrites the matrix row.
 * ------------------------------------------------------------------ */

const BLOCKING_1_0 = [
  'acceptance', 'acceptance-drift', 'branch-path', 'concept-orphan', 'derived-view',
  'journal-entry', 'links', 'path-history', 'provisional', 'rebase', 'record-integrity',
  'registration', 'registration-base', 'route', 'schema', 'scope-digest', 'scope-drift',
  'transition', 'work-unit'
]
const ADVISORY_ONLY_1_0 = ['concept-growth', 'decision-drift', 'record-date', 'redaction', 'remote-checkpoint']

test('cairn-rules: the checker implements the Cairn 1.0 rule set and nothing else', () => {
  const rules = extractRules(readFileSync(CHECK, 'utf8'))
  const names = [...new Set(rules.map((r) => r.name))].sort()
  const blocking = [...new Set(rules.filter((r) => r.level === 'blocking').map((r) => r.name))].sort()
  assert.deepEqual(blocking, BLOCKING_1_0)
  assert.deepEqual(names.filter((n) => !blocking.includes(n)), ADVISORY_ONLY_1_0)
  assert.equal(names.length, 24)
  // The names the cut retired must stay retired, whatever a comment says.
  for (const gone of [
    'checkpoint-retention', 'migration-debt', 'ledger-size', 'brief-schema', 'base-parity',
    'single-truth', 'path-staleness', 'closure-surface', 'advisory-disposition', 'coherence-audit',
    'role-collapse', 'same-work-unit', 'area-note', 'branch-identity', 'opening-ceremony'
  ]) assert.ok(!names.includes(gone), `${gone} was retired or folded and must not be re-emitted`)
})

test('cairn-rules: every 1.0 rule has metadata, and no metadata names a rule that is gone', () => {
  const names = new Set([...BLOCKING_1_0, ...ADVISORY_ONLY_1_0])
  for (const name of names) assert.ok(RULE_METADATA[name], `${name} has no catalogue metadata`)
  for (const name of Object.keys(RULE_METADATA)) assert.ok(names.has(name), `${name} has metadata but no rule`)
  assert.deepEqual(Object.keys(RULES_OUTSIDE_CONFORMANCE), [], 'every 1.0 rule stands behind a stated requirement')
  for (const name of names) assert.ok(RULE_CONFORMANCE[name], `${name} stands behind no conformance row`)
})

/* ------------------------------------------------------------------ *
 * The shipped conformance page must carry the GENERATED catalogue and linkage
 * ------------------------------------------------------------------ */

test('cairn-rules: the conformance page ships the current catalogue', () => {
  const doc = readFileSync(join(REPO, SPEC_FILE), 'utf8')
  const shipped = tableIn(doc)
  assert.ok(shipped, `${SPEC_FILE} has no ${TABLE_BEGIN} / ${TABLE_END} splice point`)
  const current = generateMarkdownTable(readFileSync(CHECK, 'utf8'))
  assert.equal(shipped, current.trim(), `${SPEC_FILE} is out of date — run \`npm run cairn-rules -- --write\``)
})

test('cairn-rules: splicing replaces only what is between the markers', () => {
  const doc = `before\n${TABLE_BEGIN}\nold table\n${TABLE_END}\nafter\n`
  const out = spliceTable(doc, 'new table')
  assert.equal(out, `before\n${TABLE_BEGIN}\nnew table\n${TABLE_END}\nafter\n`)
  assert.equal(tableIn(out), 'new table')
  assert.throws(() => spliceTable('no markers here', 'x'), /splice point/)
  assert.equal(tableIn('no markers here'), null)
})

test('cairn-rules: a conditional level yields BOTH levels, not the literal one', () => {
  const source = `
    add(exempt ? 'advisory' : 'blocking', 'scope-digest', 'x')
    add(legacyRecord ? 'advisory' : 'blocking', 'acceptance', 'y')
    add('blocking', 'rebase', 'z')
  `
  const rules = extractRules(source)
  const levels = (name) => rules.filter((r) => r.name === name).map((r) => r.level).sort()
  assert.deepEqual(levels('scope-digest'), ['advisory', 'blocking'])
  assert.deepEqual(levels('acceptance'), ['advisory', 'blocking'])
  assert.deepEqual(levels('rebase'), ['blocking'])
})

test('cairn-rules: every implemented rule is mapped to a requirement or declared outside one', () => {
  const linkage = conformanceLinkage(extractRules(readFileSync(CHECK, 'utf8')), readFileSync(join(REPO, SPEC_FILE), 'utf8'))
  assert.deepEqual(linkage.unaccounted, [], 'a new rule must be mapped to a conformance row or declared as standing behind none')
  assert.deepEqual(linkage.bothWays, [])
  assert.deepEqual(linkage.missingRows, [], 'a mapped row title no longer appears in the matrix — renaming a row must not orphan its rules')
  assert.deepEqual(linkage.phantomRules, [], 'the map names a rule the checker does not implement')
})

test('cairn-rules: the generated linkage on the conformance page is current', () => {
  const check = readFileSync(CHECK, 'utf8')
  const spec = readFileSync(join(REPO, SPEC_FILE), 'utf8')
  assert.equal(linkageIn(spec), generateLinkageTable(check, spec).trim(),
    'run `npm run cairn-rules -- --write` — the shipped linkage has drifted from the checker')
})

test('cairn-rules: a renamed conformance row breaks the build rather than orphaning its rules', () => {
  const check = readFileSync(CHECK, 'utf8')
  const spec = readFileSync(join(REPO, SPEC_FILE), 'utf8')
  const row = 'Redaction names the record that authorised it'
  const renamed = spec.replace(`| ${row} |`, '| Redaction ritual |')
  assert.notEqual(renamed, spec, 'the fixture must actually rename a row')
  assert.ok(conformanceLinkage(extractRules(check), renamed).missingRows.includes(row))
  assert.throws(() => generateLinkageTable(check, renamed), /absent from the matrix/)
})
