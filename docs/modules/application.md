---
type: Cairn Module Note
title: The reference tools
description: What lives under tools/ — the checker, the live-view generator, the audit scaffold, the post-mortem reader, the rule-catalogue generator, the greenfield pilot, the initializer and the configuration loader — how they find the specification, and how they are tested.
tags: [module, cairn, tools]
timestamp: 2026-09-14T00:00:00Z
---

# The reference tools

`tools/` is one of this repository's two source roots, and the area this note
covers: dependency-free Node scripts that evaluate the protocol the
[specification](../../spec/index.md) states.

| Tool | Does |
| :-- | :-- |
| `cairn-config.mjs` | validates `cairn.config.json` against `cairn-config.schema.json` before any rule runs |
| `cairn-check.mjs` | the checker: every blocking and advisory rule, reported by exit code |
| `cairn-active.mjs` | regenerates the live view of running paths, or checks that it is current; reports a roadmap register still carrying the installer's row while any path is registered |
| `cairn-audit.mjs` | scaffolds the closing review of one exact candidate: on `pull-request` the request's description, in the order the template gives, with the definition of done read item by item from the record; on `manual-git` the closing record in the path folder |
| `cairn-postmortem.mjs` | the mechanical half of a post-mortem; facts only, and no reading of it reaches an exit code |
| `cairn-rules.mjs` | regenerates the rule catalogue and the rule-to-requirement linkage on the [conformance page](../../spec/reference/conformance.md); this repository's, not installed |
| `cairn.mjs` | the `cairn` command: `init` installs the thin kit, `status` reads the lock, `update` rewrites pristine kit files and migrates the configuration, `adopt` turns a lock-less installation into one; the package's, not installed |
| `cairn-pilot.mjs` | the greenfield pilot as a command: drives a throwaway repository from `init` to `done` on one transport, green at every gate, and counts the protocol files each stage writes; this repository's, not installed |
| `*.test.mjs` | the tools' own suite, run by `npm run cairn-test`: the pure half of every rule against `evaluate()`, and one adversarial fixture per blocking rule against a real installed repository |

## How the tools find the specification

The specification lives at `spec/` in the root of this repository, beside its
concept wiki at `spec/concepts/`, which the configuration binds as
`roots.concepts`. The checker's Markdown corpus — the files whose links are
checked and whose links keep a concept from being an orphan — is the
documentation plane, the project plane, and the parent of the concept root, so
the specification is read wherever a host binds its wiki. The rule generator
writes into the conformance page, not into the specification index, so the
index stays under its word budget.

## The rules

The checker implements twenty-six rules — twenty blocking, six advisory —
inventoried on the [conformance page](../../spec/reference/conformance.md),
which also records where every 0.2 name went. One invocation form judges a
tree — `cairn-check [--base <ref>] [--branch <name>] [--json]`, and on a path
branch the base defaults to the trunk — and one answers a question and exits:
`cairn-check --scope-digest <record>#definition-of-done`. The configuration is
schema 2.

**The profile line.** Every run reports the transports the configuration
declares, what the forge does not enforce and what it could not read — as a
third header line, or as the `profile` object under `--json`. The forge half is
read from the rules that apply to the trunk when `GITHUB_TOKEN` or `GH_TOKEN`
is set and the remote is a GitHub repository, and is reported as not read
otherwise. A reading the forge WITHHELD is a third answer, neither a gap nor an
absence: a ruleset that comes back without its bypass list is a list nobody
read, and the line says so. Where a ruleset cannot be fetched at all, the same
line is printed for it with the reason the forge gave, and the rules the branch
endpoint did give are still reported. CI runs the checker with
`secrets.GITHUB_TOKEN`, whose reach does not extend to a ruleset's bypass list,
so its runs print that line and report the rules beside it. None of it is a
finding: the remedy
for a gap is a setting, and no failure of the read reaches an exit code.

**What it reads of a path.** The opening acceptance from the record's own
`## Opening acceptance` block; the checkpoint from the resume section; the
registration commit as the trunk commit in which the record became `running`;
the branch's tip from the local ref, else `HEAD` when the checkout is detached,
else the remote-tracking ref. The range from a path's base to its candidate is
read as this path's own commits alone, where a draft is resolved by the later
commit that publishes the unit it was drafting, and an edited step record is
answered by a later step of the same path binding the blob it replaces to the
blob it adds. It reads the record of the review movement in the newest unit
kept in a ledger — the unit under review — and reads nothing of that section
beyond whether it is empty. It validates `depends_on:` and knows two routes;
the live-view generator marks each live path unblocked or names what it waits
on.

