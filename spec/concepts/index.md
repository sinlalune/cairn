---
type: Cairn Concept Index
title: Cairn concept index
description: One article per specialised idea the Cairn specification uses, separated into vocabulary Cairn borrowed and vocabulary Cairn defines, then listed alphabetically.
tags: [cairn, concepts, index, learning, glossary]
timestamp: 2026-09-02T00:00:00Z
---

# Concepts

This wiki defines the specialised ideas used by the
[Cairn specification](../index.md). Each page is about one object or rule. It
starts with a plain definition, connects the idea to Cairn, and states its
limit. The specification remains normative.

The articles fall into two kinds, and keeping them apart matters more than it
looks. **Borrowed vocabulary** is what Cairn inherits from Git and ordinary
software practice: a reader who already knows what a rebase is can skip all of
it, and a reader who does not can learn it here without learning Cairn at the
same time. **Cairn's own concepts** are the objects and rules the protocol
actually adds — the ideas you are being asked to evaluate.

Twenty-one borrowed terms, thirty-one Cairn concepts. The 0.2 wiki had fifty
of its own; the states, the roles, the findings and the checker's soundness
vocabulary were each several names for one object seen from several sides, and
they are now one page each. Soundness left the wiki for
[the tools](../../tools/soundness.md), because it is about engineering a
checker, not about using the protocol.

## Borrowed vocabulary

Cairn did not invent these and does not redefine them. Each article says what
the term means in general use, then how Cairn relies on it.

### Git objects and history

[Git](./git.md) → [repository](./repository.md) → [commit](./commit.md) →
[object id](./commit-hash.md) → [branch](./branch.md) → [trunk](./trunk.md) →
[remote](./remote.md) → [fetch and push](./fetch-and-push.md) →
[tamper evidence](./tamper-evidence.md).

### Editable spaces and combining work

[Working tree and worktree](./worktree.md) → [conflict](./conflict.md) →
[rebase](./rebase.md) → [merge](./merge.md).

### Checking and describing

[Test](./test.md) → [exit code](./exit-code.md) →
[continuous integration](./continuous-integration.md) →
[Markdown and frontmatter](./frontmatter.md) → [schema](./schema.md).

### Documents software teams already keep

[Architecture](./architecture.md) → [decision record](./decision-record.md) →
[module note](./module-note.md).

## Cairn's own concepts

### One durable path

[Project memory](./project-memory.md) → [coding path](./coding-path.md) →
[path record](./path-record.md) →
[declared write surface](./declared-write-surface.md) →
[scope digest](./scope-digest.md) → [work unit](./work-unit.md) →
[work ledger](./work-ledger.md) →
[remote checkpoint](./remote-checkpoint.md) →
[provisional commit](./provisional-commit.md) →
[handoff](./handoff.md) → [writer assignment](./writer-assignment.md).

### People and evidence

[Roles](./roles.md) — initiator, writer, reviewer, checker, integrator — and
what the checker reports: a [finding](./finding.md), blocking, advisory or
inconclusive. [Record integrity](./record-integrity.md) is what keeps the
evidence from being tidied afterwards.

### Open, execute, close, integrate

[Opening acceptance](./opening-acceptance.md) →
[trunk registration](./trunk-registration.md) → [live view](./live-view.md) →
[implementation candidate](./implementation-candidate.md) →
[coherence audit](./coherence-audit.md) →
[closing acceptance](./closing-acceptance.md) →
[acceptance drift](./acceptance-drift.md) →
[administrative closure](./administrative-closure.md) →
[integration transport](./integration-transport.md) → [journal](./journal.md).

### State and route

[Lifecycle](./lifecycle.md) holds the six states — draft, running, blocked,
ready, done, archived — and every transition. [Route](./route.md) is the
declared field that prices a path's ceremony; the
[lightweight path](./lightweight-path.md) is the default it names.

### Governance

[Control plane](./control-plane.md) →
[enforcement profile](./enforcement-profile.md) →
[conformance](./conformance.md). A host that rewrites published branches
carries [checkpoint retention](./checkpoint-retention.md) as its plugin.

## Alphabetical index

Borrowed terms are marked *(borrowed)*.

- [Acceptance drift](./acceptance-drift.md)
- [Administrative closure](./administrative-closure.md)
- [Architecture](./architecture.md) *(borrowed)*
- [Branch](./branch.md) *(borrowed)*
- [Checkpoint retention](./checkpoint-retention.md)
- [Closing acceptance](./closing-acceptance.md)
- [Coding path](./coding-path.md)
- [Coherence audit](./coherence-audit.md)
- [Commit](./commit.md) *(borrowed)*
- [Conflict](./conflict.md) *(borrowed)*
- [Conformance](./conformance.md)
- [Continuous integration](./continuous-integration.md) *(borrowed)*
- [Control plane](./control-plane.md)
- [Declared write surface](./declared-write-surface.md)
- [Decision record](./decision-record.md) *(borrowed)*
- [Enforcement profile](./enforcement-profile.md)
- [Exit code](./exit-code.md) *(borrowed)*
- [Fetch and push](./fetch-and-push.md) *(borrowed)*
- [Finding](./finding.md)
- [Git](./git.md) *(borrowed)*
- [Handoff](./handoff.md)
- [Implementation candidate](./implementation-candidate.md)
- [Integration transport](./integration-transport.md)
- [Journal](./journal.md)
- [Lifecycle](./lifecycle.md)
- [Lightweight path](./lightweight-path.md)
- [Live view](./live-view.md)
- [Markdown and frontmatter](./frontmatter.md) *(borrowed)*
- [Merge](./merge.md) *(borrowed)*
- [Module note](./module-note.md) *(borrowed)*
- [Object id](./commit-hash.md) *(borrowed)*
- [Opening acceptance](./opening-acceptance.md)
- [Path record](./path-record.md)
- [Project memory](./project-memory.md)
- [Provisional commit](./provisional-commit.md)
- [Rebase](./rebase.md) *(borrowed)*
- [Record integrity](./record-integrity.md)
- [Remote](./remote.md) *(borrowed)*
- [Remote checkpoint](./remote-checkpoint.md)
- [Repository](./repository.md) *(borrowed)*
- [Roles](./roles.md)
- [Route](./route.md)
- [Schema](./schema.md) *(borrowed)*
- [Scope digest](./scope-digest.md)
- [Tamper evidence](./tamper-evidence.md) *(borrowed)*
- [Test](./test.md) *(borrowed)*
- [Trunk](./trunk.md) *(borrowed)*
- [Trunk registration](./trunk-registration.md)
- [Work ledger](./work-ledger.md)
- [Work unit](./work-unit.md)
- [Working tree and worktree](./worktree.md) *(borrowed)*
- [Writer assignment](./writer-assignment.md)

The [one-concept template](./concept-template.md) is the shape every new
article follows, in this wiki and in an adopter's own.
