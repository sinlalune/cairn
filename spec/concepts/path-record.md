---
type: Cairn Concept
title: Path record
description: The canonical Markdown file describing one coding path, its declared surfaces, and its current execution state.
tags: [cairn, concept, path, record]
timestamp: 2026-08-26T00:00:00Z
---

# Path record

A path record is the folder `project/coding-paths/CP-<ID>/`, the portable
role path and durable source of truth for one [coding path](./coding-path.md):
`index.md` for the declaration, the opening acceptance, the step index and the
[resume section](./handoff.md); an optional `plan.md`; and one file per
executed step under `steps/`.

## In Cairn

The frontmatter of `index.md` carries identity, [route](./route.md), lifecycle
state, base commit, branch, current step, writer assignment, the paths this one
`depends_on`, subject commit when ready, and two declared surfaces:

- **`writes:`** — the [declared write surface](./declared-write-surface.md), the
  paths this work expects to change;
- **`governs:`** — the declared read surface: the documents this work is bound
  by, each pinned as `path@<object-id>` so that "which knowledge applied" is a
  fact rather than a recollection.

The two together define the path's footprint in the repository, and their union
is what the [acceptance-drift](./acceptance-drift.md) predicate tests a moving
trunk against.

The body carries the outcome, the definition of done, the
[opening acceptance](./opening-acceptance.md) that accepted it, the documents
to read, the step index, and the resume section. The section a `scope_ref`
names is the accepted definition of done, and its
[scope digest](./scope-digest.md) binds that text for the life of the
acceptance.

The record advances with every work unit: a new step file, a refreshed resume
section. After acceptance, the only fields
[administrative closure](./administrative-closure.md) may touch are `status`
and `subject_commit` — because the definition of done lives in this same file,
and closure must not be able to rewrite what acceptance was measured against.

When execution ends the record is retained and eventually archived rather than
deleted.

## It does not prove

A path record can describe work that is not yet implemented. Commit ancestry,
checks, audit, and acceptance provide separate evidence.

Related: [coding path](./coding-path.md),
[Markdown and frontmatter](./frontmatter.md), [work ledger](./work-ledger.md),
[scope digest](./scope-digest.md), [handoff](./handoff.md).
