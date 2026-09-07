---
type: Cairn Research Note
title: The coding stance — what the guides say and what Crumbz wrote
description: Research note 1 of 4 for the coding guidelines — Ponytail at v4.9.0 and the vendors' own guides read against skills/cairn-code, nine Crumbz units from six paths and three agents read line by line against the decision ladder and a tenth by its stat, the whole tree counted at the trunk tip, and the questions the owner must answer before anything here becomes a ruling.
tags: [cairn, research, coding-guidelines, coding-stance, ponytail, crumbz]
timestamp: 2026-09-07T12:00:00Z
cairn:
  status: provisional
---

# The coding stance — what the guides say and what Crumbz wrote

Answers section 1 of the
[brief](./2026-09-07-coding-guidelines.md): what the best current guides
say a coding stance should hold, where `skills/cairn-code/SKILL.md` falls
short or says too much, and what the code Crumbz produced looks like
against the ladder. Nothing here is a ruling; the last section asks the
owner the questions the findings raise.

## Sources

| Source | Pinned | Why it is a source |
| :-- | :-- | :-- |
| Ponytail, `DietrichGebert/ponytail` | release `v4.9.0` of 2026-08-07; `main` at `974d940` on 2026-09-04; `skills/ponytail/SKILL.md` and `skills/ponytail-review/SKILL.md` read at the tag on 2026-09-07 | the repository `cairn-code` was cut from, at its current version; about 130,000 stars |
| Ponytail's agentic benchmark | `benchmarks/results/2026-06-18-agentic.md`, as the README at `v4.9.0` summarises it | the only measured claim about a stance: −54 % lines on average across twelve tasks, safety guards kept |
| Anthropic, *Best practices for Claude Code* | <https://code.claude.com/docs/en/best-practices>, read 2026-09-07 (undated page) | the vendor's own guide for the agent that wrote thirty-one of Crumbz's units |
| OpenAI, *Codex best practices* | <https://learn.chatgpt.com/guides/best-practices>, read 2026-09-07 (undated page) | the vendor's own guide for the agent that wrote twenty-five |
| Google, *Provide context with GEMINI.md files* | <https://geminicli.com/docs/cli/gemini-md/>, dated 2026-06-18, read 2026-09-07 | the vendor's own guide for the agent that wrote fifteen |
| GitHub, *Get the best results from Copilot coding agent* | <https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results>, read 2026-09-07 (undated page) | the forge's own guide for agent-written pull requests |
| The AGENTS.md standard | <https://agents.md/>, read 2026-09-07; stewarded by the Agentic AI Foundation under the Linux Foundation | the file Cairn's bootloader is |
| Kent Beck, *Augmented Coding: Beyond the Vibes* | <https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes>, 2025-06-25, read 2026-09-07 | the one named practitioner whose rules for an agent are older than the vendors' |
| This repository | `b281786`: `skills/cairn-code/SKILL.md`, the manifesto, the [convergence audit](../../docs/cairn/cairn-manifesto-convergence-2026-09-02.md) §3 | where the stance stands today |
| Crumbz, `sinlalune/crumbz` | trunk `358bb17`; the ten unit commits named below; `skills/cairn-code/SKILL.md` there, installed at `410d13c` on 2026-09-03 10:23 +02:00 | the only code written under the stance |

## Summary

### What the guides say a stance should hold

**Ponytail at v4.9.0.** The ladder is the one `cairn-code` carries, seven
rungs in the same order. Around it, five things the audit of 2026-09-02
did not copy, because they were not there or were not noticed:

- *Bug fix = root cause, not symptom.* "Before you edit, grep every
  caller of the function you're about to touch. The lazy fix IS the
  root-cause fix."
- *When not to be lazy.* "Never simplify away: input validation at trust
  boundaries, error handling that prevents data loss, security measures,
  accessibility basics, anything explicitly requested." And: "Never lazy
  about understanding the problem. The ladder shortens the solution,
  never the reading."
- *The check.* "Lazy code without its check is unfinished. Non-trivial
  logic … leaves ONE runnable check behind, the smallest thing that fails
  if the logic breaks." Trivial one-liners need none.
- *The ceiling marker.* A deliberate corner cut with a known ceiling gets
  a `ponytail:` comment naming the ceiling and the upgrade path; a
  command harvests them later.
- *The review vocabulary.* `ponytail-review` reports one line per finding
  under five tags — `delete:`, `stdlib:`, `native:`, `yagni:`, `shrink:` —
  ends with `net: -N lines possible`, and says "Lean already. Ship." when
  there is nothing. Correctness and security are out of its scope by
  design.

