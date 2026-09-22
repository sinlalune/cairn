---
type: Cairn Decision Record
title: ADR-039 — the release notes name what a release absorbed
description: A release has notes, one section per release in a `CHANGELOG.md` at the root of the protocol's repository, shipped with the package and linked from `status` and the pointer page; each section names the adopter repairs the release absorbed and the ones it did not, by the adopter's path ids, so a writer with an edited checker knows before `status` what `update --take` will drop. Promotes K31 of Cairn 1.2, from Q15.
tags: [cairn, adr, 1.2, release, changelog, adopter]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-039
  status: accepted
  date: 2026-09-21
---

# ADR-039 — the release notes name what a release absorbed

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S03

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q15, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 6, K31). The line
comes from [Crumbz's update note](../../feedbacks/2026-09-16-crumbz-update-to-1-1.md),
observation 1. Both stay exactly as they were.

## Context

Crumbz's checker carried three repairs made as control-plane paths of
its own — CP-CAIRN-SUPERSESSION-005, CP-CAIRN-PROVISIONAL-006,
CP-CAIRN-DETACHED-CHECKOUT-007. Before its update path could be opened,
the writer read the two checkers side by side, function by function, to
learn which of the three 1.1.0 had absorbed, and concluded that one was
missing. All three were absorbed. The sentence went into the path's
record, ran through three units and stood in the first draft of the
note. Nothing names, by the ids an adopter searches for, what a release
took in.

Cairn 1.1.0 was a tag and a package. It has no notes: no file in the
repository, no page on the site, no release on the host. The register's
1.1 row says what the release built, in this repository's names;
ADR-015 decision 2 asks the release for one line per template it
changed, and no release writes it — the first *pending* of ADR-031
decision 3.

## Decision

### Decision 1 — one section per release, naming the adopter repairs by their path ids

Promotes **K31**, from Q15, first option.

The protocol's repository carries `CHANGELOG.md` at its root, one
section per release, written by the release path before the tag. The
section names, first, the adopter repairs the release absorbed and the
ones it did not, by the adopter's path ids, so a writer whose checker is
edited knows before `status` and before reading code what `update
--take` will drop; then what the release changes for an adopter, in the
names the pointer page uses. The file ships with the package, and
`status` prints its link at the release's commit beside the line that
says a newer release exists; the pointer page links it too. The line
ADR-015 decision 2 owes per changed template has its place in the same
section; whether the 1.2 release writes it is that path's, and the
register row names the clause. The first section is 1.2.0's.

What this changes, by today's names: `CHANGELOG.md`, new; `package.json`,
whose `files` list ships it; the `status` branch of `main` and
`pointerPage` in `tools/cairn.mjs`; `tools/cairn.test.mjs`; the
`cairn-close` skill, one sentence for the release path;
`spec/reference/repository-layout.md`, one row.

## Alternatives rejected

- **No notes — the adopter takes the release's checker and reads the
  diff** (Q15, second option, *simplest*): refused by the owner; the
  reading was done with care and got it wrong.
- **A release on the host, with its notes**: outside the repository,
  unreadable to a session that reads files, and host-specific where a
  file is not; the host may render the file.
- **The register's row as the notes**: written in this repository's
  names, for this repository's reader; an adopter searches for its own
  path ids.
- **The 1.1 page, or the 1.2 page, naming the repairs**: an architecture
  page states what a release is, not what it absorbed from whom.

## Consequences

- An adopter's writer opens one file and finds its repairs by name.

## What the manifesto's test weighed

Q15's option is tagged *one paragraph per release*. A changelog is the
ecosystem's own convention — the host and the registry render it — and
nothing is built beside it: no tool writes it, no rule reads it.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the changelog; the package's file list; the status command and the pointer page; the close skill; the layout reference | `CHANGELOG.md`; `package.json`; `main` and `pointerPage` in `tools/cairn.mjs`; `tools/cairn.test.mjs`; `skills/cairn-close/SKILL.md`; `spec/reference/repository-layout.md` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path and the release path that carry it, from this
path's last unit.
