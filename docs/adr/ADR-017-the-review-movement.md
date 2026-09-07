---
type: Cairn Decision Record
title: ADR-017 — the review movement
description: A unit has five movements — plan, change, self-review, review, verify. The review is the writer's own agent in a fresh context that sees only the diff and the two criteria of ADR-016, and its findings with their dispositions are written into a section of the step record that the checker requires. Promotes Q6 and Q7 of the coding-guidelines decisions page; the one answer of the page that adds a rule.
tags: [cairn, adr, 1.1, work-unit, review, fresh-context, checker, skills]
timestamp: 2026-09-07T00:00:00Z
adr:
  id: ADR-017
  status: accepted
  date: 2026-09-07
---

# ADR-017 — the review movement

Status: accepted · 2026-09-07 · written by CP-CAIRN-003, S02

**Promoted from** the owner's
[decisions page](../../project/brainstorm/2026-09-07-coding-guidelines-decisions.md)
at blob `48112c310e1c127b0265ed63c8255bb0377264fa` (Q6, Q7, with the
owner's words under Q6) and
[research note 2, the step cycle](../../project/brainstorm/2026-09-07-step-cycle-research.md)
at blob `65e7a2a96a4046af05f67a4e06ff9328fe03068f`, its sections *Side by
side* and *What Crumbz did with the four movements*. Both notes stay
exactly as they were. It supersedes no record of 1.1: the unit of chapter
5 keeps its four movements and gains one, and the self-review stays the
writer's, in the tags of
[ADR-016](./ADR-016-the-coding-stance-absorbs-ponytail.md) decision 2.

## Context

The unit's four movements match every cycle in use in 2026 — Spec Kit,
OpenSpec, the plan modes of Claude Code and Codex, Copilot's code review,
Kent Beck's loop — and
its step record and bound candidate exceed them. What the three agent
products have, and Beck is himself, and the two spec toolkits and Cairn
lack, is a reader of the diff who did not write it, before the merge. Claude Code,
Codex and Copilot each ship it as one command or one setting; the vendor's
own guide says why: a fresh context is not biased toward code it just
wrote, and it must be told to flag only what affects correctness or the
stated requirements, or it invents gaps.

On Crumbz the only reader that found defects was a review bot on three
closing requests: nine findings, all correctness — a round id serialised
before conversion, a game day decided after the tile filter, duels resolved
against stale links — on units whose self-review had honestly said what it
rejected and why. Five of the nine were answered by a unit and a new
candidate; four were never named. The bot's quota then ran out, and four
paths merged with no reader but the owner, once twenty seconds after
opening. The self-review was operative for the ladder and not for
correctness.

The owner answered on 2026-09-07. On the forge's reviewer: *"I use Claude
in Claude Code, and I have a ChatGPT connector that reviews PRs; I never
heard of Copilot."* Then, on reading that the forge's reviewer is a paid
plan and the connector is personal: *"we need something agnostic of paid
plan but also from personal configuration."* A fresh context of the
writer's own agent needs neither.

## Decisions

### Decision 1 — the reader is the writer's own agent in a fresh context

Promotes **Q6**, *The writer, in a fresh context, before the request* —
native to the agent products; one sentence.

Every unit's diff is read, before it is verified and pushed, by a second
context of the writer's own agent — a new session or a subagent of the
harness the writer runs in — that is given the diff and the two criteria
of ADR-016 decision 4, the ladder and correctness, and nothing else: not
the plan, not the conversation, not the step record. The harness's own
review command is that reader where the harness has one; a plain second
context given the same inputs is the same reader where it has not. No
paid plan and no personal connector is needed, and none is named. A bot
on the request, where one exists, is a bonus the movement does not depend
on and the record does not require.

What this changes: the `cairn-unit` skill, where the movement is
described, one sentence naming the reader and what it is given.

### Decision 2 — the review is the unit's fifth movement, and the checker requires its record

Promotes **Q7**, *Yes, a review movement the checker requires* — adds a
rule.

A unit has five movements, in order: plan, change, self-review, review,
verify. The review comes after the self-review because the writer's own
tagged lines are the last thing the writer does to the diff before it is
read, and before verify because a finding fixed changes the diff the gates
judge. Its record is a section of the step file, `#### Review`, between
the self-review and the verification: one line per finding the fresh
context returned, each with its disposition — fixed in this unit, refused
with the reason, or deferred to a named unit or path — or the one sentence
that the reader found nothing. A step record without that section is not
a completed unit.

The checker reads the section's presence in the step record of the
current unit, as the rule `work-unit` today reads the presence of the
`cairn-unit` block in the same file, and refuses a unit that lacks it or
carries it empty. The rule is `review`, blocking; it reads presence and
shape, not judgement — whether the reader was fresh, and whether the
dispositions are honest, is what the owner reads at the candidate. The
`closure` type, which carries no step file, carries no review. The rule's
message names the remedy, as ADR-008 decision 6 requires: the section is
written into the step, never into the record of an earlier one.

What this changes: the `cairn-unit` skill, a movement added between its
self-review and verify, and its type table; `spec/index.md`, chapter 5,
where the four movements become five; `spec/concepts/work-unit.md`;
`spec/reference/path-template.md`, the step shape, which gains the
section; one blocking rule `review` in `tools/cairn-check.mjs`, its entry
in the catalogue `tools/cairn-rules.mjs` writes into
`spec/reference/conformance.md`, one adversarial fixture in
`tools/cairn-fixture.test.mjs` containing a merged trunk commit as ADR-004
decision 4 requires, and its line in `tools/soundness.md`.

## Alternatives rejected

- **Q6, the forge's reviewer on every request** (native): Copilot code
  review, or the connector that read Crumbz's requests. Refused in the
  owner's words: a paid plan or a personal configuration, and a reader
  that runs at the request, once, when the movement is wanted at every
  unit.
- **Q6, nobody new** (simplest, as today): the owner's read and try.
  Refused on the Crumbz count: nine correctness findings by the one
  reader that was not the writer, none by the self-review.
- **Q7, no; the self-review carries the findings** (one sentence): four
  movements stay and the findings are pasted into the self-review. Refused
  because two readers would share one section, and because ADR-016
  decision 2 gives the self-review a shape of its own, the five tags, that
  a correctness finding does not fit.
- **Q7, no, and nothing changes** (simplest, as today).

## Consequences

- Every unit costs one more context: the reader's. It reads the diff and
  two criteria, not the repository, and the movement is the shortest of
  the five.
- The step record gains a section, and the checker reads a second thing
  in the step file: the `cairn-unit` block today, the review section now.
  It reads nothing of the section's content beyond emptiness, and it reads the
  current unit's step only, so a step written before the rule existed is
  not refused when a later unit is judged.
- The Crumbz shape — findings answered by a unit and a new candidate at
  closure — moves inside the unit: a finding is fixed before the push, and
  the candidate carries no backlog of a bot's findings.
- A reader of a step can tell what the writer cut, the tagged lines, from
  what the writer was told, the findings and their dispositions.
- The 1.1 architecture page's sentence *a unit is plan, change,
  self-review, verify* is amended by this path, naming this record.

## What the manifesto's test weighed

This is the one answer of the page that adds a rule, and the manifesto's
first threat — *searching for more control in the volume of tests and
complexity of workflows* — was weighed against it. Three things outweighed
it. The manifesto's own statement of the code names the sequence
*planning, coding, reviewing, tests* as isolated steps, and the unit had
collapsed reviewing into the writer's read of its own diff; the movement
restores a step the manifesto lists, it does not add one the manifesto
lacks. The reader is native: the harness's own review command or a second
context of the same agent, with no plan, no connector and nothing to
maintain — which the owner asked for in as many words. And the rule reads
one section in a file the checker already opens for the `cairn-unit`
block; no tool, no workflow, no run is added. Against it stands the cost of
one context per unit, accepted with the Crumbz evidence: nine correctness
defects that reached three closing requests.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the unit skill | `cairn-unit`, the movement's sentence |
| 2 | the unit skill, chapter 5, the concept, the step template | `cairn-unit`, the movement and the type table; `spec/index.md` §5; `spec/concepts/work-unit.md`; `spec/reference/path-template.md` |
| 2 | the checker, its catalogue, its fixture | rule `review` in `tools/cairn-check.mjs`; `tools/cairn-rules.mjs` and `spec/reference/conformance.md`; `tools/cairn-fixture.test.mjs`; `tools/soundness.md` |

The roadmap register names the coding paths of 1.1 that carry these: the
skill, the chapter and the template in path 1, the rule and its fixture in
path 2.
