---
type: Cairn Brainstorm
title: Coding guidelines — the brief for the research session
description: The owner's ask of 2026-09-07, verbatim, on the coding guidelines Cairn should give — a Ponytail-like stance, the coding step cycle, the component slicing discipline, the graph-inspired flow — with where each stands today, what the research must answer, how, and what it hands to the promotion path that will fuse it with 1.1.
tags: [cairn, brainstorm, coding-guidelines, research-brief]
timestamp: 2026-09-07T00:00:00Z
cairn:
  status: provisional
---

# Coding guidelines — the brief for the research session

Written at the close of CP-CAIRN-002 on 2026-09-07, for a fresh session on
the branch `research/coding-guidelines` in the worktree
`../cairn-coding-guidelines`. This is a brainstorm note: the owner's words
as they were said, what was known at the time, and what the idea waits
for. Nothing here is a ruling.

## The owner's ask, verbatim

> Before that I want to talk about the coding guidelines we suppose to give
> in cairn => ponytail like skill, coding step cycles (plan, execute,
> review, test, etc...), the repo/component slicing architecture discipline,
> the graph inspired flow etc... where are we at right now? Did we analyse
> that through our research in crumbz project?

> Make a brief for a fresh new chat session on that branch and work tree
> those guidelines built on what cairn is currently aiming or where it
> should depending on best practices on every of theses domains, then we
> will do a promotion path where we will fusion the findings with our
> recent 1.1 to build the ultimate version

## Where each guideline stands on 2026-09-07

| Guideline | In Cairn today | Studied on Crumbz? |
| :-- | :-- | :-- |
| The coding stance (Ponytail-like) | `skills/cairn-code/SKILL.md`, adopted in 1.0 from the [convergence audit](../../docs/cairn/cairn-manifesto-convergence-2026-09-02.md) §3: read the real flow first, the decision ladder, deletion over addition, the three-line cap, absorb the ecosystem | No. The five notes under `feedbacks/` read records, the checker and the lifecycle; nobody read the code Crumbz produced against the ladder |
| The coding step cycle | [Specification](../../spec/index.md) chapter 5: a unit is plan, change, self-review, verify, with a type that fixes what moves together; tests are inside the change; the review is the pull request; 1.1 adds that a repair is defined, that the plan names the outcome it advances, and that the owner tries the result before the merge (ADR-001, ADR-009) | Partly: the notes measured the shape — Gemini's units lost plan and self-review, Claude's kept all four, Codex named its rejections — never the quality of what the cycle produced |
| The component slicing discipline | Thin: configured areas with one module note each, split by main component in 1.1 (ADR-010); nothing on how to slice a system, which way dependencies point, or what a boundary is; the manifesto's *engine* asks only for the leanest tree and a free-standing hierarchy | Only through the module-note split (Q15). Crumbz's `docs/architecture/system-overview.md` states boundaries the protocol never asked it to state |
| The graph-inspired flow | Settled before 1.0 against Beads: a graph is not necessary, one edge is; `depends_on:` in the record and *unblocked* in the live view; 1.1 adds the `writes-overlap` advisory (ADR-003) | By accident: CP-016 dropped its dependency and overtook CP-015 |

The 1.1 shape every finding must be read against is
[`docs/architecture/01-cairn-1-1.md`](../../docs/architecture/01-cairn-1-1.md)
and the fifteen records under [`docs/adr/`](../../docs/adr/index.md).

## What the research must answer

One research note per domain, in the shape the
[brainstorm skill](../../skills/cairn-brainstorm/SKILL.md) gives: sources
pinned, summary, conclusion. Each conclusion says what it changes about the
vision and what it does not settle, and ends with the questions the owner
must answer, in plain language, two or three options each, every option
tagged *simplest*, *native* or *adds a rule* as the
[1.1 decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) did.

### 1. The coding stance

- What do the best current guides for coding agents say a stance should
  hold, and where does `cairn-code` fall short or say too much? Read
  Ponytail at its current version and the vendors' own best-practice
  guides for coding agents, dated.
- Read the code, not the records: a sample of Crumbz units from at least
  three paths and two agents, against the ladder. Did the code that was
  written need to exist, exist already, wrap the standard library, add an
  option nobody asked for, or leave a deletion undone? Count, do not
  impress.
- What the stance says nothing about and perhaps should: error handling,
  naming, comments, dependencies, secrets, the size of a change.

### 2. The coding step cycle

- Compare plan → change → self-review → verify with the cycles in use in
  2026: the spec-driven toolkits' specify → plan → tasks, test-first loops,
  a reviewer that is not the writer (a second agent, a review skill), the
  plan modes of the agent products. What do they have that the unit lacks,
  and what does the unit have that they lack — the step record, the
  candidate, the closure?
- Is a review movement inside the unit warranted beyond the request, and
  is a test-first movement warranted beyond *tests move with the change*?
  What would each cost against the manifesto's first threat?
- Where the owner's try before the merge (ADR-001 decision 3) and the
  post-mortem on a red run (ADR-014) fit in the cycle.

### 3. The component slicing discipline

- What the current practice for agent-built repositories says about
  slicing: vertical slices against layers, feature folders, packages in a
  monorepo, dependency direction, boundaries a reader can see from the
  tree, sizes that fit a context window.
- Read Crumbz's `src/` against its own architecture pages: is the code
  sliced as the pages say? Where a path crossed a boundary, did anything
  notice?
- What the least discipline Cairn could state would be: a shape for the
  architecture page, a sentence in the coding stance, a rule in the
  checker, or nothing beyond the module notes — with the deletion option
  beside every addition.

### 4. The graph-inspired flow

- One year of tools later: are task graphs between agents' work items
  standard now, and does anything native — the forge's own issue
  dependencies, projects, sub-issues — cover what Beads covers?
- Is a graph inside a path — units as a dependency graph, several agents
  on one path — asked for by anyone, and what would it cost the one-writer
  rule?
- Does one edge still suffice, given CP-016, or does 1.1's overlap
  advisory already close the case?

## How to work

- Read, in order: `AGENTS.md`, the brainstorm skill, this note, the 1.1
  architecture page, `skills/cairn-code/SKILL.md`, chapters 5 and 6 of the
  specification, the convergence audit's section 3, and the four notes
  under `feedbacks/` for the Crumbz evidence.
- Pin every source: a URL with the date read, a repository at a commit.
  Crumbz is `sinlalune/crumbz` at `358bb17`; this repository at `b281786`.
- Read the manifesto before writing any conclusion; the first threat is
  more control through more rules, and a solution not native to Git,
  GitHub or CI is probably not a best practice.
- Write only under `project/brainstorm/` on this branch, one commit per
  note, pushed as each is finished; never touch the 1.1 records or the
  specification — that is the promotion path's work.
- Open one pull request from `research/coding-guidelines` to `main` when
  the four notes and the decisions page are done, as the feedback notes of
  September did. No coding path is needed for research; the tools check
  links and frontmatter, nothing more.

## What it hands over

Four research notes and one decisions page for the owner. After the
owner's answers, a promotion path on the `full` route, documents only,
governed by the notes at their blob ids, amends the 1.1 architecture page,
adds decision records for what is new, supersedes any 1.1 record the
findings overturn, and names the coding paths that build it — the fusion
the owner asked for. The notes stay exactly as they were.

## What this idea is waiting for

The research session: four notes with pinned sources and one page of
plain-language questions, before anything here becomes a ruling.
