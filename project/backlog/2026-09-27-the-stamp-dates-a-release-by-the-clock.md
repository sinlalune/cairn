---
type: Cairn Backlog Item
title: The stamp dates a release by the day it is packed, the repository by the day it was committed
description: `stamp` records `stampedAt` from the clock, so a packed kit dates its generated pages by the day `prepack` ran, while this repository's own tools date them by the source commit's day; the two generations of one release differ by the timestamp alone.
tags: [backlog, installer, stamp, adr-034]
timestamp: 2026-09-27T00:00:00Z
---

# The stamp dates a release by the day it is packed

**What.** `releaseDay` in `tools/cairn.mjs` dates every generated page by
the stamp's `stampedAt` when the package is stamped, else by the source
commit's day. `stampRelease` writes `stampedAt` from the clock. This
repository's update of 2026-09-27, run from its own tools at `df30278`,
dated its pages 2026-09-26, the commit's day; a tarball packed from the
same commit the next day dates them 2026-09-27, and an `update` between
the two rewrites every generated host page for the timestamp alone —
against ADR-034 decision 2's *byte-equal on any two days*. Adopters, who
all install from the one published package, do not meet it; this
repository does, at every release.

**Which path, and where.** Found by the fresh reader of CP-CAIRN-017 S06.
Not that path's scope: the installer changes only in its header comment
and the bootloader template.

**Owner.** sinlalune.

A sibling with the same root: `tools/release.json` is ignored by Git and
nothing deletes it after a pack, so an `npm pack` or `npm publish` run here
leaves the stamp behind, and this repository's tools then date by the pack
day and pin the packed commit on every later commit — CP-CAIRN-011 and this
path each deleted it by hand.

**Shape of the work.** `stampRelease` records the commit's day
(`git show -s --format=%cs`) rather than the clock's, and a `postpack`
script deletes the stamp; one more assertion in the test *two plans of one
release on two days are byte-equal*. ADR-034 decision 2 names the day as
`stampedAt`, written at `prepack`: the field keeps its name and holds the
commit's day, which is the decision's intent — one line on the record,
superseding its wording.
