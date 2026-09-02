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

| Surface | Target | Measured |
| :-- | --: | --: |
| `spec/index.md` | under 8,000 words | *measured at release* |
| the required entry chain — bootloader, path convention, binding, execution protocol | under 3,000 words | *measured at release* |
| files the kit installs | under 30 | *measured at release* |
| protocol files one lightweight unit writes | under 6 | *measured at release* |

## Where the matrix stands

The matrix is written against the 1.0 [specification](../index.md), row by
row on chapter 5 with one row each for the stages the tools touch, at the
**rule cut**: thirty-nine rule names became twenty-four — nineteen that block
and five that only report — and every blocking rule has an adversarial
fixture, and at the **one-folder record**: opening acceptance is read from
the record itself, the resume section replaced the brief, `depends_on:` is
validated and projected, and `foundation` is gone. Two shapes the specification
no longer describes are still what the tools read, because the unit that
replaces them comes next: closing acceptance is read from a **session record**
and the coherence audit from an **audit file** until pull-request transport
(S04) makes the request the source. Every row that depends on one of those
says so.

Read a row's second column as *what one implementation checks today* and its
third as *what that check depends on, or cannot prove*. "Implemented" never
means a judgement was scored; it means a fact was read.

## Current conformance

| Requirement | Reference tools | Depends on, or does not prove |
| :-- | :-- | :-- |
| One path: one record, one branch, one worktree, one writer | **implemented**; `branch-path` refuses a `path/*` branch that no `running`, `blocked` or `ready` record declares, a record without a pinned base, and — fail closed — a detached checkout whose branch cannot be named while guarded source changed | writer exclusivity is operational: a Git worktree isolates files and establishes no ownership |
| Registration on the remote trunk before implementation | **implemented**; `registration` requires the declaration tuple (id, `running`, branch, base) on the trunk in either record shape, `registration-base` requires `base_commit` to be the parent of the commit that registered it, and both are inconclusive without a complete trunk ref | the trunk ref must be fetched; a path listed in `migration.unregisteredPaths` is advisory |
| The path record, its declaration and its opening acceptance | **implemented**; `schema` validates the declaration against the vocabulary, refuses two records sharing an id or a branch, requires `depends_on:` to name known paths and never the path itself, validates every decision record's frontmatter, and refuses a `running` record in the change whose `## Opening acceptance` block is missing or lacks a decision, an actor, a UTC time, a scope reference or a digest | `accepted_roles` is recorded, not validated, and the actor's authority is the host's to prove; the digest taken at opening is compared at closing; a scope amendment is the last block under the heading |
| Two declared surfaces, widened in the same unit | **implemented**; `scope-drift` blocks a change outside `writes:` unless the declaration moved in the same change, and exempts the records the lifecycle itself writes | path matching is a proxy for semantic overlap, as the specification states |
| The route, its triggers and one-way escalation | **partially implemented**; `route` requires `lightweight` or `full`, blocks a `lightweight` path that meets a structural trigger — control plane, decision plane, two implemented areas — or has already spanned two units, and refuses a descent from `full`; opening acceptance inline and the resume section are the shape on both routes | the policy trigger is honoured, not checked; the multi-unit trigger is caught one unit late; the two closing reliefs — the audit as the request's checklist, closure sharing the candidate's commit — arrive with pull-request transport (S04) |
| A typed work unit, coherent in one commit | **partially implemented**; `work-unit` requires a `cairn-unit` block for the record's current step with a known type, and blocks source that changed without a module note and the path record in the same change; the area-precise note is advisory | the type does not key the required parts: on the branch-versus-trunk comparison the changed set is cumulative across every unit on the branch, so keying on the current unit's type would be unsound |
| Every completed unit pushed as a remote checkpoint | **implemented, advisory**; `remote-checkpoint` reports a path HEAD that its upstream does not contain, or a branch with no upstream | reads local remote-tracking refs and performs no network operation; it can identify a current missing checkpoint, never prove the timing of older pushes |
| Provisional commits never in a candidate | **implemented**; `provisional` blocks a ready path whose base-to-candidate range still carries a `Cairn-Provisional:` trailer, and reports a provisional HEAD | the fold itself is not verified to preserve content |
| A published path branch is never rewritten | **implemented** where `pathHistoryPolicy` is `forbidden`; `path-history` blocks when the branch's own upstream is no longer an ancestor of HEAD | it proves only that THIS checkout has not rewritten what it published, and only while a remote-tracking ref exists; a `retained` host's retention namespace is not read by the reference checker — retention is the plugin that host supplies |
| The branch contains the trunk tip before it merges | **implemented**; `rebase` — the id is historical, the requirement is containment — blocks a path branch that does not contain the trunk tip and is inconclusive when the trunk cannot be resolved; the remedy it prints is to merge the trunk in | the trunk ref must be fetched |
| One invocation, one verdict: local and CI agree on one tree | **implemented**; on a path branch the base is the trunk, there is no narrower form, and three fixtures assert both invocations reach one verdict on one real tree; the branch is read from the host only for the repository the host checked out | a host that wires its CI to a different command is outside what this can observe |
| The live view is generated and complete | **implemented**; `derived-view` blocks when the view differs from what its generator produces now, in every context; the generator marks each live path unblocked, or names the paths it waits on, from `depends_on:` against the whole corpus | a dependency in any state but `done` or archived-completed is waited on |
| Closing acceptance binds the candidate, the scope and the base | **partially implemented**; `acceptance` requires a closing record naming exactly `C` by full object id with actor, time and scope, requires a filled coherence audit bound to `C`, refuses implementation after `C` and any commit beyond the administrative ones, refuses a closure that moves a field other than status and subject (and resolution at `done`) compared against the record at `C`, requires the advisory dispositions to cover exactly the advisories attested at `C`, and reports a self-issued acceptance. `scope-digest` requires the definition of done to digest to what was accepted at opening | the record is a session file and the audit an audit file until S04 makes the pull request's description and approval the record; an advisory that fires only at `C` stays attested rather than derived; the reviewer's judgement is never scored |
| Acceptance drift decided by predicate, not trunk equality | **implemented**; `acceptance-drift` blocks when the trunk delta since the accepted base touches the union of `writes:` and `governs:`, never on trunk equality | path matching is a proxy for semantic overlap; S04 runs it as a CI step on the pull request |
| The lifecycle is a statement of fact | **implemented**; `transition` enforces single-step transitions against one comparison ref, refuses `done` on a path branch, requires a resolution to archive and holds it terminal, and refuses a deleted declaration | inconclusive without a complete comparison ref |
| Integration records done and writes one journal entry | **implemented**; `journal-entry` blocks a record reaching `done` with no journal entry declaring its path, read from the entry's frontmatter rather than its filename | none — the entry is written in the integrating unit, which is the change the rule binds |
| Records are kept, not tidied | **implemented**; `record-integrity` blocks an edit, rename or deletion of an event record and any change to a step record that is not an exact suffix append of its adding blob; a verbatim relocation is reported, not blocked; committed mutations are judged against the merge-base with the trunk, the same comparison every other changed-file rule uses | the correction-record remedy — a superseding record naming both ids — has no predicate: the repair is recorded, not gated |
| Redaction names the record that authorised it | **implemented, advisory**; `redaction` reports a `[redacted: …]` marker naming no redaction record, code spans and fences stripped | rotation-first ordering is a procedure, not a predicate |
| A dated record carries the date of its event | **implemented, advisory**; `record-date` reports a record this change adds whose filename and `timestamp:` disagree, or whose date is more than a day from the author date of its adding commit | agreement is not accuracy |
| Repair is a unit like any other | **not implemented**; `type: repair` is vocabulary the block accepts, and no predicate checks that a repair unit names its violation or leaves it visible | none proposed — repair is recorded, not gated |
| The trust boundary and the enforcement profile | **printed, not proved**; the checker prints the declared profile with every verdict, and `cairn-init` refuses to install `protected` | host protection and independent approval are host claims no local reader can prove |
| Architecture changes carry a decision record | **implemented, advisory**; `decision-drift` reports the architecture root changed with no decision record in the same change, and `schema` validates every decision record's frontmatter (chapter 3) | the *promoted from* links of a promotion are a convention |
| Every milestone accounted for, and the unblocked view | **partially implemented**; `depends_on:` is read, validated and projected as the unblocked view (chapter 4); the roadmap register is prose | whether every milestone has a path or says it does not is a judgement read from the register |
| Brainstorm and research notes | **links and frontmatter only, by design**; `links` and `schema` cover exactly what the specification says the tools check about them (chapters 1 and 2) | none |
| The concept wiki: an orphan blocks, growth is reported | **implemented**; `concept-orphan` blocks a concept that no document outside the wiki links, and `concept-growth` reports the articles a change adds (chapter 6) | only the protocol scope is bound here; a project's own wiki binds through `roots.concepts` |
| Every relative link in the corpus resolves | **implemented**; `links` blocks a relative Markdown link that resolves nowhere, code stripped, across the documentation plane, the project plane and the specification | none |
| An adversarial fixture per blocking rule | **implemented**; nineteen of nineteen blocking rules have a fixture that installs a real repository with `cairn-init`, proves it green, introduces exactly one violation and requires that rule among the blocking findings; coverage is declared, so a new blocking rule forces the choice | a fixture proves the rule catches *that* violation, not the class |
| Installation, update and adoption | **partially implemented**; `cairn-init` installs the shapes stated here — no briefs folder, no folder log in the specification — writes the area note its configuration names, and passes its own gate on the first command; `update` and `adopt` are not implemented and the kit still copies the specification | S06: `npx cairn` and the lock-digest migrator |
| The pilots | **cold-resume run once** (20 trials, 35% would act without asking); **greenfield rerun at release** (S08) | a second writer, a hosted remote with the CI adapter |

