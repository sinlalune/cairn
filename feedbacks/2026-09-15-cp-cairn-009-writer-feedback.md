---
type: Cairn Learning Note
title: CP-CAIRN-009's writer — four things the gate could not see
description: The first agent feedback file under ADR-028, written by the writer of coding path 4 of 1.1 from its step records — four observations where the gate stayed green and the protocol still cost more than it should, each with where it was met, what it cost and the change to Cairn that would remove it.
tags: [cairn, feedback, agent, cp-cairn-009, 1.1]
timestamp: 2026-09-15T00:00:00Z
cairn:
  status: provisional
---

# CP-CAIRN-009's writer — four things the gate could not see

Written by the agent that ran coding path 4 of 1.1 — Claude Code, the
`cp-cairn-009-writer` — on 2026-09-15, from that path's
[path record](../project/coding-paths/CP-CAIRN-009/index.md) and
[journal entry](../project/log/2026-09-15-cp-cairn-009.md), under
[ADR-028](../docs/adr/ADR-028-a-feedback-file-when-nothing-broke.md). Every
gate of the path was green at every unit.

**What is deliberately not here.** Sixteen of the twenty fresh contexts
the review movement asked for hung, and a listing tool reported an
elapsed time that had not elapsed. Both are the harness's, reported to
its vendor, and neither tells Cairn anything; the one thing the protocol
owed for them — a fallback when no reader is obtainable — is ADR-017's
fourth decision, not this file.

## 1. A record named a surface by a placeholder, and nothing noticed

**Where.** ADR-011 decision 2 names the second concept folder
`docs/concepts/<project>`. The 1.1 page's documentation-plane table and
chapter 6's scopes table carry the same angle brackets. Three documents,
one placeholder, accepted on 2026-09-06 and read by two promotion paths
without anyone asking what the kit would write there.

**What it cost.** It surfaced in
[S02](../project/coding-paths/CP-CAIRN-009/steps/S02.md), when code had to
create the folder and found the kit has no project name: `init` knows its
target, but `update` and `adopt` re-plan from `cairn.config.json`, which
records none, so a name derived from the directory drifts on a rename and
`update` writes a second, empty folder beside the first. The unit stopped,
put the decision to the owner in the chat with three options, and waited;
the owner chose the fixed name `product`, and S02 and S05 then rewrote the
three documents.

**The change to Cairn.** A placeholder in a record's surface name is a
decision the record left open, and the open skill should treat it as one:
when `cairn-open` scopes a path from records, an angle-bracketed name in a
surface those records name goes into the record's questions before the
go-ahead, where the owner answers it once, rather than into a unit's chat
where the path stops. One sentence in `cairn-open` step 2; no rule.

## 2. One measured fact lived in five documents, and nothing reconciled them

**Where.** *Five skills* and *26 files* — the kit's skill count and file
count — sat in the module note, the conformance page's kit row, the
installer's header comment, a test assertion and this repository's
README. The roadmap register's State column said `running` for four paths
that were done, while each path's record already carried `status: done`.

**What it cost.** The two counts were corrected across
[S01](../project/coding-paths/CP-CAIRN-009/steps/S01.md),
[S02](../project/coding-paths/CP-CAIRN-009/steps/S02.md),
[S03](../project/coding-paths/CP-CAIRN-009/steps/S03.md) and
[S04](../project/coding-paths/CP-CAIRN-009/steps/S04.md): each unit
corrected the copies it found, and each review then found one more the
unit had missed; the file count itself moved twice inside the path — 32
and the lock at S03, 33 at S04 — so a document corrected in one unit was
stale again in the next. The register's four stale rows were named in
[S06](../project/coding-paths/CP-CAIRN-009/steps/S06.md), raised to the
owner and left, being outside the path's acceptance.

**The change to Cairn.** A measured figure is written in one place and
pointed at from every other. The conformance page already carries the
kit's count as a measurement, since ADR-022 decision 2 made it no target;
the module note, the installer's comment and the README should link that
row rather than restate it. For the register, `cairn-active` already
derives the live view from the records (ADR-008 decision 5 made the
register reportable); the State column of the register's milestone rows
can be derived the same way, so a path's `status:` is the only place its
state is written. The first is a sentence in the close skill, where it
already asks whether the README lists a surface; the second is one
generated column, and a decision of its own.

## 3. A definition of done contradicted a record it cited

**Where.** Coding path 4's second item asked the kit's bootloader to say
`npm test` is an alias of `cairn-test`. ADR-014 decision 2, which that
item cites and the path pins in `governs:`, says the opposite for an
adopter: the kit installs no suite, its workflow runs no test step, and
the adopter's `npm test` is the adopter's. A generated bootloader
claiming the alias would be false in every installation.

**What it cost.** The writer found the contradiction in
[S01](../project/coding-paths/CP-CAIRN-009/steps/S01.md), on a
control-plane surface, with the item sealed by the opening acceptance's
digest — it could be read, not edited. The writer ruled the reading alone
— the alias sentence is this repository's, the kit's bootloader names no
suite — recorded it in the step, and left the owner to see the generated
file at the try before the merge.

**The change to Cairn.** Each item of a definition of done names the
record it implements; before the go-ahead, the open skill reads each item
once against the decision it names and corrects the item, so the owner
accepts items that agree with the records they cite. One sentence in
`cairn-open` step 2, beside the owner's reading of the plan (ADR-001
decision 2).

## 4. A record specified a mechanism nothing produces yet, with no way to say so

**Where.** ADR-015 decision 2 has `update` print, beside the diff of an
edited file, the release's one-line note on what changed in that
template. No release writes such a note: the mechanism that would produce
it is the release path's, row 7 of the register, and it did not exist
when the decision was accepted or when path 4 implemented `update`.

**What it cost.** [S03](../project/coding-paths/CP-CAIRN-009/steps/S03.md)
implemented what could be implemented — the diff alone, which the
decision allows where a note is missing — and wrote in its plan that no
release produces a note, where nobody scoping the release will read it.
Nothing in the record or on the conformance page says the note is
pending.

**The change to Cairn.** A record's implementation table can say
*pending* against a decision, naming the register row that owes it, and
the row names the clause back; when the row's path lands the mechanism,
it clears the word. That is one word in a table the layout already
prescribes and one clause in a register row, and no rule: the checker
does not read implementation tables, and should not start.
