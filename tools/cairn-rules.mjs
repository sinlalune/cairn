#!/usr/bin/env node
/**
 * cairn-rules — generate the live rule table from tools/cairn-check.mjs
 *
 * Emits the Markdown table of blocking and advisory rules implemented in
 * cairn-check, extracting rule names directly from the code so the count
 * and descriptions cannot drift.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CHECK_FILE = join(REPO, 'tools/cairn-check.mjs')

/** The canonical specification carries the generated catalogue between these markers.
 *  A table written by hand is how a document comes to list rules that do not
 *  exist — the defect this generator was built for. The splice makes the
 *  regeneration one command, and the test makes the shipped table executable:
 *  a specification that has drifted from the validator fails the build. */
export const SPEC_FILE = 'spec/reference/conformance.md'
export const TABLE_BEGIN = '<!-- cairn:rules:begin -->'
export const TABLE_END = '<!-- cairn:rules:end -->'
export const LINKAGE_BEGIN = '<!-- cairn:conformance:begin -->'
export const LINKAGE_END = '<!-- cairn:conformance:end -->'

export function extractRules(source) {
  const rules = []

  // Rules from evaluate(). The level is a literal —
  //     add('blocking', 'rule-name', …)
  // — or an expression that chooses between two literals, because a rule may be
  // advisory for a grandfathered path and blocking for everyone else:
  //     add(exempt ? 'advisory' : 'blocking', 'rule-name', …)
  //
  // Matching only the literal form was a silent under-report, not a gap: five
  // rules could emit advisory findings while the published catalogue said all
  // five were blocking. The test that guards the catalogue passed throughout,
  // because it compared the catalogue with this same extraction rather than with
  // the checker's behaviour.
  const evalMatches = source.matchAll(
    /add\(\s*(?:'(blocking|advisory)'|[^,]*?\?\s*'(blocking|advisory)'\s*:\s*'(blocking|advisory)')\s*,\s*'([a-z-]+)'/g
  )
  for (const match of evalMatches) {
    const [, literal, whenTrue, whenFalse, name] = match
    for (const level of [literal, whenTrue, whenFalse].filter(Boolean)) {
      if (!rules.some((r) => r.name === name && r.level === level && r.scope === 'diff')) {
        rules.push({ name, level, scope: 'diff' })
      }
    }
  }

  // Rules from corpusFindings(): findings.push({ level: '...', rule: '...', ... })
  const corpusMatches = source.matchAll(/level:\s*'(blocking|advisory)',\s*rule:\s*'([a-z-]+)'/g)
  for (const match of corpusMatches) {
    const [, level, name] = match
    if (!rules.some((r) => r.name === name && r.level === level && r.scope === 'corpus')) {
      rules.push({ name, level, scope: 'corpus' })
    }
  }

  return rules
}

/** Which conformance row each implemented rule stands behind.
 *
 *  The matrix states requirements in prose, and prose cannot be generated from
 *  a validator. What CAN be generated — and what was silently hand-maintained
 *  until it was — is the LINKAGE: which rule enforces which stated requirement.
 *  A row claiming `implemented` with no rule behind it, and a rule enforcing
 *  nothing the matrix states, are both invisible without this map.
 *
 *  The key is the row's exact first column, so a renamed row breaks the build
 *  rather than quietly orphaning its rules. Since Cairn 1.0 every rule stands
 *  behind a stated row: the specification says what the tools check about
 *  links and vocabulary, so those rows exist too.
 */
export const RULE_CONFORMANCE = {
  'branch-path': 'One path: one record, one branch, one worktree, one writer',
  'registration': 'Registration on the remote trunk before implementation',
  'registration-base': 'Registration on the remote trunk before implementation',
  'schema': 'The path record, its declaration and its opening acceptance',
  'scope-drift': 'Two declared surfaces, widened in the same unit',
  'route': 'The route, its triggers and one-way escalation',
  'work-unit': 'A typed work unit, coherent in one commit',
  'remote-checkpoint': 'Every completed unit pushed as a remote checkpoint',
  'provisional': 'Provisional commits never in a candidate',
  'path-history': 'A published path branch is never rewritten',
  'rebase': 'The branch contains the trunk tip before it merges',
  'derived-view': 'The live view is generated and complete',
  'acceptance': 'Closing acceptance binds the candidate, the scope and the base',
  'scope-digest': 'Closing acceptance binds the candidate, the scope and the base',
  'acceptance-drift': 'Acceptance drift decided by predicate, not trunk equality',
  'transition': 'The lifecycle is a statement of fact',
  'journal-entry': 'Integration records done and writes one journal entry',
  'record-integrity': 'Records are kept, not tidied',
  'redaction': 'Redaction names the record that authorised it',
  'record-date': 'A dated record carries the date of its event',
  'decision-drift': 'Architecture changes carry a decision record',
  'concept-orphan': 'The concept wiki: an orphan blocks, growth is reported',
  'concept-growth': 'The concept wiki: an orphan blocks, growth is reported',
  'links': 'Every relative link in the corpus resolves'
}

/** Rules the conformance matrix does not represent, and why.
 *
 *  Empty since Cairn 1.0, and kept as a map rather than deleted: a rule that
 *  stands behind no stated requirement is exactly the kind of rule the cut
 *  removed, and the build failing when one appears here without a row is the
 *  mechanism that keeps the catalogue honest. Declaring such a rule is still
 *  possible; it is a decision the entry has to state. */
export const RULES_OUTSIDE_CONFORMANCE = {}

export function conformanceLinkage(rules, specSource) {
  const start = specSource.indexOf('## Current conformance')
  // Stop at the generated block. Including it would let this check be satisfied
  // by its OWN output: rename a matrix row, and the generated table still holds
  // the old title, so nothing is reported. A predicate that reads its own
  // output is the proxy-predicate failure this path exists to find.
  const generated = specSource.indexOf(LINKAGE_BEGIN)
  const nextSection = specSource.indexOf('\n## ', start + 10)
  const ends = [generated, nextSection].filter((index) => index > start)
  const table = start < 0 ? '' : specSource.slice(start, ends.length ? Math.min(...ends) : specSource.length)
  const names = [...new Set(rules.map((rule) => rule.name))].sort()
  const unaccounted = names.filter(
    (name) => !(name in RULE_CONFORMANCE) && !(name in RULES_OUTSIDE_CONFORMANCE)
  )
  const bothWays = names.filter((name) => name in RULE_CONFORMANCE && name in RULES_OUTSIDE_CONFORMANCE)
  const missingRows = [...new Set(Object.values(RULE_CONFORMANCE))].filter(
    (row) => !table.includes(`| ${row} |`)
  )
  const phantomRules = [...Object.keys(RULE_CONFORMANCE), ...Object.keys(RULES_OUTSIDE_CONFORMANCE)]
    .filter((name) => !names.includes(name))
  return { unaccounted, bothWays, missingRows, phantomRules, table }
}

export const RULE_METADATA = {
  'route': {
    condition: 'A path declares no route, an unknown route, a lightweight route that meets a full-route trigger, or a descent from full',
    enforcing: 'configured new-path default + fullRouteTriggers(writes) + routeDescent(previous, current)'
  },
  'redaction': {
    condition: 'A `[redacted: …]` marker names no redaction record (code spans and fences stripped first)',
    enforcing: 'redactionMarkers(stripCode(text)) => redaction record exists'
  },
  'scope-digest': {
    condition: 'The accepted definition of done moved after acceptance, or was accepted without a digest',
    enforcing: 'scopeDigest(resolveScopeSection(pathRecord, scope_ref)) === record.scope_digest'
  },
  'acceptance-drift': {
    condition: 'The trunk moved inside the path\'s declared writes: or governs: since the accepted base',
    enforcing: 'acceptanceDrift(git diff --name-only <base> <trunk>, writes, governs) — never trunk === base'
  },
  'work-unit': {
    condition: 'A changed path record carries no `cairn-unit` block for its current step, a block declares an unknown type, or source changed without a module note and the path record moving with it (the area-precise note is advisory)',
    enforcing: 'parseWorkUnits(record) => workUnitErrors(unit) over WORK_UNIT_TYPES; touched(source roots) => touched(modules root) && touched(PATH_DIR); areaOf(file) => changed.includes(note) (advisory)'
  },
  'provisional': {
    condition: 'A proposed candidate still contains commits marked Cairn-Provisional, or HEAD is itself provisional',
    enforcing: "git log --grep=^Cairn-Provisional: base..subject_commit (blocking on a ready path, advisory at HEAD)"
  },
  'journal-entry': {
    condition: 'A path record reaches `done` in this change and no journal entry declares that path',
    enforcing: "journalRecords(loadJournal(), id) on the transition into done; inconclusive when the journal cannot be read"
  },
  'concept-orphan': {
    condition: 'A concept note that no normative or learning text outside the wiki links to',
    enforcing: 'orphanConcepts(conceptFiles, links from documents outside the concepts folder)'
  },
  'concept-growth': {
    condition: 'A change adds concept articles; reported so vocabulary growth is a visible decision',
    enforcing: 'addedConcepts(previousRef listing, current listing), diff-scoped to the concepts folder'
  },
  'branch-path': {
    condition: 'Path branch not declared by a running path record, missing base_commit, or a detached checkout whose branch cannot be identified while guarded source changed (inconclusive; advisory when nothing guarded changed)',
    enforcing: "isPathBranch(branch) && (!match || !PATH_BRANCH_STATUSES.includes(status) || !isCommitPin(base)); branchSource === 'detached' && guarded.length > 0"
  },
  'registration': {
    condition: 'Path declaration tuple (id, running, branch, base) missing from trunk',
    enforcing: "pathRegistrationState() === 'missing' (blocking) or declared migration exception (advisory)"
  },
  'registration-base': {
    condition: 'Path base_commit cannot be proved to equal the registration commit parent',
    enforcing: "pathRegistrationBaseState() === 'mismatch' | null"
  },
  'remote-checkpoint': {
    condition: 'Local path HEAD not present on upstream tracking branch',
    enforcing: "pathRemoteCheckpoint(branch).state === 'missing' | 'unpushed'"
  },
  'path-history': {
    condition: 'A published path commit was rewritten while this host forbids rewriting (ADR-022)',
    enforcing: "pathHistoryPolicy === 'forbidden' && pathRemoteCheckpoint(branch).diverged"
  },
  'rebase': {
    condition: 'Path branch does not contain the trunk tip. The id is historical: the requirement is trunk containment, which a no-rewrite host satisfies by merging the trunk in (ADR-022)',
    enforcing: "trunkContained(trunkRef) === false"
  },
  'transition': {
    condition: 'Changed path state is not an allowed lifecycle transition, a path branch claims done, a declaration was deleted rather than archived, or the prior state is unavailable',
    enforcing: 'transitionErrors(previous, current, onPathBranch)'
  },
  'acceptance': {
    condition: 'A ready or done path lacks exact-commit acceptance; implementation changed after acceptance; the coherence audit bound to the candidate is missing or unfilled; the closure commit moved a field acceptance was measured against; the advisory dispositions do not match the advisories attested at the candidate (advisory: a collapsed reviewer, or a prose disposition on a grandfathered path)',
    enforcing: 'closingAcceptanceErrors(record) + pathClosureState(path, record) + cairn-audit --check --subject C + closureFieldErrors(recordAtC, current) + dispositionErrors(disposition, advisories_at_candidate, raised) + opening.accepted_by === closing.accepted_by'
  },
  'record-integrity': {
    condition: 'An immutable event/history record changed, or a born-sliced step no longer preserves its adding blob as a prefix',
    enforcing: 'immutableRecordMutations(mergeBaseWithTrunk) + appendOnlyStepRecordMutations(changed) + preservesAppendOnlyRecord(before, after)'
  },
  'scope-drift': {
    condition: 'Changed files outside path frontmatter declared writes: patterns',
    enforcing: "!matchesAny(file, declaredWrites)"
  },
  'decision-drift': {
    condition: 'Configured architecture changed without a decision record in the same changeset',
    enforcing: 'touched(architectureRoot) => touched(decisionRoot)'
  },
  'record-date': {
    condition: 'A record this change adds carries two dates that disagree, or a date more than a day from the commit that wrote it',
    enforcing: 'recordDateFindings(addedRecords) — filename date vs timestamp: vs the adding commit author date'
  },
  'derived-view': {
    condition: 'ACTIVE.md running-paths block does not match the path files it projects',
    enforcing: "tools/cairn-active.mjs --check"
  },
  'schema': {
    condition: 'Path or decision-record frontmatter fails parsing, an id/status/date is outside vocabulary, two records share an id or a branch, depends_on names an unknown path or the path itself, or a record declares running with no valid opening acceptance under its own heading',
    enforcing: "pathFrontmatterErrors(front) + duplicatePathIdentityFindings(paths) + dependencyFindings(paths) + adrFrontmatterErrors(front, file, bodyStatus) + openingAcceptanceErrors(openingFromRecord(record)) on a running record in the diff"
  },
  'links': {
    condition: 'Relative Markdown link points to non-existent target (code fences stripped)',
    enforcing: "stripCode(text) => !existsSync(target)"
  }
}

function escapePipes(text) {
  if (typeof text !== 'string') return text
  return text.replace(/\|/g, '\\|')
}

export function generateMarkdownTable(source) {
  const rules = extractRules(source)

  // Sort blocking first, then advisory; alphabetical by name within level
  rules.sort((a, b) => {
    if (a.level !== b.level) return a.level === 'blocking' ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  let md = '| Level | Rule Name | Scope | Trigger Condition | Enforcing Logic |\n'
  md += '| :--- | :--- | :--- | :--- | :--- |\n'

  for (const r of rules) {
    const meta = RULE_METADATA[r.name] || { condition: 'TBD', enforcing: 'TBD' }
    const levelBadge = r.level === 'blocking' ? '**Blocking**' : '*Advisory*'
    const condition = escapePipes(meta.condition)
    const enforcing = escapePipes(meta.enforcing)
    md += `| ${levelBadge} | \`${r.name}\` | ${r.scope} | ${condition} | \`${enforcing}\` |\n`
  }

  return md
}

/** The generated rule-to-requirement linkage.
 *
 *  Prose cannot be generated from a validator, so the matrix's CLAIMS stay
 *  human. This is the half that was silently hand-maintained: which rule stands
 *  behind which stated requirement, and which rules stand behind none. */
export function generateLinkageTable(checkSource, specSource) {
  const rules = extractRules(checkSource)
  const linkage = conformanceLinkage(rules, specSource)
  for (const [label, list] of [
    ['rules in neither map', linkage.unaccounted],
    ['rules in both maps', linkage.bothWays],
    ['mapped rows absent from the matrix', linkage.missingRows],
    ['mapped rules the checker does not implement', linkage.phantomRules]
  ]) {
    if (list.length) throw new Error(`cairn-rules: ${label} — ${list.join(', ')}`)
  }

  const names = [...new Set(rules.map((rule) => rule.name))].sort()
  let md = '| Rule | Stands behind |\n| :-- | :-- |\n'
  for (const name of names) {
    const row = RULE_CONFORMANCE[name]
    md += row
      ? `| \`${name}\` | ${escapePipes(row)} |\n`
      : `| \`${name}\` | *(no conformance row)* — ${escapePipes(RULES_OUTSIDE_CONFORMANCE[name])} |\n`
  }
  return md
}

/** The text currently sitting between the markers, or null when the document
 *  carries no splice point. Pure, so the test can read the shipped file. */
export function tableIn(doc) {
  const from = doc.indexOf(TABLE_BEGIN)
  const to = doc.indexOf(TABLE_END)
  if (from === -1 || to === -1 || to < from) return null
  return doc.slice(from + TABLE_BEGIN.length, to).trim()
}

export function spliceTable(doc, table, begin = TABLE_BEGIN, end = TABLE_END) {
  const from = doc.indexOf(begin)
  const to = doc.indexOf(end)
  if (from === -1 || to === -1 || to < from) {
    throw new Error(`no ${begin} / ${end} splice point in the document`)
  }
  return `${doc.slice(0, from + begin.length)}\n${table.trim()}\n${doc.slice(to)}`
}

export function linkageIn(doc) {
  const from = doc.indexOf(LINKAGE_BEGIN)
  const to = doc.indexOf(LINKAGE_END)
  if (from === -1 || to === -1 || to < from) return null
  return doc.slice(from + LINKAGE_BEGIN.length, to).trim()
}

function main() {
  const source = readFileSync(CHECK_FILE, 'utf8')
  const table = generateMarkdownTable(source)
  if (!process.argv.includes('--write')) {
    console.log(table)
    return
  }
  const specPath = join(REPO, SPEC_FILE)
  let doc = readFileSync(specPath, 'utf8')
  doc = spliceTable(doc, table)
  doc = spliceTable(doc, generateLinkageTable(source, doc), LINKAGE_BEGIN, LINKAGE_END)
  writeFileSync(specPath, doc, 'utf8')
  console.log(`cairn-rules — rewrote the catalogue and the conformance linkage in ${SPEC_FILE}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}
