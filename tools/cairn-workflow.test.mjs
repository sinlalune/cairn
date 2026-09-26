/**
 * This repository's CI adapter — `npm test`.
 *
 * The workflow is the one place where a wrong answer is invisible until it
 * costs a merge. ADR-005 exists because a push run on a path branch went green
 * at 17:05, the owner merged at 17:06, and the request's run on the same commit
 * went red a minute later; ADR-014 decision 1 exists because the reading of a
 * red run was done by hand, five times, after the fact. Neither is a predicate
 * a tool can hold, so they are held here: the triggers, the order of the steps,
 * the checker's step carrying no token, and the condition the post-mortem
 * step runs under.
 *
 * Read as text on purpose. This package declares no dependency, and a YAML
 * parser written to check four facts would be more code than the file it reads.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { REPO } from './cairn-config.mjs'
import { defaultOptions, planInstall } from './cairn.mjs'

const WORKFLOW = readFileSync(join(REPO, '.github/workflows/cairn.yml'), 'utf8')
const PACKAGE = JSON.parse(readFileSync(join(REPO, 'package.json'), 'utf8'))

/** The text of one step. `indexOf` answers -1 for a marker that is not there,
 *  and `slice(-1)` is the last character of the file — a window under which
 *  every assertion about a DELETED step still passes. So the markers are
 *  asserted before they are used. */
function step(name, until = null) {
  const start = WORKFLOW.indexOf(`- name: ${name}`)
  assert.notEqual(start, -1, `the workflow has no step named ${name}`)
  if (!until) return WORKFLOW.slice(start)
  const end = WORKFLOW.indexOf(`- name: ${until}`)
  assert.notEqual(end, -1, `the workflow has no step named ${until}`)
  return WORKFLOW.slice(start, end)
}

test('the forge judges one commit per landing: the trunk on a push, the request head on a request', () => {
  assert.match(WORKFLOW, /^ {4}branches: \[main\]$/m, 'the push trigger is the trunk alone (ADR-005)')
  assert.match(WORKFLOW, /^ {2}pull_request:$/m, 'the candidate is judged on the exact head that will land')
  assert.match(WORKFLOW, /ref: \$\{\{ github\.event\.pull_request\.head\.sha \}\}/)
  assert.match(WORKFLOW, /fetch-depth: 0/, 'the gate reads a range, so it needs history')
})

test('this repository\'s suite runs before the checker, under its own name', () => {
  const suite = WORKFLOW.indexOf('npm run cairn-test')
  const checker = WORKFLOW.indexOf('node tools/cairn-check.mjs')
  assert.ok(suite !== -1, 'the suite runs as cairn-test (ADR-014 decision 2)')
  assert.ok(suite < checker, 'a checker whose suite is red has no verdict to give')
  assert.equal(PACKAGE.scripts['cairn-test'], "node --test 'tools/*.test.mjs'")
  assert.equal(PACKAGE.scripts.test, 'npm run cairn-test', 'npm test stays an alias, so the bootloader\'s command list stays true')

  const scripts = JSON.parse(String(planInstall(defaultOptions()).files.get('package.json'))).scripts
  assert.ok(!('test' in scripts), 'the adopter\'s npm test is the adopter\'s; the kit never names it')
  assert.ok(!('cairn-test' in scripts), 'and the kit ships no suite to run')
})

