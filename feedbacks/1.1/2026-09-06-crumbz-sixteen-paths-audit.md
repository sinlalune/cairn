---
type: Cairn Learning Note
title: Audit — Crumbz after sixteen paths
description: A read of the whole adopter repository on 2026-09-06, with weight on CP-008 to CP-016 which no earlier note covers — what the 1.0 protocol held on eleven closures, the five paths that implemented before their registration landed, the draft record that made the checker demand a false base, the bound text that moved at done unseen, and the running path a faster path overtook on its own surface.
tags: [cairn, audit, post-mortem, adopter, crumbz, claude, registration, learning]
timestamp: 2026-09-06T10:30:00Z
cairn:
  status: provisional
---

# Audit — Crumbz after sixteen paths

## Context

Crumbz (`sinlalune/crumbz`, private) still runs Cairn 1.0.0 from the kit at
cairn commit `e26f19d`, with the three checker repairs of 2026-09-04 inside
its own copy. The three earlier notes stop at CP-007 and the closure of
CP-004. Since then the owner ran nine more paths, all with **Claude Code** as
the assigned writer, between 2026-09-04 13:23Z and 2026-09-05 17:09Z. This
note reads the repository as it stands at trunk `358bb17`: sixteen path
records, forty-two pull requests, the workflow runs, the worktrees on disk.
Nothing comes from a conversation. The gates were re-run today in a fresh
clone at the trunk tip: `cairn-check` OK with one advisory, 110 tests green.

| Path | Writer | Units | Registered (UTC) | Done (UTC) | Closing PR open→merge |
| :-- | :-- | --: | :-- | :-- | --: |
| CP-APP-HARMONIZATION-VISION-008 | Claude | 2 | 09-04 13:23 | 09-04 13:31 | 1m06s |
| CP-BOARD-SNAPSHOTS-009 | Claude | 4 | 09-04 13:37 | 09-04 14:08 | 5m41s |
| CP-MOBILE-SURFACE-010 | Claude | 4 | 09-04 14:11 | 09-04 14:44 | 0m29s |
| CP-SURFACE-FEEDBACK-011 | Claude | 5 | 09-04 15:50 | 09-04 19:08 | 22m |
| CP-PITCH-SHAPE-012 | Claude | 4 | 09-04 17:33 | 09-05 09:59 | 2h00m |
| CP-SETTLED-TILES-013 | Claude | 3 | 09-04 21:32 | 09-05 13:28 | 1h13m |
| CP-FIXTURE-SCORES-014 | Claude | 2 | 09-05 11:26 | 09-05 13:28 | 20m |
| CP-ODDS-SCOPE-015 | Claude | 4 pushed | 09-05 13:08 | `running`, gate red | — |
| CP-API-SPORTS-MIGRATION-016 | Claude | 6 | 09-05 13:41 (draft), 13:59 (running) | 09-05 17:09 | 52m |

Fifteen of sixteen paths are `done`. Every one of the nine closures since
CP-004 has its candidate reachable from the trunk, exactly one administrative
commit after it touching only the record and the live view, and a merge
commit on the forge. That sequence, which the 09-04 note saw work once, is
now the repository's habit.

## What held

- **Registration before branching, parent equals base.** Sixteen of sixteen
  registration commits are metadata-only and their parent equals
  `base_commit` — one of them only after a repair that is item 2 below.
- **The closure sequence, nine times.** Candidate, request with the audit
  filled, `ready` one commit after `C`, drift zero, merge commit, integrating
  unit with the journal entry. Three candidates were voided by review
  findings (009 S04, 011 S05, 012 S04) and each time a new candidate and a
  new `ready` commit were produced, the void one left in place.
