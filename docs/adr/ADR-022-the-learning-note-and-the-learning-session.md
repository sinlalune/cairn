---
type: Cairn Decision Record
title: ADR-022 — the learning note and the learning session
description: A learning note is a concept note with an order, living in docs/concepts/learning and linking the concepts it rests on in sequence; a sixth skill, cairn-learn, explores what the user knows by prompting and writes the note; a unit that explains an abstraction writes the concept note, offers the session in its step, and the session runs later. Promotes P2, P3 and P4 of the pedagogy feedback; the one answer that adds a kit file; extends ADR-011 and ADR-013, and supersedes ADR-013's rule on the kit's file count on the owner's ruling that no fixed number is a rule.
tags: [cairn, adr, 1.1, pedagogy, learning, concepts, skills, kit]
timestamp: 2026-09-09T00:00:00Z
adr:
  id: ADR-022
  status: accepted
  date: 2026-09-09
---

# ADR-022 — the learning note and the learning session

Status: accepted · 2026-09-09 · written by CP-CAIRN-004, S02

**Promoted from** the owner's
[pedagogy feedback](../../feedbacks/2026-09-08-owner-feedback-pedagogy.md)
at blob `e9bd3e92aa7c6336f92e715140f744aeb8385d02` (P2, P3, P4, and the
readings *Chat sessions* and *Learning sessions*) and the owner's
[statement on the pedagogy](../../docs/cairn/manifesto-pedagogy-2026-09-09.md)
at blob `57d2e87a3caafab19ba36fa794d7ab342e2a87e1`, its sections *The
chat* and *The learning session*. Both stay exactly as they were. It
supersedes one rule stated in two records of 1.1 and extends the rest: decision 2 of
[ADR-011](./ADR-011-the-adopters-documentation-plane.md) keeps its three
folders and the `learning` folder gains a second shape of note; decision
3 of ADR-011 keeps its line and gains a sentence beside it in the unit
skill; the pointer page of
[ADR-013](./ADR-013-a-local-pointer-to-the-protocol.md) lists six skills
where it listed five; and the rule ADR-013's consequences set — *the kit
of 1.1 ships with at most twenty-nine files* — is superseded by decision
2, on the owner's ruling of 2026-09-09, with the consequence of
[ADR-014](./ADR-014-two-tools-of-1-1.md) that repeats it.

## Context

Chapter 6 of the specification defines a **learning note** — *teaches a
reader to build one thing, in order, by referencing the concepts and
documents it rests on rather than restating them* — and leaves it
optional, without a template, *under a learning root* no file names. On
2026-09-06 ADR-011 named the third concept folder `docs/concepts/learning`
for knowledge from outside, and the feedback note flagged the collision: a
reader meeting the folder and the artefact takes one for the other. No
skill writes a learning note; the five skills are brainstorm, open, unit,
close and the coding stance. ADR-011 refused a sixth skill for concept
notes because a concept note must be written in *any* session, which is
the bootloader's reach and not a skill's.

The statement of 2026-09-09 says *learning is a session of its own: a
dynamic exploration of what the user knows, through prompting or chat,
that generates the user's own learning notes; it can be proposed during a
coding session and started afterwards*. The owner answered P2, P3 and P4
on 2026-09-09.

## Decisions

### Decision 1 — a learning note is a concept note with an order, in `docs/concepts/learning`

Promotes **P2**, *Learning notes are concept notes with an order* —
simplest.

There is no learning root. A learning note lives in
`docs/concepts/learning`, beside the concept notes on knowledge from
outside, and is one of them: one page, from the concept template, whose
body is a sequence — the plain meaning of the thing being learned first,
then the steps in the order a reader builds it, each step linking the
concept it rests on instead of restating it. The two shapes in the folder
are told apart by their bodies, a definition and a sequence, and by
nothing else; both are read by `concept-orphan` and `concept-growth` as
every note in the concept root is, so a learning note nothing links to is
an orphan like any other. Chapter 6's paragraph on learning notes changes
to say this and stops saying they are optional under a root of their own.

What this changes: `spec/index.md`, chapter 6, the paragraph *Learning
notes*, and the `learning` row of its scopes table, whose *written when*
gains *and a learning session*; the concept template
`spec/concepts/concept-template.md`, one sentence saying a note that
teaches a sequence orders its body.

### Decision 2 — a sixth skill, `cairn-learn`, and the thirtieth kit file

Promotes **P3**, *Yes, a sixth skill* — adds a file.

`cairn-learn` is the procedure of a learning session. It reads first the
three concept folders, the page a newcomer reads first for the surface the
question is about (ADR-012), and `docs/inputs` (ADR-011, decision 1). It
explores with the user by prompting in the chat: what the user already
knows, where it breaks, one question at a time, with the tone of ADR-021
decision 1. It writes a learning note of decision 1 for what the user set
out to learn, and a concept note for every word the session needed that
has none, as ADR-011 decision 3 asks of any session. It ends when the
note is linked from a document outside the concept root — the step
record that offered the session (decision 3), or the surface page whose
glossary it joins — so that the note is no orphan: `concept-orphan`
counts no link from inside the wiki.

