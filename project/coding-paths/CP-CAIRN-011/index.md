---
type: Cairn Coding Path
title: Cairn 1.1.0 — the release
description: Row 7 of the roadmap register, the last path of 1.1. The README says what Cairn is and lists its surfaces as 1.1 left them, the site projects them, the weight budget is measured at 1.1.0 and reported with no target on the kit's count, this repository is updated with its own kit so its lock and pointer page say 1.1, the version is 1.1.0 and the register closes the milestone and opens the next one from the first feedback file; the tag, the package and the first adopter's update follow the merge.
tags: [coding-path, release, cairn-1.1]
timestamp: 2026-09-15T00:00:00Z
cairn:
  id: CP-CAIRN-011
  route: full
  status: running
  current_step: S03
  base_commit: 471fa71b27a2334f40f6fb4fa01c682ac923e323
  branch: path/cp-cairn-011
  assigned_writer: cp-cairn-011-writer
  depends_on: []
  subject_commit: null
  resolution: null
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

## Resume

### Checkpoint

```text
commit : 689647baa3434842c3ac0821601e6f8d1f4e1b6f — S02, on origin/path/cp-cairn-011; S03's own commit is named here by S04
unit   : 02 — S03 is the commit after this checkpoint
base   : 471fa71b27a2334f40f6fb4fa01c682ac923e323
trunk  : 471fa71b27a2334f40f6fb4fa01c682ac923e323 — origin/main at S03
```

### Next action

In a fresh session, from the worktree `../cairn-cp-cairn-011` on branch
`path/cp-cairn-011`: run S04 of the plan with `cairn-unit` — this
repository updated with its own kit. Run `node tools/cairn.mjs status`
then `node tools/cairn.mjs update` here, quote both reports in the step;
pristine kit files are rewritten, edited ones left and listed with what
the release changes in them; `cairn/README.md` exists naming the release
and the commit; `cairn.lock.json` records what the kit installs at 1.1;
any file `update` would add that this repository's binding does not want
— the concept folders under `docs/concepts/`, since this repository's
wiki is `spec/concepts/`; `docs/inputs/`; anything else the report names
— is named with the reason it is or is not taken (ADR-013, ADR-015). The
report will say *this package is 1.0.0* until S05. Type `implementation`
if a tool file is rewritten, else `documentation`; `writes:` already
holds `cairn/**`, `docs/inputs/**`, `docs/index.md` and the lock, and
widens for anything else `update` rewrites, with the reason. The review
section's first line names the reader, as ADR-017 decision 4 says.

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

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md`.
2. `docs/adr/ADR-013-a-local-pointer-to-the-protocol.md` and `docs/adr/ADR-015-a-release-reaches-an-edited-file.md` — what `update` owes this repository.
3. `tools/cairn.mjs`, `applyUpdate` and the pointer page it writes — read for what they print and write, never written; `cairn.lock.json` as it is, the 1.0.0 manifest of 26.
4. `project/coding-paths/CP-CAIRN-011/plan.md`, then `project/coding-paths/CP-CAIRN-011/steps/S01.md` for the `update` report a 1.0.0 installation gave.

### Verify

```bash
npm run cairn-check
npm run cairn-test
```
