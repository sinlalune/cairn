---
type: Cairn Research Note
title: The coding step cycle — the unit against the cycles of 2026
description: Research note 2 of 4 for the coding guidelines — plan, change, self-review, verify read against Spec Kit and OpenSpec at their current releases, the plan and review features of Claude Code, Codex and Copilot, and Kent Beck's loop; what Crumbz's seventy-one units did with the four movements and what a second reader found that the writer's own review had not; where the owner's try and the red-run post-mortem sit; the questions the owner must answer.
tags: [cairn, research, coding-guidelines, step-cycle, work-unit, review, crumbz]
timestamp: 2026-09-07T14:00:00Z
cairn:
  status: provisional
---

# The coding step cycle — the unit against the cycles of 2026

Answers section 2 of the
[brief](./2026-09-07-coding-guidelines.md): what the cycles in use today
have that the work unit lacks and what the unit has that they lack;
whether a review movement and a test-first movement are warranted; where
the owner's try before the merge and the post-mortem on a red run fit.
Nothing here is a ruling.

## Sources

| Source | Pinned | Why it is a source |
| :-- | :-- | :-- |
| GitHub Spec Kit, `github/spec-kit` | release `v1.0.4` of 2026-09-02; `README.md` and `templates/commands/converge.md` read at the tag on 2026-09-07; about 134,000 stars | the most adopted spec-driven toolkit |
| OpenSpec, `Fission-AI/OpenSpec` | release `v1.12.0` of 2026-09-03; `README.md` and `docs/opsx.md` read at the tag on 2026-09-07; about 67,000 stars | the change-centric one, closest cousin of the path folder |
| Anthropic, *Best practices for Claude Code* and *Common workflows* | <https://code.claude.com/docs/en/best-practices>, <https://code.claude.com/docs/en/common-workflows>, read 2026-09-07 (undated) | plan mode, the verification loop, the adversarial review |
| OpenAI, *Codex best practices* and *Follow a goal* | <https://learn.chatgpt.com/guides/best-practices>, <https://learn.chatgpt.com/use-cases/follow-goals>, read 2026-09-07 (undated) | plan mode, `/review`, goals as a stopping condition |
| GitHub, *Copilot code review* | <https://docs.github.com/en/copilot/concepts/code-review/code-review>, read 2026-09-07 (undated) | the forge's own second reader |
| Kent Beck, *Augmented Coding: Beyond the Vibes* | <https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes>, 2025-06-25 | the test-first loop stated for an agent |
| This repository | `b281786`: `spec/index.md` chapter 5, `spec/concepts/work-unit.md`, `skills/cairn-unit/SKILL.md`, ADR-001, ADR-008, ADR-009, ADR-014 | the unit and what 1.1 decided about it |
| Crumbz, `sinlalune/crumbz` | trunk `358bb17`; the seventy-one step records; requests #21, #27, #30 and their review comments; the [audit of 2026-09-06](../../feedbacks/2026-09-06-crumbz-sixteen-paths-audit.md) | the only runs of the unit |

## Summary

### The cycles in use

**Spec Kit v1.0.4.** Six commands in order: *constitution* once per
project, then *specify*, *plan*, *tasks*, *implement*, and since 1.0
*converge*: "Assess the current codebase against the feature's spec, plan,
and tasks, then append any remaining unbuilt work as new tasks to
`tasks.md`." Converge is append-only and stateless by design: "This is
**not** a diff tool and does **not** track changes … no git, no branch
comparison, no history." Steps 4 and 5 repeat "until `/speckit-converge`
reports Converged". There is no review command; *analyze* and *checklist*
read the artefacts, not the code.

**OpenSpec v1.12.0.** One folder per change — `proposal.md`, `specs/`,
`design.md`, `tasks.md` — and three actions in the default profile:
*propose*, *apply*, *archive*. "Actions, not phases — create, implement,
update, archive — do any of them anytime." *Verify*, "validate
implementation against artifacts", exists only in the expanded profile.
Archive moves the folder under `changes/archive/<date>-<name>/` and merges
the delta specs into the main specs. Nothing is kept about how the change
was made.