The output rule — code first, then at most three short lines, "skipped:
X, add when Y" — is what `cairn-code` turned into the three-line cap. The
intensity levels (lite, full, ultra) are a knob Cairn does not need.

**Anthropic.** The guide is about context, not style. The instruction file
is pruned by one test: "For each line, ask: *Would removing this cause
Claude to make mistakes?* If not, cut it." What to exclude: "Standard
language conventions Claude already knows", "Self-evident practices like
'write clean code'". Every change gets a check the agent can run: "Give
Claude a check it can run: tests, a build, a screenshot to compare." Root
cause over symptom: "address the root cause, don't suppress the error."
Planning has a size rule: "If you could describe the diff in one sentence,
skip the plan." And on review: a fresh-context reviewer "sees only the
diff and the criteria you give it", with the warning that "Chasing every
finding leads to over-engineering: extra abstraction layers, defensive
code, and tests for cases that can't happen."

**OpenAI.** A prompt carries four things: goal, context, constraints,
done-when. "A short, accurate `AGENTS.md` is more useful than a long file
full of vague rules." Rules are added only "after you notice repeated
mistakes". The agent "shouldn't just generate code … it can also help test
it, check it, and review it": a `/review` pass and a `code_review.md` the
bootloader points at.

**Google.** The context file carries "coding style guidelines"; the
worked example is indentation, an `I` prefix on interfaces, strict
equality, JSDoc on every function. That is the kind of line Anthropic's
test cuts. Nothing on what to build or not build.

**GitHub.** The forge's rule is the size of the task: "bug fixes, UI
alterations, test coverage improvements, documentation updates" are good
tasks; "complex, broadly-scoped refactoring" and "security-sensitive or
production-critical work" are not. A good issue states the problem, the
acceptance criteria and the files. "If Copilot is able to build, test and
validate its changes in its own development environment, it is more likely
to produce good pull requests."

**The AGENTS.md standard.** Content is "anything you'd tell a new
teammate": build and test commands, code style, testing, security, pull
request guidelines. No required fields, no length, nested files for
packages.

**Kent Beck.** Four rules given to the agent: "Write the simplest failing
test first"; "Implement the minimum code needed to make tests pass";
"Refactor only when tests are passing"; "Never mix structural and
behavioral changes in the same commit." And a watch for "unrequested
features".

Where they agree: the instruction file is short and says only what the
default gets wrong; every change carries a check the agent runs itself;
fix the cause, not the symptom; a task is small enough to describe in a
sentence; and, in the three guides that speak of review — Anthropic,
OpenAI, GitHub — a reviewer who did not write the diff reads it. None of them
says a word about naming or comments beyond "differs from defaults", and
only OpenAI and GitHub mention secrets, both as "never in the file".

### What `cairn-code` has, lacks and says too much

| In the guides | In `cairn-code` today | Reading |
| :-- | :-- | :-- |
| the seven-rung ladder | the same seven rungs | aligned |
| read the real flow before choosing | its own first section | aligned |
| deletion over addition | its own section, turned on the protocol too | aligned; the protocol clause is Cairn's own and belongs |
| three lines: what, why least, what not | the three-line cap | aligned |
| absorb standard tools, delete the home-made piece | its own section | Cairn's own, from the manifesto |
| refusals: option nobody asked for, one-implementation abstraction, a test that never fires, a what-comment, "while I was there" | its own list | Cairn's own; the never-fires test is a rule no guide states and the evidence below supports |
| root cause, not symptom | absent | **lacking** |
| the floor: trust-boundary validation, data-loss handling, security, accessibility are never cut | absent | **lacking**; the manifesto asks for "the safest and soundest" workflow and the stance never says where lazy stops |
| one runnable check per non-trivial logic; none for a one-liner | "with the test that proves it" on rung 7 | aligned in substance; Ponytail's "none for a one-liner" is the missing half |
| a deliberate ceiling is marked where it sits | absent | **lacking**; the step's "what it does not do" is where Cairn puts it, but that line lives in the record, not beside the code |
| a review vocabulary for what should not exist | the self-review says "what would you refuse?" and stops | **lacking**; see the evidence |
| a size for a change | absent | **lacking**; the cap bounds the explanation, not the diff |
| naming, comments, dependencies | comments: why not what; dependencies: rung 5 | enough; every guide says to leave the defaults alone |
| secrets | absent from the stance; the specification's redaction ceremony covers a leak after the fact | **one sentence lacking**: none in code, none in a record |
| intensity levels | absent | right to omit |

### Ten Crumbz units read against the ladder

