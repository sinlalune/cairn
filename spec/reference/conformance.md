---
type: Cairn Reference
title: Conformance
description: Which requirements of the specification the reference tools check, which they only state, and what each check depends on — with the generated rule catalogue, the generated rule-to-requirement linkage, and the weight budget Cairn 1.0 is measured against.
tags: [cairn, reference, conformance, enforcement, weight]
timestamp: 2026-09-02T00:00:00Z
---

# Conformance

[Conformance](../concepts/conformance.md) distinguishes the protocol from one
implementation. A requirement can be protocol before the reference tools
implement it, but its status must be visible: here, beside the claim, not in a
document a reader may never open.

This page has three parts. The **matrix** is a human judgement, row by row, of
what the reference tools implement. The **linkage** and the **catalogue** are
generated from the checker's source by `cairn-rules`, so a rule that stands
behind no stated requirement, a requirement row that names no rule, or a
catalogue that lists a rule the checker does not implement fails the build
rather than drifting in silence.

## The weight budget

Cairn 1.0 is cut to a stated budget, measured at release and recorded here.
The targets are the convergence record's, section 4; a cap that has never
bound is a count, not a constraint.

| Surface | Target | Measured at 1.0.0 |
| :-- | --: | --: |
| `spec/index.md` | under 8,000 words | **5,630 words** |
| the required entry chain — bootloader, path convention, binding, execution protocol | under 3,000 words | **2,895 words** |
| files the kit installs | under 30 | **26 and the lock** on the `ci` profile, 25 on `local` |
| protocol files one lightweight unit writes | under 6 | **2** — the step record and the record's resume section; a whole lifecycle from registration to `done` touches 4 on `pull-request` transport and 5 on `manual-git`, measured by `tools/cairn-pilot.mjs` |

Every target bound. The numbers are counted by the tools and the pilot, not
estimated; a release that moves one of them past its target has to say so here.

## Where the matrix stands

The matrix is written against the 1.0 [specification](../index.md), row by
row on chapter 5 with one row each for the stages the tools touch, at release
**1.0.0**: thirty-nine rule names became twenty-four — nineteen that block
and five that only report — and every blocking rule has an adversarial
fixture. The catalogue below has moved since that release as the records of
1.1 are implemented; the rows say what each rule carries today. At 1.0.0 the
matrix stood at the **one-folder record**, and with **pull-request transport** as
the default: the request's description is the review and its approval the
acceptance, and the checker proves what Git holds; on `manual-git` the same
review and acceptance are one closing record in the path folder, which the
checker reads. The tools now read only shapes the specification states.

Read a row's second column as *what one implementation checks today* and its
third as *what that check depends on, or cannot prove*. "Implemented" never
means a judgement was scored; it means a fact was read.

**What a range may be read as evidence of.** Where the host forbids rewriting,
a branch reaches a current base by merging the trunk in, so the range from a
path's base to its candidate always carries other paths' completed units. **A
rule over that range reads only this path's own records as evidence about this
path** (ADR-004 decision 3). The changed-file rules get it from the comparison
they already use — the merge-base with the trunk, which advances with every
merge, so what arrived through one is behind the range and never in it. That is
a property of the base a run RESOLVES, which on a path branch is the trunk: a
run told by `--base` to compare against something behind the merge reads the
other path's records as this change's, which is why there is no narrower
default and why the header names the base of every run. A rule over a PINNED
range, which no base resolution corrects, excludes the trunk's own commits and
says so in its enforcing logic; `provisional` is the one, and it was the one
the first adopter's candidate was refused by.

## Current conformance

