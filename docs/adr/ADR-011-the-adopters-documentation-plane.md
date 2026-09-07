---
type: Cairn Decision Record
title: ADR-011 — the adopter's documentation plane
description: What an adopter's documentation plane holds from installation — a folder for pre-existing inputs the first session reads, a concept wiki in three folders, and the rule that an abstraction explained in any session becomes a concept note — and where the instruction lives. Promotes R31, R34 and R35.
tags: [cairn, adr, 1.1, documentation, concepts, inputs]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-011
  status: accepted
  date: 2026-09-06
---

# ADR-011 — the adopter's documentation plane

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S05

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (the three items *already decided on 06/09*) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md) at
blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (R31, R34, R35). Both notes stay exactly as they were.

## Context

The owner decided three things on 2026-09-06 before the decisions page was
written, and the page records them without asking again. All three are
about what an adopter's `docs/` holds and who writes it. Today the kit
installs the documentation index, one module note and one concept index at
the configured concept root; the specification's chapter 6 names three
concept scopes — protocol, project, coding — and places the third beside
the module notes. Nothing names a place for the documents an owner already
has when the project starts, and nothing tells an agent to write a concept
note outside a path.

## Decisions

### Decision 1 — pre-existing inputs live in `docs/inputs`

Promotes **R31**. The owner's ruling: *"Pre-existing documentation of any
format goes in `docs/inputs`, and the first ideation session starts by
reading it."*

The kit installs `docs/inputs/` with an index that says what the folder
is for: documents of any format the owner had before the protocol —
notes, sketches, exports, specifications from elsewhere — kept as they
came, never edited into protocol shape. The documentation index lists the
folder. The brainstorm skill says the first session of a project starts by
reading it, and a brainstorm note that draws on an input names it.

What this changes: `tools/cairn.mjs`, one installed index; the
documentation index it writes; the `cairn-brainstorm` skill, *when an
idea arrives*, one sentence; the layout reference's tree.

### Decision 2 — the concept wiki in three folders

Promotes **R34**. The owner's ruling: *"`docs/concepts/cairn` when the
user asks an explanation about a Cairn term, `docs/concepts/<project>`
when project-specific terms, `docs/concepts/learning` when external
knowledge (coding, hardware, AI, anything)."*

An adopter's concept root is `docs/concepts`, and it holds three folders,
each with an index:

| Folder | Whose vocabulary | Written when |
| :-- | :-- | :-- |
| `docs/concepts/cairn` | the protocol's terms, explained for this project's reader | the user asks what a Cairn term means; the note links the protocol's own article and adds what this repository does with it |
| `docs/concepts/<project>` | the product's domain, the words its architecture uses | a path or a session names a domain idea that carries complexity |
| `docs/concepts/learning` | knowledge from outside — coding, hardware, AI, anything | a session explains an abstraction that is nobody's domain |

The chapter 6 table changes to match: the *coding* scope moves from
*beside the module notes* to `docs/concepts/learning`, and the adopter's
`cairn` folder is named as the one place an adopter writes about protocol
terms — still never into Cairn's own wiki. The `concept-orphan` and
`concept-growth` rules read the whole root, all three folders. The
protocol's own repository keeps its wiki where it is: it is the `cairn`
scope itself.

What this changes: `tools/cairn.mjs`, which installs three folder indexes
where it installs one root index, and the documentation index lists the
three folders in place of a root index, so the count is two files more,
not four; `roots.concepts` in the installed configuration, now the
parent; `tools/cairn-check.mjs`, whose two concept rules read the root
recursively; `spec/index.md` chapter 6, the scopes table; the layout
reference.

### Decision 3 — an abstraction explained becomes a concept note

Promotes **R35**. The owner's ruling: *"even in the chat session, the
agent recognises a complex abstraction and proactively creates a note and
makes reference to it, in addition to a constant synthetic and pedagogical
approach."*

Whenever an agent explains a complex abstraction — in a path, in a
brainstorm, in a chat with no path open — it writes the concept note in
the folder decision 2 gives it, from the concept template, and links the
note from where the explanation was needed. The instruction has to reach
every session, not only the ones that run a skill, so it lives in the
bootloader, as one of its absolute rules beside *progress persists in
files, never in a conversation*: an abstraction explained persists as a
concept note. The concept template already gives the shape and the
pedagogical order — the plain definition first, then the failure the
concept prevents.

What this changes: `AGENTS.md` as the kit writes it, one line;
`tools/cairn.mjs`, the bootloader text. No skill and no rule: a note
written in a chat has no path to be judged in, and `concept-orphan`
already refuses a note nothing links.

## Alternatives rejected

- **A sixth skill for concept notes**: a skill is read when a procedure
  runs; the owner wants the note written in any session, and the
  bootloader is the one file every session reads.
- **Keeping the third scope beside the module notes**: the owner named a
  folder, and an abstraction from outside the code has no module note to
  sit beside.
- **Making `docs/inputs` part of the documentation index only**: a folder
  nothing tells the agent to read is a folder that is not read.

## Consequences

- The kit installs three more files: the inputs index and two concept
  indexes beyond the one it replaces. The kit holds twenty-six today; with
  ADR-013's pointer that makes thirty, and the conformance page's target
  is *under* thirty. ADR-013 states the rule and ADR-015 the count; the
  coding path that owns the kit removes what the count requires.
- A project's glossary grows in three places with three readers in mind,
  and the readable page of ADR-012 links into it.
- The bootloader gains one rule and stays a pointer.

## What the manifesto's test weighed

The three rulings were the owner's before the page; the page records them.
Decision 3 was the one design choice left to this path, and it chose one
line in an existing file over a new skill. The kit's file budget is the
cost, stated above and settled in ADR-013.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the kit's installed indexes, the brainstorm skill, the layout | `tools/cairn.mjs`; `cairn-brainstorm`; `spec/reference/repository-layout.md` |
| 2 | the kit, the configuration, the two concept rules, chapter 6 | `tools/cairn.mjs`; `roots.concepts`; rules `concept-orphan`, `concept-growth`; `spec/index.md` §6 |
| 3 | the bootloader the kit writes | `AGENTS.md`; `tools/cairn.mjs` |
