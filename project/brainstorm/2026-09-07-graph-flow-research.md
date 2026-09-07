---
type: Cairn Research Note
title: The graph-inspired flow — one edge, a year later
description: Research note 4 of 4 for the coding guidelines — Beads at its current release, the forge's own sub-issues and issue dependencies, and the agent products' fan-out shapes, read against Cairn's one edge, the live view's unblocked reading and the 1.1 overlap advisory; what Crumbz's sixteen paths declared and what ran beside what; whether a graph inside a path is asked for by anyone; the questions the owner must answer.
tags: [cairn, research, coding-guidelines, graph, depends-on, beads, parallel-paths, crumbz]
timestamp: 2026-09-07T17:00:00Z
cairn:
  status: provisional
---

# The graph-inspired flow — one edge, a year later

Answers section 4 of the
[brief](./2026-09-07-coding-guidelines.md): whether task graphs between
agents' work items are standard now and whether anything native covers
what Beads covers; whether a graph inside a path is asked for by anyone
and what it would cost the one-writer rule; whether one edge still
suffices after CP-016. Nothing here is a ruling.

## Sources

| Source | Pinned | Why it is a source |
| :-- | :-- | :-- |
| Beads, `steveyegge/beads` | release `v1.2.2` of 2026-08-15, tag at `8ed120b`; `README.md` read at that tag on 2026-09-07; about 27,000 stars | the graph tracker the convergence audit weighed on 2026-09-02 |
| GitHub, *Adding sub-issues* | <https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues>, read 2026-09-07 | the forge's native hierarchy |
| GitHub, *Creating issue dependencies* | <https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies>, read 2026-09-07 | the forge's native edge |
| Anthropic, *Best practices for Claude Code* | <https://code.claude.com/docs/en/best-practices>, read 2026-09-07 | `/batch`, agent teams, the Writer/Reviewer pair |
| OpenAI, *Follow a goal* | <https://learn.chatgpt.com/use-cases/follow-goals>, read 2026-09-07 | the one-session, one-goal shape |
| This repository | `b281786`: `spec/index.md` chapter 4's `depends_on` paragraph and chapter 5's *work beside other paths*, `tools/cairn-active.mjs`, ADR-003, the [roadmap register](../../project/coding-paths/index.md), the [convergence audit](../../docs/cairn/cairn-manifesto-convergence-2026-09-02.md) §3 | the one edge as decided and as coded |
| Crumbz, `sinlalune/crumbz` | trunk `358bb17`: the sixteen path records' `depends_on:` and `writes:`; the [audit of 2026-09-06](../../feedbacks/2026-09-06-crumbz-sixteen-paths-audit.md) for the registration and closing times | the only paths that ran beside each other |

## Summary

### Beads, one year on

On 2026-09-02 the audit read Beads as "Git-backed graph issue tracker for
agents: hash ids, dependency edges, `ready` work computed from the graph,
a database beside the code", and ruled "A graph is not necessary; one edge
is." At `v1.2.2` Beads is no longer Git-backed. Its README's first line is
"Distributed graph issue tracker for AI agents, powered by Dolt", a
version-controlled SQL database: "Dolt runs in-process — no external
server needed. Data lives in `.beads/embeddeddolt/`. Single-writer only";
cross-machine sync is "`bd dolt push` and `bd dolt pull` against
`refs/dolt/data`; `.beads/issues.jsonl` is an export for viewers and
interchange, not the source of truth or a full database". The
shape the audit warned about became the whole product. What it keeps that
Cairn weighed: `bd ready`, "List tasks with no open blockers"; `bd dep add
<child> <parent>` for "blocks, related, parent-child"; hierarchical ids for
epics; and, new, agent-to-agent messages and a "memory decay" that
summarises closed tasks. Its bootloader text tells the agent "Do not use
markdown TODO lists for task tracking." Beads and Cairn now disagree on
the premise, not the edge.

### What the forge does natively

