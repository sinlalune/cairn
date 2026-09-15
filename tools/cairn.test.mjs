import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'

import {
  bootloader, hostBinding, pointerPage, takeRelease, workflow,
  applyAdopt, applyPlan, applyUpdate, buildConfig, defaultOptions, digest, fileState, installationStatus,
  migrateConfig, optionsFromConfig, outwardLinks, pinSpecLinks, planInstall, readLock, sourceCommit, specUrl, staleShapes,
  PROTOCOL_RELEASE, REFERENCE_TOOLS
} from './cairn.mjs'
import { REPO, configErrors } from './cairn-config.mjs'

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

test('cairn init: the generated gate names the adopter\'s own trunk, not ours', () => {
  // `${options.trunk}` appears twice in one expression and nothing called the
  // generator with a trunk that is not `main`, so a hard-coded 'main' — or one
  // of the two occurrences left behind — would have shipped silently.
  const yaml = workflow({ ...defaultOptions(), trunk: 'mainline' })
  assert.ok(yaml.includes(
    "CAIRN_BASE_REF: ${{ github.base_ref && format('origin/{0}', github.base_ref) " +
    "|| (github.ref_name == 'mainline' && github.event.before || 'origin/mainline') }}"),
  `both occurrences follow the declared trunk: ${yaml.split('\n').find((l) => l.includes('CAIRN_BASE_REF'))}`)
  assert.ok(!yaml.includes("'origin/main'"), 'no occurrence of this repository\'s own trunk survives')
})

test('cairn init: a new repository is created in the shapes the protocol states now', () => {
  const config = buildConfig(defaultOptions())
  assert.deepEqual(configErrors(config), [], 'the generated binding must be valid before it is written')
  assert.equal(config.pathHistoryPolicy, 'forbidden')
  assert.equal(config.checkpointRetentionRef, null)
  assert.equal(config.defaultRoute, 'lightweight')
  assert.equal(config.version, 2)
  assert.equal(config.roots.concepts, 'docs/concepts', "the adopter's own wiki, never the protocol's")
  // ADR-024 d1: `--transport` answers the integration transport alone, so a
  // sole owner's registration no longer costs the forge's review and check.
  assert.deepEqual(config.transport, { registration: 'manual-git', integration: 'pull-request' })
  assert.deepEqual(buildConfig({ ...defaultOptions(), transport: 'manual-git' }).transport, { registration: 'manual-git', integration: 'manual-git' })
  assert.throws(() => planInstall({ ...defaultOptions(), transport: 'carrier-pigeon' }), /generated configuration is invalid/)
})

test('cairn init: the kit is thin — it carries the roles, and copies no specification', () => {
  // No count is asserted. ADR-022 d2 superseded ADR-013's cap on the kit's
  // files: what the kit installs is measured and reported, never a target, so
  // a file that earns its place is added and the number follows.
  const plan = planInstall({ ...defaultOptions(), profile: 'ci' })
  const paths = [...plan.files.keys()]
  assert.ok(!paths.some((p) => p.startsWith('spec/')), 'the specification is linked at the release, not copied')
  assert.ok(!paths.some((p) => p.endsWith('.test.mjs') || p.endsWith('cairn.mjs') || p.endsWith('cairn-rules.mjs') || p.endsWith('soundness.md')))
  for (const tool of REFERENCE_TOOLS) assert.ok(plan.files.has(`tools/${tool}`), tool)
  for (const skill of ['cairn-brainstorm', 'cairn-open', 'cairn-unit', 'cairn-close', 'cairn-code']) {
    assert.ok(plan.files.has(`skills/${skill}/SKILL.md`), skill)
  }
  assert.ok(plan.files.has('.github/workflows/cairn.yml') && plan.files.has('.github/pull_request_template.md'))
  assert.ok(plan.files.has('docs/modules/application.md') && plan.files.has('project/coding-paths/index.md'))
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
  const agents = plan.files.get('AGENTS.md').toString('utf8')
  assert.match(agents, /reference\/paths\.md\)/)
  assert.match(agents, new RegExp(`release ${PROTOCOL_RELEASE.replace(/\./g, '\\.')}`))
  assert.equal(pinSpecLinks('see [x](../../spec/index.md) and [y](./local.md)', 'abc'), 'see [x](https://github.com/sinlalune/cairn/blob/abc/spec/index.md) and [y](./local.md)')
  assert.equal(specUrl('unknown'), 'https://github.com/sinlalune/cairn/blob/main/spec')
})

