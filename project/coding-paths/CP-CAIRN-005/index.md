---
type: Cairn Coding Path
title: Coding path 1 of 1.1 — the transports and the skills
description: The first implementation path of Cairn 1.1, row 1 of the roadmap register. Registration on the trunk for a sole owner, the owner's plan review and try before the merge, the sentences the open, unit and close skills gain from twenty-three records, the coding stance cut to Cairn's own, the sixth skill cairn-learn, chapter 5 and the work-unit concept, the path template and the request template, the configuration and the binding.
tags: [coding-path, implementation, cairn-1.1, skills, transports]
timestamp: 2026-09-09T00:00:00Z
cairn:
  id: CP-CAIRN-005
  route: full
  status: running
  current_step: S05
  base_commit: 1b955234563f9d5c86d7416852db2c19a03df2b0
  branch: path/cp-cairn-005
  assigned_writer: cp-cairn-005-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - skills/**
    - AGENTS.md
    - spec/index.md
    - spec/concepts/work-unit.md
    - spec/reference/path-template.md
    - spec/reference/configuration.md
    - .github/pull_request_template.md
    - cairn.config.json
    - project/coding-paths/binding.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-005/**
  governs:
    - docs/architecture/01-cairn-1-1.md@8190acfa186af205a8f1d4b35c3c0e684f11a9f3
    - docs/adr/ADR-001-sole-owner-opens-and-closes-a-path.md@c1feab4c345806f5d014b4677924a707ab9aaace
    - docs/adr/ADR-002-the-checkboxes-stay-and-the-seal-is-checked-everywhere.md@e81fde2a0c5043cdba1c8226f997ac9bf600acca
    - docs/adr/ADR-006-what-closing-leaves-behind.md@4af96206a63fc8fd38a21031d3c7483c8dc24102
    - docs/adr/ADR-007-a-framework-writes-into-the-bootloader.md@98f21e95679585311869ac710641867ae33ba46b
    - docs/adr/ADR-008-housekeeping-with-no-choice-in-it.md@c4accd293ec3d2d546bd5e86c232c08406c357d4
    - docs/adr/ADR-009-what-the-unit-skill-tells-the-agent.md@da66d0860bf3a34f009117ae40ff2f578b69c380
    - docs/adr/ADR-010-the-module-note-describes-now.md@d5000f3a3cd609b1341a4566eaea0f20954bb61d
    - docs/adr/ADR-014-two-tools-of-1-1.md@f27627d460a3d8494866df8bb4c256be0a18f540
    - docs/adr/ADR-016-the-coding-stance-absorbs-ponytail.md@c611ca0e2a02b090914f066b1ff4020aa311304f
    - docs/adr/ADR-017-the-review-movement.md@00be46249d9f3e1a7aa5ed1432c023b7a14fd696
    - docs/adr/ADR-018-two-sentences-of-the-cycle.md@f60c1ec05a742c831a3f69af474a881d21725fdb
    - docs/adr/ADR-019-an-area-is-a-folder-of-the-tree.md@9b9e0f7a337937f868ef657a68079865bd7755d9
    - docs/adr/ADR-020-the-one-edge-and-the-one-writer.md@4dabfb709137dd9112c69e0b994514748cab4b69
    - docs/adr/ADR-021-what-a-session-writes-for-its-reader.md@723d1411a4b4ed338f0c89decffae38d4c3554fe
    - docs/adr/ADR-022-the-learning-note-and-the-learning-session.md@04d8a28c43b28d4d424208ecda6c1b7222ae7e01
    - docs/adr/ADR-023-the-pages-a-reader-meets.md@81194665cacf4e69d39fb2ce3a9c6411d23bd9a1
---

# CP-CAIRN-005 — the transports and the skills

## Goal

This path makes the skills say what the records of 1.1 decided, so that
the next path an agent runs follows them without reading a record. It
is the least because it touches only the surfaces row 1 of the register
names — the five skills and the sixth, chapter 5 and its concept, the
two templates, the configuration and the binding — and each sentence it
adds is scoped from the record that decided it. It does not touch the
checker, the tools, the kit's installer, the workflow, the chapters
other than 5, the layout, the README or the site: those are paths 2 to
5.

Row 1 of the [roadmap register](../index.md) scopes it, and the
[1.1 page](../../../docs/architecture/01-cairn-1-1.md) states the shape
every sentence must match. The decisions it implements, by the surface
they change: registration on the trunk and the owner's two named steps
(ADR-001 decisions 1 to 5); the definition of done never edited in place
(ADR-002 decision 2); what closing leaves behind (ADR-006); a framework's
block moved (ADR-007); no closure step, the administrative commit, the
gate by exit code (ADR-008 decisions 1, 3, 7); what the unit skill tells
the agent (ADR-009); the open skill asking which area (ADR-010 decision
2); the post-mortem's sentence (ADR-014 decision 2); the stance cut to
Cairn's own, the five tags, the two lines, the reader's criteria (ADR-016
decisions 1 to 4); the review movement (ADR-017); the failing test first
and the request item by item (ADR-018); an area as a folder, the
whole-root reason (ADR-019 decisions 1 and 3); the helper agent as the
writer (ADR-020 decision 2); three plain lines and the question in the
chat (ADR-021 decisions 2 and 3); the sixth skill and the offer of a
session (ADR-022 decisions 2 and 3); the README's line and the API
refresh (ADR-023 decisions 1 and 4).

## Definition of done

- [ ] `cairn.config.json` declares `transport.registration: manual-git`
      and the binding names it; the `cairn-open` skill and its reference
      say that a sole owner's plan review is a named step, that a change
      asked before the go-ahead is written into the record, that the
      owner's yes in the chat is the opening acceptance written with the
      owner as `accepted_by` and the digest computed by the checker, and
      that the registration commit lands on the trunk directly with no
      `register/` branch and no request (ADR-001 decisions 1 and 2); the
      open skill asks which area a path writes in, and a path that needs
      a whole source root says why (ADR-010 decision 2, ADR-019 decision
      3); it says the record's goal opens with three plain lines and that
      the question to the owner is put in the chat, signalled as a
      decision, with what happened and the ways to go on, and nothing
      further until the answer (ADR-021 decisions 2 and 3).
- [ ] The `cairn-unit` skill, its reference, chapter 5's section on the
      work unit and `spec/concepts/work-unit.md` say a unit has five
      movements — plan, change, self-review, review, verify — the review
      being the writer's own agent in a fresh context given the diff and
      the two criteria and nothing else, its findings and dispositions in
      a `#### Review` section, a fix read once more on its own lines and
      not a third time (ADR-017); the self-review in Ponytail's five tags
      ending with the net line count or *Lean already* (ADR-016 decision
      2); the plan naming the definition-of-done item it advances,
      `repair` meaning a named protocol violation, no object id typed by
      hand (ADR-009); the failing test first when behaviour changes and no
      new test when only structure does (ADR-018 decision 1); a fresh
      worktree installing its dependencies before the first gate and
      every gate read by its exit code (ADR-008 decision 7); a framework's
      block in the bootloader moved to a file the kit does not own
      (ADR-007); a helper agent inside the writer's session being the
      writer (ADR-020 decision 2); a decision a unit cannot make put to
      the owner in the chat (ADR-021 decision 3); an explained abstraction
      written as a concept note with a learning session offered and
      parked (ADR-022 decision 3); an API's documentation refreshed with
      the module note (ADR-023 decision 4).
- [ ] The `cairn-close` skill and its reference say there is no closure
      step and no step file for the review, the candidate being the last
      unit's commit (ADR-008 decision 1); that the request's description
      opens with three plain lines and a link to the surface's page, then
      the definition of done item by item, then the ledger (ADR-021
      decision 2, ADR-018 decision 2); that whoever reads the diff reads
      it against the ladder and for correctness only (ADR-016 decision 4);
      that the owner tries the result before the merge as a named step
      asked for in the chat, and merges only after the request's run on
      the exact commit is read green, as a merge commit, the click being
      the whole acceptance (ADR-001 decisions 3 to 5, ADR-021 decision
      3); that the administrative commit carries `ready`, `subject_commit`,
      the live view and the checkpoint and nothing else (ADR-008 decision
      3); that the closing review asks whether the README lists a surface
      the path added (ADR-023 decision 1); that after the merge every
      transport branch is deleted, `path/<id>` stays until archived, and
      the clean worktree is removed from another checkout or the failure
      reported (ADR-006); and that a red run's post-mortem is read before
      the next unit (ADR-014 decision 2).
- [ ] `skills/cairn-code/SKILL.md` keeps only Cairn's own — deletion
      turned on the protocol, the test that never fires, the three-line
      step, absorbing the ecosystem — and two lines on secrets and errors,
      and points at Ponytail at the tag ADR-016 names for the ladder and
      the review; nothing Ponytail says is repeated (ADR-016 decisions 1
      and 3).
- [ ] `skills/cairn-learn/SKILL.md` exists, the sixth skill, and says
      what a learning session reads first, how it explores what the user
      knows by prompting, what it writes — a learning note as a concept
      note with an order in the `learning` folder, a concept note for
      every word it needed — and how it ends, the note linked from a
      document outside the concept root (ADR-022 decision 2); the
      bootloader's *start here* item in this repository names it beside
      the five.
- [ ] `spec/reference/path-template.md` shows the goal opening with three
      plain lines, the step's self-review in the five tags, the `####
      Review` section, and the amendment as a second acceptance block that
      never edits the definition of done in place (ADR-021 decision 2,
      ADR-016 decision 2, ADR-017, ADR-002 decision 2);
      `.github/pull_request_template.md` opens with the three lines and
      the surface link, then the definition of done item by item, before
      `## Candidate` (ADR-021 decision 2, ADR-018 decision 2);
      `spec/reference/configuration.md` says an area is a folder of the
      tree and `writes:` is the named areas' patterns (ADR-019 decisions 1
      and 3).
- [ ] Every sentence added names no record: the skills say what to do,
      and the records stay where they are; the checker, `tools/`, the
      workflow, chapters 1 to 4 and 6, the layout reference, the README
      and the site are unchanged, and the eighteen governing documents are
      byte-identical at the candidate to what they are at `base_commit`;
      the register, a write surface, gains this path's id in row 1 and
      nothing else.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, and a `#### Review` section carrying
      the fresh-context read of its diff with each finding's disposition
      and the bounded second read (ADR-017); the self-review speaks in the
      five tags.
- [ ] The final candidate contains the trunk tip, is checked, and is
      reviewed in the pull request's description, which opens with three
      plain lines and answers the definition of done item by item before
      the coherence questions; the owner reads the skills before the
      merge, and the merge is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-09T14:23:03Z
scope_ref: project/coding-paths/CP-CAIRN-005/index.md#definition-of-done
scope_digest: sha256:da5ba24ebbf42d0d97f59edd01b2b7b8fefc0ccd108c93bc604a425d96e2a9bb
```

Reviewed in the chat of 2026-09-09: route `full` because the path
changes the control plane — the skills, chapter 5, the templates, the
configuration and the binding; the definition of done above; writes
limited to those surfaces, the register's row and this folder, with no
overlap because no other path runs; the checker, the tools, the
workflow, the other chapters, the layout, the README, the site and every
record excluded from change; governed by the 1.1 page and the seventeen
records row 1 implements, at their blob ids on `main`; initial writer
`cp-cairn-005-writer`. The owner read the plan — six units, one path
for the six skills, the register as a write surface — and gave the
go-ahead in the chat with the word "yes"; that go-ahead is this
acceptance (ADR-001, decisions 1 and 2), and the record lands on the
trunk directly. The owner said the units run in a fresh session.
Amendments: none.

## Documentation coverage

### Required

- `project/coding-paths/index.md@ae454f89`, row 1 — the scope: the
  outcome, the records and the surfaces this path owns.
- `docs/architecture/01-cairn-1-1.md@8190acfa` — the shape every added
  sentence must match; read before any skill is edited.
- The seventeen records pinned in `governs:` — each unit reads the
  records its surface implements, at their *What implements this record*
  tables, and nothing else of them.

### Conditional

- `docs/cairn/manifesto.md` and `manifesto.md` — read whenever a sentence
  added would add a check or a step the record did not name; the answer
  is to add the sentence the record names and stop.
- `spec/index.md`, chapters 3 and 6 — read only so that chapter 5's
  edits contradict neither; they are path 4's to change.
- `tools/cairn-check.mjs`, `tools/cairn-audit.mjs` — read to name the
  rule or the output a sentence refers to, never written.
- The Ponytail repository at the tag ADR-016 names — read so that
  `cairn-code` repeats none of it.

### Deliberately excluded

- `tools/**`, `.github/workflows/**`, `spec/reference/conformance.md`,
  `spec/reference/repository-layout.md`, `README.md`, `site/**`,
  `AGENTS.md` as the kit writes it — paths 2 to 5.
- `docs/adr/**`, `docs/architecture/**` — read, never written; a record
  found wrong is a superseding record by a later path, and this path
  says so in its step and implements the record as it stands.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- [**S01**](./steps/S01.md) — the open skill, the configuration and the
  binding: `transport.registration: manual-git` declared and named in the
  binding, the plan review as step 2 with the question in the chat and the
  go-ahead as the acceptance, the areas and the whole-root reason and the
  goal's three plain lines in step 1, the registration commit on the trunk
  directly and the `register/` sequence dropped from the reference —
  **complete**
- [**S02**](./steps/S02.md) — the unit skill, chapter 5 and the work-unit
  concept: five movements with the review between the self-review and
  verify, the self-review in the five tags, the definition-of-done item
  and `repair` in the plan, the failing test first, the API refreshed, the
  concept note's offered session, the decision put to the owner, the
  dependencies and the framework's block and the helper agent in step 0,
  the reference's exit codes and provisional trailer, and the two
  sentences whose records name `cairn-open` and `cairn-code` —
  **complete**
- [**S03**](./steps/S03.md) — the close skill and the request template:
  no closure step, the description's order with the three lines and the
  surface link and the definition of done item by item, the README
  question, the two criteria, the owner's try asked in the chat, the merge
  click, the green run on the exact commit, the transport's branches
  deleted and the worktree removed by the writer; the template reordered;
  the unit skill's suite sentence and its `closure` row — **complete**
- [**S04**](./steps/S04.md) — the stance cut to Cairn's own, and the sixth
  skill: `cairn-code` reduced to deletion turned on the protocol, the test
  that never fires, the three-line cap, absorbing the ecosystem and the two
  lines, pointing at Ponytail at `v4.9.0` for the ladder and the tags;
  `cairn-learn` written; `AGENTS.md` naming six skills; the unit and close
  skills saying where the ladder now lives — **complete**
- [**S05**](./steps/S05.md) — the path template and the configuration
  reference: the goal's three lines, the plan's item, the self-review in
  the five tags, the `#### Review` section with both reads given a fresh
  context, ticks never added; the `areas` row saying an area is a folder
  and when a second entry is added; the open skill's two clauses —
  **complete**
- **S06** — not started

## Resume

### Checkpoint

```text
commit : db030f7212572a2f5c7cf4bddee030f3e74a1d59 — S04, pushed, forge run green
unit   : 4 — S05 is complete in the working tree; its commit id is recorded here by S06
base   : 1b955234563f9d5c86d7416852db2c19a03df2b0
trunk  : 1b955234563f9d5c86d7416852db2c19a03df2b0 — origin/main at registration
```

### Next action

From the worktree `../cairn-cp-cairn-005` on branch `path/cp-cairn-005`:
run S06, the candidate, with `cairn-close`. Merge `origin/main` in, run
`cairn-check`, `cairn-active --check` and `npm test` bare on that commit,
push it, and open the request with the description in the order S03 wrote
into the close skill — three plain lines and the surface link, the
definition of done item by item, then the ledger `cairn-audit` prints.
Two items are answered less a clause and one is answered by a file the
item does not name; *tried and rejected* below says which and why, and
the description says the same. The owner reads the six skills and the two
references before the merge, asked for in the chat as a decision.

### Blockers

None.

### Tried and rejected

- Splitting the path by skill — five paths whose `writes:` all meet in
  `skills/**` and chapter 5; one path, one writer, one worktree, as the
  register scopes it.
- Pinning the twenty-three records — the seven that no surface of row 1
  implements (ADR-003, ADR-004, ADR-005, ADR-011, ADR-012, ADR-013,
  ADR-015) govern paths 2 to 5 and are read through the 1.1 page here.
- Pinning the register in `governs:` — it is a write surface of this
  path, as CP-CAIRN-004's page was, and a governed document a path
  writes is the trap that path's item 6 fell into; the register is read
  at its blob and named in the coverage instead.
- Touching the checker for the `review` rule ADR-017 adds — path 2's;
  the skill says the section exists, and the rule follows.
- Correcting `README.md`, whose line *plan, change, self-review, verify*
  S02's five movements make false (S02's review) — the register gives the
  README to path 5, and item 6 of the definition of done requires it
  unchanged here. Path 5 owes that line.
- Answering item 6's clause *`writes:` is the named areas' patterns* from
  the open skill alone (S05) — ADR-019 decision 3's table names
  `cairn-open` step 1 and no other file, but the item names the
  configuration reference. The `areas` row carries it too, stated in the
  direction that is true: a path writing in an area declares that area's
  patterns. The item is answered as sealed.
- Writing *never edited in place* into the two files that describe the
  definition of done (S05) — ADR-002 decision 2's own sentence reads that
  way, and it is false here: `72f62d9` amended CP-CAIRN-004's item 6 by
  editing it and recording a second acceptance block with the new digest,
  which is the mechanism working. Both files say only that ticks are never
  added; the amendment sentence each already carried says the rest.
- Writing this repository's `AGENTS.md` under row 1 rather than row 4
  (S04) — the register gives `AGENTS.md` to row 4, and item 5 of the
  definition of done gives the six-skill line to this path. The line is
  written here, because acceptance binds the item and a bootloader listing
  five skills beside six is wrong on landing; item 7 forbids the register
  edit that would settle it, so path 4 finds the item made and owes only
  the kit's bootloader text in `tools/cairn.mjs`, with ADR-021 decision 1's
  tone line and ADR-011 decision 3's concept-note line, neither of which
  this repository's bootloader carries yet.
- Writing the close skill's sentence for item 3's last clause, *a red
  run's post-mortem is read before the next unit* (S03) — no record
  decides it. ADR-014 decision 1 puts the post-mortem in a tool, a
  workflow step and a package script, all path 3's; decision 2 is the
  two-suites sentence, written in the unit skill. The item is answered
  less that clause, and honouring it needs a record, not an edit here.
- Correcting the kit's default transport, or the binding row the kit
  generates, so that `cairn-open`'s direct push matches an adopter's
  declaration (S01's review) — `tools/cairn.mjs` is path 4's surface, and
  ADR-001 decision 1 orders the request sequence dropped and the default
  kept; the tension is a superseding record's, not this path's.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md` as it is today.
2. `project/coding-paths/index.md@ae454f890aed4101f8ad8508d2b292ae2f501d73`, row 1.
3. `docs/architecture/01-cairn-1-1.md@8190acfa186af205a8f1d4b35c3c0e684f11a9f3` — *How a path opens*, *runs* and *closes*.
4. `project/coding-paths/CP-CAIRN-005/plan.md`, then the records the unit being written implements, at their tables.
5. `spec/reference/path-template.md` — the step shape this path's own steps now follow; `steps/S01.md` to `steps/S05.md` for what each surface says and for the three answers that diverge from their items.

### Verify

```bash
npm run cairn-check
npm test
```