The stance was in every Crumbz tree from the first unit:
`skills/cairn-code/SKILL.md` landed in the install commit at 10:23 on
2026-09-03, CP-001 S01 at 11:18. No step record of the seventy-one under
`project/coding-paths/` names the skill, the ladder or any rung. Nine
units were read in full, chosen for spread: six paths, three agents, the
first day and the last, the smallest and the largest; a tenth, 002 S04,
was read by its step and diff stat only because it is 1,084 lines of diff
and its shape was already clear.

| Unit | Agent | src lines +/− | Ladder findings, counted |
| :-- | :-- | --: | :-- |
| 001 S02 `25faf63` ingestion workers | Gemini | +485 / 0 | **Rung 1**: `serializeBigInt` exported, never called by anything at the tip; `SyncFixturesOptions` (league, from, to) that no caller has ever passed. **Rung 2**: two cron routes identical but for the imported function, thirty lines each; a third copy followed in S03, three at the tip. **Rung 4**: `BigInt.prototype.toJSON` patched globally, imported for the side effect. **Rung 5**: the self-review says "Used Prisma `upsert` … so repeated syncs update in place"; leagues and fixtures do `findUnique` then `create` or `update`, only teams upsert. **Refused by the stance**: the runner catches a failure to write its own job row and continues; a test asserts a constant holds five strings and re-implements the matching logic inside the test instead of calling the code |
| 002 S04 `e0e533f` 3×3 matrix and real squads | Gemini | +641 / −258 | read by stat and step: a 229-line squads client "with caching and DB player upserts", a 364-line component rewrite, no plan and no self-review in the record; the largest unit of the sixteen paths |
| 002 S06 `9ff3536` pure market 1 | Gemini | +58 / −14 | typed `repair`, is a data purge and a hardening. **Rung 6/7**: forty lines in the route pick one bookmaker's three prices, the preferred-order loop and the fallback loop copied verbatim under each other; bookmaker ids hard-coded in the route |
| 004 S01 `8798334` value-board engine | Codex | +391 / 0 | the plan says what the unit does not do; the tests assert every refusal (stale, missing, uncalibrated) — the stance's test rule met. **Rung 1, small**: `ValueConfidence` and `ValueEvidence` exported for nobody at the tip. Nothing to cut in the logic |
| 004 S02 `2914f60` value-board API | Codex | +242 / 0 | **Rung 2**: `tripletFor` is the second copy of 002 S06's bookmaker selection, written a day later in another file, the same id list retyped; both copies alive at the tip, both edited by hand to `[8n, 4n, 16n]` in the migration. **Refused**: the calibration gate reads two environment variables nothing in the repository sets; `"Bookmaker " + id` sent to the screen as a name |
| 004 S09 `71bfa9a` adaptive evidence mode | Codex | +94 / −23 | **Refused**: a second mode, `STRICT`/`ADAPTIVE`, threaded through route, service, engine and a screen toggle because strict showed one fixture and adaptive seven; the expression `(mode === "ADAPTIVE" ? (x ?? y) : x)` written eight times in one object literal. Deletion — replace strict with adaptive — was the ladder's answer; both were kept, and three paths later ADR-006 ratified "strict and adaptive evidence modes each produce their own snapshot". At the tip `mode` is a parameter of three routes and eleven files name it. An option added inside a unit became architecture by staying |
| 009 S03 `1c42887` rollup-backed routes | Claude | +147 / −21 | the self-review names two rejections and why; `emptySummary` replaces an inline copy in another file — rung 2 done in the deleting direction. **Rung 5, small**: `formationCountsFor` aggregates rows in fifteen lines of JavaScript where the ORM has `groupBy` |
| 013 S02 `c2c8757` settled board | Claude | +207 / −1 | the self-review: "Rejected a `days` parameter: nobody asked for a window other than the odds horizon mirrored" — rung 1 in the record. **Rung 2 in the code**: the same unit copies the value-board route's `league_id` and `mode` parsing into the settled route, the fourth copy of `must be an integer` at the tip; `SETTLED_HORIZON_MS` and `settledSnapshots` exported, imported by nothing else |
| 014 S01 `d5e4a17` the score once finished | Claude | +132 / −14 | the plan ends "Nothing else."; the self-review: "Rejected a `description` field on the score type: it was already there" — rung 2 said out loud; `storedScores` replaces an inline loop; the tests assert the refusals (zeros are not a draw, in play has no result); the replay reads both archived payload shapes because both exist in the archive — the real flow read first. Nothing to cut |
| 016 S05 `3fa4668` status and history windows | Claude | +61 / −11 | **Rung 2 inside one unit**: seven live status codes listed inline in `defaultGameDay` and the same codes again as keys of a seventeen-entry label map ten lines below. **Refused**: a `showStatus` boolean prop on a row component; a test that mocks the ORM and asserts the exact `where` clause of the first call. The step has no three-line shape and a "Next action" section the template does not have |

