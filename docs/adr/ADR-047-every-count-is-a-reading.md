---
type: Cairn Decision Record
title: ADR-047 — every count is a reading
description: Every figure of the weight budget — the specification's words, the required entry chain's, the files and skills the kit installs, the rules, the protocol files a unit writes — is measured at each release and reported beside the earlier ones, and none is a target, a cap or a bound; a figure that grows is explained by the need that grew it. Extends ADR-022 decision 2, which applied the owner's ruling of 2026-09-09 to the kit's file count alone.
tags: [cairn, adr, 1.2, conformance, budget]
timestamp: 2026-09-27T00:00:00Z
adr:
  id: ADR-047
  status: accepted
  date: 2026-09-27
---

# ADR-047 — every count is a reading

Status: accepted · 2026-09-27 · written by CP-CAIRN-018, S01

**Promoted from** the owner's words in the chat of 2026-09-27, as
[CP-CAIRN-018](../../project/coding-paths/CP-CAIRN-018/index.md) carries
them, repeating the ruling of 2026-09-09 that
[ADR-022](./ADR-022-the-learning-note-and-the-learning-session.md)
decision 2 quotes: *"stop stupid fixed counters, just do what make sense
and provide added value."*

## Context

ADR-022 decision 2 made the kit's file count a measurement and no bound.
The weight budget kept three targets from the convergence record: the
specification under 8,000 words, the required entry chain under 3,000,
one lightweight unit under 6 protocol files. At 1.2.0 the conformance page
read the entry chain *not bound, 37 over*, and the release put the target
to the owner. The owner answered that a count does not hold against a
need that is balanced and justified.

## Decision

Every figure of the weight budget is a reading. It is measured by a tool
at each release, written once in the conformance page's table beside the
earlier releases (ADR-031 decision 1), and bounds nothing: no target, no
cap, no *bound* or *over*. A need that is balanced and justified is taken
whatever it adds; where a figure grows, the page says which need grew it.
The three targets are withdrawn.

## Alternatives rejected

- **Moving the entry chain's target**: a new number for the rule the
  owner refused.
- **Keeping the targets as advisories**: a warning about a number is the
  same control, quieter.

## Consequences

- ADR-022 carries a line naming this record under decision 2; the records'
  index lists it.
- A release path measures and explains; it never asks the owner about a
  number.

## What the manifesto's test weighed

It removes three bounds and adds nothing.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| the readings | the weight budget; chapter 6's paragraph; the README's *Weight*; the tools' module note | `spec/reference/conformance.md`; `spec/index.md`; `README.md`; `docs/modules/application.md` |
