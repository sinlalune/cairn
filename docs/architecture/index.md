---
type: Cairn Folder Index
title: Architecture
description: Accepted architecture: what a system is as a whole, its boundaries, responsibilities, constraints and major flows, each page naming the decision records it relies on.
tags: [index, cairn, architecture]
timestamp: 2026-09-06T00:00:00Z
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

None yet. The first page, on Cairn 1.1 — how a path opens, runs and closes
in a repository run by a sole owner with agents, what the checker reads at
each transition, what the documentation plane holds, which tools exist, and
what 1.1 removes from 1.0 — is written by CP-CAIRN-002 once every decision
record it names exists.
