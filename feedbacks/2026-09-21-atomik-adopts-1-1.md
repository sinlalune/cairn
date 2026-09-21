---
type: Cairn Learning Note
title: Atomik adopts 1.1 — what the first `adopt` of the protocol's birthplace met
description: The agent that ran Atomik's adoption, under ADR-028, on the first repository to bring a hand-carried 0.2 installation to 1.1.0 with `adopt`: a `links` rule that lost two documented exemptions to a rename and now demands an edit to a file its own header freezes, in a class of repository the protocol's own gate cannot reach; a `status` that names a rewrite `update` will not make, on the one file an adopter's history is densest in; and a folder of notes with no way to say which of them has been treated — each with where it was met, what it cost and the change that would remove it.
tags: [cairn, feedback, agent, adopter, atomik, adopt, 1.1]
timestamp: 2026-09-21T00:00:00Z
cairn:
  status: provisional
---

# Atomik adopts 1.1 — what the first `adopt` of the protocol's birthplace met

Written by the agent that ran the adoption — Claude Code — on 2026-09-21,
under [ADR-028](../docs/adr/ADR-028-a-feedback-file-when-nothing-broke.md).

Atomik is where the protocol was written: this repository's genesis commit
`43cfeb9` says *seeded from Atomik at 46bdd11 with cairn-init*. It has
carried the tools by hand ever since, never installed a kit and never held
a lock, so what it needed was `adopt` and not `update` — the first run of
that command on a repository that is not a fixture.

`npx cairn-protocol@1.1.0 adopt` wrote 24 files, kept 8 host files and
reported 35 shapes 0.2 left behind, deleting none of them, in one command
and without a surprise. The configuration migrated from schema 1 to
schema 2 and kept its six areas. What follows is what cost more than it
should.

**What is deliberately not here.** That the owner had never run `npm` or
`npx` in Atomik: `npx` installs nothing permanent, the repository already
had Node, and the question was answered in a sentence.

## 1. A rule that demands an edit to frozen history

**Where.** `npm run cairn-check`, run as the adoption's own next line
instructs, immediately after `adopt`. FAILED, five blocking `links`
findings, none of them in a file the adoption had touched:

```
[links] docs/fixtures/capture_source_dossier.md: broken relative link → ./original.jpg
[links] docs/fixtures/capture_source_dossier.md: broken relative link → ./transcript.md
[links] docs/fixtures/capture_source_dossier.md: broken relative link → ../../../notes/query-key-value-vectors.md
[links] docs/fixtures/truth_claim_fixture.md:     broken relative link → ../sources/web/wikipedia-about/source.md
[links] atomik-project/log.md:                    broken relative link → ./original.pdf
```

Atomik's own 0.2 checker had exempted exactly these two classes, and said
why:

```js
//   docs/fixtures/  — sample documents PORTRAYING another vault; their
//                     links point into that imaginary vault by design
//   log.md          — an append-only historical narrative; its links
//                     describe past states and must never be rewritten
const linkExempt = (file) =>
  file.startsWith(`${DOCUMENTATION_DIR}/fixtures/`) || file === JOURNAL
const docs = markdownCorpus().filter((file) => !linkExempt(file))
```

The exemption went in `e18bbe4`, CP-CAIRN-006 S02, *the rules cut to
twenty-four names*. That unit replaced the single-file journal with the
`project/log/` folder, which removed the `JOURNAL` constant the second
half of the expression named; the first half, about the fixtures, went
with it. Nothing in the unit's message reconsiders either.

Three things kept it invisible from 2026-09-02 to today. The rule's fixture proves
only the positive case — *a link that resolves nowhere* — so the suite
stayed green when the filter in front of it was deleted. This repository
has no `docs/fixtures/` and no frozen file, so its own gate cannot reach
the class: the protocol cannot fail this rule in the repository that
defines it. And the conformance page now states the rule with
*Exemptions: none*, which reads as a decision rather than as a loss.

**What it cost.** The adoption could not be committed as one unit, which
is what `adopt` prints as the next thing to do. The only remedy the gate
offered was to edit `atomik-project/log.md` — whose own first lines say
**FROZEN 2026-08-14 — archive only. Every entry below is history and
stays exactly as written** — and four sample documents that portray an
imaginary vault, where a resolving link would mean the fixture had stopped
being one. Restoring the two lines locally was a minute; what it leaves
behind is not. Atomik now carries an edited kit file, reported at every
`status` and held back at every `update` until the repair is upstream and
it can run `update --take tools/cairn-check.mjs`. It is the same shape
Crumbz carried for three repairs across twenty-six paths.

