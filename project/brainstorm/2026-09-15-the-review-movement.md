---
type: Cairn Brainstorm
title: The review movement — what six units of CP-CAIRN-009 showed
timestamp: 2026-09-15T00:00:00Z
cairn:
  status: provisional
---

# The review movement — what six units of CP-CAIRN-009 showed

Written verbatim from the session of 2026-09-15, in the order things
happened, while coding path 4 of 1.1 ran and reached `ready`. It is a
brainstorm note: nothing here is authority, and nothing was built because
of it.

## What happened, in order

**S01.** The fresh context returned in about six minutes and found eleven
things. One was a real defect the writer had not seen: the generated
binding row printed the kit's own constant instead of the configuration's
declaration, so `adopt` would have written a table contradicting the
`cairn.config.json` beside it — the contradiction the same generated page
calls a binding defect. Four findings were about the writer's new tests
being weak enough to pass either way. The movement paid for itself
outright.

**S02.** Two fresh contexts were given the bounded diff of the fixes.
Neither returned. Each emitted one opening line and then nothing for
twenty to twenty-nine minutes, at which point it was stopped. The unit
shipped carrying one read instead of two, and its step said so and named
the missing read as owed to S03.

**S03.** The owed read was obtained in 140 seconds and found a real bug in
S02's own code: a concept link written without a leading `./` was silently
dropped, which would have produced a false orphan in an adopter's
repository. The writer had read that function twice and not seen it.
Then S03's *own* review: three contexts, all hung. The third was given the
whole diff inline so that it needed no tool call at all to begin, and was
stopped at eleven minutes having emitted **nothing** — not even an opening
line. The writer read the diff instead and found three defects, two
behavioural: `update --take` left the lock alone so the file it had just
replaced still read as edited, and `--take --dry-run` wrote the file.

**S04, S05, S06.** Two contexts each, all six hung. Each step recorded how
its read was actually made. The writer's own reads found: a token written
onto the generated checker step that no record asked for and that the
owner had already ruled against; a measurement written into a column
headed *Measured at 1.0.0*; a placeholder `<product>` that re-opened a
naming question the owner had closed; and a command name lost in a
rewrite, caught only by comparing the set of code spans before and after.

Final count: **fourteen of eighteen fresh contexts hung.** The four that
returned took between 140 and 495 seconds. A stalled one and a working one
are indistinguishable for the first minute.

## What the count is not

The hanging is the harness's, not Cairn's. That belongs in a bug report to
the tool's authors and has no place in this folder. What belongs here is
everything the protocol did and did not do about it.

## What the protocol did not do

**It offers three doors and assumes one opens.** `cairn-unit` movement 4
says *a fresh session, or a subagent, or your harness's own review
command*. It says nothing about the writer who finds all three shut. So
the writer improvised, three different ways in three units: defer the read
to the next unit; obtain it late and disposition it there; read it
themselves and label it. Three answers to one question is the signal that
the question was never answered.

**The rule cannot tell the two apart.** `review` checks that the step
carries a non-empty `#### Review` section. It cannot distinguish a second
context's verdict from the writer's own, and it never could. That is
exactly the defect `cairn-code` names in *the test that never fires*: an
assertion that passes identically whether the thing works or not. The
protocol's own stance condemns the protocol's own rule, in writing, and
has since the stance was written.

**Nothing asked what the read cost.** Several units spent more wall-clock
on the review movement than on the implementation it judged. No record
says that is wrong, and no record says it is fine.

## What is worth noticing in the other direction

The writer's own reads were not empty. They found nine defects across four
units, three of them behavioural, and two were things only a writer with a
shell could find — the generated YAML parsed and read back, and the set of
code spans compared across a rewrite. A fresh context without a terminal
could not have done either.

But the one defect that would have reached an adopter's repository — the
dropped concept link — was found by a fresh context, on code the writer had
already read twice. The two kinds of read are not substitutes. That is the
thing this note most wants someone to keep.

## What was rejected while thinking about it

- *Make the rule detect a real second read.* It cannot: the section is
  prose and the reader is outside the repository. Any predicate here would
  be a predicate on a sentence, which is the manifesto's first threat.
- *Drop the movement when it is expensive.* The S03 finding says no.
- *Let the writer always read their own diff and call it the movement.*
  Then the movement is a self-review with a second heading, and the tags
  already exist for that.

## What this idea is waiting for

Two questions, and the first is the owner's:

1. **When no reader is obtainable, what is a writer supposed to do?** The
   owner ruled on 2026-09-15 that this gets a record in its own path. The
   record has to choose: is a labelled self-read a completed movement, a
   debt owed to the next unit, or a reason to stop the path?
2. **Is there a cheap signal that a read happened elsewhere?** Nothing in
   the repository can see a fresh context. If the answer is no, then the
   honest move is what S03 to S06 did — say in the step how the read was
   made — and the rule stays what it is, with the step carrying the truth
   the rule cannot check.

Beside them, one observation that is not about the review at all and
arrived while looking at it: **the same measured fact lives in several
documents with nothing reconciling them.** *Five skills* and *26 files*
sat in five places and were corrected three at a time across three units;
four of the roadmap register's five rows say `running` for paths that are
done, because the status is hand-kept there while each path's record
already carries it. That wants its own note, and this line is where it was
parked.
