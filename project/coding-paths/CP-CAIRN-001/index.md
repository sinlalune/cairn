---
type: Cairn Coding Path
title: Cairn 1.0 — the protocol cut to its manifesto and released from its own repository
description: The genesis path. Reorganise the specification on the six stages of the chronology, cut rules and concepts to what the manifesto's own test keeps, make one folder per path, ship the procedures as skills and the kit as an npx command, and release 1.0.0 with the weight budget measured.
tags: [coding-path, genesis, cairn-1.0]
timestamp: 2026-09-02T00:00:00Z
cairn:
  id: CP-CAIRN-001
  route: full
  status: running
  current_step: S01
  base_commit: 43cfeb96670eba615567b967f7368f32b3d8a409
  branch: path/cp-cairn-001
  assigned_writer: cp-cairn-001-writer
  subject_commit: null
  resolution: null
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
---

# CP-CAIRN-001 — Cairn 1.0

## Goal

This repository, seeded from Atomik at its genesis commit with the 0.2 protocol,
becomes the home of Cairn 1.0: the protocol cut to what its
[manifesto](../../../docs/cairn/manifesto.md) keeps, in the shape the
[convergence record](../../../docs/cairn/cairn-manifesto-convergence-2026-09-02.md)
proposes and the owner ruled on, released as a tagged version an adopter
installs with one command. Deletion before addition, at every unit.

## Definition of done

- [ ] `spec/index.md` is organised on the six stages of the chronology — idea
      and ideation; research; vision and specifications; roadmap; coding cycle;
      learning loop — with the coding cycle as the current specification cut
      down, and the whole under 8,000 words.
- [ ] The concept wiki holds about thirty Cairn-defined concepts, merged as the
      convergence record's section 4 lists, beside the borrowed vocabulary, and
      every concept is linked from normative text.
- [ ] The checker enforces about twenty rules — section 4's keep list — each
      with an adversarial fixture; the retire list is removed or demoted as
      stated; the catalogue and the conformance linkage regenerate.
- [ ] One folder per path: opening acceptance inline in `index.md`, a resume
      section replacing the separate brief, closing as the pull request plus
      the journal entry integration writes; the lightweight route implemented
      as specified; `full` retained; `foundation` folded; `emergency` dropped.
- [ ] The pull request is the default integration transport with `manual-git`
      as the fallback and `cairn-check` the one required check; the path
      record gains `depends_on:` and the live view shows which paths are
      unblocked.
- [ ] `skills/` ships cairn-brainstorm, cairn-open, cairn-unit, cairn-close and
      cairn-code as Agent Skills folders, each under 5,000 tokens, cairn-code
      carrying the decision ladder.
- [ ] `npx cairn` provides `init`, `status`, `update` and `adopt`, driven by
      the digests in `cairn.lock.json`; the kit installs under 30 files and
      links the specification at the pinned release instead of copying it.
- [ ] `README.md` carries the beginner overview and three quick starts;
      `manifesto.md` is the edited edition of the owner's statement; `site/`
      builds the React Markdown renderer with Mermaid from manifesto, README and
      specification and publishes to GitHub Pages.
- [ ] The weight budget is measured and stated on the conformance page:
      specification under 8,000 words, entry chain under 3,000, kit under 30
      files, one lightweight unit under 6 protocol files.
- [ ] Release `1.0.0` is tagged on the trunk, and the greenfield pilot is rerun
      from that release, install to `done`.

## Documentation coverage

### Required

- `docs/cairn/manifesto.md` — what the protocol is for; every cut is measured against it.
- `docs/cairn/cairn-manifesto-convergence-2026-09-02.md` — the audit, the state of the art, and section 4: the shape this path builds.
- `project/coding-paths/paths.md` — the 0.2 lifecycle this record follows until it replaces it.
- `docs/cairn/specification/index.md` — the 0.2 specification being cut.

### Conditional

- `docs/cairn/specification/reference/conformance.md` — when the weight budget and the rule linkage are written.
- Atomik's journal entry for CP-OPS-002 (https://github.com/sinlalune/atomik/blob/46bdd11ba8d0d255fa3598273216b996ce5527d0/atomik-project/log/2026-09-02-cp-ops-002.md) — the named debts, when the rules are cut.

### Deliberately excluded

- Atomik's product documentation — nothing under its `docs/bedrock/` is protocol.

## Steps

- **S01** — in progress; its file is linked when it is written

Forward steps live in [plan.md](./plan.md) until they are executed.

## Current checkpoint

```text
base commit : 43cfeb96670eba615567b967f7368f32b3d8a409
branch      : path/cp-cairn-001
writer      : cp-cairn-001-writer
remote      : not yet published
gates       : cairn-check OK on the genesis commit
session     : registering
next action : S01 — the specification reorganised on the six stages, cut before added
blockers    : none
cleanup plan: after remote integration proof, remove the exact clean secondary
              worktree without force
```

## Blockers

- None.
