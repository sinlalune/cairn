---
type: Cairn Backlog Item
title: A fresh path folder's empty steps/ is not carried by Git
description: The open skill registers a path folder whose steps/ is empty, and Git carries no empty folder, so the worktree the writer branches has no steps/ until the first unit makes it by hand.
tags: [backlog, skills, cairn-open, steps]
timestamp: 2026-09-25T00:00:00Z
---

# A fresh path folder's empty `steps/` is not carried by Git

**What.** A path is registered with its record, its plan and a `steps/`
folder that `skills/cairn-open/SKILL.md` describes as *empty until the
first unit*. Git tracks files, not folders, so the registration commit
carries no `steps/`, and every worktree branched from it lacks the
folder the first step record is written into. Atomik's update note of
2026-09-22, observation 5, counts three consecutive paths there that hit
it; the writer of CP-CAIRN-015 made it by hand on 2026-09-25.

**Which path, and where.** Found by
[Atomik's update note](../../feedbacks/2026-09-22-atomik-first-update.md),
observation 5, and met again at CP-CAIRN-015's registration; placed on
the backlog by that path's S01. Not that path's scope: `skills/` is row
1's, and row 1 is done.

**Owner.** sinlalune.

**Shape of the work.** In the next path that writes the skills, one of
the note's two remedies: a `.gitkeep` the open skill's registration
commit carries, or one clause saying the first unit creates the folder.
No record, since no decision changes.
