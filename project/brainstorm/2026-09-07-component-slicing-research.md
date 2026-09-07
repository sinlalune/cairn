---
type: Cairn Research Note
title: The component slicing discipline — what the tree says and what the pages said
description: Research note 3 of 4 for the coding guidelines — what the current practice for agent-built repositories says about slicing a system, read from the vendors' own guides and one named practitioner; Crumbz's src/ read against its own architecture and module pages, with the imports counted in each direction and the boundary crossings named; the least discipline Cairn could state, with the deletion option beside every addition; the questions the owner must answer.
tags: [cairn, research, coding-guidelines, slicing, architecture, module-note, crumbz]
timestamp: 2026-09-07T16:00:00Z
cairn:
  status: provisional
---

# The component slicing discipline — what the tree says and what the pages said

Answers section 3 of the
[brief](./2026-09-07-coding-guidelines.md): what current practice says
about slicing a repository agents build in, whether Crumbz's code is
sliced as its pages say, whether anything noticed a boundary being
crossed, and what the least discipline Cairn could state would be.
Nothing here is a ruling.

## Sources

| Source | Pinned | Why it is a source |
| :-- | :-- | :-- |
| Anthropic, *Set up Claude Code in a monorepo or large codebase* | <https://code.claude.com/docs/en/large-codebases>, read 2026-09-07 (undated) | the vendor's own guide to slicing a tree for an agent |
| Anthropic, *Best practices for Claude Code* | <https://code.claude.com/docs/en/best-practices>, read 2026-09-07 | what the instruction file says about architecture |
| OpenAI, *AGENTS.md* for Codex | <https://learn.chatgpt.com/docs/agent-configuration/agents-md>, read 2026-09-07 | nested `AGENTS.override.md` per directory |
| GitHub, *Get the best results from Copilot coding agent* | <https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results>, read 2026-09-07 | path-specific instruction files |
| The AGENTS.md standard | <https://agents.md/>, read 2026-09-07 | one file per package, "the closest one takes precedence" |
| Jimmy Bogard, *Vertical Slice Architecture* | <https://www.jimmybogard.com/vertical-slice-architecture/>, 2018-04-19, read 2026-09-07 | the named practitioner the phrase comes from |
| This repository | `b281786`: the manifesto's *engine*, `spec/concepts/architecture.md`, `spec/concepts/module-note.md`, ADR-010, `cairn.config.json`'s `areas` | what Cairn says about slicing today |
| Crumbz, `sinlalune/crumbz` | trunk `358bb17`: `src/`, `docs/architecture/*.md`, `docs/modules/application.md`, `cairn.config.json`, the sixteen path records' `writes:` | the only tree built under the protocol |
| Note 1 of this series | [the coding stance](./2026-09-07-coding-stance-research.md) | the dead exports and the copies it counted, reread here as slicing evidence |

## Summary

### What current practice says

**Anthropic.** The unit of slicing is the directory, and the discipline
is a file in it: "Per-subdirectory `CLAUDE.md`: conventions specific to
that area's stack. In a monorepo that's one per package. In a large single
tree it's one per subsystem such as `src/db/` or `src/api/`." Ownership
follows: "Each directory's owner typically maintains its file." Skills go
the same way, "one set per subsystem". The reason is the context window:
"a single CLAUDE.md at the repository root tends to either grow to cover
every subsystem's conventions … or stay too generic to be useful." A
cross-package change is one session with a plan file, not a rule. The
best-practices page lists "Architectural decisions specific to your
project" among what to include and "File-by-file descriptions of the
codebase" among what to exclude. Nothing on how to cut the subsystems.

**OpenAI.** Layers of `AGENTS.md`: global, project root, and "nested
`AGENTS.override.md` files can enforce specialized rules for particular
directories"; "the discovery mechanism prioritizes files closest to your
current directory."

**GitHub.** Repository-wide instructions plus "path-specific instructions
(`.github/instructions/**/*.instructions.md`) target particular file
types"; good tasks are small and named by their files.

**The AGENTS.md standard.** "Place another `AGENTS.md` inside each
package. Agents automatically read the nearest file in the directory tree,
so the closest one takes precedence."

**Jimmy Bogard.** The one source that says how to cut. Against layers
whose rule is "Controller MUST talk to a Service that MUST use a
Repository", a slice takes "all concerns for a specific request from
front-end to back", and the rule is "Minimize coupling between slices, and
maximize coupling in a slice." Sharing across slices is kept "to a
minimum"; the prerequisite is a team "capable of recognizing code smells
and refactoring patterns".

Where they agree: the tree is cut into directories a reader can name; each
directory carries its own short instruction file and its own owner; a task
is scoped to one directory where it can be; the instruction file says what
differs, never what the tree already shows. None of the vendors says
whether to cut by layer or by feature; Bogard says by feature, and says the
cost is a team that can refactor.

### What Cairn says today

