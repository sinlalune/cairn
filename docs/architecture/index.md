---
type: Cairn Folder Index
title: Architecture
description: Accepted architecture: what a system is as a whole, its boundaries, responsibilities, constraints and major flows, each page naming the decision records it relies on.
tags: [index, cairn, architecture]
timestamp: 2026-09-15T00:00:00Z
---

# Architecture

One page per system as a whole, numbered in the order it was accepted. A
page states boundaries, responsibilities, constraints and major flows, names
every [decision record](../adr/index.md) it relies on where it relies on it,
and links back to the notes it was promoted from. A page whose meaning
changes is amended by a path that also adds or supersedes a decision record;
the checker's `decision-drift` advisory reports a change here without one.

A page that names components states **in one sentence** which way dependencies
point between them — a sentence a reader can check against an import line —
and carries **one Mermaid diagram** saying the same thing. The two must agree:
a reader checks whichever of them they can read, so where they disagree the
page is wrong, not the reader.

**Flow pages live here too.** A flow is how one thing moves end to end through
the components the other pages name — what starts it, the components it
crosses in order, what it leaves behind — and is an architecture page of that
kind, in this folder with the rest and in no folder of its own. A flow that
stays inside a single folder is that folder's module note's business and gets
no page. The [architecture concept](../../spec/concepts/architecture.md) states
the shape.

Architecture is a maintained claim, not proof that the implementation
follows it. The module notes under [`docs/modules/`](../modules/index.md)
say what is implemented today.

## Pages

- [01 — Cairn 1.1, a repository run by a sole owner with agents](./01-cairn-1-1.md) — accepted 2026-09-07; how a path opens, runs and closes when one owner works with agents, what the checker reads at each transition, what the documentation plane holds and where, which tools exist, and what 1.1 removes from 1.0; promoted from the decisions page and the rulings note through ADR-001 to ADR-015; amended 2026-09-07 with the coding guidelines — the five movements of a unit, the stance from Ponytail, an area as a folder, the two sentences of the cycle — through ADR-016 to ADR-020, promoted from the coding-guidelines decisions page and its four research notes; amended 2026-09-09 with the pedagogy — what a session writes for its reader, the learning note and the learning session, the pages a reader meets — through ADR-021 to ADR-023, promoted from the pedagogy feedback and the owner's statement. Amended 2026-09-11 with the two records coding path 1 owed — the kit installing the registration its skills perform, a red run read before the next unit — through ADR-024 and ADR-025, promoted from CP-CAIRN-005's journal entry. Amended 2026-09-14 with the readings that must not lie — a withheld forge reading reported as unread, the review rule judging the unit under review, one commit for one path, the merge-object refusal by transport — through ADR-026, promoted from CP-CAIRN-007's S03 and journal entry. Amended again 2026-09-14 with the `ready` behind an integrating commit read from any parent of it, through ADR-027, written from the debt CP-CAIRN-008's own S03 raised at its boundary. Amended 2026-09-15 with the three rulings of September — the review movement's fallback and the line naming the reader, through ADR-017's fourth decision added in place; the feedback file an agent writes when nothing broke, through ADR-028; the checker asking the host nothing, its profile line without a host half, through ADR-029 — promoted from the owner's rulings of 2026-09-14 and 2026-09-15 as CP-CAIRN-009's journal entry, its S04 and CP-CAIRN-010's record carry them. Marked from 2026-09-21 by the promotion of Cairn 1.2, CP-CAIRN-012: not amended, but marked *superseded by* where a 1.2 record supersedes a decision a sentence relies on — the registration request, by ADR-032; the pinned Ponytail tag, by ADR-036.
