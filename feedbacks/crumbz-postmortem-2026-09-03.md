---
type: Cairn Learning Note
title: Post-mortem — Crumbz CP-001 and CP-002 on the Antigravity harness with Gemini 3.8
description: What the first adopter's two coding paths, driven by Gemini 3.8 inside the Antigravity harness on 2026-09-03, respected of the 1.0 protocol and what they did not, read from the repository alone; the friction it exposes is 1.1 material.
tags: [cairn, post-mortem, adopter, crumbz, gemini, antigravity, learning]
timestamp: 2026-09-03T00:00:00Z
cairn:
  status: provisional
---

# Post-mortem — Crumbz CP-001 and CP-002 on the Antigravity harness with Gemini 3.8

## Context

Crumbz (`sinlalune/crumbz`, private) is the first project launched on Cairn
1.0, installed from the kit at cairn commit `e26f19d`. On 2026-09-03 the owner
ran the first two coding paths with **Gemini 3.8** inside the **Antigravity**
harness (Gemini CLI). The records call the agent "Antigravity" and the owner
"Toure". A third path, CP-VALUE-BOARD-VISION-003, was opened later the same
day by a different agent and is used below only as a control.

| Path | Route | Units | Candidate | Wall time |
| :-- | :-- | --: | :-- | :-- |
| CP-FOUNDATION-001 | full | 5 | `07c7998` | 11:13 → 12:18 (+02:00) |
| CP-LIVE-FEED-002 | full | 10 | `106f11d` | 12:19 → 14:04 (+02:00) |

Everything below was read from the repository, the pull requests and the CI
runs. Nothing comes from the conversation. The checker was re-run on `main`
and on each candidate and administrative commit; the test suite was re-run on
`main`. Both are green today.

## What was respected

- **Registration before branching.** Both registration commits are
  metadata-only, their parent equals `base_commit`, and each path branch forks
  from its registration commit.
- **Opening acceptance with a tool-computed digest.** Both digests were
  produced by `--scope-digest`; recomputed today they still match.
- **One commit per unit, pushed at once.** All fifteen units carry code, the
  step file, the path index and the module note together. CI was green on
  every push.
- **Step records append-only.** No step file was touched after the commit
  that added it.
- **Exact-candidate closure.** Each `ready` commit is exactly one commit after
  its candidate and touches only the index and the live view. Both candidates
  are reachable from `main`. Both pull requests merged as merge commits.
- **No history rewriting.** No amend, rebase or force-push on any branch.
- **Writes widened in the same unit.** CP-001 S01 added three files to
  `writes:` and said so in the step.
- **One-way route escalation.** CP-002 moved `lightweight` → `full` at S02,
  when the multi-unit trigger fires.
- **The checker caught a real defect.** The first CP-002 registration carried
  a hand-written, wrong `base_commit`. CI failed on `registration-base`; a
  second registration commit fixed it.

## What was not respected

Ordered by weight.

1. **The resume checkpoint was never filled.** All fifteen unit commits leave
   `Checkpoint: unpinned`. The handoff contract requires the last commit
   already on the remote. Neither path could be resumed cold from its record.
2. **No closing acceptance on either pull request.** PR #1 and PR #2 carry
   zero approving reviews; the only review is a Codex bot comment. On
   `pull-request` transport the approval is the acceptance, so both paths
   reached `ready` and `done` without one.
3. **PR #2 merged before its check ran.** The merge landed at 12:03:57Z; the
   `pull_request` run started at 12:04:02Z, then failed `registration` and
   `rebase` because the trunk it read already contained the merge. The push
   run on the same commit was green, so the code was fine, but "merge with
   `cairn-check` green on the commit that lands" was not followed, and nothing
   on the forge enforced it.
4. **Trunk commits bypassed the declared transport.** Both registration
   commits, the base-commit fix, and both `done` commits were pushed straight
   to `main`. The configuration declares `pull-request` for registration and
   integration. CP-003 used a registration branch and PR #3.
5. **One commit outside any unit.** `12e1cb6 fix(fixtures-route)` on the
   CP-002 branch changes source with no step, no path prefix and no
   `Cairn-Provisional` trailer.
