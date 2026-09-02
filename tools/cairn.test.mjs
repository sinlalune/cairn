import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'

import {
  applyAdopt, applyPlan, applyUpdate, buildConfig, defaultOptions, digest, fileState, installationStatus,
  migrateConfig, optionsFromConfig, outwardLinks, pinSpecLinks, planInstall, readLock, specUrl, staleShapes,
  PROTOCOL_RELEASE, REFERENCE_TOOLS
} from './cairn.mjs'
import { configErrors } from './cairn-config.mjs'

const CAIRN = 'tools/cairn.mjs'
const target = () => mkdtempSync(join(tmpdir(), 'cairn-kit-'))
const git = (dir, ...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
const commit = (dir, message) => {
  git(dir, 'add', '-A')
  git(dir, '-c', 'user.email=t@example.invalid', '-c', 'user.name=t', 'commit', '-qm', message)
}
const check = (dir) => execFileSync(process.execPath, ['tools/cairn-check.mjs'], { cwd: dir, encoding: 'utf8' })
const cairn = (dir, ...args) => execFileSync(process.execPath, [join(process.cwd(), CAIRN), ...args, '--target', dir], { encoding: 'utf8', stdio: 'pipe' })
const write = (dir, path, content) => {
  mkdirSync(dirname(join(dir, path)), { recursive: true })
  writeFileSync(join(dir, path), content)
}

/* ------------------------------------------------------------------ *
 * init — the thin kit
 * ------------------------------------------------------------------ */

test('cairn init: a new repository is created in the shapes the protocol states now', () => {
  const config = buildConfig(defaultOptions())
  assert.deepEqual(configErrors(config), [], 'the generated binding must be valid before it is written')
  assert.equal(config.pathHistoryPolicy, 'forbidden')
  assert.equal(config.checkpointRetentionRef, null)
  assert.equal(config.defaultRoute, 'lightweight')
  assert.equal(config.version, 2)
  assert.equal(config.roots.concepts, 'docs/concepts', "the adopter's own wiki, never the protocol's")
  assert.deepEqual(config.transport, { registration: 'pull-request', integration: 'pull-request' })
  assert.deepEqual(buildConfig({ ...defaultOptions(), transport: 'manual-git' }).transport, { registration: 'manual-git', integration: 'manual-git' })
  assert.throws(() => planInstall({ ...defaultOptions(), transport: 'carrier-pigeon' }), /generated configuration is invalid/)
})

test('cairn init: the kit is thin — under thirty files with the lock, and it copies no specification', () => {
  const plan = planInstall({ ...defaultOptions(), profile: 'ci' })
  assert.ok(plan.files.size + 1 < 30, `${plan.files.size} files and the lock is not under thirty`)
  const paths = [...plan.files.keys()]
  assert.ok(!paths.some((p) => p.startsWith('spec/')), 'the specification is linked at the release, not copied')
  assert.ok(!paths.some((p) => p.endsWith('.test.mjs') || p.endsWith('cairn.mjs') || p.endsWith('cairn-rules.mjs') || p.endsWith('soundness.md')))
  for (const tool of REFERENCE_TOOLS) assert.ok(plan.files.has(`tools/${tool}`), tool)
  for (const skill of ['cairn-brainstorm', 'cairn-open', 'cairn-unit', 'cairn-close', 'cairn-code']) {
    assert.ok(plan.files.has(`skills/${skill}/SKILL.md`), skill)
  }
  assert.ok(plan.files.has('.github/workflows/cairn.yml') && plan.files.has('.github/pull_request_template.md'))
  assert.ok(plan.files.has('docs/concepts/index.md') && plan.files.has('docs/modules/application.md') && plan.files.has('project/coding-paths/index.md'))
  for (const folder of ['project/briefs/', 'project/sessions/', 'project/audits/', 'project/log/']) {
    assert.ok(!paths.some((p) => p.startsWith(folder)), folder)
  }
  assert.ok(!paths.some((p) => p.endsWith('/log.md')), 'no folder logs: Git keeps the per-folder history')
  assert.ok(!planInstall({ ...defaultOptions(), transport: 'manual-git' }).files.has('.github/pull_request_template.md'))
})

test('cairn init: every link the kit writes resolves inside it or is pinned to the release commit', () => {
  const plan = planInstall()
  assert.deepEqual(outwardLinks(plan.files), [])
  const skill = plan.files.get('skills/cairn-open/SKILL.md').toString('utf8')
  assert.doesNotMatch(skill, /\]\(\.\.\/\.\.\/spec\//, 'a relative link into a specification the adopter does not have')
  assert.match(skill, new RegExp(specUrl(plan.sourceCommit).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/reference/path-template.md'))
  const bootloader = plan.files.get('AGENTS.md').toString('utf8')
  assert.match(bootloader, /reference\/paths\.md\)/)
  assert.match(bootloader, new RegExp(`release ${PROTOCOL_RELEASE.replace(/\./g, '\\.')}`))
  assert.equal(pinSpecLinks('see [x](../../spec/index.md) and [y](./local.md)', 'abc'), 'see [x](https://github.com/sinlalune/cairn/blob/abc/spec/index.md) and [y](./local.md)')
  assert.equal(specUrl('unknown'), 'https://github.com/sinlalune/cairn/blob/main/spec')
})

test('cairn init: an existing file is refused rather than overwritten, and a lock refuses a second init', () => {
  const dir = target()
  try {
    writeFileSync(join(dir, 'AGENTS.md'), 'the adopter wrote this')
    assert.throws(() => applyPlan(planInstall(), dir), /refusing to overwrite/)
    assert.equal(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), 'the adopter wrote this')
    assert.equal(existsSync(join(dir, 'cairn.config.json')), false)
    rmSync(join(dir, 'AGENTS.md'))
    writeFileSync(join(dir, 'cairn.lock.json'), '{}')
    assert.throws(() => applyPlan(planInstall(), dir), /already carries a cairn\.lock\.json/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn init: a dry run writes nothing', () => {
  const dir = target()
  try {
    const result = applyPlan(planInstall(), dir, { dryRun: true })
    assert.ok(result.planned.length > 20)
    assert.deepEqual(result.written, [])
    assert.equal(existsSync(join(dir, 'cairn.config.json')), false)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn init: the lock records the release, the commit, and the digest of what the kit wrote', () => {
  const dir = target()
  try {
    const plan = planInstall()
    applyPlan(plan, dir)
    const lock = readLock(dir)
    assert.equal(lock.release, PROTOCOL_RELEASE)
    assert.equal(lock.sourceCommit, plan.sourceCommit)
    assert.equal(Object.keys(lock.manifest).length, plan.files.size)
    for (const value of Object.values(lock.manifest)) assert.match(value, /^[0-9a-f]{64}$/)
    const view = 'project/coding-paths/ACTIVE.md'
    assert.notEqual(lock.manifest[view], digest(plan.files.get(view)), 'the view is recorded as generated, not as the placeholder the plan carried')
    assert.equal(lock.manifest[view], digest(readFileSync(join(dir, view))))
    for (const [path, content] of plan.files) if (path !== view) assert.equal(lock.manifest[path], digest(content), path)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn init: a freshly installed repository passes its own gate', () => {
  const dir = target()
  try {
    applyPlan(planInstall({ ...defaultOptions(), profile: 'ci' }), dir)
    git(dir, 'init', '-q', '-b', 'main')
    commit(dir, 'install')
    const output = check(dir)
    assert.match(output, /OK — protocol satisfied/)
    assert.match(output, /path history forbidden/)
    assert.match(readFileSync(join(dir, '.github/workflows/cairn.yml'), 'utf8'), /path\/\*\*/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn init: the command refuses a protected profile and leaves an existing package.json alone', () => {
  const dir = target()
  try {
    assert.throws(() => cairn(dir, 'init', '--profile', 'protected'), /protected/)
    writeFileSync(join(dir, 'package.json'), '{"name":"theirs"}')
    const output = cairn(dir, 'init')
    assert.match(output, /package\.json already exists and was left alone/)
    assert.equal(JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).name, 'theirs')
    assert.ok(existsSync(join(dir, 'cairn.config.json')))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

/* ------------------------------------------------------------------ *
 * status and update — against the lock
 * ------------------------------------------------------------------ */

test('cairn status: a pristine, an edited and a missing kit file are told apart by the lock', () => {
  const dir = target()
  try {
    const plan = planInstall()
    applyPlan(plan, dir)
    const lock = readLock(dir)
    assert.equal(fileState(dir, 'tools/cairn-check.mjs', lock.manifest['tools/cairn-check.mjs']), 'pristine')
    writeFileSync(join(dir, 'skills/cairn-code/SKILL.md'), 'my own stance\n')
    assert.equal(fileState(dir, 'skills/cairn-code/SKILL.md', lock.manifest['skills/cairn-code/SKILL.md']), 'edited')
    rmSync(join(dir, 'skills/cairn-unit/reference.md'))
    assert.equal(fileState(dir, 'skills/cairn-unit/reference.md', lock.manifest['skills/cairn-unit/reference.md']), 'missing')
    const output = cairn(dir, 'status')
    assert.match(output, /installed release .* \(current\)/)
    assert.match(output, /would keep\s+skills\/cairn-code\/SKILL\.md — edited here/)
    assert.match(output, /would write\s+skills\/cairn-unit\/reference\.md \(missing\)/)
    assert.doesNotMatch(output, /would write\s+project\/coding-paths\/ACTIVE\.md/, 'the generated view is regenerated, never listed as a rewrite')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn status: the decision is pure — pristine files that changed in the kit are written, edited ones kept, files that left the kit deleted only when pristine', () => {
  const plan = { files: new Map([['a.md', Buffer.from('new a')], ['b.md', Buffer.from('b')], ['c.md', Buffer.from('c')]]) }
  const lock = { release: '0.9', manifest: { 'a.md': digest('old a'), 'b.md': digest('b'), 'gone.md': digest('gone'), 'edited-gone.md': digest('x') } }
  const tree = { 'a.md': 'old a', 'b.md': 'b', 'gone.md': 'gone', 'edited-gone.md': 'y' }
  const stateOf = (path, recorded) => (tree[path] === undefined ? 'missing' : digest(tree[path]) === recorded ? 'pristine' : 'edited')
  const status = installationStatus(lock, plan, stateOf)
  assert.equal(status.installed, '0.9')
  assert.deepEqual(status.files.map((f) => [f.path, f.state, f.action]), [
    ['a.md', 'pristine', 'write'], ['b.md', 'pristine', 'none'], ['c.md', 'missing', 'write']
  ])
  assert.deepEqual(status.left.map((f) => [f.path, f.action]), [['gone.md', 'delete'], ['edited-gone.md', 'report']])
})

test('cairn update: rewrites pristine kit files, keeps edited ones, and writes the new lock', () => {
  const dir = target()
  try {
    applyPlan(planInstall(), dir)
    const before = readLock(dir)
    // The adopter edited one skill and deleted one reference; the kit moved on.
    writeFileSync(join(dir, 'skills/cairn-code/SKILL.md'), 'my own stance\n')
    rmSync(join(dir, 'skills/cairn-unit/reference.md'))
    const plan = planInstall()
    plan.files.set('skills/cairn-open/SKILL.md', Buffer.from('a newer open skill\n'))
    const result = applyUpdate(dir, plan, before)
    assert.ok(result.written.includes('skills/cairn-open/SKILL.md'), 'a pristine file the kit changed is rewritten')
    assert.ok(result.written.includes('skills/cairn-unit/reference.md'), 'a missing kit file is restored')
    assert.equal(readFileSync(join(dir, 'skills/cairn-code/SKILL.md'), 'utf8'), 'my own stance\n', 'an edited file is kept')
    assert.equal(readFileSync(join(dir, 'skills/cairn-open/SKILL.md'), 'utf8'), 'a newer open skill\n')
    const after = readLock(dir)
    assert.equal(after.manifest['skills/cairn-open/SKILL.md'], digest('a newer open skill\n'))
    assert.equal(after.manifest['skills/cairn-code/SKILL.md'], digest(planInstall().files.get('skills/cairn-code/SKILL.md')), 'the lock records what the kit would have written, so the edit stays visible')
    assert.notEqual(after.installedAt, before.installedAt)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

/* ------------------------------------------------------------------ *
 * adopt — a repository that carries the protocol without a lock
 * ------------------------------------------------------------------ */

const SCHEMA_1 = {
  $schema: './tools/cairn-config.schema.json',
  version: 1,
  trunk: 'master',
  remote: 'origin',
  metadataNamespace: 'atomik',
  enforcementProfile: 'ci',
  roots: {
    documentation: 'docs', project: 'atomik-project', architecture: 'docs/bedrock', decisions: 'docs/adr',
    modules: 'docs/modules', concepts: 'docs/cairn/specification/concepts', source: ['apps', 'packages']
  },
  areas: [{ name: 'shell', match: ['apps/desktop/**'], note: 'docs/modules/atomik-desktop-shell.md' }],
  sharedFiles: ['atomik-project/coding-paths/ACTIVE.md'],
  staleAfterDays: 14,
  defaultRoute: 'lightweight',
  checkpointRetentionRef: null,
  pathHistoryPolicy: 'forbidden',
  scopeDigestAlgorithm: 'sha256',
  transport: { registration: 'manual-git', integration: 'manual-git' },
  migration: { unregisteredPaths: ['CP-OPS-001'], undeclaredOpenings: [], v02Records: ['CP-MVP-008'] }
}

test('cairn adopt: a schema-1 configuration migrates field by field, keeping the host\'s answers', () => {
  const migrated = migrateConfig(SCHEMA_1)
  assert.deepEqual(configErrors(migrated), [])
  assert.equal(migrated.version, 2)
  assert.equal(migrated.trunk, 'master')
  assert.equal(migrated.metadataNamespace, 'atomik')
  assert.deepEqual(migrated.roots, SCHEMA_1.roots)
  assert.deepEqual(migrated.areas, SCHEMA_1.areas)
  assert.ok(!('sharedFiles' in migrated) && !('staleAfterDays' in migrated))
  assert.deepEqual(migrated.transport, { registration: 'manual-git', integration: 'manual-git' })
  assert.deepEqual(migrated.migration, SCHEMA_1.migration)
  assert.deepEqual(migrateConfig({ ...SCHEMA_1, transport: { registration: 'declared-adapter-name', integration: 'bot' } }).transport,
    { registration: 'manual-git', integration: 'manual-git' }, 'an adapter name outside the vocabulary was a manual transport by another name')
  assert.equal(optionsFromConfig(migrated).conceptsRoot, 'docs/cairn/specification/concepts')
  assert.equal(migrateConfig(migrated).version, 2, 'migrating a schema-2 file is the identity')
})

/** A repository as a 0.2 installation left it: schema-1 configuration, the
 *  0.2 tools, a copied specification, the folders the 0.2 lifecycle wrote,
 *  and no lock. */
function legacyRepository() {
  const dir = target()
  write(dir, 'cairn.config.json', `${JSON.stringify(SCHEMA_1, null, 2)}\n`)
  write(dir, 'AGENTS.md', '# Atomik bootloader\n\nthe adopter\'s own\n')
  write(dir, 'package.json', '{"name":"theirs","scripts":{"cairn-check":"node tools/cairn-check.mjs"}}\n')
  for (const tool of ['cairn-check.mjs', 'cairn-config.mjs', 'cairn-active.mjs', 'cairn-init.mjs', 'cairn-rules.mjs', 'cairn-check.test.mjs']) {
    write(dir, `tools/${tool}`, `// 0.2 ${tool}\n`)
  }
  write(dir, 'tools/cairn-config.schema.json', '{}\n')
  write(dir, 'docs/cairn/specification/index.md', '---\ntype: Cairn Specification\ntitle: 0.2\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# 0.2\n\nSee [a concept](./concepts/thing.md).\n')
  write(dir, 'docs/cairn/specification/concepts/thing.md', '---\ntype: Cairn Concept\ntitle: Thing\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Thing\n')
  write(dir, 'docs/cairn/specification/concepts/index.md', '---\ntype: Cairn Folder Index\ntitle: Concepts\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Concepts\n\n- [thing](./thing.md)\n')
  write(dir, 'docs/index.md', '---\ntype: Cairn Folder Index\ntitle: Docs\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Docs\n\n- [the specification](./cairn/specification/index.md)\n')
  write(dir, 'docs/modules/atomik-desktop-shell.md', '---\ntype: Cairn Module Note\ntitle: Shell\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Shell\n')
  write(dir, 'atomik-project/sessions/2026-08-20-cp-mvp-008-opening.md', '---\ntype: Cairn Session Record\ntitle: x\ntimestamp: 2026-08-20T00:00:00Z\npath: CP-MVP-008\nceremony: opening\n---\n\n# opening\n')
  write(dir, 'atomik-project/briefs/index.md', '---\ntype: Cairn Folder Index\ntitle: Briefs\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Briefs\n')
  write(dir, 'atomik-project/coding-paths/CP-MVP-008.md', `---
type: Cairn Coding Path
title: CP-MVP-008 — done long ago
description: x
tags: [coding-path]
timestamp: 2026-08-04T00:00:00Z
atomik:
  id: CP-MVP-008
  route: lightweight
  status: done
  base_commit: ${'1'.repeat(40)}
  branch: path/cp-mvp-008
  subject_commit: ${'2'.repeat(40)}
  resolution: completed
---

# CP-MVP-008

## Definition of done

- [x] done
`)
  write(dir, 'atomik-project/coding-paths/ACTIVE.md', '---\ntype: Cairn Generated View\ntitle: Running paths\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Running paths\n\n<!-- cairn:paths:begin -->\nstale\n<!-- cairn:paths:end -->\n')
  write(dir, 'atomik-project/coding-paths/index.md', '---\ntype: Cairn Folder Index\ntitle: Coding paths\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Coding paths\n')
  write(dir, 'atomik-project/index.md', '---\ntype: Cairn Folder Index\ntitle: Project\ndescription: x\ntags: [x]\ntimestamp: 2026-08-26T00:00:00Z\n---\n\n# Project\n')
  git(dir, 'init', '-q', '-b', 'master')
  commit(dir, 'a 0.2 installation, from before the lock')
  return dir
}

test('cairn adopt: a 0.2 installation becomes a 1.0 installation, its own files kept, its debts reported, and its gate green', () => {
  const dir = legacyRepository()
  try {
    const dry = applyAdopt(dir, { dryRun: true })
    assert.ok(!existsSync(join(dir, 'cairn.lock.json')), 'a dry run writes nothing')
    assert.ok(dry.written.includes('tools/cairn-check.mjs') && dry.kept.includes('AGENTS.md'))

    const result = applyAdopt(dir)
    const config = JSON.parse(readFileSync(join(dir, 'cairn.config.json'), 'utf8'))
    assert.equal(config.version, 2)
    assert.equal(config.roots.project, 'atomik-project', 'the host\'s roots survive')
    assert.ok(!('sharedFiles' in config))
    assert.doesNotMatch(readFileSync(join(dir, 'tools/cairn-check.mjs'), 'utf8'), /^\/\/ 0\.2/, 'the 0.2 tools are replaced by the reference tools')
    assert.ok(existsSync(join(dir, 'skills/cairn-unit/SKILL.md')), 'the skills arrive')
    assert.equal(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), '# Atomik bootloader\n\nthe adopter\'s own\n', 'a host file that exists is kept')
    assert.ok(existsSync(join(dir, 'atomik-project/coding-paths/binding.md')), 'a host file that is absent is written')
    assert.match(readFileSync(join(dir, 'atomik-project/coding-paths/ACTIVE.md'), 'utf8'), /no live path/, 'the view is regenerated')
    const lock = readLock(dir)
    assert.equal(lock.release, PROTOCOL_RELEASE)
    const stalePaths = result.stale.map((s) => s.path)
    for (const expected of ['docs/cairn/specification', 'atomik-project/sessions', 'atomik-project/briefs', 'tools/cairn-init.mjs', 'tools/cairn-rules.mjs', 'tools/cairn-check.test.mjs', 'atomik-project/coding-paths/CP-MVP-008.md']) {
      assert.ok(stalePaths.includes(expected), `${expected} is reported as a 0.2 shape`)
    }
    assert.ok(existsSync(join(dir, 'docs/cairn/specification/index.md')), 'nothing of the adopter\'s is deleted')
    commit(dir, 'adopt cairn 1.0')
    assert.match(check(dir), /OK — protocol satisfied/)
    assert.throws(() => applyAdopt(dir), /carries a cairn\.lock\.json/, 'adopting twice is an update')
    assert.match(cairn(dir, 'status'), /installed release/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn adopt: the stale shapes are named for a tree that has them, and silent for one that does not', () => {
  const dir = target()
  try {
    write(dir, 'atomik-project/audits/index.md', 'x')
    write(dir, 'tools/cairn-spec-build.mjs', 'x')
    const config = migrateConfig(SCHEMA_1)
    const stale = staleShapes(dir, config).map((s) => s.path)
    assert.deepEqual(stale, ['atomik-project/audits', 'tools/cairn-spec-build.mjs'])
    assert.deepEqual(staleShapes(target(), config), [])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