The current supported claim is therefore:

> Cairn 1.0, at the rule cut, is a local-first coordination and project-memory
> protocol for a team of trusted developers and coding agents working through
> remote Git branches. Its reference checker enforces twenty-four rules, every
> blocking one proved against a real repository, and states what it does not
> check. It is not a general-purpose merge, governance, or security system.

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
| **Blocking** | `acceptance` | diff | A ready or done path lacks exact-commit acceptance; implementation changed after acceptance; the coherence audit bound to the candidate is missing or unfilled; the closure commit moved a field acceptance was measured against; the advisory dispositions do not match the advisories attested at the candidate (advisory: a collapsed reviewer, or a prose disposition on a grandfathered path) | `closingAcceptanceErrors(record) + pathClosureState(path, record) + cairn-audit --check --subject C + closureFieldErrors(recordAtC, current) + dispositionErrors(disposition, advisories_at_candidate, raised) + opening.accepted_by === closing.accepted_by` |
| **Blocking** | `acceptance-drift` | diff | The trunk moved inside the path's declared writes: or governs: since the accepted base | `acceptanceDrift(git diff --name-only <base> <trunk>, writes, governs) — never trunk === base` |
| **Blocking** | `branch-path` | diff | Path branch not declared by a running path record, missing base_commit, or a detached checkout whose branch cannot be identified while guarded source changed (inconclusive; advisory when nothing guarded changed) | `isPathBranch(branch) && (!match \|\| !PATH_BRANCH_STATUSES.includes(status) \|\| !isCommitPin(base)); branchSource === 'detached' && guarded.length > 0` |
| **Blocking** | `concept-orphan` | corpus | A concept note that no normative or learning text outside the wiki links to | `orphanConcepts(conceptFiles, links from documents outside the concepts folder)` |
| **Blocking** | `derived-view` | corpus | ACTIVE.md running-paths block does not match the path files it projects | `tools/cairn-active.mjs --check` |
| **Blocking** | `journal-entry` | diff | A path record reaches `done` in this change and no journal entry declares that path | `journalRecords(loadJournal(), id) on the transition into done; inconclusive when the journal cannot be read` |
| **Blocking** | `links` | corpus | Relative Markdown link points to non-existent target (code fences stripped) | `stripCode(text) => !existsSync(target)` |
| **Blocking** | `path-history` | diff | A published path commit was rewritten while this host forbids rewriting (ADR-022) | `pathHistoryPolicy === 'forbidden' && pathRemoteCheckpoint(branch).diverged` |
| **Blocking** | `provisional` | diff | A proposed candidate still contains commits marked Cairn-Provisional, or HEAD is itself provisional | `git log --grep=^Cairn-Provisional: base..subject_commit (blocking on a ready path, advisory at HEAD)` |
| **Blocking** | `rebase` | diff | Path branch does not contain the trunk tip. The id is historical: the requirement is trunk containment, which a no-rewrite host satisfies by merging the trunk in (ADR-022) | `trunkContained(trunkRef) === false` |
| **Blocking** | `record-integrity` | diff | An immutable event/history record changed, or a born-sliced step no longer preserves its adding blob as a prefix | `immutableRecordMutations(mergeBaseWithTrunk) + appendOnlyStepRecordMutations(changed) + preservesAppendOnlyRecord(before, after)` |
| **Blocking** | `registration` | diff | Path declaration tuple (id, running, branch, base) missing from trunk | `pathRegistrationState() === 'missing' (blocking) or declared migration exception (advisory)` |
| **Blocking** | `registration-base` | diff | Path base_commit cannot be proved to equal the registration commit parent | `pathRegistrationBaseState() === 'mismatch' \| null` |
| **Blocking** | `route` | diff | A path declares no route, an unknown route, a lightweight route that meets a full-route trigger, or a descent from full | `configured new-path default + fullRouteTriggers(writes) + routeDescent(previous, current)` |
| **Blocking** | `schema` | diff | Path or decision-record frontmatter fails parsing, an id/status/date is outside vocabulary, two records share an id or a branch, depends_on names an unknown path or the path itself, or a record declares running with no valid opening acceptance under its own heading | `pathFrontmatterErrors(front) + duplicatePathIdentityFindings(paths) + dependencyFindings(paths) + adrFrontmatterErrors(front, file, bodyStatus) + openingAcceptanceErrors(openingFromRecord(record)) on a running record in the diff` |
| **Blocking** | `schema` | corpus | Path or decision-record frontmatter fails parsing, an id/status/date is outside vocabulary, two records share an id or a branch, depends_on names an unknown path or the path itself, or a record declares running with no valid opening acceptance under its own heading | `pathFrontmatterErrors(front) + duplicatePathIdentityFindings(paths) + dependencyFindings(paths) + adrFrontmatterErrors(front, file, bodyStatus) + openingAcceptanceErrors(openingFromRecord(record)) on a running record in the diff` |
| **Blocking** | `scope-digest` | diff | The accepted definition of done moved after acceptance, or was accepted without a digest | `scopeDigest(resolveScopeSection(pathRecord, scope_ref)) === record.scope_digest` |
| **Blocking** | `scope-drift` | diff | Changed files outside path frontmatter declared writes: patterns | `!matchesAny(file, declaredWrites)` |
| **Blocking** | `transition` | diff | Changed path state is not an allowed lifecycle transition, a path branch claims done, a declaration was deleted rather than archived, or the prior state is unavailable | `transitionErrors(previous, current, onPathBranch)` |
| **Blocking** | `work-unit` | diff | A changed path record carries no `cairn-unit` block for its current step, a block declares an unknown type, or source changed without a module note and the path record moving with it (the area-precise note is advisory) | `parseWorkUnits(record) => workUnitErrors(unit) over WORK_UNIT_TYPES; touched(source roots) => touched(modules root) && touched(PATH_DIR); areaOf(file) => changed.includes(note) (advisory)` |
| *Advisory* | `acceptance` | diff | A ready or done path lacks exact-commit acceptance; implementation changed after acceptance; the coherence audit bound to the candidate is missing or unfilled; the closure commit moved a field acceptance was measured against; the advisory dispositions do not match the advisories attested at the candidate (advisory: a collapsed reviewer, or a prose disposition on a grandfathered path) | `closingAcceptanceErrors(record) + pathClosureState(path, record) + cairn-audit --check --subject C + closureFieldErrors(recordAtC, current) + dispositionErrors(disposition, advisories_at_candidate, raised) + opening.accepted_by === closing.accepted_by` |
| *Advisory* | `branch-path` | diff | Path branch not declared by a running path record, missing base_commit, or a detached checkout whose branch cannot be identified while guarded source changed (inconclusive; advisory when nothing guarded changed) | `isPathBranch(branch) && (!match \|\| !PATH_BRANCH_STATUSES.includes(status) \|\| !isCommitPin(base)); branchSource === 'detached' && guarded.length > 0` |
| *Advisory* | `concept-growth` | corpus | A change adds concept articles; reported so vocabulary growth is a visible decision | `addedConcepts(previousRef listing, current listing), diff-scoped to the concepts folder` |
| *Advisory* | `decision-drift` | diff | Configured architecture changed without a decision record in the same changeset | `touched(architectureRoot) => touched(decisionRoot)` |
| *Advisory* | `provisional` | diff | A proposed candidate still contains commits marked Cairn-Provisional, or HEAD is itself provisional | `git log --grep=^Cairn-Provisional: base..subject_commit (blocking on a ready path, advisory at HEAD)` |
| *Advisory* | `record-date` | diff | A record this change adds carries two dates that disagree, or a date more than a day from the commit that wrote it | `recordDateFindings(addedRecords) — filename date vs timestamp: vs the adding commit author date` |
| *Advisory* | `record-integrity` | diff | An immutable event/history record changed, or a born-sliced step no longer preserves its adding blob as a prefix | `immutableRecordMutations(mergeBaseWithTrunk) + appendOnlyStepRecordMutations(changed) + preservesAppendOnlyRecord(before, after)` |
| *Advisory* | `redaction` | diff | A `[redacted: …]` marker names no redaction record (code spans and fences stripped first) | `redactionMarkers(stripCode(text)) => redaction record exists` |
| *Advisory* | `registration` | diff | Path declaration tuple (id, running, branch, base) missing from trunk | `pathRegistrationState() === 'missing' (blocking) or declared migration exception (advisory)` |
| *Advisory* | `remote-checkpoint` | diff | Local path HEAD not present on upstream tracking branch | `pathRemoteCheckpoint(branch).state === 'missing' \| 'unpushed'` |
| *Advisory* | `route` | diff | A path declares no route, an unknown route, a lightweight route that meets a full-route trigger, or a descent from full | `configured new-path default + fullRouteTriggers(writes) + routeDescent(previous, current)` |
| *Advisory* | `schema` | diff | Path or decision-record frontmatter fails parsing, an id/status/date is outside vocabulary, two records share an id or a branch, depends_on names an unknown path or the path itself, or a record declares running with no valid opening acceptance under its own heading | `pathFrontmatterErrors(front) + duplicatePathIdentityFindings(paths) + dependencyFindings(paths) + adrFrontmatterErrors(front, file, bodyStatus) + openingAcceptanceErrors(openingFromRecord(record)) on a running record in the diff` |
| *Advisory* | `scope-digest` | diff | The accepted definition of done moved after acceptance, or was accepted without a digest | `scopeDigest(resolveScopeSection(pathRecord, scope_ref)) === record.scope_digest` |
| *Advisory* | `scope-drift` | diff | Changed files outside path frontmatter declared writes: patterns | `!matchesAny(file, declaredWrites)` |
| *Advisory* | `transition` | diff | Changed path state is not an allowed lifecycle transition, a path branch claims done, a declaration was deleted rather than archived, or the prior state is unavailable | `transitionErrors(previous, current, onPathBranch)` |
| *Advisory* | `work-unit` | diff | A changed path record carries no `cairn-unit` block for its current step, a block declares an unknown type, or source changed without a module note and the path record moving with it (the area-precise note is advisory) | `parseWorkUnits(record) => workUnitErrors(unit) over WORK_UNIT_TYPES; touched(source roots) => touched(modules root) && touched(PATH_DIR); areaOf(file) => changed.includes(note) (advisory)` |
<!-- cairn:rules:end -->

