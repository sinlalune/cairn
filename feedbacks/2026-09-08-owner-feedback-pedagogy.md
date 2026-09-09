---
type: Cairn Learning Note
title: Owner feedback — 08/09, the pedagogy
description: The owner's four notebook pages of 2026-09-08 on pedagogy, written after reading the 1.1 workflow and the coding guidelines, transcribed verbatim; each item read against the manifesto and the twenty records of 1.1; what the manifesto's pedagogy section leaves unsaid, a draft of what it could say, and the plain-language questions the owner must answer before a promotion path fuses the pedagogy with 1.1.
tags: [cairn, feedback, owner, pedagogy, learning, manifesto]
timestamp: 2026-09-08T00:00:00Z
cairn:
  status: provisional
---

# Owner feedback — 08/09, the pedagogy

Four notebook pages written by the owner on 2026-09-08, after reading the
[1.1 architecture page](../docs/architecture/01-cairn-1-1.md) and the
[coding guidelines](../project/brainstorm/2026-09-07-coding-guidelines-decisions.md)
promoted by CP-CAIRN-003. The owner's own framing: the pedagogy side is
*maybe not enough developed in the manifesto*.

The pages are transcribed as written; the owner's words are the quoted
lines. Each item is followed by a **Reading** — what the manifesto, the
specification and the records of 1.1 already say about it, and what they
do not, in the reader's words, kept apart from the owner's. The note ends
with what the manifesto's pedagogy section leaves unsaid, a draft the
owner may take or rewrite, and the questions the owner must answer, in the
shape the [1.1 decisions page](./2026-09-06-cairn-1-1-decisions.md) used.

The companion notes are the owner's
[feedback of 06/09](./2026-09-06-owner-feedback.md), whose item 4 already
carried the first sentence of this theme, and the
[convergence audit](../docs/cairn/cairn-manifesto-convergence-2026-09-02.md),
whose reading of the pedagogy section was *holds in part*.

## Page ①: "Cairn | Pedagogy | 08/09" — interactions

### Chat sessions

> — Interactions:
> → Chat sessions
> ↳ The tone and the content must be pedagogical at any time
> ↳ Especially on abstracted IT concepts like GIT or architecture design,
> system design, database, etc
> ↳ If the user asks you to explain something
> ↳ auto creation of a concept page
> ↳ Needs to be easily readable
> ↳ Structured and chronological

**Reading.** Two of the four lines have a home; two do not.

The concept page is decided. ADR-011, decision 3, promotes the owner's
ruling of 06/09: *an abstraction explained persists as a concept note*,
as one absolute rule in the bootloader, so that it reaches a chat with no
path open. Coding path 4 of the 1.1 register builds it. The folder the
note goes to is decision 2's table: `docs/concepts/cairn` for a protocol
term, `docs/concepts/<project>` for the product's, `docs/concepts/learning`
for Git, system design, databases and everything else from outside.

The tone has no home. The manifesto says every written line must be
effortlessly comprehensible, and that is the whole of what any file says
about how an agent speaks. `cairn-code` is a stance for the change
movement — read the real flow, the ladder, the three-line cap — and it
governs code, not explanation. The bootloader has six absolute rules, all
about paths. Nothing tells a session that an explanation of `rebase` to
this repository's owner is written for a reader who is learning it, or
what that means in practice. The cheapest surface is the same one ADR-011
chose: one sentence in the bootloader, beside the concept-note rule. The
fuller one is a stance for explanation in the shape of `cairn-code`: a
skill, read when a session explains, costing one file against a kit that
ADR-013 and ADR-015 already hold at the budget.

*Structured and chronological* names two shapes the specification keeps
apart. The concept template is not chronological: the plain definition
first, the failure it prevents, how it is checked. What is chronological
is the **learning note** of chapter 6 — *teaches a reader to build one
thing, in order* — which chapter 6 leaves optional, without a template,
under *a learning root* no file names. So the owner's line asks for both:
the concept note for the word, the learning note for the sequence. And a
naming collision is waiting: ADR-011 calls the third concept folder
`docs/concepts/learning`, and chapter 6 calls the ordered artefact a
*learning note*. A reader who meets both will take one for the other.

### Pull requests

