---
type: Cairn Release Notes
title: Changelog
description: One section per release of the Cairn protocol — first the adopter repairs it absorbed and the ones it did not, by the adopter's path ids, then what it changes for an adopter, then one line per kit template it changed.
tags: [cairn, release, changelog]
timestamp: 2026-09-26T00:00:00Z
---

# Changelog

One section per release, written by the release path before the tag
([ADR-039](docs/adr/ADR-039-the-release-notes-name-what-a-release-absorbed.md)).
`npx cairn-protocol status` links this file at the newer release's commit,
and the pointer page links it.

## 1.2.0

The protocol for a repository that is not this one: registering where the
trunk takes no direct push, an installer that reads what the repository
declared, a home for deferred work, a channel from an adopter back to
Cairn, and a fresh reader of the candidate before the owner. What it
decides, record by record, is [the 1.2 page](docs/architecture/02-cairn-1-2.md).

### The adopter repairs this release absorbed, and the ones it did not

Read from each adopter's register, lock and history on 2026-09-26.

- **Atomik — its forked `tools/cairn-check.mjs`** (the `linkExempt`
  filter, entered by the adoption commit and recorded by CP-OPS-003 S05 as
  Atomik's ADR-023): **absorbed.** 1.2's checker skips the paths
  `cairn.config.json` declares under `linkExemptions`, each with its reason
  (ADR-037). Declare `docs/fixtures` and `atomik-project/log.md` there
  first — `update` does not write them — then `update --take
  tools/cairn-check.mjs`.
- **Atomik — CP-OPS-003 S07, the post-mortem that could not count the run
  it ran in**, worked around in the workflow: **absorbed.** The release's
  workflow sets `CAIRN_RUN_RED` and the post-mortem reads it (ADR-034
  decision 9). The workflow is Atomik's own, so the line is copied by hand
  and the workaround dropped.
- **Atomik — the roots `adopt` derived instead of reading**, which
  CP-OPS-003 waited on without a workaround: **absorbed.** The installer
  reads every root the configuration declares (ADR-033 decision 1).
- **ECOS — CP-BACKLOG-001, a hand-made `project/backlog/`**: **absorbed
  in substance.** The kit installs the folder and its index, and the open,
  unit and close skills read it (ADR-041). ECOS's index is its own and is
  kept; its items are named by slug where the kit's are dated, which no
  rule reads.
- **ECOS — a hand-made `feedbacks/`**, begun outside a path and carried
  on by CP-R0-001 S05: **absorbed.** The kit installs the
  folder and its index, and `links` reads it (ADR-038).
- **ECOS — CP-LOOK-002 S05, three step records lifted and a drawing moved
  out of `steps/`**, because `record-integrity` cannot read a record a
  merge added nor a blob over one megabyte: **not absorbed.** The checker
  reads both as before. ECOS's notes of 2026-09-22 describe the two
  defects: [a record a merge added](feedbacks/2026-09-22-ecos-a-record-added-by-a-merge-cannot-be-read.md)
  and [a record over a megabyte](feedbacks/2026-09-22-ecos-a-record-larger-than-a-megabyte-reads-as-rewritten.md).
- **Crumbz** carries no repair of the kit. Its three checker repairs,
  CP-CAIRN-SUPERSESSION-005, CP-CAIRN-PROVISIONAL-006 and
  CP-CAIRN-DETACHED-CHECKOUT-007, were absorbed by 1.1.0 and dropped when
  CP-CAIRN-UPDATE-027 took that release's checker.

Every other file the three adopters edited is the host's own by design.

### What the release changes for an adopter

In the names of the pointer page, `cairn/README.md`:

- **The skills** are seven: `cairn-update` is new — an update of the kit
  run as a path, the owner's decisions on edited and unwanted files taken
  before the go-ahead (ADR-035). Ponytail's `ponytail` and
  `ponytail-review` are fetched from the plugin's latest release at `init`
  and `update`, its version in the lock (ADR-036). Every skill is also
  written to `.claude/skills/`, where Claude Code loads skills.
- **`cairn-open`**: a trunk that takes no direct push registers through a
  request carrying the same commit, merged in a way that keeps it
  (ADR-032, ADR-044 decision 3); the definition of done is a plain list
  (ADR-042); the plan is read for placeholders and contradictions before
  the go-ahead (ADR-030); `project/backlog/` is read first (ADR-041); the
  first unit makes `steps/`.
- **`cairn-unit`**: a deferral names a file under `project/backlog/`; the
  review is written before the commit; every figure, id or outcome in a
  record is pasted from a command's output; `current_step` is set each
  unit; a note about Cairn travels to Cairn (ADR-038).
- **`cairn-close`**: the four coherence questions are a fresh context's
  read (ADR-043, ADR-044 decision 2); on `pull-request` the administrative
  commit lands before the owner reads (ADR-040).
- **`cairn-check`** reads `feedbacks/`, a registration inside the change
  under review, the declared `linkExemptions`, and reports a stale
  `current_step`; a concept note is cleared by any correct link from
  outside the wiki, whatever the concept root is named.
- **`cairn-active`** fills the register's state cells from the records
  (ADR-031, ADR-045). **`cairn-audit`** reads a plain-list definition of
  done and scaffolds the coherence facts. **`cairn-postmortem`** counts the
  run it runs in and prints a closed request as closed (ADR-034).
- **What the kit owns** grows by `feedbacks/index.md`,
  `project/backlog/index.md`, `skills/cairn-update/`, Ponytail's two
  skills and the `.claude/skills/` copies. `init` and `adopt` refuse a
  registration transport the trunk cannot take (ADR-032 decision 4).
- **Declined** is new: `update --decline <path>` stops writing a host file,
  and the lock remembers it (ADR-033 decision 2).
- **To reconcile by hand** now lists the files an update starts managing
  (ADR-034 decision 3).

### Each kit template this release changed

One line per file 1.1.0 installed and 1.2.0 installs differently, from
installing both into empty repositories on the `ci` profile
([ADR-015](docs/adr/ADR-015-a-release-reaches-an-edited-file.md) decision 2).
`update` prints the difference for an edited one; this line says what
changed. Not listed: the release commit every specification link pins,
which changes in every file that carries one, and the two generated files,
the pointer page and the lock, which nobody reconciles by hand.

- `.github/pull_request_template.md` — the coherence section opens on the
  line naming its reader; the roles line's blanks are code.
- `.github/workflows/cairn.yml` — the base is set once on the job and
  passed to the post-mortem; `CAIRN_RUN_RED` on the failure step; the
  actions at v5.
- `AGENTS.md` — `cairn-update` among the skills; the pointer page's line
  says the chapters are linked at the commit, not the skills.
- `docs/index.md` — a surface defined before its page; the README line
  *where the repository has one*.
- `skills/cairn-close/SKILL.md`, `reference.md` — the fresh reader of the
  coherence questions and its inputs; `A` before the reading; the release
  path's changelog and treated notes; a deferral's backlog file; a figure
  linked, never restated.
- `skills/cairn-code/SKILL.md` — Ponytail's two skills installed by the kit,
  not pinned at a tag for the adopter to install.
- `skills/cairn-open/SKILL.md`, `reference.md` — the backlog read first;
  the plan read for placeholders and contradictions; the plain list; the two registration sequences; `steps/` made by the
  first unit.
- `skills/cairn-unit/SKILL.md` — the backlog file for a deferral; the
  review before the commit; print, don't remember; `current_step`; where a
  note travels.
- `tools/cairn-active.mjs` — the register's state cells.
- `tools/cairn-audit.mjs` — the plain list; the coherence facts; a
  deferral pointed at its backlog file.
- `tools/cairn-check.mjs` — the changes above.
- `tools/cairn-config.mjs`, `tools/cairn-config.schema.json` —
  `linkExemptions`; the two GitHub helpers.
- `tools/cairn-postmortem.mjs` — the run it runs in; a closed request; the
  path that arrived on the trunk.
