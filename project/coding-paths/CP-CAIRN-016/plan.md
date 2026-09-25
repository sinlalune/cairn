---
type: Cairn Coding Path Plan
title: CP-CAIRN-016 — forward plan
description: The units of coding path 4 of 1.2 — one tool per unit with its test, the workflow with the post-mortem, this repository's files, the candidate.
tags: [coding-path, plan, cairn-1.2, tools]
timestamp: 2026-09-25T00:00:00Z
cairn:
  path: CP-CAIRN-016
---

# CP-CAIRN-016 — forward plan

Read when planning, never before every step. Each item is one work unit.
A unit that changes a tool changes its test in the same commit; a unit
that changes what the workflow passes changes both workflows — the
repository's file and the one `workflow()` generates — and the workflow
test together.

1. **S01 — `cairn-active` and the register's cells.** The tool writes
   every state cell from the records and `--check` reports one that
   disagrees; the installed register template's row is the one the tool
   knows; the register's cells at this unit are the tool's; one test
   (ADR-031 decision 2).
2. **S02 — the post-mortem and the two workflows.** The current run
   counted red from the failure step's variable (ADR-034 decision 9); a
   closed request printed closed (decision 10); the trunk reading the one
   path that arrived, the base passed (decision 11); the two GitHub
   helpers imported from the installer and the post-mortem's copies gone,
   the backlog item deleted; the actions moved off the retiring Node; the
   post-mortem test and the workflow test.
3. **S03 — `cairn-audit`.** Items read from a plain list as from a boxed
   one (ADR-042); the coherence scaffold under each question with the
   first line naming the reader (ADR-043); the deferral pointing at a
   backlog file (ADR-041); the docblock corrected; its test.
4. **S04 — this repository's files.** `AGENTS.md` naming the pointer page
   (ADR-034 decision 5); `docs/modules/application.md` describing the
   three tools as they are.
5. **S05 — the candidate.** Trunk merged in, gates bare, the register's
   row 4 of 1.2 naming this path by hand and its cells by the tool; then
   the close skill's order: the administrative commit, the fresh-context
   coherence read in the request's description — the first scaffolded by
   the tool this path wrote — the owner's reading, the merge.

## What the units must not do

Change the checker, the installer's behaviour, the pilot, the lock, the
skills or the specification. Commit before the gate is read green.
