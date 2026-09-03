---
type: Cairn Concept
title: Coherence audit
description: A recorded review of one exact implementation candidate against project knowledge and concurrent work.
tags: [cairn, concept, closure, audit]
timestamp: 2026-08-26T00:00:00Z
---

# Coherence audit

A coherence audit examines whether an exact
[implementation candidate](./implementation-candidate.md) remains consistent
with accepted [architecture](./architecture.md), decisions, module knowledge,
and other running paths.

## In Cairn

The review names the path, the full subject [object id](./commit-hash.md), the
base it was read against, and a verdict, and answers four questions: does the
diff contradict an accepted decision, does it duplicate concurrent work, did it
introduce architecture without a decision record, does anything now live in two
places that will drift. If its findings change implementation, a new candidate
is reviewed.

It reads the candidate against the documents the path declared in `governs:`,
each pinned at an exact object id. That pin is what makes the review's
reference frame checkable later: if the trunk changes one of those documents
before integration, [acceptance drift](./acceptance-drift.md) can say so.

Where the answers are written is the transport's: on `pull-request` they are
the request's description — the kit's request template carries the questions —
and on `manual-git` they are the closing record in the path folder, which the
checker requires to name a verdict and answer at least one question before a
candidate is `ready`. `npm run cairn-audit` produces either shape for the
current candidate.

## It does not prove

The checker can prove binding and completeness on `manual-git`, and nothing
about the request on `pull-request`; the quality of the reasoning is never
proved. The verdict remains human or agent judgement.

Related: [implementation candidate](./implementation-candidate.md),
[closing acceptance](./closing-acceptance.md),
[acceptance drift](./acceptance-drift.md), [schema](./schema.md).
