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
- [ADR-002 — the checkboxes stay and the seal is checked at every transition](./ADR-002-the-checkboxes-stay-and-the-seal-is-checked-everywhere.md) — accepted 2026-09-06; the scope digest is judged whenever the record changes, on every ref, the trunk's integrating unit included; the definition of done keeps its checkboxes and is never edited after acceptance. Ruling R10; R11 refused.
- [ADR-003 — two live paths on the same files](./ADR-003-two-live-paths-on-the-same-files.md) — accepted 2026-09-06; intersecting `writes:` between live paths is the advisory `writes-overlap`, raised at registration and every unit; the later path declares `depends_on` or the owner records the accepted race. Ruling R12.
- [ADR-004 — the checker reads what it did not](./ADR-004-the-checker-reads-what-it-did-not.md) — accepted 2026-09-06; six corrections and no new control: the registration commit is the activation, a running path names its remote checkpoint, range rules are path-scoped, every blocking fixture holds a trunk merge, the branch is resolved from where the checker stands, the three Crumbz repairs come upstream. Rulings R09, R13, R14, R15, R16, R17.
- [ADR-005 — one run per commit that can land](./ADR-005-one-run-per-commit-that-can-land.md) — accepted 2026-09-06; the request's run judges a candidate, the trunk's run judges a registration and an integration, and the push run on path branches goes. Ruling R07.
- [ADR-006 — what closing leaves behind](./ADR-006-what-closing-leaves-behind.md) — accepted 2026-09-06; the path branch stays until archived, every other transport branch is deleted on merge, the writer removes the worktree and reports a failure. Rulings R23, R24.
- [ADR-007 — a framework writes into the bootloader](./ADR-007-a-framework-writes-into-the-bootloader.md) — accepted 2026-09-06; a block a tool writes into `AGENTS.md` moves to a file the kit does not own, and the bootloader points at it. Ruling R21.
- [ADR-008 — housekeeping with no choice in it](./ADR-008-housekeeping-with-no-choice-in-it.md) — accepted 2026-09-06; no closure step, one commit for one path, no closure metadata in a provisional commit, one key for the journal's path, a reportable roadmap register, refusals that name the remedy, the worktree precondition. Rulings R18, R19, R20, R22, R28, R29, R38.
- [ADR-009 — what the unit skill tells the agent](./ADR-009-what-the-unit-skill-tells-the-agent.md) — accepted 2026-09-06; `repair` defined where the type is chosen, every unit plan names the definition-of-done item it advances, no object id typed by hand. Rulings R25, R26, R27.
- [ADR-010 — the module note describes now](./ADR-010-the-module-note-describes-now.md) — accepted 2026-09-06; a module note describes the current state only, history stays in the journal, and a note every path touches is split by main component. Rulings R39, R30.
- [ADR-011 — the adopter's documentation plane](./ADR-011-the-adopters-documentation-plane.md) — accepted 2026-09-06; `docs/inputs` read by the first session, the concept wiki in three folders under `docs/concepts`, and an abstraction explained in any session becomes a concept note, by one line in the bootloader. Rulings R31, R34, R35.
- [ADR-012 — a page a newcomer reads first](./ADR-012-a-page-a-newcomer-reads-first.md) — accepted 2026-09-06; promotion's third output, one readable page per product surface at the documentation root, with the concept notes as its glossary. Ruling R32.
- [ADR-013 — a local pointer to the protocol](./ADR-013-a-local-pointer-to-the-protocol.md) — accepted 2026-09-06; the kit installs `cairn/README.md` naming the release, linking the chapters and skills, listing the files the kit owns; the kit reaches its thirty-file budget exactly. Ruling R33.
- [ADR-014 — two tools of 1.1](./ADR-014-two-tools-of-1-1.md) — accepted 2026-09-06; `cairn-postmortem` prints the mechanical reading on a red run and on demand, and the kit's self-test is `cairn-test` so adopters keep `npm test`. Rulings R36, R37.
- [ADR-015 — a release reaches an edited file](./ADR-015-a-release-reaches-an-edited-file.md) — accepted 2026-09-07; `update` rewrites a pristine file whoever owns it, never rewrites an edited one but prints what the release changes in it and lists it on the pointer page, and takes the release's version of a named file on request. Raised by the review of this path's first candidate; promotes no ruling of its own.
