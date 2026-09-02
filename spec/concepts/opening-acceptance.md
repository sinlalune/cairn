---
type: Cairn Concept
title: Opening acceptance
description: Recorded agreement that a bounded coding path may enter execution, binding the definition of done it was accepted against.
tags: [cairn, concept, ceremony, governance]
timestamp: 2026-08-26T00:00:00Z
---

# Opening acceptance

Opening acceptance is an authorised decision that a proposed
[coding path](./coding-path.md) is clear enough to register and execute.

## In Cairn

Participants review the intended outcome, definition of done, route, steps,
required knowledge, exclusions, declared `writes:` and `governs:` surfaces, and
the initial writer. The record names the path, the accepted decision, the actor,
UTC time, the `scope_ref`, and the [scope digest](./scope-digest.md) of the text
that reference resolves to at the registration commit.

The digest is what makes the acceptance binding. Without it the record points at
a heading whose contents may be rewritten afterwards, and closing acceptance
would compare a fixed result against a moving standard.

The record lives in the [path record](./path-record.md) itself, under its own
`## Opening acceptance` heading, on every route: a decision about a text
belongs beside the text, and a path is one folder. A scope amendment is a
second block under the same heading naming the one it supersedes.

The repository's governance defines who may accept. Cairn does not require one
permanent owner.

## It does not prove

Opening acceptance authorises a plan; it does not accept implementation that
does not yet exist. A digest binds the words, not their wisdom.

Related: [coding path](./coding-path.md), [scope digest](./scope-digest.md),
[trunk registration](./trunk-registration.md),
[closing acceptance](./closing-acceptance.md).
