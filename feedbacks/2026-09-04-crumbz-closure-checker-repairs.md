---
type: Cairn Learning Note
title: Post-mortem — Crumbz closure blocked by three checker repairs
description: How one unsupported unit type on CP-VALUE-BOARD-IMPLEMENTATION-004 cascaded into an immutable edit, a provisional commit, three control-plane repair paths and two review rounds before the first closure that followed the sequence in full, and what the 1.0 checker got wrong about ranges, checkouts and bound text.
tags: [cairn, post-mortem, adopter, crumbz, checker, closure, learning]
timestamp: 2026-09-04T13:00:00Z
cairn:
  status: provisional
---

# Post-mortem — Crumbz closure blocked by three checker repairs

## Context

Crumbz (`sinlalune/crumbz`) runs Cairn 1.0.0 from the kit at cairn commit
`e26f19d`. Its Value Board implementation path was accepted by the owner
after an end-to-end walkthrough on 2026-09-03 and instructed to close. As of
2026-09-04 midday it is still `running`. Nothing in the product blocked it;
three successive repairs to the installed checker did. Everything below is
read from the repository, the pull requests and the CI runs.

| When (+02:00) | Object | What happened |
| :-- | :-- | :-- |
| 09-03 23:21 | CP-004 S15 (`64f13aa`) | Closure readiness recorded with unit type `review`, which the unit table does not contain. The checker refused it. |
| 09-03 23:22 | CP-004 S15 edited (`35e6d65`) | The agent edited the pushed S15 to change the type. Step records are append-only, so the checker now reported an immutable-record mutation as well. |
| 09-03 23:26 | CP-004 S16 (`4d57a88`) | A repair step declared that it superseded S15 and pinned both blobs, pushed as a provisional commit (`Cairn-Provisional:` trailer). Cairn 1.0.0 had no supersession mechanism and still reported both faults. |
| 09-03 23:37 → 09-04 06:38 | CP-CAIRN-SUPERSESSION-005 | Control-plane path: a repair step may supersede an invalid same-branch step by binding its before/after blobs. PRs #6, #7, #8. |
| 09-04 08:41 | CP-004 S17 (`5066696`) | The trunk merged in and the supersession bound. The gate then failed on the provisional commit still inside `base..candidate`: the 1.0 rule was a timeless grep. |
| 09-04 06:41 → 08:47 | CP-CAIRN-PROVISIONAL-006 S01 | Control-plane path: a later commit that adds a valid completed step record resolves earlier provisional commits. PR #9, #10. |
| 09-04 ~09:00 | PR #10 review | Finding: `base..candidate` contains every commit the trunk merge brought in, and S01 counted a step record under **any** `CP-*` folder. CP-005's merged-in S01 and S02 would have cleared CP-004's provisional commit on their own. |
| 09-04 13:58 | CP-006 S02 | Completion evidence restricted to the checked path's own `steps/` folder. Verified on the real CP-004 range: the two CP-005 records no longer count, CP-004's own S17 still resolves `4d57a88`. |
| 09-04 ~14:05 | CP-004 candidate `d66bec2` | Trunk merged in; gate, tests, typecheck green. The scope digest no longer equals the opening acceptance: `64f13aa` had ticked the seven definition-of-done checkboxes, and the digest hashes the section text. |
| 09-04 ~14:08 | CP-004 S18 (`1fda64a`) | Repair: the checkboxes restored to the accepted text; digest equal again. Closing PR #12 opened with the filled audit. |
| 09-04 ~14:11 | PR #12 checks | Push run green; pull-request run red with four errors nobody had seen locally: S17's supersession blob "not reachable from the current path branch", so S15's superseded faults return. The workflow checks out the request head detached, with no local branch ref. Reproduced only in a fresh clone with remote-tracking refs alone. |
| 09-04 14:15 → 14:47 | CP-CAIRN-DETACHED-CHECKOUT-007 | Third control-plane path: supersession evidence proven against HEAD when the local branch ref is absent, remote checkpoint judged against `origin/<branch>` when no upstream is configured. PRs #13, #14, #15. |
| 09-04 ~14:20 | PR #12 review | Four implementation findings from the reviewer bot: unpaginated season-wide fixture sync, bookmaker preference blind to snapshot age, card confidence ignoring the tactical sample, no request-generation guard on the mode toggle. |
| 09-04 14:38 | CP-004 S19 (`ca46d61`) | All four answered in one unit with tests; 59 → 68 tests, build green. The candidate is void by definition. |
| 09-04 14:48 → 14:49 | CP-004 candidate `733cadf`, `ready` at `9d9e200` | Trunk merged in after 007 integrated; gate green locally, in the detached clone, and on both pull-request checks. First closure on this repository with the administrative `ready` commit in place before the merge, with drift checked and zero. |
| 09-04 ~15:00 | PR #12 merged at `1230d79`, PR #16 | Approved and merged as a merge commit with the `ready` commit in place. Integrating unit opened as PR #16: `done`, live view with no running path, journal entry stating the accepted operational state. |

