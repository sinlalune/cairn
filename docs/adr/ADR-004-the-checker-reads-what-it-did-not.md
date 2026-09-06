---
type: Cairn Decision Record
title: ADR-004 — the checker reads what it did not
description: Six corrections to how the checker reads the repository, none of them a new control — the registration commit is the activation, a running path names its remote checkpoint, range rules read only this path's records, every blocking fixture contains a trunk merge, the branch is resolved from where the checker stands, and the three Crumbz repairs come upstream. Promotes R09, R13, R14, R15, R16 and R17.
tags: [cairn, adr, 1.1, checker, corrections, fixtures]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-004
  status: accepted
  date: 2026-09-06
---

# ADR-004 — the checker reads what it did not

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S03

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q9) and the
[rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at blob
`313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R09, R13, R14, R15, R16, R17).
Both notes stay exactly as they were.

## Context

Crumbz found six places where the checker read the repository wrongly, or
not at all. The owner's answer to Q9 was *"Yes, all of them, in 1.1"*, with
the decisions page's own tag: *corrections, no new rule*. The alternative
offered, to ask of each blind spot whether its rule should exist at all,
was not taken; this record therefore corrects readings and adds no control.
Each decision names the fault, the corrected reading, and the rule by the
name the conformance page gives it.

## Decisions

### Decision 1 — the registration commit is the activation

Promotes **R09**.

`registration-base` finds the registration commit today as the first
trunk commit that added the record's file. A record landed as `draft` and
activated later is therefore judged against the draft's parent, which is
not the base the work forked from. On Crumbz, CP-016 landed as a draft
through one request, went `running` through a second, and the checker
demanded the draft's parent; the answer was a rewritten `base_commit`, a
value false by the specification's own definition, and the trunk now carries
it.

The registration commit is the trunk commit in which the record's status
became `running`. A `draft` landed earlier is honoured as what it is, a
draft. The refusal message names the remedy: a draft's activation commit is
the registration, and `base_commit` is its parent.

Fixture: a draft landed on the trunk, activated by a later trunk commit, a
branch forked from the activation; judged a match. And the converse, a
branch forked from the draft, judged a mismatch.

What this changes: the rule `registration-base` and its message in
`tools/cairn-check.mjs`; the concept `trunk-registration` may gain the
sentence.

### Decision 2 — a running path names its remote checkpoint

Promotes **R13**.

The resume section's checkpoint names the last completed commit on the
remote, or the registration commit before the first unit. On Crumbz every
one of Gemini's fifteen units left it `unpinned`, so neither path could be
resumed cold from its record.

A record that declares `running` and carries at least one completed unit
must name an object id in its checkpoint; `unpinned`, empty, or a value
that is not an object id is refused, and the refusal says which commit to
write: the last one the remote holds.

What this changes: the rule `work-unit`, which already reads the record's
unit blocks and is where the unit's own claims are judged; one fixture, a
running record with a unit block and an unpinned checkpoint, refused.

### Decision 3 — range rules are path-scoped

Promotes **R14**.

On a host that forbids rewriting, a path reaches a current base by merging
the trunk in, so the range from base to candidate always contains trunk
history, and with it other paths' completed units. A rule that walks that
range and reads another path's records as evidence about this path is wrong
by construction. The first Crumbz repair of the provisional rule was: it
counted a step record under any path folder as this path's completion.

Every rule over the range reads only this path's own records as evidence
about this path. The conformance page states the sentence once, and every
range walker is audited against it: `provisional`, `record-integrity`,
`record-date`, and any rule added later.

What this changes: `spec/reference/conformance.md`, one sentence; the
three rules named, each read and, where needed, corrected in
`tools/cairn-check.mjs`.

### Decision 4 — every blocking fixture contains a trunk merge

Promotes **R15**.

A fixture whose range holds only this path's commits cannot show the fault
of decision 3. Every blocking rule's fixture on a no-rewrite host contains
at least one merged trunk commit carrying another path's completed unit.

What this changes: `tools/cairn-fixture.test.mjs`, one fixture per blocking
rule revisited; `tools/soundness.md`, which lists what each fixture proves.

### Decision 5 — the branch is resolved from where the checker stands

Promotes **R16**.

Every pull-request run of the installed workflow is a detached checkout of
the request head, on purpose, so the exact commit is judged. Rules that
read the path branch by its local name, `path/<id>`, found nothing there:
the first path that needed a supersession proof in CI failed in the
request's run and nowhere else, while the push run on the same commit
passed.

Every rule that names the path branch resolves it in one order: the local
ref if present; else `HEAD`, when the checkout is the request head; else
the remote-tracking ref `origin/<branch>`. The resolver the checker already
has for *which branch is this* is one place; the rules that read the
branch's history are the others, and each is audited.

What this changes: `tools/cairn-check.mjs`, every reader of the branch's
commits — at least `record-integrity`, `remote-checkpoint`, `provisional`
and `path-history`; one fixture in a detached checkout per rule audited.

### Decision 6 — the three Crumbz repairs come upstream

Promotes **R17**.

Crumbz repaired its own copy of the checker three times in one day:

- **005, same-branch step supersession**: a repair step may supersede an
  invalid step on the same branch by binding the blob it replaces and the
  blob it adds, so the earlier step stays append-only and the correction is
  a new step, as the unit skill says;
- **006, chronological path-scoped provisional resolution**: a provisional
  commit is resolved by a later commit of the same path that adds a valid
  completed step, and by nothing else;
- **007, detached-checkout branch evidence**: decision 5, for the two rules
  it repaired.

The three come into the kit's checker with their tests, so the adopter's
copy becomes a version bump through the `cairn` command's `update` rather
than a fork. They are named here by their Crumbz path ids and by the
[closure note](../../feedbacks/2026-09-04-crumbz-closure-checker-repairs.md)
that records them and their branches.

What this changes: `tools/cairn-check.mjs` and `tools/cairn-fixture.test.mjs`,
the rules `record-integrity` and `provisional`; `cairn.lock.json` at the
next release, so `update` rewrites the adopter's checker.

## Alternatives rejected

- **Fix or delete** (Q9 second option, the manifesto's): each blind spot
  would first have been asked whether its rule should exist. The owner
  chose to fix all six; the question of what 1.1 removes was answered in
  Q19 instead.
- **Later, only what blocks the next adopter** (Q9 third option): every
  one of the six was met by the first adopter.
- **A new blocking rule for decision 2**: the checkpoint is a claim of the
  unit, so it is judged where the unit's other claims are, under
  `work-unit`, rather than under a rule of its own.

## Consequences

- A draft-then-activate registration is a supported shape, and the
  reconciliation paragraph CP-016 wrote to satisfy a message is the kind
  of repair the corrected message prevents.
- A record that cannot be resumed cold is refused at the unit that made it
  so.
- The fixture suite grows by one trunk merge per blocking rule and one
  detached checkout per branch reader, and shrinks by nothing.
- Crumbz's checker and the kit's converge at the next release.

## What the manifesto's test weighed

None of the six adds a control the owner did not already have; each makes
an existing control read the repository as the specification describes it.
Decision 2 is the one that refuses something new, and it refuses only a
resume section that cannot be resumed from, the failure the handoff exists
to prevent. The option to delete rather than fix was offered and not taken.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the registration parent's reading and message | rule `registration-base`; `tools/cairn-check.mjs`; concept `trunk-registration` |
| 2 | the unit's checkpoint claim | rule `work-unit`; `tools/cairn-check.mjs` |
| 3 | the range walkers and the conformance sentence | rules `provisional`, `record-integrity`, `record-date`; `spec/reference/conformance.md` |
| 4 | the fixture suite | `tools/cairn-fixture.test.mjs`; `tools/soundness.md` |
| 5 | every reader of the branch's history | `tools/cairn-check.mjs`, rules `record-integrity`, `remote-checkpoint`, `provisional`, `path-history` |
| 6 | the kit's checker and tests, the next lock | `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `cairn.lock.json` |