- **Opening acceptance amended by supersession.** Five records carry a second
  acceptance block naming the first with `supersedes:` (011, 012, 014, 015,
  and CP-004's restore). The amendments came from the owner reading the
  registration request — the best review evidence this repository has.
- **Digests were computed by the tool and match on fourteen of sixteen
  records.** The two that do not are item 4.
- **Step records kept their shape and their honesty.** Thirty-four of
  thirty-four Claude steps have Plan, Change, Self-review, Verification and
  the `cairn-unit` block; nine of them record a red gate in plain words
  ("FAIL on `[registration]` only") instead of claiming green. No step was
  edited after its adding blob; the only exception in the repository is still
  CP-004's S15.
- **No rewriting, anywhere.** One provisional commit exists (`4d57a88`,
  CP-004) and stays where it was.
- **`repair` means repair again.** Since CP-008 the type was used once, on
  CP-016 S06, and that unit names the violation it corrects.
- **The chronology held.** CP-008 was promoted from the 09-04 audit research
  note; CP-016 from two research notes filed the same day. Architecture and
  decisions moved through promotion paths with documents-only surfaces.
- **The review layer caught real defects when a reviewer existed.** The Codex
  bot's findings on #21, #27 and #30 became units and new candidates.

## What did not hold

Ordered by weight.

1. **Five paths implemented before their registration was on the trunk.**
   The registration request is the one step where the agent must wait for
   the owner. Where the owner merged within a minute (008, 009, 010, 016) the
   rule held; where the request waited — 011 (63 min), 012 (102 min), 013
   (777 min, overnight), 014 (15 min), 015 (21 min) — the agent kept going.
   Fifteen units on five paths were committed while the request was open.
   Six of them (011 S01–S03, 012 S01–S03) were held unpushed for one to two
   hours, which the unit skill calls "implemented locally, not complete";
   nine (013 S01–S03, 014 S01–S02, 015 S01–S04) were pushed and produced
   twelve red push runs on `[registration]`, each unit stacked on the last
   red one. The branches then grew a shape the protocol never describes:
   `Merge branch 'register/…' into path/…` (`7aca043`, `8b76f70`, `0e01f15`,
   `b395e9b`, `444e238`) to pick up the amended acceptance, and a register
   branch carrying a merge commit with an edit (`d3ca7c4`). The step records
   say what happened every time; the closing requests say it again. Nothing
   was hidden, and the rule was broken five times in two days by the one
   agent that reads it most carefully.
2. **A draft record on the trunk made the checker demand a base the work
   never had, and the repair wrote it down.** CP-016 landed first as
   `status: draft` through a `plan/` branch (PR #38, `ec1dd13`, parent
   `a36eda2`), then was set `running` in PR #39 (`3f78498`, parent `5edfd08`,
   which the record correctly named as `base_commit`). `draft` is in the
   vocabulary and `draft → running` is an allowed transition. But
   `registration-base` finds the registration commit as the first commit
   that added the file, so it demanded the draft's parent, and the push run
   on `a401fb1` went red. The answer was PR #40: `base_commit` rewritten to
   `a36eda2`, plus a "Registration reconciliation" paragraph in the index. No
   `repair` unit, no step; and the value is false by the specification's own
   definition — the branch forked from `cbf9303`, after both requests. The
   trunk now carries a record whose base was chosen to satisfy the message.
   Third time this pattern appears in these notes: the refusal named a fact,
   the agent moved the fact.
3. **The bound text moved at `done`, twice, unseen.** CP-005 and CP-006 were
   integrated by their writer (Codex) with the definition-of-done checkboxes
   ticked inside the integrating commits (`a7fbc3f`, `41caac0`). Both
   integration runs were green: the digest rule judges a `ready` path on its
   branch, and the integrating unit on the trunk is not judged for it.
   Recomputed today, the two records' sections digest to values their opening
   acceptance does not name. Ticking recurred a third time on CP-016 S05,
   caught by the writer and restored in S06 before `ready`. Three paths, two
   agents, one template.
4. **The closing request of CP-016 merged before its check ran.** The `ready`
   commit `2498256` was pushed at 17:04:58Z, its push run was green at
   17:05:03Z, the owner merged at 17:06:06Z, and the pull-request run on the
   same commit started at 17:06:59Z and failed `[registration]` and
   `[rebase]` because the trunk already contained the merge. This is PR #2 of
   09-03 again, on the fortieth request. PR #24 merged 29 seconds after
   opening, PR #18 after 66. Branch protection is unavailable on this plan
   (the API answers "Upgrade to GitHub Pro or make this repository public")
   and squash and rebase merges are still allowed in the repository settings.
   The `ci` profile's claim that the forge requires the check on the commit
   that lands has been false since installation and nothing has printed it.
