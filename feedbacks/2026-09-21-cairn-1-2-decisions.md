---
type: Cairn Learning Note
title: Cairn 1.2 — the owner's decisions
description: The functional questions Cairn 1.2 needs the owner to answer, in plain language, each with what happened on Crumbz, on Atomik or in the release and two or three ways to work from now on; the owner ticks one option per question, and the asks note is ticked, deferred or refused from the answers.
tags: [cairn, decisions, 1.2, owner, crumbz, atomik, learning]
timestamp: 2026-09-21T15:00:00Z
cairn:
  status: provisional
---

# Cairn 1.2 — the owner's decisions

The release, one adopter's update and a second adopter's adoption produced
five notes and thirty-one technical asks. This page turns them into
questions about **how you want to work with the agents, and how a
repository that is not this one should meet the protocol**. Each question
says what happened, then offers two or three ways to go on. Tick one. If
none fits, write a line under the question in your own words; it wins.

You do not need to read [the asks](./2026-09-21-cairn-1-2-the-asks.md).
That note is the translation of your answers into changes to the checker,
the skills, the kit and the tools; it is ticked, deferred or refused from
this page after you answer. The last section here says which asks each
question drives.

One thing you decided today is recorded at the end and is not asked again.

## The manifesto's test

As on the 1.1 page: the manifesto's first threat is *searching for more
control in the volume of tests and the complexity of workflows*; a solution
not native to Git, GitHub and CI is probably not a best practice; every
line must be effortlessly comprehensible. Each option carries one of three
tags:

- **simplest** — removes or avoids a rule;
- **native** — uses what Git, GitHub or the harness already does;
- **adds a rule** — a new check, a new field or a new step, which the
  manifesto asks you to weigh, not to refuse.

When two options would both work, the manifesto leans to the first two.

## A. Starting a coding path

### Q1. When the plan meets a hole in the records, who fills it?

Twice in coding path 4 the agent found, in the middle of a unit, that the
records it was implementing had left something open: a folder named
`docs/concepts/<project>` with no project name anywhere the kit could read,
and a definition-of-done item that said the opposite of the decision it
cited. Both times the unit stopped, the question came to you in the chat,
and the path waited. Both holes were visible in the plan before you gave
the go-ahead; nobody was told to look.

- [ ] **The agent reads for them before asking your go-ahead.** *(two
  sentences in a skill, no rule)* When it writes the plan, the agent checks
  every surface name for a placeholder and every done-item against the
  record it cites, and puts what it finds in the plan's questions so you
  answer once, at the start.
- [ ] **As today.** *(simplest)* The unit stops when it meets the hole and
  asks you then.

### Q2. A repository whose main line refuses a direct push

Atomik protects `master`: every change must come through a pull request,
and there is no exception for you. The open skill's only registration
sequence is a direct push of the plan to the main line. This repository
runs the same sequence on a protected `main` only because GitHub gives you
an admin bypass here. Atomik's first 1.1 path is written, accepted and
cannot be registered by any route the protocol allows: the push is
refused, and a pull request carrying the plan is refused by the checker
because the plan is not on the main line yet.

- [ ] **Say it plainly: the protocol needs a main line you can push to.**
  *(simplest)* One sentence in the open skill before the sequence, and the
  configuration stops offering a value it cannot perform. An adopter
  protects the main line with a bypass for the writer, or does not protect
  it.
- [ ] **Support the pull-request registration.** *(adds a rule)* The plan
  may arrive by a pull request; the checker learns to recognise a
  registration that is in the change under review rather than on the main
  line — a commit that touches only the plan and the live view, and sits on
  the declared base. The open skill gets a second sequence.
- [ ] **Both, and the installer refuses the pairing that cannot work.**
  *(adds a host reading)* The second option, plus `init` and `adopt` asking
  GitHub whether the main line takes a direct push and refusing a
  configuration that says one thing when the host does another. Note that
  1.1 decided the checker asks the host nothing (ADR-029); this would let
  the installer ask instead, and needs a record saying so.

## B. What a record and the register may say

### Q3. A number that lives in five places

The kit's file count and skill count sat in the module note, the
conformance page, the installer's comment, a test and the README. Coding
path 4 corrected them in four units and each review found one more copy;
the count itself moved twice inside the path.

- [ ] **Written once, linked from everywhere else.** *(one sentence in the
  close skill)* The measurement lives on the conformance page; every other
  page links that row rather than restating it.
- [ ] **As today.** *(simplest)* The agent corrects the copies it finds.

### Q4. The register's State column

The register said `running` for four paths whose records said `done`;
the writer of path 4 saw it, raised it, and left it, being outside the
path. It was corrected by hand on 16/09. The live view is already
generated from the records; the register's column is the same fact kept
by hand.

- [ ] **Generated, like the live view.** *(adds a generation)* The
  `cairn-active` command fills the State column from each path's record,
  and a path's `status:` is the only place its state is written.
