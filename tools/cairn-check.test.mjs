/**
 * Tests for the Cairn validator — run with Node's own test runner:
 *
 *   npm test        (node --test tools/)
 *
 * Deliberately not vitest: the validator must stay runnable with plain
 * `node` in any pipeline, so its tests carry no dependency either.
 *
 * The point of these cases is that a validator which only ever passes is
 * worthless. Every blocking rule is exercised in the state that should
 * FAIL it, and in the neighbouring state that should not. The pure half of
 * each rule is proved here against `evaluate()`; the wired half — the rule
 * running inside a real repository — is proved in cairn-fixture.test.mjs.
 *
 * Ported from Atomik at 46bdd11 for Cairn 1.0 and cut with the rules: the
 * fixtures of retired rules left with them, the fixtures of folded rules
 * assert the name they now fire under, and every path here is derived from
 * this repository's binding rather than copied from another host's.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import {
  adrFrontmatterErrors,
  closingAcceptanceErrors,
  closingRecordIn,
  fillErrors,
  INTEGRATION_TRANSPORT,
  areaOf,
  journalRecords,
  filenameDate,
  recordDateFindings,
  duplicatePathIdentityFindings,
  effectiveBinding,
  openingFromRecord,
  openingAcceptanceErrors,
  dependencyFindings,
  unmetDependencies,
  evaluate,
  globToRegExp,
  isCommitPin,
  isAppendOnlyStepRecord,
  isStepRecordRelocation,
  isImmutableRecord,
  isPathBranch,
  matchesAny,
  nameStatusMutations,
  parseWrites,
  parseWorkUnits,
  pathFrontmatterErrors,
  porcelainPaths,
  porcelainMutations,
  readFrontmatter,
  registrationMatches,
  resolveBranch,
  resolveBase,
  orphanConcepts,
  addedConcepts,
  namesForReading,
  CONCEPTS_DIR,
  GUARDED_ROOTS,
  METADATA_NAMESPACE,
  PROJECT_DIR,
  PATH_DIR,
  JOURNAL_DIR,
  MODULE_DIR,
  ADR_DIR,
  REMOTE,
  TRUNK_BRANCH,
  TRUNK_BASE_CANDIDATES,
  stripCode,
  transitionErrors,
  githubSlug,
  forgeGaps,
  readForge,
  githubRequest,
  profileLine,
  patternsMeet,
  writesOverlaps,
  statusCommit,
  checkpointCommit,
  resolveBranchRef,
  unresolvedProvisional,
  parseSupersession,
  supersessionClaim,
  supersessionBinds,
  commitsWithFiles,
  isVerbatimRelocation,
  preservesAppendOnlyRecord,
  recordOriginFromFollowLog,
  workUnitErrors,
  resolveScopeSection,
  scopeDigest,
  closureFieldErrors,
  acceptanceDrift,
  dispositionErrors,
  CLOSURE_MUTABLE_FIELDS,
  CLOSURE_RAISED_ADVISORIES,
  closureMutableFields,
  isObjectId,
  DISPOSITIONS,
  fullRouteTriggers,
  routeDescent,
  redactionMarkers,
  ROUTES,
  PROVISIONAL_TRAILER,
  WORK_UNIT_TYPES
} from './cairn-check.mjs'
import { installedConfig, slash } from './cairn-config.mjs'

const CAIRN_CONFIG = installedConfig()

/* ------------------------------------------------------------------ *
 * The binding these tests run under. Nothing below names a host path that
 * is not derived from cairn.config.json, so the suite reads the same in the
 * protocol's own repository and in an adopter's.
 * ------------------------------------------------------------------ */

const SOURCE = GUARDED_ROOTS[0]                       // e.g. `tools/`
const SRC = `${SOURCE}example.mjs`
const SRC2 = `${SOURCE}other.mjs`
const AREA = CAIRN_CONFIG.areas[0]
const NOTE = AREA.note                                // the area's module note
const ARCH = `${slash(CAIRN_CONFIG.roots.architecture)}index.md`
const CANDIDATE = 'a'.repeat(40)

/** Roles a record from another host might still keep; nothing here reads them. */
const SESSIONS = `${PROJECT_DIR}/sessions`
const CLOSING = `${PATH_DIR}/CP-EX-010/closing-${'a'.repeat(40)}.md`
/** The closing record lives in the path folder on manual-git; nothing on pull-request. */
const MANUAL = { transport: 'manual-git' }

const A_PATH = {
  file: `${PATH_DIR}/CP-EX-010.md`,
  front: {
    id: 'CP-EX-010',
    route: 'lightweight',
    status: 'running',
    base_commit: '70f7e27',
    branch: 'path/cp-ex-010'
  },
  writes: [SRC, NOTE]
}

test('the checker exposes the installed host binding instead of parallel constants', () => {
  assert.equal(INTEGRATION_TRANSPORT, CAIRN_CONFIG.transport.integration)
  assert.equal(TRUNK_BRANCH, CAIRN_CONFIG.trunk)
  assert.equal(REMOTE, CAIRN_CONFIG.remote)
  assert.equal(METADATA_NAMESPACE, CAIRN_CONFIG.metadataNamespace)
  assert.equal(PROJECT_DIR, CAIRN_CONFIG.roots.project)
  assert.equal(CONCEPTS_DIR, CAIRN_CONFIG.roots.concepts)
  assert.equal(MODULE_DIR, CAIRN_CONFIG.roots.modules)
  assert.equal(ADR_DIR, CAIRN_CONFIG.roots.decisions)
  assert.deepEqual(GUARDED_ROOTS, CAIRN_CONFIG.roots.source.map(slash))
  assert.deepEqual(TRUNK_BASE_CANDIDATES, [
    `${CAIRN_CONFIG.remote}/${CAIRN_CONFIG.trunk}`,
    CAIRN_CONFIG.trunk
  ])
  assert.deepEqual(effectiveBinding().sourceRoots, CAIRN_CONFIG.roots.source)
  assert.equal(effectiveBinding().enforcementProfile, CAIRN_CONFIG.enforcementProfile)
  assert.equal(effectiveBinding().defaultRoute, CAIRN_CONFIG.defaultRoute)
})

/** An opening acceptance as the record carries it inline. */
const OPENING = {
  decision: 'accepted',
  accepted_by: 'initiator@example.test',
  accepted_roles: ['initiator', 'reviewer'],
  accepted_at: '2026-08-20T09:00:00Z',
  scope_ref: `${PATH_DIR}/CP-EX-010/index.md#definition-of-done`,
  scope_digest: 'sha256:abc'
}

const acceptedRecord = (pathId = A_PATH.front.id, subject = CANDIDATE) => ({
  path: pathId,
  ceremony: 'closing',
  subject_commit: subject,
  accepted_by: 'reviewer@example.test',
  accepted_at: '2026-08-25T12:00:00Z',
  decision: 'accepted',
  scope_ref: `${PATH_DIR}/${pathId}.md#definition-of-done`,
  advisories_at_candidate: [],
  advisory_disposition: [],
  scope_digest: 'sha256:abc',
  verdict: 'clean',
  __file: `${PATH_DIR}/${pathId}/closing-${subject}.md`,
  __fill: []
})

/** `git status --porcelain -z` output: NUL-terminated records, never quoted. */
const z = (...records) => records.map((r) => `${r}\0`).join('')

const run = (changed, branch, paths = [A_PATH], extra = {}) =>
  evaluate({
    changed,
    branch,
    paths,
    resolveFile: () => true,
    trunkContained: true,
    registrationState: 'registered',
    registrationBaseState: 'match',
    closureFor: (id) => acceptedRecord(id),
    closureStateFor: (path) => ({
      subjectIsAncestor: true,
      commitsAfterSubject: path.front.status === 'done' ? 2 : 1,
      forbiddenFiles: []
    }),
    openingRecordFor: () => OPENING,
    // A healthy repository: the definition of done digests to what its
    // acceptance accepted. Since ADR-002 decision 1 the seal is judged
    // wherever the record changes, so every run over a changed record reads
    // this, not only a closing one.
    scopeDigestFor: () => OPENING.scope_digest,
    previousPaths: new Map(paths.map((path) => [path.file, path.front])),
    immutableMutations: [],
    ...extra
  })

const rules = (findings, level) =>
  findings.filter((f) => f.level === level).map((f) => f.rule)

const messages = (findings, rule, level = null) =>
  findings.filter((f) => f.rule === rule && (!level || f.level === level)).map((f) => f.message)

/* ------------------------------------------------------------------ *
 * branch-path — one path: one record, one branch; and a branch with no name
 * ------------------------------------------------------------------ */

test('a path branch with no coding path declaring it is blocked', () => {
  const found = run(['README.md'], 'path/orphan', [])
  assert.ok(rules(found, 'blocking').includes('branch-path'))
})

test('a declared path that is neither running nor closing as done is blocked', () => {
  const stale = { ...A_PATH, front: { ...A_PATH.front, status: 'draft' } }
  const found = run(['README.md'], 'path/cp-ex-010', [stale])
  assert.ok(rules(found, 'blocking').includes('branch-path'))
})

test('a running path with no base commit is blocked', () => {
  const partial = { ...A_PATH, front: { id: 'X', status: 'running', branch: 'path/cp-ex-010' } }
  const found = run(['README.md'], 'path/cp-ex-010', [partial])
  assert.ok(
    found.some((f) => f.rule === 'branch-path' && f.message.includes(`${METADATA_NAMESPACE}.base_commit`))
  )
})

test('a detached checkout changing source is BLOCKED under branch-path, never silently OK', () => {
  // `branch-identity` in 0.2. A check that cannot name the branch cannot run
  // the path rules, and silence is indistinguishable from a pass.
  const found = run([SRC, NOTE, A_PATH.file], 'HEAD', [A_PATH], { branchSource: 'detached' })
  const finding = found.find((f) => f.rule === 'branch-path' && f.level === 'blocking')
  assert.ok(finding, 'source changed while every path rule was skipped — that must fail, not pass')
  assert.equal(finding.outcome, 'inconclusive', 'an unnamed branch is missing evidence, not a proven violation')
})

test('a detached checkout touching no guarded root is advisory only', () => {
  // A docs-only or tag build must not be punished for how it was checked out:
  // a false blocking verdict costs more than a missed one.
  const found = run(['docs/index.md'], 'HEAD', [A_PATH], { branchSource: 'detached' })
  assert.deepEqual(rules(found, 'blocking'), [])
  assert.ok(rules(found, 'advisory').includes('branch-path'))
})

test('a normally resolved branch raises no identity finding', () => {
  const found = run(['docs/index.md'], 'path/cp-ex-010')
  assert.ok(![...rules(found, 'blocking'), ...rules(found, 'advisory')].includes('branch-path'))
})

/* ------------------------------------------------------------------ *
 * registration — the declaration is a trunk fact before implementation
 * ------------------------------------------------------------------ */

test('an unregistered path branch is blocked; a grandfathered one is advisory', () => {
  const missing = run(['README.md'], 'path/cp-ex-010', [A_PATH], { registrationState: 'missing' })
  assert.ok(rules(missing, 'blocking').includes('registration'))

  const grandfathered = run(['README.md'], 'path/cp-ex-010', [A_PATH], { registrationState: 'grandfathered' })
  assert.ok(!rules(grandfathered, 'blocking').includes('registration'))
  assert.ok(rules(grandfathered, 'advisory').includes('registration'))

  const registered = run(['README.md'], 'path/cp-ex-010', [A_PATH])
  assert.ok(!rules(registered, 'blocking').includes('registration'))
})

test('unavailable registration evidence is inconclusive and still exits through blocking', () => {
  const found = run(['README.md'], 'path/cp-ex-010', [A_PATH], {
    registrationState: null,
    registrationBaseState: null
  })
  for (const rule of ['registration', 'registration-base']) {
    assert.ok(found.some((finding) =>
      finding.rule === rule && finding.level === 'blocking' && finding.outcome === 'inconclusive'))
  }
})

test('a base_commit different from the registration parent is blocked', () => {
  const found = run(['README.md'], 'path/cp-ex-010', [A_PATH], { registrationBaseState: { state: 'mismatch', registration: 'b'.repeat(40), parent: 'c'.repeat(40) } })
  assert.ok(rules(found, 'blocking').includes('registration-base'))
})

test('a trunk registration must match the path identity, running state and branch', () => {
  const registered = [
    '---',
    'title: Registered path',
    `${METADATA_NAMESPACE}:`,
    '  id: CP-EX-010',
    '  status: running',
    '  branch: path/cp-ex-010',
    '  base_commit: abc1234',
    '---',
    ''
  ].join('\n')

  assert.ok(registrationMatches(registered, 'CP-EX-010', 'path/cp-ex-010', 'abc1234'))
  assert.ok(!registrationMatches(registered, 'CP-EX-011', 'path/cp-ex-010', 'abc1234'))
  assert.ok(!registrationMatches(registered, 'CP-EX-010', 'path/cp-other', 'abc1234'))
  assert.ok(!registrationMatches(registered, 'CP-EX-010', 'path/cp-ex-010', 'def5678'))
  assert.ok(!registrationMatches(registered.replace('status: running', 'status: draft'), 'CP-EX-010', 'path/cp-ex-010', 'abc1234'))
  assert.ok(!registrationMatches('not frontmatter', 'CP-EX-010', 'path/cp-ex-010', 'abc1234'))
})

/* ------------------------------------------------------------------ *
 * remote-checkpoint and path-history — pushed, and never rewritten
 * ------------------------------------------------------------------ */

test('an unpublished path HEAD is advisory; a published HEAD and trunk are quiet', () => {
  const missing = run(['README.md'], 'path/cp-ex-010', [A_PATH], {
    remoteCheckpoint: { state: 'missing', upstream: null }
  })
  assert.ok(rules(missing, 'advisory').includes('remote-checkpoint'))
  assert.ok(!rules(missing, 'blocking').includes('remote-checkpoint'))

  const unpushed = run(['README.md'], 'path/cp-ex-010', [A_PATH], {
    remoteCheckpoint: { state: 'unpushed', upstream: 'origin/path/cp-ex-010' }
  })
  assert.ok(rules(unpushed, 'advisory').includes('remote-checkpoint'))
  assert.ok(unpushed.some((f) => f.rule === 'remote-checkpoint' && f.message.includes('origin/path/cp-ex-010')))

  const published = run(['README.md'], 'path/cp-ex-010', [A_PATH], {
    remoteCheckpoint: { state: 'published', upstream: 'origin/path/cp-ex-010' }
  })
  assert.ok(!rules(published, 'advisory').includes('remote-checkpoint'))

  const trunk = run(['README.md'], TRUNK_BRANCH, [A_PATH], {
    remoteCheckpoint: { state: 'unpushed', upstream: `origin/${TRUNK_BRANCH}` }
  })
  assert.ok(!rules(trunk, 'advisory').includes('remote-checkpoint'))
})

test('a rewritten published tip blocks when the host forbids rewriting', () => {
  // ADR-022. Retention is not the reference checker's business any more, so
  // this is the ONLY thing standing between the policy and an unnoticed
  // force-push.
  const diverged = { state: 'unpushed', upstream: 'origin/path/cp-ex-010', diverged: true }
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'all' }],
    rewritingForbidden: true,
    remoteCheckpoint: diverged
  })
  assert.ok(rules(found, 'blocking').includes('path-history'), 'a diverged upstream is a rewritten published commit')

  // A retaining host has declared that rewriting is its own affair.
  const retaining = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'all' }],
    rewritingForbidden: false,
    remoteCheckpoint: diverged
  })
  assert.ok(!rules(retaining, 'blocking').includes('path-history'))
})

test('being merely ahead of the upstream is not a rewrite', () => {
  const ahead = { state: 'unpushed', upstream: 'origin/path/cp-ex-010', diverged: false }
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'all' }],
    rewritingForbidden: true,
    remoteCheckpoint: ahead
  })
  assert.ok(!rules(found, 'blocking').includes('path-history'))
  assert.ok(rules(found, 'advisory').includes('remote-checkpoint'),
    'it is still an unpushed commit, and that is what should be reported')
})

test('a path branch with no upstream cannot have rewritten anything', () => {
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'all' }],
    rewritingForbidden: true,
    remoteCheckpoint: { state: 'missing', upstream: null }
  })
  assert.ok(!rules(found, 'blocking').includes('path-history'))
  assert.ok(rules(found, 'advisory').includes('remote-checkpoint'))
})

/* ------------------------------------------------------------------ *
 * rebase — trunk containment. Every path merges itself, so nothing else
 * stops a stale branch from landing on a trunk it never saw. Unknown must
 * read as "cannot tell", never as a pass.
 * ------------------------------------------------------------------ */

test('a path branch behind the trunk is blocked; up to date is not', () => {
  const stale = run(['README.md'], 'path/cp-ex-010', [A_PATH], { trunkContained: false })
  assert.ok(rules(stale, 'blocking').includes('rebase'))
  assert.match(messages(stale, 'rebase')[0], /merge the trunk into/, 'a no-rewrite host is told to merge, never to rebase')

  const fresh = run(['README.md'], 'path/cp-ex-010', [A_PATH], { trunkContained: true })
  assert.ok(!rules(fresh, 'blocking').includes('rebase'))

  const unknown = run(['README.md'], 'path/cp-ex-010', [A_PATH], { trunkContained: null })
  assert.ok(unknown.some((f) => f.rule === 'rebase' && f.level === 'blocking' && f.outcome === 'inconclusive'))
})

test('the trunk itself is never asked to contain itself', () => {
  const found = run(['README.md'], TRUNK_BRANCH, [A_PATH], { trunkContained: false })
  assert.ok(!rules(found, 'blocking').includes('rebase'))
})

/* ------------------------------------------------------------------ *
 * acceptance — one exact candidate, its audit, its closure surface, its
 * dispositions, and the roles that signed it
 * ------------------------------------------------------------------ */

