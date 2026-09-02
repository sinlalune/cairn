---
type: Cairn Concept
title: Handoff
description: The resume section of a path record — the one place that, with the bootloader, must be enough to resume the path cold — and the cold-resume trial that measures it.
tags: [cairn, concept, execution, team, resumability]
timestamp: 2026-09-02T00:00:00Z
---

# Handoff

A handoff is the moment one participant stops and the next one — a person, an
agent, or the same person tomorrow — continues without a conversation. Cairn
makes it a section of the [path record](./path-record.md): `## Resume` in
`index.md`, rewritten inside every completed [work unit](./work-unit.md).

## Build the idea

The resume section is the **last** document on the entry route and the
**first** one a participant acts from. The bootloader points at the operating
convention, the convention points at the [live view](./live-view.md), the live
view names the path, and the record holds the plan and the steps. The resume
section is the stone at the top of that cairn: the only one you need to look
at to know where to step, and meaningless without the ones underneath.

Its relationship to the step records is a division of labour, not a
duplication. The steps are append-only history: everything that happened, in
order, permanently. The resume section is mutable and rewritten at every unit:
it says which part of that history is still the situation. Cairn 0.2 kept it
as a separate brief with its own schema; 1.0 folds it into the record, because
a second file that must be reminded to stay current is how a handoff goes
stale.

## In Cairn

The section holds a checkpoint block — the last completed checkpoint on the
remote, its unit ordinal, the base and the trunk tip last seen — and one short
part each for the next action, the blockers, what was tried and rejected, the
reading order over `governs:`, and the verify commands. The exact shape is in
the [path template](../reference/path-template.md).

### The answerable-alone contract

"Alone" constrains what the reader must already know, not how many files they
may open. A reader holding the bootloader, the record and the repository at
the named checkpoint — with no conversation, no prior session, and no memory
of how the path got here — MUST be able to state:

1. the outcome this path is for;
2. the exact commit to resume from;
3. the single next action;
4. what the path may write;
5. what it must read, and at which object id;
6. what is blocking, if anything;
7. what has already been tried and rejected;
8. the exact commands that verify the checkpoint.

Each answer must be in the section, or in a record the section names at an
exact object id. An answer that lives only in a conversation, only in a
previous session, or only in a judgement the reader would have to make about
which steps still hold, is unanswerable, the section has failed, and refreshing
it is part of the next unit.

Both directions fail. A section too thin to name ids hands its job back to the
steps; a section that re-narrates the steps has become a second history, and
the two start disagreeing about the past. The section points; it does not
retell.

**Next action is singular.** A list of three next actions is a plan, and the
plan has its own file. **Tried and rejected** is the part people skip and the
one that saves the most time: a cold reader's first instinct is usually the
approach the last writer already eliminated.

### Cold resume

The same contract, run as a measurement: place a participant with no prior
context in front of the bootloader, the record and the repository at the
checkpoint, and ask them to perform the next action. Record whether they did it
correctly and how long it took to the first correct action. A trial MUST allow
the participant to open any record the section names at an exact id — that is
the contract, not a leak in it — and MUST NOT supply anything undurable.

Record the writer and the path id with every trial. Failures clustering by
writer mean the shape is fine and the practice is not; failures clustering by
path mean the shape is underspecified for a class of work. The aggregate hides
which one you are in.

## It does not prove

Nothing checks the section beyond the record's schema. Whether it can actually
be resumed cold is a judgement and a trial, never a predicate, and the
[conformance page](../reference/conformance.md) says so. A section refreshed
independently of the checkpoint it names has drifted, and only a reader
notices.

Related: [path record](./path-record.md),
[remote checkpoint](./remote-checkpoint.md),
[writer assignment](./writer-assignment.md), [work unit](./work-unit.md).
