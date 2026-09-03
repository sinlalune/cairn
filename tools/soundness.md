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
an unrelated reason proves nothing about the rule it names.

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
