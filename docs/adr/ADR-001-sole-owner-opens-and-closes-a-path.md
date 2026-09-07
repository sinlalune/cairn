---
type: Cairn Decision Record
title: ADR-001 — a sole owner opens and closes a path
description: In a repository run by one owner with agents, the owner's go-ahead in the chat is the opening acceptance and the plan lands on the trunk directly; the owner reads the plan, tries the result before the merge, and the merge click is the closing acceptance. Promotes rulings R01, R02, R04, R05, R06 and R08 of Cairn 1.1; R03 is refused.
tags: [cairn, adr, 1.1, registration, acceptance, sole-owner]
timestamp: 2026-09-06T00:00:00Z
adr:
  id: ADR-001
  status: accepted
  date: 2026-09-06
---

# ADR-001 — a sole owner opens and closes a path

Status: accepted · 2026-09-06 · written by CP-CAIRN-002, S01

**Promoted from** the owner's
[decisions page](../../feedbacks/2026-09-06-cairn-1-1-decisions.md) at blob
`110cde972d683680bdeb713264a26fd8f9f44acd` (questions Q1 to Q6 and the first
removal of Q19) and the [rulings note](../../feedbacks/2026-09-06-cairn-1-1-rulings.md)
at blob `313f8ea18fe77d0fb6f641ac969989dc4d35a17f` (theme 1, R01 to R08
except R07). Both notes stay exactly as they were. This record states what
they decided, once, and names what implements it.

## Context

Cairn 1.0 opens a path through a `register/` branch and a pull request, and
closes it through a second pull request whose approval is the acceptance.
That shape assumes a reviewer who is not the writer. In a repository run by
one owner with agents, the owner reviews their own request.

On Crumbz, sixteen paths in three days, that produced four faults:

- the plan request waited between fifteen minutes and thirteen hours for
  the owner's merge, and five times the agent coded on the path before it
  merged, then patched the record;
- GitHub does not let a sole owner approve their own request, so fifteen
  closures carry no recorded approval, and once the owner merged
  twenty-nine seconds after the request opened, without trying the result;
- twice a request was merged before its check had run, and the check then
  failed;
- six early paths went from `running` to `done` on the trunk with no
  `ready` commit, because the checker allowed that edge for the
  `manual-git` merge unit.

This path met the same shape on the protocol's own repository. It declares
`transport.registration: pull-request`, and the trunk's ruleset (named
`trunk`) requires a pull request, the `protocol` check on the exact commit,
a merge commit, no force-push and no deletion. The owner ruled in the chat
that the plan lands directly. The direct push of the registration commit was
refused by the ruleset until the owner gave the repository's admin role a
bypass that always applies. The registration commit then landed as
`ec1e53502005142a117e8eeed0b8ae709cd95dd9`, with the declaration still
saying `pull-request`. That gap is settled by decision 1 and decision 6.

## Decisions

Each decision names the ruling it promotes, the owner's question it came
from, and the rule, skill or kit file it changes, by the name the conformance
page, the skills and the kit use today. How the change is coded is the work
of the coding path the roadmap register names, not of this record.

### Decision 1 — the owner's go-ahead in the chat is the opening acceptance

Promotes **R01**, from Q1 and the first removal of Q19.

The agent writes the path record and puts it to the owner. The owner says
yes in the chat. The agent writes that yes into the record as the opening
acceptance block, with the owner as `accepted_by` and the time of the
go-ahead, computes the digest with the checker, regenerates the live view,
and lands the registration commit on the trunk directly. Only when that
commit is on the remote trunk does the agent create the branch and start
the first unit. Nothing is coded before the landing (the owner's answer to
Q1 was *No*).

A repository run this way declares `transport.registration: manual-git`
and keeps `transport.integration: pull-request`. There is no `register/`
branch, no registration request, and no `registration-pending` rule: the
wait the rule would have tolerated is the wait the owner removed.

