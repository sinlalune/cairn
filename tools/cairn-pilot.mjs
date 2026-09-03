#!/usr/bin/env node
/**
 * cairn-pilot — the greenfield pilot, rerunnable.
 *
 * Drives a throwaway repository from `init` to `done` the way the skills say
 * to, on one transport, running the real checker at every gate and counting
 * the protocol files each stage writes. The 0.2 pilot (2026-09-01) was run by
 * hand once and found that an installed repository could not close an honest
 * path; this is that pilot as a command, so a release is measured rather than
 * asserted, and the number the conformance page states is the number this
 * prints.
 *
 *   node tools/cairn-pilot.mjs [--transport pull-request|manual-git] [--keep]
 *
 * On `pull-request` transport the forge's merge is simulated by the local
 * `--no-ff` merge the integrating checkout would fetch back, since a pilot
 * has no forge; everything before it — the request's description printed by
 * `cairn-audit`, the administrative commit, the checks on the exact
 * candidate — runs as it would. On `manual-git` the closing record is
 * scaffolded by the real command and the merge IS the integration.
 *
 * This repository's own tool, not installed: the kit measures a repository,
 * not itself.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { applyPlan, defaultOptions, planInstall } from './cairn.mjs'

const CHECK = 'tools/cairn-check.mjs'
const TODAY = new Date().toISOString().slice(0, 10)
const PATH_ID = 'CP-PILOT-001'
const BRANCH = 'path/cp-pilot-001'
const RECORD = `project/coding-paths/${PATH_ID}/index.md`
const STEP = `project/coding-paths/${PATH_ID}/steps/S01.md`

/** The pilot is its own author, so it runs where no identity is configured —
 *  a CI runner, a fresh machine — and the merge commit it makes is no
 *  exception. Found by the first CI run of this file. */
const IDENTITY = {
  ...process.env,
  GIT_AUTHOR_NAME: 'pilot', GIT_AUTHOR_EMAIL: 'pilot@example.invalid',
  GIT_COMMITTER_NAME: 'pilot', GIT_COMMITTER_EMAIL: 'pilot@example.invalid'
}

function git(dir, ...args) {
  return execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: IDENTITY }).trim()
}

function commit(dir, message, paths) {
  git(dir, 'add', ...paths)
  git(dir, 'commit', '-qm', message)
  return git(dir, 'rev-parse', 'HEAD')
}

function write(dir, path, content) {
  mkdirSync(dirname(join(dir, path)), { recursive: true })
  writeFileSync(join(dir, path), content)
}

