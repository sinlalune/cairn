---
type: Cairn Learning Note
title: Cairn 1.1 — the owner's decisions
description: The functional questions Cairn 1.1 needs the owner to answer, in plain language, each with what happened on Crumbz and two or three ways to work from now on; the owner ticks one option per question, and the technical rulings note is derived from the answers.
tags: [cairn, decisions, 1.1, owner, crumbz, learning]
timestamp: 2026-09-06T16:00:00Z
cairn:
  status: provisional
---

# Cairn 1.1 — the owner's decisions

Three days of Crumbz produced five notes and a long list of technical asks.
This page turns them into questions about **how you want to work with the
agents**. Each question says what happened, then offers two or three ways
to go on. Tick one. If none fits, write a line under the question in your
own words; it wins.

You do not need to read the [technical rulings](./2026-09-06-cairn-1-1-rulings.md).
That note is the translation of your answers into changes to the checker,
the skills and the kit; it is filled in from this page after you answer.
The last section here says which technical items each question drives.

Three things you already decided on 06/09 are recorded at the end and are
not asked again.

## The manifesto's test

The manifesto names its first threat: *searching for more control in the
volume of tests and the complexity of workflows*. It also says that a
solution not native to Git, GitHub and CI is probably not a best practice,
and that every line must be effortlessly comprehensible. Most asks in the
five notes add a rule. So each option below carries one of three tags:

- **simplest** — removes or avoids a rule;
- **native** — uses what Git or GitHub already does;
- **adds a rule** — a new check or a new step, which the manifesto asks you
  to weigh, not to refuse.

When two options would both work, the manifesto leans to the first two.
The last question asks what 1.1 should remove.

## A. Starting a coding path

### Q1. Can the agent start coding before you have approved the plan?

Today the agent writes the plan, opens a pull request for it, and must wait
until you merge that request before writing any code. On Crumbz that wait
was between 15 minutes and 13 hours (overnight), and five times the agent
kept coding anyway, then patched things up afterwards. Where you merged
within a minute nothing went wrong.

- [ ] **Yes, right away.** *(adds a rule)* The agent may start coding on
  its own branch as soon as the plan is submitted; your review of the plan
  comes when you get to it, and the work cannot be finished until you have
  approved the plan.
- [ ] **Yes, and skip the request.** *(simplest, native)* You are the only
  owner, so the agent records the plan directly on the main line without a
  pull request; you review the plan with the finished work instead.
- [ ] **No.** *(as today)* The agent stops and tells you it is waiting for
  your go-ahead, and does nothing on that path until you give it.

### Q2. Is your review of the plan a formal step?

On Crumbz you often read the plan request, asked for changes, and the agent
amended the accepted scope. That worked well but nothing in the protocol
says it should happen.

- [ ] **Yes.** *(one sentence in a skill)* "The owner reviews the plan" is
  a named step; the agent expects it and records your changes as an
  amendment.
- [ ] **No.** *(simplest)* Keep it informal.

## B. Finishing a coding path

### Q3. Do you want to try the result yourself before it goes in?

Nothing in the lifecycle records that you used what was built. The agent
runs the tests and its own checks; you merged one closing request 29
seconds after it was opened.

- [ ] **Always.** *(adds a step)* Before the merge, you open the app and
  try the change, and you tick a box in the pull request that only you may
  tick.
- [ ] **When it is visible.** *(adds a step, narrower)* Only for changes
  to screens or behaviour you can see; pure back-end or documentation work
  goes on tests alone.
- [ ] **Never.** *(simplest)* Tests and the agent's checks are enough.

### Q4. What counts as your acceptance of a finished path?

GitHub does not let the only owner approve their own pull request, so all
fifteen finished paths carry no recorded acceptance. Today "you clicked
merge" is the only trace.

- [ ] **A line you write.** *(adds a rule)* Before merging, you write one
  line in the request yourself ("accepted, Toure, date"); the merge without
  that line is a mistake the tool reports.
- [ ] **A merge from your terminal.** *(native)* You integrate from your
  own machine with a Git command instead of GitHub's button, and that
  command records the acceptance.
- [ ] **The merge click is enough.** *(simplest)* Keep it as it is.

### Q5. Should you be told to wait for the automatic check before merging?

Twice a path was merged before its automatic check had finished, and the
check then failed. GitHub on the free private plan cannot be made to block
this, and the tool currently claims it can.

