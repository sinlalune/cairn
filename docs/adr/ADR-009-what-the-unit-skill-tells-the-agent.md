---
type: Cairn Decision Record
title: ADR-009 — what the unit skill tells the agent
description: Three sentences in the skills and no new check — a repair corrects a protocol violation and names it, every unit plan names the definition-of-done item it advances, and no object id is ever typed by hand. Promotes R25, R26 and R27.
tags: [cairn, adr, 1.1, skills, repair, unit-plan]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-009
  status: accepted
  date: 2026-09-06
---

# ADR-009 — what the unit skill tells the agent

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S04

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q14) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R25, R26, R27). Both notes stay exactly as they were.

## Context

Three instructions the agents misread, each fixed by one sentence where
the choice is made. On Crumbz `repair` was used eleven times in one day
for ordinary product fixes, once for a real violation; one path grew six
units past its accepted outcome because nothing asked which outcome a unit
advances; and a commit id was typed by hand once, to satisfy a message.
The owner's choice, Q14: *"Yes. Three sentences in the skills, no new
check."*

## Decisions

### Decision 1 — `repair` is defined where the type is chosen

Promotes **R25**.

The unit skill's type table says, on the `repair` row: a repair corrects
a protocol violation and names it; a bug in the product is an
`implementation` unit. The specification's table under *advance one work
unit at a time* carries the same sentence.

### Decision 2 — the unit plan names the definition-of-done item it advances

Promotes **R26**.

The plan section of every step names the item of the definition of done
the unit advances. A unit that advances none is the signal to stop and
either amend the scope with a superseding acceptance or open another path.
The skill says it in step 1; the step template shows the line.

### Decision 3 — no object id is typed by hand

Promotes **R27**.

Every object id a record carries — `base_commit`, `subject_commit`, a
checkpoint, a pinned blob in `governs:` — is the output of a Git command
or of the checker, pasted, never typed or edited to satisfy a refusal. The
open skill gives `base_commit` the rule the digest already has: computed
with the command that will verify it. The rule the message must name is
ADR-008 decision 6.

## What this changes

The `cairn-unit` skill, step 1 and its type table; `spec/index.md`, the
type table of chapter 5; `spec/reference/path-template.md`, the step
shape; the `cairn-open` skill, step 3, one sentence beside the digest's.

## Alternatives rejected

- **Later** (Q14).
- **A check for decision 2**: a checker cannot judge which item a unit
  advances; the sentence is the whole remedy.
- **A check for decision 3**: the checker already recomputes every id it
  reads; the fault was the agent's reflex, and the reflex is answered by
  the message (ADR-008 decision 6) and by this sentence.

## Consequences

- Three skills and the specification gain four sentences.
- The eleven Crumbz misuses of `repair` are not renamed; a step is
  append-only.

## What the manifesto's test weighed

The option kept is tagged *three sentences in the skills, no new check*.
Nothing enters the checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the unit type table, twice | `cairn-unit` type table; `spec/index.md` chapter 5 |
| 2 | the unit skill and the step template | `cairn-unit` step 1; `spec/reference/path-template.md` |
| 3 | the open skill | `cairn-open` step 3 |
