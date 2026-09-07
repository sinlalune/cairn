---
type: Cairn Decision Record
title: ADR-019 — an area is a folder of the tree
description: The main component ADR-010 splits a module note by is a folder of the tree, and its note describes that folder; the architecture page says in one sentence which way dependencies point between the folders it names; a path names the areas it writes in, writes: is their patterns, and a path that needs a whole source root says why. Promotes Q10 to Q12 of the coding-guidelines decisions page; no rule.
tags: [cairn, adr, 1.1, areas, module-note, architecture, writes, skills]
timestamp: 2026-09-07T00:00:00Z
adr:
  id: ADR-019
  status: accepted
  date: 2026-09-07
---

# ADR-019 — an area is a folder of the tree

Status: accepted · 2026-09-07 · written by CP-CAIRN-003, S03

**Promoted from** the owner's
[decisions page](../../project/brainstorm/2026-09-07-coding-guidelines-decisions.md)
at blob `48112c310e1c127b0265ed63c8255bb0377264fa` (Q10, Q11, Q12) and
[research note 3, the component slicing](../../project/brainstorm/2026-09-07-component-slicing-research.md)
at blob `945a201e0ab317426179a2def661fe63b343669d`, its sections *Crumbz's
tree against its own pages* and *The least discipline Cairn could state*.
Both notes stay exactly as they were. It supersedes no record of 1.1: it
builds on [ADR-010](./ADR-010-the-module-note-describes-now.md) decision 2,
which splits an area every path touches by main component and has the
open skill ask which area a path writes in; this record says what a
component is.

## Context

Every guide read — Anthropic's, OpenAI's, GitHub's, the AGENTS.md standard
— slices a tree the same way: a directory a reader can name, one short
instruction file in it, one owner, a task scoped to the directory where it
can be. Cairn already has that mechanism under another name: an `areas`
entry of the configuration is a match pattern and a note, `writes:` is the
scoped task, and ADR-010 splits the note by main component. None of the
guides says whether a component is a layer or a feature; Jimmy Bogard says
a feature, at the cost of a team that can refactor.

Crumbz's tree at its trunk tip is sliced by layer — `lib`, `app`,
`components` — and the three boundaries its pages state hold: the board
is read from stored rows and never computed in a route, no public handler
calls the sports provider, the pure engine reaches nothing. Dependencies
point one way, from routes and components into the library and never
back. What the cut cost was not a crossing but duplication across the
layers of one feature: the bookmaker-triplet selection written twice, a
route guard four times, forty-nine exports imported by nothing.

Nothing could notice a crossing, because every path wrote in one area:
Crumbz's configuration declares the kit's single starting area,
`application`, matching all of `src/`, bound to one note that grew to
four hundred lines; eight of sixteen paths declared `writes: src/**`. That
one note — two files in the folder, counting its index — is the situation
the owner raised again on 2026-09-07, after the first record of this
path: *"it has two module notes when there is a ton of components, and I
asked to slice in components."* The split is
ADR-010 decision 2's, decided on 2026-09-06 and implemented by no coding
path yet; what this record adds is what a component is, what the page
says of dependencies, and what a path declares.

## Decisions

### Decision 1 — an area is a folder of the tree

Promotes **Q10**, *A folder of the tree* — simplest, as today.

An area is a directory under a source root, and its note describes that
directory: what it holds, its boundaries, its tests. The main component
ADR-010 decision 2 splits by is a folder a reader can name in the tree,
and the `match` patterns of an `areas` entry are that folder's. When the
split is made, an adopter with Crumbz's tree gets one note per main
folder — the routes, the components, the analytics, the ingestion — and
a path that writes in one folder refreshes one note. Whether a folder is
a layer or a feature is the adopter's tree to arrange; the protocol reads
the folders it has.

What this changes: the `cairn-open` skill, step 1, the sentence ADR-010
decision 2 already puts there, saying what an area is; the `areas` row of
`spec/reference/configuration.md`, one sentence.

