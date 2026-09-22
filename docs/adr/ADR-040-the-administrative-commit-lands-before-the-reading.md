---
type: Cairn Decision Record
title: ADR-040 — the administrative commit lands before the reading
description: On `pull-request` transport with one owner, the writer lands the administrative commit on the branch before asking the owner to read and try the candidate, since the candidate is fixed by then and the commit changes nothing the owner reads; an owner who reads and clicks merge then integrates a path whose `ready` is already on the branch. One reorder in the close skill and the execution protocol; no rule changes. Promotes K32 of Cairn 1.2, from Q17.
tags: [cairn, adr, 1.2, cairn-close, closure, pull-request]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-040
  status: accepted
  date: 2026-09-21
---

# ADR-040 — the administrative commit lands before the reading

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S04

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q17, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 7, K32). The line
comes from [ECOS's first note](../../feedbacks/2026-09-17-ecos-merge-before-administrative-commit.md).
All three stay exactly as they were. It supersedes no record: ADR-001
decisions 3 and 4 — the owner tries the result before the merge, and
the merge click is the acceptance — stand, and this record orders what
comes before the try.

## Context

The close skill puts the administrative commit `A` — `status: ready`,
`subject_commit: C`, the view, the checkpoint — in step 4, after the
owner's reading and acceptance in step 3 and before the merge in step 5.
On `pull-request` transport with one owner holding every role, the
acceptance is the merge click (ADR-001 decision 4). An owner who does
what the skill says — reads the pages, tries the result, clicks merge —
has merged before `A` exists; `A` is stranded on the branch, the
integrating unit fails `transition` for running → done with no `ready`
behind it (ADR-001 decision 7), and the writer repairs by landing `A` on
the trunk after the merge, which the record then has to explain. ECOS
met it, as its note of 2026-09-17 says.

`A` changes nothing the owner reads: the candidate `C` is fixed before
either, and `A` carries the closure surface alone.

## Decision

### Decision 1 — on `pull-request` with one owner, `A` lands before the owner is asked to read

Promotes **K32**, from Q17, first option.

The writer produces the candidate, runs the gate on it, lands `A` on the
branch, and only then asks the owner to read the pages and try the
result. The owner's merge click then integrates a branch whose `ready`
is already there, and the integrating unit records `ready` → `done` as
ADR-001 decision 7 requires. Where a reviewer who is not the writer
approves the request, the same order holds: `A` is made when the gate is
green on `C`, and approval binds `C`, the digest and the base as before.
On `manual-git` nothing changes: `A` carries the closing record with its
acceptance fields, so it always followed the reading and still does.

No rule changes. `transition` and `acceptance` read the same commits in
the same order; only the moment the owner is asked moves.

What this changes, by today's names: `skills/cairn-close/SKILL.md`,
steps 3 and 4 swapped, and `skills/cairn-close/reference.md` where it
sequences them; `spec/reference/execution-protocol.md`, the closure
list's steps 4 and 5; chapter 5 of `spec/index.md` where it gives the
same order; the concept `spec/concepts/administrative-closure.md`, one
sentence.

## Alternatives rejected

- **`transition` accepting the merge as the approval** (Q17, second
  option, *a change to a rule*): refused by the owner; a rule widened
  for a skill's ordering, where the ordering costs nothing.
- **As today — the skill tells the owner to wait for the commit** (Q17,
  third option): the owner did what the skill said and the commit was
  stranded; a sentence telling a one-click owner to wait is the sentence
  ECOS's owner did not see.

## Consequences

- A sole owner on `pull-request` never strands `A`; the repair ECOS made
  on the trunk is not made again.

## What the manifesto's test weighed

Q17's option is tagged *one reorder in the skill, no rule*. Nothing is
added; two steps change places.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the close skill and its reference; the execution protocol; chapter 5; the closure concept | `skills/cairn-close/SKILL.md`, steps 3 and 4; `skills/cairn-close/reference.md`; `spec/reference/execution-protocol.md`; `spec/index.md` §5; `spec/concepts/administrative-closure.md` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
