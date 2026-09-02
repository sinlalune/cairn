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

The matrix below is the **0.2 matrix, moved here verbatim** by the genesis path's
first unit, because it is still the exact statement of what the reference tools
at this commit do: the tools were seeded from release 0.2 and have not yet been
cut. The specification above it has. Until the rules are cut and this matrix is
rewritten against them, read the two together as *what 1.0 requires* and *what
the 0.2 tools enforce*, and treat every row that names a shape the specification
no longer has — a separate session record, a separate brief, a retention
namespace on the default policy, a `foundation` or `emergency` route — as a
pending cut rather than a requirement.

## Current conformance

[Conformance](../concepts/conformance.md) distinguishes the protocol from one
implementation. A requirement can be canonical before the reference tools
implement it, but its status must be visible — in this table, beside the claim,
not in a separate document a reader may never open.

| Capability | Protocol v0.2 | Reference tools | Additional dependency |
| :-- | :-- | :-- | :-- |
| Path record, branch identity, registration, and remote checkpoints | required | implemented, with repository-specific bindings | remote Git |
| Full opening decision, actor, time, scope, and authority schema | required | **partially implemented**; path and ceremony presence are checked | repository governance |
| Multiple team participants and checkpoint handoff | required | records support it; writer exclusivity is operational | team assignment policy |
| `running`, `blocked`, `ready`, `done`, `archived` lifecycle | required | transition and state checks implemented for observable changes | complete comparison ref |
| `ready → blocked` and unchanged-state acceptance | required | implemented; the transition table carries `ready → blocked`, refuses `blocked → ready`, accepts an unchanged state, and holds an archived resolution terminal | complete comparison ref |
| Exact-candidate audit and closing acceptance | required | implemented | authorised reviewer |
| Full object id in the repository's configured format | required | implemented; the checker accepts SHA-1 and SHA-256 ids and refuses every prefix | a repository configured for another object format |
| Fail-closed critical inconclusive outcomes | required | implemented | complete trunk and comparison refs |
| Existing session, audit, history, and journal immutability | required | implemented for new or changed records | complete comparison ref |
| Checkpoint retention refs before any rewriting push | required | **implemented**; every declared unit except the newest must resolve a retention ref in the CURRENT generation, and every branch commit in `merge-base(trunk, HEAD)..HEAD` that is neither retained there, provisional, nor `HEAD` is reported as orphaned. The current generation is derived from ancestry; an empty one beside older generations is blocking and definite, while an unreadable namespace or branch range is inconclusive | the environment must FETCH `refs/cairn/*`, which no clone or checkout action does by default; a ref *moving* is unobservable to a single-commit validator — only the orphan it leaves behind is |
| A published path branch is not rewritten | required on a `forbidden` host | **implemented**; where `pathHistoryPolicy` is `forbidden` the branch's own upstream MUST remain an ancestor of `HEAD`, so a rebase, amend, soft-reset fold or force-push of published work is blocking. This is the DEFAULT policy (**ADR-022**), and it replaces retention rather than joining it: if nothing is rewritten the branch already keeps every ledger-named commit reachable | it proves only that THIS checkout has not rewritten what it published — a remote rewritten by someone else is invisible here, and preventing the push itself needs host protection, which tier `ci` does not claim. It is also silent while no remote-tracking ref exists |
| A repository can be created in the current shapes | required | **implemented**; `cairn-init` resolves the complete installation in memory, validates the generated binding before writing, refuses to overwrite any existing file, rolls back on failure, and generates the derived view rather than shipping one by hand. A new repository is born-sliced and no-rewrite, and it passes its own gate on the first command — asserted end-to-end by a test that installs, commits and runs the checker | updating an existing installation is NOT implemented: `cairn.lock.json` records the release and a per-file digest so a migrator could tell a pristine file from an edited one, and no migrator reads it yet. `cairn-new` and `cairn-close` remain manual, and `--profile protected` is refused because it asserts host protection no local command can configure |
| Marked provisional commits excluded from candidate identity | required | implemented; a ready path whose candidate range still contains a marked commit is blocked | the fold itself is not verified to preserve content |
| Handoff-brief field schema and answerable-alone contract | required | **partially implemented**; the nine fields, the seven exact sections and pinned `governs` entries are checked. The token budget is retired (ADR-020 decision 6): what will not fit is linked, not compressed, and that is a judgement rather than a predicate | the answerable-alone contract is a judgement and a cold-resume harness, and is never claimed by a checker |
| Portable, host, and binding artefact separation | required | **implemented in the reference documentation**; the portable execution route and path convention carry no host names, the root bootloader points at one explicit binding appendix, and host architecture is absent from the unconditional entry chain | `cairn-init` must scaffold the classified shape before general release; classification itself is a documentation property rather than a repository predicate |
| Field-level administrative closure surface | required | implemented; closure may move only `status` and `subject_commit` at `ready`, and additionally `resolution` at `done`, compared against the record at the accepted candidate rather than the trunk's copy | ledger append-only proof, which remains a separate open row |
| An adversarial fixture per blocking rule | required | **partially implemented**; eight of thirty blocking rules now have a fixture that installs a REAL repository with `cairn-init`, proves it green, introduces exactly one violation, and requires that rule among the blocking findings. The green baseline is half the assertion — a fixture that blocks for an unrelated reason proves nothing about the rule it names. Coverage is DECLARED: every blocking rule is either covered or listed as uncovered, so adding a rule forces the choice | twenty-two rules remain uncovered, most needing states the harness cannot yet reach cheaply — a closed candidate with its audit and acceptance, a rewritten published tip, a detached checkout, a trunk that moved inside a declared surface |
| No predicate branches on a value that varies by execution context | required | **implemented**; the derived-view exemption for `path/*` branches is removed rather than replaced. The view is already a pure projection of the statuses declared in the tree, so a checkout disagrees with it only when something there moved a status without regenerating, and no rule now reads the branch name to decide whether to run | the branch name still selects which path-scoped rules APPLY, which is a different question from whether a rule runs at all |
| A dated record carries the date of its event | required | **partially implemented**; the two dates an author writes — the filename date and `timestamp:` — must agree, blocking, on records the change adds. Drift between the record's date and the author date of the commit that added it is reported and never blocks | agreement is not accuracy: a record with the same wrong date in both places passes the blocking half, which is why the drift half exists |
| Local and CI invocations of one gate reach the same verdict | required | **implemented**; the default base on a path branch is the trunk comparison CI runs, and three fixtures now assert it on one real tree: both invocations reach the same verdict on a green repository, both see the same violation on a broken one, and `--working-tree` raises `base-parity` so a narrowed run announces itself | the assertion covers the reference invocations; a host that wires its CI to a different command is outside what this can observe |
| Every stated requirement is enforced or listed as unenforced | required | **partially implemented**; the rows here remain human judgements, and prose cannot be generated from a validator. The LINKAGE is now generated and checked: every implemented rule either stands behind a named row or is declared as standing behind none, a mapped row title that no longer appears fails the build rather than orphaning its rules, and the map cannot name a rule the checker does not implement | the requirement TEXT is still authored and maintained by hand, so a stated requirement that nobody wrote a row for is still invisible. Deriving rows from the normative text would need that text marked up, which it is not |
| Merge-time journal entry, one file per integrated outcome | required | **implemented**; a path record reaching `done` in a change must be declared by a journal entry's `path` field, read from the entry rather than from its filename, and an unreadable journal is inconclusive rather than a pass | none — the entry is written in the closing unit, which is the change the rule binds |
| Scope digest recorded at opening and re-verified at closing | required | implemented; the resolved section is digested and compared at closure | a path opened before the rule cannot amend its immutable opening record — see the migration exception |
| Candidate base `T` and the acceptance-drift predicate | required | implemented; the trunk delta since the recorded base is tested against `writes:` ∪ `governs:` | path matching is a proxy for semantic overlap, as stated |
| Structured `advisory_disposition` matching findings at `C` | required | **partially implemented**; dispositions must cover the attested `advisories_at_candidate` exactly, and any advisory raised at `A` and absent from it is proved missing | an advisory that fires only at `C` stays attested rather than derived; closing that needs evaluation replayed at `C` |
| Recorded roles and the collapsed-actor advisory | required | **partially implemented**; a shared opening/closing actor is reported | `accepted_roles` itself is recorded and not yet validated |
| `scope-drift` blocking unless the declaration moves in the same commit | required | implemented; drift blocks unless `writes:` moved in the same change | none |
| Typed work units keyed to their required parts | required | **partially implemented**; the `cairn-unit` block and its type vocabulary are checked | `same-work-unit` does not yet key its requirement to the declared type |
| `lightweight` default route and one-way escalation | required | **partially implemented**; the configured new-path default is reported when an explicit route is missing, and the vocabulary, three structural triggers, second-unit backstop and one-way escalation are checked | `cairn-init` / `cairn-new` do not yet write the configured default; the *high-risk* trigger is policy and the multi-unit trigger is caught one unit late; the combined lightweight records — opening acceptance inside the path record, audit questions inline in the closing record — are not accepted, so every route writes the same separate records (greenfield pilot, 2026-09-01) |
| `foundation` and adoption routes | required | **partially implemented**; the route is declarable and its write surface is confined to documents and the path records it produces | the adoption variant is a use of the same route, not a separate predicate |
| Repair procedures for protocol violations | required | **not implemented**; procedural, with no predicate proposed | none — repair is recorded, not gated |
| Redaction ceremony | required | **partially implemented**; every `[redacted: …]` marker must name a redaction record that exists | rotation-first ordering is a procedure, not a predicate |
| Live-ledger prefix and verbatim-roll proof | required | **partially implemented**; a born-sliced step record is followed through renames to its adding blob, which must remain a prefix of the current file. Flat live-ledger prefix and verbatim-roll proof remain open | explicit markers/schema for flat ledgers and rolls |
| Versioned portable configuration and schema migration | required for portable profile | **partially implemented**; schema 1, its JSON Schema, strict dependency-free validation, configured checker/active/audit bindings, and effective profile/binding output are installed | schema-to-schema migrations, install/update mechanics, generated adapters, and transport tests |
| Exact protected integration transport | required for protected profile | **not installed or tested** | repository-host adapter |
| Independently protected control plane | required for protected profile | **not installed or tested** | host ownership/approval policy |
| Transactional `init`, `new`, and `close` commands | required before general release | **not implemented** | command tooling |
| Emergency path | deliberately unspecified | **not implemented** | incident policy and retrospective |
| Cold-resume pilot | required before general release | **run once**: 20 trials, 35% would act without asking; failures flat across paths, so no schema change is indicated | a writer axis, which needs `written_by` populated across more than one writer |
| Greenfield pilot | required before general release | **run once** (2026-09-01): a repository created by `cairn-init` could not close an honest path on the first run — nineteen findings, ten of them predicates reading a proxy — and reached `done` on the repaired kit with zero red gates; 24 protocol files for 5 product files on the default route | a second writer, a hosted remote with the CI adapter, a trunk that moves during the path, and the lightweight reliefs once implemented |

