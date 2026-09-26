---
type: Cairn Backlog Item
title: Chapter 4 does not say how a milestone is counted
description: ADR-045 decides which paths a milestone of the roadmap register counts; chapter 4 of the specification, where an adopter learns to write a register, shows a row naming its paths and says nothing of the heading.
tags: [backlog, register, spec, adr-045]
timestamp: 2026-09-26T00:00:00Z
---

# Chapter 4 does not say how a milestone is counted

**What.** `cairn-active` counts a milestone's paths from its row and from
the table under the heading ending with its short name
([ADR-045](../../docs/adr/ADR-045-a-milestone-reads-the-paths-it-counts.md)).
Chapter 4 of `spec/index.md` shows a register whose rows name their
paths and says nothing of the heading, so an adopter who lists a
milestone's paths in a table of their own gets a cell the tool never
fills.

**Which path, and where.** CP-CAIRN-017, S01, which wrote ADR-045; that
path leaves the chapters unchanged by its definition of done.

**Owner.** sinlalune.

**Shape of the work.** One sentence in chapter 4, under the register's
example. CP-CAIRN-017 may not change the chapters; it waits for the
register's row after 1.2.0, which the owner opens after the tag.
