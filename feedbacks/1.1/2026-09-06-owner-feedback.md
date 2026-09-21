---
type: Cairn Learning Note
title: Owner feedback — 06/09, after sixteen Crumbz paths
description: The owner's own notes of 2026-09-06, transcribed verbatim from two notebook pages, with what the Crumbz repository already shows for each item; filed beside the same-day audit so the two can be iterated together toward 1.1.
tags: [cairn, feedback, owner, adopter, crumbz, learning]
timestamp: 2026-09-06T12:00:00Z
cairn:
  status: provisional
---

# Owner feedback — 06/09, after sixteen Crumbz paths

Two notebook pages written by the owner on 2026-09-06, transcribed as
written. Each item is followed by a short **Reading** — what the repository
shows about it today, in the auditor's words, kept apart from the owner's —
and, where the owner has answered, an **Owner's ruling** in the owner's own
words.
The companion note is the
[audit after sixteen paths](./2026-09-06-crumbz-sixteen-paths-audit.md).

## Page: "cairn | feedbacks | 06/09"

### 1. Need a folder where we drop all external pre-existing documentation of any format.

> → Help shaping the first ideation session.
> → What name?
> → In `docs/`

**Reading.** Crumbz already improvised this: `docs/inputs/` was created in
the first documentation commit (`1b00771`, 2026-09-03) with thirteen
numbered specification files, a README and an `index.html`, and the
brainstorm of the same day drew on them. The kit has no name for that folder,
the documentation-plane index does not list it, and no path's `governs:`
pins anything in it. The protocol's chapter 2 says a source worth keeping
whole goes under `project/sources/`, one record per source; CP-016 used that
folder for an audit JSON and a review. So two homes exist, one for durable
inputs under `docs/` and one for pinned sources under `project/`, and neither
is named in the template or the brainstorm skill. What 1.1 needs to decide:
one name, which plane, and one line in `cairn-brainstorm` saying the first
session starts by reading it.

**Owner's ruling, 2026-09-06.** `docs/inputs`

### 2. Promotion path didn't produce any functional documentation.

> → Need an easy-to-read documentation about the project.
> → Where we leverage also the `/concepts` notes.

**Reading.** Three promotion paths ran (003, 008, and the documents-only
units of 013 and 015). Each produced what the specification asks — an
architecture page, decision records, `promoted_from` links — and nothing a
new reader can read first. `docs/index.md` is the kit's four-line folder
index; `docs/architecture/index.md` lists specifications by system tier; the
six concept articles under `docs/concepts/` are linked from architecture
pages but from no narrative. There is no page that says what Crumbz is, what
a tile is, and where to go next. The specification's stage 3 names the
architecture page and the decision record as the promotion's outputs; it
does not name a product description, so no path was bound to write one.
Candidate for 1.1: a stage-3 output the protocol names — one readable page
per product surface, or a `docs/README` the promotion path must touch — with
the concept articles as its glossary.

### 3. No docs or pointers of cairn protocol except in bootstrap files.

> → Need at least a `cairn/` folder that points toward documentation.

**Reading.** True by design of the 1.0 kit: `AGENTS.md` links the path
convention, the execution protocol and the specification as GitHub URLs
pinned at commit `e26f19d`, and the binding links the concept template the
same way. Nothing on disk explains the protocol to someone who opens the
repository without a network, and nothing tells a reader that `skills/`,
`tools/`, `cairn.config.json` and `cairn.lock.json` are one thing. The kit
deliberately copies no specification; a one-file `cairn/README.md` (or an
index at `skills/`) that names the release, links the six chapters and the
skills, and says which files the kit owns, would cost one file against the
thirty-file budget.

### 4. `concepts/` doesn't respect the split project / protocol / code.

> → directly in `concepts/`