| Requirement | Reference tools | Depends on, or does not prove |
| :-- | :-- | :-- |
| One path: one record, one branch, one worktree, one writer | **implemented**; `branch-path` refuses a `path/*` branch that no `running`, `blocked` or `ready` record declares, a record without a pinned base, and — fail closed — a detached checkout whose branch cannot be named while guarded source changed; `writes-overlap` reports, as an advisory, two live paths whose declared surfaces meet with neither declaring `depends_on` the other | writer exclusivity is operational: a Git worktree isolates files and establishes no ownership, and `writes-overlap` compares declarations rather than the files two paths will actually touch — whether a race is acceptable is the owner's call, which is why it reports rather than blocks |
| Registration on the remote trunk before implementation | **implemented**; `registration` requires the declaration tuple (id, `running`, branch, base) on the trunk in either record shape, `registration-base` requires `base_commit` to be the parent of the registration commit — the commit reachable from the trunk in which the record became `running`, in either record shape, so a record landed as a `draft` and activated later is judged against the activation and not against the draft, and one activated through a request is judged against what its registrant could pin — and both are inconclusive without a complete trunk ref | the trunk ref must be fetched; a path listed in `migration.unregisteredPaths` is advisory |
| The path record, its declaration and its opening acceptance | **implemented**; `schema` validates the declaration against the vocabulary, refuses two records sharing an id or a branch, requires `depends_on:` to name known paths and never the path itself, validates every decision record's frontmatter, and refuses a `running` record in the change whose `## Opening acceptance` block is missing or lacks a decision, an actor, a UTC time, a scope reference or a digest | `accepted_roles` is recorded, not validated, and the actor's authority is the host's to prove; the digest taken at opening is compared at closing; a scope amendment is the last block under the heading |
| Two declared surfaces, widened in the same unit | **implemented**; `scope-drift` blocks a change outside `writes:` unless the declaration moved in the same change, and exempts the records the lifecycle itself writes | path matching is a proxy for semantic overlap, as the specification states |
| The route, its triggers and one-way escalation | **partially implemented**; `route` requires `lightweight` or `full`, blocks a `lightweight` path that meets a structural trigger — control plane, decision plane, two implemented areas — or has already spanned two units, and refuses a descent from `full`; the lightweight shape — opening inline, the resume section, the review as the request or as one closing record — is the shape on both routes | the policy trigger is honoured, not checked; the multi-unit trigger is caught one unit late; `full`'s two additions — the coherence questions answered explicitly, an approval that is not the writer's own on control-plane work — are the reviewer's and the forge's, not predicates |
| A typed work unit, coherent in one commit | **partially implemented**; `work-unit` requires a `cairn-unit` block for the record's current step with a known type, requires a running record that has completed a unit to name a full object id in its resume checkpoint, and blocks source that changed without a module note and the path record in the same change; the area-precise note is advisory | the type does not key the required parts: on the branch-versus-trunk comparison the changed set is cumulative across every unit on the branch, so keying on the current unit's type would be unsound |
| Every completed unit pushed as a remote checkpoint | **implemented, advisory**; `remote-checkpoint` reports a path branch tip that its upstream does not contain, or a branch with neither an upstream nor a remote-tracking ref; the branch's tip is read from the local ref, else `HEAD` when the checkout is detached — the request head, which is what the installed workflow produces on every `pull_request` event — else the remote-tracking ref, and the upstream is the branch's own rather than the checkout's, so a detached request head is judged rather than skipped and a branch is never compared with the wrong ref | reads local remote-tracking refs and performs no network operation; it can identify a current missing checkpoint, never prove the timing of older pushes |
| Provisional commits never in a candidate | **implemented**; `provisional` blocks a ready path whose base-to-candidate range still carries a `Cairn-Provisional:` commit OF THIS PATH that no later commit of this path has resolved — resolution being a later commit publishing a valid `cairn-unit` block for a step the record did not carry before it, and nothing else (ADR-004 decision 6, repair 006) — and reports a provisional HEAD | the fold itself is not verified to preserve content; where rewriting is forbidden there is no fold, so what the rule reads is the supersession the history already holds, and a draft that was finished without its own step record is still refused |
| A published path branch is never rewritten | **implemented** where `pathHistoryPolicy` is `forbidden`; `path-history` blocks when the branch's own upstream is no longer an ancestor of that branch's tip, both resolved for the named branch rather than for the checkout | it proves only that THIS checkout has not rewritten what it published, and only while a remote-tracking ref exists; a `retained` host's retention namespace is not read by the reference checker — retention is the plugin that host supplies |
| The branch contains the trunk tip before it merges | **implemented**; `rebase` — the id is historical, the requirement is containment — blocks a path branch that does not contain the trunk tip and is inconclusive when the trunk cannot be resolved; the remedy it prints is to merge the trunk in | the trunk ref must be fetched |
| One invocation, one verdict: local and CI agree on one tree | **implemented**; on a path branch the base is the trunk, there is no narrower form, and three fixtures assert both invocations reach one verdict on one real tree; the branch is read from the host only for the repository the host checked out | a host that wires its CI to a different command is outside what this can observe |
| The live view is generated and complete | **implemented**; `derived-view` blocks when the view differs from what its generator produces now, in every context; the generator marks each live path unblocked, or names the paths it waits on, from `depends_on:` against the whole corpus | a dependency in any state but `done` or archived-completed is waited on |
| Closing acceptance binds the candidate, the scope and the base | **implemented, transport by transport**; since ADR-002 decision 1 `scope-digest` is judged for every path record the run's own comparison sees changed, whatever its status, so a box ticked at a unit, or inside an integrating commit as it is made, is caught like one ticked at `ready`; on both, `acceptance` requires a ready path's candidate to be an ancestor followed by exactly one administrative commit that changes nothing outside the closure surface and moves no field but status and subject — compared against the record at `C` — and a done path's candidate to be reachable; `scope-digest` requires the definition of done to digest to what the opening acceptance accepted. On `manual-git` `acceptance` additionally requires the closing record `closing-<C>.md` in the path folder, naming exactly `C` with actor, time, decision, scope and digest, a verdict from the vocabulary and at least one answered question, dispositions covering exactly the advisories attested at `C`, and reports a self-issued acceptance | on `pull-request` the request's description and approval are the record, kept by the forge: who approved, what they answered and how advisories were disposed are not read by the checker; whether the forge required the approval and refused a squash is the enforcement profile's claim. The reviewer's judgement is never scored on either transport. `scope-digest` reads the run's comparison, and off a path branch that comparison is the working tree unless a base is given: a tick inside an integrating commit is caught as the commit is made, and a later trunk run given no base does not re-read it |
| Acceptance drift decided by predicate, not trunk equality | **implemented**; `acceptance-drift` blocks a ready path when the trunk delta since the base the candidate was read against — the merge-base of the branch and the trunk, derived rather than declared — touches the union of `writes:` and `governs:`, never on trunk equality; on `pull-request` the request's own check runs it | path matching is a proxy for semantic overlap |
| The lifecycle is a statement of fact | **implemented**; `transition` enforces single-step transitions against one comparison ref, refuses `done` on a path branch, refuses a trunk commit that takes a path from `running` to `done` with no `ready` commit behind it — read from the range's own history, because an integrating request's range holds the merge that brought that commit in — so that the integrating commit records `ready` → `done`, requires a resolution to archive and holds it terminal, and refuses a deleted declaration | inconclusive without a complete comparison ref; every other transition is judged on the two endpoints, so a record that passes through a state and out of it inside one range is read as the jump it appears to be |
| Integration records done and writes one journal entry | **implemented**; `journal-entry` blocks a record reaching `done` with no journal entry declaring its path, read from the entry's own metadata block rather than its filename, and the refusal names that key — `cairn.path` — because a message that asked for a top-level `path:` is how fifteen adopter entries came to carry both (ADR-008 decision 4); `acceptance` requires the candidate reachable, refuses an arrival carried by a merge object rather than by a commit of its own, and refuses a change that takes two paths to `done` (ADR-008 decision 2) | the merge object is visible only to a run whose comparison contains the integrating commit — the integrating request's own; a writer preparing that commit in the working tree has nothing committed to judge, and the two-path count reads the change in both contexts. That the integrating unit is the commit after the forge's merge is procedure; the closure surface is proved at `ready`, on the exact commit that lands |
| Records are kept, not tidied | **implemented**; `record-integrity` blocks an edit, rename or deletion of an event record and any change to a step record that is not an exact suffix append of its adding blob; a verbatim relocation is reported, not blocked; a mutation a later step of the same path SUPERSEDES is reported rather than refused, where that step's `cairn-unit` block carries `supersedes: <file>@<blob it replaces>..<blob it adds>` and both ids are the ones the record really has — the adding blob, followed through relocations, and the blob it carries now (ADR-004 decision 6, repair 005); committed mutations are judged against the merge-base with the trunk, the same comparison every other changed-file rule uses | the superseding-record remedy is gated for a step record on the path's own branch and stated for every other immutable record: a journal entry or closing record is still corrected by a new record nothing reads. Where a writer is TOLD to declare a supersession — the path template and the unit skill — is not yet written |
| Redaction names the record that authorised it | **implemented, advisory**; `redaction` reports a `[redacted: …]` marker naming no redaction record, code spans and fences stripped | rotation-first ordering is a procedure, not a predicate |
| A dated record carries the date of its event | **implemented, advisory**; `record-date` reports a record this change adds whose filename and `timestamp:` disagree, or whose date is more than a day from the author date of its adding commit; *this change* is the comparison the run resolves — the merge-base with the trunk on a path branch — so a record that arrived through a trunk merge is not re-read as this path's | agreement is not accuracy, and *this change* is only ever as narrow as the base: a run given a `--base` behind a trunk merge reports the records that merge brought in |
| Repair is a unit like any other | **not implemented**; `type: repair` is vocabulary the block accepts, and no predicate checks that a repair unit names its violation or leaves it visible | none proposed — repair is recorded, not gated |
| The trust boundary and the enforcement profile | **printed, not proved**; the checker prints the declared profile with every verdict, and `cairn-init` refuses to install `protected` | that the forge requires the check and the approval on the exact commit that lands, and refuses a squash, are host claims no local reader can prove |
| Architecture changes carry a decision record | **implemented, advisory**; `decision-drift` reports the architecture root changed with no decision record in the same change, and `schema` validates every decision record's frontmatter (chapter 3) | the *promoted from* links of a promotion are a convention |
| Every milestone accounted for, and the unblocked view | **partially implemented**; `depends_on:` is read, validated and projected as the unblocked view (chapter 4); the roadmap register is prose | whether every milestone has a path or says it does not is a judgement read from the register |
| Brainstorm and research notes | **links and frontmatter only, by design**; `links` and `schema` cover exactly what the specification says the tools check about them (chapters 1 and 2) | none |
| The concept wiki: an orphan blocks, growth is reported | **implemented**; `concept-orphan` blocks a concept that no document outside the wiki links, and `concept-growth` reports the articles a change adds (chapter 6) | only the protocol scope is bound here; a project's own wiki binds through `roots.concepts` |
| Every relative link in the corpus resolves | **implemented**; `links` blocks a relative Markdown link that resolves nowhere, code stripped, across the documentation plane, the project plane and the specification | none |
| An adversarial fixture per blocking rule | **implemented**; nineteen of nineteen blocking rules have a fixture that installs a real repository with `cairn-init`, proves it green, introduces exactly one violation and requires that rule among the blocking findings; coverage is declared, so a new blocking rule forces the choice | a fixture proves the rule catches *that* violation, not the class |
| Installation, update and adoption | **implemented**; the `cairn` command of the `cairn-protocol` package: `init` installs a thin kit — the reference tools, the five skills, the host files and the folder indexes, 26 files and the lock on the `ci` profile — that links the specification and the path convention at the commit it was cut from and passes its own gate on the first command; `status` tells pristine, edited and missing kit files apart by the lock's digests and says whether a newer release exists; `update` rewrites pristine kit files, restores missing ones, keeps edited ones, deletes pristine files that left the kit, migrates the configuration from schema 1, and writes the new lock; `adopt` turns a repository carrying the protocol without a lock into an installation — configuration migrated, tools and skills written, host files kept where they exist, the view regenerated, the lock written, every 0.2 shape reported and none deleted | the npm name `cairn` is another package's, so the package is `cairn-protocol` and its binary `cairn`; publishing is the release's; the tarball is stamped with the commit it was cut from by `prepack`, and the specification links pin it — a package that is not stamped links the trunk and says so; host files are the adopter's from the first install: `update` writes one only where it is missing, names it for review when its template changed, and never deletes one |
| The pilots | **greenfield pilot rerun at 1.0.0 as a command**, `tools/cairn-pilot.mjs`, and as a test in the suite: a repository the kit installs is driven from `init` to `done` on each transport, green at every gate — installed, registered, unit pushed, candidate, ready, done — with two protocol files per unit. The 0.2 pilot of 2026-09-01 wrote 24 protocol files for one unit and could not close on the first run. **Cold resume run once** at 0.2 (20 trials, 35% would act without asking) against the brief; not rerun against the resume section | the pilot simulates the forge's merge on `pull-request` transport with the local merge the integrating checkout fetches back; a second writer and a hosted remote are outside it; the cold-resume trial against the resume section is a 1.1 measurement |

