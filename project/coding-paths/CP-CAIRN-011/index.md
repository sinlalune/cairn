---
type: Cairn Coding Path
title: Cairn 1.1.0 — the release
description: Row 7 of the roadmap register, the last path of 1.1. The README says what Cairn is and lists its surfaces as 1.1 left them, the site projects them, the weight budget is measured at 1.1.0 and reported with no target on the kit's count, this repository is updated with its own kit so its lock and pointer page say 1.1, the version is 1.1.0 and the register closes the milestone and opens the next one from the first feedback file; the tag, the package and the first adopter's update follow the merge.
tags: [coding-path, release, cairn-1.1]
timestamp: 2026-09-15T00:00:00Z
cairn:
  id: CP-CAIRN-011
  route: full
  status: done
  current_step: S05
  base_commit: 471fa71b27a2334f40f6fb4fa01c682ac923e323
  branch: path/cp-cairn-011
  assigned_writer: cp-cairn-011-writer
  depends_on: []
  subject_commit: 7f41d127a76b64bb916b26e48f58b8f48c32c3bd
  resolution: completed
  writes:
    - README.md
    - site/**
    - spec/reference/conformance.md
    - package.json
    - cairn.lock.json
    - cairn/**
    - docs/inputs/**
    - docs/index.md
    - docs/architecture/01-cairn-1-1.md
    - docs/modules/site.md
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-011/**
  governs:
    - docs/architecture/01-cairn-1-1.md@faf28649170304a570488e9ac8e6dffdb22c5e35
    - project/log/2026-09-15-cp-cairn-010.md@44d70ccdbd261bc215418849d4215f205c855b23
    - feedbacks/2026-09-15-cp-cairn-009-writer-feedback.md@5a624d82e5e8cd4246e9133d661cc2e5052772ad
    - docs/adr/ADR-012-a-page-a-newcomer-reads-first.md@095ba6deb3d34a241c221256a02717d17157508f
    - docs/adr/ADR-013-a-local-pointer-to-the-protocol.md@25f944a06ffdcf447ef0762fa37c040df33dad1d
    - docs/adr/ADR-015-a-release-reaches-an-edited-file.md@7c364ea393f07d915f9bb8d2a49b1f1428f82822
    - docs/adr/ADR-022-the-learning-note-and-the-learning-session.md@04d8a28c43b28d4d424208ecda6c1b7222ae7e01
    - docs/adr/ADR-023-the-pages-a-reader-meets.md@81194665cacf4e69d39fb2ce3a9c6411d23bd9a1
---

# CP-CAIRN-011 — Cairn 1.1.0, the release

## Goal

This path makes what a newcomer reads first say what 1.1 is, measures
what 1.1 weighs, and cuts it. It is the least because every sentence it
changes in the README and on the site is one that 1.1 made false, every
number it writes is counted by a tool, and the release itself is a
version, a stamp and a tag the repository already knows how to make. It
does not touch the skills, the checker, the installer, the chapters or
the records: every one of them is what 1.1 decided, landed by paths 1 to
6, and this path ships them as they are.

**What the release finds already false.** The README still says five
skills, twenty-four rules and a unit of four movements, and that
`cairn init` installs twenty-six files; the 1.1 page still opens with
*nothing here is implemented yet*, false since path 1; the conformance
page's weight budget is measured at 1.0.0; this repository's own lock
says 1.0.0 and its pointer page does not exist, because the kit path 4
rewrote has never been run against the repository that ships it. The
site projects the README, the manifesto, the specification and the
skills, so it is right where they are and shows the sixth skill without a
change, and wrong where the README is.

**What 1.1 leaves for the next milestone, and where it is written.**
Path 6's [journal entry](../../log/2026-09-15-cp-cairn-010.md) and the
first [agent feedback file](../../../feedbacks/2026-09-15-cp-cairn-009-writer-feedback.md)
name what nobody owns: a placeholder in a record's surface name that
nothing notices, a measured fact restated in five documents that nothing
reconciles, a definition of done that contradicts a record it cites, a
mechanism a record specifies that nothing produces and no way to mark it
pending, and the `comparison` rule's messages still saying *the forge*.
None of it is a release's to fix. This path closes the 1.1 milestone in
the register and opens the next one under it, *Cairn 1.2 — what 1.1
taught*, with no path yet and those five things as its first agenda, so
that the feedback channel path 6 opened has a row to feed. The first
adopter's update is the other half of that agenda: it runs in Crumbz's
own repository as a path of theirs, after the tag, and what `update`
does to a repository that edited its kit files and ran twenty-six paths
under 1.0 is the first real reading 1.1 gets.

Row 7 of the [roadmap register](../index.md) scopes it. The decisions it
implements: this repository's README as the page of its surfaces (ADR-012,
ADR-023 decision 1); the kit's count measured and reported with no target
(ADR-022 decision 2); the pointer page and the lock as a release leaves
them (ADR-013, ADR-015).

## Definition of done

- [ ] `README.md` opens with what Cairn is in one paragraph and lists its
      surfaces — adopting the protocol, opening and running a path,
      closing one, learning — one line each in the order a newcomer meets
      them (ADR-023 decision 1, ADR-012); every count and every sequence
      in it is 1.1's: six skills, the checker's rules as the catalogue
      counts them, a unit of five movements, the files `init` installs as
      the lock counts them, `manual-git` registration for a sole owner;
      the three quick starts run as written against the kit at the
      candidate, proved by running them; the *Weight* section points at
      the conformance page and repeats no number.
- [ ] The site builds from the candidate and projects the README, the
      manifesto, the specification and the six skills; its *Start* section
      and any list it hard-codes say what the README says; the build is
      proved by running it.
- [ ] `spec/reference/conformance.md` carries the weight budget measured
      at 1.1.0 by the tools — the specification's words, the required
      entry chain's words, the files the kit installs on each profile with
      no target, the protocol files one lightweight unit writes — beside
      the 1.0.0 column, which stays; every target that has one is reported
      as bound or not, and the kit's count is a number with no target
      (ADR-022 decision 2).
- [ ] This repository is updated with its own kit: `cairn update` is run
      here, its report read and quoted in the step; pristine kit files are
      rewritten, edited ones are left and listed with what the release
      changes in them, the pointer page `cairn/README.md` exists naming
      1.1.0 and the commit it was cut from, and `cairn.lock.json` records
      what the kit installs at 1.1 (ADR-013, ADR-015); any file `update`
      would add that this repository's binding does not want is named in
      the step with the reason it is not taken.
- [ ] The 1.1 page's opening says that its records are implemented by
      paths 1 to 6 and released as 1.1.0, in place of *nothing here is
      implemented yet*, marked *since 2026-09-15*; nothing else on the
      page changes.
- [ ] `package.json` says `1.1.0`; `prepack` stamps the release file
      from the candidate; the register's 1.1 milestone row reads *done*
      with the date and the tag, and a new milestone row, *Cairn 1.2 —
      what 1.1 taught*, stands under it with *no path yet* and the five
      things named above and the first adopter's update as its agenda,
      the feedback file linked as its source.
- [ ] Nothing under `skills/`, `tools/`, `.github/`, `spec/index.md`,
      `spec/concepts/`, `spec/reference/` other than the conformance
      page, `docs/adr/` or `feedbacks/` changes; the seven governing
      documents other than the page are byte-identical at the candidate
      to what they are at `base_commit`, and the page changes in its
      opening sentence alone.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, a self-review in the five tags and a
      `#### Review` section whose first line names the reader; a quick
      start or a build is proved by its output in the step, never by
      description; `current_step` names the unit whose block is in the
      commit.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      reviewed in the pull request's description in the order the audit
      tool prints; the administrative commit declaring `ready` and
      `subject_commit` is on the branch with its check green before the
      owner is asked to merge; the owner opens the site and the README and
      runs one quick start before the merge; the merge is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported; then the tag `1.1.0` is set on the
      integrating commit as `1.0.0` was on its own, and the package is
      published from it by the owner, both named in the journal entry with
      the first adopter's update as the next path, in their repository.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-15T16:03:48Z
scope_ref: project/coding-paths/CP-CAIRN-011/index.md#definition-of-done
scope_digest: sha256:271a1aa020dcc39d04e163b6ebc354abc10f727447359dbadc623d4cf5d53252
```

Reviewed in the chat of 2026-09-15: route `full` because the path cuts a
release and changes the conformance page, the package and this
repository's own installation; the definition of done above; writes
limited to the README, the site, the conformance page, the package, the
lock, the pointer page and the files `update` writes here, the 1.1
page's opening sentence, the register and this folder, with no overlap
because no other path runs; the skills, the tools, the workflow, the
chapters, the concepts and the records excluded from change; governed by
the 1.1 page, path 6's journal entry, the first agent feedback file and
five records at their blob ids on `main`; initial writer
`cp-cairn-011-writer`. The owner read the plan — the five things 1.1
leaves written into a new milestone row rather than fixed here, the tag
and the package after the integrating unit, Crumbz's update as their own
path — and gave the go-ahead in the chat with the word "yes"; that
go-ahead is this acceptance, and the record lands on the trunk directly.
The owner said the units run in a fresh session. Amendments: none.

## Documentation coverage

### Required

- `docs/architecture/01-cairn-1-1.md` at its pinned blob — what 1.1 is,
  the documentation plane and the tools tables the README must agree
  with.
- `project/log/2026-09-15-cp-cairn-010.md` and the first agent feedback
  file at their pinned blobs — what 1.1 leaves, for the next milestone's
  row.
- The five records pinned in `governs:` — the README as the surfaces'
  page, the pointer page, the release reaching an edited file, the count
  with no target.
- `README.md`, `site/build-content.mjs` and `site/src/App.jsx` as they
  are — every sentence and list the release must make true.
- `project/log/2026-09-03-cp-cairn-001.md` — how 1.0.0 was cut: the tag
  on the integration, the package name and its binary, the stamp.

### Conditional

- `tools/cairn.mjs` — `update`, `status` and `stamp`, read for what
  they print and write; never written.
- `tools/cairn-pilot.mjs` — the measurement of protocol files a unit
  writes.
- `skills/*/SKILL.md` — read so that the README's one line per surface
  says what the skill does.

### Deliberately excluded

- `skills/**`, `tools/**`, `.github/**`, the chapters, the concepts,
  the records — 1.1 as landed; a defect found here is a feedback file or
  the next milestone's, never a fix in the release.
- Crumbz's update — the adopter's own path, after the tag.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- **S01** — [the README](./steps/S01.md) — complete. What Cairn is in one
  paragraph, then its four surfaces one line each — adopting, opening and
  running, closing, learning — with the skill behind each; every count 1.1's
  as a tool counts it: six skills, twenty-seven rules of which twenty-one
  block, five movements, thirty-three files and the lock on the `ci`
  profile; registration on the trunk directly; quick start 3 split into the
  two commands the tool actually has, `update` for a lock and `adopt` for
  none; the three quick starts run against the kit packed at the
  registration commit, and the pilot from `init` to `done`; the *Weight*
  section pointing at the conformance page with no number. Advances the
  first item.
- **S02** — [the site](./steps/S02.md) — complete. Built from the candidate:
  seventy-five documents bundled, the six skills among them, Vite green; the
  one count the site hard-codes, *five skills* in the shell's meta
  description, made the README's; the module note refreshed, `writes:`
  widened by it. Advances the second item.
- **S03** — [the weight measured at 1.1.0](./steps/S03.md) — complete. The
  conformance page's budget table gains the 1.1.0 column beside 1.0.0's:
  6,112 words of specification, 2,964 in the entry chain and 36 under its
  target, 33 files and the lock on `ci` and 32 on `local` with no target,
  2 protocol files per unit and 4 or 5 per lifecycle; every target bound;
  the counting method named. Advances the third item.
- **S04** — [this repository updated with its own kit](./steps/S04.md) —
  complete. `status` then `update` run here from the tree, both reports
  quoted; thirteen kit files pristine and rewritten identically, seventeen
  edited and left, each listed with what the release changes in it;
  `cairn/README.md` installed naming the release and commit the tree
  carries, `docs/inputs/` installed and indexed, the lock's manifest at
  thirty-three; the three concept folders the kit plans under
  `spec/concepts/` declined, with the reason. The release and commit on
  the page are `package.json`'s and HEAD's, so S05 re-runs `update` after
  the version. Advances the fourth item, but for the release's name.
- **S05** — [the version, the page's opening and the register](./steps/S05.md)
  — complete. `package.json` at `1.1.0`, `update` run again so the pointer
  page and the lock name release 1.1.0, `prepack`'s stamp proven; the 1.1
  page's opening sentence replaced and marked *since 2026-09-15*; the 1.1
  milestone row *done* with the date and the tag to come, the *Cairn 1.2 —
  what 1.1 taught* row under it with *no path yet* and its agenda, the
  feedback file, the journal and this record as its sources. Advances the
  fourth item's release name, the fifth and the sixth.

## Resume

### Checkpoint

```text
commit : 7f41d127a76b64bb916b26e48f58b8f48c32c3bd — candidate C, S05's commit with the trunk contained; on origin/path/cp-cairn-011; this administrative commit follows it
unit   : 05 — the last unit; the close adds no unit
base   : 471fa71b27a2334f40f6fb4fa01c682ac923e323
trunk  : 891b07de4afb4239a26ecccfa1f250a046701c34 — origin/main, T, the registration commit; unmoved since the branch was cut
```

### Next action

The owner opens the site built from `C`, reads the README, runs one quick
start, and merges pull request #20 as a merge commit once its check on
the `ready` commit is read green; the merge click is the acceptance. Then,
from a clean trunk checkout: the integrating unit — `status: done`,
`resolution: completed`, `subject_commit` kept, the live view, one journal
entry `project/log/2026-09-15-cp-cairn-011.md` — landed on the trunk
directly; `C` proved reachable from `origin/main`; the tag `1.1.0` set on
the integrating commit and pushed, as `1.0.0` was; `npm publish` by the
owner from that commit; the journal entry naming the tag, the package and
the first adopter's update as the next path, on Crumbz's register; the
worktree `../cairn-cp-cairn-011` removed from another checkout, or the
failure reported.

### Blockers

None.

### Tried and rejected

- Fixing the five things 1.1 leaves inside the release — each is a
  change to a record, a rule or a skill, and a release ships what was
  decided; they are the next milestone's agenda, written where the next
  path will find them.
- Running the first adopter's update as a unit of this path — it changes
  Crumbz's repository, not this one, and it belongs to a path on their
  register, after the tag exists.
- Publishing the package from the candidate rather than from the
  integrating commit — 1.0.0 was tagged on its integration, and a tag on a
  commit the trunk then re-records would name a commit the trunk does not
  carry.
- Pinning the register in `governs:` — a write surface, as in every
  path before.
- Running the quick starts with `npx cairn-protocol` as written, against
  the registry — that installs 1.0.0, the release the README no longer
  describes; the package was packed from the worktree and `npx` given the
  tarball, so the commands ran as written against the kit at this commit
  (S01).
- Keeping a word count in the README beside the pointer at the conformance
  page — a number restated in two places is the second of the five things
  1.1 leaves; the page counts, the README points (S01).
- Bundling the 1.1 page and the decision records into the site so the
  README's new links resolve inside it — the site projects the four layers
  the owner asked for, and a link it does not bundle opens the file on
  GitHub at the bundled commit, which is what it does for every reference
  link already (S02).
- Restating the 1.1.0 figures in chapter 6's *Conformance and weight*,
  which still says *Cairn 1.0 is measured against* — `spec/index.md` is
  excluded from this path's writes; the chapter names no figure but the
  targets, and the sentence is one of the restated facts the 1.2 row
  carries (S03).
- Taking the release's version of `docs/index.md` with `--take` — the
  release's template lists surface pages and concept folders this
  repository does not have; the one line the kit's install owes it, the
  inputs folder, is added by hand (S04).
- Keeping the three concept folders `update` writes under `spec/concepts/`
  — an adopter's folders, planned under this repository's own wiki root
  because the binding names it as the concepts root; the definition of
  done excludes `spec/concepts/` from change, and the protocol's wiki has
  its own index; declined and named for the 1.2 row (S04).
- Adding the pointer page's line to this repository's `AGENTS.md`, as the
  release's template has it — the bootloader is outside this path's
  writes and an edited host file `update` leaves; it stands on the
  pointer page's reconcile list, which is where ADR-015 puts it (S04).
- Writing the tag's commit id into the register's 1.1 row now — the
  integrating commit does not exist until the merge; the row names the
  tag and the path whose integration carries it (S05).
- Fixing any of the 1.2 row's items in this path — each is a change to a
  record, a rule, a skill or the installer, and a release ships what was
  decided; the row is where the next path finds them (S05).

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md`.
2. `skills/cairn-close/SKILL.md` and its reference — the sequence, the administrative commit, the owner's try.
3. This record's definition of done — the seventh and ninth items are what the candidate is checked against; `project/log/2026-09-15-cp-cairn-010.md` for the shape of an integrating unit's entry.
4. `project/coding-paths/CP-CAIRN-011/plan.md`, then `project/coding-paths/CP-CAIRN-001/steps/S08.md` and the 1.0.0 journal for how the tag and the package followed the merge.

### Verify

```bash
npm run cairn-check
npm run cairn-test
```
