---
type: Cairn Backlog Item
title: A concept root not named concepts clears no note
description: conceptLinkTargets resolves a link to a concept only through the word concepts/ or by a bare name, so under a concept root named otherwise no correct link clears any note, and concept-orphan refuses every one however it is linked.
tags: [backlog, checker, concept-orphan]
timestamp: 2026-09-24T00:00:00Z
---

# A concept root not named `concepts` clears no note

**What.** `concept-orphan` asks whether a document outside the wiki links
each concept note. `conceptLinkTargets` in `tools/cairn-check.mjs`
answers from the link's text alone: it takes what follows the last
`concepts/`, or a bare name the text ends with after `./` or `../` —
`./cache.md`, `../cache.md`, `../../cache.md`. Under a concept root bound
as, say, `wiki`, the correct links from outside — `../wiki/cache.md`,
`../../wiki/cache.md`, `wiki/cache.md`, `./wiki/cache.md`,
`../wiki/learning/cache.md` — carry no `concepts/`, and each returned
nothing when CP-CAIRN-014 S04's reviews ran them; the bare forms that do
clear `cache.md` point, from outside the wiki, at some other file. So no
correct link clears any note of such a root, and each is refused as an
orphan however it is linked. Reproduced 2026-09-24 in a scratch
installation with `roots.concepts: "wiki"`.

**Which path, and where.** Found by CP-CAIRN-014 in S03, while writing
the fixture for a top-level concept root; recorded in that step's review
section and carried by S04. Not that path's scope: its definition of done
names no concept rule.

**Owner.** sinlalune.

**Shape of the work.** A coding path, or a unit of one already touching
the checker: resolve a link against the linking file's folder and the
declared concept root, as `links` already resolves one, instead of
reading the word `concepts/`; one fixture with a root named otherwise
and a note one folder down linked from outside. No record is needed —
the rule's sentence does not change, only how it reads a link.
