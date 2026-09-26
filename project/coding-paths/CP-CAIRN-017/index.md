---
type: Cairn Coding Path
title: Coding path 5 of 1.2 — the release
description: The fifth and last implementation path of Cairn 1.2, row 5 of the roadmap register. The first section of `CHANGELOG.md`, naming the adopter repairs 1.2.0 absorbed and not by Crumbz's, Atomik's and ECOS's path ids and the line per changed template ADR-015 owes; the kit's counts written once in the conformance page's budget table and linked from the four places that restated them; the README and the site for the surfaces 1.2 changes; this repository updated with its own kit; the notes 1.2 answered moved into `feedbacks/1.2/` with an index naming what answered each; the milestone rule the tool implements given its record; four backlog items and two sentences the adopters' reports owe, one line each; 1.2.0 cut, and the three adopters' updates named as the next paths in their repositories.
tags: [coding-path, implementation, cairn-1.2, release]
timestamp: 2026-09-26T00:00:00Z
cairn:
  id: CP-CAIRN-017
  route: full
  status: running
  current_step: S02
  base_commit: 3ed0f8cd8921381ab3e195e9095df6ead2514c28
  branch: path/cp-cairn-017
  assigned_writer: cp-cairn-017-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - CHANGELOG.md
    - README.md
    - site/**
    - package.json
    - cairn.lock.json
    - cairn.config.json
    - cairn/**
    - .claude/**
    - AGENTS.md
    - feedbacks/**
    - project/backlog/**
    - docs/adr/**
    - docs/architecture/02-cairn-1-2.md
    - docs/modules/application.md
    - docs/modules/site.md
    - spec/reference/conformance.md
    - tools/cairn.mjs
    - tools/cairn-check.mjs
    - tools/cairn-fixture.test.mjs
    - tools/cairn-check.test.mjs
    - skills/cairn-open/**
    - skills/cairn-unit/**
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-017/**
  governs:
    - docs/architecture/02-cairn-1-2.md@7629b51a86e8da3ee999ba6542e02f195ca1ffab
    - project/log/2026-09-26-cp-cairn-016.md@fd04ab18b99823efbdffeb34297c5a092ccce973
    - docs/adr/ADR-012-a-page-a-newcomer-reads-first.md@5337e112dc57dab0941f196e745e39957210a628
    - docs/adr/ADR-015-a-release-reaches-an-edited-file.md@978e9e1a2fe11c038b8fa9114b480ef7bfd6d815
    - docs/adr/ADR-022-the-learning-note-and-the-learning-session.md@9be9aac1f3885251dda62c615c6f7cfb761b370f
    - docs/adr/ADR-023-the-pages-a-reader-meets.md@93e1f958279bac63fc4e32c7f6e72cfdcf8c1eac
    - docs/adr/ADR-031-one-place-for-a-fact.md@a1df5c83ac44cc4c0addc8e0b6625ef231f5b197
    - docs/adr/ADR-038-the-channel-second-edition.md@1fdbe945333f0c252dcb879ebc748882393d0b02
    - docs/adr/ADR-039-the-release-notes-name-what-a-release-absorbed.md@9d2e08e48643375cc5c001425c71452e9a875a6d
---

# CP-CAIRN-017 — the release of 1.2

## Goal

This path cuts Cairn 1.2.0 from what the four coding paths before it
built: it writes the changelog's first section, naming by their path ids
the adopter repairs the release absorbed and the ones it did not, and the
line per changed template a release owes; writes each count of the kit
once, in the conformance page's budget table measured at 1.2.0, and links
it from the four places that restated it; makes the README and the site
say what 1.2 changes for a newcomer, the quick starts and the build proved
by running them; updates this repository with its own kit and reads what
the update reports; moves the notes 1.2 answered into `feedbacks/1.2/`
with an index naming what answered each line; gives the milestone rule
`cairn-active` already implements the record it lacks; and sets the
version, so the owner tags and publishes the integrating commit. It is
the least because every sentence it writes is a measurement, a link or a
list of what the four paths did, and the one record it writes states a
rule the tool already follows. It does not change the skills, the
checker, the installer's behaviour or the tools: the three adopters'
updates run in their repositories, as paths on their registers, after the
tag, with `cairn-update`.

**What row 4 handed to this row, and what stays on the backlog.** Path 4's
[journal entry](../../log/2026-09-26-cp-cairn-016.md) leaves the
milestone rule with no record, for a promotion; S01 writes it, as
CP-CAIRN-014 wrote ADR-044 for path 1's leftovers, because a release that
ships a tool behaviour no record decides is what the 1.2 page would then
misstate. Of the six other backlog items, this path takes the four that
cost a line or a function and leave a defect in every adopter's hands if
untaken — the empty `steps/` folder, the unit skill never naming
`current_step`, the generated bootloader's false sentence on the skills,
and a concept root not named `concepts` clearing no note — and, with
them, the two sentences [Atomik's closing report](../../../feedbacks/2026-09-26-atomik-adoption-finished.md)
asks of the unit skill: print, don't remember; write the review into the
step record before the commit. The three that change no behaviour for an
adopter — the shared link pattern, the audit tool's copied reading, the
closing commits and the register — stay for the row after this release.
The owner ruled on 2026-09-26: *take four plus the two*.

## Definition of done

- [ ] One decision record, ADR-045, exists in the layout's shape,
      *promoted from* path 4's journal entry at the blob pinned in this
      record, superseding ADR-031 decision 2's *that path's* for a
      milestone with the rule the owner gave on 2026-09-25 and
      `cairn-active` implements — a milestone counts the paths its row
      names and those in the table under the heading ending with its short
      name, reads *done* dated from its last done path's journal entry
      when every path it counts is done or archived and at least one is
      done, *running* otherwise or while a row has no path yet, and keeps
      its author's cell while it counts a path with no record; ADR-031
      gains a line naming it, the 1.2 page is amended in place and marked,
      the records' index lists it with no gap, and the backlog item that
      asked for it is deleted in the same unit.
- [ ] Four backlog items are answered and deleted in the unit that lands
      them: the open skill's registration commit carries `steps/` or its
      first unit creates it, and this repository's registration sequence
      does the same; the unit skill's fifth movement sets `current_step`
      to the step the unit completes; the installer's bootloader template
      says the skills are the local files and every file the kit owns, as
      this repository's `AGENTS.md` does; and `concept-orphan` resolves a
      link against the linking file's folder and the declared concept
      root instead of the word `concepts/`, with one fixture where the
      root is named otherwise and a note one folder down is linked from
      outside. The unit skill gains the two sentences Atomik's closing
      report asks: every figure, id or outcome written into a record is
      pasted from a command's output, never recalled, beside ADR-009's
      sentence on ids; and the review is written into the step record
      before the unit's commit, never after. No record: no decision
      changes.
- [ ] `CHANGELOG.md` exists at the root with one section, 1.2.0's, that
      names first the adopter repairs the release absorbed and the ones it
      did not, by Crumbz's, Atomik's and ECOS's path ids — Atomik's forked
      `linkExempt` as the declared exemptions, ECOS's `CP-BACKLOG-001` as
      `project/backlog/`, each other repair read from their registers and
      named absorbed, not absorbed or not a repair of the kit — then what
      the release changes for an adopter in the pointer page's names, then
      one line per template the release changed since 1.1.0 (ADR-039,
      ADR-015 decision 2); ADR-015's implementation table says the line is
      written here and that `update` links the section beside the diff
      rather than printing the line, and the word *pending* is cleared
      there and in the register's 1.2 row (ADR-031 decision 3).
- [ ] `spec/reference/conformance.md`'s budget table carries every figure
      of the kit measured at 1.2.0 by the tools — the files `init` writes
      on each profile as the lock counts them, the skills, the rules as
      the catalogue counts them, the specification's words, the required
      entry chain's words, the protocol files one lightweight unit writes
      — beside the 1.0.0 and 1.1.0 columns, every target that has one
      reported as bound or not and the kit's counts with no target
      (ADR-022 decision 2); the kit row of that page, `README.md`,
      `docs/modules/application.md` and the header comment of
      `tools/cairn.mjs` link the row and restate no figure (ADR-031
      decision 1), the README's rule count included.
- [ ] `README.md` opens with what Cairn is in one paragraph and lists its
      surfaces in the order a newcomer meets them, now with an adopter's
      update, the backlog and the channel among them (ADR-023 decision 1,
      ADR-012); every sequence in it is 1.2's — seven skills, a
      registration by request where the trunk takes no direct push, the
      administrative commit before the reading, a plain-list definition of
      done, Ponytail fetched by the kit — and the quick starts run as
      written against the kit at the candidate, proved by running them.
      The site builds from the candidate and projects the README, the
      manifesto, the specification and the seven skills, its *Start*
      section and any list it hard-codes saying what the README says, the
      build proved by running it; `docs/modules/site.md` describes it as it
      is.
- [ ] This repository is updated with its own kit: `cairn update` is run
      here at the candidate's package, its report read and quoted in the
      step; pristine kit files are rewritten, edited ones kept and listed
      with what the release changes in them, a file this repository does
      not want declined with the reason, the pointer page naming 1.2.0 and
      the commit it was cut from, the lock recording what the kit installs
      at 1.2 — Ponytail's two skills at the version fetched, the harness
      copies under `.claude/skills/`, the host baselines, the declinations
      — and `status` reading it clean (ADR-015, ADR-033, ADR-036).
- [ ] `feedbacks/1.2/` exists with an index naming, for each note moved,
      what answered each of its asks — the records, the coding paths, this
      release — and the notes 1.2 answered are moved there byte-identical
      below their frontmatter, their relative links moved one level with
      them and every link under `feedbacks/` resolving: the writer's file
      of 2026-09-15, Crumbz's update note, the four ECOS notes, Atomik's
      three notes of 2026-09-21, the 1.2 decisions page and the asks note;
      Atomik's update note of 2026-09-22 moves with them once its fifth
      observation is answered above, and Atomik's closing report of
      2026-09-26 moves too once its two sentences are written — the index
      naming what answered each; a note with an ask still open stays at
      the folder's level (ADR-038 decision 3).
- [ ] The 1.2 page's opening says its records are implemented by paths 1
      to 4 of the register and released as 1.2.0 by the fifth, marked
      *since* the date, and nothing else on the page changes but ADR-045's
      amendment; `package.json` says `1.2.0` and its `prepack` stamps the
      release file from the candidate; the register's 1.2 milestone row
      and row 5 name this path, their state cells the tool's.
- [ ] Nothing under `.github/`, `spec/index.md`, `spec/concepts/` or
      `spec/reference/` other than the conformance page changes; the
      skills change only in the two sentences and the two clauses named
      above, the checker only in `conceptLinkTargets` and its fixture, the
      installer only in its header comment and the bootloader template; the eight
      governing documents other than the 1.2 page and ADR-031 are
      byte-identical at the candidate to what they are at `base_commit`,
      and those two change only where S01 and the opening sentence say.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section and a
      `current_step` that names it, one commit after a gate read green, a
      remote checkpoint, a self-review in the five tags and a `#### Review`
      section carrying the fresh-context read of its diff with each
      finding's disposition and the bounded second read; a quick start, a
      build, an update or a measurement is proved by its output in the
      step, never by description.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      closed as the close skill says: the register restored before the
      administrative commit, which lands on the branch before the owner is
      asked to read; the coherence questions answered by a fresh context
      given its five inputs; the owner opening the site and the README and
      running one quick start before the merge; the merge being the
      acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported; then the tag `1.2.0` is set on the
      integrating commit as `1.1.0` was on its own, and the package is
      published from it by the owner, both named in the journal entry with
      the three adopters' updates as the next paths, in their repositories.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-26T10:59:38Z
scope_ref: project/coding-paths/CP-CAIRN-017/index.md#definition-of-done
scope_digest: sha256:fa61b921f759f9b956eaf23d928991795c7e22a126359ea6e4deed24dd9d3314
```

Reviewed in the chat of 2026-09-26: route `full` because the path writes
a decision record and changes the control plane — two skills, one checker
function, the installer's template, the kit's own files here; the
definition of done above; writes limited to the release's surfaces, the
four lines and one function the backlog owes, this repository's kit
files, the notes' folder, the backlog, the records, the 1.2 page, the
register's rows and this folder, with no overlap because no other path
runs; the tools other than those lines, the workflow, the chapters and
the concepts excluded from change; governed by the 1.2 page, path 4's
journal entry and the seven records row 5 implements, at their blob ids
on `main`; initial writer `cp-cairn-017-writer`. Put to the owner: the
milestone rule's record in S01 and the line per changed template written
rather than declined — taken as recommended; then, on the owner's own
question, whether the backlog could go in — *take four plus the two*,
the four items that leave a defect in an adopter's hands and the closing
report's two sentences, the three structural items left to the next row.
The owner's go-ahead was given in the chat and is this acceptance
(ADR-001 decisions 1 and 2), and the record lands on the trunk directly.
The units run in a fresh session. Amendments: none.

## Documentation coverage

### Required

- `project/log/2026-09-26-cp-cairn-016.md@fd04ab18` — what row 4 handed
  here, and the milestone rule in that path's words.
- `docs/architecture/02-cairn-1-2.md@7629b51a` — every section, since the
  README and the changelog restate it for two readers.
- The seven records pinned in `governs:` after it — each unit reads the
  decisions it implements at their *what this changes* line before it
  writes.
- `feedbacks/2026-09-21-cairn-1-2-the-asks.md` and the decisions page —
  the lines the `feedbacks/1.2/` index answers one by one.
- `project/coding-paths/CP-CAIRN-011/index.md` and its steps — how the
  1.1 release ran: the README, the site, the budget, the update of this
  repository, the register, the tag after the merge.

### Conditional

- The four journal entries of 2026-09-24 to 2026-09-26 and the four
  paths' step records — what each surface of 1.2 does now, for the
  changelog's second half.
- Crumbz's, Atomik's and ECOS's registers, read in their repositories —
  the path ids the changelog names.
- `docs/adr/ADR-013-a-local-pointer-to-the-protocol.md`,
  `ADR-033`, `ADR-036` — what the update of this repository writes and
  where.
- `project/backlog/2026-09-26-the-milestone-state-rule-has-no-record.md`
  — the item S01 answers and deletes.

### Deliberately excluded

- `tools/cairn-active.mjs`, `tools/cairn-audit.mjs`,
  `tools/cairn-postmortem.mjs`, `tools/cairn-config.mjs`, `.github/` —
  rows 2 and 4, done; the three backlog items that change no behaviour
  for an adopter wait for the row after this release.
- The installer's behaviour — only its header comment changes; a defect
  the update of this repository meets is a backlog item or a feedback
  note, never a fix here.
- The three adopters' repositories — their updates are paths on their
  registers, after the tag.

## Steps

Forward steps live in [plan.md](./plan.md) until they are executed.

- **S01** — the milestone rule's record: ADR-045, ADR-031 marked, the
  1.2 page amended, the backlog item deleted and chapter 4's sentence
  filed. [Record](./steps/S01.md).
- **S02** — the four backlog items and the unit skill's two sentences:
  concept links resolved against the folder and the declared root, the
  first unit makes `steps/`, `current_step` set, print don't remember,
  the review before the commit, the bootloader's line. [Record](./steps/S02.md).

## Resume

### Checkpoint

```text
commit : 95527a6c2e0ed2d64fd4dd68e49a59bff1685dda — S01, ADR-045
unit   : 2
base   : 3ed0f8cd8921381ab3e195e9095df6ead2514c28
trunk  : 3ed0f8cd8921381ab3e195e9095df6ead2514c28 — origin/main at registration
```

### Next action

Start S03 with `cairn-unit` in the path's worktree: the changelog, as
the plan's third item says.

### Blockers

None.

### Tried and rejected

- Leaving the milestone rule's record to a promotion path of its own —
  the rule ships in 1.2.0 either way; a release that ships a tool
  behaviour no record decides leaves the 1.2 page saying *that path's*
  of a cell the tool fills otherwise. One record in S01, as CP-CAIRN-014
  wrote ADR-044.
- Saying why the line per changed template is not written, which the
  register row allows — the changelog section ADR-039 decides is the
  place the line was always meant to have; writing it costs one line per
  template, and `update` links the section since row 3.
- Leaving the six backlog items and the closing report's two sentences
  to *the next path that writes X* — this is the last path of 1.2 and no
  such path exists in it; the owner ruled on 2026-09-26 to take the four
  that leave a defect in an adopter's hands and the two sentences, and
  to leave the three that change no behaviour.
- Fixing in this path what the update of this repository finds wrong in
  the installer — the installer is row 3's, done; a finding is a backlog
  item or a note, and the release ships what was decided.
- Writing this record's own definition of done as a plain list — the
  audit tool reads both shapes since row 4, so a plain list is possible;
  the boxes stay because every other record of 1.2 carries them and a
  release path is the wrong place for the first one.

### Reading order

1. `project/log/2026-09-26-cp-cairn-016.md@fd04ab18b99823efbdffeb34297c5a092ccce973` — what row 4 handed here.
2. `docs/architecture/02-cairn-1-2.md@7629b51a86e8da3ee999ba6542e02f195ca1ffab` — what 1.2 is, for the README and the changelog.
3. `project/coding-paths/CP-CAIRN-017/plan.md`, then the records the unit implements, at their *what this changes* lines.
4. `project/coding-paths/CP-CAIRN-011/steps/S03.md` and `S04.md` — how the budget was measured and this repository updated at 1.1.0.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
