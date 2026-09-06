---
type: Cairn Coding Path Plan
title: CP-CAIRN-002 — forward plan
description: The units of the promotion path, one theme of the rulings note at a time, the architecture page last because it names every record.
tags: [coding-path, plan, promotion, cairn-1.1]
timestamp: 2026-09-06T00:00:00Z
cairn:
  path: CP-CAIRN-002
---

# CP-CAIRN-002 — forward plan

Read when planning, never before every step. Each item is one or more work
units. The records follow the six themes of the rulings note, so a reader
holding the note can find the record for any line; the architecture page
comes last because it names every record.

1. **S01 — the folders and the first decision.** `docs/adr/index.md`,
   `docs/architecture/index.md`, the two folders listed in `docs/index.md`.
   Decide the numbering of this repository's own records: it starts at
   `ADR-001`; the Atomik records the specification cites, ADR-020 to
   ADR-022, are named where they are cited and never reissued. Then the
   first record, theme 1 — how a sole owner's repository opens and closes a
   path: R01, R02, R04, R05, R06, R08, with R03 refused; the record settles
   what this registration met in practice, a trunk whose ruleset requires a
   request and the `transport.registration` declaration that says otherwise.
2. **S02 — what the checker reads.** Theme 2, R09, R10 and R12 to R17, with
   R11 refused and R07's single run per candidate: one record per changed
   predicate or one for the theme, each naming the rule as the conformance
   page names it and the fixture the ruling asks for.
3. **S03 — records and skills.** Themes 3 and 4, R18 to R30, R38 and R39:
   what a path record, a journal entry, a module note and a request may
   carry, and the sentences the skills gain. The three Q19 removals that are
   not R01 — the double check and the module note's history — are made here
   and in S02.
4. **S04 — the documentation plane and the tools.** Themes 5 and 6, R31 to
   R37: `docs/inputs`, the concept wiki in three, the readable page per
   product surface, the local pointer to the protocol, proactive concept
   notes, `cairn-postmortem` on a red run, `cairn-test`.
5. **S05 — the architecture page and the roadmap.** One page for Cairn 1.1
   under `docs/architecture/`, promoted from the two notes, naming every
   record and stating what 1.1 removes; the roadmap register names the
   milestone and the coding paths that build it. Merge the trunk in, produce
   the candidate, open the request with the coherence questions answered and
   the owner's acceptance checkbox, then close.

## What the records must not do

Design an implementation. A record says what is decided and why, names the
rule, skill, file or command it changes, and stops; how the code does it is
the coding path's work. A record that carries a diff is a step file in the
wrong folder.
