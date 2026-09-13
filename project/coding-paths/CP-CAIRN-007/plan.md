---
type: Cairn Coding Path Plan
title: CP-CAIRN-007 — forward plan
description: The units of coding path 3 of 1.1 — the post-mortem tool first because the workflow's red-run step calls it, then the workflow, then the two tools that speak to the owner, then the owed sentences in the skills and the template, then the module note and the candidate.
tags: [coding-path, plan, implementation, workflow, tools]
timestamp: 2026-09-12T00:00:00Z
cairn:
  path: CP-CAIRN-007
---

# CP-CAIRN-007 — forward plan

Read when planning, never before every step. Each unit implements the
records its surface names and nothing else; every behaviour change in a
tool has its failing test first; the post-mortem prints facts and no
judgement. Each unit runs the review movement on its own diff, as the
unit skill says.

*Numbering: a repair took S03, so units 3 to 6 below run as S04 to S07.*

1. **S01 — the post-mortem tool.** `tools/cairn-postmortem.mjs` and its
   test: for one path or the repository, the readings ADR-014 decision 1
   lists — registration commit and parent against `base_commit`, the
   `ready` commit against the administrative commit, the digest against
   the acceptance in force, each step against its adding blob — computed
   by the functions the checker exports, and, with a token, the red runs
   per branch and the opening-to-merge time from the forge; a table of
   facts, the question left to the writer (ADR-021 decision 3); the
   `cairn-postmortem` script in `package.json`.
2. **S02 — the workflow.** ADR-005: the `push` trigger's branch list is
   the trunk alone; the request's run judges the request head. The
   checker's step gains `GITHUB_TOKEN` so the profile line reads the
   trunk's rules. A step on the checker's failure runs the post-mortem
   for the run's path into the log and, on a request, posts it once as a
   comment with the forge's token, committing nothing (ADR-014 decision
   1). This repository's suite runs before the checker as `cairn-test`,
   and `test` leaves `package.json` (ADR-014 decision 2).
3. **S03 — the two tools that speak to the owner.** `cairn-audit`
   prints the description in the template's order: three plain lines and
   the surface link, the definition of done item by item read from the
   record, then the ledger (ADR-021 decision 2, ADR-018 decision 2);
   `cairn-active` reports a register still carrying the installer's row
   (ADR-008 decision 5). Tests first for both.
4. **S04 — the owed sentences.** `cairn-unit` movement 0 reads a red
   run's post-mortem (ADR-025); movement 5 reads the request's run if one
   is open (ADR-005); the repair step, and the step shape in
   `spec/reference/path-template.md`, declare a same-branch step
   supersession in the repair step's block, both blobs the ones the
   record carries (ADR-004 decision 6, repair 005); `cairn-open`'s owner
   review names the two answers to an overlap (ADR-003); `cairn-close`
   forbids the integrating merge object and the two-path request
   (ADR-008 decision 2). One sentence each; the skills name no record.
5. **S05 — the module note.** `docs/modules/application.md` describes
   the tools as they are, the post-mortem included, no history; the
   register's row 3 carries the widened writes.
6. **S06 — the candidate.** Trunk merged in, gates bare, the request
   opened with the description the audit tool now prints; the
   administrative commit on the branch and its check green before the
   owner is asked; the owner reads a post-mortem, on a red run of theirs
   or on demand, before the merge.
