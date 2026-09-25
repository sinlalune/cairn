---
type: Cairn Backlog Item
title: How a milestone's state is derived is ruled in the chat and written in no record
description: ADR-031 decision 2 reads a state cell from "that path's status:"; for a milestone of several paths, the owner ruled in the chat of 2026-09-25 how cairn-active derives it, and the rule lives only in the tool, its note and CP-CAIRN-016's records.
tags: [backlog, register, cairn-active, adr-031]
timestamp: 2026-09-26T00:00:00Z
---

# How a milestone's state is derived is ruled in the chat and written in no record

**What.** ADR-031 decision 2 and the 1.2 page say a state cell of the
roadmap register is read from *that path's* `status:`. A milestone of
several paths has no one path, and two of this repository's name the
rest as *the coding paths below*. The owner ruled on 2026-09-25: a
milestone counts the paths its row names and those in the table under
the heading that ends with its short name; a done path is dated from its
journal entry's file name. As `cairn-active` implements it, the
milestone reads *done* with its last done path's date when every path
it counts is done or archived and at least one is done, and *running*
otherwise — a milestone whose every path was archived included — or
while a row there has no path yet; a milestone counting a path with no
record keeps what its author wrote. The rule is written only in its
docblock, the tools' module note and
CP-CAIRN-016's S01 — no record, and nothing an adopter reads before
writing a register.

**Which path, and where.** Found by the coherence read of CP-CAIRN-016's
candidate `eab7ddd`, question 3. Not that path's scope: it writes no
decision record and changes no page of the specification.

**Owner.** sinlalune.

**Shape of the work.** A promotion: one decision on ADR-031, superseding
decision 2's *that path's* for a milestone, as ADR-044 did for path 1's
leftovers — and, where the specification describes the register, the
sentence an adopter needs to write a milestone the tool can read.
