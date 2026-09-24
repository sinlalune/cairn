---
type: Cairn Decision Record
title: ADR-044 — what path 1 of 1.2 left to a record
description: Three amendments path 1 of 1.2 found wanting and its journal entry names — `ready` states the candidate checked, administratively closed and proposed, the acceptance coming with the closure on `manual-git` and after it on `pull-request` (ADR-040); the fresh reader of the coherence questions is also given the records of the running sibling paths (ADR-043); a trunk that allows only squash merges cannot register by request (ADR-032 decision 2) — and one decision of the owner's of 2026-09-24, a `current_step` that does not name the path's last step file reported by an advisory, never a refusal. Promoted from CP-CAIRN-013's journal entry.
tags: [cairn, adr, 1.2, cairn-close, cairn-open, lifecycle, checker, advisory]
timestamp: 2026-09-24T00:00:00Z
adr:
  id: ADR-044
  status: accepted
  date: 2026-09-24
---

# ADR-044 — what path 1 of 1.2 left to a record

Status: accepted · 2026-09-24 · written by CP-CAIRN-014, S01

**Promoted from** the journal entry of
[CP-CAIRN-013](../../project/log/2026-09-24-cp-cairn-013.md) at blob
`6d4f869ab6242b99bd7e77e18306305c71d7ea0e`, its section *What the owner
ruled, and what is owed*, and, for decision 4, from the owner's answer
of 2026-09-24 that the opening acceptance of
[CP-CAIRN-014](../../project/coding-paths/CP-CAIRN-014/index.md) carries.
The entry stays exactly as it was. The entry asks for a superseding
record; this one amends instead, because each of the three decisions
stands and gains what it left unsaid, and where a clause's words give
way — ADR-043's *and nothing else*, ADR-032's *the merge the trunk's own
rules allow* — the mark on that record names the clause. The three
records carry a line naming this one.

## Context

Path 1 of 1.2 wrote the skills and the specification from ADR-030 to
ADR-043. Three of its sentences went further than the record behind
them, on the owner's rulings in the chat, and the entry names them as
owed to a record. The pages path 1 wrote already say all three; this
record gives them the decision a sentence relies on.

The fresh reader of the same path's S08 found that its record's
`current_step` had read `S01` through eight units with the gate green:
`work-unit` asks whether the named step is a completed unit, never
whether it is the current one. CP-CAIRN-008 and CP-CAIRN-012 were
integrated with the same staleness. The field is the writer's, and no
skill, template or chapter tells the writer to set it: the unit skill's
verify movement refreshes the resume section, and `current_step` is a
field of the declaration above it.

## Decisions

### Decision 1 — what `ready` states

Amends [ADR-040](./ADR-040-the-administrative-commit-lands-before-the-reading.md),
decision 1, which moved the administrative commit before the reading and
did not say what the status it writes then means.

`ready` states that the exact candidate `C` is checked, administratively
closed and proposed — not that it is accepted. On `manual-git` the
administrative commit carries the closing record with its acceptance
fields, so the acceptance comes with `ready`; on `pull-request` the
approval on the request is the acceptance, and it follows `ready`. The
owner ruled it on 2026-09-22, and chapter 5 of the specification and the
lifecycle concept say it since path 1.

No rule changes: `transition` and `acceptance` already read the
acceptance where each transport puts it.

### Decision 2 — the fresh reader's fifth input

Amends [ADR-043](./ADR-043-the-coherence-questions-are-a-fresh-context-read.md),
decision 1, which gives the reader the diff, the governing documents at
their ids, the live view and the four questions.

The reader is also given the records of the running sibling paths, one
per sibling, never the closing path's own. The live view cannot stand in
for them: it names a sibling's id, title, status, branch and base, never
its goal or `writes:`, and the second question — does the diff duplicate
what another running path is building — is answered from the sibling's
goal and `writes:`. The closing path's own record is left out because
its rationale is the one input the read exists to be without.

No rule changes; `skills/cairn-close/reference.md` lists the command
since path 1.

