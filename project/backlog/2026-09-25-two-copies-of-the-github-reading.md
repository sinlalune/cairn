---
type: Cairn Backlog Item
title: The installer and the post-mortem each carry a GitHub reading
description: githubSlug and githubRequest live in the post-mortem, which imports the checker; the installer cannot import them where there is no host configuration, so CP-CAIRN-015 wrote its own two, and the two copies can drift.
tags: [backlog, installer, postmortem, github]
timestamp: 2026-09-25T00:00:00Z
---

# The installer and the post-mortem each carry a GitHub reading

**What.** ADR-032 decision 4 gives the installer one reading of GitHub —
the trunk's rulesets, with the owner's token — and leaves where the two
GitHub functions live, once two tools call them, to the coding path.
`githubSlug` and `githubRequest` are in `tools/cairn-postmortem.mjs`,
which imports `tools/cairn-check.mjs`, and the checker loads the host's
configuration when it is imported. The package command runs where there
is none — `init` into an empty folder, the packaged-command test — so
importing the post-mortem from `tools/cairn.mjs` fails there. The
installer carries its own two, shorter, and the two can drift: a remote
form one reads and the other does not.

**Which path, and where.** Found by CP-CAIRN-015 in S03, when the
packaged-command test failed on the import. Not that path's scope: its
definition of done keeps `tools/cairn-postmortem.mjs` unchanged, and row
4 of 1.2 owns it.

**Owner.** sinlalune.

**Shape of the work.** In row 4's path, which writes the post-mortem:
the post-mortem imports the two from `tools/cairn.mjs`, which loads no
host configuration, and its own copies go. No record.
