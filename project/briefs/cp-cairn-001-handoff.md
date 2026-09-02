---
type: Cairn Brief
title: Handoff — CP-CAIRN-001
description: Where the genesis path stands and what to do next.
tags: [brief, cairn, genesis]
timestamp: 2026-09-02T00:00:00Z
cairn:
  path: CP-CAIRN-001
  branch: path/cp-cairn-001
  written_by: cp-cairn-001-writer
  checkpoint: fb0b27eff1a985a6549d76dccc82ec826c486f2d
  checkpoint_unit: 1
  checkpoint_pushed: true
  base_commit: 43cfeb96670eba615567b967f7368f32b3d8a409
  trunk_seen: ca34010040daa836fe81004eb2f400f9a5c7511f
  writes:
    - README.md
    - manifesto.md
    - package.json
    - cairn.config.json
    - AGENTS.md
    - .github/**
    - docs/**
    - spec/**
    - skills/**
    - kit/**
    - tools/**
    - site/**
    - project/coding-paths/paths.md
    - project/coding-paths/binding.md
    - project/coding-paths/CP-CAIRN-001/**
    - project/briefs/cp-cairn-001-handoff.md
  governs:
    - docs/cairn/manifesto.md@e248bc94232ba75777cbd305a9270fb114069d8e
    - docs/cairn/cairn-manifesto-convergence-2026-09-02.md@5ec546716b369b674574a4f370823385bea12518
    - project/coding-paths/paths.md@3aca8a6af72a72164ac1e27cb9c93e017af33da1
    - docs/cairn/specification/index.md@66ea502186947e36138827025dd020b986660129
  verify:
    - npm run cairn-check
    - npm run cairn-active -- --check
    - npm run cairn-rules -- --write
    - npm test
---

# Resume CP-CAIRN-001 here

## Outcome

Cairn 1.0 released from this repository: the 0.2 protocol this repository was
seeded with, cut to what the manifesto keeps and shaped as the convergence
record's section 4 proposes — six chapters, about twenty rules, about thirty
concepts, one folder per path, pull-request integration, five skills, an
`npx cairn` command, a README and a site, a measured weight budget, a tagged
release the greenfield pilot completes.

## State

S02 is complete and is the tip of `origin/path/cp-cairn-001`; `checkpoint`
above names the S01 commit it was built on, because a brief cannot name the
commit that carries it. The specification lives at `spec/` on the six stages
(S01). The checker now implements the 1.0 rule set: 24 names, 19 blocking,
every blocking rule with an adversarial fixture against a real installed
repository; `npm test` runs 220 subtests; the configuration is schema 2; the
conformance matrix is written against 1.0 and records where every 0.2 name
went. What the tools still read in 0.2 shapes — opening and closing acceptance
from session records, the audit from an audit file, the brief as a lifecycle
record, `foundation` in the route vocabulary — is named row by row on the
conformance page and closes in S03 and S04.

What binds every unit: **delete before adding** (the decision ladder in section
3 of the convergence record, turned on the protocol itself); **every gate by
its exit code, then read CI** before calling a unit complete — the workflow now
runs on pushes to `path/**`; **no rewriting** of the published path branch;
**the trunk takes pull requests only**, with the `protocol` check required.

## Next action

S03 — one folder per path. Opening acceptance inline in `index.md` under its
own heading, and `schema` reads it from there instead of from a session
record; a resume section in `index.md` replacing this brief; the lightweight
route as the specification states it (the three reliefs); `depends_on:` in the
declaration and the unblocked view in `cairn-active`; `foundation` folded into
`full` and `emergency` dropped from the checker's vocabulary and
`WORK_UNIT_TYPES`; `cairn-init` writes the new shape. Migrate this path's own
record to the new shape in the same unit — it is the worked example — and
fold this brief into it. Plan item 3 in `plan.md`. Every fixture that builds a
session opening record or a brief follows the shape it tests.

## Blockers

none

## Tried and rejected

- Building 1.0 inside Atomik and extracting afterwards — rejected: a
  hand-synchronised second copy is how a specification and its implementation
  drift while both look maintained (Atomik forward-plan item 12).
- Keeping the 0.2 checker and only slimming the prose — rejected: the
  manifesto's first threat is more control through more rules; the cut is the
  deliverable, not a side effect.
- A graph database for path dependencies — rejected: one `depends_on:` field
  and the live view cover the need; a database beside Markdown is the
  non-native solution the manifesto warns about.
- Leaving the conformance matrix in the specification index until S02 —
  rejected in S01: the index would have shipped at 12,000 words carrying a
  table about tools it no longer describes.
- A new `roots.specification` configuration field so the checker finds
  `spec/` — rejected in S01: the parent of the concept root already says where
  the specification is, and a schema change is a migration every adopter pays.
- Keying `work-unit`'s required parts to the declared unit type — rejected in
  S02: the merge-deciding comparison sees every unit on the branch at once, so
  the current unit's type cannot select the parts of a cumulative diff.
- Copying the manifesto into every installed repository so the specification's
  link resolves — rejected in S02: it drags the design history behind it; the
  manifesto is linked by URL until the kit links the specification (S06).

## Reading order

1. `project/coding-paths/paths.md@3aca8a6af72a72164ac1e27cb9c93e017af33da1` — the 0.2 lifecycle this record follows until S03 replaces it.
2. `docs/cairn/manifesto.md@e248bc94232ba75777cbd305a9270fb114069d8e` — what every cut is measured against.
3. `docs/cairn/cairn-manifesto-convergence-2026-09-02.md@5ec546716b369b674574a4f370823385bea12518` — section 4's keep and retire lists are S02's instruction.
4. `spec/index.md` at the S02 tip, chapter 5 — the record shape, the route and the resume section S03 builds; and `spec/reference/conformance.md`, the rows marked partial on S03.
5. `project/coding-paths/CP-CAIRN-001/steps/S02.md` — what S02 left reading 0.2 shapes on purpose, and where each is named.
6. `tools/cairn-fixture.test.mjs` — the harness S03 changes the record shape under; every fixture that writes a session record or a brief moves with it.

## Verification

`npm run cairn-check` prints `OK — protocol satisfied (1 advisory)` at the S02
tip against `origin/main`; the advisory is `concept-growth`, raised because the
wiki's previous listing at `spec/concepts/` on the trunk is empty, and explained
in S01. `npm run cairn-active -- --check` reports the view current.
`npm run cairn-rules -- --write` rewrites the tables on the conformance page
without a diff. `npm test` reports 220 subtests passing, 0 failing.