**Claude Code.** Four phases, "Explore, Plan, Implement, Commit", with
plan mode for the first two; and a size rule for whether to plan at all:
"If you could describe the diff in one sentence, skip the plan." The loop
that matters to the vendor is verification: "Give Claude a check it can
run … the loop closes on its own", escalating from a check in the prompt,
to a `/goal` an evaluator re-checks after every turn, to a Stop hook that
blocks the turn until the check passes, to "a verification subagent … so
the agent doing the work isn't the one grading it." Review is the same
idea: "A fresh context improves code review since Claude won't be biased
toward code it just wrote", a Writer/Reviewer pair of sessions, and
`/code-review` in a fresh subagent — with the warning that a reviewer told
to find gaps will find some, so "Tell the reviewer to flag only gaps that
affect correctness or the stated requirements." Tests: "have one Claude
write tests, then another write code to pass them."

**Codex.** A prompt is goal, context, constraints, done-when; plan mode
"the easiest and most effective option" for complex tasks; `/review` for
"PR-style code review" with a `code_review.md` the bootloader points at. A
goal is "a durable objective for long-running work … toward a verifiable
stopping condition", and "Codex should know what 'done' means before it
starts."

**Copilot code review.** Runs on a request when it opens, when it leaves
draft, and optionally on every push; produces comments and "suggested
fixes you can apply in a couple of clicks"; "not guaranteed to spot all
problems"; and "By default, Copilot reviews do not count toward required
approvals" — approval power is a public preview the owner turns on. It is
the one second reader that is native to the forge, costs the writer
nothing, and cannot merge.

**Kent Beck.** "Write the simplest failing test first"; "Implement the
minimum code needed to make tests pass"; "Refactor only when tests are
passing"; "Never mix structural and behavioral changes in the same
commit"; "Always run all the tests … each time." The human's job is to
watch for loops, unrequested features and disabled tests.

### The unit, and what 1.1 already decided about it

Chapter 5: a unit is plan, change, self-review, verify; the plan and the
self-review are short sections of the step record; the type fixes what
moves together and tests are inside the change; every unit is one commit
pushed at once; a unit that is not complete is a provisional commit. The
step is append-only. Closure binds one candidate `C` by its id, the
digest of the definition of done, and the base; the request's description
is the coherence audit; the merge is the acceptance.

1.1 added, without a new check: the plan names the definition-of-done
item it advances (ADR-009 d2); `repair` is a protocol violation named,
nothing else (d1); the owner reviews the plan before the go-ahead
(ADR-001 d2) and tries the result before the merge (d3), a step nothing
ticks; the merge click is the acceptance (d4) and comes after the
request's run is read green (d5); there is no closure step (ADR-008 d1);
a post-mortem tool runs when a gate goes red on a request or the trunk and
on demand (ADR-014 d1). The forge no longer runs on path pushes (ADR-005),
so a unit's verdict is the writer's own bare gate.

### Side by side

| What a cycle does | Spec Kit | OpenSpec | Claude Code | Codex | Copilot | Beck | The unit |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| decide before coding | specify, plan, tasks | proposal, specs, design, tasks | plan mode | plan mode, goal | the issue | the failing test | the path record's definition of done; the plan section; the owner reads the plan |
| bound the work | tasks | tasks | one sentence or plan | done-when | acceptance criteria | one test | the definition of done, digested; the plan names its item |
| check the result | converge appends what is missing | verify, expanded profile | a check the agent runs; `/goal`; Stop hook | the goal's stopping condition | build and test in its environment | run all tests | verify, every gate bare, the `cairn-unit` block |
| a reader who is not the writer | — | — | `/code-review`, a Writer/Reviewer pair | `/review` | code review on the request | the human watching | — the self-review is the writer's; the owner reads the request |
| keep what happened | ticks in `tasks.md` | the archived folder | the session, locally | — | the request | — | the step record, append-only; the journal |
| bind what is merged | — | archive | — | — | the merge | — | `C` by id, the digest, the base, `ready` then `done` |
| deviate honestly | converge appends | update anything anytime | — | — | — | — | a superseding acceptance; `repair` for a violation |

What every cycle has and the unit lacks is one thing: **a reader of the
diff who did not write it, before the merge**. Claude Code, Codex and
Copilot each ship it as one command or one setting; Beck is the reader
himself. Cairn's self-review is written by the writer in the same context
as the change, and the owner's read of the request is a read of a
description the writer drafted.

