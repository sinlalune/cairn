/**
 * Adversarial fixtures — one per blocking rule, every one of them.
 *
 * Every other suite here exercises `evaluate()` with hand-built arguments. That
 * proves the predicate, and it cannot prove the RULE: a rule wired to nothing,
 * or reading a field the real repository never has, passes a unit test and
 * reports `OK` forever in production. The conformance page said so —
 * "the checker suite exercises valid repositories and asserts OK, which a rule
 * that never fires also satisfies".
 *
 * So each fixture here builds a REAL repository with `cairn-init`, proves it is
 * green, introduces exactly ONE violation, runs the REAL checker as a
 * subprocess, and requires that rule to be among the blocking findings. The
 * green baseline is half the assertion: a fixture that blocks for an unrelated
 * reason proves nothing about the rule it names.
 *
 * Brought over from Atomik at 46bdd11 with eight fixtures and a declared list
 * of sixteen uncovered rules; Cairn 1.0 cut the rule set to nineteen blocking
 * names and this file covers all nineteen, so the declared list is empty and
 * the coverage test below keeps it that way.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { appendFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'

import { applyPlan, defaultOptions, planInstall } from './cairn.mjs'

const CHECK = 'tools/cairn-check.mjs'

/** The harness writes its records today: a record dated at authoring time
 *  drifts from the commit that adds it as the calendar moves, and the
 *  `record-date` advisory would be right to say so. */
const TODAY = new Date().toISOString().slice(0, 10)

/** Rules an adversarial fixture in this file demonstrates rejecting. */
const COVERED = new Set()

function git(dir, ...args) {
  return execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
}

/** A fixture repository has an author of its own. Passing the identity at each
 *  call site instead let one `git merge` be written without it: green on a
 *  laptop with a global identity, red on a runner with none — a verdict that
 *  turned on the environment, which is the parity failure `tools/soundness.md`
 *  is about. It is set once, where the repository is made. */
function identify(dir) {
  git(dir, 'config', 'user.email', 't@example.invalid')
  git(dir, 'config', 'user.name', 'fixture')
  return dir
}

function commit(dir, message) {
  git(dir, 'add', '-A')
  git(dir, 'commit', '-qm', message)
}

/** A real, installed, green repository. */
function repository(options = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'cairn-fixture-'))
  applyPlan(planInstall({ ...defaultOptions(), ...options }), dir)
  git(dir, 'init', '-q', '-b', 'main')
  identify(dir)
  commit(dir, 'install cairn')
  return dir
}

/** Run the real checker and return its structured verdict. */
function check(dir, ...args) {
  return checkWithEnv(dir, process.env, ...args)
}

/** The same, with an explicit environment. The suite's own first CI failure
 *  was the checker reading the HOST's branch variables while judging a fixture
 *  repository, so the environment is a parameter a test can control. */
function checkWithEnv(dir, env, ...args) {
  try {
    const out = execFileSync(process.execPath, [CHECK, '--json', ...args], {
      cwd: dir, encoding: 'utf8', stdio: 'pipe', env
    })
    return JSON.parse(out)
  } catch (error) {
    // A failing gate exits non-zero, which is the point of a gate.
    return JSON.parse(error.stdout)
  }
}

const level = (verdict, wanted) =>
  (verdict.findings ?? []).filter((f) => f.level === wanted).map((f) => f.rule)
const blocking = (verdict) => level(verdict, 'blocking')
const advisory = (verdict) => level(verdict, 'advisory')
const describe = (verdict) =>
  JSON.stringify((verdict.findings ?? []).filter((f) => f.level === 'blocking').map((f) => `${f.rule}: ${f.message}`))

function write(dir, path, content) {
  mkdirSync(dirname(join(dir, path)), { recursive: true })
  writeFileSync(join(dir, path), content)
}

function edit(dir, path, from, to) {
  const file = join(dir, path)
  const before = readFileSync(file, 'utf8')
  assert.ok(before.includes(from), `${path} must contain ${JSON.stringify(from)} for this fixture to mean anything`)
  writeFileSync(file, before.replace(from, to))
}

function regenerateView(dir) {
  execFileSync(process.execPath, ['tools/cairn-active.mjs'], { cwd: dir, stdio: 'pipe' })
}

function cleanup(...dirs) {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true })
}

const RECORD = 'project/coding-paths/CP-FIXTURE-001/index.md'
const STEP = 'project/coding-paths/CP-FIXTURE-001/steps/S01.md'

/** The opening acceptance a record carries inline, bound to the digest of the
 *  definition of done as it stands when the record is registered. */
const OPENING_SECTION = (digest, record = RECORD) => `
## Opening acceptance

\`\`\`yaml
decision: accepted
accepted_by: fixture-opener
accepted_roles: [initiator, reviewer]
accepted_at: ${TODAY}T09:00:00Z
scope_ref: ${record}#definition-of-done
scope_digest: ${digest}
\`\`\`
`

const PATH_RECORD = (overrides = {}) => {
  const { opening = null, record = RECORD, ...rest } = overrides
  const fields = {
    id: 'CP-FIXTURE-001',
    route: 'lightweight',
    status: 'running',
    current_step: 'S01',
    base_commit: 'a'.repeat(40),
    branch: 'path/cp-fixture-001',
    ...rest
  }
  const body = Object.entries(fields)
    .map(([key, value]) => `  ${key}: ${value}`)
    .join('\n')
  return `---
type: Cairn Coding Path
title: Fixture path
description: A path record used by the adversarial fixtures.
tags: [coding-path]
timestamp: ${TODAY}T00:00:00Z
cairn:
${body}
---

# ${fields.id} — Fixture path

## Goal

Exercise one rule.

## Definition of done

- [ ] The rule fires.
${opening ? OPENING_SECTION(opening, record) : ''}`
}

function scopeDigest(dir, record = RECORD) {
  return execFileSync(process.execPath,
    [CHECK, '--scope-digest', `${record}#definition-of-done`],
    { cwd: dir, encoding: 'utf8', stdio: 'pipe' }).trim()
}

/** Write the record, then write it again with its opening acceptance bound to
 *  the digest the first write produced. The definition of done sits above the
 *  acceptance, so the second write leaves the digested text unchanged. */
function writeAcceptedRecord(dir, fields) {
  const record = fields.record ?? RECORD
  write(dir, record, PATH_RECORD(fields))
  write(dir, record, PATH_RECORD({ ...fields, opening: scopeDigest(dir, record) }))
}

/** A green repository with one registered path, checked out on its branch.
 *
 *  Reaching green here is most of the work, and it is the half that makes a
 *  fixture mean anything: several rules only evaluate `onPath`, so a fixture
 *  run on the trunk proves nothing about them however loudly it fails. */
function pathRepository({ checkout = true, record = {} } = {}) {
  const dir = repository()
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  writeAcceptedRecord(dir, { base_commit: base, ...record })
  regenerateView(dir)
  commit(dir, 'register CP-FIXTURE-001')
  if (checkout) git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')
  return dir
}

/** The same, published: a bare repository is a real remote, and the remote
 *  trunk is the base the gate resolves by default on a path branch. */
function publishedRepository(options) {
  const dir = pathRepository(options)
  git(dir, 'init', '-q', '--bare', `${dir}.git`)
  git(dir, 'remote', 'add', 'origin', `${dir}.git`)
  git(dir, 'push', '-q', '-u', 'origin', 'main', 'path/cp-fixture-001')
  return dir
}

/** ADR-008 decision 6. Where a fixture names the remedy its refusal owes, the
 *  refusal is held to it: three times on the first adopter a message that named
 *  only the fault led the agent to move the fault — a rewritten `base_commit`,
 *  an edited step record, a widened `writes:`. A rule firing is half the
 *  assertion; what it then tells the reader to do is the other half. */
function assertRemedy(found, rule, remedy) {
  if (!remedy) return
  assert.ok(found.findings.some((f) => f.rule === rule && remedy.test(f.message)),
    `${rule} fired without naming its remedy: ${describe(found)}`)
}

