---
type: Cairn Learning Note
title: The channel an adopter cannot reach, and a corrected note already acted on
description: The second note from Atomik's adoption day, written while the cleanup path ran: the unit skill sends every adopter's writer to a `feedbacks/` folder the kit never installs and no adopter page names, and whose notes are about Cairn in a repository that is not Cairn; the folder is outside every corpus rule in the protocol's own repository, so a note's links and frontmatter are checked by hand or not at all; and a claim corrected before its merge had already been acted on downstream, sealed into another repository's definition of done, with nothing on the note able to say it was withdrawn.
tags: [cairn, feedback, agent, adopter, atomik, channel, adr-028]
timestamp: 2026-09-21T12:00:00Z
cairn:
  status: provisional
---

# The channel an adopter cannot reach, and a corrected note already acted on

Written by the agent that ran Atomik's adoption — Claude Code — on
2026-09-21, after
[the adoption note](./2026-09-21-atomik-adopts-1-1.md) merged and while
Atomik's cleanup path CP-OPS-003 ran in that repository. The three
observations here are what the owner's sentence *store everything relevant
in `feedbacks/`* met when it was carried out. They are numbered 8 to 10,
after the five of the adoption note and the two of the protected-trunk note
written the same day — `2026-09-21-atomik-opens-a-path-on-a-protected-trunk.md`,
linked from the index once it lands — so a number names one observation across
the three.

## 8. The skill sends an adopter's writer to a folder that is not there

**Where.** `skills/cairn-unit/SKILL.md`, section 7, *Report the boundary*,
installed verbatim in every adopter by the kit:

> When the gate stayed green and the protocol still cost more than it
> should, write a file under `feedbacks/` naming the movement, the cost and
> the change to Cairn that would remove it

Atomik has that skill, at that line, since `37f56a5`. It has no
`feedbacks/` folder. `planInstall` never creates one — `feedbacks` appears
nowhere in `tools/cairn.mjs` — and neither the bootloader nor the pointer
page nor the documentation index the kit writes mentions the word. The
instruction resolves to nothing in the repository it is installed in.

The second half is the harder one. The sentence asks for *the change to
Cairn*, and a file written where the skill says lands in a repository whose
owner is not Cairn's reader, with nothing to carry it across. It has now
happened twice. Crumbz's update note and Atomik's adoption note are both
in THIS repository, both written by an agent working in the adopter's
repository, and both got here because the owner asked a second session to
carry them by hand. ADR-028 was written for the protocol's own repository,
where `feedbacks/` exists and the reader is the owner of the protocol; the
skill ships its sentence unchanged to repositories where neither is true.

**What it cost.** The owner had to say *store everything relevant in
`feedbacks/`* out loud, to a session in a repository that has no such
folder, about a protocol whose skill had already told that session to use
one. Then a second session — this one — had to be asked to carry it. The
cost is not the minute; it is that the protocol's own instruction cannot
be followed by the reader it was installed for, and the gap is filled by
the owner noticing, both times.

**The change to Cairn.** Decide what an adopter's writer does, and say it
in the skill they actually have. Either the kit installs the folder and
the skill names how a note reaches Cairn — a link, a pull request against
this repository, the owner carrying it — or the sentence is conditioned:
in the protocol's own repository, write the file; in an adopter's, say it
to the owner and let them decide. What must not stay is an installed
instruction naming a path that does not exist.

## 9. The channel is outside every rule that reads the corpus

**Where.** Here, in the protocol's own repository. `markdownCorpus()`
reads four roots — the documentation root, the project root, the concept
wiki's parent and `skills/`. `feedbacks/` is none of them. So `links`
never resolves a feedback note's relative links, `schema` never validates
its frontmatter, and a note may name a record that moved, or carry a
`type` no page defines, and pass every gate.

Checked by hand while writing this: the eleven notes in the folder hold no
broken relative link today. That is the observation, not the reassurance —
it took a script written for the purpose to establish it, on the one
folder the protocol has designated as the evidence its own decisions are
promoted from.

**What it cost.** For [the adoption note](./2026-09-21-atomik-adopts-1-1.md),
which links a decision record, a step record two directories up, a sibling
note and the folder index: every one of those links checked by hand,
because the gate said `OK — protocol satisfied` without reading any of
them. The note was merged on a green run that had not looked at it.

**The change to Cairn.** One entry in `markdownCorpus()`'s root list, and
`links` and `schema` cover the channel like everything else. If the folder
is meant to stay outside — the notes are the owner's pages, frozen as
written, and a rule that blocks on one is a rule that edits history — then
the conformance page should say so where it lists the corpus, because
*checked by hand* and *deliberately unchecked* look identical from a green
run.

## 10. A corrected claim had already been acted on, and the note cannot say so

**Where.** Observation 1 of the adoption note, in its first draft, called
the `links` exemptions an unnoticed regression and attributed `e18bbe4` to
CP-CAIRN-006 S02. Both were wrong: it is CP-CAIRN-001 S02, and that same
path's S06 met these exact five findings and ruled on them. The request's
reviewer caught it, and the note was rewritten before it merged — the
merged text argues something narrower and does not ask for the deleted
lines back.

By then it had been read and acted on, and the margin is the whole point:

```
12:08:18  the draft, with the wrong claim, committed here
12:12:00  CP-OPS-003's opening acceptance, in Atomik
12:30:49  CP-OPS-003 registered on Atomik's trunk, carrying the claim
12:31:13  the correction committed here — twenty-four seconds later
```

In a path whose opening acceptance is sealed by a `scope_digest`:

```
plan.md:76     …restoring the link exemption … that e18bbe4 (CP-CAIRN-006 S02) dropped
index.md:91    …names the e18bbe4 / CP-CAIRN-006 S02 regression and cairn PR #23
```

The second is a line of the definition of done. Correcting it is an
amendment to an accepted scope in another repository, for a claim that was
already withdrawn upstream before that repository's path began work on it.

**What it cost.** One wrong sentence, corrected in the place it was
written within the hour, is now a sealed line in another repository's
definition of done and a unit of work described backwards — S05 will write
an ADR naming a regression that a decision record of this repository says
was a decision. Nothing on the note says a claim in it was withdrawn;
nothing in the folder tells a reader who took a copy that there is a newer
reading. The evidence surface is append-only in practice and mutable in
fact, and the difference is invisible from the outside.

**The change to Cairn.** This is observation 3 of
[the adoption note](./2026-09-21-atomik-adopts-1-1.md) with a cost
attached, and it narrows what that decision should cover. A note whose
claim changes says so at its head — the date, what was withdrawn, what
replaced it — so a reader holding a copy can tell. Whatever the owner
chooses for *treated*, it should also answer *corrected*: the two are the
same question asked of a note that is read before it is promoted, and this
one was read and sealed into another repository's scope twenty-two minutes
after it was written and twenty-four seconds before it was corrected.
