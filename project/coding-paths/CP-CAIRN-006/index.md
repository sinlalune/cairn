---
type: Cairn Coding Path
title: Coding path 2 of 1.1 — the checker reads what it did not
description: The second implementation path of Cairn 1.1, row 2 of the roadmap register. The checker gains the profile line, the refusal of running-to-done without a ready commit, the seal at every transition, the writes-overlap advisory, the six corrections of ADR-004, one commit for one path, one journal key, refusals that name the remedy, and the review rule; and it opens by settling the two debts path 1 left — ADR-001 decision 1's incoherent kit default, and the reading of a red run's post-mortem — with two decision records before any rule is written.
tags: [coding-path, implementation, cairn-1.1, checker, rules]
timestamp: 2026-09-11T00:00:00Z
cairn:
  id: CP-CAIRN-006
  route: full
  status: running
  current_step: S09
  base_commit: 37752a2ff3cdbbc33f83201eb4a0c4276a69b9f8
  branch: path/cp-cairn-006
  assigned_writer: cp-cairn-006-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - tools/cairn-check.mjs
    - tools/cairn-rules.mjs
    - tools/cairn-check.test.mjs
    - tools/cairn-rules.test.mjs
    - tools/cairn-fixture.test.mjs
    - tools/cairn-audit.test.mjs
    - tools/cairn-pilot.mjs
    - tools/soundness.md
    - spec/reference/conformance.md
    - spec/concepts/lifecycle.md
    - docs/modules/application.md
    - docs/adr/**
    - docs/architecture/01-cairn-1-1.md
    - docs/architecture/index.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-006/**
  governs:
    - docs/architecture/01-cairn-1-1.md@8190acfa186af205a8f1d4b35c3c0e684f11a9f3
    - project/log/2026-09-10-cp-cairn-005.md@b69c03fcc0e62be72f4c7bdb288f38dbdc41be8e
    - docs/adr/ADR-001-sole-owner-opens-and-closes-a-path.md@c1feab4c345806f5d014b4677924a707ab9aaace
    - docs/adr/ADR-002-the-checkboxes-stay-and-the-seal-is-checked-everywhere.md@e81fde2a0c5043cdba1c8226f997ac9bf600acca
    - docs/adr/ADR-003-two-live-paths-on-the-same-files.md@2cb434e7e87842bd936f1d6c395fa3716d948af5
    - docs/adr/ADR-004-the-checker-reads-what-it-did-not.md@d3cfd7d9f01de54c342d755b0b20b8c65c92fb67
    - docs/adr/ADR-008-housekeeping-with-no-choice-in-it.md@c4accd293ec3d2d546bd5e86c232c08406c357d4
    - docs/adr/ADR-014-two-tools-of-1-1.md@f27627d460a3d8494866df8bb4c256be0a18f540
    - docs/adr/ADR-017-the-review-movement.md@00be46249d9f3e1a7aa5ed1432c023b7a14fd696
---

# CP-CAIRN-006 — the checker reads what it did not

## Goal

This path makes the checker refuse what the records of 1.1 refuse and
report what they report, and it settles the two debts path 1 left before
it writes a rule. It is the least because every rule it adds stands
behind a record already accepted, every fixture is the one adversarial
case ADR-004 asks for, and the two debts are closed by two records in
one unit rather than reopened in the chat. It does not touch the skills,
the workflow, the post-mortem tool, the kit's installer, the chapters,
the README or the site: those are paths 1, 3, 4 and 5.

**The two debts, and how this path resolves them.** Path 1's
[journal entry](../../log/2026-09-10-cp-cairn-005.md) names them.
First, ADR-001 decision 1 is incoherent: it keeps the kit's installed
default at `transport.registration: pull-request` while deleting the
skill's pull-request sequence, so an adopter installing the kit today
gets a skill that pushes the registration commit to the trunk against
a configuration that says otherwise. Second, path 1's definition of
done said *a red run's post-mortem is read before the next unit* and no
record decides it. Both are decisions, and chapter 3 says a challenge
to the vision is a superseding record and a page amended to match; so
this path's first unit is a `decision` unit that writes two records —
ADR-024, superseding the clause of ADR-001 decision 1 on the kit's
default so that a 1.1 repository is installed with `manual-git`
registration, the value the protocol's *what 1.1 removes* already
implies, with `pull-request` kept only as a value a 1.0 repository
declares until it updates; and ADR-025, deciding that the post-mortem
the workflow puts on a request after a red run is read by the writer
before the next unit, one sentence the unit skill gains when path 3
builds the tool — amends the 1.1 page to match, and names in the
register's rows 3 and 4 the surfaces each record changes. The checker
this path builds reads the transport the record settles: the profile
line of ADR-001 decision 6 names the declared transports beside what the
forge does not enforce. Nothing of the kit's default is changed here;
path 4 changes it from ADR-024.

Row 2 of the [roadmap register](../index.md) scopes the rest, and the
[1.1 page](../../../docs/architecture/01-cairn-1-1.md), section *What the
checker reads at each transition*, states what every rule must read. The
decisions it implements: the profile line and the refusal of `running`
to `done` without a `ready` commit (ADR-001 decisions 6 and 7); the
seal judged at every transition on every ref (ADR-002 decision 1); two
live paths on the same files (ADR-003); the registration commit as the
activation, a running path's remote checkpoint, path-scoped range rules,
a trunk merge in every blocking fixture, the branch resolved from where
the checker stands, the three Crumbz repairs upstream (ADR-004
decisions 1 to 6); one commit for one path, one journal key, refusals
that name the remedy (ADR-008 decisions 2, 4 and 6); the `review` rule
(ADR-017 decision 2). And the checker's own case: the closing of path 1
took the trunk from `running` to `done` in one commit on the edge
this path removes, and that real shape is the fixture the refusal is
proved against, as ADR-004 decision 4 asks. The history is not tidied.

## Definition of done

- [ ] Two decision records, ADR-024 and ADR-025, exist in the layout's
      shape, *promoted from* path 1's journal entry at the blob id pinned
      in this record: ADR-024 supersedes, and names, the clause of ADR-001
      decision 1 on the kit's installed default, so that a repository
      installed at 1.1 declares `transport.registration: manual-git`,
      the value `pull-request` staying in the configuration's schema for
      a 1.0 repository until `update` reaches its configuration, and
      the skills as path 1 left them are coherent with the default;
      ADR-025 decides that a red run's post-mortem, put on the request by
      the workflow ADR-014 decision 1 names, is read by the writer before
      the next unit, and names the unit skill's sentence as path 3's; the
      1.1 page is amended to match, marked *since 2026-09-11*, with a
      *promoted from* link to the journal entry; the index of `docs/adr/`
      lists both with no gap after ADR-023; the register's rows 3 and 4
      name the records and the surfaces each changes.
- [ ] Every run of `cairn-check` prints a profile line saying what the
      forge does not enforce on this repository — the owner's bypass of
      the trunk's ruleset, a required check the free plan cannot make
      block a merge — and the transports the configuration declares
      (ADR-001 decision 6); the line is printed on the `ci` and `local`
      profiles alike and is not a finding.
- [ ] A trunk commit that takes a path from `running` to `done` with no
      `ready` commit behind it is refused by `transition`, and the
      refusal names the remedy — declare `ready` on the branch first
      (ADR-001 decision 7, ADR-008 decision 6); the fixture that proves it
      is the shape path 1's closing took, and the `trunkIntegration`
      exception in `transitionErrors` is gone.
- [ ] The scope digest of the definition of done is judged at every
      transition and on every ref — a unit on the branch, the candidate,
      `ready`, the integrating commit — against the acceptance block in
      force, whatever the status (ADR-002 decision 1); a fixture ticks a
      box at `done` and is refused.
- [ ] A registration, and every unit, of a path whose `writes:` meets a
      live path's raises the advisory `writes-overlap`, naming both paths
      and the patterns that meet, and is silent when the later path
      declares `depends_on` the earlier (ADR-003); the catalogue and the
      soundness note carry it.
- [ ] The checker reads as ADR-004 decides: the registration commit is
      the trunk commit in which `status` became `running` and
      `base_commit` its parent, a draft landed earlier notwithstanding
      (decision 1); a running path whose record carries a `cairn-unit`
      block names a checkpoint that exists on the remote (decision 2);
      every range rule reads only this path's records (decision 3); the
      branch is resolved as the local ref, else `HEAD` on the request
      head, else the remote-tracking ref, and the detached-checkout
      advisory says which was used (decision 5); the same-branch step
      supersession, the chronological path-scoped provisional resolution
      and the detached-checkout evidence the adopter repaired in its own
      checker are the kit's (decision 6).
- [ ] The integrating commit is one commit for one path — a commit that
      is a merge object carrying the edit, or that takes two paths to
      `done`, is refused (ADR-008 decision 2); the journal entry is read
      under the one key `cairn.path`, and the message that named two is
      gone (decision 4); every blocking refusal's message names the
      remedy in one sentence (decision 6).
- [ ] The blocking rule `review` exists: the step record of a path's
      current unit carries a `#### Review` section that is not empty,
      `closure` excepted, and the section's content is not read
      (ADR-017 decision 2); its fixture, its catalogue entry on the
      conformance page and its soundness line exist.
- [ ] Every blocking rule's fixture contains a merged trunk commit
      carrying another path's completed unit, so that a rule passing on a
      single-path history alone is not proved (ADR-004 decision 4); the
      fixture suite passes; the catalogue on the conformance page and its
      linkage are regenerated and every rule stands behind a stated
      requirement.
- [ ] The citations of an earlier repository's records under `tools/`
      are replaced by this repository's, and `docs/modules/application.md`
      describes the tools as they are at the candidate, with no history.
- [ ] Nothing under `skills/`, `.github/`, `tools/cairn.mjs`,
      `tools/cairn-audit.mjs`, `tools/cairn-active.mjs`, `spec/index.md`,
      `README.md` or `site/` changes; the nine governing documents are
      byte-identical at the candidate to what they are at `base_commit`,
      except the 1.1 page, which S01 amends in place and marked.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, a self-review in the five tags and a
      `#### Review` section carrying the fresh-context read of its diff
      with each finding's disposition and the bounded second read.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      reviewed in the pull request's description in the order the template
      gives — three plain lines and the surface link, the definition of
      done item by item, the ledger; the administrative commit declaring
      `ready` and `subject_commit` is on the branch before the owner is
      asked to merge; the owner tries the checker before the merge, and
      the merge is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-11T09:33:25Z
scope_ref: project/coding-paths/CP-CAIRN-006/index.md#definition-of-done
scope_digest: sha256:63676e6f692a3fc7847aecfe8584d24251cbdb27abced31c1e91572d2d7d4319
```

Reviewed in the chat of 2026-09-11: route `full` because the path
changes the checker, a control-plane surface, and writes two decision
records; the definition of done above; writes limited to the checker,
the rules, the fixtures and tests, the soundness note, the conformance
page, the tools' module note, the decision records, the 1.1 page and
its index, the register's rows and this folder, with no overlap because
no other path runs; the skills, the workflow, the other tools, the
chapters, the README and the site excluded from change; governed by the
1.1 page, path 1's journal entry and seven records at their blob ids on
`main`; initial writer `cp-cairn-006-writer`. The owner read the plan —
the two debts settled by two records in the first unit, ADR-024 toward
`manual-git` as the 1.1 default, the page as the one governed document
the path amends — and gave the go-ahead in the chat with the word "yes";
that go-ahead is this acceptance, and the record lands on the trunk
directly. The owner said the units run in a fresh session. Amendments:
none.

## Documentation coverage

### Required

- `project/log/2026-09-10-cp-cairn-005.md` at its pinned blob — the
  two debts, in path 1's own words, the source S01 promotes.
- `docs/architecture/01-cairn-1-1.md` at its pinned blob — *What the
  checker reads at each transition*, the table every rule is read
  against.
- The seven records pinned in `governs:` — each unit reads the
  decisions its rule implements, at their *What implements this record*
  tables.
- `spec/reference/conformance.md` — the catalogue and the linkage as
  they stand, regenerated at the end.

### Conditional

- `docs/cairn/manifesto.md` — read whenever a rule would refuse more than
  its record names; the first threat is more control.
- `spec/index.md` chapter 5, *The lifecycle is a statement of fact* and
  *Close one exact candidate* — the requirements the rules stand behind;
  read, never written.
- `skills/cairn-open`, `cairn-unit`, `cairn-close` as path 1 left them
  — the procedures the refusals must name as remedies.
- `tools/cairn.mjs` — read so that ADR-024 names the default it changes
  by today's name; never written.

### Deliberately excluded

- `skills/**`, `.github/workflows/**`, `tools/cairn.mjs`,
  `tools/cairn-audit.mjs`, `tools/cairn-active.mjs`, `tools/cairn-postmortem.mjs`,
  `spec/index.md`, `README.md`, `site/**` — paths 1, 3, 4 and 5.
- The kit's installed default — ADR-024 decides it; path 4 changes it.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- [**S01**](./steps/S01.md) — the two debts, two records: ADR-024
  superseding the kit-default clause of ADR-001 decision 1, so a
  repository installed at 1.1 declares `manual-git` registration and
  `--transport` names the integration transport alone; ADR-025 deciding
  that a red run's post-mortem is read before the next unit, one sentence
  of the unit skill's resume movement; the 1.1 page amended in place and
  marked *since 2026-09-11*, the two indexes, and the register's rows 3
  and 4 naming each record and its surfaces — **complete**
- [**S02**](./steps/S02.md) — the profile line and the transition: every run
  reports the declared transports and what the forge does not enforce, read
  from the rules that apply to the trunk, as output and never a finding; the
  `trunkIntegration` escape gone, so a trunk commit taking a path from
  `running` to `done` is refused and the refusal names its remedy, proved on
  the shape path 1's own closing took — **complete**
- [**S03**](./steps/S03.md) — the seal everywhere, and two paths on the same
  files: `scope-digest` judged for every path record the run's comparison sees
  changed, whatever its status, with a box ticked in an integrating commit as
  its fixture; the advisory `writes-overlap`, naming both live paths and the
  patterns that meet, silent under `depends_on`, with the overlap raised and
  the overlap silenced as its two fixtures; the catalogue, the matrix and the
  soundness note carrying it — **complete**
- [**S04**](./steps/S04.md) — which commit, which branch, which checkpoint:
  the registration commit read as the commit in which the record became
  `running`, over both record shapes; a
  running path with a completed unit required to name an object id in its
  checkpoint; the branch's tip resolved as the local ref, else `HEAD` when the
  checkout is detached, else the remote-tracking ref, so a detached request
  head is judged and never compared with itself — **complete**
- [**S05**](./steps/S05.md) — what a range means: the pinned range from the base
  to the candidate scoped to this path's own commits, where a draft is resolved
  by a later commit publishing a valid unit in a record that cannot be
  unwritten, and by nothing else; an edited step answered by a later step of
  the same folder binding the blob it replaces to the blob it adds, the claim
  checked against the blobs the record really carries; and the two changed-file
  range rules audited, left as they were, and held there by a fixture that
  lands another path's unit on the trunk and merges it in — **complete**
- [**S06**](./steps/S06.md) — one commit for one path: the integrating commit
  read from the trunk's own first-parent line, refused when it is a merge
  object carrying the edit and when one commit takes two paths to `done`, with
  the honest shape green beside both; the `ready` a branch declared read from
  the commit before the arrival, so an integrating request no longer refuses
  every honest integration; and the journal entry asked for under
  `cairn.path`, the key the checker reads — **complete**
- [**S07**](./steps/S07.md) — every refusal names its remedy: an audit that
  reads the checker's own source and requires each blocking message to ask the
  reader to do something, the pure error functions audited by calling them, and
  a remedy held in a `const` expanded rather than erased; forty-odd messages
  rewritten, the three that taught an agent to move the fault first among them;
  the fixtures asserting on the remedy where they assert on the message; and
  ten dangling citations of an earlier repository's records replaced by the
  facts they were evidence for — **complete**
- [**S08**](./steps/S08.md) — the review rule and the fixture sweep: `review`,
  blocking, the current unit's ledger carrying a `#### Review` section that is
  not empty, read for the unit `current_step` names or the ledger's newest,
  never in a folder's `index.md`, and `closure` excepted; every fixture built
  on the path and closure harnesses carrying another path's completed unit
  landed through its own integration; a `--follow` mispairing that made
  `record-integrity` refuse a valid second step record; and the catalogue, the
  matrix, the soundness note and the module note saying what the twenty-six
  rules are — **complete**
- [**S09**](./steps/S09.md) — one meaning for one glob: the closing request's
  reviewer found that `globToRegExp` and `patternsMeet` disagree about `**`, so
  two live paths could declare surfaces that share a file with no overlap
  reported; a globstar is a whole segment now, in the one matcher both rules
  use, and the exhaustive agreement test — written with `**` left out of its
  alphabet, which is the hole — carries both of its shapes. The candidate
  `6828a7e` is void — **complete**
- **Closing** — a new candidate, the review as
  [request #15](https://github.com/sinlalune/cairn/pull/15) repointed at it, and
  the administrative commit. The closure carries no step file (ADR-008
  decision 1).

## Resume

### Checkpoint

```text
commit : 6828a7e771b5426902a92218d1a541a8a9d6ec75 — S08, the review rule and the fixture sweep; S09's own commit is the candidate
unit   : 8 — S08
base   : 37752a2ff3cdbbc33f83201eb4a0c4276a69b9f8
trunk  : dcfe9880a160662ac62a5330ebfda2b202c9b79d — origin/main, unmoved since registration
```

### Next action

S09 answered the closing request's finding, so the candidate `6828a7e` is
void and S09's own commit is the new one. From the worktree
`../cairn-cp-cairn-006` on branch `path/cp-cairn-006`: declare `ready`
with `subject_commit` at that commit, regenerate the live view, point the
resume checkpoint at it, run the gate **before** committing, push, and
update [request #15](https://github.com/sinlalune/cairn/pull/15) to name
the new candidate and what changed since the first. Then the owner runs
the checker on a repository of theirs and merges; the merge is the
acceptance.

After the merge, from a clean trunk checkout: the integrating unit —
`status: done`, `resolution: completed`, the live view, and one journal
entry under `project/log/` — in one commit for this one path.

The request names three debts this path found and does not own: the
writer's half of a supersession (row 1), the close skill's sentence
against an integrating merge object (row 1), and the README's rule count,
twenty-four where it is now twenty-six (row 5).

### Blockers

None.

### Tried and rejected

- Deriving the overlap from the compiled regexes, which the closing request's
  reviewer offered first (S09) — `patternsMeet` would have inherited
  `globToRegExp`'s meaning, and that meaning was the defect. The two share one
  implementation of what a pattern means instead.
- Tying `review` to the step file's own presence in the changed set (S08's
  first review) — the rule inherits `work-unit`'s trigger, the record changing,
  so a unit that lands a new step without touching the record is asked for
  neither. That trigger is older than this rule and shared by every
  changed-file rule; widening it here would give one rule a different world.
  Named for the closing review.
- Deleting the `closure` guard on `review`, which no real repository reaches
  (S08's first review) — a closure unit writes no step file and cannot move
  `current_step`, so the guard is unreachable through the tool. It is what
  makes the reading true standing alone, and ADR-017 decision 2 states the
  exception in as many words.
- Making every fixture carry a merged trunk commit (S08) — the fixtures that
  build their own registration on a fresh installation, and the corpus ones,
  have no harness to carry it and no range to read another path's records into.
  The conformance page names them rather than claiming the sweep is total.
- Splitting a message's ternary branches to audit each alone (S07, both
  reviews) — the first reader was right that joining them lets a talkative
  branch carry a silent one, and the second was right that what I wrote could
  only weaken the check and silently skipped whole messages. Telling branches
  apart needs a parser; the branches that differ today are a grandfathered
  explanation and two remedies. The audit reads a message whole and states what
  that does not prove.
- Instructing a repair in `registration-base` (S07, both reviews) — first
  *register the path again*, which the registration's immutability makes
  impossible, then *write this parent*, which is the computed id ADR-008
  decision 6 says is never typed to satisfy a gate. The message names what it
  compared and the one question that separates the two causes, `git
  merge-base`, with the repair reference for the second.
- Padding a message with *name it:* so the audit could see a remedy held in a
  `const` (S07, second review) — the proxy paid off with a word. The audit
  expands the binding instead.
- Carrying ADR-008's decisions 2, 4 and 6 as the single unit the plan named
  (S06) — decision 6 is a sweep over every blocking message with the fixtures
  asserting on the remedy, and the citations belong with it: one reader's
  question, *what does this refusal tell me*, against this unit's, *what may
  the integrating commit be*. [`plan.md`](./plan.md) is amended and the later
  steps shift by one; the definition of done is untouched, and item 7 is
  advanced by both units.
- The `cairn-close` skill's sentence, which ADR-008 decision 2 also names
  (S06) — `skills/**` is row 1's surface and item 10 requires it unchanged
  here. The checker refuses both shapes now; the skill still owes the sentence
  that stops a writer producing them, and the closing review should say so.
- An inconclusive branch for a comparison ref that resolves to nothing (S06's
  second review) — `previousRef` is `comparisonRef`'s output, a `merge-base` or
  a `rev-parse HEAD`, so it is always a resolved object id; the branch could
  not be reached by any repository a test can build.
- An ordering predicate for *later* in a supersession (S05, second review) —
  the claim must name the blob the record carries NOW, so whichever order the
  two commits land in, both texts are named and both stay reachable, which is
  all the remedy is for. The two `git log --follow` calls I first wrote for it
  refused nothing the binding does not already bind.
- Deleting the condition that a supersession be declared in an append-only step
  record, which no mutation of the suite can turn red (S05) — `pathWorkUnits`
  offers units only from the record and its step files, so the folder
  comparison beside it already excludes the record; the condition is what makes
  the pure predicate true standing alone, for a caller that hands it a unit
  from somewhere else. Named here rather than deleted, as `const head =
  resolved.ref` was at S04.
- Reporting another path's edit to its own step record, merged in from the
  trunk (S05) — writing the audit's fixture showed that `git log --follow`
  simplifies history at a merge, so a record that arrived through one is
  *added* here at the commit that brought it, with the blobs it then had.
  `record-integrity` therefore cannot see their edit at any base, which is the
  right answer for the sentence decision 3 states and a fact the audit could
  not have claimed from inspection. It is their trunk run's to report.
- Running ADR-004's six corrections as the single unit the plan named (S04) —
  they are two subjects and could not be explained in three lines, which is
  the signal `cairn-code` gives for splitting. Decisions 1, 2 and 5 resolve an
  identity; decision 3 with repairs 005 and 006 is what a range may be read as
  evidence of. [`plan.md`](./plan.md) is amended, the later steps shift by
  one, and the definition of done is untouched — item 6 is advanced by both
  units.
- Amending `spec/concepts/trunk-registration.md`, which ADR-004 decision 1
  says *may* gain a sentence (S04) — it is outside this path's `writes:` and
  outside row 2 of the register. The conformance matrix and the catalogue say
  what the rule reads.
- Where a writer declares a same-branch step supersession (raised at S04,
  settled at S05) — repair 005 needs a declared shape, and the surfaces that
  would carry it for a writer are `spec/reference/path-template.md` and the
  `cairn-unit` skill, both row 1's and both excluded by item 10. S05 wrote the
  checker's reading and states the shape — `supersedes: <file>@<blob it
  replaces>..<blob it adds>`, in the repair step's own block — on the
  conformance page; the template and the skill still owe the writer's half, and
  the closing review says so.
- Deleting `const head = resolved.ref` in favour of `HEAD`, which no fixture
  can tell apart (S04's review) — wherever `remote-checkpoint` fires the two
  coincide, so the suite cannot stage the difference; the expression is right
  where they diverge, and correct code is not deleted to satisfy a mutation
  the suite cannot express.
- Re-reading a committed tick on the trunk in a later run (S03) — off a path
  branch the comparison is the working tree unless `--base` is given, so
  `scope-digest` catches a tick in the integrating commit as that commit is
  made and a trunk CI run given no base does not re-read it. Widening that
  comparison changes what every changed-file rule sees on the trunk, which is
  ADR-004 decision 3's territory in S04, not this unit's. The matrix row says
  what the rule reads.
- Writing ADR-003's sentence into `cairn-open` step 1, where the record names
  it (S03) — `skills/**` is row 1's surface, path 1 is done, and item 10 of
  the definition of done requires `skills/` unchanged here. The skill's owner
  review already lists *the surfaces and overlap*; what it does not say is the
  two answers — declare `depends_on`, or accept the race in one sentence.
  No open path owns that sentence; the closing review should say so.
- Correcting `README.md`, which still says the checker runs twenty-four rules
  and nineteen of them block (S03's second review) — the README is outside
  this path's `writes:` and item 10 requires it unchanged; row 5 of the
  register owns it, beside the line path 1's journal already left there.
- Mapping `GITHUB_TOKEN` into the checker's step of
  `.github/workflows/cairn.yml` (S02) — without it the profile line reads
  *forge not read* on every CI run, which is the `ci` profile ADR-001
  decision 6 is written for. The workflow is row 3's surface and item 10 of
  the definition of done requires `.github/` unchanged here. Path 3 owes that
  one `env:` entry; the line is correct either way, and says which it is.
- Reading the repository's `allow_squash_merge` and `allow_rebase_merge` for
  ADR-001 decision 6's *the repository's merge settings* (S02, first review)
  — they say what the repository permits somewhere, not what may land on the
  trunk, and against the live API they reported this repository as allowing
  squash and rebase onto a trunk whose ruleset allows only `merge`. The
  trunk's `pull_request` rule carries `allowed_merge_methods`, and that is the
  setting the record means.
- Naming the free plan as the cause when no rule guards the trunk (S02, both
  reviews) — `plan` is not readable from the trunk's rules, and a private
  repository on a paid plan with no ruleset configured arrives at the same
  empty answer. The line reports the fact and invents no cause.
- Amending `spec/concepts/enforcement-profile.md`, which ADR-001 decision 6
  also names (S02) — it is outside this path's `writes:` and outside row 2 of
  the register, and unlike the lifecycle concept it says nothing this unit
  makes false: *host settings can also drift, so their effective state needs
  independent evidence* is exactly what the profile line now prints.
- Correcting the 1.1 page's opening sentence *Nothing here is implemented
  yet*, false since path 1 landed (S01) — neither record of S01 decides
  it, and the page is a governed document this path amends only where its
  records reach. It is named here so the closing review finds it stated
  rather than missed.
- Amending the `cairn-postmortem` row of the 1.1 page's tools table for
  ADR-025 (S01) — the row says what the tool does; the writer's
  obligation to read its output belongs to *How a path runs*, beside the
  gates, and one placement is enough.
- Reopening the two debts in the chat — path 1 already ruled them out of
  its scope and named the remedy, a superseding record; asking again is
  the thing path 1's journal asks not to do.
- A separate decision path for the two records — one unit of this path
  writes them, because the checker reads the transport ADR-024 settles
  and the fixture of ADR-001 decision 7 is path 1's own closing.
- Pinning the register in `governs:` — a write surface, as in path 1.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md` as path 1 left it.
2. `project/log/2026-09-10-cp-cairn-005.md` at its pinned blob — the debts.
3. `docs/architecture/01-cairn-1-1.md` at its pinned blob — *What the checker reads at each transition*.
4. `project/coding-paths/CP-CAIRN-006/plan.md`, then the records the unit implements, at their tables.
5. `tools/soundness.md` and `spec/reference/conformance.md` — where a rule is named and linked.

### Verify

```bash
npm run cairn-check
npm test
```
