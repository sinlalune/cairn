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
  checkpoint: ca34010040daa836fe81004eb2f400f9a5c7511f
  checkpoint_unit: 0
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

S01 is complete and is the tip of `origin/path/cp-cairn-001`; `checkpoint`
above names the registration merge it was built on, because a brief cannot
name the commit that carries it. The specification now lives at `spec/`, its
index is written on the six stages at 5,588 words, the wiki holds 31 own
concepts beside 21 borrowed, and the 0.2 conformance matrix with the generated
catalogue and linkage sits on `spec/reference/conformance.md` under a preface
that dates it. The tools are still the 0.2 tools: 38 rule names, session
records, a separate brief, `foundation` in the route vocabulary. That gap is
stated on the conformance page and closes in S02 to S04.

What binds every unit: **delete before adding** (the decision ladder in section
3 of the convergence record, turned on the protocol itself); **every gate by
its exit code, then read CI** before calling a unit complete — the workflow now
runs on pushes to `path/**`; **no rewriting** of the published path branch;
**the trunk takes pull requests only**, with the `protocol` check required.

## Next action

S02 — the rules. Retire and demote per section 4's keep and retire lists;
fold `closure-surface`, `advisory-disposition` and `coherence-audit` into
`acceptance`; bring the fixture suite over from Atomik at
`46bdd11ba8d0d255fa3598273216b996ce5527d0` and keep every fixture of every kept
rule; run `cairn-rules --write` to regenerate the catalogue and the linkage on
the conformance page; rewrite the matrix rows against the kept rules. Plan
item 2 in `plan.md`. Settle or state the CP-OPS-002 debts listed at the end of
`plan.md` in the same unit.

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

## Reading order

1. `project/coding-paths/paths.md@3aca8a6af72a72164ac1e27cb9c93e017af33da1` — the 0.2 lifecycle this record follows until S03 replaces it.
2. `docs/cairn/manifesto.md@e248bc94232ba75777cbd305a9270fb114069d8e` — what every cut is measured against.
3. `docs/cairn/cairn-manifesto-convergence-2026-09-02.md@5ec546716b369b674574a4f370823385bea12518` — section 4's keep and retire lists are S02's instruction.
4. `spec/index.md` at the S01 tip, chapter 5 — what the kept rules must enforce; and `spec/reference/conformance.md`, the matrix to rewrite.
5. `project/coding-paths/CP-CAIRN-001/steps/S01.md` — what S01 changed in the tools and the debts it named for S06.

## Verification

`npm run cairn-check` prints `OK — protocol satisfied (1 advisory)` at the S01
tip against `origin/main`; the advisory is `concept-growth`, raised because the
wiki's previous listing at `spec/concepts/` on the trunk is empty, and explained
in the step. `npm run cairn-active -- --check` reports the view current.
`npm run cairn-rules -- --write` rewrites the tables on the conformance page
without a diff.
