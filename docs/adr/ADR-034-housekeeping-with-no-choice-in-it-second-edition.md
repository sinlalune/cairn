---
type: Cairn Decision Record
title: ADR-034 — housekeeping with no choice in it, second edition
description: Eleven corrections the reviewers of 1.1 found and nobody disputes, taken together as ADR-008 took the first seven — the generated view off the reconcile list, two generations of one release byte-equal, the files an update starts managing named, `status` planning as `update` does, this repository's bootloader pointing at the pointer page, the `comparison` messages saying GitHub, a fixture red once read for its order, the close skill's dangling link dropped, the post-mortem counting the run it runs in, printing a closed request as closed, and reading the one path that arrived on the trunk. Promotes K09, K10, K11, K15, K19, K23, K24, K25, K29, K30 and K36 of Cairn 1.2, from Q16.
tags: [cairn, adr, 1.2, housekeeping, kit, checker, postmortem, skills]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-034
  status: accepted
  date: 2026-09-21
---

# ADR-034 — housekeeping with no choice in it, second edition

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S02

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q16, *do all of it in 1.2*)
and the [asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at
blob `837262d5b3a761ef14d14bad0be8278133256e53` (K09, K10, K11, K15,
K19, K23, K24, K25, K29, K30 and K36, across themes 3 to 6). The lines
come from [Crumbz's update note](../../feedbacks/2026-09-16-crumbz-update-to-1-1.md),
observations 2, 3, 4, 5, 7, 8 and 9, [Atomik's adoption note](../../feedbacks/2026-09-21-atomik-adopts-1-1.md),
observation 2, [coding path 6's journal entry](../../project/log/2026-09-15-cp-cairn-010.md),
and [the release path](../../project/coding-paths/CP-CAIRN-011/index.md),
S01 and S04. All of them stay exactly as they were.

## Context

As on the 1.1 page, the decisions page listed the corrections a reviewer
found as one question, because none of them offers a choice. Each
decision below names the fault, the fix and the surface by its current
name. None adds a control; two remove text.

## Decisions

### Decision 1 — the generated view is never on the reconcile list

Promotes **K09**. `applyUpdate` computes the reconcile list before it
regenerates `ACTIVE.md` and compares the view with the kit's empty
placeholder, so every update run inside a running path names the one
file the kit says never to hand-edit as a file to settle by hand. The
list excludes the generated view, as `installationStatus` already
excludes it from the *current* comparison.

What this changes: `applyUpdate` in `tools/cairn.mjs`, one condition;
`tools/cairn.test.mjs`.

### Decision 2 — two generations of one release are byte-equal

Promotes **K10**. `front()` stamps every generated page with the day it
was written, so a pristine pointer page reads *would write* the next
morning and five folder indexes were rewritten on Crumbz with a diff of
one timestamp line each. A generated page's timestamp is the release's
stamp date — `stampedAt` of `tools/release.json`, written at `prepack`
— and, where no stamp exists, the source commit's date.

What this changes: `front` in `tools/cairn.mjs`, and every page it
stamps; `tools/cairn.test.mjs`, one assertion that two plans of one
release are equal.

### Decision 3 — the update report names the files it starts managing

Promotes **K11**. A host file the repository had before the kit was
*unmanaged* at the old lock and *edited* at the new, and the update's
report and the pointer page never named it. The report lists such files
as a third kind beside written and kept, and the pointer page lists them
with the kept; the state is already computed.

What this changes: `applyUpdate` and `pointerPage` in `tools/cairn.mjs`;
`tools/cairn.test.mjs`.

### Decision 4 — `status` builds its plan as `update` does

Promotes **K15**. `update` sets the migrated configuration into its plan
before comparing and `status` does not, so `status` names a rewrite of
`cairn.config.json` that `update` will not make, on every adopted
repository at its first reading. Both commands build the plan through
one function.

What this changes: the `status` and `update` branches of `main` in
`tools/cairn.mjs`, today at `plan.files.set('cairn.config.json', …)` in
`applyAdopt` and in the `update` branch, and nowhere on the `status`
path; `tools/cairn.test.mjs`.

### Decision 5 — this repository's bootloader points at the pointer page

Promotes **K19**. The bootloader the kit generates names `cairn/README.md`
as its sixth entry; this repository's `AGENTS.md` names it nowhere,
because the release path declined the line as outside its writes. One
line.

What this changes: `AGENTS.md`, one line.

### Decision 6 — the `comparison` rule's messages say GitHub

Promotes **K23**. Two printed messages still say *the forge* where
GitHub's all-zeros sentinel is meant; ADR-029 decided the reading and
the 1.1 page replaced the word, and the messages were not read.

What this changes: the two `comparison` messages in `tools/cairn-check.mjs`.

### Decision 7 — the fixture red once on `record-integrity` is read for its order

Promotes **K24**. The release path's suite went red once on a fixture
expecting no blocking finding that met `record-integrity`, and green on
two reruns of the same tree; not reproduced since. The fixture is read
once for the order it depends on, and pinned where one is found; where
none is, the coding path's step says so and the row carries nothing
further.

What this changes: `tools/cairn-fixture.test.mjs`, one fixture, if a
dependence is found.

### Decision 8 — the close skill stops pointing at `tools/soundness.md`

Promotes **K25**. Step 5 of the close skill and its reference say the
file carries the finding; no release installs it, and a reader following
the skill for a first closing looks for it. The sentence goes: the
skill's reader needs the rule, not the finding.

What this changes: `skills/cairn-close/SKILL.md`, step 5;
`skills/cairn-close/reference.md`, one sentence.

### Decision 9 — the post-mortem counts the run it runs in

Promotes **K29**. `readRedRuns` asks GitHub for the branch's runs with
`status=failure`, which cannot return the run still in progress that the
failure step runs it from, so the first red run reads *no red run* and
every later count is one short. The workflow's failure step says it is
one — one environment variable — and the tool counts it.

What this changes: `readRedRuns` in `tools/cairn-postmortem.mjs`; the
post-mortem step of `.github/workflows/cairn.yml` and of the workflow
`workflow()` in `tools/cairn.mjs` generates; `tools/cairn-postmortem.test.mjs`,
`tools/cairn-workflow.test.mjs`.

### Decision 10 — a closed, unmerged request prints as closed

Promotes **K30**. `readRequests` keeps `number`, `created_at` and
`merged_at`, and `requestsReading` prints every entry without `merged_at`
as *open since*, a voided request included. The projection keeps `state`
and `closed_at`, and a request that is closed and not merged prints
*closed*.

What this changes: `readRequests` and `requestsReading` in
`tools/cairn-postmortem.mjs`; `tools/cairn-postmortem.test.mjs`.

### Decision 11 — on the trunk, the post-mortem reads the path that arrived

Promotes **K36**. Given the trunk, the tool prints one section per path
record in the repository — twenty-seven on Crumbz — and nothing about
the finding that failed. On the trunk it reads the path whose record
changed in the compared range, the arrival the checker just judged, and
prints that one; where no record changed, it prints the checker's
finding first and no path at all. The workflow already passes the base
to the checker one step earlier.

What this changes: `tools/cairn-postmortem.mjs`, its trunk reading; the
post-mortem step of both workflows, which pass the base;
`tools/cairn-postmortem.test.mjs`, `tools/cairn-workflow.test.mjs`.

## Alternatives rejected

- **Later** (Q16): the owner chose all of it now.
- **Pinning the close skill's link to `tools/soundness.md` in the
  protocol repository at the release's commit** (K25's first half): a
  pinned link to a finding the skill's reader does not need.
- **Reading the runs after the current one has concluded** (K29's
  second half): the failure step is where the tool runs; one variable
  from the workflow costs less than a second reading.

## Consequences

- `status` and `update` answer the same question the same way, and a
  pristine generated page stays pristine.
- The post-mortem's three readings — the red count, the requests, the
  trunk's path — say what happened rather than what the query returned.
- One skill and one reference lose a sentence; one bootloader gains a
  line and two checker messages a word.

## What the manifesto's test weighed

The question carried no tag because it offered no choice. Decisions 9
and 11 touch the workflow, one variable each; everything else is a
condition, a field, a date, a sentence or a word.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the update command | `applyUpdate` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |
| 2 | every generated page's stamp | `front` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |
| 3 | the update report and the pointer page | `applyUpdate`, `pointerPage` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |
| 4 | the status and update commands | `main` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |
| 5 | this repository's bootloader | `AGENTS.md` |
| 6 | two checker messages | rule `comparison` in `tools/cairn-check.mjs` |
| 7 | one fixture | `tools/cairn-fixture.test.mjs` |
| 8 | the close skill and its reference | `skills/cairn-close/SKILL.md`; `skills/cairn-close/reference.md` |
| 9 | the post-mortem's red-run reading, both workflows | `readRedRuns` in `tools/cairn-postmortem.mjs`; `.github/workflows/cairn.yml`; `workflow()` in `tools/cairn.mjs`; the two tests |
| 10 | the post-mortem's request reading | `readRequests`, `requestsReading` in `tools/cairn-postmortem.mjs`; `tools/cairn-postmortem.test.mjs` |
| 11 | the post-mortem's trunk reading, both workflows | `tools/cairn-postmortem.mjs`; `.github/workflows/cairn.yml`; `workflow()` in `tools/cairn.mjs`; the two tests |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding paths that carry it, from this path's last unit.
