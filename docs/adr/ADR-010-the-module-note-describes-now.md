---
type: Cairn Decision Record
title: ADR-010 — the module note describes now
description: A module note describes the current state of one implemented area and nothing of its history, which the journal holds; an area whose note every path touches is split by main component, and the open skill asks which area a path writes in. Promotes R39 and R30.
tags: [cairn, adr, 1.1, module-note, areas]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-010
  status: accepted
  date: 2026-09-06
---

# ADR-010 — the module note describes now

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S04

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q15 and the fourth removal of Q19) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R30 and R39). Both notes stay exactly as they were.

## Context

The kit installs one module note for the whole application, bound to every
source root, and every implementation unit must refresh it. On Crumbz every
path appended a line — *step 3 did this, step 4 did that* — until the note
was a forty-line history and CP-016 added a paragraph saying half of it was
out of date. The journal under `project/log/` already records what each
path did. The owner asked whether the note should split by component, and
answered yes.

## Decisions

### Decision 1 — the module note describes the current state only

Promotes **R39**, from the fourth removal of Q19. The owner's words:
*"the note describes only the current state; history stays in the
journal."*

A module note says what the area does now, where its boundaries are and
which tests prove it. It carries no per-step history and no dated
paragraphs; a unit that changes the area rewrites the sentences that are no
longer true and adds none about itself. What a path did is the journal's,
one file per integration.

What this changes: the concept `module-note` and the kit's module note
template in `tools/cairn.mjs`, which gain the sentence; the
`cairn-unit` skill's type table, where *the affected module note* becomes
*the affected module note, refreshed to the current state*. The Crumbz note
is the adopter's to rewrite.

### Decision 2 — a note every path touches is split by main component

Promotes **R30**, from Q15. The owner's choice: *"Yes, split by main
component, and the agent proposes the split when one note is being touched
by every path."*

The configuration already allows several areas, each with its match
patterns and its note. The kit's single starting area is a default, not a
shape. Two signals say *split*: an area whose note every path touches, or
an area whose match covers every source file. When a writer meets either,
the open skill has them propose the split to the owner as part of the path
record, and the open skill's step 1 asks which area a path's `writes:`
fall in, so a path that spans two areas knows it is on the `full` route.

What this changes: the `cairn-open` skill, step 1, two sentences; the
`areas` entry of the configuration reference, one sentence on when to add
an entry. No rule: which components an application has is the owner's
knowledge.

## Alternatives rejected

- **One note per application is fine** (Q15, as today): the forty-line
  note.
- **Keeping the history in the note with a *current state* heading above
  it**: two records of the same events, in two folders, drifting.
- **A rule that counts which paths touch a note**: the signal is visible
  to the writer who is about to touch it; a sentence reaches them earlier
  than an advisory would.

## Consequences

- A module note gets shorter with time, not longer.
- An adopter's configuration grows one `areas` entry per main component,
  each with its own note, and the `work-unit` rule already routes a
  source change to the right note.
- History is found in one place, the journal.

## What the manifesto's test weighed

Decision 1 is one of the four removals of Q19. Decision 2 keeps an option
tagged *a sentence in a skill*, on a mechanism the kit already has. Nothing
enters the checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the concept, the kit's template, the unit type table | concept `module-note`; `tools/cairn.mjs`; `cairn-unit` type table |
| 2 | the open skill, the configuration reference | `cairn-open` step 1; `spec/reference/configuration.md`, `areas` |
