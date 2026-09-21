---
type: Cairn Feedback
title: A deferral has nowhere to land
timestamp: 2026-09-18T00:00:00Z
tags: [feedback, cairn]
---

# A deferral has nowhere to land

**Movement:** cairn-close, step 2 — "the advisories raised at `C` with a
disposition each — fixed, accepted, or deferred to a named owner and
follow-up". And cairn-unit movement 4, where a review finding may be "deferred
to a named unit or path".

**Cost:** both movements require a deferral to name a follow-up, and Cairn
gives the follow-up no home. `docs/` is durable knowledge, `project/log/` is
what already happened, a path folder is one path's own record and disappears
from attention when the path closes. So a deferral is written into a pull
request description, which is read once, during the merge, and never again.

CP-R0-001 closes with three of them, and they are exactly the shape the owner
asked about — work that is real, that nobody disputes, and that belongs to no
path yet:

- the animation contract page's *Open* section was answered by measurement
  inside this path, which is what its acceptance asked for, and the gate
  raises `decision-drift` every time because architecture changed with no
  record. Whether "the MVP runs on Inworld" becomes an ADR is a decision unit
  on a path of its own, and `docs/adr/**` was outside this path's `writes:`;
- R0 is the first path to make a surface a user meets — a screen and an API
  route — and this repository has no README and no `docs/<surface>.md`.
  Writing that page is a promotion's work, also outside `writes:`;
- the emotion driver blends only the entry before the current one, so tags
  closer together than its ramp would snap, and the face rests at neutral
  rather than at the station's mood. Harmless while the harness writes one
  tag; not harmless when it writes several.

Each of those was written down three times — in a step record, in the request
description, and in this note — and after the merge none of the three is
anywhere a writer opening the repository tomorrow would look.

**Change to Cairn that would remove it:** a fourth folder in the execution
plane, `project/backlog/`, one file per deferred item: what it is, which path
deferred it, the owner, and the shape of the work — decision unit, promotion,
coding path. Then a `deferred` disposition names that file instead of a
sentence, `cairn-open` reads the folder when a path is proposed, and the
advisory that keeps firing has a stated destination rather than an annual
re-acceptance. It is the same trick `writes:` plays for scope: the deferral
becomes a declaration a later predicate can read.

**Not this:** an issue tracker. The protocol's whole claim is that progress
persists in files in the repository, and a deferral that lives in a forge is
the one piece of execution state that would not.
