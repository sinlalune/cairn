---
name: cairn-code
description: The coding stance for the change step of a Cairn work unit — a decision ladder that builds only what the task needs, read-the-real-flow-first, deletion over addition, and a three-line explanation cap. Use whenever you are about to write, change or explain code inside a coding path, and when reviewing a diff for what should not exist.
---

# cairn-code

The manifesto's first threat is more control through more code and more
rules. This is the stance that resists it, one decision at a time. A checker
cannot judge simplicity, which is why this is a skill and not a rule.

## Read the real flow before choosing

Before writing, read the code path the change will actually take: the caller,
the callee, the data as it really arrives. Not the documentation of it, not
the test's idea of it. Most unnecessary code is written for a flow that does
not exist.

## The decision ladder

Climb it from the top. Stop at the first rung that answers.

1. **Does it need to exist?** What breaks, today, if it is not written? If
   nothing does, do not write it. A capability for a case nobody has is
   vocabulary bloat in code.
2. **Is it already in the codebase?** Search before you write. A second copy
   of something that exists is where the two start disagreeing.
3. **Is it in the standard library?** The language and its runtime already
   solve most of what a task needs; a helper that wraps one is a dependency
   on yourself.
4. **Is it in the platform?** The operating system, Git, the forge, the
   database: native over invented, every time the native thing is honest.
5. **Is it in an installed dependency?** Something already in the tree costs
   nothing more to use. Something new costs every reader, forever.
6. **Can it be one line?** If the answer is one expression, write the
   expression. Abstraction is a cost paid up front for a benefit that may
   never come.
7. **Then the minimum code** — the smallest change that makes the real flow
   do the real thing, with the test that proves it.

## Deletion over addition

When a change can be made by removing something, remove it. Before adding a
parameter, a flag, a layer or a rule, ask what could be deleted so that the
addition is unnecessary. A diff whose deletions outnumber its insertions is
usually the better diff. Turn this on the protocol itself: a rule that stands
behind no stated requirement, a record nothing reads, a folder with one file
— delete them.

## The three-line cap

Explain a change in three lines or fewer: what it does, why it is the least,
what it does not do. If the explanation needs more, the change is probably
doing two things; split it into two units. In a step record, the plan and the
self-review are those three lines twice.

## Absorb the ecosystem

When a tool the ecosystem has standardised does what a home-made piece does,
adopt the standard and delete the piece. The cost of not embracing progress
outside the protocol is paid in maintenance of things nobody else maintains.

## What this stance refuses

- A configuration option for a choice nobody has asked to make.
- An abstraction with one implementation.
- A test that asserts a valid input passes and never asserts a violation is
  refused — a rule that never fires passes it identically.
- A comment that explains what the code does instead of why it exists.
- "While I was there": a second change in the unit that the plan did not name.
