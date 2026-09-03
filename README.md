# Cairn

**The lightest document-driven coding protocol.** One command installs it, one
checker enforces it, five skills teach it, and everything that matters lives in
files inside your Git repository — nothing in a conversation.

Cairn is for one developer working with several coding agents as much as for a
team. It keeps six things answerable at any time, by anyone who can read the
repository: which pieces of work are active, what each is meant to produce, who
may write each now, what has been completed or accepted, which exact remote
state to resume from, and which exact commit is proposed for integration.

- [The manifesto](./manifesto.md) — what the protocol is for.
- This page — the overview and three quick starts.
- [The specification](./spec/index.md) — the whole protocol, on the six stages
  of a project, under eight thousand words.
- [The skills](./skills/) — the procedures, as Agent Skills your coding agent
  loads on demand.

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
cold. Work advances one **unit** at a time — plan, change, self-review, verify
— and every completed unit is one commit, pushed at once. Closing binds one
exact candidate commit: the pull request's description is the review, its
approval is the acceptance, and the integration lands that commit and no
other. A published branch is never rewritten.

A dependency-free **checker** runs the same twenty-four rules on a laptop and
in CI and reaches one verdict; nineteen of them block, and every one of those
is proved by a fixture that builds a real repository and breaks it on
purpose. What the checker proves is fact: a record matches its schema, a
commit is an ancestor, a diff stayed inside a surface. What people and agents
judge — whether the outcome is right — stays a judgement, recorded where the
forge already keeps it.

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

That installs twenty-six files and a lock: the checker and its companions
under `tools/`, the five skills under `skills/`, the configuration, the
bootloader, the binding, the CI workflow and the pull-request template, and
the folder indexes the protocol's roles need. It copies no specification —
every link it writes points at the specification at the exact commit the kit
was cut from. Then:

```bash
npm run cairn-check      # OK — protocol satisfied
```

Read `AGENTS.md`. It is deliberately tiny: it points at the path convention,
the binding, the execution protocol, the live view and the skills, in that
order, and states the one mechanical contract — the exit code is the verdict.

## Quick start 2 — one coding cycle

Open a path with the `cairn-open` skill, or by hand from the
[path template](./spec/reference/path-template.md):

1. Write `project/coding-paths/CP-FIRST-001/index.md`: the goal, a definition
   of done written as checkable outcomes, the documents the work is bound by,
   and what it may write.
2. Record the opening acceptance inside it, with the digest the checker
   computes — never by hand:

   ```bash
   node tools/cairn-check.mjs --scope-digest project/coding-paths/CP-FIRST-001/index.md#definition-of-done
   ```

3. Register it on the trunk before any implementation: set it `running`,
   regenerate the live view with `npm run cairn-active`, land that one
   metadata-only commit, and only then create `path/cp-first-001` in its own
   worktree and push it.

Advance it with the `cairn-unit` skill: plan the unit in a new
`steps/S01.md`, make the change with the `cairn-code` stance, read your own
diff as a reviewer would, run every gate bare, refresh the resume section,
commit the coherent unit with explicit paths, push, and read CI. Every pushed
unit is a place anyone can resume from.

Close it with the `cairn-close` skill: merge the trunk in, push the candidate,
run the checks on exactly that commit, open the pull request with
`npm run cairn-audit` printing its description, get it approved, make the one
administrative commit that sets `ready`, and merge. The trunk commit that
follows records `done` and writes the journal entry.

## Quick start 3 — a repository that already carries the protocol

A repository installed from an earlier release, or one that copied the
protocol by hand, adopts the current release with one command:

```bash
npx cairn-protocol adopt --target .
npm run cairn-check
```

`adopt` migrates the configuration and keeps every answer you gave, replaces
the tools, adds the skills, keeps every host file that exists, regenerates
the live view, writes the lock, and reports every shape the kit no longer
defines — the copied specification, the old folders, the flat records — and
deletes none of it. Later:

```bash
npx cairn-protocol status     # the installed release against the latest, file by file
npx cairn-protocol update     # rewrites what you did not edit, keeps what you did
```

## Where to go next

| You want to | Read |
| :-- | :-- |
| understand why the protocol is shaped this way | [the manifesto](./manifesto.md) |
| know the whole protocol | [the specification](./spec/index.md), six chapters |
| look up one word | [the concept wiki](./spec/concepts/index.md), borrowed terms kept apart from Cairn's own |
| find an exact shape or command | [the reference](./spec/reference/index.md) and the skills' reference files |
| know what the checker actually checks | [the conformance page](./spec/reference/conformance.md), rule by rule |
| read it all in a browser | the site under `site/`, published from this repository |

## Weight

The protocol is measured against a budget, stated on the conformance page:
the specification under eight thousand words, the required entry chain under
three thousand, the installed kit under thirty files, one lightweight unit
under six protocol files. A cap that has never bound is a count, not a
constraint.

## Licence

MIT. Cairn was developed on Cairn: this repository's own path records, under
`project/coding-paths/`, are the worked example.
