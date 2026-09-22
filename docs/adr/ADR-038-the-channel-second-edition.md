---
type: Cairn Decision Record
title: ADR-038 — the channel, second edition
description: `feedbacks/` joins the corpus the checker reads, so `links` covers the channel; the kit installs the folder in every adopter and the unit skill says how a note reaches this repository; a treated note moves into `feedbacks/<release>/`, whose index names what answered it; a note whose claim was withdrawn says so at its head; and a note's frontmatter type is `Cairn Feedback`, read by no rule. Supersedes ADR-028 decision 2's clause that no tool reads or writes the folder. Promotes K22, K26, K27 and K28 of Cairn 1.2, from Q12, Q13, Q14 and the owner's instruction of 2026-09-21.
tags: [cairn, adr, 1.2, feedback, channel, checker, kit, skills]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-038
  status: accepted
  date: 2026-09-21
---

# ADR-038 — the channel, second edition

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S03

This record **supersedes** one clause of decision 2 of
[ADR-028](./ADR-028-a-feedback-file-when-nothing-broke.md) — *no tool
reads or writes the folder*: the `links` rule now reads it, and the kit
writes the folder and its index in every adopter. The rest of that
decision stands — no tool writes a note, no skill produces the file, no
rule requires it, a defect of the harness earns no file — and decision 1
stands whole. The decisions page placed one of the
sentences below in ADR-028; a record is not rewritten in place, so this
second edition carries it.

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q12, second option; Q13,
second option; Q14, first option; and the ruling recorded under *Already
decided on 21/09*) and the [asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md)
at blob `837262d5b3a761ef14d14bad0be8278133256e53` (theme 4, K22; theme
5, K26, K27 and K28). The lines come from
[the channel note](../../feedbacks/2026-09-21-the-channel-an-adopter-cannot-reach.md),
observations 8, 9 and 10, and [Atomik's adoption note](../../feedbacks/2026-09-21-atomik-adopts-1-1.md),
observation 3. All of them stay exactly as they were.

## Context

`markdownCorpus()` reads four roots — the documentation root, the
project root, the concept wiki's parent and `skills/` — and `feedbacks/`
is none of them, so the folder every decision of this repository is
promoted from is the one folder whose links and frontmatter no rule
reads. Atomik's adoption note, linking a record, a step one directory
up, a sibling and the index, merged on a green run that had read none of
those links. The four ECOS notes carry a frontmatter `type`, `Cairn
Feedback`, that no other note uses and no page defines; the other notes
of the folder carry `Cairn Learning Note`.

The unit skill's section 7, *Report the boundary*, installed verbatim in
every adopter, sends the writer to `feedbacks/`; the kit installs no
such folder, no adopter page names it, and a note written there reaches
nobody. Twice a note reached this repository because the owner asked a
second session to carry it by hand.

On 2026-09-21 the owner ruled that treated notes move into
`feedbacks/1.1/`, and eight moved that day. The first draft of Atomik's
adoption note had called a decision a regression; it was corrected
before it merged, twenty-four seconds after Atomik's cleanup path had
registered on the wrong claim, and nothing on the note says a claim in
it was withdrawn.

## Decisions

### Decision 1 — `feedbacks/` joins the corpus

Promotes **K22**, from Q12, second option.

`feedbacks/` joins the roots `markdownCorpus()` reads, so `links`
covers the channel like the other four. A broken relative link in an
old note blocks the gate until it is repaired. Q12's option named
`schema` too; that rule reads path records and decision records by
their folders and nothing else, so it has nothing to read there — what
it would have read, a note's type, decision 5 defines and leaves
unread.

What this changes: `markdownCorpus` in `tools/cairn-check.mjs`; the
corpus rows of `spec/reference/conformance.md` and the catalogue
`tools/cairn-rules.mjs` writes; one fixture in
`tools/cairn-fixture.test.mjs`, a broken link under `feedbacks/`
refused.

### Decision 2 — the kit installs the folder, and the skill names the route

Promotes **K26**, from Q13, second option.

The kit installs `feedbacks/` in every adopter, with an index that says
what the folder holds, as this repository's does. The unit skill's
sentence names how a note reaches this repository: a pull request
against it, or the owner carrying it — and in this repository, the file
is written here. An adopter's note about its own protocol use stays in
the adopter's folder; a note about Cairn is the one that travels.

What this changes: `planInstall` in `tools/cairn.mjs`, one folder and
its index; `cairn.lock.json`; `skills/cairn-unit/SKILL.md`, section 7's
sentence; the kit row of `spec/reference/conformance.md`, whose count
moves and is measured.

### Decision 3 — a treated note moves into `feedbacks/<release>/`

Promotes **K27**, the owner's instruction of 2026-09-21, carried out the
same day; this record writes the convention down.

A note stays at the folder's level while a release owes it an answer.
When a release has answered every ask a note makes — implemented and
released, or refused by the owner in writing — the release path moves
it into `feedbacks/<release>/`, whose index names what answered each
line: the records, the coding paths, the release. The note stays exactly
as it was below its frontmatter; its relative links move one level with
it, and the blob each promotion record pins still resolves. The frontmatter's `cairn.status: provisional` stays
as it is: the folder says *treated* by being looked at, and a second
field saying it would be the restatement ADR-031 decision 1 refuses.

What this changes: `feedbacks/index.md`, which already says it; the
`cairn-close` skill, one sentence for the release path;
`spec/reference/repository-layout.md`, one row, new.

### Decision 4 — a note whose claim was withdrawn says so at its head

Promotes **K28**, from Q14, first option.

A note whose claim changes gains one line at its head, above the first
heading — *Corrected on <date>: <what was withdrawn>, <what replaced
it>* — written by whoever corrects it, so a reader holding a copy can
tell. No rule reads the line.

What this changes: `feedbacks/index.md`, one sentence beside the
convention of decision 3.

### Decision 5 — a note's type is `Cairn Feedback`

The second half of **K22**: the type the four ECOS notes carry is the
folder's.

A note written under `feedbacks/` from 1.2 on carries `type: Cairn
Feedback`. The notes that carry `Cairn Learning Note` today keep it —
promotion leaves the notes exactly as they were — and no rule reads the
type.

What this changes: `feedbacks/index.md`, the index the kit installs
under decision 2, and the layout reference's new row, each naming the
type.

## Alternatives rejected

- **The conformance page saying `feedbacks/` is deliberately unchecked**
  (Q12, first option, *simplest*): refused by the owner. *Checked by
  hand* and *unchecked* would stay identical from a green run.
- **The skill saying *tell the owner*, the folder staying the protocol
  repository's** (Q13, first option, *simplest*): refused by the owner.
- **As today for the adopter's writer** (Q13, third option): an
  installed instruction naming a path that does not exist.
- **`cairn.status: settled` set by the promotion unit** (Atomik's first
  option for *treated*): a status kept by hand beside the folder that
  already says it.
- **A generated view over `docs/adr/**` printing what cites each note**
  (Atomik's third option): a tool over the folder, for a question a
  folder answers.
- **Nothing for a withdrawn claim — Git holds the history** (Q14,
  second option, *simplest, native*): refused by the owner; nobody
  holding a copy reads Git.
- **A rule reading the correction line or the type**: a check on prose;
  the manifesto's first threat.

## Consequences

- The channel's links are read like everything else's; the first run after the coding path lands may block on an old note's
  link.
- ADR-028 decision 2 carries a superseded-clause mark, and the 1.1 page's
  feedback-file row is marked *superseded by* this record where it says
  *no tool*.

## What the manifesto's test weighed

Q12's option is tagged *adds coverage* and Q13's *adds a folder*: one
more root for a rule that exists, and one folder with one index, in
place of a channel checked by hand and an instruction that named nothing.
Q14 is a sentence and the treated convention is a folder, both read by
nobody but a reader.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the corpus reading, its rows, one fixture | `markdownCorpus` in `tools/cairn-check.mjs`; `spec/reference/conformance.md`; `tools/cairn-rules.mjs`; `tools/cairn-fixture.test.mjs` |
| 2 | the kit's manifest and lock; the unit skill; the kit row | `planInstall` in `tools/cairn.mjs`; `cairn.lock.json`; `skills/cairn-unit/SKILL.md`, *Report the boundary*; `spec/reference/conformance.md` |
| 3 | the feedbacks index; the close skill; the layout reference | `feedbacks/index.md`; `skills/cairn-close/SKILL.md`; `spec/reference/repository-layout.md` |
| 4 | the feedbacks index | `feedbacks/index.md` |
| 5 | the feedbacks index, the installed index, the layout reference | `feedbacks/index.md`; `planInstall` in `tools/cairn.mjs`; `spec/reference/repository-layout.md` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding paths that carry it, from this path's last unit.
