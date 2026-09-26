---
type: Cairn Feedback
title: A step record over 1 MiB reads as rewritten, because the blob is read through a 1 MiB buffer
timestamp: 2026-09-22T00:00:00Z
tags: [feedback, cairn]
---

# A step record over 1 MiB reads as rewritten, because the blob is read through a 1 MiB buffer

**Movement:** the `record-integrity` rule of `cairn-check`, on any path
whose step folder holds a file larger than 1 MiB — a photograph of a
whiteboard, a screen recording's still, a drawing the owner sent.

**Cost:** `appendOnlyStepRecordMutations` compares the blob a record was
added with against the text it carries now. It reads the first with
`gitOrNull`, which is `execFileSync` with `encoding: 'utf8'` and no
`maxBuffer`, so Node's default of 1 MiB applies: for a larger blob the
call throws `ENOBUFS`, `gitOrNull` answers `null`, and
`preservesAppendOnlyRecord` reads `before == null` as *false*. A record
nobody has touched is then reported as one that

```text
[record-integrity] <file> no longer preserves its adding blob as a prefix
— append a suffix, or supersede it from a later step of this path binding
the blob it replaces to the blob it adds
```

and neither remedy it names can be taken. Appending a suffix to a JPEG is
not a thing. A supersession cannot name it: `parseSupersession` matches
`^(\S+\.md)@…`, so only a Markdown record can be superseded. Re-adding it
does not help either, because `recordOriginFromFollowLog` returns
`entries.at(-1)` — the *oldest* addition — so the oversized blob stays the
origin however many times the file is added again. On a host with
`pathHistoryPolicy: forbidden` the record is unfixable where it stands.

CP-LOOK-002 met it on the owner's own pencil drawing, 1,437,229 bytes,
kept beside the step that carries his direction. The only repair left was
to move the file out of `steps/`, where nothing reads it — which works,
and costs the step record's sentence about where the drawing sits.

It also hides itself. While any record's origin is unreadable,
`appendOnlyStepRecordMutations` returns `null` and the rule reports the
*inconclusive* verdict instead, so a repository can carry this defect for
as long as it carries any other and meet it only when the other is fixed.

**Change to Cairn that would remove it:** any one of

1. read the blob as bytes and with room — `execFileSync(… , { maxBuffer: Infinity })`,
   or `git cat-file --batch`, comparing buffers rather than strings, which
   is also what a record's byte-prefix guarantee actually means (the
   present code compares `utf8`-decoded text, and `gitOrNull` `.trim()`s
   one side and not the other);
2. or treat a record the checker cannot read as *unread*, naming it, and
   fall back to comparing blob ids — `git rev-parse <commit>:<file>`
   against `git hash-object <file>` — which needs no buffer at all and
   proves the same thing;
3. or say that a step folder holds records and not attachments, and give
   an attachment a home the rule does not police, so that the question
   never arises.

Whichever is chosen, the message for an unreadable blob should say so,
rather than offering two remedies that cannot apply to the file it names.
