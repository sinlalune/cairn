---
type: Cairn Coding Path
title: Coding path 3 of 1.1 — the workflow and the tools
description: The third implementation path of Cairn 1.1, row 3 of the roadmap register. One run per commit that can land, the post-mortem tool on a red run and on demand, this repository's own test script, the register reported by the live view, the request's description printed in its new order; and the sentences the unit, open and close skills and the path template still owe from paths 1 and 2 — the reading of a red run, the writer's half of a step supersession, the two answers to an overlap, the refusal of an integrating merge object.
tags: [coding-path, implementation, cairn-1.1, workflow, tools, post-mortem]
timestamp: 2026-09-12T00:00:00Z
cairn:
  id: CP-CAIRN-007
  route: full
  status: ready
  current_step: S08
  base_commit: 4255c4c6c74db01c06d9594b6765d02847c8978e
  branch: path/cp-cairn-007
  assigned_writer: cp-cairn-007-writer
  depends_on: []
  subject_commit: c57d11c22687aeee0a1301063b2ef98d25df387f
  resolution: null
  writes:
    - .github/workflows/cairn.yml
    - .github/pull_request_template.md
    - tools/cairn-workflow.test.mjs
    - tools/cairn-postmortem.mjs
    - tools/cairn-postmortem.test.mjs
    - tools/cairn-audit.mjs
    - tools/cairn-audit.test.mjs
    - tools/cairn-active.mjs
    - tools/cairn-active.test.mjs
    - package.json
    - docs/modules/application.md
    - skills/cairn-unit/SKILL.md
    - skills/cairn-unit/reference.md
    - skills/cairn-open/SKILL.md
    - skills/cairn-close/SKILL.md
    - spec/reference/path-template.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-007/**
  governs:
    - docs/architecture/01-cairn-1-1.md@5169cada907b62f2882a2fc4379ca2b619a91a9d
    - project/log/2026-09-12-cp-cairn-006.md@21ebfb52098ede80aec9dd4a45d4e2e5842e2b5a
    - docs/adr/ADR-003-two-live-paths-on-the-same-files.md@2cb434e7e87842bd936f1d6c395fa3716d948af5
    - docs/adr/ADR-004-the-checker-reads-what-it-did-not.md@d3cfd7d9f01de54c342d755b0b20b8c65c92fb67
    - docs/adr/ADR-005-one-run-per-commit-that-can-land.md@2266c49b80037434beda60b03f00c514558c6bb5
    - docs/adr/ADR-008-housekeeping-with-no-choice-in-it.md@c4accd293ec3d2d546bd5e86c232c08406c357d4
    - docs/adr/ADR-014-two-tools-of-1-1.md@f27627d460a3d8494866df8bb4c256be0a18f540
    - docs/adr/ADR-018-two-sentences-of-the-cycle.md@f60c1ec05a742c831a3f69af474a881d21725fdb
    - docs/adr/ADR-021-what-a-session-writes-for-its-reader.md@723d1411a4b4ed338f0c89decffae38d4c3554fe
    - docs/adr/ADR-025-a-red-run-is-read-before-the-next-unit.md@f760917923af8b6cdd90854f0f24eaccb6776a38
---

# CP-CAIRN-007 — the workflow and the tools

## Goal

This path makes the forge judge each commit that can land exactly once,
gives a red run its post-mortem and its reader, and makes the two tools
that speak to the owner — the audit and the live view — say what 1.1
decided; and it writes the six sentences paths 1 and 2 found owed and
could not write. It is the least because every change stands behind a
record already accepted, the post-mortem is the reading half only, and
the owed sentences are one line each in files this path already opens
or opens for that line alone. It does not touch the checker, the kit's
installer, the specification's chapters, the layout reference, the
README or the site: those are paths 2, 4 and 5.

**The debts, and how this path resolves them.** Path 2's
[journal entry](../../log/2026-09-12-cp-cairn-006.md) names six things
it found and did not own. Four are sentences in the skills and the
template, and this path widens its writes by three files to carry them,
rather than leave four one-line debts to a path that does not exist: the
unit skill's resume movement sends the writer to a red run's post-mortem
before the next unit (ADR-025, the sentence row 3 already carries), and
its repair step says how a writer declares a same-branch step
supersession — `supersedes: <file>@<blob it replaces>..<blob it adds>`
in the repair step's own block, the shape the checker reads since path
2 — with the path template showing it (ADR-004 decision 6, repair 005);
the open skill's owner review gives the two answers to an overlap the
registration run reports, declare `depends_on` or accept the race in
one sentence (ADR-003); the close skill says the integrating commit is
never a merge object carrying the edit and never two paths in one
request, which the checker now refuses and no skill yet forbids (ADR-008
decision 2). The fifth is the `GITHUB_TOKEN` entry the checker's
workflow step needs so that the profile line reads the trunk's rules on
CI instead of *forge not read*; the workflow is this path's, and the
entry lands with the run trigger ADR-005 changes. The sixth, the
README's rule count and the 1.1 page's opening sentence, is path 5's and
stays named there.

Row 3 of the [roadmap register](../index.md) scopes the rest, and the
[1.1 page](../../../docs/architecture/01-cairn-1-1.md), sections *How a
path runs*, *How a path closes* and *Which tools exist*, states the
shape. The decisions it implements: one run per commit that can land
(ADR-005); the roadmap register reported while it carries the installer's
row (ADR-008 decision 5); `cairn-postmortem` on a red run and on demand,
and this repository's self-test as `cairn-test` (ADR-014); the request's
description with the definition of done item by item (ADR-018 decision
2), opening with three plain lines and the surface link (ADR-021
decision 2), and the post-mortem printing the facts a question to the
owner is built from and not the question (ADR-021 decision 3); the
reading of a red run (ADR-025).

## Definition of done

- [ ] `tools/cairn-postmortem.mjs` exists with its test: for one path or
      for the whole repository it prints, as facts and never a judgement,
      the registration commit and its parent against `base_commit`, the
      shape of the `ready` commit against the one administrative commit,
      the definition of done's digest recomputed against the acceptance in
      force, each step's integrity against its adding blob, the red runs
      per branch and the time from a request's opening to its merge when a
      token lets it read the forge, and nothing the forge cannot give
      without one; it prints what a question to the owner is built from
      and does not put the question (ADR-014 decision 1, ADR-021 decision
      3); `package.json` names it as `cairn-postmortem`.
- [ ] `.github/workflows/cairn.yml` runs once per commit that can land:
      the `push` trigger's branch list is the trunk alone, the request's
      run judges the request head (ADR-005); the checker's step carries
      `GITHUB_TOKEN` so the profile line reads the trunk's rules on CI;
      a step that runs only on the failure of the checker's step prints the
      post-mortem for the run's path into the log under its own name and,
      when the run belongs to a request, posts it once as a comment with
      the forge's token, committing nothing (ADR-014 decision 1); this
      repository's suite runs before the checker under the script
      `cairn-test`, and `test` is not a name the kit installs (ADR-014
      decision 2).
- [ ] `tools/cairn-audit.mjs` prints the request's description in the
      order the template gives: three plain lines and the surface link as
      placeholders, then one line per item of the definition of done read
      from the record, each with a place for the unit that advanced it and
      the command or page that shows it, then the ledger unchanged
      (ADR-021 decision 2, ADR-018 decision 2); its test proves the order.
- [ ] `tools/cairn-active.mjs` reports, beside the live view, a roadmap
      register that still carries the installer's row (ADR-008 decision 5);
      its test proves it.
- [ ] The unit skill's resume movement says the writer reads a red run's
      post-mortem — in the run's log or on the request — before the next
      unit, and nothing more is owed (ADR-025); its verify movement says
      the writer reads the request's run if a request is open, where it
      said *read CI* (ADR-005); its repair step, and the step shape in the
      path template, show how a same-branch step supersession is declared
      in the repair step's own block and say that both blob ids are the
      ones the record carries, read by the checker and never typed to
      satisfy it (ADR-004 decision 6, ADR-008 decision 6).
- [ ] The open skill's owner review names the two answers to an overlap
      the registration run reports — `depends_on` on the earlier path, or
      the race accepted in one sentence of the record (ADR-003); the close
      skill says the integrating commit is one commit for one path, never
      a merge object carrying the edit, never two paths in one request
      (ADR-008 decision 2).
- [ ] `docs/modules/application.md` describes the tools as they are at
      the candidate, the post-mortem tool included, with no history.
- [ ] Nothing under `tools/cairn-check.mjs`, `tools/cairn-rules.mjs`,
      `tools/cairn.mjs`, `spec/index.md`, `spec/reference/conformance.md`,
      `spec/reference/repository-layout.md`, `docs/adr/`,
      `docs/architecture/`, `README.md` or `site/` changes; the ten
      governing documents are byte-identical at the candidate to what they
      are at `base_commit`; the register, a write surface, gains this
      path's id in row 3, the widened files in its writes column, one new
      row for the readings that must not lie, and the kit halves of
      ADR-005 and ADR-014 named on row 4 — and nothing else.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, a self-review in the five tags and a
      `#### Review` section carrying the fresh-context read of its diff
      with each finding's disposition and the bounded second read; every
      behaviour change in a tool has its failing test first.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      reviewed in the pull request's description in the order the audit
      tool now prints; the administrative commit declaring `ready` and
      `subject_commit` is on the branch with its check green before the
      owner is asked to merge; the owner reads a red run's post-mortem on
      a request of theirs, or runs the tool on demand, before the merge;
      the merge is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-13T08:53:36Z
scope_ref: project/coding-paths/CP-CAIRN-007/index.md#definition-of-done
scope_digest: sha256:b7ef83dd357653074894365365cb891cf166aa6a4fc0288372b290f512918db9
```

Reviewed in the chat of 2026-09-12 and accepted on 2026-09-13: route
`full` because the path changes the workflow and the tools, control-plane
surfaces, and the skills; the definition of done above; writes limited
to the workflow, three tools and their tests, `package.json`, the tools'
module note, the unit, open and close skills, the path template, the
register's row and this folder, with no overlap because no other path
runs; the checker, the kit's installer, the chapters, the layout, the
records, the README and the site excluded from change; governed by the
1.1 page, path 2's journal entry and eight records at their blob ids on
`main`; initial writer `cp-cairn-007-writer`. The owner read the plan —
the six debts of path 2 resolved in the goal, three skill and template
files widened into the writes for four one-line debts, the post-mortem
importing the checker's readings — and gave the go-ahead in the chat
with the word "yes"; that go-ahead is this acceptance, and the record
lands on the trunk directly. The owner said the units run in a fresh
session. Amendments: none.

### Amendment of 2026-09-13 — the register may own what this path found

S02 mapped the forge's token into the checker's step and the run that
followed certified a protection this repository does not have; S03 took
the token back out. The owner was asked where the durable answer should
live, and answered: **its own row, before the release.** Asked first how
to end it at all, the owner's steer was to *refer to the manifesto, don't
build a messy complex factory, just do the simplest fluid native
workflow* — which is what chose the deletion in S03 over a stored
credential or a scope amendment reopening coding path 2's files.

This acceptance supersedes the one above it. It widens item 7, and
nothing else: the register may gain one row for the readings that must
not lie — the record saying a reading the forge withheld is reported as
unread and never as an answer, and the checker made to keep it — placed
before the release row so that 1.1.0 cannot be cut with it open; and row
4 may name the kit halves of ADR-005 and ADR-014, which this path found
belong to no row. The definition of done is otherwise the text it was
accepted with, and no other surface of this path moves.

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-13T13:10:00Z
scope_ref: project/coding-paths/CP-CAIRN-007/index.md#definition-of-done
scope_digest: sha256:c6305ca2ad5917c4612c3135d224d749b5a0a8d28eb36b1cf5a2817b6b2414b4
supersedes: 2026-09-13T08:53:36Z
```

## Documentation coverage

### Required

- `project/log/2026-09-12-cp-cairn-006.md` at its pinned blob — the six
  debts, in path 2's own words.
- `docs/architecture/01-cairn-1-1.md` at its pinned blob — *How a path
  runs*, *How a path closes*, *Which tools exist*.
- The eight records pinned in `governs:` — each unit reads the decisions
  its surface implements, at their *What implements this record* tables.
- `spec/reference/conformance.md`, the rows of `provisional` and
  `record-integrity` — the supersession shape the checker reads, which
  the writer's half must match word for word.

### Conditional

- `docs/cairn/manifesto.md` — read whenever the post-mortem would judge
  or recommend; it prints facts.
- `tools/cairn-check.mjs` — read to reuse what it already computes
  (the digest, the registration commit, the step integrity) rather than
  compute it twice; never written.
- The forge's documentation for the token a workflow step holds and for
  posting a comment on a request — read for the red-run step.

### Deliberately excluded

- `tools/cairn-check.mjs`, `tools/cairn-rules.mjs` — path 2, done; a
  fact the post-mortem needs and the checker computes is imported, not
  copied.
- `tools/cairn.mjs`, the kit's manifest and the layout reference —
  path 4, which lists the post-mortem tool and the script the kit installs.
- `README.md`, `site/**`, the 1.1 page's opening sentence — path 5.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- **S01** — the post-mortem tool — complete
- **S02** — one run per commit that can land — complete
- **S03** — the gate stops certifying what it cannot see (repair of S02) — complete
- **S04** — the register owns what this path found — complete
- **S05** — the two tools that speak to the owner — complete
- **S06** — the sentences the skills owed — complete
- **S07** — the tools as they are — complete
- **S08** — the record says which step it is on (repair) — complete

## Resume

### Checkpoint

```text
commit : c57d11c22687aeee0a1301063b2ef98d25df387f
unit   : 8 — the candidate C, checked bare and reviewed in the request
base   : 4255c4c6c74db01c06d9594b6765d02847c8978e
trunk  : 4255c4c6c74db01c06d9594b6765d02847c8978e — origin/main at registration
```

### Next action

From the worktree `../cairn-cp-cairn-007` on branch `path/cp-cairn-007`:
close the path with `cairn-close`. `C` is S08's commit, the trunk tip
already in it; regenerate the request's description with
`npm run cairn-audit -- --subject <C>`, re-fill it — item 2 named as
knowingly unmet, with S03 as the reason — then the administrative commit
`A` declaring `ready` and `subject_commit`, with the gate run BEFORE
committing and its check read green. Only then is the owner asked to
merge, and the owner reads a post-mortem before it.

Note for movement 6: pushes to path branches no longer run on the forge
(S02, ADR-005), but the request is open as a draft — [#16](https://github.com/sinlalune/cairn/pull/16)
— so every push is judged on the request head, and that run is the one to
read.

### Blockers

None.

**Three debts this path found and may not settle**, all named in S06 and
bound for this path's journal entry: `spec/reference/conformance.md`
still says the writer's half of the supersession *is not yet written*,
which S06 wrote; ADR-008 decision 2 says *never two paths in one request*
where the checker refuses two paths in one COMMIT and reasons in its own
comment for the narrower rule; and the checker's refusal of a merge
object carrying `done` is not gated by transport, while the close skill
prescribes exactly that merge on `manual-git`. Item 7 of the definition
of done holds all three files unchanged.

**One item of the definition of done is knowingly unmet, and the work
that lets it be met is now owned.** Row 5 of the
[roadmap register](../index.md) carries it — the record that makes the
checker's own sentence bind, and the change that keeps it — and sits
before the release row, so 1.1.0 cannot be cut with it open. Item 2 asks
that the checker's step carry `GITHUB_TOKEN` *so the profile line reads
the trunk's rules on CI*. S02 carried it and S03 took it back out,
because the token the forge gives a workflow cannot see a ruleset's
bypass list and the checker reads the elided field as a trunk nobody
bypasses — so carrying it made the gate certify a protection this
repository does not have (run `34756757308`; ruleset `22101008` carries
an always-bypass role). The clause cannot be satisfied natively until
`forgeGaps` can tell an unread bypass list from an empty one, which is
`tools/cairn-check.mjs` and which item 7 holds unchanged. The candidate
names this item as unmet, with S03 as the reason; it is the owner's to
rule on at the merge.

### Tried and rejected

- Leaving the four skill and template sentences to a later path — no row
  of the register owns the skills now that path 1 is done; four one-line
  debts with no owner is how a protocol drifts, and the owner agreed to
  the widening in the chat.
- Writing the post-mortem's reading by calling the checker as a process
  and parsing its output — the checker exports its readings as pure
  functions; the tool imports them.
- Pinning the register in `governs:` — a write surface, as in paths 1
  and 2.
- S01: exporting the checker's private Git plumbing —
  `recordShapes`, `recordHistory`, `frontAt`, `stepRecordOrigin` — so the
  post-mortem could import it instead of repeating it. Item 7 of the
  definition of done forbids a byte of `tools/cairn-check.mjs` moving,
  and path 2 closed on that file. The repetition is named as a debt in
  S01 and carried to this path's journal entry; the `--follow` guard
  that the repetition had already dropped is restored in S01.
- S02: exporting or fixing `readForge`'s per-ruleset degradation so the
  profile line cannot under-report a trunk's bypass actors when the
  workflow's token may not see them — `tools/cairn-check.mjs`, which item
  7 of the definition of done holds byte-identical. Named in S02's review
  and with the owner.
- S01: reading `done` beside `ready` in the administrative-commit
  reading. `done` is declared on the TRUNK by the integrating unit, never
  on the branch, so a branch reading would print a fact no commit of the
  branch carries; ADR-008 decision 2 gives the integration's shape to the
  checker, and ADR-014 decision 1 asks this tool for the `ready` commit.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md` as path 1 left it.
2. `project/log/2026-09-12-cp-cairn-006.md` at its pinned blob — the debts.
3. `docs/architecture/01-cairn-1-1.md` at its pinned blob — the three sections named above.
4. `project/coding-paths/CP-CAIRN-007/plan.md`, then the records the unit implements, at their tables.
5. `spec/reference/conformance.md`, the rows of `provisional` and `record-integrity`, before S04.

### Verify

```bash
npm run cairn-check
npm test
```
