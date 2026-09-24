---
type: Cairn Coding Path
title: Coding path 1 of 1.2 — the skills and the specification
description: The first implementation path of Cairn 1.2, row 1 of the roadmap register. The open skill's two reads before the go-ahead and the pull-request registration sequence beside the direct-push one; the close skill reordered so the administrative commit lands before the owner is asked to read, its coherence questions handed to a fresh context, its deferred disposition naming a backlog file, its release-path sentences; the unit skill's route for a note about Cairn; the seventh skill, cairn-update; the path template's plain list; the project plane's folders in the chapters and the layout reference — from eleven records, with no rule, tool or kit file changed.
tags: [coding-path, implementation, cairn-1.2, skills, specification]
timestamp: 2026-09-22T00:00:00Z
cairn:
  id: CP-CAIRN-013
  route: full
  status: running
  current_step: S10
  base_commit: dc241ff0209d995c057ae5de5b06640193980281
  branch: path/cp-cairn-013
  assigned_writer: cp-cairn-013-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - skills/**
    - AGENTS.md
    - spec/index.md
    - spec/reference/execution-protocol.md
    - spec/reference/paths.md
    - spec/reference/path-template.md
    - spec/reference/human-records.md
    - spec/reference/configuration.md
    - spec/reference/repository-layout.md
    - spec/concepts/administrative-closure.md
    - spec/concepts/coherence-audit.md
    - spec/concepts/lifecycle.md
    - spec/concepts/implementation-candidate.md
    - spec/concepts/route.md
    - spec/concepts/roles.md
    - spec/concepts/index.md
    - spec/concepts/finding.md
    - spec/concepts/path-record.md
    - .github/pull_request_template.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-013/**
  governs:
    - docs/architecture/02-cairn-1-2.md@e2463bbe52836b1feab79d834ab44b79d5d53e5c
    - docs/adr/ADR-030-what-the-open-skill-reads-before-the-go-ahead.md@55b3c4dd2cb6a3de045e82fca76d8b803e3c578c
    - docs/adr/ADR-031-one-place-for-a-fact.md@a1df5c83ac44cc4c0addc8e0b6625ef231f5b197
    - docs/adr/ADR-032-registering-on-a-trunk-that-takes-no-direct-push.md@52ca480d4dccf7ccd913ec9f08d1340d99d0f3af
    - docs/adr/ADR-034-housekeeping-with-no-choice-in-it-second-edition.md@ec2ed568d0d323ba8b09f128754fee3489004682
    - docs/adr/ADR-035-the-seventh-skill-cairn-update.md@d8d3a6bdd4c95bb0ff736804c5418335a34e8ef9
    - docs/adr/ADR-038-the-channel-second-edition.md@1fdbe945333f0c252dcb879ebc748882393d0b02
    - docs/adr/ADR-039-the-release-notes-name-what-a-release-absorbed.md@9d2e08e48643375cc5c001425c71452e9a875a6d
    - docs/adr/ADR-040-the-administrative-commit-lands-before-the-reading.md@c90d70b884396268de85297e40e8e314d45f4984
    - docs/adr/ADR-041-a-home-for-deferred-work.md@d44ae749c50bd55d1f2f672c0d7001b0e539e6cc
    - docs/adr/ADR-042-the-definition-of-done-is-a-plain-list.md@8ecf65485547f80fc14018382968c52bdb27ced3
    - docs/adr/ADR-043-the-coherence-questions-are-a-fresh-context-read.md@3955b75bbf268b4c61939d94fde41bc895a98235
---

# CP-CAIRN-013 — the skills and the specification of 1.2

## Goal

This path makes the skills and the specification say what eleven records
of 1.2 decided: the open skill reads the plan for placeholders and
contradictions before the go-ahead and carries a second registration
sequence for a trunk that takes no direct push; the close skill lands the
administrative commit before the owner is asked to read, hands the four
coherence questions to a fresh context, sends a deferral to a backlog file
and gains its two release-path sentences; the unit skill says how a note
about Cairn reaches this repository; a seventh skill, `cairn-update`,
carries an adopter's update as a path; the path template writes the
definition of done as a plain list; and the chapters and the layout
reference name the project plane's new folder and the channel's shape.
It is the least because every sentence stands behind an accepted record,
it adds no rule and touches no tool, and one path carries the seven skills
as coding path 1 of 1.1 carried the six. It does not change the checker,
the installer, the audit or post-mortem tools, the pilot, the workflow or
the kit's manifest: those are rows 2, 3 and 4 of the register, and the
sentences this path writes name the surfaces those rows will make true —
the `registration` rule's second reading, the installed `project/backlog/`
and `feedbacks/` folders, the changelog — as the records name them.

## Definition of done

- [ ] The `cairn-open` skill and its reference say that, before the
      go-ahead, an angle-bracketed name in a surface the records name is
      put to the owner as a question of the record, and each item of the
      definition of done is read against the record it cites and corrected
      (ADR-030); that the direct-push sequence requires a trunk that
      accepts a direct push, and a trunk that requires a request registers
      through a second sequence — the same metadata-only commit on a branch
      carrying nothing else, one request, its run read green, the merge,
      then the path branch from the trunk that carries the declaration —
      each sequence under the declaration it serves (ADR-032 decisions 1
      and 2); that step 1 reads `project/backlog/` when a path is proposed,
      an item taken being named in the goal and its file declared in
      `writes:` (ADR-041); and that the definition of done is a plain list
      (ADR-042). `spec/reference/configuration.md` says *the sequence its
      declaration names* where it said *the one registration sequence*,
      and its `transport` row names both (ADR-032 decisions 1 and 2).
- [ ] The `cairn-close` skill and its reference land the administrative
      commit on the branch after the gate is green on the candidate and
      before the owner is asked to read and try, with the closure list of
      `spec/reference/execution-protocol.md`, chapter 5 of `spec/index.md`
      and `spec/concepts/administrative-closure.md` giving the same order,
      and `manual-git` unchanged (ADR-040); say that a measured figure of
      the kit is written in the conformance page's budget table and linked,
      never restated, where the skill asks whether the README lists a
      surface (ADR-031 decision 1); no longer point at `tools/soundness.md`
      (ADR-034 decision 8); make a `deferred` disposition name a file under
      `project/backlog/` (ADR-041); drop the clause that keeps the record's
      checkboxes, the definition of done being a plain list (ADR-042); and
      carry two sentences for the release path — the changelog's section
      naming the adopter repairs absorbed and not, by their path ids
      (ADR-039), and the notes a release answered moved into
      `feedbacks/<release>/` with an index naming what answered each
      (ADR-038 decision 3).
- [ ] The `cairn-close` skill's steps 2 and 3 and its reference hand the
      four coherence questions to a fresh context of the writer's agent,
      given the candidate's diff against the base, the `governs:` documents
      at their ids, the live view and the four questions and nothing else,
      its answers written under *Coherence* with a first line naming the
      reader, the owner arbitrating; `spec/reference/human-records.md`'s
      *Coherence* section, the `full` route's sentence in chapter 5,
      `spec/concepts/coherence-audit.md` and this repository's
      `.github/pull_request_template.md` say the same (ADR-043).
- [ ] The `cairn-unit` skill's section 7 names how a note about Cairn
      reaches this repository — a pull request against it, or the owner
      carrying it; in this repository the file is written here — an
      adopter's note about its own use staying in the adopter's folder
      (ADR-038 decision 2); its movement 4's `deferred` disposition names a
      file under `project/backlog/` (ADR-041).
- [ ] `skills/cairn-update/SKILL.md` exists, the seventh skill, and gives
      an adopter's update as a path on the adopter's register in the order
      ADR-035 states — the trunk settled, the reading before anything is
      written, the owner's two decisions put in the chat before the
      go-ahead, registration as `cairn-open` says, the run with each kept
      file's diff decided, the reconciliation of only what the report and
      the pointer page named, the close, and what the update cost said
      back to Cairn — carrying no command the pointer page does not list;
      this repository's `AGENTS.md` names it beside the six.
- [ ] `spec/reference/path-template.md` writes the definition of done as
      plain items and says why no box stands in the pinned text (ADR-042);
      chapters 1 and 4 of `spec/index.md` name `project/backlog/` among the
      project plane's folders (ADR-041); `spec/reference/repository-layout.md`
      gains its rows for the backlog folder (ADR-041), for `feedbacks/`
      with its `<release>/` subfolders and the type `Cairn Feedback`
      (ADR-038 decisions 3 and 5), and for `CHANGELOG.md` (ADR-039).
- [ ] Every sentence added names no record: the skills say what to do,
      and the records stay where they are; the checker, `tools/`, the
      workflow, the kit's manifest, the pilot, chapters 2, 3 and 6, the
      README, the site and every record are unchanged, and the twelve
      governing documents are byte-identical at the candidate to what they
      are at `base_commit`; the register, a write surface, gains this
      path's id in row 1 of 1.2 and nothing else.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, and a `#### Review` section carrying
      the fresh-context read of its diff with each finding's disposition
      and the bounded second read; the self-review speaks in the five tags.
- [ ] The final candidate contains the trunk tip, is checked, and is
      closed by the `cairn-close` skill as this path leaves it: the
      administrative commit landed before the reading, the coherence
      questions answered by a fresh context in the request's description,
      the owner trying the skills before the merge, the merge being the
      acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-22T10:24:53Z
scope_ref: project/coding-paths/CP-CAIRN-013/index.md#definition-of-done
scope_digest: sha256:43cedfa1c8fef665adc6cb39d76756b988d20a3243408ecbde5a5fd965777475
```

Reviewed in the chat of 2026-09-22: route `full` because the path changes
the control plane — the seven skills, chapters 1, 4 and 5, the templates,
the references and the two concepts; the definition of done above; writes
limited to those surfaces, this repository's bootloader for the seventh
skill's line, the register's row and this folder, with no overlap because
no other path runs; the checker, the tools, the workflow, the kit's
manifest, the pilot, the README, the site and every record excluded from
change; governed by the 1.2 page and the eleven records row 1 implements,
at their blob ids on `main`; initial writer `cp-cairn-013-writer`. The
owner read the plan — six units, one path for the seven skills, the
record's own boxes kept unticked until row 4 reads a plain list, the
bootloader's one word in the writes — and gave the go-ahead in the chat
with the word "go"; that go-ahead is this acceptance (ADR-001 decisions 1
and 2), and the record lands on the trunk directly. The units run in a
fresh session. Amendments: none.

## Documentation coverage

### Required

- `docs/architecture/02-cairn-1-2.md@e2463bbe` — how a path opens and
  closes in 1.2, the channel, and what 1.2 removes from 1.1; the sections
  every sentence of this path makes true.
- The eleven records pinned in `governs:` — each unit reads the decisions
  it implements at their *what this changes, by today's names* line, and
  the alternatives the owner refused, before it writes.

### Conditional

- `docs/architecture/01-cairn-1-1.md` — read where a sentence this path
  changes was written by coding path 1 of 1.1, to keep what 1.2 does not
  supersede.
- `docs/adr/ADR-001`, `ADR-002`, `ADR-017`, `ADR-028` — the 1.1 records
  the governing ones supersede or amend; read where a skill's sentence
  from 1.1 must stay beside the new one.
- `project/coding-paths/CP-CAIRN-005/index.md` and its steps — how coding
  path 1 of 1.1 wrote the same skills; the shape of a unit that changes
  a skill and its reference together.
- `project/brainstorm/2026-09-16-an-update-skill.md` — the chronology the
  seventh skill carries, and Crumbz's update run by hand along it.
- `spec/reference/conformance.md` — the names of the rules the skills
  refer to; read, never written.

### Deliberately excluded

- `tools/**`, `.github/workflows/**`, `cairn.config.json` and
  `cairn.lock.json` — the checker's second reading, the installer's
  folders and refusals, the audit tool's scaffold and item reading, the
  post-mortem, the pilot: rows 2, 3 and 4.
- `docs/**` — every record and page is read and never written; a record
  found wrong is a superseding record on a path of its own.
- `feedbacks/**` — the index already says what ADR-038 decisions 3 and 4
  ask; the notes stay as they were.
- `README.md`, `CHANGELOG.md` and the site — the release, row 5.

## Steps

Forward steps live in [plan.md](./plan.md) until they are executed.

- **S01** — [the open skill and the configuration reference](./steps/S01.md):
  the two reads before the go-ahead, the direct push's precondition and the
  `pull-request` registration sequence beside it, step 1 reading
  `project/backlog/`, the definition of done as a plain list — the skill, its
  command reference, `spec/reference/configuration.md` and the path template's
  own list. **COMPLETE**
- **S02** — [the close skill's order and its sentences](./steps/S02.md): the
  administrative commit before the reading with the protocol, chapter 5 and
  the concept following; the measured figure, the dangling `soundness.md`
  link, the `deferred` disposition, the checkbox clause, the two release-path
  sentences; and, on the owner's ruling, what `ready` states in four pages.
  **COMPLETE**
- **S03** — [the coherence questions as a fresh-context read](./steps/S03.md):
  the close skill's review step hands the candidate to a second context and
  its acceptance step says the answers are there already; the reference's
  commands, the human-records examples, chapter 5's `full` route, the audit
  concept, the route and roles concepts, and this repository's request
  template. **COMPLETE**
- **S04** — [the unit skill and the seventh skill](./steps/S04.md): section
  7's route for a note about Cairn and movement 4's `deferred` disposition;
  `skills/cairn-update/SKILL.md`, the seventh, an adopter's update as a path
  in seven movements; the bootloader's skills line. **COMPLETE**
- **S05** — [the chapters and the layout](./steps/S05.md): chapters 1 and 4
  naming the plane's backlog space and defining what a file there holds and
  who reads the folder; the layout reference's tree and rows for the backlog,
  for `feedbacks/` with its release subfolders and its type, and for
  `CHANGELOG.md`; the path template's deferral naming its backlog file.
  **COMPLETE**
- **S06** — [the candidate](./steps/S06.md): the trunk merged in, the
  register's row 1 of 1.2 naming this path, the gates bare, and the
  definition of done's exclusions measured by command. **COMPLETE**
- **S07** — [what the closing read found](./steps/S07.md): the coherence read
  of `1b24173` answered two of its four questions *Yes*; the backlog's
  absence corrected against ADR-041, the portable convention's closure order
  brought to the one this path writes on the owner's ruling, and what `A`
  does not change said truly in three places. **COMPLETE**
- **S08** — [the audit glob, and the candidate it voided](./steps/S08.md):
  the command block that hands the coherence reader its inputs matched every
  path folder's record, this path's own among them; a reviewer on request 30
  found it, and `62e1542` is void. **COMPLETE**
- **S09** — [what the third closing read found](./steps/S09.md): the
  feedbacks row corrected against ADR-038 and the concept index's closing
  chain put in the new order; the owner's rulings on the squash ban and the
  reader's fifth input recorded; `aa0e38a` is void. **COMPLETE**
- **S10** — [what the fourth closing read found](./steps/S10.md): the
  administrative-closure concept true on both transports, *the reader* that
  meant the owner named as the owner, and the deferral examples following up
  on a backlog file; `8d55673` is void. **COMPLETE**

## Resume

### Checkpoint

```text
commit : 8d556733023c3f689887f452780cc533aa1f0a16 — S09, on origin/path/cp-cairn-013
unit   : 9
base   : dc241ff0209d995c057ae5de5b06640193980281
trunk  : dc241ff0209d995c057ae5de5b06640193980281 — origin/main at registration
```

### Next action

Produce the candidate from S10's commit and close on it: the gate bare, a
fresh context reading THIS candidate for the four questions, request 30's
description rewritten for it, then the administrative commit ahead of the
reading, the owner's try, and the merge that is the acceptance. After it: the
integrating unit on a clean trunk checkout, the remote result proved, this
worktree removed.

Owed by the next path, a superseding record ruled on 2026-09-22 and
2026-09-24: what `ready` states (amends ADR-040), the fresh reader's fifth
input, the records of the running siblings (amends ADR-043), and the limit
the squash ban names — a trunk that allows only squash merges cannot register
by request (amends ADR-032 decision 2).

### Blockers

None.

### Tried and rejected

- Merging the first candidate with what the coherence read found. Two of its
  four answers were *Yes*: the layout page contradicted ADR-041 about the
  backlog, and `spec/reference/paths.md` — the portable convention the
  bootloader names as its first read — still printed the closure order this
  path supersedes. The owner ruled on 2026-09-22 that the second is fixed in
  the candidate rather than left live or given a path of its own, so
  `writes:` is widened by that page and `1b24173` is void.

- Leaving `spec/concepts/route.md` and `spec/concepts/roles.md` to a path of
  their own — both still made the four coherence questions the reviewer's
  read, which is the reader ADR-043 replaces, and the owner had ruled on the
  same shape in S02. `writes:` was widened for the two and the ruling named
  in the report rather than asked a second time.

- Leaving what `ready` states to a superseding record on a path of its own,
  as this path's coverage says to do with a record found wanting — the owner
  ruled in the chat of 2026-09-22 that the wording follows the order ADR-040
  already accepted, here, and `writes:` was widened by
  `spec/concepts/lifecycle.md` and `spec/concepts/implementation-candidate.md`
  for it. The two records this touches are read, never written.

- Leaving the path template's definition of done to S05, as the plan says —
  step 1 of the open skill links the template three lines from the sentence
  that now refuses a box, and a template shipping five boxes would have made
  the two pages disagree between units, which the plan's own preamble
  forbids. The template's list moved in S01; S05 keeps the rest of its item.

- Writing this record's own definition of done as a plain list, as
  ADR-042 decides — the template this record is born from still carries
  boxes, and `cairn-audit` today reads an item only from a boxed line
  (row 4 changes it); a plain list here would give the closing request an
  empty item-by-item section. The boxes stay unticked; the first path
  opened after this one merges carries none.
- One path per skill, or the skills split from the specification — a
  sentence in a skill and the chapter that gives the same order are one
  change; splitting them is two paths on one fact, the overlap ADR-003
  warns of.
- Leaving `AGENTS.md` to row 4 — ADR-035 names the bootloader's skills
  line with the skill file, one word; a seventh skill the bootloader does
  not name is the gap the harness note found for the six.
- Changing the pilot's registration to match the second sequence — the
  register gives the pilot to row 3, where the installer's refusals it
  exercises are made.

### Reading order

1. `docs/architecture/02-cairn-1-2.md@e2463bbe52836b1feab79d834ab44b79d5d53e5c` — what 1.2 is, section by section.
2. The eleven records pinned in `governs:`, each at its *what this changes* line — the surfaces, by today's names.
3. `project/coding-paths/CP-CAIRN-013/plan.md` — the order the skills are written in.
4. `project/coding-paths/CP-CAIRN-005/index.md` — the shape coding path 1 of 1.1 gave the same work.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