/** One adversarial fixture over a fresh installation, on the trunk. */
function fixture(name, rule, mutate, options = {}) {
  COVERED.add(rule)
  test(`adversarial: ${rule} — ${name}`, () => {
    const dir = repository(options)
    try {
      const clean = check(dir)
      assert.deepEqual(blocking(clean), [],
        `the baseline must be green, or this fixture proves nothing about ${rule}: ${describe(clean)}`)
      mutate(dir)
      const found = check(dir)
      assert.ok(blocking(found).includes(rule),
        `${rule} did not fire on a repository that violates it — blocking findings were: ${blocking(found).join(', ') || 'none'}`)
      assertRemedy(found, rule, options.remedy)
    } finally {
      cleanup(dir)
    }
  })
}

/** An adversarial fixture that needs a registered path to reach its rule. */
function pathFixture(name, rule, mutate, options = {}) {
  COVERED.add(rule)
  test(`adversarial: ${rule} — ${name}`, () => {
    const dir = options.published ? publishedRepository(options) : pathRepository(options)
    try {
      const clean = check(dir)
      assert.deepEqual(blocking(clean), [],
        `the path-branch baseline must be green, or this fixture proves nothing about ${rule}: ${describe(clean)}`)
      mutate(dir)
      const found = check(dir)
      assert.ok(blocking(found).includes(rule),
        `${rule} did not fire — blocking findings were: ${blocking(found).join(', ') || 'none'}`)
      assertRemedy(found, rule, options.remedy)
    } finally {
      cleanup(dir, `${dir}.git`)
    }
  })
}

/** An advisory rule's fixture: green before, and this rule REPORTED after.
 *  Advisory rules are not required to have one; the two here keep the
 *  fixtures their rules had while they were blocking. */
function advisoryFixture(name, rule, mutate) {
  test(`adversarial (advisory): ${rule} — ${name}`, () => {
    const dir = repository()
    try {
      assert.deepEqual(blocking(check(dir)), [])
      mutate(dir)
      const found = check(dir)
      assert.ok(advisory(found).includes(rule), `${rule} was not reported — advisories were: ${advisory(found).join(', ') || 'none'}`)
      assert.ok(!blocking(found).includes(rule), `${rule} is advisory and must not block`)
    } finally {
      cleanup(dir)
    }
  })
}

/* ------------------------------------------------------------------ *
 * Corpus rules — on a fresh installation
 * ------------------------------------------------------------------ */

fixture('a link that resolves nowhere', 'links', (dir) => {
  appendFileSync(join(dir, 'docs/index.md'), '\nA [dangling](./nothing-here.md) link.\n')
})

fixture('a concept nothing outside the wiki links', 'concept-orphan', (dir) => {
  write(dir, 'docs/concepts/unused-idea.md',
    '---\ntype: Cairn Concept\ntitle: Unused idea\ndescription: Nobody links this.\ntags: [cairn, concept]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Unused idea\n\nA concept no text needed.\n')
})

fixture('a running path the generated view does not know about', 'derived-view', (dir) => {
  write(dir, RECORD, PATH_RECORD())
})

fixture('a path record whose frontmatter breaks the schema', 'schema', (dir) => {
  write(dir, RECORD, PATH_RECORD({ status: 'inventing' }))
})

// A born-sliced record is born in a NEW FOLDER, and `git status --porcelain`
// lists a new folder as one entry with none of the files inside it. The gate
// on the untracked tree once read OK with no opening acceptance anywhere;
// staging the same tree read FAILED (greenfield pilot). This was
// `opening-ceremony` in 0.2 and is the schema of a running record now.
fixture('a running record born in an untracked folder, with no opening acceptance', 'schema', (dir) => {
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  write(dir, 'project/coding-paths/CP-FIXTURE-002/index.md', PATH_RECORD({ id: 'CP-FIXTURE-002', branch: 'path/cp-fixture-002', base_commit: base }))
  regenerateView(dir)
})

fixture('a running record whose opening acceptance binds no digest', 'schema', (dir) => {
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  write(dir, 'project/coding-paths/CP-FIXTURE-002/index.md',
    PATH_RECORD({ id: 'CP-FIXTURE-002', branch: 'path/cp-fixture-002', base_commit: base, opening: 'x' })
      .replace('scope_digest: x', 'scope_digest:'))
  regenerateView(dir)
})

fixture('a record depending on a path nothing declares', 'schema', (dir) => {
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  write(dir, 'project/coding-paths/CP-FIXTURE-002/index.md',
    PATH_RECORD({ id: 'CP-FIXTURE-002', branch: 'path/cp-fixture-002', base_commit: base, opening: 'x', depends_on: '[CP-NOWHERE-001]' }))
  regenerateView(dir)
})

advisoryFixture('a redaction marker naming no record', 'redaction', (dir) => {
  appendFileSync(join(dir, 'docs/index.md'), '\nRemoved [redacted: 2026-09-01-nonexistent] here.\n')
})

/* ------------------------------------------------------------------ *
 * Path-branch rules
 * ------------------------------------------------------------------ */

pathFixture('a path branch declaring an unknown route', 'route', (dir) => {
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  writeAcceptedRecord(dir, { base_commit: base, route: 'whatever' })
})

pathFixture('a changed path record carrying no work unit', 'work-unit', (dir) => {
  appendFileSync(join(dir, RECORD), '\n- [ ] One more thing.\n')
})

pathFixture('a work unit declaring a type the vocabulary does not have', 'work-unit', (dir) => {
  // The first adopter's closing unit declared `review`. The refusal named the
  // vocabulary and stopped, so the agent edited the pushed record to change the
  // type — a second violation, on a host where neither can be undone.
  write(dir, STEP, STEP_RECORD.replace('type: implementation', 'type: review'))
}, { remedy: /superseding step/ })

pathFixture('a branch no path declares', 'branch-path', (dir) => {
  git(dir, 'checkout', '-q', '-b', 'path/cp-nobody')
})

pathFixture('a path branch that does not contain the trunk tip', 'rebase', (dir) => {
  git(dir, 'checkout', '-q', 'main')
  write(dir, 'docs/moved-on.md', '---\ntype: Note\ntitle: The trunk moved\ndescription: x\ntags: [x]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Moved on\n')
  commit(dir, 'trunk moves on')
  git(dir, 'checkout', '-q', 'path/cp-fixture-001')
})

pathFixture('a path branch claiming done for itself', 'transition', (dir) => {
  const base = git(dir, 'rev-parse', 'HEAD~0').trim()
  writeAcceptedRecord(dir, { status: 'done', subject_commit: base, resolution: 'completed' })
  regenerateView(dir)
})

/* ADR-001 decision 7, proved on the shape this repository's own path 1 closed
 * in: the trunk took CP-CAIRN-005 from `running` to `done` in one commit,
 * because the administrative commit that should have declared `ready` on the
 * branch was never made. The history is not tidied; it is the fixture.
 *
 * The trunk history carries a merged unit of a SECOND path, as ADR-004
 * decision 4 requires of every blocking fixture: a rule that only ever sees
 * one path's commits is not proved against the repository it runs in. */
pathFixture('a trunk commit taking a path from running to done with no ready commit', 'transition', (dir) => {
  git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-002')
  write(dir, 'docs/other-path-unit.md',
    '---\ntype: Note\ntitle: A unit of another path\ndescription: x\ntags: [x]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Another path\n')
  commit(dir, 'CP-FIXTURE-002 S01: a second path completes a unit')
  git(dir, 'checkout', '-q', 'main')
  git(dir,
    'merge', '-q', '--no-ff', '-m', 'Merge CP-FIXTURE-002 into the trunk', 'path/cp-fixture-002')

  const candidate = git(dir, 'rev-parse', 'HEAD').trim()
  writeAcceptedRecord(dir, { status: 'done', subject_commit: candidate, resolution: 'completed' })
  regenerateView(dir)
}, { checkout: false })

/* ADR-002 decision 1. The seal used to be judged only for a closed path on
 * its OWN branch, so a box ticked inside the integrating commit on the trunk
 * was never read: two adopter paths reached `done` ticked, under green runs.
 * The fixture is that commit — `done` declared and a box ticked in one change
 * on the trunk. Its history carries a second path's merged unit because
 * ADR-004 decision 4 requires that of every blocking fixture: a rule proved
 * only against a single-path history is not proved against the repository it
 * runs in. It changes nothing about THIS rule's verdict, and that is the
 * point of the requirement rather than an argument against it. */
