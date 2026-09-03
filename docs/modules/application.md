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
| `cairn-audit.mjs` | scaffolds the closing review of one exact candidate: the request's description on `pull-request`, the closing record in the path folder on `manual-git` |
| `cairn-rules.mjs` | regenerates the rule catalogue and the rule-to-requirement linkage on the [conformance page](../../spec/reference/conformance.md); this repository's, not installed |
| `cairn.mjs` | the `cairn` command: `init` installs the thin kit, `status` reads the lock, `update` rewrites pristine kit files and migrates the configuration, `adopt` turns a lock-less installation into one; the package's, not installed |
| `cairn-pilot.mjs` | the greenfield pilot as a command: drives a throwaway repository from `init` to `done` on one transport, green at every gate, and counts the protocol files each stage writes; this repository's, not installed |
| `*.test.mjs` | the tools' own suite, run by `npm test`: the pure half of every rule against `evaluate()`, and one adversarial fixture per blocking rule against a real installed repository |

## How the tools find the specification

The specification lives at `spec/` in the root of this repository, beside its
concept wiki at `spec/concepts/`, which the configuration binds as
`roots.concepts`. The checker's Markdown corpus — the files whose links are
checked and whose links keep a concept from being an orphan — is the
documentation plane, the project plane, and the parent of the concept root, so
the specification is read wherever a host binds its wiki. The rule generator
writes into the conformance page, not into the specification index, so the
index stays under its word budget.

## The rules

The checker implements twenty-four rules — nineteen blocking, five advisory —
inventoried on the [conformance page](../../spec/reference/conformance.md),
which also records where every 0.2 name went. One invocation form remains:
`cairn-check [--base <ref>] [--branch <name>] [--json]`, and on a path branch
the base defaults to the trunk. The configuration is schema 2. The checker reads
a path's opening acceptance from the record's own `## Opening acceptance`
block, validates `depends_on:`, and knows two routes; the live-view generator
marks each live path unblocked or names what it waits on. Closure follows the
configured transport: on `pull-request` the checker proves the candidate, its
closure surface, the opening digest and the trunk drift from Git and reads no
review; on `manual-git` it also reads the closing record.

## The kit

`npx cairn-protocol init` installs 26 files and the lock on the `ci` profile: the five reference
tools, the eight skill files, the configuration, the bootloader, the binding,
the workflow and the request template, and the folder indexes the roles need.
It copies no specification: every link it writes into the specification is
pinned to the commit the kit was cut from. `cairn.lock.json` records the
digest of every kit file as the kit wrote it, which is what lets `status`
tell an edit from an installation and `update` rewrite the first and keep the
second. `adopt` is the migration from a 0.2 installation: it keeps the host's
answers, replaces the tools, adds the skills, and reports the shapes the kit
no longer defines rather than deleting anything of the adopter's.

## Testing

`npm test` runs Node's own runner over `tools/*.test.mjs`. Two kinds of test, and the difference is
the whole discipline written in [soundness](../../tools/soundness.md): the unit
suite proves each rule's predicate against `evaluate()` with hand-built
arguments, and the fixture suite proves each rule is WIRED, by installing a real
repository with `cairn-init`, proving it green, introducing exactly one
violation and requiring the rule among the blocking findings. Every blocking
rule has such a fixture, and the coverage is declared in the suite so that a
new blocking rule forces the choice. Three parity tests assert that the local
default and the CI invocation reach one verdict on one tree. CI runs the suite
before the gate, in the one job that is the required check.
