---
type: Cairn Coding Path
title: Every count is a reading
description: The owner's ruling of 2026-09-09 — no fixed counter binds — carried to every figure of the weight budget, where ADR-022 decision 2 carried it to the kit's file count alone; the specification's three word and file targets removed, the budget table and its prose made readings, before 1.2.0 is tagged.
tags: [coding-path, cairn-1.2, conformance, budget]
timestamp: 2026-09-27T00:00:00Z
cairn:
  id: CP-CAIRN-018
  route: full
  status: done
  current_step: S03
  base_commit: f78c338f8f83596c3a87a10010f193c2e9ea5e3e
  branch: path/cp-cairn-018
  assigned_writer: cp-cairn-018-writer
  depends_on: []
  subject_commit: 241ef43be3cf45461bf05514fe48b453647c9d16
  resolution: completed
  writes:
    - docs/adr/**
    - spec/index.md
    - spec/reference/conformance.md
    - README.md
    - docs/modules/application.md
    - CHANGELOG.md
    - tools/cairn-pilot.test.mjs
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-018/**
  governs:
    - docs/adr/ADR-022-the-learning-note-and-the-learning-session.md@9be9aac1f3885251dda62c615c6f7cfb761b370f
    - docs/adr/ADR-031-one-place-for-a-fact.md@d2cbcd6f7a6d2320784f4fb16d08d95cd4fc0b2a
---

# CP-CAIRN-018 — every count is a reading

## Goal

This path writes one record saying that every figure of the weight
budget is a reading, never a target, and makes the specification's
chapter, the conformance page, the README and the tools' module note say
so. It is the least because the owner already ruled it on 2026-09-09 —
*stop stupid fixed counters, just do what makes sense and provides added
value* — and ADR-022 decision 2 applied the ruling to the kit's file count
alone, leaving three targets standing: the specification under 8,000
words, the required entry chain under 3,000, one lightweight unit under 6
protocol files. It changes no rule, no tool and no skill; the three-line
cap of `cairn-code` is the shape of an explanation, not a measurement, and
stays.

At 1.2.0 the conformance page read the entry chain *not bound, 37 over*
and put the target to the owner; the owner answered on 2026-09-27 that a
count does not hold against a need that is balanced and justified.

## Definition of done

- One decision record, ADR-047, in the layout's shape, extends ADR-022
  decision 2 to every figure of the weight budget — the specification's
  words, the entry chain's words, the protocol files a unit writes: each
  is measured at every release and reported beside the earlier ones, and
  none is a target, a cap or a bound; a figure that grows is explained by
  the need that grew it. ADR-022 carries a line naming it; the records'
  index lists it with no gap.
- `spec/reference/conformance.md`'s weight budget has no *Target* column
  and no word *bound*, *over*, *under* or *target* about a figure; its
  prose says what each figure is and how it is read, and says of the
  entry chain at 1.2.0 what grew and why.
- Chapter 6 of `spec/index.md` says the weight budget is measured at
  release and binds nothing, naming no figure; the README's *Weight*
  section and the tools' module note say the same, restating no figure
  (ADR-031 decision 1).
- `CHANGELOG.md`'s 1.2.0 section says, in one line, that the budget's
  figures are readings; the register's coding paths of 1.2 gain a row for
  this path.
- Nothing else changes: no rule, no tool, no skill, no template.
- Every completed step has one self-contained step record, a fresh-context
  review with each finding's disposition, and gates read green before
  one commit; the candidate is closed as the close skill says, the owner
  merging the request, and `1.2.0` is then tagged on this path's integrating
  commit.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-27T20:00:22Z
scope_ref: project/coding-paths/CP-CAIRN-018/index.md#definition-of-done
scope_digest: sha256:0e52cf1f4ddf54b10194e66a0555060ee65d95b3369bfe9bc151b8cf3b065784
```

Reviewed in the chat of 2026-09-27: the owner pointed at the ruling of
2026-09-09 when the release reported the entry chain over its target; the
writer proposed a small path — a record, the budget's target column gone,
the paragraph rewritten, a sweep for other bounds — before or after the
tag; the owner answered *Run it*, which is this acceptance, and the path
runs before 1.2.0 is tagged. Route `full` because it writes a decision
record. Amendments: none.

## Documentation coverage

### Required

- ADR-022 decision 2 and ADR-031 decision 1, at the blobs pinned above.
- `spec/reference/conformance.md`, *The weight budget*, and chapter 6 of
  `spec/index.md`.

### Deliberately excluded

- `skills/cairn-code/SKILL.md`, *the three-line cap*: the shape of an
  explanation, decided by ADR-016 and ADR-021, not a measurement of the
  kit.
- The journal entry of CP-CAIRN-017, which says the target was left to
  the owner: a journal is history.

## Steps

- **S01** — ADR-047 and every surface it names. [Record](./steps/S01.md).
- **S02** — the rule the checker gained, explained, from the request's
  reviewer on `54dc997`. [Record](./steps/S02.md).
- **S03** — the pilot test binds no withdrawn target, from the closing
  read of `0b7ee43`. [Record](./steps/S03.md).

## Resume

### Checkpoint

```text
commit : 241ef43be3cf45461bf05514fe48b453647c9d16 — C, the third candidate: S03
unit   : 3
base   : f78c338f8f83596c3a87a10010f193c2e9ea5e3e
trunk  : f78c338f8f83596c3a87a10010f193c2e9ea5e3e — origin/main at registration
```

### Next action

The owner reads request #36 and merges; then the integrating commit, and
`1.2.0` tagged on it.

### Blockers

None.

### Tried and rejected

- Keeping the targets and moving the entry chain's to 3,100: a new number
  for the same rule the owner refused.
- Leaving it until after the tag: 1.2.0 would ship a page that reports a
  count as a breach.

### Reading order

1. ADR-022 decision 2.
2. `spec/reference/conformance.md`, *The weight budget*.

### Verify

```bash
npm run cairn-check
npm run cairn-active -- --check
npm test
```
