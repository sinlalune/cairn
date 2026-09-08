---
type: Cairn Decision Record
title: ADR-016 — the coding stance absorbs Ponytail and keeps Cairn's own
description: The kit points at Ponytail at a pinned tag for the decision ladder and the review, and cairn-code shrinks to what is Cairn's alone; every self-review speaks in Ponytail's five tags; two lines on secrets and errors; the ladder and correctness are the only criteria of whoever reads a diff; a unit has no size. Promotes Q1 to Q5 of the coding-guidelines decisions page.
tags: [cairn, adr, 1.1, coding-stance, ponytail, self-review, skills, kit]
timestamp: 2026-09-07T00:00:00Z
adr:
  id: ADR-016
  status: accepted
  date: 2026-09-07
---

# ADR-016 — the coding stance absorbs Ponytail and keeps Cairn's own

Status: accepted · 2026-09-07 · written by CP-CAIRN-003, S01

**Promoted from** the owner's
[decisions page](../../project/brainstorm/2026-09-07-coding-guidelines-decisions.md)
at blob `48112c310e1c127b0265ed63c8255bb0377264fa` (Q1 to Q5) and
[research note 1, the coding stance](../../project/brainstorm/2026-09-07-coding-stance-research.md)
at blob `65987c7a2227b406c41198e6aa53460854ed24d8`, its sections *What the
guides say a stance should hold*, *What `cairn-code` has, lacks and says
too much* and *Ten Crumbz units read against the ladder*. Both notes stay
exactly as they were. It supersedes no record of 1.1: the unit of
[ADR-009](./ADR-009-what-the-unit-skill-tells-the-agent.md) keeps its plan
line, and the kit's file budget of
[ADR-013](./ADR-013-a-local-pointer-to-the-protocol.md) is untouched.

## Context

`skills/cairn-code/SKILL.md` was cut from Ponytail on 2026-09-02 and
installed in Crumbz's tree before its first unit. None of Crumbz's
seventy-one step records names the skill, the ladder or a rung; of nine
units read in full, seven skipped at least one rung, rung 2 — *already in
the codebase* — six times: the same bookmaker selection was written twice
by two agents in two paths a day apart, and one route guard exists in four
copies at the trunk tip. The two units with nothing to cut were the two
whose self-review named a rejection, in prose. The ladder was applied
where a self-review said what it refused, and nowhere else.

Since the cut, Ponytail reached `v4.9.0` and gained three things the cut
lacks: fix the root cause, not the symptom; a floor under laziness —
validation at trust boundaries, error handling that prevents data loss,
security, accessibility are never cut; one runnable check per non-trivial
change and none for a one-liner. Crumbz holds the evidence for the first
two: a runner that catches the failure to write its own job row and
continues, a secret check active only in production. Ponytail's review
skill reports one line per finding under five tags and ends with the net
line count; the cut has no vocabulary for what should not exist.

The owner answered the five questions of section A on 2026-09-07. Each
decision below names its question, the option kept with the tag the
decisions page gave it, and the surface it changes by the name the
conformance page, the skills and the kit use today.

## Decisions

### Decision 1 — the kit points at Ponytail at a pinned tag, and `cairn-code` keeps only Cairn's own

Promotes **Q2**, *Install Ponytail and keep only Cairn's own* — simplest,
native: absorb the ecosystem.

The ladder and the review come from Ponytail, `DietrichGebert/ponytail`,
at the tag `v4.9.0` of 2026-08-07 — its `skills/ponytail/SKILL.md` and
`skills/ponytail-review/SKILL.md` — installed in the adopter's harness as
that repository says, beside the five Cairn skills. The kit names Ponytail
at that tag as a pinned dependency and copies none of its files; the tag
moves only with a release of the kit, so an adopter's stance is the one
the release was checked against. With it come the seven-rung ladder,
read-the-real-flow-first, deletion over addition, the root-cause rule, the
floor under laziness, the check per non-trivial change, the ceiling marker
and the review's five tags.

`cairn-code` shrinks to what Ponytail does not say and Cairn's own
evidence supports: deletion turned on the protocol itself — a rule behind
no requirement, a record nothing reads, a folder with one file; the test
that never fires — a test that asserts a valid input passes and never that
a violation is refused; the three-line step in the record — what it does,
why it is the least, what it does not do; absorbing the ecosystem, which is
this decision applied to the skill that states it; and the two lines of
decision 3. Everything the skill repeats from Ponytail leaves it. A file
nobody else maintains becomes a file its author maintains.

What this changes: `tools/cairn.mjs` — `planInstall`, which resolves the
kit's files, and the bootloader it generates, whose skills line names
*the `cairn-code` stance*; `cairn.lock.json`, where the kit records what it
installed; `skills/cairn-code/SKILL.md`, shortened.

### Decision 2 — the self-review speaks in Ponytail's five tags

Promotes **Q1**, *Yes, five tags* — one sentence; native to Ponytail.

The self-review of every unit is one line per finding under `delete:`,
`stdlib:`, `native:`, `yagni:`, `shrink:`, and ends with the net line
count or *Lean already*, as `ponytail-review` prints it. A tag with
nothing to name is absent; a unit of documents is read for the same
things, and the tags that apply to prose are the ones it uses. The free
question the unit skill asks today, *what would you refuse?*, is answered
by those lines. The checker does not read them: that is the third option,
refused below.

The three-line cap of `cairn-code` says today that in a step record *the
plan and the self-review are those three lines twice*; the plan stays
three lines, and the self-review is the tagged lines.

