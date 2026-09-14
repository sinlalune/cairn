/**
 * Tests for the post-mortem reader — `npm test`.
 *
 * Every reading is a pure function of what Git or the forge answered, so the
 * incident's table can be proved without a repository and without a network.
 * The load-bearing case is the last one: a post-mortem that begins to judge
 * stops being a reading, and ADR-021 decision 3 puts the question elsewhere.
 */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { applyPlan, defaultOptions, planInstall } from './cairn.mjs'
import { REPO } from './cairn-config.mjs'
import {
  NO_JUDGEMENT,
  duration,
  readRedRuns,
  readRequests,
  registrationReading,
  renderReadings,
  requestsReading,
  redRunsReading,
  scopeReading,
  stepsReading,
  closureReading
} from './cairn-postmortem.mjs'

const A = 'a'.repeat(40)
const B = 'b'.repeat(40)
const C = 'c'.repeat(40)
const SLUG = { owner: 'sinlalune', repo: 'cairn' }

test('the registration reading compares the declaring commit\'s parent with base_commit', () => {
  assert.match(
    registrationReading({ registration: A, parent: B, declaredBase: B }),
    new RegExp(`${A}.*${B}.*same object`)
  )
  const drifted = registrationReading({ registration: A, parent: B, declaredBase: C })
  assert.ok(drifted.includes(B) && drifted.includes(C), 'both objects are named, so the reader can see which is which')
  assert.match(drifted, /another object/)
  assert.match(registrationReading({ registration: null }), /no trunk commit/)
  assert.match(registrationReading({ registration: A, parent: null, declaredBase: B }), /no parent/)
})

test('the closure reading names the administrative commits and what they moved', () => {
  assert.match(closureReading({ moves: [] }), /declares ready or done — the administrative commit is not written yet/)
  assert.match(closureReading({ reachable: false }), /no ref of this branch is in this checkout/)
  const move = (commit, previous, current) => ({ commit, previous, current })
  const clean = closureReading({
    moves: [move(A, { status: 'running', subject_commit: null, route: 'full' }, { status: 'ready', subject_commit: C, route: 'full' })]
  })
  assert.ok(clean.includes(A))
  assert.match(clean, /one commit of this branch declares ready/)
  assert.match(clean, /only the fields a closure may move/)

  const unreadable = closureReading({ moves: [move(A, null, { status: 'ready' })] })
  assert.match(unreadable, /moved unread/, 'a comparison that could not be made never renders as the affirmative')
  assert.ok(!unreadable.includes('moving only'))

  const twice = closureReading({
    moves: [
      move(A, { status: 'running', route: 'full' }, { status: 'ready', route: 'full' }),
      move(B, { status: 'running', route: 'full' }, { status: 'ready', route: 'lightweight' })
    ]
  })
  assert.match(twice, /2 commits of this branch declare ready/, 'a path that declared a closure twice has two, and the reader needs both')
  assert.match(twice, /`route`/, 'the field acceptance was measured against is named, wherever of the two it moved')

  // One unreadable side used to return early and silence every other commit.
  const mixed = closureReading({
    moves: [
      move(A, null, { status: 'ready' }),
      move(B, { status: 'running', route: 'full' }, { status: 'ready', route: 'lightweight' })
    ]
  })
  assert.match(mixed, /`route`/, 'a commit whose sides were read is still read')
  assert.ok(mixed.includes(`${A} moved unread`))

  assert.match(
    closureReading({ moves: [move(A, { status: 'running' }, { status: 'done' })] }),
    /declares done/,
    'a branch that declared the trunk\'s status is the incident, not a branch with nothing written yet'
  )
})

test('the scope reading recomputes the digest against the acceptance in force', () => {
  assert.match(scopeReading({ recomputed: 'sha256:abc', accepted: 'sha256:abc' }), /same digest/)
  const moved = scopeReading({ recomputed: 'sha256:abc', accepted: 'sha256:def' })
  assert.ok(moved.includes('sha256:abc') && moved.includes('sha256:def'))
  assert.match(scopeReading({ recomputed: 'sha256:abc', accepted: null }), /carries no digest/)
  assert.match(scopeReading({ recomputed: null, accepted: 'sha256:abc' }), /no .*definition of done/)
})

