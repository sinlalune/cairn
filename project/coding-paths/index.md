---
type: Cairn Folder Index
title: Coding paths
description: One folder per bounded change, the generated live view, and the roadmap register.
tags: [index, cairn]
timestamp: 2026-09-07T00:00:00Z
---

# Coding paths

One folder per bounded change, the generated live view, and the roadmap register.

## Roadmap

Every milestone is accounted for: it has a path, or it says it does not yet.

| Milestone | Outcome | Paths | State |
| :-- | :-- | :-- | :-- |
| Cairn 1.0 — the protocol cut to its manifesto | the specification on the six stages, twenty-four rules, five skills, the kit and the `cairn` command, released 1.0.0 from this repository | [CP-CAIRN-001](./CP-CAIRN-001/index.md) | done 2026-09-03 |
| Cairn 1.1 — what the first adopter taught | the twenty decision records of [the 1.1 architecture page](../../docs/architecture/01-cairn-1-1.md) — fifteen from the adopter's audits, five from the coding guidelines — implemented in the checker, the skills, the kit and the specification, and released 1.1.0 | [CP-CAIRN-002](./CP-CAIRN-002/index.md), [CP-CAIRN-003](./CP-CAIRN-003/index.md) and [CP-CAIRN-004](./CP-CAIRN-004/index.md) (the promotions), then the five coding paths below | running |

### The coding paths of 1.1

One path per surface, in the order their `writes:` allow without overlap;
a path that must wait for an earlier one declares `depends_on` (ADR-003).
Each is scoped from the records it names and nothing else.

| Order | Outcome | Records | Writes | Path |
| :-- | :-- | :-- | :-- | :-- |
| 1 | the transports and the skills: `manual-git` registration for a sole owner, the owner's plan review and the owner's try before the merge, the sentences the open, unit and close skills gain, the request template; and the coding guidelines' skills: `cairn-code` shortened to Cairn's own with its two lines, the self-review in five tags, the review movement in the unit skill, chapter 5, the concept and the step template, the reader's two criteria in the close skill, the failing test first, the definition of done item by item in the close skill and this repository's request template, an area as a folder and the whole-root reason in the open skill and the configuration reference, the helper agent as the writer | ADR-001 d1–d5, ADR-002 d2, ADR-006, ADR-007, ADR-008 d1, d3, d7, ADR-009, ADR-010 d2, ADR-014 d2 (the skill's sentence); ADR-016 d2, d3, d4, ADR-017 d1 and d2 (the skill, the chapter, the concept, the template), ADR-018 d1 and d2 (the skills and the template), ADR-019 d1 and d3, ADR-020 d2 | `skills/**`, `spec/index.md` §5, `spec/concepts/work-unit.md`, `spec/reference/path-template.md`, `spec/reference/configuration.md`, `.github/pull_request_template.md`, `cairn.config.json`, `project/coding-paths/binding.md` | *no path yet* |
| 2 | the checker reads what it did not: the profile line, the transition table, the seal at every transition, `writes-overlap`, the six corrections, one commit for one path, the journal message, refusals that name the remedy; the stale citations of an earlier repository's records replaced under `tools/`; and the coding guidelines' one rule: `review`, blocking, reading the current unit's step for a non-empty review section, with its fixture holding a trunk merge, its catalogue entry and its soundness line | ADR-001 d6, d7, ADR-002 d1, ADR-003, ADR-004, ADR-008 d2, d4, d6; ADR-017 d2 (the rule, the fixture, the catalogue) | `tools/cairn-check.mjs`, `tools/cairn-fixture.test.mjs`, `tools/cairn-check.test.mjs`, `tools/cairn-rules.mjs`, `tools/soundness.md`, `spec/reference/conformance.md`, `docs/modules/application.md` | *no path yet* |
| 3 | the workflow and the tools: one run per commit that can land, `cairn-postmortem` on a red run, this repository's `cairn-test`, the roadmap register reported by `cairn-active`; and `cairn-audit` opening the request's description with one line per item of the definition of done | ADR-005, ADR-008 d5, ADR-014; ADR-018 d2 (the audit tool) | `.github/workflows/cairn.yml`, `tools/cairn-active.mjs`, `tools/cairn-audit.mjs` and its test, `tools/cairn-postmortem.mjs` and tests, `package.json`, `docs/modules/application.md` | *no path yet* |
| 4 | the kit and the documentation plane: `docs/inputs`, the concept wiki in three folders, the page per surface, the local pointer, the proactive-note line in the bootloader, the module note template; chapters 3 and 6 and the layout reference; the stale citations replaced under `spec/`; two kit files removed so the kit of 1.1 ships under thirty with the post-mortem tool; `update` rewriting pristine files, printing what a release changes in edited ones, taking the release's version of a named file; and the coding guidelines' kit: Ponytail named at a pinned tag as a dependency the kit does not copy, the bootloader's skills line, the generator of an adopter's request template, the dependency sentence on the architecture concept and the architecture index the kit writes | ADR-010 d1, ADR-011, ADR-012, ADR-013, ADR-015; ADR-016 d1, ADR-018 d2 (the generated template), ADR-019 d2 | `tools/cairn.mjs` and tests, `cairn.lock.json`, `spec/index.md` §3 and §6, `spec/reference/repository-layout.md`, `spec/concepts/**`, `docs/architecture/index.md`, `AGENTS.md` | *no path yet* |
| 5 | the release: the README and the site updated for the surfaces 1.1 changes, the weight budget measured, 1.1.0 cut and the first adopter updated with `cairn update` | ADR-012 (this repository's pages), the conformance page's budget | `README.md`, `site/**`, `spec/reference/conformance.md` (the budget), `package.json`, `cairn.lock.json` | *no path yet* |