Two things the guides have and the unit has only in prose: a **done-when
that a machine re-checks** (Codex goals, Claude's `/goal` and Stop hook)
where Cairn's definition of done is a list of checkboxes ticked by hand,
kept in 1.1 (ADR-002 d2); and a **converge** that reads the code against
the intent after implementing, where Cairn's coherence audit asks four
questions at closure, answered by the writer.

What the unit has and none of them keeps: the step record with its plan
and self-review, append-only from the blob that added it; the candidate
bound by id and digest; the journal. Spec Kit's converge says of itself
"no git, no branch comparison, no history"; OpenSpec archives the plan and
forgets the execution. Cairn's memory of *how* a change was made is the
thing the convergence audit of 2026-09-02 called being ahead, and nothing
in the year since has caught up.

### What Crumbz did with the four movements

| Measure, seventy-one steps at `358bb17` | Gemini, 001–002 | Codex, 003–006 | Claude, 007–016 |
| :-- | --: | --: | --: |
| steps | 15 | 25 | 31 |
| steps with a plan section | 5 | 25 | 31 |
| steps with a self-review section | 5 | 25 | 31 |
| units touching source that changed a test file, of those touching source | 12 of 15 | 13 of 18 | 23 of 24 |
| steps recording a red gate in words | — | — | 9 |
| plan section, lines, in the ten units of note 1 | 7, 0 | 2, 5 | 7, 8, 6, 9 |

The shape held wherever a harness that loads skills ran it, and tests
moved with the change in forty-eight of fifty-seven source units. What the
shape did not do is find its own defects. The one second reader Crumbz
had was the Codex review connector on the closing requests:

| Request | Findings by the bot | What became of them |
| :-- | :-- | :-- |
| #21, close 009 | four: a round id serialised before conversion (P1), upcoming fixtures without a snapshot left out, snapshots not attached to the logged run, obsolete formation rows kept | no step names them; 009 S04 answered a red preview deployment instead |
| #27, close 011 | two: the next game day decided after the tile filter, goalkeepers before defenders | 011 S05 *Two findings of the closing review*, a new candidate |
| #30, close 012 | three: the stored formation lost in the selector, duels resolved against stale links, missing position ids in the vote | 012 S04 *Three findings of the closing review*, a new candidate |

Nine findings, all correctness, on three requests whose writer's
self-review had said what it rejected and why. The bot's quota ran out at
#40; 013 to 016 were merged with no reader but the owner, once twenty
seconds after opening. No closing request records the owner trying the
result; #21 mentions a preview and none of the others does. The self-review
that note 1 found operative for the ladder was not operative for
correctness, and the reader that was operative was the one every vendor
guide describes: a fresh context, reading only the diff.

On test-first, one commit per unit says nothing about the order inside
it, and Cairn does not ask. What note 1 counted is that the units whose
tests asserted a refusal were the clean units; the order of writing left
no trace and the quality of the test did.

### Where the try and the post-mortem sit

Both are decided and both sit outside the unit. The owner's try (ADR-001
d3) is a step of closing: after `C`, before the merge, with nothing ticked;
for documents it is reading the pages. It is the vendors' "verify UI
changes visually" done by the owner instead of the agent, and on Crumbz it
is the step whose absence the twenty-second merge shows. The post-mortem
(ADR-014 d1) runs when a request's or the trunk's run goes red; since 1.1
runs nothing on path pushes, it never fires inside a unit. On Crumbz the
reds were twelve registration reds on path pushes — moot under 1.1 — and
one post-merge red on #42's closing request, which is the case ADR-014
was written for.

## Conclusion

### What this changes about the vision

1. **The unit is the right shape and it has no second reader.** Its four
   movements match every cycle's; its record and its candidate exceed
   them. The one thing all five sources share and Cairn lacks is a fresh
   context reading the diff before the merge, and Crumbz shows the cost:
   nine correctness findings on three requests by the one bot that read
   them, none caught by a self-review that was otherwise honest. The 1.1
   page says a sole owner "reviews their own requests"; the products say
   the owner need not be the only reader.
2. **The native second reader already exists on the forge.** Copilot code
   review runs on a request when it opens, and by default cannot approve.
   For a sole owner that is exactly the shape the manifesto asks for: a
   reader who is not the writer, nothing to maintain, no power to merge.
   The agent products' own review commands are the same thing one step
   earlier, in the writer's hands.
3. **The self-review should say what a reviewer found, not only what the
   writer refused.** Note 1 asks whether the ladder is its vocabulary;
   this note adds that its content is the findings of a fresh read, pasted,
   with what was done about each. That is one sentence in the unit skill
   and no new movement.
