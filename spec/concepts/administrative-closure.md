---
type: Cairn Concept
title: Administrative closure
description: The metadata-only commit after candidate C that records it ready, restricted field by field.
tags: [cairn, concept, closure, commit]
timestamp: 2026-08-26T00:00:00Z
---

# Administrative closure

Administrative closure is one [commit](./commit.md), `A`, immediately after
candidate `C` that records facts about `C` without changing its implementation.

## Build the idea

`A` exists to solve a self-reference: a record about a commit cannot be inside
the commit it is about, so declaring `C` ready necessarily creates a commit
after `C`.

Permitting `A` to touch whole files is too coarse. The definition of done lives
inside the [path record](./path-record.md), and so does `writes:` — so a closure
commit allowed to "change the path record" is allowed to rewrite the standard
its own acceptance is measured against. The restriction has to be field-level
or it is not a restriction.

## In Cairn

`A` is made once the gate is green on `C`: on `pull-request` before the
reviewer is asked to read, since it adds no implementation and moves no field
the acceptance is measured against — and where one participant holds every
role, the approval is the merge click, which would otherwise integrate a branch
whose closure is not on it; on `manual-git` after, since the closing record it
carries holds the acceptance.

On `manual-git`, `A` MAY add the exact closing record naming `C` — the
[review](./coherence-audit.md) and the [acceptance](./closing-acceptance.md)
in one file. On `pull-request` there is no file to add: the request carries
both.

Within the path record, `A` MAY change only:

- `status`, set to `ready`;
- `subject_commit`, set to `C`.

Within the [resume section](./handoff.md), `A` MAY change only the checkpoint
and the fields that follow from it.

Everything else MUST NOT change: the definition of done, `scope_ref`, `writes:`,
`governs:`, the step plan, product source, tests, architecture, and
implementation documentation.

## It does not prove

Calling a commit administrative is insufficient. Its diff, its distance from
`C`, and the specific fields it altered must all be checked.

Related: [implementation candidate](./implementation-candidate.md),
[ready state](./lifecycle.md), [path record](./path-record.md),
[record integrity](./record-integrity.md).