On a forge whose trunk ruleset requires a pull request, the direct push
lands because the owner's role bypasses the ruleset. That is the forge's
own mechanism, not a Cairn one, and the record keeps the ruleset's four
rules: they still guard every request and every other actor. What the
bypass costs is stated in decision 6 and in the consequences below.

The registration commit is still record and view only, and it is still
checked: the trunk's own run judges it after it lands, where a request's
run would have judged it before.

What this changes, by today's names:

- `cairn.config.json`, `transport.registration`: this repository declares
  `manual-git`; the kit's default stays `pull-request`, and a sole owner
  declares the other value at installation or when this record is adopted.
- The `cairn-open` skill, step 3, and its reference's *On `pull-request`
  transport* sequence: the request sequence goes; the direct push stays.
- `project/coding-paths/binding.md`: the transport row names both values.
- The rules `registration` and `registration-base` do not change: the
  registration commit's shape and its parent are the same on both transports.

### Decision 2 — the owner's reading of the plan is a named step

Promotes **R02**, from Q2.

*The owner reviews the plan* is a step of opening, between the record and
the go-ahead: the agent expects it, and a change the owner asks for is
written into the record before the acceptance block. A change asked after
the acceptance is a second acceptance block under the same heading, naming
the first with `supersedes:`, as the human-records reference already
defines. Nothing is edited in place.

What this changes: the `cairn-open` skill, step 2, gains the sentence. No
rule changes; `scope-digest` already catches an edit without a superseding
block.

### Decision 3 — the owner tries the result before the merge

Promotes **R04**, from Q3.

For every path, before the merge, the owner uses what was built. That is
a named step of closing, and the close skill says so: the writer's report
of the candidate ends by handing it to the owner to try, and the merge
comes after. For a path whose product is documents, trying the result
means reading the pages.

The rulings note wrote R04 with a checkbox in the request that only the
owner ticks. On 2026-09-07, at this path's own closure, the owner dropped
the box: *"I chose that because of the testing, not because of the
tick."* The step is the trying; the merge click that follows records it
(decision 4). Nothing is added to the request template, and no tool prints
or reads a box.

What this changes: the `cairn-close` skill, step 3, names the step.

### Decision 4 — the merge click is the closing acceptance

Refuses **R03**, from Q4. The owner's words: *"The merge click is enough.
(simplest) Keep it as it is."*

No solo-owner acceptance shape is added: no roles line the owner writes, no
fallback to `manual-git` integration. The forge records who merged and
when; that is the trace of the acceptance. The fifteen Crumbz closures with
no recorded approval are therefore not faults.

What this changes: nothing. The `cairn-close` skill, step 3, may say in one
sentence that on a repository with one owner the merge is the acceptance.

### Decision 5 — merge only after the check on the `ready` commit is read green

Promotes **R05**, from Q5.

The owner merges only after the request's run on the exact commit that
will land has been read green. Where the forge enforces this, the sentence
costs nothing; where it does not, decision 6 says so and the owner waits.

What this changes: the `cairn-close` skill, step 5, gains the sentence.

### Decision 6 — the `ci` profile says what it cannot see

Promotes **R06**, from Q5.

When a forge token is present, the checker reads the trunk's rulesets and
the repository's merge settings, and prints beside its profile line what
the forge does not enforce: the check not required on the exact commit, a
squash or rebase merge allowed, a role that bypasses the rules. Without a
token it prints that the forge was not read. This is a line in the output,
never a finding: a profile is a claim about settings, and the remedy is a
setting, not a commit.

On this repository, on 2026-09-06, the honest line reads: the check
`protocol` is required on the exact commit, only merge commits land, but
direct pushes by the admin role bypass every rule of the trunk. That is the
price of decision 1, and it is printed on every run rather than hidden.

What this changes: `tools/cairn-check.mjs`, the profile line it prints
(obligation 8 of the configuration contract); the concept article
`enforcement-profile`, which already says host settings need independent
evidence.

