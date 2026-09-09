---
type: Cairn Decision Record
title: ADR-021 — what a session writes for its reader
description: One line in the bootloader says an explanation is written for the reader who is learning it; the request's description and the path record's goal open with three plain lines before the ledger; a question to the owner is put in the chat and well signalled as what it is, in the owner's words. Promotes P1, P5 and P6 of the pedagogy feedback; no rule, no file.
tags: [cairn, adr, 1.1, pedagogy, bootloader, request, skills]
timestamp: 2026-09-09T00:00:00Z
adr:
  id: ADR-021
  status: accepted
  date: 2026-09-09
---

# ADR-021 — what a session writes for its reader

Status: accepted · 2026-09-09 · written by CP-CAIRN-004, S01

**Promoted from** the owner's
[pedagogy feedback](../../feedbacks/2026-09-08-owner-feedback-pedagogy.md)
at blob `e9bd3e92aa7c6336f92e715140f744aeb8385d02` (P1, P5, P6, and the
readings *Chat sessions*, *Pull requests* and *the senior developer*) and
the owner's [statement on the pedagogy](../../docs/cairn/manifesto-pedagogy-2026-09-09.md)
at blob `57d2e87a3caafab19ba36fa794d7ab342e2a87e1`, its sections *Two
readers*, *The surface*, *The chat* and *The request*. Both stay exactly
as they were. It supersedes no record of 1.1: the concept-note line of
[ADR-011](./ADR-011-the-adopters-documentation-plane.md), decision 3,
gains a neighbour; the item-by-item answer of
[ADR-018](./ADR-018-two-sentences-of-the-cycle.md), decision 2, gains a
paragraph above it; the owner's plan review and try before the merge of
[ADR-001](./ADR-001-sole-owner-opens-and-closes-a-path.md), decisions 2
and 3, gain a shape.

## Context

The manifesto asks that every written or generated line be effortlessly
comprehensible, and the statement of 2026-09-09 says for whom: the junior
who needs a frame and the senior who wants just enough — the right
information at the right moment. On 2026-09-09 nothing a session reads
says how it speaks. The bootloader has five absolute rules, all about
paths, and ADR-011 adds a sixth, on concept notes, when coding path 4
lands it; `cairn-code` is a stance for the change movement and governs
code, not explanation; the request's description is a ledger the owner
reads as the checker's twin — candidate, base, digest, coherence
checkboxes, advisories, roles, and since ADR-018 a line per item of the
definition of done — and none of it says in plain words what the path
did. On Crumbz the owner's read of a
request was once twenty seconds and a merge once came twenty-nine seconds
after the request opened. The three moments the statement names for the
senior — being asked to test, being prompted for a decision, being
presented an incident — are named steps of 1.1 (ADR-001 decisions 2 and
3, ADR-003, ADR-014) with no shape; the two decisions pages of 06/09 and
07/09 put thirty-four questions to the owner in one shape and got
thirty-four answers.

The owner answered P1, P5 and P6 on 2026-09-09, P6 in their own words.

## Decisions

### Decision 1 — one line in the bootloader: an explanation is written for the reader who is learning it

Promotes **P1**, *One line in the bootloader* — one sentence.

The bootloader the kit writes gains one absolute rule beside the line
ADR-011, decision 3, adds — *an abstraction explained persists as a
concept note*: an explanation is written for the reader who is learning
it — the plain meaning first, the failure it prevents, the shortest
example — and stops there. The rule reaches every session, with or without a path, because
the bootloader is the one file every session reads; it applies above all
to the abstractions of the trade the statement names — Git, architecture
design, system design, databases — and it is the order the concept
template already gives a note, applied to the chat that precedes the
note. Nothing checks it: a tone is not a predicate.

What this changes: `AGENTS.md` as `tools/cairn.mjs` writes it, the
absolute rules, one line; this repository's own `AGENTS.md`, the same
line.

### Decision 2 — the request and the record's goal open with three plain lines

Promotes **P5**, *Three plain lines first, then the ledger* — one
sentence in a template.

The request's description opens with three plain lines before anything
else: what the path did, why it is the least, what it does not do — the
three lines `cairn-code` already asks of every change — followed by a link
to the page a newcomer reads first for the surface the path changed
(ADR-012), or, in this repository, the section of the README. Then the
definition of done item by item (ADR-018, decision 2), then the ledger
`cairn-audit` prints, unchanged. The three lines are read by the owner;
the checker reads no line of the description. The path record opens the same way: its goal section is written so that its
first three lines are those three, because the goal is what the owner
reads at the plan review (ADR-001, decision 2).

