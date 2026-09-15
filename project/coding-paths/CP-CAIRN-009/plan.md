---
type: Cairn Coding Path Plan
title: CP-CAIRN-009 — forward plan
description: The units of coding path 4 of 1.1 — the kit's configuration and bootloader first, then the documentation plane it installs and the concept rules' read, then the pointer page and update, then the manifest and the generated adapter and template, then the chapters, concepts and layout, then this repository's own indexes and the candidate.
tags: [coding-path, plan, implementation, kit]
timestamp: 2026-09-15T00:00:00Z
cairn:
  path: CP-CAIRN-009
---

# CP-CAIRN-009 — forward plan

Read when planning, never before every step. Each unit implements the
records its surface names and nothing else; every behaviour change in
the installer or the checker has its failing test first, on an
installation the test builds; a generated file that is meant to equal
this repository's own is proved equal by a test. Each unit runs the
review movement on its own diff, as the unit skill says, and sets
`current_step` to the unit whose block is in the commit.

1. **S01 — what `init` writes, and the bootloader.** `init` writes
   `transport.registration: manual-git`, `--transport` names the
   integration transport alone, the generated binding prints both, the
   configuration reference follows (ADR-024). The bootloader gains the
   tone line (ADR-021 d1), the concept-note line (ADR-011 d3), six skills
   (ADR-022 d2), the `npm test` alias sentence (ADR-014 d2); this
   repository's `AGENTS.md` carries the same lines.
2. **S02 — the documentation plane the kit installs, and the concept
   rules' read.** `docs/inputs/` and its index (ADR-011 d1); the concept
   root in three folders with their indexes, `roots.concepts` the parent
   (ADR-011 d2, ADR-022 d1); the documentation index naming the inputs
   folder, the three folders, the surface pages' place with the example
   and the API link, the architecture folder as the flow pages' home
   (ADR-012, ADR-023 d2–d4); the architecture index the kit writes with
   the sentence and the diagram (ADR-019 d2, ADR-023 d3); the module note
   template describing now (ADR-010 d1). `concept-orphan` and
   `concept-growth` read the root recursively, failing fixture first;
   the conformance page's two rows say so.
3. **S03 — the pointer page, `update` and `status`.** `cairn/README.md`
   generated at `init` and `update` with the six items ADR-013 lists,
   six skills, the edited files the last update could not rewrite; the
   bootloader points at it (ADR-013, ADR-015 d2). `update` rewrites a
   pristine file whoever owns it, prints what the release changes in an
   edited one, takes the release's version of a named file on request;
   `status` says which is which (ADR-015 d1–d3). Tests on an installation
   that edited one file. S01's review left this unit one defect, older
   than this path: `applyAdopt` writes the migrated configuration but
   locks the digest of the generated one, so `status` calls an untouched
   `cairn.config.json` edited straight after `adopt` — `update` carries
   the guard `adopt` lacks.
4. **S04 — the manifest, the generated adapter and template.**
   `cairn-postmortem` in `REFERENCE_TOOLS` and in the scripts the kit
   writes, `skills/cairn-learn` copied with the five (ADR-014 d1, ADR-022
   d2); Ponytail named at its tag in the lock and on the pointer page
   (ADR-016 d1); the schema and the project index kept or removed for
   their reasons (ADR-022 d2); the generated workflow's push trigger on
   the trunk alone, the base per event as path 5 left it, the red-run
   step (ADR-005, ADR-014 d1); the generated request template in the
   template's order (ADR-021 d2, ADR-018 d2); the lock and the
   conformance page's kit line as a measurement; tests proving equality
   with this repository's own files where meant. That line still reads
   *the five skills* and *26 files*, which S01's review named and this
   unit measures once, when the manifest is final.
5. **S05 — chapters 3 and 6, the concepts, the layout.** Chapter 3's
   promotion outputs and kinds (ADR-012, ADR-023 d1–d4); chapter 6's
   scopes table, learning-notes paragraph and weight-budget line
   (ADR-011 d2, ADR-022 d1–d2); `spec/concepts/architecture.md` and
   `concept-template.md` (ADR-019 d2, ADR-022 d1, ADR-023 d2–d3); the
   layout reference's tree, table and workflow row (ADR-005, ADR-011,
   ADR-013, ADR-014, ADR-022) — its `skills/<name>/SKILL.md` row
   enumerates four procedures and the stance, with no `cairn-learn`,
   which S01's review named.
6. **S06 — this repository's own.** `docs/architecture/index.md` on flow
   pages, the sentence and the diagram; `docs/modules/application.md`
   describing the installer and the checker as they are; the register's
   row 4 carrying the widened writes.
7. **S07 — the candidate.** Trunk merged in, gates bare, the request
   opened with the description the audit tool prints; the administrative
   commit on the branch and its check green before the owner is asked;
   the owner runs `cairn init` into an empty folder and reads what it
   wrote before the merge.
