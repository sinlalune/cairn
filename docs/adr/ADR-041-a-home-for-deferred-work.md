---
type: Cairn Decision Record
title: ADR-041 — a home for deferred work
description: `project/backlog/` is a folder of the project plane, one file per deferred item — what it is, which path deferred it, the owner, the shape of the work — so a `deferred` disposition names a file instead of a sentence, the open skill reads the folder when a path is proposed, and an advisory that keeps firing has a stated destination; the kit installs the folder with its index. Not an issue tracker, not the register. Promotes K33 of Cairn 1.2, from Q18.
tags: [cairn, adr, 1.2, backlog, project-plane, cairn-open, cairn-close, kit]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-041
  status: accepted
  date: 2026-09-21
---

# ADR-041 — a home for deferred work

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S04

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q18, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 7, K33). The line
comes from [ECOS's second note](../../feedbacks/2026-09-18-ecos-a-deferral-has-nowhere-to-land.md).
All three stay exactly as they were.

## Context

The close skill's step 2 disposes of every advisory at the candidate as
fixed, accepted, or *deferred to a named owner and follow-up*; the unit
skill's movement 4 disposes of a review finding as fixed, refused, or
*deferred to a named unit or path*. Neither gives the follow-up a home.
The documentation plane holds durable knowledge, the journal holds what
already happened, and a path folder is one path's own record, out of
attention once the path closes. ECOS's first path closed with three real
deferrals — a decision unit, a promotion, a bug — each written three
times, in a step record, in the request's description and in a note, and
none of them anywhere a writer opening the repository tomorrow would
look. ECOS built `project/backlog/` for itself, in its CP-BACKLOG-001.

## Decision

### Decision 1 — `project/backlog/`, one file per deferred item

Promotes **K33**, from Q18, first option.

The project plane — the binding's execution-state plane — gains a
folder beside the coding paths, the journal and the brainstorm notes: `project/backlog/`, with an index the
kit installs. One file per deferred item, named as the journal's entries
are, the date first. The file says what the item is, which path deferred
it and where — the unit or the candidate — who owns it, and the shape of
the work it wants: a decision unit, a promotion, a coding path. A
`deferred` disposition, in a step's review section or in the closing
review, names the file. When a path is proposed, `cairn-open` reads the
folder, so an item is taken by a path that names it in its goal and
declares the file in `writes:`; that path's last unit deletes the file.
An advisory that fires at every run on the same fact — `decision-drift`
on a page whose record belongs to no path yet — is deferred to a file
there, and the disposition points at it instead of re-accepting the
advisory at every closing.

No rule reads the folder.

What this changes, by today's names: `planInstall` in `tools/cairn.mjs`,
one folder and its index; `cairn.lock.json`; `skills/cairn-close/SKILL.md`, step 2's
disposition sentence; `skills/cairn-unit/SKILL.md`, movement 4's
disposition sentence; `skills/cairn-open/SKILL.md`, step 1; the
advisories placeholder of `tools/cairn-audit.mjs`; `spec/index.md`
where it names the project plane's folders, chapters 1 and 4, and the
project-plane rows of `spec/reference/repository-layout.md`; the kit row of
`spec/reference/conformance.md`, whose count moves and is measured.

## Alternatives rejected

- **The register** (Q18, second option, *native to the protocol*): a
  deferred item is not a milestone; the register's rows are the owner's
  plan, and a bug an advisory found is not a row of it.
- **Nothing — the request's description is the record** (Q18, third
  option, *simplest*): refused by the owner; the description is read
  once, during the merge.
- **An issue on the host**: the one piece of execution state that would
  not persist in a file of the repository, and unreadable to a session
  that reads files.
- **A section of the path record that deferred it**: the path closes and
  the section leaves attention with it; ECOS's three items are there
  and were found by nobody.

## Consequences

- ECOS's three items, and every deferral since, have a folder a writer
  opens tomorrow.

## What the manifesto's test weighed

Q18's option is tagged *one folder, one file per item, no rule*: a
folder and a naming convention, read by the open skill and by nobody
else.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the kit's manifest and lock; the close, unit and open skills; the audit tool's scaffold; the chapters naming the plane's folders and the layout reference; the kit row | `planInstall` in `tools/cairn.mjs`; `cairn.lock.json`; `skills/cairn-close/SKILL.md`; `skills/cairn-unit/SKILL.md`; `skills/cairn-open/SKILL.md`; `tools/cairn-audit.mjs`; `spec/index.md` §1 and §4; `spec/reference/repository-layout.md`; `spec/reference/conformance.md` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding paths that carry it, from this path's last unit.
