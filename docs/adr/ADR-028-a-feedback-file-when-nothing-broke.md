---
type: Cairn Decision Record
title: ADR-028 — a feedback file when nothing broke
description: A file under `feedbacks/` is the channel an agent writes when the gate stayed green and the protocol still cost more than it should — naming the movement, the cost and the change to Cairn that would remove it — written when there is something to say and never as a ritual. A defect of the harness earns no file. No tool, no skill, no rule; one sentence in the unit skill points at the folder. Promoted from the owner's words of 2026-09-15 over coding path 4's request, as that path's journal entry and this path's record carry them.
tags: [cairn, adr, 1.1, feedback, skills]
timestamp: 2026-09-15T00:00:00Z
adr:
  id: ADR-028
  status: accepted
  date: 2026-09-15
---

# ADR-028 — a feedback file when nothing broke

Status: accepted · 2026-09-15 · written by CP-CAIRN-010, S01 · decision 2's clause *no tool reads or writes the folder* superseded by ADR-038 on 2026-09-21

**Promoted from** the owner's words in the chat of 2026-09-15, said while
coding path 4's request (#18) was open and written into
[this path's record](../../project/coding-paths/CP-CAIRN-010/index.md) at
its registration blob `fc0550f16c9b6a73d9c31890a38a6d723494eaa3`, which the
owner read and accepted; the request itself carries no comment of the
owner's. The observations that had nowhere to go are in coding path 4's
[journal entry](../../project/log/2026-09-15-cp-cairn-009.md) at blob
`9dfaed79f33afa00411bd47d5c3ccda8e6f3787e`, section *What it did not do*,
and in the last paragraph of
[the brainstorm note of 2026-09-15](../../project/brainstorm/2026-09-15-the-review-movement.md)
at blob `5bca91e01a6a679f135cf1cfbff93e25a9c63f16`, where the writer
parked them. All three stay exactly as they were. This record supersedes
nothing and extends [ADR-014](./ADR-014-two-tools-of-1-1.md) decision 1
by naming what the post-mortem does not carry.

## Context

Two channels carry what a repository learns about the protocol.
`cairn-postmortem` prints the mechanical facts after a red run (ADR-014
decision 1), and the writer reads them before the next unit (ADR-025).
`feedbacks/` holds the owner's pages and the adopter audits — eight notes
by 2026-09-08 — from which the records of 1.1 were promoted. Both start
from an incident: a gate that went red, or an owner who sat down to write.

Nothing carries an agent's observation to the protocol when nothing
broke. On coding path 4 the writer met four things the gate could not
see and no record had a place for: a record naming a folder by a
placeholder no code could resolve; one measured count restated in five
documents and corrected three at a time across three units; a definition
of done asking for a sentence a record it cites makes false; a record
specifying a mechanism no release produces yet, with no way to mark it
pending. Each was noticed by hand, fixed or raised, and then parked — in a
step record, in a journal paragraph, in the last paragraph of a brainstorm
note about something else. The owner named the gap on 2026-09-15: *the
gate stayed green and the protocol still cost more than it should have
here*, and there is nowhere to write that down.

The owner also said what the channel is not. It is not a seventh skill,
and not a tool beside the post-mortem: both were refused in the chat. And
it is not where a defect of the harness goes — sixteen review contexts
that hung on path 4 are the harness's fault, reported to its vendor, and
tell Cairn nothing.

## Decisions

### Decision 1 — a file under `feedbacks/` is the channel

The owner's ruling; one folder that already exists.

When a unit, a closing or a session has cost more than it should have and
the gate stayed green, the writer writes a file under `feedbacks/`. The
file names, for each observation: where the cost was met — the movement,
the surface, the record; the cost, measured where it can be — units
spent, documents corrected, reads made by hand; and the change to Cairn
that would remove it. It is named as the owner's pages are, the date
first, then who wrote it and what it is about, and it is listed in
`feedbacks/index.md`, which says the folder holds the owner's pages and
the agents' files. A file there is what the index already says every note
is: evidence for a protocol change, never authority for one.

It is written when there is something to say and never as a ritual. No
unit, no closing and no path owes one; a path that met nothing closes
with none, and a file with nothing measured in it is the ritual this
decision refuses. A journal entry may name the file in one line; it does
not carry the observations, because the journal is the history of what a
path did and the file is an argument about what Cairn should do.

What this changes: `feedbacks/index.md`, whose opening says what the
folder holds and lists the first agent file beside the owner's pages; the
unit skill's last section, *Report the boundary*, one sentence pointing
at the channel.

### Decision 2 — a defect of the harness earns no file, and no tool, skill or rule is added

The clause *no tool reads or writes the folder* **superseded** on
2026-09-21 by [ADR-038](./ADR-038-the-channel-second-edition.md): the
`links` rule reads the folder, and the kit writes the folder and its
index in every adopter; no tool writes a note, and the rest stands.

The owner's refusals, as they were said.

The channel is Cairn improving Cairn. An observation earns a line only if
the remedy is a change to Cairn — a record, a skill, a template, a rule,
a tool of this repository. A subagent that hangs, a command that reports
what did not happen, a harness that loses a session: these go to the
harness's vendor by the vendor's own channel, and a file here that names
them is noise the owner has to read past.

No tool reads or writes the folder, no skill produces the file, no rule
requires it, and no step record carries a section for it. The post-mortem
keeps its one job, facts after a red run.

What this changes: nothing.

## Alternatives rejected

- **A seventh skill, `cairn-feedback`** (adds a kit file): refused by the
  owner. A skill is a procedure, and there is no procedure — a writer who
  has something to say writes it.
- **A tool beside the post-mortem, printing the frictions** (adds a
  tool): refused by the owner. The post-mortem reads facts a tool can
  read — runs, commits, records. A friction is a judgement about cost,
  which no tool of this repository reads, so the tool would print a
  template for the writer to fill: the ritual, mechanised.
- **A section of the step record, written every unit** (adds a step):
  fires whether or not there is anything to say, so most of its instances
  read *none*, and a reader learns to skip it. The test that never fires,
  turned on prose.
- **The brainstorm folder, where path 4 parked it**: a brainstorm note is
  an idea, provisional, and read when someone plans; `feedbacks/` is where
  the evidence the records were promoted from already lives, and the
  owner reads it as such.
- **An issue on the host**: leaves the repository, is unreadable to a
  fresh session that reads files, and is host-specific where a folder is
  not.
- **A paragraph of the journal entry** (as path 4 did): the journal is
  written once, at integration, by the integrating unit, and is the
  history of what a path did. An observation belongs where it can be
  read as an argument and answered by a path; the journal may point at
  it.

## Consequences

- The first agent file is written by this path, from what coding path
  4's writer observed.
- The owner reads an agent file as they read their own pages: before a
  merge where the path wrote one, and when the next promotion is
  planned. Nothing else reads it.
- The 1.1 page names the file beside the post-mortem where it lists the
  tools, and in the documentation plane's table for the protocol's own
  repository.

## What the manifesto's test weighed

The first threat — more control through more workflow — was weighed
against a ritual, and the ritual is what is refused: a section every
unit, a skill, a tool. What remains is a folder that exists, a sentence
in a skill, and a file a writer chooses to write.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the feedbacks index and the first agent file; the unit skill's last section | `feedbacks/index.md`; the first agent file under `feedbacks/`, named by the unit that writes it; `cairn-unit` § 7, *Report the boundary*, one sentence |
| 2 | nothing | — |

Row 6 of the [roadmap register](../../project/coding-paths/index.md)
carries it, in CP-CAIRN-010, S02.