function node(dir, script, ...args) {
  return execFileSync(process.execPath, [script, ...args], { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

/** The real checker's verdict, as the exit code and the finding rules. */
function gate(dir, ...args) {
  try {
    const out = node(dir, CHECK, '--json', ...args)
    return { ok: true, ...summarise(JSON.parse(out)) }
  } catch (error) {
    const parsed = error.stdout ? JSON.parse(error.stdout) : { findings: [] }
    return { ok: false, ...summarise(parsed) }
  }
}

function summarise(verdict) {
  const findings = verdict.findings ?? []
  return {
    blocking: findings.filter((f) => f.level === 'blocking').map((f) => f.rule),
    advisory: findings.filter((f) => f.level === 'advisory').map((f) => f.rule)
  }
}

/** Files under the project plane that a commit touched: the protocol's cost. */
function protocolFiles(dir, commitId, projectRoot) {
  return git(dir, 'diff-tree', '--no-commit-id', '--name-only', '-r', commitId)
    .split('\n').filter((f) => f.startsWith(`${projectRoot}/`) || f === 'cairn.lock.json')
}

function digestOf(dir) {
  return node(dir, CHECK, '--scope-digest', `${RECORD}#definition-of-done`).trim()
}

const record = ({ base, digest, status = 'running', subject = null, stepLinked = false }) => `---
type: Cairn Coding Path
title: ${PATH_ID} — the pilot's one constant
description: One exported constant, so the protocol's cost can be measured against the smallest change.
tags: [coding-path]
timestamp: ${TODAY}T00:00:00Z
cairn:
  id: ${PATH_ID}
  route: lightweight
  status: ${status}
  current_step: S01
  base_commit: ${base}
  branch: ${BRANCH}
  assigned_writer: pilot
  depends_on: []
  subject_commit: ${subject ?? 'null'}
  resolution: null
  writes:
    - src/**
    - docs/modules/application.md
    - project/coding-paths/${PATH_ID}/**
  governs:
    - docs/modules/application.md@${'0'.repeat(40)}
---

# ${PATH_ID} — the pilot's one constant

## Goal

The application exports one constant, and the path that delivers it is closed on one exact commit.

## Definition of done

- [ ] \`src/app.js\` exports \`app\`.
- [ ] The module note says so.

## Opening acceptance

\`\`\`yaml
decision: accepted
accepted_by: pilot-owner
accepted_roles: [initiator, reviewer]
accepted_at: ${TODAY}T09:00:00Z
scope_ref: ${RECORD}#definition-of-done
scope_digest: ${digest}
\`\`\`

Reviewed: route lightweight, one unit, one area. Amendments: none.

## Documentation coverage

### Required

- \`docs/modules/application.md\` — the area the constant lives in.

## Steps

${stepLinked ? '- **[S01](./steps/S01.md)** — the constant and its note — COMPLETE' : '- **S01** — in progress; its file is linked when it is written'}

## Resume

### Checkpoint

\`\`\`text
commit : ${base}
unit   : 0
base   : ${base}
trunk  : ${base}
\`\`\`

### Next action

Close the path.

### Blockers

None.

### Tried and rejected

- Nothing yet.

### Reading order

1. \`docs/modules/application.md\` — the one area.

### Verify

\`\`\`bash
npm run cairn-check
\`\`\`
`

const STEP_RECORD = `---
type: Cairn Coding Path Step
title: '${PATH_ID} S01 — the constant and its note'
timestamp: ${TODAY}T00:00:00Z
cairn:
  path: ${PATH_ID}
  step: S01
---

# ${PATH_ID} S01

### S01 — the constant and its note — **COMPLETE**

#### Plan

Export one constant and say so in the module note. Nothing else.

#### Work

\`\`\`cairn-unit
step: S01
unit: 01
type: implementation
verified: cairn-check
\`\`\`

- \`src/app.js\` exports \`app\`; the module note names it.

#### Self-review

One line of source, one line of note; nothing to refuse.

#### Verification

\`\`\`text
cairn-check : pass
\`\`\`
`

const closing = ({ subject, base, digest }) => `---
type: Cairn Closing Record
title: ${PATH_ID} — closing of ${subject.slice(0, 7)}
timestamp: ${TODAY}T10:00:00Z
cairn:
  path: ${PATH_ID}
  branch: ${BRANCH}
  subject_commit: ${subject}
  base: ${base}
  accepted_by: pilot-reviewer
  accepted_roles: [reviewer, integrator]
  accepted_at: ${TODAY}T10:00:00Z
  decision: accepted
  scope_ref: ${RECORD}#definition-of-done
  scope_digest: ${digest}
  advisories_at_candidate: []
  advisory_disposition: []
  verdict: clean
---

# ${PATH_ID} — closing of ${subject.slice(0, 7)}

## Findings

### Does the diff contradict an accepted decision?

No — there is none.

### Does it duplicate something another running path is building?

No — no other path runs.

### Did it introduce architecture that belongs in a decision record and has none?

No.

### Is anything now documented in two places that will drift apart?

No.

## Decision

Candidate accepted for administrative closure and exact integration.
`

const journal = ({ subject, merged }) => `---
type: Cairn Journal Entry
title: ${PATH_ID} — the pilot's one constant, integrated
timestamp: ${TODAY}T11:00:00Z
cairn:
  path: ${PATH_ID}
  subject_commit: ${subject}
  integration_commit: ${merged}
  outcome: completed
---

# ${PATH_ID} — integrated

One constant, one unit, one candidate, landed by the pilot.
`

/** Run the pilot. Returns what it measured; throws at the first gate that
 *  is not what the protocol says it should be. */
export function runPilot({ transport = 'pull-request', keep = false } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'cairn-pilot-'))
  const remote = `${dir}.git`
  const stages = []
  const stage = (name, expectOk, commitId, extra = {}) => {
    const verdict = gate(dir, ...(extra.args ?? []))
    const files = commitId ? protocolFiles(dir, commitId, 'project') : []
    stages.push({ name, ok: verdict.ok, blocking: verdict.blocking, advisory: verdict.advisory, protocolFiles: files })
    if (verdict.ok !== expectOk) {
      throw new Error(`pilot: at "${name}" the gate ${verdict.ok ? 'passed' : 'failed'} where it should ${expectOk ? 'pass' : 'fail'} — blocking: ${verdict.blocking.join(', ') || 'none'}`)
    }
    return verdict
  }
  try {
    // 1. Install, on a real remote.
    applyPlan(planInstall({ ...defaultOptions(), profile: 'ci', transport }), dir)
    git(dir, 'init', '-q', '-b', 'main')
    const install = commit(dir, 'Install Cairn', ['-A'])
    git(dir, 'init', '-q', '--bare', remote)
    git(dir, 'remote', 'add', 'origin', remote)
    git(dir, 'push', '-q', '-u', 'origin', 'main')
    stage('installed', true, install)

    // 2. Open: the record with its acceptance, registered before branching.
    const base = git(dir, 'rev-parse', 'HEAD')
    write(dir, RECORD, record({ base, digest: 'x' }))
    write(dir, RECORD, record({ base, digest: digestOf(dir) }))
    node(dir, 'tools/cairn-active.mjs')
    const registration = commit(dir, `Register ${PATH_ID} before branching`, [`project/coding-paths/${PATH_ID}`, 'project/coding-paths/ACTIVE.md'])
    if (git(dir, 'rev-parse', 'HEAD^') !== base) throw new Error('pilot: the registration parent is not the base')
    git(dir, 'push', '-q', 'origin', 'main')
    stage('registered', true, registration)
    git(dir, 'checkout', '-q', '-b', BRANCH)
    git(dir, 'push', '-q', '-u', 'origin', BRANCH)

    // 3. One unit: source, its note, the step, the refreshed resume section.
    write(dir, 'src/app.js', 'export const app = true\n')
    write(dir, 'docs/modules/application.md', readFileSync(join(dir, 'docs/modules/application.md'), 'utf8') + '\nExports `app`.\n')
    write(dir, STEP, STEP_RECORD)
    write(dir, RECORD, record({ base, digest: digestOf(dir), stepLinked: true }).replace('Close the path.', 'Close the path on the candidate S01 produced.'))
    const unitGate = gate(dir)
    if (!unitGate.ok) throw new Error(`pilot: the unit's pre-commit gate failed — ${unitGate.blocking.join(', ')}`)
    const unit = commit(dir, `${PATH_ID} S01: the constant and its note`, ['src/app.js', 'docs/modules/application.md', RECORD, STEP])
    git(dir, 'push', '-q', 'origin', BRANCH)
    stage('unit pushed', true, unit)

    // 4. The candidate: the trunk merged in (already contained), checks on C.
    git(dir, 'fetch', '-q', 'origin', 'main')
    git(dir, 'merge', '-q', 'origin/main')
    const candidate = git(dir, 'rev-parse', 'HEAD')
    const trunk = git(dir, 'rev-parse', 'origin/main')
    stage('candidate', true, null, { args: ['--base', 'origin/main'] })

    // 5. The review, where the transport keeps it.
    const review = node(dir, 'tools/cairn-audit.mjs', '--subject', candidate, '--branch', BRANCH)
    const closingFile = `project/coding-paths/${PATH_ID}/closing-${candidate}.md`
    if (transport === 'manual-git') {
      if (!existsSync(join(dir, closingFile))) throw new Error('pilot: cairn-audit did not scaffold the closing record')
      write(dir, closingFile, closing({ subject: candidate, base: trunk, digest: digestOf(dir) }))
    } else if (!review.includes(candidate)) {
      throw new Error("pilot: cairn-audit did not print the request's description for the candidate")
    }

    // 6. The administrative commit A: ready, the candidate, the view, nothing else.
    write(dir, RECORD, record({ base, digest: digestOf(dir), status: 'ready', subject: candidate, stepLinked: true })
      .replace('Close the path.', 'Close the path on the candidate S01 produced.')
      .replace(`commit : ${base}\nunit   : 0`, `commit : ${candidate}\nunit   : 01`))
    node(dir, 'tools/cairn-active.mjs')
    const beforeA = gate(dir, '--base', 'origin/main')
    if (!beforeA.ok) throw new Error(`pilot: the uncommitted closure failed its gate — ${beforeA.blocking.join(', ')}`)
    const closureFiles = [RECORD, 'project/coding-paths/ACTIVE.md', ...(transport === 'manual-git' ? [closingFile] : [])]
    const administrative = commit(dir, `Close ${PATH_ID} candidate ${candidate.slice(0, 7)}`, closureFiles)
    git(dir, 'push', '-q', 'origin', BRANCH)
    stage('ready', true, administrative, { args: ['--base', 'origin/main'] })
    if (git(dir, 'rev-list', '--count', `${candidate}..HEAD`) !== '1') throw new Error('pilot: more than one commit after the candidate')

    // 7. Integration: the merge (the forge's, simulated locally on pull-request),
    //    then the integrating commit with `done` and the journal entry.
    git(dir, 'checkout', '-q', 'main')
    git(dir, 'merge', '-q', '--no-ff', '--no-edit', BRANCH)
    const merged = git(dir, 'rev-parse', 'HEAD')
    write(dir, RECORD, readFileSync(join(dir, RECORD), 'utf8').replace('  status: ready\n', '  status: done\n').replace('  resolution: null\n', '  resolution: completed\n'))
    node(dir, 'tools/cairn-active.mjs')
    write(dir, `project/log/${TODAY}-${PATH_ID.toLowerCase()}.md`, journal({ subject: candidate, merged }))
    const beforeDone = gate(dir)
    if (!beforeDone.ok) throw new Error(`pilot: the integrating unit failed its gate — ${beforeDone.blocking.join(', ')}`)
    const integrating = commit(dir, `Integrate ${PATH_ID}`, [RECORD, 'project/coding-paths/ACTIVE.md', `project/log/${TODAY}-${PATH_ID.toLowerCase()}.md`])
    git(dir, 'push', '-q', 'origin', 'main')
    if (git(dir, 'merge-base', '--is-ancestor', candidate, 'origin/main') !== '') throw new Error('pilot: the candidate is not reachable from the remote trunk')
    stage('done', true, integrating)

    const distinct = new Set(stages.flatMap((s) => s.protocolFiles))
    return {
      transport,
      dir: keep ? dir : null,
      stages,
      perUnit: stages.find((s) => s.name === 'unit pushed').protocolFiles.length,
      lifecycle: distinct.size,
      files: [...distinct].sort()
    }
  } finally {
    if (!keep) {
      rmSync(dir, { recursive: true, force: true })
      rmSync(remote, { recursive: true, force: true })
    }
  }
}

function main(argv) {
  const transport = argv.includes('--transport') ? argv[argv.indexOf('--transport') + 1] : 'pull-request'
  const result = runPilot({ transport, keep: argv.includes('--keep') })
  console.log(`cairn-pilot — install to done on ${transport}: green at every gate`)
  for (const s of result.stages) {
    console.log(`  ${s.name.padEnd(12)} ${s.ok ? 'OK' : 'FAIL'}${s.advisory.length ? ` (${s.advisory.join(', ')})` : ''}${s.protocolFiles.length ? ` — protocol files: ${s.protocolFiles.join(', ')}` : ''}`)
  }
  console.log(`  one lightweight unit writes ${result.perUnit} protocol file(s); the whole lifecycle touches ${result.lifecycle}: ${result.files.join(', ')}`)
  if (result.dir) console.log(`  kept at ${result.dir}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
