import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import {
  applyPlan, buildConfig, defaultOptions, outwardLinks, planInstall, PROTOCOL_RELEASE
} from './cairn-init.mjs'
import { configErrors } from './cairn-config.mjs'

const target = () => mkdtempSync(join(tmpdir(), 'cairn-init-'))

test('cairn-init: a new repository is created in the shapes the protocol states now', () => {
  const config = buildConfig(defaultOptions())
  assert.deepEqual(configErrors(config), [], 'the generated binding must be valid before it is written')
  assert.equal(config.pathHistoryPolicy, 'forbidden')
  assert.equal(config.checkpointRetentionRef, null)
  assert.equal(config.defaultRoute, 'lightweight')
  assert.equal(config.version, 2)
  assert.ok(!('sharedFiles' in config) && !('staleAfterDays' in config), 'schema 2 carries no field for a retired rule')
  assert.deepEqual(config.transport, { registration: 'pull-request', integration: 'pull-request' })
  assert.deepEqual(buildConfig({ ...defaultOptions(), transport: 'manual-git' }).transport, { registration: 'manual-git', integration: 'manual-git' })
  assert.throws(() => planInstall({ ...defaultOptions(), transport: 'carrier-pigeon' }), /generated configuration is invalid/)
})

test('cairn-init: an invalid generated binding fails before anything is written', () => {
  assert.throws(() => planInstall({ ...defaultOptions(), profile: 'nonsense' }), /generated configuration is invalid/)
})

test('cairn-init: the installed corpus resolves entirely within itself', () => {
  const plan = planInstall()
  assert.deepEqual(outwardLinks(plan.files), [])
})

test('cairn-init: the installation carries what its own links and rules need, and no folder log in the specification', () => {
  const plan = planInstall()
  // The wiki links the soundness note beside the tools, so it travels with them.
  assert.ok(plan.files.has('tools/soundness.md'))
  // The area the generated configuration names has its note from day one
  // (greenfield pilot, finding 16).
  assert.ok(plan.files.has('docs/modules/application.md'))
  // The specification keeps no folder log; the owner retired them there.
  assert.ok(!plan.files.has('spec/log.md'))
  // No briefs, no sessions, no audits: the resume section and the opening
  // acceptance live in the path record; closing is the request, or one closing
  // record in the path folder on manual-git.
  for (const folder of ['project/briefs/', 'project/sessions/', 'project/audits/']) {
    assert.ok(![...plan.files.keys()].some((path) => path.startsWith(folder)), folder)
  }
  // The five skills travel with the kit, one folder each.
  for (const skill of ['cairn-brainstorm', 'cairn-open', 'cairn-unit', 'cairn-close', 'cairn-code']) {
    assert.ok(plan.files.has(`skills/${skill}/SKILL.md`), skill)
  }
  // The request template travels with the pull-request transport, and only with it.
  assert.ok(plan.files.has('.github/pull_request_template.md'))
  assert.ok(!planInstall({ ...defaultOptions(), transport: 'manual-git' }).files.has('.github/pull_request_template.md'))
  // The tests are not installed: they exercise this repository's fixtures.
  assert.ok(![...plan.files.keys()].some((path) => path.endsWith('.test.mjs')))
})

test('cairn-init: an existing file is refused rather than overwritten', () => {
  const dir = target()
  try {
    writeFileSync(join(dir, 'AGENTS.md'), 'the adopter wrote this')
    assert.throws(() => applyPlan(planInstall(), dir), /refusing to overwrite/)
    assert.equal(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), 'the adopter wrote this')
    assert.equal(existsSync(join(dir, 'cairn.config.json')), false)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn-init: an already-installed repository is refused', () => {
  const dir = target()
  try {
    writeFileSync(join(dir, 'cairn.lock.json'), '{}')
    assert.throws(() => applyPlan(planInstall(), dir), /already carries a cairn\.lock\.json/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn-init: a dry run writes nothing', () => {
  const dir = target()
  try {
    const result = applyPlan(planInstall(), dir, { dryRun: true })
    assert.ok(result.planned.length > 50)
    assert.deepEqual(result.written, [])
    assert.equal(existsSync(join(dir, 'cairn.config.json')), false)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn-init: the lock records the release and a digest per installed file', () => {
  const dir = target()
  try {
    applyPlan(planInstall(), dir)
    const lock = JSON.parse(readFileSync(join(dir, 'cairn.lock.json'), 'utf8'))
    assert.equal(lock.release, PROTOCOL_RELEASE)
    assert.ok(Object.keys(lock.manifest).length > 50)
    for (const value of Object.values(lock.manifest)) assert.match(value, /^[0-9a-f]{64}$/)
    assert.ok(Object.keys(lock.manifest).some((path) => path.endsWith('ACTIVE.md')))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn-init: a freshly installed repository passes its own gate', () => {
  const dir = target()
  try {
    applyPlan(planInstall({ ...defaultOptions(), profile: 'ci' }), dir)
    const git = (...args) => execFileSync('git', args, { cwd: dir, stdio: 'pipe' })
    git('init', '-q', '-b', 'main')
    git('add', '-A')
    git('-c', 'user.email=t@example.invalid', '-c', 'user.name=t', 'commit', '-qm', 'install')
    const output = execFileSync(process.execPath, ['tools/cairn-check.mjs'], { cwd: dir, encoding: 'utf8' })
    assert.match(output, /OK — protocol satisfied/)
    assert.match(output, /path history forbidden/)
    assert.match(readFileSync(join(dir, '.github/workflows/cairn.yml'), 'utf8'), /path\/\*\*/, 'the gate runs on every push to a path branch, so CI can be read after every unit')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn-init: a protected profile is refused because it cannot be installed', () => {
  const dir = target()
  try {
    assert.throws(
      () => execFileSync(process.execPath, ['tools/cairn-init.mjs', '--target', dir, '--profile', 'protected'], { stdio: 'pipe' }),
      /protected/
    )
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn-init: an existing package.json is left alone and reported', () => {
  const dir = target()
  try {
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'package.json'), '{"name":"theirs"}')
    const output = execFileSync(process.execPath, ['tools/cairn-init.mjs', '--target', dir], { encoding: 'utf8' })
    assert.match(output, /package\.json already exists and was left alone/)
    assert.equal(JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).name, 'theirs')
    assert.ok(existsSync(join(dir, 'cairn.config.json')))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