The current supported claim is therefore:

> Cairn 1.0 is a local-first coordination and project-memory protocol for a
> team of trusted developers and coding agents working through remote Git
> branches, installed by one command as a kit of twenty-six files that links
> its specification. Its reference checker enforces twenty-four rules, every
> blocking one proved against a real repository, and a repository it installs
> runs from install to done at two protocol files per unit. It states what it
> does not check. It is not a general-purpose merge, governance, or security
> system.

The honest residue is named rather than hidden: **repair** has no predicate to
propose; the **resume section's answerable-alone contract** is a judgement
measured by cold resume, never claimed by a checker; the **type of a work
unit** does not key its required parts, because the merge-deciding comparison
cannot see one unit at a time; and a **`retained` host** enforces its own
retention or none. Naming what cannot be checked is part of the claim.

### Which rule stands behind which requirement

The rows above are judgements about the protocol, and prose cannot be generated
from a validator. The LINKAGE can be, and until it was it drifted in silence: a
row claiming `implemented` with no rule behind it, and a rule enforcing nothing
the matrix states, are both invisible from a green run.

This table is GENERATED by `cairn-rules`. It fails the build when a rule belongs
to neither map, when a mapped row title no longer appears above, or when the map
names a rule the checker does not implement. Since the cut every rule stands
behind a stated row; the mechanism for declaring one that does not is kept, and
empty.

