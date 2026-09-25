---
type: Cairn Backlog Item
title: adopt reads links as the checker does, by a copy of its pattern
description: The installer's relativeLinks repeats the checker's links pattern, so a change to the checker's reading leaves adopt's dead-link shape disagreeing with the gate, and nothing tracks the pair.
tags: [backlog, installer, checker, links]
timestamp: 2026-09-25T00:00:00Z
---

# `adopt` reads links as the checker does, by a copy of its pattern

**What.** ADR-037 decision 2 has `adopt` name a page whose relative
links resolve nowhere as a shape that wants a `linkExemptions`
declaration. So that the hint and the gate agree, `relativeLinks` in
`tools/cairn.mjs` uses the checker's pattern — a target starting with a
dot, up to whitespace or an anchor, backslashes dropped, inline code and
fences stripped. It is a copy: the checker cannot be imported where
there is no host configuration, the reason the installer also carries
its own GitHub reading. The exemption match is shared already — both
read `slash()` from `tools/cairn-config.mjs`. A change to the checker's reading
leaves `adopt` naming files the gate passes, or missing ones it refuses,
and no test compares the two.

**Which path, and where.** Found by the fresh coherence reader of
CP-CAIRN-015's candidate `1e7a32c`, question 4; placed here by that
path's S09. Not that path's scope: its definition of done keeps
`tools/cairn-check.mjs` unchanged.

**Owner.** sinlalune.

**Shape of the work.** The same move as the GitHub reading's item, which
CP-CAIRN-016 S02 landed by moving the two functions into
`tools/cairn-config.mjs`: one module the checker and the installer both
import, which loads no host configuration — in the next path that writes the checker. No
record.
