---
type: Cairn Coding Path
title: The pedagogy — the owner's twelve answers promoted into decision records and the 1.1 page
description: The promotion path of the pedagogy, documents only. The twelve answers the owner gave on 2026-09-09 to the pedagogy feedback, and the manifesto's new pedagogy section, become decision records under docs/adr/ and amendments to the Cairn 1.1 architecture page; the roadmap register then names, in the coding paths of 1.1, the surfaces that build them. The last promotion before the coding paths of 1.1 open.
tags: [coding-path, promotion, pedagogy, cairn-1.1]
timestamp: 2026-09-09T00:00:00Z
cairn:
  id: CP-CAIRN-004
  route: full
  status: running
  current_step: S05
  base_commit: 42927d633011b3f64d9d564fd0e14197980cbf4b
  branch: path/cp-cairn-004
  assigned_writer: cp-cairn-004-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - docs/adr/**
    - docs/architecture/**
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-004/**
  governs:
    - feedbacks/2026-09-08-owner-feedback-pedagogy.md@e9bd3e92aa7c6336f92e715140f744aeb8385d02
    - docs/cairn/manifesto-pedagogy-2026-09-09.md@57d2e87a3caafab19ba36fa794d7ab342e2a87e1
    - manifesto.md@9ceac51ca54504bf48fa0fee85c4e3875ccb7535
    - docs/architecture/01-cairn-1-1.md@a76f420fc42ec211067ce5ddc897cde285a03227
---

# CP-CAIRN-004 — the pedagogy promoted

## Goal

The owner answered the twelve questions of the
[pedagogy feedback](../../../feedbacks/2026-09-08-owner-feedback-pedagogy.md)
on 2026-09-09, nine by a tick and two, P6 and P10, in their own words, and
had the manifesto's pedagogy section written from the same pages as a
[dated statement](../../../docs/cairn/manifesto-pedagogy-2026-09-09.md)
that the edited edition now follows. The note designs nothing. This path
is the promotion unit of the specification's chapter 3: the answers become
accepted vision — decision records that each state one choice with its
alternatives and consequences, and the
[Cairn 1.1 page](../../../docs/architecture/01-cairn-1-1.md) amended where
an answer changes what a session writes, what a learning session is, or
which pages a reader meets — under `docs/adr/` and `docs/architecture/`.
The note, the statement and the manifesto are left exactly as they were
and every record links back to them as *promoted from*. No
implementation: the bootloader, the skills, the templates, the kit and the
specification are changed by the coding paths of 1.1 that the roadmap
register names, which this path widens to carry the new records. This is
the last promotion before those paths open.

## Definition of done

- [ ] Three decision records, ADR-021 to ADR-023, exist in the layout's
      shape with parseable frontmatter, a stable id, a status, a date, the
      choice, its context, the alternatives rejected, the consequences,
      what the manifesto's test weighed, and a *promoted from* link to the
      feedback note and to the statement at the blob ids pinned in this
      record; the index of `docs/adr/` lists them with no gap after
      ADR-020.
- [ ] Every answer, P1 to P12, is named by exactly one decision record
      that implements it, and every option the owner did not tick is named
      by the same record as rejected, with the tag the note gave it; the
      owner's own words under P6 and P10 are quoted and implemented as
      written: what a session writes for its reader (P1, P5, P6), the
      learning note, the learning session and its offer (P2, P3, P4), the
      pages a reader meets (P7 to P11); P12 is named as done by the
      statement and drives no record.
- [ ] The Cairn 1.1 architecture page states, naming the record behind
      each sentence: how a session speaks and how it puts a question to
      the owner; what a request and a plan open with; what a learning note
      is, where it lives and which skill writes it; which pages a reader
      meets and who writes the API documentation; and it links back to the
      note and the statement as *promoted from* at the blob ids pinned in
      this record, without rewriting anything to look as if it had always
      been so. ADR-011 is extended where the `learning` folder gains
      ordered notes and ADR-013 where the pointer page names a sixth
      skill; no 1.1 record is superseded, and the page says so.
- [ ] Where a decision record changes what an existing rule, skill,
      template, kit file or command does, it names that rule, skill,
      template, file or command as the conformance page, the skills and
      the kit name it today, so the coding path that implements it can be
      scoped from the record alone; the record of the sixth skill names
      the bootloader's entry route and the pointer page as the surfaces
      that list it, and says how the kit's file budget of ADR-013 pays for
      the file — a removal named, or the budget re-measured by the release
      path.
- [ ] The roadmap register in `project/coding-paths/index.md` names, in
      the rows of the coding paths of 1.1, the new records each one
      implements and the surfaces they add — the skill, the sentences and
      the request and path templates in path 1; the bootloader lines, the
      pointer page, the page templates, chapters 3 and 6 in path 4; this
      repository's README in path 5 — with no new path and no path opened.
- [ ] The three governing notes — the feedback note, the statement and
      the manifesto's edition — are byte-identical at the candidate to
      what they are at `base_commit`; the fourth governing document, the
      1.1 architecture page, is the one this path amends; nothing under `spec/`, `skills/`, `tools/`, `site/`,
      `.github/`, `feedbacks/`, `docs/cairn/`, `cairn.config.json` or
      `manifesto.md` changes.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, and a `#### Review` section carrying
      the fresh-context read of its diff with each finding's disposition,
      as ADR-017 asks.
- [ ] The final candidate contains the trunk tip, is checked, and is
      reviewed in the pull request's description, which opens with three
      plain lines as P5 asks and answers the definition of done item by
      item as ADR-018 asks, before the coherence questions; the owner
      reads the pages before the merge, and the merge is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-09T09:20:04Z
scope_ref: project/coding-paths/CP-CAIRN-004/index.md#definition-of-done
scope_digest: sha256:5c643b4db57db6a202fd70775b901ee80f0fdb6f03fd65804d07a880017e19cf
```

Reviewed in the chat of 2026-09-09: route `full` because the path writes
architecture and decision records, as a documents-only promotion unit; the
definition of done above; writes limited to `docs/adr/`,
`docs/architecture/`, the roadmap register and this folder, with no overlap
because no other path runs; the specification, skills, tools, kit, site,
workflow, configuration, bootloader, the feedback note, the statement and
the manifesto excluded from change; governed by the note, the statement,
the edition and the 1.1 page at their blob ids on `main`; initial writer
`cp-cairn-004-writer`. The owner read the plan — three records ADR-021 to
ADR-023, the 1.1 page amended, the register's rows 1, 4 and 5 widened, no
sixth coding path — and gave the go-ahead in the chat with the word "yes";
that go-ahead is this acceptance (ADR-001, decisions 1 and 2), and the
record lands on the trunk directly. Amendments: one, below.

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-09T10:07:57Z
scope_ref: project/coding-paths/CP-CAIRN-004/index.md#definition-of-done
scope_digest: sha256:5870740e8b79bbcbe53c85693a9f1999463d8e0fb2903acc36f1150e511e04cb
supersedes: sha256:5c643b4db57db6a202fd70775b901ee80f0fdb6f03fd65804d07a880017e19cf
```

Amendment of 2026-09-09, before the candidate: item 6 of the definition
of done said the four governing documents are byte-identical at the
candidate, and the 1.1 architecture page is one of the four and the
document this path amends by its goal and its item 3; the item
contradicted the goal. The question was put to the owner in the chat
with two ways to go on, the first stating the amended item in substance
— the three notes byte-identical, the page the document the path amends
— and the second keeping the item and undoing the page's amendment; the
owner answered *"choose for me"*, and the writer chose the first.
Nothing else in the definition of done changed.

## Documentation coverage

### Required

- `feedbacks/2026-09-08-owner-feedback-pedagogy.md@e9bd3e92` — the four
  pages transcribed, the readings against 1.1, the twelve answers with
  their tags, the owner's words under P6 and P10, and the table of what
  each answer drives.
- `docs/cairn/manifesto-pedagogy-2026-09-09.md@57d2e87a` — the owner's
  statement the records cite as the vision they promote; the pages win
  where the two differ.
- `docs/architecture/01-cairn-1-1.md@a76f420f` — the page this path
  amends, read before any record is written so that no sentence of it is
  contradicted without a superseding record.

### Conditional

- `manifesto.md@9ceac51c` — read whenever a record keeps an option the
  note tagged *adds a file* or *adds a rule*; P3 is the one such answer,
  and its record must say what the manifesto's test weighed.
- `docs/adr/ADR-011`, `ADR-012`, `ADR-013`, `ADR-015`, `ADR-017`,
  `ADR-018` — the records the new ones extend or build on: the concept
  folders, the surface page, the pointer page and the kit budget, the
  review movement, the request's item-by-item answer.
- `spec/index.md`, chapters 3 and 6 — the promotion's outputs and the
  learning loop, whose paragraphs the records change by name.
- `spec/reference/conformance.md`, `skills/*/SKILL.md`,
  `spec/reference/path-template.md`, `.github/pull_request_template.md`,
  `tools/cairn.mjs`, `AGENTS.md` — the names of the rules, skills,
  templates, kit files and bootloader lines a record changes.

### Deliberately excluded

- `spec/`, `skills/`, `tools/`, `site/`, `.github/`, `AGENTS.md` and
  `cairn.config.json` — implementation, the work of the coding paths of
  1.1; a promotion unit produces no implementation.
- `feedbacks/**`, `docs/cairn/**`, `manifesto.md` — read, never written;
  a change to the manifesto is the owner's own.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- **[S01](./steps/S01.md)** — ADR-021, what a session writes for its reader: one line in the bootloader for the tone (P1), three plain lines before the ledger in the request and in the record's goal (P5), a question to the owner put in the chat and well signalled as what it is, in the owner's words (P6); five options refused, a file among them; the fresh read's twelve findings and the bounded second read's two, dispositioned in the step.
- **[S02](./steps/S02.md)** — ADR-022, the learning note and the learning session: a learning note is a concept note with an order in `docs/concepts/learning` (P2), a sixth skill `cairn-learn` listed by the bootloader and the pointer page, the thirtieth kit file and the budget's target moved to *at most thirty* (P3), a unit writes the note, offers the session and parks it (P4); five options refused; the fresh read's nine findings and the second read's one, dispositioned in the step.
- **[S03](./steps/S03.md)** — ADR-023, the pages a reader meets: the README above the surface pages (P7), a flow page as an architecture page of kind flow with a diagram and no new folder (P8), one diagram on the architecture page and one worked example first on the surface page (P9), no Cairn API page and the agent keeping the API documentation, in the owner's words (P10), nothing more on search (P11); eight options refused; the fresh read's eleven findings dispositioned, the second read clean.
- **[S04](./steps/S04.md)** — the 1.1 architecture page amended in place with ADR-021 to ADR-023, each added sentence naming its record and marked *since 2026-09-09*, the two sources linked at their blob ids and the manifesto's edition named, six 1.1 records extended and none superseded, a closing section on the two readers; the architecture index refreshed; the register's rows 1, 3, 4 and 5 widened and the milestone row counting twenty-three records and three promotions, no path opened; the fresh read's eleven findings and the second read's two, dispositioned in the step.
- **[S05](./steps/S05.md)** — item 6 of the definition of done amended before the candidate: the three notes byte-identical, the page the document the path amends; a second acceptance block superseding the first, the owner's *"choose for me"* quoted; the fresh read's five findings and the second read's three, dispositioned in the step. This unit's commit is the candidate.

## Resume

### Checkpoint

```text
commit : 710236c8629202583d1e15ebe9139b4de8840a94 — S04, unit 04, on origin/path/cp-cairn-004 with its run green; S05 is the unit after it and the candidate C, named by the administrative commit once pushed
unit   : 5 (S05)
base   : 42927d633011b3f64d9d564fd0e14197980cbf4b
trunk  : eca8384 — origin/main, the registration commit, contained in the branch
```

### Next action

From the worktree `../cairn-cp-cairn-004` on branch `path/cp-cairn-004`:
Close with `cairn-close`: the trunk tip `eca8384` is contained in the
branch; the gates ran bare on S05's commit, which is `C`; open the request from `path/cp-cairn-004` to `main` with three plain
lines first, the definition of done item by item, then the ledger
`cairn-audit` prints; then the one administrative commit — `ready`,
`subject_commit`, the checkpoint, the live view — and the owner reads
the three records and the page before the merge.

### Blockers

None.

### Tried and rejected

- A sixth coding path for the new records — paths 1, 4 and 5 of the 1.1
  register already own the skills, the kit and the release; the
  register's rows are widened instead, as CP-CAIRN-003 did.
- Four records, one per theme of the note — P5 belongs with what a
  session writes, not with the pages; P11 is kept as today and needs no
  record of its own; three records carry the twelve answers.
- Superseding ADR-011 for the `learning` folder — the folder keeps its
  name and its meaning; ordered notes are added to what it holds, which
  is an extension, not a reversal.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md`.
2. `feedbacks/2026-09-08-owner-feedback-pedagogy.md@e9bd3e92aa7c6336f92e715140f744aeb8385d02` — the twelve answers and the table of what each drives.
3. `docs/cairn/manifesto-pedagogy-2026-09-09.md@57d2e87a3caafab19ba36fa794d7ab342e2a87e1` — the statement.
4. `docs/architecture/01-cairn-1-1.md@a76f420fc42ec211067ce5ddc897cde285a03227` — the page this path amends.
5. `docs/adr/ADR-021`, `ADR-022` and `ADR-023` — the three records of this path; `docs/architecture/01-cairn-1-1.md` — the page as amended; `skills/cairn-close/SKILL.md` and its reference — the closing sequence.
6. `project/coding-paths/CP-CAIRN-004/plan.md`, then the section of the note the unit promotes.

### Verify

```bash
npm run cairn-check
```
