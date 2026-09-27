---
type: Cairn Decision Record
title: ADR-046 — what the release of 1.2 left to a record
description: Two rulings the owner gave while 1.2.0 was cut, recorded where a later writer reads them — a release's line per changed template is written in its changelog section, which `status` and the pointer page link, and `update` prints the diff alone, superseding ADR-015 decision 2's *`update` prints that line beside the diff*; and the fresh reader of a unit checks a claim by running the command that prints it, amending ADR-017's first consequence, *not the repository*. Promoted from CP-CAIRN-017's definition of done and its amendment of 2026-09-27.
tags: [cairn, adr, 1.2, update, changelog, review]
timestamp: 2026-09-27T00:00:00Z
adr:
  id: ADR-046
  status: accepted
  date: 2026-09-27
---

# ADR-046 — what the release of 1.2 left to a record

Status: accepted · 2026-09-27 · written by CP-CAIRN-017, S08

**Promoted from** the owner's rulings in the chat of 2026-09-26 and
2026-09-27, as the record of
[CP-CAIRN-017](../../project/coding-paths/CP-CAIRN-017/index.md) carries
them: its definition of done, item 3, and its amendment of 2026-09-27 on
the reader. The closing reader of that path's first candidate found both
living only in a path record, which is history once the path closes.

## Context

ADR-015 decision 2 has a release say in one line what it changed in each
template and `update` print that line beside the diff. ADR-039 gave the
line its place, the release's section of `CHANGELOG.md`, and ADR-031
decision 3 marked the printing *pending* against the release path. That
path, CP-CAIRN-017, wrote the lines into the changelog; `update` prints
the diff, and the pointer page it writes and `status` link the notes. The
owner ruled on 2026-09-26 that this is the mechanism, and the word
*pending* was cleared; the decision's text still promised the print.

ADR-017's first consequence says the unit's reader *reads the diff and
two criteria, not the repository*. Atomik's closing report asks that the
reader be told to check claims by running commands, which reads the
repository; the owner ruled on 2026-09-27 to add the clause to the unit
skill's fourth movement.

## Decisions

### Decision 1 — the line per changed template lives in the changelog

Supersedes [ADR-015](./ADR-015-a-release-reaches-an-edited-file.md)
decision 2's clause *`update` prints that line beside the diff; where
the line is missing, the diff alone is printed*.

A release that changes a template says in one line what it changed, in
the release's section of `CHANGELOG.md`. `update` prints the difference
for each edited file whose template changed, and nothing more; the
pointer page it writes, and `status` when a newer release exists, link
the release notes. The rest of decision 2 stands.

### Decision 2 — the reader checks a claim by running it

Amends [ADR-017](./ADR-017-the-review-movement.md)'s first consequence.

The reader is still given the diff and the two criteria and nothing
else. It checks a claim of the diff by running the command that prints
it, never by reading the prose alone — which reads the repository. No
criterion is added: running a command is how correctness is checked.

## Alternatives rejected

- **`update` printing the line**: a parser of the changelog in the
  installer for a sentence the pointer page already links, one click
  away; the owner ruled the link.
- **The rulings left in the path record**: a record closes and is not
  read by the next writer of ADR-015 or ADR-017, who would meet the older
  sentence.

## Consequences

- ADR-015 and ADR-017 carry a line naming this record under what it
  changes; the records' index lists it.

## What the manifesto's test weighed

No rule, no machinery: both decisions describe what the tools and the
skill do since CP-CAIRN-017.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | nothing new; the changelog carries the lines since 1.2.0 | `CHANGELOG.md`; `tools/cairn.mjs`, `pointerPage` and `status` |
| 2 | nothing new; the unit skill says it since CP-CAIRN-017 S07 | `skills/cairn-unit/SKILL.md`, movement 4 |
