---
type: Cairn Concept
title: Roles
description: The responsibilities one coding path involves — initiator, writer, reviewer, checker, integrator — why they are responsibilities rather than identities, and why a collapse of roles is recorded rather than forbidden.
tags: [cairn, concept, role, team, governance]
timestamp: 2026-09-02T00:00:00Z
---

# Roles

A role is a responsibility one participant holds on one path for a while. It is
not a permanent identity, and a developer or coding agent may hold several
roles at once where repository policy permits it.

## The roles

| Role | Owes the path |
| :-- | :-- |
| **initiator** | the framed outcome: definition of done, initial steps, documents to read, expected writes, exclusions. Initiating a path grants no authority to accept it. |
| **writer** | the current [work unit](./work-unit.md), in the one writable [worktree](./worktree.md) assigned to it: implementation, tests, documents and the step record as one coherent change. One writer per worktree at a time; the role passes at a pushed checkpoint. |
| **reviewer** | [opening acceptance](./opening-acceptance.md) of the scope and [closing acceptance](./closing-acceptance.md) of one exact candidate, under the repository's declared governance. The closing review reads the candidate against the documents pinned in `governs:` and against the paths running beside it — the coherence questions — and records the answer. |
| **checker** | the deterministic half: the reference tool that reads files, diffs, refs and command results, evaluates objective predicates, and returns a [finding](./finding.md) and an [exit code](./exit-code.md). Because it judges Cairn records, its source, tests, configuration and workflow are the [control plane](./control-plane.md). |
| **integrator** | a path-scoped responsibility: operating or supervising the [integration transport](./integration-transport.md) that lands the exact accepted commit and records `done`. A developer, a trusted bot or a host queue may hold it. Cairn has no standing central integrator; each path carries its own result. |

Other participants may read, test, review or advise a path without holding any
of these.

## Why they are responsibilities

A path is not owned by whoever opened it. Writers change at pushed checkpoints,
reviewers are whoever governance authorises, and the same person may open a
path in the morning and review someone else's in the afternoon. Naming the
responsibility rather than the person is what lets the record say who did what
without pretending the team is a fixed organisation chart.

## Collapse is recorded, not forbidden

A solo developer working with agents holds every role, which makes closing
acceptance a signature the signer issued to themselves. Cairn does not forbid
that; forbidding it would make the protocol unusable for the setup most likely
to adopt it first. It requires the collapse to be **visible**: acceptance
records name the roles the actor held, and the checker raises an advisory,
`role-collapse`, when one actor recorded both the opening and the closing
acceptance of a path.

The distinction that matters is between a weakness that is written down and one
that is invisible until an incident finds it. A repository whose every path shows
one actor in all roles has a real property of its governance, reads that
property off its own records, and does not claim an
[enforcement profile](./enforcement-profile.md) above `local` on the strength
of those acceptances alone. Stronger profiles may require separation outright —
an approval that is not the writer's own when a path changes the control
plane — and must also prove that the recorded identity was authorised.

## It does not prove

A recorded role is a claim the record makes about itself. The reference checker
validates that roles are named and that a collapse is reported; it does not
validate that the participant named was authorised to hold the role, which is
the host's governance to prove.

Related: [writer assignment](./writer-assignment.md),
[coding path](./coding-path.md), [coherence audit](./coherence-audit.md),
[implementation candidate](./implementation-candidate.md).
