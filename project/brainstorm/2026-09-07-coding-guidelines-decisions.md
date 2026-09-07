---
type: Cairn Research Note
title: Coding guidelines — the owner's decisions
description: The fifteen questions the four research notes of 2026-09-07 end with, gathered on one page in plain language for the owner to tick, each with what happened on Crumbz and two or three ways to work from now on; the promotion path that fuses the answers with Cairn 1.1 is derived from this page after the owner answers.
tags: [cairn, decisions, coding-guidelines, owner, crumbz]
timestamp: 2026-09-07T18:00:00Z
cairn:
  status: provisional
---

# Coding guidelines — the owner's decisions

Four research notes read what the guides say and what Crumbz wrote:
[the coding stance](./2026-09-07-coding-stance-research.md),
[the step cycle](./2026-09-07-step-cycle-research.md),
[the component slicing](./2026-09-07-component-slicing-research.md) and
[the graph flow](./2026-09-07-graph-flow-research.md). Each ends with
questions. This page gathers them, in the shape the
[1.1 decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md)
used: what happened, then two or three ways to go on. Tick one per
question. If none fits, write a line under the question in your own
words; it wins.

You do not need to read the notes to answer. Each question names the note
and the section that carries the evidence, for when you want it.

## The manifesto's test

The manifesto's first threat is *more control through the volume of tests
and the complexity of workflows*; a solution not native to Git, GitHub and
CI is probably not a best practice; every line must be effortlessly
comprehensible. So every option carries a tag:

- **simplest** — removes or avoids a rule;
- **native** — uses what Git, GitHub or the agent products already do;
- **one sentence** — a sentence in a skill or a template, no check;
- **adds a rule** — a new check, step or tool, which the manifesto asks
  you to weigh, not to refuse.

When two options would both work, the manifesto leans to the first three.

## What the notes found, in five lines

- The coding stance was installed before Crumbz's first unit, is cited by
  none of seventy-one steps, and its ladder was skipped in seven of the
  nine units read in full; the two clean units were the two whose self-review named a
  rejection. Ponytail, the skill it was cut from, gained three rules since.
- The unit's four movements match every cycle in use; what the agent
  products and Kent Beck have and the unit lacks is a reader of the diff
  who did not write it; the two spec toolkits lack one too. The
  one bot that read three Crumbz requests found nine correctness defects
  the self-reviews had not.
- Crumbz's tree is sliced by layer, its stated boundaries hold, and the
  cost is duplication and dead exports across the layers of one feature.
  Cairn's areas already are the vendors' per-directory files.
- One edge between paths still suffices: the forge has the same edge
  natively, Beads left Git for a database, and the products fan out into
  worktrees with one writer each. CP-016 is closed by ADR-003.
- Nothing below asks to reopen a 1.1 decision. Everything below is a
  sentence, a tag or a rule the owner may refuse.

## A. The coding stance

*Note 1, sections "Ten Crumbz units read against the ladder" and "What
`cairn-code` has, lacks and says too much".*

### Q1. When the agent reviews its own diff, must it say what it deleted, reused or refused, in a fixed vocabulary?

On Crumbz the two units with nothing to cut were the two whose
self-review named a rejection; the rest wrote prose or nothing, and the
same code was written twice by two agents a day apart.

- [x] **Yes, five tags.** *(one sentence; native to Ponytail)* The
  self-review of every unit is one line per finding under `delete:`,
  `stdlib:`, `native:`, `yagni:`, `shrink:`, ending with the net line
  count or "Lean already", as Ponytail's review prints it.
- [ ] **No, keep the free question.** *(simplest, as today)* "What would
  you refuse?" stays.
- [ ] **Yes, and the checker reads it.** *(adds a rule)* A self-review
  without one tagged line or the "lean" sentence blocks the unit.

### Q2. Should `cairn-code` follow Ponytail's current version, or stay the cut of 2026-09-02?

Three things arrived since: fix the root cause, not the symptom; a floor
under laziness — trust boundaries, data loss, security, accessibility are
never cut; one runnable check per non-trivial change and none for a
one-liner. Crumbz has the evidence for the first two: a runner that
swallows its own failure, a secret check active only in production.

- [ ] **Take the three additions.** *(one sentence, three times)* Six
  lines added to `cairn-code`; nothing removed.
- [x] **Install Ponytail and keep only Cairn's own.** *(simplest, native:
  absorb the ecosystem)* The kit points at Ponytail at a pinned tag for
  the ladder and the review; `cairn-code` shrinks to what is Cairn's
  alone — deletion turned on the protocol, the test that never fires,
  the three-line step. A file nobody else maintains becomes a file its
  author maintains.
- [ ] **Leave it.** *(as today)*

### Q3. Does a unit have a size?

Units of 1,042 and 676 lines passed every gate. The three-line cap bounds
the explanation, and the writer that wrote the largest units never used
the shape the cap needs. Every guide bounds the task instead.

- [ ] **The sentence rule.** *(one sentence; native to the vendors'
  guides)* A unit's plan is one sentence; a plan that needs two is two
  units. A structural change and a behavioural change never share a unit.
