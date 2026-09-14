---
type: Cairn Decision Record
title: ADR-026 — the readings that must not lie
description: A reading the forge withheld is reported as unread and never as an answer, and the profile line names what it could not read; the review rule judges the ledger's newest completed unit, and current_step selects nothing; the integrating commit is one commit for one path, which is the reading the checker has; and the refusal of a merge object carrying done binds on pull-request integration transport alone. Promoted from CP-CAIRN-007's S03 and journal entry; extends ADR-001 decision 6, ADR-017 decision 2 and ADR-008 decision 2, and supersedes one sentence of the last.
tags: [cairn, adr, 1.1, checker, forge, review, acceptance]
timestamp: 2026-09-14T00:00:00Z
adr:
  id: ADR-026
  status: accepted
  date: 2026-09-14
---

# ADR-026 — the readings that must not lie

Status: accepted · 2026-09-14 · written by CP-CAIRN-008, S01

**Promoted from**
[CP-CAIRN-007 S03](../../project/coding-paths/CP-CAIRN-007/steps/S03.md)
at blob `fe9805f030b7efe77b91a7a43c28e6a1d51b5442`, which took the token
back out and named the reading that lied, and the
[journal entry](../../project/log/2026-09-14-cp-cairn-007.md) of that
path at blob `ad1ee64039293cb622014f654389b6adcc0dd4a3`, which carries it
and the debts beside it. Both stay exactly as they were.

The sentence this record makes bind is the checker's own, in the block
that prints the profile line — *"Not read" is an honest line; a wrong
reading is not* (`tools/cairn-check.mjs`, the comment on `githubSlug`) —
and binding nowhere, which is why `forgeGaps` could break it with no
record, rule or test noticing.

This record **supersedes one sentence** of decision 2 of
[ADR-008](./ADR-008-housekeeping-with-no-choice-in-it.md) — *never two
paths in one request* — by decision 3 below. It **extends** decision 6 of
[ADR-001](./ADR-001-sole-owner-opens-and-closes-a-path.md), decision 2 of
[ADR-017](./ADR-017-the-review-movement.md) and the rest of ADR-008
decision 2.

## Context

Three readings of the checker say more than they read, and one says it
about itself.

**The forge reading.** ADR-001 decision 6 gives the checker a profile
line: with a token it prints what the forge does not enforce, and without
one it prints that the forge was not read. Coding path 3 mapped
`GITHUB_TOKEN` into the checker's workflow step so the line would be the
first kind. Run `34756757308`, on commit `1505444`, then printed

```text
profile — transports registration manual-git, integration pull-request; forge enforces everything these records name
```