> → PRs
> ↳ Pedagogical
> ↳ Synthetic
> ↳ Quick read

**Reading.** The request's description is, by design, a ledger. The
template the kit installs carries the candidate and its base as object
ids, the digest, the four coherence checkboxes, the advisories with
dispositions, the roles; `cairn-audit` prints it filled. ADR-018 adds a
line per item of the definition of done, each with the unit that advanced
it and the command or page that shows it. Every line of that is for the
checker's twin, the owner as reviewer, proving the candidate is sound.
None of it says, in plain words, what the path did and why a reader should
care. On Crumbz the owner's read of a request was once twenty seconds and
a merge once came twenty-nine seconds after the request opened
([the audit](./2026-09-06-crumbz-sixteen-paths-audit.md), item 5). A
ledger invites that.

The three adjectives fit one addition and no rule: a first section the
owner reads before the ledger, three lines in the shape `cairn-code`
already asks of every change — what it does, why it is the least, what it
does not do — followed by a link to the surface page ADR-012 makes the
path update. The ledger stays under it. The same shape serves the other
document the owner reads before acting: the path record's plan, at the
review ADR-001 decision 2 names.

### Learning sessions

> → Learning sessions
> ↳ skill
> ↳ dynamic knowledge exploration of user
> ↳ via prompting or chat
> ↳ Generate user custom learning notes through session.
> ↳ Can be initialized after being proposed during coding sessions

**Reading.** This is the largest new thing on the four pages, and the
specification has half of it. Chapter 6 says a learning note *is a Cairn
artefact because the manifesto asks every written line to be effortlessly
comprehensible, and comprehension is built in sequence*; the convergence
audit's checkbox *learning notes are a Cairn artefact, not an Atomik one*
is ticked. What no file has is the session that writes one: how it starts,
what it reads, what it produces, when it ends. The five skills are
brainstorm, open, unit, close and the coding stance; a learning session is
none of them.

The owner's shape is a procedure — explore with the user by prompting,
then write the note the user needed — and a procedure is what a skill is.
ADR-011 refused a sixth skill for concept notes because a note must be
written in *any* session, so the bootloader was the right file; a learning
session is the opposite case, a session that runs a procedure, so the
skill is the right file. The cost is one kit file against the budget
ADR-015 counts.

The last line is already a pattern the specification has. Chapter 6,
*research during the work*: an idea that arrives during a cycle is not
coded into the cycle; it is parked in the step and picked up by a later
one. A learning session proposed during a unit is the same movement with a
different artefact: the unit writes the concept note (ADR-011 d3), names
in its step that a learning session was offered on it, and the session
runs later in its own context. One sentence in the unit skill says so.

## Page ②: "Cairn | Pedagogy | 08/09" — the surface "zen"

> — the surface "zen"
> ↳ more globally what how the protocol guide the project should be also
> how the generated content that is not code helps the user (beginner or
> not) to have a fluid and slow interface that let the brain catching up
> with information without being flooded by useless and complex
> abstractions.
> ↳ It can work if information is structured and labeled correctly in
> addition to great content.
> ↳ the personas that are the center of the target is either:
> — a junior dev, eager to learn, but need a structure framed to
> transcend himself
> — a senior dev, that want to save the most time possible, step back
> and relax cause he knows we will always deliver just enough

**Reading.** The manifesto's *engagement* section says the interface must
be beginner-friendly; the *pedagogy* section says every generated line
must be effortlessly comprehensible. Two sentences, and neither says for
whom, or what comprehensible looks like. The convergence audit measured
the gap on 2026-09-02: *the prose of the specification and of this path's
records is precise but dense: step titles are aphorisms, and the records
are written as investigations. That is knowledge, and it is not
effortless.* Nothing since has changed the prose; the twenty records of
1.1 and the notes in this folder are written the same way, this one
included.

What 1.1 did give is the structure and the labels: a folder for inputs,
three concept folders with three readers in mind, a page a newcomer reads
first, a pointer to the protocol, module notes that describe now. The
*fluid and slow interface* the owner describes is what those files are
for, and ADR-012's consequence names the reading order — the surface
page, then its glossary, then, if they dig, the architecture. So the
structure half of the owner's condition is decided and the content half is
not: no file says what a page written for the junior reads like, and the
writing rule of chapter 6 — *one idea per page; the plain definition
first; examples before rules* — governs specification pages and records,
not chats and not requests.

