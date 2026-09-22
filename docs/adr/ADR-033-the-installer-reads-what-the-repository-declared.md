---
type: Cairn Decision Record
title: ADR-033 — the installer reads what the repository declared, and says what it leaves
description: The kit plans under every root the configuration declares and derives one only where none is declared; `update` can decline a host file, and the lock remembers it as declined, never missing; the documentation index's template is written in the shape it describes; and `adopt` says, under the stale line, that a kept workflow or manifest still calls what it made stale, so the gate is red until they go. Promotes K12, K13, K14 and K16 of Cairn 1.2, from Q6, Q9 and Q10.
tags: [cairn, adr, 1.2, kit, update, adopt, roots, lock]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-033
  status: accepted
  date: 2026-09-21
---

# ADR-033 — the installer reads what the repository declared, and says what it leaves

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S02

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q6, first option; Q9 and Q10,
first option) and the [asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md)
at blob `837262d5b3a761ef14d14bad0be8278133256e53` (theme 3, K12, K13,
K14 and K16). The four lines come from
[Atomik's adoption note](../../feedbacks/2026-09-21-atomik-adopts-1-1.md),
observations 4 and 5, [Crumbz's update note](../../feedbacks/2026-09-16-crumbz-update-to-1-1.md),
observation 6, and [the release path's S04](../../project/coding-paths/CP-CAIRN-011/steps/S04.md).
All of them stay exactly as they were.

## Context

`optionsFromConfig` carries `projectRoot`, `docsRoot`, `sourceRoots` and
`conceptsRoot`, and not the architecture, decisions or modules root;
`buildConfig` derives those three under the documentation root. A
repository that declared one of them elsewhere gets a second, empty root
beside its real one: Atomik declares `roots.architecture: docs/bedrock`
and received `docs/architecture/index.md`, which no page links and the
checker now watches. The concept root had exactly this defect and ADR-011
decision 2 repaired it; its three siblings were not looked at.

The release's own `update`, run on this repository, wrote three concept
indexes under the protocol's wiki root that this repository does not
want. The only way to refuse them was to delete them after the run, and
`status` has read them as *missing* at every reading since.

The documentation index the kit installs says *there is one page at this
root, `docs/<surface>.md`, listed above* and *adds its line to the
README*. Crumbz has no surface page and no README; the reviewer flagged
both, the writer kept the release's text whole, and two false sentences
stand on a page the adopter owns.

Atomik's workflow runs the 0.2 test suite beside the tools `adopt`
replaced. `adopt` listed the eight tests as shapes to delete, one line
each, and said nothing of the kept script and the kept workflow step that
call them; the adoption was committed on a green `cairn-check`, and CI
went red on the next push.

## Decisions

### Decision 1 — the kit plans under every declared root

Promotes **K13**, from Q6.

`optionsFromConfig` carries every root the configuration declares —
architecture, decisions and modules beside concepts — and `buildConfig`
derives a root only where the configuration declares none. The plan
asserts once that every path it writes falls under a declared root.

What this changes: `tools/cairn.mjs`, `optionsFromConfig`, `buildConfig`
and `planInstall`; `tools/cairn.test.mjs`, one test on a repository whose
roots sit elsewhere.

### Decision 2 — `update` can decline a host file

Promotes **K14**, from Q6.

`update` takes the name of a file it would write and does not write it,
now or at any later update, until the owner takes it back. The
declination is a field of the lock, so `status` reads the file as
*declined*, never as *missing*, and the pointer page lists it beside what
the kit owns. What the option is called and how a declination is
withdrawn is the coding path's.

What this changes: `tools/cairn.mjs`, `applyUpdate`, `installationStatus`,
`lockFor` and `pointerPage`; `cairn.lock.json`, one field; the lock's row
of `spec/reference/repository-layout.md`; `tools/cairn.test.mjs`.

### Decision 3 — template sentences are written in the shape they describe

Promotes **K12**, from Q10.

A template describes the shape a plane will have, not the state it
asserts on the day it lands. The documentation index says *one page at
this root per surface, as they are written*, and *adds its line to the
README, where the repository has one*.

What this changes: `documentationIndex` in `tools/cairn.mjs`, two
sentences; the template's test in `tools/cairn.test.mjs`. A repository
that already carries the page receives the change as `update` delivers
any template change to an edited host file (ADR-015 decision 2).

### Decision 4 — `adopt` says when a kept host file calls what it made stale

Promotes **K16**, from Q9.

When `adopt` keeps a host file — the manifest, the workflow — that calls a
file it just reported stale, the report says so under the stale line:
*`package.json` and `.github/workflows/cairn.yml` call these; your gate
is red until they go*. The three facts are already in hand when the line
is printed.

What this changes: `staleShapes` and the `adopt` report in
`tools/cairn.mjs`; `tools/cairn.test.mjs`, one test on a kept workflow
that runs a stale suite.

## Alternatives rejected

- **Every declared root read, and declining stays a deletion** (Q6,
  second option): refused by the owner. A deleted file is *missing* at
  every `status` after, and the next update writes it again.
- **As today** (Q6 and Q10, last options) and **no — the stale list is
  enough** (Q9, second option): refused by the owner.
- **Installing a README stub so the template's sentence holds** (K12's
  second half): a file written to make a sentence true, in a repository
  whose README, if it has one, is the adopter's (ADR-023 decision 1).
- **A rule that refuses a root written outside the declared ones**: the
  installer writing under the declared roots costs one assertion and
  proves the same.
- **`adopt` deleting the stale tests it names**: `adopt` deletes nothing
  the repository carries, deliberately; the report says what the
  adopter's own gate will do.

## Consequences

- A repository whose roots sit anywhere the configuration says gets one
  root each; nothing is written beside a declared one.
- A file the repository does not want is declined once and stays so; the
  lock is the one place that remembers it.
- The documentation index reads true on the day it lands and stays true
  as pages are written.
- An adoption that leaves the adopter's gate red says so before the
  commit, not after the push.

## What the manifesto's test weighed

Q6's option is tagged *a field the lock remembers*: one field in a file
the kit already owns, in place of a deletion repeated at every update.
Q9 and Q10 are a sentence each, printed from facts the kit already holds.
Nothing enters the checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the installer's options and plan | `optionsFromConfig`, `buildConfig`, `planInstall` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |
| 2 | the update command, the lock, the pointer page, the layout reference | `applyUpdate`, `installationStatus`, `lockFor`, `pointerPage` in `tools/cairn.mjs`; `cairn.lock.json`; `spec/reference/repository-layout.md`, the lock's row; `tools/cairn.test.mjs` |
| 3 | the documentation index template | `documentationIndex` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |
| 4 | the adopt report | `staleShapes` and the `adopt` branch of `main` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
