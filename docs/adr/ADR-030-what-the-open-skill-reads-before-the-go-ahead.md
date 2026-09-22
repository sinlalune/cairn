---
type: Cairn Decision Record
title: ADR-030 — what the open skill reads before the go-ahead
description: Before the owner's go-ahead, the agent reads the plan for two holes the records left — a placeholder in a surface name, and a definition-of-done item that contradicts the record it cites — and puts them in the record's questions, so the owner answers once at the start and no unit stops on them later. Two sentences in `cairn-open` step 2; no rule. Promotes K01 and K02 of Cairn 1.2, from Q1.
tags: [cairn, adr, 1.2, cairn-open, opening]
timestamp: 2026-09-21T00:00:00Z
adr:
  id: ADR-030
  status: accepted
  date: 2026-09-21
---

# ADR-030 — what the open skill reads before the go-ahead

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S01

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q1, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 1, K01 and K02). Both
lines come from observations 1 and 3 of
[CP-CAIRN-009's writer](../../feedbacks/2026-09-15-cp-cairn-009-writer-feedback.md).
All three notes stay exactly as they were.

## Context

Twice in coding path 4 of 1.1 a unit stopped in the middle on a hole the
records had left open and the plan had carried past the go-ahead:

- ADR-011 decision 2 named the second concept folder
  `docs/concepts/<project>`, and the 1.1 page and chapter 6 carried the
  same angle brackets. S02 found that the kit has no project name to write
  there, put three options to the owner in the chat, and waited.
- The path's second item asked the kit's bootloader to say `npm test` is
  an alias of `cairn-test`; ADR-014 decision 2, which the item cites, says
  the kit installs no suite. The item was sealed by the acceptance's
  digest, so S01 could read it but not edit it, and ruled the reading
  alone.

Both holes were visible in the plan before the go-ahead. `cairn-open`
step 2 says what the owner reviews — the outcome, the route, the
definition of done, the surfaces, the exclusions, the writer (ADR-001
decision 2) — and nobody was told to read for these two.

## Decisions

### Decision 1 — a placeholder in a surface name is a question at the go-ahead

Promotes **K01**, from Q1.

When the agent scopes a path from records, an angle-bracketed name in a
surface those records name — a folder, a file, a field — is a decision
the record left open. It goes into the record's questions before the
go-ahead, where the owner answers it once, and not into a unit's chat
where the path stops.

### Decision 2 — each item of a definition of done is read against the record it cites

Promotes **K02**, from Q1.

Before the go-ahead, the agent reads each item of the definition of done
once against the decision it names and corrects the item, so the owner
accepts items that agree with their records. Before the acceptance the
correction is free; after it, a change is a second acceptance block
(ADR-001 decision 2).

What this changes, by today's names: `skills/cairn-open/SKILL.md`,
step 2 — two sentences beside the owner's reading of the plan. No rule,
no fixture, no template field: the checker does not read a plan's
questions, and the digest already binds the item once it is accepted.

## Alternatives rejected

- **As today — the unit stops when it meets the hole and asks then**
  (Q1, second option, *simplest*): refused by the owner. It costs a
  stopped unit and a waiting path for a question that was readable at the
  plan.
- **A rule that refuses a placeholder in a record's surface name**: a
  check on prose, for a shape met once; the manifesto's first threat.
- **A field of the path template for open questions**: the record already
  has the place — the questions put in the chat and written into the
  record before the acceptance (ADR-001 decision 2, ADR-021 decision 3);
  a field would be a second copy.

## Consequences

- The opening is one read longer, and a hole the records left is answered
  where the plan is, not where the code is.

## What the manifesto's test weighed

Nothing is checked, rendered or stored; the two reads are the agent's, at
the one moment the owner is already reading.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the open skill | `skills/cairn-open/SKILL.md`, step 2 |
| 2 | the open skill | `skills/cairn-open/SKILL.md`, step 2 |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
