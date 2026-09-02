# AGENTS.md — repository bootloader

This file points; it does not carry project memory.

## Start here, in order

1. `project/coding-paths/paths.md` — the PORTABLE path
   convention: registration, one writer per worktree, checkpoints, closure.
2. `project/coding-paths/binding.md` — this repository's
   BINDING: exact roots, commands, branch and remote.
3. `docs/cairn/specification/reference/execution-protocol.md` —
   the portable per-session order.
4. `project/coding-paths/ACTIVE.md` — what is running now. It is
   generated; never hand-edit it.

## The mechanical contract

The exit code is the verdict. Never pipe a gate through another command — a
pipeline reports the LAST command's status, so `gate | tail && commit` commits
after a failure.

```bash
npm run cairn-check     # the blocking and advisory rules, in full
npm run cairn-active    # regenerate the running-paths view
npm run cairn-audit     # scaffold the pre-merge coherence audit
```

## Absolute rules

- No implementation work outside an accepted coding path.
- A path branch is `path/<lowercase-id>`, in its own worktree, with ONE writer.
- Every executed step updates code, tests, docs and the path's own ledger in the
  same work unit, and is pushed immediately.
- **A published path branch is never rewritten** — no rebase, amend,
  `reset --soft` fold or force-push. Reach a current base by merging
  `main` in. This repository declares
  `pathHistoryPolicy: forbidden`.
- Progress persists in files, never in a conversation.