const readyPath = (extra = {}) => ({
  ...A_PATH,
  front: { ...A_PATH.front, status: 'ready', subject_commit: CANDIDATE, ...extra }
})

test('on manual-git a path branch may declare ready only with a closing record for exactly that candidate', () => {
  const ready = readyPath()
  const closing = [ready.file, CLOSING]

  const recorded = run(closing, 'path/cp-ex-010', [ready], {
    ...MANUAL, previousPaths: new Map([[ready.file, A_PATH.front]])
  })
  assert.ok(!rules(recorded, 'blocking').includes('branch-path'))
  assert.ok(!rules(recorded, 'blocking').includes('acceptance'))

  const missing = run(closing, 'path/cp-ex-010', [ready], {
    ...MANUAL, previousPaths: new Map([[ready.file, A_PATH.front]]), closureFor: () => null
  })
  assert.ok(rules(missing, 'blocking').includes('acceptance'))

  const other = run(closing, 'path/cp-ex-010', [ready], {
    ...MANUAL, previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => acceptedRecord(A_PATH.front.id, 'b'.repeat(40))
  })
  assert.ok(messages(other, 'acceptance', 'blocking').some((m) => /must equal the closing record subject_commit/.test(m)))
})

test('on pull-request the request is the record: no closing file is asked for', () => {
  // The forge keeps the description and the approval. What the checker can
  // prove from Git it still proves: the candidate, its closure surface, the
  // opening digest, provisional commits and drift.
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    transport: 'pull-request', previousPaths: new Map([[ready.file, A_PATH.front]]), closureFor: () => null
  })
  assert.ok(!rules(found, 'blocking').includes('acceptance'))
  const moved = run([ready.file], 'path/cp-ex-010', [ready], {
    transport: 'pull-request', previousPaths: new Map([[ready.file, A_PATH.front]]), closureFor: () => null,
    closureStateFor: () => ({ subjectIsAncestor: true, commitsAfterSubject: 1, forbiddenFiles: [SRC] })
  })
  assert.ok(messages(moved, 'acceptance', 'blocking').some((m) => /implementation changed/.test(m)))
  const twice = run([ready.file], 'path/cp-ex-010', [ready], {
    transport: 'pull-request', previousPaths: new Map([[ready.file, A_PATH.front]]), closureFor: () => null,
    closureStateFor: () => ({ subjectIsAncestor: true, commitsAfterSubject: 2, forbiddenFiles: [] })
  })
  assert.ok(messages(twice, 'acceptance', 'blocking').some((m) => /exactly one administrative commit/.test(m)))
})

test('a path marked done proves its candidate reachable; on manual-git it also needs its closing record', () => {
  const done = {
    ...A_PATH,
    front: { ...A_PATH.front, status: 'done', subject_commit: CANDIDATE, resolution: 'completed' }
  }
  const missing = run([done.file], TRUNK_BRANCH, [done], {
    ...MANUAL, previousPaths: new Map([[done.file, A_PATH.front]]), closureFor: () => null
  })
  assert.ok(rules(missing, 'blocking').includes('acceptance'))

  const recorded = run([done.file], TRUNK_BRANCH, [done], {
    ...MANUAL, previousPaths: new Map([[done.file, A_PATH.front]])
  })
  assert.ok(!rules(recorded, 'blocking').includes('acceptance'))

  // At done the transport has merged; other paths may have landed beside this
  // one, so only reachability is proved here — the closure surface was proved
  // at ready on the exact commit that landed.
  const merged = run([done.file], TRUNK_BRANCH, [done], {
    transport: 'pull-request', previousPaths: new Map([[done.file, A_PATH.front]]), closureFor: () => null,
    closureStateFor: () => ({ subjectIsAncestor: true, commitsAfterSubject: 7, forbiddenFiles: ['other/path.ts'] })
  })
  assert.ok(!rules(merged, 'blocking').includes('acceptance'))
  const unreachable = run([done.file], TRUNK_BRANCH, [done], {
    transport: 'pull-request', previousPaths: new Map([[done.file, A_PATH.front]]), closureFor: () => null,
    closureStateFor: () => ({ subjectIsAncestor: false, commitsAfterSubject: 0, forbiddenFiles: [] })
  })
  assert.ok(messages(unreachable, 'acceptance', 'blocking').some((m) => /not an ancestor/.test(m)))
})

test('paths that closed before the rule existed are left alone', () => {
  // The full branch diff may include a historical migration of this file. The
  // exact proposed work unit does not, so the new schema must not punish it.
  const legacy = { ...A_PATH, front: { ...A_PATH.front, status: 'done' } }
  const found = run([legacy.file], TRUNK_BRANCH, [legacy], { stateChanged: [], closureFor: () => null })
  assert.ok(!rules(found, 'blocking').includes('acceptance'))
  assert.ok(!rules(found, 'blocking').includes('transition'))
})

test('closing acceptance names the exact candidate, actor, time, scope, and advisory disposition', () => {
  assert.deepEqual(closingAcceptanceErrors(acceptedRecord(), A_PATH.front.id), [])
  const incomplete = { path: A_PATH.front.id, ceremony: 'closing', subject_commit: 'aaaaaaa', decision: 'accepted' }
  const errors = closingAcceptanceErrors(incomplete, A_PATH.front.id)
  for (const field of ['subject_commit', 'accepted_by', 'accepted_at', 'scope_ref', 'advisory_disposition']) {
    assert.ok(errors.some((error) => error.includes(field)), field)
  }
})

test('closing lookup selects the record for the current candidate, by name', () => {
  const files = ['index.md', 'plan.md', `closing-${'b'.repeat(40)}.md`, `closing-${CANDIDATE}.md`]
  assert.equal(closingRecordIn(files, 'p', CANDIDATE), `p/closing-${CANDIDATE}.md`)
  assert.equal(closingRecordIn(files.slice(0, 3), 'p', CANDIDATE), null)
})

test('implementation changes after exact acceptance invalidate ready', () => {
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureStateFor: () => ({ subjectIsAncestor: true, commitsAfterSubject: 1, forbiddenFiles: [SRC] })
  })
  assert.ok(found.some((f) => f.rule === 'acceptance' && f.message.includes('implementation changed')))
})

test('on manual-git a closing record that is not a completed review is not an acceptance', () => {
  // `coherence-audit` in 0.2. The judgement is never machine-scored; that the
  // record names a verdict and answers its own questions is a fact.
  const ready = readyPath()
  const common = { ...MANUAL, previousPaths: new Map([[ready.file, A_PATH.front]]) }
  const scaffold = run([ready.file], 'path/cp-ex-010', [ready], {
    ...common, closureFor: (id) => ({ ...acceptedRecord(id), __fill: ['still carries the scaffold placeholder'] })
  })
  assert.ok(messages(scaffold, 'acceptance', 'blocking').some((m) => /not a completed review/.test(m)))
  const filled = run([ready.file], 'path/cp-ex-010', [ready], common)
  assert.ok(!messages(filled, 'acceptance').some((m) => /not a completed review/.test(m)))
  // A running path is never asked for one.
  const running = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { ...MANUAL, closureFor: () => null })
  assert.ok(!rules(running, 'blocking').includes('acceptance'))
})

test('a closing record must name a verdict and answer a question', () => {
  const text = (verdict, answer) => `---
${METADATA_NAMESPACE}:
  verdict: ${verdict}
---

## Findings

### Q?

${answer}

## Decision

yes
`
  assert.deepEqual(fillErrors(text('clean', 'No.')), [])
  assert.ok(fillErrors(text('', 'No.')).some((e) => e.startsWith('no `verdict:` in its frontmatter')))
  assert.ok(fillErrors(text('clean', '')).some((e) => e.startsWith('no findings section has been answered')))
  assert.ok(fillErrors(text('TO BE FILLED', 'No.')).some((e) => e.startsWith('still carries the scaffold placeholder')))
})

test('closure may move status and subject_commit and nothing else', () => {
  const before = { id: 'CP-EX-010', status: 'running', writes: ['a'], scope_ref: 'x' }
  assert.deepEqual(closureFieldErrors(before, { ...before, status: 'ready', subject_commit: CANDIDATE }), [])
  assert.equal(closureFieldErrors(before, { ...before, writes: ['a', 'b'] }).length, 1)
  assert.equal(closureFieldErrors(before, { ...before, scope_ref: 'y' }).length, 1)
  assert.ok(CLOSURE_MUTABLE_FIELDS.includes('status'))
  assert.ok(!CLOSURE_MUTABLE_FIELDS.includes('writes'))
})

test('the closure surface is scoped by the fact it records, not shared across both', () => {
  const before = { id: 'CP-EX-010', status: 'running', current_step: 'S01' }
  assert.deepEqual(closureMutableFields('ready'), ['status', 'subject_commit'])
  assert.deepEqual(closureMutableFields('done'), ['status', 'subject_commit', 'resolution'])
  assert.equal(closureFieldErrors(before, { ...before, status: 'ready', resolution: 'completed' }).length, 1)
  assert.equal(closureFieldErrors(before, { ...before, status: 'ready', current_step: 'S02' }).length, 1)
  assert.deepEqual(closureFieldErrors(before, { ...before, status: 'done', resolution: 'completed' }), [])
})

const digested = (record = {}) => ({ ...acceptedRecord(), scope_digest: 'sha256:abc', ...record })
/** The 0.2 shape a grandfathered path may still carry: one sentence nothing can check. */
const prose = (record) => ({ ...record, advisory_disposition: 'all fixed or explicitly deferred in this record' })

test('a closure commit that rewrites the accepted scope is blocked under acceptance', () => {
  // `closure-surface` in 0.2.
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    previousFronts: new Map([[ready.file, { ...A_PATH.front, scope_ref: 'was' }]]),
    closureFor: () => null,
    scopeDigestFor: () => 'sha256:abc',
    migrationExempt: new Set()
  })
  assert.ok(messages(found, 'acceptance', 'blocking').some((m) => /closure changed `scope_ref`/.test(m)))
})

test('a disposition list must match the advisories attested at the candidate', () => {
  const entry = { rule: 'scope-drift', disposition: 'accepted', reason: 'declared here' }
  assert.deepEqual(dispositionErrors([entry], ['scope-drift'], []), [])
  assert.equal(dispositionErrors([], ['scope-drift'], []).length, 1)
  assert.equal(dispositionErrors([entry], [], []).length, 1)
  assert.equal(dispositionErrors('all fixed', ['scope-drift'], []).length, 1)
  assert.ok(DISPOSITIONS.includes('deferred'))
})

test('comparing against the CLOSURE commit alone would be unsound', () => {
  const entry = { rule: 'scope-drift', disposition: 'accepted', reason: 'r' }
  assert.equal(dispositionErrors([entry], ['scope-drift', 'record-date'], ['scope-drift']).length, 1,
    'record-date was attested at the candidate and left undisposed')
})

test('an advisory firing at closure and missing from the attestation proves it incomplete', () => {
  const entry = { rule: 'scope-drift', disposition: 'accepted', reason: 'r' }
  const errors = dispositionErrors([entry], ['scope-drift'], ['scope-drift', 'decision-drift'])
  assert.ok(errors.some((e) => /its absence proves the set incomplete/.test(e)))
})

test('a closing record with no attested candidate set cannot be checked soundly', () => {
  const entry = { rule: 'scope-drift', disposition: 'accepted', reason: 'r' }
  assert.ok(dispositionErrors([entry], undefined, []).some((e) => /advisories_at_candidate/.test(e)))
})

test('a deferral without an owner and a follow-up is rejected', () => {
  const deferred = { rule: 'record-date', disposition: 'deferred', reason: 'frozen' }
  assert.ok(dispositionErrors([deferred], ['record-date']).length > 0)
  assert.deepEqual(dispositionErrors([{ ...deferred, owner: 'a', follow_up: 'CP-X' }], ['record-date']), [])
})

test('prose disposition is advised for a grandfathered path and blocked otherwise, under acceptance', () => {
  // `advisory-disposition` in 0.2.
  const ready = readyPath()
  const common = {
    ...MANUAL,
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => prose(digested()),
    scopeDigestFor: () => 'sha256:abc'
  }
  const exempt = run([ready.file], 'path/cp-ex-010', [ready], { ...common, migrationExempt: new Set(['CP-EX-010']) })
  assert.ok(messages(exempt, 'acceptance', 'advisory').some((m) => /as prose/.test(m)))
  assert.ok(!messages(exempt, 'acceptance', 'blocking').some((m) => /advisory_disposition/.test(m)))

  const strict = run([ready.file], 'path/cp-ex-010', [ready], { ...common, migrationExempt: new Set() })
  assert.ok(messages(strict, 'acceptance', 'blocking').some((m) => /advisory_disposition/.test(m)))
})

test('one actor on both acceptances is recorded as an acceptance advisory, not forbidden', () => {
  // `role-collapse` in 0.2. On pull-request the forge shows who approved.
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    ...MANUAL,
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => ({ ...digested(), accepted_by: 'solo@example.test' }),
    openingRecordFor: () => ({ accepted_by: 'solo@example.test', scope_digest: 'sha256:abc' }),
    scopeDigestFor: () => 'sha256:abc',
    migrationExempt: new Set(['CP-EX-010'])
  })
  assert.ok(messages(found, 'acceptance', 'advisory').some((m) => /both the opening and the closing/.test(m)))
  assert.ok(!messages(found, 'acceptance', 'blocking').some((m) => /both the opening and the closing/.test(m)))
  // An advisory the closure itself raises is never demanded in the attestation.
  assert.ok(CLOSURE_RAISED_ADVISORIES.has('acceptance'))
})

test('a closing path is not asked to have attested an overlap another record caused', () => {
  // `writes-overlap` turns on OTHER path records' current status, so it can
  // appear between the candidate and the closure without one line of this
  // path's tree changing. Folded into the attested set, the subset check
  // reported the attestation incomplete — a blocking finding whose stated
  // reason was false — so the advisory is one the closure may raise.
  const ready = readyPath()
  const racer = live('CP-RACE', [SRC])   // the same file A_PATH declares
  const found = run([ready.file], 'path/cp-ex-010', [ready, racer], {
    ...MANUAL,
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => digested(),
    scopeDigestFor: () => 'sha256:abc',
    migrationExempt: new Set()
  })
  assert.ok(messages(found, 'writes-overlap', 'advisory').length > 0,
    'the fixture must actually raise the overlap, or this proves nothing')
  assert.deepEqual(
    messages(found, 'acceptance', 'blocking').filter((m) => /writes-overlap/.test(m)), [],
    'the closure must not be refused for an advisory another record caused')
})

test('two different actors raise no collapse finding', () => {
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    ...MANUAL,
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => ({ ...digested(), accepted_by: 'reviewer@example.test' }),
    openingRecordFor: () => ({ accepted_by: 'initiator@example.test' }),
    scopeDigestFor: () => 'sha256:abc',
    migrationExempt: new Set(['CP-EX-010'])
  })
  assert.ok(!messages(found, 'acceptance').some((m) => /both the opening and the closing/.test(m)))
})

test('an object id may be SHA-1 or SHA-256, and never a prefix', () => {
  assert.ok(isObjectId('a'.repeat(40)))
  assert.ok(isObjectId('a'.repeat(64)))
  assert.ok(!isObjectId('a'.repeat(7)))
  assert.ok(!isObjectId('a'.repeat(41)))
  assert.ok(!isObjectId('zz' + 'a'.repeat(38)))
})

/* ------------------------------------------------------------------ *
 * scope-digest — scope is bound by digest, not by a pointer
 * ------------------------------------------------------------------ */

const SCOPED = `# CP-EX-010

## Goal

Something.

## Definition of done

- [ ] the observable result
- [ ] and its tests

## Execution

Not part of the scope.
`

test('a scope_ref resolves to its heading and body, stopping at the next peer heading', () => {
  const section = resolveScopeSection(SCOPED, '#definition-of-done')
  assert.match(section, /^## Definition of done/)
  assert.match(section, /and its tests/)
  assert.doesNotMatch(section, /Not part of the scope/)
  assert.equal(resolveScopeSection(SCOPED, '#no-such-heading'), null)
})

test('the digest changes when the accepted text changes, and only then', () => {
  const before = scopeDigest(resolveScopeSection(SCOPED, '#definition-of-done'))
  const reflowed = SCOPED.replace('## Execution', '## Execution')
  assert.equal(scopeDigest(resolveScopeSection(reflowed, '#definition-of-done')), before)
  const moved = SCOPED.replace('- [ ] and its tests', '- [ ] and maybe its tests')
  assert.notEqual(scopeDigest(resolveScopeSection(moved, '#definition-of-done')), before)
  assert.match(before, /^sha256:[0-9a-f]{64}$/)
})

test('a definition of done that no longer digests to what the opening accepted is blocked', () => {
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => null,
    scopeDigestFor: () => 'sha256:def',
    migrationExempt: new Set()
  })
  assert.ok(messages(found, 'scope-digest', 'blocking').some((m) => /moved after acceptance/.test(m)))
})

test('a matching digest passes, an unreadable scope_ref is inconclusive, and a missing section blocks', () => {
  const ready = readyPath()
  const common = { previousPaths: new Map([[ready.file, A_PATH.front]]), closureFor: () => null, migrationExempt: new Set() }
  assert.ok(!rules(run([ready.file], 'path/cp-ex-010', [ready], { ...common, scopeDigestFor: () => 'sha256:abc' }), 'blocking').includes('scope-digest'))
  assert.equal(run([ready.file], 'path/cp-ex-010', [ready], { ...common, scopeDigestFor: () => undefined }).find((f) => f.rule === 'scope-digest').outcome, 'inconclusive')
  assert.ok(messages(run([ready.file], 'path/cp-ex-010', [ready], { ...common, scopeDigestFor: () => null }), 'scope-digest', 'blocking').some((m) => /names no section/.test(m)))
})

