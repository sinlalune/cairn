---
type: Cairn Coding Path Plan
title: CP-CAIRN-012 — forward plan
description: The units of the 1.2 promotion path, one or two themes of the asks note at a time, the architecture page and the register last because they name every record.
tags: [coding-path, plan, promotion, cairn-1.2]
timestamp: 2026-09-21T00:00:00Z
cairn:
  path: CP-CAIRN-012
---

# CP-CAIRN-012 — forward plan

Read when planning, never before every step. The records follow the seven
themes of the asks note, so a reader holding the note can find the record
for any line; the grouping below is the starting point, and a unit that
finds two records where the plan says one, or one where it says two, writes
what the choice needs and says so in its step.

1. **S01 — what the open skill reads, and a trunk that takes no direct
   push.** Themes 1 and 2. ADR-030, what the open skill reads before the
   go-ahead (K01, K02). ADR-031, one place for a fact — the measured figure,
   the register's State column, the word *pending* (K03, K04, K05). ADR-032,
   registering on a trunk that takes no direct push — the precondition
   named, the pull-request registration sequence, the `registration` rule
   reading the change under review, the installer refusing the pairing that
   cannot work (K06, K07, K08, K20); it amends ADR-001 decision 1 and says
   why the kit may ask the host what ADR-029 forbids the checker.
2. **S02 — the installer and what it ships.** Theme 3. ADR-033, the
   installer reads what the repository declared and says what it leaves —
   every declared root, a declined file the lock remembers, template
   sentences in the shape they describe, the gate `adopt` leaves red (K12,
   K13, K14, K16). ADR-034, housekeeping with no choice in it, second
   edition — the eleven corrections of Q16 (K09, K10, K11, K15, K19, K23,
   K24, K25, K29, K30, K36). ADR-035, the seventh skill, `cairn-update`
   (K17). ADR-036, the kit ships Ponytail's skills where the harness loads
   them (K18), superseding ADR-016 decision 1.
3. **S03 — the checker, the channel and the release notes.** Themes 4, 5
   and 6. ADR-037, a repository declares its link exemptions (K21).
   ADR-038, the channel, second edition — `feedbacks/` read by the corpus
   rules, installed in every adopter with the route a note takes, a treated
   note under `feedbacks/<release>/`, a corrected claim said at the head,
   the note's frontmatter type defined (K22, K26, K27, K28), superseding
   ADR-028 decision 2's reading half. ADR-039, the release notes name what
   a release absorbed (K31).
4. **S04 — finishing a coding path.** Theme 7. ADR-040, the administrative
   commit lands before the reading on `pull-request` with one owner (K32).
   ADR-041, `project/backlog/`, a home for deferred work (K33). ADR-042,
   the definition of done is a plain list (K34), superseding ADR-002
   decision 2. ADR-043, the coherence questions are a fresh-context read
   (K35), amending ADR-017. Every ticked line of the asks note is now named
   by one record.
5. **S05 — the architecture page and the roadmap.** One page for Cairn 1.2
   under `docs/architecture/`, in the 1.1 page's sections, naming every
   record and stating what 1.2 removes from 1.1; the 1.1 page and the
   superseded records marked; the ADR and architecture indexes; the
   register's 1.2 row naming this path and the coding paths that build 1.2,
   each *no path yet*. Merge the trunk in, produce the candidate, open the
   request with the coherence questions answered, then close.

## What the records must not do

Design an implementation. A record says what is decided and why, names the
rule, skill, file or command it changes, and stops; how the code does it is
the coding path's work. A record that carries a diff is a step file in the
wrong folder.
