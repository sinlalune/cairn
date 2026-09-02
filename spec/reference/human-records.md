---
type: Cairn Reference
title: Opening, audit, and closing records
description: Canonical shapes for the judgement-bearing records Cairn binds to a path — the opening acceptance in the record, and the closing review as the request's description or as one closing record on manual-git.
tags: [cairn, reference, ceremony, audit, frontmatter, template]
timestamp: 2026-08-26T00:00:00Z
---

# Human and agent judgement records

These records turn an authorised judgement into an inspectable repository
object. Their shape and their binding — to a candidate, to a scope digest, to a
base — are mechanical; their reasoning is not.

Opening acceptance lives **in the path record**, under its own heading, on
every route. Closing is the transport's: on `pull-request` the request's
description is the review and its approval the acceptance; on `manual-git` the
two are one closing record in the path folder. The
[conformance page](./conformance.md) says what the reference tools read of
each.

## Opening acceptance

Recorded inside `project/coding-paths/CP-EXAMPLE-001/index.md`, under
`## Opening acceptance`, as one fenced YAML block:

````md
## Opening acceptance

```yaml
decision: accepted
accepted_by: participant-id
accepted_roles: [initiator, reviewer]
accepted_at: 2026-01-15T09:00:00Z
scope_ref: project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
scope_digest: sha256:9f2c4b1d5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c
```

Reviewed: route lightweight; definition of done, writes and overlap,
exclusions and governing documents accepted; initial writer participant-id.
Amendments: none.
````

The checker reads the last block under that heading and requires a `decision`
of `accepted`, an actor, a UTC time, a `scope_ref` naming a file and a heading,
and a `scope_digest` — a record declaring `running` without them fails its
schema. The prose beneath the block says what was reviewed and is not parsed.

### The scope digest

`scope_digest` covers the exact text `scope_ref` resolves to at the registration
commit: the named heading and its body up to the next heading of the same or
higher level, normalised for line endings and trailing whitespace, with no other
transformation. The algorithm is named in the value and the digest is never
abbreviated.

Compute it with the code that will verify it, never by hand:

```bash
node tools/cairn-check.mjs --scope-digest project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
```

A `sed | sha256sum` pipeline that looks equivalent is not: it includes the next
heading, skips the normalisation and omits the algorithm prefix, and the gate
then reports at closure that the definition of done moved.

Without it, `scope_ref` is a mutable pointer: the definition of done can be
edited after acceptance, and every record still looks valid. Closing acceptance
re-computes the digest and refuses to proceed on a mismatch.

### Amending accepted scope

A scope change is not an edit. It is a second block under the same heading,
carrying the new digest, `supersedes:` naming the earlier acceptance's
`accepted_at`, and the reason. The earlier block stays; the last block is the
acceptance in force.

The repository defines who may accept. The reference checker proves the
decision, actor, time, scope reference and digest are present and well formed;
whether the actor was authorised is the host's governance to prove, and
`accepted_roles` is recorded, not validated.

## The closing review on `pull-request`

The request opened from the path branch to the trunk carries the review as its
description and the acceptance as its approval. The kit installs
`.github/pull_request_template.md` so every request starts in this shape, and
`npm run cairn-audit` prints it filled in for the current candidate:

````md
## Candidate

- path: CP-EXAMPLE-001
- candidate `C`: fedcba9876543210fedcba9876543210fedcba98
- base `T`, the trunk tip merged into the candidate: 0123456789abcdef0123456789abcdef01234567
- scope digest at `C`: sha256:9f2c…; equals the opening acceptance: yes

## Coherence

- [x] Does the diff contradict an accepted decision? No — …
- [x] Does it duplicate something another running path is building? No — …
- [x] Did it introduce architecture that belongs in a decision record and has none? No — …
- [x] Is anything now documented in two places that will drift apart? No — …

## Advisories at `C`

- `scope-drift` — accepted: the wider root cause is declared in `writes:` at this commit.
- `record-date` — deferred to participant-id, CP-EXAMPLE-002.

