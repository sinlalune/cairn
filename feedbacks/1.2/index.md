---
type: Cairn Folder Index
title: Feedbacks — treated by 1.2
description: The notes whose asks Cairn 1.2 promoted, implemented and released; each line names what answered it, so a reader standing on a note reaches the records and the paths without reading them all.
tags: [index, cairn, feedback, 1.2]
timestamp: 2026-09-27T00:00:00Z
---

# Feedbacks — treated by 1.2

A note moves here when a release has answered it: every ask it makes is
either implemented and released, or refused by the owner in writing
([ADR-038](../../docs/adr/ADR-038-the-channel-second-edition.md), decision
3). The notes stay exactly as they were below their frontmatter; only their
relative links moved one level with them, and the blob each promotion
record pins still resolves. Every ask of 1.2 was taken: the records are
ADR-030 to ADR-045, the promotion was
[CP-CAIRN-012](../../project/coding-paths/CP-CAIRN-012/index.md), the
implementation rows 1 to 4 of the register's coding paths of 1.2 —
CP-CAIRN-013 the skills and the specification, 014 the checker, 015 the
kit, 016 the tools — and the release
[CP-CAIRN-017](../../project/coding-paths/CP-CAIRN-017/index.md), 1.2.0.

- [CP-CAIRN-009's writer — four things the gate could not see](./2026-09-15-cp-cairn-009-writer-feedback.md) — *Answered by* ADR-030 d1 and d2 (the placeholder and the contradicting item, CP-CAIRN-013); ADR-031 d1 (a figure written once, CP-CAIRN-013 and CP-CAIRN-017 S04), d2 with ADR-045 (the register's generated cells, CP-CAIRN-016 and CP-CAIRN-017 S01), d3 (*pending*, set by CP-CAIRN-012 and cleared by CP-CAIRN-017 S03).
- [Crumbz updates to 1.1](./2026-09-16-crumbz-update-to-1-1.md) — nine observations. *Answered by* ADR-039 (the changelog, CP-CAIRN-013, 015 and 017); ADR-034 d1, d2, d3 (the view off the reconcile list, byte-equal generations, the files an update starts managing, CP-CAIRN-015), d8 (the close skill's dangling link, CP-CAIRN-013), d9, d10, d11 (the post-mortem, CP-CAIRN-016); ADR-033 d3 (the documentation index's shape, CP-CAIRN-015).
- [ECOS — the owner merges before the administrative commit](./2026-09-17-ecos-merge-before-administrative-commit.md) — *Answered by* ADR-040 d1, amended by ADR-044 d1: `A` lands before the owner reads (CP-CAIRN-013).
- [ECOS — a deferral has nowhere to land](./2026-09-18-ecos-a-deferral-has-nowhere-to-land.md) — *Answered by* ADR-041: `project/backlog/` (CP-CAIRN-013, 015, 016).
- [ECOS — checkboxes inside the text the scope digest pins](./2026-09-18-ecos-checkboxes-inside-the-scope-digest.md) — *Answered by* ADR-042: the definition of done is a plain list (CP-CAIRN-013, 015, 016).
- [ECOS — the coherence questions need a fresh reader](./2026-09-18-ecos-coherence-questions-need-a-fresh-reader.md) — *Answered by* ADR-043, amended by ADR-044 d2 (CP-CAIRN-013, 015, 016).
- [Atomik adopts 1.1](./2026-09-21-atomik-adopts-1-1.md) — observations 1 to 5. *Answered by* ADR-037 (`linkExemptions`, CP-CAIRN-014 and 015); ADR-034 d4 (`status` plans as `update` does, CP-CAIRN-015); ADR-038 d3 (this folder); ADR-033 d4 and d1 (the stale gate named, every declared root read, CP-CAIRN-015).
- [Atomik opens a path on a protected trunk](./2026-09-21-atomik-opens-a-path-on-a-protected-trunk.md) — observations 6 and 7. *Answered by* ADR-032 d1, d2 (with ADR-044 d3), d4 (the direct push's precondition, registration by request, the installer's refusal, CP-CAIRN-013 and 015), d3 (the `registration` rule reads the change under review, CP-CAIRN-014).
- [The channel an adopter cannot reach](./2026-09-21-the-channel-an-adopter-cannot-reach.md) — observations 8 to 10. *Answered by* ADR-038 d2 (the folder installed and the travel named, CP-CAIRN-013 and 015), d1 and d5 (read by `links`, typed `Cairn Feedback`, CP-CAIRN-014 and 015), d4 (a withdrawn claim said at the note's head, the sentence in [this folder's parent index](../index.md), CP-CAIRN-017 S07).
- [Cairn 1.2 — the owner's decisions](./2026-09-21-cairn-1-2-decisions.md) — Q1 to Q20. *Answered by* the owner on 2026-09-21, first option each time; promoted by CP-CAIRN-012 into ADR-030 to ADR-043 and [the 1.2 page](../../docs/architecture/02-cairn-1-2.md).
- [Cairn 1.2 — the asks](./2026-09-21-cairn-1-2-the-asks.md) — K01 to K36, all taken. *Answered by* CP-CAIRN-012 (the records) and CP-CAIRN-013 to CP-CAIRN-017 (the implementation and the release); K28 landed last, in CP-CAIRN-017 S07.
- [What the first `update` of an adopted repository met](./2026-09-22-atomik-first-update.md) — written after the asks. *Answered by* ADR-034 d2 (the lock no longer churns on the clock) and d1 (the pointer page and the lock read one predicate), with the host baselines, CP-CAIRN-015; the request template's blank backticked (CP-CAIRN-015); the audit tool's docblock (CP-CAIRN-016); the empty `steps/` folder (CP-CAIRN-017 S02). A different defect of the dating, between a packed kit and this repository's own tools and met by no adopter, is [a backlog item](../../project/backlog/2026-09-27-the-stamp-dates-a-release-by-the-clock.md).
- [Atomik's adoption is finished](./2026-09-26-atomik-adoption-finished.md) — *Answered by* CP-CAIRN-017 S02: the unit skill's two sentences, print don't remember and the review before the commit; the forked checker it names is retired by ADR-037 (CP-CAIRN-014), as the changelog of 1.2.0 says. The report's third ask, that the fresh reader checks claims by running commands, is one clause of the unit skill's fourth movement, CP-CAIRN-017 S07.