## What held

- **No history was rewritten.** Every fault was answered by a later commit.
  Both S15 blobs are reachable; the provisional commit stays in the branch.
- **Registration before branching, one writer, pushed units.** Both repair
  paths were registered on the trunk, ran in their own worktrees, and pushed
  each unit with its record.
- **The digest did its job.** A bookkeeping tick on bound text was caught
  before `ready` and answered by restoring the text, not by re-accepting.
- **The closure sequence, followed in full, worked.** Candidate, audit,
  request, `ready` commit one commit after the candidate, drift check, green
  pull-request run. Nothing in the protocol had to bend once the checker
  could read the checkout.
- **The review layer caught what the fixture did not.** The 006 S01 fixture
  tested ordering; the merged-trunk shape was found by a reviewer on the pull
  request, which is what the pull-request transport is for.

## What did not hold

1. **The 1.0 provisional rule contradicted its own reference.** The unit
   reference says "the completed unit's own commit supersedes it", but the
   checker matched the trailer anywhere in the range with no notion of after.
   A rule the reference describes chronologically was implemented timelessly.
2. **The first repair ignored what a range means on a no-rewrite host.**
   With `pathHistoryPolicy: forbidden`, the only way to reach a current base
   is to merge the trunk in, so `base..candidate` always contains trunk
   history. Any rule that walks that range and reads other paths' records as
   evidence about this path is wrong by construction. S01 of 006 was.
3. **The agent's first reflex to a refused record was to edit it.** The
   `cairn-unit` skill says a correction is a new step. The refusal message
   named the fault, not the remedy, and the agent chose the remedy that a
   non-append-only world would suggest. One wrong type became four faults.
4. **A closure unit invented vocabulary.** `review` is not in the unit table.
   The table is five rows; the agent still reached outside it at the one
   moment, closure, where the checker is strictest.
5. **The kit's fixes live in the adopter.** Both repairs changed
   `tools/cairn-check.mjs` inside Crumbz. The next adopter installs 1.0.0 and
   meets the same three faults unless these flow back into the protocol.
6. **The checker assumed a local branch ref.** Supersession proof and the
   remote checkpoint both read `path/<id>` by name. Every pull-request run
   of the installed workflow is a detached checkout of the request head, so
   the first path that ever needed a supersession proof in CI failed there
   and nowhere else. The push run passed on the same commit, which is what
   made it invisible: two runs named `protocol`, one green, one red, and only
   the red one is the merge gate.
7. **Ticking the definition of done is editing bound text.** The template
   presents the outcomes as checkboxes and nothing says they must stay
   unchecked. Three earlier paths closed with the boxes untouched; the first
   agent to tick them at closure moved the digest.
8. **A fresh worktree has no dependencies, and a filtered gate hides that.**
   The 007 worktree ran `npm test` and `npm run typecheck` with no
   `node_modules`; both failed with "not found", the output was piped through
   a `grep` that matched nothing, and the empty result read as a pass. A step
   record was drafted on that basis before the commit failed for an unrelated
   reason. Nothing landed, but only by luck. The bootloader's own rule, never
   pipe a gate, was broken by the agent writing the repair.
9. **Two more integrations merged before their `ready` commit.** PRs #14 and
   #15 repeated the #7 and #10 shape while the fourth path was being closed
   correctly. The deviation is recorded each time and is still a deviation.

## Cost

