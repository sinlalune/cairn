---
name: cairn-update
description: Take a repository from the Cairn release it carries to a newer one — settle the trunk, read what the release would touch, put the owner's two decisions in the chat before the go-ahead, register the update as a path, run it, reconcile by hand only what the report named, and close. Use when `status` says a newer release exists, or when an adopter asks to move to one.
---

# cairn-update

An update is a coding path on this repository's register, not a command run
between two paths. Its writes are the kit's own files and the host files the
report names, and nothing else: a release that wants a product change has
written a record, and that record is a path of its own.

The kit's part of this is two commands, `status` and `update`; the rest is
Git and the three skills named below. This skill carries the order and the
two decisions.

## 1. Settle the trunk

A running path's integrating unit is landed, the working tree is clean, and
the trunk is current. An update that starts over a half-integrated path
cannot say afterwards which change moved which file.

## 2. Read before anything is written

```bash
npx cairn-protocol status
```

It says which release is installed and whether a newer one exists, counts the
kit's files by state, and names every file it would write, every file you have
edited, and every file that has left the kit. Then read that release's
changelog section, which ships with its package: it names, by path id, the
adopter repairs the release absorbed and the ones it did not — which is what
tells a repository with an edited checker whether taking the release's version
loses a repair of its own.

## 3. The owner's two decisions, before the go-ahead

Put both in the chat, signalled as a decision before anything else, and do
nothing further until the answer:

- **For each edited kit file** — keep the edit, or take the release's
  version. Taking it is `update --take <path>`, which takes nothing you have
  not named and, with `--dry-run`, shows what it would discard before it
  discards it. A repair the release absorbed is taken; a repair it did not is
  kept, and the changelog section of movement 2 is what separates them.
- **For each host file the repository does not want** — decline it, so this
  update and every later one leave it alone, until the owner takes it back.

## 4. Register the path

As `cairn-open` says, with the two answers written into the record's goal and
the surfaces the report named in `writes:`. The definition of done is the
release installed, the kept files decided and the reconcile list empty or
named.

## 5. One unit: the run

```bash
npx cairn-protocol update --take <path> --dry-run   # read the discard first
npx cairn-protocol update --take <path>             # once per file taken in movement 3
npx cairn-protocol update --dry-run
npx cairn-protocol update
```

Every take is read before it is made: `--take` writes the file and reports
afterwards, so the dry run is where you see what goes. Then the dry run of the
whole update, then the run. Every file the run left alone because you kept it
prints its diff against the release's version: read each one and write into
the step what the release changed there and what this repository does about
it. Deciding is this movement; carrying the change into the file is the next.

## 6. One unit: reconcile by hand

The kept files of movement 5, edited here to carry what the release changed.
The run's own report names them; the pointer page's reconcile list is that
list written down, and goes stale if the page is one of the files you kept.
When the report named none, this movement has nothing to do and the step says
so. Do not tidy what the release did not touch — that is a second change
riding on this one.

## 7. Close, and say what it cost

Close as `cairn-close` says. Then, where a movement of the update cost more
than it should have, write the note the unit skill's last section names and
send it by the route that section gives.

## What you must not do

- Write outside the kit's files and the host files the report named.
- Take an edited file without reading what the release would discard.
