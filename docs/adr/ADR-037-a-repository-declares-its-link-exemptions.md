---
type: Cairn Decision Record
title: ADR-037 — a repository declares its link exemptions
description: A list in `cairn.config.json` names the paths whose relative links the `links` rule does not resolve, each with its reason beside it, so a portrayal or a frozen history is declared in the one file every other host-specific answer already lives in, and never by forking the checker; the conformance page says the two 0.2 exemptions left deliberately and are the adopter's to declare, and `adopt` names a file whose links do not resolve as a shape that wants a declaration rather than a repair. Promotes K21 of Cairn 1.2, from Q11.
tags: [cairn, adr, 1.2, checker, links, configuration, adopt]
timestamp: 2026-09-22T00:00:00Z
adr:
  id: ADR-037
  status: accepted
  date: 2026-09-21
---

# ADR-037 — a repository declares its link exemptions

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S03

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q11, first option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 4, K21). The line
comes from [Atomik's adoption note](../../feedbacks/2026-09-21-atomik-adopts-1-1.md),
observation 1. Both stay exactly as they were. It supersedes no record:
the ruling of [CP-CAIRN-001's S06](../../project/coding-paths/CP-CAIRN-001/steps/S06.md)
— *those exemptions were Atomik's* — stands, and this record gives that
ownership a place to live.

## Context

Atomik keeps fixtures that portray another vault and a journal frozen by
its own first lines. Its 0.2 checker exempted both from the `links` rule
and said why; the exemptions left the protocol's checker in CP-CAIRN-001
S02, deliberately, and S06 of the same path met these five findings at
Atomik and ruled them the adopter's work. On 2026-09-21 `adopt` ran on
Atomik and the next command printed the same five blocking `links`
findings in files the adoption had not touched. The work as assigned is
to edit a file the repository declares unrewritable or delete the
evidence, and the only way to say *these paths are portrayals, this file
is frozen* was to edit the checker — which `status` then reports as an
edited kit file at every reading. Nothing on the conformance page says
the two exemptions were decided; the rule's message names the link and
not the class; `adopt` names neither the folder nor the file among the
shapes it reports, and nothing connects them to the findings the next command
prints.

## Decisions

### Decision 1 — `cairn.config.json` declares the paths whose links are not resolved

Promotes **K21**, from Q11, first option.

The configuration carries a list of paths — a file or a folder, relative
to the repository — whose relative links the `links` rule does not
resolve, each with its reason written beside it. The rule reads the list
and skips those files; a declaration with no reason is a schema error.
The checker carries no adopter's name, and a repository that fixtures a
portrayal or freezes a history says so in the one file every other
host-specific answer already lives in, reviewable in one place.

What this changes: `cairn.config.json`'s schema in
`tools/cairn-config.schema.json` and its loader `tools/cairn-config.mjs`;
the `links` rule in `tools/cairn-check.mjs`; one fixture in
`tools/cairn-fixture.test.mjs` — a declared file with a link that does
not resolve, green, and the same file undeclared, refused; the field's
row of `spec/reference/configuration.md`; the `links` rows of
`spec/reference/conformance.md` and of the catalogue `tools/cairn-rules.mjs`
writes.

### Decision 2 — the conformance page says the exemptions were decided, and `adopt` names the shape

The second half of **K21**.

The `links` row of the conformance page, whose last cell reads *none*,
says beside it that the two 0.2 exemptions left in CP-CAIRN-001 S02 and
that a portrayal or a frozen history is the adopter's to declare, under
decision 1. `adopt`, which already reads the tree for the shapes 0.2
left, names a file whose relative links do not resolve as a shape that
wants a declaration rather than a repair, with the field's name.

What this changes: `spec/reference/conformance.md`, the `links` row;
`staleShapes` in `tools/cairn.mjs`; `tools/cairn.test.mjs`.

## Alternatives rejected

- **No exemptions, and the ruling restated** (Q11, second option,
  *simplest*): refused by the owner. A repository with such files forks
  the checker or deletes evidence, and the ruling of S06 would stand
  assigning work that cannot be done.
- **The two exemptions back in the checker**: one repository's names in
  the protocol's tool, which is what S02 removed.
- **A comment or a marker inside the exempted file**: a frozen file is
  not edited to say it is frozen; the declaration lives beside the other
  declarations.
- **An advisory instead of a blocking finding for a declared path**: a
  declared portrayal has links that must not resolve; a line saying so
  at every run is noise, and the reason is in the configuration for
  whoever asks.

## Consequences

- Atomik's checker returns to pristine on the next `update --take`, with
  its two exemptions declared in its configuration; `status` stops
  reporting the fork.

## What the manifesto's test weighed

Q11's option is tagged *a configuration field, no new rule*: the rule
that exists reads one more list, in a file the adopter already owns,
against a fork of the checker that `status` reports for ever.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the configuration schema and loader; the `links` rule and its fixture; the configuration reference; the rule's rows | `tools/cairn-config.schema.json`; `tools/cairn-config.mjs`; rule `links` in `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `spec/reference/configuration.md`; `spec/reference/conformance.md`; `tools/cairn-rules.mjs` |
| 2 | the conformance page's `links` row; the adopt report | `spec/reference/conformance.md`; `staleShapes` in `tools/cairn.mjs`; `tools/cairn.test.mjs` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding path that carries it, from this path's last unit.