The Value Board path was closable on product grounds at the owner's
acceptance at S15 on 2026-09-03 at 23:21 and reached `ready` on 2026-09-04 at
14:49. Between the two: three control-plane paths, eleven pull requests
(#6 to #15 and #12 itself), two review rounds and three repair units on the
path (S16, S17, S18). The only product work in that span is S19, one unit
answering four findings that the review would have raised on any candidate.

## What this asks of 1.1

- **Range rules are path-scoped.** State it in the checker's reference: a
  rule over `base..candidate` may read only this path's records as evidence
  about this path. Audit the other range walkers (`record-integrity`,
  added-record dates, immutable mutations) against the same shape before
  1.1 ships; this note does not claim they are wrong, only that they were
  written under the same assumption.
- **Adversarial fixtures include a trunk merge in the range.** Every blocking
  rule's fixture on a no-rewrite host must contain at least one merged trunk
  commit carrying another path's completed unit.
- **Refusals name the remedy.** "unsupported unit type `review` — allowed:
  implementation, documentation, decision, repair, closure; a pushed record is
  corrected by a superseding repair step, never by editing it." The message
  that names the fault only invites the edit.
- **The checker reads the branch from where it stands.** Every rule that
  names the path branch must resolve it as: local ref if present, else HEAD
  when the checkout is the request head, else `origin/<branch>`. The kit's
  workflow template produces the detached shape on purpose, to judge the exact
  head; the checker has to meet it there. 007 does this for two rules; audit
  the others.
- **Say what the checkboxes are for.** Either the template drops them from
  the bound section, or the reference says in one line that the definition
  of done is never edited after acceptance, ticks included, and completion is
  stated by the closure record and the journal.
- **One gate per candidate, not two.** A push run and a pull-request run
  with the same name and different verdicts is a trap. Either the workflow
  runs only on pull requests for path branches, or the two get different
  names so a red one is never mistaken for the green one beside it.
- **The unit skill states the worktree precondition.** "Install dependencies
  before the first gate" belongs in the resume step, and the reference
  example should show reading the exit code, not the output.
- **Adopt all three repairs upstream.** Same-branch step supersession (005),
  chronological path-scoped provisional resolution (006) and detached-checkout
  branch evidence (007) belong in the kit's checker with their tests, so the
  adopter's copies become a version bump rather than a fork.
- **A provisional commit should not be the parking place for closure
  metadata.** The closure skill's step 4 is one administrative commit after
  the candidate; nothing in it should be pushed while the gate is red. Say
  so where the skill describes provisional commits.

## Sources

- `sinlalune/crumbz` branch `path/cp-value-board-implementation-004` at
  `5066696c171b5dcbe7bdae7bb15a8b31672c89d2`: steps S15, S16, S17; commit
  `4d57a88` with its `Cairn-Provisional:` trailer; read 2026-09-04.
- `sinlalune/crumbz` branch `path/cp-cairn-provisional-006` at
  `c721dd0008a3ab8d3d54dd159cddbfa80297e104`: steps S01, S02;
  `tools/cairn-check.mjs` and its tests; read 2026-09-04.
- `sinlalune/crumbz` branch `path/cp-cairn-detached-checkout-007` at
  `18a6d3951f4d0b499e0edbe0f8f8290cc43888ff`: step S01; PRs #13, #14, #15;
  read 2026-09-04.
- `sinlalune/crumbz` branch `path/cp-value-board-implementation-004` at
  `9d9e2003a46b06844bb74aa0eb3843412e0f67e6`: steps S18, S19, the candidate
  `733cadf` and its `ready` commit; PR #12 with its four review findings and
  the failed pull-request run `33871552789`; read 2026-09-04.
- `sinlalune/crumbz` pull requests #6 to #10 and the review comment on #10
  (2026-09-04) that found the cross-path completion fault; read 2026-09-04.
- `project/coding-paths/CP-CAIRN-SUPERSESSION-005/index.md` and
  `project/log/2026-09-04-cp-cairn-supersession-005.md` on `main` at
  `50059c8`; read 2026-09-04.
- Cairn 1.0.0 kit at cairn commit `e26f19d`, `skills/cairn-unit/SKILL.md`
  and `reference.md`; read 2026-09-04.
