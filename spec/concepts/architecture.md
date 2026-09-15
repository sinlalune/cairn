---
type: Cairn Concept
title: Architecture
description: Durable statements about a system's boundaries, responsibilities, constraints, and major flows.
tags: [cairn, concept, knowledge, architecture]
timestamp: 2026-08-26T00:00:00Z
---

# Architecture

Architecture describes the stable shape of a system: its components,
responsibilities, boundaries, trust assumptions, and important flows.

In Cairn, accepted architecture lives under `docs/architecture/`. A
[coding path](./coding-path.md) reads the pages governing its surfaces and
updates them when implemented reality changes. A new or changed choice that
affects the architecture receives a [decision record](./decision-record.md).

## What a page carries

A page is about one kind of thing — a feature, an interface, a contract, or a
flow — and carries:

- what it names: the components in play, and what each is responsible for;
- **which way dependencies point between them, in one sentence** a reader can
  check against an import line. The direction is usually right and usually
  unwritten, and an unwritten direction is one nobody chose;
- **one Mermaid diagram** of those components and that direction. The sentence
  and the diagram say the same thing, and a reader checks whichever of the two
  they can read — so where they disagree, the page is wrong, not the reader;
- the constraints and trust assumptions the shape rests on.

## A flow page

A **flow** is how one thing moves end to end through the components the other
pages name: what starts it, the components it crosses in order, and what it
leaves behind. There is one page per flow that crosses components, under
`docs/architecture/` with the rest and in no folder of its own, and it carries
its diagram like any other page. A flow that stays inside one folder is that
folder's [module note](./module-note.md)'s business and gets no page.

Architecture is a maintained claim, not proof that implementation follows it.

Related: [decision record](./decision-record.md),
[module note](./module-note.md), [coherence audit](./coherence-audit.md).
