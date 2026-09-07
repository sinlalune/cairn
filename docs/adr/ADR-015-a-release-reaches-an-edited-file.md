---
type: Cairn Decision Record
title: ADR-015 — a release reaches an edited file
description: How a new release reaches a repository that installed an earlier one — a pristine file is rewritten whether the kit or the host owns it, an edited file is never rewritten but the update prints what the release changes in it and the pointer page lists it, and the owner can take the release's version of a named file. Raised by the review of CP-CAIRN-002's candidate; it makes ADR-004, ADR-005, ADR-011, ADR-013 and ADR-014 reach the first adopter.
tags: [cairn, adr, 1.1, kit, update, migration]
timestamp: 2026-09-07T00:00:00Z
adr:
  id: ADR-015
  status: accepted
  date: 2026-09-07
---

# ADR-015 — a release reaches an edited file

Status: accepted · 2026-09-07 · written by CP-CAIRN-002, S07

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q9, Q13 and Q19, which the
first adopter is to receive) and the
[rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at blob
`313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R17's sentence *so the
adopter's checker becomes a version bump*). It promotes no ruling of its
own: it was raised by the review of this path's first candidate, which
found that six records could not reach the adopter they were written for.
Both notes stay exactly as they were.

## Context

The `cairn` command's `update` rewrites a kit file that is pristine — it
holds exactly what the kit wrote, by the lock's digest — and keeps an
edited one, naming it. Host files are the adopter's from day one: the
configuration, the bootloader, `package.json`, the binding, the indexes,
the workflow and the request template are written when missing and
*reviewed* when their template changed — named, never rewritten — whether
the adopter edited them or not.

Under that policy a repository that installed 1.0 and runs `update` to
1.1 receives none of: the workflow's trigger (ADR-005), its post-mortem
step and package script (ADR-014), the bootloader's two lines (ADR-011
decision 3, ADR-013). And the first adopter's checker, edited three times to
repair it, stays edited, so the three repairs coming upstream (ADR-004
decision 6) would not reach the one repository that made them. The
review of this path's candidate found it; the records above were written
as if `update` delivered them.

## Decisions

### Decision 1 — a pristine file is rewritten, whoever owns it

A host file that still holds exactly what the kit wrote is rewritten by
`update` when its template changes, like a kit file. Pristine means
nothing of the adopter's is in it, so the review protected nothing. The
lock already tells pristine from edited, for every file it names.

### Decision 2 — an edited file is never rewritten, and the release says what it changes

An edited file, kit or host, is kept. For each one whose template the
release changed, `update` prints the difference between the release's
template and the file, and ends its report with the list of files the
owner has to reconcile by hand. The pointer page of ADR-013, rewritten at
every update, carries the same list under its own heading until the next
update finds it empty, so the work is visible on disk and not only in one
terminal's scrollback. A release that changes a template says in one line
what it changes in it, and `update` prints that line beside the diff;
where the line is missing, the diff alone is printed.

### Decision 3 — the owner can take the release's version of a named file

`update` accepts the name of an edited file and replaces it with the
release's version, making it pristine at the new release. The command
says what it is about to discard and does nothing without the name. This
is how an adopter's edited checker becomes a version bump once its
repairs are upstream: the owner takes the release's checker and loses
nothing the release does not carry.

What this changes, by today's names: `tools/cairn.mjs`, the
`installationStatus` reading and the `update` command, with their tests;
the layout reference's rows for the lock and the command; the pointer page
of ADR-013, one generated section; the release's package, one line per
changed template.

## Alternatives rejected

- **Keeping the review for pristine host files**: it never rewrote
  anything the adopter wrote, and it withheld every change a release makes
  to the workflow or the bootloader.
- **Merging an edited file three ways**: a merge of a workflow file or a
  bootloader by a tool is the kind of non-native mechanism the manifesto
  says is probably not a best practice; a diff and a named file are what
  Git already gives.
- **A migration script per release**: a second mechanism beside `update`,
  with its own failure modes; `update` already knows every file and its
  state.
- **Rewriting edited files with a warning**: it would have overwritten the
  first adopter's three repairs before they were upstream.

## Consequences

- A 1.0 adopter running `update` to 1.1 receives every change of ADR-001
  to ADR-014 that lands in a file it did not edit, and a printed list with
  diffs for every file it did.
- The first adopter's workflow, bootloader and checker are all edited;
  the owner reconciles three files by hand or takes the release's version
  of each, and the pointer page says which until it is done.
- `update` grows one argument and one printed section; `status` keeps
  reporting `edited` files as it does.

## What the manifesto's test weighed

Decision 1 removes a rule that protected nothing. Decision 2 adds a
printed diff, which is Git's own output. Decision 3 adds one argument to
one command. Nothing is added that a reader of `git diff` would not
recognise.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the installation status | `tools/cairn.mjs`, `installationStatus`; `tools/cairn.test.mjs` |
| 2 | the update report, the pointer page, the release's package | `tools/cairn.mjs`, `update`; `cairn/README.md` as written; `package.json` of the release |
| 3 | the update command | `tools/cairn.mjs`, `update`; `tools/cairn.test.mjs` |