<!-- cairn:conformance:begin -->
| Rule | Stands behind |
| :-- | :-- |
| `acceptance` | Closing acceptance binds the candidate, the scope and the base |
| `acceptance-drift` | Acceptance drift decided by predicate, not trunk equality |
| `branch-path` | One path: one record, one branch, one worktree, one writer |
| `concept-growth` | The concept wiki: an orphan blocks, growth is reported |
| `concept-orphan` | The concept wiki: an orphan blocks, growth is reported |
| `decision-drift` | Architecture changes carry a decision record |
| `derived-view` | The live view is generated and complete |
| `journal-entry` | Integration records done and writes one journal entry |
| `links` | Every relative link in the corpus resolves |
| `path-history` | A published path branch is never rewritten |
| `provisional` | Provisional commits never in a candidate |
| `rebase` | The branch contains the trunk tip before it merges |
| `record-date` | A dated record carries the date of its event |
| `record-integrity` | Records are kept, not tidied |
| `redaction` | Redaction names the record that authorised it |
| `registration` | Registration on the remote trunk before implementation |
| `registration-base` | Registration on the remote trunk before implementation |
| `remote-checkpoint` | Every completed unit pushed as a remote checkpoint |
| `route` | The route, its triggers and one-way escalation |
| `schema` | The path record, its declaration and its opening acceptance |
| `scope-digest` | Closing acceptance binds the candidate, the scope and the base |
| `scope-drift` | Two declared surfaces, widened in the same unit |
| `transition` | The lifecycle is a statement of fact |
| `work-unit` | A typed work unit, coherent in one commit |
| `writes-overlap` | One path: one record, one branch, one worktree, one writer |
<!-- cairn:conformance:end -->

