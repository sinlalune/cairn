/**
 * The greenfield pilot, as a test: a repository created by the kit is driven
 * from install to done on each transport, green at every gate, and the
 * protocol's cost per unit is the number the conformance page states.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { runPilot } from './cairn-pilot.mjs'

for (const transport of ['pull-request', 'manual-git']) {
  test(`greenfield pilot: install to done on ${transport}, green at every gate`, () => {
    const result = runPilot({ transport })
    assert.deepEqual(result.stages.map((s) => [s.name, s.ok]), [
      ['installed', true], ['registered', true], ['unit pushed', true], ['candidate', true], ['ready', true], ['done', true]
    ])
    assert.ok(result.perUnit < 6, `one lightweight unit writes ${result.perUnit} protocol files; the budget is under six`)
    assert.equal(result.perUnit, 2, 'the step record and the record\'s resume section')
    assert.ok(result.lifecycle <= 5, `the whole lifecycle touches ${result.lifecycle} protocol files`)
  })
}