test('an opening without a digest is bound to nothing: blocked, advised on a grandfathered path', () => {
  const ready = readyPath()
  const common = { previousPaths: new Map([[ready.file, A_PATH.front]]), closureFor: () => null, scopeDigestFor: () => 'sha256:abc', openingRecordFor: () => ({ ...OPENING, scope_digest: undefined }) }
  assert.ok(rules(run([ready.file], 'path/cp-ex-010', [ready], { ...common, migrationExempt: new Set() }), 'blocking').includes('scope-digest'))
  const exempt = run([ready.file], 'path/cp-ex-010', [ready], { ...common, migrationExempt: new Set(['CP-EX-010']) })
  assert.ok(!rules(exempt, 'blocking').includes('scope-digest'))
  assert.ok(rules(exempt, 'advisory').includes('scope-digest'))
})

test('on manual-git the closing record re-computes the digest and must find the accepted text', () => {
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    ...MANUAL, previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => digested({ scope_digest: 'sha256:stale' }), scopeDigestFor: () => 'sha256:abc', migrationExempt: new Set()
  })
  assert.ok(messages(found, 'scope-digest', 'blocking').some((m) => /closing record for CP-EX-010 says sha256:stale/.test(m)))
})

/* ------------------------------------------------------------------ *
 * acceptance-drift — decided over declared surfaces, never trunk equality
 * ------------------------------------------------------------------ */

test('drift is decided over declared surfaces, not over trunk equality', () => {
  const writes = ['apps/example/**']
  const governs = [`${ARCH}@89ab89ab`]
  assert.deepEqual(acceptanceDrift(['README.md'], writes, governs), [])
  assert.deepEqual(acceptanceDrift(['apps/example/x.ts'], writes, governs), ['apps/example/x.ts'])
  assert.deepEqual(acceptanceDrift([ARCH], writes, governs), [ARCH])
})

test('a trunk that moved inside the declared surfaces invalidates the acceptance', () => {
  const ready = { ...readyPath(), writes: ['apps/example/**'], governs: [] }
  const common = {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => null,
    scopeDigestFor: () => 'sha256:abc',
    migrationExempt: new Set(['CP-EX-010'])
  }
  const drifted = run([ready.file], 'path/cp-ex-010', [ready], { ...common, trunkDelta: ['apps/example/x.ts'] })
  assert.ok(rules(drifted, 'blocking').includes('acceptance-drift'))

  const untouched = run([ready.file], 'path/cp-ex-010', [ready], { ...common, trunkDelta: ['unrelated/other.ts'] })
  assert.ok(!rules(untouched, 'blocking').includes('acceptance-drift'))

  const unreadable = run([ready.file], 'path/cp-ex-010', [ready], { ...common, trunkDelta: null })
  assert.ok(unreadable.some((f) => f.rule === 'acceptance-drift' && f.outcome === 'inconclusive'))
})

test('a busy trunk alone never invalidates an acceptance', () => {
  const ready = { ...readyPath(), writes: ['apps/example/**'], governs: [] }
  const busy = run([ready.file], 'path/cp-ex-010', [ready], {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    closureFor: () => null,
    scopeDigestFor: () => 'sha256:abc',
    trunkDelta: Array.from({ length: 200 }, (_, i) => `other/area/file-${i}.ts`),
    migrationExempt: new Set(['CP-EX-010'])
  })
  assert.ok(!rules(busy, 'blocking').includes('acceptance-drift'))
})

/* ------------------------------------------------------------------ *
 * provisional — durable, and not a checkpoint
 * ------------------------------------------------------------------ */

test('a candidate still containing a provisional commit is blocked', () => {
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    provisionalInCandidate: ['1a2b3c4']
  })
  assert.ok(rules(found, 'blocking').includes('provisional'))
})

test('a folded candidate carries no provisional finding', () => {
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    provisionalInCandidate: []
  })
  assert.ok(!rules(found, 'blocking').includes('provisional'))
})

test('an unreadable candidate range is inconclusive, not silent', () => {
  const ready = readyPath()
  const found = run([ready.file], 'path/cp-ex-010', [ready], {
    previousPaths: new Map([[ready.file, A_PATH.front]]),
    provisionalInCandidate: null
  })
  assert.equal(found.find((f) => f.rule === 'provisional').outcome, 'inconclusive')
})

test('a provisional HEAD is durable work, advised rather than forbidden', () => {
  const found = run([SRC], 'path/cp-ex-010', [A_PATH], { headProvisional: true })
  assert.ok(rules(found, 'advisory').includes('provisional'))
  assert.ok(!rules(found, 'blocking').includes('provisional'))
  assert.equal(PROVISIONAL_TRAILER, 'Cairn-Provisional')
})

/* ------------------------------------------------------------------ *
 * record-integrity — kept, not tidied
 * ------------------------------------------------------------------ */

test('an existing durable record cannot be rewritten, but a new record may be added', () => {
  const existing = run([CLOSING], 'path/cp-ex-010', [A_PATH], { immutableMutations: [CLOSING] })
  assert.ok(rules(existing, 'blocking').includes('record-integrity'))

  const added = run([`${JOURNAL_DIR}/new.md`], 'path/cp-ex-010', [A_PATH], { immutableMutations: [] })
  assert.ok(!rules(added, 'blocking').includes('record-integrity'))

  const unknown = run([`${JOURNAL_DIR}/maybe-new.md`], 'path/cp-ex-010', [A_PATH], { immutableMutations: null })
  assert.ok(unknown.some((f) => f.rule === 'record-integrity' && f.outcome === 'inconclusive'))
})

test('the immutable records are the closing record, the journal and the steps; folders another host kept are not', () => {
  assert.equal(isImmutableRecord(CLOSING), true)
  assert.equal(isImmutableRecord(`${PATH_DIR}/CP-EX-010/closing-${'b'.repeat(64)}.md`), true)
  assert.equal(isImmutableRecord(`${PATH_DIR}/CP-EX-010/closing-notes.md`), false, 'a closing record is named after a full candidate id')
  assert.equal(isImmutableRecord(`${JOURNAL_DIR}/2026-08-25-cp-x.md`), true)
  assert.equal(isImmutableRecord(`${JOURNAL_DIR}/index.md`), false)
  assert.equal(isImmutableRecord(`${SESSIONS}/2026-08-25-x.md`), false, 'a 0.2 session record is history, not a 1.0 record')
  // The flat `<project>/log.md` was Atomik's frozen journal archive. Here it is
  // a folder log like any other, and treating it as immutable was a hole a
  // host assumption had left in portable code.
  assert.equal(isImmutableRecord(`${PROJECT_DIR}/log.md`), false)
})

test('a step record inside a path folder is append-only, like the ones it replaced', () => {
  assert.ok(isAppendOnlyStepRecord(`${PATH_DIR}/CP-OPS-002/steps/S07q.md`))
  assert.ok(isImmutableRecord(`${PATH_DIR}/CP-OPS-002/steps/S07q.md`))
  assert.ok(isImmutableRecord(`${PATH_DIR}/history/CP-OPS-002-S07q.md`))
  assert.ok(!isAppendOnlyStepRecord(`${PATH_DIR}/CP-OPS-002/steps/index.md`))
  assert.ok(!isImmutableRecord(`${PATH_DIR}/CP-OPS-002/steps/index.md`))
  assert.ok(!isImmutableRecord(`${PATH_DIR}/CP-OPS-002/steps/log.md`))
  assert.ok(!isImmutableRecord(`${PATH_DIR}/CP-OPS-002/index.md`))
})

test('an in-place step record may append a suffix and may change no earlier byte', () => {
  const before = '---\ntitle: S08m\n---\n\n## Ledger rows\n\n| a | b |\n'
  assert.ok(preservesAppendOnlyRecord(before, `${before}| c | d |\n`))
  assert.ok(!preservesAppendOnlyRecord(before, before.replace('S08m', 'S08n')))
  assert.ok(!preservesAppendOnlyRecord(before, before.replace('| a |', '| x |')))
  assert.ok(!preservesAppendOnlyRecord(before, before.slice(0, -1)))
})

test('the adding-blob parser follows the oldest identity, not the latest path', () => {
  const old = 'a'.repeat(40)
  const readded = 'b'.repeat(40)
  const raw = [readded, '', `${PATH_DIR}/CP-OPS-002/steps/S08m.md`, old, '', `${PATH_DIR}/history/CP-OPS-002-S08m.md`, ''].join('\n')
  assert.deepEqual(recordOriginFromFollowLog(raw), { commit: old, file: `${PATH_DIR}/history/CP-OPS-002-S08m.md` })
  assert.equal(recordOriginFromFollowLog(''), null)
})

test('a relocation may repoint links and append, and may do nothing else', () => {
  const before = '---\ntitle: S01\n---\n\nSee [paths](../paths.md) and [x](./x.md).\n'
  const repointed = '---\ntitle: S01\n---\n\nSee [paths](../../paths.md) and [x](../x.md).\n'
  assert.ok(isVerbatimRelocation(before, repointed))
  assert.ok(isVerbatimRelocation(before, repointed + '\n## Ledger rows\n\n| a | b |\n'))
  assert.ok(preservesAppendOnlyRecord(before, repointed, true))
  assert.ok(!isVerbatimRelocation(before, repointed.replace('See', 'Do not see')))
  assert.ok(!isVerbatimRelocation(before, repointed.replace('title: S01', 'title: S02')))
  assert.ok(!isVerbatimRelocation(before, '---\ntitle: S01\n---\n'))
  assert.ok(!isVerbatimRelocation('', 'anything'))
})

test('a relocated record is not a mutation, and the exemption is stated out loud', () => {
  const moved = [[`${PATH_DIR}/history/CP-OPS-002-S00.md`, `${PATH_DIR}/CP-OPS-002/steps/S00.md`]]
  assert.ok(isStepRecordRelocation(...moved[0]))
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { immutableMutations: moved.flat(), relocations: moved })
  assert.ok(!rules(found, 'blocking').includes('record-integrity'))
  const stated = found.filter((f) => f.rule === 'record-integrity')
  assert.equal(stated.length, 1)
  assert.equal(stated[0].level, 'advisory')
  assert.match(stated[0].message, /relocated verbatim/)

  const unpaired = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { immutableMutations: moved.flat(), relocations: [] })
  assert.equal(unpaired.filter((f) => f.rule === 'record-integrity' && f.level === 'blocking').length, 2)

  const closingMove = [[CLOSING, `${PATH_DIR}/CP-EX-010/closing-${'b'.repeat(40)}.md`]]
  assert.ok(!isStepRecordRelocation(...closingMove[0]))
  const forbidden = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { immutableMutations: closingMove.flat(), relocations: closingMove })
  assert.equal(forbidden.filter((f) => f.rule === 'record-integrity' && f.level === 'blocking').length, 2)
})

/* ------------------------------------------------------------------ *
 * schema — the record, its declaration, and its opening acceptance
 * ------------------------------------------------------------------ */

test('running path schema requires the fields the global projection consumes', () => {
  assert.deepEqual(pathFrontmatterErrors(A_PATH.front), [])
  assert.ok(pathFrontmatterErrors({ id: 'CP-X', status: 'running' }).some((e) => e.includes(`${METADATA_NAMESPACE}.branch`)))
  assert.ok(pathFrontmatterErrors({ id: 'CP-X', status: 'running', branch: 'path/cp-x' }).some((e) => e.includes(`${METADATA_NAMESPACE}.base_commit`)))
  assert.ok(pathFrontmatterErrors({ id: 'CP-X', status: 'running', branch: 'path/cp-x', base_commit: 'null' }).some((e) => e.includes('Git hash')))
})

test('ready and blocked preserve branch traceability; ready also pins its candidate', () => {
  const blocked = { ...A_PATH.front, status: 'blocked' }
  assert.deepEqual(pathFrontmatterErrors(blocked), [])
  assert.ok(pathFrontmatterErrors({ id: 'CP-X', status: 'blocked' }).some((e) => e.includes(`${METADATA_NAMESPACE}.branch`)))

  const ready = { ...A_PATH.front, status: 'ready', subject_commit: CANDIDATE }
  assert.deepEqual(pathFrontmatterErrors(ready), [])
  assert.ok(pathFrontmatterErrors({ ...ready, subject_commit: 'aaaaaaa' }).some((e) => e.includes('full object id')))
  assert.deepEqual(pathFrontmatterErrors({ ...ready, subject_commit: 'b'.repeat(64) }), [])
})

test('path identity, filename, and branch use one reconstructable convention', () => {
  assert.deepEqual(pathFrontmatterErrors(A_PATH.front, `${PATH_DIR}/CP-EX-010.md`), [])
  assert.ok(pathFrontmatterErrors({ ...A_PATH.front, branch: 'path/something-else' }, `${PATH_DIR}/CP-EX-010.md`)
    .some((e) => e.includes('must equal path/cp-ex-010')))
  assert.ok(pathFrontmatterErrors(A_PATH.front, `${PATH_DIR}/CP-WRONG.md`)
    .some((e) => e.includes("does not match the record's own name")))
})

test('a record identifies itself by its id in either shape, never by index.md', () => {
  const front = { id: 'CP-OPS-002', status: 'running', branch: 'path/cp-ops-002', base_commit: 'abc1234' }
  assert.deepEqual(pathFrontmatterErrors(front, `${PATH_DIR}/CP-OPS-002.md`), [])
  assert.deepEqual(pathFrontmatterErrors(front, `${PATH_DIR}/CP-OPS-002/index.md`), [])
  const wrong = pathFrontmatterErrors(front, `${PATH_DIR}/CP-EX-010/index.md`)
  assert.equal(wrong.length, 1)
  assert.match(wrong[0], /CP-OPS-002\/index\.md/)
})

test('active is out of the status vocabulary', () => {
  const errors = pathFrontmatterErrors({ id: 'CP-X', status: 'active' })
  assert.equal(errors.length, 1)
  assert.match(errors[0], /outside the vocabulary/)
  assert.doesNotMatch(errors[0], /active \|/)
  assert.deepEqual(pathFrontmatterErrors({ id: 'CP-X', status: 'blocked', branch: 'path/cp-x', base_commit: '7aa3b1d' }), [])
  for (const status of ['draft', 'archived']) assert.deepEqual(pathFrontmatterErrors({ id: 'CP-X', status }), [])
})

test('path ids and branch names are unique across the repository corpus', () => {
  const running = (id, branch) => ({ file: `${PATH_DIR}/${id}.md`, front: { id, status: 'running', branch, base_commit: '7aa3b1d' }, writes: [] })
  const errors = duplicatePathIdentityFindings([running('CP-A', 'path/cp-a'), running('CP-A', 'path/cp-b'), running('CP-C', 'path/cp-a')])
  assert.ok(errors.some((e) => e.startsWith('id "CP-A"')))
  assert.ok(errors.some((e) => e.startsWith('branch "path/cp-a"')))
})

const RECORD_WITH_OPENING = `---
type: Cairn Coding Path
cairn:
  id: CP-EX-010
  status: running
---

# CP-EX-010

## Definition of done

- [ ] the result

## Opening acceptance

\`\`\`yaml
decision: accepted
accepted_by: initiator@example.test
accepted_roles: [initiator, reviewer]
accepted_at: 2026-08-20T09:00:00Z
scope_ref: ${PATH_DIR}/CP-EX-010/index.md#definition-of-done
scope_digest: sha256:abc
\`\`\`

Accepted at the owner's instruction.

## Documentation coverage

Nothing here is an acceptance.
`

test('the opening acceptance is read from the record, under its own heading', () => {
  const opening = openingFromRecord(RECORD_WITH_OPENING)
  assert.equal(opening.decision, 'accepted')
  assert.equal(opening.accepted_by, 'initiator@example.test')
  assert.deepEqual(opening.accepted_roles, ['initiator', 'reviewer'])
  assert.equal(opening.scope_digest, 'sha256:abc')
  assert.deepEqual(openingAcceptanceErrors(opening), [])
  // No heading, no block, an empty block: none of these is an acceptance.
  assert.equal(openingFromRecord(RECORD_WITH_OPENING.replace('## Opening acceptance', '## Something else')), null)
  assert.equal(openingFromRecord('# CP-X\n\n## Opening acceptance\n\nprose only\n'), null)
  assert.equal(openingFromRecord('## Opening acceptance\n\n```yaml\n```\n'), null)
  // A block under a LATER heading is not this one's.
  assert.equal(openingFromRecord('## Opening acceptance\n\nnone\n\n## Resume\n\n```yaml\ndecision: accepted\n```\n'), null)
})

test('a scope amendment is a later block, and the last block is the acceptance in force', () => {
  const amended = RECORD_WITH_OPENING.replace('Accepted at the owner\'s instruction.',
    '```yaml\ndecision: accepted\naccepted_by: reviewer@example.test\naccepted_at: 2026-08-21T09:00:00Z\nscope_ref: x#definition-of-done\nscope_digest: sha256:def\nsupersedes: 2026-08-20T09:00:00Z\n```')
  const opening = openingFromRecord(amended)
  assert.equal(opening.scope_digest, 'sha256:def')
  assert.equal(opening.supersedes, '2026-08-20T09:00:00Z')
})

test('an opening acceptance must decide, name its actor and time, and bind a digest', () => {
  assert.deepEqual(openingAcceptanceErrors(null), ['no opening acceptance'])
  const errors = openingAcceptanceErrors({ decision: 'maybe', scope_ref: 'file-without-anchor' })
  for (const needle of ['decision', 'accepted_by', 'accepted_at', 'scope_ref', 'scope_digest']) {
    assert.ok(errors.some((e) => e.includes(needle)), needle)
  }
})

