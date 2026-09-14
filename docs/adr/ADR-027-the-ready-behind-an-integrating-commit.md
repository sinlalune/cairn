---
type: Cairn Decision Record
title: ADR-027 — the ready behind an integrating commit is on any parent
description: The `ready` a path declared before its arrival is read from any parent of the integrating commit, and from the pending parents where the arrival is not committed yet. Extends ADR-001 decision 7, whose own reasoning covers the `manual-git` merge unit while its implementation reads the first parent only.
tags: [cairn, adr, 1.1, checker, transition, transports]
timestamp: 2026-09-14T00:00:00Z
adr:
  id: ADR-027
  status: accepted
  date: 2026-09-14
---

# ADR-027 — the ready behind an integrating commit is on any parent

Status: accepted · 2026-09-14 · written by CP-CAIRN-008, S08

This record **extends** decision 7 of
[ADR-001](./ADR-001-sole-owner-opens-and-closes-a-path.md), which refuses a
trunk commit taking a path from `running` to `done` with no `ready` behind it
and does not say which parent that is.

The debt was raised by
[this path's S03](../../project/coding-paths/CP-CAIRN-008/steps/S03.md), which
gated the `acceptance` refusal by transport, found `transition` refusing the
same `manual-git` closing for its own reason, pinned it with a fixture so it
could not go quiet, and put the reading to the owner at that boundary.
[ADR-026](./ADR-026-the-readings-that-must-not-lie.md) decided the `acceptance`
half and does not reach this one; `tools/soundness.md`,
`spec/reference/conformance.md` and the `cairn-close` skill are where the debt
has been carried since.

## Context

ADR-001 decision 7 exists for one edge: a path must not jump from `running` to
`done` in a trunk commit with no `ready` behind it, because the `ready` commit
binds the candidate, the digest and the base. Its own text says *"on both
transports the administrative commit has already put the path at `ready` on its
branch"*. The checker implements it in `integrationState`:

```js
readyBehind: statusAt(commit ? `${commit}^` : 'HEAD') === 'ready'
```

`commit^` is the FIRST parent, and `recordHistory` walks `--first-parent`. That
is right for `pull-request`, where the integrating unit is a commit of its own
on the trunk's line. It is wrong for `manual-git`, where `cairn-close` step 5
and chapter 5 both prescribe the `--no-ff` merge as the integrating unit: that
merge's first parent is the trunk, and the `ready` the branch declared — the
one ADR-001 decision 7's own reasoning relies on — sits on the **second**. The
implementation contradicts the record it implements, for the transport that
record's reasoning names.

Nothing noticed, because until this path's item 13 the rule was never reached:
no run compared the trunk across an integrating commit, so `transition`, with
`acceptance`, `journal-entry` and `scope-digest`, received nothing. Item 13
gives them their input, which is why this reading must be settled in the same
path and land with it.

The reading was never chosen. `commit^` is the shorthand for "the commit
before", written when every integrating commit in view was a plain one.

## Decision

### Decision 1 — the `ready` is read from any parent of the arrival

Extends ADR-001 decision 7.

The `ready` behind an integrating commit is read from **any parent of that
commit**: a plain commit has one, a merge has two, an octopus merge has more,
and the declaration may sit on any of them. The refusal stands where no parent
carries it.

Where the arrival is not committed yet the reading is unchanged: the checkout's
own head, as today. A pending `MERGE_HEAD` is deliberately not read. No sequence
`cairn-close` prescribes reaches that state with the gate running — its
`manual-git` block commits the merge before the check — so reading it would be
plumbing added for a case the procedure does not produce, and `MERGE_HEAD` holds
one sha per pending parent, which is a second shape to get right for no reader.
A writer who wants the verdict early commits first, which the reference already
tells them to do.

Nothing branches on the declared transport. `manual-git` passes because the
parent carrying the branch's `ready` is now looked at; `pull-request`'s
prescribed shape is a plain commit, where "any parent" is the only parent.

What ADR-001 decision 7 forbids is unchanged: a trunk commit taking a path to
`done` with **no** `ready` behind it. The checker's own comment refines that
into why it reads one commit rather than a range — *"a `ready` somewhere in the
range", which an abandoned earlier `ready` would satisfy* — and that refinement
survives too. A parent is an immediate predecessor, not a point in a range:
widening from the first parent to any admits exactly the commits the arrival was
made from, and nothing older. The fixture for the no-`ready` case refuses as it
did.

## Consequences

**One incidental refusal is given up, and it is named here rather than
discovered later.** On `pull-request`, an arrival carried by a merge object —
the shape ADR-008 decision 2 forbids and ADR-026 decisions 3 and 4 confirmed —
is refused today by two rules at once: `acceptance`, which owns the shape, and
`transition`, because that merge's first parent is the trunk at `running` while
its second holds the branch's `ready`. Under this decision `transition` stops
refusing it and `acceptance` alone does.

That is correct, not merely tolerable. `transition` asks one question — is
there a `ready` behind this arrival — and in that shape there is one. Refusing
it was `transition` answering a question belonging to another rule, and the
accidental second opinion is not defence in depth: it fired on the parent
layout, not on the violation. The rule that owns the shape keeps refusing it,
with the message that names it.

The existing fixture for that shape asserts `acceptance` only, so it passes
before and after and proves nothing about this change. The fixture that does
prove it is the `manual-git` one, which asserts `transition` refuses and must
be inverted; and the `pull-request` merge-object fixture should assert that
`acceptance` alone now refuses, so the refusal this decision gives up cannot
come back unnoticed.

Both halves of `manual-git` integration are now decided: the merge object by
ADR-026 decision 4, the `ready` behind it here. A repository declaring that
transport can close a path past the checker.

## Alternatives rejected

- **Branching on the declared integration transport**, as ADR-026 decision 4
  did for the `acceptance` refusal: correct, and more code — a second place
  where the checker asks which transport it is judging, to reach an answer that
  is the same on both. The transport gate belongs there because the transports
  genuinely differ on whether a merge may carry the arrival; they do not differ
  on where a declaration may sit.
- **Reading the second parent only on a merge**: the same answer written as a
  special case, and it invites the question of which parent is "the branch",
  which is a convention about how the merge was invoked rather than a fact about
  the commit.
- **Keeping `transition`'s refusal of the `pull-request` merge object by
  reading the first parent there too**: preserves an accident. It would restore
  the transport branch this decision exists to avoid, to duplicate a refusal
  `acceptance` already makes by name.
- **Leaving the reading and suppressing `transition` on `manual-git`**: ships a
  rule the checker knowingly does not apply — the shape this path exists to
  remove, arrived at deliberately instead of by accident.
- **Searching the whole range for a `ready`**: reopens the edge ADR-001
  decision 7 closes, which is the one thing this record must not do.

## What the manifesto's test weighed

One decision, no rule added, one expression widened: `commit^` becomes the
parent list `integrationState` already computes. Nothing is added to reach it.
The alternative that branches on transport was refused for being larger and no
more correct; reading a pending `MERGE_HEAD` was refused for being plumbing no
prescribed sequence reaches; and the refusal this decision gives up is named in
*Consequences* rather than left for a later reader to find.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the transition rule's parent reading; the `manual-git` fixture, whose assertion inverts; the `pull-request` merge-object fixture, which gains the rule that still refuses; the catalogue, the conformance row, the soundness note; the close skill and its reference, and the tools' module note, which all carry the debt as undecided | `integrationState` in `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `tools/cairn-rules.mjs`; `spec/reference/conformance.md`; `tools/soundness.md`; `skills/cairn-close/SKILL.md` and `skills/cairn-close/reference.md`; `docs/modules/application.md` |

Row 5 of the [roadmap register](../../project/coding-paths/index.md) carries it,
in CP-CAIRN-008, as item 14 of that path's definition of done.
