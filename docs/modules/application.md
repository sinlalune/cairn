---
type: Cairn Module Note
title: The reference tools
description: What lives under tools/ — the checker, the live-view generator, the audit scaffold, the post-mortem reader, the rule-catalogue generator, the greenfield pilot, the initializer and the configuration loader — how they find the specification, and how they are tested.
tags: [module, cairn, tools]
timestamp: 2026-09-15T00:00:00Z
---

# The reference tools

`tools/` is one of this repository's two source roots, and the area this note
covers: dependency-free Node scripts that evaluate the protocol the
[specification](../../spec/index.md) states.

| Tool | Does |
| :-- | :-- |
| `cairn-config.mjs` | validates `cairn.config.json` against `cairn-config.schema.json` before any rule runs; holds the two GitHub functions the post-mortem and the installer import, since it loads no configuration on import and the kit ships it |
| `cairn-check.mjs` | the checker: every blocking and advisory rule, reported by exit code |
| `cairn-active.mjs` | regenerates the live view of running paths and the roadmap register's state cells — a path's from its `status:`, dated from its journal entry when done; a milestone's from the paths its row names and the table under the heading ending with its short name — or checks that both are current; reports a roadmap register still carrying the installer's row while any path is registered |
| `cairn-audit.mjs` | scaffolds the closing review of one exact candidate: on `pull-request` the request's description, in the order the template gives, with the definition of done read item by item from the record; on `manual-git` the closing record in the path folder |
| `cairn-postmortem.mjs` | the mechanical half of a post-mortem; facts only, and no reading of it reaches an exit code |
| `cairn-rules.mjs` | regenerates the rule catalogue and the rule-to-requirement linkage on the [conformance page](../../spec/reference/conformance.md); this repository's, not installed |
| `cairn.mjs` | the `cairn` command: `init` installs the thin kit, `status` reads the lock, `update` rewrites every pristine file and prints what the release changes in an edited one (`--take <path>` hands over the release's version of one), `adopt` turns a lock-less installation into one; the package's, not installed |
| `cairn-pilot.mjs` | the greenfield pilot as a command: drives a throwaway repository from `init` to `done` on one transport — on `pull-request`, the registration too, through a `register/` branch and a merge that keeps its commit — green at every gate, and counts the protocol files each stage writes; this repository's, not installed |
| `*.test.mjs` | the tools' own suite, run by `npm run cairn-test`: the pure half of every rule against `evaluate()`, and one adversarial fixture per blocking rule against a real installed repository |

## How the tools find the specification

The specification lives at `spec/` in the root of this repository, beside its
concept wiki at `spec/concepts/`, which the configuration binds as
`roots.concepts`. The checker's Markdown corpus — the files whose links are
checked and whose links keep a concept from being an orphan — is the
documentation plane, the project plane, `skills/`, `feedbacks/` and the parent of
the concept root, so the specification is read wherever a host binds its wiki; `links` skips the
files and folders the configuration declares under `linkExemptions`, each with
its reason, and they still count as linking a concept. `concept-orphan` and
`concept-growth` read that root **recursively** and name a note by its path
under it — `learning/cache.md`, not `cache.md` — because an adopter's root is
three folders (ADR-011 d2) and two of them may hold the same word. A link
counts as reaching the note only if it reaches the folder the note is in;
`conceptLinkTargets` resolves a link to that path, and is pure because the
whole of `concept-orphan` turns on it. The rule generator
writes into the conformance page, not into the specification index, so the
index stays under its word budget.

## The rules

The checker implements twenty-eight rules — twenty-one blocking, seven advisory —
inventoried on the [conformance page](../../spec/reference/conformance.md),
which also records where every 0.2 name went. One invocation form judges a
tree — `cairn-check [--base <ref>] [--branch <name>] [--json]`, and on a path
branch the base defaults to the trunk — and one answers a question and exits:
`cairn-check --scope-digest <record>#definition-of-done`. The configuration is
schema 2.

**The profile line.** Every run reports the enforcement profile and the two
transports the configuration declares — as a third header line, or as the
`profile` object under `--json` — and nothing about the host. The checker
asks the host nothing and makes no network call (ADR-029): the reading of
GitHub's trunk rules that stood behind this line, with the token its workflow
step carried, is deleted, and a fixture proves the run green with `fetch`,
`http`, `https` and `net` made to throw and a token offered.

**What it reads of a path.** The opening acceptance from the record's own
`## Opening acceptance` block; the checkpoint from the resume section; the
registration commit as the trunk commit in which the record became `running`,
and, on `pull-request` registration off a path branch, the commit in the
change under review that declares it, refused unless it is not a merge,
touches the record's folder and the live view alone, is parented on
`base_commit`, and is all the comparison carries;
the branch's tip from the local ref, else `HEAD` when the checkout is detached,
else the remote-tracking ref. The range from a path's base to its candidate is
read as this path's own commits alone, where a draft is resolved by the later
commit that publishes the unit it was drafting, and an edited step record is
answered by a later step of the same path binding the blob it replaces to the
blob it adds. It reports a `running` or `ready` record whose `current_step` is not its last
step file, and refuses nothing for it. It reads the record of the review
movement in the newest unit
kept in a ledger — the unit under review — and reads nothing of that section
beyond whether it is empty. It validates `depends_on:` and knows two routes;
the live-view generator marks each live path unblocked or names what it waits
on.

**What it reads of an integration.** From the same range: the commit in which a
record reached `done`; whether that commit is a merge object carrying the edit,
refused on `pull-request` integration alone, the `--no-ff` merge being the
integrating unit on `manual-git`; and whether the `ready` the branch declared
is behind it, read from any parent of the arrival — a merge has two and an
octopus more, and the declaration may sit on any (ADR-027).

**The comparison every other rule inherits.** `comparison` judges the base the
run was given before any changed-file rule reads it. A base that does not
resolve is reported rather than thrown on; a base that resolves to the commit
under judgement is reported too, off a path branch, because a push compared
with itself yields no changed files and every rule keyed on them is skipped
under a green run. Both are `inconclusive`: a reading not made, not a violation
found. Closure follows the configured transport: on `pull-request` the checker proves
the candidate, its closure surface, the opening digest and the trunk drift from
Git and reads no review; on `manual-git` it also reads the closing record.

## The post-mortem

`cairn-postmortem.mjs` prints one line per reading, for one path or for every
path record, and closes on a line saying where the judgement is. The readings
are the ones [ADR-014](../adr/ADR-014-two-tools-of-1-1.md) decision 1 names,
with one widening: it watches the branch for `ready` **or** `done`, because a
branch that declared `done` is the incident a post-mortem is opened for, and a
reading that watched for `ready` alone would answer *not written yet* about it.

The predicates it judges with, and the Git plumbing under them, are imported
from `cairn-check.mjs`: a record's two shapes, its history in a range, the
metadata it declared at a commit, whether a ref exists, the blob that added a
step record. Its own are the rendering of each fact into a line, the two
GitHub readings — a branch's red runs, counting the run it is printed in
when the workflow says that run is red, and how long a request stayed open
or that it was closed unmerged — and what it takes from the working tree
rather than from Git: every path record, and each step's current content.
The remote's slug and the one GitHub request come from `cairn-config.mjs`.

On the trunk it reads the paths whose records changed between `--base` and
HEAD — the arrival the checker judged — and where none changed, prints the
checker's failure against the same base first and no path at all.

## The kit

**What `npx cairn-protocol init` writes.** The reference tools, every skill
under `skills/` — `cairn-update` among them — the folder indexes of both
planes, `feedbacks/` and the project root's `backlog/` with their indexes, and
the host files — the configuration, the bootloader, the binding, the package
scripts, the live view, a module note, the workflow on the `ci` profile and
the request template on `pull-request` integration. What that comes to is
measured by the release and bounds nothing (ADR-022 d2, ADR-031 d1). The
feedbacks index names the type a note carries, `Cairn Feedback`, and how a
note about Cairn reaches the protocol's repository; the backlog index says
what an item file holds and that the path taking it deletes it. A repository
that already has either index keeps its own: the next `update` reports it as
newly managed, and lists it to reconcile where it differs from the kit's.

The documentation plane it writes is the one 1.1 decided: `docs/inputs/` for
what the project had before the protocol, the architecture root with its
index, the modules root, and a concept root of three folders — `cairn`,
`product`, `learning` — each with its own index and none at the root. Every
role root is the one the configuration declares, and is derived under the
documentation root only where none is; the plan refuses itself if a path it
writes below the repository's root falls under no declared root and outside
the kit's own folders — `tools/`, `skills/`, `cairn/`, `.github/`. The
documentation index is the map: it links them and says where a surface page
goes, one per surface as they are written, that such a page opens with one
worked example and links its API's documentation, and that its line goes in
the README where the repository has one.
The configuration declares `transport.registration: manual-git`, the one
registration sequence `cairn-open` ships, whatever `--transport` answers for
`transport.integration`. The bootloader carries the five absolute rules of 1.0
about paths and two that reach a session with no path open: an abstraction
explained persists as a concept note, and an explanation is written for the
reader who is learning it.

**What it does not copy.** No specification: every link it writes into one is
pinned to the commit the kit was cut from, so a repository installed today
still resolves to the text it was installed from.

**The stance and the harness.** At `init`, `update` and `adopt` the kit
fetches Ponytail's two skills, `ponytail` and `ponytail-review`, from the
plugin's latest release on GitHub and installs them under `skills/` as kit
files; the lock names the version and whether this run read it, the pointer
page lists them with it, and `status` prints it. Offline or on a failed fetch
the command says in one line that Ponytail was not read and keeps the copies
the lock owns, each at its bytes on disk and its digest in the lock, so an
edit stays an edit and a copy installed by hand is never claimed; a copy the
lock owns that is gone keeps its lock entry, and `status` and that `update`
name it missing until a run that reads Ponytail restores it — nothing at a
first `init`; `status` never fetches and plans with those copies. The
stance is never copied from the package's own tree, which in this repository
is an installation that holds one. `CAIRN_PONYTAIL` names a local copy of
the plugin's repository to read instead, which is how the suite runs with no
network.
Every skill under `skills/` — the kit's and the stance — is also written to
`.claude/skills/`, where Claude Code loads skills: a copy, owned by the lock
like the original, since a link is a second thing to digest and breaks on a
Windows checkout. Codex reads `AGENTS.md` and needs no second location.

The two files ADR-013 offered for removal are kept, each
for its own worth and neither for a number — the configuration schema, which
no tool reads but every editor does, on the one file an adopter hand-edits;
and the project plane's index, because the manifesto commits to a tree where
every folder is navigable from its index.

**What the installation knows about itself.** `cairn.lock.json` records the
digest of every kit file as the kit wrote it, which is what lets `status` tell
an edit from an installation and `update` rewrite the first and keep the
second. Two digests are deliberately of the host's own content — the live
view as its generator wrote it, and the host's configuration as `update` and
`adopt` migrate and write it — and the lock names them under `hostBaseline`, so
`status` reads them as `host` and *pristine* means *what the kit wrote* for
every other file. Every page the kit generates is stamped with the day the
release was cut — the stamp's, else the source commit's — so two runs of one
release on two days write the same bytes and the lock does not move on the
clock. `cairn/README.md` is generated at `init` and at every `update` and
nothing on it is written by hand: the installed release and the commit it was
cut from, the release notes, the six chapters and the skills linked at that
commit, every file the kit owns, the files the repository declined, and the
files an update could not rewrite. `status` prints the release notes' link at
the package's commit under the line that says a newer release exists, and
says so when the package is older than the installation instead. The chapters
are six headings of one page, so each is linked at its own anchor, slugged
from its title rather than written out beside it. The bootloader's *start
here* list ends on it.

**What `update` does, and what it refuses.** A file that still holds exactly
what the kit wrote is rewritten when its template changed — whoever owns it,
because pristine means nothing of the adopter's is in it and a review would
protect nothing. An edited file is never rewritten: `update` prints what the
release changed in it, using Git's own `diff --no-index` against the template
in a temporary file rather than a diff written here, and ends its report with
the files to settle by hand. The pointer page carries that same list to disk,
so the work outlives the terminal. A host file the repository had before the
kit carried it is kept, reported as newly managed, and on that list when it
differs from the release's. `update --take <path>` replaces one named edited
file with the release's version, shows the lines it discards, moves that
file's lock entry with it, and touches nothing else but the pointer page,
which follows it. It refuses a path
the **lock** does not carry: the plan says what the release would install,
the lock says what this repository received, and `init` skips a
`package.json` the adopter already had — so taking "the release's version"
of that would overwrite a real manifest with the kit's template.

`update --decline <path>` names a host file the kit must not write, now or at
any later update — the configuration excepted, which every tool reads. The
lock keeps the name in `declined` and no digest for it, so `status` reads the
file as declined rather than missing, whether the repository deleted it or
kept its own; the name stays through a release that does not carry the file,
so one that brings it back does not write it. `update --take <path>` takes a declined file back: it writes the
release's version and moves the name out of `declined`; for a name the
release does not carry it only moves the name, so the next release that
carries the file writes it.

A file counts as **to reconcile** while it is kept and what is on disk
differs from the release's template; the live view never does. That is a
fact about now, recomputed each run, rather than a comparison with the lock:
the lock records what the kit *would* have written, so a second update at the
same release would find it equal to the template and drop a file nobody had
settled. `status` and `update` build their plan through one function and read
it through one predicate, which plans the pointer page's lists and reads the
plan again — so `status` names no rewrite `update` will not make, and the
page lists exactly what the report does.

**What `init` and `adopt` refuse.** `adopt` refuses `protected` beside
`manual-git` registration from the two declarations alone. On `manual-git`
registration both read, once, whether the trunk requires a pull request of
the owner: the trunk's rulesets on GitHub, with `GITHUB_TOKEN`, `GH_TOKEN` or
`gh auth token`, a ruleset that requires a request refusing unless it lets
this owner bypass it always or does not apply to them. Other rules that can
turn a push away — required checks, restricted updates, classic branch
protection — are not read, and a reading that finds no ruleset in the way
says in one line that those were not read. The refusal names the two ways out — a bypass,
or `pull-request` registration, which `init` takes as `--registration`.
Without a remote, a remote on GitHub, a token or an answer, the command says
in one line that it did not read and writes what was asked. The checker is
not touched: the reading is the installer's, at the owner's terminal, before
a file is written.

**What `adopt` does.** It is the migration from a 0.2 installation: it keeps
the host's answers, replaces the tools, adds the skills, and reports the
shapes the kit no longer defines rather than deleting anything of the
adopter's. Under that list it names the manifest and the workflows that
still call a stale file — a path, a glob that matches one, or one
`npm run` of a script that does; a stale page is never counted as called —
and says the gate is red until they go. A Markdown file of either plane whose
relative links resolve nowhere is reported as a shape that wants a
`linkExemptions` declaration, its links read as the checker's `links` rule
reads them and a link to a file the adoption writes counting as resolved. The
lock it writes digests the migrated configuration it actually wrote, not the
one a fresh install would have generated, so the next `status` does not call
an untouched file edited. `update` and `adopt` both plan from
the host's own declaration, so a repository that declared `pull-request`
registration keeps it, and the binding generated beside it — which prints both
transports — never contradicts the file it sits next to.

**The two host files an adopter's host reads.** The workflow matches this
repository's own where the two are meant to: the push trigger on the trunk
alone, the base per event, set once on the job so the checker and the
post-mortem read one range, the post-mortem step that runs on the checker's
failure, says the run is red and posts once on the request, and actions at
versions that run on Node 24. It differs in one place, and the test
says so — this repository runs its own suite before the gate, and the kit
installs no suite and names none. The request template opens with the three
plain lines and the surface link, then the definition of done item by item,
before the ledger; its *Coherence* section opens with the line naming the
reader, as this repository's does, and every blank in it is backticked, so
the forge strips none as an HTML tag — a test asserts no bare one survives.
The pilot's record writes its definition of done as a plain list;
`cairn-audit` reading such a list is row 4 of 1.2 on the register (ADR-042).

## Testing

`npm run cairn-test` runs Node's own runner over `tools/*.test.mjs`, and
`npm test` is an alias of it. The suite is this repository's: the kit installs
none and its workflow runs no test step, so an adopter's `npm test` stays the
adopter's product suite. Two kinds of test, and the difference is
the whole discipline written in [soundness](../../tools/soundness.md): the unit
suite proves each rule's predicate against `evaluate()` with hand-built
arguments, and the fixture suite proves each rule is WIRED, by installing a real
repository with `cairn init`, proving it green, introducing exactly one
violation and requiring the rule among the blocking findings. Every blocking
rule has such a fixture, and the coverage is declared in the suite so that a
new blocking rule forces the choice. The parity tests assert that the local
default and the CI invocation reach one verdict on one tree. CI runs the suite
before the gate as `cairn-test`, in the one job that is the required check; the
job runs once per commit that can land — the trunk's push and the request,
never a push to a path branch — and a step that runs only on the checker's own
failure prints the post-mortem into the run's log, and posts it on the request
when the run belongs to one.
