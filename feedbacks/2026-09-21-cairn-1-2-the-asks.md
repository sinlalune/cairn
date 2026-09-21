---
type: Cairn Learning Note
title: Cairn 1.2 — the asks
description: Every ask the notes 1.1 did not answer make of 1.2, one checkbox line each, grouped by theme and de-duplicated — from the five agent feedback files of 2026-09-15 to 2026-09-21, the release path's own findings, path 6's journal entry and the two brainstorm notes of 2026-09-16; thirty-one in six themes, each verified against the tree on 2026-09-21; ticked, deferred or refused from the owner's answers to the decisions page, and the promotion path that follows is bound to both.
tags: [cairn, asks, 1.2, adopter, crumbz, atomik, learning]
timestamp: 2026-09-21T14:00:00Z
cairn:
  status: provisional
---

# Cairn 1.2 — the asks

Five notes in this folder, the release path's own step records, the journal
entry of path 6 and two brainstorm notes end with a change to Cairn that
nothing has made. This note lists every ask once, as
[the 1.1 rulings note](./1.1/2026-09-06-cairn-1-1-rulings.md) did for the
notes 1.1 answered. Where two sources ask the same thing it appears once and
names both. Every line was read against the tree at `a5ac064` on
2026-09-21: *live* means the code, skill or page still lacks what is asked;
where something has moved since the note was written, the line says so.

**The owner does not rule here.** The owner answers the
[decisions page](./2026-09-21-cairn-1-2-decisions.md), sixteen questions in
plain language; each line below is then ticked, deferred or refused from
that answer, with the derived reading quoted under it where the answer
picks a variant. One line is already answered, by an instruction given on
2026-09-21 and carried out the same day; it is ticked and the instruction
quoted. Nothing else is decided. Each line is a proposal, not a design:
the design is the promotion path's work, in decision records and a 1.2
architecture page bound to this note, as ADR-001 to ADR-015 and the 1.1
page were bound to the rulings.