test('a running path with no opening acceptance in its record fails its schema', () => {
  // `opening-ceremony` in 0.2: a declaration claiming `running` with no
  // acceptance behind it claims a state it has not earned.
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { openingRecordFor: () => null })
  assert.ok(messages(found, 'schema', 'blocking').some((m) => /no valid opening acceptance/.test(m)))
  const undigested = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { openingRecordFor: () => ({ ...OPENING, scope_digest: '' }) })
  assert.ok(messages(undigested, 'schema', 'blocking').some((m) => /scope_digest/.test(m)))
})

test('a running path with its opening acceptance in the record passes', () => {
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { openingRecordFor: () => openingFromRecord(RECORD_WITH_OPENING) })
  assert.ok(!rules(found, 'blocking').includes('schema'))
})

test('a path this change does not touch is never examined for its opening', () => {
  const found = run(['docs/index.md'], 'path/cp-ex-010', [A_PATH], { openingRecordFor: () => null })
  assert.ok(!rules(found, 'blocking').includes('schema'))
})

test('a path that is not running is out of scope for the opening check', () => {
  const done = { ...A_PATH, front: { ...A_PATH.front, status: 'done', subject_commit: CANDIDATE, resolution: 'completed' } }
  const found = run([done.file], 'path/cp-ex-010', [done], {
    openingRecordFor: () => null,
    previousPaths: new Map([[done.file, A_PATH.front]])
  })
  assert.ok(!rules(found, 'blocking').includes('schema'))
})

test('depends_on names known paths, never itself, and the view knows which are met', () => {
  assert.deepEqual(pathFrontmatterErrors({ ...A_PATH.front, depends_on: [] }), [])
  assert.deepEqual(pathFrontmatterErrors({ ...A_PATH.front, depends_on: ['CP-A'] }), [])
  assert.ok(pathFrontmatterErrors({ ...A_PATH.front, depends_on: 'CP-A' }).some((e) => /list of path ids/.test(e)))
  assert.ok(pathFrontmatterErrors({ ...A_PATH.front, depends_on: ['cp-a'] }).some((e) => /canonical/.test(e)))
  assert.ok(pathFrontmatterErrors({ ...A_PATH.front, depends_on: ['CP-EX-010'] }).some((e) => /itself/.test(e)))

  const a = { file: 'a', front: { id: 'CP-A', status: 'done', resolution: 'completed' } }
  const b = { file: 'b', front: { id: 'CP-B', status: 'running', depends_on: ['CP-A', 'CP-C'] } }
  assert.deepEqual(dependencyFindings([a, b]), ['b: depends_on names CP-C, which no path record declares'])
  assert.deepEqual(dependencyFindings([a, { file: 'b', front: { id: 'CP-B', depends_on: ['CP-A'] } }]), [])

  const statuses = new Map([
    ['CP-A', { status: 'done' }],
    ['CP-B', { status: 'archived', resolution: 'completed' }],
    ['CP-C', { status: 'running' }],
    ['CP-D', { status: 'archived', resolution: 'abandoned' }]
  ])
  assert.deepEqual(unmetDependencies({ depends_on: ['CP-A', 'CP-B'] }, statuses), [])
  assert.deepEqual(unmetDependencies({ depends_on: ['CP-C', 'CP-D', 'CP-Z'] }, statuses), ['CP-C', 'CP-D', 'CP-Z'])
  assert.deepEqual(unmetDependencies({}, statuses), [])
})


const AN_ADR = `${ADR_DIR}/ADR-012-parallel-paths-self-merge.md`
const ADR_FRONT = { id: 'ADR-012', status: 'accepted', date: '2026-08-15' }

test('a well-formed decision record raises nothing', () => {
  assert.deepEqual(adrFrontmatterErrors(ADR_FRONT, AN_ADR, 'accepted'), [])
  assert.deepEqual(adrFrontmatterErrors(ADR_FRONT, AN_ADR, null), [])
})

test('a decision record whose two halves disagree about its status is caught', () => {
  const errors = adrFrontmatterErrors(ADR_FRONT, AN_ADR, 'superseded')
  assert.equal(errors.length, 1)
  assert.match(errors[0], /contradicts the document's own/)
})

test('a decision record id must match its file name', () => {
  assert.match(adrFrontmatterErrors({ ...ADR_FRONT, id: 'ADR-011' }, AN_ADR, 'accepted')[0], /does not match the file name/)
})

test('a decision record needs a frontmatter block, a known status and an ISO date', () => {
  assert.deepEqual(adrFrontmatterErrors(null, AN_ADR), ['missing adr: frontmatter block'])
  const bad = adrFrontmatterErrors({ id: 'ADR-012', status: 'ratified', date: 'August' }, AN_ADR)
  assert.equal(bad.length, 2)
  assert.match(bad[0], /outside the vocabulary/)
  assert.match(bad[1], /ISO date/)
})

/* ------------------------------------------------------------------ *
 * ADR-004 — which commit, which branch, which checkpoint
 * ------------------------------------------------------------------ */

test('the registration commit is the one where the record became running, not the one that added it', () => {
  // The adopter's CP-016 landed as a draft through one request and went
  // `running` through a second. Judged against the draft's parent, the only
  // way to a green gate was to rewrite `base_commit` to a value the
  // specification's own definition calls false — and the trunk carries it.
  const [draft, activation, later] = ['a', 'b', 'c'].map((c) => c.repeat(40))
  const asked = []
  const statusAt = (commit) => {
    asked.push(commit)
    return { [draft]: 'draft', [activation]: 'running', [later]: 'running' }[commit]
  }
  assert.equal(statusCommit([draft, activation, later], statusAt), activation)
  // And it stops there: each status is a `git show`, and the commits after the
  // activation answer nothing.
  assert.deepEqual(asked, [draft, activation])
  // Born running: the commit that adds it is the activation.
  assert.equal(statusCommit([draft], () => 'running'), draft)
  // Still a draft, or a commit where the record cannot be read: there is no
  // registration commit to judge, and the rule says so as inconclusive.
  assert.equal(statusCommit([draft], () => 'draft'), null)
  assert.equal(statusCommit([draft], () => undefined), null)
  assert.equal(statusCommit([], () => 'running'), null)
})

test('a running path that has completed a unit names an object id in its checkpoint', () => {
  const section = (commit) => `## Resume\n\n### Checkpoint\n\n\`\`\`text\ncommit : ${commit}\nunit   : 2\n\`\`\`\n`
  assert.equal(checkpointCommit(section('a'.repeat(40))), 'a'.repeat(40))
  assert.equal(checkpointCommit(section(`${'a'.repeat(40)} — S02, what it established`)), 'a'.repeat(40))
  // The three shapes fifteen adopter units left behind.
  assert.equal(checkpointCommit(section('unpinned')), null)
  assert.equal(checkpointCommit(section('')), null)
  assert.equal(checkpointCommit('# A record with no resume section\n'), null)
})

test('a unit is not complete while the record cannot be resumed from', () => {
  const withUnit = { ...A_PATH, front: { ...A_PATH.front, current_step: 'S01' } }
  const found = run([withUnit.file], 'path/cp-ex-010', [withUnit], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'test' }],
    checkpointFor: () => null
  })
  assert.ok(messages(found, 'work-unit', 'blocking').some((m) => /checkpoint/.test(m)),
    `findings were ${JSON.stringify(messages(found, 'work-unit', 'blocking'))}`)
  const pinned = run([withUnit.file], 'path/cp-ex-010', [withUnit], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'test' }],
    checkpointFor: () => 'a'.repeat(40)
  })
  assert.deepEqual(messages(pinned, 'work-unit', 'blocking').filter((m) => /checkpoint/.test(m)), [])
  // Before the first unit there is nothing to have pushed.
  const noUnits = run([withUnit.file], 'path/cp-ex-010', [withUnit], {
    workUnits: [], checkpointFor: () => null
  })
  assert.deepEqual(messages(noUnits, 'work-unit', 'blocking').filter((m) => /checkpoint/.test(m)), [])
})

test('the branch history is resolved from where the checker stands, in ADR-004\'s order', () => {
  const branch = 'path/cp-ex-010'
  const tracking = `${REMOTE}/${branch}`
  const resolve = (present, detached = false) => resolveBranchRef({
    branch, remote: REMOTE, detached, refExists: (ref) => present.includes(ref)
  })
  // The local ref first: it is the branch this checkout writes, and it wins
  // even where the remote-tracking ref also exists.
  assert.deepEqual(resolve([branch]), { ref: branch, source: 'local' })
  assert.deepEqual(resolve([branch, tracking]), { ref: branch, source: 'local' })
  // Then HEAD, when the checkout is detached — the request head, which is the
  // commit the gate must judge. Taking the remote-tracking ref here would
  // compare it with itself, and a rewritten published commit then passes the
  // one run that is the merge gate.
  assert.deepEqual(resolve([tracking], true), { ref: 'HEAD', source: 'head' })
  assert.deepEqual(resolve([], true), { ref: 'HEAD', source: 'head' })
  // Then the remote-tracking ref: HEAD is some other branch, so it is not
  // evidence about this one.
  assert.deepEqual(resolve([tracking]), { ref: tracking, source: 'remote-tracking' })
  assert.deepEqual(resolve([]), { ref: 'HEAD', source: 'head' })
})

/* ------------------------------------------------------------------ *
 * ADR-004 decision 3, and repairs 005 and 006 — what a range means
 * ------------------------------------------------------------------ */

test('a provisional commit is resolved by a later commit of the same path, and by nothing else', () => {
  // The 1.0 rule matched the trailer anywhere in the range with no notion of
  // AFTER, while the unit reference it implements says "the completed unit's
  // own commit supersedes it". On the adopter that refused a candidate whose
  // draft had been finished three commits earlier, and the only remedy the
  // message named — fold it — is a rewrite this host forbids.
  const order = ['draft', 'unit', 'later', 'candidate']
  // Reachability as Git answers it, a commit included in its own ancestry.
  const isAncestor = (a, b) => order.indexOf(a) <= order.indexOf(b)
  assert.deepEqual(unresolvedProvisional(['draft'], ['unit'], isAncestor), [])
  assert.deepEqual(unresolvedProvisional(['draft'], ['later'], isAncestor), [])
  // A completed unit that came BEFORE the draft finished something else.
  assert.deepEqual(unresolvedProvisional(['later'], ['unit'], isAncestor), ['later'])
  assert.deepEqual(unresolvedProvisional(['draft'], [], isAncestor), ['draft'])
  // And a draft does not resolve itself: a commit that says out loud it is not
  // finished is not the completed unit that finishes it.
  assert.deepEqual(unresolvedProvisional(['draft'], ['draft'], isAncestor), ['draft'])
  // Each draft answers for itself: one finished unit does not clear the one
  // that came after it.
  assert.deepEqual(unresolvedProvisional(['draft', 'later'], ['unit'], isAncestor), ['later'])
})

test('a supersession names the record, the blob it replaces and the blob it adds', () => {
  const file = `${PATH_DIR}/CP-EX-010/steps/S15.md`
  const [before, after] = ['a'.repeat(40), 'b'.repeat(40)]
  assert.deepEqual(parseSupersession(`${file}@${before}..${after}`), { file, before, after })
  // Abbreviated, which is what a writer copies out of `git log`.
  assert.deepEqual(parseSupersession(`${file}@a1b2c3d..e4f5a6b`),
    { file, before: 'a1b2c3d', after: 'e4f5a6b' })
  // Half a claim is no claim: the specification asks for both ids.
  assert.equal(parseSupersession(`${file}@${before}`), null)
  assert.equal(parseSupersession(`${before}..${after}`), null)
  assert.equal(parseSupersession(`${file}@${before}..zzzzzzz`), null)
  assert.equal(parseSupersession(`${file}@abcdef..${after}`), null, 'six characters name too many blobs')
  assert.equal(parseSupersession('S15, superseded'), null)
  assert.equal(parseSupersession(undefined), null)
})

test('a supersession binds only the two blobs the record actually carries', () => {
  const declared = { before: 'a1b2c3d', after: 'e4f5a6b' }
  const blobs = { before: `a1b2c3d${'0'.repeat(33)}`, after: `e4f5a6b${'0'.repeat(33)}` }
  assert.ok(supersessionBinds(declared, blobs))
  assert.ok(!supersessionBinds(declared, { ...blobs, after: 'f'.repeat(40) }),
    'a claim about a text the record no longer carries is not a claim about this record')
  assert.ok(!supersessionBinds(declared, { ...blobs, before: 'f'.repeat(40) }))
  assert.ok(!supersessionBinds(declared, { before: null, after: blobs.after }))
  assert.ok(!supersessionBinds(null, blobs))
})

test('a claim is readable only from a completed unit, in a step record, about its own path', () => {
  const step = `${PATH_DIR}/CP-EX-010/steps/S16.md`
  const target = `${PATH_DIR}/CP-EX-010/steps/S15.md`
  const claim = `${target}@a1b2c3d..e4f5a6b`
  const unit = { step: 'S16', unit: '16', type: 'repair', verified: 'test', supersedes: claim, __file: step }
  assert.deepEqual(supersessionClaim(unit), { file: target, before: 'a1b2c3d', after: 'e4f5a6b' })

  // The mutable record beside the steps is not a record: a sentence added
  // there to clear a gate can be deleted the next minute, and the edit stays
  // exempted with nothing saying so.
  assert.equal(supersessionClaim({ ...unit, __file: `${PATH_DIR}/CP-EX-010/index.md` }), null)
  // Half a block grants nothing, by the reading `work-unit` already uses.
  assert.equal(supersessionClaim({ ...unit, type: 'invented' }), null)
  assert.equal(supersessionClaim({ ...unit, verified: undefined }), null)
  // Another path's record is another path's business (ADR-004 decision 3).
  assert.equal(supersessionClaim({ ...unit, supersedes: `${PATH_DIR}/CP-OTHER-002/steps/S15.md@a1b2c3d..e4f5a6b` }), null)
  // And a record does not supersede itself: that is the edit, not the remedy.
  assert.equal(supersessionClaim({ ...unit, supersedes: `${step}@a1b2c3d..e4f5a6b` }), null)
  assert.equal(supersessionClaim({ ...unit, supersedes: undefined }), null)
  assert.equal(supersessionClaim(undefined), null)
})

test('the commits of a log, with the files each one touched', () => {
  const [first, second] = ['a'.repeat(40), 'b'.repeat(40)]
  assert.deepEqual(
    commitsWithFiles(`${first}\n\ntools/a.mjs\ntools/b.mjs\n${second}\n\ntools/a.mjs\n`),
    [{ commit: first, files: ['tools/a.mjs', 'tools/b.mjs'] }, { commit: second, files: ['tools/a.mjs'] }])
  // A merge commit lists no files, and is not dropped: it simply touched none.
  assert.deepEqual(commitsWithFiles(`${first}\n\n${second}\n\ntools/a.mjs\n`),
    [{ commit: first, files: [] }, { commit: second, files: ['tools/a.mjs'] }])
  assert.deepEqual(commitsWithFiles(''), [])
  assert.deepEqual(commitsWithFiles(null), [])
  // Output that begins with a file, which no `--format=%H` log produces, is
  // not silently attributed to a commit that was never named.
  assert.deepEqual(commitsWithFiles('tools/a.mjs\n'), [])
})

test('a step record edited on the branch is answered by a later step that binds both blobs', () => {
  // Crumbz S15 was refused for an unsupported unit type; the agent edited the
  // pushed record, which is a second violation, and no history may be
  // rewritten to undo either. S16 bound both blobs — and the 1.0 checker had
  // no predicate for the remedy its own specification names.
  const step = `${PATH_DIR}/CP-EX-010/steps/S15.md`
  const declared = { before: 'a1b2c3d', after: 'e4f5a6b' }
  const actual = { before: `a1b2c3d${'0'.repeat(33)}`, after: `e4f5a6b${'0'.repeat(33)}` }
  const bound = run([step], 'path/cp-ex-010', [A_PATH], {
    immutableMutations: [step],
    supersessions: [{ file: step, declaredIn: `${PATH_DIR}/CP-EX-010/steps/S16.md`, declared, actual }]
  })
  assert.ok(!rules(bound, 'blocking').includes('record-integrity'),
    `the bound supersession is the remedy — findings were ${JSON.stringify(messages(bound, 'record-integrity'))}`)
  const stated = messages(bound, 'record-integrity', 'advisory')
  assert.equal(stated.length, 1, 'an exemption nobody can see is indistinguishable from a rule nobody enforces')
  assert.match(stated[0], /S16/)

  // A claim that names other blobs proves nothing, and the refusal says what
  // the record does carry rather than leaving the writer to guess.
  const wrong = run([step], 'path/cp-ex-010', [A_PATH], {
    immutableMutations: [step],
    supersessions: [{ file: step, declaredIn: `${PATH_DIR}/CP-EX-010/steps/S16.md`, declared: { before: 'a1b2c3d', after: 'f'.repeat(40) }, actual }]
  })
  assert.ok(rules(wrong, 'blocking').includes('record-integrity'))
  assert.ok(messages(wrong, 'record-integrity', 'blocking').some((m) => m.includes(actual.after)),
    `the refusal names the blobs the record carries — ${JSON.stringify(messages(wrong, 'record-integrity', 'blocking'))}`)

  // And with no claim at all the rule is what it was.
  const bare = run([step], 'path/cp-ex-010', [A_PATH], { immutableMutations: [step] })
  assert.ok(rules(bare, 'blocking').includes('record-integrity'))
})

/* ------------------------------------------------------------------ *
 * ADR-008 decision 6 — every refusal names its remedy
 * ------------------------------------------------------------------ */

