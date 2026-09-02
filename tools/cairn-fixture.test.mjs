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

/** Rules an adversarial fixture in this file demonstrates rejecting. */
const COVERED = new Set()

function git(dir, ...args) {
  return execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
}

function commit(dir, message) {
  git(dir, 'add', '-A')
  git(dir, '-c', 'user.email=t@example.invalid', '-c', 'user.name=fixture', 'commit', '-qm', message)
}

/** A real, installed, green repository. */
function repository(options = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'cairn-fixture-'))
  applyPlan(planInstall({ ...defaultOptions(), ...options }), dir)
  git(dir, 'init', '-q', '-b', 'main')
  commit(dir, 'install cairn')
  return dir
}

/** Run the real checker and return its structured verdict. */
function check(dir, ...args) {
  return checkWithEnv(dir, process.env, ...args)
}

/** The same, with an explicit environment. The suite's own CI failure (Atomik
 *  S09d) was the checker reading the HOST's branch variables while judging a
 *  fixture repository, so the environment is a parameter a test can control. */
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
const OPENING_SECTION = (digest) => `
## Opening acceptance

\`\`\`yaml
decision: accepted
accepted_by: fixture-opener
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-01T09:00:00Z
scope_ref: ${RECORD}#definition-of-done
scope_digest: ${digest}
\`\`\`
`

const PATH_RECORD = (overrides = {}) => {
  const { opening = null, ...rest } = overrides
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
timestamp: 2026-09-01T00:00:00Z
cairn:
${body}
---

# CP-FIXTURE-001 — Fixture path

## Goal

Exercise one rule.

## Definition of done

- [ ] The rule fires.
${opening ? OPENING_SECTION(opening) : ''}`
}

function scopeDigest(dir) {
  return execFileSync(process.execPath,
    [CHECK, '--scope-digest', `${RECORD}#definition-of-done`],
    { cwd: dir, encoding: 'utf8', stdio: 'pipe' }).trim()
}

/** Write the record, then write it again with its opening acceptance bound to
 *  the digest the first write produced. The definition of done sits above the
 *  acceptance, so the second write leaves the digested text unchanged. */
function writeAcceptedRecord(dir, fields) {
  write(dir, RECORD, PATH_RECORD(fields))
  write(dir, RECORD, PATH_RECORD({ ...fields, opening: scopeDigest(dir) }))
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

pathFixture('a file written outside the declared surface, with the declaration unchanged', 'scope-drift', (dir) => {
  write(dir, 'lib/outside.js', 'export const outside = true\n')
}, { record: { writes: '\n    - src/**' } })

pathFixture('a published commit rewritten on a no-rewrite host', 'path-history', (dir) => {
  git(dir, '-c', 'user.email=t@example.invalid', '-c', 'user.name=fixture', 'commit', '--amend', '-qm', 'rewritten in place')
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
timestamp: 2026-09-01T18:00:00Z
cairn:
  path: CP-FIXTURE-001
  branch: path/cp-fixture-001
  subject_commit: ${subject}
  base: ${base}
  accepted_by: fixture-closer
  accepted_roles: [reviewer]
  accepted_at: 2026-09-01T18:00:00Z
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

const STEP_RECORD = `---
type: Cairn Coding Path Step
title: 'CP-FIXTURE-001 S01 — the one constant'
timestamp: 2026-09-01T00:00:00Z
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
function readyRepository({ provisional = false, transport = 'pull-request' } = {}) {
  const dir = repository({ transport })
  const base = git(dir, 'rev-parse', 'HEAD').trim()
  writeAcceptedRecord(dir, {
    base_commit: base,
    writes: '\n    - src/**',
    governs: `\n    - docs/architecture/index.md@${'b'.repeat(40)}`
  })
  regenerateView(dir)
  commit(dir, 'register CP-FIXTURE-001')
  git(dir, 'checkout', '-q', '-b', 'path/cp-fixture-001')

  // S01: source, its module note, and a widening discovered while working.
  write(dir, 'src/app.js', 'export const app = true\n')
  write(dir, 'docs/modules/application.md', '---\ntype: Cairn Module Note\ntitle: Application\ndescription: The one area.\ntags: [module]\ntimestamp: 2026-09-01T00:00:00Z\n---\n\n# Application\n\nOne exported constant.\n')
  const record = readFileSync(join(dir, RECORD), 'utf8')
    .replace('    - src/**\n', '    - src/**\n    - docs/modules/application.md\n')
  assert.ok(record.includes('    - docs/modules/application.md'), 'the harness must widen writes: while running')
  write(dir, RECORD, record)
  write(dir, STEP, STEP_RECORD)
  commit(dir, provisional
    ? 'CP-FIXTURE-001 S01: the one constant\n\nCairn-Provisional: a draft nobody folded'
    : 'CP-FIXTURE-001 S01: the one constant')
  git(dir, 'init', '-q', '--bare', `${dir}.git`)
  git(dir, 'remote', 'add', 'origin', `${dir}.git`)
  git(dir, 'push', '-q', '-u', 'origin', 'main', 'path/cp-fixture-001')
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
 * Invocation parity — one tree, one verdict
 *
 * Atomik S08a found that the default local command and the CI command
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
  // Atomik S09e: twenty-six immutable records were edited at a path's first
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
