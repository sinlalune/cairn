# cairn-close — command sequences

Defaults `main`, `origin`, `path/cp-example-001`; substitute the binding's
names. Run every gate bare; the exit code is the verdict. A host that declares
`pathHistoryPolicy: retained` follows its own retention procedure before any
rewriting push; nothing below rewrites anything.

## Produce implementation candidate C

```bash
git fetch origin main
git rev-parse origin/main        # this is T
git merge origin/main
```

Resolve conflicts and commit the merge. Finish any final implementation, then:

```bash
git log origin/main..HEAD --grep='Cairn-Provisional' --oneline   # must print nothing
git commit -m "CP-EXAMPLE-001: final implementation candidate"  # if changes remain
git rev-parse HEAD                                              # this is C
git push origin path/cp-example-001
npm run cairn-check -- --base origin/main
npm test
```

## Review and accept exactly C

```bash
npm run cairn-audit -- --subject <C> --branch path/cp-example-001
node tools/cairn-check.mjs --scope-digest project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
npm run cairn-check -- --base origin/main   # the advisories to disposition
```

**`pull-request`**: the first command prints the request's description. Open
the request from `path/cp-example-001` to `main`, paste and fill it. The
approval is the acceptance.

**`manual-git`**: the first command scaffolds
`project/coding-paths/CP-EXAMPLE-001/closing-<C>.md`. Fill every field, the
four answers and the verdict.

If the digest differs from the opening acceptance, stop: restore the text or
record a scope amendment. If implementation changes, stop: a new `C`.

## Create administrative commit A

Set `status: ready` and `subject_commit: <C>`, point the resume section's
checkpoint at `C`, regenerate the live view. Run the gate before committing,
then stage only the closure surfaces:

```bash
npm run cairn-active
npm run cairn-check -- --base origin/main
git add project/coding-paths/CP-EXAMPLE-001/index.md
git add project/coding-paths/ACTIVE.md
git add project/coding-paths/CP-EXAMPLE-001/closing-<C>.md   # manual-git only
git commit -m "Close CP-EXAMPLE-001 candidate <C>"
git rev-list --count <C>..HEAD                                # must print 1
npm run cairn-check -- --base origin/main
git push origin path/cp-example-001
```

## Check acceptance drift

```bash
git fetch origin main
git diff --name-only "$(git merge-base origin/main HEAD)" origin/main
npm run cairn-check -- --base origin/main
```

If any file in that list matches `writes:` or `governs:`, the acceptance is
invalidated: return to `running`, merge the new tip in, and repeat.

## Integrate

**`pull-request`**: merge the request on the forge — a merge commit, with
`cairn-check` green on the commit that lands. Then, from a clean trunk
checkout:

```bash
git switch main
git fetch origin main
git merge --ff-only origin/main
git merge-base --is-ancestor <C> HEAD
```

Set `status: done` and `resolution: completed`, keep `subject_commit: <C>`,
regenerate `ACTIVE.md`, write `project/log/YYYY-MM-DD-cp-example-001.md`, run
the gate, and land that commit through the transport.

**`manual-git`**: construct the integration unit from a clean trunk checkout:

```bash
git switch main
git fetch origin main path/cp-example-001
git merge --no-ff --no-commit origin/path/cp-example-001
```

In that pending unit only: `status: done`, `resolution: completed`,
`subject_commit: <C>` retained, `ACTIVE.md` regenerated, the journal entry.

```bash
git add project/coding-paths/CP-EXAMPLE-001/index.md
git add project/coding-paths/ACTIVE.md
git add project/log/YYYY-MM-DD-cp-example-001.md
git commit -m "Integrate CP-EXAMPLE-001"
git merge-base --is-ancestor <C> HEAD
npm run cairn-check
npm test
git push origin HEAD:main
git fetch origin main
git merge-base --is-ancestor HEAD origin/main
```

## Remove the secondary worktree safely

From another checkout:

```bash
git worktree list --porcelain
git -C /exact/path/to/repo-cp-example-001 status --porcelain=v1   # must print nothing
git worktree remove /exact/path/to/repo-cp-example-001
git worktree list --porcelain
test ! -e /exact/path/to/repo-cp-example-001
```

No `--force`; never the primary checkout. The path branch may stay.

## Report partial outcomes precisely

```text
path ready, not integrated
path ready, acceptance invalidated by trunk drift
integration candidate checked, remote push failed
remote integration complete, cleanup incomplete
```

When a rule has already been broken, do not tidy the history: the
[repair procedures](../../spec/reference/repair.md) give the sequence for
each case.
