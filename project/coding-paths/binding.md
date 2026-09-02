---
type: Cairn Binding
title: Host binding
description: How portable Cairn roles map onto this repository.
tags: [cairn, binding]
timestamp: 2026-09-02T00:00:00Z
---

# Host binding

This page is classified **BINDING**. It names this repository and MAY carry local
paths, command names and runtime details. Portable protocol text never does.

| Portable role | This repository |
| :-- | :-- |
| documentation plane | `docs/` |
| execution-state plane | `project/` |
| path records and live view | `project/coding-paths/` |
| accepted architecture | `docs/architecture/` |
| decisions | `docs/adr/` |
| implemented-area notes | `docs/modules/` |
| concept wiki | `docs/cairn/specification/concepts/` |
| source roots | `tools/` |
| trunk | `main` |
| remote | `origin` |
| metadata namespace | `cairn` |
| enforcement profile | `ci` |
| path-history policy | **forbidden** — a published branch is never rewritten |
| path branch | `path/<lowercase-path-id>` |

The machine-readable authority is `cairn.config.json`, validated by
`tools/cairn-config.mjs` before any repository rule runs. If this table and that
file disagree, that is a binding defect — and neither is permission to write a
name from this repository into portable protocol text.

## Where the concept wiki starts

New vocabulary goes in `docs/cairn/specification/concepts/`, one
article per term, following
[the one-concept template](../../docs/cairn/specification/concepts/concept-template.md).
The index there separates borrowed vocabulary from Cairn-defined concepts; keep
that separation, because only the second kind is yours to change.

## Reaching a current base

```bash
git fetch origin main
git merge origin/main
```

Do not rebase. Nothing published on a path branch is rewritten here, which is why
this repository has no checkpoint-retention namespace to fetch or maintain.