What this changes: the `cairn-unit` skill, step 3, one sentence;
`skills/cairn-code/SKILL.md`, the sentence of the cap; the step shape in
`spec/reference/path-template.md`, whose self-review section shows the
lines.

### Decision 3 — two lines on secrets and errors, nothing on style

Promotes **Q4**, *Secrets and errors, one line each* — one sentence,
twice.

Two lines are Cairn's own in the shortened stance. No secret in code or in
a record; a secret that reached either is rotated before it is redacted,
and the specification's redaction ceremony follows. An error is handled
where data would be lost or a trust boundary crossed, and swallowed
nowhere. The stance says nothing on naming, comments beyond why-not-what,
or formatting: every guide read says the defaults are right, and a line
about them is the line the vendor's own test cuts.

What this changes: `skills/cairn-code/SKILL.md`, two lines.

### Decision 4 — the ladder and correctness are the only criteria of whoever reads the diff

Promotes **Q5**, *Yes* — one sentence.

Whoever reviews a diff that is not their own — the writer in a fresh
context, a bot on the request, the owner — is told to read it against the
ladder and for correctness, and for nothing else, so that findings do not
become new layers, defensive code, and tests for cases that cannot happen.
Correctness is Cairn's addition: `ponytail-review` leaves it out of its
scope by design. Who the reader is, and when, is Q6 and Q7 of the decisions
page — the review movement, ADR-017, written by S02 of this path — which hands its reader
this criterion and adds none.

What this changes: the `cairn-close` skill, step 3, one sentence.

### Decision 5 — a unit has no size

Promotes **Q3**, *No size* — simplest, as today.

Nothing bounds a unit's diff. The three-line cap on the explanation is the
only bound, as today, and units of 1,042 and 676 lines have passed every
gate under it. Decision 2 is where a large unit shows: the tagged lines
name what it should not carry, and the fresh reader of ADR-017 reads them.

What this changes: nothing. The record keeps what is.

## Alternatives rejected

- **Q1, keep the free question** (simplest, as today): *what would you
  refuse?* produced the ladder in two units of ten, both from one writer on
  one day.
- **Q1, and the checker reads it** (adds a rule): a self-review without
  one tagged line or the lean sentence would block the unit; the
  manifesto's first threat, offered to be weighed and refused.
- **Q2, take the three additions** (one sentence, three times): six lines
  in `cairn-code`, nothing removed; a copy that drifts again by the next
  Ponytail release.
- **Q2, leave it** (as today): the cut of 2026-09-02, lacking the three
  rules Crumbz needed.
- **Q3, the sentence rule** (one sentence; native to the vendors' guides):
  a unit's plan is one sentence and structural and behavioural changes
  never share a unit. Refused as a bound on the unit; the half about
  behaviour and structure returns as Q8, a sentence on the test, in
  ADR-018.
- **Q3, a number** (adds a rule): an advisory past a line count the owner
  picks.
- **Q4, nothing** (simplest): the ladder's rung 5 for dependencies, the
  redaction ceremony for a leak, the defaults for the rest; refused
  because the two faults Crumbz has are neither.
- **Q4, a style section** (adds rules): naming, comments, formatting,
  errors, dependencies, secrets, as Google's example file does.
- **Q5, no** (simplest, as today): the reviewer reads as they like.

## Consequences

- The kit gains its first dependency outside itself, pinned, and loses
  the maintenance of a copy: the ladder is read at Ponytail's tag, and a
  later tag is a release decision, not an edit.
- A harness that loads no skill — Ponytail's README lists the
  instruction-only adapters — loads neither Ponytail nor `cairn-code`, as
  it loaded none before; the record does not change what such a harness
  reads.
- The self-review of every step record has a shape a reader can scan, and
  the two Crumbz failure modes the note counted — the second copy, the
  export nobody imports — each have the line that names them, `delete:`.
  Nothing reads the lines by machine.
- The stance stays a skill and not a rule; the checker gains nothing from
  this record. The specification's chapter 5 and the conformance page are
  not changed by it.
- The kit's file count does not move: Ponytail is pointed at, not copied.
- Every reader of a diff, in every movement, reads for the same two
  things; the review movement of ADR-017 is scoped from decision 4 and
  adds no criterion.

## What the manifesto's test weighed

Every option kept is tagged *simplest*, *native* or *one sentence*, and
the one *adds a rule* offered here — the checker reading the self-review —
was refused. Decision 1 is the manifesto's *absorb the ecosystem* turned on
the file that states it: a skill that copies a maintained one is the
home-made piece the manifesto says to delete. Decision 5 keeps the simplest
option against the note's evidence that the cap bounds nothing; the owner
weighed a rule on size and chose none. Nothing enters the checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the kit's manifest and the bootloader it generates, the lock, the stance skill | `tools/cairn.mjs` (`planInstall`, the bootloader); `cairn.lock.json`; `skills/cairn-code/SKILL.md` |
| 2 | the unit skill, the stance skill's cap, the step template | `cairn-unit` step 3; `skills/cairn-code/SKILL.md`; `spec/reference/path-template.md` |
| 3 | the stance skill | `skills/cairn-code/SKILL.md` |
| 4 | the close skill | `cairn-close` step 3 |
| 5 | nothing | — |

The roadmap register names the coding paths of 1.1 that carry these: the
skills and the template in path 1, the kit's pinned dependency in path 4.
