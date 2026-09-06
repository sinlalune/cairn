---
type: Cairn Folder Index
title: Decision records
description: One file per durable decision about the protocol or its repository, with a stable id, a status and a date; the folder's history is Git's.
tags: [index, cairn, adr]
timestamp: 2026-09-06T00:00:00Z
---

# Decision records

One file per durable decision, named `ADR-<NNN>-<decision>.md`. A record
states one choice, its context, the alternatives it rejected and its
consequences, and names the rule, skill, file or command it changes by the
name the conformance page, the skills and the kit use today. It does not
design the implementation: that is the coding path's work.

A record promoted from a note links back to the note at the blob id it was
read at, as *promoted from*, and leaves the note exactly as it was. A
record that changes an earlier decision is a new record naming the one it
supersedes; nothing is rewritten in place.

## Shape

The frontmatter carries an `adr:` block with `id`, `status` and `date`, and
the body carries a matching `Status:` line under its heading; the checker's
`schema` rule reads both and refuses a record whose two halves disagree.
Status is one of `proposed`, `accepted`, `superseded`, `rejected`. A record
written from a decision the owner has already taken lands `accepted`, dated
the day of the decision; the pull request that lands it is its review.

## Numbering

This repository's own records start at `ADR-001` and count up, with no
gaps. The specification, the conformance page and the checker's comments
still cite decision numbers from the repository the protocol was built in
before this one (ADR-017, ADR-020, ADR-022 and a few others); those records
were never brought over, so the citations point at nothing here. No number
is reserved for them. Each citation is replaced by the reason itself, or by
a record of this folder, when a coding path of 1.1 edits the file that
carries it; the roadmap register names that work.

## Records

- [ADR-001 — a sole owner opens and closes a path](./ADR-001-sole-owner-opens-and-closes-a-path.md) — accepted 2026-09-06; the owner's go-ahead in the chat is the opening acceptance, the plan lands on the trunk directly, the owner reads the plan and tries the result, the merge click is the closing acceptance. Rulings R01, R02, R04, R05, R06, R08; R03 refused.