The skill is listed where the five are: the bootloader's *start here*
list, whose fifth item names the skills; the pointer page of ADR-013,
whose third item links each skill; the kit's manifest in `tools/cairn.mjs`
and the lock. It is one more kit file, and the owner ruled on
2026-09-09 what that costs: *"stop stupid fixed counters, just do what
make sense and provide added value."* So the kit's file count is a
measurement, not a bound. ADR-013's rule that the kit of 1.1 ships with
at most twenty-nine files is superseded by this decision, and with it
ADR-014's consequence that the manifest reaches that count only after
two removals; the two candidates ADR-013 named — an editor aid the loader
does not need, a one-paragraph index the bootloader and the binding
already cover — are removed by path 4 for those reasons or kept, and
never for a number. The kit's line of chapter 6's weight budget and of
the conformance page reports what the release installs and carries no
target.

What this changes: `skills/cairn-learn/SKILL.md`, a new file; `AGENTS.md`
as `tools/cairn.mjs` writes it, the *start here* item that names the
skills, and this repository's own; the pointer page `cairn/README.md` as
`tools/cairn.mjs` generates it, one link; `tools/cairn.mjs`,
`planInstall`, one entry; `cairn.lock.json`, one entry; chapter 6's weight
budget and `spec/reference/conformance.md`, the kit's line.

### Decision 3 — a unit that explains an abstraction writes the note, offers the session, and parks it

Promotes **P4**, *Writes the note, offers the session, parks it* — one
sentence.

When a unit explains a complex abstraction to the owner, it writes the
concept note ADR-011 decision 3 asks for, offers a learning session on it
in one line of the chat, and says in its step record that the session was
offered and on what; the session does not run inside the unit. It runs
later, in its own context, when the owner starts it with `cairn-learn`,
as chapter 6 parks research that arrives during a cycle and picks it up
in a later one. An offer is not a question of ADR-021 decision 3: the
unit goes on, and nothing waits.

What this changes: the `cairn-unit` skill, step 2, one sentence.

## Alternatives rejected

- **P2, a learning root of its own** (adds a file): `docs/learning/` with
  an index and a template, chapter 6 pointing at both. Refused by the
  owner; a second root for a second shape of the same folder's content.
- **P2, no learning notes** (simplest): chapter 6's paragraph removed, the
  concept wiki and the surface pages as the whole pedagogical layer.
  Refused by the owner, and by the statement, which names the learning
  session.
- **P3, a sentence in the bootloader and the template of P2** (one
  sentence): any session may write a learning note when asked to teach,
  no procedure. Refused; a session that explores by prompting and ends
  with a linked note is a procedure, and a procedure in a pointer is the
  thing the bootloader is not.
- **P3, no** (simplest, as today): concept notes only.
- **P3, a target of *at most thirty*** (this record's first draft) and
  **P3, a third removal to stay at twenty-nine** (the request's reviewer):
  two ways to keep a fixed count; refused by the owner, whose ruling is
  quoted in decision 2.
- **P4, the note only** (simplest; as ADR-011): the owner asks for a
  learning session when they want one, unprompted. Refused; the owner
  wants the offer made where the abstraction appeared.

## Consequences

- The collision the note flagged is settled the owner's way: one folder,
  two bodies.
- A learning session is a named procedure like a brainstorm, and it
  leaves notes the two concept rules already police.
- Nothing enters the checker.

## What the manifesto's test weighed

P3 is the one answer of the note's twelve questions that adds a file,
and the manifesto's threats are about rules and control, not about a
procedure the pedagogy section asks for by name; the alternative that
avoided the file put a procedure into the one file that must stay a
pointer. The fixed count that stood in the way was the manifesto's first
threat in miniature — control through a number — and the owner removed
it rather than the file.

## What implements this record

| Decision | Surface it changes | Named today as |
| :-- | :-- | :-- |
| 1 | chapter 6's paragraph and scopes table, the concept template | `spec/index.md` §6; `spec/concepts/concept-template.md` |
| 2 | a new skill, the bootloader's skills item, the pointer page, the kit's manifest and lock, the kit's line of the weight budget | `skills/cairn-learn/SKILL.md`; `AGENTS.md`; `cairn/README.md` as `tools/cairn.mjs` generates it; `tools/cairn.mjs` (`planInstall`); `cairn.lock.json`; `spec/index.md` §6; `spec/reference/conformance.md` |
| 3 | the unit skill | `cairn-unit` step 2 |

The roadmap register names the coding paths of 1.1 that carry these: the
new skill and the unit skill's sentence in path 1; chapter 6, the concept
template, the bootloader text, the pointer page, the kit's manifest and
the lock in path 4; the kit's count measured and reported on the
conformance page in path 5.
