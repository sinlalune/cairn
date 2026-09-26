# Cairn

**The lightest document-driven coding protocol.** Cairn is a set of files
inside your Git repository — one record per piece of work, one page per
decision, one entry per integration — and one checker that reads them and
returns an exit code. One command installs it,
[a handful of skills](./spec/reference/conformance.md#the-weight-budget)
teach it to the coding agents you work with, and nothing that matters lives in a
conversation. It was written for one owner working with several agents, and
it holds for a team: at any time, anyone who can read the repository can
answer which pieces of work are active, what each is meant to produce, who
may write each now, what has been completed or accepted, which exact remote
state to resume from, and which exact commit is proposed for integration.

Its surfaces, in the order a newcomer meets them:

- **Adopting the protocol** — the `cairn` command: `init` installs the kit,
  `status` reads it against the release, `adopt` turns a hand-copied
  installation into one. Quick starts 1 and 3 below.
- **Opening and running a path** — the [`cairn-open`](./skills/cairn-open/SKILL.md)
  skill registers one bounded change on the trunk before any code; the
  [`cairn-unit`](./skills/cairn-unit/SKILL.md) skill advances it one work unit
  at a time, in the coding stance of [`cairn-code`](./skills/cairn-code/SKILL.md)
  and Ponytail's two skills, which the kit fetches. Quick start 2.
- **Deferring work** — a review finding or a closing advisory left for later
  is one file under `project/backlog/`, which the next path proposed reads
  first.
- **Closing one** — the [`cairn-close`](./skills/cairn-close/SKILL.md) skill
  binds one exact candidate commit, has a fresh context answer the coherence
  questions, opens the pull request whose description is the review, and
  integrates that commit and no other.
- **Updating the kit** — the [`cairn-update`](./skills/cairn-update/SKILL.md)
  skill brings a repository to a newer release as a path of its own, reading
  `status` and [the release notes](./CHANGELOG.md) before anything is
  written. Quick start 3.
- **Telling Cairn what it cost** — a note under `feedbacks/` when the gate
  stayed green and the protocol still cost more than it should; a note about
  Cairn travels to this repository.
- **Learning** — the [`cairn-learn`](./skills/cairn-learn/SKILL.md) skill runs
  one session on an abstraction the work explained, and writes the note a
  later reader learns from.

## What it is, in one screen

A project runs on a **chronology** of six stages: an idea, then research, then
the vision and its specification, then a roadmap, then coding cycles built
around those documents, then a learning loop that feeds the next cycle. The
first four stages need light shapes — a note, a page, a row — and the
protocol asks almost nothing of them. The fifth is where a protocol earns its
name, and it is the one stage a checker enforces.

In that stage, one bounded change is one **coding path**: one folder, one
branch, one worktree, one writer at a time. The folder holds the declaration,
the definition of done, the acceptance that opened the path, one file per
executed step, and a resume section that anyone can pick the path up from,
cold. Work advances one **unit** at a time — plan, change, self-review,
review, verify — where the review is your own agent in a fresh context,
reading the diff against two criteria and nothing else; every completed unit
is one commit, pushed at once. Closing binds one exact candidate commit: the
pull request's description is the review, the merge is the acceptance, and
the integration lands that commit and no other. A published branch is never
rewritten.

A dependency-free **checker** runs
[the same rules](./spec/reference/conformance.md#implemented-rule-catalogue) on a
laptop and in CI and reaches one verdict; every one that blocks is proved by
a fixture that builds a real repository and breaks it on purpose. It reads
the repository and nothing else — no network call, no question to the
host. What the checker proves is fact: a record matches its
schema, a commit is an ancestor, a diff stayed inside a surface. What people
and agents judge — whether the outcome is right — stays a judgement,
recorded on the pull request.

Cairn sits beside spec-driven toolkits rather than against them. A path may
reference a specification produced by any of them; Cairn adds the durable
execution memory and the exact-candidate closure they do not keep.

## Quick start 1 — a new repository

You need Node 20 or later and Git. The package is `cairn-protocol`; its binary
is `cairn`.

```bash
mkdir my-project && cd my-project && git init -b main
npx cairn-protocol init --target . --profile ci --source src
git add -A && git commit -m "Install Cairn"
```

That installs
[the kit's files](./spec/reference/conformance.md#the-weight-budget) and a
lock: the checker and its companions under `tools/`, the skills under
`skills/` and `.claude/skills/`, the
configuration, the bootloader, the binding, the CI workflow and the
pull-request template, the folder indexes of both planes with the three
concept folders and an inputs folder, and the pointer page `cairn/README.md`,
which names the installed release, the chapters and the skills at it.
Ponytail's `ponytail` and `ponytail-review` are fetched from the plugin's
latest release; offline, `init` says so and the next `update` fetches them.
It copies no specification — every link it writes points at the specification
at the exact commit the kit was cut from. The configuration it writes declares
registration on the trunk directly, `manual-git`, and integration by pull
request. Then:

```bash
npm run cairn-check      # OK — protocol satisfied
```

Read `AGENTS.md`. It is deliberately tiny: it points at the path convention,
the binding, the execution protocol, the live view and the skills, in that
order, and states the one mechanical contract — the exit code is the verdict.

## Quick start 2 — one coding cycle

Open a path with the `cairn-open` skill, or by hand from the
[path template](./spec/reference/path-template.md):

1. Read `project/backlog/` first: an item the path takes is named in its
   goal, and its file in `writes:`. Write
   `project/coding-paths/CP-FIRST-001/index.md`: the goal in three
   plain lines — what the path does, why it is the least, what it does not
   do — a definition of done written as a plain list of checkable outcomes,
   the documents the work is bound by, and what it may write.
2. Put the plan to the owner in the chat. Their yes is the opening
   acceptance: record it inside the record, with the digest the checker
   computes — never by hand:

   ```bash
   node tools/cairn-check.mjs --scope-digest project/coding-paths/CP-FIRST-001/index.md#definition-of-done
   ```

3. Register it on the trunk before any implementation: set it `running`
   with the trunk tip as its base, regenerate the live view with
   `npm run cairn-active`, and land that one metadata-only commit on the
   trunk. The kit declares `manual-git` registration, a direct push, which
   needs a trunk that accepts one; a trunk that takes only requests
   declares `pull-request` registration and lands the same commit through
   a request merged in a way that keeps it. Only then create
   `path/cp-first-001` in its own worktree and push it.

Advance it with the `cairn-unit` skill: plan the unit in a new
`steps/S01.md`, make the change with the `cairn-code` stance, read your own
diff as a reviewer would, hand the diff to a fresh context of your agent and
write its findings into the step with their dispositions — a deferred one
names its backlog file — run every gate bare, set `current_step` and
refresh the resume section, commit the coherent unit with explicit paths,
and push. Every pushed unit is a place anyone can resume from.

Close it with the `cairn-close` skill: merge the trunk in, push the candidate,
run the checks on exactly that commit, hand its diff to a fresh context for
the four coherence questions, open the pull request with `npm run
cairn-audit` printing its description, make the one administrative commit
that sets `ready`, then ask the owner to read and try the result, and merge
— the merge is the acceptance. The trunk commit that follows records `done`
and writes the journal entry.

## Quick start 3 — a repository that already carries the protocol

A repository installed from an earlier release carries a lock, and comes to
the current release as a path of its own, with the `cairn-update` skill:
`status` first, then [the release notes](./CHANGELOG.md), then the owner
decides which edited kit files to take and which host files to decline, the
path is registered, and `update` runs:

```bash
npx cairn-protocol status     # the installed release against this one, file by file
npx cairn-protocol update     # rewrites what you did not edit, keeps what you did
npm run cairn-check
```

`update` rewrites every file that still holds what the kit wrote, restores
the ones the release adds, keeps every file you edited and prints what the
release changes in each, lists those on the pointer page, and writes the new
lock. `update --take <path>` takes the release's version of one file you
name; `update --decline <path>` stops writing one host file you do not
want.

A repository that copied the protocol by hand, with no lock, becomes an
installation with one command:

```bash
npx cairn-protocol adopt --target .
npm run cairn-check
```

`adopt` migrates the configuration and keeps every answer you gave, writes
the tools and the skills, keeps every host file that exists, regenerates the
live view, writes the lock, and reports every shape the kit no longer
defines — the copied specification, the old folders, the flat records — and
deletes none of it.

## Where to go next

| You want to | Read |
| :-- | :-- |
| understand why the protocol is shaped this way | [the manifesto](./manifesto.md) |
| know the whole protocol | [the specification](./spec/index.md), six chapters |
| load the procedures into your coding agent | [the skills](./skills/), as Agent Skills |
| know what 1.2 changes, and the decision behind each sentence | [the 1.2 page](./docs/architecture/02-cairn-1-2.md), [the 1.1 page](./docs/architecture/01-cairn-1-1.md) and [the decision records](./docs/adr/index.md) |
| know what a release changes for your repository | [the release notes](./CHANGELOG.md) |
| look up one word | [the concept wiki](./spec/concepts/index.md), borrowed terms kept apart from Cairn's own |
| find an exact shape or command | [the reference](./spec/reference/index.md) and the skills' reference files |
| know what the checker actually checks | [the conformance page](./spec/reference/conformance.md), rule by rule |
| read it all in a browser | the site under `site/`, published from this repository |

## Weight

The protocol is measured, and the measure is stated on
[the conformance page](./spec/reference/conformance.md): the words of the
specification and of the required entry chain, the files the kit installs,
the skills, the rules, the protocol files one unit writes. Each is a number
counted by a tool at the release; where a number has a target, the page says
whether it bound, and the kit's counts have none.

## Licence

MIT. Cairn was developed on Cairn: this repository's own path records, under
`project/coding-paths/`, are the worked example.
