---
name: cairn-close
description: Close one Cairn coding path on one exact candidate — merge the trunk in, produce and check candidate C, write the review as the pull request's description (or the closing record on manual-git), obtain acceptance, make the one administrative commit, check acceptance drift, integrate, record done with the journal entry, and remove the clean worktree. Use when a path's definition of done is met.
---

# cairn-close

Closure is about an immutable identity, not whatever is at `HEAD` later. One
candidate `C` goes all the way through: the checks, the review, the
acceptance, the administrative commit, the integration. If implementation
changes after `C` — even to resolve a conflict — `C` is void, the path returns
to `running`, and the sequence repeats on a new candidate.

Which transport this repository declares is in `cairn.config.json` and the
binding: `pull-request` (the default) or `manual-git`. The exact commands for
both are in [reference.md](./reference.md).

## 1. Produce the candidate

Fetch the trunk and **merge it in** — never rebase a published branch. The
branch now contains the trunk tip, which is what serializes the merge without
an integrator. `C` is the last unit's commit with the trunk merged in: closing
adds no implementation commit of its own, and work that remains is a work
unit. Confirm no
provisional commit remains in the range, push, and run every check bare
against exactly this commit. Its full object id is `C`.

## 2. Write the review

The review is the request's description. No unit and no step file carries it,
and there is no closure step.

```bash
npm run cairn-audit -- --subject <C>
```

The description is read in one order. Three plain lines first — what the path
did, why it is the least, what it does not do — and a link to the page a
newcomer reads for the surface it changed. Then one line per item of the
definition of done, in the record's order, each naming the unit that advanced
it and the command or page that shows it done; nothing is ticked, and the record's own checkboxes
stay as they are. Then the ledger the command prints: the candidate, its base
`T` (the trunk tip you merged in), the scope digest line, the four coherence
questions, the advisories raised at `C` with a disposition each — fixed,
accepted, or deferred to a named owner and follow-up — and the roles.

Ask, with the coherence questions, whether the README lists a surface this
path added. On `pull-request` open the request from the path branch to the
trunk and fill it in.

On `manual-git` the same command scaffolds `closing-<C>.md` in the path
folder. Fill it: reviewer, roles, UTC time, the re-computed digest, one entry
per advisory, the four answers, the verdict.

Read the candidate against every document pinned in `governs:`, at its pinned
id, and against every path running beside it. Compute the digest with the
checker, never by hand; if it differs from the opening acceptance, stop — the
definition of done moved.

## 3. Obtain acceptance

Whoever reads the diff — the owner, a bot on the request, a fresh context —
reads it against the decision ladder `cairn-code` points at and for
correctness, and for nothing else.

The owner tries the result before the merge; for a path whose product is
documents, trying it means reading the pages. That is a step, not a
checkbox: ask for it in the chat, signalled as a decision, and add nothing to
the request for it.

An authorised reviewer's approval of the request — or the closing record's
acceptance fields — binds three things: the result `C`, the scope digest, and
the base `T`. On the `full` route the reviewer answers the coherence questions
explicitly, and a control-plane change needs an approval that is not the
writer's own. Where one owner holds every role, that approval is the merge
click, and no other shape is added for it.

## 4. The administrative commit

One commit `A` after `C`: `status: ready`, `subject_commit: C`, the live view
regenerated, the resume section's checkpoint pointed at `C`, and on
`manual-git` the closing record. Nothing else — not the definition of done,
not the surfaces, not the plan, not the product. Run the gate **before**
committing: an uncommitted closure counts as the pending administrative commit
and its files are judged. Push.

## 5. Drift, then integrate

The checker decides drift by predicate: the acceptance survives while the
trunk delta since `T` touches nothing in `writes:` ∪ `governs:`. On
`pull-request` the request's own check runs it. If it fails, return to
`running`, merge the new tip in, and repeat from step 1.

The request merges with `cairn-check`, its one required check, read green on
the exact commit that will land, as a merge commit — never a squash, so the
commit that lands is the commit that was checked. Then the integrating unit, from a clean trunk checkout:
`status: done`, `resolution: completed`, the live view, and one journal entry
under `project/log/`. On `manual-git` the integrating unit is the `--no-ff` merge
itself, carrying those edits. A path branch never claims `done`.

## 6. Prove it, then clean up

Fetch the trunk and prove `C` reachable from it. Delete every branch the
transport made for this path; `path/<id>` is not one of them and stays on the
remote until the path is archived.

You remove the worktree, as the last step of closing and before the report:
from another checkout, the exact secondary worktree, only if it is Git-clean,
never with force, never the primary checkout. If integration is proved and
cleanup is not, report the two separately.

## What you must not do

- Rebase, amend or fold anything published.
- Change implementation after `C` and keep calling it `C`.
- Set `done` on the path branch, or require the trunk to equal `T`.
