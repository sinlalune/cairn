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
  current_step: S05
  base_commit: 43cfeb96670eba615567b967f7368f32b3d8a409
  branch: path/cp-cairn-001
  assigned_writer: cp-cairn-001-writer
  depends_on: []
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
    - project/index.md
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

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-02T11:19:13Z
scope_ref: project/coding-paths/CP-CAIRN-001/index.md#definition-of-done
scope_digest: sha256:bc3120b9e31b7ef2e76ad6444c14d9158f25117dbe020eab2d06b84996066832
```

Reviewed at registration: route `full` because the path changes the control
plane; the definition of done is section 4 of the convergence record, every
checklist of which the owner ticked, then confirmed with *"I want everything"*;
no other path runs here; Atomik's product documentation excluded. Amendments:
none. Recorded before opening acceptance moved inline, in
`project/sessions/2026-09-02-cp-cairn-001-opening.md`, which stays as the
immutable original; the block above carries the same digest.

## Documentation coverage

### Required

- `docs/cairn/manifesto.md` — what the protocol is for; every cut is measured against it.
- `docs/cairn/cairn-manifesto-convergence-2026-09-02.md` — the audit, the state of the art, and section 4: the shape this path builds.
- `project/coding-paths/paths.md` — the 0.2 lifecycle this record follows until it replaces it.
- `spec/index.md` — the specification, on the six stages since S01; the 0.2 text it was cut from is pinned in `governs:` at its old path.

### Conditional

- `spec/reference/conformance.md` — when the rules are cut (S02) and when the weight budget is measured (S08).
- Atomik's journal entry for CP-OPS-002 (https://github.com/sinlalune/atomik/blob/46bdd11ba8d0d255fa3598273216b996ce5527d0/atomik-project/log/2026-09-02-cp-ops-002.md) — the named debts, when the rules are cut.

### Deliberately excluded

- Atomik's product documentation — nothing under its `docs/bedrock/` is protocol.

## Steps

- **[S01](./steps/S01.md)** — the specification moved to `spec/` and written on the six stages; 17,455 words became 5,588, 50 own concepts became 31; the 0.2 matrix moved to the conformance page — COMPLETE
- **[S02](./steps/S02.md)** — the rules cut from 39 names to 24, nineteen blocking and every one with an adversarial fixture; the suite brought over from Atomik and completed; configuration schema 2; the conformance matrix rewritten against 1.0 — COMPLETE
- **[S03](./steps/S03.md)** — one folder per path: opening acceptance inline and read there, the resume section replacing the brief, `depends_on:` validated and projected as the unblocked view, `foundation` and `emergency` gone, folder logs gone; this record migrated as the worked example — COMPLETE
- **[S04](./steps/S04.md)** — the pull request is the closing record: `pull-request` the default transport with `manual-git` as the fallback, the checker proving only what Git holds on the first and reading one closing record in the path folder on the second, the drift base derived from the merge-base — COMPLETE
- **[S05](./steps/S05.md)** — the procedures as five Agent Skills under `skills/`, each under a thousand tokens, the operations page cut into their reference files and deleted, the skills checked and installed with the kit — COMPLETE
- **S06** — in progress; its file is linked when it is written

Forward steps live in [plan.md](./plan.md) until they are executed.

## Resume

### Checkpoint

```text
commit : eb216c5df3e109475e82fbfd57f094186068d6b1 — the S04 completing commit, on origin/path/cp-cairn-001; S05 is the commit that carries this refresh
unit   : 04
base   : 43cfeb96670eba615567b967f7368f32b3d8a409
trunk  : ca34010040daa836fe81004eb2f400f9a5c7511f — origin/main has not moved since registration
```

### Next action

S06 — `npx cairn`: `init` from a thin kit that links the specification at the
pinned release instead of copying it, `status` comparing `cairn.lock.json` with
the published release, `update` rewriting pristine files by digest and
reporting edited ones, and `adopt` for a repository that carries the protocol
without a lock. The lock is rewritten to the 1.0 paths. Atomik at
`46bdd11ba8d0d255fa3598273216b996ce5527d0` is the acceptance test for `adopt`.
Plan item 6 in `plan.md`.

### Blockers

None.

### Tried and rejected

- Building 1.0 inside Atomik and extracting afterwards — a hand-synchronised
  second copy is how a specification and its implementation drift while both
  look maintained (Atomik forward-plan item 12).
- Keeping the 0.2 checker and only slimming the prose — the manifesto's first
  threat is more control through more rules; the cut is the deliverable.
- A graph database for path dependencies — one `depends_on:` field and the
  live view cover the need; a database beside Markdown is the non-native
  solution the manifesto warns about.
- Leaving the conformance matrix in the specification index until the rule
  cut (S01) — the index would have shipped at 12,000 words carrying a table
  about tools it no longer describes.
- A `roots.specification` configuration field (S01) — the parent of the
  concept root already says where the specification is.
- Keying `work-unit`'s required parts to the declared unit type (S02) — the
  merge-deciding comparison sees every unit on the branch at once.
- Copying the manifesto into every installed repository (S02) — it drags the
  design history behind it; the manifesto is linked by URL until the kit
  links the specification (S06).
- A rule for the resume section (S03) — its contract is a judgement measured
  by cold resume, and a schema over prose is a proxy predicate.
- Reading the request's approval from the forge in the checker (S04) — a
  network and a token in the one tool that must run offline, to re-check a
  guarantee the forge already gives.
- A `roots.skills` configuration field (S05) — the standard fixes the folder's
  shape, and a field would be a migration for a name nobody would change.

### Reading order

1. `docs/cairn/manifesto.md@e248bc94232ba75777cbd305a9270fb114069d8e` — what every cut is measured against.
2. `docs/cairn/cairn-manifesto-convergence-2026-09-02.md@5ec546716b369b674574a4f370823385bea12518` — section 4 is the definition of done; its transport decisions are S04's instruction.
3. `docs/cairn/cairn-manifesto-convergence-2026-09-02.md` section 4, *Distribution* and *The cutover* — what S06 builds and what it must not do.
4. `tools/cairn-init.mjs` and `cairn.lock.json` at the S05 tip — the installer to rebuild thin, and the lock still listing the 0.2 paths.
5. `project/coding-paths/CP-CAIRN-001/steps/S01.md`, the debt noted for S06 — the lock and the installer's remaining 0.2 assumptions.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm run cairn-rules -- --write
npm test
```

`cairn-check` prints `OK — protocol satisfied (1 advisory)` against
`origin/main`; the advisory is `concept-growth`, explained in S01. The view is
current, the generated tables rewrite without a diff, and the suite passes.
