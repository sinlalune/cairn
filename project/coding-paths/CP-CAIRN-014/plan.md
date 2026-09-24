---
type: Cairn Coding Path Plan
title: CP-CAIRN-014 — forward plan
description: The units of coding path 2 of 1.2 — the record path 1 owes first, then one rule per unit with its fixtures and rows, the candidate after.
tags: [coding-path, plan, cairn-1.2, checker]
timestamp: 2026-09-24T00:00:00Z
cairn:
  path: CP-CAIRN-014
---

# CP-CAIRN-014 — forward plan

Read when planning, never before every step. Each item is one work unit.
A unit that changes a rule changes its fixture, its catalogue entry, its
conformance row and its soundness line in the same commit, so the four
never disagree between units.

1. **S01 — the record path 1 owes.** ADR-044, promoted from path 1's
   journal entry: what `ready` states (amends ADR-040), the fresh
   reader's fifth input (amends ADR-043), the squash-only limit of a
   registration by request (amends ADR-032 decision 2), and the
   owner's fourth decision, a stale `current_step` reported as an
   advisory; the three records marked, the 1.2 page amended in place and
   marked, the records' index. No rule in this unit.
2. **S02 — the `registration` rule reads the change under review.**
   `pathRegistrationState` and the rule in `tools/cairn-check.mjs`; two
   fixtures — a registration request green, one carrying a product file
   refused — each with a merged trunk commit carrying another path's
   unit; the rule's rows on the conformance page, in the catalogue and in
   the soundness note (ADR-032 decision 3).
3. **S03 — the `links` rule reads the declared exemptions.** The field in
   `tools/cairn-config.schema.json` and `tools/cairn-config.mjs`, a
   declaration with no reason refused; the rule skipping the declared
   files; one fixture, declared green and undeclared refused; the field's
   row of the configuration reference; the `links` rows of the
   conformance page and the catalogue, with the line on the two 0.2
   exemptions (ADR-037 decisions 1 and 2).
4. **S04 — the corpus, the messages and the fixture.** `feedbacks/` in
   `markdownCorpus()` with one fixture and its rows (ADR-038 decision 1);
   the two `comparison` messages (ADR-034 decision 6); the
   `record-integrity` fixture read for its order (ADR-034 decision 7);
   the advisory `current-step` with one fixture and its rows (ADR-044);
   the catalogue regenerated; `docs/modules/application.md` current.
5. **S05 — the candidate.** Trunk merged in, gates bare, the register's
   row 2 of 1.2 naming this path; then the close skill's order: the
   administrative commit, the fresh-context coherence read with its five
   inputs in the request's description, the owner's try, the merge.

## What the units must not do

Change a skill, the installer, the audit or post-mortem tools or the
pilot — a rule whose message names one names it as the record does, and
the later row makes it true. Write a fixture that passes on a single-path
history alone.
