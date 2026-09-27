---
type: Cairn Feedback
title: On pull-request transport the owner merges before the administrative commit
timestamp: 2026-09-17T00:00:00Z
tags: [feedback, cairn]
---

# On pull-request transport the owner merges before the administrative commit

**Movement:** cairn-close, steps 3 and 4, on `pull-request` transport with one
owner holding every role.

**Cost:** the skill says the merge click is the approval, and that the
administrative commit `A` (`status: ready`, `subject_commit`) comes after
acceptance and before the merge. An owner who reads the pages and clicks
merge has done exactly what the skill told them, and `A` never lands on the
branch. The integrating unit then fails `transition` (running → done) and the
writer repairs by landing `A` on the trunk after the merge, which the record
now has to explain.

**Change to Cairn that would remove it:** on `pull-request` with a single
owner, let the writer land `A` on the branch *before* asking for the reading,
since the candidate is already fixed at that point and `A` changes nothing the
owner reads; or let `transition` accept running → done when the arrival's
merge commit is the owner's own approval and `subject_commit` is reachable
from it.
