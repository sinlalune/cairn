# cairn-open — command sequences

Defaults `main`, `origin`, `path/cp-example-001`; substitute the binding's
names. Run every gate bare and read its exit code; never pipe a gate into
another command.

## Register an accepted path

```bash
git switch main
git fetch origin main
git status --porcelain=v1
git rev-parse origin/main
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
in this commit.

**On `pull-request` transport** push it to a registration branch and open a
request to the trunk; the gate runs on it like any other, and nothing requires
the new path to already exist on the trunk:

```bash
git switch -c register/cp-example-001
git push -u origin register/cp-example-001
```

Once merged, fetch the trunk and branch from the registration commit.

**On `manual-git`** push the trunk directly:

```bash
git push origin HEAD:main
```

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