**What it reads of an integration.** From the same range: the commit in which a
record reached `done`; whether that commit is a merge object carrying the edit,
refused on `pull-request` integration alone, the `--no-ff` merge being the
integrating unit on `manual-git`; and whether the `ready` the branch declared
is behind it, read from any parent of the arrival — a merge has two and an
octopus more, and the declaration may sit on any (ADR-027).

**The comparison every other rule inherits.** `comparison` judges the base the
run was given before any changed-file rule reads it. A base that does not
resolve is reported rather than thrown on; a base that resolves to the commit
under judgement is reported too, off a path branch, because a push compared
with itself yields no changed files and every rule keyed on them is skipped
under a green run. Both are `inconclusive`: a reading not made, not a violation
found. Closure follows the configured transport: on `pull-request` the checker proves
the candidate, its closure surface, the opening digest and the trunk drift from
Git and reads no review; on `manual-git` it also reads the closing record.

## The post-mortem

`cairn-postmortem.mjs` prints one line per reading, for one path or for every
path record, and closes on a line saying where the judgement is. The readings
are the ones [ADR-014](../adr/ADR-014-two-tools-of-1-1.md) decision 1 names,
with one widening: it watches the branch for `ready` **or** `done`, because a
branch that declared `done` is the incident a post-mortem is opened for, and a
reading that watched for `ready` alone would answer *not written yet* about it.

The predicates it judges with, and the Git plumbing under them, are imported
from `cairn-check.mjs`: a record's two shapes, its history in a range, the
metadata it declared at a commit, whether a ref exists, the blob that added a
step record. Its own are the rendering of each fact into a line, the two forge
readings — a branch's red runs, and how long a request stayed open — and what
it takes from the working tree rather than from Git: every path record, and
each step's current content.

## The kit

`npx cairn-protocol init` installs 27 files and the lock on the `ci` profile,
26 on `local`, which has no workflow: the five reference tools, the nine skill
files of six skills, five folder indexes, and eight host files — the
configuration, the bootloader, the binding, the package scripts, the live
view, this note, the workflow and the request template.
It copies no specification: every link it writes into the specification is
pinned to the commit the kit was cut from. `cairn.lock.json` records the
digest of every kit file as the kit wrote it, which is what lets `status`
tell an edit from an installation and `update` rewrite the first and keep the
second. `adopt` is the migration from a 0.2 installation: it keeps the host's
answers, replaces the tools, adds the skills, and reports the shapes the kit
no longer defines rather than deleting anything of the adopter's.

At `init` the configuration it writes declares
`transport.registration: manual-git`, the one registration sequence
`cairn-open` ships, whatever `--transport` answers for
`transport.integration`; `update` and `adopt` plan from the host's own
declaration instead, so a repository that declared `pull-request`
registration keeps it and the binding generated beside it — which prints
both transports — never contradicts the file it sits next to. The
bootloader carries the five absolute rules of 1.0 about paths and two that
reach a session with no path open: an abstraction explained persists as a
concept note, and an explanation is written for the reader who is learning
it.

## Testing

`npm run cairn-test` runs Node's own runner over `tools/*.test.mjs`, and
`npm test` is an alias of it. The suite is this repository's: the kit installs
none and its workflow runs no test step, so an adopter's `npm test` stays the
adopter's product suite. Two kinds of test, and the difference is
the whole discipline written in [soundness](../../tools/soundness.md): the unit
suite proves each rule's predicate against `evaluate()` with hand-built
arguments, and the fixture suite proves each rule is WIRED, by installing a real
repository with `cairn init`, proving it green, introducing exactly one
violation and requiring the rule among the blocking findings. Every blocking
rule has such a fixture, and the coverage is declared in the suite so that a
new blocking rule forces the choice. The parity tests assert that the local
default and the CI invocation reach one verdict on one tree. CI runs the suite
before the gate as `cairn-test`, in the one job that is the required check; the
job runs once per commit that can land — the trunk's push and the request,
never a push to a path branch — and a step that runs only on the checker's own
failure prints the post-mortem into the run's log, and posts it on the request
when the run belongs to one.
