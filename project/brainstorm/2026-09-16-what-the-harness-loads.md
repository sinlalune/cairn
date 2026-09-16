---
type: Cairn Brainstorm
title: What the harness loads — Ponytail absent, the skills read as files
timestamp: 2026-09-16T00:00:00Z
cairn:
  status: provisional
---

# What the harness loads — Ponytail absent, the skills read as files

The session of 2026-09-16, the afternoon after 1.1.0 was published and
Crumbz updated to it, kept verbatim in the order it happened. The owner
and the release path's writer, in the chat, in the protocol's own
repository.

## The owner's question

> why you don't have ponytail install on this harness ?

## What the writer found, read from the harness

Claude Code knew one plugin marketplace, Anthropic's official one, and no
Ponytail. There was no skills folder under `~/.claude` and none under
either repository. The six Cairn skills were not loaded as Claude Code
skills either: through the whole release path the writer read
`skills/cairn-unit/SKILL.md` and its siblings as files and followed them,
which is what the bootloader's reading order asks and what the checker
can see. The decision ladder applied in every self-review came from
`cairn-code`'s summary of it, not from Ponytail's own skill.

Why the kit does not install Ponytail: ADR-016 decision 1 — *the kit names
Ponytail at a pinned tag and copies none of its files*, installed in the
adopter's harness as that repository says. A plugin install is a harness
setting, the owner's, and Cairn writes into the repository, not the
harness — the same line ADR-029 draws around GitHub's ruleset.

Ponytail's README, for Claude Code, two separate prompts:

```text
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

Cairn 1.1 pins `v4.9.0`; the marketplace's latest was `v4.10.0`, and the
plugin install takes the latest.

## The owner's second question

> so it not working as intended, as it is not automated by any agent or
> harness on a fresh repo ?

## What the writer answered

Two different things, only one working as the records designed it.

**Ponytail: as designed, and the design has a hole.** The kit naming it
and not installing it is ADR-016's decision. The hole: nothing carries the
adopter to the step. `init` ends with *commit this installation, then read
AGENTS.md and open your first path*; Ponytail appears only on the pointer
page. On a fresh repository an agent starts with `cairn-code`'s summary of
the ladder and never learns the stance was meant to come from elsewhere.

**The Cairn skills: not working as the README says.** The README calls
them *Agent Skills your coding agent loads on demand*, and the kit puts
them under `skills/` at the repository root. Claude Code loads project
skills from `.claude/skills/` and plugins from its marketplaces; it does
not look in `skills/`. None of the six appeared in the harness's skill
list during the whole path, here or in Crumbz. They worked as documents
an agent is told to read, because the bootloader points at the folder.
Codex reads `AGENTS.md` natively and gets the same pointer.

Three ways to close each, tagged by cost:

- Ponytail — `init` and the pointer page print the two `/plugin` lines as
  the next step (one line each, native); or `cairn-check` reports Ponytail
  absent as an advisory (the checker reading a harness, which ADR-029 just
  stopped it doing); or the kit vendors the two skills at the pinned tag
  (the copy ADR-016 refused).
- The skills — the kit also writes `.claude/skills/<name>` as links or
  copies of `skills/<name>` so Claude Code lists them (native to that
  harness, one line in the installer per harness); or the kit installs
  into `.claude/skills/` only and the bootloader points there (ties the kit
  to one harness's layout); or the README stops claiming *loads on demand*
  and says *read from the bootloader* (the sentence made true).

Recommendation: the first option in each case — one line where the
adopter already looks.

## The owner installed the plugin, then asked

The owner ran the two `/plugin` commands; the harness listed six Ponytail
skills. Then:

> why not just adding ponytails skills extracting them from latest version
> at init or update

## What the writer answered, with the plugin read

A real option, and it reverses ADR-016 decision 1 — so a 1.2 decision with
a record, not a fix.

What the plugin is: Ponytail 4.10.0 is six skills, five lifecycle hooks in
Node that give it its always-on activation and mode tracking, an MCP
server, and manifests for five harnesses. The two skills Cairn names are
1,418 words together, MIT. Copying them gives an agent the text, none of
the activation, and nothing a harness lists as a skill, because `skills/`
is not where any harness looks.

Three ways, tagged:

- Vendor the two files at the pinned tag, at release time — no network
  call, the pin kept, the text present on day one; two files in the kit, a
  second copy of upstream text stale until a Cairn release moves the pin,
  the activation still absent.
- Fetch from GitHub at the pinned tag at `init` and `update` — no copy in
  the tarball; the installer makes a network call and stops working
  offline.
- Fetch the latest — the stance is whatever Ponytail shipped that morning;
  the pin that lets a release say which stance it was checked against is
  gone. Ponytail moved 4.9.0 → 4.10.0 between the release and the install.

What the writer would rule: not the copy. The plugin does more than its
two files, every harness it supports has a one-line install, and a copy is
the drift the manifesto refuses. The gap is that nothing tells the adopter
to run that line: `init` prints the two `/plugin` commands as its next
step, and the pointer page shows them where it already names the tag. One
printed line, no file, the decision kept; the line can name `v4.9.0` as
the tag the release was checked against.

## The owner's decision

> yep

The note is written and the 1.2 row names it, beside the update-skill
note: they are one question — what an adopter's harness does with what
the kit installs. Nothing is coded; the row has no path yet.

## What the idea is waiting for

A reading of how each harness Cairn's adopters use — Claude Code, Codex,
Gemini — discovers skills and plugins, at a pinned version of each, so the
1.2 path can say which one line per harness makes the six skills load,
and whether printing the Ponytail install is enough or the pointer page
should carry it too; and whether Ponytail `v4.10.0` changed the ladder or
the five review tags the self-review speaks in.
