---
type: Cairn Folder Index
title: Feedbacks
description: The owner's pages to the protocol, the adopter audits and post-mortems, and the agents' feedback files — the notes a release has not yet answered at this level, the treated ones one folder down.
tags: [index, cairn, feedback]
timestamp: 2026-09-27T00:00:00Z
---

# Feedbacks

Three kinds of note: what adopters hit in the field, read from their
repositories; the owner's pages to the protocol; and, since ADR-028, the
agents' files — what a writer met when the gate stayed green and the
protocol still cost more than it should, each observation with its cost and
the change to Cairn that would remove it. A note here is evidence for a
protocol change, never authority for one: it stays provisional until a
specification or tooling path promotes what it argues.

A note stays at this level while a release owes it an answer. When a release
has answered every ask it makes, it moves into `feedbacks/<release>/`, whose
index names what answered each — the owner's ruling of 2026-09-21. The notes
below are the ones a release after 1.2 owes.

A note whose claim is withdrawn or corrected gains one line at its head,
above the first heading — *Corrected on <date>: <what was withdrawn>, <what
replaced it>* — written by whoever corrects it, so a reader holding a copy can
tell (ADR-038, decision 4).

- [Treated by 1.1](./1.1/index.md) — the eight notes of 2026-09-03 to 2026-09-08: the two Crumbz post-mortems, the closure note, the sixteen-path audit, the owner's two feedback pages, the 1.1 decisions and the 1.1 rulings.
- [Treated by 1.2](./1.2/index.md) — the thirteen notes of 2026-09-15 to 2026-09-26: CP-CAIRN-009's writer, Crumbz's update, ECOS's four, Atomik's five, the 1.2 decisions and the asks.
- [ECOS — a step record added by a merge commit has no findable origin](./2026-09-22-ecos-a-record-added-by-a-merge-cannot-be-read.md) — the writer of ECOS's CP-LOOK-002, under ADR-028 where the gate blocked a sound unit: `stepRecordOrigin` reads `git log --diff-filter=A --follow`, which reports nothing a merge commit added, so a step record born in a merge has no origin and `record-integrity` answers `inconclusive` on every later unit, unrepairable under `pathHistoryPolicy: forbidden` — and the unit skill's one-commit rule is what leads a writer there. Read the origin with `-m`, or say in movement 6 that a merge is committed on its own; and name the likely cause in the message.
- [ECOS — a step record over 1 MiB reads as rewritten](./2026-09-22-ecos-a-record-larger-than-a-megabyte-reads-as-rewritten.md) — the adding blob is read through `execFileSync`'s default 1 MiB buffer, so for a larger file `gitOrNull` answers `null` and an untouched record is reported as rewritten, with two remedies that cannot apply to a JPEG and a re-add that keeps the oldest origin; met on the owner's 1.4 MB drawing, hidden meanwhile behind the `inconclusive` verdict. Compare bytes with room, or compare blob ids, or give attachments a home the rule does not police.
- [ECOS — a remedy that lives in a feedback file does not bind the next writer](./2026-09-22-ecos-the-remedy-is-not-in-the-skill.md) — the merge-before-`A` failure of the 2026-09-17 note, paid again by CP-R3-001 after CP-R4-001 had avoided it, because nothing in movement 0's reading order reaches `feedbacks/`; fold an accepted remedy into the skill it corrects, or at least name the folder in the reading order.
