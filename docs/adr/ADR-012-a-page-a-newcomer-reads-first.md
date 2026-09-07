---
type: Cairn Decision Record
title: ADR-012 — a page a newcomer reads first
description: Promotion produces, beside its architecture page and decision records, one readable page per product surface at the documentation root, with the concept notes as its glossary; a promotion unit that changes what a surface does writes or updates that page in the same unit. Promotes R32.
tags: [cairn, adr, 1.1, promotion, documentation, readable-page]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-012
  status: accepted
  date: 2026-09-06
---

# ADR-012 — a page a newcomer reads first

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S05

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q16) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R32). Both notes stay exactly as they were.

## Context

Chapter 3 names two outputs of promotion: an architecture page and the
decision records for the choices it makes. On Crumbz three promotion paths
wrote both, and no page says what Crumbz is or where to start; a newcomer
opens the architecture and reads boundaries before knowing what the
product does. The owner's choice, Q16: *"One page per product surface
(board, match lab, settled…)."*

## Decision

Promotes **R32**, from Q16.

Promotion has a third output. For every surface of the product a user
meets — a screen, a command, an API, a document set — there is one page a
newcomer can read first, at the documentation root as `docs/<surface>.md`,
listed in the documentation index. The page says what the surface does and
how to use it, in plain words, and links the concept notes of ADR-011 as
its glossary instead of redefining them. It links the architecture page
that governs the surface and nothing more technical than that.

A promotion unit that changes what a surface does writes or updates that
surface's page in the same unit, as it writes the architecture page; a
promotion unit that changes no surface leaves the pages alone and says so.
The unit's step names the page it touched. Chapter 3's list of what a
promotion unit does gains the bullet; the `decision` unit type's row,
*every document it amends*, already covers it.

For the protocol's own repository the surfaces are the ones the README's
quick starts already name — adopting the protocol, opening and running a
path, closing one — and the README with the site that projects it are
their pages; this path writes neither, and the paths that build 1.1
update them as ADR-001 to ADR-014 change what those surfaces do.

What this changes, by today's names: `spec/index.md` chapter 3, the
promotion list; `docs/index.md` as the kit writes it, which names the
pages' place; the layout reference's tree. No rule: whether a page is
readable is not a predicate.

## Alternatives rejected

- **One product page** (Q16 first option): a single page for a product
  with several surfaces becomes a table of contents or a wall; the owner
  chose one per surface.
- **No page** (Q16 third option, as today): three promotions on Crumbz,
  and no entry point.
- **`docs/README.md` the promotion path must touch** (R32's second
  variant): a page promotion must touch is touched for the rule's sake;
  a page per surface is touched because the surface changed.

## Consequences

- A newcomer reads a surface's page, then its glossary, then, if they dig,
  its architecture; the manifesto's *beginner friendly on the surface* has
  a file.
- Promotion units grow by one page when a surface changes, and by nothing
  otherwise.
- The documentation root gains one file per surface, beside the four
  folders it holds.

## What the manifesto's test weighed

The option kept is tagged *more pages*. What it adds is prose a reader
wants, not a rule a checker runs; the manifesto's *engagement* section
asks for exactly this layer. The option offered as lighter, one product
page, was refused by the owner.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| the third output | chapter 3, the documentation index the kit writes, the layout | `spec/index.md` §3; `tools/cairn.mjs`; `spec/reference/repository-layout.md` |
