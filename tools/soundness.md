---
type: Cairn Engineering Note
title: Soundness — how a rule earns the right to say OK
description: The discipline behind the reference checker — proxy predicates, unsound gates, adversarial fixtures, gate parity and instruction parity — kept beside the tools because it is about engineering a checker, not about using the protocol.
tags: [cairn, tools, checker, soundness, testing]
timestamp: 2026-09-02T00:00:00Z
---

# Soundness

A gate is **sound** when passing it means what it says. This note is the
discipline that keeps the rules in `cairn-check.mjs` sound, and it exists
because of one observed fact: every enforcement defect found in the reference
checker has been the same kind. Not one rule was too strict. All of them agreed
too easily, and every one reported `OK` over a condition that was false.

## Why the errors all lean one way

Every rule turns a sentence into code. The sentence is about the world — *the
work is resumable*, *this path was accepted*, *the view is current* — and the
code can only read repository state. Something has to bridge the gap, and what
bridges it is a **proxy predicate**: a measurable condition that stands in for
the sentence.

```text
the sentence   "every completed checkpoint survives a rewriting push"
the proxy      "every unit named in the ledger resolves to a ref"
```

The two agree in every healthy repository, which is why the substitution feels
free. They diverge exactly when something has gone wrong, because **a broken
state usually leaves the declarations internally consistent**. Move a ref
forward and every declared unit still resolves. The proxy passes; the fact it
stood in for is false.

The proxy is almost always the **broader** condition. The easy thing to compute
is a *necessary* part of the intent, not a *sufficient* one — a resumable path
does have a brief, an accepted path does have a session note — and checking the
necessary part is one line. So the predictable failure is not a rule that
complains too much. It is a rule that agrees too easily.

## Why that is worse than no rule

An automated check can be wrong in two directions, and they are not
equivalent.

| | What it does | How you find out |
| :-- | :-- | :-- |
| **noisy** | fails when nothing is wrong | immediately, because it blocks working people |
| **unsound** | passes when something is wrong | never, unless someone goes looking |

A noisy gate is self-reporting and cannot accumulate. An unsound gate produces
no signal at all; its output is indistinguishable from a working gate's, so
unsound gates accumulate silently and a rule set left alone drifts toward
permissiveness. Worse, green is used as evidence: a closing review records that
the gates were green and a journal entry repeats it. An unsound gate **launders
a false statement into the permanent record** with the authority of an
automated check. Cairn therefore prefers a rule set that is sound but
incomplete — it misses things and says so — to one that is complete but unsound.

## The four requirements

**1. Every blocking rule has a fixture it rejects.** An **adversarial fixture**
builds a violation on purpose and asserts the rule refuses it, with the rule's
own name in the finding. A green suite of valid inputs proves only that a rule
is quiet; a rule that never fires passes those tests identically. A blocking
rule with no fixture is unproven and is treated as unsound until one exists.
The fixture must also prove the green baseline first: a fixture that blocks for
an unrelated reason proves nothing about the rule it names. And on a host that forbids
rewriting, a fixture that judges a path branch must contain a merged trunk
commit carrying another path's completed unit (ADR-004 decision 4): a current
base is reached by merging the trunk in, so every real range holds other paths'
work, and a rule that reads that work as evidence about THIS path is wrong by
construction and green on a single-path history. The path and closure harnesses
carry it, so a fixture built on them has the shape without being told; one that
stays on the trunk gets the other path's work on the trunk and no merge back,
because it has no branch to merge into.

**2. A predicate never branches on a value that varies with where it runs.**
The tree is the same locally and in CI; the environment — the branch name, the
fetched refs, the working directory, the clock, the comparison base — is not.
Where a rule needs its context, it derives it from the tree: a declared
`status`, the presence of a record. This is **gate parity**: one gate, one
tree, one verdict, wherever it runs. The derived-view rule once skipped itself
on `path/*` branches and ran on CI's detached `HEAD`; one tree, two verdicts,
one command. The fix was to delete the exemption, not to rewrite it — when a
predicate branches on where it runs, look first for the branch that does not
need to exist. Parity breaks through inputs as easily as through predicates: a
local run comparing the working tree with `HEAD` and a CI run comparing the
branch with the trunk hand every changed-file rule a different world, so the
default on a path branch is the comparison that decides the merge, and a
narrower run names its base in its own output.

