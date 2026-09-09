---
type: Cairn Decision Record
title: ADR-023 — the pages a reader meets
description: The adopter's README says what the project is and lists the surface pages; a workflow page is an architecture page of kind flow, one per flow that crosses components, with a diagram; the architecture page carries one diagram and the surface page opens with one worked example; Cairn owns no API page and the agent creates and maintains the API documentation; nothing more on where the senior searches. Promotes P7 to P11 of the pedagogy feedback; no rule, no kit file, no new folder.
tags: [cairn, adr, 1.1, pedagogy, documentation, readme, workflow, diagrams, api]
timestamp: 2026-09-09T00:00:00Z
adr:
  id: ADR-023
  status: accepted
  date: 2026-09-09
---

# ADR-023 — the pages a reader meets

Status: accepted · 2026-09-09 · written by CP-CAIRN-004, S03

**Promoted from** the owner's
[pedagogy feedback](../../feedbacks/2026-09-08-owner-feedback-pedagogy.md)
at blob `e9bd3e92aa7c6336f92e715140f744aeb8385d02` (P7 to P11, and the
readings *documentation* and *the senior developer*) and the owner's
[statement on the pedagogy](../../docs/cairn/manifesto-pedagogy-2026-09-09.md)
at blob `57d2e87a3caafab19ba36fa794d7ab342e2a87e1`, its sections *Two
readers* and *The documentation*. Both stay exactly as they were. It
supersedes no record of 1.1: the page per surface of
[ADR-012](./ADR-012-a-page-a-newcomer-reads-first.md) keeps its place and
gains an opening; the dependency sentence of
[ADR-019](./ADR-019-an-area-is-a-folder-of-the-tree.md), decision 2,
gains a diagram beside it; the module-note refresh of
[ADR-010](./ADR-010-the-module-note-describes-now.md), decision 1, gains
a clause.

## Context

The statement of 2026-09-09 names what the documentation serves: learning
— learning notes, big diagrams, use-case examples; onboarding — the
project description, the architecture, the components, the workflows;
use — the user guide and the API documentation. Read against the
documentation plane of the 1.1 page on 2026-09-09: the architecture and
the components have their folders; the user guide is the surface page of
ADR-012; learning notes are ADR-022. Absent are a page above the surface
pages — Q16 of the 1.1 decisions refused one product page *instead of*
one per surface, and did not ask about one *above* them — a page for a
flow, which the manifesto's chronology lists among the specification
documents of a minimum product and chapter 3's promotion never produces,
and any word on diagrams, examples or API documentation. The forge
renders Mermaid natively, and every language's ecosystem generates an
API reference from its code.

The owner answered P7 to P11 on 2026-09-09, P10 in their own words.

## Decisions

### Decision 1 — the adopter's README says what the project is, and lists the surface pages

Promotes **P7**, *Yes, the README* — native.

The page above the surface pages is the repository's README: one
paragraph on what the project is, then the surface pages of ADR-012, one
line each, in the order a newcomer meets them. A promotion unit that adds
a surface adds its line, as it writes the surface's page; the closing
review of the request asks whether it did. The kit installs no README and
owns none: the file is the adopter's.

What this changes: `spec/index.md`, chapter 3, the promotion list, one
clause on the README's line; the `cairn-close` skill, step 2, one
sentence; this repository's own `README.md`, which ADR-012 made the page
of its surfaces, gains the paragraph and the list.

### Decision 2 — a workflow page is an architecture page of kind *flow*

Promotes **P8**, *Yes, one per flow that crosses components* — one
sentence in chapter 3; a template.

Chapter 3 already says an architecture page is about one kind of thing —
a feature, an interface, a contract. A flow is a fourth kind: how one
thing moves end to end through the folders the architecture page names,
from what starts it to what it leaves behind, with one diagram. There is
one page per flow that crosses components, under `docs/architecture/`
with the other pages and no folder of its own, and the promotion unit
that changes a flow refreshes its page as it refreshes any architecture
page. A flow inside one folder is that folder's module note's business
(ADR-019) and gets no page.

What this changes: `spec/index.md`, chapter 3, the list of kinds, one
word and one sentence; `spec/concepts/architecture.md`, where a page's
contents are listed, the shape of a flow page — the trigger, the
components in order, the diagram, what is left behind — beside the
sentence ADR-019 put there; `docs/architecture/index.md` and the index the
kit writes for an adopter in `tools/cairn.mjs`, one sentence saying flow
pages live here.

### Decision 3 — one diagram on the architecture page, one worked example first on the surface page

Promotes **P9**, *In the pages 1.1 already names* — one sentence, twice;
native.

