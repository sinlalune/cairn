---
type: Cairn Reference
title: Coding-path template
description: A complete Cairn path record — one folder with its index.md carrying the declaration, the opening acceptance, the step index and the resume section, an optional plan, and one file per step.
tags: [cairn, reference, template, coding-path, resume]
timestamp: 2026-09-02T00:00:00Z
---

# Coding-path template

A path is **one folder**, born as one. Its `index.md` carries everything a
reader needs to decide what to open next and nothing that grows without bound;
its steps are one file each, written where they live and readable alone.

```text
project/coding-paths/CP-<ID>/
├── index.md      declaration · goal · definition of done · opening acceptance · coverage · step index · resume
├── plan.md       forward steps, optional, read when planning
├── closing-<C>.md  the review and acceptance of one candidate — on manual-git only
└── steps/
    └── S<NN>.md  one complete step record, written to be read alone
```

Nothing else exists per path: no separate brief, session file, audit file or
folder log. On `pull-request` transport the closing review is the request
itself, and the folder holds no closing file at all. The one file written
outside the folder is the journal entry integration adds. A flat `project/coding-paths/CP-<ID>.md` from an earlier
release remains conforming — every rule keys on the declared id, not the file
carrying it — and migrates without restarting its lifecycle.

## `index.md`

````md
---
type: Cairn Coding Path
title: Short outcome-oriented title
description: One sentence stating the bounded result.
tags: [coding-path]
timestamp: YYYY-MM-DDT00:00:00Z
cairn:
  id: CP-EXAMPLE-001
  route: lightweight
  status: draft
  current_step: S01
  base_commit: null
  branch: path/cp-example-001
  assigned_writer: null
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - src/example/**
    - docs/modules/example.md
    - project/coding-paths/CP-EXAMPLE-001/**
  governs:
    - docs/architecture/example.md@89ab89ab89ab89ab89ab89ab89ab89ab89ab89ab
---

# CP-EXAMPLE-001 — Short title

## Goal

State the observable result, not the activity.

## Definition of done

This section is what `scope_ref` resolves to. Its
[scope digest](../concepts/scope-digest.md) is recorded in the opening
acceptance below and re-computed at closing; editing it after acceptance
invalidates that acceptance until a scope amendment is recorded.

- [ ] Product behaviour is implemented and covered by relevant tests.
- [ ] Affected architecture, decisions and module notes are current.
- [ ] Every completed step has one self-contained step record, a refreshed
      resume section, one commit, and a remote checkpoint.
- [ ] The final implementation candidate contains the trunk tip, is checked,
      reviewed and accepted by exact full object id.
- [ ] The exact candidate lands, the trunk records done, the remote result is
      proved, and the clean secondary worktree is removed safely.

## Opening acceptance

```yaml
decision: accepted
accepted_by: participant-id
accepted_roles: [initiator, reviewer]
accepted_at: YYYY-MM-DDTHH:MM:SSZ
scope_ref: project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
scope_digest: sha256:<digest of the section above, from --scope-digest>
```

One sentence on what was reviewed — route and its trigger, definition of
done, writes and overlap, exclusions, governing documents, initial writer —
and any amendment. A later scope amendment is a second block below this one,
carrying `supersedes:` and the new digest; the last block is the acceptance in
force.

## Documentation coverage

### Required

- `docs/architecture/example.md` — why this document governs the work

### Conditional

- `docs/architecture/security.md` — read before changing a trust boundary

### Deliberately excluded

- `docs/architecture/unrelated.md` — outside this path's bounded outcome

## Steps

One line per step, and this line is load-bearing: slicing saves nothing if a
reader cannot decide from it whether to open the file. Forward steps live in
`plan.md` until they are executed.

- **[S01](./steps/S01.md)** — what it established, in a phrase — COMPLETE
- **S02** — in progress; its file is linked when it is written

## Resume

### Checkpoint

```text
commit : <full object id of the last completed checkpoint, on the remote>
unit   : <its cairn-unit ordinal; 0 before the first unit, naming the registration commit>
base   : <base_commit>
trunk  : <the trunk tip last merged in or fetched>
```

### Next action

Exactly one action.

### Blockers

The named condition and what would clear it, or `none`.

### Tried and rejected

- Approach A — rejected because …
- Approach B — rejected because …

### Reading order

1. `docs/architecture/example.md@89ab…` — why it binds this work.

### Verify

```bash
npm run cairn-check
npm test
```
````

### The resume section

The resume section is the last stop on the entry route and the first thing a
participant acts from, and it is rewritten inside every completed work unit.
The [handoff](../concepts/handoff.md) article carries its contract: a reader
holding the bootloader, this record and the repository at the named checkpoint
MUST be able to state the outcome, the exact commit to resume from, the single
next action, what the path may write, what it must read and at which object
id, what is blocking, what has been tried and rejected, and the commands that
verify the checkpoint — each from this section or from a record it names at an
exact id.

The checkpoint names the last checkpoint that is already on the remote, never
the commit that will carry this refresh: that commit does not exist while the
section is being written. Before the first unit it names the registration
commit with unit `0`. `governs:` pins every document at an object id, and the
verify block is runnable as written.

## `steps/S01.md`

A step file is a complete record on its own — deixis such as *"the checkpoint
below"* is a defect at authoring time, because the file will be read alone. It
is append-only from the blob that adds it.

````md
---
type: Cairn Coding Path Step
title: 'CP-EXAMPLE-001 S01 — title'
timestamp: YYYY-MM-DDT00:00:00Z
cairn:
  path: CP-EXAMPLE-001
  step: S01
---

# CP-EXAMPLE-001 S01

### S01 — title — **COMPLETE**

#### Plan

What this unit will change, and what it deliberately will not.

#### Work

```cairn-unit
step: S01
unit: 01
type: implementation
verified: cairn-check, test, build
```

- implementation changed
- tests added or changed
- documents changed
- decisions, discoveries, reversals, and scope widening

#### Self-review

The diff read as a reviewer would: what would you refuse?

#### Verification

```text
cairn-check : pass | fail/inconclusive with reason
tests       : pass | fail with reason
build       : pass | fail with reason
user review : not required | passed by <identity>
remote      : origin/path/cp-example-001 @ <full commit>
```
````

## State-specific edits

### Registering

- write the opening acceptance into `index.md`, with the digest from
  `node tools/cairn-check.mjs --scope-digest <record>#definition-of-done`;
- set `status: running`, `base_commit` to the current trunk tip, and
  `assigned_writer`;
- regenerate `ACTIVE.md`;
- land one metadata-only registration commit whose parent equals
  `base_commit`, through the declared transport;
- only then create and push the path branch.

### Blocking

Set `status: blocked`, retain `branch` and `base_commit`, and name the blocker
and its unblock condition in the resume section. A path may block from
`running` when execution stalls and from `ready` when acceptance or integration
stalls; it returns only to `running`.

### Returning to running

Set `status: running` when execution resumes, when a ready candidate becomes
invalid by a finding, or when
[acceptance drift](../concepts/acceptance-drift.md) invalidates it because the
trunk moved inside `writes:` or `governs:`. Record why in the current step.

### Producing a candidate

Merge the trunk into the branch, finish the candidate, and push `C` with an
ordinary push. Nothing is rewritten, so nothing is retained and provisional
commits stay in the history as what they were. A host that declares
`pathHistoryPolicy: retained` follows its own retention procedure first.

### Becoming ready

After exact candidate `C` has passed its checks, its review and its
acceptance, create one administrative commit that:

- sets `status: ready`;
- sets `subject_commit` to the full object id of `C`;
- regenerates the live view, which projects the status it just moved;
- points the resume section's checkpoint at `C`, and on `manual-git` adds the
  closing record `closing-<C>.md` beside it.

It changes no other field of the record — not the definition of done, not
`scope_ref`, not `writes:`, not `governs:`. The comparison is against the
record at `C`, so a `writes:` widened while the path ran is not a closure
change.

### Recording done

Only the integration unit sets `status: done` and `resolution: completed`. A
path branch never claims done.

### Archiving

Set `status: archived` and exactly one resolution: `completed` after done,
`abandoned` for stopped unintegrated work, `superseded` for work replaced by
another path or decision. Keep the record.

Return to [the record](../index.md#the-record) or
[lifecycle](../concepts/lifecycle.md).
