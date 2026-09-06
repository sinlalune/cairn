---
type: Cairn Decision Record
title: ADR-007 — a framework writes into the bootloader
description: When a tool of the environment writes an instruction block into the kit-owned entry file, the block moves to a file the kit does not own and the entry file points at it; the skills say so. Promotes R21.
tags: [cairn, adr, 1.1, bootloader, host-files]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-007
  status: accepted
  date: 2026-09-06
---

# ADR-007 — a framework writes into the bootloader

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S04

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q12) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R21). Both notes stay exactly as they were.

## Context

`AGENTS.md` is the repository's bootloader: it points, it carries no
project memory, and the kit owns it — its digest is in the lock, so
`status` reports it edited and `update` will not rewrite it once it has
been. Frameworks now write agent instructions into that file: on Crumbz,
`next dev` appended an "agent rules" block to `AGENTS.md` and told the
agent to commit it. Codex committed it in a closure commit, outside the
path's `writes:`, and the next step widened `writes:` to cover it. The
block is still on the Crumbz trunk, and the protocol said nothing about a
host file the environment mutates.

## Decision

Promotes **R21**, from Q12. The owner's choice: *"Move it out."*

A block a tool of the environment writes into the bootloader is moved, by
the writer who finds it, into a file the kit does not own — one the
framework names if it accepts one, else a file beside the bootloader kept
for such blocks — and the bootloader gains one pointing line to that file.
The bootloader itself keeps its kit digest. The block is never committed
inside `AGENTS.md`, and never silently dropped either: the framework
wrote it for a reason the owner may want kept.

The unit skill's resume step says it, since that is where a writer meets a
dirty bootloader: a change to `AGENTS.md` that the unit did not make is a
framework's block, and the remedy is the move, not the commit and not the
widening of `writes:`.

What this changes: the `cairn-unit` skill, step 0, one sentence; the
kit's bootloader text may name the pointer line so a moved block has a
home from installation.

## Alternatives rejected

- **Ignore it** (Q12, simplest): the block is never committed, which
  loses an instruction the framework insists on and leaves the working tree
  dirty on every run of the dev server.
- **Accept it in the entry file** (Q12, as today): the bootloader stops
  being kit-owned and stops pointing.

## Consequences

- The bootloader stays a pristine kit file, and `update` keeps rewriting
  it.
- An adopter running a framework that writes such blocks has one extra
  file, named once in the bootloader.
- No rule: a writer who commits the block inside `AGENTS.md` is already
  refused by `scope-drift` unless the path declared the bootloader in
  its `writes:`, which the skill now says not to do for this reason.

## What the manifesto's test weighed

The option kept is tagged *one sentence in a skill*. The simpler option
was offered and refused because it discards what a tool wrote on purpose.
No check is added.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| the move | the unit skill, the kit's bootloader text | `cairn-unit` step 0; `tools/cairn.mjs`, the bootloader it writes |
