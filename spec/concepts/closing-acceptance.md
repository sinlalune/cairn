---
type: Cairn Concept
title: Closing acceptance
description: An authorised decision accepting one exact implementation candidate, the scope it was measured against, and the base it was read against.
tags: [cairn, concept, closure, governance]
timestamp: 2026-08-26T00:00:00Z
---

# Closing acceptance

Closing acceptance is a recorded decision about one exact
[implementation candidate](./implementation-candidate.md), not a general
approval of a [branch](./branch.md) name.

## In Cairn

On the default `pull-request` [transport](./integration-transport.md) the
acceptance is the reviewer's approval of the request opened from the path
branch, and the request's description is the review. On `manual-git` it is one
closing record in the path folder, `closing-<C>.md`, carrying the same fields.
Either way it binds three things at once, because an acceptance that binds only
the first is weaker than it appears:

- **the result** — the full `subject_commit` of `C`, the commit the request
  proposes and the administrative closure names;
- **the scope** — the [scope digest](./scope-digest.md) re-computed at `C`,
  required to equal the digest the opening acceptance recorded;
- **the base** — `T`, the trunk tip merged into the candidate, which is what
  the [acceptance-drift](./acceptance-drift.md) predicate later tests.

It also names the reviewer, the roles they held on this path, and the
disposition of every [advisory](./finding.md) raised at `C`. On `manual-git` the
checker reads all of that from the record; on `pull-request` the forge keeps
it, and the checker proves only what Git holds — the candidate, its closure
surface, the opening digest, provisional commits, and drift.

If implementation changes, the acceptance no longer applies and closure repeats.

## It does not prove

A recorded acceptance proves that one was recorded in the required shape. It
does not prove the reviewer was authorised unless the forge's rules or the
repository's governance enforce that identity — and when the same actor opened
and closed the path, the record makes that visible rather than making it true.

Related: [implementation candidate](./implementation-candidate.md),
[coherence audit](./coherence-audit.md), [scope digest](./scope-digest.md),
[acceptance drift](./acceptance-drift.md),
[administrative closure](./administrative-closure.md).
