---
type: Cairn Feedback
title: Pi multi-agent orchestration on Crumbz CP-UI-FINETUNING-061 — six frictions measured from session traces
timestamp: 2026-11-05T18:45:00Z
tags: [feedback, cairn, crumbz, pi, subagents, trace-analysis]
---

# Pi multi-agent orchestration on Crumbz CP-UI-FINETUNING-061 — six frictions measured from session traces

Written from the Pi session traces of Crumbz's CP-UI-FINETUNING-061 (Cairn 1.2.0, `d6183c0`), 2026-11-01 → 2026-11-05, at the owner's request.

## Context

Adopter repository Crumbz on Cairn 1.2.0 (`d6183c0`), driven through the
`@earendil-works/pi-coding-agent` v1.5.0 harness extended in `~/.pi/agent/`
with five subagents (`cairn-scout`, `cairn-open`, `cairn-unit`,
`cairn-reviewer`, `cairn-close`). The lab additions, all local to the
harness, not to the protocol: subagents spawned in `--mode rpc` so a
subagent's UI question bridges to the root TUI (`extension_ui_request` /
`extension_ui_response`); an `<owner_verbatim_context>` envelope injected
from the parent session's branch into every non-reviewer delegation; every
subagent trace persisted as `.jsonl` under `~/.pi/agent/sessions/subagents/`;
a `fallbackModel` mechanism; a nesting guard (`cairn-unit`/`cairn-close` may
only delegate to `cairn-reviewer`); and a `ui-snapshot` skill (headless
Chromium captures + computed CSS metrics) used by the orchestrator between
units.

Full synthesis with all trace ids lives in the adopter repository at
`crumbz/inputs/2026-11-01-cairn-subagents-and-trace-analysis.md`. The traces
audited for this note (all under `/home/toure/.pi/agent/sessions/`, readable
from any session launched on this machine):

| Trace | Path (under `sessions/`) | Content |
| :-- | :-- | :-- |
| Session 4 `01a1a786` | `--home-toure-projects-crumbz-cp-ui-finetuning-061--/2026-11-04T17-06-21-704Z_01a1a786-a587-7588-9677-6c88d6eb116f.jsonl` | `S14`–`S24` with the 4-stage pipeline |
| Session 5 `01a1ab48` | `.../2026-11-05T10-37-15-406Z_01a1ab48-c50e-77d4-aa3d-e578ea6fe5d9.jsonl` | `S25`–`S30` + close sequence: 65 entries, 30 turns, 16 subagent calls, **6 of them `cairn-close`** |
| close on flash `01a1acab` | `subagents/2026-11-05T17-04-17-821Z_01a1acab-1d9b-76f9-a91a-e98e7f285954.jsonl` | the successful close run: 198 entries, **96 turns** |
| close on terra `01a1ac8a` / `01a1ac92` | `subagents/2026-11-05T16-28-20-155Z_01a1ac8a-….jsonl`, `…T16-37-01-894Z_01a1ac92-….jsonl` | failed close: `npm run build` in the dirty checkout clobbered the owner's `next-env.d.ts` |
| reviewer calls `01a1acad`, `01a1acb1` | `subagents/2026-11-05T17-07-21-518Z_01a1acad-….jsonl`, `…T17-11-46-703Z_01a1acb1-….jsonl` | Mode 1 diff review of `S30`, Mode 2 coherence review of candidate `C` |

## Measured wins of the 4-stage pipeline (Session 4, `S14`–`S24`)

scout → orchestrator + `ui-snapshot` → `cairn-unit` → `cairn-reviewer`:
**22–35 turns per unit** instead of 78–99, **6–9 min** instead of 21–27,
**$0.27–$0.43** instead of $1.67–$2.28 per unit; zero `supersedes:` blocks,
one `cairn-check` pass per step, zero remote fetches, systematic
before/after PNG verification.

## Frictions, measured cost, and the change each one asks of the protocol

