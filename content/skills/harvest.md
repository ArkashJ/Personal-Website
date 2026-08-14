---
name: harvest
description: Turn a session's mistakes into executable guards — scripts and build-failing tests, not another doc nobody reads
---

# /harvest

Harvest the learnings from this session (or a named range of work) and convert them into
**things that run**. A lesson written into a document is a lesson that decays; a lesson written
into a test is a lesson that fails a build.

`$ARGUMENTS` may name a scope (a PR range, a date, an issue, "this session"). Default: this session.

## Why this exists

The harvest that produced this command found **nine** defects in one session that shared a single
shape: **a check that reported success without having checked.**

- `os.MkdirAll` returns nil on a directory that already exists, whatever its ownership — so a
  retention feature "worked" for two days while not one file was ever stored.
- `waitForLoadState(...).catch(() => undefined)` discarded its own timeout, so a navigation helper
  returned onto a still-compiling page and reported success.
- `toBeHidden()` passed on content that is unmounted until opened — it passed on a page where the
  entire control did not exist.
- CI ran 1 test spec of 9 and called the suite green while it was 31 tests red.
- `| tail` and a trailing `echo` laundered exit codes, twice, in front of two different people.
- An ANSI-prefixed `31 failed` was invisible to a grep that matched `124 passed` — a clean,
  plausible, **half** answer.
- A content guard's _scope_ excluded the one document that was wrong.
- A runbook comment claimed a gitignored file would protect you.

Three were written by the person harvesting them. Two were inside documents whose entire purpose
was preventing the thing they got wrong. **Documentation stopped none of them.**

That is the yield you are looking for. Not "we should be careful" — a command that cannot lie.

## Method

### 1. Gather the raw material — all of it, untruncated

Do not work from memory; memory keeps the story and drops the mechanism.

```
git log --oneline <range>                      # what actually landed
gh pr list --state merged --limit 30           # and what was reviewed
```

**Read every INLINE review comment, not just the top-level reviews.** They are a different API
and they are where the specific findings live:

```
gh api "repos/<owner>/<repo>/pulls/<n>/comments" --jq '.[] | "\(.path):\(.line) \(.body[0:300])"'
```

Count them first and state the total. In the session that produced this command, 15 inline
comments existed and 11 had never been read — including two P1s — because `gh pr view --json
comments` does not return them.

Also mine: your own corrections mid-session, anything you said and then retracted, every "actually,
that's wrong", and every command you had to run twice.

### 2. Classify by mechanism, not by feature

Group by **how the failure hid**, not what it touched. Features are unique; mechanisms repeat.
"Three bugs in the export panel" teaches nothing. "Three checks that passed on absent input"
generates a guard that catches the fourth.

For each item, answer:

- **What reported success?** The specific call, flag, or line.
- **What did it not examine?**
- **What would have caught it?** If the answer is "reading more carefully", you have not found
  the mechanism yet. Keep going.

### 3. Rank by wasted time, not by severity

The goal is preventing recurrence, so rank by what the mistake **cost** — hours burned, wrong
conclusions published, work redone. A P3 that wasted four hours outranks a P1 caught in a minute.

### 4. Build. Prefer, in order:

1. **A script that makes the right thing easier than the wrong thing.** People do not adopt
   discipline; they adopt convenience. If the safe command is longer than the unsafe one, the
   unsafe one wins forever.
2. **A test that fails the build.** Source scans are legitimate — some defects live in how
   verification is _written_, where no runtime assertion can see them.
3. **A comment at the exact call site**, stating the mechanism and _why the obvious fix is wrong_.
4. **A doc.** Last resort. Nothing above was prevented by a doc.

Every artifact must carry **the incident that produced it**, concretely, with the real numbers.
`// don't swallow timeouts` gets deleted by the next person. `// this discarded its own timeout
and a retention feature silently did nothing for two days` does not.

### 5. Prove each guard bites

**A guard that has never failed is indistinguishable from one that cannot fail** — which is the
very defect class you are harvesting. For each one: break the thing it guards, watch it fail,
restore, watch it pass. Report both observations. If a guard passes on first write, be suspicious
of it rather than pleased.

Against an _intermittent_ failure a single green run proves nothing — reproduce the **mechanism**
instead (shrink a timeout, force the error branch, point it at a surface where the thing genuinely
does not exist).

## Deliverable

1. A short table: mechanism → instances → artifact built → proof it bites.
2. The artifacts, committed.
3. **What you chose not to build and why.** A harvest that produces nine guards for nine incidents
   has probably built noise; the mechanisms should collapse into far fewer.

## Rules

- Include your OWN mistakes, first and in detail. A harvest that only indicts other people's code
  is a performance. The most valuable entries are the ones where the harvester was wrong.
- Never claim a guard works because you wrote it carefully. Show it failing.
- Do not write a guard whose failure message does not say what to do next.
- Do not turn a one-off into a framework. If a mechanism occurred once and cost ten minutes,
  a comment is the correct artifact.
- Never let the harvest itself launder a result: read exit codes without a pipe, strip ANSI before
  grepping any pass/fail count, and state untruncated totals before any conclusion.
