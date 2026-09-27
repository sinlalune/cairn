---
type: Cairn Pointer
title: Cairn here
description: Release 1.2.0 of the Cairn protocol, installed in this repository: what to read, and what the kit owns.
tags: [cairn, pointer, generated]
timestamp: 2026-09-27T00:00:00Z
---

# Cairn here

Cairn is the most lightweight and minimalistic harness-agnostic,
document-driven coding protocol.

This repository carries **release 1.2.0**, cut from commit
`01cef13cbeaf304aaf15ff0b811de3596d19ccf0`. Every link below resolves to the specification at that commit,
so what you read is what you installed. What each release changes for an
adopter, and which adopter repairs it absorbed, is in
[the release notes](https://github.com/sinlalune/cairn/blob/01cef13cbeaf304aaf15ff0b811de3596d19ccf0/CHANGELOG.md).

This page is GENERATED, at `init` and at every `update`. Nothing on it is
written by hand.

## The specification, in six chapters

- [1. Idea and ideation](https://github.com/sinlalune/cairn/blob/01cef13cbeaf304aaf15ff0b811de3596d19ccf0/spec/index.md#1-idea-and-ideation) — where an idea is captured and turned into something a session can read
- [2. Research](https://github.com/sinlalune/cairn/blob/01cef13cbeaf304aaf15ff0b811de3596d19ccf0/spec/index.md#2-research) — what is read before a decision, and where the notes land
- [3. Vision and specifications](https://github.com/sinlalune/cairn/blob/01cef13cbeaf304aaf15ff0b811de3596d19ccf0/spec/index.md#3-vision-and-specifications) — what the product is, and the pages a promotion writes
- [4. Roadmap](https://github.com/sinlalune/cairn/blob/01cef13cbeaf304aaf15ff0b811de3596d19ccf0/spec/index.md#4-roadmap) — the register of milestones, each with a coding path or none yet
- [5. Coding cycle](https://github.com/sinlalune/cairn/blob/01cef13cbeaf304aaf15ff0b811de3596d19ccf0/spec/index.md#5-coding-cycle) — how a path opens, runs unit by unit, and closes
- [6. Learning loop](https://github.com/sinlalune/cairn/blob/01cef13cbeaf304aaf15ff0b811de3596d19ccf0/spec/index.md#6-learning-loop) — the concept wiki, learning notes, and what a cycle leaves behind

## The skills

- [`cairn-brainstorm`](../skills/cairn-brainstorm/SKILL.md) — an idea arrives and is worked into a note
- [`cairn-open`](../skills/cairn-open/SKILL.md) — a path is scoped, accepted and registered
- [`cairn-unit`](../skills/cairn-unit/SKILL.md) — one work unit: plan, change, self-review, review, verify, push
- [`cairn-close`](../skills/cairn-close/SKILL.md) — a candidate is proposed, reviewed and integrated
- [`cairn-update`](../skills/cairn-update/SKILL.md) — the kit is brought to a newer release, as a path
- [`cairn-learn`](../skills/cairn-learn/SKILL.md) — a learning session, ending in a note with an order
- [`cairn-code`](../skills/cairn-code/SKILL.md) — the stance the change movement is written with
- [`ponytail`](../skills/ponytail/SKILL.md) — the coding stance, Ponytail's, at v4.10.0
- [`ponytail-review`](../skills/ponytail-review/SKILL.md) — the review for over-engineering, Ponytail's, at v4.10.0

## What the kit owns

`update` rewrites any of these that still holds exactly what the kit wrote,
and never rewrites one you have edited. `npx cairn-protocol status` says
which is which, and `update --take <path>` takes the release's version of one
you name.

- `.claude/skills/cairn-brainstorm/SKILL.md`
- `.claude/skills/cairn-close/SKILL.md`
- `.claude/skills/cairn-close/reference.md`
- `.claude/skills/cairn-code/SKILL.md`
- `.claude/skills/cairn-learn/SKILL.md`
- `.claude/skills/cairn-open/SKILL.md`
- `.claude/skills/cairn-open/reference.md`
- `.claude/skills/cairn-unit/SKILL.md`
- `.claude/skills/cairn-unit/reference.md`
- `.claude/skills/cairn-update/SKILL.md`
- `.claude/skills/ponytail-review/SKILL.md`
- `.claude/skills/ponytail/SKILL.md`
- `.github/pull_request_template.md`
- `.github/workflows/cairn.yml`
- `AGENTS.md`
- `cairn.config.json`
- `cairn.lock.json`
- `cairn/README.md`
- `docs/architecture/index.md`
- `docs/index.md`
- `docs/inputs/index.md`
- `docs/modules/application.md`
- `docs/modules/index.md`
- `feedbacks/index.md`
- `package.json`
- `project/backlog/index.md`
- `project/coding-paths/ACTIVE.md`
- `project/coding-paths/binding.md`
- `project/coding-paths/index.md`
- `project/index.md`
- `skills/cairn-brainstorm/SKILL.md`
- `skills/cairn-close/SKILL.md`
- `skills/cairn-close/reference.md`
- `skills/cairn-code/SKILL.md`
- `skills/cairn-learn/SKILL.md`
- `skills/cairn-open/SKILL.md`
- `skills/cairn-open/reference.md`
- `skills/cairn-unit/SKILL.md`
- `skills/cairn-unit/reference.md`
- `skills/cairn-update/SKILL.md`
- `skills/ponytail-review/SKILL.md`
- `skills/ponytail/SKILL.md`
- `tools/cairn-active.mjs`
- `tools/cairn-audit.mjs`
- `tools/cairn-check.mjs`
- `tools/cairn-config.mjs`
- `tools/cairn-config.schema.json`
- `tools/cairn-postmortem.mjs`

## Declined

Files this repository declined with `update --decline <path>`. The kit does not
write them, now or at a later update; `update --take <path>` takes one back.

- `spec/concepts/cairn/index.md`
- `spec/concepts/learning/index.md`
- `spec/concepts/product/index.md`

## To reconcile by hand

Files you edited whose template this release changed. `update` left them
alone and printed the difference; this list stands until an update finds it
empty.

- `.github/pull_request_template.md`
- `.github/workflows/cairn.yml`
- `AGENTS.md`
- `docs/architecture/index.md`
- `docs/index.md`
- `docs/modules/application.md`
- `docs/modules/index.md`
- `feedbacks/index.md`
- `package.json`
- `project/coding-paths/binding.md`
- `project/coding-paths/index.md`
- `project/index.md`
- `skills/cairn-brainstorm/SKILL.md`
- `skills/cairn-close/reference.md`
- `skills/cairn-learn/SKILL.md`
- `skills/cairn-open/SKILL.md`
- `skills/cairn-open/reference.md`
- `skills/cairn-unit/SKILL.md`