4. **A test-first movement is not warranted.** No record could prove the
   order, the record already requires the test, and the evidence says the
   test's assertion of a refusal is what separated clean units from the
   rest. Beck's other rule — structural and behavioural changes never in
   one commit — is the one worth a sentence, and it is note 1's size rule.
5. **The definition of done is the done-when, and only the owner reads
   it.** Every product now re-checks a stopping condition by machine.
   Cairn's is prose in checkboxes the owner ticks. The coherence audit's
   four questions are Spec Kit's converge in prose. Whether an item of the
   definition of done should name the command that proves it is a question
   for the owner, below; the cost is a rule, and the evidence for the
   need is that on Crumbz nothing ticked was ever machine-read.
6. **The try and the post-mortem are placed and need nothing more.** The
   try is closing's step; the post-mortem is closing's and integration's
   red. Neither belongs in the unit.

### What it does not settle

- Whether the second reader is the forge's bot, the writer's harness in a
  fresh context, or a second agent session; each is native and the owner
  chooses.
- Whether Cairn should say how a path folder relates to a Spec Kit feature
  or an OpenSpec change — the convergence audit said "compatible", and the
  slicing note reads whether Crumbz's `docs/` played that role.
- Whether the owner's try should leave any trace; the owner dropped the
  box on 2026-09-07 and this note does not reopen it.

### Questions for the owner

Tags as in the 1.1 decisions page: **simplest** removes or avoids a rule,
**native** uses what the tools already do, **adds a rule** is a new check
or step to weigh, **one sentence in a skill** is neither.

**Q1. Who reads the diff before you merge it?** On Crumbz the only
reader that found defects was a bot on the request; it found nine on three
requests and ran out of quota. Your own read was once twenty seconds.

- [ ] **The forge's reviewer, on every request.** *(native)* Copilot
  code review turned on for the repository; it comments and cannot
  approve; the writer answers its findings with a unit and a new candidate
  as 011 and 012 did. Nothing in Cairn changes but one sentence in the
  close skill saying the findings are answered before the try.
- [ ] **The writer, in a fresh context, before the request.** *(native
  to the agent products; one sentence in a skill)* Before opening the
  request the writer runs its harness's review command in a fresh context
  and pastes the findings and their dispositions into the self-review.
- [ ] **Nobody new.** *(simplest, as today)* Your read and your try are
  the second reader.

**Q2. Does the unit get a fifth movement?** The self-review today is the
writer's own read of its own diff.

- [ ] **No, the self-review carries the findings.** *(one sentence in a
  skill)* Four movements stay; the self-review section is where a
  reviewer's findings, if any reader exists, are listed with what was
  done. Q1 decides whether there is a reader.
- [ ] **No, and nothing changes.** *(simplest, as today)*
- [ ] **Yes, a review movement the checker requires.** *(adds a rule)* A
  fifth section every step must carry, checked for presence. The
  manifesto's first threat, offered to be weighed.

**Q3. Does a change start with its failing test?** One commit per unit
cannot show the order; the record already requires the test.

- [ ] **No.** *(simplest, as today)* Tests move with the change and assert
  the refusal; the order is the writer's.
- [ ] **One sentence.** *(one sentence in a skill)* A unit that changes
  behaviour writes the failing test before the change; a unit that changes
  only structure carries no new test and says so. Beck's two rules, no
  commit added.
- [ ] **A test-first movement.** *(adds a step)* The failing test is
  pushed as a provisional commit before the change. Two commits per unit.

**Q4. Does anything but you read the definition of done?** Every product
re-checks a stopping condition by machine; Cairn's is boxes you tick.

- [ ] **No.** *(simplest, as today)* The plan names the item it advances
  (ADR-009) and you read the request against the list.
- [ ] **The request answers it item by item.** *(one sentence in a
  skill)* The coherence audit's first question becomes a line per item of
  the definition of done, each with the unit that advanced it and the
  command or page that shows it. Spec Kit's converge, in prose, once, at
  closure.
- [ ] **Each item names its check.** *(adds a rule)* An item of the
  definition of done names a command or a test; the checker runs them at
  `C` and refuses a candidate whose item fails. A done-when the machine
  reads, at the cost of a rule and of items that can be written as
  commands.