test('the generated binding prints the transports the configuration declares, not the ones the kit prefers', () => {
  // `adopt` writes a missing binding.md beside a configuration it did NOT
  // rewrite. A row that printed the kit's own default there would contradict
  // the file next to it — the defect the page it sits on calls a binding
  // defect. So both rows are read from the declaration.
  assert.match(hostBinding(defaultOptions(), 'abc123'), /^\| registration transport \| `manual-git` \|$/m)
  assert.match(hostBinding(defaultOptions(), 'abc123'), /^\| integration transport \| `pull-request` \|$/m)
  const installedAt10 = optionsFromConfig(buildConfig({ ...defaultOptions(), transport: 'pull-request', registrationTransport: 'pull-request' }))
  assert.equal(buildConfig(installedAt10).transport.registration, 'pull-request', 'update and adopt plan from the host\'s own answer')
  assert.match(hostBinding(installedAt10, 'abc123'), /^\| registration transport \| `pull-request` \|$/m)
  assert.match(hostBinding({ ...defaultOptions(), transport: 'manual-git' }, 'abc123'), /^\| integration transport \| `manual-git` \|$/m)
})

test('the bootloader carries the two lines of 1.1 that reach every session, in the kit and here', () => {
  // A tone and a concept note are not predicates, so nothing but this test
  // stands between the two records and a bootloader that never says them.
  const kit = bootloader(defaultOptions(), 'abc123')
  const here = readFileSync(join(REPO, 'AGENTS.md'), 'utf8')
  for (const [text, where] of [[kit, 'the kit\'s bootloader'], [here, 'this repository\'s AGENTS.md']]) {
    assert.match(text, /- An explanation is written for the reader who is learning it/, `${where}: ADR-021 d1`)
    assert.match(text, /- An abstraction explained persists as a concept note/, `${where}: ADR-011 d3`)
    assert.match(text, /`cairn-learn`/, `${where}: the sixth skill (ADR-022 d2)`)
  }
  // ADR-014 d2: the kit installs no suite and names none; this repository
  // keeps `npm test` as an alias of `cairn-test` and says so here.
  assert.doesNotMatch(kit, /npm test/, 'the kit names no suite of the adopter\'s')
  assert.match(here, /npm test +# alias of cairn-test/)
})

test('cairn init: the documentation plane of 1.1 is installed, not left for the adopter to guess', () => {
  const plan = planInstall()
  const files = plan.files
  const text = (path) => files.get(path).toString('utf8')

  // ADR-011 d1: the folder the first session reads before it plans anything.
  assert.ok(files.has('docs/inputs/index.md'), 'docs/inputs/ and its index')
  assert.match(text('docs/inputs/index.md'), /any format/i)
  assert.match(text('docs/inputs/index.md'), /never edited|as they came|unedited/i,
    'the index says the inputs are kept as they came')

  // ADR-011 d2: three folders, each with an index; no index at the root.
  for (const folder of ['cairn', 'product', 'learning']) {
    assert.ok(files.has(`docs/concepts/${folder}/index.md`), `docs/concepts/${folder}/index.md`)
  }
  assert.ok(!files.has('docs/concepts/index.md'),
    'the root index is replaced by the three folder indexes, not kept beside them')
  assert.match(text('docs/concepts/cairn/index.md'), /what this repository actually does with it/i,
    'the cairn scope, not one of its neighbours')
  assert.match(text('docs/concepts/product/index.md'), /this product's architecture uses/i)
  // ADR-022 d1: a learning note is a concept note with an order.
  assert.match(text('docs/concepts/learning/index.md'), /learning note/i)
  assert.match(text('docs/concepts/learning/index.md'), /order/i)

  // ADR-019 d2 + ADR-023 d2, d3: the index the kit writes for an adopter.
  assert.ok(files.has('docs/architecture/index.md'), 'the architecture folder gets its index')
  assert.match(text('docs/architecture/index.md'), /one sentence/i, 'which way dependencies point')
  assert.match(text('docs/architecture/index.md'), /mermaid/i, 'one diagram')
  assert.match(text('docs/architecture/index.md'), /flow/i, 'flow pages live here')

  // ADR-012 + ADR-023 d3, d4: the documentation index is the map.
  const docs = text('docs/index.md')
  for (const target of ['./inputs/index.md', './concepts/cairn/index.md', './concepts/product/index.md',
    './concepts/learning/index.md', './architecture/index.md', './modules/index.md']) {
    assert.ok(docs.includes(target), `the documentation index links ${target}`)
  }
  assert.match(docs, /opens with one worked example/i, 'before any explanation (ADR-023 d3)')
  assert.match(docs, /links that API's documentation/i,
    'the surface page links it; Cairn installs no API page of its own (ADR-023 d4)')

  // ADR-010 d1: the template describes now.
  const note = text('docs/modules/application.md')
  assert.match(note, /as it is now/i)
  assert.match(note, /no dated paragraphs/i)
  assert.match(note, /belongs to the journal/i, 'history is the journal\'s, not the note\'s')

  assert.deepEqual(outwardLinks(files), [], 'every link the new indexes carry resolves inside the kit')

  // A host may bind its wiki outside the documentation plane — this repository
  // does — and a hard-coded `./concepts/` in the index would point at nothing.
  const bound = planInstall({ ...defaultOptions(), conceptsRoot: 'spec/concepts' })
  assert.ok(bound.files.has('spec/concepts/learning/index.md'))
  assert.ok(bound.files.get('docs/index.md').toString('utf8').includes('../spec/concepts/learning/index.md'))
  assert.deepEqual(outwardLinks(bound.files), [], 'and the link still resolves inside the kit')
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
    const installed = readFileSync(join(dir, '.github/workflows/cairn.yml'), 'utf8')
    assert.match(installed, /path\/\*\*/)
    // The adopter's gate must compare across an arrival, not with itself. The
    // kit shipped `origin/${{ github.base_ref || <trunk> }}`, which on a push
    // names the pushed commit, so no changed-file rule judged an integration
    // in any repository this kit installed.
    assert.ok(installed.includes(
      "CAIRN_BASE_REF: ${{ github.base_ref && format('origin/{0}', github.base_ref) " +
      "|| (github.ref_name == 'main' && github.event.before || 'origin/main') }}"),
    'the adopter gets the whole expression, not a base that judges the wrong thing')
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
    assert.match(output, /registration manual-git, integration pull-request/, 'the run names both transports (ADR-024)')
    assert.equal(JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).name, 'theirs')
    assert.ok(existsSync(join(dir, 'cairn.config.json')))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

/* ------------------------------------------------------------------ *
 * status and update — against the lock
 * ------------------------------------------------------------------ */

test('cairn init: the pointer page says which release this is and what the kit owns', () => {
  // ADR-013: one page, found by name at the root, nothing on it written by
  // hand. It is what an adopter reads before they read anything of Cairn's.
  const plan = planInstall()
  assert.ok(plan.files.has('cairn/README.md'))
  const page = plan.files.get('cairn/README.md').toString('utf8')
  assert.match(page, new RegExp(`release ${PROTOCOL_RELEASE.replace(/\./g, '\\.')}`), 'the installed release')
  assert.ok(page.includes(plan.sourceCommit), 'and the commit it was cut from, in full')
  for (const skill of ['cairn-brainstorm', 'cairn-open', 'cairn-unit', 'cairn-close', 'cairn-learn', 'cairn-code']) {
    assert.ok(page.includes(`${skill}/SKILL.md`), `${skill} is linked`)
  }
  assert.ok(page.includes('cairn.lock.json') && page.includes('tools/cairn-check.mjs'),
    'the files the kit owns, from the manifest')
  assert.ok(page.includes('cairn/README.md'), 'including itself — it is a kit file like any other')
  assert.match(page, /still holds exactly what the kit wrote/i,
    'the sentence ADR-013 asks for, in words a reader does not need the glossary for')
  assert.match(page, /never rewrites one you have edited/i)
  assert.match(page, /status/, 'and says which command tells them apart')
  assert.deepEqual(outwardLinks(plan.files), [], 'its links resolve inside the kit or are pinned')

  // The bootloader's start-here list points at it (ADR-013).
  assert.ok(plan.files.get('AGENTS.md').toString('utf8').includes('cairn/README.md'))

  // ADR-015 d2: the section is empty until an update cannot rewrite something.
  const reconcile = pointerPage('abc123', { paths: ['tools/cairn-check.mjs'], edited: ['skills/cairn-code/SKILL.md'] })
  assert.ok(reconcile.includes('skills/cairn-code/SKILL.md'), 'an edited file the last update could not rewrite is named on the page')
})

test('cairn update: a pristine file is rewritten whoever owns it, and an edited one is explained', () => {
  const dir = target()
  try {
    applyPlan(planInstall(), dir)
    const lock = readLock(dir)
    // A HOST file, untouched since the kit wrote it. ADR-015 d1: pristine
    // means nothing of the adopter's is in it, so the review protects nothing.
    const host = 'project/coding-paths/binding.md'
    assert.ok(lock.host.includes(host))
    assert.equal(fileState(dir, host, lock.manifest[host]), 'pristine')
    // An edited file, kit-owned, whose template the "release" changed.
    writeFileSync(join(dir, 'skills/cairn-code/SKILL.md'), 'my own stance\n')

    const plan = planInstall()
    plan.files.set(host, Buffer.from(`${plan.files.get(host).toString('utf8')}\nA line the release added.\n`, 'utf8'))
    plan.files.set('skills/cairn-code/SKILL.md', Buffer.from('the release\'s stance\n', 'utf8'))
    const status = installationStatus(lock, plan, (path, recorded) => fileState(dir, path, recorded))
    const action = (path) => status.files.find((f) => f.path === path).action
    assert.equal(action(host), 'write', 'a pristine host file whose template changed is rewritten (ADR-015 d1)')
    assert.equal(action('skills/cairn-code/SKILL.md'), 'keep', 'an edited file is never rewritten (ADR-015 d2)')

    const result = applyUpdate(dir, plan, lock)
    assert.ok(result.written.includes(host))
    assert.match(readFileSync(join(dir, host), 'utf8'), /A line the release added\./)
    assert.equal(readFileSync(join(dir, 'skills/cairn-code/SKILL.md'), 'utf8'), 'my own stance\n', 'the edit survives')
    assert.ok(result.reconcile.includes('skills/cairn-code/SKILL.md'),
      'and the report ends with the files the owner must reconcile by hand')
    assert.ok(result.diffs['skills/cairn-code/SKILL.md']?.includes('the release\'s stance'),
      'the difference between the release\'s template and the file is printed')
    // ADR-015 d2: the pointer page carries the same list, on disk.
    assert.ok(readFileSync(join(dir, 'cairn/README.md'), 'utf8').includes('skills/cairn-code/SKILL.md'))
    // and the lock agrees with what was written, or the next status lies
    assert.equal(fileState(dir, 'cairn/README.md', readLock(dir).manifest['cairn/README.md']), 'pristine')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn update --take: the owner takes the release\'s version of one named file, and nothing else', () => {
  const dir = target()
  try {
    applyPlan(planInstall(), dir)
    writeFileSync(join(dir, 'skills/cairn-code/SKILL.md'), 'my own stance\n')
    writeFileSync(join(dir, 'skills/cairn-open/SKILL.md'), 'mine too\n')
    const output = cairn(dir, 'update', '--take', 'skills/cairn-code/SKILL.md')
    assert.match(output, /discard/i, 'it says what it is about to discard')
    assert.notEqual(readFileSync(join(dir, 'skills/cairn-code/SKILL.md'), 'utf8'), 'my own stance\n')
    assert.equal(readFileSync(join(dir, 'skills/cairn-open/SKILL.md'), 'utf8'), 'mine too\n',
      'the file that was not named is untouched')
    assert.equal(fileState(dir, 'skills/cairn-code/SKILL.md', readLock(dir).manifest['skills/cairn-code/SKILL.md']), 'pristine')
    assert.throws(() => cairn(dir, 'update', '--take', 'nothing/here.md'), /not a file this release carries|no such/i)

    // ADR-015 d3 says the file becomes pristine AT THE NEW RELEASE, so the
    // lock has to learn the template it now holds. Without that the owner
    // takes the release's version and `status` still calls the file edited.
    writeFileSync(join(dir, 'skills/cairn-close/SKILL.md'), 'mine\n')
    const moved = planInstall()
    moved.files.set('skills/cairn-close/SKILL.md', Buffer.from('a newer close skill\n'))
    takeRelease(dir, moved, readLock(dir), 'skills/cairn-close/SKILL.md')
    assert.equal(readFileSync(join(dir, 'skills/cairn-close/SKILL.md'), 'utf8'), 'a newer close skill\n')
    assert.equal(fileState(dir, 'skills/cairn-close/SKILL.md', readLock(dir).manifest['skills/cairn-close/SKILL.md']), 'pristine',
      'pristine against the lock, not only against the file that was written')

    // --dry-run must not write. It is the same command with the same flag.
    writeFileSync(join(dir, 'skills/cairn-open/SKILL.md'), 'mine again\n')
    cairn(dir, 'update', '--take', 'skills/cairn-open/SKILL.md', '--dry-run')
    assert.equal(readFileSync(join(dir, 'skills/cairn-open/SKILL.md'), 'utf8'), 'mine again\n')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('cairn adopt: the lock records what adopt actually wrote, not what a fresh install would have', () => {
  // Found by S01's review and verified at base_commit: `adopt` writes the
  // MIGRATED configuration and locked the digest of the generated one, so the
  // very next `status` called an untouched file edited.
  const dir = target()
  try {
    applyPlan(planInstall(), dir)
    const config = JSON.parse(readFileSync(join(dir, 'cairn.config.json'), 'utf8'))
    config.areas.push({ name: 'extra', match: ['src/extra/**'], note: 'docs/modules/extra.md' })
    writeFileSync(join(dir, 'cairn.config.json'), `${JSON.stringify(config, null, 2)}\n`)
    rmSync(join(dir, 'cairn.lock.json'))
    applyAdopt(dir)
    assert.equal(fileState(dir, 'cairn.config.json', readLock(dir).manifest['cairn.config.json']), 'pristine',
      'a file nobody touched after adopt is not edited')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

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

test('cairn status: the decision is pure — a pristine file follows the kit, whoever owns it', () => {
  const plan = {
    files: new Map([['a.md', Buffer.from('new a')], ['b.md', Buffer.from('b')], ['c.md', Buffer.from('c')], ['AGENTS.md', Buffer.from('new bootloader')], ['binding.md', Buffer.from('b')]]),
    host: new Set(['AGENTS.md', 'binding.md'])
  }
  const lock = {
    release: '0.9',
    host: ['AGENTS.md', 'binding.md', 'docs/log.md'],
    manifest: { 'a.md': digest('old a'), 'b.md': digest('b'), 'AGENTS.md': digest('old bootloader'), 'binding.md': digest('b'), 'gone.md': digest('gone'), 'edited-gone.md': digest('x'), 'docs/log.md': digest('log') }
  }
  const tree = { 'a.md': 'old a', 'b.md': 'b', 'AGENTS.md': 'old bootloader', 'binding.md': 'b', 'gone.md': 'gone', 'edited-gone.md': 'y', 'docs/log.md': 'log' }
  const stateOf = (path, recorded) => (tree[path] === undefined ? 'missing' : digest(tree[path]) === recorded ? 'pristine' : 'edited')
  const status = installationStatus(lock, plan, stateOf)
  assert.equal(status.installed, '0.9')
  assert.deepEqual(status.files.map((f) => [f.path, f.state, f.action]), [
    ['a.md', 'pristine', 'write'],       // portable, pristine, template changed: rewritten
    ['b.md', 'pristine', 'none'],
    ['c.md', 'missing', 'write'],
    // Host, pristine, template changed: rewritten. Pristine means nothing of
    // the adopter's is in it, so the review protected nothing (ADR-015 d1).
    ['AGENTS.md', 'pristine', 'write'],
    ['binding.md', 'pristine', 'none']
  ])
  assert.deepEqual(status.left.map((f) => [f.path, f.action]), [
    ['gone.md', 'delete'],          // portable and pristine: the kit's to delete
    ['edited-gone.md', 'report'],
    ['docs/log.md', 'report']       // a host file that left the kit is never deleted
  ])
  // A lock from before host files were named cannot tell, and reports everything that left.
  const legacy = installationStatus({ ...lock, host: undefined }, plan, stateOf)
  assert.deepEqual(legacy.left.map((f) => f.action), ['report', 'report', 'report'])
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
    plan.files.set('AGENTS.md', Buffer.from('# a newer bootloader\n'))
    const result = applyUpdate(dir, plan, before)
    assert.ok(result.written.includes('skills/cairn-open/SKILL.md'), 'a pristine file the kit changed is rewritten')
    assert.ok(result.written.includes('AGENTS.md'), 'a pristine host file follows the kit too (ADR-015 d1)')
    assert.ok(result.status.files.some((f) => f.path === 'AGENTS.md' && f.action === 'write'))
    assert.deepEqual(before.host.filter((h) => h === 'AGENTS.md'), ['AGENTS.md'], 'the lock names the host files')
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
 * the package — the command runs from the tarball, with no host configuration
 * ------------------------------------------------------------------ */

/** The package as npm would unpack it, placed inside another repository's
 *  tree the way `node_modules` is: no cairn.config.json, no Git history of
 *  its own, and an adopter's commit above it that must never leak into the
 *  links the kit writes. */
function packagedCommand() {
  const adopter = target()
  git(adopter, 'init', '-q', '-b', 'main')
  writeFileSync(join(adopter, 'README.md'), 'the adopter\n')
  commit(adopter, 'the adopter')
  const pkg = join(adopter, 'node_modules', 'cairn-protocol')
  const files = JSON.parse(readFileSync('package.json', 'utf8')).files
  for (const entry of files) {
    if (entry === 'tools/release.json') continue
    const source = join(process.cwd(), entry)
    if (!existsSync(source)) continue
    const dest = join(pkg, entry.replace(/\/$/, ''))
    mkdirSync(dirname(dest), { recursive: true })
    cpSync(source, dest, { recursive: true })
  }
  writeFileSync(join(pkg, 'package.json'), readFileSync('package.json'))
  return { adopter, pkg }
}

test('cairn: the packaged command runs where there is no host configuration, and pins the release it was stamped with', () => {
  const { adopter, pkg } = packagedCommand()
  try {
    mkdirSync(join(pkg, 'tools'), { recursive: true })
    writeFileSync(join(pkg, 'tools/release.json'), JSON.stringify({ release: PROTOCOL_RELEASE, commit: 'f'.repeat(40) }))
    const dir = target()
    try {
      const output = execFileSync(process.execPath, [join(pkg, 'tools/cairn.mjs'), 'init', '--target', dir], { encoding: 'utf8', stdio: 'pipe' })
      assert.match(output, /installed \d+ file\(s\)/)
      assert.match(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), new RegExp(`blob/${'f'.repeat(40)}/spec/`), 'links pin the stamped commit, not the adopter\'s')
      assert.equal(readLock(dir).sourceCommit, 'f'.repeat(40))
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
    // Unstamped, inside the adopter's tree: the adopter's commit must not be taken for the kit's.
    rmSync(join(pkg, 'tools/release.json'))
    assert.equal(sourceCommit(pkg), 'unknown')
    assert.equal(specUrl(sourceCommit(pkg)), 'https://github.com/sinlalune/cairn/blob/main/spec')
  } finally {
    rmSync(adopter, { recursive: true, force: true })
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