The two personas are the sentence the manifesto lacks. They pull in
opposite directions on volume — the junior wants the explanation, the
senior wants it gone — and the owner's own page ③ resolves the pull:
*just enough* is the right information at the right moment, and
everything else is documented where a search will find it. That is one
rule for both readers: the surface says the least, and the depth is one
link below. It is the rule ADR-012 and the concept-note link already
follow for files; the manifesto could say it for every line.

## Page ③: "Cairn | Pedagogy | 08/09" — the senior developer

> — Continuing onto the "zen" surface
> ↳ about the senior dev persona!
> → … enough means the right info at the right moment
> he also knows that everything is documented so if he search he will
> found.
> (Note: deleting CP after merge is deleting logs)
> what it could mean, for few examples:
> — *(two lines struck out)*
> — being clearly asked to test.
> — being clearly prompted decisions
> — being presented an incident that he need to decide about
> — etc
> ↳ because in the end:
> → it will be clearer for junior
> → it will win the confidence of the senior
> → it will guide complete beginner.

**Reading.** Each of the three examples is a step 1.1 already names, and
none of them is yet *clearly* anything.

- *Being asked to test* is ADR-001, decision 3: the owner tries the result
  before the merge, a named step with nothing ticked for it. The close
  skill will say the step exists; nothing says how the owner learns that
  the moment has come, or what to try.
- *Being prompted decisions* is ADR-001, decision 2, the owner's review of
  the plan; and, upstream, the decisions pages of 06/09 and 07/09, which
  put thirty-four questions to the owner in one shape — what happened,
  then two or three ways to go on, each tagged by what it costs — and got
  thirty-four answers. That shape exists in two notes and in no skill.
- *Being presented an incident* is ADR-014, the post-mortem on a red run,
  written onto the request; and ADR-003's accepted race, where the owner
  records that two paths may collide. Both produce a fact; neither says
  the fact is put to the owner as a question with options.

The owner's sentence *the right info at the right moment* is a rule about
the shape of these three moments: the agent stops, and what it hands over
is short, labelled as a decision, and answerable. The decisions-page shape
is the working example, the one the owner has already used. Naming it as
the shape of every question an agent puts to the owner is one sentence in
the skills that stop for the owner — open at the plan review, close at the
try, the post-mortem tool at its output — and no rule.

The parenthesis, *deleting CP after merge is deleting logs*, is a
constraint 1.1 already keeps. ADR-006 deletes the branches a transport
made and keeps `path/<id>` until the path is archived; the path's folder,
its steps and its closing are never removed — chapter 5 makes `archived`
*terminal, retained*, and the `transition` rule refuses a declaration that
was deleted rather than archived. The journal under `project/log/` is the
one history of what a path did (ADR-010, decision 1). The senior's trust
that *if he searches he will find* rests on records, and the records stay.
What no file says is where the senior searches: the journal is the answer,
and the surface page and the pointer page could say so in one line each.

The three lines under *because in the end* are the argument for putting
this in the manifesto rather than in a skill: one rule, three readers.

## Page ④: "Cairn | Pedagogy | 08/09" — documentation

> — documentation.
> ↳ learning:
> → learning notes
> → big diagrams
> → Use cases examples.
> ↳ Onboarding: functional & technical
> → Project description
> → Architecture description
> → Component description
> → Workflow
> → *(three arrows left blank)*
> ↳ User documentation
> → User guide
> → API doc
> → *(one arrow left blank)*

**Reading.** Read against the table *what the documentation plane holds,
and where* of the 1.1 page, item by item.