- [ ] **Yes.** *(one sentence, plus a warning the tool prints)* The
  closing instructions say "merge only after the check on the final commit
  is green", and the tool tells you when GitHub is not enforcing it.
- [ ] **No.** *(simplest)* You will watch for it yourself.

### Q6. May a path be declared finished when the closing formality was skipped?

Six early paths on Crumbz went from "running" straight to "done" without
the final bookkeeping commit that seals what was accepted.

- [ ] **No.** *(adds a rule)* The tool refuses; the sequence must be
  followed.
- [ ] **Yes, with a warning.** *(lighter)* Allowed, but reported.
- [ ] **Drop the formality on pull requests.** *(simplest, to be studied)*
  The pull request already names the exact commit it merges; if that is
  enough of a seal, the extra bookkeeping commit goes away instead of being
  enforced.

## C. What the checker catches

### Q7. The "definition of done" checkboxes

Each path's plan lists its outcomes as checkboxes. Ticking them changes the
accepted text and breaks the acceptance seal; agents did it three times in
three days, and twice the tool did not notice because it happened at the
very end.

- [ ] **Remove the checkboxes.** *(simplest)* Outcomes are a plain list;
  completion is stated in the closing record and the journal.
- [ ] **Keep them, and catch every tick.** *(adds a rule)* The tool checks
  the seal at every stage, including the last one.

### Q8. Two paths on the same files at the same time

CP-016 was opened while CP-015 was running on the same files, dropped its
declared dependency on 015, and finished first. 015 is now stranded with
conflicts.

- [ ] **Warn and require a choice.** *(adds a rule)* At the start, the
  tool reports the overlap; the later path either declares it waits for the
  earlier one, or you write that you accept the race.
- [ ] **Warn only.** *(adds a report, no rule)*
- [ ] **Nothing.** *(simplest)* Overlap is the writer's judgement; the
  record already shows it, as CP-016's did.

### Q9. Fix the checker's known blind spots

Crumbz found several cases where the tool read the repository wrongly or not
at all: a plan saved as a draft then activated confused it (the agent then
wrote a wrong value to satisfy it); a resume point left empty was accepted;
a rule counted other paths' work as this path's; three repairs to the tool
live only in Crumbz's copy. These are corrections, not choices.

- [ ] **Yes, all of them, in 1.1.** *(corrections, no new rule)*
- [ ] **Fix or delete.** *(simplest)* Each blind spot is first asked
  whether the rule that has it should exist at all; a rule that misreads and
  guards little is removed rather than repaired.
- [ ] **Later.** Only what blocks the next adopter.

## D. Tidiness after the work

### Q10. Branches after a merge

Crumbz has forty-five branches; GitHub keeps every one. The protocol wants
the work branches kept as history and says nothing about the temporary ones
(plan requests, integration requests).

- [ ] **Delete the temporary ones, keep the work branches** until the path
  is archived. *(one sentence in a skill)*
- [ ] **Delete everything after merge.** *(native: one GitHub setting)*
- [ ] **Keep everything.** *(as today)*

### Q11. Working folders after a path is done

Each path works in its own folder on your disk. Seven folders of finished
paths are still there; the agents left them for you.

- [ ] **The agent removes it** as the last step of closing, and reports if
  it could not. *(native: the step already exists in the skill; it was
  skipped)*
- [ ] **The agent lists them** and you remove them. *(adds a report)*

### Q12. When a framework writes into the agent's entry file

Next.js writes its own block of instructions into `AGENTS.md`, the file the
kit owns, every time the dev server runs. Codex committed it; it is still
there.

- [ ] **Move it out.** *(one sentence in a skill)* The agent puts such
  blocks in a separate file the kit does not own, and the entry file points
  at it.
- [ ] **Ignore it.** *(simplest)* The block is never committed.
- [ ] **Accept it** in the entry file. *(as today)*

### Q13. Housekeeping with no choice in it

Small fixes the notes found: a duplicated field in every journal entry; the
roadmap table still showing the installer's example row after sixteen
paths; two paths recorded in one integration; a "closure step" that does
not exist and confused Codex; the tool's test command colliding with the
product's; error messages that name the fault but not the remedy; the
agent told to install dependencies before the first check.

- [ ] **Do all of it in 1.1.**
- [ ] **Later.**

## E. What the agents are told

### Q14. Tighten the instructions the agents misread