An architecture page that names components carries one Mermaid diagram of
them and of the direction ADR-019 decision 2 states in a sentence; the
diagram and the sentence say the same thing, and a reader checks the one
they can read. A surface page of ADR-012 opens with one worked example —
a user doing the one thing the surface is for, start to finish — before
it says what the surface does; the example is the use case the statement
asks for.

What this changes: `spec/concepts/architecture.md`, one sentence beside
decision 2's; `spec/index.md`, chapter 3, the sentence on the surface
page, one clause; `docs/index.md` as the kit writes it, which names the
surface pages' place, one clause.

### Decision 4 — Cairn owns no API page; the agent creates and maintains the API documentation

Promotes **P10**, in the owner's words: *"Cairn does nothing, cairn ask
the agent to create and maintain an api doc."* The owner wrote this line
under the two options offered; it wins.

The protocol names no API page and installs none. An API surface has the
documentation its language's ecosystem generates or expects, written and
kept current by the agent: an implementation unit that changes an API
refreshes its documentation in the same unit, as ADR-010 decision 1 has
it refresh the module note of the area it changes, and the surface page
of ADR-012 links the documentation instead of restating it.

What this changes: the `cairn-unit` skill, step 2, one clause beside the
module-note refresh; `spec/index.md`, chapter 3, the sentence on the
surface page, one clause on the link.

### Decision 5 — nothing more on where the senior searches

Promotes **P11**, *Nothing more* — simplest, as today.

The folders' indexes are the map. What a path did is under the journal,
what a word means under the concept root, why a thing is so under the
decision records, and each folder's index says so already; the pointer
page of ADR-013 lists the chapters. Nothing is added.

What this changes: nothing.

## Alternatives rejected

- **P7, `docs/index.md` is that page** (simplest): the documentation index
  the kit writes opens with the paragraph and lists the surface pages
  first. Refused by the owner; the README is where a reader of a
  repository looks first, and the forge renders it there.
- **P7, no page above** (as today): the surface pages as the entry.
- **P8, a flow section in the architecture page** (one sentence in a
  template): the page walks one flow through the components. Refused; a
  product with several flows would have one page carrying them all, the
  wall Q16 refused for surfaces.
- **P8, no workflow page** (simplest, as today).
- **P9, nowhere in particular** (simplest, as today): a writer adds a
  diagram when it helps.
- **P10, the ecosystem's reference linked from the surface page**
  (native): the generated reference alone, nobody asked to keep it.
  Replaced by the owner's line, which keeps the link and adds the
  keeping.
- **P10, a Cairn page** (adds a file): the surface page of an API as the
  reference, written by hand by the promotion unit.
- **P11, the journal said in two places** (one sentence, twice): the
  pointer page and the documentation index naming where each kind of
  answer lives. Refused by the owner; the indexes say it.

## Consequences

- A newcomer's path has a first step: the README, then a surface page
  that opens with an example, then its glossary, then, if they dig, an
  architecture page with a diagram and, for a flow, the flow's page. The
  statement's onboarding items each have a file, and the kit gains none.
- `docs/architecture/` holds a fourth kind of page; the manifesto's
  *workflow* among the specification documents is produced by promotion
  for the first time.
- An implementation unit that changes an API carries one more refresh,
  beside the module note; an API with no documentation is a unit that
  did not finish.
- Every diagram is Mermaid in a page the protocol already names; nothing
  is generated, stored or linked from outside the repository.

## What the manifesto's test weighed

Four of the five options kept are tagged *native*, *one sentence* or
*simplest*, and the fifth is the owner's own line; the one *adds a file*
offered here, a Cairn API page, was refused. Decision 2 was the one
place a new folder could have appeared, and it did not: a flow page is an
architecture page, in the folder that exists, which is the manifesto's
*no duplicate folders with close missions*. Decision 4 leaves the tool
and the format to the ecosystem, which is *absorb the ecosystem*.
Nothing enters the checker.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | chapter 3's promotion list, the close skill | `spec/index.md` §3; `cairn-close` step 2 |
| 2 | chapter 3's kinds, the architecture concept, the architecture indexes | `spec/index.md` §3; `spec/concepts/architecture.md`; `docs/architecture/index.md`; `tools/cairn.mjs` (the index it writes) |
| 3 | the architecture concept, chapter 3's surface-page sentence, the documentation index the kit writes | `spec/concepts/architecture.md`; `spec/index.md` §3; `tools/cairn.mjs` (`docs/index.md`) |
| 4 | the unit skill, chapter 3's surface-page sentence | `cairn-unit` step 2; `spec/index.md` §3 |
| 5 | nothing | — |

The roadmap register names the coding paths of 1.1 that carry these: the
close and unit skills in path 1; chapter 3, the architecture concept,
this repository's architecture index and the indexes the kit writes in
path 4; this repository's own `README.md` in path 5.
