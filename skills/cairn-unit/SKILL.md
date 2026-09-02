---
name: cairn-unit
description: Advance one Cairn coding path by exactly one work unit — plan, change, self-review, verify — writing the step record and refreshing the resume section, running every gate bare, committing the coherent unit with explicit paths and pushing it immediately. Use whenever you resume a path or complete a bounded piece of work on one, and when incomplete work must be published rather than left in a working tree.
---

# cairn-unit

A work unit is the smallest completed change Cairn recognises. It is coherent
only when everything moves together: the change, its tests, the affected
documents, one step record, the refreshed resume section — one commit, pushed.
"Implemented locally" and "completed" are not synonyms.

## 0. Resume

Read, in order: `AGENTS.md`, the path convention and binding it names, the
live view, then this path's `index.md` — its resume section first. Verify the
repository against it: branch, upstream, clean tree, base. Start the persisted
next action. Conversation memory is never stronger than the record and the
repository.

## 1. Plan

Write, in the new step file `steps/S<NN>.md`, what this unit will change and
what it deliberately will not. Name the unit's **type** — it fixes what must
move together:

| type | moves together |
| :-- | :-- |
| `implementation` | source, its tests, the affected module note, the step |
| `documentation` | the documents and their indexes, the step |
| `decision` | the decision record, every document it amends, the step |
| `repair` | the corrective change, any superseding record owed, a step naming the violation |
| `closure` | only the administrative closure surface |

If the plan reveals a `full`-route trigger on a `lightweight` path, escalate
now and say why in the step.

## 2. Change

Do the work with the `cairn-code` stance: does it need to exist, does the
codebase already have it, what is the least code. Write outside `writes:`
only if you widen `writes:` in the same unit and say why in the step. Delete
before you add.

## 3. Self-review

Read the diff as the reviewer of the pull request will: what would you refuse?
Record what you found and fixed, what you rejected and why, and any widening.
Two lines in the step, not a ceremony.

## 4. Verify

Run every relevant gate **bare** so the exit code is the verdict:

```bash
npm run cairn-check
npm test
```

Then finish the step record with its `cairn-unit` block — step, ordinal, type,
what verified it — and refresh the **resume section** of `index.md`: the
checkpoint (the last completed commit already on the remote, never this one),
the single next action, blockers, tried and rejected, reading order, verify.

## 5. Commit and push

```bash
git status --short
git add <each path of the unit, explicitly>
git commit -m "CP-EXAMPLE-001 S02: what it established"
git push origin path/cp-example-001
```

Never blind-add a live repository; a dirty file you did not write belongs to
someone. Read the push's exit code, then read CI. A unit whose push failed is
implemented locally, not complete. The full sequence, and the shape of a
provisional commit for work that is not yet a unit, are in
[reference.md](./reference.md).

## 6. Report the boundary

Every pushed unit is a safe session boundary. Report the outcome, the exact
remote commit, the gate verdict with its advisories, the persisted next action
and blockers, and whether the next unit should run here or fresh.

## What you must not do

- Rewrite anything published: no amend, rebase, soft-reset fold or force-push.
  Reach a current base by merging the trunk in.
- Edit an earlier step: a step is append-only from the blob that added it. A
  correction is a new step naming the old one.
- Call a narrower verdict the full one, or record a verdict you did not read.