- [x] **No size.** *(simplest, as today)* The cap is the only bound.
- [ ] **A number.** *(adds a rule)* An advisory when a unit's source diff
  exceeds a line count you pick.

### Q4. Which of secrets, error handling, dependencies and naming get a line in the stance?

The evidence: one runner that swallows its own failure, one secret check
that only runs in production, no naming or formatting fault in ten units.
Every guide says to leave the defaults alone on naming and formatting.

- [x] **Secrets and errors, one line each.** *(one sentence, twice)* No
  secret in code or in a record, rotate before redaction; an error is
  handled where data would be lost or a trust boundary crossed, and
  swallowed nowhere. Nothing on naming, comments or formatting.
- [ ] **Nothing.** *(simplest)* The ladder covers dependencies, the
  redaction ceremony covers a leak, the defaults cover the rest.
- [ ] **A style section.** *(adds rules)* Naming, comments, formatting,
  errors, dependencies, secrets, as Google's example file does.

### Q5. Is the ladder the criterion when someone else reads the diff?

Q6 below asks who reads it; this asks only what they read for.

- [x] **Yes.** *(one sentence)* Whoever reviews the diff — the writer in
  a fresh context, a bot, you — is told to read it against the ladder and
  for correctness, nothing else, so that findings do not become new
  layers and defensive code.
- [ ] **No.** *(simplest, as today)* The reviewer reads as they like.

## B. The step cycle

*Note 2, sections "What Crumbz did with the four movements" and "Side by
side".*

### Q6. Who reads the diff before you merge it?

The only reader that found defects on Crumbz was a bot on the closing
request: nine findings on three requests, five of them answered by a unit and a
new candidate, until its quota ran out. Your own read was once twenty
seconds.

- [ ] **The forge's reviewer, on every request.** *(native)* A review
  bot on the request — the one you already have, the ChatGPT/Codex
  connector that read #21, #27 and #30 on Crumbz, or GitHub's own, Copilot
  code review; it comments, cannot approve, and the writer answers its
  findings before you try the result. One sentence in the close skill.
  *Owner, 2026-09-07: "I use Claude in Claude Code, and I have a ChatGPT
  connector that reviews PRs; I never heard of Copilot." The bot is that
  connector.*
- [x] **The writer, in a fresh context, before the request.** *(native
  to the agent products; one sentence)* The writer runs its harness's
  review command in a fresh context and pastes the findings and what it
  did about them into the self-review.
  *Owner, 2026-09-07, after reading that the forge's reviewer is a paid
  plan and the connector is personal: "we need something agnostic of paid
  plan but also from personal configuration." A fresh context of the
  writer's own agent — a second session that sees only the diff and the
  criteria — needs neither; with Q7 it runs at every unit, and a bot on
  the request, where one exists, is a bonus the rule does not depend on.*
- [ ] **Nobody new.** *(simplest, as today)* Your read and your try.

### Q7. Does the unit get a fifth movement?

- [ ] **No; the self-review carries the findings.** *(one sentence)* Four
  movements stay; the self-review is where a reviewer's findings, if Q6
  gives you one, are listed with what was done.
- [ ] **No, and nothing changes.** *(simplest, as today)*
- [x] **Yes, a review movement the checker requires.** *(adds a rule)*

### Q8. Does a change start with its failing test?

One commit per unit cannot show the order; the record already requires the
test; the units whose tests asserted a refusal were the clean ones.

- [ ] **No.** *(simplest, as today)* Tests move with the change and assert
  the refusal; the order is the writer's.
- [x] **One sentence.** *(one sentence)* A unit that changes behaviour
  writes the failing test first; a unit that changes only structure
  carries no new test and says so.
- [ ] **A test-first movement.** *(adds a step)* The failing test is
  pushed as a provisional commit before the change.

### Q9. Does anything but you read the definition of done?

Every product now re-checks a stopping condition by machine. Cairn's is
boxes you tick, and on Crumbz nothing ticked was ever machine-read.

- [ ] **No.** *(simplest, as today)* The plan names the item it advances
  and you read the request against the list.
- [x] **The request answers it item by item.** *(one sentence)* The
  coherence audit's first question becomes a line per item, each with the
  unit that advanced it and the command or page that shows it.
- [ ] **Each item names its check.** *(adds a rule)* An item names a
  command or a test; the checker runs them at the candidate and refuses
  one whose item fails.

## C. The component slicing

*Note 3, sections "Crumbz's tree against its own pages" and "The least
discipline Cairn could state".*

### Q10. When a module note splits by main component, what is a component?

Crumbz's tree is `lib`, `app`, `components`; its product is the board,
the Match Lab, the settled tiles and the ingestion. The tree's slicing
held and the cost was one feature spread over four folders, written twice.

- [ ] **A feature the product has.** *(one sentence; native to `areas`)*
  An area is something a user can name; its match patterns may cross
  folders; the note describes the feature end to end.
- [x] **A folder of the tree.** *(simplest, as today)* An area is a
  directory; the note describes the layer.