**3. When a predicate can ask about a declaration or about a fact, it asks
about the fact.** Walk the branch rather than the ledger's list of units.
Attest the candidate's advisory set rather than recomputing it at closure. Ask
what a checkout owns rather than what it is called. The two readings are
identical in a healthy repository and diverge exactly when something has gone
wrong. The clearest case was one line long:

```js
/** A closing ceremony leaves a session note naming the path. */
return readdirSync(SESSION_DIR).some((file) => file.includes(id))
```

The comment states the sentence. The code asks a filename question. Every path
satisfied it from the moment it opened.

One rule reverses this on purpose. `writes-overlap` asks two paths what they
*declared* they would write, because the fact — which files each will actually
touch — does not exist yet at the registration where the answer is useful. A
predicate about the future has only declarations to read, and this one is
broader than the fact in one direction and narrower in the other: two surfaces
can meet on a pattern and never meet on a file, and a path can write outside
its declaration, where `scope-drift` catches it. That is the whole reason the
rule reports rather than blocks, and why its finding names the patterns that
meet rather than files it cannot know.

Its own first draft showed the second failure in miniature. Deciding whether
two patterns can name a common file looks like a job for the matcher already
in the file: fill each pattern's wildcards, and offer the result to the other.
That answers NO for `spec/**/*.md` and `spec/reference/**`, which both name
`spec/reference/conformance.md`, because no single filling of either satisfies
the other — a rule that agreed too easily, in the one shape the note says to
expect. It is decided segment by segment now, with `**` tried at every length
it can take.

A second reversal is worth naming because it took a rule three repairs to
find. `provisional` asks whether a candidate still carries unfinished work, and
the fact it can read is a trailer inside `base..candidate`. On a host that
forbids rewriting, that range is not this path's work: reaching a current base
means merging the trunk in, so the range carries every other path's commits
too, and the proxy was broader than the sentence in the one direction that
refuses honest candidates. It was also TIMELESS where the sentence it
implements is chronological — *the completed unit's own commit supersedes it* —
so a draft the path had finished three commits earlier still refused the
candidate, and the only remedy the message named, fold it, is the rewrite this
host forbids. Both halves are the same mistake: reading a range as a bag of
commits rather than as this path's history. Where a range is pinned rather than
derived from a merge-base, it is scoped to this path's own commits before
anything is read from it.

A third rule reads presence and refuses to read further. `review` asks whether
the current unit's ledger carries a `#### Review` section that is not empty, and
nothing about what is in it. The sentence it stands for — *the diff
was read by someone who did not write it* — is not readable from a repository
at all: whether the reader was a fresh context, and whether the dispositions
are honest, are facts about how the unit was made. A predicate that scored the
section would be inventing the judgement it cannot make, and the proxy that
remains is narrow and says so: a writer who types the heading and one word
satisfies it. What it removes is the silent case — a unit that skipped the
movement and said nothing — and the owner reads the section at the candidate.

That rule also carried the fourth shape of the same error, and it is the one
worth naming: **a proxy that selects the wrong subject passes soundly over the
right one.** `review` read the unit `current_step` named, over a ledger already
sorted by ordinal, so a field left behind pointed it at a unit OLDER than the
one being judged — never a newer one, because none exists. Every assertion the
rule made was true of the unit it read; it was reading the wrong unit, and on
coding path 3, where the field said `S01` from registration through S08, every
unit after the first was judged on S01's section while the gate reported OK. A
predicate whose subject is chosen by a field nothing
verifies is unsound however sound its test is, and the remedy was deletion: the
subject is the newest unit kept in a ledger, last in the sort
`pathWorkUnits` applies (ADR-026 decision 2). What remains is narrower and
stated here rather than claimed away. That sort is on the `unit:` ordinal, which
the checker validates as digits and not for uniqueness or monotonicity, so a
writer who numbers a new unit at or below an older one moves the subject back;
and a newest unit typed `closure` skips the rule for the whole record, because
ADR-017 decision 2 excepts the type that writes no step file and nothing forbids
that block in a step record. The field a writer forgets no longer selects; a
field a writer mistypes still can.

