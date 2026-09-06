---
type: Cairn Learning Note
title: Cairn 1.1 — the rulings
description: Every ask the five adopter notes make of 1.1, one checkbox line each, grouped by theme and de-duplicated, with the owner's three rulings of 2026-09-06 already recorded; the owner ticks what 1.1 takes, writes "later" or "no" beside what it does not, and the promotion path that follows is bound to this note.
tags: [cairn, rulings, 1.1, adopter, crumbz, learning]
timestamp: 2026-09-06T15:00:00Z
cairn:
  status: provisional
---

# Cairn 1.1 — the rulings

Five notes in this folder read one adopter over three days and end with
"what this asks of 1.1". This note lists every ask once. Where two notes ask
the same thing it appears once and names both. Where the owner has already
ruled, the box is ticked and the ruling quoted.

How to answer, as for the 1.0 convergence note: **a ticked box is a ruling
for 1.1**. An unticked box with `later` after it is deferred to a named
release; with `no` it is refused and stays refused. A box left bare is not
decided, and the promotion path may not decide it. One line of the owner's
own words may follow any ruling and outranks the proposal.

Each line is a proposal, not a design. The design is the promotion path's
work, in decision records and an architecture page bound to this note.

Sources by letter: **G** the Gemini post-mortem of 09-03, **C** the Codex
post-mortem of 09-03, **K** the closure note of 09-04, **A** the sixteen-path
audit of 09-06, **O** the owner's feedback of 09-06.

## 1. Registration, acceptance and the solo owner

- [ ] **R01 — What a writer may do while a registration request is open.**
  A solo repository declares `transport.registration: manual-git` while
  integration stays `pull-request`; or the checker treats a declaration on a
  remote `register/` branch with an open request as `registration-pending`,
  advisory on the branch and blocking at `ready`. One of the two, in the
  open skill. *(A; five paths broke the rule where the owner's merge waited
  15 minutes to 13 hours.)*
- [ ] **R02 — The registration request is the opening review.** Name it;
  an amendment after that review is a superseding acceptance block. *(A;
  Crumbz did it five times unprompted.)*
- [ ] **R03 — The solo-owner closing acceptance has a stated shape.** When
  the forge cannot record the sole owner's approval, the roles line of the
  request, written by the owner and not the writer, is the acceptance; or
  integration falls back to `manual-git`. *(G, A; fifteen closures with no
  recorded approval.)*
- [ ] **R04 — An owner's acceptance test before merge.** A named step in
  the closure: the owner tries the candidate and records it in the request
  as a checkbox only the owner ticks. *(O, A.)*
- [ ] **R05 — Merge only after the request's run on the `ready` commit is
  read green.** One sentence in the close skill's step 5. *(G, A; PR #2 and
  PR #41 merged before their check ran.)*
- [ ] **R06 — The `ci` profile says what it cannot see.** With a forge
  token present the checker reads protection and merge settings and prints
  a downgraded profile when the forge does not require the check or allows
  a squash. *(G, A; the claim has been false since installation.)*
- [ ] **R07 — One gate per candidate.** The workflow runs once per commit
  that can land, or the push run and the pull-request run get different
  names so a red one is never mistaken for the green one beside it.
  *(K.)*
- [ ] **R08 — `running → done` on the trunk is refused when no `ready`
  commit exists.** The allowance was for `manual-git`'s merge unit. *(C;
  six paths closed without an administrative commit.)*

## 2. Facts the checker does not read yet

- [ ] **R09 — `registration-base` reads the transition, not the file
  addition.** The registration commit is the trunk commit in which `status`
  became `running`; a `draft` landed earlier is honoured. Fixture: draft,
  activation, branch from the activation. *(A; CP-016 carries a false base
  written to satisfy the message.)*
- [ ] **R10 — `scope-digest` is judged at every transition on every ref.**
  A `done` record whose section no longer digests to its acceptance is the
  same fault as a `ready` one. *(A; CP-005 and CP-006 ticked at `done`,
  both runs green.)*
- [ ] **R11 — The checkboxes leave the definition of done.** The template
  drops them; completion is stated by the closure record and the journal.
  *(C, K, A; ticked on three paths by two agents in three days.)*
- [ ] **R12 — Two live paths with intersecting `writes:` is a finding.**
  Advisory `writes-overlap` at registration and at every unit; the open
  skill says the later path declares `depends_on` or records why the owner
  accepted the race. *(A; CP-016 overtook CP-015.)*
- [ ] **R13 — A running path with an unpinned checkpoint after its first
  unit is refused.** *(G; fifteen Gemini units left it `unpinned`.)*
- [ ] **R14 — Range rules are path-scoped.** A rule over `base..candidate`
  reads only this path's records as evidence about this path; every range
  walker audited against that sentence. *(K.)*
- [ ] **R15 — Every blocking rule's fixture contains a merged trunk commit
  carrying another path's completed unit.** *(K.)*
- [ ] **R16 — The checker resolves the path branch from where it stands.**
  Local ref, else HEAD on a detached request head, else `origin/<branch>`;
  every rule that names the branch audited. *(K.)*
- [ ] **R17 — The three Crumbz repairs come upstream.** Same-branch step
  supersession (005), path-scoped chronological provisional resolution
  (006), detached-checkout branch evidence (007), with their tests, so the
  adopter's checker becomes a version bump. *(C, K, A.)*

## 3. Records and their shapes

- [ ] **R18 — There is no closure step.** The close skill says so: the
  review is the request's description; no unit and no step file carries it.
  *(C; the `review` type that started the CP-004 cascade.)*
