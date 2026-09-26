---
type: Cairn Backlog Item
title: Neither closing commit may carry the register cells cairn-active writes
description: The administrative commit and the integrating one carry only the record, the live view and the journal entry, so the register's generated state cell for the closing path is stale from ready until a separate register commit on the trunk.
tags: [backlog, register, cairn-active, cairn-check, cairn-close]
timestamp: 2026-09-26T00:00:00Z
---

# Neither closing commit may carry the register cells `cairn-active` writes

**What.** ADR-031 decision 2 has `cairn-active` write every state cell of
the roadmap register from the records. A path moves to `ready` in its
administrative commit and to `done` in the integrating one, and the
checker lets each carry only the record, the live view and — on the
trunk — the journal entry: the register is an implementation surface,
and a change to it after the candidate voids the candidate. So the
closing path's cell reads `running` from `ready` until a separate commit
on the trunk regenerates it, as rows 2 and 3 of 1.2 were written by hand
before the tool; and a writer who runs `npm run cairn-active` for the
live view, as the close skill says, has the register rewritten too and
restores it before the gate.

**Which path, and where.** Found by CP-CAIRN-016 when its administrative
commit on `47d3292` was refused under `acceptance`. That path's S07
made `cairn-active --check` report a stale cell without the exit code the
checker's `derived-view` reads, as ADR-031 rejected a checker rule on
the cell; a refusal there had made every closure impossible. Not that
path's scope to go further: the checker, the close skill and the
reference are excluded from its writes.

**Owner.** sinlalune.

**Shape of the work.** In the next path that writes the checker and the
close skill: the register's state cells join the surfaces the closing
commits may carry (or the integrating commit alone, the owner's choice),
the `npm run cairn-active` line of `skills/cairn-close/reference.md`
says so, and `--check` gives a stale cell the exit code again, as
ADR-031 decision 2's *as it reports a stale view* reads.