Counted: of the nine units read in full, seven had at least one rung
skipped; rung 2 —
already in the codebase — is the one skipped most, six times, twice by
the agent whose self-review names rung 2 in prose. Two had nothing to cut in
their logic: 004 S01, whose only finding is two exported types nobody
imports, and 014 S01. The self-review was where the ladder lived
when it lived anywhere: no step names it, but the two clean units are the
two whose self-review says what was rejected and why.

### The whole tree at the tip

| Measure at `358bb17` | Value |
| :-- | --: |
| files under `src/`, of which tests | 94, 20 |
| lines of source, lines of test | 6,532, 1,304 |
| exported names in non-test source outside `app/`, of which referenced by no other file (tests included) | 209, 49 |
| copies of the bookmaker-triplet selection | 2 |
| copies of the route-parameter guard `must be an integer` | 4 |
| copies of the cron secret check | 3 |
| copies of the path-id regex `/^\d+$/` in route files | 5 |
| runtime dependencies at CP-001 S01, at the tip | 8, 5 |
| units touching `src/` whose deletions outnumber insertions | 1 of 68, the provider migration 016 S02 |

The forty-nine unreferenced exports are of two kinds: types exported by
habit and used only where they are declared, and functions nobody calls —
`serializeBigInt` from the first day, `hungarian` and `slotCost` from the
formation work, `syncFixtures` and `syncOdds` once their runner wrappers
took over. A `delete:` line each is what `ponytail-review` would print.

Per agent, on source and schema files only:

| Agent | Units | Lines in | Lines out | Steps with a self-review | Self-reviews naming a rejection or a removal |
| :-- | --: | --: | --: | --: | --: |
| Gemini (Antigravity), 001–002 | 15 | 6,521 | 1,233 | 5 of 15 | 1 |
| Codex, 003–006 | 22 | 1,954 | 169 | 25 of 25 | 12 |
| Claude Code, 007–016 | 31 | 6,953 | 6,168 | 31 of 31 | 26 |

Claude's deletions are the migration: 016 S02 alone removed 1,518 lines
and added 523. Without it the ratio is the same as the others'. The
ordering of the last two columns is the ordering of the code quality in
the sample, and it is also the ordering of how many rules each harness
loads: Ponytail's own README lists Antigravity among the "instruction-only
adapters" that load a ruleset "without the commands", and nothing in the
Gemini records suggests the skill was ever read.

## Conclusion

### What this changes about the vision

1. **The stance is present and inoperative.** It was installed before the
   first unit, is cited by none of seventy-one steps, and the code skipped
   its rungs in seven of the nine units read in full. The text is not the problem: the
   ladder Ponytail ships today is the ladder Cairn ships. What Ponytail has
   and Cairn lacks is the moment the ladder is *applied* — a review pass
   with five tags and a net-lines line — and the self-review is the only
   place Crumbz ever climbed it. The 1.1 page keeps the unit's self-review
   as prose; the evidence says prose with no vocabulary produced the
   ladder in two units out of ten, and those two came from the same
   writer on the same day.
2. **Rung 2 is the failure mode of agents working in parallel paths.** The
   triplet logic was written twice by two agents in two paths a day apart,
   and four route guards were copied by the writer whose record says
   "already there". The 1.1 overlap advisory reads `writes:`; it cannot see
   two functions that do the same thing in different files. No guide has a
   rule for this either; Ponytail's answer is "look before you write" and a
   review that says `delete:`.
3. **The vendors and Ponytail moved on three points since 2026-09-02**, and
   the manifesto says to absorb them: root cause not symptom, a floor under
   laziness (trust boundaries, data loss, security, accessibility), and a
   check per non-trivial change with none for a one-liner. All three fit in
   six lines of the skill. Crumbz has the evidence for the first two: the
   Gemini runner swallowing its own failure, the cron guard active only in
   production.
4. **A change has no size in Cairn**, and units of 1,042 and 676 lines
   passed every gate. Every guide bounds the task, not the explanation:
   one sentence to describe the diff, one test at a time, structural and
   behavioural changes never in the same commit. The three-line cap was
   meant to bound the unit through its explanation, and Gemini's steps
   show it does not: a Description section lists nine bullets and the cap
   never fires because the shape was not followed.
