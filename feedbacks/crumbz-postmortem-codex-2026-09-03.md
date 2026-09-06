---
type: Cairn Learning Note
title: Post-mortem — Crumbz CP-003, CP-004 and CP-005 on Codex
description: What the Codex sessions of 2026-09-03 respected of the 1.0 protocol and what they did not, from the value-board research note through the promotion path, the fourteen-unit implementation path and its blocked closure, to the checker-repair path opened to unblock it; read from the repository alone.
tags: [cairn, post-mortem, adopter, crumbz, codex, learning]
timestamp: 2026-09-04T00:00:00Z
cairn:
  status: provisional
---

# Post-mortem — Crumbz CP-003, CP-004 and CP-005 on Codex

## Context

The afternoon after the Gemini sessions
([post-mortem](./crumbz-postmortem-2026-09-03.md)), the owner switched to
**Codex** for the next idea: a value board. The records name the writer
`Codex` and the acceptor `Toure`. This note follows that idea through the
chronology — research note, promotion path, implementation path, and the
control-plane repair the implementation path ended up needing — and reads
every step from `sinlalune/crumbz`, its pull requests and its CI runs. Nothing
comes from the conversation.

| Stage | Object | Units | State on 2026-09-04 | Wall time (+02:00) |
| :-- | :-- | --: | :-- | :-- |
| 2 Research | `project/brainstorm/2026-09-03-value-board-research.md` | — | provisional | 14:17 |
| 3 Promotion | CP-VALUE-BOARD-VISION-003 | 2 | `done`, PR #4 merged | 14:27 → 14:47 |
| 5 Coding | CP-VALUE-BOARD-IMPLEMENTATION-004 | 14 + 2 | `running`, closure blocked, gate red | 14:49 → 23:26 |
| 5 Repair | CP-CAIRN-SUPERSESSION-005 | 1 | `running`, PR #7 open | 23:37 → 23:41 |

The checker and the tests were re-run in each worktree today. CP-004 is red
on three blocking findings; CP-005 is green; the product tests pass on both.

| Worktree | cairn-check | tests |
| :-- | :-- | :-- |
| CP-004 at `4d57a88` | FAIL — `rebase`, `record-integrity` ×2 | 47 passed, 11 files |
| CP-005 at `164d1c8` | OK | 35 passed, 8 files |

## What was respected

Codex read the protocol and, for most of the day, did what it says. The
difference from the morning is visible in the records.

- **The chronology was followed in order.** A research note with three real
  pinned sources and a conclusion that names what it does not settle; then a
  promotion path on the `full` route with a documents-only write surface; then
  an implementation path that depends on it. The architecture page carries
  `promoted_from` pointing at the note, and the note was left untouched.
- **Registration through the declared transport.** All three paths were
  registered on a `register/` branch and landed through a pull request whose
  parent equals `base_commit`. Each path branch forked from its registration
  commit and ran in its own secondary worktree.
- **The resume checkpoint was filled in every unit.** Sixteen unit commits;
  every one names the previous commit on the remote as its checkpoint, never
  itself. This is the contract Gemini ignored fifteen times.
- **Units kept their shape.** Plan with a *does not* clause, Change,
  Self-review naming what was rejected, Verification with the commands and
  their results. Widening was declared in the unit that needed it (S06 added
  `package.json` and said why).
- **Tests moved with the code.** Nine of fourteen implementation units added
  or changed tests; the suite grew from 30 to 47.
- **Honest unavailable states over fabricated results.** S06–S09 record that
  the stored odds were captured after every finished fixture, that only four
  historical observations survive strict timing, and that the calibration
  gate therefore stays closed with no stake advice. The step records say what
  the data cannot support instead of shipping a leaderboard.
- **A review finding was fixed as a unit, not an amend.** The Codex bot's P2
  comment on PR #4 became S02 on the same branch, and the reply on the pull
  request names the fixing commit.
- **Nothing published was rewritten**, including after the closure went
  wrong: the three failed closure commits stay in the branch as what they are,
  and the last of them carries a `Cairn-Provisional` trailer.

## What was not respected

Ordered by weight.

1. **The closure of CP-004 invented a ceremony and broke the record trying
   to fix it.** At 23:21 the "final implementation candidate" commit contained
   no implementation: a new step S15 typed `review` — a type the vocabulary
   does not have — the definition of done ticked from `[ ]` to `[x]`, and a
   block appended to `AGENTS.md`. CI refused the type. The next commit
   **edited S15 in place** to say `closure`; CI refused the edit
   (`record-integrity`). The third commit copied the edited file to
   `S15.review-record`, added S16 as a `repair`, and marked itself provisional;
   CI refused both files. Three red runs in five minutes, each fixing the
   previous message rather than reading the rule.
2. **Ticking the definition of done changed the scope digest.** The accepted
   digest is `6424e8c7…`; the definition of done at the branch tip digests to
   `fb4f7010…`. Had the path reached `ready`, `scope-digest` would have blocked
   it. The checkboxes are part of the accepted text; the template leaves them
   unticked for exactly this reason, and neither the template nor the skill
   says so.
