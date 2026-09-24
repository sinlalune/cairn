---
type: Cairn Backlog Item
title: The unit skill never names current_step
description: No skill, template or chapter tells the writer to set a record's current_step to the step a unit completes; the unit skill's verify movement refreshes the resume section only, and two integrated records carry the field stale.
tags: [backlog, skills, cairn-unit, current-step]
timestamp: 2026-09-25T00:00:00Z
---

# The unit skill never names `current_step`

**What.** A path record's `current_step` names the step the path is on,
and `work-unit` reads it. No page tells the writer to set it:
`skills/cairn-unit/SKILL.md`, movement 5, refreshes the resume section of
`index.md` — checkpoint, next action, blockers, tried and rejected,
reading order, verify — and the field sits in the declaration above it.
`grep -rn -i "current_step\|current step" skills/` finds nothing that
asks for it. CP-CAIRN-008 and CP-CAIRN-012 were integrated with the field
naming an older unit; since ADR-044 decision 4 the advisory
`current-step` reports it, and its message is the only sentence in
`skills/`, `spec/` or `tools/` that asks.

**Which path, and where.** Found by the fresh coherence reader of
CP-CAIRN-014's third candidate, `32a8fdd`; recorded in that path's S08,
which corrected ADR-044's claim that the unit skill already asked. Not
that path's scope: `skills/` is row 1's, and row 1 is done.

**Owner.** sinlalune.

**Shape of the work.** One clause in the unit skill's movement 5 — set
`current_step` to this unit's step — in the next path that writes the
skills; no record, since ADR-044 already decides the field is reported
when it is not set.
