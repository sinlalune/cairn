---
type: Cairn Decision Record
title: ADR-005 — one run per commit that can land
description: The installed workflow judges every commit that can land on the trunk exactly once — the request's run for a candidate, the trunk's run for a registration and an integration — and the push run on path branches goes, so a red run is never mistaken for the green one beside it. Promotes R07.
tags: [cairn, adr, 1.1, ci, workflow]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-005
  status: accepted
  date: 2026-09-06
---

# ADR-005 — one run per commit that can land

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S03

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (the second removal of Q19,
listed under Q4) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md)
at blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R07). Both notes stay
exactly as they were.

## Context

The installed workflow runs on every pull request and on every push to the
trunk or to a path branch. A commit at the head of a request is therefore
judged twice, by two runs with the same name, and the two can disagree: the
push run reads the branch as pushed, the request's run reads a detached
checkout of the request head against the trunk it will land on. On Crumbz,
CP-016's `ready` commit had a green push run at 17:05, the owner merged at
17:06, and the request's run on the same commit went red a minute later.
The closure note of 09-04 met the same trap on the first supersession proof:
push run green, request run red, and only the red one is the merge gate.

## Decision

Promotes **R07**, from the second removal of Q19. The owner's words:
*"one check per commit, and you merge when that one is green."*

Every commit that can land on the trunk is judged once:

- a candidate, by the request's run on the exact head that will land;
- a registration commit and an integrating unit, by the trunk's run after
  they land, since on a sole owner's repository they land directly
  (ADR-001, decision 1).

The push run on `path/**` goes. A unit pushed to a path branch is judged by
the writer's own bare gate before the push, as the unit skill already
requires, and by the request's run once a request exists. A writer who
wants the forge to judge every unit opens the request as a draft at the
first unit: each push then produces one run, on the request head, and that
run is the one the merge reads. Nothing new is added for that; it is what
the forge does.

What this changes, by today's names: the kit's CI adapter
`.github/workflows/cairn.yml`, the `push` trigger's branch list; the
`cairn-unit` skill, step 5, where *then read CI* becomes *then read the
request's run, if a request is open*; the layout table's row for the
workflow, which says *the one required check, on the exact commit that
lands*, and is now true of runs as well as of checks.

## Alternatives rejected

- **Two runs with different names** (R07's second variant): keeps the
  double judgement and asks the reader to know which name is the gate; the
  owner chose the removal.
- **Keeping the push run for early feedback**: the feedback it gives is
  what the local gate already gave, and its green beside a red is the
  trap; the draft request gives the same feedback with one run.

## Consequences

- One run per commit that can land, and its verdict is the verdict; the
  `ci` profile line (ADR-001, decision 6) reports whether the forge
  requires it.
- A registration commit's run and an integrating unit's run happen after
  the landing. A red run there is the trigger of the post-mortem command
  (R36, promoted by a later record of this path).
- Runs on path branches stop; the writer's bare gate before every push is
  no longer backed by a second opinion until a request is open.
- The adopter's CI minutes halve on every unit.

## What the manifesto's test weighed

This is one of the four removals of Q19: it deletes a trigger from the
workflow and adds nothing. The one thing it takes away, a forge run on
every unit, is available natively through a draft request for the writer
who wants it.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| the trigger | the kit's CI adapter | `.github/workflows/cairn.yml` |
| the reading | the unit skill and the layout table | `cairn-unit` step 5; `spec/reference/repository-layout.md` |