### Decision 3 — a trunk that allows only squash merges cannot register by request

Amends [ADR-032](./ADR-032-registering-on-a-trunk-that-takes-no-direct-push.md),
decision 2, which lets the registration request land by *the merge the
trunk's own rules allow*.

The request merges in a way that keeps the registration commit — a merge
commit or a fast-forward, never a squash or a rebase-merge.
`registration-base` reads the parent of the commit that declared the
path `running`, and a squash or a rebase-merge replaces that commit with
one whose parent is the trunk at the merge; every trunk that moved in
between turns the path's first run red. A trunk that allows only squash
merges therefore cannot register by request. That is a limit, stated
here and not removed, with two ways out: allow a merge commit for the
registration request, or give the writer a bypass and register by the
direct push.

No rule changes; the open skill and its reference say it since path 1.

### Decision 4 — a stale `current_step` is an advisory, never a refusal

The owner's decision of 2026-09-24, asked when this path opened —
nothing, an advisory or a refusal — and answered *do what you
recommend*; the recommendation was the advisory.

A new advisory, `current-step`, reports a `running` or `ready` path
record whose `current_step` is not the last of its step files, naming
both. It is silent before the first unit, when the path has no step
file. It reads the step files the checker already walks, and it never
refuses: a stale field misleads a reader of the record but breaks no
reading of the checker. The two integrated records that carry the
staleness, CP-CAIRN-008 and CP-CAIRN-012, are `done`, which the advisory
never reads.

It stands beside [ADR-026](./ADR-026-the-readings-that-must-not-lie.md)
decision 2, which refused *keeping `current_step` as the rule's selector
and adding a rule that it names the newest unit: a second rule to protect
the first*. This is not that rule. `review` no longer selects by the
field, and `work-unit` reads it only to ask whether the named step
carries a `cairn-unit` block, which a field left behind still names; the
advisory guards no rule.

## Alternatives rejected

- **One record per amendment**: three records of one paragraph each for
  sentences the pages already carry; one record names the three, as
  ADR-024 and ADR-025 settled what path 1 of 1.1 owed.
- **Leaving the three to the pages alone**: a sentence the pages say and
  no record decides is what path 1's entry names as owed; the next
  writer reading ADR-040, ADR-043 or ADR-032 would meet the older,
  shorter decision.
- **`registration-base` reading a squashed registration** (decision 3):
  the rule would have to recognise a commit it did not see pushed as the
  one the registrant made, which is the reading the rule exists to make
  exact; the limit is a sentence, the reading a new case.
- **Nothing for the stale `current_step`** (decision 4, the first
  option): no skill asks for the refresh, and two integrated records
  show what a field nobody is told to set becomes.
- **A refusal** (decision 4, the third option): a unit refused for a
  field whose staleness misleads a reader but breaks no reading of the
  checker.

## Consequences

- ADR-040, ADR-043 and ADR-032 each carry a line naming this record
  under the decision it amends; the 1.2 page is amended in place, its
  sentences marked *since 2026-09-24*.
- A running path whose writer forgets the field is told at the next run,
  by name.

## What the manifesto's test weighed

Decisions 1 to 3 add no machinery. Decision 4 adds one advisory, read
from files the checker already walks, and the one refusal considered was
refused.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | nothing new; chapter 5 and the lifecycle concept say it since path 1 | `spec/index.md` §5; `spec/concepts/lifecycle.md` |
| 2 | nothing new; the close skill's reference lists the command since path 1 | `skills/cairn-close/reference.md` |
| 3 | nothing new; the open skill and its reference say it since path 1 | `skills/cairn-open/SKILL.md`, step 3; `skills/cairn-open/reference.md` |
| 4 | the advisory `current-step`, its fixture, its rows | `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `spec/reference/conformance.md`; `tools/cairn-rules.mjs`; `tools/soundness.md` |

The register's row 2 of 1.2 names the coding path that carries decision
4, [CP-CAIRN-014](../../project/coding-paths/CP-CAIRN-014/index.md).