| The owner's item | Where 1.1 has it | What is missing |
| :-- | :-- | :-- |
| learning notes | chapter 6, optional, *under a learning root* | a root, a template, a session that writes one; the name collides with `docs/concepts/learning` |
| big diagrams | nowhere | no page asks for one; Mermaid renders natively on the forge, so a diagram is a fenced block in a page the protocol already names, not a new file |
| use-case examples | the surface page of ADR-012 *says what the surface does and how to use it* | the words *use case* and *example* appear in no template; chapter 6's writing rule, *examples before rules*, is written for specification pages |
| project description | refused as *one product page* under Q16, in favour of one page per surface | the owner names it again, as an onboarding item above the surface pages, which Q16 did not ask about; the README the adopter writes is the nearest thing and the kit installs none |
| architecture description | `docs/architecture/`, kept from 1.0; ADR-019 adds the dependency direction in one sentence | nothing |
| component description | `docs/modules/`, one note per folder of the tree, current state only (ADR-010, ADR-019) | nothing |
| workflow | nowhere | the manifesto's chronology lists *features, architecture, workflow, interfaces, contracts* as the specification documents of a minimum product; chapter 3's promotion produces the architecture page, the records and the surface page, and no page describes how a flow runs end to end through the components |
| user guide | the surface page of ADR-012 | nothing, if the page is written as a guide and not as a description |
| API doc | nowhere | the ecosystem generates it from the code; the stance says absorb the ecosystem; a surface page for an API surface can link the generated reference, and the protocol need own nothing |

Two of the nine are decided and built by coding path 4; two are a word in
a template; three are genuinely absent — the learning root and its
session, the workflow page, the project description above the surfaces —
and two are best answered by pointing at what the forge and the ecosystem
already render.

## What the manifesto's pedagogy section leaves unsaid

The section is two sentences: a culture of sharing through pedagogy, and
every written or generated line effortlessly comprehensible. Read with the
four pages beside it, it does not say:

- **for whom** — the two readers the owner names, the junior who wants the
  frame and the senior who wants the time, and the beginner behind both;
- **at what moment** — *the right info at the right moment*: the surface
  says the least, and everything else is one link below, where a search
  finds it;
- **in which channels** — it lists documentation, chat and artefacts and
  treats them alike; the pages treat them apart: a chat explains and
  leaves a note, a request is read in a minute, a document is read in
  order;
- **what shape** — structured, labelled, chronological where the reader is
  learning a sequence; and a decision handed to the owner is a question
  with its options.

The verbatim original is the owner's and the source; the edited edition
follows it. What follows is a draft in the edition's register, for the
owner to take, cut or rewrite in their own words. Nothing in it is a
ruling until the original says it.

> ## The pedagogy
>
> The protocol must establish a culture of sharing through pedagogy. Every
> written line — in the documentation, in the chat sessions, in the
> artefacts; everything written or generated — must be written with the
> intention of being effortlessly comprehensible.
>
> It writes for two readers at once: the junior developer, eager to learn,
> who needs a frame to grow beyond themself; and the senior developer, who
> wants to save time, step back, and trust that the protocol delivers just
> enough. Just enough is the right information at the right moment. The
> surface says the least; everything else is documented one link below,
> where a search will find it, and nothing that was recorded is ever
> deleted.
>
> A chat explains, and what it explained persists as a concept page. A
> request is read in a minute, in plain words before its ledger. A document
> is structured, labelled, and, where the reader is learning a sequence,
> chronological. A decision handed to the owner is a question with its
> options, never a wall. What is clearer for the junior wins the confidence
> of the senior and guides the complete beginner.

## The questions

Each option carries the tag the decisions pages use: **simplest** removes
or avoids a rule; **native** uses what Git, the forge or the agent products
already do; **one sentence** is a sentence in a skill or a template, no
check; **adds a file** costs the kit one file against the budget of
ADR-015; **adds a rule** is a check, which the manifesto asks you to weigh,
not to refuse. Tick one per question. If none fits, write a line under the
question in your own words; it wins.

### P1. Where does the pedagogical tone live?

Today it is one sentence in the manifesto and nothing in any file a
session reads.

- [x] **One line in the bootloader.** *(one sentence)* Beside *an
  abstraction explained persists as a concept note*: an explanation is
  written for the reader who is learning it — the plain meaning first,
  the failure it prevents, the shortest example — and stops there.
- [ ] **A stance for explanation.** *(adds a file)* A skill in the shape
  of `cairn-code`, read when a session explains: the reader, the order,
  the length, what an explanation refuses. The bootloader points at it.
- [ ] **The manifesto only.** *(simplest, as today)*

### P2. What is a learning note, and where does it live?