6. **CP-002 outgrew its accepted outcome.** The definition of done names four
   things: date-range ingestion, odds ingestion, a fixtures endpoint, dashboard
   wiring. S01 delivered all four. S04–S10 then added a squad fetcher, a 3×3
   sector matrix, an expected-metrics ingestion pipeline writing a new table,
   xRank, and a ~900-line SVG pitch canvas. The digest never moved because the
   text never moved; `scope-drift` never fired because `writes:` says
   `src/**`. This work belonged to new paths born from the roadmap.
7. **`type: repair` misused.** Five CP-002 units are `repair` for product bug
   fixes (inverted home/away, overlapping labels). In Cairn a repair corrects a
   protocol violation and names it. The escalation reason recorded in the
   index — "upon introducing repair unit S02" — names the wrong trigger, and
   S02 itself says nothing about escalating.
8. **Units lost their shape.** CP-001 steps have Plan, Changes, Self-review,
   Verification. CP-002 steps have a past-tense Description and Verification
   only: no self-review, no statement of what the unit will not do. One of ten
   units added a test while every unit changed source.
9. **A definition-of-done item was not delivered.** CP-001 promised health
   *and leagues* endpoints under `/api/v1`. No leagues route exists; the PR
   states the scope was met and the path is `done`.
10. **The `done` commit carried cargo.** CP-002's integrating commit also adds
    a brainstorm note. Both journal entries lack the subject and integration
    commit ids and carry a duplicate top-level `path:` key.
11. **No secondary worktree.** The reflog shows the path branches were checked
    out in the primary clone by switching branches. CP-003 uses a worktree.
12. **Stages 3 and 4 skipped.** The architecture pages and four ADRs landed in
    one direct commit to `main` with no promotion path and no review. The
    roadmap register still shows the installer's placeholder row, so neither
    path is accounted for by a milestone.

Smaller: record `type:` strings differ from the template, `assigned_writer`
and `current_step` are absent, step files have no frontmatter, forward plans
were not maintained past the first step, and the CP-002 commit prefix drifted
from `CP-ID SNN:` to `path(cp-id): SNN`.

## Reading

Three patterns explain most of the list.

**Green means done.** The checker passed on every violation above except the
fake sha. That is by design — Cairn proves facts and leaves judgement to the
reviewer — but the agent treated "cairn-check is green" as "protocol
satisfied". Items 1, 6, 7, 8 and 9 are all invisible to the checker and all
visible to a reviewer who reads the record.

**The harness optimises for the next visible result.** Ten units in 105
minutes, each ending with "verified on localhost". The owner's feedback loop
("the pitch overlaps", "wrong odds leaked") drove the units, and the record
followed the loop instead of the definition of done. The path became a session
log with commits, which is exactly the shape the one-folder record was cut to
prevent.

**Solo-owner friction is real.** GitHub does not let the sole owner approve
their own pull request, and a private repository on a free plan cannot require
a status check. Items 2 and 3 are therefore partly structural, and CP-003 hits
them too.

## What this asks of 1.1

- **A running path with `Checkpoint: unpinned` after its first unit is a fact
  the checker could refuse.** The template already says the checkpoint names a
  remote commit; a predicate is cheap.
- **Solo acceptance needs a stated shape on `pull-request` transport.** Either
  the description's roles line is the acceptance when the forge cannot record
  an approval, or the skill says to fall back to `manual-git` for one-person
  repositories. Silence produced two closures with no acceptance at all.
- **The `ci` profile should say what it cannot see.** The profile's claim —
  the forge requires the check and the approval on the commit that lands — was
  false here and nothing printed it. `cairn-check` could read the repository's
  merge settings and protection through the forge when a token is present and
  downgrade the printed profile.
- **`repair` needs its one-sentence definition in the unit skill's type
  table.** "The corrective change, any superseding record owed, a step naming
  the violation" was read as "a fix".
- **The skills could name the outcome test in the unit plan.** One line —
  *which definition-of-done item does this unit advance?* — would have stopped
  S04–S10 or forced a scope amendment.
- **The open skill should refuse a hand-typed object id.** Every sha the record
  carries comes from a command; the skill says so for the digest and not for
  `base_commit`.

## Sources

- `sinlalune/crumbz` at `2bbe314` (trunk after CP-002 integration), read
  2026-09-03.
- Pull requests #1, #2, #3 and the `cairn` workflow runs of 2026-09-03,
  including failed runs `33743694718` and `33753107914`.
- The Cairn specification, skills and conformance page at `e26f19d`.
