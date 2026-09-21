---
type: Cairn Learning Note
title: Atomik opens a path on a protected trunk — the one registration sequence the kit ships cannot run there
description: The agent that opened Atomik's first 1.1 path, under ADR-028: a registration sequence that requires a trunk accepting a direct push, which the protocol never says and which its own repository satisfies only through an admin bypass its adopter does not have; and a `registration` rule that reads the trunk and not the change under review, so on a pull-request trunk the first path is unopenable by every route the protocol allows — each with where it was met, what it cost and the change that would remove it.
tags: [cairn, feedback, agent, adopter, atomik, cairn-open, transport, 1.1]
timestamp: 2026-09-21T00:00:00Z
cairn:
  status: provisional
---

# Atomik opens a path on a protected trunk

Written by the agent that opened the path — Claude Code — on 2026-09-21,
immediately after
[the adoption note](./2026-09-21-atomik-adopts-1-1.md). That note ends with
the repository adopted and its CI red. This one is what happened on the next
move: opening `CP-OPS-003`, the path that repairs what the adoption left.

Both observations are ADR-028 decision 1 in its second half — the gate was
right every time it spoke, and the protocol still could not be executed. The
sequence stopped at a `git push` that a repository rule refused, and it has
not resumed.

## 6. The one registration sequence the kit ships needs a trunk that takes a direct push

**Where.** `cairn-open` step 3, run exactly as
[its reference](../skills/cairn-open/reference.md) writes it, on a record
already accepted and gate-green:

```
remote: - 2 of 2 required status checks are expected.
remote: - Changes must be made through a pull request.
 ! [remote rejected] HEAD -> master (push declined due to repository rule violations)
```

`sinlalune/atomik` protects `master`: a pull request, and two strict required
checks. `cairn-open` says *land one metadata-only commit — the record, the
view, nothing else — on the trunk directly*, and its reference gives one
command, `git push origin HEAD:main`. There is no second sequence.

The configuration reference states this plainly, and it is the sentence this
observation turns on:

> At `init` it declares `transport.registration: manual-git` — **the one
> registration sequence the open skill ships** — and gives `--transport`,
> whose default is `pull-request`, to `transport.integration` alone; a
> repository that declared `pull-request` registration keeps it.

So `transport.registration: pull-request` is a legal schema value that a
repository may keep, and nothing anywhere says how to perform it: not the open
skill, not its reference, not chapter 5, not `human-records.md` — which
documents the closing review on `pull-request` and says nothing of a
registration. A host whose trunk requires a request can declare the truth in
its configuration and then has no sequence to follow.

**And the protocol's own repository does not meet this, it bypasses it.**
`sinlalune/cairn` declares `transport.registration: manual-git` on a `main`
that carries the same two rules — a required pull request and a required
`protocol` check. Its registrations are nonetheless plain single-parent
commits by the owner, with no associated request: `891b07d Register
CP-CAIRN-011 before branching`, `120c98c`, `3c42237`, `99554f2`. The
difference between the two repositories is one field of a ruleset:

```
sinlalune/cairn   bypass_actors: [{ actor_type: RepositoryRole, bypass_mode: always }]
sinlalune/atomik  bypass_actors: []
```

The sequence works where the protocol was written because an admin bypass
exists there. Nothing in the protocol says it is required, and an adopter who
protects a trunk the way the documentation of every forge recommends — no
bypass — cannot register a path at all.

This is also a contradiction the schema permits and no rule catches. The
`protected` enforcement profile is the claim that the host prevents what the
checker only reports; `manual-git` registration is the claim that a writer can
push the trunk directly. A repository can declare both.

**What it cost.** The path record was written, accepted, digested and
committed, and the registration commit sits on a local trunk that cannot
publish it. Establishing *why* took reading the configuration reference, the
open skill and its reference, then both repositories' rulesets through the
API — because the failure arrives as a forge error about repository rules,
which names nothing of the protocol and reads like the adopter's
misconfiguration. It is not: the adopter declared the value `init` writes.

**The change to Cairn.** In order of what it costs to ship.

One sentence in `cairn-open`, before the sequence: *this sequence requires a
trunk that accepts a direct push — an unprotected trunk, or a bypass for the
writer. A trunk that requires a request cannot take a registration this way.*
That alone turns an unexplained forge rejection into a known precondition.

Then the sequence itself, so the legal value is executable: a registration
request carrying the metadata-only commit, and the rule change observation 7
needs for it to be mergeable.

And `init` and `adopt` could read the trunk's protection where the forge
exposes it and refuse the pairing that cannot work — `protected` with
`manual-git` registration, or `manual-git` registration on a trunk with no
bypass for the writer — rather than writing a default that the next path
discovers.

## 7. On a pull-request trunk, the first path cannot be opened by any allowed route

**Where.** After the rejection, the only remaining route was to carry the
registration on the path branch and let one request land both — branch before
registration, which `cairn-open` forbids and the
[repair reference](../spec/reference/repair.md) recognises as a shape to
register retroactively. The gate refuses it, correctly and immediately:

```
[registration] atomik-project/coding-paths/CP-OPS-003/index.md is not registered
               as running on the trunk — land the accepted path declaration and
               regenerate ACTIVE.md before implementation
```

The rule reads `registrationState`, which resolves the declaration **on the
trunk ref** — never in the change under review. Its comment says why, and the
reasoning is sound: a record that exists only on its own branch is invisible to
the trunk and to every sibling, so the generated view can be internally current
and globally false.

But a registration request is precisely the change that carries the
declaration to the trunk. Judged against the trunk it is not on yet, it is
refused; and it cannot merge while it is refused, because the check is
required. The door has no key on either side:

- push the registration to the trunk — refused, a request is required;
- open a request for it — refused, the declaration is not on the trunk.

**It is locked twice, not once.** Even if the `registration` rule allowed it,
the required check on this repository is the job that still runs
`npm run cairn-check:test` — observation 4 of the adoption note — so a
metadata-only registration request, which by definition does not touch the
workflow, would run the stale 0.2 suite and fail 41 of 86 anyway. The two
locks are independent and each is sufficient.

And the protocol closes the last exit itself: *no implementation work outside
an accepted coding path*. The repair for the red gate is implementation, the
path that would hold it cannot be opened, and the rule forbids doing it
outside one. Every route the protocol allows is refused by something the
protocol requires.

The escape that exists is a migration exception — `migration.unregisteredPaths`
grandfathers a path — and its own advisory says *do not copy this exception to
a new path*. It is there for records that predate the predicate, not for a
host whose forge will not take a registration.

**What it cost.** The path is open in the sense that its branch exists, its
first unit is written and its gate is green but for this one finding; it is not
open in the sense the protocol means, and cannot become so without a
repository-settings change the protocol never asks for. The adopter is left
choosing which rule to break, which is the position this protocol exists to
keep writers out of.

**The change to Cairn.** The rule learns the one case it is missing: a
declaration absent from the trunk is registered when the run's own comparison
contains the commit that adds it **and** that commit is a registration — a
metadata-only commit touching the record and the generated view, whose parent
is the declared `base_commit`. Every one of those facts is already checked
elsewhere: `registration-base` compares the parent to `base_commit`, and the
closure rules already reason about a commit that changes nothing outside a
named surface. On a `manual-git` trunk nothing changes, because there the
comparison never contains such a commit; on a `pull-request` trunk it is what
makes the legal value executable.

If that is refused, the honest alternative is to say so: `transport.registration`
takes one value, `manual-git`, and a trunk that cannot accept a direct push
cannot host this protocol. That is a smaller protocol, and it is checkable —
which is better than a legal value with no sequence behind it.
