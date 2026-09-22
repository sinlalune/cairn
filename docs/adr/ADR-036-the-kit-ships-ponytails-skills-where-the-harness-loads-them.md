---
type: Cairn Decision Record
title: ADR-036 — the kit ships Ponytail's skills where the harness loads them
description: At `init` and `update` the kit extracts the two Ponytail skills the stance is built on from the plugin's latest version and installs them, with its own skills, where the adopter's harness loads skills — Claude Code's `.claude/skills/` first — while `skills/` stays the folder the bootloader points at; the lock names the version installed, and the pinned tag goes. Supersedes the first half of ADR-016 decision 1. Promotes K18 of Cairn 1.2, from Q8.
tags: [cairn, adr, 1.2, kit, ponytail, skills, harness]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-036
  status: accepted
  date: 2026-09-21
---

# ADR-036 — the kit ships Ponytail's skills where the harness loads them

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S02

This record **supersedes** the first half of decision 1 of
[ADR-016](./ADR-016-the-coding-stance-absorbs-ponytail.md) — *the kit
names Ponytail at that tag as a pinned dependency and copies none of its
files*. The second half stands: `cairn-code` keeps only Cairn's own, and
the ladder, the review and the five tags come from Ponytail.

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q8, second option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 3, K18). The line
comes from [the brainstorm note of 2026-09-16](../../project/brainstorm/2026-09-16-what-the-harness-loads.md),
where the owner asked *why not just adding ponytails skills extracting
them from latest version at init or update*. Both stay exactly as they
were.

## Context

ADR-016 decision 1 pins the coding stance to Ponytail at `v4.9.0`,
installed in the adopter's harness as that repository says; nothing
installs it. Crumbz ran twenty-six paths
without it, and this repository's release path applied the ladder from
`cairn-code`'s summary. On 2026-09-16 the owner installed the plugin by
hand; the marketplace's latest was `v4.10.0`, and the plugin install
takes the latest.

The six Cairn skills land in `skills/` at the repository root. Claude
Code loads project skills from `.claude/skills/` and plugins from its
marketplaces, and does not look in `skills/`; none of the six appeared
in the harness's skill list during the whole release path. They worked
as documents an agent is told to read, because the bootloader points at
the folder.

The plugin at 4.10.0 is six skills, lifecycle hooks, an MCP server and
a manifest per harness; the two skills the stance is built on,
`ponytail` and `ponytail-review`, are 1,418 words together, MIT.

## Decisions

### Decision 1 — the kit extracts Ponytail's two skills from the latest version

Promotes **K18**, from Q8, second option.

At `init` and `update` the kit fetches the two skills the stance is
built on, `ponytail` and `ponytail-review`, from the plugin's latest
release and installs them as kit files, owned by the lock like the six.
The lock names the version they came from, and `status` prints it. The
pinned tag goes: `DEPENDENCIES` and the pointer page's *what this needs
beside it* leave, and the stance a repository carries is the one its
last `init` or `update` fetched. The plugin's other four skills, its
hooks and its server are the plugin's; an adopter who wants the
activation installs the plugin as its README says, and the kit does not
say so twice.

Offline, or where the fetch fails, the installer says in one line that
Ponytail was not read and keeps what the repository has — nothing at a
first `init`, the last copy at an `update` — and the lock says which.

### Decision 2 — the kit installs its skills where the harness loads them

The derived reading of K18: what the kit installs must land where the
harness looks.

`skills/` stays the folder the bootloader points at and the corpus rules
read. Beside it the kit writes each skill — its own and Ponytail's two —
where the adopter's harness loads skills, one location per harness the
kit knows, owned by the lock. On 2026-09-16 that is Claude Code's
`.claude/skills/<name>/SKILL.md`; Codex reads `AGENTS.md` and needs no
second location. Whether the harness location is a link or a copy, and
how each other harness Cairn's adopters use is read, at a pinned version
of each, is the coding path's. The README's row on the skills then says
what the harness lists.

What this changes, by today's names: `tools/cairn.mjs` — `DEPENDENCIES`,
`SKILLS`, `planInstall`, `pointerPage`, and the bootloader's skills
line; `cairn.lock.json`, the version and the harness files;
`tools/cairn.test.mjs`; `README.md`, the skills row; the kit row of
`spec/reference/conformance.md`, whose count moves and is measured.

## Alternatives rejected

- **One printed line per gap — Ponytail's install line at `init` and
  `update`, and the line per harness that makes the six load** (Q8,
  first option, *native, keeps ADR-016*): the brainstorm note's
  recommendation; refused by the owner, who asked for the skills on
  disk.
- **Nothing — installing a plugin is the adopter's** (Q8, third option,
  *simplest*): refused by the owner; three repositories ran without the
  stance.
- **Vendoring the two files at the pinned tag, at release time**: no
  network call and the pin kept, and a copy of upstream text stale until
  a Cairn release moves the pin — the drift ADR-016 refused.
- **Fetching at the pinned tag**: the pin kept and the network call
  made; the owner asked for the latest.
- **The checker reporting Ponytail absent**: the checker reading a
  harness, which ADR-029 stopped it doing.
- **Installing into `.claude/skills/` only**: ties the kit's one folder
  to one harness's layout, and the corpus rules would follow it there.

## Consequences

- The kit downloads a release at `init` and `update`, and says so when
  it cannot; it is a download, and the one host reading stays
  ADR-032's. An adopter is never left with a half-installed stance
  unreported.
- A release no longer says which Ponytail tag it was checked against;
  the lock says which version a repository carries. If a Ponytail
  release changes the ladder or the five tags the self-review speaks in
  (ADR-016 decision 2), the tags in the step records follow the copy
  installed, and the release notes of Cairn say so when a release meets
  it.
- The kit owns a copy of someone else's text, MIT, and a second location
  for every skill; `status` reads both like any kit file.
- ADR-016 decision 1 carries a superseded-clause mark, and the 1.1 page's
  two sentences on the pinned tag are marked *superseded by* this record.

## What the manifesto's test weighed

Q8's option is tagged *reverses ADR-016 decision 1*. The manifesto's
*absorb the ecosystem* was ADR-016's reason for the pin; the owner
weighed a stance nobody installed against a copy the kit maintains, and
chose the copy. Nothing enters the checker; the network call is the one
the plugin install would have made.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the kit's manifest, the pointer page, the lock | `DEPENDENCIES`, `planInstall`, `pointerPage` in `tools/cairn.mjs`; `cairn.lock.json`; `tools/cairn.test.mjs` |
| 2 | the kit's manifest and generated bootloader, the lock, the README, the conformance page | `SKILLS`, `planInstall`, `bootloader` in `tools/cairn.mjs`; `cairn.lock.json`; `tools/cairn.test.mjs`; `README.md`; `spec/reference/conformance.md`, the kit row |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
