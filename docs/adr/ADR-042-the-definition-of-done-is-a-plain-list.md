---
type: Cairn Decision Record
title: ADR-042 — the definition of done is a plain list
description: The path template writes the definition of done as plain list items, not checkboxes, so nothing inside the text the scope digest pins looks like a control to tick; records already accepted keep their text, and the `scope-digest` rule does not change. Supersedes ADR-002 decision 2. Promotes K34 of Cairn 1.2, from Q19.
tags: [cairn, adr, 1.2, path-template, scope-digest, cairn-open]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-042
  status: accepted
  date: 2026-09-21
---

# ADR-042 — the definition of done is a plain list

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S04

This record **supersedes** decision 2 of
[ADR-002](./ADR-002-the-checkboxes-stay-and-the-seal-is-checked-everywhere.md)
— *the checkboxes stay* — in full. Decision 1 of that record, the seal
judged at every transition on every ref, stands and is what makes this
one cost nothing.

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q19, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 7, K34). The line
comes from [ECOS's third note](../../feedbacks/2026-09-18-ecos-checkboxes-inside-the-scope-digest.md).
All three stay exactly as they were.

## Context

On 2026-09-06 the owner kept the checkboxes of the definition of done
and asked the tool to catch every tick (Q7 of 1.1, ADR-002 decision 2),
because the boxes are the readable outcome list. The `scope-digest` rule
catches them: a tick edits the text the opening acceptance pinned, and
the gate goes red. ECOS's agent ticked them anyway, as its note of
2026-09-18 says — a box is an instruction to tick it — and paid a `repair` unit that moved
nothing in the product: the seven boxes restored, a step written to name
the violation. It was the third adopter's agent to do it.

## Decision

### Decision 1 — plain list items, no boxes

Promotes **K34**, from Q19, first option.

The path template writes the definition of done as `-` items. What a
path completed is stated by the closing review and the journal entry,
as ADR-002 already said; now nothing in the pinned text invites a
gesture the rule forbids. The `scope-digest` rule does not change and
normalises nothing: a tick in a record that still carries boxes is still
an edit of the pinned text, and is still refused. Records already
accepted keep their text — their digests pin it — and a path opened
from the new template carries no box.

What this changes, by today's names: `spec/reference/path-template.md`,
the list and the sentence beside it that says ticks are never added;
`skills/cairn-open/SKILL.md`, step 1's sentence; `skills/cairn-close/SKILL.md`,
step 2's clause *the record's own checkboxes stay as they are*;
`definitionItems` in `tools/cairn-audit.mjs`, which reads an item only
from a boxed line, and its test's fixtures; the record the pilot writes,
`tools/cairn-pilot.mjs`, whose two items are boxes.

## Alternatives rejected

- **Keep the boxes, ignore their state** (Q19, second option, *one
  substitution in the digest*): a rule taught to overlook the one edit
  the notation invites, so that the notation can stay; the box would
  still be ticked, and the record would then say *done* in two places.
- **Keep it as decided** (Q19, third option, *as today*): the third
  adopter's agent ticked them; the fourth will.
- **A warning in the skill** (the note's *not this*): a sentence against
  a gesture the notation asks for, broken again by the next writer who
  has not read it.

## Consequences

- No new path invites the tick; the `repair` unit ECOS paid is not paid
  again.
- ADR-002 decision 2 carries a superseded mark, and the 1.1 page's three
  sentences on the checkboxes are marked *superseded by* this record.

## What the manifesto's test weighed

Q19's option is tagged *simplest*: it removes the control and changes no
rule.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the path template; the open and close skills; the audit tool's item reading and its test; the pilot's record | `spec/reference/path-template.md`; `skills/cairn-open/SKILL.md`, step 1; `skills/cairn-close/SKILL.md`, step 2; `definitionItems` in `tools/cairn-audit.mjs` and `tools/cairn-audit.test.mjs`; `tools/cairn-pilot.mjs` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
