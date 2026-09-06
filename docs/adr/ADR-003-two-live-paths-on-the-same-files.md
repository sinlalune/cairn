---
type: Cairn Decision Record
title: ADR-003 — two live paths on the same files
description: Two live paths whose declared write surfaces intersect are reported by the checker at registration and at every unit; the later path either declares it waits for the earlier one or records that the owner accepted the race. Promotes R12.
tags: [cairn, adr, 1.1, writes, overlap, depends-on]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-003
  status: accepted
  date: 2026-09-06
---

# ADR-003 — two live paths on the same files

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S03

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q8) and the
[rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at blob
`313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R12). Both notes stay exactly
as they were.

## Context

Every path declares `writes:`, the files it expects to change, and
`depends_on:`, the paths it waits for. The checker reads `writes:` to
refuse a change outside it and `depends_on:` to show which paths are
unblocked. It never compares two paths' surfaces.

On Crumbz, CP-015 registered at 13:08 and pushed four units by 13:28.
CP-016 was drafted at 13:41 with `depends_on: [CP-ODDS-SCOPE-015]`,
registered at 13:59 with `depends_on: []` and a `writes:` covering every
file 015 declares, took 015's selector from its branch, and closed at 17:09.
015 is stranded: its tip fails trunk containment, the trunk delta since its
base touches eleven files in its surfaces, and 016's request assigns the
six-file conflict to 015. The overlap was declared in prose under a
coherence question, where no rule reads.

## Decision

Promotes **R12**, from Q8.

Two live paths whose `writes:` patterns intersect is a finding. The
checker raises the advisory `writes-overlap`, naming both paths and the
patterns that meet, at the registration of the later path and at every unit
of either while both are live (`running`, `blocked` or `ready`). It is an
advisory, not a block: whether two paths may race on a file is the owner's
call, and the record is where the call is written.

The later path answers in one of two ways, and the open skill says so:

- it declares `depends_on:` naming the earlier path, and the advisory is
  silent, because the live view then shows it blocked until the earlier
  path is done;
- or the owner accepts the race, the path's opening acceptance prose says
  so in one sentence, and the advisory stays visible on every run until one
  of the two paths closes, to be disposed of as *accepted* in the closing
  review like any other advisory.

Dropping a declared `depends_on:` while the earlier path is still live is
the overlap reappearing, and the advisory says so.

What this changes, by today's names: one advisory rule added to
`tools/cairn-check.mjs` and to the catalogue `cairn-rules` writes into
`spec/reference/conformance.md`; the `cairn-open` skill, step 1, where
`writes:` and `depends_on:` are chosen; two fixtures, one for the overlap
raised and one for the overlap silenced by `depends_on:`.

## Alternatives rejected

- **Warn only** (Q8 second option): a report nobody must answer is a report
  nobody reads; the owner chose to require the choice.
- **Nothing** (Q8 third option, the manifesto's simplest): the overlap was
  in CP-016's record and the record was read, yet the owner was told 015
  was unstarted; the owner chose to be told by the tool.
- **Blocking the later registration**: the race is sometimes right, for
  instance a hot fix on a file a long path holds; a block would make the
  owner edit a declaration to say what one sentence can say.

## Consequences

- Registration of a path whose surface meets a live path's prints the
  overlap before any unit is written; the writer reads it in the same run
  that checks the registration commit.
- The live view's *unblocked* reading gains meaning: a path that waits is
  visibly waiting rather than silently racing.
- One advisory more in the catalogue, one sentence more in the open skill.

## What the manifesto's test weighed

Q8 keeps an option tagged *adds a rule*. It is an advisory over two fields
the record already carries, with no new file and no new step; the answer it
asks for is a field the record already has or one sentence the owner
writes. The simplest option was offered and the owner refused it on the
Crumbz evidence.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| the advisory | the checker and its catalogue, two fixtures | `tools/cairn-check.mjs`; `cairn-rules` → `spec/reference/conformance.md`; `tools/cairn-fixture.test.mjs` |
| the answer | the open skill | `cairn-open` step 1 |
