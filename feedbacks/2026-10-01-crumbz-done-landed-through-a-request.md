---
type: Cairn Feedback
title: The integrating commit, landed "through the transport", went through a request and was refused after the merge
timestamp: 2026-10-01T00:00:00Z
tags: [feedback, cairn, crumbz, cairn-close, transport]
---

# The integrating commit, landed "through the transport", went through a request and was refused after the merge

Written by the writer of Crumbz's CP-ODDS-BOOKENDS-030, Claude Code, on
2026-10-01, at the owner's request, under ADR-028.

**Movement:** `cairn-close` step 5, the integrating unit after the candidate
landed, on `transport.integration: pull-request`. The candidate `9c1b79b`
landed through Crumbz's request #88 as merge commit `907b883`, green.

**What happened:** the writer built the integrating commit exactly as
[the reference](../skills/cairn-close/reference.md) says: `status: done`,
`resolution: completed`, `ACTIVE.md`, the journal entry, the gate, *"and land
that commit through the transport."* On a `pull-request` transport the writer
read that as "open a request", and did: request #89, one commit (`c99cded`)
carrying only those four files. The request's `protocol` check was green. The
owner merged it as a merge commit, as every other request in the repository
is merged. The trunk's push run on that merge (`bb4c1ec`, run 463) then
refused it:

```
[acceptance] project/coding-paths/CP-ODDS-BOOKENDS-030/index.md reaches done in bb4c1ec…, which is a merge object carrying the edit — land the candidate with the merge, then record done in one commit of its own on the trunk
```

The skill's step 5 does say "one commit … and never a merge object carrying
the edit". The previous path, CP-PRICED-HISTORY-029, had pushed its `done`
commit (`680373e`) directly to the trunk. The writer read the reference's
last sentence instead, and nothing between that sentence and the merge
button disagreed with the reading.

**Cost:** one red run on the trunk that stays. Removing it would mean
rewriting a published, shared trunk under two merged requests (#88, #89) and
every clone of it, which no rule of the protocol licenses.
(`pathHistoryPolicy: forbidden` governs published path branches, not the
trunk.) Then a second
direct commit (`cbcfeec`) with a journal entry explaining the first. The
first attempt at that explanation, appended to the integration's journal
entry, was refused by `record-integrity` as an edit to an immutable record,
and had to become a record of its own. About half an hour of the owner's
attention went to a closing that was otherwise finished.

**Why the gate did not stop it earlier:** the request's own check judged the
request's head, where `done` arrives in `c99cded`, a commit of its own. That
reading is true of the branch and false of the trunk the merge produces. The
refusal can only fire after the merge, on the push run, when nothing can be
done but explain it.

**Change to Cairn that would remove it:**

1. In `cairn-close/reference.md`, replace "land that commit through the
   transport" on `pull-request` with what it means: push the integrating
   commit directly to the trunk. The skill's step 5 already holds the rule.
   The reference is where a writer copies commands from, and it said
   something else.
2. Have the request's check refuse a request whose head brings a path to
   `done`, naming the direct push as the route. The check reads the
   request's head (`.github/workflows/cairn.yml` checks out
   `pull_request.head.sha`), and that head is the same whether the owner
   then picks a merge commit, a rebase or a fast-forward. So it cannot
   allow the good merge modes and refuse the bad one; it can only refuse
   the request. The one exception would be a repository that declares a
   forge-enforced rebase- or fast-forward-only merge strategy, where every
   merge of that head lands the commit as its own. Validating the
   prospective merge commit (`refs/pull/<n>/merge`) instead would not help:
   the forge builds that ref as a merge commit whatever mode is clicked
   later.
