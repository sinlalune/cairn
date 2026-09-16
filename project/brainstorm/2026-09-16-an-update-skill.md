---
type: Cairn Brainstorm
title: An update skill — what the first release after 1.0 showed
timestamp: 2026-09-16T00:00:00Z
cairn:
  status: provisional
---

# An update skill — what the first release after 1.0 showed

The session of 2026-09-16, the morning Cairn 1.1.0 was published, kept
verbatim in the order it happened. The owner and the release path's writer,
in the chat, after the tag and the package.

## What came first: the chronology of Crumbz's update

The owner asked what the chronology for `cairn update` of Crumbz is. The
writer took the first reading before answering — nothing written, only
read — with `npx cairn-protocol@1.1.0 status` in Crumbz's checkout:

```text
installed release 1.0.0 (e26f19d, 26 files), 26 paths run, one still running
after its request merged; six uncommitted entries on main; registration
still by pull request, which a 1.0 installation keeps.
kit files: 19 pristine, 6 edited, 7 missing, 1 unmanaged
  update would write   19 pristine files, 7 missing ones — the post-mortem,
                       the sixth skill, the inputs index, the three concept
                       folders, the pointer page
  update would keep    AGENTS.md, package.json, tools/cairn-check.mjs,
                       project/coding-paths/ACTIVE.md, docs/index.md,
                       docs/modules/application.md — edited here
  update would report  docs/concepts/index.md — no longer part of the kit
```

The writer then gave the chronology as the protocol's own, nine steps:
settle the trunk (land the running path's integrating unit, commit or set
aside the dirty tree); a brainstorm note, optional; the register row and
the record, writes limited to the kit's files; **the one decision the
owner makes before the go-ahead — what to do with the edited checker**:
left, Crumbz keeps a 1.0 checker of twenty-four rules beside a 1.1 kit;
taken with `update --take tools/cairn-check.mjs`, Crumbz's edits are
discarded and 1.1's twenty-seven rules run; registration; unit 1, the
update run and each kept file's diff read and decided; unit 2, reconcile
by hand only what the report named — the bootloader's line to the pointer
page, the docs index gaining the new folders, the old concepts index;
close; feed back what it cost to the Cairn repository.

## The owner's line

> look like we could use a cairn update skill

## What the writer answered

It is a real gap, and the reading is the evidence: every other movement
of a path has a skill, and the one an adopter meets at every release has
none. The chronology had to be derived by hand, and its two decisions —
what to do with an edited kit file, what to do with a host file the
repository does not want — are written nowhere an agent would read them.
The commands exist and quick start 3 lists them; what is missing is the
frame around them: that an update is a path, what its definition of done
names, which reading comes first, what the owner decides before the
go-ahead, and what *reconcile by hand* means for each kind of kept file.
Without it each adopter's agent reinvents that, and the pointer page's
reconcile list stands until someone guesses what to do with it.

Three ways to close it, each tagged by what it costs:

- **A seventh skill, `cairn-update`** — the procedure as the others are
  written: settle the trunk, take the reading, put the edited-file and
  unwanted-file decisions to the owner, register, run, reconcile only what
  the report named, close. Adds one kit file; the count is measured and
  has no target (ADR-022 decision 2), so the file earns its place or it
  does not.
- **A section of the pointer page** — `cairn/README.md` is generated at
  every update and already carries the reconcile list; a *how to
  reconcile* section under it puts the procedure where the work is.
  Native, no new file; but a generated page, not a skill an agent loads
  on demand.
- **A section of `cairn-open`** — the update is a path, so the open skill
  could carry *opening an update path*. Native; but it buries a procedure
  inside another, and the open skill is already long.

Recommendation: the skill. The manifesto's test is whether the file is
prose an agent needs at the moment it acts, and it is; the pointer page
keeps one line pointing at it. Where it goes: stage one, this note; then
the 1.2 row, whose path scopes it with the concept-folder decline
mechanism the release found, the same surface of the installer. Crumbz's
update can run before that, by hand, along the chronology above, and
what it costs becomes the note's second half.

## The owner's decision

> yes go anbd join it into the 1.2 row

The note is written and the 1.2 row names it. Nothing is coded: the row
has no path yet.

## What the idea is waiting for

Crumbz's update, run by hand along the chronology — the first real
reading 1.1 gets — to say what the procedure must contain that the
release path could not see: what an agent does with a kept file whose
diff is the adopter's own, what it does with an edited checker, and
whether `update` needs a way to decline a host file before a skill can
tell an agent to use one.
