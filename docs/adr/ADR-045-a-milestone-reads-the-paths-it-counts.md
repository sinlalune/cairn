---
type: Cairn Decision Record
title: ADR-045 — a milestone reads the paths it counts
description: A milestone of the roadmap register counts the paths its row names and those in the table under the heading ending with its short name; it reads *done*, dated from its last done path's journal entry, when every path it counts is done or archived and at least one is done, *running* otherwise or while a row there has no path yet — unless it counts no path or a path with no record, when it keeps its author's cell. Supersedes ADR-031 decision 2's *that path's* for a milestone. Promoted from CP-CAIRN-016's journal entry and the owner's ruling of 2026-09-25.
tags: [cairn, adr, 1.2, register, cairn-active]
timestamp: 2026-09-26T00:00:00Z
adr:
  id: ADR-045
  status: accepted
  date: 2026-09-25
---

# ADR-045 — a milestone reads the paths it counts

Status: accepted · 2026-09-25 · written by CP-CAIRN-017, S01

**Promoted from** the journal entry of
[CP-CAIRN-016](../../project/log/2026-09-26-cp-cairn-016.md) at blob
`fd04ab18b99823efbdffeb34297c5a092ccce973`, its section *What is owed*,
and the owner's ruling of 2026-09-25 that the same path's
[S01](../../project/coding-paths/CP-CAIRN-016/steps/S01.md) records. The
entry stays exactly as it was. Dated the day of the ruling, not of this
record.

## Context

[ADR-031](./ADR-031-one-place-for-a-fact.md) decision 2 has `cairn-active`
fill every state cell of the roadmap register, each *read from that
path's `status:`*. A milestone row is not one path: this repository's
1.1 and 1.2 rows name their promotion paths and say the rest are *the
coding paths below*, in a table under their own heading. `cairn-active` had to
answer for such a row, the owner ruled in the chat of 2026-09-25, and
the tool, its docblock, the tools' module note and CP-CAIRN-016's S01 say
the rule. No record does, so the 1.2 page still says a cell is read
*from each path's `status:`* where the tool reads several.

## Decision

A milestone counts the paths its row names and the paths named in the
table under the heading that ends with the milestone's short name — the
last word before the row's ` — ` (`Cairn 1.2` owns *The coding paths of
1.2*).

- It reads **done** when every path it counts is `done` or `archived` and
  at least one is `done`, dated from the journal entry of its last done
  path — the entry's file name; plain *done* where a done path has no
  entry.
- It reads **running** otherwise: while a path it counts is not finished,
  while a row of its table has no path yet, and when every path it counts
  is archived — an archived path holds nothing open and delivers nothing.
- It **keeps what its author wrote** while it counts no path, or counts a
  path with no record in this repository, before either reading above.

A path's own cell, in a coding-paths table, is still read from that
path's `status:`, dated from its journal entry when done. This supersedes
decision 2's *that path's* for a milestone and nothing else of ADR-031.

## Alternatives rejected

- **A milestone reading only the paths its row names**: here those are
  the promotions, done before the coding paths below them open, so the
  cell would read *done* while the milestone's work still runs.
- **A milestone's paths listed in a column of their own**: a second copy
  of the table below it, which the owner writes and nothing would keep in
  step.
- **Leaving the rule to the tool and its note**: a sentence of the 1.2
  page then says what the tool does not do, and an adopter writing a
  register reads no record of how to be counted.

## Consequences

- ADR-031 carries a line naming this record under decision 2; the 1.2
  page is amended in place, its sentence marked *since 2026-09-25*.
- An adopter's milestone is counted only when its row names its paths or
  a heading ends with its short name. Chapter 4 of the specification
  shows the first and not the second, and this path leaves the chapters
  unchanged; the sentence an adopter needs is a [backlog item](../../project/backlog/2026-09-26-chapter-4-does-not-say-how-a-milestone-is-counted.md).

## What the manifesto's test weighed

No rule, no new machinery: the record states what `cairn-active` has done
since CP-CAIRN-016.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| the milestone rule | nothing new; the live-view generator implements it since CP-CAIRN-016 | `tools/cairn-active.mjs`, `fillRegister`; `tools/cairn-active.test.mjs`; `docs/modules/application.md` |
