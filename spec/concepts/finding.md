---
type: Cairn Concept
title: Finding
description: What the checker reports — blocking, advisory or inconclusive — what each one means, why missing evidence is never success, and the structured disposition that keeps an advisory from disappearing unread.
tags: [cairn, concept, enforcement, evidence]
timestamp: 2026-09-02T00:00:00Z
---

# Finding

A finding is one statement the checker makes about the repository, and it is
one of exactly three kinds.

| Kind | Means | Exit code |
| :-- | :-- | :-- |
| **blocking** | a required predicate was disproved: the condition is known to be false | non-zero |
| **advisory** | a risk or a drift that needs a decision, but that automation cannot forbid | zero, unless a blocking finding also exists |
| **inconclusive** | a required input was unavailable, so the predicate could be neither proved nor disproved | non-zero on a critical gate |

## Blocking

A blocking rule is admitted only where a deterministic repository predicate can
decide it: an invalid path identity, a stale trunk ancestry, a rewritten
immutable record, an acceptance bound to the wrong commit. The rule's condition
is objectively checkable and its breach leaves the repository wrong; a rule that
needs judgement is advisory or is not a rule. Every blocking rule has an
adversarial fixture that proves it can fail — the discipline is written up in
[soundness](../../tools/soundness.md), beside the tools it governs.

## Advisory

Path age, an unpushed checkpoint, a collapsed reviewer role, a widened surface,
a grown vocabulary: each is worth attention and none can be forbidden by
automation. "Advisory" does not mean unimportant; it means the decision needs
context.

Every advisory raised against a candidate `C` is **disposed** in the closing
review, as a structured entry rather than a sentence:

```yaml
advisory_disposition:
  - rule: path-staleness
    disposition: accepted
    reason: parked during the dependency freeze; unblock date recorded
  - rule: scope-drift
    disposition: deferred
    owner: participant-id
    follow_up: CP-EXAMPLE-002
```

`disposition` is `fixed`, `accepted` or `deferred`, and a deferral names an
owner and a follow-up. The list MUST cover exactly the advisories raised at
`C` — no invented entries, no omissions. Set equality is a predicate; "every
advisory was recorded" as one free-text sentence is not, and a reviewer who
writes `accepted: none` over three live advisories has produced a record that
reads complete and is false.

## Inconclusive

A missing trunk ref, a shallow history, an unresolved subject commit, an absent
comparison state: each makes the predicate that needs it unanswerable. For the
critical gates — registration, ancestry, lifecycle transition, candidate
binding, record integrity — inconclusive returns non-zero and names the evidence
to fetch. A shallow or misconfigured checkout cannot turn missing evidence into
success. An advisory such as path age may stay silent when its evidence is
missing, because it certifies nothing about integration safety.

Inconclusive is not a softer pass and is not evidence that a path is stale or
safe. It is the checker saying it does not know.

## It does not prove

No finding is a proof of product quality or of sound judgement. The absence of
blocking findings means every objectively checkable condition the rules ask
about held; a disposed advisory means a decision was recorded against it, never
that the decision was wise.

Related: [roles](./roles.md), [exit code](./exit-code.md),
[closing acceptance](./closing-acceptance.md),
[conformance](./conformance.md), [fetch and push](./fetch-and-push.md).
