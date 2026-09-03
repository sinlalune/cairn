---
name: cairn-open
description: Open one Cairn coding path — write the record as one folder with its definition of done and inline opening acceptance, register it on the remote trunk before any implementation, then create and publish its branch and worktree. Use when a milestone needs a path, or before starting any implementation work outside an accepted path.
---

# cairn-open

A path becomes shared work through opening acceptance and then registration:
the record exists on the remote trunk before implementation becomes private to
a branch. That is the one Cairn rule with no native equivalent, and it is what
keeps the live view complete without anyone maintaining it.

Read `project/coding-paths/binding.md` first: it names this repository's
trunk, remote, roots and transport. The commands below use the defaults
`main`, `origin` and `path/cp-example-001`.

## 1. Write the record

One folder, born as one, from the
[path template](../../spec/reference/path-template.md):

```text
project/coding-paths/CP-<ID>/
├── index.md      declaration · goal · definition of done · opening acceptance · coverage · step index · resume
├── plan.md       forward steps, optional
└── steps/        empty until the first unit
```

Choose a stable `CP-<ID>`; the branch is `path/<lowercase-id>`, mechanically.
In the declaration: `route` (`lightweight` unless the change touches the
control plane, architecture or a decision record, spans two implemented areas
or is expected to span two units — then `full`), `depends_on` (the paths this
one waits for, or `[]`), `writes` (the paths it expects to change, including
its own folder), and `governs` (the documents it is bound by, each pinned as
`path@<blob id>` from `git rev-parse HEAD:<path>`).

The **definition of done** is what acceptance binds. Write it as checkable
outcomes, not activities.

## 2. Record the opening acceptance

An authorised participant reviews the outcome, the route and its trigger, the
definition of done, the surfaces and overlap, the exclusions and the initial
writer. Then compute the digest with the code that will verify it — never by
hand:

```bash
node tools/cairn-check.mjs --scope-digest project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
```

Write the acceptance into `index.md` under `## Opening acceptance` as one YAML
block: `decision: accepted`, `accepted_by`, `accepted_roles`, `accepted_at`
(UTC), `scope_ref`, `scope_digest`. Below it, one sentence on what was
reviewed and any amendment. Editing the definition of done after this
invalidates the acceptance until a second block, naming the first with
`supersedes:`, records the amendment.

## 3. Register on the trunk

From a clean, current trunk checkout:

```bash
git switch main
git fetch origin main
git status --porcelain=v1        # must print nothing
git rev-parse origin/main        # this is base_commit
```

Set `status: running`, `base_commit` to that tip, `assigned_writer`, and
regenerate the live view. Run the gate bare and read its exit code. Land one
metadata-only commit — the record, the view, nothing else — through the
declared transport. The sequence is in [reference.md](./reference.md).

## 4. Create and publish the branch

Only after the registration commit is on the remote trunk:

```bash
git worktree add ../repo-cp-example-001 -b path/cp-example-001 main
cd ../repo-cp-example-001
git push -u origin path/cp-example-001
```

One writable worktree, one writer. Configure ports, profiles and caches the
binding names. Then start the first unit with `cairn-unit`.

## What you must not do

- Start implementation before the declaration is on the remote trunk.
- Write the digest by hand, or leave the acceptance without one.
- Declare `lightweight` for a change that meets a `full` trigger: escalation
  is one-way, and the checker refuses a descent.
