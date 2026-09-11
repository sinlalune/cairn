---
type: Cairn Folder Index
title: Architecture
description: Accepted architecture: what a system is as a whole, its boundaries, responsibilities, constraints and major flows, each page naming the decision records it relies on.
tags: [index, cairn, architecture]
timestamp: 2026-09-09T00:00:00Z
---

# Architecture

One page per system as a whole, numbered in the order it was accepted. A
page states boundaries, responsibilities, constraints and major flows, names
every [decision record](../adr/index.md) it relies on where it relies on it,
and links back to the notes it was promoted from. A page whose meaning
changes is amended by a path that also adds or supersedes a decision record;
the checker's `decision-drift` advisory reports a change here without one.

Architecture is a maintained claim, not proof that the implementation
follows it. The module notes under [`docs/modules/`](../modules/index.md)
say what is implemented today.

## Pages

- [01 — Cairn 1.1, a repository run by a sole owner with agents](./01-cairn-1-1.md) — accepted 2026-09-07; how a path opens, runs and closes when one owner works with agents, what the checker reads at each transition, what the documentation plane holds and where, which tools exist, and what 1.1 removes from 1.0; promoted from the decisions page and the rulings note through ADR-001 to ADR-015; amended 2026-09-07 with the coding guidelines — the five movements of a unit, the stance from Ponytail, an area as a folder, the two sentences of the cycle — through ADR-016 to ADR-020, promoted from the coding-guidelines decisions page and its four research notes; amended 2026-09-09 with the pedagogy — what a session writes for its reader, the learning note and the learning session, the pages a reader meets — through ADR-021 to ADR-023, promoted from the pedagogy feedback and the owner's statement. Amended 2026-09-11 with the two records coding path 1 owed — the kit installing the registration its skills perform, a red run read before the next unit — through ADR-024 and ADR-025, promoted from CP-CAIRN-005's journal entry.