**Reading.** Two folders answer to the name. In Crumbz, `docs/concepts/`
holds six domain terms (closing line value, de-vig, rolling windows…) and
nothing about the protocol or the code, which matches the binding's "this
repository's own vocabulary". In the cairn repository, `spec/concepts/`
holds the protocol's terms and the borrowed Git terms together (`branch`,
`commit`, `rebase`, `test` beside `coding-path`, `work-unit`), separated only
by a note in the index. If the note means the adopter side: the folder is
flat and the kit's index gives no sub-structure, so a project that also
wants code-level concepts (a module's own vocabulary) has nowhere to put
them apart from product concepts. If it means the protocol side: the
borrowed terms could live under `spec/concepts/borrowed/` or be dropped in
favour of links. Both are cheap; the choice is which split the owner means,
to confirm before 1.1 touches either folder.

**Owner's ruling, 2026-09-06.** Project side : `docs/concepts/cairn` (when the user ask an explanation about a cairn term), `docs/concepts/<project>` when project specific terms, `docs/concepts/learning` when external knowledge (coding, hardware, IA, anything)
the perfect scenario is that even in the chat session, the agent recognize complex abstraction and pro actively create note a make referece to it in addition to a constant synthethic and pedagogical approach

## Page: "cairn | post mortem"

### → Introduce automatic post-mortem generation after incidents with the protocol.

**Reading.** Every note in this folder was written by hand from the same
inputs: the path records, the pull requests, the workflow runs, the reflog.
The reading half is mechanical and was scripted during the 09-06 audit
(registration parent, ready-commit shape, digest recomputation, step
integrity, red runs per branch, open-to-merge times). A `cairn-postmortem`
command that prints that table for one path or for the repository, from Git
and the forge, would leave the human the "reading" section only. The
trigger is the open question: after a red run on a `path/*` branch, at
`done`, or on demand. The judgement half — what a red run meant — stays a
note; the specification already keeps facts and judgements apart.

### → Steps don't include human-in-the-loop for test — maybe sometimes at the end of a coding path before the merge.

**Reading.** The unit skill's step 4 runs gates; the close skill's step 3
obtains acceptance of a description. Nowhere does the lifecycle say "the
owner tried it". In Crumbz the writer's own verification lines carry the
manual checks (headless Chromium at 390×844, database counts), and the
closing bodies of 010 to 013 report them; the owner's use of the product is
recorded nowhere, and PR #24 merged 29 seconds after opening. A named step —
an acceptance test the owner performs on the candidate, recorded in the
request as a checkbox that only the owner ticks — would give the closing
acceptance a content beyond the merge click, and answers item 5 of the
audit at the same time.

### → What is good practice about merged branches?

**Reading.** The close skill says the path branch stays; the repository has
forty-five local branches (`path/`, `register/`, `integrate/`, `plan/`,
`repair/`, `pr/32-merge`) and the forge keeps every one because
`delete_branch_on_merge` is off. The specification's reason to keep `path/*`
is checkpoint reachability, which the trunk merge commit already guarantees
on a `forbidden` host. `register/` and `integrate/` branches carry nothing
the trunk does not. A one-line rule is enough: `path/*` stays until the path
is archived; transport branches are deleted on merge.

### → Modules more role → split into main components?

**Reading.** Crumbz has one area, `application`, matching `src/**`, and one
module note, `docs/modules/application.md`, which every path since CP-001
appends to. The note now restates each step's outcome under "Current State"
and CP-016 had to preface a whole era of it. The kit's `areas:` already
supports several match patterns with one note each; nothing in the skill
says when to split. A trigger — an area whose note is touched by every path,
or whose match covers every source file — would say "split", and the open
skill could ask the writer which area the path's `writes:` fall in.

## Sources

- The owner's two notebook pages photographed on 2026-09-06, transcribed
  verbatim; the owner's words are the quoted lines.
- `sinlalune/crumbz` at trunk `358bb17`: `docs/inputs/`, `docs/index.md`,
  `docs/architecture/index.md`, `docs/concepts/`, `docs/modules/application.md`,
  `AGENTS.md`, `project/coding-paths/binding.md`; the branch list and the
  repository merge settings; read 2026-09-06.
- The Cairn 1.0.0 kit at `e26f19d`: `spec/concepts/`, the brainstorm and
  close skills, the conformance page's weight budget.