## Roles

- reviewer: participant-id, holding the roles reviewer and integrator on this path
````

The reference checker reads none of this: the forge holds it, shows who
approved, and merges only with `cairn-check` green on the exact commit that
lands. What the checker proves from Git is the candidate, its closure surface,
the opening digest against the definition of done, the absence of provisional
commits, and the trunk delta since `T`.

## The closing record on `manual-git`

Filename, inside the path folder and named after the candidate it binds:

```text
project/coding-paths/CP-EXAMPLE-001/closing-<full-subject-object-id>.md
```

`npm run cairn-audit` scaffolds it. Template, filled:

````md
---
type: Cairn Closing Record
title: CP-EXAMPLE-001 — closing of fedcba9
timestamp: 2026-01-15T14:30:00Z
cairn:
  path: CP-EXAMPLE-001
  branch: path/cp-example-001
  subject_commit: fedcba9876543210fedcba9876543210fedcba98
  base: 0123456789abcdef0123456789abcdef01234567
  accepted_by: participant-id
  accepted_roles: [reviewer, integrator]
  accepted_at: 2026-01-15T14:30:00Z
  decision: accepted
  scope_ref: project/coding-paths/CP-EXAMPLE-001/index.md#definition-of-done
  scope_digest: sha256:9f2c4b1d5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c
  advisories_at_candidate: [scope-drift, record-date]
  advisory_disposition:
    - rule: scope-drift
      disposition: accepted
      reason: the wider root cause is declared in writes: at this same commit
    - rule: record-date
      disposition: deferred
      reason: the step carries the date its work started, and says why
      owner: participant-id
      follow_up: CP-EXAMPLE-002
  verdict: clean
---

# CP-EXAMPLE-001 — closing of fedcba9

## Findings

### Does the diff contradict an accepted decision?

No. Evidence: …

### Does it duplicate something another running path is building?

No. Evidence: …

### Did it introduce architecture that belongs in a decision record and has none?

No. Evidence: …

### Is anything now documented in two places that will drift apart?

No. Evidence: …

## Decision

Candidate accepted for administrative closure and exact integration.
````

### What the record binds

| Field | Binds |
| :-- | :-- |
| `subject_commit` | the exact result; MUST equal the record's own filename and the path's `subject_commit` |
| `scope_digest` | the accepted definition of done, re-computed at `C`; MUST equal the opening digest |
| `base` | the trunk tip merged into the candidate — stated for the reader; the checker derives it as the merge-base |
| `accepted_roles` | which roles this actor held, so a collapse is visible |
| `advisories_at_candidate` | the advisory rules raised at `C`, attested by the reviewer |
| `advisory_disposition` | one entry per advisory in that attested set: `fixed`, `accepted`, or `deferred` with `owner` and `follow_up` |
| `verdict` | one of `clean`, `drift noted`, `needs a conversation`, possibly qualified |

The checker requires the record to exist for exactly `C`, to carry actor, time,
decision, scope reference and digest, to name a verdict from the vocabulary and
answer at least one question — a missing record, an untouched scaffold and a
hollowed-out one must not look the same — and requires the dispositions to
cover exactly the attested set. `A` is field-restricted, so its advisory set is
a strict subset of `C`'s: any advisory that fires at `A` and is missing from the
attested set proves the attestation incomplete.

Allowed verdict stems are `clean`, `drift noted`, and
`needs a conversation before merge`. If a finding changes implementation,
create and review a new candidate. The object-id length above is SHA-1's forty
characters; a SHA-256 repository writes sixty-four in the same field and the
same filename.

## Immutability and correction

Once created, a closing record is immutable. A factual correction
creates a new uniquely named record that identifies and supersedes the earlier
record. It never edits history into a more convenient shape.

Return to [closing one exact candidate](../index.md#close-one-exact-candidate)
or open [closing acceptance](../concepts/closing-acceptance.md).
