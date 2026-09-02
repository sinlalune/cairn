---
type: Cairn Specification
title: Cairn — the specification
description: The lightest document-driven coding protocol, written on the six stages of its chronology — idea, research, vision, roadmap, coding cycle, learning loop — with the coding cycle as the one stage a checker enforces.
tags: [cairn, specification, protocol, chronology, coding-path, git, ci]
timestamp: 2026-09-02T00:00:00Z
cairn:
  article: specification
  kind: specification
  status: draft
  version: 1.0
---

# Cairn

Cairn is a coding protocol kept entirely inside a
[Git repository](./concepts/repository.md). It is for one developer with
several coding agents as much as for a team, and it makes one promise: nothing
that matters lives only in a conversation. An idea, a piece of research, a
decision, a plan, a unit of work and its acceptance are all files, and every
file can be read cold by whoever comes next.

The [manifesto](https://github.com/sinlalune/cairn/blob/main/docs/cairn/manifesto.md) states what the protocol is for.
This page states what the protocol is. It is written on the manifesto's
**chronology**, in six chapters, one per stage:

```text
1 Idea and ideation     brainstorm notes: verbatim, dated, provisional
2 Research              research notes and sources: what was read, what it means
3 Vision and specs      architecture pages and decision records: reviewed promotion
4 Roadmap               milestones and the paths that deliver them
5 Coding cycle          the path record, its units, its candidate, its integration
6 Learning loop         the concept wiki, learning notes, and research during the work
```

The first four stages need few rules and light shapes: a note, a page, a row.
The fifth is where a protocol earns its name, and it is the one stage the
reference checker enforces. The sixth is what makes the other five teachable.

## How to read this page

Every specialised word links to one article in the
[concept wiki](./concepts/index.md), which separates the vocabulary Cairn
borrows from [Git](./concepts/git.md) and ordinary practice from the concepts
Cairn defines. Read a borrowed term only if it is new to you. Read a Cairn
concept when this page uses it and you cannot proceed.

The [reference](./reference/index.md) holds exact shapes: templates, schemas,
command sequences, and the [conformance page](./reference/conformance.md) that
says, rule by rule, what the reference tools check and what they only state.
Concept and reference pages explain this one; they never add a requirement.

The key words **MUST**, **MUST NOT**, **SHOULD** and **MAY** carry their usual
force: required, forbidden, the default with any departure recorded, optional.
A requirement is protocol whether or not a tool enforces it; a claim that a tool
enforces it is made only where one does.

Cairn sits beside spec-driven toolkits rather than against them. A path may
reference a specification produced by any of them; Cairn adds the durable
execution memory and the exact-candidate closure they do not keep.

## 1. Idea and ideation

You get an idea. Instead of coding it, you write it down and sit on it.

A **brainstorm note** is the record of one ideation session. It is kept
verbatim, dated, and marked provisional:

```yaml
---
type: Cairn Brainstorm
title: Offline sync — first pass
timestamp: 2026-03-04T00:00:00Z
cairn:
  status: provisional
---
```

The note lives in the project plane's brainstorm space — the role Cairn calls
`project/brainstorm/` — one file per session. It says what was thought,
including what was rejected and why, in the order it happened.

Three rules, all of them about honesty rather than form:

- A brainstorm note is **never edited after its session**. A later thought is a
  later note. Editing the record of a session is how a team comes to remember
  deciding something it did not decide.
- A brainstorm note is **never authority**. Nothing cites it as the reason a
  thing is built; chapter 3 is where an idea becomes a reason.
- A brainstorm note **SHOULD name what it is waiting for**: a question research
  would answer, a constraint nobody has checked, a person to ask. That line is
  what turns sitting on an idea into the next stage.

The reference tools check nothing about a brainstorm note beyond its links and
its [frontmatter](./concepts/frontmatter.md). That is deliberate: the stage
where a rule would cost the most and catch the least is this one.

## 2. Research

Through research you refine the vision. Research is reading, trying and asking,
and its product is a **research note**: what was read, where it came from, and
what it means for the idea.

A research note separates three things a reader needs separately:

1. **the sources** — a URL, a paper, a repository at a commit, a conversation
   with a named person, each pinned precisely enough to be found again;
2. **the summary** — what each source says, in the note's own words, short;
3. **the conclusion** — what this changes about the vision, and what it does
   not settle.

Sources that are worth keeping whole are imported into the project plane's
sources space — `project/sources/` — one record per source, so a link keeps
resolving when the internet does not.

A research note is provisional like a brainstorm note, dated like one, and
promoted the same way. Research does not stop when coding starts: an idea that
arrives mid-project is researched and documented in exactly this shape so the
next cycle can reference it (chapter 6).

## 3. Vision and specifications

From the vision you design a minimum product and write its specification:
features, architecture, workflow, interfaces, contracts. These are the documents
every coding cycle will be built around, so this is the stage where a provisional
note becomes an accepted page.

Cairn borrows the two shapes software teams already keep. An
[architecture page](./concepts/architecture.md) states boundaries,
responsibilities, constraints and major flows; a specification document of any
kind — a feature, an interface, a contract — is an architecture page about that
kind of thing. A [decision record](./concepts/decision-record.md) states one
choice, its alternatives and its consequences.

**Promotion** is the one ceremony of this stage. A brainstorm or research note
becomes vision through one reviewed [work unit](./concepts/work-unit.md) that:

- adds or amends the architecture page the note argued for;
- adds the decision record for any choice the page now makes;
- links the page back to the notes it came from, as *promoted from*;
- leaves the notes exactly as they were.

A page is reviewed before it is accepted, and the review is the pull request
that lands it (chapter 5 says why a pull request). Architecture that changes
without a decision record is reported as drift by the checker's advisory
`decision-drift`; the [schema](./concepts/schema.md) of every decision record
is checked.

The vision is not fixed. The protocol's job is to invite you to challenge it by
iteration, and the shape of a challenge is a new decision record that
supersedes an earlier one and an architecture page amended to match. Nothing is
rewritten in place to look as if it had always been so.

## 4. Roadmap

From the specification you choose the roadmap to the minimum product: an
ordered set of **milestones**, each a state the product reaches, each delivered
by one or more [coding paths](./concepts/coding-path.md).

The roadmap is a **register**, one row per milestone, kept in the coding-paths
index of the project plane:

| Milestone | Outcome | Paths | State |
| :-- | :-- | :-- | :-- |
| M1 — a user can sign in | sessions, credentials, the login screen | CP-AUTH-001, CP-UI-002 | running |
| M2 — a user can sync offline | conflict-free replication | *no path yet* | planned |

Every milestone is accounted for: it has a path, or it says it does not yet.
That sentence is the whole rule, and it is what keeps a roadmap from being a
list of wishes.

Paths are born from the roadmap in the `draft` state of the
[lifecycle](./concepts/lifecycle.md): a [path record](./concepts/path-record.md)
complete enough to review, not yet accepted. A path that must wait for another
says so in its declaration:

```yaml
depends_on: [CP-AUTH-001]
```

The generated [live view](./concepts/live-view.md) reads that field and shows
which registered paths are **unblocked** — every path they depend on is done —
so the next piece of work is a fact the repository computes, not a judgement
someone repeats in every planning conversation. A graph beyond that one edge is
a database beside the repository, and Cairn does not keep one.

## 5. Coding cycle

From the roadmap, each coding cycle is built around the documents that precede
it. This chapter is the protocol that governs one cycle: one bounded change
becoming one durable **coding path**, from accepted intent to integrated result.
It is the stage the reference tools enforce, and every requirement here appears
on the [conformance page](./reference/conformance.md) with its enforcement
status.

### The thesis

A [commit](./concepts/commit.md) is a snapshot with an
[object id](./concepts/commit-hash.md) that identifies it and its history. Cairn
uses commits, [branches](./concepts/branch.md) and files as
[project memory](./concepts/project-memory.md): anyone who can read the
[repository](./concepts/repository.md) can answer, at any time:

1. which pieces of work are active;
2. what each is meant to produce;
3. who or what may write each now;
4. what has been completed, checked, accepted or blocked;
5. which exact remote state another participant can resume from;
6. which exact result is being proposed for integration.

The answers MUST live in repository files and Git history. A chat, a local
process, a private note or an unpushed checkout MAY help current work and MUST
NOT be the only place a completed decision, checkpoint or next action exists.
Where a later rule would leave important state only in a working tree, the rule
is wrong, not the thesis.

### One bounded change, one path

A coding path is one bounded outcome and its durable route to integration. It
has one stable identifier, one record, one branch, one
[worktree](./concepts/worktree.md), and one assigned writer at a time:

```text
CP-EXAMPLE-001                      the identifier
project/coding-paths/CP-EXAMPLE-001/ the record, a folder
path/cp-example-001                 the branch, derived mechanically
```

The invariant is structural, not personal: one path maps to one record, one
branch and one writable worktree, and one writer is assigned to that worktree at
a time. Roles — initiator, writer, reviewer, integrator — are responsibilities
one person or agent may hold several of; the [roles](./concepts/roles.md)
article says what each owes and why a collapse of roles is recorded rather than
forbidden. [Writer assignment](./concepts/writer-assignment.md) is a team
responsibility, not a lock: a Git worktree isolates files and establishes no
ownership.

#### The record

A path record is a folder, born as one:

```text
project/coding-paths/CP-<ID>/
  index.md      declaration · opening acceptance · step index · resume section
  plan.md       the forward plan, optional, read when planning
  steps/S<NN>.md one self-contained record per executed step
```

Nothing else exists per path: no separate brief, session file, audit file or
folder log. The one file written outside the folder is the
[journal](./concepts/journal.md) entry integration adds. A step file is written
where it lives and is readable alone; the step-index line in `index.md` MUST let
a reader decide whether to open it. There is no rollup and no summary on move.

The declaration is the record's [frontmatter](./concepts/frontmatter.md),
validated against an exact [schema](./concepts/schema.md):

```yaml
cairn:
  id: CP-EXAMPLE-001
  route: lightweight
  status: running
  current_step: S02
  base_commit: 0123456789abcdef0123456789abcdef01234567
  branch: path/cp-example-001
  assigned_writer: participant-id
  depends_on: []
  writes:
    - src/example/**
    - docs/modules/example.md
  governs:
    - docs/architecture/example.md@89ab89ab89ab89ab89ab89ab89ab89ab89ab89ab
```

The body states the outcome, the definition of done, the documents to read and
the ones deliberately excluded, the step index, and the resume section. The full
copy-ready form is the [path template](./reference/path-template.md).

#### Two declared surfaces

`writes:` is the [declared write surface](./concepts/declared-write-surface.md):
the paths this work expects to change. `governs:` is the declared read surface:
the documents this work is bound by, each pinned as `path@<object-id>` where the
id is the document's own blob id — the id of that exact content, which changes
when and only when the document does:

```bash
git rev-parse HEAD:docs/architecture/example.md    # the id to write after @
git show 89ab89ab89ab89ab89ab89ab89ab89ab89ab89ab   # the document, as pinned
```

Neither surface is a lock. A path that discovers a wider change continues, and
in the same work unit widens `writes:` and says why in the step. Writing outside
the declaration without that update blocks (`scope-drift`): both surfaces feed
the drift predicate at closing, and a surface that no longer describes the work
weakens every answer computed from it.

#### The route

Every path declares a [route](./concepts/route.md): the ceremony it runs at.

- **[`lightweight`](./concepts/lightweight-path.md)**, the default: the shape above, nothing more. Opening
  acceptance inline, steps, a pull request at the end. A protocol that demands
  nine artefacts for a one-line fix teaches people to route around it.
- **`full`**: the same shape with two additions — the pull request's review
  answers the coherence questions explicitly, and a control-plane change needs
  an approval that is not the writer's own. It is required when the path changes
  the [control plane](./concepts/control-plane.md), changes architecture or a
  decision record, writes across more than one implemented area, spans more
  than one work unit, or is designated high-risk by repository policy. A path
  whose work is documents only — the promotion unit of chapter 3, a roadmap —
  runs `full` with a documents-only write surface.

Escalation is one-way. A lightweight path that meets a trigger escalates before
its next checkpoint and records why; a path never declares itself down a route,
because a change does not become small by being called small. The first three
triggers are derived from the declaration; the multi-unit trigger is caught when
the second unit appears; the policy trigger is honoured, not checked.

### Open the path

A path becomes shared work through
[opening acceptance](./concepts/opening-acceptance.md) and then
[trunk registration](./concepts/trunk-registration.md).

**Opening acceptance** is recorded inside `index.md`, under its own heading, by
an authorised participant, with the roles that participant held:

```yaml
decision: accepted
accepted_by: participant-id
accepted_roles: [initiator, reviewer]
accepted_at: 2026-01-15T09:00:00Z
scope_ref: project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
scope_digest: sha256:9f2c4b1d…
```

`scope_ref` is a pointer and pointers move, so the record also carries a
[scope digest](./concepts/scope-digest.md): a full digest of the exact text the
definition of done resolves to at registration. Closing recomputes it. If the
digests differ, the definition of done moved after it was accepted, and closing
MUST NOT proceed on the original acceptance: the path restores the text or
records a scope amendment — a new acceptance naming the one it supersedes.

**Registration** makes the path visible before implementation becomes private
to a branch:

1. fetch the current [trunk](./concepts/trunk.md) and require a clean checkout;
2. record its exact tip as `base_commit`;
3. set `status: running` and regenerate the live view;
4. land one metadata-only registration commit whose parent is that tip, through
   the repository's declared transport;
5. only then create `path/<id>` and its worktree from it, and push the branch.

The path MUST exist on the remote trunk before implementation begins. That is
the one rule with no native equivalent, and it is what makes the live view
complete without anyone maintaining it.

### Advance one work unit at a time

A [work unit](./concepts/work-unit.md) is the smallest completed change Cairn
recognises, and it has four movements, in order:

```text
plan          what this unit will change, and what it deliberately will not
change        the implementation or protocol artefact, with its tests
self-review   read the diff as a reviewer would; what would you refuse?
verify        run every relevant gate bare, and record each verdict
```

The plan and the self-review are short sections of the step record, not files.
The stance a writer takes during *change* — does this need to exist, does the
codebase already have it, what is the least code — is the protocol's coding
skill, `cairn-code`, and a skill rather than a rule: a checker cannot judge
simplicity, and pretending it can is how rules multiply.

Every unit declares a **type**, and the type fixes which parts move together:

| Type | Parts that MUST move together |
| :-- | :-- |
| `implementation` | source, its tests, the affected [module note](./concepts/module-note.md), the step |
| `documentation` | the documents and their indexes, the step |
| `decision` | the decision record, every document it amends, the step |
| `repair` | the corrective change, any superseding record owed, a step naming the violation |
| `closure` | only the administrative closure surface |

Every unit ends with a step record carrying a fenced `cairn-unit` block —
step, [ledger](./concepts/work-ledger.md) ordinal, type, and what verified it
— and a refreshed resume section in `index.md`:

````text
```cairn-unit
step: S02
unit: 07
type: implementation
verified: cairn-check, test, build
```
````

`unit` is an ordinal, not an object id, because the commit a unit produces does
not exist while the unit is being written. Source changed without its tests, its
documents and its step is not a completed unit.

#### Check before calling it complete

A [test](./concepts/test.md) is an executable example. A process
[exit code](./concepts/exit-code.md) is zero for success. Gates MUST be run so
that their exit code remains the verdict: never through a pipeline whose last
command hides it. On a path branch the checker compares the branch with the
trunk, because that is what integration will judge; a narrower comparison MAY be
chosen explicitly and MUST announce itself in the run's own output.

Every completed unit MUST become one coherent commit, pushed immediately to its
[remote](./concepts/remote.md) path branch. Only then is it a
[remote checkpoint](./concepts/remote-checkpoint.md): a state anyone authorised
can [fetch](./concepts/fetch-and-push.md), read and continue from.
"Implemented locally" and "completed" are not synonyms.

Work that is not yet a completed unit — mid-refactor, failing, waiting for
someone to try it — MUST NOT be left only in a working tree. It is pushed as a
[provisional commit](./concepts/provisional-commit.md) carrying the trailer
`Cairn-Provisional: <reason>`. It is durable and it is not a checkpoint: it is
never named as a resume point and never proposed as a candidate.

#### Never rewrite what was published

A published path branch is never rewritten: no [rebase](./concepts/rebase.md),
no amend, no fold, no force-push. Every commit keeps the id it was verified as,
so the branch itself keeps every checkpoint reachable, and after integration the
trunk keeps them permanently. A current base is reached by
[merging](./concepts/merge.md) the trunk in. The checker reports a rewritten
published commit as `path-history`.

A host that insists on rewriting may declare `pathHistoryPolicy: retained` and
carry the [checkpoint retention](./concepts/checkpoint-retention.md) namespace
that makes rewriting safe. It is a plugin for that host, not part of the
default shape, and nothing in this page depends on it.

#### The resume section is a contract

The resume section of `index.md` is what a participant arriving cold reads
first, and for the first minutes the only thing. It owes the last link exactly.
A reader holding the bootloader, the record and the repository at the named
checkpoint — with no conversation and no memory of how the path reached here —
MUST be able to state:

1. the outcome this path is for;
2. the exact commit to resume from;
3. the single next action;
4. what the path may write;
5. what it must read, and at which object id;
6. what is blocking, if anything;
7. what has been tried and rejected;
8. the commands that verify the checkpoint.

Each answer is present in the section, or in a record it names at an exact id.
An answer that survives only in a conversation is unanswerable, the section has
failed, and refreshing it is part of the next unit. The section points rather
than retells: ids, commands, filenames, one paragraph per heading. The
[handoff](./concepts/handoff.md) article carries the contract in full and the
cold-resume trial that measures it.

### Work beside other paths

Several paths run at once. Registration and integration are ordered because
they change the trunk; everything between them is parallel.

- each path edits its own record; shared summaries are generated;
- the live view MUST include every `running`, `blocked` and `ready` path, MUST
  NOT be hand-edited, and shows which paths are unblocked;
- overlap is visible through `writes:` and is a signal, not a lock; a Git
  [conflict](./concepts/conflict.md) is decided at the latest checkpoints, with
  one writer per worktree preserved;
- every live path retains its branch and base, and its remote branch retains
  its latest checkpoint.

### Separate evidence from judgement

The [checker](./concepts/roles.md) proves facts: a file matches a schema, an id
is unique, one commit is an ancestor of another, a command returned zero, a
record was not rewritten, a diff stayed inside a surface. People and agents
judge: whether the outcome is right, whether an explanation is coherent, whether
a limitation is acceptable.

A [finding](./concepts/finding.md) is one of three: **blocking**, a required
predicate disproved; **advisory**, a risk that needs a disposition; or
**inconclusive**, a required input unavailable. For the critical gates —
registration, ancestry, transition, candidate binding, integrity — both
blocking and inconclusive return non-zero. Missing evidence is never success.
[Continuous integration](./concepts/continuous-integration.md) repeats the same
checks in a clean environment, and a local run MUST reach the same verdict as CI
on the same tree.

### Close one exact candidate

Closure is about an immutable identity, not whatever is at `HEAD` later. The
[implementation candidate](./concepts/implementation-candidate.md) is the exact
commit `C` proposed as the result, and every record about closing names it by
full, unabbreviated object id.

1. Fetch the trunk, record its tip as `T`, and merge it into the branch.
2. Push `C`; run product checks and the checker against exactly `C`.
3. Open the **pull request** from the path branch to the trunk. Its description
   is the [coherence audit](./concepts/coherence-audit.md): the candidate read
   against the documents pinned in `governs:` and against the paths running
   beside it, answered as a checklist. Every advisory raised at `C` is listed
   with a disposition — fixed, accepted, or deferred to a named owner and
   follow-up.
4. An authorised reviewer's approval is the
   [closing acceptance](./concepts/closing-acceptance.md). It binds three
   things: the result, `C`; the scope, whose digest MUST equal the opening
   digest; and the base, `T` — the merge-base of the branch and the trunk,
   which is where step 1 left it.
5. One [administrative closure](./concepts/administrative-closure.md) commit
   sets `status: ready` and `subject_commit: C`, and changes nothing else: not
   the definition of done, not the surfaces, not the plan, not the product. The
   final protocol check runs on it.

If implementation changes after `C` — even to resolve a conflict — `C` is no
longer the candidate. The path returns to `running`, produces a new one, and
the review is repeated on it.

A repository without a forge declares `manual-git` as its
[integration transport](./concepts/integration-transport.md) and writes the
same checklist and acceptance as a closing record in the path folder. The
questions do not change; only where the answers are written does.

#### Decide drift by predicate, not equality

Between acceptance and integration the trunk moves from `T` to some `T'`.
Requiring `T' == T` is a livelock: every landing invalidates every other open
acceptance, and busy repositories never close. The narrower question is the
right one.

> An acceptance remains valid while the trunk delta from `T` to `T'` touches no
> file matched by the union of the path's `writes:` and `governs:`.

If it touches either, the acceptance is invalidated: the path returns to
`running`, merges `T'` in, produces a new candidate and is reviewed again. Two
paths on disjoint surfaces never invalidate each other. Path matching is a proxy
for semantic overlap and is stated as one; the product checks at integration
catch what it misses. The [acceptance-drift](./concepts/acceptance-drift.md)
article gives the predicate in full.

#### Integrate without claiming the future

`ready` and `done` name different facts: `ready`, the exact candidate is
checked and accepted; `done`, it is reachable from the remote trunk. A path
branch MUST NOT set itself to `done`.

The pull request merges with `cairn-check` as its one required status check on
the exact commit that lands. The integrating unit — the trunk commit that
follows the merge, or the `--no-ff` merge itself on `manual-git` — starts from
the current trunk, contains `C` and its closure unchanged, records
`status: done` and `resolution: completed`, regenerates the live view, and
writes one journal entry — one file per integrated outcome. The merged commit is fetched back and
proved reachable from the remote trunk. Then, from another checkout, the exact
secondary worktree is removed only if it is Git-clean, never with force, never
the primary checkout; the path branch stays.

### The lifecycle is a statement of fact

```text
draft ──► running ──► ready ──► done ──► archived
             │  ▲       │  ▲
             ▼  │       ▼  │
            blocked ◄───┘  └─── (ready → running: candidate invalidated)
```

| State | Meaning | Required identity |
| :-- | :-- | :-- |
| `draft` | proposed, not registered | id |
| `running` | accepted, registered, executable | id, branch, base, writer |
| `blocked` | paused on a named condition | running identity, blocker, unblock condition |
| `ready` | exact `C` accepted, not integrated | running identity, `subject_commit` |
| `done` | `C` reachable from the remote trunk | subject and `resolution: completed` |
| `archived` | terminal, retained | `resolution: completed \| abandoned \| superseded` |

Transitions: `draft → running | archived`; `running → blocked | ready |
archived`; `blocked → running | archived`; `ready → running | blocked | done`;
`done → archived`. `ready → blocked` exists because acceptance stalls;
`blocked → ready` does not, because reaching `ready` is execution. An unchanged
state is not a transition, and a validator that sees one commit enforces
per-state invariants and single-step transitions against one comparison ref,
nothing more. The [lifecycle](./concepts/lifecycle.md) article carries every
state's invariants.

### Records are kept, not tidied

[Record integrity](./concepts/record-integrity.md) applies to step records,
journal entries and any closing record: once written, a later change MUST NOT
edit, rename or delete one. A step is append-only from the blob that added it;
a correction is a new record naming the old one. Git gives
[tamper evidence](./concepts/tamper-evidence.md) relative to a known id, not an
immutable log; where the threat is an authorised writer rewriting history, the
host's protected refs are the answer, not this page.

**Redaction** is the one sanctioned exception. Rotate the exposed credential
first; write an immutable redaction record naming the affected record, its id
before redaction and the rotation evidence, quoting nothing; replace the content
in place with `[redacted: <record>]` in a commit that touches nothing else.
Rewriting history is a separate decision and its own unit. A redaction proves
the repository no longer serves the text; it never proves the disclosure was
contained.

**Repair** is a unit like any other, `type: repair`, and it never edits history
into a cleaner shape. It leaves the violation visible in the step, and it is
never the same unit as the work that caused it.

| Violation | Repair |
| :-- | :-- |
| branch created before registration | register retroactively, `base_commit` at the real branch point |
| implementation changed after acceptance | the candidate is void; return to `running`, produce a new one |
| an immutable record was edited | add a superseding record naming both ids |
| a path branch declared `done` | return it to `ready`; `done` is a claim only the trunk can make |
| work outside `writes:` already committed | widen the declaration and say why, in the repair unit |
| a secret in an immutable record | the redaction ceremony, rotation first |

A repair SHOULD also ask why the violation was not caught, and treat the answer
as part of the repair.

### The trust boundary

Cairn assumes collaborating writers. Its checks protect against omission,
staleness, coordination error and silent loss of state; they are not a security
boundary. The [control plane](./concepts/control-plane.md) — checker,
configuration, schemas, templates, workflow — is what evaluates every change,
and a writer who can change all of it can weaken it. An
[enforcement profile](./concepts/enforcement-profile.md) says what is actually
installed:

| Profile | Establishes | Does not establish |
| :-- | :-- | :-- |
| `local` | participants can run the checks | that they ran remotely or blocked anything |
| `ci` | a runner reports the checks for declared refs | that the host required the result |
| `protected` | the host requires the check on the exact integration commit | judgement quality, or security while the control plane is unprotected |

A repository claims `protected` only with a tested exact-commit transport and
independent approval for control-plane changes. A solo developer with agents
holds every role; Cairn permits that and requires it to be visible in the
acceptance records, and such a repository does not claim a profile above
`local` on the strength of self-issued acceptances alone.

### Deliberate non-goals

- **Requiring `T' == T`.** The drift predicate replaces it.
- **Defending against an authorised writer.** Protected refs and signatures do
  that; files and predicates cannot.
- **Resolving semantic conflicts.** Cairn reports overlap and routes the
  judgement to the review.
- **A writer lease.** One writer per worktree is a team responsibility; a lease
  is infrastructure Cairn does not need.
- **Judging a judgement.** The checker proves a review exists, names the right
  object and was not rewritten. It cannot prove the reviewer was right.
- **Cross-repository paths.** A path is bounded by one trunk and one set of
  refs.
- **Enforcing initial route selection.** Escalation is required and one-way;
  the first choice is honoured.

## 6. Learning loop

The manifesto's core is a shared knowledge base of concepts, and its bet is that
semantic decomposition — one idea, one page — is the best way to learn. The
learning loop is what turns the five stages above into something a newcomer, or
an agent with a small context window, can pick up cold.

### The concept wiki, in three scopes

A **concept** is one specialised idea, written on one page from one
[template](./concepts/concept-template.md): the plain definition first, the
failure the concept prevents, how it is checked or the honest sentence that
nothing checks it. Every wiki keeps two kinds apart — vocabulary borrowed from
elsewhere, and concepts the project itself defines — because a glossary that
mixes them looks twice as large as it is and hides which half a criticism
belongs to.

There are three scopes, one shape:

| Scope | Whose vocabulary | Lives in |
| :-- | :-- | :-- |
| protocol | Cairn's own — this page's words | `spec/concepts/`, the wiki this page links |
| project | the product's domain — the words its architecture uses | the adopter's concept root, bound in configuration |
| coding | abstractions in the code that carry complexity | beside the module notes of the areas that use them |

An adopter's repository starts from the protocol wiki as a worked example and
writes its own concepts in its own root. It never writes into Cairn's. Two rules
keep a wiki honest, and the checker enforces both: a concept no page outside the
wiki links to is an orphan and blocks (`concept-orphan`) — a word nobody needed
is where vocabulary bloat begins — and a change that adds concepts is reported
so growth is a visible decision (`concept-growth`). Link, do not redefine: a
page that needs a concept links it, and the concept is written once.

### Learning notes

A **learning note** teaches a reader to build one thing, in order, by
referencing the concepts and documents it rests on rather than restating them.
It is the pedagogical layer over the module notes — the durable knowledge about
each implemented area — and it is a Cairn artefact because the manifesto asks
every written line to be effortlessly comprehensible, and comprehension is
built in sequence. Learning notes are optional; when a project keeps them, they
live in the documentation plane under a learning root and are refreshed by the
units that change what they teach.

### Research during the work

An idea that arrives during a cycle is not coded into the cycle. It is
researched and documented as chapter 2 says, in a note the next cycle can
reference, and the current path records in its step that the idea was parked
and where. The loop closes: the roadmap is revised through chapters 3 and 4, and
a new path is born from it.

### The writing rule

Every page of this specification, and every record Cairn asks a participant to
write, follows one rule: **one idea per page; the plain definition first;
examples before rules.** A step title says what the step established, not what
it was about. A resume section points, it does not retell. A concept page begins
with what the word means, not with the procedure that uses it.

## Conformance and weight

The [conformance page](./reference/conformance.md) says which of this page's
requirements the reference tools check, which they only state, and what each
check depends on. It carries the generated catalogue of implemented rules and the
generated linkage from each rule to the requirement it stands behind, so a rule
that enforces nothing stated, or a claim with no rule behind it, fails the build
rather than drifting in silence.

It also carries the **weight budget** Cairn 1.0 is measured against: this
page under 8,000 words, the required entry chain under 3,000, the installed kit
under 30 files, one lightweight unit under 6 protocol files. Those are targets
measured at release; a cap that has never bound is a count, not a constraint.

## Where to go next

- The [concept wiki](./concepts/index.md) — every word, borrowed and own.
- The [reference](./reference/index.md) — the path template, the execution
  protocol, the operations sequences, the configuration contract.
- The [manifesto](https://github.com/sinlalune/cairn/blob/main/docs/cairn/manifesto.md) — what all of this is for, and
  the threats it names: more control through more rules, a protocol that thinks
  itself finished, progress outside it ignored.
