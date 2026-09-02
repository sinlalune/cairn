import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import {
  CAIRN_CONFIG,
  SUPPORTED_CONFIG_VERSION,
  configErrors,
  loadConfig,
  metadataOf,
  slash
} from './cairn-config.mjs'

test('cairn-config: the installed host binding is schema-valid and explicit', () => {
  assert.deepEqual(configErrors(CAIRN_CONFIG), [])
  assert.equal(CAIRN_CONFIG.version, SUPPORTED_CONFIG_VERSION)
  assert.equal(SUPPORTED_CONFIG_VERSION, 2)
  assert.equal(CAIRN_CONFIG.roots.project, 'project')
  assert.equal(CAIRN_CONFIG.metadataNamespace, 'cairn')
  assert.equal(CAIRN_CONFIG.enforcementProfile, 'ci')
})

test('cairn-config: unknown schemas and unsafe roots fail before a gate runs', () => {
  const unknown = structuredClone(CAIRN_CONFIG)
  unknown.version = 3
  assert.ok(configErrors(unknown).some((error) => error.includes('supported schema 2')))

  const escaping = structuredClone(CAIRN_CONFIG)
  escaping.roots.project = '../outside'
  assert.ok(configErrors(escaping).some((error) => error.includes('roots.project')))

  const ambiguous = structuredClone(CAIRN_CONFIG)
  ambiguous.roots.project = 'project\\state'
  ambiguous.surprise = true
  const errors = configErrors(ambiguous)
  assert.ok(errors.some((error) => error.includes('roots.project')))
  assert.ok(errors.some((error) => error.includes('unknown top-level field surprise')))
})

test('cairn-config: a schema-1 file is refused by name, and its retired fields with it', () => {
  // Schema 1 carried `sharedFiles` and `staleAfterDays` for `single-truth` and
  // `path-staleness`, both retired by the 1.0 rule cut. A file that still
  // declares them is a 0.2 file, and the loader says so rather than reading
  // the half it understands.
  const legacy = structuredClone(CAIRN_CONFIG)
  legacy.version = 1
  legacy.sharedFiles = ['project/coding-paths/ACTIVE.md']
  legacy.staleAfterDays = 14
  const errors = configErrors(legacy)
  assert.ok(errors.some((error) => /schema 1 is Cairn 0\.2/.test(error)))
  assert.ok(errors.some((error) => error.includes('unknown top-level field sharedFiles')))
  assert.ok(errors.some((error) => error.includes('unknown top-level field staleAfterDays')))
})

test('cairn-config: the retention ref and the history policy must agree', () => {
  const withPolicy = (ref, policy) => {
    const config = structuredClone(CAIRN_CONFIG)
    config.checkpointRetentionRef = ref
    config.pathHistoryPolicy = policy
    return configErrors(config)
  }
  assert.ok(withPolicy(null, 'retained').some((error) => error.includes('pathHistoryPolicy: forbidden')))
  assert.ok(withPolicy('refs/cairn/checkpoints', 'forbidden').some((error) => error.includes('requires pathHistoryPolicy: retained')))
  assert.deepEqual(withPolicy(null, 'forbidden'), [])
  assert.deepEqual(withPolicy('refs/cairn/checkpoints', 'retained'), [])
})

test('cairn-config: metadata and path helpers carry no host assumption', () => {
  assert.deepEqual(metadataOf({ cairn: { id: 'CP-X' } }, { metadataNamespace: 'cairn' }), { id: 'CP-X' })
  assert.equal(slash('project'), 'project/')
  assert.equal(slash('project/'), 'project/')
})

test('cairn-config: loading fails closed on invalid JSON and an unknown schema', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cairn-config-'))
  try {
    const invalidJson = join(dir, 'invalid.json')
    writeFileSync(invalidJson, '{', 'utf8')
    assert.throws(() => loadConfig(invalidJson), /invalid JSON/)

    const future = join(dir, 'future.json')
    writeFileSync(future, JSON.stringify({ ...CAIRN_CONFIG, version: 3 }), 'utf8')
    assert.throws(() => loadConfig(future), /supported schema 2/)
  } finally {
    rmSync(dir, { recursive: true })
  }
})
