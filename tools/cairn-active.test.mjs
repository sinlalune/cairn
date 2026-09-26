/**
 * Tests for the derived running-paths view — `npm test`.
 *
 * The point of deriving this block is that the contradiction it used to be
 * exposed to becomes impossible — once every accepted declaration has been
 * registered on the trunk. These cases pin the projection itself; the
 * separate registration rule pins the completeness of its inputs.
 */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { applyPlan, defaultOptions, planInstall } from './cairn.mjs'
import { METADATA_NAMESPACE, PATHS_BEGIN, PATHS_END } from './cairn-check.mjs'
import { INSTALLER_ROW, collectPaths, fillRegister, registerAdvisory, renderPaths, spliceBlock } from './cairn-active.mjs'

const pathFile = (id, { status = 'running', branch, base = 'abc1234', depends = null, resolution = null } = {}) => ({
  name: `${id}.md`,
  text: [
    '---',
    `title: ${id} — a path doing something`,
    `${METADATA_NAMESPACE}:`,
    `  id: ${id}`,
    `  status: ${status}`,
    `  base_commit: ${base}`,
    ...(branch ? [`  branch: ${branch}`] : []),
    ...(depends ? [`  depends_on: [${depends.join(', ')}]`] : []),
    ...(resolution ? [`  resolution: ${resolution}`] : []),
    '---',
    '',
    '# Goal'
  ].join('\n')
})

test('running, blocked and ready paths remain visible while done paths leave the live view', () => {
  const { live, registered } = collectPaths([
    pathFile('CP-EX-010', { branch: 'path/cp-ex-010' }),
    pathFile('CP-EX-011', { status: 'blocked', branch: 'path/cp-ex-011' }),
    pathFile('CP-EX-012', { status: 'ready', branch: 'path/cp-ex-012' }),
    pathFile('CP-EX-009', { status: 'done', branch: 'path/cp-ex-009' }),
    pathFile('CP-OPS-001', { status: 'active' }),
    pathFile('CP-EX-013', { status: 'running' })
  ])
  assert.equal(registered, 6, 'every record is registered, live or not — which is the count the register reading asks for')
  assert.deepEqual(live.map((p) => p.id), ['CP-EX-010', 'CP-EX-011', 'CP-EX-012'])
  assert.deepEqual(live.map((p) => p.status), ['running', 'blocked', 'ready'])
  assert.equal(live[0].branch, 'path/cp-ex-010')
  assert.equal(live[0].base, 'abc1234')
})

test('the view says which live paths are unblocked, and what the others wait on', () => {
  const files = [
    pathFile('CP-EX-009', { status: 'done', branch: 'path/cp-ex-009', resolution: 'completed' }),
    pathFile('CP-EX-010', { branch: 'path/cp-ex-010' }),
    pathFile('CP-EX-011', { branch: 'path/cp-ex-011', depends: ['CP-EX-009'] }),
    pathFile('CP-EX-012', { branch: 'path/cp-ex-012', depends: ['CP-EX-010', 'CP-EX-011'] }),
    pathFile('CP-EX-013', { status: 'archived', branch: 'path/cp-ex-013', resolution: 'abandoned' }),
    pathFile('CP-EX-014', { branch: 'path/cp-ex-014', depends: ['CP-EX-013'] })
  ]
  const live = collectPaths(files).live
  assert.deepEqual(live.map((p) => [p.id, p.waitsOn]), [
    ['CP-EX-010', []],
    ['CP-EX-011', []],
    ['CP-EX-012', ['CP-EX-010', 'CP-EX-011']],
    ['CP-EX-014', ['CP-EX-013']]
  ])
  const rendered = renderPaths(live)
  assert.match(rendered, /\*\*CP-EX-010\*\*.*· unblocked$/m)
  assert.match(rendered, /\*\*CP-EX-011\*\*.*· unblocked$/m, 'a dependency that reached the trunk is met')
  assert.match(rendered, /\*\*CP-EX-012\*\*.*· waits on CP-EX-010, CP-EX-011$/m)
  assert.match(rendered, /\*\*CP-EX-014\*\*.*· waits on CP-EX-013$/m, 'an abandoned dependency never arrives')
})

test('output is deterministic whatever order the files are read in', () => {
  const a = pathFile('CP-EX-010', { branch: 'path/cp-ex-010' })
  const b = pathFile('CP-EX-011', { branch: 'path/cp-ex-011' })
  const forward = renderPaths(collectPaths([a, b]).live)
  const backward = renderPaths(collectPaths([b, a]).live)
  assert.equal(forward, backward)
  assert.ok(forward.indexOf('CP-EX-010') < forward.indexOf('CP-EX-011'))
})

