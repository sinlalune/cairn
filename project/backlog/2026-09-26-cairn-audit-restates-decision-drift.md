---
type: Cairn Backlog Item
title: cairn-audit restates the checker's decision-drift reading instead of importing it
description: The coherence scaffold's third fact — the architecture pages changed with no decision record beside them — is computed inline in cairn-audit, beside the same test written inline in the checker's decision-drift rule; the two can drift.
tags: [backlog, cairn-audit, cairn-check, decision-drift]
timestamp: 2026-09-26T00:00:00Z
---

# `cairn-audit` restates the checker's `decision-drift` reading instead of importing it

**What.** ADR-043 has `cairn-audit` scaffold, under the third coherence
question, the architecture pages the candidate's diff changed with no
decision record beside them — *the fact `decision-drift` already
computes*. The checker computes it inline in `evaluate()`, rule 6 of
`tools/cairn-check.mjs`, and exports nothing to call; so
`coherenceFacts` in `tools/cairn-audit.mjs` writes the same test again:
a file under the architecture root, and no file under the decisions
root. The other two facts import the checker's `writesOverlaps` and
`parseWrites`. If the rule changes — another root, another condition —
the scaffold keeps saying the old thing.

**Which path, and where.** Found by the coherence read of CP-CAIRN-016's
candidate `47d3292`, question 4, and named in request 33's description.
Not that path's scope: its definition of done keeps
`tools/cairn-check.mjs` unchanged.

**Owner.** sinlalune.

**Shape of the work.** In the next path that writes the checker, with
`2026-09-25-adopt-reads-links-as-the-checker-does-by-copy.md`, the same
kind of copy: the checker exports the reading as a pure function, rule 6
calls it, and `coherenceFacts` imports it and deletes its own. No
record.