**Sub-issues.** "Up to eight levels of nested sub-issues" and "up to 100
sub-issues per parent issue"; progress rolls up and "is also available in
your projects, allowing you to build views, filter, and group by parent
issue." Hierarchy, not order.

**Issue dependencies.** Two relations, "blocked by" and "blocking", set in
the issue's sidebar, by `gh issue create --blocked-by`, or by the API's
`blockedBy` and `blocking` fields; "Blocked issues are marked with a
'Blocked' icon on your project boards or repository's Issues page." No
rule follows from it: a blocked issue can be closed, and nothing stops
work on it. It is exactly one edge, projected as a badge — what
`cairn-active` prints as `unblocked` or `waits on`.

### What the agent products do with many agents

Anthropic's shapes for parallel work are worktrees: "run separate CLI
sessions in isolated git checkouts so edits don't collide"; `/batch`
"split[s] the change across 5 to 30 subagents. Each subagent works in its
own worktree and opens a pull request"; a Writer/Reviewer pair is two
sessions on one diff, one of which writes. Agent teams — "shared tasks,
messaging, and a team lead" — are "experimental and disabled by default."
OpenAI's goal is "one objective and one stopping condition" in one
session with checkpoints. In none of these do two writers share a
worktree; fan-out is many worktrees, each with one writer and one pull
request, which is the path.

### Cairn's edge, as decided and as coded

Chapter 4: `depends_on:` in the record; the live view "shows which
registered paths are **unblocked** — every path they depend on is done —
so the next piece of work is a fact the repository computes, not a
judgement someone repeats in every planning conversation. A graph beyond
that one edge is a database beside the repository, and Cairn does not
keep one." Chapter 5: "Several paths run at once. Registration and
integration are ordered because they change the trunk; everything between
them is parallel"; "overlap is visible through `writes:` and is a signal,
not a lock." `tools/cairn-active.mjs` projects the edge: `unblocked` when
every dependency has reached the trunk, else `waits on <ids>`. ADR-003
adds the advisory `writes-overlap` at registration and at every unit while
two paths with intersecting surfaces are live, silenced by `depends_on`,
and says that dropping a declared dependency while the earlier path is
live "is the overlap reappearing, and the advisory says so." The 1.1
roadmap register is itself the edge used as a plan: five coding paths "in
the order their `writes:` allow without overlap; a path that must wait for
an earlier one declares `depends_on`."

### What Crumbz declared and what ran beside what

| Measure, sixteen paths at `358bb17` | Value |
| :-- | --: |
| paths declaring a non-empty `depends_on` | 2 of 16 |
| of which kept to closure | 1: CP-015 on CP-013 |
| of which dropped while the earlier path was live | 1: CP-016 on CP-015, at registration |
| paths declaring `writes: src/**` or its three folders | 9 of 16 |
| pairs of paths live at the same time among 008–016 | 6: 011–012, 012–013, 013–014, 013–015, 014–015, 015–016 |
| of those, pairs whose `writes:` intersect | 6, the module note alone in the case of 014–015 |
| of those, pairs where an edge was declared | 1: 015 waits on 013 |
| paths with more than one writer, ever | 0 |
| units out of order inside a path | 0: every path's steps are S01 to Snn by one writer |

The one edge was used correctly once and dropped once, and the dropping
is the case ADR-003 was written on. Under 1.1 every one of the six pairs
would have raised `writes-overlap` at the later registration, and five of
them would have had to declare the edge or record the owner's acceptance.
Inside a path nobody asked for a graph: the longest path, CP-004, ran
twenty units in a line by one writer, and CP-016's six units were a line
too. Where two things had to move at once, the owner opened two paths, as
with 013 and 014 in the same afternoon.

## Conclusion

### What this changes about the vision

1. **One edge still suffices, and the year confirmed the direction.** The
   forge's own dependency is the same edge with the same projection, and
   the one graph tracker built for agents left Git for a database. Cairn
   was right to keep the edge in the record and the projection in a
   generated view, and it is now the native shape twice over: the forge
   has it, and the record has it.
