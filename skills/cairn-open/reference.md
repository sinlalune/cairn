# cairn-open — command sequences

Defaults `main`, `origin`, `path/cp-example-001`; substitute the binding's
names. Run every gate bare and read its exit code; never pipe a gate into
another command.

## Register an accepted path

```bash
git switch main
git fetch origin main
git merge --ff-only origin/main
git status --porcelain=v1
git rev-parse origin/main
git switch -c register/cp-example-001 origin/main    # pull-request registration only
node tools/cairn-check.mjs --scope-digest project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
```

The status output must be empty. Set `base_commit` to the printed trunk tip,
write the opening acceptance with the printed digest, set `status: running`,
regenerate the live view, and check:

```bash
npm run cairn-active
npm run cairn-check
git status --short
git add project/coding-paths/CP-EXAMPLE-001/
git add project/coding-paths/ACTIVE.md
git commit -m "Register CP-EXAMPLE-001 before branching"
git rev-parse HEAD^
```

The printed parent must equal `base_commit`. No product implementation belongs
in this commit. How it reaches the trunk is what `transport.registration`
declares.

### On `manual-git` — the trunk takes the push

Requires a trunk that accepts a direct push: unprotected, or a bypass for the
writer. Push it, then read the run it triggers on the trunk.

```bash
git push origin HEAD:main
```

### On `pull-request` — the trunk takes a request

The commit is alone on `register/cp-example-001`. Merge the request in the way
that keeps it — a merge commit or a fast-forward, never a squash or a
rebase-merge, which replaces it with a commit whose parent is the trunk at the
merge; `registration-base` then goes red on the path's first run for every
trunk that moved in between.

```bash
git push -u origin register/cp-example-001
# open one request against the trunk, read its run green, and merge it
git fetch origin main
git merge-base --is-ancestor register/cp-example-001 origin/main
```

The last command exits 0 only if the merge kept the commit; it reads the local
branch, so delete that one after it, not before.

## Create and publish the path

```bash
git fetch origin main
git worktree add ../repo-cp-example-001 -b path/cp-example-001 origin/main
cd ../repo-cp-example-001
git push -u origin path/cp-example-001
git status --short --branch
```

Assign one writer to this writable worktree.

## Repair: a branch created before registration

Do not delete the branch. Find its real branch point and register
retroactively in a `repair` unit, with `base_commit` at that point:

```bash
git merge-base origin/main path/cp-example-001
```

The full procedure is in [repair](../../spec/reference/repair.md).
