---
type: Cairn Decision Record
title: ADR-025 — a red run is read before the next unit
description: The post-mortem a red run produces — in the run's log, and on the request where the workflow posts it — is read by the writer before the next unit starts; one sentence in the unit skill's resume movement, no rule and no record. Decides the clause path 1 refused because no record carried it, and names the reader of what ADR-014 decision 1 writes.
tags: [cairn, adr, 1.1, postmortem, unit, skills]
timestamp: 2026-09-11T00:00:00Z
adr:
  id: ADR-025
  status: accepted
  date: 2026-09-11
---

# ADR-025 — a red run is read before the next unit

Status: accepted · 2026-09-11 · written by CP-CAIRN-006, S01

**Promoted from** the journal entry of
[CP-CAIRN-005](../../project/log/2026-09-10-cp-cairn-005.md) at blob
`b69c03fcc0e62be72f4c7bdb288f38dbdc41be8e`, the first item of its
section *Decided along the way*. The entry stays exactly as it was. This
record supersedes nothing. It extends decision 1 of
[ADR-014](./ADR-014-two-tools-of-1-1.md) by naming who reads what that
command writes.

## Context

Path 1's definition of done asked that the unit skill say *a red run's
post-mortem is read before the next unit*. The writer answered the item
less that clause and argued it in the request: no record of 1.1 decides
it. ADR-014 decision 1 decides where the post-mortem goes — the run's
log, and once as a comment on the request — and that nothing is
committed by the workflow, because a branch has one writer. It stops
there. It does not say anyone reads it.

That gap has a shape. Under ADR-005 the forge no longer runs on pushes to
path branches, so the runs that can go red are the trunk's, at a
registration and at an integration, and the request's, at each push once
the request is open. Each of those failures sits between two units of the
same writer, and the unit skill's resume movement already verifies the
repository against durable state, as the execution protocol's entry route
names *the last recorded gate verdict* among what a session reads. The
post-mortem is that verdict read mechanically, written at the minute the
incident happened. What was missing is the sentence that sends the writer
to it.

## Decision

### Decision 1 — the writer reads the post-mortem before starting the next unit

When the run that judged the writer's last push went red, the writer
reads the post-mortem that run produced — in the run's log, or on the
request where ADR-014 decision 1 posts it — before starting the next
unit. Reading is the whole of the obligation: nothing is committed,
no note is owed beyond the learning note ADR-014 decision 1 already asks
of an incident that deserves one, and the step record says nothing about
the reading unless the writer acted on it.

The sentence goes in movement 0 of `cairn-unit`, beside the verification
of the repository against durable state.

Nothing enters the checker: it cannot see a run's log, and a rule that
read the forge would refuse a unit for a fact the writer may already
have acted on.

What this changes, by today's names: `skills/cairn-unit/SKILL.md`,
movement 0, one sentence. Row 3 of the
[roadmap register](../../project/coding-paths/index.md) carries it, with
the post-mortem tool the sentence sends the writer to.

## Alternatives rejected

- **Nothing; the clause dropped, as path 1 left it**: the writer of the
  next unit then resumes from the record alone, and the reading ADR-014
  decision 1 built the tool to produce has no reader named anywhere.
- **A rule that refuses a unit after a red run whose post-mortem was not
  read**: unreadable — the checker judges a commit, not what someone
  opened — and control where a sentence does.
- **Committing the post-mortem into the path folder so the next session
  reads it from the record**: ADR-014 decision 1 refuses a second writer
  on a branch that has one, and the run's log and the request are where
  the incident already is.
- **A learning note for every red run**: ADR-014 decision 1 already
  bounds that to the incident that deserves one; every run is a file per
  failure.
- **The sentence in the verify movement instead**: verify runs the gates
  of the unit being finished, and movement 6 already tells the writer to
  read the run its own push triggers.

## Consequences

- The output of ADR-014 decision 1 has a named reader, so the tool's
  value does not depend on someone remembering it exists.
- The clause path 1 refused is decided, and the definition of done that
  carried it is not reopened: this record stands beside it.

## What the manifesto's test weighed

One sentence in a skill: no rule, no file, no step, no command. The
option that would have satisfied the clause mechanically is a predicate
reading the forge, which is the first threat exactly — more control, in
the one place the protocol already says the writer's own exit code is the
verdict.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the unit skill's resume movement | `cairn-unit` movement 0 |
