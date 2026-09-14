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
import { INSTALLER_ROW, collectPaths, registerAdvisory, renderPaths, spliceBlock } from './cairn-active.mjs'

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