### 1. Iteration feedback treated as a `supersedes:` amendment
On `CP-UI-FINETUNING-061`, each visual iteration from the owner ("the button
is too big", "keep MatchLab's style") was handled as a Definition-of-Done
change: **8 `supersedes:` blocks** in `index.md` and **8 rewrites** of
`ADR-008`, `ADR-009`, `docs/architecture/value-board.md`,
`docs/modules/surface.md` across 13 steps.
**Ask**: distinguish scope change (amend the DoD → `supersedes:` with
`--scope-digest`) from iteration feedback toward the same DoD; the latter is
recorded in the corrective step's `## Plan` only — no `## Opening acceptance`
edit, no ADR rewrite.

### 2. Remote spec links in the bootloader
`AGENTS.md` and `cairn-unit` Movement 0 make every fresh session `curl`
`raw.githubusercontent.com/sinlalune/cairn/...` for `paths.md` and
`execution-protocol.md`: 2–4 turns and ~15 s of network latency per unit
(`S11` T4, `S12` T4/T10, `S13` T6).
**Ask**: ship both reference pages locally in the kit
(`cairn-protocol init/update`), or state in `skills/cairn-unit/SKILL.md` that
the local `reference.md` already carries the operational procedure, so no
remote fetch is ever required mid-path.

### 3. Double/triple `npm run cairn-check` at Movement 5 (Verify)
The unit pastes the gate verdict into `steps/S<NN>.md` and `index.md`, which
changes the path files, which forces re-running the gate — observed 3× per
step (`S11` T82/92/94, `S12` T68/73/75, `S13` T16/21/23).
**Ask**: specify the order in `cairn-unit` §5 — fill the step record and
refresh `## Resume` **first**, then run `npm run cairn-check` **once** on the
exact final state that will be committed.

### 4. Skills discovery: `.claude/skills/` vs `.agents/skills/`
The kit installs skills into `skills/` and `.claude/skills/`; harnesses
implementing the open Agent Skills standard (Pi included) scan
`.agents/skills/` natively and ignore `.claude/skills/`.
**Ask**: `cairn-protocol init/update` also writes (or mirrors) into
`.agents/skills/` for zero-config discovery on every compliant harness.

### 5. Candidate-`C` invalidation cascade from doc drift (`S27`→`S30`)
Because intermediate units (`S10`, `S12`, `S18`) documented transient visual
states in `ADR-008`, `ADR-009`, `ADR-017` and `docs/modules/surface.md`, the
close-time coherence review found obsolete sentences one at a time ("48px
stacked picklists", "🌐 All leagues", "5.5 s / 58%"), forcing **4 doc-only
units (`S27`, `S28`, `S29`, `S30`) and 6 `cairn-close` invocations** in the
parent session (`01a1ab48` P-T11/T14/T18/T20/T22/T26) — over 45 minutes of
prose cleanup. Each prose fix voided the candidate, because `cairn-close` §1
says any change after `C`, even one sentence in an ADR, voids `C`.
**Ask**: (a) freeze ADRs and module notes during exploratory/iterative
steps — only `steps/S<NN>.md` carries trial history; consolidate
`docs/modules/*.md` and `docs/adr/*.md` once, when the implementation is
stable and before producing `C`; (b) let doc-only amendments ride inside the
single administrative commit (or one pre-`C` reconciliation pass), so a
sentence in an ADR never reopens a full unit and voids the candidate.

### 6. No batching / turn-budget guidance in the mechanical close sequence
The successful `cairn-close` run on `gemini-3.8-flash` (trace `01a1acab`,
candidate `4ca9044`, admin commit `21dc0e9`, PR #160) took **96 assistant
turns**: 26 for orientation (13 sliced `read`s — the path `index.md` was
read 7 times — plus 8 one-fact `bash` calls), the owner-file hash guard
computed 5×, 6 turns spent reading the checker source
(`tools/cairn-check.mjs`) instead of trusting the gate verdict, the full
test/typecheck/build suite run twice (pre-push and post-push in the isolated
worktree), and a trailing `gh pr view` immediately after `gh pr edit`.
**Ask**: the close skill (or a `tools/` close script the agent only
orchestrates) should prescribe the batching invariants — read whole files
once; one shell battery per phase; guard cadence start / before-the-admin-
commit / end; one isolated worktree with one combined verify call; never read
checker source, read the gate verdict; fast gate only after pushing the
administrative commit; and a hard turn budget with stop-and-report.

## Model behavior on close (empirical, for the record)

- `openai/gpt-6.1-terra` on `cairn-close` violated explicit negative
  constraints: it ran `npm run build` in the dirty primary checkout and
  clobbered the owner's `next-env.d.ts` (restored from git blob `a419cbe4…`),
  and blocked on stale provisional commits from `S04`. Two tokens-cheaper,
  four-times-longer.
- `antigravity/gemini-3.8-flash` on `cairn-close` honored the owner-file
  hash guards (verified before/after every phase, zero alteration) and passed
  the Mode-2 coherence review — but at 96 micro-turns.

**Ask**: consider naming a "mechanical sequence" execution class (a
deterministic script plus an orchestrating agent) or publishing a turn budget
per movement, so close cost stops depending on model idiosyncrasy.

## What held

Registration before branching, one commit per unit pushed immediately, the
no-rewrite rule on published branches, the single administrative commit, the
fresh-context coherence review (Mode 2 found exactly the doc drift above and
nothing else), and the owner-file guard discipline — the closing run left the
owner's `next-env.d.ts` and `feedbacks*.md` byte-identical (sha256 verified
at start and end of `01a1acab`).
