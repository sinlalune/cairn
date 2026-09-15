---
type: Cairn Coding Path
title: The three rulings of September — the review's fallback, feedback with no incident, the checker asks the host nothing
description: A path for the three rulings the owner gave while paths 4 and 5 ran, none of which had a row. ADR-017 is patched in place with the fallback the review movement lacks — what a writer does when no fresh context can be obtained, and how the step says which reader read; a new record makes feedbacks/ the channel an agent writes when the gate stayed green and the protocol still cost more than it should, the first such file written here; and a new record deletes the GitHub reading from the checker, superseding ADR-001 decision 6 and ADR-026 decision 1, so the checker asks the host nothing and runs the same everywhere. Placed before the release.
tags: [coding-path, decision, implementation, cairn-1.1, review, feedback, checker]
timestamp: 2026-09-15T00:00:00Z
cairn:
  id: CP-CAIRN-010
  route: full
  status: running
  current_step: S01
  base_commit: 8632ccc7014a5c573cf249eb04c824557533d760
  branch: path/cp-cairn-010
  assigned_writer: cp-cairn-010-writer
  depends_on: []
  subject_commit: null
  resolution: null
  writes:
    - docs/adr/**
    - docs/architecture/01-cairn-1-1.md
    - docs/architecture/index.md
    - docs/modules/application.md
    - skills/cairn-unit/SKILL.md
    - spec/reference/path-template.md
    - spec/reference/conformance.md
    - feedbacks/**
    - tools/cairn-check.mjs
    - tools/cairn-check.test.mjs
    - tools/cairn-fixture.test.mjs
    - tools/cairn-rules.mjs
    - tools/soundness.md
    - tools/cairn.mjs
    - tools/cairn.test.mjs
    - .github/workflows/cairn.yml
    - project/coding-paths/index.md
    - project/coding-paths/CP-CAIRN-010/**
  governs:
    - docs/architecture/01-cairn-1-1.md@b3a86434fefb628f2ae4f996065da912535261df
    - project/log/2026-09-15-cp-cairn-009.md@9dfaed79f33afa00411bd47d5c3ccda8e6f3787e
    - docs/adr/ADR-001-sole-owner-opens-and-closes-a-path.md@c1feab4c345806f5d014b4677924a707ab9aaace
    - docs/adr/ADR-014-two-tools-of-1-1.md@f27627d460a3d8494866df8bb4c256be0a18f540
    - docs/adr/ADR-026-the-readings-that-must-not-lie.md@220fe28c2d5c803b8fac27e614cfbbe0a92afdf5
---

# CP-CAIRN-010 — the three rulings of September

## Goal

This path writes down three things the owner already decided in the
chat and makes the files say them: what a writer does when the review
movement's reader cannot be obtained, where an agent writes when the
protocol cost more than it should and nothing broke, and that the
checker asks GitHub nothing. It is the least because each ruling is one
record or one patched record, one sentence in a skill or a template, and
one deletion; nothing is added to the checker, and the one thing added
to the kit is a kind of file, not a tool. It does not touch the open and
close skills, the chapters, the layout, the README or the site.

**The review movement is unusable as written, and this patches it.**
ADR-017 says every unit's diff is read by a fresh context of the
writer's own agent, and `cairn-unit` movement 4 offers a fresh session,
a subagent or the harness's review command and assumes one works. On
path 4, sixteen of twenty fresh contexts hung, each emitting one line or
none; on path 5 before it, seven of eleven. The writers improvised —
deferred the read, obtained it late, read the diff themselves and said
so — and the `review` rule, which reads only that the section is not
empty, cannot tell a second context from the writer marking their own
homework. The owner ruled on 2026-09-15: a record, in its own path, that
names what a writer does when no reader is obtainable and makes the step
say how the read was made; one sentence in the skill, one line in the
section, no new rule. This path patches ADR-017 in place with a fourth
decision, as its own S07 did for the third, rather than superseding a
record whose three decisions stand.

**Feedback with no incident.** `cairn-postmortem` reads facts after a
red run, and `feedbacks/` holds the owner's pages to the protocol.
Nothing carries an agent's observation to the protocol when nothing
broke: the gate stayed green and the protocol still cost more than it
should have here. The owner introduced it on path 4's request and named
it again on 2026-09-15: a file under `feedbacks/`, written when there
is something to say, persisting the frictions a harness meets with the
protocol that do not fit a post-mortem, as material for the protocol's
continuous improvement. No tool, no skill, no rule, no per-unit ritual;
the owner refused a seventh skill and a tool beside the post-mortem. The
channel is Cairn improving Cairn: a defect of the harness itself goes to
its vendor and earns no file here. This path writes the record and the
first such file, from what path 4's writer observed and could not
place.

**The checker asks the host nothing.** ADR-001 decision 6 had the
checker read GitHub's rulesets for a profile line saying what the host
does not enforce, and ADR-026 decision 1 taught it to report what GitHub
withheld. The owner reached the ruling of 2026-09-14 from the
contradiction himself: a portable word, *the forge*, wrapping one
GitHub-only mechanism — one `https://api.github.com` URL, about ninety
lines, forty test assertions, one record and two paths spent — for one
line of output whose question has no portable form, since GitHub's
rulesets, GitLab's protected branches and Gitea's branch protections
share neither a model nor an answer. GitHub's own settings page shows
the bypass hole the line was for. The ruling: delete the reading, its
token in both workflows, and the profile line's host half; the checker
then has no network call and no host-specific code, and runs the same
on any host. This path writes the record that supersedes the two
decisions and makes the deletion.

The [1.1 page](../../../docs/architecture/01-cairn-1-1.md), sections
*How a path runs*, *What the checker reads at each transition* and
*Which tools exist*, is amended for all three. The register gains a row
for this path before the release, as it did for row 5, because a review
movement no writer can perform and a gate that reads what it should not
must not be what 1.1.0 ships.

## Definition of done

- [ ] ADR-017 carries a fourth decision, dated 2026-09-15 and added in
      place as its third was: when no fresh context can be obtained — a
      subagent that hangs, a harness without one, a command that returns
      nothing — the writer reads the diff against the same two criteria
      and says so; the review section opens with one line naming the
      reader — a fresh context, and which kind, or the writer with the
      reason no reader was obtainable — and the second read's line says
      the same; the `review` rule reads presence and nothing more, and
      whether the reader was fresh is the owner's to read at the
      candidate; the record's tables name `cairn-unit` movement 4 and the
      path template's review section as the surfaces, and the 1.1 page's
      sentence on the review gains the clause, marked *since 2026-09-15*.
- [ ] `cairn-unit` movement 4 says, in one sentence, what the writer does
      when no reader is obtainable and that the section's first line names
      the reader; the step shape in `spec/reference/path-template.md`
      shows the line under `#### Review`, once for the first read and once
      for the second.
- [ ] ADR-028 exists in the layout's shape, promoted from the owner's
      words on path 4's request and in the chat of 2026-09-15 as path 4's
      journal records them: a file under `feedbacks/` is the channel an
      agent writes when the gate stayed green and the protocol still cost
      more than it should — naming the movement, the cost and the change
      to Cairn that would remove it — written when there is something to
      say and never as a ritual; a defect of the harness earns no file; no
      tool, no skill, no rule; `feedbacks/index.md` says the folder holds
      the owner's pages and the agents' files, and lists each; the unit
      skill's last movement gains one sentence pointing at the channel.
- [ ] The first such file exists under `feedbacks/`, listed in the index,
      carrying what path 4's writer observed and could not place: a
      record naming a surface with an unresolved placeholder that nothing
      notices; one measured fact restated in several documents that
      nothing reconciles; a definition of done contradicting a record it
      cites; a record specifying a mechanism nothing produces yet with no
      way to mark it pending — each with its cost and the change to Cairn
      that would remove it, and none of them a harness defect.
- [ ] ADR-029 exists in the layout's shape, superseding ADR-001 decision 6
      and ADR-026 decision 1 and naming them, with the owner's ruling of
      2026-09-14 and the measured cost of the reading it deletes; the
      checker asks the host nothing: `githubSlug`, `forgeGaps`,
      `readForge`, the host half of the profile line and their tests are
      gone, the profile line prints the declared transports and the
      enforcement profile and no claim about the host, `GITHUB_TOKEN` is
      gone from the checker's step of this repository's workflow and of
      the workflow the kit generates — the post-mortem step keeps the
      token it uses to post a comment — and `cairn-check` makes no
      network call, proved by a test that runs it with no network; the
      catalogue, the matrix, the soundness note and the conformance page's
      profile row follow; the two decisions superseded are marked so in
      their records' status lines and in the index.
- [ ] The 1.1 page states the three rulings, naming the record behind
      each sentence and marked *since 2026-09-15*: the review's fallback
      and the reader line; the feedback file beside the post-mortem in
      *Which tools exist* and in the documentation plane's table; the
      checker reading the repository alone, its profile line without a
      host half, and *the forge* replaced by GitHub where GitHub is meant;
      `docs/modules/application.md` describes the checker without the
      reading.
- [ ] Nothing under `skills/cairn-open`, `skills/cairn-close`,
      `skills/cairn-learn`, `skills/cairn-code`, `skills/cairn-brainstorm`,
      `spec/index.md`, `spec/reference/repository-layout.md`, `README.md`
      or `site/` changes; the four governing documents other than the
      page are byte-identical at the candidate to what they are at
      `base_commit`, and the page is amended in place and marked; the
      register, a write surface, gains this path's row before the release
      and nothing else.
- [ ] Every completed step has one self-contained step record naming the
      definition-of-done item it advances, a refreshed resume section, one
      commit, a remote checkpoint, a self-review in the five tags and a
      `#### Review` section whose first line names the reader as this
      path's own first decision asks, with the fresh-context read where
      one was obtained and the writer's read said so where not; every
      behaviour change in the checker or the installer has its failing
      test first; `current_step` names the unit whose block is in the
      commit.
- [ ] The final candidate contains the trunk tip, is checked bare, and is
      reviewed in the pull request's description in the order the audit
      tool prints; the administrative commit declaring `ready` and
      `subject_commit` is on the branch with its check green before the
      owner is asked to merge; the owner reads the first feedback file and
      the profile line the request's run prints before the merge; the
      merge is the acceptance.
- [ ] The exact candidate lands through the pull request, the trunk
      records done with one journal entry, the remote result is proved,
      and the clean secondary worktree is removed by the writer, or the
      failure to remove it is reported.

## Opening acceptance

```yaml
decision: accepted
accepted_by: sinlalune
accepted_roles: [initiator, reviewer]
accepted_at: 2026-09-15T14:04:36Z
scope_ref: project/coding-paths/CP-CAIRN-010/index.md#definition-of-done
scope_digest: sha256:a4d433e0d80a0dd3a71eb02fdddeafb02afbced4b13beaa5f0da4cca14284578
```

Reviewed in the chat of 2026-09-15: route `full` because the path writes
and patches decision records and changes the checker, the unit skill,
the template and both workflows, control-plane surfaces; the definition
of done above; writes limited to the records, the 1.1 page and its
index, the tools' module note, the unit skill, the path template, the
conformance page, the feedbacks folder, the checker and its tests, the
rules and soundness files, the installer and its test, this repository's
workflow, the register and this folder, with no overlap because no other
path runs; the other skills, the chapters, the layout, the README and
the site excluded from change; governed by the 1.1 page, path 4's
journal entry and three records at their blob ids on `main`; initial
writer `cp-cairn-010-writer`. The owner read the plan — ADR-017 patched
in place with the fallback, the feedback channel as a file with the
first one written here, the GitHub reading deleted, no `forge` concept
note — and gave the go-ahead in the chat with the word "yes"; that
go-ahead is this acceptance, and the record lands on the trunk directly.
The owner said the units run in a fresh session. Amendments: none.

## Documentation coverage

### Required

- `project/log/2026-09-15-cp-cairn-009.md` at its pinned blob — the
  review movement's failure counted, the owner's rulings as the journal
  records them, and what the writer observed and could not place.
- `docs/adr/ADR-017`, `ADR-001` and `ADR-026` at their pinned blobs —
  the record patched and the two decisions superseded.
- `docs/architecture/01-cairn-1-1.md` at its pinned blob — the three
  sections amended.
- `skills/cairn-unit/SKILL.md` movement 4 and `spec/reference/path-template.md`
  as path 3 left them — the sentence and the line go beside what is there.

### Conditional

- `docs/cairn/manifesto.md` — read whenever the feedback channel would
  become a ritual or a tool; the owner refused both.
- `tools/cairn-postmortem.mjs` — read to keep its own token and its
  comment step untouched by the deletion.
- `feedbacks/index.md` and the owner's notes there — the shape a file
  in that folder has, so the agents' files sit beside them.

### Deliberately excluded

- `skills/**` other than the unit skill — paths 1 and 3, done.
- A `forge` concept note — with the reading gone, the word is replaced
  where GitHub is meant; the specification's portable text keeps *the
  host*, which chapter 5 already uses.
- `README.md`, `site/**` — the release.

## Steps

Forward steps live in [`plan.md`](./plan.md) until they are executed.

- **S01** — not started

## Resume

### Checkpoint

```text
commit : the registration commit — the trunk commit that adds this record, whose parent is base
unit   : 0
base   : 8632ccc7014a5c573cf249eb04c824557533d760
trunk  : 8632ccc7014a5c573cf249eb04c824557533d760 — origin/main at registration
```

### Next action

In a fresh session, from the worktree `../cairn-cp-cairn-010` on branch
`path/cp-cairn-010`: run S01 of the plan with `cairn-unit` — the records:
ADR-017's fourth decision in place, ADR-028 the feedback file, ADR-029
the checker asks the host nothing, the 1.1 page amended and marked
*since 2026-09-15*, the two indexes. Type `decision`. From this unit on,
the review section's first line names the reader — a fresh context and
which kind, or the writer and why — as decision 4 says.

### Blockers

None.

### Tried and rejected

- Superseding ADR-017 with a new record for the fallback — its three
  decisions stand and the fourth completes them; the record's own
  precedent is a decision added in place, dated, by the path that found
  the gap.
- A seventh skill or a tool for the feedback channel — refused by the
  owner; a file written when there is something to say.
- Deleting the review movement rather than giving it a fallback — the
  reader found real defects on every path that obtained one; what failed
  was the harness's subagent, not the movement.
- Keeping the GitHub reading behind an option — an abstraction with one
  implementation, costing what the record measures, for a line GitHub's
  own settings page already shows; the owner's ruling.
- Pinning the register in `governs:` — a write surface, as in every
  path before.

### Reading order

1. `AGENTS.md`, then `skills/cairn-unit/SKILL.md` as path 3 left it.
2. `project/log/2026-09-15-cp-cairn-009.md` at its pinned blob — the counts and the rulings.
3. `docs/adr/ADR-017`, `ADR-001` decision 6, `ADR-026` decision 1 — what is patched and what is superseded.
4. `project/coding-paths/CP-CAIRN-010/plan.md`, then `tools/cairn-check.mjs` at `forgeGaps`, `readForge` and the profile line before S03.

### Verify

```bash
npm run cairn-check
npm run cairn-test
```
