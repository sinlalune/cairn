---
type: Cairn Feedback
title: Crumbz's update to 1.2 — the command ran on a stale trunk outside any path, and its report buried the release's change under the adopter's own text
timestamp: 2026-10-09T00:00:00Z
tags: [feedback, cairn, crumbz, cairn-update, update]
---

# Crumbz's update to 1.2 — the command ran on a stale trunk outside any path, and its report buried the release's change under the adopter's own text

Written by the writer of Crumbz's CP-CAIRN-UPDATE-038, Claude Code, on
2026-10-09, under ADR-028.

## 1. `update` writes from any checkout, in any state

**Movement:** `cairn-update` 1, *settle the trunk*, and 4, *register the
path*.

**What happened:** the owner ran `npx cairn-protocol status`, then
`npx cairn-protocol update`, in Crumbz's main checkout. That checkout was
18 commits behind `origin/main`, and no path was registered for the update.
The command wrote 39 files and `cairn-check` printed OK over them, judging
them as trunk work. The skill that says an update is a path, run on a
current trunk, was among the files that run installed. Nothing the owner
ran said either thing was wrong.

**Cost:** the writer found it afterwards, by reading `ACTIVE.md` (a path
already integrated on the remote still showed as running). The 39 writes
were undone, `main` was fast-forwarded, and the update was registered
(#105) and run again in its worktree. That took one extra round of the
owner's decisions and about half an hour.

**Change to Cairn that would remove it:** `update`, without `--dry-run`,
reads the checkout before writing. When `HEAD` is behind its upstream, it
refuses and names the count. When the branch is the trunk the
configuration declares, or no record with `status: running` lists
`cairn.lock.json` in `writes:`, it refuses and points at `cairn-update`.
An `--anyway` flag covers a first install. `tools/cairn.mjs` already runs
`git rev-parse`, so this is a few lines.

## 2. A kept file "kept" and still written

**Movement:** `cairn-update` 5, the run.

**What happened:** the report printed `update would keep
project/coding-paths/index.md — edited here`. The run then rewrote that
file's state column, because the 1.2 live view projects each path's
`status:` into the register (ADR-031 decision 2). The change was right:
it dated every `done` and corrected two stale `running` cells. But the
report said the file would be kept.

**Change:** for the register, the report says what the run will do:
`kept; state cells projected`.

## 3. The diff of a kept file shows the adopter's text, not the release's change

**Movement:** `cairn-update` 5, reading each kept file's diff.

**What happened:** the run's report was 1,644 lines. 1,284 of them
were `docs/modules/application.md`: Crumbz's module note printed whole
against the release's ten-line stub. What the release actually changed in
that file is one rule, that a note describes its area as it is now with no
dated paragraphs. The rule was in the diff, but buried. The same holds,
on a smaller scale, for `package.json` and `docs/architecture/index.md`.

**Change:** for a kept file, print the release's template change: the
installed release's template against the new one. That is what the writer
has to carry. The current diff, release against yours, can come behind a
flag. The lock records each file's installed hash, so the old template is
already known.
