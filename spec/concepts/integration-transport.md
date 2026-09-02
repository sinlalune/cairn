---
type: Cairn Concept
title: Integration transport
description: The defined mechanism that checks and lands an exact candidate on the remote trunk.
tags: [cairn, concept, integration, governance]
timestamp: 2026-08-26T00:00:00Z
---

# Integration transport

An integration transport is the complete route by which a proposed
[Git](./git.md) [commit](./commit.md) is checked and made the
[remote](./remote.md) [trunk](./trunk.md).

## In Cairn

Two transports are named, in `cairn.config.json`:

| `transport.integration` | What lands the candidate | Where acceptance is recorded |
| :-- | :-- | :-- |
| `pull-request` — the default | a request from the path branch to the trunk, merged by the forge with the checker as its one required status check on the exact commit that lands | the request's description and approval |
| `manual-git` — the fallback for a repository with no forge | a checked local `--no-ff` merge from a clean trunk checkout, pushed and verified on the remote | one closing record in the path folder |

Either transport must identify the exact candidate, attach the checks to that
identity, prevent implementation changes after acceptance, record `done` only
while integrating, and prove the landed result remotely. What neither may do is
require the trunk to be unchanged since the candidate was accepted: equality
with the accepted base is the obvious rule and a livelock, and
[acceptance drift](./acceptance-drift.md) is the predicate that replaces it.

Registration uses the same vocabulary, `transport.registration`, and needs a
route that does not require a path to already exist on the trunk before its
declaration can land — a request from a registration branch, or a direct push
where the trunk permits one.

## It does not prove

A branch-protection switch or a passing status on a different commit is not a
transport.

Related: [merge](./merge.md), [acceptance drift](./acceptance-drift.md),
[trunk registration](./trunk-registration.md),
[enforcement profile](./enforcement-profile.md).
