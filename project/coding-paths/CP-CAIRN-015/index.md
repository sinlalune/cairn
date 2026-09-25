---
type: Cairn Coding Path
title: Coding path 3 of 1.2 — the kit
description: The third implementation path of Cairn 1.2, row 3 of the roadmap register. The installer reads every root the repository declared, lets `update` decline a host file, writes templates in the shape they describe and says when `adopt` leaves a gate red; `update` and `status` report from one predicate, byte-equal across days; `init` and `adopt` refuse the pairing that cannot work with the installer's one GitHub reading; the kit installs `cairn-update`, `feedbacks/`, `project/backlog/`, Ponytail's two skills fetched from the latest version and every skill where the harness loads it; the pilot's record is a plain list and the generated request template carries the coherence section — from eleven records, with Atomik's update note of 22/09 placed observation by observation.
tags: [coding-path, implementation, cairn-1.2, kit, installer]
timestamp: 2026-09-25T00:00:00Z
cairn:
  id: CP-CAIRN-015
  route: full
  status: running
  current_step: S07
  base_commit: c7e92c83c8b79f6b89d8da747c1ed4b822d3248a
  branch: path/cp-cairn-015
  assigned_writer: cp-cairn-015-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - tools/cairn.mjs
    - tools/cairn.test.mjs
    - tools/cairn-pilot.mjs
    - cairn.lock.json
    - package.json
    - docs/modules/application.md
    - spec/reference/repository-layout.md
    - spec/reference/configuration.md
    - spec/reference/conformance.md
    - project/backlog/**
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-015/**
  governs:
    - docs/architecture/02-cairn-1-2.md@7629b51a86e8da3ee999ba6542e02f195ca1ffab
    - docs/adr/ADR-032-registering-on-a-trunk-that-takes-no-direct-push.md@a9f7cdfa406bb3653a1dec5e085c7ec56bcc9715
    - docs/adr/ADR-033-the-installer-reads-what-the-repository-declared.md@54af6c41277ad9e1dea591db4a8a93ebbb7bb68c
    - docs/adr/ADR-034-housekeeping-with-no-choice-in-it-second-edition.md@ec2ed568d0d323ba8b09f128754fee3489004682
    - docs/adr/ADR-035-the-seventh-skill-cairn-update.md@d8d3a6bdd4c95bb0ff736804c5418335a34e8ef9
    - docs/adr/ADR-036-the-kit-ships-ponytails-skills-where-the-harness-loads-them.md@cf2059c17ec35798be92d7a27f6e86f986ddef84
    - docs/adr/ADR-037-a-repository-declares-its-link-exemptions.md@665c090b5513697902b162da7d2444da2626badb
    - docs/adr/ADR-038-the-channel-second-edition.md@1fdbe945333f0c252dcb879ebc748882393d0b02
    - docs/adr/ADR-039-the-release-notes-name-what-a-release-absorbed.md@9d2e08e48643375cc5c001425c71452e9a875a6d
    - docs/adr/ADR-041-a-home-for-deferred-work.md@d44ae749c50bd55d1f2f672c0d7001b0e539e6cc
    - docs/adr/ADR-042-the-definition-of-done-is-a-plain-list.md@8ecf65485547f80fc14018382968c52bdb27ced3
    - docs/adr/ADR-043-the-coherence-questions-are-a-fresh-context-read.md@7278c2bc8d488002cd414163e75f3747c37e060f
---

# CP-CAIRN-015 — the kit of 1.2

## Goal

This path makes the installer do what eleven records of 1.2 decided: read
every root the repository declared and derive none it named; let `update`
decline a host file and remember it; write its templates in the shape they
describe; report from one predicate what `status` says and the pointer page
lists, byte-equal from one day to the next; say at `adopt` which kept file
still calls what it made stale and which file wants a link exemption;
refuse at `init` and `adopt` the two pairings that cannot work, with the
installer's one reading of GitHub; and install what the skills of 1.2
perform — `cairn-update`, `feedbacks/`, `project/backlog/`, Ponytail's two
skills fetched from the latest version, every skill where the harness
loads it, the request template's coherence section, the pilot's plain
list. It is the least because every change stands behind an accepted
record, the one tool it changes is the one every record names, and the
five observations of Atomik's update note fall on the same functions:
three are the records' decisions seen from the adopter's side, two are
corrections of a line each. It does not change the checker, the audit,
post-mortem or live-view tools, the workflow, the skills or the README:
rows 2 and 1 are done, rows 4 and 5 own the rest, and the kit's counts are
written once by row 5.

**Atomik's update note, placed.** The
[note of 2026-09-22](../../../feedbacks/2026-09-22-atomik-first-update.md)
reached the folder after the asks were listed. Its first observation, the
lock churning on the clock, is ADR-034 decision 2 seen from the lock; its
third, the pointer page and the lock disagreeing in one command, is
ADR-034 decision 1 done as one predicate; its fourth, the one unbackticked
blank in the request template, is a correction of the line ADR-043 already
rewrites, with the test the note asks for; its second, a re-baselined
digest that reads *pristine*, is one field of the lock beside the one
ADR-033 decision 2 adds, written here on the owner's word at the plan
review; its fifth names a stale docblock in the audit tool, row 4's, and
an empty `steps/` folder Git does not carry, which is the open skill's and
goes to the backlog from this path's first unit.

## Definition of done

- [ ] The installer plans under every root the configuration declares —
      architecture, decisions and modules beside concepts — derives a root
      only where none is declared, and asserts once that every path it
      writes falls under a declared root; one test on a repository whose
      roots sit elsewhere (ADR-033 decision 1). `update` takes the name of
      a file it would write and does not write it now or later until the
      owner takes it back, the declination a field of the lock, `status`
      reading the file as *declined* and never *missing*, the pointer page
      listing it (ADR-033 decision 2). The documentation index the kit
      writes says *one page at this root per surface, as they are written*
      and *adds its line to the README, where the repository has one*
      (ADR-033 decision 3).
- [ ] `update` and `status` build their plan through one function, so
      `status` names no rewrite `update` will not make (ADR-034 decision
      4); the reconcile list the report prints and the pointer page carries
      is computed by the predicate `status` uses, and the generated view is
      on neither (ADR-034 decision 1); the report names the files an update
      starts managing as a third kind beside written and kept, the pointer
      page listing them with the kept (ADR-034 decision 3); every generated
      page is stamped with the release's date — `stampedAt` of the release
      stamp, else the source commit's — so two plans of one release on two
      days are byte-equal, asserted by one test (ADR-034 decision 2); a
      manifest digest that is deliberately the host's own bytes — the
      migrated configuration at `adopt`, the generated view — says so in
      the lock beside the digest, so *pristine* keeps meaning *what the kit
      wrote* for everything else.
- [ ] `adopt` says under the stale line which kept host file — the
      manifest, the workflow — still calls what it reported stale and that
      the gate is red until they go, proved on a kept workflow that runs a
      stale suite (ADR-033 decision 4), and names a file whose relative
      links do not resolve as a shape that wants a declaration, with the
      field's name (ADR-037 decision 2). `adopt` refuses `protected` with
      `manual-git` registration from the two declarations alone; `init` and
      `adopt` refuse `manual-git` registration on a trunk with no bypass for
      the writer where the installer can read the trunk's rules from GitHub
      with the owner's own credentials, the refusal naming the two ways out;
      without a token, off GitHub or offline the installer says in one line
      that it did not read and writes what was asked (ADR-032 decision 4);
      the configuration reference's `enforcementProfile` and `transport`
      rows and the conformance page's profile row say what is refused; the
      checker still makes no network call. The pilot registers through a
      request on `pull-request` transport, as the open skill's second
      sequence says (ADR-032 decision 2).
- [ ] The kit installs `skills/cairn-update/SKILL.md` beside the six, the
      pointer page's skill lines and the generated bootloader's skills line
      naming it, the lock owning it (ADR-035); installs `feedbacks/` with an
      index that says what the folder holds and names the type `Cairn
      Feedback` (ADR-038 decisions 2 and 5); installs `project/backlog/`
      with its index (ADR-041); ships `CHANGELOG.md` in the package's file
      list, `status` printing its link at the release's commit beside the
      line that says a newer release exists, and the pointer page linking
      it (ADR-039).
- [ ] At `init` and `update` the kit fetches `ponytail` and
      `ponytail-review` from the plugin's latest release and installs them
      as kit files owned by the lock, the lock naming the version and
      `status` printing it; the pinned tag, `DEPENDENCIES` and the pointer
      page's *what this needs beside it* are gone; offline or on a failed
      fetch the installer says in one line that Ponytail was not read and
      keeps what the repository has, the lock saying which (ADR-036
      decision 1). Beside `skills/`, the kit writes each skill — its own and
      Ponytail's two — where the adopter's harness loads skills, one
      location per harness the kit knows, Claude Code's
      `.claude/skills/<name>/SKILL.md` first, owned by the lock; whether a
      link or a copy, and which other harnesses at which pinned version, is
      stated in the unit that decides it (ADR-036 decision 2).
- [ ] The record the pilot writes carries its definition of done as a
      plain list (ADR-042); the request template the kit generates carries
      the *Coherence* section with the first line naming the reader, as this
      repository's does (ADR-043), every blank in it backticked, and one
      test asserts no bare `<…>` survives in the generated template.
- [ ] `spec/reference/repository-layout.md`'s row for the lock names the
      declination, the host-baseline mark, Ponytail's version and the
      harness files; `docs/modules/application.md` describes the installer
      as it is at the candidate, with no history; a backlog item under
      `project/backlog/` records that a fresh path folder's empty `steps/`
      is not carried by Git, for the next path that writes the open skill.
- [ ] Nothing under `skills/`, `.github/`, `tools/cairn-check.mjs`,
      `tools/cairn-audit.mjs`, `tools/cairn-active.mjs`,
      `tools/cairn-postmortem.mjs`, `spec/index.md`, `README.md` or `site/`
      changes; the twelve governing documents are byte-identical at the
      candidate to what they are at `base_commit`; the register, a write
      surface, gains this path's id in row 3 of 1.2 and nothing else.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section and a
      `current_step` that names it, one commit, a remote checkpoint, a
      self-review in the five tags and a `#### Review` section carrying the
      fresh-context read of its diff with each finding's disposition and
      the bounded second read.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      closed as the close skill says: the administrative commit on the
      branch before the owner is asked to read, the coherence questions
      answered by a fresh context given its five inputs, the owner trying
      `init`, `update` and `adopt` on a scratch repository before the
      merge, the merge being the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-25T11:22:31Z
scope_ref: project/coding-paths/CP-CAIRN-015/index.md#definition-of-done
scope_digest: sha256:dd9df6204f569e20eb948c636acf0e39943578ee695f5785fc59aff1c34333a9
```

Reviewed in the chat of 2026-09-25: route `full` because the path changes
the control plane — the installer, the lock, the pilot, the generated
templates; the definition of done above; writes limited to the installer's
files, the lock, the package's file list, the module note, three reference
pages, the backlog, the register's row and this folder, with no overlap
because no other path runs; the checker, the audit, post-mortem and
live-view tools, the workflow, the skills, the README, the site, the
records and the notes excluded from change; governed by the 1.2 page and
the eleven records row 3 implements, at their blob ids on `main`; initial
writer `cp-cairn-015-writer`. The one point put to the owner — Atomik's
two small observations taken here without a record, the lock's
host-baseline mark and the backticked blank, or the mark left to a record
— was answered *do what you recommend*, and the recommendation was the
first; the record already said so. The owner's go-ahead was given in the
chat and is this acceptance (ADR-001 decisions 1 and 2), and the record
lands on the trunk directly. The units run in a fresh session.
Amendments: none.

## Documentation coverage

### Required

- `docs/architecture/02-cairn-1-2.md@7629b51a` — *what the installer
  reads and reports* and *the channel*, the sections every change is read
  against.
- The eleven records pinned in `governs:` — each unit reads the decisions
  it implements at their *what this changes* line before it writes.
- `feedbacks/2026-09-22-atomik-first-update.md` — the five observations
  and where each is placed above; the measurement of a lock across two
  runs is the test of S02.

### Conditional

- `docs/adr/ADR-015-a-release-reaches-an-edited-file.md` and
  `ADR-024-the-kit-installs-what-the-skills-perform.md` — the 1.1
  records the installer stands on; read before `applyUpdate` or the
  manifest is changed.
- `docs/adr/ADR-029-the-checker-asks-the-host-nothing.md` — the boundary
  ADR-032 decision 4 draws; the installer's reading must not cross it.
- `project/coding-paths/CP-CAIRN-009/index.md` and its steps — how coding
  path 4 of 1.1 wrote the installer, and the owner's try that rebuilt its
  candidate.
- `skills/cairn-update/SKILL.md` and `skills/cairn-open/SKILL.md` — what
  the kit installs must let a writer do what the skills say.
- `feedbacks/2026-09-16-crumbz-update-to-1-1.md` and
  `feedbacks/2026-09-21-atomik-adopts-1-1.md` — the incidents behind
  ADR-033 and ADR-034.

### Deliberately excluded

- `skills/**` — row 1, done; the empty `steps/` folder goes to the backlog.
- `tools/cairn-check.mjs` and the fixtures — row 2, done.
- `tools/cairn-audit.mjs` — row 4, including the stale docblock Atomik's
  fifth observation names; `tools/cairn-active.mjs`,
  `tools/cairn-postmortem.mjs`, `.github/workflows/**` — row 4.
- `README.md`, `CHANGELOG.md`, the kit's counts in the conformance page's
  budget table and the kit row, the site — row 5.
- `feedbacks/**` — read, never written.

## Steps

Forward steps live in [plan.md](./plan.md) until they are executed.

- [**S01**](./steps/S01.md) — the installer reads what the repository
  declared: every role root, `update --decline`, the documentation
  index's two sentences, the backlog item for `steps/`. Complete.
- [**S02**](./steps/S02.md) — what `update` and `status` report: one
  plan, one reading, the release's day, newly managed files, the lock's
  host digests. Complete.
- [**S03**](./steps/S03.md) — what `adopt` and `init` say and refuse:
  the red-gate line, the link-exemption shape, the two refused pairings
  with the one GitHub reading, the pilot registering by request.
  Complete.
- [**S04**](./steps/S04.md) — what the kit installs: `cairn-update`
  named, `feedbacks/` and the backlog with their indexes, the release
  notes shipped and linked. Complete.
- [**S05**](./steps/S05.md) — Ponytail and the harness: the two
  skills fetched from the latest release, the pin gone, every skill
  copied to `.claude/skills/`. Complete.
- [**S06**](./steps/S06.md) — the two templates and the module note:
  the pilot's plain list, the request template's reader line and
  backticked blanks, the module note current. Complete.
- [**S07**](./steps/S07.md) — the candidate: the trunk already in, the
  scope checked, row 3 of 1.2 naming this path. Complete.

## Resume

### Checkpoint

```text
commit : a2f2085fe1b556663a9c6c3bf91955d3d2ff6aea — S06, on origin/path/cp-cairn-015
unit   : 7
base   : c7e92c83c8b79f6b89d8da747c1ed4b822d3248a
trunk  : 4d5462db2c4ef19e79cc4e16ec19bdae7c0b4f55 — origin/main at S07
```

### Next action

Close with `cairn-close` on the candidate S07 produced: the review in
the request's description with the fresh-context coherence read, the
administrative commit, the owner's try of `init`, `update` and `adopt`
on a scratch repository, the merge, then the integrating unit.

### Blockers

None.

### Tried and rejected

- A record for the host-baseline mark in the lock — one field beside the
  one ADR-033 decision 2 adds, on the lock's row this path rewrites
  anyway; the note's ask is a line, and the owner took the writer's
  recommendation at the plan review of 2026-09-25: here, without a
  record.
- Leaving Atomik's update note to the release, where the notes 1.2
  answers move — the note's five observations name `tools/cairn.mjs`
  four times; a path on that file that reads past them writes the same
  functions twice.
- Splitting the kit into two paths, the installer's reports and what it
  installs — one file, one lock, one test suite; two writers on
  `tools/cairn.mjs` is the overlap ADR-003 warns of.
- Writing the kit's counts here, where the manifest changes them — row 5
  writes each figure once and links it (ADR-031 decision 1); this path
  measures and leaves the figure to the row that owns the page.
- Writing this record's own definition of done as a plain list —
  `cairn-audit` still reads only boxed items (row 4); the boxes stay
  unticked.

### Reading order

1. `docs/architecture/02-cairn-1-2.md@7629b51a86e8da3ee999ba6542e02f195ca1ffab` — *what the installer reads and reports*.
2. `project/coding-paths/CP-CAIRN-015/plan.md`, then the records the unit implements, at their *what this changes* lines.
3. `feedbacks/2026-09-22-atomik-first-update.md` — the lock measured across two runs, the test S02 must pass.
4. `tools/cairn.mjs` — `optionsFromConfig`, `buildConfig`, `planInstall`, `applyUpdate`, `installationStatus`, `lockFor`, `pointerPage`, `front`, `staleShapes`, `requestTemplate`, `main`.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
