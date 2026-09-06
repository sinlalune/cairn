---
type: Cairn Decision Record
title: ADR-002 — the checkboxes stay and the seal is checked at every transition
description: The definition of done keeps its checkboxes, and the scope digest that seals it is judged at every transition of the record on every ref, the trunk's integrating unit included, so a tick at done is caught like a tick at ready. Promotes R10; R11 is refused.
tags: [cairn, adr, 1.1, scope-digest, definition-of-done]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-002
  status: accepted
  date: 2026-09-06
---

# ADR-002 — the checkboxes stay and the seal is checked at every transition

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S03

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q7 and the third item of Q19)
and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R10 and R11). Both notes
stay exactly as they were.

## Context

The definition of done is the text the opening acceptance seals: the checker
digests it at acceptance and refuses closure when the text no longer
digests to the same value. The path template writes that text as a list of
checkboxes, and nothing said the boxes must stay unticked.

On Crumbz three paths ticked them. CP-016 ticked at its fifth unit and
restored the text at its sixth before `ready`, and the gate caught nothing
in between. CP-005 and CP-006 were ticked inside their integrating commits
on the trunk, and both runs were green, because the `scope-digest` rule is
judged only for a path at `ready` or `done` on its own branch: the
integrating unit on the trunk is not judged for it. Recomputed on
2026-09-06, both records digest to values their acceptance does not name.

## Decisions

### Decision 1 — the seal is judged at every transition, on every ref

Promotes **R10**, from Q7.

The `scope-digest` rule reads the record whenever the record changes,
whatever its status and whichever ref carries the change: a unit on the
path branch, the administrative commit, the integrating unit on the trunk.
A definition of done that no longer digests to the acceptance in force is
refused wherever it appears, and the refusal says what it says today:
restore the accepted text or record a scope amendment. A `done` record on
the trunk whose section has moved is the same fault as a `ready` one.

What this changes, by today's names: the rule `scope-digest` in
`tools/cairn-check.mjs`, whose guard limits it to a closed status on a path
branch; one fixture, a trunk commit that records `done` and ticks a box in
the same change, refused.

### Decision 2 — the checkboxes stay

Refuses **R11**, from Q7 and Q19. The owner's words, Q7: *"Keep them, and
catch every tick."* The third item of Q19, the outcome checkboxes, was left
bare.

The template keeps the definition of done as a list of checkboxes, because
that is how a reader sees at a glance what a path is for. Completion is not
stated by ticking: it is stated by the closing review and the journal
entry. The path template says so in one sentence beside the list: the
definition of done is never edited after acceptance, ticks included.

What this changes: one sentence in `spec/reference/path-template.md` and in
the `cairn-open` skill, step 1. No rule: decision 1 is the enforcement.

## Alternatives rejected

- **Removing the checkboxes** (Q7 first option, R11): the simpler
  mechanism, and the one the manifesto would lean to; the owner refused it
  because the boxes are the readable outcome list, and chose to catch every
  tick instead.
- **Judging the trunk only at integration**: it would have caught CP-005
  and CP-006 but not CP-016's tick between two units; the rule is cheaper
  stated as *every transition* than as a list of transitions.

## Consequences

- A tick anywhere, at any time, is refused at the next gate that reads the
  record. A writer who ticks by habit sees the refusal at the unit, not at
  closure.
- The two Crumbz records whose sections moved at `done` are not repaired
  by this record; a correction there is a new acceptance block naming the
  one it supersedes, if the adopter wants one.
- The rule's guard widens; nothing else in the checker changes.

## What the manifesto's test weighed

Q7 keeps an option tagged *adds a rule*. What it adds is a wider guard on a
predicate that already exists, with one fixture. What it refuses is the
removal of a template feature the owner reads. The record notes that the
removal was the manifesto's option and that the owner weighed it and kept
the boxes; the cost is one guard, not one rule.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the seal's guard and one fixture | rule `scope-digest`; `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs` |
| 2 | the template's one sentence | `spec/reference/path-template.md`; `cairn-open` step 1 |