- [ ] **Kept by hand.** *(simplest, as today)* The close skill reminds the
  agent to update the row.

### Q5. A decision that no release produces yet

ADR-015 says `update` prints, beside the diff of an edited file, a note on
what the release changed in that template. No release writes such a note,
and nothing on the record or the conformance page says so; the agent that
implemented `update` wrote it in a plan nobody scoping a release reads.

- [ ] **The record may say *pending*, naming the row that owes it.** *(one
  word in a table, no rule)* The register row names the clause back; the
  path that lands the mechanism clears the word.
- [ ] **No.** *(simplest)* The conformance page is where "not implemented"
  is said, and that is enough.

## C. Installing, updating and adopting

### Q6. Saying no to a file the update writes

The release's own `update` wrote three concept-folder indexes this
repository does not want, under the protocol's wiki root, because the kit
derives that folder instead of reading the one the configuration declares.
The only way to refuse them was to delete them afterwards; `status` reads
them as *missing* at every run since. Atomik declares `docs/bedrock` as its
architecture root and got a second, empty `docs/architecture` beside it,
for the same reason.

- [ ] **The kit reads every folder you declared, and you can decline a
  file.** *(a field the lock remembers)* The installer writes only under
  roots the configuration names, derives one only where none is declared,
  and a declined file stays declined at the next `update` and reads as
  *declined*, not *missing*.
- [ ] **The kit reads every folder you declared; declining stays a
  deletion.** *(smaller)* The roots repair alone; a file you do not want is
  deleted after each update.
- [ ] **As today.**

### Q7. Is an adopter's update a procedure of its own?

Crumbz's update to 1.1 ran as a path on their register, by hand, along the
chronology the brainstorm note of 16/09 wrote: read what the update would
do, decide on the edited kit files and the host files the repository does
not want, run it, reconcile only what the report named. No skill carries
that movement; the six skills the kit installs are for coding paths.

- [ ] **Yes, a seventh skill, `cairn-update`.** *(one skill file)* The
  brainstorm note recommends it: the update is prose an agent needs at the
  moment it acts, and it is not a coding path.
- [ ] **A section of the open skill.** *(no new file)* "Opening an update
  path" inside `cairn-open`, which is already long.
- [ ] **No.** *(simplest)* The README of the pointer page is enough; the
  agent works it out each time.

### Q8. Ponytail, and where the harness looks for skills

ADR-016 pins the coding stance to Ponytail and names its install line,
but nothing installs it: Crumbz ran twenty-six paths without it. And the
six skills land in `skills/`, which is not where Claude Code looks, so
they are read as files, never loaded. You installed the Ponytail plugin by
hand on 16/09 and asked why the kit does not just extract Ponytail's
skills at `init`.

- [ ] **One printed line per gap.** *(native, keeps ADR-016)* At `init`
  and `update` the kit prints Ponytail's one-line install where it is
  missing, and the one line per harness that makes the six skills load.
- [ ] **The kit ships Ponytail's skills.** *(reverses ADR-016 decision 1)*
  Extracted from the plugin's latest version at `init` and `update`; a
  record supersedes the pin, and the kit then owns a copy of someone
  else's skills.
- [ ] **Nothing.** *(simplest)* Installing a plugin is the adopter's.

### Q9. When the adoption leaves your own gate red

Atomik's CI runs the 0.2 test suite beside the tools `adopt` replaced.
`adopt` listed the eight old tests as shapes to delete and said nothing of
the workflow step that still runs them; the adoption was committed on a
green `cairn-check` and CI went red on the next push.

- [ ] **`adopt` says it.** *(one sentence from facts the kit holds)* Under
  the stale line: *your workflow and `package.json` call these; your gate
  is red until they go*.
- [ ] **No.** *(simplest)* The stale list is enough; the adopter reads the
  workflow.

### Q10. Template sentences that are false where they land

The documentation index the kit installs says *there is one page at this
root, listed above* and *adds its line to the README*. Crumbz has no
surface page yet and no README. The reviewer flagged both; the writer
refused to rewrite the release's text, so two false sentences stand on a
page the adopter now owns.

- [ ] **Write the templates in the shape they describe.** *(a wording
  change, no rule)* *One page per surface, as they are written*; *the
  README, where the repository has one*.
- [ ] **As today.**

## D. What the checker reads

### Q11. An adopter's folders whose links must not resolve

Atomik keeps fixtures that portray another vault and a journal frozen by
its own header. 1.0's checker exempted both from the `links` rule; the
exemptions were Atomik's and were deliberately left out of the protocol in
CP-CAIRN-001. The rule now blocks on five links in files the repository
declares unrewritable, and the only way Atomik could say so was to edit
the checker, which `status` reports as an edited kit file for ever.