Chapter 6 defines it — one build, in order — and leaves it optional under
a root no file names; ADR-011 named a concept folder `learning` for
external knowledge, which is a different thing.

- [ ] **A learning root of its own, and a template.** *(adds a file)*
  `docs/learning/` with an index, a template beside the concept template,
  and chapter 6 pointing at both; the concept folder keeps its name and
  its meaning, and the two are told apart by their templates.
- [x] **Learning notes are concept notes with an order.** *(simplest)* No
  new root; a note that teaches a sequence goes to `docs/concepts/learning`
  and links the concepts it rests on, in order. Chapter 6's paragraph
  changes to say so.
- [ ] **No learning notes.** *(simplest)* Chapter 6's paragraph goes; the
  concept wiki and the surface pages are the whole pedagogical layer.

### P3. Is a learning session a skill?

- [x] **Yes, a sixth skill.** *(adds a file)* `cairn-learn`: what it reads
  first (the concept folders, the surface page, the inputs), how it
  explores with you by prompting, what it writes (a learning note of P2,
  concept notes for every word it needed), and how it ends (the note
  linked from where the question came).
- [ ] **A sentence in the bootloader and the template of P2.** *(one
  sentence)* Any session may write a learning note when asked to teach;
  the template says what one holds; no procedure.
- [ ] **No.** *(simplest, as today)* Concept notes only.

### P4. When a coding session meets an abstraction worth teaching, what does the agent do?

ADR-011, decision 3, already writes the concept note in any session.

- [x] **Writes the note, offers the session, parks it.** *(one sentence)*
  The unit writes the concept note, says in its step that a learning
  session was offered on it, and the session runs later in its own
  context — as chapter 6 parks research that arrives during a cycle.
- [ ] **Writes the note only.** *(simplest; as ADR-011)* You ask for a
  learning session when you want one.

### P5. What does a request read like before the ledger?

The description is the checker's twin today; ADR-018 adds a line per
item of the definition of done.

- [x] **Three plain lines first, then the ledger.** *(one sentence in a
  template)* The request template opens with what the path did, why it is
  the least, what it does not do, and a link to the surface page it
  updated; `cairn-audit` prints the placeholder; the ledger follows
  unchanged. The path record's plan opens the same way.
- [ ] **The ledger only.** *(simplest, as today)* The line per item of
  ADR-018 is the plain reading.

### P6. What shape does a question to you take?

Two decisions pages put thirty-four questions to you in one shape and got
thirty-four answers; no skill names the shape.

- [ ] **The decisions-page shape, wherever an agent stops for you.** *(one
  sentence, three times)* At the plan review, at the try before the merge,
  on a red run's post-mortem and on an accepted race: what happened, then
  two or three ways to go on, each tagged by what it costs, and nothing
  else until you answer. The open and close skills and the post-mortem
  tool say so.
- [ ] **Free prose.** *(simplest, as today)*
- [x] Need to be in chat prompting, But well signaled as what it is

### P7. Is there one page above the surface pages?

Q16 refused one product page *instead of* one page per surface. This asks
about one short page *above* them.

- [x] **Yes, the README.** *(native)* The adopter's README says what the
  project is in a paragraph and lists the surface pages; promotion units
  that add a surface add its line. The kit installs nothing; the close
  skill says the README lists the surfaces.
- [ ] **Yes, `docs/index.md` is that page.** *(simplest)* The documentation
  index the kit already writes opens with the paragraph and lists the
  surface pages first. No new file.
- [ ] **No.** *(as today)* The surface pages are the entry.

### P8. Does promotion produce a workflow page?

The manifesto's chronology names *workflow* among the specification
documents of a minimum product; chapter 3 names no such output.

- [x] **Yes, one per flow that crosses components.** *(one sentence in
  chapter 3; a template)* How one thing moves end to end through the
  folders the architecture page names, with a diagram; refreshed by the
  promotion unit that changes the flow.
- [ ] **No; the architecture page carries a flow section.** *(one
  sentence in a template)* The architecture template gains a section that
  walks one flow through the components, with a diagram. No new file.
- [ ] **No.** *(simplest, as today)*

### P9. Where do the big diagrams and the use-case examples go?

