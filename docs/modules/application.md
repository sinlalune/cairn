---
type: Cairn Module Note
title: The reference tools
description: What lives under tools/ — the checker, the live-view generator, the audit scaffold, the rule-catalogue generator, the initializer and the configuration loader — how they find the specification, and how they are tested.
tags: [module, cairn, tools]
timestamp: 2026-09-02T00:00:00Z
---

# The reference tools

`tools/` is this repository's one source root and its one implemented area:
dependency-free Node scripts that evaluate the protocol the
[specification](../../spec/index.md) states.

| Tool | Does |
| :-- | :-- |
| `cairn-config.mjs` | validates `cairn.config.json` against `cairn-config.schema.json` before any rule runs |
| `cairn-check.mjs` | the checker: every blocking and advisory rule, reported by exit code |
| `cairn-active.mjs` | regenerates the live view of running paths, or checks that it is current |
| `cairn-audit.mjs` | scaffolds and checks the closing review of one exact candidate |
| `cairn-rules.mjs` | regenerates the rule catalogue and the rule-to-requirement linkage on the [conformance page](../../spec/reference/conformance.md) |
| `cairn-init.mjs` | installs the kit into a new repository |

## How the tools find the specification

The specification lives at `spec/` in the root of this repository, beside its
concept wiki at `spec/concepts/`, which the configuration binds as
`roots.concepts`. The checker's Markdown corpus — the files whose links are
checked and whose links keep a concept from being an orphan — is the
documentation plane, the project plane, and the parent of the concept root, so
the specification is read wherever a host binds its wiki. The rule generator
writes into the conformance page, not into the specification index, so the
index stays under its word budget.

## Testing

The tools' fixture suite — one adversarial fixture per blocking rule, each
installing a real repository, proving it green, introducing one violation and
requiring that rule among the findings — is not in this repository yet. The kit
this repository was seeded from ships the tools without their tests; the suite
is brought over from Atomik in the unit that cuts the rules. The discipline the
suite implements is written in [soundness](../../tools/soundness.md).