"Repair" was used eleven times for ordinary bug fixes; one path grew six
units past its accepted outcome because nothing asked "which outcome does
this unit advance?"; a commit id was typed by hand once.

- [ ] **Yes.** *(three sentences in the skills, no new check)* Define
  "repair" where the type is chosen, make each unit name the outcome it
  advances, and forbid hand-typed ids.
- [ ] **Later.**

### Q15. One module note per main component

Crumbz has one module note for the whole application; every path appends
to it and it now reads as a history. You asked whether it should split.

- [ ] **Yes, split by main component**, and the agent proposes the split
  when one note is being touched by every path. *(the kit already allows
  several areas; this is a sentence in a skill)*
- [ ] **No**, one note per application is fine. *(as today)*

## F. Documentation

### Q16. A page a newcomer can read first

Three promotion paths wrote architecture pages and decision records, and no
page that says what Crumbz is and where to start.

- [ ] **One product page.** *(one output named in the chronology)* Every
  promotion path must write or update a single readable page about the
  product, using the concept notes as its glossary.
- [ ] **One page per product surface** (board, match lab, settled…).
  *(more pages)*
- [ ] **No.** *(as today)* Architecture and decisions are enough.

### Q17. A local folder explaining the protocol

Everything about Cairn in an adopter repository is a link to GitHub; nothing
on disk says what the protocol is or which files belong to it.

- [ ] **Yes.** *(one file against the kit's thirty-file budget)* The kit
  installs a small `cairn/` folder with one page that names the release,
  links the chapters and the skills, and lists the files the kit owns.
- [ ] **No.** *(as today)* The links are enough.

## G. Tools

### Q18. Automatic post-mortem: when should it run?

The reading half of every note in this folder is mechanical and could be a
command. What is left for a person is the judgement.

- [ ] **On demand only.** *(a new command, run by hand)* You or the agent
  asks for it.
- [ ] **Every time a path is finished**, attached to the journal entry.
  *(a new command, wired into closing)*
- [ ] **Every time a check goes red**, so the incident is written while it
  happens. *(a new command, wired into CI)*
- [ ] **No new tool.** *(simplest)* The reading is a skill the agent
  follows, from the same Git and GitHub commands, when you ask for a
  post-mortem.

## H. What 1.1 removes

### Q19. What should go away?

The manifesto's opportunity: *always be open to simpler workflows*. The
audit found four things that cost time on Crumbz and may not need to exist.
Tick any you want 1.1 to study for removal; leave bare what stays.

- [ ] **The plan pull request for a sole owner.** You register your own
  plans; the request is a round-trip to yourself.
- [ ] **The second automatic run.** Every commit is checked twice, once on
  the push and once on the request; one green and one red confused two
  merges.
- [ ] **The outcome checkboxes.** Same as Q7's first option.
- [ ] **The module note's running log.** Each path appends its outcome to
  "Current State"; the journal already holds that history.

## Already decided on 06/09

- **Pre-existing documentation** of any format goes in `docs/inputs`, and
  the first ideation session starts by reading it.
- **The concept notes** are split in three: `docs/concepts/cairn` for
  protocol terms, `docs/concepts/<project>` for the project's own terms,
  `docs/concepts/learning` for outside knowledge.
- **The agent writes concept notes proactively**, even during a chat, when
  it explains a complex abstraction, with a synthetic and pedagogical
  approach.

## How the answers become technical rulings

| Question | Technical rulings it drives |
| :-- | :-- |
| Q1 | R01 |
| Q2 | R02 |
| Q3 | R04 |
| Q4 | R03, R07 |
| Q5 | R05, R06 |
| Q6 | R08 |
| Q7 | R10, R11 |
| Q8 | R12 |
| Q9 | R09, R13, R14, R15, R16, R17 |
| Q10 | R23 |
| Q11 | R24 |
| Q12 | R21 |
| Q13 | R18, R19, R20, R22, R28, R29, R37, R38 |
| Q14 | R25, R26, R27 |
| Q15 | R30 |
| Q16 | R32 |
| Q17 | R33 |
| Q18 | R36 |
| Q19 | no ruling yet: each tick opens a study in the promotion path, and may strike a technical ruling above |
| already decided | R31, R34, R35 |

Every one of the thirty-eight technical rulings is driven by exactly one
question above, and Q19 may strike some of them. After you answer, the rulings note is ticked, deferred or
refused to match, and the promotion path is bound to both.