test('the three refusals that taught an agent to move the fact now name the remedy', () => {
  // ADR-008 decision 6's three examples, each a message the first adopter
  // answered by changing the thing the message named.

  // A rewritten `base_commit`, false by the specification's own definition: the
  // refusal now prints the commit it computed, so nothing is typed to satisfy it.
  const registration = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    registrationBaseState: { state: 'mismatch', registration: 'b'.repeat(40), parent: 'c'.repeat(40) }
  })
  assert.ok(messages(registration, 'registration-base', 'blocking')
    .some((m) => m.includes('c'.repeat(40)) && /git merge-base/.test(m) && /created before registration/.test(m)),
    `the refusal names the fact and both repairs — ${JSON.stringify(messages(registration, 'registration-base', 'blocking'))}`)

  // An edited pushed step record, after `review` was refused as a unit type.
  assert.ok(workUnitErrors({ step: 'S15', unit: '15', type: 'review', verified: 'gate' })
    .some((e) => /superseding step/.test(e)),
    'the refusal that met `review` is the one that invited the edit')

  // And a widened `writes:`, where the remedy is to widen it deliberately and
  // say why, in the same commit.
  const drift = run(['src/elsewhere.js'], 'path/cp-ex-010', [A_PATH], {
    previousFronts: new Map([[`${A_PATH.file}::writes`, A_PATH.writes]])
  })
  assert.ok(messages(drift, 'scope-drift', 'blocking').some((m) => /update writes: in this same commit and record why/.test(m)),
    `findings were ${JSON.stringify(messages(drift, 'scope-drift', 'blocking'))}`)
})

test('a refusal about an id the checker computes never asks for the id to be typed', () => {
  // `base_commit`, `subject_commit`, the checkpoint and the digest are all
  // read from the repository. A message that asks the writer to make one
  // "correct" is asking them to type over evidence.
  const computed = [
    ...pathFrontmatterErrors({ id: 'CP-EX-010', status: 'running', branch: 'path/cp-ex-010' }, `${PATH_DIR}/CP-EX-010.md`),
    ...pathFrontmatterErrors({ id: 'CP-EX-010', status: 'ready', branch: 'path/cp-ex-010', base_commit: '70f7e27' }, `${PATH_DIR}/CP-EX-010.md`),
    ...transitionErrors({ status: 'ready' }, { status: 'done', resolution: 'completed' })
  ]
  assert.ok(computed.every((error) => typeof error === 'string' && error.length > 0))
  for (const error of computed) {
    assert.match(error, /`git |the commit |registration|candidate|checkpoint/,
      `"${error}" says what is wrong and not where the value comes from`)
  }
})

test('every blocking message says what to do, not only what is wrong', () => {
  // ADR-008 decision 6, held to by the messages themselves rather than by a
  // reviewer's memory: three times on the first adopter a message that named a
  // fact led the agent to move the fact.
  //
  // What can be read from a string is not "this instruction is good" but "this
  // sentence asks the reader to DO something", and the honest proxy for that is
  // an imperative verb — the ones these remedies actually use. Punctuation is
  // not: the first draft of this test accepted any `— ` or `; `, and passed a
  // message that named a count and stopped.
  //
  // WHAT IT DOES NOT PROVE, in the note's own terms: it reads a message whole,
  // so a remedy anywhere in it satisfies the check, and a ternary whose two
  // branches differ — an instruction for most readers, an explanation for a
  // grandfathered record — passes on the strength of either. Telling those
  // branches apart needs a parser, and a message can satisfy this check with
  // bad advice in any case. What it cannot do is say nothing.
  const IMPERATIVES = [
    'add', 'answer', 'append', 'archive', 'begin', 'carry', 'check out', 'complete', 'compute',
    'correct', 'declare', 'escalate', 'fetch', 'fold', 'integrate', 'land', 'let',
    'make', 'merge', 'name', 'number', 'point', 'produce', 'provide', 'read', 'recover',
    'record', 'refresh', 'register', 'remove', 'rename', 'rerun', 'resolve',
    'restore', 'return', 'scaffold', 'state', 'supersede', 'uppercase', 'write'
  ]
  const namesARemedy = (text) =>
    IMPERATIVES.some((verb) => new RegExp(`(^|[—;:,.] |\\b(?:so|and|then|or) )${verb}\\b`, 'i').test(text))

  const source = readFileSync(new URL('./cairn-check.mjs', import.meta.url), 'utf8')
  // A remedy held in a `const` beside the message is still the message's, so an
  // interpolation of a name this file binds to a string is expanded rather than
  // erased — otherwise a message could satisfy the check by padding, or fail it
  // for keeping its longest sentence out of the template.
  const literalsIn = (text) => (text.match(/'(?:[^'\\\n]|\\.)*'/g) ?? []).map((literal) => literal.slice(1, -1))
  const bound = new Map()
  for (const [, name, value] of source.matchAll(/^\s*const (\w+) =\n?((?:\s*'(?:[^'\\]|\\.)*'\s*\+?\n?)+)/gm)) {
    bound.set(name, literalsIn(value).join(' '))
  }
  const spell = (text) => text.replace(/\$\{\s*(\w+)\s*\}/g, (whole, name) => bound.get(name) ?? '…')

  const silent = []
  for (const [, message] of source.matchAll(/add\(\s*(?:'blocking'|[^,]*?\?\s*'(?:blocking|advisory)'\s*:\s*'blocking')\s*,\s*'[a-z-]+'\s*,\s*([\s\S]*?)\)\n/g)) {
    // A message whose own words are only punctuation carries an error from one
    // of the pure functions below, and is audited there, where the sentence is.
    const skeleton = spell(message).replace(/\$\{[^}]*\}/g, '…').replace(/\s+/g, ' ').trim()
    if (/^`[…:\s`,]*`?$/.test(skeleton)) continue
    // Elsewhere what is left of an interpolation is its own string literals: a
    // remedy often lives on one branch of a ternary, and erasing the expression
    // would hide it. Joining them is the limit this test states above; they are
    // separated so that a literal opening with its verb keeps a boundary.
    const text = spell(message)
      .replace(/\$\{[^}]*\}/g, (expr) => literalsIn(expr).join('. ') || '…')
      .replace(/\s+/g, ' ').trim()
    if (!namesARemedy(text)) silent.push(text.slice(0, 110))
  }
  assert.deepEqual(silent, [],
    'a message that names the fault and stops is the one that invites the writer to move the fact')

  // And the sentences the pure functions produce, which reach the reader
  // through those interpolations. Every function whose output is interpolated
  // into a blocking finding is here; a new one is added when it is written.
  const pure = [
    ...pathFrontmatterErrors({ id: 'bad id', status: 'nonesuch', branch: 'x', depends_on: 'x' }, `${PATH_DIR}/CP-EX-010.md`),
    ...pathFrontmatterErrors({ id: 'CP-EX-010', status: 'ready', branch: 'path/cp-ex-010' }, `${PATH_DIR}/CP-EX-010.md`),
    ...pathFrontmatterErrors({ id: 'CP-EX-010', status: 'archived', resolution: 'nope' }, `${PATH_DIR}/CP-EX-010.md`),
    ...pathFrontmatterErrors({ id: 'CP-EX-010', status: 'running', branch: 'path/other', depends_on: ['CP-EX-010', 'nope'] }, `${PATH_DIR}/CP-EX-010.md`),
    ...transitionErrors({ status: 'running' }, { status: 'done' }),
    ...transitionErrors({ status: 'running' }, { status: 'done', resolution: 'completed' }, true),
    ...transitionErrors({ status: 'nonesuch' }, { status: 'running' }),
    ...transitionErrors({ status: 'done' }, { status: 'archived', resolution: 'abandoned' }),
    ...transitionErrors({ status: 'running' }, { status: 'archived', resolution: 'completed' }),
    ...transitionErrors({ status: 'archived', resolution: 'abandoned' }, { status: 'archived', resolution: 'superseded' }),
    ...workUnitErrors({ type: 'review' }),
    ...openingAcceptanceErrors({}),
    ...closingAcceptanceErrors({ verdict: 'maybe' }, 'CP-EX-010'),
    ...closingAcceptanceErrors(null, 'CP-EX-010'),
    ...fillErrors('TO BE FILLED\n\n## Findings\n\n### Q?\n'),
    ...fillErrors(`---\n${METADATA_NAMESPACE}:\n  verdict: maybe\n---\n\n## Findings\n\n### Q?\n`),
    ...adrFrontmatterErrors({ id: 'ADR-999', status: 'nonesuch' }, 'docs/adr/ADR-001-x.md', 'accepted'),
    ...adrFrontmatterErrors({ id: 'ADR-001', status: 'accepted', date: 'x' }, 'docs/adr/ADR-001-x.md', 'proposed'),
    ...closureFieldErrors({ status: 'ready', writes: ['a'] }, { status: 'ready', writes: ['b'] }),
    ...dispositionErrors(null, null, []),
    ...dispositionErrors([{}, { rule: 'x' }, { rule: 'x', disposition: 'nope' }, { rule: 'x', disposition: 'deferred', reason: 'r' }], ['y'], ['x']),
    routeDescent('full', 'lightweight')
  ].filter(Boolean)
  // The inputs above are chosen to reach every branch; these say so, because a
  // producer that fell silent would otherwise satisfy the filter with nothing.
  for (const reached of [/base_commit/, /work-unit type/, /resolution/, /verdict/, /adr\.date/, /advisory_disposition/, /route moved/, /scope_digest/]) {
    assert.ok(pure.some((error) => reached.test(error)), `no sentence reached ${reached}`)
  }
  assert.deepEqual(pure.filter((error) => !namesARemedy(error)), [],
    'these reach the reader inside a blocking finding, and answer for themselves')
})

/* ------------------------------------------------------------------ *
 * ADR-008 decisions 2 and 4 — one commit for one path, one key
 * ------------------------------------------------------------------ */

test('the commit a record reached a status in is the first that declares it', () => {
  const [draft, running, done] = ['a', 'b', 'c'].map((c) => c.repeat(40))
  const statusAt = (commit) => ({ [draft]: 'draft', [running]: 'running', [done]: 'done' })[commit]
  assert.equal(statusCommit([draft, running, done], statusAt), running, 'running by default, as registration reads it')
  assert.equal(statusCommit([draft, running, done], statusAt, 'done'), done)
  assert.equal(statusCommit([draft, running], statusAt, 'done'), null)
})

test('the integrating commit is one commit for one path', () => {
  // On the adopter one request recorded two integrations, and one integrating
  // unit was a merge commit that brought the trunk in and edited the record in
  // the same object. Nothing read either shape.
  const done = (id, file) => ({
    file,
    front: { id, route: 'lightweight', status: 'done', resolution: 'completed', subject_commit: CANDIDATE },
    writes: []
  })
  const first = done('CP-EX-010', `${PATH_DIR}/CP-EX-010.md`)
  const second = done('CP-EX-011', `${PATH_DIR}/CP-EX-011.md`)
  const integrating = {
    stateChanged: [first.file, second.file],
    previousPaths: new Map([
      [first.file, { ...first.front, status: 'ready' }],
      [second.file, { ...second.front, status: 'ready' }]
    ]),
    journalEntries: [{ path: 'CP-EX-010' }, { path: 'CP-EX-011' }]
  }

  const inOneCommit = 'f'.repeat(40)
  const two = run([first.file, second.file], 'main', [first, second], {
    ...integrating,
    integrationStateFor: () => ({ commit: inOneCommit, merge: false, readyBehind: true })
  })
  assert.ok(messages(two, 'acceptance', 'blocking')
    .some((m) => new RegExp(`CP-EX-010, CP-EX-011 reach done in ${inOneCommit}`).test(m)),
    `findings were ${JSON.stringify(messages(two, 'acceptance', 'blocking'))}`)

  // Two arrivals in one COMPARISON, each in its own commit, is an ordinary
  // request spanning two integrations — and refusing it would tell the author
  // to do what they did.
  const apart = run([first.file, second.file], 'main', [first, second], {
    ...integrating,
    integrationStateFor: (file) => ({ commit: file === first.file ? 'a'.repeat(40) : 'b'.repeat(40), merge: false, readyBehind: true })
  })
  assert.deepEqual(messages(apart, 'acceptance', 'blocking'), [])

  // One path, and the commit that records it is not a merge object.
  const one = run([first.file], 'main', [first], {
    ...integrating,
    stateChanged: [first.file],
    previousPaths: new Map([[first.file, { ...first.front, status: 'ready' }]]),
    integrationStateFor: () => ({ commit: 'f'.repeat(40), merge: false })
  })
  assert.deepEqual(messages(one, 'acceptance', 'blocking'), [])

  // The same arrival, carried by a merge object.
  const merged = run([first.file], 'main', [first], {
    ...integrating,
    stateChanged: [first.file],
    previousPaths: new Map([[first.file, { ...first.front, status: 'ready' }]]),
    integrationStateFor: () => ({ commit: 'f'.repeat(40), merge: true })
  })
  assert.ok(messages(merged, 'acceptance', 'blocking').some((m) => /merge/.test(m)),
    `findings were ${JSON.stringify(messages(merged, 'acceptance', 'blocking'))}`)

  // A record that was already done is not arriving, and is nobody's
  // integrating commit.
  const settled = run([first.file], 'main', [first], {
    ...integrating,
    stateChanged: [first.file],
    previousPaths: new Map([[first.file, first.front]]),
    integrationStateFor: () => ({ commit: 'f'.repeat(40), merge: true })
  })
  assert.deepEqual(messages(settled, 'acceptance', 'blocking'), [])
})

test('the journal entry is asked for under the key it is written with', () => {
  const done = {
    ...A_PATH,
    front: { ...A_PATH.front, status: 'done', resolution: 'completed', subject_commit: CANDIDATE }
  }
  const found = run([done.file], 'main', [done], {
    stateChanged: [done.file],
    previousPaths: new Map([[done.file, { ...done.front, status: 'ready' }]]),
    journalEntries: []
  })
  const message = messages(found, 'journal-entry', 'blocking')[0] ?? ''
  assert.match(message, new RegExp(`${METADATA_NAMESPACE}\\.path: ${done.front.id}`),
    'the fifteen adopter entries carry a top-level `path:` too, copied forward from a message that named one')
})

/* ------------------------------------------------------------------ *
 * scope-digest — the seal at every transition, ADR-002 decision 1
 * ------------------------------------------------------------------ */

test('the seal is judged on the trunk, where the integrating commit ticks the box', () => {
  // Two Crumbz paths were ticked inside their integrating commits and both
  // runs were green: the guard read a CLOSED status on the path's OWN branch,
  // and the trunk is neither.
  const done = {
    ...A_PATH,
    front: { ...A_PATH.front, status: 'done', subject_commit: CANDIDATE, resolution: 'completed' }
  }
  const moved = run([done.file], 'main', [done], {
    stateChanged: [done.file],
    scopeDigestFor: () => 'sha256:moved',
    journalEntries: [{ path: done.front.id }]
  })
  assert.ok(messages(moved, 'scope-digest', 'blocking').some((m) => /definition of done moved after acceptance/.test(m)),
    `the trunk must judge the seal — findings were ${JSON.stringify(messages(moved, 'scope-digest', 'blocking'))}`)
})

test('the seal is judged at a unit, long before the path is closing', () => {
  const moved = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    stateChanged: [A_PATH.file],
    scopeDigestFor: () => 'sha256:moved'
  })
  assert.ok(messages(moved, 'scope-digest', 'blocking').some((m) => /definition of done moved after acceptance/.test(m)),
    `a running path's own unit must judge the seal — findings were ${JSON.stringify(messages(moved, 'scope-digest', 'blocking'))}`)
})

test('a running path is not held to a closing record, whatever is lying in its folder', () => {
  // The closing-record comparison belongs to closure. Judging a running path
  // against a stale `closing-*.md` would refuse a unit for a file the unit
  // has nothing to do with.
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    ...MANUAL,
    stateChanged: [A_PATH.file],
    closureFor: (id) => ({ ...acceptedRecord(id), scope_digest: 'sha256:stale' })
  })
  assert.deepEqual(messages(found, 'scope-digest', 'blocking'), [])
})

test('a closing path is judged even when its record is not in this change', () => {
  // The fallback that keeps today's reading: with no trunk to compare against,
  // the changed set is the working tree, and a committed record is not in it.
  const ready = { ...A_PATH, front: { ...A_PATH.front, status: 'ready', subject_commit: CANDIDATE } }
  const found = run([], 'path/cp-ex-010', [ready], {
    stateChanged: [],
    scopeDigestFor: () => 'sha256:moved'
  })
  assert.ok(messages(found, 'scope-digest', 'blocking').some((m) => /definition of done moved after acceptance/.test(m)),
    `findings were ${JSON.stringify(messages(found, 'scope-digest', 'blocking'))}`)
})

test('a record with no acceptance yet is bound to nothing yet, not in breach', () => {
  // A draft, or a registration landing in this same change, has no opening
  // block to digest against. Only a closing path owes one.
  const draft = { ...A_PATH, front: { ...A_PATH.front, status: 'draft' } }
  const found = run([draft.file], 'main', [draft], {
    stateChanged: [draft.file],
    openingRecordFor: () => null
  })
  assert.deepEqual(messages(found, 'scope-digest', 'blocking'), [])
})

/* ------------------------------------------------------------------ *
 * writes-overlap — two live paths on the same files, ADR-003
 * ------------------------------------------------------------------ */

