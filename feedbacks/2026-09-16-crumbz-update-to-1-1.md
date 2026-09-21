---
type: Cairn Learning Note
title: Crumbz updates to 1.1 — what the first `update` of an edited kit met
description: The writer of Crumbz's CP-CAIRN-UPDATE-027, under ADR-028, on the first repository to bring an edited 1.0 kit to 1.1.0 with `update`: a repair the release had absorbed and a reading that said it had not, a live view the pointer page always asks to reconcile, a page never pristine the day after, a file that turns from unmanaged to edited between two readings, a dangling reference in the close skill, and template sentences that read false where they land, and two defects the request reviewer found in the post-mortem tool — each with where it was met, what it cost and the change that would remove it.
tags: [cairn, feedback, agent, adopter, crumbz, update, 1.1]
timestamp: 2026-09-16T00:00:00Z
cairn:
  status: provisional
---

# Crumbz updates to 1.1 — what the first `update` of an edited kit met

Written by the agent that ran Crumbz's
[CP-CAIRN-UPDATE-027](https://github.com/sinlalune/crumbz/tree/main/project/coding-paths/CP-CAIRN-UPDATE-027)
— Claude Code — on 2026-09-16, from that path's step records, under
[ADR-028](../docs/adr/ADR-028-a-feedback-file-when-nothing-broke.md).
Crumbz had installed 1.0.0 from `e26f19d` on 2026-09-03, run twenty-six
paths on it, and edited its checker three times as control-plane paths of
its own. `npx cairn-protocol@1.1.0 update --take tools/cairn-check.mjs`
and then `update` brought it to 1.1.0 from `bff7e2a` in one unit; two
more units settled the six files the update kept. Every gate was green at
every unit, and the update itself did exactly what its README says. What
follows is what cost more than it should.

**What is deliberately not here.** A partial commit pushed under a unit's
message, because a `git add` with one pathspec matching nothing aborted
whole and the commit chained after it ran on a stage holding one file:
the writer's, and the binding already says never to chain a commit after
a command whose exit code was not read.

## 1. A repair the release absorbed, and a reading that said it had not

**Where.** Crumbz's checker carried three repairs made as control-plane
paths of its own in the week of 2026-09-04 — step supersession
(CP-CAIRN-SUPERSESSION-005), provisional resolution
(CP-CAIRN-PROVISIONAL-006), the detached checkout
(CP-CAIRN-DETACHED-CHECKOUT-007) — written up in
[the closure post-mortem](./1.1/2026-09-04-crumbz-closure-checker-repairs.md).
Before the path could be opened, the writer read the two checkers side by
side to learn which of the three 1.1.0 had absorbed, searching the
release's checker for Crumbz's own function names, and concluded that it
carried the second and the third and nothing of the first: *no parser for
the field, no rule*. That was false. The release carries all three:
`parseSupersession`, `supersessionClaim` and `supersessionBinds`, the
`record-integrity` rule exempting a bound supersession and stating it as
an advisory, the block in the path template, and a fixture. The sentence
went into the path's record, was accepted with it, ran through three
units, and stood in the first draft of this file until the reader of that
draft on the protocol's side caught it.

**What it cost.** The side-by-side reading, function by function, and its
being wrong: a paragraph in the record built on a gap that does not exist,
a sentence in S01, a correction unit, and a first draft of this
observation that would have sent the 1.2 path looking for the same gap.
The decision the reading served — take the release's checker — was right
either way, and the one record that declares a supersession — CP-004's
S17, two claims over its edited S15 — was never at risk.

**The change to Cairn.** The release notes, or the 1.1 page, name the
adopter repairs the release absorbed and the ones it did not, by the
adopter's path ids, since those are what an adopter searches for. A writer
whose checker is edited then knows before `status`, and before reading
code, what `update --take` will drop. The ask is unchanged from the first
draft; the evidence for it is now that the reading was done with care and
still got it wrong.

## 2. The live view is always "to reconcile by hand" while a path runs

**Where.** `applyUpdate` computes the reconcile list — kept files whose
content differs from the template — before it regenerates
`project/coding-paths/ACTIVE.md`, and compares the view with the kit's
empty placeholder. Any update run while a path is running, which is every
update run inside a path, finds the view *edited* and writes it on the
pointer page's *To reconcile by hand* list.

**What it cost.** One paragraph in S01 and one decision in S02 saying
*nothing to decide*, and a pointer page that names, as a file to settle by
hand, the one file the kit says never to hand-edit. `status`, run a
minute later, already disagrees with the page: the regenerated view is
current, so it is not on the edited list.

**The change to Cairn.** Exclude the generated view from the reconcile
list as `installationStatus` already excludes it from the *current*
comparison, or regenerate before computing the list. One condition in
`applyUpdate`.

## 3. The pointer page is never pristine the day after it was generated

**Where.** `front()` stamps every generated page with the day it was
written, and `update` writes the pointer page into the plan so the lock
digests the page that lands. The next morning the template regenerates
with a new date, and `status` reports *update would write cairn/README.md
(pristine)* — a page the kit owns, generated, edited by nobody, and never
current.

**What it cost.** A line in every `status` reading from the second day
on, to be read past. On Crumbz it appeared on the same day, because the
first `status` ran after midnight UTC on the machine and the update
before.

**The change to Cairn.** A generated page carries the release's commit,
which already dates it; the timestamp in its front matter can be the
release's stamp date rather than the day of generation, so two
generations of one release are byte-equal. The same holds for every folder
index the kit writes: on Crumbz, five *pristine* files were rewritten by
the update with a diff of one timestamp line each.

## 4. A file that is unmanaged at one reading and edited at the next

**Where.** 1.0 wrote host files only where absent, and never recorded in
the lock a file it skipped. Crumbz had its own `docs/architecture/index.md`
on install day. `status` at 1.0 counted it as *1 unmanaged*; the update's
lock records every file of the plan at the template's digest; `status` at
1.1 counts the same file, unchanged on disk, as *edited* — and the pointer
page, whose list was computed from the *edited* set at update time, does
not name it.

**What it cost.** A file that appeared in the third outcome's evidence
without appearing in the update's report, and a decision written for it in
S02 so that `status` and the record agree by decision rather than by
accident. The next update will print its diff as if it were new.

**The change to Cairn.** The update's report names the files it is about to
start managing — *unmanaged* at the old lock, *edited* at the new — as a
third kind beside written and kept, and the pointer page lists them with
the kept. One line in the report; the state is already computed.

## 5. The close skill points at a file no release installs

**Where.** `skills/cairn-close/SKILL.md` step 5 and its reference say
*`tools/soundness.md` carries the finding*. The kit installs no such file
and the pointer page's owned list has none. A fresh-context reviewer found
it on the first read of the updated skills; the writer had read past it.

**What it cost.** One finding, one disposition. It is here because a
reader following the skill for the first closing on 1.1 will look for the
file.

**The change to Cairn.** Link the finding where it lives in the protocol
repository at the release's commit, as every other link in the skills is
pinned, or drop the sentence: the skill's reader does not need the
finding, only the rule.

## 6. Template sentences that read false where they land

**Where.** The 1.1 documentation index says *there is one page at this
root, `docs/<surface>.md`, listed above* and *adds its line to the README*.
Crumbz has no surface page yet and no root README. The first sentence is
the shape the plane will have once a promotion writes a page; the second
names a file the kit neither installs nor requires.

**What it cost.** Two findings from the fresh-context review of the
reconciled index, both refused — the release's text is kept whole, and
rewriting it in the adopter's voice is the drift `update` exists to
prevent — and so two false sentences on a page the adopter now owns.

**The change to Cairn.** Write the template in the shape it describes
rather than the state it asserts: *one page at this root per surface, as
they are written* — and either install a README stub the line can be added
to, or say *the repository's README, where it has one*.

## 7. The post-mortem tool cannot count the run it is running in

**Where.** `readRedRuns` in `tools/cairn-postmortem.mjs` asks the forge
for the branch's runs with `status=failure` and reports `total_count`.
The installed workflow runs the tool in the failure step of the run whose
checker just failed — a run still `in_progress`, which that filter cannot
return. Found by the request reviewer on Crumbz's closing request, read
against the file and the workflow.

**What it cost.** Nothing yet on Crumbz, whose gate has not gone red on
1.1. On the first red run the report will say *no red run* on a branch
that has one, and every later report undercounts by one.

**The change to Cairn.** Count the current run as red when the tool runs
from the failure step — the workflow knows it is, and can say so with one
flag or one environment variable — or read the runs after the current
one has reached its conclusion.

## 8. A closed, unmerged request reads as open

**Where.** The same tool asks for the branch's requests with `state=all`
and keeps `number`, `created_at` and `merged_at`; `requestsReading` then
prints every entry without `merged_at` as *open since*. A request closed
without merging — voided, abandoned — is printed as open. Same reviewer,
same read.

**What it cost.** Nothing yet; Crumbz has voided candidates by opening a
new request, not by closing one, so far.

**The change to Cairn.** Keep `state` and `closed_at` in the projection
and print *closed* for a request that is closed and not merged. Two
fields and one branch of the reading.

## 9. On the trunk, the post-mortem reads every path there is

**Where.** The installed workflow runs `cairn-postmortem --branch
"$CAIRN_BRANCH"` in the failure step, and on a trunk push that branch is
`main`. The tool, given the trunk, printed one section per path record in
the repository — twenty-seven of them, each with its registration, its
administrative commit, its digest, its red runs and its requests — and
nothing about the finding that had just failed. Seen on Crumbz's first red
trunk run, 2026-09-16 10:33Z, when `done` for CP-CAIRN-UPDATE-027 arrived
in a merge object.

**What it cost.** A reading nobody can use: the one path that mattered
was the twenty-seventh section of a log, indistinguishable from the
twenty-six that had nothing to do with the run.

**The change to Cairn.** On the trunk, read the path whose record changed
in the compared range — the arrival the checker just judged — and print
that one; or print the checker's finding first and the corpus not at all.
The tool has the range: the workflow passes the base to the checker one
step earlier.

## What the update got right

For the record, since a feedback file reads as a list of costs: `status`
before the update named, to the file, what the update then did; `--take`
printed the 2,044 lines it was about to discard before discarding them;
the reconcile diffs were the right diffs, kept file against template,
with the sides captioned; and the pointer page put the same list on disk,
which is where S02 read it from. The update of an edited kit was one
command, one read, and two units of decisions — the shape 1.1 promised.
