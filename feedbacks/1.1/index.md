---
type: Cairn Folder Index
title: Feedbacks — treated by 1.1
description: The eight notes whose asks Cairn 1.1 promoted, implemented and released; each line names what answered it, so a reader standing on a note reaches the records without reading them all.
tags: [index, cairn, feedback, 1.1]
timestamp: 2026-09-21T00:00:00Z
---

# Feedbacks — treated by 1.1

A note moves here when a release has answered it: every ask it makes is
either implemented and released, or refused by the owner in writing. The
convention is the owner's ruling of 2026-09-21 on
[the third observation of Atomik's adoption](../2026-09-21-atomik-adopts-1-1.md):
treated notes move into `feedbacks/<release>/`, and the folder answers the
question by being looked at. The notes stay exactly as they were below their
frontmatter; only their relative links moved one level with them, and the
blob each promotion record pins still resolves. The trail back is on each
line below.

- [Crumbz — CP-001 and CP-002 on Gemini](./crumbz-postmortem-2026-09-03.md) — the first adopter's two paths, run by Gemini 3.8 on the Antigravity harness: what held, what did not, and what it asks of 1.1. *Answered by* the rulings note (source G), ADR-001 to ADR-015, released 1.1.0.
- [Crumbz — CP-003 to CP-005 on Codex](./crumbz-postmortem-codex-2026-09-03.md) — the value-board idea from research note through the promotion, the fourteen-unit implementation and the checker-repair path. *Answered by* the rulings note (source C), ADR-001 to ADR-015, released 1.1.0.
- [Crumbz — closure blocked by three checker repairs](./2026-09-04-crumbz-closure-checker-repairs.md) — a wrong unit type became an immutable edit, a provisional commit, three control-plane repair paths and two review rounds before the first closure that followed the sequence in full. *Answered by* the rulings note (source K), ADR-004 and ADR-008; the three repairs came upstream in CP-CAIRN-006 and CP-CAIRN-007.
- [Crumbz — audit after sixteen paths](./2026-09-06-crumbz-sixteen-paths-audit.md) — the whole adopter repository read on 2026-09-06: nine paths closed by the book, five that implemented before their registration landed, a draft record that made the checker demand a false base. *Answered by* the rulings note (source A), ADR-001 to ADR-015, released 1.1.0.
- [Owner feedback — 06/09](./2026-09-06-owner-feedback.md) — the owner's notebook pages transcribed: a home for pre-existing inputs, readable documentation out of promotion, a local pointer to the protocol, the concepts split, automatic post-mortems, an owner's acceptance test before merge, merged-branch hygiene, when a module note should split. *Answered by* the rulings note (source O), ADR-001, ADR-010 to ADR-014, released 1.1.0.
- [Cairn 1.1 — the owner's decisions](./2026-09-06-cairn-1-1-decisions.md) — nineteen questions in plain language, each with what happened on Crumbz and the options to tick. *Answered by* the owner on 2026-09-06; promoted by [CP-CAIRN-002](../../project/coding-paths/CP-CAIRN-002/index.md) into ADR-001 to ADR-015 and [the 1.1 page](../../docs/architecture/01-cairn-1-1.md).
- [Cairn 1.1 — the rulings](./2026-09-06-cairn-1-1-rulings.md) — every ask of the five notes as one checkbox line, thirty-nine in six themes: thirty-seven taken, two refused (R03, R11). *Answered by* CP-CAIRN-002 (the records) and the seven coding paths CP-CAIRN-005 to CP-CAIRN-011 (the implementation and the release); one ruling later reversed, R06's GitHub reading, by ADR-029.
- [Owner feedback — 08/09, the pedagogy](./2026-09-08-owner-feedback-pedagogy.md) — the owner's four notebook pages on pedagogy, twelve questions P1 to P12. *Answered by* the owner on 2026-09-09; promoted by [CP-CAIRN-004](../../project/coding-paths/CP-CAIRN-004/index.md) into ADR-021 to ADR-023 and the manifesto's pedagogy section.