- [x] **In the pages 1.1 already names.** *(one sentence, twice; native)*
  The architecture template asks for one Mermaid diagram of the components
  and the direction ADR-019 states; the surface page template asks for one
  worked example before anything else. The forge renders both.
- [ ] **Nowhere in particular.** *(simplest, as today)* A writer adds a
  diagram when it helps.

### P10. Who writes the API documentation?

- [ ] **The ecosystem, linked from the surface page.** *(native; absorb
  the ecosystem)* An API surface's page links the reference the code
  generates; the protocol owns no API page and names none.
- [ ] **A Cairn page.** *(adds a file)* The surface page of an API is the
  reference, written by hand by the promotion unit.

=> Cairn does nothing, cairn ask the agent to create and maitain an api doc

### P11. Where does the senior search?

Every record stays; nothing says where to look.

- [ ] **The journal, said in two places.** *(one sentence, twice)* The
  pointer page of ADR-013 and the documentation index say: what a path
  did is under `project/log/`, one entry per integration; what a word
  means is under `docs/concepts/`; why a thing is so is under `docs/adr/`.
- [x] **Nothing more.** *(simplest, as today)* The folders' indexes are
  the map.

### P12. Does the manifesto's pedagogy section change?

- [x] **Yes, in your words.** You rewrite the section of the verbatim
  original; the edited edition follows; the four points above are what
  the draft covers.
- [ ] **Yes, the draft as it stands.** The draft above becomes the edited
  edition's section, and the verbatim original gains the same paragraphs
  under your name.
- [ ] **No.** The two sentences stay; the pages above become records and
  skills only.

## What each answer drives

The promotion path that follows this note runs on the `full` route with a
documents-only surface, governed by this note and the manifesto at their
blob ids. It amends the 1.1 architecture page where an answer changes what
a session, a request or the documentation plane is, adds a decision record
for each answer that is new, supersedes ADR-011 only where P2 renames a
folder, and names the coding paths that build it — most likely additions
to coding paths 1 and 4 of the 1.1 register, which own the skills, the
templates, the bootloader and the kit. This note and the manifesto stay
exactly as they were; a change to the manifesto is the owner's own commit.

| Question | If the first option | If the second | If the third |
| :-- | :-- | :-- | :-- |
| P1 | one line in `AGENTS.md` as the kit writes it | a skill, the bootloader pointing at it, one kit file | nothing |
| P2 | `docs/learning/` installed, a template under `spec/reference/`, chapter 6 | one paragraph of chapter 6 | one paragraph removed |
| P3 | a skill, one kit file | one line in the bootloader | nothing |
| P4 | one sentence in `cairn-unit` step 2 | nothing | — |
| P5 | the request template, `cairn-audit`, the path template's plan | nothing | — |
| P6 | one sentence in `cairn-open`, `cairn-close`, and the post-mortem output | nothing | — |
| P7 | one sentence in `cairn-close` | the documentation index the kit writes | nothing |
| P8 | chapter 3, a template | the architecture template | nothing |
| P9 | the architecture and surface page templates | nothing | — |
| P10 | one sentence in chapter 3 | a template | — |
| P11 | the pointer page, the documentation index | nothing | — |
| P12 | the owner's commit, then the edition | the edition and the original | nothing |

## What this note is waiting for

Your ticks, and for P12 your own words. Then the promotion path.

## Sources

- The owner's four notebook pages photographed on 2026-09-08, transcribed
  verbatim; the owner's words are the quoted lines.
- This repository at trunk `86fc5e8` (PR #10 merged, 2026-09-07):
  `manifesto.md` and `docs/cairn/manifesto.md`; `spec/index.md` chapters 3,
  5 and 6; `spec/concepts/concept-template.md`;
  `.github/pull_request_template.md`; `skills/cairn-code/SKILL.md` and
  `skills/cairn-close/SKILL.md`; `docs/architecture/01-cairn-1-1.md`;
  ADR-001, ADR-003, ADR-006, ADR-010 to ADR-015, ADR-018, ADR-019;
  `project/coding-paths/index.md`; read 2026-09-09.
- The convergence audit of 2026-09-02, section *the pedagogy*.
- The owner's feedback of 06/09, item 4, and the audit of the same day,
  item 5.
