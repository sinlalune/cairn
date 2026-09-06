---
type: Cairn Coding Path
title: Cairn 1.1 — the rulings promoted into decision records and an architecture page
description: The promotion path of 1.1, documents only. The thirty-seven rulings the owner took on 2026-09-06 become decision records under docs/adr/ and one architecture page under docs/architecture/, each bound to the rulings it implements and linked back to the notes it came from; the roadmap register then names the coding paths that will build 1.1.
tags: [coding-path, promotion, cairn-1.1]
timestamp: 2026-09-06T00:00:00Z
cairn:
  id: CP-CAIRN-002
  route: full
  status: running
  current_step: S06
  base_commit: 885072cc786db4d4608ed2d92a1b51cf2ce78b4c
  branch: path/cp-cairn-002
  assigned_writer: cp-cairn-002-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - docs/adr/**
    - docs/architecture/**
    - docs/index.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-002/**
  governs:
    - feedbacks/2026-09-06-cairn-1-1-decisions.md@110cde972d683680bdeb713264a26fd8f9f44acd
    - feedbacks/2026-09-06-cairn-1-1-rulings.md@313f8ea18fe77d0fb6f641ac969989dc4d35a17f
---

# CP-CAIRN-002 — Cairn 1.1 promoted

## Goal

The owner answered the nineteen questions of the
[decisions page](../../../feedbacks/2026-09-06-cairn-1-1-decisions.md) on
2026-09-06 and the [rulings note](../../../feedbacks/2026-09-06-cairn-1-1-rulings.md)
was ticked from those answers: thirty-seven asks taken, two refused, nothing
undecided. Neither note designs anything. This path is the promotion unit of
the specification's chapter 3: the rulings become accepted vision — decision
records that each state one choice with its alternatives and consequences,
and one architecture page that states what a Cairn 1.1 repository is as a
whole — under `docs/adr/` and `docs/architecture/`, which do not exist yet.
The notes are left exactly as they were and every page links back to them as
*promoted from*. No implementation: the specification, the skills, the tools
and the kit are changed by the coding paths this path names in the roadmap
register, not by this one.

## Definition of done

- [ ] `docs/adr/` exists with an index and decision records in the layout's
      shape, `ADR-<NNN>-<decision>.md`, each with parseable frontmatter, a
      stable id, a status, a date, the choice, its context, the alternatives
      rejected and the consequences, and a *promoted from* link to both
      governing notes at the blob ids pinned in this record.
- [ ] Every ticked line of the rulings note — R01, R02, R04 to R10, R12 to
      R39 — is named by exactly one decision record that implements it, and
      the two refused lines, R03 and R11, are named by the record covering
      their theme as refused, with the owner's reason quoted. The four Q19
      answers are covered the same way: the three removals by the records
      that make them, the one kept mechanism by the record that keeps it.
- [ ] `docs/architecture/` exists with an index and one page for Cairn 1.1
      that states, for a repository run by a sole owner with agents, how a
      path opens, runs and closes, what the checker reads at each transition,
      what the documentation plane holds and where, and which tools exist —
      naming every decision record where the page relies on it, and stating
      what 1.1 removes from 1.0.
- [ ] Where a decision record changes what an existing rule, skill, kit file
      or command does, it names that rule, skill, file or command as the
      conformance page, the skills and the kit name it today, so the coding
      path that implements it can be scoped from the record alone.
- [ ] `docs/index.md` lists the two new folders, and the roadmap register in
      `project/coding-paths/index.md` names the milestone of 1.1 and the
      coding paths that build it, each with a path id or *no path yet*, the
      installer's placeholder row gone.
- [ ] The two governing notes and the five adopter notes are byte-identical
      at the candidate to what they are at `base_commit`; nothing under
      `spec/`, `skills/`, `tools/`, `site/` or `.github/` changes.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, and a remote checkpoint.
- [ ] The final candidate contains the trunk tip, is checked, reviewed in the
      pull request's description against the coherence questions, and carries
      the owner's acceptance checkbox, ticked by the owner before the merge.
- [ ] The exact candidate lands through the pull request, the trunk records
      done with one journal entry, the remote result is proved, and the clean
      secondary worktree is removed by the writer, or the failure to remove it
      is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-06T13:41:10Z
scope_ref: project/coding-paths/CP-CAIRN-002/index.md#definition-of-done
scope_digest: sha256:72dbc60530ce02f7eecac47a6b6174fa03b8e8df96fce13ca6fd46ac3803d16c
```

Reviewed in the chat of 2026-09-06: route `full` because the path writes
architecture and decision records, as a documents-only promotion unit; the
definition of done above; writes limited to `docs/adr/`, `docs/architecture/`,
the documentation index, the roadmap register and this folder, with no
overlap because no other path runs; the specification, skills, tools, kit and
the seven notes under `feedbacks/` excluded from change; governed by the
decisions page and the rulings note at their blob ids on `main`; initial
writer `cp-cairn-002-writer`. The owner's go-ahead was given in the chat and
is this acceptance, as the rulings say for a sole owner (R01, from Q1 and
Q19), and the record lands on the trunk directly rather than through a
registration request. Amendments: none.

## Documentation coverage

### Required

- `feedbacks/2026-09-06-cairn-1-1-decisions.md@110cde97` — the owner's
  answers in plain language, with the manifesto's tag on every option; the
  reason behind each ruling and the table that maps a question to its
  rulings.
- `feedbacks/2026-09-06-cairn-1-1-rulings.md@313f8ea1` — the thirty-nine
  technical lines, ticked or refused, that the decision records implement one
  by one; the letters G, C, K, A and O name the note each line came from.

### Conditional

- `docs/cairn/manifesto.md` — read whenever a decision record keeps an
  option the decisions page tagged *adds a rule*; the record must say what
  the manifesto's test weighed.
- `spec/index.md`, chapter 3 — the shape of a promotion unit and of the two
  page kinds, read before the first record is written.
- `spec/reference/repository-layout.md` and `spec/reference/conformance.md`
  — the file shapes under `docs/`, and the names of the rules a record
  changes.
- The five adopter notes under `feedbacks/` — read when a record needs the
  incident behind a ruling, following the letter the rulings note gives.

### Deliberately excluded

- `spec/`, `skills/`, `tools/`, `site/`, `.github/` and
  `cairn.config.json` — implementation of 1.1, the work of the coding paths
  this path names; a promotion unit produces no implementation.
- The seven notes under `feedbacks/` — promotion leaves the notes exactly as
  they were, their provisional status included.
- `README.md` and the site — the readable page per product surface (R32) is
  designed here and written by the paths that build 1.1.

## Steps

Forward steps live in [plan.md](./plan.md) until they are executed.

- **[S01](./steps/S01.md)** — `docs/adr/` and `docs/architecture/` with their indexes, `docs/index.md` listing them, numbering settled from ADR-001 with the eight cited Atomik numbers reserved, and ADR-001 on how a sole owner opens and closes a path (R01, R02, R04, R05, R06, R08; R03 refused).
- **[S02](./steps/S02.md)** — the reservation of the eight cited numbers dropped on the owner's word: records count from ADR-001 with no gaps, and the stale citations are replaced by the paths of 1.1; the plan's remaining items shift to S03 to S06.
- **[S03](./steps/S03.md)** — theme 2 as four records: ADR-002 the checkboxes stay and the seal is checked at every transition (R10; R11 refused), ADR-003 two live paths on the same files (R12), ADR-004 the checker reads what it did not (R09, R13 to R17), ADR-005 one run per commit that can land (R07).
- **[S04](./steps/S04.md)** — themes 3 and 4 as five records: ADR-006 what closing leaves behind (R23, R24), ADR-007 a framework writes into the bootloader (R21), ADR-008 housekeeping with no choice in it (R18, R19, R20, R22, R28, R29, R38), ADR-009 what the unit skill tells the agent (R25, R26, R27), ADR-010 the module note describes now (R39, R30).
- **[S05](./steps/S05.md)** — themes 5 and 6 as four records: ADR-011 the adopter's documentation plane (R31, R34, R35), ADR-012 a page a newcomer reads first (R32), ADR-013 a local pointer to the protocol (R33), ADR-014 two tools of 1.1 (R36, R37). Every ticked line of the rulings note is now named by one record.
- **[S06](./steps/S06.md)** — the architecture page `docs/architecture/01-cairn-1-1.md`, promoted from the two notes through ADR-001 to ADR-014 and stating what 1.1 removes; the roadmap register with the 1.0 and 1.1 milestones and the five coding paths of 1.1, each *no path yet*, the installer's row gone.

## Resume

### Checkpoint

```text
commit : 77dade74110c5afb198ee492cb2fdace97efce09 — S05, unit 05, on origin/path/cp-cairn-002, CI run 34046418841 green; S06's own commit follows it and is named here by the administrative commit
unit   : 06 (S06, pushed)
base   : 885072cc786db4d4608ed2d92a1b51cf2ce78b4c
trunk  : ec1e53502005142a117e8eeed0b8ae709cd95dd9 — origin/main after registration; unchanged since
```

### Next action

Close the path with the `cairn-close` skill: fetch and merge `origin/main`
in, run the gates bare on the result, take its object id as candidate `C`,
run `npm run cairn-audit -- --subject <C>` and open the pull request from
`path/cp-cairn-002` to `main` with that description, the four coherence
questions answered, the advisories disposed, and the owner's acceptance
checkbox (ADR-001, decision 3) unticked. The owner reads the fourteen
records and the page, ticks the box; then the administrative commit
(`ready`, `subject_commit: C`, the live view, this checkpoint at `C`), the
owner merges after the request's run is green, the integrating unit and
the journal entry land on the trunk, and the worktree is removed.

### Blockers

None.

### Tried and rejected

- Registering through a `register/` branch and a pull request, as the open
  skill's `pull-request` sequence says — the owner refused it in Q1 and Q19;
  the go-ahead in the chat is the acceptance and the record lands directly.
- Declaring `transport.registration: manual-git` in the registration commit —
  the declaration is a control-plane change, and how a sole owner's
  repository registers on a forge whose ruleset requires a request is exactly
  what the first decision record must settle; the commit stays record and
  view only, as the open skill says. Settled in S01 by ADR-001 decision 1
  and decision 6; the declaration itself is changed by the coding path that
  implements the record.
- Pinning the manifesto in `governs:` beside the two notes — every option on
  the decisions page already carries the manifesto's tag, and a third pin
  would widen the drift predicate over a document this path never contests;
  it is conditional reading instead.
- One decision record per ruling line, thirty-seven files — a record states
  one choice, and the lines group into a dozen choices; a file per line is
  the volume of records the manifesto's first threat names. S01 wrote theme
  1 as one record with seven numbered decisions.
- Flipping the notes' `status: provisional` when the records land —
  promotion leaves the notes exactly as they were; the records point back
  to them, they do not rewrite them.
- Reserving the eight decision numbers the specification and tools cite
  from the earlier repository, so they could never be reissued here — done
  in S01, dropped in S02 on the owner's word: it kept a foreign numbering
  alive to protect citations that point at nothing; the paths of 1.1
  replace the citations instead.
- Landing records as `proposed` and flipping them at merge — the
  administrative commit carries nothing but closure metadata, so the flip
  would cost a unit; a record of a decision the owner already took lands
  `accepted`, dated the decision.

### Reading order

1. `feedbacks/2026-09-06-cairn-1-1-decisions.md@110cde972d683680bdeb713264a26fd8f9f44acd` — why each ruling was taken, in the owner's words.
2. `feedbacks/2026-09-06-cairn-1-1-rulings.md@313f8ea18fe77d0fb6f641ac969989dc4d35a17f` — what each record must implement, line by line.
3. `spec/index.md`, chapter 3 — what a promotion unit adds, amends, links and leaves alone.
4. `spec/reference/repository-layout.md` — the shapes of `docs/adr/` and `docs/architecture/`.
5. `project/coding-paths/CP-CAIRN-002/plan.md` — the order the records are written in.
6. `docs/adr/ADR-001-sole-owner-opens-and-closes-a-path.md` — the shape every later record follows.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