5. **What the stance should keep silent on**: naming, comments beyond
   why-not-what, formatting. Every guide says the defaults are right and a
   rule about them is the line Anthropic's test cuts. Google's example is
   the counter-example.

### What it does not settle

- Whether a second reader of the diff is wanted at all, and who: that is
  the step-cycle note's question, and this note only records that a
  fresh-context review is what the three vendor guides that speak of
  review share and Cairn lacks.
- Whether the forty-nine dead exports and the four copies are a slicing
  problem — files that do not know each other — rather than a stance
  problem; the slicing note reads the tree.
- Whether the Gemini numbers are the harness's or the model's; one
  adopter, one harness per agent, no control.
- Whether Ponytail's benchmark transfers: its −54 % was measured on one
  model in one repository by the skill's own author.

### Questions for the owner

Each option carries the tag the 1.1 decisions page used: **simplest**
removes or avoids a rule, **native** uses what the tools already do,
**adds a rule** is a new check or step to weigh, and **one sentence in a
skill** is neither a rule nor nothing.

**Q1. When the agent reviews its own diff, should it have to say what it
deleted, reused or refused, in a fixed vocabulary?** On Crumbz the two
units with nothing to cut were the two whose self-review named a
rejection; the rest wrote prose or nothing.

- [ ] **Yes, five tags.** *(one sentence in a skill; native to Ponytail)*
  The self-review of every unit is one line per finding under
  `delete:`, `stdlib:`, `native:`, `yagni:`, `shrink:`, ending with the
  net line count or "Lean already", as `ponytail-review` prints it.
- [ ] **No, keep the free question.** *(simplest, as today)* "What would
  you refuse?" stays as it is.
- [ ] **Yes, and the checker reads it.** *(adds a rule)* A self-review
  section without at least one tagged line or the "lean" sentence blocks
  the unit. The manifesto's first threat, offered to be weighed.

**Q2. Should `cairn-code` follow Ponytail's current version, or stay the
cut of 2026-09-02?** Three things arrived since: the root-cause rule, the
floor under laziness, the check-per-change rule.

- [ ] **Take the three additions.** *(one sentence in a skill, three
  times)* Six lines added to `cairn-code`; nothing removed.
- [ ] **Install Ponytail and keep only Cairn's own.** *(simplest, native:
  absorb the ecosystem)* The kit points at Ponytail at a pinned tag for
  the ladder and the review, and `cairn-code` shrinks to what is Cairn's
  alone: turn deletion on the protocol, the test that never fires, the
  three-line step. One file nobody else maintains becomes a file its
  author maintains.
- [ ] **Leave it.** *(as today)*

**Q3. Does a unit have a size?** Units of 1,042 and 676 lines passed every
gate; the cap bounds the explanation, and Gemini's steps did not use the
shape the cap needs.

- [ ] **The sentence rule.** *(one sentence in a skill; native to the
  vendors' guides)* A unit's plan is one sentence; a plan that needs two
  is two units. Structural and behavioural changes never share a unit.
- [ ] **No size.** *(simplest, as today)* The three-line cap is the only
  bound; a writer who ignores the shape ignores the cap.
- [ ] **A number.** *(adds a rule)* An advisory when a unit's source diff
  exceeds a line count the owner picks. A count, not a constraint, until
  it binds.

**Q4. Which of secrets, error handling, dependencies and naming get a
line in the stance?** The evidence: a runner that swallows its own
failure, a cron guard active only in production, no naming or formatting
fault anywhere in ten units.

- [ ] **Secrets and errors, one line each.** *(one sentence in a skill,
  twice)* No secret in code or in a record, rotate before redaction; an
  error is handled where data would be lost or a trust boundary crossed,
  and swallowed nowhere. Nothing on naming, comments or formatting.
- [ ] **Nothing.** *(simplest)* The ladder's rung 5 covers dependencies,
  the specification's redaction ceremony covers a leak, and every guide
  says the defaults on the rest are right.
- [ ] **A style section.** *(adds rules)* Naming, comments, formatting,
  error handling, dependencies, secrets, as Google's example does. The
  line Anthropic's test cuts; offered to be weighed.

**Q5. Should a fresh context read the diff against the ladder before the
request opens?** Every guide has it; Cairn has the writer's own
self-review. The step-cycle note asks who the reader is; this question
asks only whether the ladder is the criterion.

- [ ] **Yes, the writer runs it.** *(native to the agent products; one
  sentence in a skill)* Before the request, the writer runs its harness's
  review in a fresh context with the ladder as the criterion and pastes
  the net line into the self-review. No new participant.
- [ ] **No.** *(simplest, as today)* The owner's try before the merge is
  the second read.
