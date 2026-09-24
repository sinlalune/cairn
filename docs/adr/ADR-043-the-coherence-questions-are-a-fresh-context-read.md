---
type: Cairn Decision Record
title: ADR-043 — the coherence questions are a fresh-context read
description: The four closing questions are answered by a second context with no memory of the work, given the candidate diff, the governing documents at their pinned ids and the live view, and the owner arbitrates what it found; `cairn-audit` scaffolds what it can see — the records the diff touches, the sibling paths' `writes:`, the architecture pages changed with no record beside them; no checker rule. Extends ADR-017 decision 1 to the closing read. Promotes K35 of Cairn 1.2, from Q20.
tags: [cairn, adr, 1.2, cairn-close, cairn-audit, review, coherence]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-043
  status: accepted
  date: 2026-09-21
---

# ADR-043 — the coherence questions are a fresh-context read

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S04 · decision 1 amended by ADR-044 on 2026-09-24

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q20, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 7, K35). The line
comes from [ECOS's fourth note](../../feedbacks/2026-09-18-ecos-coherence-questions-need-a-fresh-reader.md).
All three stay exactly as they were. It supersedes no record: it extends
[ADR-017](./ADR-017-the-review-movement.md) decision 1 — the writer's
own agent in a fresh context — from the unit's diff to the candidate.

## Context

The closing review asks four questions — does the diff contradict an
accepted decision, does it duplicate what another running path is
building, did it introduce architecture that belongs in a decision
record and has none, is anything now documented in two places. The
`full` route says the request's review answers them explicitly, and
`cairn-audit` scaffolds four lines reading *to be filled by the
reviewer*. All four are found by reading the candidate against the
repository — the records, the live view, the pages pinned in `governs:`
— and need a person only to arbitrate. The `full` route hands them to
the owner, who did not read the diff, and ECOS's writer answered them
himself, marked as the writer's, rather than merge four blank lines.

Every unit already has a fresh reader: ADR-017 decision 1 hands the
unit's diff to a second context with the ladder and correctness. The
closing read, the higher-stakes one, had none.

## Decision

### Decision 1 — a fresh context answers the four, and the owner arbitrates

**Amended** on 2026-09-24 by [ADR-044](./ADR-044-what-path-1-of-1-2-left-to-a-record.md), decision 2: the reader is also
given the records of the running sibling paths, never the closing
path's own, which the live view cannot stand in for; the inputs *and nothing
else* bounds now include them. The rest stands.

Promotes **K35**, from Q20, first option.

Before the owner is asked to read, the writer hands the candidate to a
second context of its own agent, as ADR-017 decision 1 names it, given
the candidate's diff against the base, the documents pinned in
`governs:` at their ids, the live view, and the four questions — and
nothing else. What it returns goes into the request's description under
*Coherence*, on `manual-git` into the closing record, with a first line
naming the reader as ADR-017 decision 4 has it; the owner reads the
answers and arbitrates what was found. When no fresh context can be
obtained, the writer answers and the first line says so, as decision 4
already provides for the unit's read.

This is a second read with its own questions, beside the read ADR-016
decision 4 governs — a diff read for its own quality, against the ladder
and correctness and nothing else. The coherence audit predates ADR-016;
this record names its reader and adds no criterion to either read.

`cairn-audit` scaffolds what it can see under each question: the
decision records the candidate's diff touches, the running paths whose
`writes:` meet this path's, and the architecture pages the diff changed
with no record beside them — the fact `decision-drift` already computes.
The scaffold is the reader's starting point, never its answer. No
checker rule reads the answers: three of the four are judgements on
meaning.

What this changes, by today's names: `skills/cairn-close/SKILL.md`,
steps 2 and 3, and `skills/cairn-close/reference.md`;
`tools/cairn-audit.mjs`, `QUESTIONS` and the *Coherence* scaffold, and
its test; `.github/pull_request_template.md`, the *Coherence* list, and
`requestTemplate` in `tools/cairn.mjs`, which generates an adopter's;
`spec/reference/human-records.md`, the *Coherence* section; `spec/index.md`,
the `full` route's sentence *the pull request's review answers the
coherence questions explicitly*; the concept
`spec/concepts/coherence-audit.md`, which names the reader.

## Alternatives rejected

- **The writer answers, marked as the writer's** (Q20, second option,
  *simplest*): what ECOS did; the writer reads its own work, which is
  the read ADR-017 decision 1 refused for every unit.
- **As today — the owner answers** (Q20, third option): the one person
  who did not read the diff; four blank lines or a rubber stamp.
- **A checker rule** (the note's *not this*): a checker guessing at
  meaning is wrong often enough to be ignored, which is worse than a
  question nobody answered.
- **The unit's reader answering the four beside its two criteria**: that
  reader is given a unit's diff and not the records, the live view or
  the candidate; the audit is one read at the candidate, given those.

## Consequences

- The closing read has the reader the unit's read has had since
  2026-09-07; the owner arbitrates and no longer hunts.
- On this path, the last unit's closing follows this record.

## What the manifesto's test weighed

Q20's option is tagged *the same movement the unit skill already uses*.
Nothing enters the checker; a read that already exists for every unit is
made for the candidate, and the audit tool prints three facts, two of
which the checker's rules already compute, where the reader starts.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the close skill and its reference; the audit tool and its test; this repository's request template and the kit's generator of one; the human-records reference; the `full` route; the concept | `skills/cairn-close/SKILL.md`, steps 2 and 3; `skills/cairn-close/reference.md`; `tools/cairn-audit.mjs` and `tools/cairn-audit.test.mjs`; `.github/pull_request_template.md`; `requestTemplate` in `tools/cairn.mjs`; `spec/reference/human-records.md`; `spec/index.md` §5; `spec/concepts/coherence-audit.md` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
