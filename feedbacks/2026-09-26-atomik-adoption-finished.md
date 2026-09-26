---
type: Cairn Feedback
title: Atomik's adoption is finished — the gates caught almost nothing, sixteen fresh reads caught the claims
description: The closing report of Atomik's adoption of 1.1.0, five paths from adopt to a repository that diverges from the release in one file, carried here by the owner on 2026-09-26 from the adopter's session; what it asks of Cairn is two sentences of the unit skill — print, don't remember; write the review into the step record before the commit — and the evidence is what the gates did not catch and the fresh-context reads did.
tags: [cairn, feedback, agent, adopter, atomik, cairn-unit, review, 1.2]
timestamp: 2026-09-26T00:00:00Z
cairn:
  status: provisional
---

# Atomik's adoption is finished

Written by the agent that ran Atomik's adoption — Claude Code — as its
closing report to the owner, and carried into this folder by the owner on
2026-09-26, in the words the report used. Five paths in Atomik answered
the question the adoption opened with, whether adopting 1.1 surfaces
problems. Three of its notes are already here:
[the adoption](./2026-09-21-atomik-adopts-1-1.md),
[the protected trunk](./2026-09-21-atomik-opens-a-path-on-a-protected-trunk.md)
and [the first update](./2026-09-22-atomik-first-update.md).

## Where it lands

Atomik runs release 1.1.0 and diverges from it in exactly one file:
`tools/cairn-check.mjs`, recorded in Atomik's ADR-023, held one patch
ahead to carry the two `links` exemptions the release dropped and ruled
the adopter's own while giving the adopter no way to declare them. Only a
Cairn change retires it — the configuration field asked for in the
adoption note, which [ADR-037](../docs/adr/ADR-037-a-repository-declares-its-link-exemptions.md)
decided and coding path 2 of 1.2 landed as `linkExemptions`.

Everything else is the host half working as designed: ten edited kit
files that are meant to be host-specific, kept by `update`, now correctly
named on a pointer page that until three days earlier claimed there were
none.

Five upstream reports, all merged: the silent CI break, the registration
deadlock on a protected trunk, three declared roots the kit derived
instead of reading, and the lock that churns on the clock. That last one
is what makes 1.2 land cleanly — without it, 1.2's lock diff arrives
wrapped in fifteen digests of date-stamp noise.

## What the adopter wants recorded about how it went

The gates caught almost nothing. Sixteen fresh-context reads caught
nearly everything, and what they caught was rarely code — it was claims:
four recalled figures, an object id typed by hand, a causal history the
writer invented and shipped inside a workflow file, twice an outcome
recorded as met that nobody had observed, and a shell substitution that
pasted command output into an immutable record.

The two rules that would have prevented most of it are in Atomik's
journal: **print, don't remember** — every figure, id or outcome written
into a record is pasted from a command's output, never recalled; and
**write the review into the step record before the commit, not after**.

## The change to Cairn

Two sentences in `skills/cairn-unit/SKILL.md`, and no rule: the checker
cannot tell a recalled figure from a printed one, and the reads that
caught them are the movement ADR-017 already mandates. The first belongs
in the change movement, beside *no object id is typed by hand* (ADR-009),
widened from ids to every figure and every outcome; the second in the
order of the five movements, where a review that follows the commit is a
unit with two commits or a record edited after its blob. The same lesson
is in this repository's own journal for coding path 1 of 1.2, whose
three prose reads missed a glob that matched thirteen records: tell the
fresh reader to check claims by running commands.

Open in Atomik, and the owner's: two paths registered but invisible with
a month of drift, and the next unopened row of the product register.
Neither is Cairn's.
