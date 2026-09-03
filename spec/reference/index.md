---
type: Cairn Reference Index
title: Cairn implementation reference
description: Exact layouts, schemas, templates, commands, and conformance claims for reconstructing or operating Cairn.
tags: [cairn, reference, index, implementation]
timestamp: 2026-08-26T00:00:00Z
---

# Implementation reference

The [canonical specification](../index.md) teaches and defines the protocol.
The [concept wiki](../concepts/index.md) explains one object per article. This
reference supplies exact forms:

- [Repository layout](./repository-layout.md) — directories, file roles, and
  naming conventions.
- [The path convention](./paths.md) — the portable operating convention for
  one path: registration, one writer per worktree, checkpoints, closure.
- [Execution protocol](./execution-protocol.md) — the ordered portable route for
  entering, advancing, handing off, resuming, and closing one path.
- [Coding-path template](./path-template.md) — a complete path record: the
  one folder, its opening acceptance, its resume section and one step.
- [Human records](./human-records.md) — the opening acceptance block, and the
  audit and closing schemas.
- [Repair procedures](./repair.md) — what to do when a path has already
  violated the protocol.
- [Configuration](./configuration.md) — the versioned portability contract and
  its current implementation status.
- [Conformance](./conformance.md) — the matrix of what the reference tools
  check, the generated rule catalogue and linkage, and the weight budget.

The command sequences — registration, the work unit, the provisional commit,
the candidate, the review, the administrative commit, drift, integration and
cleanup — are the reference files of the `cairn-open`, `cairn-unit` and
`cairn-close` skills under `skills/`, beside the procedures that use them.

Reference pages do not add requirements. If a reference and the specification
disagree, the specification is authoritative and the disagreement is a defect.