test('the checker judges the base CI judges against, and carries no token', () => {
  const checker = step('cairn-check', 'cairn-postmortem')
  // ADR-029: the checker asks the host nothing, so its step has no token to
  // ask with. The post-mortem's step below keeps its own.
  assert.doesNotMatch(checker, /GITHUB_TOKEN|GH_TOKEN/,
    'the checker reads the repository alone; a token here is a reading nobody asked for')
  // The expression this line used to pin — `origin/${{ github.base_ref ||
  // 'main' }}` — was correct on a request and blind on a push: after the push
  // `origin/main` IS the pushed commit, so every integrating unit this
  // repository landed was judged against zero changed files. The base must
  // span the arrival, which on a push is the commit it replaced.
  // The WHOLE expression, not a grep for its parts: swapped arms, a dropped
  // `format(...)`, or the wrong precedence would each satisfy a substring match
  // and each would send the run a base that judges the wrong thing.
  const job = WORKFLOW.slice(WORKFLOW.indexOf('runs-on:'), WORKFLOW.indexOf('steps:'))
  assert.ok(job.includes(
    "CAIRN_BASE_REF: ${{ github.base_ref && format('origin/{0}', github.base_ref) " +
    "|| (github.ref_name == 'main' && github.event.before || 'origin/main') }}"),
  'a request compares with its target branch; a push to the trunk with the commit it replaced; a push to a path branch with the trunk')
  const majors = [...WORKFLOW.matchAll(/uses: actions\/[\w-]+@v(\d+)/g)].map((m) => Number(m[1]))
  assert.equal(majors.length, [...WORKFLOW.matchAll(/uses: /g)].length, 'every action is pinned at a major version')
  assert.ok(majors.every((major) => major >= 5), 'the actions run on a Node the host is not retiring')
  assert.match(checker, /^ +run: node tools\/cairn-check\.mjs --base "\$CAIRN_BASE_REF"$/m, 'bare: a pipe would report the last command\'s status')
})

test('the job asks for the scopes its readings need, and no more', () => {
  const granted = WORKFLOW
    .slice(WORKFLOW.indexOf('permissions:'), WORKFLOW.indexOf('steps:'))
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line !== 'permissions:')
  // An explicit block makes every scope it omits `none`, so the list is the
  // whole of what this job may do — including the red-run reading, which is
  // `actions: read` and would otherwise be refused on the run it is for.
  assert.deepEqual(granted, ['contents: read', 'actions: read', 'pull-requests: write'])
})

test('the post-mortem runs only when the checker fails, keeps its reading, and commits nothing', () => {
  const incident = step('cairn-postmortem')
  assert.match(incident, /if: failure\(\) && steps\.cairn-check\.conclusion == 'failure'/,
    'only the CHECKER\'s failure: a red suite is a different incident, and this step would read a repository the checker never judged')
  assert.match(WORKFLOW, /^ +id: cairn-check$/m, 'the condition names a step id, so the id has to exist')
  // The post-mortem's own forge readings keep the token: a run count and a
  // request's timestamps are refused outright when the token may not see them,
  // never elided into a friendlier answer.
  assert.match(incident, /GITHUB_TOKEN: \$\{\{ secrets\.GITHUB_TOKEN \}\}/)
  assert.match(incident, /node tools\/cairn-postmortem\.mjs --branch "\$CAIRN_BRANCH" --base "\$CAIRN_BASE_REF"/,
    'on the trunk it reads the range the checker judged (ADR-034 decision 11)')
  assert.match(incident, /CAIRN_RUN_RED: 'true'/, 'the run it runs in is red, and the forge cannot say so yet (decision 9)')
  // `bash -e`: a non-zero exit before `cat` would lose the reading on exactly
  // the run it was written for, and the tool says why it stopped on stderr.
  assert.ok(incident.includes('> postmortem.txt 2>&1 || true'),
    'stderr is kept with the reading, and a non-zero exit does not abort the step before it is printed')
  const printed = incident.indexOf('cat postmortem.txt')
  const posted = incident.indexOf('gh pr comment')
  assert.notEqual(printed, -1, 'the reading reaches the run\'s log')
  assert.notEqual(posted, -1, 'and the request')
  assert.ok(printed < posted, 'the log has it even where the comment cannot be posted')
  assert.match(incident, /gh pr comment .*--body-file/, 'and posts it once where the review will read it')
  for (const forbidden of [/git commit/, /git push/, /git add/]) {
    assert.ok(!forbidden.test(WORKFLOW), `the workflow is not the branch's writer: ${forbidden}`)
  }
})