test('two declared patterns meet when some file matches both', () => {
  const meet = (a, b) => {
    assert.equal(patternsMeet(a, b), patternsMeet(b, a), `${a} / ${b}: the answer must not depend on the order`)
    return patternsMeet(a, b)
  }
  assert.ok(meet('tools/**', 'tools/cairn-check.mjs'))
  assert.ok(meet('docs/**', 'docs/adr/**'))
  assert.ok(meet('spec/**/*.md', 'spec/reference/conformance.md'))
  assert.ok(meet('tools/*.mjs', 'tools/**'))
  assert.ok(meet('docs/index.md', 'docs/index.md'))
  // `**` spans any number of segments, zero included. Filling each pattern's
  // wildcards once and offering the result to the other answers NO for every
  // pair below, though each names a file both patterns match — which is why
  // the decision is made segment by segment.
  assert.ok(meet('spec/**/*.md', 'spec/reference/**'), 'spec/reference/conformance.md is in both')
  assert.ok(meet('docs/**/*.md', 'docs/adr/**'), 'docs/adr/ADR-001.md is in both')
  assert.ok(meet('src/**', '**/*.mjs'), 'src/a.mjs is in both')
  assert.ok(meet('project/**/index.md', 'project/coding-paths/**'), 'project/coding-paths/index.md is in both')
  // `**` is zero or more whole segments here, which is what a `writes:` means
  // by it and is not quite what `globToRegExp` does with it — see below.
  assert.ok(meet('a/**', 'a'), '`**` matching zero segments is still a match')
  // Two literals of different depth name no common file.
  assert.ok(!meet('a/b', 'a/b/c'))
  // One filling per segment lines a prefix up with a prefix and nothing else:
  // both of these name `docs/adr-1.md`.
  assert.ok(meet('docs/*.md', 'docs/adr-*'))

  assert.ok(!meet('tools/**', 'docs/**'))
  assert.ok(!meet('tools/*.mjs', 'tools/*.md'))
  assert.ok(!meet('docs/adr/**', 'docs/modules/**'))
  assert.ok(!meet('spec/index.md', 'spec/reference/conformance.md'))
  assert.ok(!meet('spec/**/*.md', 'tools/**'))
})

/** The guarantee worth sweeping rather than sampling: on patterns without
 *  `**`, deciding that two surfaces meet agrees exactly with deciding that
 *  some file is in both, by the same matcher `scope-drift` uses. `**` is the
 *  one place the two readings part, and the comment on `patternsMeet` says
 *  where. */
test('without `**`, two surfaces meet exactly when some file is in both', () => {
  const alphabet = ['a', 'b', 'ax.md', 'x.md', 'y.mjs']
  const files = []
  for (const one of alphabet) {
    files.push(one)
    for (const two of alphabet) {
      files.push(`${one}/${two}`)
      for (const three of alphabet) files.push(`${one}/${two}/${three}`)
    }
  }
  const segments = ['a', 'b', '*', 'x.md', '*.md', 'a*', '*.mjs']
  const patterns = []
  for (const one of segments) {
    patterns.push(one)
    for (const two of segments) {
      patterns.push(`${one}/${two}`)
      for (const three of segments) patterns.push(`${one}/${two}/${three}`)
    }
  }
  const disagreements = []
  for (const one of patterns) {
    for (const two of patterns) {
      const shared = files.some((file) => globToRegExp(one).test(file) && globToRegExp(two).test(file))
      if (shared && !patternsMeet(one, two)) disagreements.push(`${one} ∩ ${two}: a file is in both and they do not meet`)
    }
  }
  assert.deepEqual(disagreements.slice(0, 5), [])
})

const live = (id, writes, extra = {}) => ({
  file: `${PATH_DIR}/${id}.md`,
  front: { id, route: 'lightweight', status: 'running', base_commit: '70f7e27', branch: `path/${id.toLowerCase()}`, ...extra },
  writes
})

test('two live paths whose surfaces meet are named, with the patterns that meet', () => {
  const found = writesOverlaps([live('CP-A', ['tools/**', 'docs/adr/**']), live('CP-B', ['tools/cairn-check.mjs'])])
  assert.equal(found.length, 1)
  assert.deepEqual(found[0].paths, ['CP-A', 'CP-B'])
  assert.deepEqual(found[0].patterns, ['tools/** ∩ tools/cairn-check.mjs'])
  // Two paths declaring the SAME pattern name it once, not against itself.
  assert.deepEqual(
    writesOverlaps([live('CP-A', ['src/**']), live('CP-B', ['src/**'])])[0].patterns,
    ['src/**'])
})

test('the overlap is silent when either path declares depends_on the other', () => {
  const a = live('CP-A', ['tools/**'])
  const b = live('CP-B', ['tools/**'], { depends_on: ['CP-A'] })
  assert.deepEqual(writesOverlaps([a, b]), [])
  // and it reappears when the declaration is dropped while the earlier path
  // is still live, which is the shape CP-016 took on the adopter.
  assert.equal(writesOverlaps([a, { ...b, front: { ...b.front, depends_on: [] } }]).length, 1)
})

test('a path that is not live is not raced with', () => {
  const a = live('CP-A', ['tools/**'])
  for (const status of ['draft', 'done', 'archived']) {
    assert.deepEqual(writesOverlaps([a, live('CP-B', ['tools/**'], { status })]), [],
      `a ${status} path holds no surface`)
  }
  for (const status of ['running', 'blocked', 'ready']) {
    assert.equal(writesOverlaps([a, live('CP-B', ['tools/**'], { status })]).length, 1,
      `a ${status} path is live`)
  }
})

test('the overlap is reported on a run that belongs to one of the two paths', () => {
  const a = live('CP-A', ['tools/**'])
  const b = live('CP-B', ['tools/cairn-check.mjs'])
  const onA = run([a.file], 'path/cp-a', [a, b], { stateChanged: [] })
  assert.ok(messages(onA, 'writes-overlap', 'advisory').some((m) => /CP-A/.test(m) && /CP-B/.test(m)),
    `advisories were ${JSON.stringify(messages(onA, 'writes-overlap', 'advisory'))}`)
  assert.deepEqual(messages(onA, 'writes-overlap', 'blocking'), [], 'the overlap is the owner\'s call, so it never blocks')
  // At the later path's registration, on the trunk, its record is the change.
  const atRegistration = run([b.file], 'main', [a, b], { stateChanged: [b.file] })
  assert.ok(messages(atRegistration, 'writes-overlap', 'advisory').length === 1)
  // A run belonging to neither says nothing about them.
  const elsewhere = run([], 'main', [a, b], { stateChanged: [] })
  assert.deepEqual(messages(elsewhere, 'writes-overlap', 'advisory'), [])
})

/* ------------------------------------------------------------------ *
 * the profile line — ADR-001 decision 6
 *
 * A profile is a claim about settings, so the remedy for a gap is a setting
 * and never a commit: everything here produces OUTPUT, and nothing here
 * produces a finding. The reads are injected, so the suite makes no network
 * call and the line is proved against payloads rather than against a forge.
 * ------------------------------------------------------------------ */

test('the GitHub slug is read from every remote form, and from nothing else', () => {
  assert.deepEqual(githubSlug('git@github.com:sinlalune/cairn.git'), { owner: 'sinlalune', repo: 'cairn' })
  assert.deepEqual(githubSlug('https://github.com/sinlalune/cairn.git'), { owner: 'sinlalune', repo: 'cairn' })
  assert.deepEqual(githubSlug('https://github.com/sinlalune/cairn'), { owner: 'sinlalune', repo: 'cairn' })
  assert.deepEqual(githubSlug('ssh://git@github.com/sinlalune/cairn.git'), { owner: 'sinlalune', repo: 'cairn' })
  assert.deepEqual(githubSlug('git@GitHub.com:sinlalune/cairn.git'), { owner: 'sinlalune', repo: 'cairn' })
  // A fixture's remote is a local bare repository, and a self-hosted forge is
  // not GitHub. Both answer "not read" rather than a wrong reading.
  assert.equal(githubSlug('/tmp/cairn-fixture-abc.git'), null)
  assert.equal(githubSlug('git@gitlab.com:sinlalune/cairn.git'), null)
  assert.equal(githubSlug(null), null)
  // The host anchor is the whole of the check, so the fixtures that prove it
  // are the ones that put github.com somewhere it does not govern. Loosened,
  // these parse as an owner of `evil.example:sinlalune`, and the line would
  // report some other repository's rules as this trunk's.
  assert.equal(githubSlug('https://evil.example/github.com/sinlalune/cairn.git'), null)
  assert.equal(githubSlug('git@github.com.evil.example:sinlalune/cairn.git'), null)
  assert.equal(githubSlug('https://github.com.evil.example/sinlalune/cairn'), null)
})

/** This repository's own trunk, as `rules/branches/main` answers on
 *  2026-09-11: the check `protocol` required on the exact commit, only merge
 *  commits allowed to land, and the admin role bypassing the ruleset — the
 *  honest line ADR-001 decision 6 wrote out by hand. The repository's own
 *  `allow_squash_merge` and `allow_rebase_merge` are BOTH true and must not be
 *  read: the trunk's ruleset is what governs the trunk. */
const TRUNK_RULES = [
  { type: 'deletion', ruleset_id: 7 },
  { type: 'non_fast_forward', ruleset_id: 7 },
  { type: 'pull_request', ruleset_id: 7, parameters: { allowed_merge_methods: ['merge'] } },
  { type: 'required_status_checks', ruleset_id: 7, parameters: { strict_required_status_checks_policy: true, required_status_checks: [{ context: 'protocol' }] } }
]
const pullRequestRule = (...methods) =>
  ({ type: 'pull_request', ruleset_id: 7, parameters: { allowed_merge_methods: methods } })

test('the forge gaps are read from the trunk\'s rules, and this repository\'s own trunk yields the bypass alone', () => {
  const gaps = forgeGaps({
    rules: TRUNK_RULES,
    rulesets: [{ id: 7, bypass_actors: [{ actor_id: 5, actor_type: 'RepositoryRole' }] }]
  })
  // The bypass, and ONLY the bypass: `allow_squash_merge` and
  // `allow_rebase_merge` are both true on this repository, and the trunk's
  // ruleset allows neither onto the trunk. The toggles are not read.
  assert.deepEqual(gaps, ['1 actor bypasses the trunk\'s rules'])
})

test('a merge method lands only if EVERY applying rule allows it', () => {
  const permissive = TRUNK_RULES.map((rule) => rule.type === 'pull_request' ? pullRequestRule('merge', 'squash', 'rebase') : rule)
  assert.deepEqual(forgeGaps({ rules: permissive, rulesets: [] }),
    ['squash and rebase merges are allowed on the trunk, so the commit that lands is not the object the check ran on'])
  // GitHub applies the MOST RESTRICTIVE form of a rule defined more than once,
  // so merge methods intersect. Unioning them reported a squash the forge
  // would refuse.
  assert.deepEqual(forgeGaps({ rules: [...permissive, pullRequestRule('merge')], rulesets: [] }), [])
  // And an absent parameter is GitHub's own default, all three — never the
  // restrictive answer.
  assert.deepEqual(forgeGaps({ rules: [{ type: 'pull_request', ruleset_id: 9 }], rulesets: [] }),
    ['no check is required before a merge', 'squash and rebase merges are allowed on the trunk, so the commit that lands is not the object the check ran on'])
})

test('a strict policy on any applying rule is enough, and none on any is the gap', () => {
  const lax = { type: 'required_status_checks', ruleset_id: 7, parameters: { strict_required_status_checks_policy: false } }
  const laxOnly = [lax, pullRequestRule('merge')]
  assert.deepEqual(forgeGaps({ rules: laxOnly, rulesets: [] }),
    ['a required check is not required on the exact commit that lands'])
  // The strict form is the more restrictive one, so a strict rule behind a lax
  // one still makes the check strict. Reading only the first rule found
  // reported this as unenforced.
  const strict = { type: 'required_status_checks', ruleset_id: 9, parameters: { strict_required_status_checks_policy: true } }
  assert.deepEqual(forgeGaps({ rules: [...laxOnly, strict], rulesets: [] }), [])
})

test('a trunk guarded by rules that require no check, or no request, is said so', () => {
  const noCheck = TRUNK_RULES.filter((rule) => rule.type !== 'required_status_checks')
  assert.deepEqual(forgeGaps({ rules: noCheck, rulesets: [] }), ['no check is required before a merge'])
  const noRequest = TRUNK_RULES.filter((rule) => rule.type !== 'pull_request')
  assert.deepEqual(forgeGaps({ rules: noRequest, rulesets: [] }), ['a direct push to the trunk needs no pull request'])
})

test('a trunk with no rule at all is said to be unguarded, once, and no cause is invented for it', () => {
  // ONCE: the missing check, the missing request and the merge methods are all
  // that one absence, not four findings. A private repository on a plan
  // without rulesets arrives here too, and the line does not claim to know
  // which it is: the plan is not readable from what this reads.
  assert.deepEqual(forgeGaps({ rules: [], rulesets: [] }), ['no rule of the forge guards the trunk'])
})

test('the forge is not read without a token, without GitHub, or when it answers badly', async () => {
  const never = () => { throw new Error('the forge must not be called') }
  assert.match((await readForge({ token: null, slug: { owner: 'o', repo: 'r' }, trunk: 'main', request: never })).why, /no token/)
  assert.match((await readForge({ token: 't', slug: null, trunk: 'main', request: never })).why, /not a GitHub repository/)

  const failing = async () => ({ error: 'HTTP 404' })
  const refused = await readForge({ token: 't', slug: { owner: 'o', repo: 'r' }, trunk: 'main', request: failing })
  assert.equal(refused.read, false)
  assert.match(refused.why, /HTTP 404/)
})

test('a ruleset the token cannot read fails the whole read, rather than reporting no bypass', async () => {
  // A fine-grained token without administration access reads the branch's
  // rules and is refused the ruleset. Reporting `read: true` there printed
  // "the forge enforces everything these records name" over a bypass list
  // nobody had seen.
  const request = async (url) => {
    if (url.includes('/rules/branches/')) return { value: [{ type: 'pull_request', ruleset_id: 7, parameters: { allowed_merge_methods: ['merge'] } }] }
    return { error: 'HTTP 403' }
  }
  const read = await readForge({ token: 't', slug: { owner: 'o', repo: 'r' }, trunk: 'main', request })
  assert.equal(read.read, false)
  assert.match(read.why, /HTTP 403 for a ruleset of the trunk/)
})

test('the forge read never throws: a refusal, a timeout and a broken fetch are all answers', async () => {
  // This is the whole of the guarantee that the profile line cannot reach an
  // exit code, and it is the one half of the read that touches the network.
  assert.deepEqual(
    await githubRequest('https://api.github.com/repos/o/r', { token: 't', doFetch: async () => ({ ok: false, status: 404 }) }),
    { error: 'HTTP 404' })
  assert.deepEqual(
    await githubRequest('https://api.github.com/repos/o/r', { token: 't', doFetch: async () => { throw new Error('getaddrinfo ENOTFOUND') } }),
    { error: 'getaddrinfo ENOTFOUND' })
  assert.deepEqual(
    await githubRequest('https://api.github.com/repos/o/r', {
      token: 't',
      timeoutMs: 5,
      doFetch: (url, init) => new Promise((_resolve, reject) => {
        init.signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })))
      })
    }),
    { error: 'no answer in 5ms' })
  const ok = await githubRequest('https://api.github.com/repos/o/r', { token: 't', doFetch: async () => ({ ok: true, json: async () => ({ private: false }) }) })
  assert.deepEqual(ok, { value: { private: false } })
})

test('the forge read asks for the trunk\'s rules and each ruleset behind them, and nothing else', async () => {
  const asked = []
  const request = async (url) => {
    asked.push(url)
    if (url.includes('/rules/branches/')) return { value: [{ type: 'pull_request', ruleset_id: 7, parameters: { allowed_merge_methods: ['merge'] } }, { type: 'deletion', ruleset_id: 7 }] }
    return { value: { id: 7, bypass_actors: [{ actor_id: 5 }] } }
  }
  const read = await readForge({ token: 't', slug: { owner: 'o', repo: 'r' }, trunk: 'main', request })
  assert.equal(read.read, true)
  // The repository payload is NOT read: its merge toggles are the wrong
  // reading, and nothing else on it is used.
  assert.deepEqual(asked, [
    'https://api.github.com/repos/o/r/rules/branches/main',
    'https://api.github.com/repos/o/r/rulesets/7'
  ])
  // One ruleset id asked once, however many of its rules apply to the trunk.
  assert.ok(read.gaps.some((g) => /bypasses/.test(g)), JSON.stringify(read.gaps))
})

test('the profile line names the declared transports and what the forge does not enforce', () => {
  const transports = { registration: 'manual-git', integration: 'pull-request' }
  assert.match(profileLine({ transports, forge: { read: false, why: 'no token' } }),
    /transports registration manual-git, integration pull-request; forge not read \(no token\)/)
  assert.match(profileLine({ transports, forge: { read: true, gaps: ['a bypass', 'a squash'] } }),
    /forge does not enforce: a bypass; a squash/)
  assert.match(profileLine({ transports, forge: { read: true, gaps: [] } }),
    /forge enforces everything these records name/)
})

/* ------------------------------------------------------------------ *
 * transition — the lifecycle is a statement of fact
 * ------------------------------------------------------------------ */

test('lifecycle transitions distinguish ready from integrated done', () => {
  const ready = { ...A_PATH.front, status: 'ready', subject_commit: CANDIDATE }
  const done = { ...ready, status: 'done', resolution: 'completed' }
  assert.deepEqual(transitionErrors(A_PATH.front, ready, true), [])
  assert.deepEqual(transitionErrors(ready, done, false), [])
  assert.ok(transitionErrors(A_PATH.front, done, true).some((e) => e.includes('cannot claim `done`')))
  assert.ok(transitionErrors({ ...A_PATH.front, status: 'blocked' }, ready, true).some((e) => e.includes('not allowed')))
  assert.ok(transitionErrors(A_PATH.front, { ...A_PATH.front, status: 'archived' }).some((e) => e.includes('requires a resolution')))
  assert.ok(transitionErrors(A_PATH.front, { ...A_PATH.front, status: 'archived', resolution: 'completed' }).some((e) => e.includes('never completed')))
  assert.deepEqual(transitionErrors(done, { ...done, status: 'archived', resolution: 'completed' }), [])
})

