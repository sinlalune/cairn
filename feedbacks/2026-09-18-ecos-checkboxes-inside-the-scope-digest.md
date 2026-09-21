---
type: Cairn Feedback
title: The definition of done is written as checkboxes inside the text the scope digest pins
timestamp: 2026-09-18T00:00:00Z
tags: [feedback, cairn]
---

# The definition of done is written as checkboxes inside the text the scope digest pins

**Movement:** the path template's *Definition of done*, against the
`scope-digest` rule the opening acceptance carries.

**Cost:** the definition of done is a list of `- [ ]` items. A checkbox is an
instruction to tick it, and a writer finishing the last step ticks them — the
one gesture the section's own notation invites is the one the digest forbids.
It cost this path a `repair` unit: `scope-digest` red at the commit, the
seven boxes restored, a step written to name the violation and to correct the
verdict line of the step before it. Nothing about the product moved.

The rule itself is right: the accepted scope must be the accepted scope, and
`sha256:1154a0be…` versus `sha256:2cf63437…` is exactly the guarantee that
earns an acceptance. The friction is the notation the template chooses for the
text that rule protects.

**Change to Cairn that would remove it:** write the definition of done as a
plain list — `-` rather than `- [ ]` — so nothing in the pinned text looks
like a control. Progress already has two homes that are not pinned, the step
records and the closing review, and neither needs a tick to be read. If the
boxes are wanted for how they render, the alternative is to normalise
`- [x]` to `- [ ]` before digesting, so the digest covers the words and not
the state of a control; that is one substitution in the digest function, and
it keeps the guarantee while removing the trap.

**Not this:** a warning in the skill that says "do not tick the boxes". A
rule that exists to catch a mistake the notation invites is a rule that will
be broken again by the next writer who has not read it.