pathFixture('a box ticked in the integrating commit on the trunk', 'scope-digest', (dir) => {
  git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-002')
  write(dir, 'docs/other-path-seal.md',
    '---\ntype: Note\ntitle: A unit of another path\ndescription: x\ntags: [x]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Another path\n')
  commit(dir, 'CP-FIXTURE-002 S01: a second path completes a unit')
  git(dir, 'checkout', '-q', 'main')
  git(dir,
    'merge', '-q', '--no-ff', '-m', 'Merge CP-FIXTURE-002 into the trunk', 'path/cp-fixture-002')

  // The record reaches `done` and the box is ticked in the same change, which
  // is exactly what the two adopter paths did.
  const candidate = git(dir, 'rev-parse', 'HEAD').trim()
  writeAcceptedRecord(dir, { status: 'done', subject_commit: candidate, resolution: 'completed' })
  const ticked = readFileSync(join(dir, RECORD), 'utf8').replace('- [ ] The rule fires.', '- [x] The rule fires.')
  assert.ok(ticked.includes('- [x]'), 'the harness must tick the box for this fixture to mean anything')
  write(dir, RECORD, ticked)
  regenerateView(dir)
}, { checkout: false })

/* ADR-003, the two fixtures the record asks for: the overlap raised, and the
 * overlap silenced by `depends_on`. Advisory, so the assertion is that it is
 * REPORTED and does not block — a rule that blocked here would make the owner
 * edit a declaration to say what one sentence can say. */
const SECOND_RECORD = 'project/coding-paths/CP-FIXTURE-002/index.md'

const SECOND_PATH = (base, dependsOn, opening = null) => `---
type: Cairn Coding Path
title: The second path
description: A second live path declaring a surface that meets the first's.
tags: [coding-path]
timestamp: ${TODAY}T00:00:00Z
cairn:
  id: CP-FIXTURE-002
  route: lightweight
  status: running
  current_step: S01
  base_commit: ${base}
  branch: path/cp-fixture-002
  depends_on: [${dependsOn}]
  writes:
    - src/**
---

# CP-FIXTURE-002 — the second path

## Goal

Declare a surface that meets CP-FIXTURE-001's.

## Definition of done

- [ ] The overlap is reported.
${opening ? `
## Opening acceptance

\`\`\`yaml
decision: accepted
accepted_by: fixture-opener
accepted_roles: [initiator, reviewer]
accepted_at: ${TODAY}T09:00:00Z
scope_ref: ${SECOND_RECORD}#definition-of-done
scope_digest: ${opening}
\`\`\`
` : ''}`

/** Two registered, accepted, LIVE paths declaring the same surface. Both are
 *  fully formed: a second record without its own opening acceptance makes the
 *  repository blocking-red under `schema`, and a fixture that blocks for an
 *  unrelated reason proves nothing about the rule it names. */
function overlapRepository(dependsOn) {
  const dir = pathRepository({ checkout: false, record: { writes: '\n    - src/**' } })
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  write(dir, SECOND_RECORD, SECOND_PATH(base, dependsOn))
  write(dir, SECOND_RECORD, SECOND_PATH(base, dependsOn, scopeDigest(dir, SECOND_RECORD)))
  regenerateView(dir)
  return dir
}

test('adversarial (advisory): writes-overlap — two live paths declaring the same surface', () => {
  const dir = overlapRepository('')
  try {
    const found = check(dir)
    assert.deepEqual(blocking(found), [],
      `the two-path baseline must be green, or this fixture proves nothing about writes-overlap: ${describe(found)}`)
    assert.ok(advisory(found).includes('writes-overlap'),
      `writes-overlap was not reported — advisories were: ${advisory(found).join(', ') || 'none'}`)
  } finally {
    cleanup(dir)
  }
})

test('adversarial (advisory): writes-overlap — silent when the waiting path declares depends_on', () => {
  const dir = overlapRepository('CP-FIXTURE-001')
  try {
    const found = check(dir)
    assert.deepEqual(blocking(found), [], `the baseline must be green: ${describe(found)}`)
    assert.ok(!advisory(found).includes('writes-overlap'),
      `the second path waits on the first, so nothing races — advisories were: ${advisory(found).join(', ')}`)
    // The control: the SAME repository with the declaration dropped does raise
    // it. Without this the test passes over a rule that reports nothing at all,
    // and dropping `depends_on` while the other path is live is the shape the
    // adopter's CP-016 took.
    const base = git(dir, 'rev-parse', 'HEAD').trim()
    write(dir, SECOND_RECORD, SECOND_PATH(base, '', scopeDigest(dir, SECOND_RECORD)))
    assert.ok(advisory(check(dir)).includes('writes-overlap'),
      'dropping depends_on while the other path is live is the overlap reappearing')
  } finally {
    cleanup(dir)
  }
})

pathFixture('a file written outside the declared surface, with the declaration unchanged', 'scope-drift', (dir) => {
  write(dir, 'lib/outside.js', 'export const outside = true\n')
}, { record: { writes: '\n    - src/**' } })

pathFixture('a published commit rewritten on a no-rewrite host', 'path-history', (dir) => {
  git(dir, 'commit', '--amend', '-qm', 'rewritten in place')
}, { published: true })

fixture('a path branched before its declaration reached the trunk', 'registration', (dir) => {
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')
  writeAcceptedRecord(dir, { base_commit: base })
  regenerateView(dir)
  commit(dir, 'declare CP-FIXTURE-001 on its own branch only')
})

fixture('a registration whose base_commit is not the registration parent', 'registration-base', (dir) => {
  const first = git(dir, 'rev-parse', 'HEAD').trim()
  write(dir, 'docs/between.md', '---\ntype: Note\ntitle: Between\ndescription: x\ntags: [x]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Between\n')
  commit(dir, 'a trunk commit between the claimed base and the registration')
  writeAcceptedRecord(dir, { base_commit: first })
  regenerateView(dir)
  commit(dir, 'register CP-FIXTURE-001 with a stale base')
  git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')
}, { remedy: /git merge-base .*created before registration/s })

/* ADR-004 decision 1. The adopter's CP-016 landed as a draft through one
 * request and went `running` through a second; judged against the DRAFT's
 * parent, the only way to a green gate was to rewrite `base_commit` to a value
 * the specification's own definition calls false, and the trunk carries it. */
test('adversarial: registration-base — a branch forked from the draft, not from the activation', () => {
  const dir = repository()
  try {
    const draftParent = git(dir, 'rev-parse', 'HEAD').trim()
    write(dir, RECORD, PATH_RECORD({ status: 'draft', base_commit: draftParent }))
    commit(dir, 'land CP-FIXTURE-001 as a draft')
    const activationParent = git(dir, 'rev-parse', 'HEAD').trim()

    // Activated by a later trunk commit. THAT commit's parent is the base.
    writeAcceptedRecord(dir, { base_commit: activationParent })
    regenerateView(dir)
    commit(dir, 'activate CP-FIXTURE-001')
    git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')
    assert.deepEqual(blocking(check(dir)), [],
      'a base pinned to the activation parent is the registration base')

    // And the converse: the draft's parent, which is what the old reading
    // demanded, is now the mismatch it always was.
    write(dir, RECORD, readFileSync(join(dir, RECORD), 'utf8')
      .replace(`base_commit: ${activationParent}`, `base_commit: ${draftParent}`))
    assert.ok(blocking(check(dir)).includes('registration-base'),
      `the draft's parent is not the base — blocking findings were: ${describe(check(dir))}`)
  } finally {
    cleanup(dir)
  }
})

/* The shape ADR-004 decision 1 was written for: the adopter's record "landed
 * as a draft through one request and went `running` through a second". The
 * activation arrives on the trunk as a merge, and `base_commit` is what the
 * REGISTRANT could pin when they authored the record — the trunk tip they saw,
 * which is the parent of the commit that declared `running`. Reading the
 * merge's first parent instead demands the trunk state at the merge, a commit
 * nobody can know in advance, and refuses a registration that did everything
 * the convention asks. */