/* ADR-001 decision 7: the trunk had an edge that let an integrating commit
 * take a path from `running` straight to `done`. It existed for the
 * `manual-git` merge unit, and on both transports the administrative commit
 * has already declared `ready` on the branch. The edge is gone, and the
 * refusal names the remedy ADR-008 decision 6 asks for. */
test('a trunk commit cannot take a path from running to done without a ready commit', () => {
  const done = { ...A_PATH.front, status: 'done', subject_commit: CANDIDATE, resolution: 'completed' }
  const errors = transitionErrors(A_PATH.front, done, false)
  assert.ok(errors.some((e) => /running → done is not allowed/.test(e)),
    `the trunk edge must be refused — got ${JSON.stringify(errors)}`)
  assert.ok(errors.some((e) => /declare `ready` on the branch, in the administrative commit/.test(e) &&
    /record `done` on the trunk in a commit of its own after the merge/.test(e)),
    `the refusal must name its remedy, whichever half is missing — got ${JSON.stringify(errors)}`)
  // The edge it replaces stays open: an integrating commit records ready → done.
  assert.deepEqual(transitionErrors({ ...A_PATH.front, status: 'ready', subject_commit: CANDIDATE }, done, false), [])
  // And the same integration read from an integrating request, whose range
  // holds the merge as well: the endpoints say running → done, while the
  // `ready` the branch declared is a commit inside the range. The record's
  // sentence is "with no ready commit behind it" (ADR-008 decision 2).
  assert.deepEqual(transitionErrors(A_PATH.front, done, false, true), [])
})

test('a path branch claiming done is blocked', () => {
  const done = { ...A_PATH, front: { ...A_PATH.front, status: 'done', subject_commit: CANDIDATE, resolution: 'completed' } }
  const found = run([done.file], 'path/cp-ex-010', [done], { previousPaths: new Map([[done.file, A_PATH.front]]) })
  assert.ok(messages(found, 'transition', 'blocking').some((m) => /cannot claim `done`/.test(m)))
})

test('a path declaration is archived with a resolution, never deleted', () => {
  const file = `${PATH_DIR}/CP-DELETED.md`
  const found = run([file], TRUNK_BRANCH, [], { stateChanged: [file] })
  assert.ok(found.some((f) => f.rule === 'transition' && f.message.includes('instead of deleting')))
})

test('a declaration that moved between shapes has not been deleted', () => {
  const folder = { ...A_PATH, file: `${PATH_DIR}/CP-EX-010/index.md` }
  const gone = `${PATH_DIR}/CP-EX-010.md`
  const moved = run([gone], 'path/cp-ex-010', [folder], { stateChanged: [gone] })
  assert.ok(!rules(moved, 'blocking').includes('transition'))
  const deleted = run([gone], 'path/cp-ex-010', [], { stateChanged: [gone] })
  assert.ok(rules(deleted, 'blocking').includes('transition'))
})

test('an unavailable previous state is inconclusive, not a pass', () => {
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { previousPaths: new Map() })
  assert.ok(found.some((f) => f.rule === 'transition' && f.outcome === 'inconclusive'))
})

test('ready → blocked exists, because acceptance stalls', () => {
  assert.deepEqual(transitionErrors({ status: 'ready' }, { status: 'blocked' }), [])
})

test('blocked → ready does not exist, because reaching ready is execution', () => {
  assert.ok(transitionErrors({ status: 'blocked' }, { status: 'ready' }).some((e) => /not allowed/.test(e)))
})

test('an unchanged archived state is no event, but its resolution is terminal', () => {
  const archived = { status: 'archived', resolution: 'completed' }
  assert.deepEqual(transitionErrors(archived, archived), [])
  assert.ok(transitionErrors(archived, { status: 'archived', resolution: 'superseded' }).some((e) => /resolution is terminal/.test(e)))
})

/* ------------------------------------------------------------------ *
 * journal-entry — integration writes one file per outcome
 * ------------------------------------------------------------------ */

test('a journal entry is recognised by its declaration, never by its filename', () => {
  assert.equal(journalRecords([{ path: 'CP-EX-010' }], 'CP-EX-010'), true)
  assert.equal(journalRecords([{ path: 'CP-EX-011' }], 'CP-EX-010'), false)
  assert.equal(journalRecords([{ __file: `${JOURNAL_DIR}/2026-08-31-cp-ex-010.md` }], 'CP-EX-010'), false)
  assert.equal(journalRecords([], 'CP-EX-010'), false)
})

const donePath = (id = A_PATH.front.id) => ({ ...A_PATH, front: { ...A_PATH.front, id, status: 'done', subject_commit: CANDIDATE } })

test('a path reaching done with no journal entry is blocked', () => {
  const done = donePath()
  const found = run([done.file], TRUNK_BRANCH, [done], {
    stateChanged: [done.file],
    previousPaths: new Map([[done.file, { ...A_PATH.front, status: 'running' }]]),
    journalEntries: []
  })
  assert.ok(rules(found, 'blocking').includes('journal-entry'))
})

test('the entry satisfies it, and a path already done is not asked twice', () => {
  const done = donePath()
  const withEntry = run([done.file], TRUNK_BRANCH, [done], {
    stateChanged: [done.file],
    previousPaths: new Map([[done.file, { ...A_PATH.front, status: 'running' }]]),
    journalEntries: [{ path: done.front.id }]
  })
  assert.ok(!rules(withEntry, 'blocking').includes('journal-entry'))

  const alreadyDone = run([done.file], TRUNK_BRANCH, [done], {
    stateChanged: [done.file],
    previousPaths: new Map([[done.file, { ...done.front }]]),
    journalEntries: []
  })
  assert.ok(!rules(alreadyDone, 'blocking').includes('journal-entry'))
})

test('a grandfathered migration path is NOT excused from its journal entry', () => {
  const done = donePath('CP-OLD')
  const found = run([done.file], TRUNK_BRANCH, [done], {
    stateChanged: [done.file],
    previousPaths: new Map([[done.file, { ...A_PATH.front, id: 'CP-OLD', status: 'running' }]]),
    journalEntries: [],
    migrationExempt: new Set(['CP-OLD'])
  })
  assert.ok(rules(found, 'blocking').includes('journal-entry'))
})

test('an unreadable journal is inconclusive, not a pass', () => {
  const done = donePath()
  const found = run([done.file], TRUNK_BRANCH, [done], {
    stateChanged: [done.file],
    previousPaths: new Map([[done.file, { ...A_PATH.front, status: 'running' }]]),
    journalEntries: null
  })
  const entry = found.filter((f) => f.rule === 'journal-entry')
  assert.equal(entry.length, 1)
  assert.equal(entry[0].outcome, 'inconclusive')
})

/* ------------------------------------------------------------------ *
 * work-unit — typed, declared, and coherent in one commit
 * ------------------------------------------------------------------ */

const LEDGER = `### S01 — first

\`\`\`cairn-unit
step: S01
unit: 01
type: implementation
verified: cairn-check, test
\`\`\`

### S02 — second

\`\`\`cairn-unit
step: S02
unit: 02
type: documentation
verified: cairn-check
\`\`\`
`
const UNITS = parseWorkUnits(LEDGER)

test('a cairn-unit block is read from the ledger, and a bad type is rejected', () => {
  assert.equal(UNITS.length, 2)
  assert.deepEqual(UNITS.map((u) => u.type), ['implementation', 'documentation'])
  assert.deepEqual(workUnitErrors(UNITS[0]), [])
  assert.ok(workUnitErrors({ step: 'S03', unit: '03', type: 'refactor' }).length > 0)
  assert.ok(WORK_UNIT_TYPES.includes('repair'))
})

test('a changed path record with no cairn-unit block is blocked', () => {
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { workUnits: [] })
  assert.ok(rules(found, 'blocking').includes('work-unit'))
})

test('the block must be for the step the record says it is on', () => {
  const onS03 = { ...A_PATH, front: { ...A_PATH.front, current_step: 'S03' } }
  const stale = run([onS03.file], 'path/cp-ex-010', [onS03], { workUnits: UNITS })
  assert.ok(rules(stale, 'blocking').includes('work-unit'))
  const current = run([onS03.file], 'path/cp-ex-010', [onS03], {
    workUnits: [...UNITS, { step: 'S03', unit: '03', type: 'repair', verified: 'cairn-check' }]
  })
  assert.ok(!rules(current, 'blocking').includes('work-unit'))
})

test('a path record that did not change is not asked for a work unit', () => {
  const found = run(['README.md'], 'path/cp-ex-010', [A_PATH], { workUnits: [] })
  assert.ok(!rules(found, 'blocking').includes('work-unit'))
})

test('an invalid declared type blocks even when a block is present', () => {
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], {
    workUnits: [{ step: 'S01', unit: '01', type: 'refactor', verified: 'all' }]
  })
  assert.ok(rules(found, 'blocking').includes('work-unit'))
})

test('source without a module note is blocked under work-unit, with it is not', () => {
  // `same-work-unit` in 0.2: source changed without its documents and its
  // step is not a completed unit.
  const withoutDocs = run([SRC, A_PATH.file], 'path/cp-ex-010')
  assert.ok(messages(withoutDocs, 'work-unit', 'blocking').some((m) => /no module note/.test(m)))

  const complete = run([SRC, NOTE, A_PATH.file], 'path/cp-ex-010')
  assert.deepEqual(rules(complete, 'blocking'), [])
})

test('every configured source root is guarded', () => {
  for (const root of GUARDED_ROOTS) {
    const source = `${root}deep/file.mjs`
    const missing = run([source, A_PATH.file], 'path/cp-ex-010')
    assert.ok(rules(missing, 'blocking').includes('work-unit'), source)
    const complete = run([source, `${slash(MODULE_DIR)}other.md`, A_PATH.file], 'path/cp-ex-010')
    assert.ok(!rules(complete, 'blocking').includes('work-unit'), source)
  }
})

test('source without a coding path update is blocked', () => {
  const found = run([SRC, NOTE], 'path/cp-ex-010')
  assert.ok(found.some((f) => f.rule === 'work-unit' && f.message.includes('no coding path')))
})

test('source landing on the trunk is held to the same coherence', () => {
  const found = run([SRC], TRUNK_BRANCH)
  assert.ok(rules(found, 'blocking').includes('work-unit'))
})

test('a docs-only change is never asked for a module note', () => {
  const found = run([ARCH, `${ADR_DIR}/ADR-012-x.md`], 'path/cp-ex-010')
  assert.deepEqual(rules(found, 'blocking'), [])
})

test('the area-precise note is advised, never demanded', () => {
  // `area-note` in 0.2: the map is a judgement call, so a wrong verdict would
  // teach people to bypass the validator.
  const vague = run([SRC, `${slash(MODULE_DIR)}other.md`, A_PATH.file], 'path/cp-ex-010')
  assert.ok(messages(vague, 'work-unit', 'advisory').some((m) => m.includes(NOTE)))
  assert.deepEqual(rules(vague, 'blocking'), [])
  const precise = run([SRC, NOTE, A_PATH.file], 'path/cp-ex-010')
  assert.deepEqual(rules(precise, 'advisory').filter((r) => r === 'work-unit'), [])
  // A note that does not exist yet cannot be "not moved".
  const absent = run([SRC, `${slash(MODULE_DIR)}other.md`, A_PATH.file], 'path/cp-ex-010', [A_PATH], { resolveFile: () => false })
  assert.deepEqual(rules(absent, 'advisory').filter((r) => r === 'work-unit'), [])
})

test('area mapping routes source to its module note', () => {
  assert.equal(areaOf(SRC), AREA.name)
  assert.equal(areaOf('docs/index.md'), null)
})

/* ------------------------------------------------------------------ *
 * scope-drift — blocks unless the declaration moves with it
 * ------------------------------------------------------------------ */

test('drift is advisory when the declaration moved in the same change', () => {
  const found = run([SRC, SRC2, NOTE, A_PATH.file], 'path/cp-ex-010')
  assert.deepEqual(rules(found, 'blocking'), [])
  assert.ok(rules(found, 'advisory').includes('scope-drift'))
})

test('drift with a stale declaration blocks; drift that widens it stays advisory', () => {
  const outside = ['unrelated/file.ts']
  const stale = run(outside, 'path/cp-ex-010', [A_PATH], {
    previousFronts: new Map([[`${A_PATH.file}::writes`, A_PATH.writes]])
  })
  assert.ok(rules(stale, 'blocking').includes('scope-drift'))

  const widened = run(outside, 'path/cp-ex-010', [A_PATH], {
    previousFronts: new Map([[`${A_PATH.file}::writes`, [SRC]]])
  })
  assert.ok(!rules(widened, 'blocking').includes('scope-drift'))
  assert.ok(rules(widened, 'advisory').includes('scope-drift'))
})

/* ------------------------------------------------------------------ *
 * route — the ceremony a change earns
 * ------------------------------------------------------------------ */

test('the structural full-route triggers fire on the control and decision planes', () => {
  assert.deepEqual(fullRouteTriggers([SRC], () => null), [])
  assert.match(fullRouteTriggers(['tools/cairn-check.mjs'], () => null)[0], /control plane/)
  assert.match(fullRouteTriggers([`${ADR_DIR}/**`], () => null)[0], /decision record/)
  const twoAreas = (file) => (file.startsWith('a/') ? 'alpha' : file.startsWith('b/') ? 'beta' : null)
  assert.match(fullRouteTriggers(['a/x.ts', 'b/y.ts'], twoAreas)[0], /implemented areas/)
  assert.deepEqual(ROUTES, ['lightweight', 'full'], 'foundation folded into full; emergency was never specified')
  assert.ok(!WORK_UNIT_TYPES.includes('foundation'))
})

test('a lightweight path that meets a trigger is blocked until it escalates', () => {
  const heavy = { ...A_PATH, writes: ['tools/cairn-check.mjs'] }
  const found = run([heavy.file], 'path/cp-ex-010', [heavy], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'x' }]
  })
  assert.ok(rules(found, 'blocking').includes('route'))

  const escalated = { ...heavy, front: { ...heavy.front, route: 'full' } }
  const ok = run([escalated.file], 'path/cp-ex-010', [escalated], {
    workUnits: [{ step: 'S01', unit: '01', type: 'implementation', verified: 'x' }]
  })
  assert.ok(!rules(ok, 'blocking').includes('route'))
})

test('escalation is one-way and an unknown route is rejected', () => {
  assert.equal(routeDescent('full', 'full'), null)
  assert.equal(routeDescent('lightweight', 'full'), null)
  assert.match(routeDescent('full', 'lightweight'), /one-way/)

  const bogus = { ...A_PATH, front: { ...A_PATH.front, route: 'express' } }
  assert.ok(rules(run(['README.md'], 'path/cp-ex-010', [bogus]), 'blocking').includes('route'))

  const descended = { ...A_PATH, front: { ...A_PATH.front, route: 'lightweight' } }
  const found = run(['README.md'], 'path/cp-ex-010', [descended], {
    previousFronts: new Map([[descended.file, { ...descended.front, route: 'full' }]])
  })
  assert.ok(rules(found, 'blocking').includes('route'))
})

test('an omitted route is rejected and names the configured new-path default', () => {
  const implicit = { ...A_PATH, front: { ...A_PATH.front }, writes: ['README.md'] }
  delete implicit.front.route
  const found = run(['README.md'], 'path/cp-ex-010', [implicit])
  assert.ok(rules(found, 'blocking').includes('route'))
  assert.match(found.find((f) => f.rule === 'route').message, new RegExp(`configured default.*${CAIRN_CONFIG.defaultRoute}`))
})

test('a documents-only path runs full, and foundation is an unknown route', () => {
  const foundation = { ...A_PATH, front: { ...A_PATH.front, route: 'foundation' }, writes: [ARCH] }
  assert.ok(messages(run(['README.md'], 'path/cp-ex-010', [foundation]), 'route', 'blocking').some((m) => /outside lightweight \| full/.test(m)))
  const documents = { ...A_PATH, front: { ...A_PATH.front, route: 'full' }, writes: [ARCH, `${ADR_DIR}/ADR-001-x.md`] }
  assert.ok(!rules(run(['README.md'], 'path/cp-ex-010', [documents]), 'blocking').includes('route'))
})

test('a lightweight path that has already spanned two units must escalate', () => {
  const twoUnits = [
    { step: 'S01', unit: '01', type: 'implementation', verified: 'x' },
    { step: 'S02', unit: '02', type: 'implementation', verified: 'x' }
  ]
  const found = run([A_PATH.file], 'path/cp-ex-010', [A_PATH], { workUnits: twoUnits })
  assert.ok(rules(found, 'blocking').includes('route'))
  const escalated = { ...A_PATH, front: { ...A_PATH.front, route: 'full' } }
  assert.ok(!rules(run([escalated.file], 'path/cp-ex-010', [escalated], { workUnits: twoUnits }), 'blocking').includes('route'))
})

/* ------------------------------------------------------------------ *
 * record-date — advisory on both halves since 1.0
 * ------------------------------------------------------------------ */

test('a date is read from the head of a filename, and only from there', () => {
  assert.equal(filenameDate(`${JOURNAL_DIR}/2026-08-27-cp-x.md`), '2026-08-27')
  assert.equal(filenameDate(`${JOURNAL_DIR}/cp-x-a380f2a.md`), null)
  assert.equal(filenameDate(`${SESSIONS}/release-2026-08-27.md`), null)
  assert.equal(filenameDate(undefined), null)
})

test('two dates written by the same author must agree', () => {
  const found = recordDateFindings([{ file: 'x', named: '2026-08-20', declared: '2026-08-31', addedOn: '2026-08-31' }])
  assert.equal(found.length, 1)
  assert.equal(found[0].kind, 'disagreement')
})

