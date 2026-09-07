---
type: Cairn Decision Record
title: ADR-013 — a local pointer to the protocol
description: The kit installs one folder, cairn/, with one page that names the installed release, links the six chapters of the specification and the five skills at that release, and lists the files the kit owns; the bootloader points at it. Promotes R33.
tags: [cairn, adr, 1.1, kit, pointer, release]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-013
  status: accepted
  date: 2026-09-06
---

# ADR-013 — a local pointer to the protocol

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S05

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q17) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R33). Both notes stay exactly as they were.

## Context

The kit installs twenty-six files: the bootloader, the configuration, the
tools, the skills, the indexes, the workflow and the request template. The
specification itself is not installed; the skills link it on the forge at
the release's commit. So in an adopter's repository everything about Cairn
is a link to GitHub, and nothing on disk says what the protocol is, which
release is installed, or which of the repository's files belong to the kit
and will be rewritten by `update`. The lock knows the last two and is
written for the tool, not the reader. The owner's choice, Q17: *"Yes. One
file against the kit's thirty-file budget."*

## Decision

Promotes **R33**, from Q17.

The kit installs `cairn/README.md`, one page, in a folder of its own so
the pointer is found by name at the root. The page says, in this order:

1. what Cairn is, in the manifesto's first sentence, and the installed
   release with the commit it was cut from — the lock's two facts, written
   for a reader;
2. the six chapters of the specification, each one link to the release's
   commit on the forge, one line each on what the chapter is for;
3. the five skills, each one link to its file in this repository, one
   line each on when it runs;
4. the files the kit owns, from the lock's manifest, with the sentence
   that `update` rewrites a pristine one and leaves an edited one alone,
   and that `status` says which is which.

The bootloader's *start here* list points at the page. `update` rewrites
it with the rest of the kit, so the release it names is the release
installed. Nothing on the page is written by hand.

What this changes, by today's names: `tools/cairn.mjs`, `init` and
`update`, one generated file; the lock's manifest, one entry; the
bootloader text, one line; the layout reference's tree.

## Alternatives rejected

- **The links are enough** (Q17, as today): nothing on disk names the
  release or the kit's files for a reader.
- **Installing the specification**: sixty files against a thirty-file
  budget, and a copy that drifts from the release.
- **Pointing at the site instead of the forge**: the site is a projection
  of the trunk, not of a release; the forge holds every release's commit.

## Consequences

- One more kit file. The kit holds twenty-six; ADR-011 adds three and this
  record one, which is thirty, and the conformance page's target is
  *under* thirty, so thirty is over it. The rule this record sets: the kit
  of 1.1 ships with at most twenty-nine files, the post-mortem tool of
  ADR-014 included, so the coding path that owns the kit removes two
  files. The candidates it weighs first: `tools/cairn-config.schema.json`,
  an editor aid the loader does not need since it validates the
  configuration itself, and `project/index.md`, a one-paragraph index the
  bootloader and the binding already cover. The path measures, removes,
  and records the count on the conformance page as 1.0 did.
- An adopter's reader, human or agent, has one page to open before any
  link leaves the repository.
- The lock stays the tool's record; the page is its reading.

## What the manifesto's test weighed

One generated file, tagged so on the decisions page, against a budget the
conformance page states. The record counts it, finds the target crossed,
and pays with two removals rather than by moving the target: a cap that
binds is the one worth keeping. The manifesto's *engagement* asks for this
page more than its *leanest tree* argues against one file.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| the page | the kit's installer and updater, the lock, the bootloader, the layout | `tools/cairn.mjs`; `cairn.lock.json` manifest; `AGENTS.md` as written; `spec/reference/repository-layout.md` |