**The change to Cairn.** Restore both exemptions in the `links` rule. The
journal half needs re-expressing, since a journal is a folder now and the
frozen single file is a 0.2 shape: `staleShapes` already knows how to
name what 0.2 left, and this is one more of them. Give the rule a fixture
that proves the exemption and not only the finding, so the next rename
cannot take it silently; and correct the conformance page's *none*.

Behind the three of them is one movement worth naming: this rule was lost
as collateral of a rename, in a unit whose subject was something else,
and no gate in this repository could notice. A rule that can only be
proved wrong in an adopter's repository is a rule the protocol is not
testing.

## 2. `status` names a rewrite `update` will not make

**Where.** `npx cairn-protocol@1.1.0 status`, run on Atomik immediately
after the adoption:

```
cairn — installed release 1.1.0, this package is 1.1.0 (current)
kit files: 23 pristine, 9 edited
  update would write   cairn.config.json (pristine)
```

It would not. `update` sets the migrated configuration into its plan
before it compares (`tools/cairn.mjs:1268`); `status` does not
(`tools/cairn.mjs:1257`), so it compares the repository's configuration
against a freshly generated template and finds them different. On Atomik
the difference is the whole of the repository's history with the
protocol: six areas against the template's one, and a `migration` block
naming five 0.2 paths against three empty lists. `update --dry-run`
confirms the file is untouched — it does not appear in the list at all.

`adopt` is what puts a repository in this state, and deliberately: it
locks the MIGRATED configuration, because locking the generated one made
the very next `status` call an untouched file *edited* — a defect its own
S01 review caught, with the comment still in place. The repair moved the
file from `edited` to `pristine`, and `status` reads a pristine file whose
template differs as one to rewrite. Every adopted repository reads this
line on its first `status`, and the denser its configuration, the more
alarming it is.

**What it cost.** The command's dispatch read end to end and an
`update --dry-run` run against the repository, to establish that a line
printed by the protocol's own status command was false — a reading that
ended in nothing changing. The durable cost is the report not being
believed afterwards: an adopter who has seen `status` name a rewrite that
never comes cannot use `status` to decide anything.

**The change to Cairn.** `status` builds its plan the way `update` does —
one line, the same `plan.files.set('cairn.config.json', …)`. Better, both
read it from one function, so the two commands cannot drift again: they
are supposed to answer the same question, one of them out loud.

## 3. A note under `feedbacks/` cannot say it has been treated

**Where.** Writing this file. Before claiming that the exemption of
observation 1 was unreported, the folder had to be read to see whether an
adopter had already met it — ten notes, each holding several observations,
promoted at different times by different paths, with nothing in any of
them saying which. The index's prose hook is what each note *argues*,
never what became of it. The frontmatter carries `cairn.status:
provisional`, and no note has ever carried anything else: the 1.1 notes
whose asks are all implemented and released still read `provisional`
today.

The forward trail exists and is exact — a promotion record says *promoted
from <note> at blob <sha>*, and the register's row names its sources. It
is the reverse that is missing. Standing on a note, there is no way to
reach what answered it without reading every decision record.

**What it cost.** Here, a folder read in full to write three paragraphs.
The real cost is elsewhere: it falls on whoever opens the 1.2 path, who
must establish what of ten notes is left before they can scope anything,
and it grows with every release.

**The change to Cairn.** This is the owner's to decide, and the options
differ in what they cost later rather than now.

The one the folder already affords: `cairn.status` stops being decoration.
A note is `provisional` when written and `settled` when a record promotes
what it argues, with the record named beside it, and the promotion unit
sets it in the same change it writes the record — the record already names
the note and its blob, so the two lines are written together or not at all.
Nothing moves, every link holds, and the note stays exactly as it was
below its frontmatter.

The one that was asked about: a `feedbacks/archive/` folder that treated
notes move into. It answers the question by looking at the folder, which
is the cheapest possible reading. It also moves files that other notes
link by relative path, and this repository forbids rewriting history and
blocks on a broken relative link — observation 1 is what that costs. A
move would have to rewrite the links inside frozen notes to keep the gate
green.

The one that never rots: a generated view, as `ACTIVE.md` is generated —
the promotion records already carry *promoted from* with the blob, so a
reader over `docs/adr/**` can print, per note, what cites it and what does
not. It is a tool, and ADR-028 refused a tool for this channel once; that
refusal was about writing feedback, not about reading the folder back, but
it is the owner's to say whether it still applies.

What the three have in common is worth stating: a status kept by hand
beside the records that carry it is a cost this repository has already
written down once, as the second observation of
[coding path 4's writer](./2026-09-15-cp-cairn-009-writer-feedback.md).
Whichever is chosen should not be the fourth place the same fact is
restated.
