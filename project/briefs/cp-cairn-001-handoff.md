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
  checkpoint: 43cfeb96670eba615567b967f7368f32b3d8a409
  checkpoint_unit: 0
  checkpoint_pushed: true
  base_commit: 43cfeb96670eba615567b967f7368f32b3d8a409
  trunk_seen: 43cfeb96670eba615567b967f7368f32b3d8a409
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

Registered, no unit executed. The repository is Atomik's kit at release 0.2
plus the three governing documents under `docs/cairn/`: the owner's manifesto,
the project note, and the convergence record whose twenty-four decisions are
all ticked. Authority over the portable protocol moved to this repository at
its genesis commit; Atomik is adopter one and waits for `adopt`.

What binds every unit: **delete before adding** (the decision ladder in section
3 of the convergence record, turned on the protocol itself); **every gate by
its exit code, then read CI** before calling a unit complete; **no rewriting**
of the published path branch; **the trunk takes pull requests only**, with the
`protocol` check required.

## Next action

S01 — move `docs/cairn/specification/` to `spec/`, write `spec/index.md` on
the six stages of the chronology with the current normative text folded into
chapter five and cut, merge the concepts section 4 lists, and measure the word
count at the end of the unit. Plan item 1 in `plan.md`.

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

## Reading order

1. `project/coding-paths/paths.md@3aca8a6af72a72164ac1e27cb9c93e017af33da1` — the 0.2 lifecycle this record follows until S03 replaces it.
2. `docs/cairn/manifesto.md@e248bc94232ba75777cbd305a9270fb114069d8e` — what every cut is measured against.
3. `docs/cairn/cairn-manifesto-convergence-2026-09-02.md@5ec546716b369b674574a4f370823385bea12518` — section 1 for the weights, section 3 for the state of the art, section 4 for the shape to build; every checkbox is an owner ruling.
4. `docs/cairn/specification/index.md@66ea502186947e36138827025dd020b986660129` — the 0.2 specification being cut; read chapter by chapter as S01 reaches it, not whole.

## Verification

`npm run cairn-check` prints `OK — protocol satisfied` on the registration
commit, with no advisories. `npm run cairn-active -- --check` reports the view
current.