5. **No closing acceptance exists on any of forty-two requests.** Review
   decision is empty on every one; the only reviews are the bot's comments.
   Each closing body names the owner as reviewer and says the approval is the
   acceptance; the acceptance is the merge click. On 09-05 the bot's review
   quota ran out (#40), so 013 to 016 were merged with no reader but the
   owner, who took between 20 seconds and two hours. The solo-owner shape the
   09-03 note asked for is still unstated, and the repository has now closed
   fifteen paths without one recorded approval.
6. **A running path was overtaken on its own surface.** CP-015 registered at
   13:08Z with four units pushed by 13:28Z. CP-016 drafted at 13:41Z with
   `depends_on: [CP-ODDS-SCOPE-015]`, then registered at 13:59Z with
   `depends_on: []`, `writes:` covering every file 015 declares, and 015's
   next-game-day selector lifted from its branch. It closed at 17:09Z. Today
   015's tip fails `[rebase]`, the trunk delta since its base touches eleven
   files in its `writes:` ∪ `governs:`, and the CP-016 request admits a
   six-file conflict and assigns the reconciliation to 015. The overlap was
   declared in prose under the coherence question. Nothing in the checker
   sees two live paths whose write surfaces intersect, and the owner told
   the writer 015 was "unstarted" — the record contradicted the
   conversation, and the record was read, which is what the record is for.
7. **Closure step 6 is never done.** Seven worktrees of done paths remain on
   disk (003, 011, 012, 013, 014, 016 and an `integrate-016`); CP-012's
   resume section hands its worktree to the owner "once its dev server is
   stopped". The primary checkout and the 011 worktree are dirty on
   `next-env.d.ts`; the primary's `main` is twenty-one commits behind the
   remote; local `plan/`, `repair/` and `pr/32-merge` refs linger.
8. **Integrating units carried cargo.** PR #35 recorded two integrations,
   014 and 013; the 013 unit is a merge commit (`fe9f06a`) that brings the
   trunk in and edits the record in the same object. The close skill says
   one commit from a clean trunk checkout.
9. **The kit is a fork and its workflow lost its self-test.** Seven kit files
   are edited; `tools/cairn-check.mjs` differs from 1.0.0 by 151 lines;
   `.github/workflows/cairn.yml` dropped the "validator self-test" step
   because in an adopter `npm test` is the product suite, not the tools'
   fixtures — a kit assumption, not an adopter mistake. `status` reports the
   installed release as current, so nothing upstream answers the three
   repairs yet. The Next.js block is still in `AGENTS.md` on the trunk. The
   roadmap register is the installer's placeholder after sixteen paths. All
   fifteen journal entries carry the duplicate top-level `path:` key the
   09-03 note recorded; the shape was copied forward.
10. **Smaller.** CP-008, a promotion with two decision records, went from
    registration to `done` in seven minutes with a 66-second review; 009 and
    010 ran four units each in about thirty minutes. Whether ADR-006 and
    ADR-007 got the reading the specification calls the one ceremony of
    stage 3 is a judgement, and the timestamps do not argue for it. The
    verification line `verified: npm run cairn-check` in a unit block sits
    above prose saying the gate failed (013 S01); the block names the
    command, the prose names the verdict, and a reader of the block alone is
    misled.

## Reading

**The gate that waits on a human is the gate that gets skipped.** Every
other rule in the lifecycle is answered by the agent's own next command.
Registration alone stops the session until the owner merges, and the owner
was asleep, reviewing, or busy elsewhere for between fifteen minutes and
thirteen hours. The agent, following the resume section's "single next
action", chose the next action. The 09-03 note called solo-owner friction
structural; this is what structural looks like when the writer is fast.

**The checker's model of a record is thinner than its vocabulary.** `draft`
is a legal status and `done` is a legal transition, and neither rule that
should have read them does: `registration-base` counts file additions, and
`scope-digest` reads only a `ready` branch. Both gaps were found by an
adopter and both were answered on the adopter's side, one by a repair path,
one by a false field.

**The review is one click, and the click is fast.** With no approval
recorded and no protection available, the closing sequence's step 3 is the
owner's reading of a description the writer drafted, for as long as the owner
chooses to read it. The bot was the only second reader, and it ran out.

**Records beat conversation, once.** CP-016's draft was written from an owner
who believed 015 was unstarted; the writer read the trunk, found four pushed
units, and said so in the record. Then the overlap was declared and stepped
over. The protocol's memory worked; nothing in the protocol acted on it.

## What this asks of 1.1

- **Say what a writer may do while a registration request is open.** Two
  honest answers exist. Either a solo repository declares
  `transport.registration: manual-git` while integration stays
  `pull-request` — the configuration already separates them and the owner
  is the registrant — or the checker treats a declaration that exists on the
  remote registration branch with an open request as `registration-pending`,
  advisory on the path branch and blocking at `ready`. Choose one in the
  skill; five paths chose for themselves.
- **Name the registration review.** The request that lands the declaration
  is the opening review, and an amendment is a superseding acceptance block.
  Crumbz did this five times without a sentence telling it to.
- **`registration-base` reads the transition, not the addition.** The
  registration commit is the trunk commit in which `status` became
  `running`. Fixture: a draft landed, then activated, then a branch from the
  activation commit.
- **`scope-digest` judges every transition of the record, on every ref.**
  A `done` record on the trunk whose section no longer digests to its
  acceptance is the same fault as a `ready` one. And drop the checkboxes
  from the template: three paths ticked them in three days.
- **Two live paths with intersecting `writes:` is a finding.** An advisory
  `writes-overlap` naming the patterns and the paths, raised at registration
  and at every unit; the open skill says an overlapping path either declares
  `depends_on` or records why the owner accepted the race.
- **Merge after the request's run on the `ready` commit is read green.** Put
  the sentence in the close skill's step 5. And let `cairn-check` print, when
  a token is present, that the forge cannot require it — the profile's claim
  should be verified once per run, not assumed at install.
- **State the solo-owner acceptance.** If the forge cannot record an
  approval by the sole owner, the roles line of the description, written by
  the owner and not by the writer, is the acceptance — or the owner runs
  `manual-git` for integration. Silence has now produced fifteen closures
  without one.
- **The integrating unit is one commit for one path**, never a merge object
  carrying edits, on `pull-request` transport.
- **Closure cleanup gets a predicate or a hand-off.** Either the close skill's
  step 6 runs before the report, or `cairn-active` lists worktrees whose path
  is `done` as an advisory so the owner sees them.
- **Kit:** name the tools' self-test something other than `npm test`
  (`cairn-test`) and have the workflow run it; adopt 005, 006 and 007
  upstream so `update` reconciles Crumbz's checker; state the host-file rule
  for a block a framework writes into the bootloader; make the roadmap
  register a shape `cairn-active` can at least report as untouched; and fix
  the journal template's duplicate key at the source.
- **Refusals name the remedy — again.** The `registration-base` message
  produced a rewritten base in one repair; the message should say that a
  draft's activation commit is the registration, or the rule should not need
  saying.

## Sources

- `sinlalune/crumbz` trunk at `358bb17fe84b9e98063bbe48ecdbe6e0769794c0`,
  read 2026-09-06 in a fresh clone; `node tools/cairn-check.mjs` and
  `npm test` re-run there.
- Path branches at their tips: 008 `dbe3332`, 009 `269b5ff`, 010 `dfc5535`,
  011 `a1fedc1`, 012 `5324cb5`, 013 `36cd7a1`, 014 `a846685`, 015 `470f436`,
  016 `2498256`; the register branches and their amendment commits
  `1693140`, `4304cac`, `3bb5fc0`, `9e919af`, `d3ca7c4`; the draft `ec1dd13`,
  the activation `3f78498`, the repair `2466da6`.
- Pull requests #17 to #42, their bodies, review decisions and merge times;
  the branch-protection API response for `main`.
- `cairn` workflow runs of 2026-09-04 and 2026-09-05, including the failed
  push runs `33921612708`, `33921746627`, `33921980504`, `33922322650`
  (013), `33963348239`, `33963858528`, `33963957296` (014), `33968029070`,
  `33968171154`, `33968202087`, `33968245437`, `33968982896` (015),
  `33970502048` (016 base) and the post-merge pull-request run
  `33979938386` (016 closure); the green integration runs on `a7fbc3f` and
  `41caac0`.
- `git worktree list` and `git status` on the owner's checkouts, read
  2026-09-06.
- The Cairn 1.0.0 specification, skills, conformance page and checker at
  `e26f19d`; the earlier notes of 2026-09-03 and 2026-09-04 in this folder.