### Decision 7 — `running` to `done` on the trunk requires a `ready` commit

Promotes **R08**, from Q6.

The transition table loses the edge that let a trunk commit take a path
from `running` straight to `done`. The edge existed for the `manual-git`
merge unit, but on both transports the administrative commit has already
put the path at `ready` on its branch, so the integrating unit records
`ready` to `done` and never needs the shortcut. A trunk commit that flips
`running` to `done` with no `ready` commit is refused, and the refusal
names the remedy (R28): declare `ready` on the branch first.

What this changes: the rule `transition`, and one fixture: a trunk commit
declaring `done` for a path whose branch never declared `ready`, refused.

## Alternatives rejected

- **Coding as soon as the plan is submitted** (Q1, first option): the owner
  said no. Implementation waits for the landing.
- **A `registration-pending` advisory** (R01's second variant): a rule that
  tolerates a wait the owner chose to remove instead.
- **Dropping the pull-request rule from the ruleset** so a direct push
  needs no bypass: the required-check rule still refuses a commit that has
  not been checked, so the push would still fail, and the four rules would
  stop guarding every other actor.
- **A bypass that applies only to pull requests**: the forge offers it, and
  it does not let a direct push through, so it settles nothing.
- **A line the owner writes, or a merge from the owner's terminal** (Q4):
  refused by the owner; the merge click is enough.
- **The owner's test only for visible changes** (Q3, second option): the
  owner chose *always*.
- **Dropping the administrative commit on pull requests** (Q6, third
  option): the owner chose refusal of the shortcut instead; the commit
  stays because it is what binds `subject_commit` to the record.

## Consequences

- Opening a path on a sole owner's repository is one commit shorter and one
  branch lighter: no `register/` branch, no request, no wait.
- Every push made with the owner's credentials lands on the trunk without a
  request and without a check before landing. Agents work with those
  credentials. The checker prints this on every run (decision 6), and the
  trunk's own run judges the commit after it lands; a red run there is what
  the post-mortem command of 1.1 is triggered by (R36, promoted later on
  this path).
- The checker's transition table has one edge less, and one fixture more.
- The open and close skills gain three sentences and lose one sequence.
- The fifteen Crumbz closures without a recorded approval, and this path's
  own registration with a `pull-request` declaration, are explained rather
  than repaired: the declaration is corrected by the coding path that
  implements decision 1.

## What the manifesto's test weighed

Four of the seven decisions keep an option the decisions page tagged *adds
a rule* or *adds a step*: Q2, Q3, Q5 and Q6. The manifesto's first threat
is more control in the volume of tests and the complexity of workflows, and
its measure is what is native to Git, GitHub and CI.

- Q2 and Q5 are one sentence each in a skill, with no check behind them.
- Q3 is a sentence in the close skill; the box the note proposed was
  dropped by the owner, so nothing is rendered, stored or read.
- Q6 removes an edge from a table rather than adding a predicate; the
  fixture that proves it is the one test the change costs.

Against these, decision 1 removes a branch, a request and a wait from every
path, and decision 4 refuses a new shape outright. Net, the workflow has
fewer parts than in 1.0, and every part that remains is a forge feature or
a sentence.

## What implements this record

No coding path is registered yet. The roadmap register names the paths that
build 1.1 at the end of CP-CAIRN-002; until then, this table is the scope a
coding path can be opened from.

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | the registration transport and the open skill | `cairn.config.json` `transport.registration`; `cairn-open` step 3 and reference; `binding.md` |
| 2 | the open skill | `cairn-open` step 2 |
| 3 | the close skill | `cairn-close` step 3 |
| 4 | nothing | — |
| 5 | the close skill | `cairn-close` step 5 |
| 6 | the checker's profile line | `tools/cairn-check.mjs`, obligation 8 of the configuration contract; concept `enforcement-profile` |
| 7 | the transition table and its fixtures | rule `transition`; `tools/cairn-check.test.mjs` |