A rule that reads a transport-shaped fact asks which transport. `acceptance`
refused an integrating commit that is a merge object carrying `done` — true on
`pull-request`, where the candidate lands with the merge and `done` follows in
a commit of its own, and false on `manual-git`, where `cairn-close` prescribes
exactly that merge as the integrating unit. Unsound in the other direction, so
it refused honest closings rather than passing dishonest ones, which is the
rarer half of this note; the fix is the same either way, which is to read the
declared transport rather than assume one (ADR-026 decision 4). The refusal of
two paths reaching `done` in one commit is not transport-shaped and binds on
both. `transition` would still refuse that closing, reading the merge's first parent
for the `ready` behind it and finding the trunk rather than the branch — one
rule fixed does not make a transport work, and ADR-026 does not reach that one.
ADR-027 does, and reads any parent. It is the note's own warning turned on this change: an unsound rule was
replaced by a sound one beside a second rule nobody read. It is worse than
that, and *What none of this proves* says how: neither rule is reached at all.

**4. A stated requirement with no predicate is listed as unenforced.** The
conformance page is where that is said. An unenforced requirement and an
unsound gate are indistinguishable from inside a green run — both are a passing
check over a condition nobody verified — and only the conformance page can tell
a reader which one they are looking at.

## Instruction parity, the reader's side

The reader-side twin of gate parity is **instruction parity**: one protocol
text, over one repository state, produces the same workflow whoever — or
whatever — reads it. A human reads the whole page; one model reads it inside a
large context; another summarises it first; a third has it truncated by its
harness. Two properties of a document break parity, and neither is a property
of the environment: **volume**, past which a reader must choose what to keep,
and **interleaving**, where an instruction sits inside a paragraph of
justification and a skimming reader picks up different sentences than a linear
one. The remedy is the writing rule: the plain instruction first, the rationale
one link away. A required read that is small and carries no rationale has
nothing left to summarise differently.

## What none of this proves

Soundness is a property of each rule, not of the set. A repository can hold
twenty sound rules and still be badly governed, because soundness says only that
a passing rule told the truth — never that the rules asked about the things that
matter. A fixture proves a rule catches *that* violation, not the class: the
retention rule had a fixture for a missing ref and passed over a *moved* one.
The honest response is to add a fixture every time a real violation escapes,
because the one that got through is the shape nobody imagined. And parity is
agreement, not correctness: two environments can agree on the same wrong
answer, and an unsound rule is unsound identically everywhere.

A proxy that is exact today can become a proxy again when the model around it
changes, without anybody editing it. Nothing in the rule changed; the world it
described did.

**And a sound rule proves nothing about a run that never reaches it.** The
changed-file rules are judged on a comparison, and on the trunk that comparison
is empty. A bare run resolves a base only on a path branch; on the trunk it
falls back to the working tree, which is clean once the integration is
committed. The installed workflow
based a push run on `origin/<trunk>`, which after that push already names the
pushed commit, so the comparison was a commit against itself. An integrating
unit was therefore judged by no changed-file rule on either transport —
`transition`, `acceptance` and `scope-digest` received nothing, and
`journal-entry`, which exists only to bind an arrival, was disabled outright —
while the run printed OK. This repository's own trunk runs say so in
their header: the integration of CP-CAIRN-007 read `0 changed file(s)`. The
fixtures were not wrong; they hand each rule a real comparison, which is exactly
what the deployed runs did not. A rule with an adversarial fixture and no input
is indistinguishable, from inside a green run, from a rule that passed —
the same indistinguishability requirement 4 names, arrived at from the other
side. **Fixed here, and the fix is a rule.** The remedy is a base that spans the
arrival, and it was not one line. The ref a
push replaced is the right base, but a branch's first push names none — the
forge sends all zeros — and the checker did not survive a base it could not
use: it exited through an uncaught Git error rather than reporting the run
inconclusive, which is a red gate carrying no finding. So: an unresolvable base
reported, then the base changed on push while a request run keeps its target
branch, then the workflow test rewritten — it pinned the defective
expression — then a fixture that drives an arrival through a trunk-shaped run,
then
the same base in the workflow the kit generates.

The rule is `comparison`, and it stands behind *One invocation, one verdict:
local and CI agree on one tree* — a stated requirement that had fixtures and no
predicate, and that this defect violated exactly. It reports two shapes, both
`inconclusive`, because each is a reading NOT MADE rather than a violation
found: a base that does not resolve, which used to kill the process inside
`git merge-base` with no finding at all; and a base that resolves to the commit
under judgement, which is the shape the old workflow produced on every push to
the trunk. The second is asked only off a path branch. On a path branch a base
equal to `HEAD` means the branch carries no commit yet, which is benign and
which both invocations see alike — the parity fixtures for this very
requirement caught the first draft reporting it on one invocation and not the
other, which is requirement 2 turned on the rule that enforces requirement 2.