### Decision 2 — the architecture page says which way dependencies point

Promotes **Q11**, *One sentence on the page* — one sentence in a template.

An architecture page that names components states, in one sentence a
reader can check against an import line, which way dependencies point
between them. On Crumbz the direction was right and unwritten, and the
two imports from the analytics into the ingestion's job runner crossed a
line the module note names without anyone recording a choice. The
sentence is a claim on a page, as every sentence of an architecture page
is; no tool reads it. The coherence review at closure, which already asks
whether the candidate contradicts the governing pages, is where a reader
checks it.

The option is tagged *one sentence in a template*, and the kit has no
architecture template today; the sentence goes where a page's shape is
stated, and a template, if the coding path that shapes an adopter's
documentation plane gives the kit one, carries it.

What this changes: `spec/concepts/architecture.md`, where a page's
contents are listed, one sentence; `docs/architecture/index.md`, one
sentence, and the index the kit writes for an adopter in `tools/cairn.mjs`.

### Decision 3 — a path names its areas, and a whole root says why

Promotes **Q12**, *The open skill asks for the area* — one sentence; as
ADR-010 decision 2 already says.

What ADR-010 decision 2 already asks, `writes:` as the named areas'
patterns, gains one clause: a path that needs a whole source root says
why in its record, and the owner reads the reason with the plan before
the go-ahead. No new check.

What this changes: the `cairn-open` skill, step 1, one sentence beside
decision 1's.

## Alternatives rejected

- **Q10, a feature the product has** (one sentence; native to `areas`):
  an area is something a user of the product can name, with match
  patterns that cross folders, and the note describes the feature end to
  end. The note's own recommendation, on the Crumbz count of duplication
  across layers. The owner chose the folder: the patterns stay readable
  and no file moves.
- **Q10, the adopter's choice, unsaid** (as today): ADR-010 as written.
  Refused because *main component* then means nothing a skill can ask
  for.
- **Q11, nothing** (simplest, as today): the page lists boundaries and
  the tree shows the direction.
- **Q11, an advisory in the checker** (adds a rule): imports between
  areas read against the areas' order; the first rule to read source
  lines, for a crossing that on Crumbz was two lines.
- **Q12, nothing** (simplest, as today): `writes:` is the writer's
  estimate and the drift rule reads it at closure.
- **Q12, an advisory when `writes:` equals a source root** (adds a rule):
  the registration run saying the path spans every area. The one check
  that would have flagged eight of sixteen Crumbz paths; offered twice,
  on the page and again in the chat of 2026-09-07 when the owner asked
  whether Crumbz's one note would change, and not taken. The sentence in
  the open skill is the whole remedy, and the owner reads the record.

## Consequences

- An adopter's configuration grows one `areas` entry per main folder
  when ADR-010 decision 2 fires, and the `work-unit` rule already routes
  a source change to that folder's note.
- Crumbz's one note becomes several when the split is made there, by
  folder, and nothing in this record moves a file.
- A record whose `writes:` is a whole source root carries the reason in
  prose. Nothing refuses it.

## What the manifesto's test weighed

The two rules offered — an advisory reading imports, an advisory reading
`writes:` — were refused, the second twice. The tree's own folders are the
unit of slicing, which is the manifesto's *hierarchy whose logic stands on
its own*; the one thing worth saying goes on the page as a claim, not in
the checker as a rule. Nothing enters the checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the open skill, the configuration reference | `cairn-open` step 1; `spec/reference/configuration.md`, `areas` |
| 2 | the architecture concept, the architecture index, the kit's index generator | `spec/concepts/architecture.md`; `docs/architecture/index.md`; `tools/cairn.mjs` |
| 3 | the open skill | `cairn-open` step 1 |

The roadmap register names the coding paths of 1.1 that carry these: the
open skill and the configuration reference in path 1; the concept, the
index and the kit in path 4.
