---
type: Cairn Decision Record
title: ADR-014 — two tools of 1.1
description: A post-mortem command that reads from Git and the forge what the adopter notes read by hand, run by the workflow when a check goes red and on demand; and the kit's self-test under its own script name, cairn-test, so an adopter's product suite keeps npm test. Promotes R36 and R37.
tags: [cairn, adr, 1.1, tools, postmortem, self-test]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-014
  status: accepted
  date: 2026-09-06
---

# ADR-014 — two tools of 1.1

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S05

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (Q18, and the self-test item of Q13) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R36 and R37). Both notes stay exactly as they were. ADR-008 covers the rest of Q13 and names this record for R37.

## Context

Every note under `feedbacks/` has two halves. One half is mechanical:
which commit registered a path and what its parent was, whether the
`ready` commit has the shape the close skill describes, whether the
definition of done still digests to its acceptance, whether every step
still carries its adding blob, how many red runs each branch produced,
how long each request stayed open before the merge. The other half is
judgement. The first half was read by hand five times in three days, from
the same Git and forge commands.

Separately, this repository's package script `test` runs the tools' own
fixture suite, and this repository's workflow runs it before the checker
so a red suite gives no verdict. The kit installs the five tools and none
of their tests, on purpose: the suite exercises this repository's
fixtures. An adopter's `npm test` is its product suite, and the first
adopter met a workflow step that ran it as if it were the kit's, and
deleted the step.

## Decisions

### Decision 1 — `cairn-postmortem`, on a red run and on demand

Promotes **R36**, from Q18. The owner's choice: *"Every time a check goes
red, so the incident is written while it happens."* And the derived
reading: the reading half only.

A command, `npm run cairn-postmortem`, prints for one path or for the
whole repository what the notes read by hand: the registration commit and
its parent against `base_commit`; the shape of the `ready` commit
against the one administrative commit; the definition of done's digest
recomputed against the acceptance; each step's integrity against its
adding blob; red runs per branch; the time from a request's opening to its
merge. Facts from Git and, with a token, from the forge; no judgement, no
recommendation. What the table looks like is the coding path's design.

The workflow runs it when the gate goes red: a step that runs only on the
failure of the checker's step, for the path the run belongs to, and prints
into the run's log under its own name. When the run belongs to a request,
the same output is posted once as a comment on the request with the
forge's own token, so the incident is beside the review that will read it.
Nothing is committed by the workflow: a branch has one writer, and the
writer copies the reading into a learning note when the incident deserves
one. On demand, the writer or the owner runs the same command by hand.

What this changes: one new tool under `tools/`, with its test kept in
this repository; one script in the kit's `package.json`; one step in
`.github/workflows/cairn.yml`; the layout reference's table and the
module note of the reference tools. The tool joins the kit's manifest,
counted in ADR-013's rule of at most twenty-nine files. An adopter that
installed 1.0 receives the workflow step and the script through ADR-015.

### Decision 2 — the kit's self-test is `cairn-test`, and it stays here

Promotes **R37**, from Q13.

The fixture suite of the tools is this repository's, run here as
`npm run cairn-test` by this repository's workflow before the checker,
and proven at each release against the exact tools the kit ships. The kit
installs no suite and its workflow runs no test step, as today; the
adopter's `npm test` is the adopter's, and neither the kit's
`package.json` nor its workflow names it. The unit skill's verify step
names `npm test` as the product's suite and says the kit's suite is not
the adopter's concern.

This repository keeps `npm test` as an alias of `cairn-test` so the
bootloader's command list stays true, and says so there.

What this changes: this repository's `package.json` and
`.github/workflows/cairn.yml`, one script and one step's command; the
bootloader's command list; the `cairn-unit` skill, step 4. The kit's
package and workflow templates in `tools/cairn.mjs` do not change for
this decision.

## Alternatives rejected

- **On demand only** (Q18 first option): the reading would still be done
  when someone remembers; the owner wants it at the incident.
- **At every closure, attached to the journal** (Q18 second option): a
  reading of a green path is a table nobody opens.
- **No new tool, a skill** (Q18 fourth option, the manifesto's): the
  reading is mechanical, and a skill that runs twelve Git commands is a
  tool written in prose.
- **Committing the post-mortem from the workflow**: a second writer on a
  branch that has one.
- **Installing the fixture suite so an adopter's workflow runs it**: the
  suite exercises this repository's fixtures and would hand an adopter a
  red run on the first command; eight more files against a budget that is
  already crossed; and the tools an adopter runs are the tools the suite
  proved at release.

## Consequences

- A red run leaves its reading in the log and on the request, at the
  minute it happened.
- The workflow has one more step that runs only on failure; a green run
  costs nothing more.
- The kit's manifest reaches the count ADR-013 sets only after two
  removals; the roadmap names the path that makes them.
- Adopters keep `npm test`, and the kit never names it.

## What the manifesto's test weighed

Decision 1 keeps an option tagged *a new command, wired into CI*, against
a *no new tool* option the manifesto would prefer. The record weighs it
as: the tool replaces a manual reading that was done five times and will
be done again; it judges nothing; and its trigger is the forge's own
failure hook. The budget cost is real and is counted in ADR-013. Decision 2 is a rename
in this repository and a removal of a claim: the kit runs no suite it does
not ship.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | a new tool and its test, the package script, the workflow, the module note | `tools/`; `package.json`; `.github/workflows/cairn.yml`; `docs/modules/application.md`; `spec/reference/repository-layout.md` |
| 2 | this repository's package script and workflow, the bootloader, the unit skill | `package.json`; `.github/workflows/cairn.yml`; `AGENTS.md`; `cairn-unit` step 4 |
