---
type: Cairn Decision Record
title: ADR-035 — the seventh skill, `cairn-update`
description: An adopter's update to a new release is a path with a procedure of its own, carried by a seventh skill the kit installs — the reading first, the owner's two decisions before the go-ahead, the run, the reconciliation of only what the report named, and what it cost said back to Cairn. Promotes K17 of Cairn 1.2, from Q7.
tags: [cairn, adr, 1.2, skills, cairn-update, kit]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-035
  status: accepted
  date: 2026-09-21
---

# ADR-035 — the seventh skill, `cairn-update`

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S02

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q7, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 3, K17). The line
comes from [the brainstorm note of 2026-09-16](../../project/brainstorm/2026-09-16-an-update-skill.md),
where the owner said *look like we could use a cairn update skill*, and
its evidence is [Crumbz's update](../../feedbacks/2026-09-16-crumbz-update-to-1-1.md),
run by hand along the chronology that note wrote. Both stay exactly as
they were.

## Context

Every other movement of a path has a skill, and the one an adopter meets
at every release has none. On the morning 1.1.0 was published the
chronology of Crumbz's update had to be derived in the chat — nine
steps — and its two decisions, what to do with an edited kit file and
what to do with a host file the repository does not want, were written
nowhere an agent would read them. Crumbz then ran the update as a path
on its register, CP-CAIRN-UPDATE-027, along that chronology: one
command, one read, two units of decisions. The commands exist and the
pointer page lists them; what is missing is the frame around them.

## Decision

### Decision 1 — a seventh skill, `cairn-update`

Promotes **K17**, from Q7, first option: the skill, not a section of
`cairn-open`.

The kit installs `skills/cairn-update/SKILL.md` beside the six. It says
that an update is a path on the adopter's register, with writes limited
to the kit's files and the host files the report names, and gives the
movement in order:

1. settle the trunk — a running path's integrating unit landed, the
   working tree clean;
2. the reading, `npx cairn-protocol status`, before anything is written;
3. the owner's two decisions, put in the chat before the go-ahead: for
   each edited kit file, keep the edit or take the release's version
   (`update --take`, ADR-015 decision 3); for each host file the
   repository does not want, decline it (ADR-033 decision 2);
4. registration, as `cairn-open` says;
5. one unit: the run, and each kept file's diff read and decided;
6. one unit: reconcile by hand only what the report and the pointer page
   named;
7. close, as `cairn-close` says; and what the update cost, said back to
   Cairn by the route the unit skill names.

The release notes, once they name the adopter repairs a release absorbed
by the adopter's path ids (K31, theme 6's record), are read at step 3 so
a writer with an edited checker knows what `--take` will drop. The skill
carries no command the pointer page does not already list; it carries
the order and the two decisions.

What this changes, by today's names: `skills/cairn-update/SKILL.md`, new;
`tools/cairn.mjs` — `planInstall`, which copies every folder under
`SKILLS`, `SKILL_LINES` on the pointer page, and the skills line of the
bootloader it generates; `cairn.lock.json`; this repository's
`AGENTS.md`, its skills line; the kit's counts in the conformance page's
budget table — the files row today, a skills row once ADR-031 decision 1
lands — and the README's link to them.

## Alternatives rejected

- **A section of the open skill** (Q7, second option): an update is not
  a coding path's opening, and `cairn-open` is already long; the
  brainstorm note refused it for the same reason.
- **No skill — the pointer page is enough** (Q7, third option,
  *simplest*): refused by the owner. The page lists the commands; the
  agent derived the frame by hand once and every adopter's agent would
  again.
- **A section of the pointer page** (the brainstorm's second option):
  a generated page, rewritten at every update, not a skill an agent
  loads when it acts.

## Consequences

- The kit installs seven skills; the count is measured on the
  conformance page and is no target (ADR-022 decision 2).
- The pointer page keeps one line pointing at the skill, where its
  reconcile list already sends the reader.

## What the manifesto's test weighed

Q7's option is tagged *one skill file*: prose an agent needs at the
moment it acts, and no rule, no tool and no step of the checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the new skill; the kit's manifest, pointer page and generated bootloader; the lock; this repository's bootloader; the kit's count rows and the README that links them | `skills/cairn-update/SKILL.md`; `planInstall`, `SKILL_LINES`, `bootloader` in `tools/cairn.mjs`; `cairn.lock.json`; `AGENTS.md`; `spec/reference/conformance.md`, the budget table; `README.md` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
