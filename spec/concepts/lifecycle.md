---
type: Cairn Concept
title: Lifecycle
description: The six states a coding path may declare, what each one requires to be true, the transitions between them, and what a single-commit validator can actually see.
tags: [cairn, concept, state, lifecycle]
timestamp: 2026-09-02T00:00:00Z
---

# Lifecycle

The lifecycle is the state machine that says which fact a path may declare at
each point. A state is a statement about the repository, not an intention, and
each state has its own invariants.

## The six states

**`draft`** — the path is being designed and is not registered for execution.
It needs a stable id and nothing else: no base commit, no branch, no writer.
The roadmap of chapter 4 is made of drafts, one per bounded piece of the
product, each reviewable and none yet accepted. A draft that will not execute
archives as `abandoned` or `superseded`. Draft does not authorise
implementation.

**`running`** — the path has [opening acceptance](./opening-acceptance.md), is
registered on the [trunk](./trunk.md), and may execute. It keeps its id,
[branch](./branch.md), base [commit](./commit.md), current
[writer assignment](./writer-assignment.md), current step and last
[remote checkpoint](./remote-checkpoint.md). Running does not mean a process is
active right now.

**`blocked`** — progress cannot continue until a named condition changes. The
path keeps everything running kept, plus the blocker and the explicit unblock
condition, and stays in the [live view](./live-view.md) because it is still
resumable work. Dormant work needs more traceability, not less.

**`ready`** — the final state a branch may declare. It requires the running
identity, the full `subject_commit` [object id](./commit-hash.md) of the
accepted candidate `C`, completed checks, the review of `C`,
[closing acceptance](./closing-acceptance.md) of `C`, and one field-restricted
[administrative closure](./administrative-closure.md) commit after it. Ready
does not mean integrated.

**`done`** — the exact accepted candidate is reachable from the
[remote](./remote.md) trunk and the integrating trunk unit records
`resolution: completed`. A branch cannot claim done in advance; the
[integration transport](./integration-transport.md) writes it while landing the
result, and reachability is verified separately.

**`archived`** — terminal and retained. Exactly one resolution: `completed`
after done, `abandoned` for stopped unintegrated work, `superseded` when another
path or decision replaced it. The [path record](./path-record.md) is kept, never
deleted, and the resolution does not change once written.

## The transitions

```text
draft    → running | archived
running  → blocked | ready | archived
blocked  → running | archived
ready    → running | blocked | done
done     → archived
archived → (terminal)
```

Three edges deserve their reasons stated:

- **`ready → blocked` exists.** Acceptance stalls. A candidate audited and
  waiting on an unavailable reviewer is blocked on a named condition, and
  saying so is more useful than a `ready` that quietly ages.
- **`blocked → ready` does not exist.** Reaching `ready` requires producing and
  reviewing a candidate, which is execution. An unblocked path returns to
  `running` and reaches `ready` from there.
- **`ready → running` exists.** The candidate was invalidated, by a finding or
  by [acceptance drift](./acceptance-drift.md), and implementation resumes.

An unintegrated path archives as `abandoned` or `superseded`, never
`completed`. The trunk may observe `running → done` when it integrates a branch
whose ready state was never on the trunk; that is the integration form of
`ready → done`, not permission to skip closure.

An unchanged state is not a transition. A validator comparing two commits will
often see a record declaring the state it declared before; it accepts that for
every state, including `archived`, provided the state's required identity
fields are present and an archived resolution is unchanged.

## What is checked

The reference checker's `transition` rule enforces the per-state invariants and
single-step transitions against one comparison ref. When the earlier state is
unavailable, the check is [inconclusive](./finding.md) and blocks.

## It does not prove

A validator run sees **one commit**. It reads the state a record declares now
and compares it with one earlier state; it has never watched a path move.
"Which state was this in last week" is not a question the mechanism can answer,
and a status word cannot make an event happen: a remote branch, an exact
subject id and trunk reachability are each proved on their own.

Related: [path record](./path-record.md), [coding path](./coding-path.md),
[implementation candidate](./implementation-candidate.md),
[record integrity](./record-integrity.md).