test('no live paths reads as an honest empty state, never a blank block', () => {
  const rendered = renderPaths([])
  assert.ok(rendered.includes('no live path'))
  assert.ok(rendered.trim().length > 0)
})

test('splicing replaces only the marked block and keeps the prose around it', () => {
  const doc = ['# Active', '', '## Running paths', 'DERIVED — do not edit by hand.', PATHS_BEGIN, '- stale content that must vanish', PATHS_END, '', '## Previously', '- something that must survive'].join('\n')
  const out = spliceBlock(doc, '- **CP-EX-010** — x · branch `path/cp-ex-010`')
  assert.ok(!out.includes('stale content'))
  assert.ok(out.includes('CP-EX-010'))
  assert.ok(out.includes('DERIVED — do not edit by hand.'))
  assert.ok(out.includes('- something that must survive'))
  assert.equal(spliceBlock(out, '- **CP-EX-010** — x · branch `path/cp-ex-010`'), out)
})

test('a file without markers fails loudly rather than guessing', () => {
  assert.throws(() => spliceBlock('# no markers here\n', '- x'), /missing/)
})

test('a path branch that has moved no status projects exactly what the trunk did', () => {
  const files = [pathFile('CP-EX-010', { branch: 'path/cp-ex-010' }), pathFile('CP-EX-011', { branch: 'path/cp-ex-011' })]
  const trunk = spliceBlock(`${PATHS_BEGIN}\nanything\n${PATHS_END}`, renderPaths(collectPaths(files).live))
  assert.equal(spliceBlock(trunk, renderPaths(collectPaths(files).live)), trunk)
})

test('closing a path makes the view stale in whatever checkout closed it', () => {
  const running = [pathFile('CP-EX-010', { branch: 'path/cp-ex-010' })]
  const view = spliceBlock(`${PATHS_BEGIN}\n\n${PATHS_END}`, renderPaths(collectPaths(running).live))
  assert.ok(view.includes('CP-EX-010'))
  const closed = [pathFile('CP-EX-010', { status: 'done', branch: 'path/cp-ex-010' })]
  const regenerated = spliceBlock(view, renderPaths(collectPaths(closed).live))
  assert.notEqual(regenerated, view)
  assert.ok(regenerated.includes('no live path'))
})