What this changes: `.github/pull_request_template.md` as the kit installs
it, three placeholder lines and a link above `## Candidate`;
`tools/cairn-audit.mjs`, which prints the placeholders; the `cairn-close`
skill, step 2, one sentence; `spec/reference/path-template.md`, the goal
section of `index.md`, one sentence; the `cairn-open` skill, step 1, one
sentence.

### Decision 3 — a question to the owner is put in the chat, well signalled as what it is

Promotes **P6**, in the owner's words: *"Need to be in chat prompting,
but well signaled as what it is."* The owner wrote this line under the
two options offered; it wins.

Wherever an agent stops for the owner — the plan review before
registration (ADR-001, decision 2), the try before the merge (ADR-001,
decision 3), a red run's post-mortem (ADR-014), an accepted race between
two paths (ADR-003), and any decision a unit cannot make alone — the
question is put in the chat, not in a file the owner must open, and it is
signalled as a decision for the owner before anything else: one opening
line that says a decision is needed and names the path, then what
happened, then two or three ways to go on, each tagged by what it costs
as the decisions pages tag them, and the agent does nothing further on
that path until the owner answers. The two decisions pages of 06/09 and
07/09 are the worked example of the content. Where a record must hold the
answer — the acceptance block, an amendment, a step — the agent writes
the owner's words into it after the answer, as the opening acceptance of
every path since CP-CAIRN-002 has done.

What this changes: the `cairn-open` skill, step 2, one sentence; the
`cairn-close` skill, step 3, one sentence; the `cairn-unit` skill, one
sentence on a decision a unit cannot make; the output of the post-mortem
tool ADR-014 names, `tools/cairn-postmortem.mjs`, which prints the facts
the question is built from and does not put the question itself.

## Alternatives rejected

- **P1, a stance for explanation** (adds a file): a skill in the shape of
  `cairn-code`, read when a session explains. Refused by the owner; a
  skill is read when a procedure runs, and the owner wants the tone in
  every session, which is the bootloader's reach — the reason ADR-011
  gave for its own line.
- **P1, the manifesto only** (simplest, as today): one sentence no session
  reads.
- **P5, the ledger only** (simplest, as today): the item-by-item line of
  ADR-018 as the plain reading; refused because a line per item is still
  a ledger, and the twenty-second read and the twenty-nine-second merge on
  Crumbz were reads of one.
- **P6, the decisions-page shape wherever an agent stops** (one sentence,
  three times), as offered: the owner's line keeps its content and moves
  it to the chat.
- **P6, free prose** (simplest, as today).

## Consequences

- With ADR-011's line and this one the bootloader goes from five absolute
  rules to seven, two of them about something other than paths, and stays
  a pointer: one line each.
- Every request the owner merges opens with what a reader who did not
  watch the path needs, and the ledger the checker's twin reads is
  unchanged beneath it. A merge in twenty seconds becomes a merge after
  three lines.
- The senior's three moments have one shape and one place, the chat, and
  the junior reads the same three lines and the same options.
- The request template and the audit tool are kit files edited, not
  added: the file budget of ADR-013 does not move.

## What the manifesto's test weighed

The three options kept are tagged *one sentence*, or are the owner's own
line; the one *adds a file* offered here, a stance skill, was refused,
and no option that adds a rule was offered. Decision 2 adds prose a
reader wants, not a check a tool runs, as ADR-012 did. Nothing enters the
checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the bootloader the kit writes, and this repository's | `tools/cairn.mjs` (the bootloader text); `AGENTS.md` |
| 2 | the request template and the tool that prints it, the close and open skills, the goal section of the path template | `.github/pull_request_template.md`; `tools/cairn-audit.mjs`; `cairn-close` step 2; `cairn-open` step 1; `spec/reference/path-template.md` |
| 3 | the open, close and unit skills; the post-mortem tool's output | `cairn-open` step 2; `cairn-close` step 3; `cairn-unit`; `tools/cairn-postmortem.mjs` as ADR-014 names it |

The roadmap register names the coding paths of 1.1 that carry these: the
skills, the request template and the path template in path 1; the
bootloader text and this repository's `AGENTS.md` in path 4; the audit
and post-mortem tools in path 3.