- [ ] **R19 — The integrating unit is one commit for one path.** Never a
  merge object carrying the edit, never two paths in one request, on
  `pull-request` transport. *(A; PR #35, `fe9f06a`.)*
- [ ] **R20 — A provisional commit never parks closure metadata.** Said
  where the unit skill describes provisional commits. *(K.)*
- [ ] **R21 — A rule for host files the environment writes.** The
  bootloader is kit-owned; a block a framework writes into it goes to a file
  the kit does not own, or is ignored, and the skill says which. *(C, A;
  the Next.js block is still on the Crumbz trunk.)*
- [ ] **R22 — The journal template loses its duplicate `path:` key.**
  *(G, A; copied forward into all fifteen Crumbz entries.)*
- [ ] **R38 — The roadmap register becomes reportable.** `cairn-active`
  reports a register still carrying the installer's row. *(G, A; sixteen
  paths, placeholder row untouched.)*
- [ ] **R23 — Transport branches are deleted on merge; `path/*` stays until
  the path is archived.** *(O; forty-five branches on Crumbz.)*
- [ ] **R24 — Closure cleanup gets a predicate or a hand-off.** The close
  skill's step 6 runs before the report, or `cairn-active` lists worktrees
  whose path is `done`. *(A; seven stale worktrees.)*

## 4. What the skills say

- [ ] **R25 — `repair` is defined where the type is chosen.** One sentence
  in the unit skill's type table: a repair corrects a protocol violation
  and names it. *(G, C; eleven misuses in one day.)*
- [ ] **R26 — The unit plan names the definition-of-done item it
  advances.** *(G; CP-002 outgrew its outcome by six units.)*
- [ ] **R27 — No object id is typed by hand.** The open skill gives
  `base_commit` the same rule as the digest. *(G.)*
- [ ] **R28 — Refusals name the remedy.** Every blocking message says what
  to do, and a pushed record is corrected by a superseding step, never by
  editing it. *(K, A; three times the agent moved the fact the message
  named.)*
- [ ] **R29 — The unit skill states the worktree precondition.** Install
  dependencies before the first gate; the reference example reads the exit
  code, not the output. *(K.)*
- [ ] **R30 — A module note has a split trigger.** An area whose note every
  path touches, or whose match covers every source file, says "split"; the
  open skill asks which area a path's `writes:` fall in. *(O.)*

## 5. The documentation plane

- [x] **R31 — External pre-existing inputs live in `docs/inputs`.** The
  kit names the folder, the documentation index lists it, and the brainstorm
  skill says the first session starts by reading it. *(O.)*
  > Owner's ruling, 2026-09-06: `docs/inputs`
- [ ] **R32 — Promotion produces a page a new reader can read first.** A
  stage-3 output the protocol names: one readable page per product surface,
  or a `docs/README` the promotion path must touch, with the concept
  articles as its glossary. *(O; three promotions, no such page.)*
- [ ] **R33 — The kit installs a local pointer to the protocol.** One
  `cairn/README.md` naming the release, linking the six chapters and the
  five skills, and saying which files the kit owns. *(O; every pointer is a
  GitHub URL today.)*
- [x] **R34 — The concept wiki is split in three.** `docs/concepts/cairn`
  for protocol terms a user asks about, `docs/concepts/<project>` for the
  project's own terms, `docs/concepts/learning` for external knowledge.
  *(O.)*
  > Owner's ruling, 2026-09-06: Project side : `docs/concepts/cairn` (when
  > the user ask an explanation about a cairn term),
  > `docs/concepts/<project>` when project specific terms,
  > `docs/concepts/learning` when external knowledge (coding, hardware, IA,
  > anything)
- [x] **R35 — The agent writes concept notes proactively.** In any session,
  when a complex abstraction is explained, the agent creates the concept
  note in the right folder and links it, with a constant synthetic and
  pedagogical approach. Which skill carries the instruction is the
  promotion path's design. *(O, the second half of the item-4 ruling.)*
  > Owner's ruling, 2026-09-06: the perfect scenario is that even in the
  > chat session, the agent recognize complex abstraction and pro actively
  > create note a make referece to it in addition to a constant synthethic
  > and pedagogical approach

## 6. Tooling

- [ ] **R36 — `cairn-postmortem`.** A command that prints, for one path or
  the repository, the mechanical half of these notes from Git and the
  forge: registration parent, ready-commit shape, digest recomputation, step
  integrity, red runs per branch, open-to-merge times. The trigger — a red
  run, `done`, or on demand — is part of the ruling. *(O, A.)*
- [ ] **R37 — The kit's self-test is not `npm test`.** A `cairn-test`
  script the workflow runs, so an adopter's product suite and the tools'
  fixtures stop sharing a name. *(A; Crumbz deleted the step.)*

## What this note does not do

It does not design anything. R09 does not say how the transition is found;
R36 does not say what the table looks like. Those belong to the promotion
path's decision records, each bound to the rulings it implements, and to the
coding paths the roadmap register then names. It also does not rank: the
order above is by theme, and the owner may strike or renumber freely.

## Sources

- The five notes in this folder at their state on `main` after PR #5
  (`fb0093b`): the Gemini and Codex post-mortems of 2026-09-03, the closure
  note of 2026-09-04, the sixteen-path audit and the owner's feedback of
  2026-09-06.
- The 1.0 convergence note `docs/cairn/cairn-manifesto-convergence-2026-09-02.md`,
  section 4, for the checkbox-as-ruling form.