/** ADR-008 decision 5, as the tool's own comment states it. */
test('the live view reports a register still carrying the installer\'s row', () => {
  const untouched = `| Milestone | Outcome | Paths | State |\n| ${INSTALLER_ROW} | what the product can do when it is reached | *no path yet* | planned |\n`
  const filled = `| Milestone | Outcome | Paths | State |\n| Cairn 1.1 | the records implemented | [CP-EX-010](./CP-EX-010/index.md) | running |\n`

  assert.match(registerAdvisory({ register: untouched, paths: 1 }), /installer's row/)
  assert.ok(registerAdvisory({ register: untouched, paths: 1 }).includes(INSTALLER_ROW))
  assert.equal(registerAdvisory({ register: filled, paths: 1 }), null, 'a register with a milestone of its own is read by nobody again')
  assert.match(registerAdvisory({ register: untouched, paths: 4 }), /4 paths are registered/, 'the plural is a sentence too')
  assert.equal(registerAdvisory({ register: untouched, paths: 0 }), null,
    'before the first path is registered the placeholder is what the kit just wrote, and saying so would be the first thing a newcomer is told')
  assert.equal(registerAdvisory({ register: null, paths: 1 }), null, 'a register this checkout cannot read is not a register with a placeholder in it')
})

/**
 * The wiring, which the predicate above cannot prove: a reading that is right
 * and reaches nobody reports nothing. The register the kit actually writes is
 * the one this fires on, so the repository is the kit's own — and the path it
 * counts is `done`, because the adopter's register was read long after its
 * paths had closed and a count of LIVE paths would have said nothing there.
 */
test('the advisory reaches the command\'s output in a real installed repository', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cairn-active-'))
  try {
    applyPlan(planInstall(defaultOptions()), dir)
    const register = join(dir, 'project/coding-paths/index.md')
    assert.ok(readFileSync(register, 'utf8').includes(INSTALLER_ROW), 'the kit writes the placeholder row this reading is about')

    const run = (...args) => execFileSync(process.execPath, ['tools/cairn-active.mjs', ...args], { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
    assert.ok(!run().includes("installer's row"), 'nothing is said before a path is registered')

    const record = join(dir, 'project/coding-paths/CP-FIX-001/index.md')
    mkdirSync(dirname(record), { recursive: true })
    writeFileSync(record, `---\ntitle: CP-FIX-001 — a path\ncairn:\n  id: CP-FIX-001\n  status: done\n  resolution: completed\n  branch: path/cp-fix-001\n  base_commit: ${'a'.repeat(40)}\n---\n\n# CP-FIX-001\n`)
    const said = run()
    assert.match(said, /the roadmap register still carries the installer's row/)
    assert.ok(said.includes('1 path is registered'), 'a closed path is still a registered one')
    const view = join(dir, 'project/coding-paths/ACTIVE.md')
    assert.match(readFileSync(view, 'utf8'), /\*\(no live path\)\*/, 'and it is not in the live view, which is the file the view is')

    // `--check` on a STALE view: it exits 1, so the advisory has to be read off
    // the failure. Running it on a current view takes an earlier exit and
    // proves nothing about `--check` at all.
    writeFileSync(record, readFileSync(record, 'utf8').replace('status: done', 'status: running'))
    const before = readFileSync(view, 'utf8')
    let checked = null
    try {
      checked = run('--check')
      assert.fail('a stale view must fail --check')
    } catch (error) {
      checked = error.stdout
      assert.equal(error.status, 1)
    }
    assert.match(checked, /the roadmap register still carries the installer's row/, '--check reports the register too')
    assert.equal(readFileSync(view, 'utf8'), before, 'and writes nothing')

    writeFileSync(record, readFileSync(record, 'utf8').replace('status: running', 'status: done'))
    run()

    writeFileSync(register, readFileSync(register, 'utf8').replace(INSTALLER_ROW, 'M1 — a milestone this project actually has'))
    assert.ok(!run().includes("installer's row"), 'a register the owner has written is read by nobody again')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

/**
 * ADR-031 decision 2: the register's state cells are the records', never
 * typed. A milestone counts the paths its row names and the table headed with
 * its short name — `Cairn 1.2` owns `### The coding paths of 1.2` — and is
 * running while any is not done or any row there has no path yet.
 */
test('the register\'s state cells are written from the records, and nothing else is', () => {
  const register = [
    '| Milestone | Outcome | Paths | State |',
    '| :-- | :-- | :-- | :-- |',
    '| Cairn 1.0 — the first | one | [CP-EX-001](./CP-EX-001/index.md) | running, typed by hand |',
    '| Cairn 1.1 — the second | two | [CP-EX-002](./CP-EX-002/index.md), then the paths below | done |',
    '| Cairn 1.2 — the third | three | [CP-EX-004](./CP-EX-004/index.md), then the paths below | done 2020-01-01 |',
    `| ${INSTALLER_ROW} | what it can do | *no path yet* | planned |`,
    '',
    '### The coding paths of 1.1',
    '',
    '| Order | Outcome | Path |',
    '| :-- | :-- | :-- |',
    '| 1 | a surface | [CP-EX-003](./CP-EX-003/index.md), running |',
    '',
    '### The coding paths of 1.2',
    '',
    '| Order | Outcome | Path |',
    '| :-- | :-- | :-- |',
    '| 1 | a surface | [CP-EX-005](./CP-EX-005/index.md) |',
    '| 2 | another | *no path yet* |',
    '',
    '| Milestone | Outcome | Paths | State |',
    '| :-- | :-- | :-- | :-- |',
    '| Cairn 2.0 — two in one cell | four | [CP-EX-001](./CP-EX-001/index.md) and [CP-EX-006](./CP-EX-006/index.md) | done |',
    '| Cairn 2.1 — one archived | five | [CP-EX-001](./CP-EX-001/index.md), [CP-EX-007](./CP-EX-007/index.md) | running |',
    ''
  ].join('\n')
  const states = new Map([
    ['CP-EX-001', { status: 'done', date: '2026-09-03' }],
    ['CP-EX-002', { status: 'done', date: '2026-09-07' }],
    ['CP-EX-003', { status: 'done', date: '2026-09-16' }],
    ['CP-EX-004', { status: 'done', date: '2026-09-22' }],
    ['CP-EX-005', { status: 'done', date: '2026-09-24' }],
    ['CP-EX-006', { status: 'blocked' }],
    ['CP-EX-007', { status: 'archived' }]
  ])
  const filled = fillRegister(register, states)
  const lines = filled.split('\n')
  assert.equal(lines[2], '| Cairn 1.0 — the first | one | [CP-EX-001](./CP-EX-001/index.md) | done 2026-09-03 |', 'a typed state is replaced, dated from the journal')
  assert.equal(lines[3], '| Cairn 1.1 — the second | two | [CP-EX-002](./CP-EX-002/index.md), then the paths below | done 2026-09-16 |', 'a milestone is done on the date its last path was')
  assert.equal(lines[4], '| Cairn 1.2 — the third | three | [CP-EX-004](./CP-EX-004/index.md), then the paths below | running |', 'a row with no path yet keeps the milestone running, every path done')
  assert.equal(lines[5], `| ${INSTALLER_ROW} | what it can do | *no path yet* | planned |`, 'a row that names no path is its author\'s')
  assert.equal(lines[11], '| 1 | a surface | [CP-EX-003](./CP-EX-003/index.md), done 2026-09-16 |')
  assert.equal(lines[17], '| 1 | a surface | [CP-EX-005](./CP-EX-005/index.md), done 2026-09-24 |', 'a path cell gains its state')
  assert.equal(lines[22], '| Cairn 2.0 — two in one cell | four | [CP-EX-001](./CP-EX-001/index.md) and [CP-EX-006](./CP-EX-006/index.md) | running |', 'every path a cell names counts')
  assert.equal(lines[23], '| Cairn 2.1 — one archived | five | [CP-EX-001](./CP-EX-001/index.md), [CP-EX-007](./CP-EX-007/index.md) | done 2026-09-03 |', 'an archived path holds nothing open')
  assert.equal(lines[18], '| 2 | another | *no path yet* |')
  assert.equal(filled.replace(/\| [^|]*\|\n/g, ''), register.replace(/\| [^|]*\|\n/g, ''), 'every other column and the shape are untouched')
  const undated = new Map([...states, ['CP-EX-002', { status: 'done' }]])
  assert.equal(fillRegister(register, undated).split('\n')[3].split('|').at(-2), ' done ', 'a done path with no journal date leaves the milestone undated, never dated earlier')
  assert.equal(fillRegister(filled, states), filled, 'a filled register is current')
  assert.equal(fillRegister(register, new Map()), register, 'a path with no record is not guessed at')
})

/** The wiring: the command writes the cells and `--check` reports a stale one. */
test('cairn-active writes the register\'s cells and --check reports a stale one', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cairn-active-'))
  try {
    applyPlan(planInstall(defaultOptions()), dir)
    const register = join(dir, 'project/coding-paths/index.md')
    writeFileSync(register, readFileSync(register, 'utf8').replace(INSTALLER_ROW + ' | what the product can do when it is reached | *no path yet* | planned',
      'M1 — ours | a thing | [CP-FIX-001](./CP-FIX-001/index.md) | planned'))
    const record = join(dir, 'project/coding-paths/CP-FIX-001/index.md')
    mkdirSync(dirname(record), { recursive: true })
    writeFileSync(record, `---\ntitle: CP-FIX-001 — a path\ncairn:\n  id: CP-FIX-001\n  status: done\n  resolution: completed\n  branch: path/cp-fix-001\n  base_commit: ${'a'.repeat(40)}\n---\n\n# CP-FIX-001\n`)
    mkdirSync(join(dir, 'project/log'), { recursive: true })
    writeFileSync(join(dir, 'project/log/2026-09-03-cp-fix-001.md'), '---\ntitle: CP-FIX-001\ncairn:\n  path: CP-FIX-001\n---\n\n# CP-FIX-001\n')
    const run = (...args) => execFileSync(process.execPath, ['tools/cairn-active.mjs', ...args], { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
    run()
    const before = readFileSync(register, 'utf8')
    assert.ok(before.includes('| [CP-FIX-001](./CP-FIX-001/index.md) | done 2026-09-03 |'), 'the cell is the record\'s, dated from its journal entry')

    // Reported, never refused (ADR-031, the rejected checker rule): the
    // checker's `derived-view` reads this command's exit code, and neither the
    // administrative commit nor the integrating one may carry the register.
    writeFileSync(register, before.replace('done 2026-09-03', 'running'))
    assert.match(run('--check'), /register's state cells are STALE/, 'a stale cell is said, and the exit code stays the view\'s')
    assert.ok(readFileSync(register, 'utf8').includes('| running |'), '--check writes nothing')
    run()
    assert.equal(readFileSync(register, 'utf8'), before)
    assert.match(run('--check'), /already current/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
