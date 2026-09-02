<!-- Cairn closing review. On pull-request transport this description IS the
coherence review of one exact candidate and the approval IS the closing
acceptance. `npm run cairn-audit` prints this shape filled in for the current
candidate. The checker proves the candidate, its closure surface, the opening
digest and the trunk drift from Git; it reads none of the text below, which is
what the approver reads. -->

## Candidate

- path: CP-<ID>
- candidate `C`: <full object id>
- base `T`, the trunk tip merged into the candidate: <full object id>
- scope digest at `C`: <output of node tools/cairn-check.mjs --scope-digest <record>#definition-of-done>; equals the opening acceptance: yes | no

## Coherence

- [ ] Does the diff contradict an accepted decision?
- [ ] Does it duplicate something another running path is building?
- [ ] Did it introduce architecture that belongs in a decision record and has none?
- [ ] Is anything now documented in two places that will drift apart?

## Advisories at `C`

Every advisory `cairn-check` raised at the candidate, each fixed, accepted, or
deferred to a named owner and follow-up; or *none*.

## Roles

- reviewer: <who approves>, holding the roles <initiator | writer | reviewer | integrator> on this path