2. **CP-016 is closed by ADR-003, not by a graph.** The overtaking
   happened with the edge available and dropped; a graph would have
   carried the same dropped edge. What was missing was the reading of two
   surfaces, and 1.1 reads them. Nothing here reopens it.
3. **A graph inside a path is asked for by nobody**, and the products'
   own fan-out is the path multiplied: one worktree, one writer, one
   request, many times. Agent teams exist and are switched off by default.
   The one-writer rule costs nothing that anyone has asked to pay, and it
   is what makes a unit's commit one writer's claim.
4. **What the forge has and Cairn does not is a place to see the edge
   before the record exists.** A path is a folder on the trunk; an issue
   with `blocked by` is a line in the forge before any folder. For a sole
   owner planning the next five paths, the roadmap register is that place
   today, and it is a table the owner edits. Whether the forge's issue
   should mirror the path is the question below, and the manifesto's
   duplicate-folders warning applies to two records of one edge.
5. **Hierarchy is the register, not a field.** Sub-issues give milestone
   to task to sub-task; Cairn gives milestone to path to unit through the
   register, the folder and the step files. The register is the one level
   nothing generates, and ADR-008 d5 makes `cairn-active` at least report
   it. That is enough until a second adopter has more than one milestone.

### What it does not settle

- Whether a sole owner wants an issue per path at all; Crumbz used none,
  and the request was the path's only forge object.
- Whether the roadmap register should carry `depends_on` between
  milestones as well as between paths; one adopter, one milestone at a
  time, no evidence.
- What agent-to-agent messaging would do for two paths that wait on each
  other; Beads and Anthropic both added it this year, and Cairn's answer
  today is the record's resume section, read cold.

### Questions for the owner

Tags as in the 1.1 decisions page: **simplest** removes or avoids a rule,
**native** uses what the tools already do, **adds a rule** or **adds a
tool** is something new to weigh, **one sentence** is neither.

**Q1. Where does the edge between two paths live?** Today it is
`depends_on` in the record and `unblocked` in the generated view; the
forge can show the same edge as a `Blocked` badge on an issue.

- [ ] **In the record only.** *(simplest, as today)* `depends_on` and the
  live view; the overlap advisory of 1.1 makes a missing edge visible.
- [ ] **In the record, mirrored on a forge issue.** *(native, but a
  second copy)* Each path has an issue; the open skill sets `blocked by`
  from `depends_on` so the forge's board shows what waits. Two places for
  one fact, kept in step by hand.
- [ ] **In a graph beside the code.** *(adds a tool)* Beads or the like,
  with `ready` computed from the graph. The audit refused it; offered
  again only because Beads changed.

**Q2. May a path have more than one writer?** Nobody on Crumbz needed it,
and the products fan out into worktrees with one writer each.

- [ ] **No; a second agent opens a second path.** *(simplest, as today)*
  One path, one worktree, one writer; a helper agent inside the writer's
  session is the writer. One sentence in the unit skill says the last
  part, which the spec implies and never states.
- [ ] **Yes, in the writer's session.** *(one sentence in a skill)* The
  writer may run subagents in its own worktree and answers for their
  commits as its own; the record names one writer. Same rule, said for
  the products that offer it.
- [ ] **Yes, two writers on one path in two worktrees.** *(adds a shape)*
  Units as a graph inside the path, merged on the path branch. Nothing
  asked for it and the unit's claim of one writer goes.

**Q3. Does the roadmap register carry the edge between milestones?** The
1.1 register orders five paths under one milestone by `depends_on`; a
second milestone would wait on the first in prose.

- [ ] **No.** *(simplest, as today)* One milestone at a time; the order of
  rows is the order.
- [ ] **A `waits on` column in the register.** *(one sentence in a
  template)* The table names what a milestone waits on, read by nobody
  but the owner.
