---
type: Cairn Coding Path
title: Coding guidelines — the owner's fifteen answers promoted into decision records and the 1.1 page
description: The promotion path of the coding guidelines, documents only. The fifteen answers the owner ticked on 2026-09-07 become decision records under docs/adr/ and amendments to the Cairn 1.1 architecture page, each bound to the research note it came from; the roadmap register then names, in the coding paths of 1.1, the surfaces that build them.
tags: [coding-path, promotion, coding-guidelines, cairn-1.1]
timestamp: 2026-09-07T00:00:00Z
cairn:
  id: CP-CAIRN-003
  route: full
  status: running
  current_step: S01
  base_commit: 7997b7608bf34ceecfbcf85e5ad32c0187230e5d
  branch: path/cp-cairn-003
  assigned_writer: cp-cairn-003-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - docs/adr/**
    - docs/architecture/**
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-003/**
  governs:
    - project/brainstorm/2026-09-07-coding-guidelines.md@0c419931bc7bc6c812e1b84458685087b7047c19
    - project/brainstorm/2026-09-07-coding-stance-research.md@65987c7a2227b406c41198e6aa53460854ed24d8
    - project/brainstorm/2026-09-07-step-cycle-research.md@65e7a2a96a4046af05f67a4e06ff9328fe03068f
    - project/brainstorm/2026-09-07-component-slicing-research.md@945a201e0ab317426179a2def661fe63b343669d
    - project/brainstorm/2026-09-07-graph-flow-research.md@a52ac0eca6c1ce963d913239943a9468b47f7a95
    - project/brainstorm/2026-09-07-coding-guidelines-decisions.md@48112c310e1c127b0265ed63c8255bb0377264fa
    - docs/architecture/01-cairn-1-1.md@87a601e95c26375679a58f9e3dfdb4b657f47508
---

# CP-CAIRN-003 — the coding guidelines promoted

## Goal

The owner answered the fifteen questions of the
[decisions page](../../brainstorm/2026-09-07-coding-guidelines-decisions.md)
on 2026-09-07, from four research notes on the coding stance, the step
cycle, the component slicing and the graph flow. None of the six notes
designs anything. This path is the promotion unit of the specification's
chapter 3: the answers become accepted vision — decision records that each
state one choice with its alternatives and consequences, and the
[Cairn 1.1 page](../../../docs/architecture/01-cairn-1-1.md) amended where
an answer changes what a unit, a stance, an area or a path is — under
`docs/adr/` and `docs/architecture/`. The notes are left exactly as they
were and every record links back to them as *promoted from*. No
implementation: the specification, the skills, the tools and the kit are
changed by the coding paths of 1.1 that the roadmap register names, which
this path widens to carry the new records.

## Definition of done

- [ ] Five decision records, ADR-016 to ADR-020, exist in the layout's
      shape with parseable frontmatter, a stable id, a status, a date, the
      choice, its context, the alternatives rejected, the consequences,
      what the manifesto's test weighed, and a *promoted from* link to the
      decisions page and the research note behind it at the blob ids
      pinned in this record; the index of `docs/adr/` lists them with no
      gap after ADR-015.
- [ ] Every ticked answer, Q1 to Q15, is named by exactly one decision
      record that implements it, and every option the owner did not tick
      is named by the same record as rejected, with the tag the decisions
      page gave it: the stance and Ponytail (Q1 to Q5), the review movement
      and the fresh-context reader (Q6, Q7), the unit's and the request's
      sentences (Q8, Q9), areas and the architecture page (Q10 to Q12), the
      one edge and the one writer (Q13 to Q15).
- [ ] The Cairn 1.1 architecture page states, naming the record behind
      each sentence: the five movements of a unit and what the checker
      reads in a step record; what the coding stance is and where it comes
      from; what an area is and what the architecture page must say of
      dependencies; and it links back to the six notes as *promoted from*
      at the blob ids pinned in this record, without rewriting anything to
      look as if it had always been so. No 1.1 record is superseded,
      because no answer overturns one; the page says so.
- [ ] Where a decision record changes what an existing rule, skill,
      template, kit file or command does, it names that rule, skill,
      template, file or command as the conformance page, the skills and
      the kit name it today, so the coding path that implements it can be
      scoped from the record alone.
- [ ] The roadmap register in `project/coding-paths/index.md` names, in
      the rows of the coding paths of 1.1, the new records each one
      implements and the surfaces they add — the skills and the templates
      in path 1, the checker's new rule in path 2, the kit's pinned
      dependency in path 4 — with no new path and no path opened.
- [ ] The six governing notes are byte-identical at the candidate to what
      they are at `base_commit`; nothing under `spec/`, `skills/`,
      `tools/`, `site/`, `.github/` or `cairn.config.json` changes.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, and a remote checkpoint.
- [ ] The final candidate contains the trunk tip, is checked, and is
      reviewed in the pull request's description against the coherence
      questions; the owner reads the pages before the merge, and the merge
      is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-07T13:56:42Z
scope_ref: project/coding-paths/CP-CAIRN-003/index.md#definition-of-done
scope_digest: sha256:6889ce0686054e96c1aaff20457c6fae518992196d58f6e9a8158b15b8709883
```

Reviewed in the chat of 2026-09-07: route `full` because the path writes
architecture and decision records, as a documents-only promotion unit; the
definition of done above; writes limited to `docs/adr/`,
`docs/architecture/`, the roadmap register and this folder, with no overlap
because no other path runs; the specification, skills, tools, kit, site,
workflow, configuration and the six notes under `project/brainstorm/`
excluded from change; governed by the six notes and the 1.1 page at their
blob ids on `main`; initial writer `cp-cairn-003-writer`. The owner read the
plan — five records ADR-016 to ADR-020, the 1.1 page amended, the register's
rows 1, 2 and 4 widened, no sixth coding path — and gave the go-ahead in the
chat with the word "YES"; that go-ahead is this acceptance (ADR-001,
decisions 1 and 2), and the record lands on the trunk directly. The owner
also said the units will run in a fresh session. Amendments: none.

## Documentation coverage

### Required

- `project/brainstorm/2026-09-07-coding-guidelines-decisions.md@48112c31`
  — the owner's fifteen answers, each option tagged, with the owner's
  words under Q6, and the table of what each answer drives.
- The four research notes at their pinned blob ids — the sources, the
  Crumbz evidence and the reasoning each record cites as its context.
- `docs/architecture/01-cairn-1-1.md@87a601e9` — the page this path
  amends, read before any record is written so that no sentence of it is
  contradicted without a superseding record.

### Conditional

- `docs/cairn/manifesto.md` — read whenever a record keeps an option the
  decisions page tagged *adds a rule*; Q7 is the one such answer, and its
  record must say what the manifesto's test weighed.
- `spec/index.md`, chapters 3 and 5 — the shape of a promotion unit, of a
  decision record, and of the work unit the records change.
- `spec/reference/conformance.md`, `skills/*/SKILL.md`,
  `spec/reference/path-template.md`, `tools/cairn.mjs` — the names of the
  rules, skills, templates and kit files a record changes.
- `docs/adr/ADR-001` to `ADR-015` — read so that a new record cites the
  1.1 record it builds on and supersedes none.

### Deliberately excluded

- `spec/`, `skills/`, `tools/`, `site/`, `.github/` and
  `cairn.config.json` — implementation, the work of the coding paths of
  1.1; a promotion unit produces no implementation.
- `project/brainstorm/**` — the notes are read, never written.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- **S01** — not started

## Resume

### Checkpoint

```text
commit : the registration commit — the trunk commit that adds this record, whose parent is base
unit   : 0
base   : 7997b7608bf34ceecfbcf85e5ad32c0187230e5d
trunk  : 7997b7608bf34ceecfbcf85e5ad32c0187230e5d — origin/main at registration
```

### Next action

In a fresh session, from the worktree `../cairn-cp-cairn-003` on branch
`path/cp-cairn-003`: run S01 of the plan with `cairn-unit` — ADR-016, the
coding stance, from Q1 to Q5 of the decisions page and research note 1.

### Blockers

None.

### Tried and rejected

- A sixth coding path for the new records — paths 1, 2 and 4 of the 1.1
  register already own the skills, the checker and the kit; the register's
  rows are widened instead, and the owner accepted that in the plan review.
- Superseding a 1.1 record — no answer overturns one; the page will say so.
- Pinning the manifesto in `governs:` — every option on the decisions page
  carries its tag; conditional reading instead, as CP-CAIRN-002 chose.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md`.
2. `project/brainstorm/2026-09-07-coding-guidelines-decisions.md@48112c310e1c127b0265ed63c8255bb0377264fa` — the fifteen answers and the table of what each drives.
3. `docs/architecture/01-cairn-1-1.md@87a601e95c26375679a58f9e3dfdb4b657f47508` — the page this path amends.
4. `docs/adr/ADR-008` and `ADR-009` — the shape of a record that keeps or refuses, and one that adds sentences.
5. `project/coding-paths/CP-CAIRN-003/plan.md`, then the research note of the unit being written.

### Verify

```bash
npm run cairn-check
```
