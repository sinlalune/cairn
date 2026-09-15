---
type: Cairn Decision Record
title: ADR-029 — the checker asks the host nothing
description: The GitHub reading behind the profile line is deleted — `forgeGaps`, `readForge`, the host half of `profileLine`, their tests and the token on the checker's workflow step, with `githubSlug` and `githubRequest` moved to the post-mortem that calls them — so `cairn-check` reads the repository alone, makes no network call and runs the same on any host; the profile line prints the declared transports and the enforcement profile and no claim about the host. Supersedes ADR-001 decision 6 and ADR-026 decision 1, from the owner's ruling of 2026-09-14 and the reading's measured cost.
tags: [cairn, adr, 1.1, checker, enforcement-profile, portability]
timestamp: 2026-09-15T00:00:00Z
adr:
  id: ADR-029
  status: accepted
  date: 2026-09-14
---

# ADR-029 — the checker asks the host nothing

Status: accepted · 2026-09-14 · written by CP-CAIRN-010, S01

This record **supersedes** decision 6 of
[ADR-001](./ADR-001-sole-owner-opens-and-closes-a-path.md) — the `ci`
profile says what it cannot see — and decision 1 of
[ADR-026](./ADR-026-the-readings-that-must-not-lie.md) — a reading the
forge withheld is reported as unread — both in full. The other six
decisions of ADR-001 and the other three of ADR-026 stand.