test('agreeing dates do not prove the date, which is the whole finding', () => {
  const found = recordDateFindings([{ file: 'x', named: '2026-08-27', declared: '2026-08-27', addedOn: '2026-08-31' }])
  assert.equal(found.length, 1)
  assert.equal(found[0].kind, 'drift')
  assert.equal(found[0].drift, 4)
})

test('a correctly dated record, one day of slack, and an uncommitted record report nothing', () => {
  assert.deepEqual(recordDateFindings([{ file: 'x', named: '2026-08-27', declared: '2026-08-27', addedOn: '2026-08-27' }]), [])
  assert.deepEqual(recordDateFindings([{ file: 'x', named: '2026-08-27', declared: '2026-08-27', addedOn: '2026-08-28' }]), [])
  assert.deepEqual(recordDateFindings([{ file: 'x', named: '2026-08-20', declared: '2026-08-20', addedOn: null }]), [])
  assert.equal(recordDateFindings([{ file: 'x', named: '2026-08-20', declared: '2026-08-31', addedOn: null }])[0].kind, 'disagreement')
})

test('a misdated record is advised on disagreement and on drift, and never blocks', () => {
  const disagreement = run(['README.md'], 'path/cp-ex-010', [A_PATH], {
    addedRecords: [{ file: `${SESSIONS}/2026-08-20-x.md`, named: '2026-08-20', declared: '2026-08-31', addedOn: '2026-08-31' }]
  })
  assert.ok(rules(disagreement, 'advisory').includes('record-date'))
  assert.ok(!rules(disagreement, 'blocking').includes('record-date'))

  const drift = run(['README.md'], 'path/cp-ex-010', [A_PATH], {
    addedRecords: [{ file: `${JOURNAL_DIR}/2026-08-27-cp-x.md`, named: '2026-08-27', declared: '2026-08-27', addedOn: '2026-08-31' }]
  })
  assert.ok(rules(drift, 'advisory').includes('record-date'))
  assert.deepEqual(rules(drift, 'blocking'), [])
})

/* ------------------------------------------------------------------ *
 * redaction — advisory since 1.0
 * ------------------------------------------------------------------ */

test('a redaction marker inside code is documentation, not a finding', () => {
  assert.deepEqual(redactionMarkers('text [redacted: 2026-01-01-x] more'), ['2026-01-01-x'])
  assert.deepEqual(redactionMarkers('use `[redacted: <id>]` in the record'), [])
  assert.deepEqual(redactionMarkers('```\n[redacted: <id>]\n```'), [])
})

test('a marker with no redaction record behind it is advised, not blocked', () => {
  const index = {
    has: (marker) => marker === '2026-01-01-cp-ex-010-redaction',
    markersIn: (file) => (file === `${SESSIONS}/note.md` ? ['2026-01-01-cp-ex-010-redaction'] : ['ghost'])
  }
  const good = run([`${SESSIONS}/note.md`], 'path/cp-ex-010', [A_PATH], { redactionRecordExists: index })
  assert.ok(!rules(good, 'advisory').includes('redaction'))

  const bad = run(['docs/other.md'], 'path/cp-ex-010', [A_PATH], { redactionRecordExists: index })
  assert.ok(rules(bad, 'advisory').includes('redaction'))
  assert.ok(!rules(bad, 'blocking').includes('redaction'))
})

/* ------------------------------------------------------------------ *
 * the concept wiki and the decision plane
 * ------------------------------------------------------------------ */

test('a concept reached only from inside the wiki is still an orphan', () => {
  assert.deepEqual(orphanConcepts(['gate-parity.md', 'invented.md', 'index.md'], new Set(['gate-parity.md'])), ['invented.md'])
  assert.deepEqual(orphanConcepts(['index.md'], new Set()), [])
  assert.deepEqual(orphanConcepts(['gate-parity.md'], ['gate-parity.md']), [])
  assert.deepEqual(orphanConcepts(['a.md', 'b.md'], new Set()), ['a.md', 'b.md'])
})

test('growth is measured, and an unreadable previous state is not "no growth"', () => {
  assert.deepEqual(addedConcepts(['a.md'], ['a.md', 'b.md']), ['b.md'])
  assert.deepEqual(addedConcepts(['a.md', 'b.md'], ['a.md', 'b.md']), [])
  assert.deepEqual(addedConcepts(['a.md'], ['a.md', 'index.md']), [])
  assert.equal(addedConcepts(null, ['a.md', 'b.md']), null)
})

test('a finding never prints an unreadable wall of names', () => {
  assert.equal(namesForReading(['a', 'b']), 'a, b')
  assert.equal(namesForReading(['a', 'b', 'c', 'd', 'e', 'f', 'g']), 'a, b, c, d, e, and 2 more')
})

test('architecture changed without a decision record is advisory', () => {
  const found = run([ARCH], TRUNK_BRANCH)
  assert.ok(rules(found, 'advisory').includes('decision-drift'))
  assert.deepEqual(rules(found, 'blocking'), [])
  const carried = run([ARCH, `${ADR_DIR}/ADR-001-x.md`], TRUNK_BRANCH)
  assert.ok(!rules(carried, 'advisory').includes('decision-drift'))
})

/* ------------------------------------------------------------------ *
 * helpers
 * ------------------------------------------------------------------ */

test('base commits are real-looking Git pins, not YAML null strings', () => {
  assert.ok(isCommitPin('70f7e27'))
  assert.ok(isCommitPin('70f7e27aabbccddeeff001122334455667788990'))
  assert.ok(!isCommitPin('null'))
  assert.ok(!isCommitPin('HEAD'))
  assert.ok(!isCommitPin(undefined))
})

test('branch names', () => {
  assert.ok(isPathBranch('path/cp-ex-010'))
  assert.ok(isPathBranch('path/cp-settings'))
  assert.ok(!isPathBranch('main'))
  assert.ok(!isPathBranch('lane/retrieval'))
  assert.ok(!isPathBranch('feature/x'))
  assert.ok(!isPathBranch('path/'))
  assert.ok(!isPathBranch(undefined))
})

test('globs: ** crosses separators, * does not', () => {
  assert.ok(globToRegExp('apps/**').test('apps/desktop/a/b.ts'))
  assert.ok(globToRegExp('apps/**/*.ts').test('apps/desktop/a/b.ts'))
  assert.ok(globToRegExp('tests/*.ts').test('tests/a.ts'))
  assert.ok(!globToRegExp('tests/*.ts').test('tests/deep/a.ts'))
  assert.ok(matchesAny('docs/x.md', ['apps/**', 'docs/*.md']))
})

test('code fences and inline spans are stripped before links are judged', () => {
  const text = ['A real [link](./real.md).', '', '```text', 'a picture: [extracted](./extracted.md)', '```', '', 'inline `[nope](./nope.md)` stays out.'].join('\n')
  const stripped = stripCode(text)
  assert.ok(stripped.includes('./real.md'))
  assert.ok(!stripped.includes('./extracted.md'))
  assert.ok(!stripped.includes('./nope.md'))
})

test('frontmatter: yaml nesting, json blocks, and garbage', () => {
  const yaml = readFrontmatter(`---\ntype: X\n${METADATA_NAMESPACE}:\n  id: CP-1\n  status: running\n---\n# t\n`)
  assert.equal(yaml.data[METADATA_NAMESPACE].id, 'CP-1')
  assert.equal(yaml.data[METADATA_NAMESPACE].status, 'running')
  const json = readFrontmatter('---\n{ "id": "35-x", "title": "T" }\n---\n')
  assert.equal(json.data.id, '35-x')
  assert.equal(readFrontmatter('no frontmatter here'), null)
  assert.equal(readFrontmatter('---\n{ broken json\n---\n').error, 'unparseable JSON frontmatter')
})

test('an inline comment is stripped from a scalar, the way it already was from a list item', () => {
  const commented = readFrontmatter(['---', 'path: CP-EX-010', 'decision: accepted   # accepted | refused', '---', ''].join('\n')).data
  assert.equal(commented.decision, 'accepted')
  const wholeLine = readFrontmatter(['---', 'cairn:', '  writes:   # ADVISORY, never a lock', '    - src/**', '---', ''].join('\n')).data
  assert.deepEqual(wholeLine.cairn.writes, ['src/**'])
  const quoted = readFrontmatter(['---', "title: 'a heading # with a hash'", '---', ''].join('\n')).data
  assert.equal(quoted.title, "'a heading # with a hash'")
})

const V02_RECORD = `---
ceremony: closing
accepted_roles: [reviewer, auditor]
advisory_disposition:
  - rule: scope-drift
    disposition: accepted
    reason: the wider root cause is declared in writes: at this same commit
  - rule: record-date
    disposition: deferred
    owner: participant-id
cairn:
  id: CP-EXAMPLE-001
  status: running
  writes:
    - src/**   # a trailing comment
    - docs/modules/example.md
  governs:
    - docs/architecture/example.md@89ab
---
body`

test('the frontmatter reader parses flow lists, block lists, and lists of maps', () => {
  const { data } = readFrontmatter(V02_RECORD)
  assert.deepEqual(data.accepted_roles, ['reviewer', 'auditor'])
  assert.deepEqual(data.cairn.writes, ['src/**', 'docs/modules/example.md'])
  assert.deepEqual(data.cairn.governs, ['docs/architecture/example.md@89ab'])
  assert.equal(data.advisory_disposition.length, 2)
  assert.deepEqual(data.advisory_disposition[0], { rule: 'scope-drift', disposition: 'accepted', reason: 'the wider root cause is declared in writes: at this same commit' })
  assert.equal(data.advisory_disposition[1].owner, 'participant-id')
})

test('lists do not leak into the scalars that follow them', () => {
  const { data } = readFrontmatter(V02_RECORD)
  assert.equal(data.cairn.id, 'CP-EXAMPLE-001')
  assert.equal(data.cairn.status, 'running')
  assert.equal(data.ceremony, 'closing')
})

test('the extended reader leaves parseWrites and quoted scalars alone', () => {
  assert.deepEqual(parseWrites(V02_RECORD), ['src/**', 'docs/modules/example.md'])
  const quoted = readFrontmatter("---\ntitle: 'ADR-018: a title with a colon'\n---\nx")
  assert.equal(quoted.data.title, "'ADR-018: a title with a colon'")
})

test('the frontmatter terminator is not a write surface', () => {
  const doc = ['---', 'cairn:', '  id: CP-X', '  writes:', '    - apps/desktop/a.ts', '    - apps/desktop/b.ts', '---', '', '# Title', '', '- a body bullet', ''].join('\n')
  assert.deepEqual(parseWrites(doc), ['apps/desktop/a.ts', 'apps/desktop/b.ts'])
})

test('a writes: list survives the trailing comment the template shows', () => {
  const doc = ['---', 'cairn:', '  id: CP-X', '  writes:                    # ADVISORY — a signal, never a lock', '    - apps/desktop/a.ts', '---', '', '# Title', ''].join('\n')
  assert.deepEqual(parseWrites(doc), ['apps/desktop/a.ts'])
})

test('a trailing comment on a writes: ITEM is not part of the surface', () => {
  const doc = ['---', 'cairn:', '  writes:', '    - docs/adr/**              # every ADR', '    - apps/desktop/a.ts', '---', ''].join('\n')
  assert.deepEqual(parseWrites(doc), ['docs/adr/**', 'apps/desktop/a.ts'])
})

test('no writes: block, or no frontmatter, declares nothing', () => {
  assert.deepEqual(parseWrites('---\ncairn:\n  id: CP-X\n---\n\n- bullet\n'), [])
  assert.deepEqual(parseWrites('# just a document\n\n- bullet\n'), [])
  assert.deepEqual(parseWrites(''), [])
})

test('porcelain paths survive an unstaged first record', () => {
  const raw = z(` M ${A_PATH.file}`, `?? ${ADR_DIR}/ADR-013.md`, `A  ${SRC}`)
  assert.deepEqual(porcelainPaths(raw), [A_PATH.file, `${ADR_DIR}/ADR-013.md`, SRC])
})

test('porcelain paths: renames report the new path, noise is dropped', () => {
  assert.deepEqual(porcelainPaths(z('R  docs/new.md', 'docs/old.md')), ['docs/new.md'])
  assert.deepEqual(porcelainPaths(z('C  docs/copy.md', 'docs/src.md', ' M docs/after.md')), ['docs/copy.md', 'docs/after.md'])
  assert.deepEqual(porcelainPaths(''), [])
  assert.deepEqual(porcelainPaths(z('', '')), [])
})

test('append-only mutation parsing permits additions and reports existing changes', () => {
  assert.deepEqual(porcelainMutations(z(
    `?? ${JOURNAL_DIR}/new.md`, `A  ${SESSIONS}/new.md`, ` M ${JOURNAL_DIR}/existing.md`,
    `D  ${JOURNAL_DIR}/existing.md`, `R  ${JOURNAL_DIR}/renamed.md`, `${JOURNAL_DIR}/old.md`
  )), [`${JOURNAL_DIR}/existing.md`, `${JOURNAL_DIR}/existing.md`, `${JOURNAL_DIR}/renamed.md`, `${JOURNAL_DIR}/old.md`])
})

test('committed mutation parsing keeps both sides of renames and treats copies as additions', () => {
  assert.deepEqual(nameStatusMutations([
    'M', `${JOURNAL_DIR}/existing.md`, 'A', `${JOURNAL_DIR}/new.md`,
    'R100', `${JOURNAL_DIR}/old.md`, 'elsewhere/renamed.md',
    'C100', `${JOURNAL_DIR}/source.md`, `${JOURNAL_DIR}/copy.md`, ''
  ].join('\0')), [`${JOURNAL_DIR}/existing.md`, `${JOURNAL_DIR}/old.md`, 'elsewhere/renamed.md'])
})

test('a path with a space is read whole, not quoted', () => {
  const spaced = `${PROJECT_DIR}/briefs/feedback on  MVP-001.md`
  assert.deepEqual(porcelainPaths(z(`D  ${spaced}`)), [spaced])
  assert.deepEqual(porcelainPaths(z(`A  ${SOURCE}two words.mjs`)), [`${SOURCE}two words.mjs`])
  assert.ok(porcelainPaths(z(`A  ${SOURCE}two words.mjs`))[0].startsWith(SOURCE))
})

/* ------------------------------------------------------------------ *
 * branch and base resolution
 * ------------------------------------------------------------------ */

test('branch resolution prefers the host over the checkout', () => {
  assert.deepEqual(resolveBranch({ env: { GITHUB_HEAD_REF: 'path/cp-x' }, symbolicRef: null, abbrevRef: 'HEAD' }), { branch: 'path/cp-x', source: 'github-head-ref' })
  assert.equal(resolveBranch({ flag: 'path/x', env: { GITHUB_HEAD_REF: 'path/y' } }).branch, 'path/x')
  assert.deepEqual(resolveBranch({ env: { GITHUB_REF_NAME: 'main' }, symbolicRef: null, abbrevRef: 'HEAD' }), { branch: 'main', source: 'github-ref-name' })
  assert.equal(resolveBranch({ env: { GITHUB_REF_NAME: '42/merge' }, symbolicRef: null, abbrevRef: 'HEAD' }).source, 'detached')
  assert.deepEqual(resolveBranch({ env: {}, symbolicRef: 'main', abbrevRef: 'main' }), { branch: 'main', source: 'symbolic-ref' })
})

test('branch resolution trusts the host only about the repository the host checked out', () => {
  const elsewhere = { GITHUB_REF_NAME: 'path/cp-ops-002', GITHUB_WORKSPACE: '/home/runner/work/x/x' }
  assert.deepEqual(resolveBranch({ env: elsewhere, symbolicRef: 'main', abbrevRef: 'main', root: '/tmp/cairn-fixture-abc' }), { branch: 'main', source: 'symbolic-ref' })
  assert.deepEqual(resolveBranch({ env: { GITHUB_HEAD_REF: 'path/x', GITHUB_WORKSPACE: '/w' }, symbolicRef: null, abbrevRef: 'HEAD', root: '/w' }), { branch: 'path/x', source: 'github-head-ref' })
  assert.equal(resolveBranch({ env: { GITHUB_REF_NAME: 'main' }, symbolicRef: null, abbrevRef: 'HEAD', root: '/anywhere' }).source, 'github-ref-name')
})

test('a path branch defaults to the trunk base, and prefers the ref CI uses', () => {
  assert.deepEqual(resolveBase({ branch: 'path/cp-ex-010', refExists: () => true }), { base: `${REMOTE}/${TRUNK_BRANCH}`, source: 'default-trunk' })
  assert.equal(TRUNK_BASE_CANDIDATES[0], `${REMOTE}/${TRUNK_BRANCH}`)
  assert.deepEqual(resolveBase({ branch: 'path/cp-ex-010', refExists: (ref) => ref === TRUNK_BRANCH }), { base: TRUNK_BRANCH, source: 'default-trunk' })
})

test('there is one invocation form: no opt-out narrows the comparison', () => {
  // `--working-tree` and its `base-parity` advisory were retired with 1.0.
  // An unrecognised narrowing option changes nothing; the fallback for a
  // checkout with no trunk is named, and the trunk-containment rule reports
  // the missing trunk as inconclusive.
  assert.deepEqual(resolveBase({ workingTree: true, branch: 'path/cp-ex-010', refExists: () => true }), { base: `${REMOTE}/${TRUNK_BRANCH}`, source: 'default-trunk' })
  assert.deepEqual(resolveBase({ branch: 'path/cp-ex-010', refExists: () => false }), { base: null, source: 'unresolvable' })
  assert.deepEqual(resolveBase({ flag: 'origin/main', branch: 'path/cp-ex-010', refExists: () => true }), { base: 'origin/main', source: 'flag' })
  assert.deepEqual(resolveBase({ branch: TRUNK_BRANCH, refExists: () => true }), { base: null, source: 'trunk-work' })
})
