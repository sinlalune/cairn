---
type: Cairn Coding Path
title: Coding path 2 of 1.2 — the checker
description: The second implementation path of Cairn 1.2, row 2 of the roadmap register. The `registration` rule reads a registration carried by the change under review; the `links` rule reads the exemptions a repository declares; `feedbacks/` joins the corpus; the two `comparison` messages say GitHub; the fixture red once is read for its order; and it opens by settling what path 1 owes — one superseding record on what `ready` states, the fresh reader's fifth input and the squash-only limit — before any rule is written.
tags: [coding-path, implementation, cairn-1.2, checker, rules]
timestamp: 2026-09-24T00:00:00Z
cairn:
  id: CP-CAIRN-014
  route: full
  status: running
  current_step: S03
  base_commit: 886c398f6f8955e2ea5b623cf26b3352db6d5452
  branch: path/cp-cairn-014
  assigned_writer: cp-cairn-014-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - tools/cairn-check.mjs
    - tools/cairn-check.test.mjs
    - tools/cairn-fixture.test.mjs
    - tools/cairn-rules.mjs
    - tools/cairn-rules.test.mjs
    - tools/cairn-config.mjs
    - tools/cairn-config.test.mjs
    - tools/cairn-config.schema.json
    - tools/soundness.md
    - spec/reference/conformance.md
    - spec/reference/configuration.md
    - docs/modules/application.md
    - docs/adr/**
    - docs/architecture/02-cairn-1-2.md
    - docs/architecture/index.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-014/**
  governs:
    - docs/architecture/02-cairn-1-2.md@e2463bbe52836b1feab79d834ab44b79d5d53e5c
    - project/log/2026-09-24-cp-cairn-013.md@6d4f869ab6242b99bd7e77e18306305c71d7ea0e
    - docs/adr/ADR-004-the-checker-reads-what-it-did-not.md@a154982872b4df41a4b84bfed9888bc6dc87ce6e
    - docs/adr/ADR-032-registering-on-a-trunk-that-takes-no-direct-push.md@52ca480d4dccf7ccd913ec9f08d1340d99d0f3af
    - docs/adr/ADR-034-housekeeping-with-no-choice-in-it-second-edition.md@ec2ed568d0d323ba8b09f128754fee3489004682
    - docs/adr/ADR-037-a-repository-declares-its-link-exemptions.md@665c090b5513697902b162da7d2444da2626badb
    - docs/adr/ADR-038-the-channel-second-edition.md@1fdbe945333f0c252dcb879ebc748882393d0b02
    - docs/adr/ADR-040-the-administrative-commit-lands-before-the-reading.md@c90d70b884396268de85297e40e8e314d45f4984
    - docs/adr/ADR-043-the-coherence-questions-are-a-fresh-context-read.md@3955b75bbf268b4c61939d94fde41bc895a98235
---

# CP-CAIRN-014 — the checker of 1.2

## Goal

This path makes the checker read what four records of 1.2 decided: a
registration carried by the change under review, on a trunk that takes no
direct push; the link exemptions a repository declares in its
configuration; the feedback folder as part of the corpus; and two messages
and one fixture set right. It is the least because every rule it changes
stands behind a record already accepted, every fixture is the one
adversarial case ADR-004 asks for, and the three amendments path 1 owes
are settled by one record in the first unit rather than reopened in the
chat. It does not touch the skills, the installer, the audit or
post-mortem tools, the pilot, the workflow or the kit's manifest: those
are rows 1, 3 and 4, and the installer's half of the link exemptions —
`adopt` naming the shape that wants a declaration — is row 3's.

**What path 1 owes, and how this path settles it.** Path 1's
[journal entry](../../log/2026-09-24-cp-cairn-013.md) names three rulings
the owner gave in the chat and no record carries: what `ready` states —
the candidate checked, administratively closed and proposed, the
acceptance coming with the closure where the closing record carries it and
after it where an approval on the request is the acceptance (amends
ADR-040); the fresh reader's fifth input — the records of the running
sibling paths, which the live view cannot stand in for (amends ADR-043);
and the limit the squash ban names — `registration-base` reads the parent
of the commit that declared the path `running`, so a trunk that allows
only squash merges cannot register by request (amends ADR-032 decision 2).
S01 writes them as one superseding record, promoted from that entry at
the blob pinned above, and amends the 1.2 page in place, marked. Nothing
of it is a rule: the three are what the skills already say, given a
record.

## Definition of done

- [ ] One decision record, ADR-044, exists in the layout's shape,
      *promoted from* path 1's journal entry at the blob id pinned in this
      record, stating three amendments and naming each decision it amends —
      what `ready` states (ADR-040), the fresh reader's fifth input
      (ADR-043) and the squash-only limit of a registration by request
      (ADR-032 decision 2) — and one decision of its own, the owner's of
      2026-09-24: a `current_step` that does not name the path's last step
      file is an advisory, never a refusal; the three records gain a line
      naming it; the
      1.2 page is amended in place to match, marked *since* the date, with
      a *promoted from* link to the entry; the records' index lists it with
      no gap after ADR-043.
- [ ] A declaration absent from the trunk is read as registered when the
      run's own comparison contains the commit that declares it `running`
      and that commit is a registration — it touches the record and the
      generated view and nothing else, and its parent is the declared
      `base_commit`; a request carrying a registration and anything else
      is refused as today, and a trunk that took the commit directly is
      read as today (ADR-032 decision 3); two fixtures prove it, a
      registration request read green and one carrying a product file
      refused; the rule's rows on the conformance page, in the catalogue
      and in the soundness note say so.
- [ ] `cairn.config.json` may declare the paths — a file or a folder —
      whose relative links the `links` rule does not resolve, each with
      its reason; the schema and the loader accept the field and refuse a
      declaration with no reason; the rule skips the declared files; one
      fixture proves it, a declared file with an unresolved link green and
      the same file undeclared refused; the field's row of the
      configuration reference and the `links` rows of the conformance
      page and the catalogue say so, and the conformance page's `links`
      row says the two 0.2 exemptions left in CP-CAIRN-001 S02 and that a
      portrayal or a frozen history is the adopter's to declare (ADR-037
      decisions 1 and 2).
- [ ] `feedbacks/` is a root `markdownCorpus()` reads, so `links` covers
      it; one fixture proves it, a broken relative link under
      `feedbacks/` refused; the corpus rows of the conformance page and the
      catalogue say so (ADR-038 decision 1); the two `comparison` messages
      say GitHub where they said *the forge* (ADR-034 decision 6); the
      fixture red once on `record-integrity` is read once for the order it
      depends on and pinned where one is found, the step saying so where
      none is (ADR-034 decision 7); the advisory `current-step` reports a
      running or ready record whose `current_step` is not its last step
      file, naming both, and is silent before the first unit; one fixture
      proves it, and its rows on the conformance page, in the catalogue
      and in the soundness note say so (ADR-044).
- [ ] Every blocking rule's fixture changed or added by this path
      contains a merged trunk commit carrying another path's completed
      unit (ADR-004 decision 4); the fixture suite passes; the catalogue on
      the conformance page and its linkage are regenerated;
      `docs/modules/application.md` describes the checker as it is at the
      candidate, with no history.
- [ ] Every refusal added or changed names the remedy in one sentence,
      and every message says GitHub where GitHub is meant, never *the
      forge*.
- [ ] Nothing under `skills/`, `.github/`, `tools/cairn.mjs`,
      `tools/cairn-audit.mjs`, `tools/cairn-active.mjs`,
      `tools/cairn-postmortem.mjs`, `tools/cairn-pilot.mjs`,
      `spec/index.md`, `README.md` or `site/` changes; the nine governing
      documents are byte-identical at the candidate to what they are at
      `base_commit`, except the 1.2 page and the three amended records,
      which S01 changes in place and marked; the register, a write
      surface, gains this path's id in row 2 of 1.2 and nothing else.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section and
      a `current_step` that names it, one commit, a remote checkpoint, a
      self-review in the five tags and a `#### Review` section carrying
      the fresh-context read of its diff with each finding's disposition
      and the bounded second read.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      closed as the close skill now says: the administrative commit on the
      branch before the owner is asked to read, the coherence questions
      answered by a fresh context given its five inputs, the owner trying
      the checker before the merge, the merge being the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-24T13:24:58Z
scope_ref: project/coding-paths/CP-CAIRN-014/index.md#definition-of-done
scope_digest: sha256:18c9985450ec0a31a0c6ab1a2681c938f44f16245f9fb5a6abda3b0994f7abdd
```

Reviewed in the chat of 2026-09-24: route `full` because the path changes
the control plane — the checker, its rules and fixtures — and the decision
plane, one record; the definition of done above; writes limited to the
checker's files, the catalogue, the configuration schema and loader, the
soundness note, the two references, the module note, the records, the
1.2 page, the register's row and this folder, with no overlap because no
other path runs; the skills, the installer, the audit, post-mortem and
pilot tools, the workflow, the README, the site and the notes excluded
from change; governed by the 1.2 page, path 1's journal entry and the
seven records at their blob ids on `main`; initial writer
`cp-cairn-014-writer`. The one point put to the owner — the stale
`current_step` three integrated records carry: nothing, an advisory, or a
refusal — was answered *do what you recommend*, and the recommendation was
the advisory; it is the fourth decision of ADR-044 and the advisory
`current-step` in S04. The owner's go-ahead was given in the chat and is
this acceptance (ADR-001 decisions 1 and 2), and the record lands on the
trunk directly. The units run in a fresh session. Amendments: none.

## Documentation coverage

### Required

- `project/log/2026-09-24-cp-cairn-013.md@6d4f869a` — the three rulings
  in path 1's own words, the source S01 promotes.
- `docs/architecture/02-cairn-1-2.md@e2463bbe` — *how a path opens* and
  *what the checker reads*, the sections every rule is read against.
- The six records pinned in `governs:` after it — each unit reads the
  decisions it implements at their *what this changes* line before it
  writes; ADR-004 for the shape every fixture must have.

### Conditional

- `docs/adr/ADR-001`, `ADR-002`, `ADR-017`, `ADR-029` — the 1.1 records
  the governing ones amend or stand beside; read where a rule's sentence
  from 1.1 must stay.
- `docs/architecture/01-cairn-1-1.md`, *what the checker reads at each
  transition* — the table every 1.1 rule was read against.
- `project/coding-paths/CP-CAIRN-006/index.md` and its steps — how
  coding path 2 of 1.1 wrote rules and fixtures, and settled path 1's
  debts with records first.
- `skills/cairn-open/SKILL.md` and its reference — what the second
  registration sequence tells a writer, which the rule must read as
  written.
- `feedbacks/2026-09-21-atomik-adopts-1-1.md` and
  `feedbacks/2026-09-21-atomik-opens-a-path-on-a-protected-trunk.md` —
  the incidents behind the two rules.

### Deliberately excluded

- `skills/**`, `spec/index.md` and the templates — row 1, done.
- `tools/cairn.mjs`, `tools/cairn-pilot.mjs`, `cairn.lock.json` — the
  installer's refusals, `adopt`'s naming of the shape, the pilot on the
  second sequence: row 3.
- `tools/cairn-audit.mjs`, `tools/cairn-active.mjs`,
  `tools/cairn-postmortem.mjs`, `.github/workflows/**` — row 4.
- `README.md`, `CHANGELOG.md`, the site — row 5.
- `feedbacks/**` — read, never written; the notes stay as they were.

## Steps

Forward steps live in [plan.md](./plan.md) until they are executed.

- **S01** — [the record path 1 owes](./steps/S01.md): ADR-044, promoted
  from path 1's journal entry — what `ready` states, the fresh reader's
  fifth input, the squash limit, and the advisory `current-step` on the
  owner's decision; ADR-040, ADR-043 and ADR-032 marked, the 1.2 page
  amended in place, both indexes. Widened `writes:` by
  `docs/architecture/index.md`. **COMPLETE**
- **S02** — [the registration rule reads the change under review](./steps/S02.md):
  on `pull-request` registration, a request that makes a path `running`
  is a registration — the record's folder and the view alone, parented on
  `base_commit`, nothing else — or `registration` refuses it naming which;
  two fixtures, the catalogue, the conformance row, the soundness note, the
  module note. **COMPLETE**
- **S03** — [the links rule reads the declared exemptions](./steps/S03.md):
  `linkExemptions` in `cairn.config.json`, a path and its reason, refused
  without one by the loader and the schema; `links` skips the declared
  files; one fixture; the configuration reference, the conformance row with
  the line on the two 0.2 exemptions, the catalogue, the module note. Widened
  `writes:` by `tools/cairn-config.test.mjs`. **COMPLETE**

## Resume

### Checkpoint

```text
commit : adfb10f98b7dbea205d1d65ed8dd7e0ad541a9ac — S02, on origin/path/cp-cairn-014
unit   : 02 — the last completed on the remote; S03 is the commit that carries this section
base   : 886c398f6f8955e2ea5b623cf26b3352db6d5452
trunk  : 886c398f6f8955e2ea5b623cf26b3352db6d5452 — origin/main at registration
```

### Next action

Start S04 with `cairn-unit` in the path's worktree: `feedbacks/` in the
corpus, the two `comparison` messages, the `record-integrity` fixture's
order, and the advisory `current-step`, as the plan's fourth item says
(ADR-038 d1, ADR-034 d6 and d7, ADR-044 d4).

### Blockers

None.

### Tried and rejected

- Reopening the three rulings in the chat — path 1's journal names them
  and the remedy, a superseding record; asking again is the thing the
  entry asks not to do.
- A separate decision path for the record — one unit of this path
  writes it, as CP-CAIRN-006 S01 wrote ADR-024 and ADR-025; a path for
  one record is the volume the manifesto's first threat names.
- Nothing for the stale `current_step` path 1's S08 reader found, the
  field being the writer's — the unit skill's resume movement already
  says to refresh it, and two integrated records, CP-CAIRN-008 and
  CP-CAIRN-012, carry it stale; the owner took the writer's
  recommendation on 2026-09-24, an advisory, because a stale field breaks
  no reading of the checker (ADR-044, decision 4). The opening
  acceptance says *three*; S01 corrects it.
- Taking `adopt`'s naming of the shape that wants a declaration (ADR-037
  decision 2's second half) — it is `staleShapes` in the installer, row
  3's file; the conformance line is here.
- Writing this record's own definition of done as a plain list —
  `cairn-audit` still reads only boxed items (row 4); the boxes stay
  unticked.

### Reading order

1. `project/log/2026-09-24-cp-cairn-013.md@6d4f869ab6242b99bd7e77e18306305c71d7ea0e` — the three rulings.
2. `docs/architecture/02-cairn-1-2.md@e2463bbe52836b1feab79d834ab44b79d5d53e5c` — *how a path opens*, *what the checker reads*.
3. `project/coding-paths/CP-CAIRN-014/plan.md`, then the records the unit implements, at their *what this changes* lines.
4. `tools/soundness.md` and `spec/reference/conformance.md` — where a rule is named and linked.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
