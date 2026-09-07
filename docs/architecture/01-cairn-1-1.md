---
type: Cairn Architecture
title: Cairn 1.1 — a repository run by a sole owner with agents
description: What a Cairn 1.1 repository is as a whole — how a path opens, runs and closes when one owner works with agents, what the checker reads at each transition, what the documentation plane holds and where, which tools exist, and what 1.1 removes from 1.0 — naming the decision record behind every statement.
tags: [cairn, architecture, 1.1, sole-owner]
timestamp: 2026-09-07T00:00:00Z
---

# Cairn 1.1 — a repository run by a sole owner with agents

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` and the
[rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at blob
`313f8ea18fe77d0fb6f641ac969989dc4d35a17f`, through the fifteen
[decision records](../adr/index.md) ADR-001 to ADR-015. The notes stay
exactly as they were. This page states what the records decide as one
shape; where a sentence relies on a record, the record is named. Nothing
here is implemented yet: the [roadmap register](../../project/coding-paths/index.md)
names the coding paths that build it.

## What 1.1 is for

Cairn 1.0 was cut from the [specification](../../spec/index.md) and
released on 2026-09-03. Its first adopter, one owner working with three
agents, ran sixteen paths in three days, and five notes under
`feedbacks/` read what held and what did not. Two things did not hold.
The protocol assumed a reviewer who is not the writer, and a sole owner
reviews their own requests, waits on themself, and cannot approve their
own pull request. And the checker read the repository more thinly than its
vocabulary: a draft record, a ticked checkbox at `done`, two paths on the
same files, a detached checkout in CI, each passed or failed for the wrong
reason.

1.1 is the protocol for the repository that adopter is: one owner, agents
as writers, GitHub as the forge, one workflow. It changes no stage of the
chronology and no shape of a record. It changes who gives the go-ahead and
how, what the checker reads, what the skills say, and what an adopter's
`docs/` holds from the first day.

## How a path opens

The agent writes the path record — one folder, the definition of done as a
list of checkboxes, the write surface, the governing documents pinned by
blob id — and puts it to the owner. *The owner reviews the plan* is a
named step; a change asked before the go-ahead is written into the record
(ADR-001, decision 2). The owner's yes in the chat is the opening
acceptance: the agent writes it into the record with the owner as
`accepted_by`, computes the digest with the checker, regenerates the live
view, and lands the registration commit on the trunk directly. A sole
owner's repository declares `transport.registration: manual-git`; there is
no `register/` branch and no registration request (ADR-001, decision 1).
On a forge whose trunk ruleset requires a request, the owner's role
bypasses it, and the checker prints that bypass on every run (ADR-001,
decision 6).

Nothing is coded before the registration commit is on the remote trunk.
Then the branch `path/<id>` and its worktree are created from that
commit, and the first unit starts. If the new path's `writes:` meets a live
path's, the registration run says so, and the later path declares
`depends_on` or the owner records the accepted race (ADR-003).

An amendment after acceptance is a second acceptance block naming the
first; the definition of done is never edited in place, ticks included
(ADR-002, decision 2).

## How a path runs

A unit is plan, change, self-review, verify, and it moves as one commit,
pushed at once, as in 1.0. The plan names the definition-of-done item the
unit advances (ADR-009, decision 2); `repair` means a correction of a
protocol violation that names it, and nothing else (ADR-009, decision 1);
no object id in any record is typed by hand (ADR-009, decision 3). A
fresh worktree installs its dependencies before the first gate, and every
gate is read by its exit code (ADR-008, decision 7). A block a framework
writes into the bootloader is moved to a file the kit does not own, never
committed in place (ADR-007).

The writer's own bare gate before each push is the unit's check. The
forge no longer runs on pushes to path branches: one run per commit that
can land (ADR-005). A writer who wants the forge on every unit opens the
request as a draft at the first unit.

An implementation unit refreshes the module note of the area it changes
to the current state, and adds no history to it; history is the journal's
(ADR-010, decision 1). An area every path touches, or whose match covers
every source file, is split by main component, and the open skill asks
which area a path writes in (ADR-010, decision 2).

## How a path closes

The writer merges the trunk in, produces candidate `C`, runs the gates on
it bare, and opens the request from the path branch with the review as
its description: the candidate, its base, the digest, the four coherence
questions, the advisories with their dispositions. There is no closure
step and no step file for the review (ADR-008, decision 1). The owner
tries the result — for documents, reads the pages — and ticks the one box
in the request that only the owner ticks (ADR-001, decision 3). The
administrative commit follows: `ready`, `subject_commit`, the live view,
the checkpoint, nothing else, never under a provisional trailer (ADR-008,
decision 3).

The owner merges only after the request's run on the exact commit that
will land is read green (ADR-001, decision 5), as a merge commit. The
merge click is the closing acceptance; no other shape is added for a sole
owner (ADR-001, decision 4). The integrating unit is one commit for one
path from a clean trunk checkout — `done`, the resolution, the live view,
one journal entry naming the path under `cairn.path` — never a merge
object carrying the edit, never two paths in one request (ADR-008,
decisions 2 and 4). A trunk commit that takes a path from `running` to
`done` with no `ready` commit is refused (ADR-001, decision 7).

Then the writer proves `C` reachable from the remote trunk, deletes every
branch the transport made except `path/<id>`, which stays until the path
is archived, and removes the clean secondary worktree from another
checkout, reporting a failure to remove as its own outcome (ADR-006).

## What the checker reads at each transition

The checker is the same tool, reading more.

| Transition | What is read | Record |
| :-- | :-- | :-- |
| registration on the trunk | the record's schema and route; the registration commit is the trunk commit in which `status` became `running`, and `base_commit` its parent, a draft landed earlier notwithstanding; the trunk's own run judges the commit after it lands | ADR-004 d1; ADR-001 d1 |
| registration and every unit | two live paths whose `writes:` intersect, as the advisory `writes-overlap`, silent under `depends_on` | ADR-003 |
| every unit on the branch | the `cairn-unit` block; a running path's checkpoint names a remote commit once it has a unit; the scope digest of the definition of done, whatever the status | ADR-004 d2; ADR-002 d1 |
| every run, any ref | the branch resolved as the local ref, else `HEAD` on the request head, else the remote-tracking ref; range rules reading only this path's records; the profile line naming what the forge does not enforce | ADR-004 d5, d3; ADR-001 d6 |
| the request's run at `C` and at `ready` | trunk containment, no provisional commit, the closure surface, the digest, drift since the base; the one administrative commit after `C` | 1.0, kept; ADR-008 d3 |
| the integrating unit on the trunk | the digest again; one commit for one path, not a merge; a `ready` commit behind the `done`; the journal entry under `cairn.path` | ADR-002 d1; ADR-008 d2; ADR-001 d7; ADR-008 d4 |
| any refusal | the message names the remedy; a pushed record is corrected by a superseding step | ADR-008 d6 |

Every blocking rule's fixture contains a merged trunk commit carrying
another path's completed unit (ADR-004, decision 4), and the three repairs
the adopter made to its own checker — same-branch step supersession,
chronological path-scoped provisional resolution, detached-checkout
evidence — are the kit's (ADR-004, decision 6).

## What the documentation plane holds, and where

An adopter's `docs/` is installed with its shape and grows by promotion:

| Where | What | Written by | Record |
| :-- | :-- | :-- | :-- |
| `docs/inputs/` | documents the owner had before the protocol, any format, unedited | the owner; read by the first session | ADR-011 d1 |
| `docs/<surface>.md` | one readable page per product surface, the concept notes as its glossary | every promotion unit that changes what the surface does | ADR-012 |
| `docs/architecture/` | pages like this one | promotion units | 1.0, kept |
| `docs/adr/` | one record per decision, counted from ADR-001 with no gaps | promotion units and paths that decide | 1.0, kept; numbering in the folder's index |
| `docs/modules/` | one note per main component, current state only | implementation units | ADR-010 |
| `docs/concepts/cairn`, `docs/concepts/<project>`, `docs/concepts/learning` | the protocol's terms as this project's reader needs them, the product's own terms, knowledge from outside | any session that explains an abstraction, by one line in the bootloader | ADR-011 d2, d3 |
| `cairn/README.md` | the installed release, the six chapters and five skills at that release, the files the kit owns, and the edited files the last update could not rewrite | the kit, at `init` and `update` | ADR-013; ADR-015 d2 |
| `project/coding-paths/index.md` | the roadmap register, every milestone with a path or *no path yet*; reported while it still carries the installer's row | the owner and the promotion paths | ADR-008 d5 |
| `project/log/` | one journal entry per integration, the only history of what a path did | the integrating unit | 1.0, kept; ADR-010 d1 |

The protocol's own repository keeps its concept wiki under `spec/concepts/`,
which is the `cairn` scope itself, and its surfaces' pages are the README
and the site that projects it (ADR-012).

## Which tools exist

| Command | Does | Record |
| :-- | :-- | :-- |
| `cairn-check` | the blocking and advisory rules on the exact commit, with a profile line that says what the forge does not enforce | 1.0; ADR-001 d6 |
| `cairn-active` | the live view of running paths; reports a roadmap register still carrying the installer's row | 1.0; ADR-008 d5 |
| `cairn-audit` | the request's description for one candidate, with the owner's box unticked | 1.0; ADR-001 d3 |
| `cairn-postmortem` | for one path or the repository, the mechanical reading the adopter notes did by hand; run by the workflow when the gate goes red, into the run's log and onto the request, and on demand | ADR-014 d1 |
| `cairn-test` | this repository's fixture suite for the tools, run by this repository's workflow before the checker and proven at each release; the kit installs no suite and names no test script, so `npm test` stays the adopter's | ADR-014 d2 |
| `cairn` | `init`, `status`, `update`, `adopt`, as in 1.0; installs the pointer page and the three concept folders; `update` rewrites every pristine file, prints what the release changes in an edited one and lists it on the pointer page, and takes the release's version of a named file on request | 1.0; ADR-011, ADR-013, ADR-015 |
| the workflow | one job, one run per commit that can land: the request's run for a candidate, the trunk's run for a registration and an integration | ADR-005 |

The kit of 1.1 ships with at most twenty-nine files, the pointer page, the
three indexes and the post-mortem tool included, which is two removals from
what 1.0 installs plus these five (ADR-013, ADR-014). A repository that
installed 1.0 receives all of this through `update` (ADR-015).

## What 1.1 removes from 1.0

- **The registration request.** A sole owner's plan lands on the trunk
  directly after the go-ahead in the chat (ADR-001, decision 1). With it
  go the `register/` branches and the `registration-pending` rule that
  was proposed to tolerate the wait.
- **The push run on path branches.** One run per commit that can land
  (ADR-005).
- **The module note's history.** The note describes now; the journal
  holds what each path did (ADR-010, decision 1).
- **The shortcut from `running` to `done` on the trunk** (ADR-001,
  decision 7).
- **A closure step.** There never was one; the skill now says so
  (ADR-008, decision 1).
- **The duplicate journal key**, and the message that produced it
  (ADR-008, decision 4).

And what 1.1 keeps that the notes asked to remove: the checkboxes of the
definition of done (ADR-002, decision 2), and the merge click as the whole
of a sole owner's closing acceptance (ADR-001, decision 4).

## What this page does not say

How any of it is coded. Each record names the rule, skill, file or command
it changes by today's name, and the coding path that implements it is
scoped from the record. When a coding path finds a record wrong, it writes
a superseding record and amends this page; nothing here is rewritten to
look as if it had always been so.
