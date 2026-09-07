---
type: Cairn Decision Record
title: ADR-006 — what closing leaves behind
description: After a path is integrated, its branch stays until the path is archived, every other branch the transport made is deleted on merge, and the writer removes the path's own worktree as the last step of closing and reports if it could not. Promotes R23 and R24.
tags: [cairn, adr, 1.1, closure, branches, worktrees]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-006
  status: accepted
  date: 2026-09-06
---

# ADR-006 — what closing leaves behind

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S04

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q10 and Q11) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R23 and R24). Both notes stay exactly as they were.

## Context

The protocol keeps a path's branch as its history and says nothing about
the other branches a transport creates. On Crumbz after sixteen paths the
forge held forty-five branches: `path/`, `register/`, `plan/`,
`repair/`, an `integrate-016` and a `pr/32-merge`. The close skill's
last step removes the path's worktree, from another checkout, only when it
is clean; seven worktrees of done paths were still on disk, one handed to
the owner "once its dev server is stopped", and none had been removed by
the agent that opened it.

## Decisions

### Decision 1 — the path branch stays, every other transport branch goes

Promotes **R23**, from Q10. The owner's choice: *"Delete the temporary
ones, keep the work branches until the path is archived."*

A branch named `path/<id>` is the path's history and stays on the remote
until the path is archived. Every other branch a transport made for the
path — a registration branch where a transport still uses one, a planning
or integration branch — is deleted when its request merges. The forge's
own *delete branch on merge* setting is not the mechanism, because it
would delete the path branch too, which is the request's source; the
sentence lives in the close skill and the writer deletes the branch with
one Git command after the merge is proved.

What this changes: the `cairn-close` skill, step 6, one sentence and one
command in its reference. Under ADR-001 a sole owner's repository makes no
registration branch, so on such a repository the sentence has nothing to
delete.

### Decision 2 — the writer removes the worktree and reports a failure

Promotes **R24**, from Q11. The owner's choice: *"The agent removes it as
the last step of closing, and reports if it could not."*

The close skill's step 6 is run by the writer, from another checkout,
before the closing report, never handed to the owner: the exact secondary
worktree, clean, without force, the branch kept. When the worktree cannot
be removed — dirty, absent, or the primary checkout — the report says so
as a separate outcome from the integration, which is already the rule.
No predicate is added, and the live view does not list stale worktrees:
the owner chose the step over the report.

What this changes: the `cairn-close` skill, step 6, which already says
what to do and now says who does it and when.

## Alternatives rejected

- **Delete everything after merge** (Q10, native): one forge setting, but
  it deletes the path branch the protocol keeps.
- **Keep everything** (Q10, as today): forty-five branches.
- **The agent lists stale worktrees and the owner removes them** (Q11):
  a report instead of the step that already exists.

## Consequences

- A repository's branch list is its trunk and its paths, nothing else.
- A closing report has two outcomes, integration and cleanup, and a
  cleanup that failed is written, not deferred.
- No new rule; two sentences in one skill.

## What the manifesto's test weighed

Both questions were answered with the option tagged *one sentence in a
skill* or *native*. Decision 1 explains why the one native setting cannot
be used and stays with a command the writer runs. Nothing is added to the
checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the close skill and its reference | `cairn-close` step 6; `skills/cairn-close/reference.md` |
| 2 | the close skill | `cairn-close` step 6 |