## The cut, for the record

A reader arriving from a 0.2 repository — an audit, a disposition, a step
record — meets rule names this page no longer lists. Where each one went:

| 0.2 name | 1.0 |
| :-- | :-- |
| `closure-surface`, `advisory-disposition`, `coherence-audit`, `role-collapse` | folded into `acceptance`: one rule about one acceptance |
| `same-work-unit`, `area-note` | folded into `work-unit`: source, its note and its step are one coherence |
| `branch-identity` | folded into `branch-path`: a branch with no name is the degenerate case of a branch with no record |
| `opening-ceremony` | folded into `schema`: a `running` record with no acceptance behind it claims a state it has not earned |
| `redaction`, `record-date` | demoted to advisory: evidence a reviewer weighs, not a repository left wrong |
| `checkpoint-retention` | retired: dead under the default policy; a `retained` host's plugin |
| `base-parity`, with `--working-tree` and `--previous` | retired: one invocation form remains, so there is no narrowing to announce |
| `brief-schema` | retired: the brief merged into the record's resume section, which nothing checks beyond the record's schema |
| `single-truth` | retired: `derived-view` already blocks the one generated file, and the roadmap register is hand-written by design |
| `path-staleness`, `ledger-size`, `migration-debt` | retired: a quiet path, a long record and a spent exception are host debts, not repository defects |
