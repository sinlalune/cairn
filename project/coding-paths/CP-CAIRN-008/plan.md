---
type: Cairn Coding Path Plan
title: CP-CAIRN-008 — forward plan
description: The units of coding path 5 of 1.1 — the record first, then the forge reading and the token, then the two rules, then the leftovers widened in, then the module note and the candidate.
tags: [coding-path, plan, implementation, checker, forge]
timestamp: 2026-09-14T00:00:00Z
cairn:
  path: CP-CAIRN-008
---

# CP-CAIRN-008 — forward plan

Read when planning, never before every step. Each unit implements the
record its reading extends and nothing else; every behaviour change has
its failing test first; a withheld reading is reported, never refused
and never answered for. Each unit runs the review movement on its own
diff, as the unit skill says, and sets `current_step` to the unit whose
block is in the commit.

1. **S01 — ADR-026, the readings that must not lie.** Type `decision`.
   Four decisions, promoted from path 3's S03 and journal: a reading the
   forge withheld is reported as unread and never as an answer, the
   profile line naming what it could not read (extends ADR-001 d6); the
   `review` rule judges the ledger's newest completed unit and
   `current_step` selects nothing (extends ADR-017 d2); one commit for
   one path is the reading that binds, and *never two paths in one
   request* is superseded by it; the merge-object refusal binds on
   `pull-request` integration transport alone, `manual-git`'s `--no-ff`
   merge being the integrating unit (extends ADR-008 d2). The forge's
   documentation cited for what a workflow's token may read. The 1.1 page
   amended in place, marked *since 2026-09-14*; the two indexes; the
   register's row 5 carrying the widened writes.
2. **S02 — the forge reading and the token.** `forgeGaps` reports a
   bypass list the token could not read as *not read*, never as empty;
   `readForge` names the half it could not read; the profile line prints
   read, withheld and unenforced in one line; the cases rewritten, the
   withheld case first and failing; then `GITHUB_TOKEN` returns to the
   checker's step of the workflow, its comment rewritten to say why it is
   safe now, and the request's own run on this repository is read to
   print the bypass as unread.
3. **S03 — the two rules.** `review` reads the ledger's newest completed
   unit, the `find(…) ??` gone, with the fixture of an older
   `current_step` and an empty newer review; `acceptance` gates the
   merge-object refusal by the declared integration transport, with a
   fixture for each, and its comment and test say one commit for one
   path. The catalogue and the matrix regenerated; `tools/soundness.md`
   one line per changed reading.
4. **S04 — the leftovers.** The conformance page's stale sentence on the
   supersession's writer half, pointed at the unit skill; the close
   skill and its reference saying what the checker refuses and allows by
   transport, in ADR-008 d2's sentences; the post-mortem importing the
   checker's exported readings and calling Git for nothing the checker
   already reads, the checker exporting what the tool needed and nothing
   more; the post-mortem's tests green on the same fixtures.
5. **S05 — the module note.** `docs/modules/application.md` describes
   the checker and the post-mortem as they are.
6. **S06 — the candidate.** Trunk merged in, gates bare, the request
   opened with the description the audit tool prints; the administrative
   commit on the branch and its check green before the owner is asked;
   the owner reads the profile line the request's run prints, with the
   token, before the merge.