**Promoted from** the owner's ruling of 2026-09-14, given in the chat of
a learning session and first acted on by
[coding path 4's S04](../../project/coding-paths/CP-CAIRN-009/steps/S04.md)
at blob `94d7d260b7cc4df3cd335174092e9c74d5f3d349`, whose review took the
token off the kit's generated checker step because *the owner ruled on
2026-09-14 that `cairn-check` asks the host nothing*; the ruling's
argument is carried by
[this path's record](../../project/coding-paths/CP-CAIRN-010/index.md) at
its registration blob `fc0550f16c9b6a73d9c31890a38a6d723494eaa3`, which
the owner read and accepted. Both stay exactly as they were.

## Context

ADR-001 decision 6 gave the checker a line: with a token, what the host
does not enforce on the trunk — a check not required on the exact commit,
a rewriting merge, a role that bypasses the rules; without one, that the
host was not read. Coding path 3 mapped the token in and the line
certified a protection this repository does not have, because GitHub
elides a ruleset's bypass list below write access; path 3 took the token
out and closed its item unmet. ADR-026 decision 1 taught the reading to
say what was withheld, and coding path 5 put the token back with a
twelve-line comment on the workflow step explaining why.

The owner reached the ruling from the contradiction in that history. The
word was portable — *the forge* — and the mechanism was GitHub's alone:
one `https://api.github.com` URL, the only network address in the
checker. The question the line asks, *does the host enforce what these
records claim?*, has no portable form. GitHub's rulesets, GitLab's
protected branches and Gitea's branch protections share neither a model
nor an answer; a self-hosted host, a fixture's bare remote and any
repository without a token print *not read*, which is a line that says
nothing. And what the line was for on this repository — the role that
bypasses the trunk's rules, the price of ADR-001 decision 1 — is shown
on GitHub's own settings page for the ruleset, where the owner reads it.

What the reading costs, measured at this record's base commit:

| What | Measured |
| :-- | :-- |
| the block at the head of `tools/cairn-check.mjs`, lines 64 to 196 — `githubSlug`, `forgeGaps`, `readForge`, `profileLine` | 133 lines, 68 of them code; 5 of the 68 are `githubSlug`, which moves rather than dies |
| the lines of `main` reading the token and calling the read | 8 |
| tests in `tools/cairn-check.test.mjs` given to the reading | 13, carrying 48 assertions: 11 tests and 31 assertions on the reading alone, deleted; one test of 11 assertions on `githubSlug`, which moves with it; one of 6 on the profile line, rewritten |
| the token on the checker's step of `.github/workflows/cairn.yml`, with its comment | 13 lines |
| records and paths spent on the reading | ADR-001 d6, ADR-026 d1; coding path 3's S03 and item 2, coding path 5's S01 and S02 |
| what it produces | one line of output, on one host |

## Decision

### Decision 1 — the checker reads the repository and asks the host nothing

Supersedes ADR-001 decision 6 and ADR-026 decision 1. The owner's ruling
of 2026-09-14.

`cairn-check` reads the repository it stands in and nothing outside it.
`forgeGaps`, `readForge` and the host half of `profileLine` are deleted
with their tests; `githubSlug` and `githubRequest` move, below. The profile line prints the enforcement
profile the configuration declares and its two transports — on this
repository, `profile — ci; transports registration manual-git,
integration pull-request` — and no claim about the host: not what it
enforces, not what it withheld, not that it was not read. `GITHUB_TOKEN`
and `GH_TOKEN` are read nowhere in the checker. The token leaves the
checker's step of this repository's workflow, and the workflow the kit
generates — which coding path 4's S04 already left without it — is
proved so by a test. The post-mortem step keeps its token in both
workflows: it is the post-mortem's own, for the red-run reading and the
one comment it posts (ADR-014 decision 1), and no ruling touches it.

The checker makes no network call, and a test proves it: the checker is
run with the runtime's network entry points made to throw, and the
verdict is read green. Two functions in the checker's file are the
post-mortem's and not the checker's — `githubSlug`, which names the
repository behind a remote, and `githubRequest`, one read of the host —
imported from there since coding path 5's S04 moved the post-mortem's
plumbing into the checker's file, and called by the post-mortem alone for
its red-run reading. They move to `tools/cairn-postmortem.mjs` with their
tests, so that the checker's file carries no GitHub code; the
post-mortem's token, its step and its output do not change. That move
widens the path's `writes:` by the post-mortem and its test, and the unit
that makes it says so.

The enforcement-profile concept keeps its sentence that host settings
need evidence independent of the declaration. The evidence is the
owner's, read on the host's own settings page; the checker never had it
and no longer claims to.

What this changes, by today's names: `tools/cairn-check.mjs`, the block
at its head and the lines of `main` that call it; `tools/cairn-check.test.mjs`,
eleven tests deleted, the profile line's rewritten and two moved;
`tools/cairn-postmortem.mjs` and `tools/cairn-postmortem.test.mjs`, which
receive `githubSlug`, `githubRequest` and their tests; the checker's
step of `.github/workflows/cairn.yml`, its token and its comment;
`tools/cairn-workflow.test.mjs`, whose assertion that the checker's step
carries the token inverts; `tools/cairn.test.mjs`, one assertion that the
generated checker step carries none; the profile row of
`spec/reference/conformance.md`, the catalogue `tools/cairn-rules.mjs`
writes into it and the hand-written matrix where either names the host
reading; `tools/soundness.md`; `docs/modules/application.md`, whose
paragraph *The profile line* describes the reading.

## Alternatives rejected

- **The reading behind an option, `github` or `none`** (keeps the code):
  an abstraction with one implementation, costing what the table
  measures, for a line GitHub's own page already shows. The owner's
  ruling refused it in these words.
- **A portable reading over three hosts** (adds code): three models with
  no shared answer, so three readings and three lines, each as
  unprovable as the one deleted, at three times the cost.
- **The reading kept and the token dropped**, as coding path 3 left it
  (keeps the code): *not read* on every run is the honest line and the
  empty one, and the 133 lines stay to print it.
- **A token wide enough to see the bypass list**: refused by ADR-026
  already — a credential to rotate, to make one line true.
- **The reading through the host's command-line client**: the same host,
  the same unportable question, plus a binary the runner has and a
  laptop may not.
- **The reading moved into the post-mortem** (moves the code): the
  post-mortem reads facts after a red run; a profile is a claim about
  settings, and the question is no more portable there.

## Consequences

- A run offline, a fixture's bare remote, a self-hosted host and GitHub
  print the same line: the checker has no network call.
- The bypass ADR-001 decision 1 costs is not the checker's to print.
  ADR-001's consequence that *the checker prints this on every run* is
  superseded with its decision 6; the owner reads the ruleset's own page,
  which shows it.
- Coding path 3's item 2, closed unmet and then met by ADR-026 decision 1,
  is moot; its journal entry stands as the history of that.
- The word *the forge* loses its one mechanism: the 1.1 page names GitHub
  where GitHub is meant, the specification keeps *the host*, and no
  concept note is written for a word with nothing behind it.
- Two records carry a superseded decision each, marked in their status
  lines, under the decision's heading and in the index; nothing else in
  them moves.

## What the manifesto's test weighed

Nothing is added but the test that proves the absence. Seventy-one lines
of code — sixty-three of the block, eight of `main` — thirty-one
assertions, one token and one comment are deleted, and two functions move
to the tool that calls them. The first
threat — more control through more code — is here measured rather than
argued: the table above is what one line of output on one host cost.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the checker's head block and `main`; its tests; the post-mortem and its test, which receive the two functions; this repository's workflow and the two workflow tests; the conformance page's profile row, the catalogue and the matrix; the soundness note; the tools' module note | `githubSlug`, `forgeGaps`, `readForge`, `profileLine` in `tools/cairn-check.mjs`; `tools/cairn-check.test.mjs`; `tools/cairn-postmortem.mjs` and `tools/cairn-postmortem.test.mjs`; `.github/workflows/cairn.yml`; `tools/cairn-workflow.test.mjs`; `tools/cairn.test.mjs`; `spec/reference/conformance.md`; `tools/cairn-rules.mjs`; `tools/soundness.md`; `docs/modules/application.md` |

Row 6 of the [roadmap register](../../project/coding-paths/index.md)
carries it, in CP-CAIRN-010, S03.