## Implemented rule catalogue

This catalogue is generated from the reference checker. It inventories
implemented predicates; it does not make unimplemented protocol requirements
disappear and does not prove that a judgement-bearing record is correct. Read it
beside the matrix above: the matrix names what the protocol requires, this table
names what one implementation currently checks, and the gap between them is the
honest state of the work.

<!-- cairn:rules:begin -->
| Level | Rule Name | Scope | Trigger Condition | Enforcing Logic |
| :--- | :--- | :--- | :--- | :--- |
| **Blocking** | `acceptance` | diff | A ready path's candidate is not an ancestor, or is followed by anything but one administrative commit, or implementation changed after it, or the closure moved a field acceptance was measured against; a done path's candidate is not reachable, its arrival is carried by a merge object, or one commit takes two paths to done (ADR-008 d2). On manual-git additionally: the closing record in the path folder is missing, names another candidate, lacks its fields, is not a completed review, or its dispositions do not match the advisories attested at the candidate (advisory: a collapsed reviewer, or a prose disposition on a grandfathered path). On pull-request the request's description and approval are the record and are not read | `pathClosureState(path) + integrationState(record, comparisonRef, id).merge + one arrival at done per commit + closureFieldErrors(recordAtC, current) [+ manual-git: closingAcceptanceErrors(record) + fillErrors(record) + dispositionErrors(disposition, advisories_at_candidate, raised) + opening.accepted_by === closing.accepted_by]` |
| **Blocking** | `acceptance-drift` | diff | The trunk moved inside the path's declared writes: or governs: since the base the candidate was read against — the merge-base of the branch and the trunk | `acceptanceDrift(git diff --name-only $(git merge-base <trunk> HEAD) <trunk>, writes, governs) — never trunk === base` |
| **Blocking** | `branch-path` | diff | Path branch not declared by a running path record, missing base_commit, or a detached checkout whose branch cannot be identified while guarded source changed (inconclusive; advisory when nothing guarded changed) | `isPathBranch(branch) && (!match \|\| !PATH_BRANCH_STATUSES.includes(status) \|\| !isCommitPin(base)); branchSource === 'detached' && guarded.length > 0` |
| **Blocking** | `concept-orphan` | corpus | A concept note that no normative or learning text outside the wiki links to | `orphanConcepts(conceptFiles, links from documents outside the concepts folder)` |
| **Blocking** | `derived-view` | corpus | ACTIVE.md running-paths block does not match the path files it projects | `tools/cairn-active.mjs --check` |
| **Blocking** | `journal-entry` | diff | A path record reaches `done` in this change and no journal entry declares that path under `cairn.path` (ADR-008 d4) | `journalRecords(loadJournal(), id) over the entries' own metadata block on the transition into done; inconclusive when the journal cannot be read` |
| **Blocking** | `links` | corpus | Relative Markdown link points to non-existent target (code fences stripped) | `stripCode(text) => !existsSync(target)` |
| **Blocking** | `path-history` | diff | A published path commit was rewritten while this host forbids rewriting (ADR-022) | `pathHistoryPolicy === 'forbidden' && pathRemoteCheckpoint(branch).diverged` |
| **Blocking** | `provisional` | diff | A proposed candidate still contains a commit of this path marked Cairn-Provisional that no later commit of this path has resolved, or HEAD is itself provisional | `git log --grep=^Cairn-Provisional: base..subject_commit --not <trunk> (ADR-004 d3), each unresolved by any later commit of this path publishing a valid cairn-unit block for a step its record did not carry (repair 006); blocking on a ready path, advisory at HEAD` |
| **Blocking** | `rebase` | diff | Path branch does not contain the trunk tip. The id is historical: the requirement is trunk containment, which a no-rewrite host satisfies by merging the trunk in (ADR-022) | `trunkContained(trunkRef) === false` |
| **Blocking** | `record-integrity` | diff | An immutable event/history record changed, or a born-sliced step no longer preserves its adding blob as a prefix and no later step of this path binds the blob it replaces to the blob it adds (repair 005) | `immutableRecordMutations(mergeBaseWithTrunk) + appendOnlyStepRecordMutations(changed) + preservesAppendOnlyRecord(before, after); exempt where supersessionBinds(supersessionClaim(unit), the record's adding blob and current blob) — the claim readable only from a completed unit in an append-only step record of the same folder — stated as an advisory` |
| **Blocking** | `registration` | diff | Path declaration tuple (id, running, branch, base) missing from trunk | `pathRegistrationState() === 'missing' (blocking) or declared migration exception (advisory)` |
| **Blocking** | `registration-base` | diff | Path base_commit cannot be proved to equal the parent of the registration commit — the commit in which the record became running, in either record shape, a draft landed earlier notwithstanding (ADR-004 d1) | `pathRegistrationBaseState() === 'mismatch' \| null, over statusCommit(the record's history reachable from the trunk, over both record shapes)` |
| **Blocking** | `route` | diff | A path declares no route, an unknown route, a lightweight route that meets a full-route trigger, or a descent from full | `configured new-path default + fullRouteTriggers(writes) + routeDescent(previous, current)` |
| **Blocking** | `schema` | diff | Path or decision-record frontmatter fails parsing, an id/status/date is outside vocabulary, two records share an id or a branch, depends_on names an unknown path or the path itself, or a record declares running with no valid opening acceptance under its own heading | `pathFrontmatterErrors(front) + duplicatePathIdentityFindings(paths) + dependencyFindings(paths) + adrFrontmatterErrors(front, file, bodyStatus) + openingAcceptanceErrors(openingFromRecord(record)) on a running record in the diff` |
| **Blocking** | `schema` | corpus | Path or decision-record frontmatter fails parsing, an id/status/date is outside vocabulary, two records share an id or a branch, depends_on names an unknown path or the path itself, or a record declares running with no valid opening acceptance under its own heading | `pathFrontmatterErrors(front) + duplicatePathIdentityFindings(paths) + dependencyFindings(paths) + adrFrontmatterErrors(front, file, bodyStatus) + openingAcceptanceErrors(openingFromRecord(record)) on a running record in the diff` |
| **Blocking** | `scope-digest` | diff | The definition of done no longer digests to what the opening acceptance accepted — judged for every path record this run sees changed, whatever its status (ADR-002 d1) — or, on a closing path, the opening carries no digest, or on manual-git the closing record disagrees with the opening | `scopeDigest(resolveScopeSection(pathRecord, opening.scope_ref)) === opening.scope_digest, for every path record in the comparison and the branch's own closed path (=== closing.scope_digest on manual-git)` |
| **Blocking** | `scope-drift` | diff | Changed files outside path frontmatter declared writes: patterns | `!matchesAny(file, declaredWrites)` |
| **Blocking** | `transition` | diff | Changed path state is not an allowed lifecycle transition, a path branch claims done, a declaration was deleted rather than archived, or the prior state is unavailable. A range that holds the merge as well reads what the record declared in the commit before the arrival, on the trunk's own line, rather than at the base (ADR-008 d2) | `transitionErrors(previous, current, onPathBranch, integrationState(record, comparisonRef, id).readyBehind)` |
| **Blocking** | `work-unit` | diff | A changed path record carries no `cairn-unit` block for its current step, a block declares an unknown type, a running record with a completed unit names no object id in its checkpoint (ADR-004 d2), or source changed without a module note and the path record moving with it (the area-precise note is advisory) | `parseWorkUnits(record) => workUnitErrors(unit) over WORK_UNIT_TYPES; status running && units > 0 => checkpointCommit(record); touched(source roots) => touched(modules root) && touched(PATH_DIR); areaOf(file) => changed.includes(note) (advisory)` |
| *Advisory* | `acceptance` | diff | A ready path's candidate is not an ancestor, or is followed by anything but one administrative commit, or implementation changed after it, or the closure moved a field acceptance was measured against; a done path's candidate is not reachable, its arrival is carried by a merge object, or one commit takes two paths to done (ADR-008 d2). On manual-git additionally: the closing record in the path folder is missing, names another candidate, lacks its fields, is not a completed review, or its dispositions do not match the advisories attested at the candidate (advisory: a collapsed reviewer, or a prose disposition on a grandfathered path). On pull-request the request's description and approval are the record and are not read | `pathClosureState(path) + integrationState(record, comparisonRef, id).merge + one arrival at done per commit + closureFieldErrors(recordAtC, current) [+ manual-git: closingAcceptanceErrors(record) + fillErrors(record) + dispositionErrors(disposition, advisories_at_candidate, raised) + opening.accepted_by === closing.accepted_by]` |
| *Advisory* | `branch-path` | diff | Path branch not declared by a running path record, missing base_commit, or a detached checkout whose branch cannot be identified while guarded source changed (inconclusive; advisory when nothing guarded changed) | `isPathBranch(branch) && (!match \|\| !PATH_BRANCH_STATUSES.includes(status) \|\| !isCommitPin(base)); branchSource === 'detached' && guarded.length > 0` |
| *Advisory* | `concept-growth` | corpus | A change adds concept articles; reported so vocabulary growth is a visible decision | `addedConcepts(previousRef listing, current listing), diff-scoped to the concepts folder` |
| *Advisory* | `decision-drift` | diff | Configured architecture changed without a decision record in the same changeset | `touched(architectureRoot) => touched(decisionRoot)` |
| *Advisory* | `provisional` | diff | A proposed candidate still contains a commit of this path marked Cairn-Provisional that no later commit of this path has resolved, or HEAD is itself provisional | `git log --grep=^Cairn-Provisional: base..subject_commit --not <trunk> (ADR-004 d3), each unresolved by any later commit of this path publishing a valid cairn-unit block for a step its record did not carry (repair 006); blocking on a ready path, advisory at HEAD` |
| *Advisory* | `record-date` | diff | A record this change adds carries two dates that disagree, or a date more than a day from the commit that wrote it | `recordDateFindings(addedRecords) — filename date vs timestamp: vs the adding commit author date` |
| *Advisory* | `record-integrity` | diff | An immutable event/history record changed, or a born-sliced step no longer preserves its adding blob as a prefix and no later step of this path binds the blob it replaces to the blob it adds (repair 005) | `immutableRecordMutations(mergeBaseWithTrunk) + appendOnlyStepRecordMutations(changed) + preservesAppendOnlyRecord(before, after); exempt where supersessionBinds(supersessionClaim(unit), the record's adding blob and current blob) — the claim readable only from a completed unit in an append-only step record of the same folder — stated as an advisory` |
| *Advisory* | `redaction` | diff | A `[redacted: …]` marker names no redaction record (code spans and fences stripped first) | `redactionMarkers(stripCode(text)) => redaction record exists` |
| *Advisory* | `registration` | diff | Path declaration tuple (id, running, branch, base) missing from trunk | `pathRegistrationState() === 'missing' (blocking) or declared migration exception (advisory)` |
| *Advisory* | `remote-checkpoint` | diff | The path branch's tip is not present on its upstream tracking branch | `pathRemoteCheckpoint(branch).state === 'missing' \| 'unpushed', over resolveBranchRef(branch) — the local ref, else HEAD when detached, else the remote-tracking ref — against <branch>@{upstream} (ADR-004 d5)` |
| *Advisory* | `route` | diff | A path declares no route, an unknown route, a lightweight route that meets a full-route trigger, or a descent from full | `configured new-path default + fullRouteTriggers(writes) + routeDescent(previous, current)` |
| *Advisory* | `schema` | diff | Path or decision-record frontmatter fails parsing, an id/status/date is outside vocabulary, two records share an id or a branch, depends_on names an unknown path or the path itself, or a record declares running with no valid opening acceptance under its own heading | `pathFrontmatterErrors(front) + duplicatePathIdentityFindings(paths) + dependencyFindings(paths) + adrFrontmatterErrors(front, file, bodyStatus) + openingAcceptanceErrors(openingFromRecord(record)) on a running record in the diff` |
| *Advisory* | `scope-digest` | diff | The definition of done no longer digests to what the opening acceptance accepted — judged for every path record this run sees changed, whatever its status (ADR-002 d1) — or, on a closing path, the opening carries no digest, or on manual-git the closing record disagrees with the opening | `scopeDigest(resolveScopeSection(pathRecord, opening.scope_ref)) === opening.scope_digest, for every path record in the comparison and the branch's own closed path (=== closing.scope_digest on manual-git)` |
| *Advisory* | `scope-drift` | diff | Changed files outside path frontmatter declared writes: patterns | `!matchesAny(file, declaredWrites)` |
| *Advisory* | `transition` | diff | Changed path state is not an allowed lifecycle transition, a path branch claims done, a declaration was deleted rather than archived, or the prior state is unavailable. A range that holds the merge as well reads what the record declared in the commit before the arrival, on the trunk's own line, rather than at the base (ADR-008 d2) | `transitionErrors(previous, current, onPathBranch, integrationState(record, comparisonRef, id).readyBehind)` |
| *Advisory* | `work-unit` | diff | A changed path record carries no `cairn-unit` block for its current step, a block declares an unknown type, a running record with a completed unit names no object id in its checkpoint (ADR-004 d2), or source changed without a module note and the path record moving with it (the area-precise note is advisory) | `parseWorkUnits(record) => workUnitErrors(unit) over WORK_UNIT_TYPES; status running && units > 0 => checkpointCommit(record); touched(source roots) => touched(modules root) && touched(PATH_DIR); areaOf(file) => changed.includes(note) (advisory)` |
| *Advisory* | `writes-overlap` | diff | Two live paths declare writes: patterns that meet, and neither declares depends_on the other; reported on the runs those paths own — the later one's registration, and every unit of either | `writesOverlaps(paths) over running \| blocked \| ready, patternsMeet(a, b) by probe` |
<!-- cairn:rules:end -->

