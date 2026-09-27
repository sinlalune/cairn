---
type: Cairn Feedback
title: The coherence questions ask the owner what an isolated reader should answer
timestamp: 2026-09-18T00:00:00Z
tags: [feedback, cairn]
---

# The coherence questions ask the owner what an isolated reader should answer

**Movement:** cairn-close, step 2, the four coherence questions, on the `full`
route where "the reviewer answers the coherence questions explicitly".

**Cost:** the four questions are — does the diff contradict an accepted
decision, does it duplicate what another running path is building, did it
introduce architecture that belongs in a decision record and has none, is
anything now documented in two places. Every one of them is answered by
reading the diff against the repository: the decisions are in `docs/adr/`, the
siblings are in the live view, the architecture pages are pinned in `governs:`,
and the duplication is two files saying the same sentence. None of them needs
the owner's judgment to *find*; they need it only to *arbitrate* once found.

Asking the one person who did not read the diff to answer them is where a
rubber stamp comes from. It is also the one movement of the protocol that
does not already have a fresh reader, when `cairn-unit` movement 4 mandates
exactly that for every work unit: hand the diff to a second context with the
two criteria and nothing else. The closing review, which is the higher-stakes
read, has no such requirement.

On this path the writer filled the four answers himself, marked as the
writer's reading, because leaving four `TO BE FILLED BY THE REVIEWER` lines
in a pull request the owner merges with one click produces four unanswered
questions and a merged path.

**Change to Cairn that would remove it:** make the coherence questions a
fresh-context read, the way movement 4 already is — a reader with no memory of
the work, given the candidate diff, the `governs:` pins at their ids and the
live view, answering the four and nothing else. The reviewer then arbitrates
what it found rather than hunting it, which is the part that needs a person.
`cairn-audit` could scaffold the four with what it can already see: the ADRs
the diff touches, the sibling paths' `writes:`, the architecture pages changed
with no record beside them.

**Not this:** a checker rule. Three of the four are judgment calls on meaning,
and a checker that guesses at them would be wrong often enough to be ignored,
which is worse than a question nobody answered.