- [ ] **A declared list, with a reason beside each path.** *(a
  configuration field, no new rule)* `cairn.config.json` names the paths
  whose relative links the rule does not resolve and why; the conformance
  page says the two 0.2 exemptions left deliberately and a portrayal or a
  frozen history is the adopter's to declare; `adopt` names such folders
  as shapes wanting a declaration.
- [ ] **No exemptions; the ruling is restated.** *(simplest)* A repository
  with such files forks the checker or deletes them, and the record of
  CP-CAIRN-001 S06 is superseded to say that plainly.

### Q12. Is the feedbacks folder checked like the rest?

The checker reads four roots; `feedbacks/` is none of them. A note's links
and frontmatter are checked by hand or not at all, and the folder is the
evidence every decision of this repository is promoted from. Today's move
of eight notes into `feedbacks/1.1/` rewrote nine links by hand; a rule
that blocks on a link inside a frozen note is a rule that edits history.

- [ ] **Say on the conformance page that it is deliberately unchecked.**
  *(simplest)* One line where the corpus is listed, so *checked by hand*
  and *unchecked* stop looking identical from a green run.
- [ ] **Read it.** *(adds coverage)* One entry in the corpus list; `links`
  and `schema` cover the folder; a broken link in an old note blocks the
  gate until it is repaired.

## E. The channel between an adopter and Cairn

### Q13. What an adopter's agent does with a note about Cairn

The unit skill, installed in every adopter, tells the writer to put a note
about the protocol's cost under `feedbacks/`. The kit installs no such
folder and no adopter page names it; a note written there reaches nobody.
Crumbz's and Atomik's notes are here because you asked a second session
to carry them by hand, twice.

- [ ] **The skill says: tell the owner.** *(simplest)* In an adopter, the
  sentence becomes *say it to the owner, who decides whether it reaches
  Cairn*; the folder and the file are the protocol repository's own.
- [ ] **The kit installs the folder and the skill names the route.**
  *(adds a folder)* `feedbacks/` in every adopter, and the sentence says how
  a note reaches this repository — a pull request against it, or the owner
  carrying it.
- [ ] **As today.**

### Q14. When a note's claim turns out to be wrong

The first draft of Atomik's adoption note called a decision a regression.
It was corrected before it merged, twenty-four seconds after Atomik's
cleanup path had registered on the wrong claim, which is now a sealed line
in that path's definition of done. Nothing on the note says a claim in it
was withdrawn; Git holds the history, and nobody holding a copy reads Git.

- [ ] **A line at the head of the note.** *(one sentence in ADR-028, no
  rule)* *Corrected on <date>: <what was withdrawn>, <what replaced it>*,
  written by whoever corrects it.
- [ ] **Nothing.** *(simplest, native)* The history is in Git; a reader who
  acts on a note reads it at a commit.

## F. Tools and the release

### Q15. Release notes that name what a release absorbed

Crumbz's writer read two checkers function by function to learn which of
Crumbz's three repairs 1.1.0 had absorbed, and concluded wrongly that one
was missing; the wrong sentence ran through three units. All three were
absorbed. Nothing names them by the ids an adopter searches for.

- [ ] **Yes.** *(one paragraph per release)* The release notes name the
  adopter repairs absorbed and the ones not, by the adopter's path ids.
- [ ] **No.** *(simplest)* The adopter takes the release's checker and
  reads the diff.

### Q16. Housekeeping with no choice in it

Ten asks are corrections a reviewer found and nobody disputes: the update
puts the generated live view on the "reconcile by hand" list every time;
a generated page is never pristine the day after, because its timestamp
is the day of generation; the update does not name the files it starts
managing; `status` names a rewrite of the configuration that `update`
will not make; this repository's bootloader does not point at the pointer
page the kit installs; two checker messages still say *the forge*; one
fixture went red once on `record-integrity`; the close skill points at a
file no release installs; the post-mortem cannot count the run it runs in
and prints a closed request as open.

- [ ] **Do all of it in 1.2.**
- [ ] **Later.**

## Already decided on 21/09

- **A treated note moves into `feedbacks/<release>/`**, whose index names
  what answered it. The eight notes 1.1 answered moved today.

## How the answers become the asks

| Question | Asks it drives |
| :-- | :-- |
| Q1 | K01, K02 |
| Q2 | K06, K07, K08, K20 |
| Q3 | K03 |
| Q4 | K04 |
| Q5 | K05 |
| Q6 | K13, K14 |
| Q7 | K17 |
| Q8 | K18 |
| Q9 | K16 |
| Q10 | K12 |
| Q11 | K21 |
| Q12 | K22 |
| Q13 | K26 |
| Q14 | K28 |
| Q15 | K31 |
| Q16 | K09, K10, K11, K15, K19, K23, K24, K25, K29, K30 |
| already decided | K27 |

Every one of the thirty-one asks is driven by exactly one question above.
After you answer, the asks note is ticked, deferred or refused to match,
and the promotion path is bound to both.
