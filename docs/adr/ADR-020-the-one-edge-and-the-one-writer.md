---
type: Cairn Decision Record
title: ADR-020 — the one edge and the one writer, confirmed
description: The edge between two paths lives in the record only, as depends_on projected by the live view; a path has one writer, and a helper agent inside the writer's session is the writer; the roadmap register carries no edge between milestones. Promotes Q13 to Q15 of the coding-guidelines decisions page; a record of what was weighed and kept, one sentence added.
tags: [cairn, adr, 1.1, depends-on, graph, one-writer, roadmap]
timestamp: 2026-09-07T00:00:00Z
adr:
  id: ADR-020
  status: accepted
  date: 2026-09-07
---

# ADR-020 — the one edge and the one writer, confirmed

Status: accepted · 2026-09-07 · written by CP-CAIRN-003, S04

**Promoted from** the owner's
[decisions page](../../project/brainstorm/2026-09-07-coding-guidelines-decisions.md)
at blob `48112c310e1c127b0265ed63c8255bb0377264fa` (Q13, Q14, Q15) and
[research note 4, the graph flow](../../project/brainstorm/2026-09-07-graph-flow-research.md)
at blob `a52ac0eca6c1ce963d913239943a9468b47f7a95`, its sections *Beads,
one year on*, *What the forge does natively* and *What Crumbz declared and
what ran beside what*. Both notes stay exactly as they were. It supersedes
no record of 1.1 and builds on
[ADR-003](./ADR-003-two-live-paths-on-the-same-files.md), which reads two
live paths' surfaces and is what closes the one case in which the edge
was dropped.

## Context

On 2026-09-02 the convergence audit weighed Beads, the graph tracker for
agents, and ruled that a graph is not necessary and one edge is. A year
later the edge is native twice over: the forge shows *blocked by* as a
badge on an issue, which is what the live view prints as `unblocked` or
`waits on`; and Beads itself left Git for an embedded database, single
writer, the shape the audit warned about become the whole product. The
agent products fan out into worktrees, one writer and one pull request
each, which is the path multiplied; agent teams exist and are off by
default.

On Crumbz, two of sixteen paths declared an edge. One kept it to
closure; one dropped it at registration while the earlier path was live,
took that path's files, and stranded it. Six pairs of paths ran side by
side with intersecting surfaces and one edge between them. No path ever
had two writers, no path's units ran out of order, and where two things
had to move at once the owner opened two paths in one afternoon. The
dropped edge is the case ADR-003 was written on, and under 1.1 every one
of the six pairs raises `writes-overlap` at the later registration.

The owner answered on 2026-09-07: the simplest option three times. This
record, like ADR-008, is mostly a record of what was weighed and kept.

## Decisions

### Decision 1 — the edge lives in the record only

Promotes **Q13**, *In the record only* — simplest, as today.

The edge between two paths is `depends_on:` in the later path's record,
projected by `cairn-active` as `unblocked` or `waits on`. No issue
mirrors it, no graph holds it. A missing edge between two paths whose
surfaces meet is what ADR-003's advisory makes visible.

What this changes: nothing.

### Decision 2 — one writer, and a helper agent inside the writer's session is the writer

Promotes **Q14**, *No; a second agent opens a second path* — simplest,
as today.

One path, one worktree, one writer, as the convention and chapter 5 say.
What neither states and the unit skill now says in one sentence: an
agent the writer runs inside its own session — a subagent, a second
context, the fresh reader of
[ADR-017](./ADR-017-the-review-movement.md) — is the writer, and the
writer answers for anything it edits as for its own hand.

What this changes: the `cairn-unit` skill, one sentence where the
worktree and its writer are named.

### Decision 3 — the roadmap register carries no edge between milestones

Promotes **Q15**, *No* — simplest, as today.

The register orders its rows, and the order of rows is the order of
milestones. Within one milestone the paths wait on each other by
`depends_on:`, as the coding paths of 1.1 do in the register today. A
`waits on` column would be read by nobody but the owner, who wrote the
rows in order.

What this changes: nothing; the register's shape in `registerIndex` of
`tools/cairn.mjs` stays as it is.

## Alternatives rejected

- **Q13, in the record, mirrored on a forge issue** (native, but a
  second copy): an issue per path, `blocked by` set from `depends_on`.
  Refused as two places for one fact, kept in step by hand — the
  manifesto's duplicate with a close mission. Crumbz used no issue; the
  request was the path's only forge object.
- **Q13, in a graph beside the code** (adds a tool): Beads or the like,
  with `ready` computed from the graph; offered again only because Beads
  changed, and refused again because the change was away from Git.
- **Q14, yes, in the writer's session** (one sentence): the writer may
  run subagents that commit, and answers for their commits, the record
  naming one writer. Refused for what it states: subagents that are
  writers the writer answers for, where decision 2 states one writer and
  no other.
- **Q14, two writers on one path in two worktrees** (adds a shape): units
  as a graph inside the path. Nothing asked for it, and a unit's commit
  would no longer be one writer's claim.
- **Q15, a `waits on` column** (one sentence in a template): a milestone
  naming what it waits on.

## Consequences

- One sentence in one skill, and the fresh reader of ADR-017 needs no
  rule of its own; the edge, the writer and the register stay what they
  are until an adopter with two milestones at once, or a request for a
  second writer, says otherwise.

## What the manifesto's test weighed

Three options kept, all *simplest*; five refused, a second copy, a tool
and a shape among them. The manifesto's two sentences that decided them
are *no duplicate folders with close missions* and *a solution not native
to Git, GitHub and CI is probably not a best practice* — the second made
literal by Beads leaving Git in the year since. Nothing enters the
checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | nothing | — |
| 2 | the unit skill | `cairn-unit`, one sentence |
| 3 | nothing | `registerIndex` in `tools/cairn.mjs`, unchanged |

The roadmap register names the coding path of 1.1 that carries the
sentence: the skills in path 1.
