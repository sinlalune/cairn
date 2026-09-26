---
type: Cairn Backlog Item
title: The generated bootloader says the skills are linked at the release's commit
description: The sixth entry of the bootloader the kit writes says the pointer page links the six chapters and the skills at the release's commit; the pointer page pins the chapters and links the skills as local files.
tags: [backlog, installer, bootloader, pointer-page]
timestamp: 2026-09-26T00:00:00Z
---

# The generated bootloader says the skills are linked at the release's commit

**What.** The bootloader template in `tools/cairn.mjs` writes, as the
sixth entry of *Start here*, that `cairn/README.md` holds *the six
chapters and the skills linked at its commit*. The pointer page links
the six chapters to the specification at the release's commit on
GitHub, and the skills as the local files `../skills/<name>/SKILL.md`,
which nothing pins. Every adopter's `AGENTS.md` carries a version of the
sentence — at 1.1.0, *the six chapters and the six skills linked at its
commit*.

**Which path, and where.** Found by the fresh-context review of
CP-CAIRN-016 S04, which copied the line into this repository's
`AGENTS.md` and corrected it there to *the six chapters linked at its
commit, the skills, and every file the kit owns*. Not that path's
scope: its definition of done lets `tools/cairn.mjs` change only in
`workflow()`, the register template and the two GitHub helpers.

**Owner.** sinlalune.

**Shape of the work.** In the next path that writes the installer: the
template's two lines take the corrected wording, which makes this
repository's line and the generated one equal again. No record, since no
decision changes.
