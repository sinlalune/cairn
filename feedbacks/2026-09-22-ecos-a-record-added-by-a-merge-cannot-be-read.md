---
type: Cairn Feedback
title: A step record added by a merge commit has no findable origin, and blocks the path for good
timestamp: 2026-09-22T00:00:00Z
tags: [feedback, cairn]
---

# A step record added by a merge commit has no findable origin, and blocks the path for good

**Movement:** cairn-unit, movement 6, where the unit that lands a merge is
also the unit that writes its step record; and the `record-integrity` rule
of `cairn-check`, every unit afterwards.

**Cost:** `stepRecordOrigin` finds the commit that added a step record with
`git log --diff-filter=A --follow -- <file>`. Git does not report a file
added by a merge commit under `--diff-filter`, and `--follow` traces a
rename back through the merge to the same silence. So a step record that
first appeared in a merge commit has no origin the checker can read. The
record is tracked, so `appendOnlyStepRecordMutations` correctly refuses to
guess and returns `null`, and the rule reports

```text
[record-integrity] cannot determine whether N protected record(s) are
additions, exact appends, or rewrites — provide complete record history
and a comparison ref
```

as `inconclusive`, which is blocking. The finding is permanent: the record
stays changed against the trunk until the path closes, so it returns on
every later unit, and on a host with `pathHistoryPolicy: forbidden` it
cannot be repaired — the commit is published, and a relocation does not
restore the origin. CP-LOOK-002 S02 was a complete, twice-read, green-tested
unit that could only land on the owner's explicit call to accept a non-zero
exit code.

It is reachable by following the pages. `cairn-unit` says a work unit is
*one commit* — "the change, its tests, the affected documents, one step
record, the refreshed resume section — one commit, pushed" — and a unit
whose work IS a merge reads that as: make the merge and the record one
commit. Only `reference.md`'s *Reach a current base* says "resolve conflicts
and commit the merge", separately, and it is about reaching a base rather
than about landing someone else's published commit, which is what this
path's definition of done asked for.

**Change to Cairn that would remove it:** either

1. read the origin with `git log -m --diff-filter=A` (or
   `--first-parent -m`), which does report a merge's additions, so a record
   born in a merge is readable and the rule keeps its teeth; or
2. say in `cairn-unit` movement 6 that a merge is committed on its own and
   the unit's files follow in the next commit — and say why, because the
   one-commit rule reads the other way and the penalty is unrecoverable;

and, either way, spell out in the rule's own message that a record added by
a merge is the likely cause, since "provide complete record history and a
comparison ref" sends the reader to look for a shallow clone that is not
there.
