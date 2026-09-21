---
type: Cairn Coding Path
title: Cairn 1.2 — the asks promoted into decision records and an architecture page
description: The promotion path of 1.2, documents only. The thirty-six asks the owner took on 2026-09-21 become decision records under docs/adr/, from ADR-030, and one architecture page for Cairn 1.2 under docs/architecture/, each bound to the asks it implements and linked back to the two notes it came from; five 1.1 decisions are superseded where the owner reversed them; the roadmap register then names the coding paths that will build 1.2.
tags: [coding-path, promotion, cairn-1.2]
timestamp: 2026-09-21T00:00:00Z
cairn:
  id: CP-CAIRN-012
  route: full
  status: running
  current_step: S01
  base_commit: 958880f040506961108f136c75e0c18921a9b460
  branch: path/cp-cairn-012
  assigned_writer: cp-cairn-012-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - docs/adr/**
    - docs/architecture/**
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-012/**
  governs:
    - feedbacks/2026-09-21-cairn-1-2-decisions.md@cfe60ef6804526f939e2d7467fbe1cbee5f8a9df
    - feedbacks/2026-09-21-cairn-1-2-the-asks.md@837262d5b3a761ef14d14bad0be8278133256e53
---

# CP-CAIRN-012 — Cairn 1.2 promoted

## Goal

The owner answered the twenty questions of the
[decisions page](../../../feedbacks/2026-09-21-cairn-1-2-decisions.md) on
2026-09-21 and the [asks note](../../../feedbacks/2026-09-21-cairn-1-2-the-asks.md)
was ticked from those answers: thirty-six asks taken, none deferred, none
refused, nothing undecided. Neither note designs anything. This path is the
promotion unit of the specification's chapter 3: the asks become accepted
vision — decision records that each state one choice with its alternatives
and consequences, from ADR-030, and one architecture page that states what
Cairn 1.2 changes for a repository run by a sole owner with agents — under
`docs/adr/` and `docs/architecture/`, beside the 1.1 records and page.
It is the least because every record stands behind an answer already
given, the ten notes stay exactly as they were and every page links back to
them as *promoted from*, and the four 1.1 decisions the owner reversed —
the checkboxes (ADR-002 decision 2), the Ponytail pin (ADR-016 decision 1),
the folder no tool reads (ADR-028 decision 2), and the boundary between what
the kit may ask the host and what the checker may not (ADR-029) — are
superseded by a record each, never rewritten. No implementation: the
specification, the skills, the tools and the kit are changed by the coding
paths this path names in the roadmap register, not by this one.

## Definition of done

- [ ] Decision records from ADR-030, in the layout's shape,
      `ADR-<NNN>-<decision>.md`, each with parseable frontmatter, a stable id,
      a status, a date, the choice, its context, the alternatives rejected
      and the consequences, and a *promoted from* link to both governing
      notes at the blob ids pinned in this record.
- [ ] Every ticked line of the asks note — K01 to K36 — is named by exactly
      one decision record that implements it; K27, already carried out on
      2026-09-21, is named by the record covering the channel as the
      convention it keeps.
- [ ] Where a record supersedes a decision of ADR-001 to ADR-029, it names
      the record and the decision, the superseded record gains a line
      naming what supersedes it, and the 1.1 architecture page's sentence
      that relied on it is marked *superseded by* with the 1.2 record.
- [ ] `docs/architecture/` carries one page for Cairn 1.2 that states, in
      the sections of the 1.1 page, what changes for a repository run by a
      sole owner with agents — how a path opens on a trunk that takes no
      direct push, what a record and the register may say, what the
      installer reads and reports, what the checker reads, the channel
      between an adopter and Cairn, how a path closes — naming every
      decision record where the page relies on it, and stating what 1.2
      removes from 1.1.
- [ ] Where a decision record changes what an existing rule, skill, kit
      file or command does, it names that rule, skill, file or command as
      the conformance page, the skills and the kit name it today, so the
      coding path that implements it can be scoped from the record alone.
- [ ] The roadmap register's 1.2 row names this path as its promotion and
      the coding paths that build 1.2, each with a path id or *no path
      yet*.
- [ ] The two governing notes and the ten notes at the folder's level are
      byte-identical at the candidate to what they are at `base_commit`;
      nothing under `spec/`, `skills/`, `tools/`, `site/` or `.github/`
      changes.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, and a remote checkpoint.
- [ ] The final candidate contains the trunk tip, is checked, reviewed in
      the pull request's description against the coherence questions, and
      tried by the owner before the merge.
- [ ] The exact candidate lands through the pull request, the trunk records
      done with one journal entry, the remote result is proved, and the
      clean secondary worktree is removed by the writer, or the failure to
      remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-21T14:24:58Z
scope_ref: project/coding-paths/CP-CAIRN-012/index.md#definition-of-done
scope_digest: sha256:837850b65403c94f948a1b3960f7f26c5c04adf4dbf93601c1059c673ff9889a
```

Reviewed in the chat of 2026-09-21: route `full` because the path writes
decision records and an architecture page, as a documents-only promotion
unit; the definition of done above; writes limited to `docs/adr/`,
`docs/architecture/`, the roadmap register and this folder, with no overlap
because no other path runs; the specification, skills, tools, kit, site,
workflow and the notes under `feedbacks/` excluded from change; governed by
the decisions page and the asks note at their blob ids on `main`; initial
writer `cp-cairn-012-writer`. The one point put to the owner — a new 1.2
architecture page with the 1.1 page marked where superseded, against
amending the 1.1 page in place or rewriting it — was answered *go for 1*,
which is what the record already said. The owner's go-ahead was given in the
chat and is this acceptance (ADR-001 decision 1), and the record lands on the
trunk directly. Amendments: none.

## Documentation coverage

### Required

- `feedbacks/2026-09-21-cairn-1-2-decisions.md@cfe60ef6` — the owner's
  answers in plain language, with the manifesto's tag on every option; the
  reason behind each ask and the table that maps a question to its asks.
- `feedbacks/2026-09-21-cairn-1-2-the-asks.md@837262d5` — the thirty-six
  technical lines, ticked, with the derived reading under each line whose
  answer picked a variant; the letters W, U, A, P, C, E, J, R and B name the
  note each line came from.

### Conditional

- `docs/architecture/01-cairn-1-1.md` — the page every 1.2 sentence changes
  or keeps; read before the 1.2 page is written, and amended only with
  *superseded by* marks.
- `docs/adr/ADR-001`, `ADR-002`, `ADR-016`, `ADR-017`, `ADR-028`, `ADR-029`
  — the records a 1.2 record supersedes or amends; read before that record
  is written.
- `docs/cairn/manifesto.md` — read whenever a record keeps an option the
  decisions page tagged *adds a rule* or *adds a host reading*; the record
  says what the manifesto's test weighed.
- `spec/index.md`, chapter 3 — the shape of a promotion unit.
- `spec/reference/conformance.md`, the skills and `tools/cairn.mjs` — the
  names of the rules, steps and functions a record changes.
- The ten notes at the folder's level, and the two brainstorm notes of
  2026-09-16 — read when a record needs the incident behind an ask,
  following the letter the asks note gives.

### Deliberately excluded

- `spec/`, `skills/`, `tools/`, `site/`, `.github/` and
  `cairn.config.json` — implementation of 1.2, the work of the coding paths
  this path names; a promotion unit produces no implementation.
- The notes under `feedbacks/` — promotion leaves the notes exactly as
  they were, their provisional status included; where a note moves under
  `feedbacks/1.2/` is the release's, not this path's.
- `README.md` and the site — changed by the release path of 1.2.

## Steps

Forward steps live in [plan.md](./plan.md) until they are executed.

- **S01** — not started.

## Resume

### Checkpoint

```text
commit : the registration commit — this record and the live view, nothing else, on origin/main; unit 0
unit   : 0
base   : 958880f040506961108f136c75e0c18921a9b460
trunk  : 958880f040506961108f136c75e0c18921a9b460 — origin/main at registration
```

### Next action

Start S01 with `cairn-unit` in the path's worktree: ADR-030, ADR-031 and
ADR-032, themes 1 and 2 of the asks note, as the plan's first item says.

### Blockers

None.

### Tried and rejected

- One decision record per ask, thirty-six files — a record states one
  choice, and the lines group into about a dozen choices; a file per line
  is the volume of records the manifesto's first threat names.
- Amending the 1.1 page in place for every 1.2 decision, as the September
  rulings did — five reversals and a new folder of the execution plane are
  a new shape, not an amendment; the 1.1 page keeps its sentences and
  gains *superseded by* marks, the 1.2 page states what changes.
- One promotion path per adopter — the asks are grouped by theme, and one
  theme holds asks from three adopters; the notes are the sources, not the
  scopes.
- Flipping the notes' `status: provisional` when the records land —
  promotion leaves the notes exactly as they were.
- Naming the 1.2 coding paths in this record — they are scoped from the
  records once written; the register names them in the last unit.

### Reading order

1. `feedbacks/2026-09-21-cairn-1-2-decisions.md@cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` — why each ask was taken, in the owner's words.
2. `feedbacks/2026-09-21-cairn-1-2-the-asks.md@837262d5b3a761ef14d14bad0be8278133256e53` — what each record must implement, line by line, with the derived readings.
3. `docs/architecture/01-cairn-1-1.md` — the page 1.2 changes.
4. `project/coding-paths/CP-CAIRN-002/index.md` and `docs/adr/ADR-001-sole-owner-opens-and-closes-a-path.md` — the shape a promotion path and its records follow.
5. `project/coding-paths/CP-CAIRN-012/plan.md` — the order the records are written in.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