The current supported claim is therefore:

> Cairn v0.2 is a local-first coordination and project-memory protocol for a
> team of trusted developers and coding agents working through remote Git
> branches. Its reference tools enforce a substantial but incomplete subset of
> the protocol. It is not yet a general-purpose merge, governance, or security
> system.

The honest residue is named rather than hidden: **repair procedures** have no
predicate to propose, the **answerable-alone contract** is a judgement measured
by cold resume, the **temporal half of checkpoint retention** is unobservable to
a validator that sees one commit, and flat-ledger prefix plus verbatim-roll
proof still await explicit markers. Born-sliced step records now have those
markers and an adding-blob prefix proof; that closes one shape, not the whole
row. Naming what cannot be checked is part of the claim.

### Which rule stands behind which requirement

The rows above are judgements about the protocol, and prose cannot be generated
from a validator. The LINKAGE can be, and until it was it drifted in silence: a
row claiming `implemented` with no rule behind it, and a rule enforcing nothing
the matrix states, are both invisible from a green run.

This table is GENERATED by `cairn-rules`. It fails the build when a rule belongs
to neither map, when a mapped row title no longer appears above, or when the map
names a rule the checker does not implement. A rule marked *(no conformance
row)* keeps the documentation plane coherent rather than enforcing a stated
protocol capability; mapping it to a row that does not mean it would make this
table look complete while saying something false.

