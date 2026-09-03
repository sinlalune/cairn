/** The site's pure half: routes with fragments, and heading ids that mean
 *  the same thing as a `scope_ref` anchor. */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { headingText, parseRoute, slug } from '../site/src/route.mjs'
import { resolveScopeSection } from './cairn-check.mjs'

test('site: a route keeps its fragment, and defaults to the overview', () => {
  assert.deepEqual(parseRoute('#/spec/index.md#current-conformance'), { path: 'spec/index.md', fragment: 'current-conformance' })
  assert.deepEqual(parseRoute('#/spec/index.md'), { path: 'spec/index.md', fragment: '' })
  assert.deepEqual(parseRoute(''), { path: 'README.md', fragment: '' })
  assert.deepEqual(parseRoute('#/skills/cairn-open/SKILL.md#3-register-on-the-trunk'), { path: 'skills/cairn-open/SKILL.md', fragment: '3-register-on-the-trunk' })
})

test('site: a heading id is the slug the checker resolves a scope_ref anchor by', () => {
  assert.equal(slug('Definition of done'), 'definition-of-done')
  assert.equal(slug('3. Register on the trunk'), '3-register-on-the-trunk')
  assert.equal(slug('The `cairn` command'), 'the-cairn-command')
  const record = '## Goal\n\nx\n\n## Definition of done\n\n- [ ] y\n'
  assert.match(resolveScopeSection(record, `#${slug('Definition of done')}`), /^## Definition of done/)
})

test('site: heading text is read through whatever React made of the children', () => {
  assert.equal(headingText('plain'), 'plain')
  assert.equal(headingText(['The ', { props: { children: 'cairn' } }, ' command']), 'The cairn command')
  assert.equal(headingText(null), '')
})
