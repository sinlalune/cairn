---
type: Cairn Coding Path
title: Coding path 4 of 1.1 — the kit and the documentation plane
description: Row 4 of the roadmap register, the last before the release. The kit installs what 1.1 decided — manual-git registration, a bootloader with the tone and concept-note lines and six skills, the inputs folder, the concept wiki in three folders, the pointer page, the post-mortem tool and cairn-learn in the manifest, Ponytail as a pinned dependency, the generated workflow and request template, an update that rewrites pristine files and names edited ones; chapters 3 and 6, the concepts and the layout say the same; and the two concept rules read the whole concept root, one function widened in from the checker.
tags: [coding-path, implementation, cairn-1.1, kit, documentation-plane]
timestamp: 2026-09-15T00:00:00Z
cairn:
  id: CP-CAIRN-009
  route: full
  status: running
  current_step: S08
  base_commit: 76512dc75b1940a54388ff4e7fdabb53a662179a
  branch: path/cp-cairn-009
  assigned_writer: cp-cairn-009-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - tools/cairn.mjs
    - tools/cairn.test.mjs
    - tools/cairn-check.mjs
    - tools/cairn-check.test.mjs
    - tools/cairn-fixture.test.mjs
    - tools/cairn-rules.mjs
    - cairn.lock.json
    - spec/index.md
    - spec/reference/repository-layout.md
    - spec/reference/configuration.md
    - spec/reference/conformance.md
    - spec/concepts/**
    - docs/architecture/index.md
    - docs/modules/application.md
    - AGENTS.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-009/**
  governs:
    - docs/architecture/01-cairn-1-1.md@b3a86434fefb628f2ae4f996065da912535261df
    - project/log/2026-09-15-cp-cairn-008.md@f40b6c4b8042b86ef98897eb09392b0ffa995a55
    - docs/adr/ADR-005-one-run-per-commit-that-can-land.md@2266c49b80037434beda60b03f00c514558c6bb5
    - docs/adr/ADR-010-the-module-note-describes-now.md@d5000f3a3cd609b1341a4566eaea0f20954bb61d
    - docs/adr/ADR-011-the-adopters-documentation-plane.md@11dfe3286aa908e0fca1647b0f3a0ce27c66f24f
    - docs/adr/ADR-012-a-page-a-newcomer-reads-first.md@095ba6deb3d34a241c221256a02717d17157508f
    - docs/adr/ADR-013-a-local-pointer-to-the-protocol.md@25f944a06ffdcf447ef0762fa37c040df33dad1d
    - docs/adr/ADR-014-two-tools-of-1-1.md@f27627d460a3d8494866df8bb4c256be0a18f540
    - docs/adr/ADR-015-a-release-reaches-an-edited-file.md@7c364ea393f07d915f9bb8d2a49b1f1428f82822
    - docs/adr/ADR-016-the-coding-stance-absorbs-ponytail.md@c611ca0e2a02b090914f066b1ff4020aa311304f
    - docs/adr/ADR-018-two-sentences-of-the-cycle.md@f60c1ec05a742c831a3f69af474a881d21725fdb
    - docs/adr/ADR-019-an-area-is-a-folder-of-the-tree.md@9b9e0f7a337937f868ef657a68079865bd7755d9
    - docs/adr/ADR-021-what-a-session-writes-for-its-reader.md@723d1411a4b4ed338f0c89decffae38d4c3554fe
    - docs/adr/ADR-022-the-learning-note-and-the-learning-session.md@04d8a28c43b28d4d424208ecda6c1b7222ae7e01
    - docs/adr/ADR-023-the-pages-a-reader-meets.md@81194665cacf4e69d39fb2ce3a9c6411d23bd9a1
    - docs/adr/ADR-024-the-kit-installs-what-the-skills-perform.md@a67b5d7e6a4b0d9fd3cbf2dc8ff41586664c34c0
---

# CP-CAIRN-009 — the kit and the documentation plane

## Goal

This path makes the kit install what 1.1 decided, so that an adopter's
first day looks like the 1.1 page says it does, and makes chapters 3
and 6, the concepts and the layout say the same in the specification's
voice. It is the least because every file the kit gains stands behind a
record already accepted, the kit's file count is measured and bounds
nothing, and the one function it widens in from the checker is the one
ADR-011 already names. It does not touch the skills, the workflow of
this repository, the audit, live-view and post-mortem tools, the README
or the site: those are paths 1, 3, 5 and row 6.

**What the kit installs today, and what it is missing.** The kit's
manifest holds twenty-six files: the bootloader with five absolute
rules and five skills, one concept index at a flat root, one module
note, no inputs folder, no pointer page, no post-mortem tool, no
`cairn-learn`, a workflow whose push trigger still runs on path
branches, a request template without the three plain lines, and an
`init` that writes `pull-request` registration against a skill that
pushes to the trunk. The checker reads the concept root flat, so a note
in a folder is invisible to `concept-orphan` and `concept-growth`. Paths
1, 2 and 3 changed this repository's own copies of those files; the kit
still writes the 1.0 ones for an adopter. This path closes that gap in
every file the kit owns, and widens its writes by the two concept rules
in `tools/cairn-check.mjs` for the recursive read ADR-011 decision 2
names, one function.

**What path 5 leaves here.** Path 5's [journal entry](../../log/2026-09-15-cp-cairn-008.md)
names one line of `tools/cairn.mjs` its second amendment took — the
generated workflow's base per event — which this path keeps as it stands
and builds the rest of the generated workflow around.

Row 4 of the [roadmap register](../index.md) scopes the rest, and the
[1.1 page](../../../docs/architecture/01-cairn-1-1.md), sections *What
the documentation plane holds, and where* and *Which tools exist*,
states the shape. The decisions it implements: the kit's CI adapter
(ADR-005); the module note describing now (ADR-010 decision 1); the
inputs folder, the concept wiki in three folders and the concept-note
line (ADR-011); the page per surface's place (ADR-012); the pointer page
(ADR-013); the post-mortem tool in the manifest and the alias sentence
(ADR-014); `update` and `status` (ADR-015); Ponytail named at a pinned
tag (ADR-016 decision 1); the generated request template (ADR-018
decision 2, ADR-021 decision 2); the dependency sentence and the
architecture index (ADR-019 decision 2); the tone line (ADR-021 decision
1); learning notes, the sixth skill and the kit's count as a measurement
(ADR-022 decisions 1 and 2); chapter 3's README clause, flow kind,
surface-page example and API link, the flow page's shape and the diagram
(ADR-023); `init` writing `manual-git` registration and the transport
option (ADR-024).

## Definition of done

- [ ] `cairn init` writes `transport.registration: manual-git`, the
      `--transport` option names the integration transport alone, the
      generated binding row prints both, and the configuration reference's
      example and `transport` row follow (ADR-024); the kit's tests prove
      the written configuration loads.
- [ ] The bootloader the kit writes carries, beside the five rules of 1.0,
      the line that an explanation is written for the reader who is
      learning it (ADR-021 decision 1) and the line that an abstraction
      explained persists as a concept note in the folder its scope names
      (ADR-011 decision 3); its *start here* item names six skills
      (ADR-022 decision 2); it says `npm test` is an alias of
      `cairn-test` where the adopter keeps its own suite (ADR-014 decision
      2); and this repository's own `AGENTS.md` carries the same lines.
- [ ] The kit installs `docs/inputs/` with an index saying what the
      folder is for (ADR-011 decision 1); the concept root in three
      folders — `cairn`, the project's, `learning` — each with an index
      that says whose vocabulary it holds and, for `learning`, that a
      learning note is a concept note with an order (ADR-011 decision 2,
      ADR-022 decision 1); a documentation index that lists the inputs
      folder, the three concept folders, the surface pages' place with the
      clause that a surface page opens with a worked example and links an
      API's documentation (ADR-012, ADR-023 decisions 3 and 4), and the
      architecture folder as the home of flow pages (ADR-023 decision 2);
      an architecture index that says which way dependencies point is
      stated in one sentence and drawn in one diagram (ADR-019 decision 2,
      ADR-023 decision 3); and a module note template that describes the
      area now, with no history (ADR-010 decision 1). `roots.concepts` is
      the parent of the three folders.
- [ ] `concept-orphan` and `concept-growth` read the whole concept root,
      folders included, so a note in `learning` nothing outside the root
      links is an orphan and a note added in any folder is reported
      (ADR-011 decision 2); a fixture with an orphan in a folder is
      refused; the conformance page's rows for the two rules say the root
      is read recursively.
- [ ] The kit installs `cairn/README.md`, generated at `init` and
      `update`: what Cairn is in the manifesto's first sentence, the
      installed release and the commit it was cut from, the six chapters
      linked at that commit, the six skills linked, the files the kit
      owns from the lock's manifest with the sentence that `update`
      rewrites a pristine one and leaves an edited one alone, and the
      edited files the last update could not rewrite (ADR-013, ADR-015
      decision 2); the bootloader's *start here* list points at it.
- [ ] `cairn update` rewrites a pristine file whoever owns it, never
      rewrites an edited one and prints what the release changes in it,
      and takes the release's version of a named file on request
      (ADR-015 decisions 1 to 3); `status` says which files are pristine,
      edited and missing; the kit's tests prove each on an installation
      that edited one file.
- [ ] The manifest carries `tools/cairn-postmortem.mjs` and the
      `cairn-postmortem` script the kit writes, and `skills/cairn-learn`
      (ADR-014 decision 1, ADR-022 decision 2); it names Ponytail at the
      tag ADR-016 decision 1 states as a dependency it does not copy, in
      the lock and on the pointer page; the two files ADR-013 named as
      candidates for removal — the configuration schema and the project
      index — are removed for their own reasons or kept, each reason
      stated in the step, and never for a count (ADR-022 decision 2); the
      lock records what the kit installs, and the conformance page's kit
      line reports the count with no target.
- [ ] The workflow the kit generates runs once per commit that can land —
      the push trigger on the trunk alone, the request's run on the
      request head, the base per event as path 5 left it — and carries the
      red-run post-mortem step (ADR-005, ADR-014 decision 1); the request
      template the kit generates opens with the three plain lines and the
      surface link, then the definition of done item by item, before
      `## Candidate` (ADR-021 decision 2, ADR-018 decision 2); both are
      byte-identical to this repository's own where the two are meant to
      be the same, and the kit's tests say where they differ and why.
- [ ] Chapter 3 says promotion writes the surface page and adds its line
      to the README, that a flow is a kind of architecture page, that a
      surface page opens with a worked example and links an API's
      documentation (ADR-012, ADR-023 decisions 1 to 4); chapter 6's
      scopes table names the three folders and its learning-notes
      paragraph says a learning note is a concept note with an order
      written by `cairn-learn` (ADR-011 decision 2, ADR-022 decisions 1
      and 2), and its weight budget's kit line is a measurement with no
      target (ADR-022 decision 2); `spec/concepts/architecture.md` states
      the flow page's shape, the diagram and the dependency sentence
      (ADR-019 decision 2, ADR-023 decisions 2 and 3);
      `spec/concepts/concept-template.md` says a note that teaches a
      sequence orders its body (ADR-022 decision 1); the layout
      reference's tree and table show the inputs folder, the three
      concept folders, the pointer page, the post-mortem tool and the
      sixth skill, and its workflow row is true of runs (ADR-005).
- [ ] This repository's `docs/architecture/index.md` says flow pages live
      here and what a page states in one sentence and one diagram;
      `docs/modules/application.md` describes the installer and the
      checker as they are at the candidate, with no history.
- [ ] Nothing under `skills/`, `.github/`, `tools/cairn-audit.mjs`,
      `tools/cairn-active.mjs`, `tools/cairn-postmortem.mjs`,
      `spec/index.md` outside chapters 3 and 6, `docs/adr/`,
      `docs/architecture/01-cairn-1-1.md`, `README.md` or `site/`
      changes; the sixteen governing documents are byte-identical at the
      candidate to what they are at `base_commit`; the register, a write
      surface, gains this path's id in row 4 and the widened files in its
      writes column.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, a self-review in the five tags and a
      `#### Review` section carrying the fresh-context read of its diff
      with each finding's disposition and the bounded second read; every
      behaviour change in the installer or the checker has its failing
      test first; `current_step` names the unit whose block is in the
      commit.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      reviewed in the pull request's description in the order the audit
      tool prints; the administrative commit declaring `ready` and
      `subject_commit` is on the branch with its check green before the
      owner is asked to merge; the owner runs `cairn init` into an empty
      folder and reads what it wrote before the merge; the merge is the
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
accepted_at: 2026-09-15T07:37:58Z
scope_ref: project/coding-paths/CP-CAIRN-009/index.md#definition-of-done
scope_digest: sha256:d2c11b915c5e8e16921f976912a6b92c22f59f5c460b00e1ccb6628cde87d297
```

Reviewed in the chat of 2026-09-15: route `full` because the path
changes the kit's installer, the checker's two concept rules, chapters 3
and 6, the concepts and the layout, control-plane surfaces; the
definition of done above; writes limited to the installer and its test,
the checker and its tests, the lock, chapters 3 and 6, the layout, the
configuration and conformance references, the concepts, this
repository's architecture index, module note and bootloader, the
register's row and this folder, with no overlap because no other path
runs; the skills, this repository's workflow, the audit, live-view and
post-mortem tools, the records, the 1.1 page, the README and the site
excluded from change; governed by the 1.1 page, path 5's journal entry
and fourteen records at their blob ids on `main`; initial writer
`cp-cairn-009-writer`. The owner read the plan — one path for the kit
and the chapters, the concept rules' recursive read widened in, the two
candidate removals decided on value — and gave the go-ahead in the chat
with the word "yes"; that go-ahead is this acceptance, and the record
lands on the trunk directly. The owner said the units run in a fresh
session. Amendments: none.

## Documentation coverage

### Required

- `docs/architecture/01-cairn-1-1.md` at its pinned blob — the two
  sections named above, and *How a path opens* for what `init` writes.
- The fourteen records pinned in `governs:` — each unit reads the
  decisions its surface implements, at their *What implements this
  record* tables.
- `tools/cairn.mjs` as it is — every generator this path changes, read
  before it is changed, and the lock it writes.
- This repository's own `AGENTS.md`, `.github/workflows/cairn.yml`,
  `.github/pull_request_template.md` and `docs/index.md` as paths 1 to 3
  left them — the shape the generated files must match where they are
  meant to be the same.

### Conditional

- `docs/cairn/manifesto.md` — read whenever a file would be added to or
  removed from the kit for a number; the count is a measurement.
- `skills/cairn-learn/SKILL.md` and `skills/cairn-unit/SKILL.md` — the
  folders and lines the bootloader and the indexes must name as the
  skills name them.
- The Ponytail repository at the tag ADR-016 names — read to name it in
  the lock and on the pointer page, never copied.

### Deliberately excluded

- `skills/**` — path 1, done; the kit copies them whole.
- `.github/**` of this repository — path 3, done; the kit generates an
  adopter's.
- `README.md`, `site/**`, the first adopter's update — row 6.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- **S01** — [what `init` writes, and the bootloader](./steps/S01.md) — complete. `cairn init` declares `transport.registration: manual-git` whatever `--transport` answers for the integration transport, from one constant the generated binding's new row prints too, and the run names both; the bootloader the kit writes names the sixth skill and gains the concept-note and explanation rules, and this repository's `AGENTS.md` carries the same two beside the `cairn-test` alias. Advances the first and second items of the definition of done.
- **S02** — [the documentation plane the kit installs, and the concept rules' read](./steps/S02.md) — complete. The kit installs `docs/inputs/`, a concept root of three folders — `cairn`, `product`, `learning`, the owner naming the second in the chat — an architecture index carrying the dependency sentence and the diagram, a documentation index that maps the plane and states the worked example and the API link, and a module note template that describes only now; `concept-orphan` and `concept-growth` read that root recursively and name a note by its path under it, the conformance rows and their generator saying so. Advances the third and fourth items of the definition of done.
- **S03** — [the pointer page, `update` and `status`](./steps/S03.md) — complete. `cairn/README.md` generated at `init` and every `update`, the bootloader pointing at it; a pristine file is rewritten whoever owns it, an edited one is kept and what the release changed in it printed from Git's own diff, the list to settle by hand carried to disk on the page; `update --take <path>` hands over one file and moves its lock entry with it; `adopt` locks the configuration it actually wrote. Advances the fifth and sixth items of the definition of done.
- **S04** — [the manifest, the generated adapter and template](./steps/S04.md) — complete. `cairn-postmortem` in the manifest and the kit's scripts; Ponytail named at `v4.9.0` in the lock and on the pointer page, copied nowhere; the schema and the project index kept, each for its own worth; the generated workflow on the trunk alone with the red-run step, and the request template opening with the three plain lines and the definition of done before the ledger, both proved against this repository's own. Advances the seventh and eighth items of the definition of done.
- **S05** — [chapters 3 and 6, the concepts, the layout](./steps/S05.md) — complete. Chapter 3 gains the flow kind, the surface page with its worked example and API link, and the promotion outputs; chapter 6's scopes table becomes the three folders with the owner's `product` among them, its learning-notes paragraph says a learning note is a concept note with an order, and the kit's weight-budget line loses its target; the architecture concept states what a page carries and what a flow page is; the template says a note that teaches a sequence orders its body; the layout's tree and table show what `init` now writes. Advances the ninth item of the definition of done.
- **S06** — [this repository's own](./steps/S06.md) — complete. The architecture index says flow pages live here and what a page states in one sentence and one diagram; the `tools/` module note's kit section, appended to by four units, is re-read and reordered into what `init` writes, what it does not copy, what the installation knows about itself, `update`, `adopt` and the two generated host files; the register's row 4 records the widening this path made in flight. Advances the tenth item of the definition of done.
- **S08** — [six chapters, six destinations](./steps/S08.md) — complete. The owner's try before the merge found the pointer page listing six chapters over one URL; each is now linked at its own anchor, slugged from its title, and the test checks every anchor against the headings `spec/index.md` carries. Advances the fifth item, which was not met.

## Resume

### Checkpoint

```text
commit : 5bd3afa5cd5527d78e722319d15d471d08679bd2 — the void candidate, on origin/path/cp-cairn-009
unit   : 6 — S08 fixes what the owner's try found, and the candidate is rebuilt on it
base   : 76512dc75b1940a54388ff4e7fdabb53a662179a
trunk  : 3c42237147ed783e68f301626fd9637a58f3fad3 — origin/main, unmoved since registration
```

### Next action

Run S07 with `cairn-close` — the candidate. Merge the trunk in (never
rebase), run every gate bare, and open the pull request with the
description `npm run cairn-audit` prints, in the order the template now
gives: the three plain lines and the surface, the definition of done
item by item, then the ledger. One advisory stands at the candidate and
is dispositioned as accepted with its records named — `decision-drift`
on S06's architecture index, for ADR-019 d2 and ADR-023 d2 and d3,
accepted a week before this path opened. The administrative commit
declaring `ready` and `subject_commit` goes on the branch and its check
must be green **before** the owner is asked. Then the owner runs
`cairn init` into an empty folder and reads what it wrote; the merge is
the acceptance.

**Two things to put to the owner at the same time**, neither of them
this path's to fix:

- Four of the register's five milestone rows read `running` for paths
  that are done — rows 1, 2, 3 and 5, for CP-CAIRN-005 to CP-CAIRN-008.
  The status is hand-kept in the register while each path's record
  already carries `status:`, and nothing reconciles the two. Row 6 does
  not own the register either, so today nothing does.
- The review movement: fourteen of eighteen fresh contexts hung across
  this path, and S03 to S06 were read by the writing context and each
  says so in its step. The owner has already ruled that the missing
  fallback gets a record in its own path.

### Blockers

None.

### Tried and rejected

- Leaving `update --take` to write the file without touching the lock —
  ADR-015 d3 makes the file pristine *at the new release*, and pristine
  is a statement about the lock; without the entry the owner takes the
  release's version and `status` still calls it edited. One entry moves,
  not the whole lock: the installation is still at the release the rest
  of it carries.
- Naming the second concept folder from the repository's own directory,
  or from a new configuration field — `update` and `adopt` re-plan from
  `cairn.config.json`, which records no name, so a folder derived from
  the directory is a folder `update` duplicates the moment it is renamed.
  The owner chose the fixed `docs/concepts/product` in the chat of
  2026-09-15; nothing was added to the configuration or the command line.
- Deferring `spec/reference/conformance.md`'s installation row to S04 a
  second time — S01 deferred it because the manifest was not final, and
  that held until S02 changed the count and made the row contradict the
  module note inside one diff. A unit that moves a measurement updates
  its report; S04 will do the same when the manifest moves again.
- Two literals for the registration transport, one in `buildConfig` and
  one in the generated binding row — the defect the workflow test was
  written about, where one of two occurrences is left behind; one
  exported constant, printed by both (S01's self-review).
- Adding `cairn-learn` to the manifest in S01, because the bootloader it
  writes now names six skills — `planInstall` walks `skills/`, so the
  sixth file has been copied since path 1 landed it; the manifest,
  `REFERENCE_TOOLS` and the lock are S04's, and nothing was owed here but
  the list item.
- Two paths, the kit and the chapters — the chapters say what the kit
  installs, and a reader who finds them disagreeing for a week has two
  authorities; one path, the kit first and the chapters after it, in
  the same candidate.
- Leaving the two concept rules' recursive read to a later row — no row
  owns the checker after row 5, and a concept wiki in three folders the
  checker reads flat is a wiki the checker does not police; one function,
  widened in.
- Removing the configuration schema and the project index because
  ADR-013 named them — the count is no rule since ADR-022; each is kept
  or removed for what it is worth, and the step says which.
- Pinning the register in `governs:` — a write surface, as in every
  path before.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md` as path 3 left it.
2. `docs/architecture/01-cairn-1-1.md` at its pinned blob — the documentation-plane table and the tools table.
3. `tools/cairn.mjs` — the generators, `planInstall`, the lock.
4. `project/coding-paths/CP-CAIRN-009/plan.md`, then the records the unit implements, at their tables.
5. This repository's `AGENTS.md`, workflow, request template and `docs/index.md` — what the generated files must match.
6. `tools/cairn.mjs` — `planInstall`, the lock, `applyUpdate` and `applyAdopt`, before S03.

### Verify

```bash
npm run cairn-check
npm run cairn-test
```
