---
type: Cairn Decision Record
title: ADR-008 — housekeeping with no choice in it
description: Seven small fixes the adopter notes found and the owner took together — no closure step, one commit for one path at integration, no closure metadata in a provisional commit, one key for the journal's path, a reportable roadmap register, refusals that name the remedy, and the worktree precondition. Promotes R18, R19, R20, R22, R28, R29 and R38.
tags: [cairn, adr, 1.1, housekeeping, skills, messages]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-008
  status: accepted
  date: 2026-09-06
---

# ADR-008 — housekeeping with no choice in it

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S04

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q13) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R18, R19, R20, R22, R28, R29, R38). Both notes stay exactly as they were. Q13 also drives R37, the kit's self-test, which the tooling record of this path promotes.

## Context

The decisions page listed the small fixes the five notes found as one
question, because none of them offers a choice: *"Do all of it in 1.1."*
Each decision below names the fault, the fix, and the surface by its
current name. None adds a control; two remove text.

## Decisions

### Decision 1 — there is no closure step

Promotes **R18**.

The close skill says in one sentence that the review is the request's
description, and no unit and no step file carries it. On Crumbz a closing
unit was invented with a type the vocabulary does not have, `review`,
because the skill's *finish any final implementation, then commit if
changes remain* read as a mandatory final commit; three red runs in five
minutes followed, and the first control-plane repair path with them. The
`closure` type in the unit table stays what it is: the administrative
commit's own surface, which carries no step file.

What this changes: the `cairn-close` skill, step 2, one sentence; the
`cairn-unit` skill's type table, where `closure` says *no step file*.

### Decision 2 — the integrating unit is one commit for one path

Promotes **R19**.

On `pull-request` transport the integrating unit is one commit from a
clean trunk checkout, for one path, carrying only `done`, the resolution,
the live view and the journal entry. Never a merge object carrying the
edit, never two paths in one request. On Crumbz one request recorded two
integrations, and one integrating unit was a merge commit that brought the
trunk in and edited the record in the same object.

What this changes: the `cairn-close` skill, step 5, one sentence; the
rule `acceptance`, which reads the commits after the candidate and can
refuse an integrating commit that is a merge or names two paths, with one
fixture for each.

### Decision 3 — a provisional commit never parks closure metadata

Promotes **R20**.

The administrative commit is one commit after the candidate, made when the
gate is green. Nothing of it — `ready`, `subject_commit`, the closing
record on `manual-git` — is pushed under a provisional trailer while the
gate is red. The unit skill says it where it describes provisional commits.

What this changes: the `cairn-unit` skill's reference, *publish
incomplete work*, one sentence.

### Decision 4 — one key for the journal's path

Promotes **R22**.

A journal entry names its path once, under the metadata namespace, as
`cairn.path`. The checker reads that key. Its refusal message says
*declaring `path: <id>`*, which reads as a top-level key, and every one
of the fifteen Crumbz entries carries both: the shape was copied forward
from the first. The message names the namespaced key, and the close skill's
reference shows the entry's frontmatter once, correct.

What this changes: the rule `journal-entry`'s message in
`tools/cairn-check.mjs`; `skills/cairn-close/reference.md`, which gains
the entry's shape beside the integrating commands.

### Decision 5 — the roadmap register is reportable

Promotes **R38**.

The kit installs the roadmap register with one placeholder row, *M1 — the
first milestone*, and nothing reads it: on Crumbz the row was untouched
after sixteen paths, and on this repository after one. `cairn-active`
reports, as an advisory in its output, a register that still carries the
installer's row while any path is registered. The register's shape does
not change; the installer's row is recognised by its text.

What this changes: `tools/cairn-active.mjs`, one reading of
`project/coding-paths/index.md`; one fixture.

### Decision 6 — refusals name the remedy

Promotes **R28**.

Every blocking message says what to do, in the same sentence that says
what is wrong. Three times on Crumbz a message that named a fact led the
agent to move the fact: a rewritten base, an edited step, a widened
`writes:`. Two remedies recur and are stated in every message they
apply to: a pushed record is corrected by a superseding step, never by
editing it; an object id the checker computes is never typed to satisfy it.

What this changes: every `add('blocking', …)` message in
`tools/cairn-check.mjs`, read once against the sentence; the fixture
suite asserts on the remedy where it asserts on the message.

### Decision 7 — the worktree precondition

Promotes **R29**.

A fresh worktree has no dependencies. The unit skill's resume step says to
install them before the first gate, and the reference's example reads the
gate's exit code, not its output: on Crumbz two gates failed with *not
found*, their output piped through a filter that matched nothing, and the
empty result read as a pass.

What this changes: the `cairn-unit` skill, step 0, one sentence; its
reference's first example.

## Alternatives rejected

- **Later** (Q13): the owner chose all of it now.
- **A rule for decision 1**: the vocabulary already refuses `review`; the
  fault was a sentence the skill lacked.
- **Reading the roadmap register in `cairn-check`**: the register is a
  view of intent, not of the path's state; `cairn-active` is the tool
  that reads views.

## Consequences

- Two skills and one reference gain five sentences; one message loses a
  misleading key.
- The checker's messages become the shortest documentation of the remedy;
  the fixture suite holds them to it.
- The roadmap register is the one file the live view now reads besides the
  path records.

## What the manifesto's test weighed

The question carried no tag because it offered no choice. Decisions 2 and 5
touch a tool; both read something the repository already holds and refuse
or report one shape. Everything else is a sentence or a message.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the close skill, the unit type table | `cairn-close` step 2; `cairn-unit` type table |
| 2 | the close skill, the acceptance rule | `cairn-close` step 5; rule `acceptance`; `tools/cairn-fixture.test.mjs` |
| 3 | the unit reference | `skills/cairn-unit/reference.md` |
| 4 | the journal message and the close reference | rule `journal-entry`; `skills/cairn-close/reference.md` |
| 5 | the live view tool | `tools/cairn-active.mjs`; `tools/cairn-active.test.mjs` |
| 6 | every blocking message | `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs` |
| 7 | the unit skill and its reference | `cairn-unit` step 0; `skills/cairn-unit/reference.md` |