- [ ] **The adopter's choice, unsaid.** *(as today)* ADR-010 stays as it
  is.

### Q11. Does the architecture page say which way dependencies point?

On Crumbz the direction was right and unwritten; two imports crossed a
line the note names and nothing noticed.

- [x] **One sentence on the page.** *(one sentence in a template)* The
  architecture template asks for the direction in a sentence a reader can
  check against an import. No tool reads it.
- [ ] **Nothing.** *(simplest, as today)*
- [ ] **An advisory in the checker.** *(adds a rule)* Imports between
  areas are read against the areas' order and reported; the first rule to
  read source lines.

### Q12. When a path's `writes:` is a whole source root, is that a signal?

Nine of sixteen Crumbz paths declared all of `src/`, and every overlap and
every crossing hid behind it.

- [x] **The open skill asks for the area.** *(one sentence; as ADR-010
  d2 already says)* A path names its areas and `writes:` is their
  patterns; a path that needs the whole root says why.
- [ ] **Nothing.** *(simplest, as today)*
- [ ] **An advisory when `writes:` equals a source root.** *(adds a
  rule)* The registration run says the path spans every area.

## D. The graph flow

*Note 4, sections "What Crumbz declared and what ran beside what" and
"What the forge does natively".*

### Q13. Where does the edge between two paths live?

Today it is `depends_on` in the record and `unblocked` in the generated
view. The forge can show the same edge as a `Blocked` badge on an issue.
Beads, the graph tracker, moved from Git to a database this year.

- [x] **In the record only.** *(simplest, as today)* The 1.1 overlap
  advisory makes a missing edge visible.
- [ ] **In the record, mirrored on a forge issue.** *(native, but a
  second copy)* Each path has an issue; the open skill sets `blocked by`
  from `depends_on`. Two places for one fact.
- [ ] **In a graph beside the code.** *(adds a tool)* Refused in
  September 2026 and offered again only because Beads changed.

### Q14. May a path have more than one writer?

Nobody on Crumbz needed it; the products fan out into worktrees with one
writer each; agent teams are experimental and off by default.

- [x] **No; a second agent opens a second path.** *(simplest, as today)*
  One path, one worktree, one writer; a helper agent inside the writer's
  session is the writer. One sentence says the last part.
- [ ] **Yes, in the writer's session.** *(one sentence)* The writer may
  run subagents in its own worktree and answers for their commits; the
  record names one writer.
- [ ] **Yes, two writers on one path in two worktrees.** *(adds a shape)*
  Units as a graph inside the path. Nothing asked for it.

### Q15. Does the roadmap register carry the edge between milestones?

The 1.1 register orders five paths under one milestone; a second milestone
would wait on the first in prose.

- [x] **No.** *(simplest, as today)* One milestone at a time; the order of
  rows is the order.
- [ ] **A `waits on` column.** *(one sentence in a template)* Read by
  nobody but you.

## What each answer drives

The promotion path that follows this page runs on the `full` route with a
documents-only surface, governed by the four notes and this page at their
blob ids. It amends the 1.1 architecture page where an answer changes what
a unit, a skill or an area is, adds a decision record for each answer that
is new, supersedes a 1.1 record only where an answer overturns one — none
of the questions above asks to — and names the coding paths that build
it, most likely as additions to coding paths 1 and 4 of the 1.1 register,
which already own the skills and the templates. The notes and this page
stay exactly as they were.

| Question | If the first option | If the second | If the third |
| :-- | :-- | :-- | :-- |
| Q1 | one sentence in `cairn-unit` step 3 and in `cairn-code` | nothing | a rule in the checker, one fixture |
| Q2 | six lines in `cairn-code` | the kit's manifest, `cairn-code` shortened, a pinned dependency | nothing |
| Q3 | one sentence in `cairn-unit` step 1 and the step template | nothing | an advisory in the checker |
| Q4 | two lines in `cairn-code` | nothing | a section in `cairn-code` |
| Q5 | one sentence in `cairn-close` step 3 | nothing | — |
| Q6 | one sentence in `cairn-close` and a repository setting | one sentence in `cairn-unit` step 3 | nothing |
| Q7 | one sentence in `cairn-unit` step 3 | nothing | a rule and a fixture |
| Q8 | nothing | one sentence in `cairn-unit` step 2 | a step in `cairn-unit`, one sentence in its reference |
| Q9 | nothing | the request template's first question, one sentence in `cairn-close` | a rule reading the definition of done, fixtures |
| Q10 | one sentence in `cairn-open` step 1 and the configuration reference | nothing | nothing |
| Q11 | one line in the architecture template | nothing | an advisory reading source |
| Q12 | one sentence in `cairn-open` step 1 | nothing | an advisory at registration |
| Q13 | nothing | one sentence in `cairn-open` step 3 | a tool |
| Q14 | one sentence in `cairn-unit` | one sentence in `cairn-unit` | a change to chapter 5 |
| Q15 | nothing | one column in the register template | — |

## What this page is waiting for

Your ticks. Then the promotion path.
