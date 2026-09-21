---
type: Cairn Decision Record
title: ADR-032 — registering on a trunk that takes no direct push
description: The direct-push registration names its precondition; `pull-request` registration lands the same metadata-only commit through a request, which the `registration` rule reads in the change under review; and the installer refuses the pairing that cannot work, reading the trunk's protection from GitHub once, at the owner's terminal. Supersedes two clauses of ADR-001 decision 1 for `pull-request` registration. Promotes K06, K07, K08 and K20 of Cairn 1.2, from Q2.
tags: [cairn, adr, 1.2, registration, transport, cairn-open, checker, kit]
timestamp: 2026-09-21T00:00:00Z
adr:
  id: ADR-032
  status: accepted
  date: 2026-09-21
---

# ADR-032 — registering on a trunk that takes no direct push

Status: accepted · 2026-09-21 · written by CP-CAIRN-012, S01

This record **supersedes** two clauses of decision 1 of
[ADR-001](./ADR-001-sole-owner-opens-and-closes-a-path.md), for the
`pull-request` registration transport only: *the request sequence goes;
the direct push stays*, and *the rules `registration` and
`registration-base` do not change*. Everything else of that decision
stands — on `manual-git` the go-ahead in the chat is the acceptance and
the commit lands on the trunk directly, there is no `registration-pending`
rule — and [ADR-024](./ADR-024-the-kit-installs-what-the-skills-perform.md)
stands with it: `init` writes `manual-git`. ADR-029 is not touched: the
checker still asks the host nothing, and decision 4 below says why the
installer may.

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-21-cairn-1-2-decisions.md) at blob
`cfe60ef6804526f939e2d7467fbe1cbee5f8a9df` (Q2, third option) and the
[asks note](../../feedbacks/2026-09-21-cairn-1-2-the-asks.md) at blob
`837262d5b3a761ef14d14bad0be8278133256e53` (theme 2, K06, K07 and K08;
theme 4, K20). The four lines come from observations 6 and 7 of
[Atomik's protected-trunk note](../../feedbacks/2026-09-21-atomik-opens-a-path-on-a-protected-trunk.md).
All three notes stay exactly as they were.

## Context

Atomik protects `master`: every change through a request, two required
checks, and no bypass for anyone. Its first 1.1 path, CP-OPS-003, was
written, accepted, digested and committed as `cairn-open` says, and the
one command the reference gives for landing it was refused:

```
remote: - Changes must be made through a pull request.
 ! [remote rejected] HEAD -> master (push declined due to repository rule violations)
```

There is no second sequence. `transport.registration: pull-request` is a
value the schema accepts and a repository may keep (ADR-024), and no page
— not the open skill, its reference, chapter 5 or the human-records
reference — says how it is performed. The protocol's own repository
declares `manual-git` on a `main` carrying the same two rules and
registers through an admin bypass, `bypass_mode: always`; Atomik's ruleset
has `bypass_actors: []`. The sequence works where the protocol was written
because of one field of a ruleset the protocol never names.

The only other route — carry the registration on the path branch and open
a request for both — is refused by the `registration` rule, correctly:
`pathRegistrationState` resolves the declaration on the trunk ref alone,
by `git show <trunk>:<record>`, so the request that carries the
declaration to the trunk is judged against the trunk it is not on yet, and
cannot merge while refused because the check is required. Locked on both
sides. The migration exception, `migration.unregisteredPaths`, is for
records that predate the predicate, and its advisory says not to copy it.

The schema also lets a repository declare `enforcementProfile: protected`
— the host prevents what the checker only reports — beside `manual-git`
registration — the writer pushes the trunk directly — and nothing catches
the pair: `init` refuses `protected` outright, `adopt` keeps whatever the
repository declared.

## Decisions

### Decision 1 — the registration sequence names its precondition

Promotes **K06**, from Q2.

One sentence in `cairn-open`, before step 3: the direct-push sequence
requires a trunk that accepts a direct push — an unprotected trunk, or a
bypass for the writer — and a trunk that requires a request registers
through decision 2. The configuration reference's *the one registration
sequence the open skill ships* becomes *the sequence its declaration
names*, because there are two.

What this changes: `skills/cairn-open/SKILL.md`, before step 3;
`spec/reference/configuration.md`, the paragraph on what `init` declares.

### Decision 2 — `pull-request` registration gets its sequence

Promotes **K07**, from Q2, third option: the sequence is supported, not
removed, and the value stays.

On `transport.registration: pull-request`, the accepted record and the
regenerated view reach the trunk through a request. The commit is the one
`manual-git` lands — metadata-only, the record and the view, its parent
the trunk tip pinned as `base_commit` — on a branch that carries that
commit and nothing else; one request; its run read green (decision 3);
the merge the trunk's own rules allow; then the path branch and its
worktree from the trunk that now carries the declaration. Nothing is
coded before the merge, as nothing is before the push. The branch is
deleted on merge as every transport branch is (ADR-006). The wait ADR-001
removed was a request the sole owner merged for themself on a trunk that
would have taken the push; here the trunk takes nothing else, and the
owner who merges is the one who gave the go-ahead.

`registration-base` already judges a record activated through a request
against what its registrant could pin (ADR-004 decision 1), so a trunk
that moved between the request and its merge is not a mismatch.

What this changes: `skills/cairn-open/SKILL.md`, step 3, and
`skills/cairn-open/reference.md`, a second sequence beside the first, each
under the declaration it serves; `spec/reference/configuration.md`, the
`transport` row; the pilot, `tools/cairn-pilot.mjs`, which today lands
the registration on the trunk directly on both transports.

### Decision 3 — the `registration` rule reads the change under review

Promotes **K20**, from Q2.

A declaration absent from the trunk is registered when the run's own
comparison contains the commit that declares it `running` and that
commit is a registration: it touches the record and the generated view
and nothing else, and its parent is the declared `base_commit`. Every
fact is read already — `registration-base` compares the parent, and the
closure rules read a commit that changes nothing outside a named surface.
A request carrying a registration and anything else is refused as today:
it is metadata-only or it is not a registration. On a trunk that took the
commit directly the declaration is on the trunk ref already, and the rule
answers as it does today.

What this changes: `tools/cairn-check.mjs`, `pathRegistrationState` and
the `registration` rule; `tools/cairn-fixture.test.mjs`, two fixtures — a
registration request read green, and one carrying a product file refused;
the rule's rows on `spec/reference/conformance.md` and in the catalogue
`tools/cairn-rules.mjs` writes; `tools/soundness.md`.

### Decision 4 — `init` and `adopt` refuse the pairing that cannot work

Promotes **K08**, from Q2, third option.

Two pairings are refused. `protected` with `manual-git` registration — a
declaration that the host prevents the direct push, beside one that the
writer makes it — is refused from the two declarations alone, no host
asked, at `adopt`, the one command that meets it. `manual-git`
registration on a trunk with no bypass for the writer is
refused where the installer can read the trunk's rules from GitHub — the
repository's remote, the owner's token — and the refusal names the two
ways out: a bypass for the writer, or `pull-request` registration.
Without a token, off GitHub, or offline, the installer does not read,
says so in one line, and writes what was asked: the refusal fires on a
reading obtained, never on one missing.

Why the installer may ask what the checker may not. ADR-029 deleted the
checker's reading because it ran on every commit, on every host, with a
CI token that could not see the bypass list, to print a claim about the
host that no local reader can prove. The installer runs once, at the
owner's terminal, with the owner's own credentials — which see the
ruleset in full — at the one moment the declaration is chosen, and it
refuses a file it is about to write rather than certify a setting. The
question is still GitHub's alone, and the installer says so: it reads no
other host, and its line says when it did not read. The checker keeps
making no network call, and the test ADR-029 added keeps proving it.

What this changes: `tools/cairn.mjs`, the `init` and `adopt` branches of
`main`, where `optionsFromConfig` and `buildConfig` meet the profile and
the two transports, and the `--profile protected` refusal beside which the
new refusals stand; `tools/cairn.test.mjs`; `spec/reference/configuration.md`,
the `enforcementProfile` and `transport` rows; the conformance page's
profile row, which says what `cairn-init` refuses. The two GitHub
functions ADR-029 moved to the post-mortem, `githubSlug` and
`githubRequest`, are the reading's; where they live once two tools call
them is the coding path's.

## Alternatives rejected

- **Say it plainly — the protocol needs a trunk you can push to** (Q2,
  first option, *simplest*): refused by the owner. A trunk protected the
  way every host's documentation recommends could not host the protocol.
- **The sequence and the rule, with no host reading** (Q2, second
  option): refused by the owner. The pairing is then found by the first
  path's refused push, as Atomik found it, behind a host error that names
  nothing of the protocol.
- **A checker rule or advisory reading the trunk's protection**: ADR-029,
  in full — every run, every host, a claim.
- **Asking the owner instead of GitHub — *does your trunk take a direct
  push?***: portable and native, and the owner chose the reading. A
  question answers what the owner believes and the reading what the host
  does; Atomik's owner declared what `init` writes, and the gap between
  the two is what the path met.
- **A bypass for the writer as the required setup**: it is one of the two
  ways out the refusal names, not the only one; an adopter who protects
  the trunk with no exception is the case the sequence exists for.
- **Branching before registration and landing both in one request**:
  forbidden by `cairn-open` and recognised by the repair reference as a
  shape to register retroactively; a declaration invisible to every
  sibling until the path merges.

## Consequences

- A trunk with no bypass can host the protocol, and `pull-request`
  registration is a value with a sequence behind it. Atomik's CP-OPS-003
  registers through it once the coding path lands.
- ADR-001 decision 1 carries a superseded-clause mark, and the 1.1 page's
  sentence *there is no `register/` branch and no registration request*
  is marked *superseded by* this record; the 1.2 page states the shape.

## What the manifesto's test weighed

Q2's option is tagged *adds a host reading*, and its second half adds a
case to a rule. The reading is one request to GitHub, at the one command
that writes the declaration, against the alternative of a legal value
nobody can perform. The sequence itself is native — a request, a
required check, the merge the trunk's rules allow — and nothing is built
beside it.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the open skill; the configuration reference | `skills/cairn-open/SKILL.md`, before step 3; `spec/reference/configuration.md`, the `init` paragraph |
| 2 | the open skill and its reference; the configuration reference; the pilot | `skills/cairn-open/SKILL.md`, step 3; `skills/cairn-open/reference.md`; `spec/reference/configuration.md`, the `transport` row; `tools/cairn-pilot.mjs` |
| 3 | the `registration` rule, its fixtures, its rows | `pathRegistrationState` in `tools/cairn-check.mjs`; `tools/cairn-fixture.test.mjs`; `spec/reference/conformance.md`; `tools/cairn-rules.mjs`; `tools/soundness.md` |
| 4 | the installer's `init` and `adopt`, their tests; the configuration reference; the conformance page's profile row | `tools/cairn.mjs`, `main`, `optionsFromConfig`, `buildConfig`; `tools/cairn.test.mjs`; `spec/reference/configuration.md`; `spec/reference/conformance.md` |

The 1.2 row of the [roadmap register](../../project/coding-paths/index.md)
names the coding paths that carry it, from this path's last unit.