Sources by letter: **W** [CP-CAIRN-009's writer](./2026-09-15-cp-cairn-009-writer-feedback.md),
**U** [Crumbz's update](./2026-09-16-crumbz-update-to-1-1.md),
**A** [Atomik's adoption](./2026-09-21-atomik-adopts-1-1.md),
**P** [the protected trunk](./2026-09-21-atomik-opens-a-path-on-a-protected-trunk.md),
**C** [the channel](./2026-09-21-the-channel-an-adopter-cannot-reach.md),
**J** [path 6's journal entry](../project/log/2026-09-15-cp-cairn-010.md),
**R** [the release path](../project/coding-paths/CP-CAIRN-011/index.md), S01, S03 and S04,
**B** the two brainstorm notes of 2026-09-16 — [an update skill](../project/brainstorm/2026-09-16-an-update-skill.md)
and [what the harness loads](../project/brainstorm/2026-09-16-what-the-harness-loads.md).

## 1. What the open skill reads before the go-ahead

- [ ] **K01 — A placeholder in a record's surface name is a question at the
  go-ahead.** When `cairn-open` scopes a path from records, an angle-bracketed
  name in a surface those records name goes into the record's questions,
  where the owner answers it once, rather than into a unit's chat where the
  path stops. One sentence in `cairn-open` step 2; no rule. *(W1; live — the
  skill has no such sentence.)*
- [ ] **K02 — Each item of a definition of done is read against the record it
  cites.** Before the go-ahead, the open skill reads each item once against
  the decision it names and corrects the item, so the owner accepts items
  that agree with their records. One sentence in `cairn-open` step 2, beside
  the owner's reading of the plan. *(W3; live.)*
- [ ] **K03 — A measured figure is written once and pointed at.** The kit's
  counts live on the conformance page as a measurement; the module note, the
  installer's comment and the README link that row rather than restate it.
  One sentence in the close skill. *(W2, and A3's warning that whatever is
  chosen for *treated* must not be a fourth restatement; live.)*
- [ ] **K04 — The register's State column is derived from the records.** As
  `cairn-active` derives the live view, so a path's `status:` is the only
  place its state is written. One generated column, and a decision of its
  own. *(W2; live — the four stale rows were corrected by hand on
  2026-09-16 in `ae1c4b6`, and the derivation is unmade.)*
- [ ] **K05 — A record's implementation table can say *pending*.** Naming the
  register row that owes the mechanism, with the row naming the clause back;
  the path that lands it clears the word. One word in a table the layout
  already prescribes; the checker does not read implementation tables and
  should not start. *(W4; live — ADR-015 decision 2's release note is still
  produced by no release, and nothing says so.)*

## 2. Opening a path on a trunk that takes no direct push

- [ ] **K06 — The registration sequence names its precondition.** One sentence
  in `cairn-open` before step 3: the sequence requires a trunk that accepts a
  direct push — unprotected, or with a bypass for the writer. *(P6; live —
  the reference's one command is `git push origin HEAD:main`, and this
  repository's trunk takes it only through a ruleset bypass its adopter does
  not have.)*
- [ ] **K07 — `transport.registration: pull-request` gets a sequence, or
  stops being a value.** Either a registration request carrying the
  metadata-only commit, with the rule change K20 needs for it to be
  mergeable — or the schema takes one value, `manual-git`, and the
  configuration reference says a trunk that cannot take a direct push cannot
  host the protocol. *(P6, P7; live — the value is legal, and no page says how
  to perform it.)*
- [ ] **K08 — `init` and `adopt` refuse the pairing that cannot work.**
  `protected` with `manual-git` registration, or `manual-git` registration
  on a trunk with no bypass for the writer. Reading the trunk's protection is
  a host reading in the kit, not the checker; ADR-029 deleted the checker's,
  and the record for this one says whether the kit may ask. *(P6; live.)*

## 3. The installer — `init`, `update`, `adopt` and `status`

- [ ] **K09 — The generated view is never on the reconcile list.**
  `applyUpdate` excludes `ACTIVE.md` as `installationStatus` already excludes
  it from the *current* comparison, or regenerates before computing the list.
  One condition. *(U2; live.)*
- [ ] **K10 — Two generations of one release are byte-equal.** A generated
  page's timestamp is the release's stamp date, not the day of generation,
  for the pointer page and every folder index the kit writes. *(U3; live.)*
- [ ] **K11 — The update report names the files it starts managing.**
  *Unmanaged* at the old lock, *edited* at the new — a third kind beside
  written and kept, listed on the pointer page with the kept. One line; the
  state is already computed. *(U4; live.)*
- [ ] **K12 — Template sentences are written in the shape they describe.**
  The documentation index's *there is one page at this root, listed above*
  and *adds its line to the README* read false in a repository with no
  surface page and no README; write *one page per surface, as they are
  written*, and either install a README stub or say *where it has one*.
  *(U6; live.)*
- [ ] **K13 — The kit reads every declared root.** `optionsFromConfig`
  carries `architecture`, `decisions` and `modules` beside `concepts`, and
  `buildConfig` derives a root only where the configuration declares none;
  the plan asserts once that every path it writes falls under a declared
  root. The repair ADR-011 decision 2 made for the concept root, applied to
  the three it did not reach. *(A5, and R S04 — the release's `update`
  planned this repository's concept folders under the protocol's own wiki
  root; live.)*
- [ ] **K14 — `update` can decline a host file.** The release's `update`
  wrote three concept indexes this repository does not want, and the only
  way to refuse them was to delete them after and read them as *missing* at
  every `status`. A way to say *not this file* that the lock remembers.
  *(R S04; live.)*
- [ ] **K15 — `status` builds its plan as `update` does.** The migrated
  configuration is set into the plan before comparing, from one function
  both commands call, so `status` stops naming a rewrite of
  `cairn.config.json` that `update` will not make. *(A2; live —
  `tools/cairn.mjs` sets it at 1173 and 1269, not on the `status` path.)*
- [ ] **K16 — `adopt` says when a kept host file calls what it made stale.**
  Under the stale line: *`package.json` and the workflow call these; your gate
  is red until they go*. One sentence from three facts the kit already
  holds. *(A4; live — Atomik's CI went red on the next push.)*
- [ ] **K17 — A seventh skill, `cairn-update`.** An adopter's update as a
  path: the reading first, the owner's decisions on the edited kit files and
  on the host files the repository does not want, the run, the reconciliation
  of only what the report named. The brainstorm note recommends the skill
  over a section of `cairn-open`; Crumbz's update, run by hand along that
  chronology, is its evidence. *(B, U; live — the note is parked, nothing is
  coded.)*
- [ ] **K18 — One printed line per gap between the kit and the harness.** At
  `init` and `update`: Ponytail's one-line install where ADR-016 names it and
  nothing installs it, and where the harness looks for skills, since
  `skills/` is not it. The owner's question — extract Ponytail's skills into
  the kit at `init` or `update` — reverses ADR-016 decision 1 and is a 1.2
  decision with a record, not a fix. *(B; live.)*
- [ ] **K19 — This repository's bootloader points at the pointer page.** One
  line in `AGENTS.md` naming `cairn/README.md`, as the release's template has
  it; the release path declined it as outside its writes. *(R S04; live —
  the bootloader names it nowhere.)*

## 4. The checker

- [ ] **K20 — The `registration` rule reads the change under review.** A
  declaration absent from the trunk is registered when the run's own
  comparison contains the commit that adds it and that commit is a
  registration — metadata-only, the record and the view, its parent the
  declared `base_commit`. Every fact is already checked elsewhere; on a
  `manual-git` trunk nothing changes. The alternative is K07's smaller
  protocol. *(P7; live — the rule resolves on the trunk ref only.)*
- [ ] **K21 — A repository declares its link exemptions.** A list in
  `cairn.config.json` of paths whose relative links the `links` rule does not
  resolve, each with its reason; the conformance page says beside
  `Exemptions: none` that the two 0.2 exemptions left in CP-CAIRN-001 S02 and
  a portrayal or a frozen history is the adopter's to declare; `adopt` names
  the fixtures folder and the flat journal as shapes that want a declaration.
  If refused, the ruling of CP-CAIRN-001 S06 is superseded rather than left
  assigning work that cannot be done. *(A1; live — Atomik forked the
  checker to say it.)*
- [ ] **K22 — `feedbacks/` is read by the corpus rules, or declared
  unchecked.** One entry in `markdownCorpus()`'s root list, so `links` and
  `schema` cover the channel; or the conformance page says the folder is
  deliberately outside, where it lists the corpus. *(C9; live — the four
  roots are the documentation root, the project root, the wiki's parent and
  `skills/`. Note that a rule blocking on a link inside a frozen note is a
  rule that edits history; the move of 2026-09-21 rewrote nine such links by
  hand, one level deeper.)*
- [ ] **K23 — The `comparison` rule's messages say GitHub.** Two printed
  messages still say *the forge* where GitHub's all-zeros sentinel is meant;
  ADR-029 decided the reading, not the wording. *(J; live —
  `tools/cairn-check.mjs` 1818 and 1821.)*
- [ ] **K24 — One fixture red once on `record-integrity`.** The release
  path's suite went red once on that rule's fixture and green on the rerun;
  the fixture is read for the order it depends on. *(R; as the row states it —
  not reproduced on 2026-09-21.)*

## 5. The skills and the channel

- [ ] **K25 — The close skill stops pointing at `tools/soundness.md`.** Step
  5 and its reference say the file carries the finding; no release installs
  it. Pin the link to the protocol repository at the release's commit, or
  drop the sentence. *(U5; live — `skills/cairn-close/SKILL.md` 112,
  `reference.md` 139.)*
- [ ] **K26 — The unit skill says what an adopter's writer does with a note
  about Cairn.** Section 7 sends every writer to `feedbacks/`; the kit
  installs no such folder and no adopter page names it, and a note written
  there reaches nobody. Either the kit installs the folder and the skill
  names how a note reaches Cairn, or the sentence is conditioned — in the
  protocol's own repository, write the file; in an adopter's, say it to the
  owner. *(C8; live — `skills/cairn-unit/SKILL.md` 153, installed verbatim;
  twice a note reached here by the owner's hand.)*
- [x] **K27 — A note can say it has been treated.** *(A3.)*
  > The owner's instruction of 2026-09-21: *verify the ones that are already
  > handled by 1.1 and move them into `feedbacks/1.1/`*. Done the same day:
  > treated notes move into `feedbacks/<release>/`, whose index names what
  > answered each — the reverse trail A3 found missing. The promotion path
  > writes the convention where ADR-028 describes the folder, and decides
  > whether `cairn.status` follows the move or stays as it is.
- [ ] **K28 — A note can say a claim in it was withdrawn.** A note whose claim
  changes says so at its head — the date, what was withdrawn, what replaced
  it — so a reader holding a copy can tell; the same question as K27 asked of
  a note read before it is promoted. *(C10; live — Atomik's CP-OPS-003
  carries a sealed line on a claim corrected here twenty-four seconds after
  it registered.)*

## 6. The post-mortem tool and the release notes

- [ ] **K29 — The post-mortem counts the run it runs in.** `readRedRuns` asks
  for `status=failure`, which cannot return the run still in progress that
  the failure step runs it from; count the current run as red, by a flag or
  an environment variable the workflow sets. *(U7; live —
  `tools/cairn-postmortem.mjs` 238.)*
- [ ] **K30 — A closed, unmerged request prints as closed.** Keep `state` and
  `closed_at` in the projection; print *closed* where `merged_at` is empty
  and the request is closed. *(U8; live — 251.)*
- [ ] **K31 — The release notes name the adopter repairs a release absorbed.**
  By the adopter's path ids, since those are what an adopter searches for,
  so a writer with an edited checker knows before `status` what `update
  --take` will drop. *(U1; live — Crumbz's writer read two checkers
  function by function and got it wrong.)*

## What this note does not do

It does not design anything: K20 does not say how the registration commit
is recognised; K17 does not say what the skill's steps are. Those belong to
the promotion path's decision records, each bound to the lines it
implements, and to the coding paths the roadmap register then names. It
does not rank: the order above is by theme, and the owner may strike or
renumber freely. And it does not carry what memory says and the tree does
not: a checker crash on an unborn `HEAD`, remembered from the release week,
is written in no note, record or entry, and is not a line here until it is.

## Sources

- The five notes at this level of the folder at their state on `main` at
  `a5ac064`, and the two brainstorm notes of 2026-09-16.
- `project/log/2026-09-15-cp-cairn-010.md`, *What it leaves*.
- `project/coding-paths/CP-CAIRN-011/steps/S03.md` and `S04.md`, and the
  register's 1.2 row as CP-CAIRN-011 S05 opened it and the two brainstorm
  commits and three feedback merges grew it.
- [The 1.1 rulings note](./1.1/2026-09-06-cairn-1-1-rulings.md), for the
  checkbox-as-ruling form.
