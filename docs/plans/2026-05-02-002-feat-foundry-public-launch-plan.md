---
title: 'feat: Foundry Public Launch — Open-Source benmore_website + Foundry CLI'
type: feat
status: active
date: 2026-05-02
---

# feat: Foundry Public Launch — Open-Source benmore_website + Foundry CLI

## Summary

This plan covers making the Benmore Foundry development engine publicly accessible. "The Foundry" encompasses two surfaces: (1) the Benmore marketing/product website (`benmorewebsite/`) which showcases the Foundry to prospective clients, and (2) the Foundry CLI itself (currently an internal tool). The plan covers credential scrubbing, OSS licensing decision, README polish, GitHub repo setup, landing page addition, and the personal site integration on arkashj.com.

**Target repo:** `../benmorewebsite/` (Django 5.1, proprietary license per README badge)

---

## Problem Frame

The Foundry is one of Arkash's most significant O-1 evidence pieces — Employee #2, 887% revenue growth, built the internal development engine. Currently:

- The benmore_website repo is proprietary (no public GitHub)
- The Foundry CLI is undocumented externally
- arkashj.com's `/work` page mentions Foundry but has no public link to land on

Making it public creates: a linkable artifact for the O-1 application, a public signal of the tooling quality, and potential inbound interest from SMB clients.

---

## Requirements

- R1. All secrets and internal credentials are scrubbed from the repo before any public push.
- R2. An OSS license is chosen and applied (or an explicit decision to stay proprietary-public is made).
- R3. README is written for a public audience (not just internal devs).
- R4. A public GitHub repo is created and the website code is pushed.
- R5. arkashj.com `/work` and `/projects` pages link to the public repo.
- R6. A Foundry landing page or section exists on benmore.tech (or a `/foundry` route).

---

## Scope Boundaries

- The Foundry CLI (the internal `bm` / Benmore-Meridian tooling) is a separate codebase — this plan covers the Django website repo and the external Foundry narrative, not the Meridian CLI internals.
- No database migrations or production data is pushed publicly.
- benmore.tech production deployment is not changed by this plan — only the source repo visibility.

### Deferred to Follow-Up Work

- Open-sourcing the Foundry CLI itself (separate repo, separate plan)
- ProductHunt / HN launch post — marketing is out of scope here

---

## Pre-Flight Credential Audit (U1 — MUST do before any public push)

Search the entire repo for secrets using these patterns:

```
SECRET_KEY
DATABASE_URL
OPENAI_API_KEY
BEEHIIV_
RECAPTCHA_
AWS_
STRIPE_
SENDGRID_
password =
token =
```

Every match must either:

- Be in `.env` (gitignored — verify `.gitignore` covers `.env`)
- Be in `settings.py` as `os.environ.get(...)` with no hardcoded fallback
- Be in `.env.example` with dummy values only

Verify `git log --all --full-history -- "*.env"` shows no `.env` file was ever committed.

---

## Implementation Units

- U1. **Credential scrub and gitignore audit**

**Goal:** Verify zero secrets are in git history or working tree.

**Files:**

- Read: `.gitignore`, `benmore_website/settings.py`, `.env.example`
- Run: `git log --all --oneline -- "*.env"` — must return empty
- Run: `grep -rn "SECRET_KEY\s*=" --include="*.py"` — must only show `os.environ.get()`

**Approach:** Manual audit + `git-secrets` or `truffleHog` scan if available. If any secret found in history, use `git filter-repo` to scrub before pushing.

**Test scenarios:**

- `git log -- .env` returns empty
- `settings.py` has no hardcoded secret values
- `.env.example` contains only placeholder strings like `your-secret-key-here`

**Verification:** `truffleHog` (or equivalent) scan returns zero findings.

---

- U2. **License decision and application**

**Goal:** Apply a license file appropriate for public visibility.

**Files:**

- Modify: `LICENSE` (currently exists with "proprietary" badge)

**Approach:**

- If goal is open-source: MIT or Apache 2.0 (recommended for portfolio/visibility)
- If goal is source-available but not OSS: Business Source License (BSL) or "All Rights Reserved" with public visibility
- **Recommended for O-1 purposes**: MIT — maximises visibility signal; the Foundry narrative is the IP, not the template code
- Update `README.md` license badge from `proprietary` to chosen license

**Test scenarios:**

- Test expectation: none — document change

**Verification:** LICENSE file present, README badge updated.

---

- U3. **README rewrite for public audience**

**Goal:** Polish README for a developer/client audience, not just internal use.

**Files:**

- Modify: `README.md`

**Approach:**

- Current README is well-structured but internally focused
- Add: "Built by Arkash Jain at Benmore Technologies" attribution with link to arkashj.com
- Add: "The Foundry" section — what it is, what it accelerates, how to run locally
- Trim: internal deployment notes that reference production infra
- Keep: tech stack table, architecture overview, development setup instructions
- Add: "Contributing" pointer (CONTRIBUTING.md already exists)

**Test scenarios:**

- Test expectation: none — document change

**Verification:** README renders correctly on GitHub; no internal URLs or credentials remain.

---

- U4. **GitHub repo creation and push**

**Goal:** Create a public GitHub repo and push the scrubbed code.

**Approach:**

- Repo name: `benmore-website` or `foundry-website` (discuss with Benmore team)
- Org: personal (`ArkashJ`) or Benmore org (preference: Benmore org for company signal)
- Push with: `gh repo create benmore/benmore-website --public --source=. --push`
- Add repo link to arkashj.com `/work` page for the Foundry entry

**Test scenarios:**

- Test expectation: none — infrastructure action requiring user confirmation

**Verification:** Repo is publicly visible at `github.com/[org]/benmore-website`.

---

- U5. **arkashj.com work page update**

**Goal:** Add public repo link to the Foundry entry on `/work` page.

**Files:**

- Modify: `lib/data.ts` — WORK_TOOLS Foundry entry: add `href` pointing to the new public GitHub repo

**Approach:**

- Add `href: 'https://github.com/[org]/benmore-website'` to the Foundry entry
- Ensure the Card on `/work` becomes clickable (covered by U4 of the main revamp plan)

**Test scenarios:**

- Happy path: Foundry card on `/work` links to public GitHub repo

**Verification:** Foundry card is clickable and navigates to correct repo URL.

---

## Risks & Dependencies

| Risk                                       | Mitigation                                                   |
| ------------------------------------------ | ------------------------------------------------------------ |
| Secret in git history                      | Run truffleHog before any push; use git filter-repo if found |
| Production config exposed                  | All prod config must be in env vars; verify settings.py      |
| Benmore team hasn't approved open-sourcing | Confirm with Benmore stakeholders before U4                  |
| db.sqlite3 in repo root contains real data | Add `db.sqlite3` to `.gitignore` and `git rm --cached` it    |

---

## Sources & References

- Target repo: `../benmorewebsite/`
- README: `../benmorewebsite/README.md`
- Settings: `../benmorewebsite/benmore_website/settings.py`
- arkashj.com work page: `lib/data.ts:WORK_TOOLS`
- CONTRIBUTING: `../benmorewebsite/CONTRIBUTING.md`
