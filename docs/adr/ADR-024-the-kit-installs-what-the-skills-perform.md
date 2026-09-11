---
type: Cairn Decision Record
title: ADR-024 — the kit installs what the skills perform
description: A repository installed at 1.1 declares transport.registration manual-git, so the one registration sequence the open skill ships is the one its configuration names; pull-request stays a value the field accepts, and an installed repository keeps the declaration it made. Supersedes the clause of ADR-001 decision 1 that kept the kit's default at pull-request.
tags: [cairn, adr, 1.1, transport, registration, kit]
timestamp: 2026-09-11T00:00:00Z
adr:
  id: ADR-024
  status: accepted
  date: 2026-09-11
---

# ADR-024 — the kit installs what the skills perform

Status: accepted · 2026-09-11 · written by CP-CAIRN-006, S01

**Promoted from** the journal entry of
[CP-CAIRN-005](../../project/log/2026-09-10-cp-cairn-005.md) at blob
`b69c03fcc0e62be72f4c7bdb288f38dbdc41be8e`, its section *What remains*.
The entry stays exactly as it was. This record supersedes one clause of
decision 1 of
[ADR-001](./ADR-001-sole-owner-opens-and-closes-a-path.md) — *the kit's
default stays `pull-request`, and a sole owner declares the other value
at installation or when this record is adopted*. Everything else of that
decision stands: the go-ahead in the chat is the acceptance, the
registration commit lands on the trunk directly, there is no `register/`
branch, no registration request and no `registration-pending` rule.

## Context

ADR-001 decision 1 has two halves. The first deleted the request
sequence from `cairn-open` and its reference. The second kept the kit's installed default at
`transport.registration: pull-request`, on the reading that a sole owner
declares the other value for themself.

Path 1 wrote the first half and could not write the second. `cairn-open`
step 3 and its reference now push the registration commit to the trunk
with no fork on the transport — that is the only sequence the skill
carries — while `tools/cairn.mjs` still writes
`transport.registration: pull-request` at `init`. An adopter running the
kit's own installer therefore receives a skill and a configuration that
contradict each other in the first minute of the first path. Path 1
named the contradiction in its journal and left it: a coding path
does not overturn a record by editing code, and the remedy chapter 3
gives is a superseding record.

Nothing in the checker turns on the value: it reads
`transport.integration` alone. The declaration is read by whoever opens
the configuration, and by the binding table beside it — this
repository's names both transports, the one the kit generates names only
the integration transport, which decision 1 corrects.

The two fields are also not one answer. `cairn init` takes a single
`--transport` option and writes it into both `transport.registration`
and `transport.integration`, so the only way an adopter reaches
`manual-git` registration today is to take `manual-git` integration with
it — losing the recorded review, the required check on the exact commit
and the merge object CI tested, which ADR-001 decision 1 keeps and
decision 4 makes the closing acceptance.

## Decision

### Decision 1 — a repository installed at 1.1 declares `manual-git` registration

`cairn init` writes `transport.registration: manual-git`.
`transport.integration` keeps the `--transport` option's value, which
defaults to `pull-request`, and the option names the integration
transport alone. The skills as path 1 left them are then coherent with
what the same command installs: one sequence, one declaration, no fork.

`pull-request` stays a value `transport.registration` accepts. The
schema keeps both values for both fields, because a repository that
installed 1.0 declared the request transport and its history was
registered through it, and `update` never rewrites the configuration —
it is a host file, the adopter's whether or not it was edited. Such a
repository carries `pull-request` until its owner adopts this record, by
editing the declaration or at a fresh `init`.

No skill changes, no rule changes, and no fixture changes.

What this changes, by today's names:

- `tools/cairn.mjs`: `defaultOptions`, whose `transport` comment explains
  the single default; `buildConfig`, whose `transport` object takes
  `options.transport` for both fields; the `--transport` usage line, which
  offers it for both; and the binding row the kit generates, which prints
  the integration transport only and should print both, as this
  repository's own binding has since path 1.
- `spec/reference/configuration.md`: the example configuration's
  `transport.registration`, and the `transport` row that names
  `pull-request` as *the default*.

Row 4 of the [roadmap register](../../project/coding-paths/index.md)
carries them. This path writes the record and the checker, and no kit
file.

## Alternatives rejected

- **Restoring the request sequence to `cairn-open`** so the default is
  true again: it puts back the `register/` branch, the request and the
  wait ADR-001 removed on the owner's answer to Q1, and the four faults
  the rulings note read on the adopter come back with them.
- **Leaving it, and telling each adopter to pass `--transport
  manual-git`**: the option sets both fields, so the advice trades a
  contradiction for a worse configuration; and a kit whose installer
  contradicts its own skill is a defect, not a choice the adopter makes.
- **`manual-git` for both transports as the 1.1 default**: ADR-001
  decision 1 keeps `transport.integration: pull-request` and decision 4
  makes the merge click the whole of a sole owner's closing acceptance.
- **A rule that refuses a repository whose declaration and skills
  disagree**: the manifesto's first threat, and pointed at the one
  incoherence the kit itself writes. The installer writing both halves
  the same way costs nothing and proves more.
- **Editing ADR-001 decision 1 in place** so it reads as if it had always
  said `manual-git`: nothing here is rewritten to look as if it had
  always been so.

## Consequences

- An adopter installing 1.1 gets one registration sequence and a
  declaration that names it; the first path opens without a correction.
- The two fields stop being one answer: a repository takes the sole
  owner's registration and the forge's integration without editing the
  file the installer has just written, and one with no forge still
  reaches `manual-git` on both by passing `--transport manual-git`.

## What the manifesto's test weighed

The change removes a contradiction and adds nothing: no rule, no file, no
step, no command. It is one field's default, one option's meaning and one
sentence of a reference. The alternative that would have kept the default
honest is the request sequence the owner removed, and the alternative that
would have policed it is a predicate.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the kit's installed configuration, the option that writes it, the generated binding row, and the reference that documents the field | `tools/cairn.mjs` (`defaultOptions`, `buildConfig`, the `--transport` usage line, the binding row); `spec/reference/configuration.md` (the example and the `transport` row) |
