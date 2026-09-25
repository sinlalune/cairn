---
type: Cairn Coding Path
title: Coding path 4 of 1.2 — the tools and this repository's files
description: The fourth implementation path of Cairn 1.2, row 4 of the roadmap register. `cairn-active` fills the register's state cells and reports a stale one; the post-mortem counts the run it runs in, prints a closed request as closed and reads the one path that arrived on the trunk, with the failure step of both workflows; `cairn-audit` reads a plain-list definition of done, scaffolds the three coherence facts and points a deferral at its backlog file; this repository's bootloader points at the pointer page; the post-mortem's GitHub reading is the installer's, imported — from four records and one backlog item, with the workflow's actions moved off the Node the host is retiring.
tags: [coding-path, implementation, cairn-1.2, tools, workflow]
timestamp: 2026-09-25T00:00:00Z
cairn:
  id: CP-CAIRN-016
  route: full
  status: running
  current_step: S01
  base_commit: b94ba4f8f0d80214ff6026e1425493a4f8a8a86c
  branch: path/cp-cairn-016
  assigned_writer: cp-cairn-016-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - tools/cairn-active.mjs
    - tools/cairn-active.test.mjs
    - tools/cairn-postmortem.mjs
    - tools/cairn-postmortem.test.mjs
    - tools/cairn-audit.mjs
    - tools/cairn-audit.test.mjs
    - tools/cairn-workflow.test.mjs
    - tools/cairn.mjs
    - tools/cairn.test.mjs
    - .github/workflows/cairn.yml
    - AGENTS.md
    - docs/modules/application.md
    - project/backlog/**
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-016/**
  governs:
    - docs/architecture/02-cairn-1-2.md@7629b51a86e8da3ee999ba6542e02f195ca1ffab
    - project/log/2026-09-25-cp-cairn-015.md@dab8e6c66e919aea3da8324bbd44a7fe8045371a
    - docs/adr/ADR-031-one-place-for-a-fact.md@a1df5c83ac44cc4c0addc8e0b6625ef231f5b197
    - docs/adr/ADR-034-housekeeping-with-no-choice-in-it-second-edition.md@ec2ed568d0d323ba8b09f128754fee3489004682
    - docs/adr/ADR-041-a-home-for-deferred-work.md@d44ae749c50bd55d1f2f672c0d7001b0e539e6cc
    - docs/adr/ADR-042-the-definition-of-done-is-a-plain-list.md@8ecf65485547f80fc14018382968c52bdb27ced3
    - docs/adr/ADR-043-the-coherence-questions-are-a-fresh-context-read.md@7278c2bc8d488002cd414163e75f3747c37e060f
---

# CP-CAIRN-016 — the tools of 1.2, and this repository's files

## Goal

This path makes the three tools beside the checker do what four records
of 1.2 decided, and settles what row 3 handed to row 4: `cairn-active`
writes every state cell of the roadmap register from the records and
reports one that disagrees, so a path's `status:` is the only place its
state is written; the post-mortem counts the red run it is running in,
prints a closed request as closed, and on the trunk reads the one path
that arrived, with both workflows' failure step saying what the tool
cannot see; `cairn-audit` reads a definition of done written as a plain
list as well as the boxed ones already accepted, scaffolds under each
coherence question the three facts it can see, and points a deferral at
its backlog file; this repository's bootloader names the pointer page.
It is the least because every change stands behind an accepted record or
a backlog item the owner placed, the post-mortem's own GitHub reading
goes and the installer's is imported instead of a third copy, and the
workflow's actions are moved off the Node the host is retiring in the
same unit that touches the file. It does not change the checker, the
installer's behaviour, the skills, the specification or the README: rows
2, 3 and 1 are done, and row 5 owns the release.

**What row 3 handed to this row.** Path 3's
[journal entry](../../log/2026-09-25-cp-cairn-015.md) leaves four things
here: the GitHub reading carried twice, by the installer and the
post-mortem — a
[backlog item](../../backlog/2026-09-25-two-copies-of-the-github-reading.md)
this path takes and deletes in the unit that lands it; `cairn-audit`
reading only a boxed definition of done; the host's warning that the
workflow's actions target a Node it is retiring; and the audit tool's
docblock saying the generated request template *does not carry these
sections yet*, which Atomik's update note found false. The other two
backlog items — the empty `steps/` folder and the copied link pattern —
are the skills' and the checker's, not this path's.

## Definition of done

- [ ] `cairn-active` fills every cell of the roadmap register that states
      a path's state — the State column of the milestone table and the
      state beside a path in a coding-paths table — from that path's
      `status:`, leaves a row that names no path as its author wrote it,
      keeps every other column and the tables' shape, and
      `cairn-active --check` reports a cell that disagrees with the records
      as it reports a stale view; the register template the kit installs
      carries the one row `cairn-active` knows as the installer's; one test
      proves the write and the check (ADR-031 decision 2). The register's
      state cells at the candidate are the tool's.
- [ ] The post-mortem counts the run it is running in as red when the
      workflow's failure step says so — one environment variable, set in
      `.github/workflows/cairn.yml` and in the workflow the kit generates —
      so the first red run never reads *no red run* (ADR-034 decision 9);
      keeps `state` and `closed_at` and prints a request that is closed
      and not merged as *closed* (decision 10); given the trunk, reads the
      path whose record changed in the compared range and prints that one,
      and where no record changed prints the checker's finding first and no
      path at all, both workflows passing the base (decision 11); the two
      tests and the workflow test prove each.
- [ ] The post-mortem imports its two GitHub helpers from the installer,
      which loads no host configuration, and its own copies are gone, one
      test proving the remote forms both read; the backlog item that asked
      for it is deleted in the unit that lands it. The workflow's actions
      are pinned at versions that run on a Node the host is not retiring,
      in `.github/workflows/cairn.yml` and in the workflow the kit
      generates, the workflow test following.
- [ ] `cairn-audit` reads each item of a definition of done from a plain
      list as from a boxed one, since accepted records keep their boxes
      (ADR-042); under each coherence question it scaffolds what it can
      see — the decision records the candidate's diff touches, the running
      paths whose `writes:` meet this path's, the architecture pages the
      diff changed with no record beside them — as the reader's starting
      point, with the first line naming the reader as ADR-017 decision 4
      has it (ADR-043); its advisories placeholder says a `deferred`
      disposition names a file under `project/backlog/` (ADR-041); its
      docblock no longer says the generated template lacks the sections;
      its test covers the two list shapes and the scaffold.
- [ ] This repository's `AGENTS.md` names `cairn/README.md`, the pointer
      page, as the kit's generated bootloader does (ADR-034 decision 5);
      `docs/modules/application.md` describes the three tools as they are
      at the candidate, with no history.
- [ ] Nothing under `skills/`, `spec/`, `tools/cairn-check.mjs`,
      `tools/cairn-pilot.mjs`, `cairn.lock.json`, `README.md` or `site/`
      changes, and `tools/cairn.mjs` changes only in `workflow()`, the
      register template and the export of its two GitHub helpers; the seven
      governing documents are byte-identical at the candidate to what they
      are at `base_commit`; the register gains this path's id in row 4 of
      1.2 by hand and every state cell by the tool, and nothing else.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section and a
      `current_step` that names it, one commit, a remote checkpoint, a
      self-review in the five tags and a `#### Review` section carrying the
      fresh-context read of its diff with each finding's disposition and
      the bounded second read; every commit follows a gate read green.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      closed as the close skill says: the administrative commit on the
      branch before the owner is asked to read, the coherence questions
      answered by a fresh context given its five inputs and the scaffold
      this path writes, the owner reading the register's cells and the
      request's description before the merge, the merge being the
      acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-25T15:02:17Z
scope_ref: project/coding-paths/CP-CAIRN-016/index.md#definition-of-done
scope_digest: sha256:c10fc92d938b15ac8306bb753d0d933c7609b5089174f583652d6b17b0768be4
```

Reviewed in the chat of 2026-09-25: route `full` because the path changes
the control plane — the three tools, the workflow, the bootloader; the
definition of done above; writes limited to the three tools and their
tests, the workflow and its test, the installer's `workflow()`, register
template and two exported helpers, the bootloader, the module note, the
backlog, the register's row and this folder, with no overlap because no
other path runs; the checker, the installer's behaviour, the pilot, the
lock, the skills, the specification, the README, the site, the records and
the notes excluded from change; governed by the 1.2 page, path 3's journal
entry and the five records row 4 implements, at their blob ids on `main`;
initial writer `cp-cairn-016-writer`. The owner read the plan — five
units, the actions bump folded in without a record, the audit tool reading
both list shapes, two backlog items left to other rows — and gave the
go-ahead in the chat with the word "go"; that go-ahead is this acceptance
(ADR-001 decisions 1 and 2), and the record lands on the trunk directly.
The units run in a fresh session. Amendments: none.

## Documentation coverage

### Required

- `project/log/2026-09-25-cp-cairn-015.md@dab8e6c6` — what row 3 handed
  to this row, in that path's words.
- `docs/architecture/02-cairn-1-2.md@7629b51a` — *what a record and the
  register may say*, *how a path closes*, *which tools exist*.
- The five records pinned in `governs:` after it — each unit reads the
  decisions it implements at their *what this changes* line before it
  writes.
- `project/backlog/2026-09-25-two-copies-of-the-github-reading.md` — the
  item this path takes; deleted when landed.

### Conditional

- `docs/adr/ADR-014-two-tools-of-1-1.md` and
  `ADR-025-a-red-run-is-read-before-the-next-unit.md` — why the
  post-mortem runs where it runs and who reads it.
- `docs/adr/ADR-008-housekeeping-with-no-choice-in-it.md` decision 5 —
  the advisory `cairn-active` already raises, which decision 2 of ADR-031
  stands beside.
- `docs/adr/ADR-017-the-review-movement.md` decision 4 — the first line
  naming the reader.
- `docs/adr/ADR-029-the-checker-asks-the-host-nothing.md` — the boundary
  the post-mortem's reading sits outside of; the import must not cross it.
- `project/coding-paths/CP-CAIRN-007/index.md` and its steps — how coding
  path 3 of 1.1 wrote the same three tools and the workflow.
- `feedbacks/2026-09-16-crumbz-update-to-1-1.md`, observations 7 to 9,
  and `feedbacks/2026-09-22-atomik-first-update.md`, observation 5 — the
  incidents behind the post-mortem's three fixes and the docblock.

### Deliberately excluded

- `tools/cairn-check.mjs` and the fixtures — row 2, done; the copied link
  pattern stays on the backlog for the next path that writes the checker.
- The installer's behaviour, the pilot, the lock — row 3, done; this path
  imports from `tools/cairn.mjs` and changes `workflow()` and the register
  template only.
- `skills/**` — the empty `steps/` folder stays on the backlog for the
  next path that writes the skills.
- `README.md`, `CHANGELOG.md`, the kit's counts, the site — row 5.
- `feedbacks/**` — read, never written.

## Steps

Forward steps live in [plan.md](./plan.md) until they are executed.

- **S01** — not started.

## Resume

### Checkpoint

```text
commit : the registration commit — this record and the live view, nothing else, on origin/main; unit 0
unit   : 0
base   : b94ba4f8f0d80214ff6026e1425493a4f8a8a86c
trunk  : b94ba4f8f0d80214ff6026e1425493a4f8a8a86c — origin/main at registration
```

### Next action

Start S01 with `cairn-unit` in the path's worktree: `cairn-active` and
the register's cells, as the plan's first item says.

### Blockers

None.

### Tried and rejected

- A record for moving the workflow's actions off the retiring Node — a
  version bump in a file this path already opens, with no choice in it;
  the unit that changes the workflow's failure step changes its actions.
- Reading the two GitHub helpers from the post-mortem into the installer,
  the other way round — the post-mortem imports the checker, which loads
  the host's configuration, and the installer runs where there is none;
  the backlog item names the direction.
- `cairn-audit` reading only the plain list, as the template now writes
  it — every path accepted before row 1 keeps its boxes, and this record
  is one of them.
- Leaving the audit tool's stale docblock to row 5 — one sentence in a
  file this path rewrites.
- Writing this record's own definition of done as a plain list — the
  audit tool reads it only after this path's third unit; the boxes stay
  unticked, and the first path opened after this one merges is the first
  with none.

### Reading order

1. `project/log/2026-09-25-cp-cairn-015.md@dab8e6c66e919aea3da8324bbd44a7fe8045371a` — what row 3 handed here.
2. `docs/architecture/02-cairn-1-2.md@7629b51a86e8da3ee999ba6542e02f195ca1ffab` — the three sections named above.
3. `project/coding-paths/CP-CAIRN-016/plan.md`, then the records the unit implements, at their *what this changes* lines.
4. `tools/cairn-active.mjs`, `tools/cairn-postmortem.mjs`, `tools/cairn-audit.mjs` — `INSTALLER_ROW`, `readRedRuns`, `readRequests`, `requestsReading`, `readingsFor`, `definitionItems`, `QUESTIONS`.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