test('the steps reading counts what preserves its adding blob and names what does not', () => {
  const step = (name, { before = 'x', after = 'xy' } = {}) => ({ file: `steps/${name}`, before, after })
  assert.match(stepsReading([]), /no step record/)
  assert.match(stepsReading([step('S01.md'), step('S02.md')]), /2 of 2/)
  const rewritten = stepsReading([step('S01.md'), step('S02.md', { before: 'x', after: 'z' })])
  assert.match(rewritten, /1 of 2/)
  assert.ok(rewritten.includes('steps/S02.md'), 'the record that no longer carries its adding blob is named')
  const unreadable = stepsReading([step('S03.md', { before: null })])
  assert.ok(unreadable.includes('steps/S03.md'))
  assert.match(unreadable, /adding blob this checkout cannot read/)
})

test('the forge readings say what they read, or why they were not read', () => {
  assert.match(redRunsReading({ read: false, why: 'no token' }), /^not read — no token$/)
  assert.match(redRunsReading({ read: true, red: 0 }), /no red run/)
  assert.match(redRunsReading({ read: true, red: 1 }), /1 red run\b/)
  assert.match(redRunsReading({ read: true, red: 4 }), /4 red runs/)
  assert.match(requestsReading({ read: false, why: 'no token' }), /^not read — no token$/)
  assert.match(requestsReading({ read: true, requests: [] }), /no request/)
  const merged = requestsReading({
    read: true,
    requests: [{ number: 16, created_at: '2026-09-13T08:00:00Z', merged_at: '2026-09-13T12:30:00Z' }]
  })
  assert.ok(merged.includes('#16'))
  assert.match(merged, /4h 30m/)
  const open = requestsReading({
    read: true,
    requests: [{ number: 17, created_at: '2026-09-13T08:00:00Z', merged_at: null }]
  })
  assert.match(open, /#17 open/)
})

test('a duration is read in the units the incident is argued in', () => {
  assert.equal(duration('2026-09-13T08:00:00Z', '2026-09-13T08:00:29Z'), 'under a minute')
  assert.equal(duration('2026-09-13T08:00:00Z', '2026-09-13T08:37:00Z'), '37m')
  assert.equal(duration('2026-09-13T08:00:00Z', '2026-09-13T12:30:00Z'), '4h 30m')
  assert.equal(duration('2026-09-11T08:00:00Z', '2026-09-13T11:00:00Z'), '2d 3h')
  assert.equal(duration('nonsense', '2026-09-13T08:00:00Z'), null)
})

test('red runs and requests are read from the forge, and an error is an answer', async () => {
  const calls = []
  const answer = (value) => async (url) => { calls.push(url); return { value } }
  const runs = await readRedRuns({ token: 't', slug: SLUG, branch: 'path/cp-ex-010', request: answer({ total_count: 3 }) })
  assert.deepEqual(runs, { read: true, red: 3 })
  assert.match(calls[0], /actions\/runs\?branch=path%2Fcp-ex-010&status=failure/)

  const requests = await readRequests({
    token: 't',
    slug: SLUG,
    branch: 'path/cp-ex-010',
    request: answer([{ number: 16, created_at: '2026-09-13T08:00:00Z', merged_at: '2026-09-13T12:30:00Z', state: 'closed', extra: 'ignored' }])
  })
  assert.deepEqual(requests, {
    read: true,
    more: false,
    requests: [{ number: 16, created_at: '2026-09-13T08:00:00Z', merged_at: '2026-09-13T12:30:00Z' }]
  })
  assert.match(calls[1], /pulls\?state=all&head=sinlalune%3Apath%2Fcp-ex-010&per_page=100$/)

  const failed = async () => ({ error: 'HTTP 403' })
  assert.deepEqual(await readRedRuns({ token: 't', slug: SLUG, branch: 'b', request: failed }), { read: false, why: 'the forge answered HTTP 403' })
  assert.deepEqual(await readRequests({ token: 't', slug: SLUG, branch: 'b', request: failed }), { read: false, why: 'the forge answered HTTP 403' })
})

test('without a token, or off GitHub, the forge readings name the reason and no request is made', async () => {
  const never = async () => { throw new Error('the forge must not be called') }
  const noToken = await readRedRuns({ token: '', slug: SLUG, branch: 'b', request: never })
  assert.equal(noToken.read, false)
  assert.match(noToken.why, /GITHUB_TOKEN/)
  const elsewhere = await readRequests({ token: 't', slug: null, branch: 'b', request: never })
  assert.equal(elsewhere.read, false)
  assert.match(elsewhere.why, /not a GitHub repository/)
})

test('the table names every reading and closes on the line that puts no question', () => {
  const out = renderReadings({
    pathId: 'CP-EX-010',
    branch: 'path/cp-ex-010',
    readings: [
      ['registration', registrationReading({ registration: A, parent: B, declaredBase: C })],
      ['administrative commit', closureReading({ moves: [] })],
      ['definition of done', scopeReading({ recomputed: 'sha256:abc', accepted: 'sha256:def' })],
      ['step records', stepsReading([{ file: 'steps/S01.md', before: 'x', after: 'z' }])],
      ['red runs', redRunsReading({ read: true, red: 2 })],
      ['requests', requestsReading({ read: false, why: 'no token' })]
    ]
  })
  assert.ok(out.includes('CP-EX-010') && out.includes('path/cp-ex-010'))
  for (const label of ['registration', 'administrative commit', 'definition of done', 'step records', 'red runs', 'requests']) {
    assert.match(out, new RegExp(`^\\s+${label} `, 'm'), `${label} is a row of the table`)
  }
  assert.ok(out.includes(NO_JUDGEMENT))
})

/**
 * ADR-021 decision 3, as a predicate over EVERY branch of every reading rather
 * than over one hand-picked table: `renderReadings` is a join and could never
 * introduce a question mark, so asserting the property there proved nothing
 * about the functions that write the words.
 */
test('no reading, on any branch it has, puts a question or a judgement', async () => {
  const step = (before, after) => [{ file: 'steps/S01.md', before, after }]
  const move = (previous, current) => ({ commit: A, previous, current })
  const sentences = [
    registrationReading({ registration: null }),
    registrationReading({ registration: A, parent: null, declaredBase: null }),
    registrationReading({ registration: A, parent: B, declaredBase: B }),
    registrationReading({ registration: A, parent: B, declaredBase: C }),
    closureReading({ reachable: false }),
    closureReading({ moves: [] }),
    closureReading({ moves: [move(null, { status: 'ready' })] }),
    closureReading({ moves: [move({ status: 'running' }, { status: 'ready' })] }),
    closureReading({ moves: [move({ status: 'running' }, { status: 'done' })] }),
    closureReading({ moves: [move({ status: 'running', route: 'full' }, { status: 'ready', route: 'lightweight' }), move(null, { status: 'ready' })] }),
    scopeReading({ recomputed: null, accepted: null }),
    scopeReading({ recomputed: 'sha256:abc', accepted: null }),
    scopeReading({ recomputed: 'sha256:abc', accepted: 'sha256:abc' }),
    scopeReading({ recomputed: 'sha256:abc', accepted: 'sha256:def' }),
    stepsReading([]),
    stepsReading(step('x', 'xy')),
    stepsReading(step('x', 'z')),
    stepsReading(step(null, 'z')),
    redRunsReading({ read: true, red: 0 }),
    redRunsReading({ read: true, red: 3 }),
    requestsReading({ read: true, requests: [] }),
    requestsReading({ read: true, requests: [{ number: 1, created_at: '2026-09-13T08:00:00Z', merged_at: null }] }),
    requestsReading({ read: true, requests: [{ number: 1, created_at: '2026-09-13T08:00:00Z', merged_at: '2026-09-13T09:00:00Z' }] }),
    requestsReading({ read: true, more: true, requests: [{ number: 1, created_at: '2026-09-13T08:00:00Z', merged_at: null }] }),
    NO_JUDGEMENT
  ]
  // Every way either forge read can answer without a network, so the reasons
  // are covered by the same predicate as the facts.
  const never = async () => { throw new Error('the forge must not be called') }
  const refused = async () => ({ error: 'HTTP 500' })
  for (const args of [
    { token: 't', slug: SLUG, branch: null, request: never },
    { token: '', slug: SLUG, branch: 'b', request: never },
    { token: 't', slug: null, branch: 'b', request: never },
    { token: 't', slug: SLUG, branch: 'b', request: refused }
  ]) {
    sentences.push(redRunsReading(await readRedRuns(args)), requestsReading(await readRequests(args)))
  }

  for (const sentence of sentences) {
    assert.ok(!sentence.includes('?'), `puts a question: ${sentence}`)
    for (const judgement of [/\bshould\b/, /\bmust\b/, /\brecommend/, /\bwrong\b/, /\bviolat/, /\bfail(ed|ure|s)?\b/]) {
      assert.ok(!judgement.test(sentence), `judges, matching ${judgement}: ${sentence}`)
    }
  }
})

/**
 * The wiring, which no predicate can prove.
 *
 * Every bug this file's own review found lived in the half that talks to Git,
 * and a first attempt at this test read THIS repository and asserted what it
 * happened to say — which stayed green with both bugs put back. So the
 * repository is BUILT: a real installed one, with a real path record, real
 * step records, a real administrative commit and one record staged and not
 * committed, and each assertion below names a fact that changes when the
 * reading breaks.
 */

const FIXTURE_RECORD = 'project/coding-paths/CP-FIX-001/index.md'

const fixtureStep = (step) => `---
type: Cairn Coding Path Step
title: 'CP-FIX-001 ${step} — a unit'
timestamp: 2026-09-13T00:00:00Z
cairn:
  path: CP-FIX-001
  step: ${step}
---

# CP-FIX-001 ${step}

\`\`\`cairn-unit
step: ${step}
unit: 0${step.slice(1)}
type: implementation
verified: cairn-check
\`\`\`

- one line of work
`

const fixtureRecord = ({ status = 'running', base, digest = null, subject = null }) => `---
type: Cairn Coding Path
title: A fixture path
description: A path record the post-mortem reads.
tags: [coding-path]
timestamp: 2026-09-13T00:00:00Z
cairn:
  id: CP-FIX-001
  route: lightweight
  status: ${status}
  current_step: S02
  base_commit: ${base}
  branch: path/cp-fix-001
  subject_commit: ${subject ?? 'null'}
---

# CP-FIX-001 — a fixture path

## Goal

Be read.

## Definition of done

- [ ] The reading is right.
${digest ? `
## Opening acceptance

\`\`\`yaml
decision: accepted
accepted_by: fixture
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-13T09:00:00Z
scope_ref: ${FIXTURE_RECORD}#definition-of-done
scope_digest: ${digest}
\`\`\`
` : ''}`

/** A real installed repository, on a real path branch, carrying the shapes the
 *  readings are about. The post-mortem is copied in because the kit does not
 *  install it yet — the manifest is another path's. */
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'cairn-postmortem-'))
  applyPlan(planInstall(defaultOptions()), dir)
  copyFileSync(join(REPO, 'tools/cairn-postmortem.mjs'), join(dir, 'tools/cairn-postmortem.mjs'))
  const git = (...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: 'pipe' }).trim()
  const write = (file, text) => {
    mkdirSync(dirname(join(dir, file)), { recursive: true })
    writeFileSync(join(dir, file), text)
  }
  const commit = (message) => {
    git('add', '-A')
    git('commit', '-qm', message)
    return git('rev-parse', 'HEAD')
  }
  git('init', '-q', '-b', 'main')
  git('config', 'user.email', 't@example.invalid')
  git('config', 'user.name', 'fixture')
  return { dir, git, write, commit }
}

test('the tool reads a real repository: the registration, the closure, the digest and the steps', () => {
  const { dir, git, write, commit } = fixture()
  try {
    const base = commit('install cairn')

    // The registration commit is the one where the record declares `running`,
    // and `base_commit` names its parent.
    write(FIXTURE_RECORD, fixtureRecord({ base }))
    const digest = execFileSync(process.execPath,
      ['tools/cairn-check.mjs', '--scope-digest', `${FIXTURE_RECORD}#definition-of-done`],
      { cwd: dir, encoding: 'utf8', stdio: 'pipe' }).trim()
    write(FIXTURE_RECORD, fixtureRecord({ base, digest }))
    const registration = commit('register CP-FIX-001')

    git('checkout', '-q', '-b', 'path/cp-fix-001')
    write('project/coding-paths/CP-FIX-001/steps/S01.md', fixtureStep('S01'))
    commit('CP-FIX-001 S01')
    // S02 is written from the same template as S01 and added while S01 still
    // sits there: the shape that makes `--follow` pair the two and report a
    // sibling's blob as this record's.
    write('project/coding-paths/CP-FIX-001/steps/S02.md', fixtureStep('S02'))
    const second = commit('CP-FIX-001 S02')
    // A record STAGED and not committed has no adding blob yet. Reading the
    // index instead of history called it a record whose blob could not be read.
    write('project/coding-paths/CP-FIX-001/steps/S03.md', fixtureStep('S03'))
    git('add', '-A')

    const run = (...args) => execFileSync(process.execPath, ['tools/cairn-postmortem.mjs', ...args], {
      cwd: dir, encoding: 'utf8', stdio: 'pipe', env: { ...process.env, GITHUB_TOKEN: '', GH_TOKEN: '' }
    })
    const out = run('--path', 'CP-FIX-001')

    assert.match(out, new RegExp(`^cairn-postmortem — CP-FIX-001 on path/cp-fix-001$`, 'm'))
    assert.ok(out.includes(`${registration} declared this record running`), out)
    assert.ok(out.includes(`its parent ${base} and base_commit ${base} are the same object`), out)
    assert.ok(out.includes(`${digest}, the same digest the acceptance in force names`), out)
    assert.match(out, /^\s+step records\s+2 of 2 preserve the blob that added them$/m, out)
    assert.ok(!out.includes('S03'), 'a record Git has no commit for has no adding blob to preserve')
    assert.match(out, /^\s+administrative commit\s+no commit of this branch declares ready or done/m, out)
    assert.match(out, /^\s+red runs\s+not read — no token/m)
    assert.ok(out.includes(NO_JUDGEMENT))

    // A step record whose earlier bytes moved is the fact the reading exists
    // for, and it is named.
    write('project/coding-paths/CP-FIX-001/steps/S01.md', `${fixtureStep('S01')}\nrewritten from the top`.replace('one line of work', 'another line'))
    const rewritten = run('--path', 'CP-FIX-001')
    assert.match(rewritten, /^\s+step records\s+1 of 2 preserve the blob that added them; \S*S01\.md no longer carries it as a prefix$/m, rewritten)

    // The administrative commit, and what it moved.
    git('checkout', '-q', '--', '.')
    write(FIXTURE_RECORD, fixtureRecord({ base, digest, status: 'ready', subject: second }))
    const ready = commit('CP-FIX-001: ready')
    const closed = run('--path', 'CP-FIX-001')
    assert.ok(closed.includes(`one commit of this branch declares ready: ${ready}`), closed)
    assert.match(closed, /moving only the fields a closure may move/)

    assert.match(run('--path', 'CP-NOT-A-PATH'), /no path record declares CP-NOT-A-PATH/)
    assert.throws(() => run('--path'), /needs a value/, 'a flag with nothing after it is refused, never read as absent')
    assert.throws(() => run('--pathh', 'CP-FIX-001'), /is not an option/, 'a misspelled option is refused, never read as absent')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('a table of several paths keeps one block each, in id order', () => {
  const block = (pathId) => renderReadings({ pathId, branch: `path/${pathId.toLowerCase()}`, readings: [['registration', registrationReading({ registration: null })]] })
  const out = [block('CP-EX-010'), block('CP-EX-011')].join('\n')
  assert.ok(out.indexOf('CP-EX-010') < out.indexOf('CP-EX-011'))
  assert.equal(out.match(/registration/g).length, 2)
})