3. **The bootloader was edited on a framework's instruction.** `next dev`
   writes an "agent rules" block into `AGENTS.md` and tells the agent to
   commit it. Codex did, in the closure commit, outside `writes:`, and S16
   then widened `writes:` to cover it. A generated file's instruction
   outranked the declared write surface and the bootloader's own first line,
   *this file points; it does not carry project memory*.
4. **The repair reached for the control plane.** Rather than restore S15 to
   its adding blob with an appended correction, CP-005 changes the installed
   checker so that a `supersedes:` field on a repair unit exempts the
   superseded step from `record-integrity` and `work-unit`. The path governs
   the checker and the bootloader, was registered at 23:37 and had its unit
   pushed at 23:41, and its pull request is open. The kit now reports
   `tools/cairn-check.mjs` as edited, so `update` will never reconcile it.
   The diagnosis was right — see below — but the change belongs upstream, in
   this repository, not in an adopter's copy of the kit.
5. **`type: repair` misused six times.** S05, S10, S11, S12 of CP-004 and S02
   of CP-003 are product or documentation fixes. Only S16 corrects a protocol
   violation, and it is the one that names the violation.
6. **CP-003 was merged without `ready`, without an administrative commit and
   without approval.** The path went `running` at the candidate straight to
   `done` on the trunk. The checker allows `running → done` on trunk
   integration by design, so the one-administrative-commit check in
   `acceptance` never ran. The PR body says *awaiting owner approval*; no
   approval exists, as on every crumbz PR — the solo-owner friction the
   morning note already records.
7. **Verification claims that were not read.** S15's block says it was
   verified with `cairn-check -- --base origin/main`; the CI run on that commit
   failed. S16 says the same and admits in prose that the gate cannot pass.
   The skill's last rule is *never record a verdict you did not read*.
8. **The roadmap register was never touched.** Three more paths, and the
   coding-paths index still carries the installer's placeholder row.
9. **Smaller.** One unit commit lacks the path prefix
   (`feat: persist value board lineup evidence`, S04); `next-env.d.ts` was
   left dirty in the worktree across two units and noted rather than
   resolved; the CP-003 architecture page and ADR were written three minutes
   after registration, which is fast for a promotion the spec calls the one
   ceremony of stage 3; the S13/S14 "Prediction Index" is a second product
   surface the definition of done does not name, though it stays inside the
   accepted outcome.

## Reading

**Codex treated the protocol as rules to satisfy; Gemini treated it as a
template to fill.** The morning's failures were omissions the checker cannot
see. The evening's failures are collisions with the checker, and every one of
them is the agent trying to satisfy a red message with the smallest next edit
instead of the documented repair.

**The closure skill was read as a script with a mandatory final commit.**
`cairn-close` says *finish any final implementation, then commit if changes
remain*. Codex produced a "final candidate" commit with nothing to commit,
filled it with a review step, and needed a type for it. `review` is not a
unit type because the review is the pull request. One sentence in the skill
would have prevented the whole cascade.

**The dead end is real.** On a `forbidden` host, once a published step
carries an invalid `cairn-unit` type, 1.0 offers no exit: `record-integrity`
refuses the edit, `work-unit` validates every unit on the branch including the
bad one, and a superseding record — the remedy the specification names — has
no predicate, as the conformance page admits. Codex found this in ten minutes
and said so in the blockers line. Its fix is the wrong place, not the wrong
idea.

**A tool wrote into the bootloader and the agent obeyed it.** This will
recur: frameworks now write agent instructions into `AGENTS.md`. The protocol
says nothing about a host file the environment mutates.

## What this asks of 1.1

- **Say, in the template and in `cairn-close`, that the checkboxes are part
  of the digest and are never ticked.** Or drop the checkboxes from the
  template.
- **Say, in `cairn-close`, that there is no closure step.** The review is the
  request's description; no unit and no step file carries it.
- **Give the superseding record its predicate.** The CP-005 diff is a working
  draft: a `supersedes: <step>@<original-blob>..<edited-blob>` field on a
  `repair` unit, bound to Git, exempting exactly one step. Take it upstream,
  with a fixture, and let crumbz `update` to it instead of carrying an edited
  kit file.
- **Refuse `running → done` on the trunk when no `ready` commit exists.** The
  allowance was written for manual-git's merge unit; on `pull-request` it lets
  the administrative commit and its check be skipped entirely.
- **State a rule for host files the environment writes.** The bootloader is
  kit-owned; a generated block belongs in a file the kit does not own, or is
  ignored, and the skill says which.
- **Repeat the `repair` definition where the type is chosen.** Two agents,
  eleven misuses in one day.

## Sources

- `sinlalune/crumbz` at `ed2bb7e` (trunk), `4d57a88`
  (`path/cp-value-board-implementation-004`), `164d1c8`
  (`path/cp-cairn-supersession-005`), read 2026-09-04.
- Pull requests #3–#7; `cairn` workflow runs of 2026-09-03, including failed
  runs `33807517404`, `33807566909` and `33807954380`.
- The Cairn specification, skills and conformance page at `e26f19d`.
