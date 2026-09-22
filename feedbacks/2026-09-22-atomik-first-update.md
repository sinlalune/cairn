---
type: Cairn Learning Note
title: What the first `update` of an adopted repository met — eleven of fifteen digests moved by the clock
description: The agent that ran `npx cairn-protocol@1.1.0 update` on Atomik the day after its adoption, under ADR-028: fifteen manifest digests changed at the same release, same source commit and same configuration, and eleven of them moved only because every templated file is rendered with today's date — six whose files were never touched, five rewritten for nothing but their own date line; two more re-baselined to the host's own bytes, which is a different cause; a generated page and the lock written by one command disagreeing about the same file; and the one unbackticked blank in the request template, in the file whose header warns about exactly that.
tags: [cairn, feedback, agent, adopter, atomik, update, lock, 1.2]
timestamp: 2026-09-22T00:00:00Z
cairn:
  status: provisional
---

# What the first `update` of an adopted repository met

Written by the agent that ran it — Claude Code — on 2026-09-22, the day after
[Atomik's adoption](./2026-09-21-atomik-adopts-1-1.md) and after the cleanup
path that adoption made necessary. This is `update` on a real adopted
repository rather than a fixture: eleven kit files edited, one held a patch
ahead of its release under the adopter's ADR-023, a declared root moved and an
integration transport changed since install.

The command did its job. `7 written, 0 deleted`, every edited file kept, and
the held patch untouched — the mechanism ADR-023 describes survives the command
it was written about, which the adopter verified rather than assumed. What
follows is what cost more than it should.

## 1. The lock churns on the clock

**Where.** Comparing `cairn.lock.json` before and after one `update`, at the
same release, the same `sourceCommit` and an unchanged configuration:

```text
manifest digests changed: 15
  11  the date stamp                     6 untouched, their expected digest re-rendered
                                         5 rewritten for nothing but their own date line
   2  ACTIVE.md, cairn.config.json       re-baselined to HOST bytes — a different cause
   2  pull_request_template, README      real content
```

The six untouched ones are the tell. Nothing about them changed — not the
file, not the release, not the configuration — yet the digest the lock records
for them moved. The five rewrites are the same cause seen from the other side:
the kit wrote them out again because their digest differed, and the only thing
that differed was the date. The reason is in the plan:

```text
atomik-project/coding-paths/binding.md     timestamp: 2026-09-22T00:00:00Z
docs/index.md                              timestamp: 2026-09-22T00:00:00Z
docs/modules/index.md                      timestamp: 2026-09-22T00:00:00Z
```

Every templated file is rendered with **today's date**, so the digest of what
the kit *would* write is a function of when you ask. Two `update` runs on two
days produce two different locks from one repository in one state.

**What it cost.** The adopter's path declared an outcome — *every digest the
run changed is accounted for* — and accounted for nine of fifteen, because the
six that moved without their files moving are invisible unless you hash the
manifest against the tree yourself. A first draft of this note then swung the
other way and put all fifteen on the clock, which the request's reviewer
caught; the two host-byte re-baselines below are a separate mechanism, and
`cairn.config.json` has no timestamp to render at all. It took a reviewer to find them, and then
a second measurement to learn they are not two different bugs but one
mechanism.

The durable cost is what the lock is for. `status` reads it to say pristine or
edited, and that verdict is stable. But the recorded digest is not a record of
what the kit wrote at the installed release; it is a record of what the kit
would write today. A manifest that churns on the clock cannot be diffed across
runs, and the next release's lock diff will carry this noise on top of whatever
the release actually changes — which is precisely when a reader most needs the
two separated.

**The change to Cairn.** Render the manifest from content that does not embed
the current date — stamp templated files from the release, or exclude the
stamped line from the digest, or record the release's digest rather than
today's rendering. Any of the three makes two runs of one command on one
repository agree.

## 2. Two digests re-baselined to the host's own bytes

**Where.** In the same comparison, `ACTIVE.md` and `cairn.config.json` moved
from *edited* to *pristine* without being rewritten: the recorded digest became
the host's current bytes. The edited count went twelve to ten.

For `cairn.config.json` this is deliberate and the kit says so in its own
comment — `adopt` locks the migrated configuration, and a repair note in the
source explains why. For the live view it follows from the view being
generated. Neither explains the consequence, which is that a file the host has
edited now reads as one the kit wrote. That is the one thing a lock exists to
distinguish.

**The change to Cairn.** If a file's recorded digest is deliberately the
host's, say so in the lock — a `baseline: host` beside the digest, or a
separate list — so that *pristine* keeps meaning *what the kit wrote* for
everything else.

## 3. A generated page and the lock disagree, in one command

**Where.** `cairn/README.md`, rewritten by this run, lists **eleven** files
under *to reconcile by hand*. Hashing every manifest entry against the tree
gives **ten**. The extra is `ACTIVE.md` — which the same command had just
recorded as pristine.

The page also stopped saying something worse. Before this run it read:

> Nothing. The last update rewrote every file it owns.

in a repository with ten edited kit files, because the adoption had installed
that page and nothing had regenerated it since. An adopter reading it would
conclude the kit and the tree agreed.

**What it cost.** The adopter's definition of done asked the page to list the
ten edited files. It cannot: the count is generated, and a host that corrects
it forks the generator — the cost ADR-023 already pays once, for a sentence.
The item was amended and the disagreement recorded instead.

**The change to Cairn.** One source for that list. The README and the status
verdict should be computed from the same predicate, and the live view should be
excluded from both or included in both.

## 4. The unbackticked blank, in the file that warns about it

**Where.** `.github/pull_request_template.md`, which this run installed for the
first time — the kit plans it only under `transport.integration: pull-request`,
which the adopter declared a day earlier, so the repository had been closing
requests by hand into a shape a file should have supplied.

Its header says:

> The blanks are backticked because a bare `<unit>` matches an HTML open tag
> and the forge strips it when it renders — leaving a blank that reads as
> answered.

Line 45 is the one blank in the file that is not backticked:

```text
- reviewer: <who approves>, holding the roles <initiator | writer | reviewer | integrator>
```

Rendered by the forge: `reviewer: , holding the roles  on this path`. The
failure the header exists to prevent, in the header's own file.

**The change to Cairn.** Backtick line 45. And, since the header states the
rule, a test that asserts no bare `<…>` survives in the generated template.

## 5. Two smaller things

`tools/cairn-audit.mjs`'s docblock says the generated template *"does not carry
these sections yet"*. This release's template carries them, and the two copies
already differ in wording — the template's own coherence question about
documenting one thing in two places answers yes about itself.

And `steps/` is empty in a fresh path folder, so Git does not carry it: every
worktree created from a registration commit lacks the directory its first step
record must be written into. Three consecutive paths in this repository hit it.
One `.gitkeep`, or the open skill creating the directory, removes it.
