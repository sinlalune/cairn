---
type: Cairn Coding Path
title: Coding path 5 of 1.1 — the readings that must not lie
description: Row 5 of the roadmap register, placed before the release. A decision record promoting coding path 3's sentence — "not read" is an honest line, a wrong reading is not — into a rule that binds; the checker taught to tell an unread bypass list from an empty one and the token returned to its workflow step; the review rule reading the unit under review; and, widened in, the four leftovers path 3 found in the checker and the records: a stale sentence on the conformance page, one commit for one path against "never two paths in one request", the merge-object refusal gated by the transport the close skill prescribes, and the post-mortem reading from what the checker exports.
tags: [coding-path, implementation, cairn-1.1, checker, forge, honesty]
timestamp: 2026-09-14T00:00:00Z
cairn:
  id: CP-CAIRN-008
  route: full
  status: done
  current_step: S07
  base_commit: 28169830081b7a09077696ff96345d3e6b4705d7
  branch: path/cp-cairn-008
  assigned_writer: cp-cairn-008-writer
  depends_on: []
  subject_commit: bd786f9c28e6f880dc35ec09495a5fca77be4f51
  resolution: completed
  writes:
    - docs/adr/**
    - docs/architecture/01-cairn-1-1.md
    - docs/architecture/index.md
    - tools/cairn.mjs
    - tools/cairn.test.mjs
    - tools/cairn-check.mjs
    - tools/cairn-check.test.mjs
    - tools/cairn-workflow.test.mjs
    - tools/cairn-rules.mjs
    - tools/cairn-rules.test.mjs
    - tools/cairn-fixture.test.mjs
    - tools/cairn-postmortem.mjs
    - tools/cairn-postmortem.test.mjs
    - tools/soundness.md
    - .github/workflows/cairn.yml
    - spec/reference/conformance.md
    - skills/cairn-close/SKILL.md
    - skills/cairn-close/reference.md
    - docs/modules/application.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-008/**
  governs:
    - docs/architecture/01-cairn-1-1.md@5169cada907b62f2882a2fc4379ca2b619a91a9d
    - project/log/2026-09-14-cp-cairn-007.md@ad1ee64039293cb622014f654389b6adcc0dd4a3
    - project/coding-paths/CP-CAIRN-007/steps/S03.md@fe9805f030b7efe77b91a7a43c28e6a1d51b5442
    - docs/adr/ADR-001-sole-owner-opens-and-closes-a-path.md@c1feab4c345806f5d014b4677924a707ab9aaace
    - docs/adr/ADR-008-housekeeping-with-no-choice-in-it.md@c4accd293ec3d2d546bd5e86c232c08406c357d4
    - docs/adr/ADR-014-two-tools-of-1-1.md@f27627d460a3d8494866df8bb4c256be0a18f540
    - docs/adr/ADR-017-the-review-movement.md@00be46249d9f3e1a7aa5ed1432c023b7a14fd696
---

# CP-CAIRN-008 — the readings that must not lie

## Goal

This path makes the gate say only what it read, and read the unit it
claims to judge. It is the least because it changes two readings and
returns one token, each behind one record it writes first, and the four
leftovers it widens in are each one sentence, one condition or one
import in a file the gate already owns. It does not touch the
specification's chapters, the layout, the README or the site: those are rows 4
and 6, and so is the kit's installer, of which the amendment of 2026-09-14
takes one line — the base the workflow it generates gives the checker.

**Why this row stands before the release.** Path 3 mapped the forge's
token into the checker's step, and the gate printed *forge enforces
everything these records name* while the trunk's ruleset carries a role
that bypasses it always: a workflow's token may not read a ruleset's
bypass list, the forge elides the field rather than refusing it, and
`forgeGaps` read the silence as safety. Path 3 took the token out and
closed item 2 of its definition of done knowingly unmet, on the owner's
ruling; its S03 named the reading that lied, and the sentence this path
promotes — *"Not read" is an honest line; a wrong reading is not* — is
the checker's own, read there by that path's S04. Beside it, the `review` rule
selects the unit to read by `current_step` over a list sorted by
ordinal, so the field can only ever point at a unit older than the one
just written: on path 3 six units' review sections were never read by
the gate. A gate that certifies a protection the repository does not
have, and a rule that reads the wrong unit, must not be what 1.1.0
ships. The owner's own pushes to the trunk print *Bypassed rule
violations*: that is the live case the profile line exists to report.

**The leftovers of path 3, and how this path resolves them.** Path 3's
[journal entry](../../log/2026-09-14-cp-cairn-007.md) names five debts;
the fifth, the kit's manifest, is row 4's. The other four are the
checker's or a record's, and this path widens its writes by the
conformance page, the close skill and the post-mortem tool to carry
them: the conformance page says the writer's half of a step supersession
*is not yet written*, which path 3 wrote — one sentence corrected; ADR-008
decision 2 says *never two paths in one request* where the checker
refuses two paths in one commit and argues the narrower rule in its own
comment — the record this path writes says which reading binds, one
commit for one path, and the sentence follows; the checker refuses a
merge object carrying `done` on every transport while the close skill
prescribes exactly that `--no-ff` merge on `manual-git` and ADR-008
decision 2 speaks of `pull-request` alone — the refusal is gated by the
declared integration transport, and the skill and the checker say the
same thing; and the post-mortem repeats the checker's private Git
plumbing because path 3 held the checker byte-identical — the checker
exports the readings, and the tool imports them.

Row 5 of the [roadmap register](../index.md) scopes the rest, and the
[1.1 page](../../../docs/architecture/01-cairn-1-1.md), sections *How a
path runs*, *How a path closes* and *What the checker reads at each
transition*, states the shape. The records it implements and extends: the
profile line that says what the forge does not enforce (ADR-001 decision
6); one commit for one path (ADR-008 decision 2); the post-mortem's
readings (ADR-014 decision 1); the review rule (ADR-017 decision 2); and
the record it writes, promoted from path 3's S03 and journal.

## Definition of done

- [ ] One decision record, ADR-026, exists in the layout's shape,
      *promoted from* path 3's S03 and journal entry at the blob ids
      pinned in this record, with four decisions: a reading the forge
      withheld is reported as unread and never as an answer, and the
      profile line names what it could not read (extends ADR-001 decision
      6); the `review` rule judges the ledger's newest completed unit, the
      unit under review, and `current_step` selects nothing (extends
      ADR-017 decision 2); the integrating commit is one commit for one
      path, the reading the checker has, and the sentence *never two paths
      in one request* of ADR-008 decision 2 is superseded by it; the
      refusal of a merge object carrying `done` binds on `pull-request`
      integration transport and not on `manual-git`, where the `--no-ff`
      merge is the integrating unit, as ADR-008 decision 2 and chapter 5
      already say (extends ADR-008 decision 2). The 1.1 page is amended
      to match, marked *since 2026-09-14*; the index of `docs/adr/` lists
      the record after ADR-025.
- [ ] `forgeGaps` tells an unread bypass list from an empty one: a
      ruleset whose bypass field the token could not read is reported as
      *bypass list not read* and never as a trunk nobody bypasses;
      `readForge` names the half it could not read; the profile line
      prints, in one line, what was read, what was withheld and what the
      forge does not enforce among what was read; the `forgeGaps` and
      profile-line cases are rewritten against the new reading, the
      withheld case among them; and `GITHUB_TOKEN` returns to the
      checker's step of `.github/workflows/cairn.yml`, so that item 2 of
      coding path 3's definition of done is met, and the run on this
      repository's trunk prints the bypass as unread and not as absent.
- [ ] The `review` rule reads the review section of the ledger's newest
      completed unit, the `find(…) ??` selection gone; a fixture whose
      `current_step` names an older unit than the one just written, with
      the newer unit's review section empty, is refused; `current_step`
      keeps its place in the record's schema and selects nothing.
- [ ] The `acceptance` rule's refusal of a merge object carrying `done`
      reads the declared integration transport and binds on
      `pull-request` alone, with a fixture for each transport; its
      refusal of two paths in one commit stands, and its comment and test
      say one commit for one path, as the record does.
- [ ] `spec/reference/conformance.md` no longer says the writer's half of
      a supersession is unwritten, and names where it is written; the
      catalogue and the matrix are regenerated for the two rules that
      change; `tools/soundness.md` carries one line per changed reading.
- [ ] The `cairn-close` skill and its reference say what the checker now
      refuses and allows, by transport, in the sentences ADR-008 decision
      2 names: one commit for one path; on `pull-request`, never a merge
      object carrying the edit; on `manual-git`, the `--no-ff` merge as
      the integrating unit.
- [ ] `tools/cairn-postmortem.mjs` reads the registration commit, the
      `ready` shape, the digest and each step's integrity through the
      functions `tools/cairn-check.mjs` exports, and calls Git itself for
      nothing the checker already reads; the checker exports what the tool
      needed and nothing more; the post-mortem's tests still pass on the
      same fixtures.
- [ ] `docs/modules/application.md` describes the checker and the
      post-mortem as they are at the candidate, with no history.
- [ ] Nothing under `tools/cairn.mjs` except the base the workflow it
      generates gives the checker, which item 13 requires, and nothing
      under `tools/cairn-audit.mjs`,
      `tools/cairn-active.mjs`, `spec/index.md`,
      `spec/reference/repository-layout.md`, `skills/cairn-open`,
      `skills/cairn-unit`, `README.md` or `site/` changes; the six
      governing documents other than the page are byte-identical at the
      candidate to what they are at `base_commit`, and the page is
      amended in place and marked; the register, a write surface, gains
      this path's id in row 5 and the widened files in its writes column.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, a self-review in the five tags and a
      `#### Review` section carrying the fresh-context read of its diff
      with each finding's disposition and the bounded second read; every
      behaviour change has its failing test first; `current_step` names
      the unit whose block is in the commit.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      reviewed in the pull request's description in the order the audit
      tool prints; the administrative commit declaring `ready` and
      `subject_commit` is on the branch with its check green before the
      owner is asked to merge; the owner reads the profile line the
      request's run prints on this repository, with the token, before the
      merge; the merge is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.
- [ ] A run that judges an integrating commit compares the trunk across
      the arrival. The checker reports a base it cannot resolve as
      inconclusive and never crashes on one; `.github/workflows/cairn.yml`
      bases a push run on a ref that predates the arrival and a request run
      on its target branch, with the absence of such a ref — a branch's
      first push — reported and not fatal; `tools/cairn-workflow.test.mjs`
      asserts both, in place of the expression that made every trunk run
      read zero changed files; a fixture drives an integrating commit
      through a trunk-shaped run and fails without the change;
      `tools/cairn.mjs` generates the same base for an adopter, its
      installed-kit test asserting it; a case drives the unresolvable base
      and fails on the crash; and
      `spec/reference/conformance.md` and `tools/soundness.md` name the
      rules this restores to an integration — `transition`, `acceptance`,
      `journal-entry` and `scope-digest` among them.
- [ ] One decision record, ADR-027, says the `ready` behind an integrating
      commit is read from any parent of it, an octopus merge included, and
      the uncommitted case is left reading the head as today. It extends
      ADR-001 decision
      7, which names no parent while its own reasoning covers the
      `manual-git` merge unit, and ends the debt this path's S03 raised at
      its boundary. `integrationState` reads any parent instead of
      `commit^`, and nothing is added to reach it; the
      existing `manual-git` fixture, which today asserts `transition`
      refuses the prescribed closing, has that assertion and its comment
      inverted; the `pull-request` merge-object fixture gains the
      assertion that `acceptance` alone now refuses it, the incidental
      `transition` refusal being given up knowingly; the edge ADR-001
      decision 7 closes — an arrival with no `ready` behind it — stays
      closed, and its fixture still refuses. The 1.1 page carries
      its own amendment paragraph for this record; the ADR index, the
      catalogue, the conformance row, `tools/soundness.md`, the
      `cairn-close` skill and its reference and `docs/modules/
      application.md`, which all carry the debt as undecided, follow.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-14T11:49:00Z
scope_ref: project/coding-paths/CP-CAIRN-008/index.md#definition-of-done
scope_digest: sha256:19e154a8c9a43a1266f0dd617a46516662d13dbee7cb8f69305353f7f0c45045
```

Reviewed in the chat of 2026-09-14: route `full` because the path
changes the checker and the workflow, control-plane surfaces, and writes
a decision record; the definition of done above; writes limited to the
records, the 1.1 page and its index, the checker, the rules, the fixture
and test files, the post-mortem tool and its test, the soundness note,
the workflow, the conformance page, the close skill and its reference,
the tools' module note, the register's row and this folder, with no
overlap because no other path runs — row 4 shares no file with it; the
kit's installer, the audit and live-view tools, the chapters, the layout,
the open and unit skills, the README and the site excluded from change;
governed by the 1.1 page, path 3's S03 and journal entry and four
records at their blob ids on `main`; initial writer `cp-cairn-008-writer`.
The owner read the plan — the record first, the forge reading and the
token, the two rules, path 3's four leftovers widened in, `current_step`
kept as decoration — and gave the go-ahead in the chat with the word
"yes"; that go-ahead is this acceptance, and the record lands on the
trunk directly. The owner said the units run in a fresh session.
Amendments: two, below.

### Amendment of 2026-09-14 — the gate reads the integration it judges

A bot review of candidate `a2489a9` found the sentence S04 wrote about the
`manual-git` closing false, and S07's own reading found the cause larger than
the sentence: no run compares the trunk across an integrating commit, on either
transport. A bare run off the trunk resolves no base and sees the working tree;
the installed workflow bases a push run on `origin/main`, which after that push
already names the pushed commit. This repository's own trunk runs print
`0 changed file(s)` — CP-CAIRN-007's integration among them — so `transition`,
`acceptance`, `journal-entry` and `scope-digest` have never judged an arrival
here.

The owner was asked whether to correct the documents and leave the reading to a
new path, or to amend this path's scope and fix it here, and chose to fix it
here. The reason is the one the fresh reader gave: every file the fix needs was
already in `writes:` but one, and a gate reporting OK over a reading it never
made is this path's own subject.

This acceptance supersedes the one above it. It adds a thirteenth item to the
definition of done and widens `writes:` by `tools/cairn.mjs`, which generates
the same base line for every adopter. Item 10 is amended with it, by exactly
that much: it listed `tools/cairn.mjs` among the files nothing may change, and
now excepts the base the generated workflow gives the checker. The other eleven
items are the text they were accepted with.

Two sentences of the acceptance above are narrowed by this one, and are left
standing as what was true when it was written. *Row 4 shares no file with it*
and *it does not touch the kit's installer* are now false of one line:
`tools/cairn.mjs` is row 4's file, and row 4 has no path, so nothing runs beside
this one and `writes-overlap` — which reports only live paths — stays silent.
Row 4 inherits a file this path has already moved, and its own registration
reads this amendment. The Goal above says so.

The `transition` reading itself — whose refusal would fire once the comparison
spans the arrival — stays undecided and ADR-001 decision 7's.

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-14T17:05:00Z
scope_ref: project/coding-paths/CP-CAIRN-008/index.md#definition-of-done
scope_digest: sha256:99b10b19aa4fab0a430b1b7e7ae72af121a4252d31f14b41fd6c1b55904cefa5
supersedes: 2026-09-14T11:49:00Z
```

### Amendment of 2026-09-14 — the ready behind an integrating commit

Item 13 gives `transition` its input, and the moment it has one it refuses an
honest `manual-git` closing: `integrationState` reads `commit^`, the FIRST
parent, and on that transport the `--no-ff` merge *is* the integrating unit, so
the `ready` the branch declared sits on the second. Landing item 13 alone would
take a `manual-git` adopter from silently unchecked to refused, for a reading
no record decides. The two must land together or not at all.

The owner was asked where the rule should look and ruled: **any parent**. A
plain commit has one, a merge has two, an octopus merge has more, and the
declaration may sit on any of them. That is one expression and no second place where the checker asks which
transport it is judging — smaller than the transport gate ADR-026 decision 4
used for `acceptance`, and it leaves nothing knowingly suppressed. The debt is
this path's own, raised by S03 at its boundary; ADR-026 decided the
`acceptance` half and does not reach this one.

This acceptance supersedes the one above it. It adds a fourteenth item and
nothing else: no surface is widened, because the record, the page, the checker,
the fixtures, the catalogue, the conformance page and the soundness note are
all already in `writes:`. The thirteen items above are the text they were last
accepted with.

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-14T17:40:00Z
scope_ref: project/coding-paths/CP-CAIRN-008/index.md#definition-of-done
scope_digest: sha256:d4bfa74b199ddff35c2046cecbf30b0f9729ed748065fa98ac4d900129801a1c
supersedes: 2026-09-14T17:05:00Z
```

## Documentation coverage

### Required

- `project/coding-paths/CP-CAIRN-007/steps/S03.md` and
  `project/log/2026-09-14-cp-cairn-007.md` at their pinned blobs — the
  sentence this path promotes, the reading that lied and how, and the
  four debts in path 3's own words.
- `docs/architecture/01-cairn-1-1.md` at its pinned blob — the three
  sections named above.
- The four records pinned in `governs:` — each unit reads the decisions
  its reading extends, at their *What implements this record* tables.
- The forge's documentation on what a workflow's token may read of a
  ruleset, and on the fields it elides — read for S02, and cited in the
  record.

### Conditional

- `docs/cairn/manifesto.md` — read whenever a reading would refuse more
  than its record names; a withheld reading is reported, not refused.
- `spec/index.md` chapter 5, *Close one exact candidate* and *The trust
  boundary* — the requirements the readings stand behind; read, never
  written.
- `skills/cairn-unit/SKILL.md` as path 3 left it — the writer's half of
  the supersession the conformance page must point at.

### Deliberately excluded

- `tools/cairn.mjs` and the kit's manifest — row 4, which installs the
  post-mortem tool.
- `README.md`, `site/**`, the 1.1 page's opening sentence — row 6.
- Reading the bypass list by any means the workflow's token does not
  have — a personal token in a secret is the adopter's choice and never
  the kit's default.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- **S09** — [the gate reads the integration it judges](./steps/S09.md) — complete. Item 13. One new blocking rule, `comparison`, standing behind *One invocation, one verdict* — a stated requirement that carried fixtures and no predicate: it reports a base that cannot be compared with this commit, and, off a path branch, one that already contains it; the forge's sentinel for a first push is advisory, not blocking. The workflow and the kit's generated workflow base a request run on its target branch, a trunk push on the commit it replaced, and a path-branch push on the trunk. Widened `writes:` by `tools/cairn.test.mjs`.
- **S08** — [ADR-027, the ready behind an integrating commit](./steps/S08.md) — complete. The `ready` behind an arrival is read from any parent of it, extending ADR-001 decision 7, whose own reasoning covers the `manual-git` merge unit while its implementation read the first parent. The record names what it gives up: on `pull-request` the merge-object shape loses `transition`'s incidental refusal and keeps `acceptance`'s. Item 14's record half; the rule is S10's.
- **S07** — [the refusal that never fires](./steps/S07.md) — complete. A bot review of candidate `a2489a9` found S04's sentence on the `manual-git` closing false: `transition` does not refuse it on the forge's run, because no run compares the trunk across an integrating commit. Measured on this repository's own trunk runs, which print `0 changed file(s)`, and true on both transports. The two skill documents and the soundness note say what is true; the rules, their fixtures and the workflow are untouched, and the base that spans the arrival is item 13's, added by the amendment of 2026-09-14 and implemented by S08. Candidate `a2489a9` void; advances the sixth item.
- **S06** — [the register's widened file](./steps/S06.md) — complete. Row 5's writes column gains `tools/cairn-workflow.test.mjs`, which S02 widened the record's `writes:` by and the register, declaring the same scope, did not follow; the plan carries a numbering note, and the closing becomes S07. Found by the closing's own read of the candidate against the ninth item, which it advances and completes.
- **S05** — [the module note](./steps/S05.md) — complete. `docs/modules/application.md` describes the checker and the post-mortem as they are: *The rules* split at the four subjects it had run together, and a section for the post-mortem, which had a table row and no paragraph. Two sentences inherited from that row were false and are corrected. Advances the eighth item of the definition of done.
- **S04** — [path 3's four leftovers](./steps/S04.md) — complete. The conformance page names where the supersession's writer half is written, and two rows S03 left behind are corrected; the close skill and its reference say what the checker refuses and allows by transport, and where a `manual-git` closing still meets the undecided `transition` refusal; the post-mortem imports the checker's readings and its Git plumbing — `gitOrNull`, `recordShapes`, `recordHistory`, `recordFrontAt`, `stepRecordOrigin`, `refExists` — and is 103 lines shorter, with its output byte-identical across every path record. Advances the rest of the fifth item, the sixth and the seventh.
- **S03** — [the two rules](./steps/S03.md) — complete. The `review` rule reads the newest unit kept in a ledger, the unit under review, and `current_step` selects nothing; the `acceptance` rule's merge-object refusal binds on `pull-request` integration alone, and its comment names one commit for one path as the reading that binds. Catalogue, conformance rows — generated and hand-written — and the soundness note follow. Advances the third and fourth items of the definition of done and the catalogue half of the fifth. Found: the `transition` rule refuses the same `manual-git` closing for its own reason, which ADR-026 does not decide.
- **S02** — [the forge reading, and the token back](./steps/S02.md) — complete. `forgeGaps` returns `{ gaps, withheld }` and never sums the two; `readForge` names the half it could not read, with the reason where the forge gave one, instead of failing the whole read; the profile line prints read, withheld and unenforced where anything was withheld, and never claims the whole forge over an unread reading; a rule that names no ruleset is withheld rather than skipped. `GITHUB_TOKEN` is back in the checker's workflow step. Advances the second item of the definition of done, and closes item 2 of coding path 3's. Widened `writes:` by `tools/cairn-workflow.test.mjs`.
- **S01** — [ADR-026, the readings that must not lie](./steps/S01.md) — complete. The four decisions of this path written as one record, promoted from path 3's S03 and journal entry at their pinned blobs, with the forge's documentation cited for the elision and for what a workflow's token may be granted; the 1.1 page amended in place and marked *since 2026-09-14*, the two indexes and the register's two rows following. Advances the first item of the definition of done.

## Resume

### Checkpoint

```text
commit : bd786f9c28e6f880dc35ec09495a5fca77be4f51 — candidate C, on origin/path/cp-cairn-008
unit   : 11 — the closing; C is checked green on the request's own run, 329 tests passing
base   : 28169830081b7a09077696ff96345d3e6b4705d7
trunk  : 99554f22cd64103a9e66dfd7b9af616543836082 — origin/main at C
```

### Next action

Run S08 with `cairn-unit`: ADR-027, item 14's record, written before the
rule moves as every record of this path has been — the `ready` behind an
integrating commit read from any parent, extending ADR-001 decision 7.
Then S09, item 13: the unresolvable base reported rather than fatal, the
workflow's base on each event, the workflow test that today pins the
defective expression, the fixture for an arrival, the kit's generated
base. Then S10, item 14's rule — any parent of the arrival — and its
`manual-git` fixture, which must land with S09 and not after it — item 13 alone would refuse an honest
`manual-git` closing. Then the closing, unit 6 of the plan, which the
plan's numbering note runs as S11, with `cairn-close`, not `cairn-unit`:
it carries no step file and no review of its own (ADR-008 decision 1),
and its unit type is `closure`. Candidate `a2489a9` is void; the new `C`
is S10's commit. Merge the trunk in, run every gate bare on it,
and update pull request #17's description with what `npm run cairn-audit` prints, in the order it
prints: the three plain lines and the surface link, the definition of
done item by item, then the ledger. Ask the owner to try the result —
the profile line the request's run prints, with the token — signalled as
a decision in the chat. Then the administrative commit on the branch,
`ready` and `subject_commit` only, with its check green before the merge
is asked for. The `transition` reading S03 found is no longer a debt: the
amendment of 2026-09-14 made it item 14, and ADR-027 decides it.

### Blockers

One decision was with the owner, raised at S03's boundary: the `transition`
rule reads the merge's FIRST parent for the `ready` behind an integrating
commit, so on `manual-git` — where the `--no-ff` merge is the integrating unit
and the `ready` commit sits on the second parent — it would refuse an honest
closing. ADR-026 decision 4 freed the `acceptance` refusal only, and the
reading is ADR-001 decision 7's.

**Answered.** S07 found that it refuses nothing today, because no run compares
the trunk across an integrating commit and the rule is never reached; item 13
gives it input. The owner then ruled on the reading itself — any parent of the
arrival — which is item 14 and ADR-027, written by S08. The two land together,
S09 and S10, because item 13 alone would take a `manual-git` adopter from
silently unchecked to refused. No decision is with the owner on this path.

### Tried and rejected

- Running row 4 first, in the register's order — row 5 was placed before
  the release for a gate that certifies a protection the repository does
  not have, and the two rows share no file; the owner chose this one
  first, and row 4 may run beside it.
- Leaving path 3's four checker and record debts to a later row — no row
  owns the checker after row 2, and each is one sentence, one condition
  or one import in a file this path opens; the owner agreed to the
  widening in the chat.
- Deleting `current_step` from the schema now that it selects nothing —
  every record of this repository carries it and `work-unit` reads it;
  the record says it is decoration, and its removal is a later
  decision.
- Pinning the register in `governs:` — a write surface, as in paths 1
  to 3.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md` as path 3 left it.
2. `project/coding-paths/CP-CAIRN-007/steps/S03.md` and the journal entry at their pinned blobs — the lie and the debts.
3. `docs/architecture/01-cairn-1-1.md` at its pinned blob — the three sections.
4. `project/coding-paths/CP-CAIRN-008/plan.md`, its numbering note and item 6 — what the closing owes.
5. `skills/cairn-close/SKILL.md` and its reference, for the closing sequence on `pull-request`; the six step records under `./steps/`, whose summaries above say which item each advanced.

### Verify

```bash
npm run cairn-check
npm run cairn-test
```