while this repository's trunk ruleset `22101008` carries
`bypass_actors: [{actor_id: 5, actor_type: RepositoryRole, bypass_mode:
always}]`, which is how the owner's own pushes to the trunk print
*Bypassed rule violations*. The forge does not refuse that field; it
**elides** it. GitHub's REST documentation for a repository's rules
states it plainly: *"To prevent leaking sensitive information, the
bypass_actors property is only returned if the user making the API
request has write access to the ruleset"*
([Repository rules](https://docs.github.com/en/rest/repos/rules)). A
workflow's own token can never have that access: `administration` is not
among the permissions a `permissions:` block may grant `GITHUB_TOKEN`
([Workflow syntax, `permissions`](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions)).
So the request answers `200` with the field simply absent, and
`forgeGaps` reads `ruleset?.bypass_actors ?? []` — an empty list, which
it reports as a trunk nobody bypasses. `readForge` already refuses to
answer when a ruleset request **errors**, for exactly this reason, in its
own comment; an elision inside a successful answer walks past that guard.
Path 3 took the token back out, because *forge not read* is at least
true, and closed item 2 of its definition of done knowingly unmet. The
remedy is a line that says what it could not see.

**The review rule's selection.** ADR-017 decision 2 says the checker
reads the review section *of the current unit*. The rule implements the
current unit as
`workUnits.find((unit) => unit.step === match.front.current_step) ??
workUnits.at(-1)`, over a list already sorted by ordinal. The fallback
is the ledger's newest, which is the unit being judged; the `find` can
only ever move the rule to an **older** one, because no unit newer than
the newest exists to be named. On coding path 3 the field said `S01`
from registration through S08, so every unit from S02 on was judged on
S01's review section and never on its own — which that path's journal
entry reports as what the gate was not doing.

**The two sentences of ADR-008 decision 2.** That decision opens *On
`pull-request` transport* and then states two prohibitions: *never a
merge object carrying the edit, never two paths in one request*. The
checker reads neither as written. It refuses two paths reaching `done`
in one **commit** — arguing in its own comment that two arrivals in one
request is an ordinary comparison spanning two honest integrations, and
carrying a test that asserts that case green — and it refuses a merge
object carrying `done` on **every** transport, while `cairn-close` step
5 and chapter 5 both prescribe the `--no-ff` merge as the integrating
unit on `manual-git`. A repository that installs `manual-git`
integration cannot close a path past this checker today.

## Decision

### Decision 1 — a reading the forge withheld is reported as unread, never as an answer

Extends ADR-001 decision 6.

Where the forge answers but omits a field the reading needs, the omission
is a reading **not made**, and it is reported as one. The absent field is
never given the value that happens to be reassuring, and never any value
at all.

Concretely, for the reading ADR-001 decision 6 names: a ruleset whose
`bypass_actors` the caller may not see is reported as *bypass list not
read*, never as a trunk nobody bypasses. `readForge` names the half it
could not read rather than collapsing the whole read to unread, and the
profile line prints, in one line, what was read, what was withheld, and
what the forge does not enforce among what was read. A withheld reading
is reported, never refused: the checker does not fail a run because a
token is small.

Because the line can now say what the token cannot see, `GITHUB_TOKEN`
returns to the checker's step of `.github/workflows/cairn.yml`, and item
2 of coding path 3's definition of done is met by the reading rather than
by the token.

What this changes, by today's names: `forgeGaps`, `readForge` and
`profileLine` in `tools/cairn-check.mjs`, obligation 8 of the
configuration contract; their cases in `tools/cairn-check.test.mjs`; the
checker's step of `.github/workflows/cairn.yml`.

### Decision 2 — the `review` rule judges the ledger's newest completed unit

Extends ADR-017 decision 2.

The rule reads the `#### Review` section of the ledger's newest completed
unit — the unit under review — and nothing but the ledger's own order
selects it. `current_step` keeps its place in the record's schema, where
every record of this repository carries it and the `work-unit` rule reads
it, and it selects nothing here.

What this changes: the rule `review` in `tools/cairn-check.mjs`, the
`find(…) ??` gone; one adversarial fixture in
`tools/cairn-fixture.test.mjs` whose `current_step` names an older unit
than the one just written, with the newer unit's review section empty;
the rule's entry in the catalogue `tools/cairn-rules.mjs`, whose
`enforcing` line still reads *the unit `current_step` names, else the
ledger's newest*, and the catalogue row it generates into
`spec/reference/conformance.md`; the hand-written matrix row on that same
page, which says the rule reads *the unit `current_step` names, or the
ledger's newest where it names none* and sits above the generated
markers, so regenerating the catalogue does not reach it;
`tools/soundness.md`.

### Decision 3 — the integrating commit is one commit for one path, and that is what binds

Supersedes the sentence *never two paths in one request* of ADR-008
decision 2.

The integrating unit is one commit, from a clean trunk checkout, for one
path. Two paths reaching `done` in one commit is the refusal. Two honest
integrations reached in one comparison — two commits, each its own
integrating unit — is not, and refusing it would tell the author to do
what they already did. Everything else of ADR-008 decision 2 stands.

What this changes: the comment and the test of the rule `acceptance` in
`tools/cairn-check.mjs` and `tools/cairn-fixture.test.mjs`, which already
read the commit and now say so; `skills/cairn-close/SKILL.md` step 5,
which path 3 already wrote in these words.

### Decision 4 — the merge-object refusal binds on `pull-request` integration transport

Extends ADR-008 decision 2.

On `pull-request` the candidate lands with the merge and `done` is
recorded in a commit of its own, so an integrating commit that is a merge
object carrying `done` is refused. On `manual-git` the `--no-ff` merge
**is** the integrating unit, carrying those edits, as `cairn-close` step
5 and chapter 5 both prescribe and as ADR-008 decision 2's own opening
clause bounds it; the refusal does not bind there. The rule reads the
declared integration transport, not the shape of the commit alone.

What this changes: the rule `acceptance` in `tools/cairn-check.mjs`, with
one fixture per transport in `tools/cairn-fixture.test.mjs`;
`skills/cairn-close/reference.md`, which gives the `--no-ff` commands
without saying what the checker allows there.

## Alternatives rejected

- **A fine-grained token with an administration scope, in a secret, so
  the bypass list can be read**: the manifesto's first threat — more
  control, bought with a credential to rotate — to make one line of
  output true. The adopter who wants it may set it; it is never the
  kit's default.
- **Leaving the token out, as path 3 left it**: honest and blind. *Forge
  not read* then hides the three gaps the token CAN read — a check not
  required on the exact commit, a rewriting merge, no pull request
  required — and decision 6 exists to print those.
- **A finding rather than a line for the withheld half**: ADR-001
  decision 6 already settled that a profile is a claim about settings and
  its remedy is a setting; a withheld reading is less again, its remedy
  being a token. Blocking on it would teach the writer to widen the
  token, which is the alternative above bought by the gate instead.
- **Deleting `current_step` from the record's schema now that it selects
  nothing**: every record of this repository carries it and `work-unit`
  reads it; removing a schema field is a decision of its own, and this
  record's business is the rule that misread it.
- **Keeping `current_step` as the rule's selector and adding a rule that
  it names the newest unit**: a second rule to protect the first, where
  deleting six characters removes the class. The first threat again.
- **Reading the review section of every unit of the ledger**: a step
  written before ADR-017 existed would be refused when a later unit is
  judged, which is the reason the rule reads one unit at all.
- **Amending ADR-008 decision 2 in place so its sentence matches the
  checker**: a record is not edited to agree with the code that
  outgrew it; the supersession is written where a reader can see both.
- **Widening the request refusal instead — refusing two arrivals in one
  comparison**: the checker's own comment already disproves it, and the
  test asserting that case green would have to be inverted to make a
  true statement false.
- **Gating the merge-object refusal on the shape of the trunk's history
  rather than on the declared transport**: the declaration is the fact
  the repository states about itself, and every other transport-shaped
  rule of the checker reads the same field.

## Consequences

- The `review` rule judges the unit that was just written, from this
  record's implementation onward. What it read on coding paths 1 to 3 is
  what those paths' records say it read; nothing is re-judged.
- A repository declaring `manual-git` integration can close a path
  through this checker.

## What the manifesto's test weighed

Four decisions, no rule: two readings are corrected, one refusal is gated
by a field the checker already reads, and one sentence is superseded by
the narrower true one.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the checker's forge reading and profile line, its cases, the workflow | `forgeGaps`, `readForge`, `profileLine` in `tools/cairn-check.mjs`; `tools/cairn-check.test.mjs`; `.github/workflows/cairn.yml` |
| 2 | the review rule, its fixture, the catalogue, the conformance page's generated and hand-written rows, the soundness note | rule `review` in `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `tools/cairn-rules.mjs`; `spec/reference/conformance.md`; `tools/soundness.md` |
| 3 | the acceptance rule's comment and test, the close skill | rule `acceptance` in `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `skills/cairn-close/SKILL.md` |
| 4 | the acceptance rule, its two fixtures, the close reference | rule `acceptance` in `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `skills/cairn-close/reference.md` |

Row 5 of the [roadmap register](../../project/coding-paths/index.md)
carries all four, in CP-CAIRN-008.