<!-- cairn:conformance:begin -->
| Rule | Stands behind |
| :-- | :-- |
| `acceptance` | Exact-candidate audit and closing acceptance |
| `acceptance-drift` | Candidate base `T` and the acceptance-drift predicate |
| `advisory-disposition` | Structured `advisory_disposition` matching findings at `C` |
| `area-note` | *(no conformance row)* — documentation coherence: an implemented area whose note did not move |
| `base-parity` | Local and CI invocations of one gate reach the same verdict |
| `branch-identity` | Path record, branch identity, registration, and remote checkpoints |
| `branch-path` | Path record, branch identity, registration, and remote checkpoints |
| `brief-schema` | Handoff-brief field schema and answerable-alone contract |
| `checkpoint-retention` | Checkpoint retention refs before any rewriting push |
| `closure-surface` | Field-level administrative closure surface |
| `coherence-audit` | Exact-candidate audit and closing acceptance |
| `concept-growth` | *(no conformance row)* — documentation coherence: vocabulary growth made visible |
| `concept-orphan` | *(no conformance row)* — documentation coherence: vocabulary nothing needed |
| `decision-drift` | *(no conformance row)* — documentation coherence: a decision the change did not carry |
| `derived-view` | No predicate branches on a value that varies by execution context |
| `journal-entry` | Merge-time journal entry, one file per integrated outcome |
| `ledger-size` | Live-ledger prefix and verbatim-roll proof |
| `links` | *(no conformance row)* — documentation coherence: a relative link that resolves nowhere |
| `migration-debt` | Versioned portable configuration and schema migration |
| `opening-ceremony` | Full opening decision, actor, time, scope, and authority schema |
| `path-history` | A published path branch is not rewritten |
| `path-staleness` | *(no conformance row)* — operational hygiene: a quiet path noticed without blocking |
| `provisional` | Marked provisional commits excluded from candidate identity |
| `rebase` | *(no conformance row)* — branch currency: the branch must contain the trunk tip before it merges, which the matrix treats as integration transport rather than a stated capability |
| `record-date` | A dated record carries the date of its event |
| `record-integrity` | Live-ledger prefix and verbatim-roll proof |
| `redaction` | Redaction ceremony |
| `registration` | Path record, branch identity, registration, and remote checkpoints |
| `registration-base` | Path record, branch identity, registration, and remote checkpoints |
| `remote-checkpoint` | Path record, branch identity, registration, and remote checkpoints |
| `role-collapse` | Recorded roles and the collapsed-actor advisory |
| `route` | `lightweight` default route and one-way escalation |
| `same-work-unit` | `scope-drift` blocking unless the declaration moves in the same commit |
| `schema` | Full opening decision, actor, time, scope, and authority schema |
| `scope-digest` | Scope digest recorded at opening and re-verified at closing |
| `scope-drift` | `scope-drift` blocking unless the declaration moves in the same commit |
| `single-truth` | *(no conformance row)* — documentation coherence: a generated or shared file edited by hand |
| `transition` | `running`, `blocked`, `ready`, `done`, `archived` lifecycle |
| `work-unit` | Typed work units keyed to their required parts |
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
| **Blocking** | `acceptance` | diff | Ready/done path lacks exact-commit acceptance or changed implementation after acceptance | `closingAcceptanceErrors(record, pathId) + pathClosureState(path, record)` |
| **Blocking** | `acceptance-drift` | diff | The trunk moved inside the path's declared writes: or governs: since the accepted base | `acceptanceDrift(git diff --name-only <base> <trunk>, writes, governs) — never trunk === base` |
| **Blocking** | `advisory-disposition` | diff | advisory_disposition is not a structured list matching the advisories raised against the candidate | `dispositionErrors(record.advisory_disposition, raised) with set equality on rule names` |
| **Blocking** | `branch-identity` | diff | Detached checkout where branch cannot be identified from host or git ref | `branchSource === 'detached' (blocking on guarded roots, advisory on others)` |
| **Blocking** | `branch-path` | diff | Path branch not declared by a running path file, or missing base_commit | `isPathBranch(branch) && (!match \|\| !PATH_BRANCH_STATUSES.includes(status) \|\| !isCommitPin(base))` |
| **Blocking** | `brief-schema` | diff | The handoff brief is missing, or lacks its nine fields, its seven exact sections, or pinned governs entries | `briefErrors(front, body) over BRIEF_FIELDS and BRIEF_SECTIONS` |
| **Blocking** | `checkpoint-retention` | diff | A completed work unit has no retention ref in the current generation, the current generation is empty because a rewrite closed the last one, or the namespace or branch range cannot be read here and the question cannot be answered | `currentGeneration(retentionGenerations(refs), onBranch) => retainedRefs.has(refs/cairn/checkpoints/<id>/g<NN>/<n>), and unretainedCheckpoints over that generation (newest unit advisory; an unreadable namespace or range is inconclusive, an empty current generation is not)` |
| **Blocking** | `closure-surface` | diff | An administrative closure commit changed a path field other than status and subject_commit at ready, or those plus resolution at done — compared against the record at the accepted candidate | `closureFieldErrors(previousFront, currentFront) over CLOSURE_MUTABLE_FIELDS` |
| **Blocking** | `coherence-audit` | corpus | Ready path lacks a filled coherence audit bound to its exact subject_commit | `cairn-audit --check --subject path.subject_commit` |
| **Blocking** | `concept-orphan` | corpus | A concept note that no normative or learning text outside the wiki links to | `orphanConcepts(conceptFiles, links from documents outside the concepts folder)` |
| **Blocking** | `derived-view` | corpus | ACTIVE.md running-paths block does not match trunk path files | `tools/cairn-active.mjs --check` |
| **Blocking** | `journal-entry` | diff | A path record reaches `done` in this change and no journal entry declares that path | `journalRecords(loadJournal(), id) on the transition into done; inconclusive when the journal cannot be read` |
| **Blocking** | `links` | corpus | Relative Markdown link points to non-existent target (code fences stripped) | `stripCode(text) => !existsSync(target)` |
| **Blocking** | `migration-debt` | diff | A path listed in the v0.2 migration exception no longer needs it | `migrationDebt(paths, V02_MIGRATION_PATHS) — a spent exception is a bypass` |
| **Blocking** | `opening-ceremony` | diff | Path declared running without an opening-check session note | `!openingFor(pathId) via session frontmatter { path, ceremony: 'opening' }` |
| **Blocking** | `path-history` | diff | A published path commit was rewritten while this host forbids rewriting (ADR-022) | `pathHistoryPolicy === 'forbidden' && pathRemoteCheckpoint(branch).diverged` |
| **Blocking** | `provisional` | diff | A proposed candidate still contains commits marked Cairn-Provisional, or HEAD is itself provisional | `git log --grep=^Cairn-Provisional: base..subject_commit (blocking on a ready path, advisory at HEAD)` |
| **Blocking** | `rebase` | diff | Path branch does not contain latest trunk tip (stale branch). The id is historical: the requirement is trunk containment, and a no-rewrite host satisfies it by merging the trunk in (ADR-022) | `trunkContained(trunkRef) === false` |
| **Blocking** | `record-date` | diff | A record this change adds carries two dates that disagree (blocking), or a date more than a day from the commit that wrote it (advisory) | `recordDateFindings(addedRecords) — filename date vs timestamp: vs the adding commit author date` |
| **Blocking** | `record-integrity` | diff | An immutable event/history record changed, or a born-sliced step no longer preserves its adding blob as a prefix | `immutableRecordMutations(previousRef) + appendOnlyStepRecordMutations(changed) + preservesAppendOnlyRecord(before, after)` |
| **Blocking** | `redaction` | diff | A `[redacted: …]` marker names no redaction record (code spans and fences stripped first) | `redactionMarkers(stripCode(text)) => redaction record exists` |
| **Blocking** | `registration` | diff | Path declaration tuple (id, running, branch, base) missing from trunk | `pathRegistrationState() === 'missing' (blocking) or declared migration exception (advisory)` |
| **Blocking** | `registration-base` | diff | Path base_commit cannot be proved to equal the registration commit parent | `pathRegistrationBaseState() === 'mismatch' \| null` |
| **Blocking** | `route` | diff | A path declares no route, an unknown route, a lightweight route that meets a full-route trigger, a foundation surface outside documents, or a descent from full | `configured new-path default + fullRouteTriggers(writes) + foundationSurfaceViolations(writes) + routeDescent(previous, current)` |
| **Blocking** | `same-work-unit` | diff | Source changed without accompanying module note and coding path update | `touched(configured source roots) => touched(configured modules root) && touched(PATH_DIR)` |
| **Blocking** | `schema` | corpus | Path or ADR frontmatter fails parsing, or an id/status/date is outside vocabulary | `pathFrontmatterErrors(front) + adrFrontmatterErrors(front, file, bodyStatus)` |
| **Blocking** | `scope-digest` | diff | The accepted definition of done moved after acceptance, or was accepted without a digest | `scopeDigest(resolveScopeSection(pathRecord, scope_ref)) === record.scope_digest` |
| **Blocking** | `scope-drift` | diff | Changed files outside path frontmatter declared writes: patterns | `!matchesAny(file, declaredWrites)` |
| **Blocking** | `transition` | diff | Changed path state is not an allowed lifecycle transition, or prior state is unavailable | `transitionErrors(previous, current, onPathBranch)` |
| **Blocking** | `work-unit` | diff | A changed path record carries no `cairn-unit` block, or one declares an unknown type | `parseWorkUnits(record) => workUnitErrors(unit) over WORK_UNIT_TYPES` |
| *Advisory* | `acceptance` | diff | Ready/done path lacks exact-commit acceptance or changed implementation after acceptance | `closingAcceptanceErrors(record, pathId) + pathClosureState(path, record)` |
| *Advisory* | `advisory-disposition` | diff | advisory_disposition is not a structured list matching the advisories raised against the candidate | `dispositionErrors(record.advisory_disposition, raised) with set equality on rule names` |
| *Advisory* | `area-note` | diff | Subsystem source changed without touching matching area module note | `areaOf(file) => changed.includes(note)` |
| *Advisory* | `base-parity` | diff | A path-branch run compared the working tree with HEAD instead of the branch with the trunk | `resolveBase() source is 'opt-out' or 'unresolvable' while isPathBranch(branch)` |
| *Advisory* | `branch-identity` | diff | Detached checkout where branch cannot be identified from host or git ref | `branchSource === 'detached' (blocking on guarded roots, advisory on others)` |
| *Advisory* | `brief-schema` | diff | The handoff brief is missing, or lacks its nine fields, its seven exact sections, or pinned governs entries | `briefErrors(front, body) over BRIEF_FIELDS and BRIEF_SECTIONS` |
| *Advisory* | `checkpoint-retention` | diff | A completed work unit has no retention ref in the current generation, the current generation is empty because a rewrite closed the last one, or the namespace or branch range cannot be read here and the question cannot be answered | `currentGeneration(retentionGenerations(refs), onBranch) => retainedRefs.has(refs/cairn/checkpoints/<id>/g<NN>/<n>), and unretainedCheckpoints over that generation (newest unit advisory; an unreadable namespace or range is inconclusive, an empty current generation is not)` |
| *Advisory* | `concept-growth` | corpus | A change adds concept articles; reported so vocabulary growth is a visible decision | `addedConcepts(previousRef listing, current listing), diff-scoped to the concepts folder` |
| *Advisory* | `decision-drift` | diff | Configured architecture changed without an ADR in the same changeset | `touched(architectureRoot) => touched(decisionRoot)` |
| *Advisory* | `ledger-size` | diff | A path file in the diff exceeds the ledger token budget | `changed.includes(path.file) && path.tokens > LEDGER_TOKEN_BUDGET` |
| *Advisory* | `opening-ceremony` | diff | Path declared running without an opening-check session note | `!openingFor(pathId) via session frontmatter { path, ceremony: 'opening' }` |
| *Advisory* | `path-staleness` | corpus | A path declaring running whose branch has had no commit for longer than the declared window | `staleRunningPaths(corpus, branchAges(corpus)) — advisory always; an unresolvable branch reports nothing` |
| *Advisory* | `provisional` | diff | A proposed candidate still contains commits marked Cairn-Provisional, or HEAD is itself provisional | `git log --grep=^Cairn-Provisional: base..subject_commit (blocking on a ready path, advisory at HEAD)` |
| *Advisory* | `record-date` | diff | A record this change adds carries two dates that disagree (blocking), or a date more than a day from the commit that wrote it (advisory) | `recordDateFindings(addedRecords) — filename date vs timestamp: vs the adding commit author date` |
| *Advisory* | `record-integrity` | diff | An immutable event/history record changed, or a born-sliced step no longer preserves its adding blob as a prefix | `immutableRecordMutations(previousRef) + appendOnlyStepRecordMutations(changed) + preservesAppendOnlyRecord(before, after)` |
| *Advisory* | `registration` | diff | Path declaration tuple (id, running, branch, base) missing from trunk | `pathRegistrationState() === 'missing' (blocking) or declared migration exception (advisory)` |
| *Advisory* | `remote-checkpoint` | diff | Local path HEAD not present on upstream tracking branch | `pathRemoteCheckpoint(branch).state === 'missing' \| 'unpushed'` |
| *Advisory* | `role-collapse` | diff | One actor recorded both the opening and the closing acceptance for a path | `opening.accepted_by === closing.accepted_by (advisory: visible, never forbidden)` |
| *Advisory* | `route` | diff | A path declares no route, an unknown route, a lightweight route that meets a full-route trigger, a foundation surface outside documents, or a descent from full | `configured new-path default + fullRouteTriggers(writes) + foundationSurfaceViolations(writes) + routeDescent(previous, current)` |
| *Advisory* | `scope-digest` | diff | The accepted definition of done moved after acceptance, or was accepted without a digest | `scopeDigest(resolveScopeSection(pathRecord, scope_ref)) === record.scope_digest` |
| *Advisory* | `scope-drift` | diff | Changed files outside path frontmatter declared writes: patterns | `!matchesAny(file, declaredWrites)` |
| *Advisory* | `single-truth` | diff | Manual edits to shared/derived statements of record | `SINGLE_TRUTH.includes(file)` |
| *Advisory* | `transition` | diff | Changed path state is not an allowed lifecycle transition, or prior state is unavailable | `transitionErrors(previous, current, onPathBranch)` |
<!-- cairn:rules:end -->