## The cut, for the record

A reader arriving from a 0.2 repository — an audit, a disposition, a step
record — meets rule names this page no longer lists. Where each one went:

| 0.2 name | 1.0 |
| :-- | :-- |
| `closure-surface`, `advisory-disposition`, `coherence-audit`, `role-collapse` | folded into `acceptance`: one rule about one acceptance; the last three are read from the closing record on `manual-git` and are the request's checklist on `pull-request` |
| `same-work-unit`, `area-note` | folded into `work-unit`: source, its note and its step are one coherence |
| `branch-identity` | folded into `branch-path`: a branch with no name is the degenerate case of a branch with no record |
| `opening-ceremony` | folded into `schema`: a `running` record with no acceptance behind it claims a state it has not earned |
| `redaction`, `record-date` | demoted to advisory: evidence a reviewer weighs, not a repository left wrong |
| `checkpoint-retention` | retired: dead under the default policy; a `retained` host's plugin |
| `base-parity`, with `--working-tree` and `--previous` | retired: one invocation form remains, so there is no narrowing to announce |
| `brief-schema` | retired: the brief merged into the record's resume section, which nothing checks beyond the record's schema |
| `single-truth` | retired: `derived-view` already blocks the one generated file, and the roadmap register is hand-written by design |
| `path-staleness`, `ledger-size`, `migration-debt` | retired: a quiet path, a long record and a spent exception are host debts, not repository defects |