test('adversarial: registration-base — an activation that reached the trunk through a merge', () => {
  const dir = repository()
  try {
    const draftParent = git(dir, 'rev-parse', 'HEAD').trim()
    write(dir, RECORD, PATH_RECORD({ status: 'draft', base_commit: draftParent }))
    commit(dir, 'land CP-FIXTURE-001 as a draft')

    git(dir, 'checkout', '-q', '-b', 'register/cp-fixture-001')
    const pinned = git(dir, 'rev-parse', 'HEAD').trim()
    writeAcceptedRecord(dir, { base_commit: pinned })
    commit(dir, 'activate CP-FIXTURE-001')

    // The trunk moves while the request waits, which is the whole point: the
    // registrant pinned what they saw and cannot pin what the trunk becomes.
    git(dir, 'checkout', '-q', 'main')
    write(dir, 'docs/meanwhile.md', '---\ntype: Note\ntitle: Meanwhile\ndescription: x\ntags: [x]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Meanwhile\n')
    commit(dir, 'the trunk moves while the request waits')
    const trunkAtMerge = git(dir, 'rev-parse', 'HEAD').trim()
    assert.notEqual(pinned, trunkAtMerge, 'the trunk must have moved, or this fixture proves nothing')

    git(dir,
      'merge', '-q', '--no-ff', '-m', 'Merge the activation of CP-FIXTURE-001', 'register/cp-fixture-001')
    regenerateView(dir)
    commit(dir, 'regenerate the live view')
    git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')

    assert.deepEqual(blocking(check(dir)), [],
      `the parent of the commit that declared running is the base: ${describe(check(dir))}`)
  } finally {
    cleanup(dir)
  }
})

/* Both record shapes, because the draft and the activation can sit under
 * different names: a record born flat and sliced into its folder when it was
 * activated (ADR-020 decision 4's shape) has its `running` declaration in
 * `<id>/index.md` and its history under `<id>.md`. Following one name alone
 * found no activation and asked for a fetch that could never help. */
test('adversarial: registration-base — a record whose draft and activation sit under different names', () => {
  const dir = repository()
  const flat = 'project/coding-paths/CP-FIXTURE-001.md'
  try {
    // Born in its folder as a draft, then migrated to the flat shape and
    // activated there. `<id>/index.md` carries only the draft, so a reader
    // following that one name finds no activation and asks for a fetch that
    // can never help.
    write(dir, RECORD, PATH_RECORD({ status: 'draft', base_commit: git(dir, 'rev-parse', 'HEAD').trim() }))
    commit(dir, 'land CP-FIXTURE-001 in its folder, as a draft')
    const activationParent = git(dir, 'rev-parse', 'HEAD').trim()

    git(dir, 'rm', '-q', RECORD)
    write(dir, flat, PATH_RECORD({ base_commit: activationParent }))
    write(dir, flat, PATH_RECORD({ base_commit: activationParent, opening: scopeDigest(dir, flat) }))
    regenerateView(dir)
    commit(dir, 'migrate CP-FIXTURE-001 to the flat shape and activate it')
    git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')

    assert.deepEqual(blocking(check(dir)), [],
      `the activation is found under the other shape: ${describe(check(dir))}`)
  } finally {
    cleanup(dir)
  }
})

/* ADR-004 decision 2: fifteen adopter units left the checkpoint `unpinned`,
 * so neither path could be resumed cold from its own record. */
pathFixture('a running path with a completed unit and no checkpoint', 'work-unit', (dir) => {
  write(dir, STEP, STEP_RECORD)
  appendFileSync(join(dir, RECORD), '\n## Resume\n\n### Checkpoint\n\n```text\ncommit : unpinned\nunit   : 1\n```\n')
})

/* ADR-004 decision 5, and repair 007 of decision 6. Every `pull_request` run
 * of the installed workflow is a detached checkout of the request head, on
 * purpose, so the exact commit is judged. Reading `@{upstream}` — which is
 * HEAD's, and a detached HEAD has none — reported "no upstream" on the one run
 * that is the merge gate, while the push run on the same commit passed. */