The manifesto's *engine* asks for "the leanest tree", "a hierarchy whose
logic stands on its own" and "the lightest token footprint through
exploration and navigation". The architecture concept says a page "states
boundaries, responsibilities, constraints and major flows" and is "a
maintained claim, not proof that implementation follows it." The module
note concept says one note "explains the current responsibilities,
boundaries, data flow, important files, tests, and known limits of one
implemented area", and ADR-010 makes it current-state only and splits it
"by main component" when every path touches it, with the open skill
asking which area a path writes in. `cairn.config.json` carries `areas`,
each a match pattern and a note. That is the vendors' per-directory file
under another name: an area is a directory, its note is the file, and
`writes:` is the scope of a task. What Cairn does not say is which way
dependencies may point, what a boundary is, or how a page should state
one.

### Crumbz's tree against its own pages

The tree at `358bb17`, ninety-four files under `src/`:

| Folder | Files | The module note's name for it |
| :-- | --: | :-- |
| `lib/analytics` | 25 | "Analytics Engine" |
| `lib/ingestion`, `lib/api-football` | 16 | "Ingestion Layer" |
| `lib/db.ts`, `lib/utils`, `lib/migration-database*` | 4 | unnamed |
| `app/api` | 12 | "API Layer" |
| `app/*`, `components/*` | 26 | "Presentation Layer" |
| `scripts` | 11 | named only through `sync.ts` |

The pages state four boundaries. Each was checked against the imports:

| The page says | Where | What the tree does |
| :-- | :-- | :-- |
| "the board is read from rows written at ingestion time, never computed on request"; "computed at ingestion time and never in a route handler" | module note §3, `value-board.md` l.95 | holds: no route under `app/api` imports the analytics computation at the tip; 009 S03 removed the last one |
| "Public handlers read only stored data"; "No browser or public read endpoint calls the sports provider" | `ingestion-pipeline.md` l.53, `system-overview.md` | holds: no file under `app/` or `components/` imports the provider client |
| the pure engine takes typed inputs and "neither persists user values nor reaches an external provider" | `value-board.md`, `value-board.ts` doc comment | holds: `value-board.ts` imports only `devig.ts` |
| four layers, ingestion and analytics named separately | module note §1–2 | crossed twice: `lib/analytics` imports `lib/ingestion`'s job runner to log its own rollup runs |

Import direction, counted over every `from "@/…"` in `src/`:

| From → to | Count |
| :-- | --: |
| `app` → `lib` | 21 |
| `components` → `lib` | 19, of which 14 type-only and 5 calls into pure functions |
| `lib` → `lib` | 20, of which 6 to `db`, 2 `analytics` → `ingestion` |
| `scripts` → `lib` | 7 |
| `app` → `components` | 5 |
| `lib` → `app` or `components` | 0 |
| `components` → `db` | 0 |
| route files importing `db` directly | 6 of 12 |

The tree is sliced by layer, the layers are the ones the note names,
dependencies point one way, and the three stated boundaries hold. The
layer cut has a cost the pages do not see, and note 1 counted it: the
value board, which is one feature, lives in five files under
`lib/analytics`, two routes under `app/api`, eleven files under
`components/crumb-trail` and three scripts; the bookmaker-triplet
selection was written twice because a route and a service in two layers
each needed it; the route-parameter guard was copied four times because
routes are the only place a route file looks; forty-nine exports are
imported by nothing because a layer exports for a neighbour that never
came. Bogard's sentence is the diagnosis: coupling was minimised inside
the feature and maximised across it.

**Did anything notice a boundary being crossed?** No, and nothing could.
Every path wrote in one area: `cairn.config.json` declares a single area,
`application`, matching `src/**`, with one note, which ADR-010 already
answers. Of the sixteen paths, eight declared `writes: src/**` and one
declared the three folders that together are `src/`; three declared files
(012, 014, 015); the rest wrote tools or documents. A `writes:` of `src/**`
tells the checker nothing about layers, and the coherence question about
the governing pages was answered in prose. The two analytics-to-ingestion
imports were not a decision anyone recorded; they are one `import` line in
two files, and the note that names the layers is 413 lines long — the
forty-line history ADR-010 describes, grown ten times.

**Sizes.** The largest source file is 18 KB, the largest component 17.5 KB,
the whole of `src/` about 6,500 lines with 1,300 of tests. Every file fits
a context window many times over; the thing that did not fit was the
module note, which every path had to refresh and which grew by paragraphs
until CP-016 wrote that half of it was stale.

### The least discipline Cairn could state

Four shapes, each with its deletion beside it:

| Shape | What it would say | Deletion beside it |
| :-- | :-- | :-- |
| a line in the architecture page | which way dependencies point between the named components, in one sentence, so a reader of the page can check an import against it | the page already lists boundaries; if it says nothing about direction, the direction is whatever the tree does, which on Crumbz was right |
| a sentence in the coding stance | before adding a file, name the area it belongs to; a function two areas need lives in the one that owns the data, once — rung 2 of the ladder said per area | rung 2 already says it; the sentence only names where to look |
| a rule in the checker | an import from a lower area into a higher one is an advisory, read from the `areas` patterns and the import lines | the manifesto's first threat; it reads source, which no rule of Cairn does today, and the crossing on Crumbz was two lines nobody minds |
| nothing beyond the module notes | ADR-010's split: one area per main component, one short note each, the open skill asking which area a path writes in | this is already decided; the question is only whether an area is a layer or a feature |

## Conclusion

### What this changes about the vision

1. **Cairn already has the vendors' slicing mechanism.** An area with a
   match pattern and a note is a directory with its instruction file and
   its owner; `writes:` is the scoped task; ADR-010 splits the note by
   main component. Nothing in the guides asks for more than a short file
   per directory that says what differs. What the guides do not settle,
   Cairn need not either: none of them says layer or feature.
2. **Crumbz was sliced by layer and it held.** The three stated boundaries
   are true at the tip and the dependencies point one way. The cost was
   not a crossing; it was duplication and dead exports across the layers
   of one feature, which is the evidence for Bogard and the reason note 1
   found rung 2 skipped six times.
3. **The main component of ADR-010 should be a feature where the product
   has one.** On Crumbz the components a reader names are the board, the
   Match Lab, the settled tiles, the ingestion; not `lib` and `app`. An
   area per feature, cutting across the folders, gives a path one note to
   refresh and one place to look before writing, and it is what the
   `areas` field already allows. Whether to move files to match is the
   adopter's, and Bogard's prerequisite applies: an agent that can
   refactor.
4. **The one thing worth a sentence is the direction of dependencies**,
   and it belongs on the architecture page as a claim, not in the checker
   as a rule. The page is "a maintained claim, not proof"; a sentence that
   says which way imports point is the cheapest claim a reader can check
   by hand, and the coherence question already asks the writer to read
   the candidate against the pages.
5. **Sizes need no rule.** Files fit; the note did not. ADR-010 d1 is the
   answer, and the evidence says it was needed ten times over.

### What it does not settle

- Whether an adopter's areas should be declared at install from
  `docs/inputs/` or proposed by the first path; ADR-011 reads the inputs,
  ADR-010 has the writer propose the split when a note is touched by every
  path.
- Whether a feature area whose match patterns cross `lib/`, `app/` and
  `components/` reads well in `cairn.config.json`, or whether an adopter
  would rather move the files; not testable without a second adopter.
- Whether a route file that queries the database directly is a boundary
  or a habit; six of twelve do on Crumbz, the pages do not say, and the
  note does not ask.

### Questions for the owner

Tags as in the 1.1 decisions page: **simplest** removes or avoids a rule,
**native** uses what the tools already do, **adds a rule** is a new check
to weigh, **one sentence** is neither.

**Q1. When a note splits by main component, what is a component?**
Crumbz's tree is `lib`, `app`, `components`; its product is the board,
the Match Lab, the settled tiles and the ingestion.

- [ ] **A feature the product has.** *(one sentence in a skill; native to
  `areas`)* The open skill says an area is something a user of the product
  can name, and its match patterns may cross folders. The note describes
  the feature end to end.
- [ ] **A folder of the tree.** *(simplest, as today)* An area is a
  directory; the note describes the layer.
- [ ] **The adopter's choice, unsaid.** *(as today)* ADR-010 stays as
  written and each adopter decides.

**Q2. Does the architecture page say which way dependencies point?** On
Crumbz the direction was right and unwritten; two imports crossed a line
the note names and nothing noticed.

- [ ] **One sentence on the page.** *(one sentence in a template)* The
  architecture template's boundaries section asks for the direction in a
  sentence a reader can check against an import. No tool reads it.
- [ ] **Nothing.** *(simplest, as today)* The page lists boundaries; the
  tree shows direction.
- [ ] **An advisory in the checker.** *(adds a rule)* Imports from one
  area into another are read against the `areas` order and reported. The
  first rule to read source lines; offered to be weighed.

**Q3. When a path's `writes:` is a whole source root, is that a signal?**
Eight of sixteen Crumbz paths declared `src/**`, and every overlap and
every crossing hid behind it.

- [ ] **The open skill asks for the area.** *(one sentence in a skill; as
  ADR-010 d2 already says)* A path names the area or areas it writes in,
  and `writes:` is those areas' patterns; a path that needs the whole root
  says why in its record. No new check.
- [ ] **Nothing.** *(simplest, as today)* `writes:` is the writer's
  estimate and the drift rule reads it at closure.
- [ ] **An advisory when `writes:` equals a source root.** *(adds a rule)*
  The registration run says the path spans every area and is on the
  `full` route. One reading of two fields the record has.