test('adversarial: remote-checkpoint — a detached request head is judged, not skipped and not compared with itself', () => {
  const dir = publishedRepository()
  const detach = () => {
    git(dir, 'checkout', '-q', '--detach')
    git(dir, 'branch', '-q', '-D', 'path/cp-fixture-001')
    // The workflow names the branch through the forge; the checkout cannot.
    return check(dir, '--branch', 'path/cp-fixture-001')
  }
  try {
    assert.deepEqual(blocking(check(dir)), [], `the published baseline must be green: ${describe(check(dir))}`)

    // A published branch, detached: nothing is outstanding, and the advisory
    // that used to fire here read `@{upstream}`, which a detached HEAD has not.
    const clean = detach()
    assert.deepEqual(blocking(clean), [],
      `a detached request head is the shape the workflow produces: ${describe(clean)}`)
    assert.ok(!advisory(clean).includes('remote-checkpoint'),
      `the remote holds this commit — advisories were: ${advisory(clean).join(', ')}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

/* The half that tells the two resolutions apart. Reading the remote-tracking
 * ref in a detached checkout compares it with itself, so everything is
 * tautologically green: an unpushed commit reads as published, and — the
 * finding that matters — a REWRITTEN published commit passes the one run that
 * is the merge gate. HEAD is the request head, and the request head is what
 * the gate must judge. */
test('adversarial: path-history — a rewritten published commit, judged on a detached request head', () => {
  const dir = publishedRepository()
  try {
    write(dir, 'docs/pushed.md', '---\ntype: Note\ntitle: Pushed\ndescription: x\ntags: [x]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Pushed\n')
    commit(dir, 'CP-FIXTURE-001: a unit that was published')
    git(dir, 'push', '-q', 'origin', 'path/cp-fixture-001')
    git(dir, 'commit', '--amend', '-qm', 'rewritten in place')
    assert.ok(blocking(check(dir)).includes('path-history'),
      `the rewrite is refused on the branch: ${describe(check(dir))}`)

    git(dir, 'checkout', '-q', '--detach')
    git(dir, 'branch', '-q', '-D', 'path/cp-fixture-001')
    const detached = check(dir, '--branch', 'path/cp-fixture-001')
    assert.ok(blocking(detached).includes('path-history'),
      `and refused on the request head, which is the merge gate: ${describe(detached)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

pathFixture('a path reaching done on the trunk with no journal entry', 'journal-entry', (dir) => {
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  writeAcceptedRecord(dir, { base_commit: base, status: 'done', subject_commit: base, resolution: 'completed' })
  regenerateView(dir)
}, { checkout: false })

/* ------------------------------------------------------------------ *
 * Closure — the greenfield pilot's harness
 *
 * The pilot drove a repository created by `cairn-init` through one whole
 * lifecycle and found that the closure sequence could not be completed on an
 * honest record. Every fixture below was red, or silently green, before the
 * repair it names. The harness reaches `ready` the way the operations page
 * says to, so the baseline is itself the regression test.
 * ------------------------------------------------------------------ */

/** The closing record on manual-git: the acceptance and the review, one file
 *  in the path folder named after the candidate. */
const CLOSING = ({ subject, base, digest, attested = [], disposition = [], verdict = 'clean', answer = 'No — there is none.' }) => {
  const list = disposition.length === 0
    ? '  advisory_disposition: []'
    : `  advisory_disposition:\n${disposition.map((d) =>
      `    - rule: ${d.rule}\n      disposition: ${d.disposition}\n      reason: ${d.reason}`).join('\n')}`
  return `---
type: Cairn Closing Record
title: CP-FIXTURE-001 — closing of ${subject.slice(0, 7)}
timestamp: ${TODAY}T18:00:00Z
cairn:
  path: CP-FIXTURE-001
  branch: path/cp-fixture-001
  subject_commit: ${subject}
  base: ${base}
  accepted_by: fixture-closer
  accepted_roles: [reviewer]
  accepted_at: ${TODAY}T18:00:00Z
  decision: accepted
  scope_ref: ${RECORD}#definition-of-done
  scope_digest: ${digest}
  advisories_at_candidate: [${attested.join(', ')}]
${list}
  verdict: ${verdict}
---

# CP-FIXTURE-001 — closing of ${subject.slice(0, 7)}

## Findings

### Does the diff contradict an accepted decision?

${answer}

### Does it duplicate something another running path is building?

### Did it introduce architecture that belongs in a decision record and has none?

### Is anything now documented in two places that will drift apart?

## Decision

Candidate accepted for administrative closure and exact integration.
`
}
const closingFile = (subject) => `project/coding-paths/CP-FIXTURE-001/closing-${subject}.md`

/** The resume section a running record carries once it has completed a unit:
 *  the last commit the remote holds, so the path can be picked up cold. */
const RESUME = (commit) => `
## Resume

### Checkpoint

\`\`\`text
commit : ${commit}
unit   : 1
\`\`\`
`

const STEP_RECORD = `---
type: Cairn Coding Path Step
title: 'CP-FIXTURE-001 S01 — the one constant'
timestamp: ${TODAY}T00:00:00Z
cairn:
  path: CP-FIXTURE-001
  step: S01
---

# CP-FIXTURE-001 S01

\`\`\`cairn-unit
step: S01
unit: 01
type: implementation
verified: cairn-check
\`\`\`

- one exported constant, and its module note
`

/** A real repository at the moment the closure commit A is being prepared:
 *  registered with a session-note opening, one implementation unit that
 *  WIDENED `writes:` while running, published to a real remote, the candidate
 *  audited with the real scaffolder, closing acceptance recorded with the
 *  honest empty attestation, and the administrative edits sitting UNCOMMITTED
 *  in the working tree — exactly where the operations page says to run the
 *  gate. `provisional` marks the one implementation commit as a draft, which
 *  is the one state this harness builds red on purpose. */
function readyRepository({ provisional = false, resolved = false, beforeCandidate = null, transport = 'pull-request' } = {}) {
  const dir = repository({ transport })
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  writeAcceptedRecord(dir, {
    base_commit: base,
    // Two units is a full-route trigger, and a harness that escalates one unit
    // late would be red for a reason this fixture is not about.
    ...(resolved ? { route: 'full' } : {}),
    writes: '\n    - src/**',
    governs: `\n    - docs/architecture/index.md@${'b'.repeat(40)}`
  })
  regenerateView(dir)
  commit(dir, 'register CP-FIXTURE-001')
  git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')

  // S01: source, its module note, and a widening discovered while working.
  write(dir, 'src/app.js', 'export const app = true\n')
  write(dir, 'docs/modules/application.md', `---\ntype: Cairn Module Note\ntitle: Application\ndescription: The one area.\ntags: [module]\ntimestamp: ${TODAY}T00:00:00Z\n---\n\n# Application\n\nOne exported constant.\n`)
  const record = readFileSync(join(dir, RECORD), 'utf8')
    .replace('    - src/**\n', '    - src/**\n    - docs/modules/application.md\n')
  assert.ok(record.includes('    - docs/modules/application.md'), 'the harness must widen writes: while running')
  write(dir, RECORD, record)
  write(dir, STEP, STEP_RECORD)
  commit(dir, provisional
    ? 'CP-FIXTURE-001 S01: the one constant\n\nCairn-Provisional: a draft nobody folded'
    : 'CP-FIXTURE-001 S01: the one constant')
  // The unit that finishes the draft. Nothing is rewritten: the marked commit
  // stays in the branch as what it was, and a later commit of this path says
  // the work it was drafting is done (ADR-004 decision 6, repair 006).
  if (resolved === 'in the index') {
    // The same claim, in the file that may be edited: a block added to clear
    // the gate and deleted the next minute resolves nothing.
    appendFileSync(join(dir, RECORD),
      '\n```cairn-unit\nstep: S02\nunit: 02\ntype: implementation\nverified: cairn-check\n```\n')
    commit(dir, 'CP-FIXTURE-001 S02: a unit nobody can keep')
  } else if (resolved) {
    write(dir, STEP.replace('S01.md', 'S02.md'), STEP_RECORD
      .replace(/S01/g, 'S02')
      .replace('unit: 01', 'unit: 02')
      .replace('- one exported constant, and its module note',
        '- the draft of S01, finished; the marked commit stays in the branch'))
    commit(dir, 'CP-FIXTURE-001 S02: the draft, finished')
  }
  git(dir, 'init', '-q', '--bare', `${dir}.git`)
  git(dir, 'remote', 'add', 'origin', `${dir}.git`)
  git(dir, 'push', '-q', '-u', 'origin', 'main', 'path/cp-fixture-001')
  // Where another path's work enters this path's range: the trunk moves and
  // the branch merges it in, which is the only way to a current base here.
  if (beforeCandidate) {
    beforeCandidate(dir)
    git(dir, 'push', '-q', 'origin', 'path/cp-fixture-001')
  }
  const subject = git(dir, 'rev-parse', 'HEAD').trim()
  const trunk = git(dir, 'rev-parse', 'origin/main').trim()

  // Closure. On pull-request the request's description and approval are the
  // record, and the tree carries only A's edits. On manual-git the closing
  // record is scaffolded by the real command and filled: an honest one attests
  // every advisory the candidate raised, so the provisional harness, which
  // knows its candidate is a draft, says so.
  if (transport === 'manual-git') {
    const scaffolded = execFileSync(process.execPath, ['tools/cairn-audit.mjs', '--subject', subject, '--branch', 'path/cp-fixture-001'],
      { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
    assert.match(scaffolded, /scaffolded project\/coding-paths\/CP-FIXTURE-001\/closing-/)
    write(dir, closingFile(subject), CLOSING({
      subject, base: trunk, digest: scopeDigest(dir),
      attested: provisional ? ['provisional'] : [],
      disposition: provisional ? [{ rule: 'provisional', disposition: 'accepted', reason: 'the harness marks its own draft' }] : []
    }))
  }
  write(dir, RECORD,
    readFileSync(join(dir, RECORD), 'utf8')
      .replace('  status: running\n', '  status: ready\n')
      .replace('  branch: path/cp-fixture-001\n', `  branch: path/cp-fixture-001\n  subject_commit: ${subject}\n`))
  regenerateView(dir)
  return { dir, subject, trunk }
}

/** A closure fixture: the uncommitted closure is green, and this one
 *  mutation makes the named rule block. Pull-request transport unless said. */
function closureFixture(name, rule, mutate, options = {}) {
  COVERED.add(rule)
  test(`adversarial: ${rule} — ${name}${options.transport ? ` (${options.transport})` : ''}`, () => {
    const { dir, subject, trunk } = readyRepository(options)
    try {
      const clean = check(dir)
      assert.deepEqual(blocking(clean), [],
        `an honest closure must be green, or this fixture proves nothing about ${rule}: ${describe(clean)}`)
      mutate(dir, { subject, trunk })
      const found = check(dir)
      assert.ok(blocking(found).includes(rule),
        `${rule} did not fire — findings were: ${JSON.stringify(found.findings ?? [])}`)
    } finally {
      cleanup(dir, `${dir}.git`)
    }
  })
}

for (const transport of ['pull-request', 'manual-git']) {
  test(`closure: the committed, not-yet-pushed administrative commit is green (${transport})`, () => {
    // The documented order is commit A, run the gate, push. Between the second
    // and third steps `remote-checkpoint` fires about A itself, and the
    // attestation rule once read that as an advisory missing from the
    // candidate's set: the closure the pilot ran could not pass its own
    // post-commit gate.
    const { dir } = readyRepository({ transport })
    try {
      commit(dir, 'Close CP-FIXTURE-001')
      const found = check(dir)
      assert.deepEqual(blocking(found), [], `an unpushed closure commit must be green: ${describe(found)}`)
      assert.ok(advisory(found).includes('remote-checkpoint'),
        'the unpushed closure commit must still be reported, as an advisory')
    } finally {
      cleanup(dir, `${dir}.git`)
    }
  })
}

closureFixture('the closure commit moves writes:, which acceptance was measured against', 'acceptance', (dir) => {
  edit(dir, RECORD, '    - src/**\n', '    - src/**\n    - lib/**\n')
})

closureFixture('implementation changes after acceptance, in the uncommitted closure', 'acceptance', (dir) => {
  write(dir, 'src/app.js', 'export const app = false\n')
})

closureFixture('the closing record for the candidate is missing', 'acceptance', (dir, { subject }) => {
  rmSync(join(dir, closingFile(subject)))
}, { transport: 'manual-git' })

closureFixture('the closing record is still a scaffold', 'acceptance', (dir, { subject, trunk }) => {
  write(dir, closingFile(subject), CLOSING({ subject, base: trunk, digest: scopeDigest(dir), verdict: 'TO BE FILLED BY THE REVIEWER', answer: '' }))
}, { transport: 'manual-git' })

closureFixture('an advisory attested at the candidate has no disposition', 'acceptance', (dir, { subject, trunk }) => {
  write(dir, closingFile(subject), CLOSING({ subject, base: trunk, digest: scopeDigest(dir), attested: ['record-date'] }))
}, { transport: 'manual-git' })

closureFixture('the closing record re-computed a digest the opening did not accept', 'scope-digest', (dir, { subject, trunk }) => {
  write(dir, closingFile(subject), CLOSING({ subject, base: trunk, digest: 'sha256:' + 'f'.repeat(64) }))
}, { transport: 'manual-git' })

closureFixture('the definition of done is edited after acceptance', 'scope-digest', (dir) => {
  edit(dir, RECORD, '- [ ] The rule fires.', '- [ ] The rule fires, eventually.')
})

closureFixture('a step record whose earlier text was rewritten', 'record-integrity', (dir) => {
  edit(dir, STEP, 'one exported constant', 'one exported constant, rewritten after the fact')
})

closureFixture('the trunk moved inside the declared surface since the accepted base', 'acceptance-drift', (dir) => {
  // Another participant lands a change inside `src/**` on the remote trunk.
  const other = mkdtempSync(join(tmpdir(), 'cairn-fixture-other-'))
  try {
    git(other, 'clone', '-q', '-b', 'main', `${dir}.git`, '.')
    identify(other)
    write(other, 'src/other.js', 'export const other = true\n')
    commit(other, 'someone else lands inside the surface')
    git(other, 'push', '-q', 'origin', 'main')
  } finally {
    cleanup(other)
  }
  git(dir, 'fetch', '-q', 'origin')
})

test('adversarial: provisional — a candidate whose range still carries a Cairn-Provisional commit', () => {
  // The violation lives in history, which no mutation of a green tree can
  // add after the fact. So the harness builds the one red state itself, and
  // the assertion is that the ONLY blocking difference from the honest
  // closure is the rule under test.
  COVERED.add('provisional')
  const { dir } = readyRepository({ provisional: true })
  try {
    const found = check(dir)
    assert.deepEqual(blocking(found), ['provisional'], describe(found))
    assert.ok(advisory(found).includes('provisional'), 'HEAD is that draft, and is reported as one')
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

/* ------------------------------------------------------------------ *
 * The integrating commit — ADR-008 decisions 2 and 4
 * ------------------------------------------------------------------ */

const JOURNAL_ENTRY = (id) => `---
type: Cairn Journal Entry
title: ${id} — integrated
timestamp: ${TODAY}T00:00:00Z
cairn:
  path: ${id}
  outcome: completed
---

# ${id}

Integrated by the fixture.
`

/** The record edits an integrating commit carries: `done`, the resolution, the
 *  journal entry, and the regenerated view. */
function recordDone(dir, { record = RECORD, id = 'CP-FIXTURE-001' } = {}) {
  write(dir, record,
    readFileSync(join(dir, record), 'utf8')
      .replace('  status: ready\n', '  status: done\n  resolution: completed\n'))
  write(dir, `project/log/${TODAY}-${id.toLowerCase()}.md`, JOURNAL_ENTRY(id))
  regenerateView(dir)
}

/** A real repository at the moment the integrating commit is being made: the
 *  administrative commit pushed, the candidate landed on the trunk through a
 *  `--no-ff` merge, and `done` recorded — in one commit of its own, or, when
 *  `mergeCarriesTheEdit`, inside the merge object itself, which is the shape
 *  the adopter produced twice. */
function integratedRepository({ shape = 'one commit for one path' } = {}) {
  const { dir } = readyRepository()
  if (shape === 'done on the branch') {
    // The record is taken to `done` on the branch itself, so the merge is
    // TREESAME to it and a walk that follows the branch side never sees the
    // merge at all — the arrival looks like an ordinary commit while the only
    // thing that put it on the trunk is the merge object.
    recordDone(dir)
    commit(dir, 'Close CP-FIXTURE-001, and call it done')
  } else {
    commit(dir, 'Close CP-FIXTURE-001')
  }
  git(dir, 'push', '-q', 'origin', 'path/cp-fixture-001')
  git(dir, 'checkout', '-q', 'main')
  const trunkBefore = git(dir, 'rev-parse', 'HEAD').trim()
  if (shape === 'merge carries the edit') {
    git(dir, 'merge', '--no-ff', '--no-commit', 'path/cp-fixture-001')
    recordDone(dir)
    commit(dir, 'Integrate CP-FIXTURE-001')
  } else {
    git(dir,
      'merge', '-q', '--no-ff', '-m', 'Merge request #1', 'path/cp-fixture-001')
    if (shape !== 'done on the branch') {
      recordDone(dir)
      commit(dir, 'Integrate CP-FIXTURE-001')
    }
  }
  return { dir, trunkBefore }
}

test('the integrating commit is one commit for one path, and the honest shape is green', () => {
  const { dir, trunkBefore } = integratedRepository()
  try {
    // The integrating request's own run: the trunk as it was, against the
    // commit that would land.
    const found = check(dir, '--base', trunkBefore)
    assert.deepEqual(blocking(found), [],
      `an integration made as one commit for one path must be green: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

test('adversarial: acceptance — the integrating commit is a merge object carrying the edit', () => {
  COVERED.add('acceptance')
  const { dir, trunkBefore } = integratedRepository({ shape: 'merge carries the edit' })
  try {
    const found = check(dir, '--base', trunkBefore)
    assert.ok(blocking(found).includes('acceptance'), `findings were ${describe(found)}`)
    assert.ok(found.findings.some((f) => f.rule === 'acceptance' && /merge object/.test(f.message)),
      `the refusal must name the shape: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

test('adversarial: acceptance — the merge itself is the arrival, because the branch called it done', () => {
  COVERED.add('acceptance')
  const { dir, trunkBefore } = integratedRepository({ shape: 'done on the branch' })
  try {
    const found = check(dir, '--base', trunkBefore)
    assert.ok(found.findings.some((f) => f.rule === 'acceptance' && /merge object/.test(f.message)),
      `a walk that follows the branch side reports an ordinary commit here: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

const SECOND = 'project/coding-paths/CP-SECOND-003.md'

/** A second closed path waiting on the trunk for its own integration. */
function writeSecondReadyPath(dir, landed) {
  writeAcceptedRecord(dir, {
    record: SECOND,
    id: 'CP-SECOND-003',
    status: 'ready',
    branch: 'path/cp-second-003',
    base_commit: landed,
    subject_commit: landed
  })
}

/** Two closed paths on one trunk, integrated in one commit or in two. The
 *  difference between the two fixtures is that `and`, and nothing else. */
function twoIntegrations(dir, { inOneCommit }) {
  commit(dir, 'Close CP-FIXTURE-001')
  git(dir, 'push', '-q', 'origin', 'path/cp-fixture-001')
  git(dir, 'checkout', '-q', 'main')
  writeSecondReadyPath(dir, git(dir, 'rev-parse', 'HEAD').trim())
  commit(dir, 'CP-SECOND-003 is ready')
  const trunkBefore = git(dir, 'rev-parse', 'HEAD').trim()

  git(dir,
    'merge', '-q', '--no-ff', '-m', 'Merge request #1', 'path/cp-fixture-001')
  recordDone(dir)
  if (!inOneCommit) commit(dir, 'Integrate CP-FIXTURE-001')
  recordDone(dir, { record: SECOND, id: 'CP-SECOND-003' })
  commit(dir, inOneCommit ? 'Integrate both' : 'Integrate CP-SECOND-003')
  return trunkBefore
}

test('adversarial: acceptance — one commit takes two paths to done', () => {
  COVERED.add('acceptance')
  const { dir } = readyRepository()
  try {
    const trunkBefore = twoIntegrations(dir, { inOneCommit: true })
    const found = check(dir, '--base', trunkBefore)
    assert.ok(blocking(found).includes('acceptance'), `findings were ${describe(found)}`)
    assert.ok(found.findings.some((f) => f.rule === 'acceptance' &&
      /CP-FIXTURE-001, CP-SECOND-003 reach done in [0-9a-f]{40}/.test(f.message)),
      `the refusal must name both paths and the commit: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

test('a request that spans two honest integrations is not two paths in one commit', () => {
  // The refusal is about one COMMIT recording two integrations. A range that
  // happens to contain two of them, each made on its own, is an ordinary
  // request — and refusing it would tell the author to do what they did.
  const { dir } = readyRepository()
  try {
    const trunkBefore = twoIntegrations(dir, { inOneCommit: false })
    const found = check(dir, '--base', trunkBefore)
    assert.deepEqual(blocking(found), [], `two honest integrations must be green: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

test('the journal entry is asked for under the key it is written with', () => {
  // Every one of the fifteen adopter entries carries a top-level `path:` as
  // well as the namespaced one, copied forward from the first — because the
  // message asked for the key the checker does not read.
  const { dir, trunkBefore } = integratedRepository()
  try {
    rmSync(join(dir, `project/log/${TODAY}-cp-fixture-001.md`))
    commit(dir, 'the entry, gone')
    const found = check(dir, '--base', trunkBefore)
    assert.ok(found.findings.some((f) => f.rule === 'journal-entry' && /cairn\.path: CP-FIXTURE-001/.test(f.message)),
      `the refusal names the key the checker reads: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

/* ------------------------------------------------------------------ *
 * What a range means — ADR-004 decision 3, repairs 005 and 006
 *
 * On a host that forbids rewriting, the only way to a current base is to
 * merge the trunk in, so the range from the base to the candidate always
 * carries other paths' work. These fixtures put it there.
 * ------------------------------------------------------------------ */

/** Another participant lands a completed unit on the REMOTE trunk, through a
 *  merge of their own branch — so their commits are reachable from the trunk
 *  without being trunk commits, which is what a `--no-ff` integration leaves
 *  behind and what every later range then contains. */
function landOnTrunk(dir, writeFiles, message, { trailer = null } = {}) {
  const other = mkdtempSync(join(tmpdir(), 'cairn-fixture-trunk-'))
  try {
    git(other, 'clone', '-q', '-b', 'main', `${dir}.git`, '.')
    identify(other)
    git(other, 'checkout', '-q', '-b', 'path/cp-other-002')
    writeFiles(other)
    commit(other, trailer ? `${message}\n\n${trailer}` : message)
    git(other, 'checkout', '-q', 'main')
    git(other,
      'merge', '-q', '--no-ff', '-m', `Integrate ${message}`, 'path/cp-other-002')
    git(other, 'push', '-q', 'origin', 'main')
  } finally {
    cleanup(other)
  }
  git(dir, 'fetch', '-q', 'origin')
}

/** …and this path reaches a current base the one way this host allows. */
function mergeTrunk(dir) {
  git(dir,
    'merge', '-q', '--no-ff', '-m', 'merge the trunk in', 'origin/main')
}

const OTHER_RECORD = 'project/coding-paths/CP-OTHER-002/index.md'
const OTHER_STEP = 'project/coding-paths/CP-OTHER-002/steps/S01.md'
const LONG_AGO = '2025-01-05'

/** Another path's completed unit, as the trunk carries it: a closed record and
 *  a step record dated long before today — a drift `record-date` reports about
 *  the change that adds it, and about no other. */
function otherPathsUnit(other) {
  write(other, OTHER_RECORD, `---
type: Cairn Coding Path
title: Another path
description: A path that closed before this one merged the trunk in.
tags: [coding-path]
timestamp: ${LONG_AGO}T00:00:00Z
cairn:
  id: CP-OTHER-002
  route: lightweight
  status: done
  resolution: completed
---

# CP-OTHER-002 — Another path

## Goal

Be somebody else's work.
`)
  write(other, OTHER_STEP, `---
type: Cairn Coding Path Step
title: 'CP-OTHER-002 S01 — their unit'
timestamp: ${LONG_AGO}T00:00:00Z
cairn:
  path: CP-OTHER-002
  step: S01
---

# CP-OTHER-002 S01

\`\`\`cairn-unit
step: S01
unit: 01
type: implementation
verified: cairn-check
\`\`\`

- their one line
`)
}

test('decision 3, audited: another path\'s records, merged in from the trunk, are not evidence about this path', () => {
  // The adopter's repair counted a step record under ANY path folder as this
  // path's completion, and two of another path's records would have cleared a
  // draft they had nothing to do with. The comparison every changed-file rule
  // uses is the merge-base with the trunk, and the merge-base ADVANCES with
  // the merge — so what arrived through it is behind the range, not in it.
  const dir = publishedRepository()
  try {
    landOnTrunk(dir, otherPathsUnit, 'CP-OTHER-002 S01: their unit')
    landOnTrunk(dir, (other) => {
      edit(other, OTHER_STEP, 'their one line', 'their one line, rewritten after the fact')
    }, 'CP-OTHER-002 S02: an edit of their own')
    mergeTrunk(dir)

    // This rule was READ against decision 3 and left alone: it walks the
    // comparison ref, which is the merge-base with the trunk, and the
    // merge-base advances with the merge. This fixture is the guard on that
    // property, not a repair of the rule.
    const found = check(dir)
    assert.deepEqual(blocking(found), [],
      `another path's rewritten step is their repository's business, not this path's: ${describe(found)}`)
    assert.ok(!advisory(found).includes('record-date'),
      'their record is dated long ago and was added by their commit, not by this change')

    // And the property is the merge-base, nothing subtler: told to compare
    // against a base BEHIND the merge, the same run reads their records as
    // this change's. The default and the CI command never ask that question —
    // the base they resolve is the trunk — and the header names the base of
    // any run that does.
    // `main` here is the local ref, left where this branch forked: a base
    // behind the merge, which is the one shape the merge-base cannot correct.
    const pinned = check(dir, '--base', git(dir, 'rev-parse', 'main').trim())
    assert.ok(advisory(pinned).includes('record-date'),
      'the scoping IS the comparison ref: told to compare against a base behind the merge, the same run reads their record as this change\'s')

    // And the same run still reads THIS path's own records: the scoping is
    // path-scoped, not blind.
    write(dir, STEP, STEP_RECORD.replace(`timestamp: ${TODAY}`, `timestamp: ${LONG_AGO}`))
    commit(dir, 'CP-FIXTURE-001 S01: the one constant')
    assert.ok(advisory(check(dir)).includes('record-date'),
      'this path\'s own record, dated long before the commit that adds it, is still reported')
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

test('repair 006: a draft this path finished later does not refuse its candidate', () => {
  // Crumbz CP-004 pushed S16 as a provisional commit, finished the work in
  // S17, merged the trunk in and was refused by a rule that matched the
  // trailer anywhere in the range — with the one remedy this host forbids.
  const { dir } = readyRepository({ provisional: true, resolved: true })
  try {
    const found = check(dir)
    assert.deepEqual(blocking(found), [],
      `the completed unit that finishes a draft is what resolves it: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

test('repair 006: a unit claimed in the mutable record resolves nothing', () => {
  const { dir } = readyRepository({ provisional: true, resolved: 'in the index' })
  try {
    assert.ok(blocking(check(dir)).includes('provisional'),
      'a draft is finished by a step record, which cannot be unwritten, and by nothing else')
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

test('decision 3: another path\'s draft, merged in from the trunk, is not this candidate\'s', () => {
  const { dir } = readyRepository({
    beforeCandidate: (repo) => {
      landOnTrunk(repo, otherPathsUnit, 'CP-OTHER-002 S01: their draft',
        { trailer: 'Cairn-Provisional: their unfinished work, not ours' })
      mergeTrunk(repo)
    }
  })
  try {
    const found = check(dir)
    assert.deepEqual(blocking(found), [],
      `a trailer on another path's commit says nothing about this path: ${describe(found)}`)
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

const REPAIR_STEP = (supersedes) => `---
type: Cairn Coding Path Step
title: 'CP-FIXTURE-001 S02 — the correction'
timestamp: ${TODAY}T00:00:00Z
cairn:
  path: CP-FIXTURE-001
  step: S02
---

# CP-FIXTURE-001 S02

\`\`\`cairn-unit
step: S02
unit: 02
type: repair
supersedes: ${supersedes}
verified: cairn-check
\`\`\`

- S01 was edited after it was pushed, and nothing is rewritten to undo it
`

test('repair 005: an edited step is answered by a later step that binds both blobs', () => {
  // One unsupported unit type on the adopter became four faults: the record
  // was refused, the agent edited the pushed record, and on a no-rewrite host
  // neither could be undone. The specification's remedy — a superseding record
  // naming both ids — had no predicate until this.
  // `full`, because two units on a lightweight path is a trigger of its own
  // and this fixture is not about the route.
  const dir = publishedRepository({ record: { route: 'full' } })
  const step2 = 'project/coding-paths/CP-FIXTURE-001/steps/S02.md'
  try {
    write(dir, STEP, STEP_RECORD)
    // A unit refreshes the resume section in the same change, and a running
    // record that completed one must name the commit the remote holds.
    appendFileSync(join(dir, RECORD), RESUME(git(dir, 'rev-parse', 'HEAD').trim()))
    commit(dir, 'CP-FIXTURE-001 S01: the one constant')
    git(dir, 'push', '-q', 'origin', 'path/cp-fixture-001')
    assert.deepEqual(blocking(check(dir)), [], `the baseline must be green: ${describe(check(dir))}`)

    const before = git(dir, 'rev-parse', `HEAD:${STEP}`).trim()
    edit(dir, STEP, 'one exported constant', 'a constant that was always two')
    commit(dir, 'the edit that cannot be undone')
    git(dir, 'push', '-q', 'origin', 'path/cp-fixture-001')
    const after = git(dir, 'rev-parse', `HEAD:${STEP}`).trim()
    assert.ok(blocking(check(dir)).includes('record-integrity'), 'the edit is a violation and stays one')

    // A claim that names a blob the record does not carry binds nothing.
    write(dir, step2, REPAIR_STEP(`${STEP}@${before}..${'f'.repeat(40)}`))
    const wrong = check(dir)
    assert.ok(blocking(wrong).includes('record-integrity'),
      'a supersession nobody verifies is a sentence that clears any edit')

    // The true claim, in the mutable record beside the steps rather than in a
    // record of its own: a sentence that can be added to clear the gate and
    // deleted the next minute leaves the edit exempted and nothing saying so.
    rmSync(join(dir, step2))
    appendFileSync(join(dir, RECORD), `\n\`\`\`cairn-unit\nstep: S02\nunit: 02\ntype: repair\nsupersedes: ${STEP}@${before}..${after}\nverified: cairn-check\n\`\`\`\n`)
    assert.ok(blocking(check(dir)).includes('record-integrity'),
      'a claim in a file that may be edited is not a superseding record')
    write(dir, RECORD, readFileSync(join(dir, RECORD), 'utf8').split('\n```cairn-unit')[0] + '\n')

    // The claim, true: the blob the record was added with, the blob it carries.
    write(dir, step2, REPAIR_STEP(`${STEP}@${before}..${after}`))
    const bound = check(dir)
    assert.ok(!blocking(bound).includes('record-integrity'),
      `the bound supersession is the remedy: ${describe(bound)}`)
    assert.ok(advisory(bound).includes('record-integrity'), 'and it is stated, not silent')
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

/* ------------------------------------------------------------------ *
 * Invocation parity — one tree, one verdict
 *
 * The first adopter found that the default local command and the CI command
 * compared different bases, so nine findings were invisible locally for many
 * pushes. The fix was a default, and a default is a claim until something
 * compares the two invocations on ONE tree and requires one verdict.
 * ------------------------------------------------------------------ */

test('parity: the local default and the CI invocation agree on one tree', () => {
  const dir = pathRepository()
  try {
    const local = check(dir)
    const ci = check(dir, '--base', 'main')
    assert.deepEqual(blocking(local).sort(), blocking(ci).sort(),
      'the two invocations must report the same blocking rules, or one of them is judging a different comparison')
    assert.deepEqual(advisory(local).sort(), advisory(ci).sort())
  } finally {
    cleanup(dir)
  }
})

test('parity: a violation is equally visible to both invocations', () => {
  const dir = pathRepository()
  try {
    appendFileSync(join(dir, RECORD), '\n- [ ] One more thing.\n')
    const local = check(dir)
    const ci = check(dir, '--base', 'main')
    assert.ok(blocking(local).includes('work-unit'))
    assert.deepEqual(blocking(local).sort(), blocking(ci).sort())
  } finally {
    cleanup(dir)
  }
})

test('parity: a host describing another repository does not name this one\'s branch', () => {
  const dir = pathRepository()
  try {
    const hosted = {
      ...process.env,
      GITHUB_ACTIONS: 'true',
      GITHUB_REF_NAME: 'path/cp-ops-002',
      GITHUB_WORKSPACE: '/home/runner/work/elsewhere/elsewhere',
      GITHUB_HEAD_REF: ''
    }
    const inCi = checkWithEnv(dir, hosted)
    const local = check(dir)
    assert.deepEqual(blocking(inCi).sort(), blocking(local).sort())
    assert.ok(!blocking(inCi).includes('branch-path'), 'branch-path fired on a branch the host named, not one the tree has')
  } finally {
    cleanup(dir)
  }
})

test('parity: a committed edit to an immutable record is judged against the trunk, not the last push', () => {
  // Twenty-six immutable records were once edited at a path's first
  // step and every push run reported OK, because record integrity compared
  // each push with the one before it. The comparison every changed-file rule
  // uses is the merge-base with the trunk, and so is this one now.
  const { dir } = readyRepository()
  try {
    edit(dir, STEP, 'one exported constant', 'a constant that was always two')
    commit(dir, 'a later commit that rewrites an earlier step')
    git(dir, 'push', '-q', 'origin', 'path/cp-fixture-001')
    // Committed AND pushed: the working tree is clean, so only a comparison
    // reaching back to the trunk can see the mutation.
    assert.ok(blocking(check(dir)).includes('record-integrity'))
  } finally {
    cleanup(dir, `${dir}.git`)
  }
})

/** Blocking rules with no adversarial fixture. Declared rather than counted,
 *  so adding a blocking rule forces a choice: write its fixture, or add it here
 *  deliberately. Empty since Cairn 1.0, and the test keeps it honest in both
 *  directions. */
const UNCOVERED = new Set([])

test('adversarial coverage is declared, not assumed', async () => {
  const { extractRules } = await import('./cairn-rules.mjs')
  const source = readFileSync(new URL('./cairn-check.mjs', import.meta.url), 'utf8')
  const blockingRules = new Set(
    extractRules(source).filter((rule) => rule.level === 'blocking').map((rule) => rule.name)
  )

  for (const rule of COVERED) {
    assert.ok(blockingRules.has(rule), `${rule} has a fixture but is not a blocking rule`)
    assert.ok(!UNCOVERED.has(rule), `${rule} is covered and must not also be listed as uncovered`)
  }

  const unaccounted = [...blockingRules].filter((rule) => !COVERED.has(rule) && !UNCOVERED.has(rule))
  assert.deepEqual(unaccounted, [],
    'a new blocking rule must either get an adversarial fixture or be listed in UNCOVERED deliberately')

  const stale = [...UNCOVERED].filter((rule) => !blockingRules.has(rule))
  assert.deepEqual(stale, [], 'UNCOVERED names a rule that no longer blocks — remove it')
})
