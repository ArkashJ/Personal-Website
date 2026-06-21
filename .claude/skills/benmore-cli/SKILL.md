---
name: benmore-cli
description: Use whenever the user is building, editing, debugging, or shipping a Benmore app from the terminal (with the `benmore` CLI). Triggers on tasks like "scaffold a tracking app", "add a contacts page", "make a flow that publishes a post", "the form isn't saving", "why is /api/x 404ing", "look at the logs", "roll back", "set the Stripe key", "go live". This skill is the operating manual for the cloud-only workspace flow: edits ship to the deployed app automatically via save-on-edit hooks; the live URL is the dev environment.
---

# Benmore - building apps from the CLI

You're driving the `benmore` CLI on the user's machine. Benmore is a single Go binary that hosts TSX-by-default apps with auto-CRUD, auth, real-time, audit, email, cron, and an embedded esbuild compiler that turns `static/*.tsx` into `/static/*.js` on the fly. The user's local directory at `~/Benmore/<app>/` is a **cache** of the deployed app; every Edit/Write you make ships to the live deployment automatically. The live URL `https://<app>.benmore.ai/` is the dev environment.

There is no local SQLite, no node_modules, no build step, and no schema-drift problem. You edit `.tsx` files, the framework auto-compiles, you verify against the live URL, you iterate.

## The one-paragraph model

> **Schema in `schema.prisma`. Config in `app.yaml`. UI in TSX modules under `static/` (auto-compiled). Server logic (if any) in YAML hooks/flows/cron.** The framework runs SQLite + auth + auto-CRUD + real-time + audit + email + cron + esbuild + per-app typed SDK. You write the schema, the TSX modules, and a tiny config. Auto-CRUD on `/api/<table>` is enough for ~all apps - only write `flows.yaml` for custom logic. Import the typed `bm` SDK in TSX: `import bm, { type User } from 'bm'`. `bm.table('typo')` is a TypeScript error.

## Recent - through v2.7.167 (Jun 2026)

Newest first. Each has a dedicated `api({at:"<topic>"})` entry with the
full wire shape + snippet - **call `api` before building any of these.**

| Feature (version) | `api({at:…})` |
|---|---|
| Session replays are HUMAN-WATCHABLE (rrweb 2.0.1): typing renders per-keystroke, cursor glides in eased arcs, scrolls are smooth (new `{"do":"scroll","selector":...}` action), framework chrome (testing banner/cookie/feedback widget) auto-hidden, cross-origin iframes (YouTube etc.) captured, modern player UI + Watch-again. `benmore tool` now parses `[`/`{`-shaped values as JSON - `actions=[...]` works (was silently dropped) (v2.7.167) | - |
| Prisma `@@index([col, other(sort: Desc)])` now emits `other DESC` (pre-fix the qualifier leaked into the SQL identifier and the migration failed every boot); failed migrations keep ONE .failed file per distinct failure instead of one per retry; promote/refresh rsync excludes `*.failed` (v2.7.167) | - |
| `browser_check record:true` replays are self-contained: every image the session references (logos, doc previews, Google Maps tiles) is fetched server-side seconds after capture and baked in as a data: URI - immune to URL expiry/CORS/player sandboxing. Player skips the blank pre-boot frame (v2.7.167) | - |
| Flow `run: email` actually sends a body now: `template: <name>` resolves emails/<name>.html (hook semantics, + `data:` vars overlay), inline `html:`/`body:`/`text:` reach the provider, and a body-less/template-missing step fails LOUD instead of dying at the provider with 422 "Missing 'html' or 'text' field" (v2.7.165) | `flows` (email_step) |
| `member-of:room_members(room_id, member_id)` access mode - rows visible to MEMBERS of the row's room/channel/project; framework emits the EXISTS guard on every surface + auto-joins the creator on parent creates. Replaces hand-written `read: off` + EXISTS-in-every-flow (v2.7.164) | `access` |
| Tenant bootstrap: `groups.bootstrap` → `POST /api/_groups/create` (org + founding membership, one transaction); `groups.role_field` loads the member's in-tenant role into the session so `role:company_admin` access modes enforce tenant roles; group-key NOT NULL inserts return a guided 422 (v2.7.164) | `scoping` |
| `ws_rooms:` in app.yaml - WS `join` on "room-:id"-pattern rooms requires a membership row; undeclared rooms unchanged (v2.7.164) | `websocket` |
| `benmore deploy [dir]` - create-on-first-run + push-all front door (CLI ≥0.1.8); `bm.flows.<wrong>` errors now LIST registered flows + snake/kebab aliases resolve; `demo-password` works on the fleet + no longer requires `features.testing`; full-HTML email templates allowed under `emails/`; schema push warns when a column name collides with protected fields (`role`, `password_hash`) (v2.7.164) | `flows`, `scoping` |
| Numeric-looking flow `:params` bind as NUMBERS - `WHERE :amt >= (SELECT SUM(...))` guards actually fire now (pre-fix TEXT binds made them always-true); no `CAST` workaround needed (v2.7.162) | `flows` |
| `benmore upload` returns a permanent `url` (302→fresh signed GET) alongside the expiring `read_url`; edge CSP allows `img-src` from the parent app's origin; `benmore probe` flags work in any position; upload_static accepts `static/`-prefixed paths (v2.7.162) | `uploads`, `edges` |
| `benmore use dev\|prod` pins the environment for ALL env-specific commands (push/sql/logs/restart/users/env/…); `--env` overrides per-call; `whoami` shows the pin. Env vars are scoped (shared/dev/prod) - dev & prod keep separate secrets. `set-password` no longer promotes to admin (use `--promote` to opt in) (v2.7.152) | `environments` |
| Dev/prod environments - apps build on a dev instance (`<sub>-dev`), `benmore promote <app>` ships code→prod, `benmore seed-dev <app>` adds a dev instance to an existing prod app, `--env prod` targets prod for logs/sql/etc (v2.7.152) | `environments` |
| `<include src="partials/head.html" />` works on the HTML/TSX stack - share `<head>`/nav/footer across pages, edit once (resolves under `static/`) (v2.7.147) | `frontend` |
| Public flows read `?query`/body params with NO auth (`auth: none`); `if:` not `when:`; bare-boolean `if:` works (v2.7.120) | `flows` |
| Edges (pastes): `benmore edge new\|list\|open\|delete\|lock\|unlock` - self-contained HTML at `edge-<slug>.benmore.ai`, isolated origin + `window.bm.sql`/`bm.api` shims (`paste_*` MCP tools) | `edges` |
| `benmore push a.tsx b.css c.yaml` - multi-file in one command (was dropping all but the first) (v2.7.119) | - |
| Compute outputs: `${{ id.field }}` / `${{ steps.id.outputs.field }}`; function must return every field you read (v2.7.67+) | `compute` |
| `/pdf/<page>` needs Chrome on host (501 if absent) + renders SSR, not client TSX | `pdf` |
| Owner-or-elevated reads need a secure flow (access: is single-axis) | `access` |
| Platform media on an isolated CDN - uploads served from a separate cookieless origin, kind=private signed, fleet default (v2.7.126-130) | `uploads` |
| Component library expanded to ~65 (data/auth/governance/files/workflow/realtime/relations) (v2.7.75-78) | `components` |
| Per-record scheduling + approvals (v2.7.78) | `scheduling` |
| Declarative read/query layer - `POST /api/_query` (v2.7.77) | `query` |
| Schema-driven components - `import {DataTable} from 'sdui'` (v2.7.70) | `components` |
| `/api/_schema` per-user descriptor (v2.7.69) | `components` |
| Flow `inputs:` block - typed body + `FlowForm` (v2.7.69) | `flows` |
| `run: compute` - server-side JS via goja (v2.7.67) | `compute` |
| `bm.html` / `bm.raw` - XSS-safe template (v2.7.66) | `frontend` |
| `bm.table.before` - read/write interceptors (v2.7.65) | `frontend` |
| Tailwind-by-default + `components.tsx` (v2.7.62) | `frontend` |
| Nullable DateTime → JSON `null` (v2.7.60) | `frontend` |
| Multi-role RBAC + tenant-scoped grants (v2.7.54/59) | `rbac` |
| Blind-index equality search (v2.7.55) | `encryption` |
| Numeric-column encryption (v2.7.57) | `encryption` |
| `role:a,b` + `perm:res.action` access modes (v2.7.54) | `access` |

Earlier primitives still worth `api({at:…})` before hand-rolling:
`count`, `presence`, `cache`, `markdown`, `optimistic`, `live-scoped`,
`success_when`, `auto_memberships`, `recovery`.

## How the workspace works

The directory at `~/Benmore/<app>/` is **a cache of the deployed source**, not a local dev environment.

1. You Edit/Write a file under the workspace.
2. **PreToolUse hook** fires `benmore validate-write` against the new content. The validator returns the corrected shape inline if the file is wrong; the write is blocked until you fix it.
3. **PostToolUse hook** fires `benmore push` once the write succeeds. The file ships to the server, the server validates again, writes it into the live app, and hot-reloads.
4. The live app at `https://<app>.benmore.ai/` reflects the change within ~500ms-1s (in-process hot-reload - static/YAML/env writes never restart the process).

The hooks fire automatically - you don't run `benmore push` or `benmore validate-write` by hand unless the hook config is missing. Just edit; the rest happens.

**Test mode vs live.** When `features.testing: true` in `app.yaml`, the framework injects an amber banner + visitor feedback widget on every page. That's the dev posture. To "go live", flip `features.testing: false` and save - that single edit ships and removes the banner.

## First touch on a NEW app

Before you write any frontend code, do three things:

1. **Ask the user for a design style if they haven't told you.** Concrete:
   "What look should I aim for? (e.g. Linear / Stripe-clean / Notion-warm /
   minimal black-and-white / something specific you have a screenshot of)"
   Don't guess. The scaffold ships with a generic theme - every app
   that doesn't get a deliberate visual direction ends up looking like
   every other scaffold. Ask once, then commit to it across every page.

2. **Rewrite the scaffolded landing page.** `static/index.html` from
   `create_app` is a placeholder, not a real page. Replace it with a
   genuine landing page in the chosen style: hero, what-it-does in a
   sentence, primary CTA, the relevant secondary affordances. Don't
   ship the "Hello world" scaffold to the user.

3. **Redesign `static/login.html` and `static/signup.html`.** The
   scaffolded auth pages are functional placeholders - they POST to
   the right framework endpoints, but visually they're generic forms.
   Restyle them to match the landing page so the auth flow doesn't
   feel like a different app.

`static/styles.css` is yours. Themes in `app.yaml` are informational
for the HTML stack (you write your own CSS) - pick a coherent palette,
type scale, and component vocabulary, then use it everywhere.

## The build loop (concrete)

```bash
# 1. What apps does the user have?
benmore apps

# 2. The workspace at ~/Benmore/<app>/ is the cache. Read files normally with Read.
#    Edit/Write triggers validate-write + push automatically.

# 3. After a write, verify the live app.
curl -s https://<app>.benmore.ai/                       # served HTML (NOTE: this does NOT run the JS)
curl -s https://<app>.benmore.ai/api/notes              # auto-CRUD endpoint
curl -s https://<app>.benmore.ai/api/_docs              # OpenAPI spec for everything

# 3b. VERIFY THE FRONTEND for real - run it in a headless browser. curl/probe
#     only fetch HTML; they never execute your JS, so they can't tell you the UI
#     actually works. browser_check loads the page (JS executed), optionally
#     signs in, runs your script to click + inspect, and returns console output,
#     uncaught errors, failed requests, + (opt) a screenshot. THIS is how a CLI
#     agent closes the loop on a UI it just built.
benmore tool browser_check app=<app> path=/ script='return {rows: document.querySelectorAll(".row").length, err: document.querySelector(".error")?.textContent}'
benmore tool browser_check app=<app> path=/ as=<email>   # test an auth-gated page (mints a session)
# Real trusted clicks/keys + a screenshot need JSON args (a JS .click() is untrusted):
benmore tool browser_check --args-json '{"app":"<app>","path":"/","as":"<email>","actions":[{"do":"click","selector":"#add-btn"},{"do":"wait","ms":400}],"script":"return document.querySelectorAll(\".row\").length","screenshot":true}'

# 4. When something fails, check the server + the browser.
benmore logs <app>                                       # recent log lines
benmore sql <app> "SELECT * FROM notes LIMIT 5"          # inspect DB state
benmore errors <app>                                     # captured client + server errors (also via get_client_errors)

# 5. When you broke it, revert.
benmore git log <app>                                    # commit history (auto-committed on every push)
benmore git show <app> <sha>                             # diff for a commit
benmore git revert <app> <sha>                           # roll back to a known-good state
```

That's the whole loop. Edit, verify, debug, iterate.

## App layout

TSX-by-default since v2.7.21. The scaffold ships three `.tsx` modules
(`app.tsx` + `auth.tsx` + `notes.tsx`) modeling the canonical split.

```
<app>/
├── app.yaml          # config: theme, auth, features, access, roles, aggregates
├── schema.prisma     # data model - compiled to SQLite, migrations auto-applied on push
├── tsconfig.json     # paths: { "bm": ["./src/bm.d.ts"] }
├── src/
│   └── bm.d.ts       # AUTO-REGEN per-app TypeScript types - DO NOT edit
├── static/           # your frontend, served verbatim
│   ├── index.html    # → GET /  (importmap for 'bm' auto-injected)
│   ├── login.html    # → GET /login (clean-URL routing)
│   ├── signup.html
│   ├── app.tsx       # entry - orchestration only
│   ├── auth.tsx      # feature module - auth state + sign-out
│   ├── notes.tsx     # feature module - example CRUD on Notes
│   └── styles.css    # vanilla CSS
├── flows.yaml or flows/*.yaml   # optional: custom endpoints + pipelines
├── hooks.yaml        # optional: after-CRUD side effects
├── workflows.yaml    # optional: state machines
├── cron.yaml         # optional: scheduled jobs
├── computed.yaml     # optional: trigger-based computed columns
├── encrypted.yaml    # optional: field-level encryption config
├── retention.yaml    # optional: data retention TTL
├── emails/<name>.html # optional: email templates
├── i18n/<lang>.yaml  # optional: translations per language
└── env.yaml          # secrets - gitignored, NEVER bundled in deploys; set via `benmore env`
```

Nothing else. No `node_modules`, no `package.json`, no `data.db`
(lives server-side), no `migrations/` (auto-applied). The browser
loads `/static/app.js` - the framework JIT-compiles `static/app.tsx`
via embedded esbuild on every request (mtime-cached). `import bm from
'bm'` resolves at compile time via `tsconfig.json` paths and at
runtime via the import map injected into the served HTML. Don't
create files outside this tree.

`benmore new myapp --gotmpl` opts into the SSR scaffold instead
(mustache + Go html/template) - use that only for SEO-mandatory
marketing / blog / docs pages, not for authed app surfaces.

## The backend - `api(at:<topic>)` is the reference

Everything below the CLI layer - schema, config, auto-CRUD, the `bm`
SDK, auth, real-time, hooks, flows, encryption, RBAC - is documented in
ONE place: the `api` MCP tool. It returns the request/response schema, a
copy-paste snippet, and the gotchas for each topic, and it can EXECUTE a
call so you see the real response. The write-time validators
(`write_file` / `edit_file` / `benmore check`) teach the exact YAML/TSX
shape in-context on every wrong write. **Don't hand-build these from
memory - call `api` first.**

```
api({ at: "*" })                      → table of contents
api({ at: "table:notes" })            → CRUD routes + sample body
api({ at: "POST /api/notes" })        → schema + snippet + errors
api({ at: "POST /api/notes",
      call: { body: {…} } })          → execute it, see the real response
api({ at: "<topic>" })                → concept recipe (catalog below)
```

Topic catalog:

- **Frontend/SDK** - `frontend` (TSX, the full `bm.*` surface, Tailwind/`components.tsx`, `bm.html`/`raw`, `bm.table.before`, gotchas), `count`, `presence`, `cache`, `markdown`, `optimistic`, `live-scoped`
- **Auth/access** - `auth`, `csrf`, `mfa`, `oauth`, `scoping`, `access` (per-model modes incl. `role:a,b` + `perm:`), `rbac` (multi-role + tenant-scoped grants), `act-as`, `permissions`
- **Data** - `pagination`, `search`, `batch`, `ingest`, `idempotency`, `concurrency`, `locks`, `versioning`, `audit`, `encryption` (blind-index + numeric columns)
- **Server logic** - `flows`, `hooks`, `compute` (server-side JS), `workflows`, `async-flows`, `sql-dynamic`, `parse`, `success_when`, `auto_memberships`, `sign` (outbound auth), `verify` (inbound webhook sig)
- **Realtime/media** - `sse`, `realtime`, `websocket`, `webrtc`, `notifications`, `webhooks`, `uploads`, `signed-urls`, `pdf`
- **Ops** - `errors`, `recovery`, `observability`, `mobile`, `csp`, `environments` (dev/prod: build on the dev instance, `benmore promote` to publish, `benmore seed-dev` to add a dev instance to an existing prod app, `--env prod` to target prod)

The CLI-specific operating manual continues below - that's this skill's
unique job; the backend recipes above are not duplicated here on purpose.

## CLI command reference

The CLI is the single user surface. Every command works against the live deployed app.

### Auth + app management

```bash
benmore login                                # one-time interactive auth
benmore whoami [--json]                      # current identity
benmore apps [--json]                        # list your apps
benmore open [app]                           # print the app's URL (clickable; dev URL under `use dev`/--env dev)
benmore publish <app>                        # flip features.testing → false (go live)
benmore unpublish <app>                      # flip features.testing → true (back to dev)
benmore delete <app> --confirm               # delete an app (irreversible - confirm with user)
```

### File sync - the build loop

```bash
benmore pull <app> [target-dir]              # download deployed source as a workspace cache
benmore push <path> [<path>...] [--app NAME] # push one or MORE files (v2.7.119+); each finalized before the next, none dropped. PostToolUse hook pushes one file per edit
benmore validate-write <path> --content-from-stdin   # dry-run write; PreToolUse hook runs this
benmore delete-file <path> [--app NAME]      # remove a file from the deployed app (v2.7.31+) - auto-commits to per-app git, revertable via `benmore git revert`
```

`benmore push` is one-way: it copies a file UP to the deployed app. To DELETE a file from the deployed app, use `benmore delete-file` - pre-2.7.31 there was no path for this, and `rm` locally left the file live on the server (where it could shadow newer content, especially `.tsx → .js` JIT compiles).

You rarely run these by hand - the hooks fire on every Edit/Write. `benmore pull` is the one you'll run explicitly: at the start of a session, or to refresh a stale cache.

### Debugging the live app

```bash
benmore logs <app>                           # recent log lines
benmore tail [app]                           # follow logs (Ctrl-C to exit)
benmore health <app>                         # status snapshot
benmore audit <app>                          # audit log
benmore analytics <app>                      # request metrics
benmore errors <app>                         # client + server errors
benmore requests <app>                       # recent request log
benmore activity <app>                       # admin activity timeline
benmore usage <app>                          # per-user/per-scope usage metrics
```

### Database access

```bash
benmore sql <app> "SELECT * FROM notes LIMIT 5"      # read-only by default
benmore sql <app> "DELETE FROM bad_rows" --write     # mutations require --write
benmore createsuperuser <app> --email X --password Y # create or promote an admin
```

Confirm with the user before running `--write` SQL against prod data. Promotion (an existing user with matching email becomes admin) is non-destructive.

### Files / media

```bash
benmore upload <file> --app NAME [--kind media|feedback] [--type image/png]
benmore media <app>                          # list uploaded media
benmore media <app> delete <id>              # remove a media row
```

`benmore upload` does the full presign + PUT-to-S3 + confirm flow. Embed the `url` field - it's permanent (redirects to a fresh signed GET on every hit). `read_url` is a direct presigned S3 URL that EXPIRES in an hour - never embed it.

### Edges (pastes) - self-contained HTML at `edge-<slug>.benmore.ai`

```bash
benmore edge new <app> [--from-file path | --stdin] [--title T] [--password P]   # create; returns the edge-<slug> URL
benmore edge list <app>                       # all edges for the app (newest first)
benmore edge open <app> <slug>                # print the edge's URL (clickable)
benmore edge delete <app> <slug>              # soft-delete; frees the slug + kills the URL
benmore edge lock <app> <slug> --password P   # gate the public URL behind a demo password
benmore edge unlock <app> <slug>              # remove the password gate
```

An edge is verbatim HTML served at its **own isolated origin** (separate cookies/storage, strict CSP) - for docs, calculators, mockups, one-off forms. The framework injects `window.bm.sql` (in-browser SQLite), `window.bm.api(path)` (an anonymous edge→parent-app `/api/*` bridge; `signIn(scope)` for consented scoped access), and an analytics beacon. 200KB/edge, 25/app (free tier). MCP equivalents: `paste_create` / `paste_list` / `paste_get` / `paste_update` / `paste_delete`. Full recipe + security model: `api({at:"edges"})`.

### Environment variables

```bash
benmore env <app>                            # list (masked)
benmore env <app> set KEY=value              # set one
benmore env <app> set K1=v1 K2=v2            # set many
benmore env <app> unset KEY                  # remove
```

### Per-app git - the safety net

```bash
benmore git log <app> [--limit N]            # commit history (auto-committed on every push)
benmore git show <app> <sha>                 # diff for a commit
benmore git revert <app> <sha>               # roll back to a sha
```

Every push auto-commits to a per-app git repo on the server. Revert is your undo button.

### Visitor feedback (testing mode)

```bash
benmore feedback <app>                                    # list submissions
benmore feedback <app> --status open                      # filter by status
benmore feedback <app> show <id>                          # one submission + comments
benmore feedback <app> status <id> open|in_progress|resolved
benmore feedback <app> comment <id> <text...>
benmore feedback <app> delete <id>
```

Only relevant when `features.testing: true` - the framework injects a widget on every page for anonymous submissions.

### Custom domains + collaborators

```bash
benmore domain <app> <domain>                # add a custom domain (auto-SSL)
benmore collaborators <app>                  # list
benmore collaborators <app> add user@example.com
benmore collaborators <app> remove user@example.com
```

### Inspecting the live app surface

```bash
benmore api <app> [--at PATH] [--call body]  # describe + optionally exercise routes
benmore probe <app> <method> <path>          # live-fire a route, get rendered HTML / JSON
benmore probe <app> <method> <path> --as <email>  # mint a 5-min session for that user (v2.7.5+) - exercises auth: required flows without curl/cookies
benmore probe <app> <method> <path> --as <email> --keep-session  # ↑ but keep the session alive so the response's `session_cookie` field can drive follow-up curl/SSE/WS calls (v2.7.5+)
benmore describe <app> <subject>             # surface info (tables, flows, hooks, etc.)
benmore decode <app> <token>                 # decode a session/JWT for debugging
benmore restart <app>                        # full restart (v2.7.5+) - use when hot-reload can't fix it (DB handle wedged, env-var stuck)
```

### browser_check - drive + see the REAL frontend (headless browser)

`curl`/`probe` fetch HTML but never run your JS, so they cannot verify the UI. `browser_check` loads the page in a real headless Chrome (JS executed), and is far more than a fetch - it's a full interaction + inspection tool:

```bash
# Inspect: run JS after load, return whatever you want to assert.
benmore tool browser_check app=<app> path=/ script='return {rows: document.querySelectorAll(".row").length, err: document.querySelector(".error")?.textContent}'

# Auth: test a logged-in page (mints a short-lived session for that user).
benmore tool browser_check app=<app> path=/dashboard as=<email>

# DRIVE the UI with REAL trusted input + take a SCREENSHOT (use --args-json for the
# actions array). A JS .click() in `script` is UNTRUSTED (won't fire dblclick/focus);
# `actions` go through Chrome's input pipeline, so they behave like a real user.
benmore tool browser_check --args-json '{
  "app":"<app>","path":"/","as":"<email>",
  "actions":[
    {"do":"type","selector":"#title","text":"Test task"},
    {"do":"click","selector":"#add-btn"},
    {"do":"wait","ms":400},
    {"do":"dblclick","selector":".cell"},
    {"do":"key","key":"Enter"}
  ],
  "script":"return document.querySelectorAll(\".row\").length",
  "screenshot":true,
  "record":true
}'
```

- **`actions`** (run in order, before `script`): `{do, selector?, text?, key?, ms?}` where `do` = `click` · `dblclick` · `type` (types `text` into `selector`) · `fill` (set value) · `focus` · `key` (`Enter`/`Tab`/`Escape`/`ArrowUp/Down/Left/Right`/`Backspace`, or a single char) · `wait` (`ms`). These are TRUSTED events (real clicks/keystrokes), so they fire dblclick, focus, type-to-edit, etc. that synthetic JS clicks don't.
- **`script`**: an async function body run after the actions - `return` a JSON-able value to assert on; `await` allowed. Use it to read the DOM back.
- **`screenshot: true`**: returns a PNG; the CLI **saves it to a file and prints the path** (`📸 screenshot saved → …`). **Read that file** to actually SEE the rendered UI - the way to verify design/layout, or compare against a reference image.
- **`record: true`**: captures a scrubbable, **video-like session replay** of the whole run (initial DOM + every change your `actions` cause, via rrweb - the tech Microsoft Clarity uses). The CLI prints a `▶ session replay → <url>` link the **app owner opens (signed in to benmore.ai) to WATCH exactly what the agent did**. Great for showing the user the agent testing their app, or debugging/demoing a flow. A screenshot is a frozen frame; a recording is the whole sequence. The replay is for a human to watch - YOU still judge state via `script` + `screenshot`. Captures **multi-page** flows too (e.g. login.html → dashboard.html): the recorder re-arms on every document, so navigations are part of one continuous replay.
- **`share: true`** (implies `record`): also mints a **public, login-free share link** + an `embed_html` `<iframe>` snippet. The CLI prints `🔗 public share link → <url>` and the embed. **Paste `embed_html` straight into an edge** (`paste_create`/`paste_update`) for a shareable demo video of the flow - the edge CSP + the replay page's frame-ancestors are wired to allow it. Anyone with the link can watch (no account); inputs are masked at capture, so use it for demos, not for replays of sensitive data.
- **Returns**: `console` (logs/warnings), `errors` (uncaught exceptions/rejections), `failed_requests` (4xx/5xx + network failures), `script_result`, `text_snapshot`, the screenshot file, `replay_url`, and (with `share`) `share_url` + `embed_html`.

Use it after building any interactive UI: drive your primary actions with `actions`, read the result with `script`, fix every console error + failed request, `screenshot:true` + Read the file when design matters, and `record:true` when the user wants to watch the agent exercise the app. (Bound to the dev sandbox; it's a CLI/MCP tool - the hosted in-browser builder doesn't run it.)

**`--as <email>` is the right tool to verify a flow with `auth: required`.** Pre-v2.7.5 the anonymous probe always returned 401 on auth-gated routes, so agents created throwaway `/api/debug/<name>` flows without auth to exercise the real logic - and sometimes forgot to delete them. With `--as`: the platform mints a 5-minute session for the named user (must already exist on `_benmore_users` and not be deactivated), attaches the cookie, then deletes the session as soon as the probe returns. The named user can be any active account, including one you just made via `benmore createsuperuser`.

**`benmore restart` is for the rare wedge, not for content changes.** Every `benmore push` (file or env) triggers an in-process hot-reload - same listening socket, no process kill, no restart, cron timers preserved. Reach for `benmore restart` only when:
- Logs show repeated `file is not a database` / `disk I/O error` after a push (DB handle wedged on a deleted inode).
- The process is stuck on a startup-only env var the in-process map can't be rewritten with.
- A previous deploy left the unit in `failed` state and you need to clear it.

Restart cost is a 1-3 second socket re-bind window (NOT ~100ms as older docs claimed). Prefer in-process content reloads (a plain push) whenever you can.

**Auto-recovery from corrupt `data.db`** (v2.7.8+). When the per-app process boots, if `OpenDB` finds the file unreadable, it auto-restores from the most recent `pre-migrate-*.db` backup. The corrupt original moves to `data.db.corrupt-<timestamp>` for inspection.

**Last-resort recovery surface** (v2.7.37+) - when auto-recovery isn't enough:

```bash
benmore integrity-check <app>             # PRAGMA integrity_check report (read-only)
benmore restore <app>                     # list .benmore/backups/ entries with verdicts
benmore restore <app> --from <name>.db    # swap a specific backup in as live data.db (destructive)
```

`integrity-check` is safe to run alongside live traffic - the SQLite engine's structural-consistency walk. `restore --from` is destructive: rows committed since the chosen backup are lost. The previous data.db moves to `data.db.<timestamp>.bak` for post-mortem.

**Failed migrations no longer self-delete** (v2.7.8+) AND **migration generator is now idempotent against live drift** (v2.7.37+). The diff is reconciled against `PRAGMA table_info` before SQL is emitted - if the live DB already has the column / table / index the diff would add (manual ALTER, partial prior migration, etc.), the corresponding step is dropped from the migration. No more `duplicate column name` loops across restarts.

### Generic catch-all

```bash
benmore tool <name> key=val key=val ...      # call any tool by name
benmore tool <name> --args-json '{"k":"v"}'  # for nested args
```

When the user asks for something not covered by a named command, `benmore tool` is the escape hatch. Useful for new server features added between CLI releases.

## Common operations - recipes

Every recipe assumes the workspace is at `~/Benmore/<app>/` with hooks wired (Edit/Write → validate-write + push).

### Add a new table
1. Edit `schema.prisma`. Add the model with `userId`, timestamps, indexes. Save.
2. Migration auto-applies on the server.
3. Verify: `curl https://<app>.benmore.ai/api/<plural-name>` → `{rows: [], total: 0}`.

### Add a new page
1. Create `static/<name>.html`. Save.
2. Verify: `curl https://<app>.benmore.ai/<name>` or open the URL.
3. Add a link from `static/index.html` if you want it discoverable.

### Add a list + form for an existing table
1. Create `static/<plural>.html` with a form and a `<ul id="list">`.
2. Add JS that calls `api('GET', '/api/<plural>')` to populate the list and `api('POST', '/api/<plural>', {...})` on submit.
3. Wire `liveInvalidate('<plural>', refresh)` for real-time updates.
4. Save → curl the page → check it works.

### Add a custom endpoint
1. Create `flows/<name>.yaml` (single flow per file is clearest, or use `flows.yaml` for one).
2. Validator returns the right shape inline if anything's wrong.
3. Verify: `curl -X POST https://<app>.benmore.ai/api/<your-path>`.
4. If the response is a 500 with `failed_step: <id>` + `step_error: <msg>`, that's pinpointing the broken step.

### Add a side effect on a CRUD event
1. Add an entry under `on_insert:` / `on_update:` / `on_delete:` in `hooks.yaml`. Save.
2. Trigger the mutation (POST/PATCH/DELETE) and verify:
   - Email → check inbox or `benmore logs <app>` for `email:` lines.
   - Webhook → check the receiver.
   - SQL → `benmore sql <app> "SELECT ..."` to confirm the row changed.
   - Notify → `curl https://<app>.benmore.ai/api/_notifications` (authenticated).

### Add a state machine
1. Create `workflows.yaml`. Save.
2. New rows get the `initial:` state automatically.
3. Transition: `POST /api/<table>/<id>/transition` with body `{state: "newstate"}`.
4. Get allowed next states: `GET /api/<table>/<id>/transitions`.

### Schedule a job
1. Add to `cron.yaml`. Save.
2. The scheduler picks it up on the next loop (~60s).
3. Confirm via `benmore logs <app>` after the schedule fires.

### Create the first admin user
```bash
benmore createsuperuser <app> --email me@example.com --password 'a-strong-pw'
```
If the email already exists, the user is promoted to admin (non-destructive).

### Set up a secret
```bash
benmore env <app> set STRIPE_SECRET=sk_live_... RESEND_API_KEY=re_...
```
Service restarts; flows referencing `${{ env.* }}` pick up the new values immediately.

### Upload a file (media)
From the CLI:
```bash
benmore upload ./logo.png --app <app> --kind media
# → prints `url` (permanent - embed this) and `read_url` (presigned, expires in 1h)
```

From a page (use `bm.upload` - handles CSRF + auth attachment):
```js
import bm from 'bm';
const { path } = await bm.upload(fileInput.files[0]);
await bm.api.patch('/api/_auth/profile', { avatar_url: path });
```

Raw fetch form for non-SDK clients:
```js
const fd = new FormData();
fd.append('file', fileInput.files[0]);
const { path } = await fetch('/api/_upload', {
  method: 'POST',
  body: fd,
  headers: { 'X-CSRF-Token': CSRF },
  credentials: 'same-origin',
}).then(r => r.json());
```

### Add an OAuth provider (built-in: Google / GitHub / Microsoft)
1. Create credentials at the provider's developer console:
   - Google: https://console.cloud.google.com/apis/credentials
   - GitHub: https://github.com/settings/developers
   - Microsoft: https://portal.azure.com → App registrations
2. Register `https://<app>.benmore.ai/auth/<provider>/callback` as an authorized redirect URI.
3. Set the env vars: `benmore env <app> set GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=...`.
   That's the trigger - no app.yaml change needed. The framework auto-registers `/auth/google` and `/auth/google/callback` when both env vars are present.
4. Add a button to `static/login.html` pointing to `/auth/google` (or `/auth/github`, `/auth/microsoft`).
5. First sign-in by an email that already has a `_benmore_users` row links to that account; new emails get a fresh user row with the OAuth profile name pre-filled. Google verifies email ownership before returning it, so this link-by-email is safe.

### Inbound webhook from a partner
1. Add a `flows/<partner>-webhook.yaml` with a `verify:` block matching the partner's signature scheme.
2. Insert into your own table; rely on `UNIQUE(event_id)` for at-least-once idempotency.
3. Set the secret: `benmore env <app> set <PARTNER>_WEBHOOK_SECRET=...`.
4. Register the endpoint URL with the partner.

### Roll back a bad change
```bash
benmore git log <app>                        # find a good SHA
benmore git show <app> <sha>                 # confirm what's in it
benmore git revert <app> <sha>               # restore that state
```

### Going live
```bash
benmore publish <app>                        # flips features.testing → false in one shot
```
Equivalent to editing `app.yaml` and saving; the amber banner and feedback widget disappear. To go back to dev posture: `benmore unpublish <app>`.

Other go-live tasks (optional):
- Custom domain: `benmore domain <app> example.com`
- Collaborators: `benmore collaborators <app> add you@team.com`
- Mobile distribution: `benmore mobile <app>` (see below)

### Ship to the App Store / Play Store
Two layers of mobile distribution depending on how native you need to be:

**PWA (zero setup).** Set `pwa:` in `app.yaml` (name + icon + offline service worker) and the app is "Add to Home Screen"-installable on iOS + Android. No build step, no developer account, no review. Right answer for 80% of apps.

**Capacitor native wrapper.** When the App Store presence matters or the app needs native plugins (push notifications, camera, biometrics):
```bash
benmore mobile <app>                          # both iOS + Android in ~/Benmore/<app>-mobile/
benmore mobile <app> --platform ios           # iOS only
benmore mobile <app> --dir ~/repos/<app>-shell
```
The output is a working npm project that points Capacitor's WebView at the live `<app>.benmore.ai` URL - so frontend changes ship via the normal `benmore push` flow and the wrapper updates automatically. Only rebuild the wrapper if `capacitor.config.ts` changes (plugins, icons, splash).

After scaffolding:
```bash
cd ~/Benmore/<app>-mobile
npm install
npx cap add ios       # or android, or both
npx cap sync
npx cap open ios      # opens Xcode; Product → Run
```
Bundle ID is auto-derived as `ai.benmore.<slug>`. Edit `capacitor.config.ts` to override. The README in the scaffold has icon/splash + push-notification + store-distribution recipes.

### Add a privacy policy + terms of service (recommended before launch)
The framework does NOT ship default legal pages, and customer apps should NOT link to Benmore's policies - visitors of an app deployed on Benmore are visitors of that app, not benmore.ai. Two static pages to consider before any real users land:

**`static/privacy.html`** - disclose what the app collects. Minimum contents for an app using the framework's defaults:
- The framework sets an anonymous `_bm_vid` cookie on visitors who accept the cookie banner. It's used to count pageviews + session timing only - no third-party trackers, no cross-site tracking. Stored in the app's own database, never shared.
- If `auth.verify_email` or `auth.otp` is on: emails are sent via whichever provider is wired (Resend / Postmark / SMTP). Disclose the provider.
- If `auth.oauth.<provider>` is wired: the provider receives email + name from the user, the app receives email + name + provider user-id back.
- If the schema has user-supplied data tables, mention what's collected and how it's used.
- Standard boilerplate: data retention, right to deletion (`GET /api/_my-data` exposes the user's data; `DELETE /api/_auth/profile` deletes it), contact email.

**`static/terms.html`** - acceptable use, liability, account termination. The framework injects nothing terms-related into customer apps, so any TOS is purely the app owner's responsibility. At minimum: governing law, acceptable use ("don't abuse the service"), warranty disclaimer, limitation of liability, account termination conditions. For Benmore-hosted apps on `*.benmore.ai`, the Benmore platform TOS at `https://benmore.ai/terms` covers the hosting relationship - the app's own TOS covers the relationship between the app owner and its end users.

Link both from the app's footer + the signup page. `benmore check <app>` warns when `static/privacy.html` is missing (the GDPR check); a future check will do the same for terms.

**Don't fabricate a privacy policy from defaults.** A half-filled boilerplate is legally worse than no policy - generic disclosures look like they tried but didn't actually describe what the app does. If the app owner doesn't want to write one, leave the page out and accept the security-scan warning.

## Debugging - by symptom

### "The Edit/Write was rejected"
The PreToolUse validator caught a framework antipattern before the write landed. Read the validator's stderr - it includes the corrected shape inline. Common rejections:
- `flows.yaml`: `on:` and `jobs:` nested under a flow-name key. **They're file-level keys.** The jobs map key IS the flow name.
- `app.yaml`: unknown top-level key. The validator lists every accepted key + common fabrications.
- HTML files at app root: must live under `static/`. Move them.
- Reserved paths in `static/` (e.g., `static/api`, `static/_internal`).
- `INSERT … SELECT … FROM … ON CONFLICT` without `WHERE true` between FROM and ON CONFLICT.

Fix the file per the validator's diff and save again.

### "The push succeeded but the page is broken"
```bash
benmore logs <app>                           # server-side errors during render / mutation
curl -s -i https://<app>.benmore.ai/your-page    # full response with headers
curl -s https://<app>.benmore.ai/api/_errors     # client-side JS errors (auto-captured)
```

### "An endpoint returns 404 but the file exists"
- HTML files: must live under `static/`. `/contacts` maps to `static/contacts.html`, not `contacts.html` at app root.
- Asset extensions (`.js`, `.css`, `.png`, `.svg`, etc.) 404 hard - they don't fall back to `index.html`. Check the path matches what's on disk.
- API endpoints: `/api/<table>` requires a model in `schema.prisma` that pluralizes to `<table>`. Confirm via `curl https://<app>.benmore.ai/api/_docs`.
- Custom routes: confirm the flow registered via `benmore describe <app> flows`.

### "A flow is returning 500"
The response body includes `failed_step` + `step_error`. That's pinpointing the broken step.
- Failed `api` step → check the upstream URL is reachable, the auth recipe matches the upstream's expectation, the env vars are set (`benmore env <app>`).
- Failed `sql` step → `step_error` is the SQLite error verbatim. Common: syntax errors, missing columns, foreign-key violations.
- Empty `step_error` → flow shape is malformed; the file shouldn't have passed validation. Re-save to re-validate.

### "Data is wrong"
```bash
benmore sql <app> "SELECT * FROM <table> ORDER BY id DESC LIMIT 10"
```
For one-off fixes:
```bash
benmore sql <app> "UPDATE <table> SET col = '...' WHERE id = N" --write
```
Always confirm with the user before mutating prod data.

### "Auth is broken / users can't sign in"
- `app.yaml` has an `auth:` block with `identifier:` set?
- `static/login.html` POSTs to `/login` (not `/api/login`)?
- For Bearer flows: `POST /api/_auth/token` with JSON `{email, password}` returns `{token}`.
- Brute-force lockout: 5 failures → 15-min cooldown. Wait it out or clear via SQL:
  ```bash
  benmore sql <app> "DELETE FROM _benmore_login_attempts WHERE email = '...'" --write
  ```

### "CSRF errors on form submit"
- Page must be served from `static/` (not opened as `file://`).
- The token meta tag is auto-injected - `document.querySelector('meta[name="csrf-token"]').content` should be non-empty.
- Send it as the `X-CSRF-Token` header OR an `_csrf` form field.
- Bearer-auth requests don't need CSRF; check whether your client is using cookies or Bearer.

### "The email never arrived"
- Env vars set? `benmore env <app>` to confirm `RESEND_API_KEY` + `EMAIL_FROM`.
- Logs: `benmore logs <app> | grep -i email`.
- Template name matches a file under `emails/`? (`template: "welcome"` → `emails/welcome.html`).

### "I broke prod"
```bash
benmore git log <app>
benmore git revert <app> <good-sha>
```
Auto-commits are granular (one per push), so revert is precise.

### "What changed recently?"
```bash
benmore git log <app> --limit 20
benmore git show <app> <sha>
benmore audit <app>                          # mutations + who did them
benmore activity <app>                       # admin operations timeline
```

## Gotchas - things that bite agents

1. **`static/` is opaque.** No bundler, no JSX, no preprocessor. Whatever you write is what's served (plus the CSRF meta injection on `.html`).

2. **CSRF auto-injects only into `.html`** served from `static/`. JS modules and CSS files don't get it. Read it once from the page's meta tag.

3. **Protected fields stripped.** `user_id`, `role`, `password_hash`, `created_at`, `updated_at` get dropped from any client-submitted body. Don't pass them; the server sets them. `X-Stripped-Fields` response header lists what was dropped.

4. **Clean URLs map to `static/`.** `/contacts` → `static/contacts.html`. Unknown routes fall back to `static/index.html` (so JS routers work) **except** asset extensions, which 404.

5. **No `npm install`.** Don't create `package.json` or import from CDN. The framework embeds Tailwind / HTMX / Alpine / Chart.js / Lucide / Mermaid at `/_internal/*`. If you really want React, pull it from a CDN inside `static/index.html` - the framework treats `static/` as opaque.

6. **`features.testing: true`** shows an amber banner + visitor feedback widget. Disable to go live. Forgetting this is the #1 "looks unpolished in production" footgun.

7. **Email needs env vars.** `RESEND_API_KEY` + `EMAIL_FROM`. Or Postmark / SMTP equivalents. Set via `benmore env <app> set ...`, not by editing `env.yaml` and pushing it.

8. **`benmore sql --write` mutates prod.** Always confirm with the user before destructive SQL. Don't add `--write` to a query unless you've shown the user what will change first.

9. **`flows.yaml` shape** - `on:` and `jobs:` are file-level, NOT nested under a flow-name key. The job map key IS the flow name. Misnesting is the most common flow rejection.

10. **`sign:` lives inside `with:`** on `run: api` steps. Not at step level. Not on other step types.

11. **`mode: async` makes `respond:` / `redirect:` no-ops.** The HTTP response was already sent (202 Accepted) when the worker runs. Signal completion via the data layer (audit row, notification) for the client to read.

12. **SQLite UPSERT needs `WHERE true`** between FROM and ON CONFLICT clauses. The validator catches this; it's a SQLite parser quirk, not Benmore.

13. **Model name pluralizes** for the table + route. `Note` → `notes`. `Category` → `categories`. Trust the pluralizer; the validator confirms what the route will be.

14. **You don't need `login.html` to use auth - but the framework doesn't render one for you either.** It hosts the `/login` POST endpoint; if you don't ship `static/login.html`, visiting `/login` returns 404. Ship a static page with a form that POSTs to `/login`.

15. **Changes ship per-file via `benmore push`** (the PostToolUse hook runs it for you on every Edit/Write). There is no bulk deploy in this flow - edit, push, verify against the live URL.

16. **Don't edit `env.yaml` and push it.** Use `benmore env <app> set ...`. The push path doesn't include `env.yaml` and shouldn't - secrets stay server-side.

17. **`benmore delete <app> --confirm` is irreversible.** Always confirm with the user before running.

18. **Public flows DO read params without auth.** A flow defaults to public unless `auth: required`; with `auth: none` (or omitted), query/path/body params bind to `${{ params.x }}` for anonymous callers - public token endpoints (`GET /api/dr/:token`) work. If an anon request returns the app's HTML instead of your JSON, the path didn't match a registered flow (it fell through to the SPA catch-all, possibly CDN-cached) - make it a real flow route and verify with `probe_route` (hits origin). See `api({at:'flows'})`.

19. **Flow conditionals use `if:`, not `when:`.** A `when:` on a step is silently ignored, so the branch always runs (classic "my error branch keeps firing"). Bare-boolean works: `if: ${{ gate.ok }}` (v2.7.120+), as does `if: ${{ x }} == 'v'`.

20. **A compute step's output is `${{ id.field }}` / `${{ steps.id.outputs.field }}`** (both resolve, nested too) - but you can only reference a field the function actually RETURNED. Return every field you read (e.g. always include `error`), don't omit keys per branch. See `api({at:'compute'})`.

21. **`access:` is single-axis - it can't do "owner sees own, manager sees group, admin sees all."** For tiered row-scoping set `read: off` and expose a secure-read FLOW that branches the SQL WHERE on `${{ user.role }}`. See `api({at:'access'})` → owner_or_elevated_pattern.

22. **`/pdf/<page>` needs Chrome on the host** (501 if absent) and renders the SERVER-side HTML, not the live client TSX - a client-computed page prints empty. Render it server-side (gotmpl + `run: compute`) to capture the numbers. See `api({at:'pdf'})`.

18. **The user is the trust boundary.** Anything the user types into the editor that lands here, they meant to ship. But destructive CLI actions (SQL writes, revert, delete, env unset of a load-bearing key, domain changes) should be confirmed back - the user might not realize you interpreted "clean up the orders table" as "DROP TABLE orders".

19. **You have NO screenshot tool.** There is no `benmore screenshot`, no `take_screenshot` MCP tool, no headless-browser invoker in this environment. To verify rendered output, use `benmore probe <app> GET /` (returns the HTML body) or `curl https://<app>.benmore.ai/<page>`. If the user asks to "see" a page, fetch the HTML and describe what's there - or paste the URL and let the user open it.

20. **Paginate carrier-style fetches; never trust a one-shot `?limit=`.** When pulling from an upstream API that returns lists, use `run: api` with a `paginate:` block (v2.7.4+). The runtime loops the request until the upstream stops returning items, accumulates everything into `steps.<id>.outputs.items`, and the agent never has to write the loop manually. Pattern:

    ```yaml
    - id: customers
      run: api
      with:
        url: "${{ env.FW_URL }}/customers"
        sign: { recipe: bearer_token, token: "${{ env.FW_TOKEN }}" }
        paginate:
          strategy: cursor          # or "page"
          cursor_param: cursor      # query param to send the cursor in
          cursor_field: $.next_cursor   # JSON path to extract next cursor
          items_field: $.customers      # JSON path to the items array
          max_pages: 100            # safety cap (default 50)
    ```

    Hardcoding `?limit=500` silently drops data as the upstream grows past the cap - the framework's `paginate:` block is the only correct shape.

21. **`cron.yaml` accepts BOTH map shape and array shape, and supports `flow: <name>` references** (v2.7.3+). Use the map+flow shape when the cron job is a flow you've already defined:

    ```yaml
    sync_carriers:
      schedule: "every 15m"
      flow: sync_all                 # resolved against flows.yaml at fire time
    cleanup_stale:
      schedule: "@hourly"
      sql: "DELETE FROM sessions WHERE expires_at < datetime('now')"
    ```

    If the file exists but parses to zero jobs, the app logs a loud `WARN: cron.yaml at <path> parsed but yielded 0 jobs.` on startup - check `benmore logs <app>` first when a scheduled job isn't firing.

22. **Memory writes (`~/.claude/projects/*/memory/*.md`) are allowed and skipped by the validate-write hook** (v2.7.3+). The PreToolUse hook returns 0 silently when there's no app to validate against, so saving cross-session memory in this environment Just Works.

23. **If `validate-write` rejects Write, re-Write - do NOT fall back to Edit** (v2.7.4+). Validator rejections include a recovery footer telling you exactly this, but the muscle memory is "rejection → switch tools." Don't. Edit only modifies the block you reference; the rest of the file stays at its pre-rejection content (often the scaffold default). Re-Write with the fix applied. Many common violations are now auto-fixed transparently (password form missing `method="POST"`, UPSERT missing `WHERE true`) so you'll see fewer rejections in the first place.

24. **The Python `urllib` default User-Agent gets blocked by Cloudflare** with error 1010. If you're firing programmatic requests at a Benmore app (test scripts, webhook simulators), set `User-Agent: MyApp-Webhook/1.0` or any non-default UA. Most upstream services send one; ad-hoc Python scripts don't unless you set it explicitly.

25. **Per-integration secrets, not aliases** - the `sign:` recipe builtins (`hmac_sha256_body`, `bearer_token`) accept per-call params now: `secret:`, `token:`, `header:`, `prefix:`. Use `secret: "${{ env.PARTNER_A_SECRET }}"` instead of aliasing every integration's secret to `WEBHOOK_SECRET`. Each integration carries its own value.

26. **`benmore sql --write --confirm` for destructive SQL** (v2.7.4+). Same as `--write` alone but actually runs. Two-flag gate prevents up-arrow + ENTER accidents. Read-only `SELECT`/`WITH` still works without any flag. Schema-mutating DDL (`DROP TABLE`, `ALTER TABLE`, etc.) is rejected even with `--confirm` - go through `schema.prisma` + migrations for those.

27. **CREATE UNIQUE INDEX migrations precheck for duplicates** (v2.7.4+). If your schema adds `@unique` to a column with existing duplicate values, the migration fails with a structured error listing the duplicate groups (`customer_id=abc, count=3 rows`) instead of the generic "UNIQUE constraint failed" with no signal. Dedupe before re-applying - the suggested `DELETE FROM ... WHERE rowid NOT IN (SELECT MAX(rowid)...)` keeps the most recent row per group.

28. **Restart loops are detected and paused** (v2.7.4+). If the reload path fires more than 5 times in 60 seconds for the same app, the loop detector logs a loud WARN and skips further reloads for 60s. Bursts of file writes from the agent now also coalesce into one trailing-edge reload (5s after the last write) - so a build session with 20 writes triggers ONE reload, not 20. Eliminates the Cloudflare 502 storm.

29. **In-process hot reload - no more restart-induced 502s** (v2.7.4+). When the platform applies env changes or picks up new flow/cron/hook YAML, it reloads in-process instead of stop/start. The listening socket stays open; the new config is applied live; zero downtime. You should never see a Cloudflare 502 during agent edits anymore.

30. **WebSocket has TWO message families - don't conflate them.** `subscribe`/`unsubscribe` takes `tables: [...]` and pushes CRUD events (live invalidation). `join`/`leave`/`broadcast` takes `room: "..."` and fans out free-form payloads (chat, presence, WebRTC signaling). Both shapes coexist on the same connection. Sending `{type:'subscribe', room:'X'}` is silently no-op'd because `subscribe` doesn't read `room`. Call `api({at:'websocket'})` for both protocols' wire format + JS snippets.

31. **`features.ws_anonymous: true` opens `/ws` AND `/sse/events` to unauthenticated clients** (v2.7.4+). Default is the original auth-gated behavior - visitors need a session. Flip the flag in `app.yaml` to build public chat rooms, broadcast dashboards, transport demos. Same-origin + per-user connection-cap checks still apply.

32. **WebRTC video/audio over the framework's WS broadcast** - the WS room channel is the right signaling transport, and as of v2.7.10 it actually delivers cross-user. Pre-2.7.10 a scope-namespacing bug meant solo-auth users (apps without a `groups:` config) silently dropped every cross-user broadcast - earlier chat / huddle builds worked around it by routing signaling through a DB table (e.g. a `huddle_signals` table). **You no longer need that workaround.** Use `join` + `broadcast` directly; broadcasts fan out to every same-app receiver who joined the same room. Multi-tenant isolation (`groups:`) still applies. Pattern: each peer assigns itself a `PEER_ID`, broadcasts `{kind:'hello', from:PEER_ID}` on join, then exchanges SDP offers/answers/ICE candidates as `{kind:'offer'|'answer'|'ice', from, to, sdp|candidate}` (sender filters by `to === PEER_ID`). Mesh topology - N peers = N(N-1) connections. Fine for 2-4 viewers; past that switch to an SFU. No external signaling server needed; STUN via `stun:stun.l.google.com:19302` covers most NATs (add TURN for symmetric NAT).

    **Three gotchas that cause "first frame then freeze":**

    - **Use `ev.streams[0]` as `srcObject`, not a hand-rolled `MediaStream`.** If you create a fresh `new MediaStream()` per peer and add tracks individually, the browser renders the first keyframe then stalls when subsequent track activity doesn't match the SDP grouping. `pc.ontrack` gives you `ev.streams[0]` - that's the sender's exact stream with audio + video tracks grouped correctly.
    - **Buffer ICE candidates that arrive before `setRemoteDescription`.** Calling `addIceCandidate` before the remote description is set throws `InvalidStateError` and the candidate is dropped. The connection's initial handshake usually still works (host candidates from the offer are enough), but supporting candidates needed for sustained flow never reach the peer → video stalls. Queue early candidates in a `pendingIce[]` array, flush after `setRemoteDescription` lands.
    - **Implement perfect-negotiation for glare.** When both peers simultaneously call `createOffer` (e.g., both click "Share camera" at once), both `setRemoteDescription` calls fire in `have-local-offer` state and one side has to back off. Assign polite/impolite role by string-compare of peer IDs (`PEER_ID < otherPeerId` → polite). Polite peer rolls back its local offer and accepts the remote one; impolite peer ignores the incoming offer because the polite peer will accept theirs. Without this, glare half-kills the connection silently. Use `pc.onnegotiationneeded` to drive renegotiation instead of manually calling `createOffer` after `addTrack` - that way the browser's own state machine handles ordering.

33. **Middleware wrappers must implement `Hijack()` if they wrap the ResponseWriter** (v2.7.4+ fixed). `/ws` upgrade hijacks the raw TCP conn - any middleware wrapper that exposes only `WriteHeader`/`Write` (no Hijack pass-through) breaks WS with a silent 400 even though the request was a valid handshake. SSE works through the same wrappers because they wired Flush; WS broke because Hijack wasn't. Framework wrappers now all forward Hijack; if you write custom middleware that wraps `w`, add a Hijack method too.

34. **Need to display "user X said foo" / mention autocomplete / member list / chat sidebar?** Use `GET /api/_auth/users` (list) and `GET /api/_auth/users/{id}` (single lookup), added in v2.7.11. Returns every column from `_benmore_users` EXCEPT the sensitive ones (`password_hash`, `totp_secret`, `*_token`, `private_*`, `internal_*`) - same filter as `/api/_auth/profile`. Deactivated accounts are hidden (404 on direct lookup, omitted from the list) so a chat UI doesn't surface ghost users. Authenticated visitors only. **Don't invent a custom `get_user.yaml` flow per app** - that pattern routinely picks wrong columns, leaks email when it shouldn't, or skips the deactivated-account filter. Sample integration: load the user list once on page mount, build `byId[user_id] → user`, render `byId[msg.user_id]?.first_name` next to every message.

35. **`access:` block in app.yaml - declare per-table, per-op visibility.** (v2.7.12+) Replaces the implicit "infer-from-columns" model that used to auto-scope by `user_id` or group_key. Per-table per-op modes: `anon` (no auth required) · `everyone` (any authed) · `self` (owner only via user_id) · `group` (same group via groups: config) · `admin` · `role:<name>` · `off` (endpoint disabled). **DEFAULT IS PRIVATE** - tables without `user_id` and without the group_key column fall through to `admin` mode. Pre-v2.7.12 they were world-readable to all authed users.

    ```yaml
    # app.yaml
    access:
      default:                # global per-op fallback
        read:   admin
        write:  admin

      posts:                  # per-op explicit
        read:   anon          # public browsing
        write:  self          # owner-only writes
        update: self
        delete: admin

      messages: everyone      # shorthand: all ops, same mode (chat case)
      settings: off           # endpoint disabled entirely
      orders:                 # multi-tenant - same-org only
        read: group
        write: group
        update: admin
        delete: admin

      _benmore_users:         # user directory - special framework table
        read: group           # only same-org users visible; admins bypass
    ```

    Self-lookup on `_benmore_users` ALWAYS works regardless of mode (you can see yourself even when mode is `off`). When `read: anon` or `read: everyone` is set on a table that has `user_id`, the framework automatically drops the implicit owner-WHERE filter - you don't need to ALSO add `scopes.public_read_when`. Migration: existing apps that relied on `unscoped` tables being world-readable need to set `access.<table>.read: everyone` explicitly, OR they'll get 404s for non-admins.

36. **Chat-shaped tables (`messages`, `comments`, `posts`, anything everyone-reads-everyone-writes) need explicit scope override.** Default auto-CRUD owner-scopes any table with a `user_id` column - writes are owner-stamped, reads are filtered to the owner. For chat/forum/timeline shapes you want WRITES to stay owner-stamped (so the agent knows who said what) but READS to be public. Two options, both in `app.yaml`:

    ```yaml
    # Option A - declare the override on the table:
    scopes:
      messages:
        public_read_when: "1=1"          # readable by everyone
      comments:
        public_read_when: "status = 'published'"   # conditional

    # Option B - declare the whole table as "shared" (also drops owner-scoping on writes):
    database:
      mode: shared
      shared:
        - messages
    ```

    Option A is the right default for chat/comments (writes stay attributed). Option B is for pure broadcast tables (announcements, ticker feeds). **Without one of these, two users in the same channel can't see each other's messages** and the agent will think the database isn't persisting - a repeatedly-seen mistake in chat builds. Add the scope override BEFORE inserting test data, otherwise you'll see your own seeds and assume it works.

37. **The framework auto-busts `/static/*` cache on file mtime - don't add `?v=N` yourself.** `/static/*.js` and `/static/*.css` are served with `Cache-Control: public, max-age=31536000, immutable` so Cloudflare hits the edge for years. To keep that perf AND get fresh files after push, the framework rewrites every `<script src="/static/X.js">` / `<link href="/static/X.css">` in served HTML to `?v=<file mtime unix>`. The query changes the cache key automatically the moment the file changes on disk. You never need to bump a version manually. **Don't pre-add your own `?v=N`** - the rewriter is idempotent: URLs that already carry a query string are left untouched (so author-chosen versions are respected), but that means YOUR `?v=5` would PIN the URL and block the auto-bust.

38. **SSE events are NAMED, not default - use `addEventListener('change', …)`, NOT `onmessage`.** The framework emits CRUD invalidations as `event: change\ndata: {...}` - a named SSE event type. `EventSource.onmessage` only fires for events WITHOUT an `event:` line (default type), so it silently ignores every framework broadcast. Every chat / live-feed agent who wires `onmessage` and tests with one tab thinks SSE is dead. **Listen on both for safety:**

    ```javascript
    const es = new EventSource('/sse/events');
    const handler = (ev) => {
      const data = JSON.parse(ev.data);
      if (data.table === 'messages' || data.action === 'refresh') reloadMessages();
    };
    es.addEventListener('change', handler);   // ← REQUIRED - catches the framework's named events
    es.onmessage = handler;                    // ← belt-and-braces, no harm
    ```

    Payload shapes received: `{table:"messages", action:"insert"|"update"|"delete", id:<rowid>}` for owners + admins, `{table:"", action:"refresh"}` for non-owner subscribers (the "something changed, refetch your scoped list" hint). Verify end-to-end with `curl -N -H "Cookie: $COOKIE" /sse/events &` + a curl that mutates the table - you'll see the event stream on stdout. See `api({at:"sse"})` for the full contract.

39. **Prisma model name → table name is snake_case + pluralized.** `model Note` → table `notes`, API `/api/notes`. `model AdminLog` → table `admin_logs`, API `/api/admin_logs`. `model UserProfile` → `user_profiles`. **Not** `adminlogs`, **not** `AdminLog`, **not** `admin_log` (singular). Easy to get wrong because the model name in code is CamelCase singular but the URL is `snake_case_plural`. The 24h `benmore sql <app> "SELECT name FROM sqlite_master"` is the source of truth - run it once after the migration to read off the actual table names. Tied gotcha: when you hit a wrong URL like `/api/adminlogs`, the framework's SPA-fallback serves `index.html` (200 + HTML body) instead of returning 404 - so a `fetch()` looks like it worked, but `JSON.parse()` on the HTML throws and you spend an hour wondering why "the API returns nothing." Always confirm the URL with `describe_table` or by listing tables before wiring up the fetch.

40. **Native HTML forms need `action="<path>"` AND CSRF.** (v2.7.13+ auto-injects the CSRF hidden input; pre-v2.7.13 builds need you to add it manually.) A `<form method="POST">` with no `action` posts to the current URL (`/signup.html` → 404 because the framework's signup endpoint is `/signup`, no `.html`). Always set `action="/signup"` / `action="/login"` / `action="/api/<table>"` explicitly. CSRF: v2.7.13+ auto-injects `<input type="hidden" name="_csrf" value="…">` into every POST form in served static HTML - same mechanism as the meta tag. If you're on older framework OR doing fetch-from-JS, read the token from `<meta name="csrf-token">` and send it as `X-CSRF-Token` header (fetch) or as `_csrf` form field (native submit). Without it, the framework's CSRF validator redirects with `?error=Invalid+request` and the form silently appears to do nothing.

41. **Browser caches HTML across "broken app" states even with `cache-control: no-store`.** When you push a half-broken state (validator-rejected app.yaml, missing files, route 404), Chrome / Firefox can cache the resulting 404 / broken response and keep showing it after you've shipped the fix. Hard-refresh (`Cmd+Shift+R`) usually clears it. If not: open the URL in an **incognito window** (guaranteed fresh) or append a random query string (`?v=2`) to bypass any cache key. Verify the cache-control header is what you expect with `curl -sI <url> | grep -i cache`; the origin should always say `no-store` on HTML pages - if Cloudflare says `cf-cache-status: HIT`, purge the edge cache or wait for it to age out. Cloudflare ignores `Vary` headers on free plans and aggressively caches a 404 sometimes.

42. **`api({at:"<topic>"})` is the source of truth for backend contracts.** Whenever you find yourself guessing what shape `/api/<thing>` returns, what auth gates it, what CSRF token it needs - STOP and call the MCP `api` tool with the topic name (`api({at:"sse"})`, `api({at:"websocket"})`, `api({at:"access"})`, `api({at:"users"})`, `api({at:"csrf"})`, etc.). Each topic includes the exact wire format, JS snippets, gotchas, and `see_also` references. Reading it once at session start saves the agent from inventing wrong patterns mid-build (a single chat build can hit several of the above gotchas in sequence before realizing it should've started with `api({at:"sse"})`).

43. **TSX is the default; SPLIT into multiple files from day one.** (v2.7.21+, scaffold v2.7.25+) `benmore new` drops a 3-file split (`app.tsx` / `auth.tsx` / `notes.tsx`) modeling the canonical pattern. **Don't grow `app.tsx` into a god-file** - each feature gets its own `.tsx` module, the entry just orchestrates. esbuild bundles all imports from the entry into one ES module on every request; the network cost is identical to one fat file. Workspace layout:

    ```
    myapp/
    ├── static/
    │   ├── app.tsx          ← entry; orchestration ONLY (~20 lines)
    │   ├── auth.tsx         ← auth state + sign-out
    │   ├── notes.tsx        ← example feature module
    │   ├── posts.tsx        ← add new features as their own .tsx file
    │   ├── index.html       ← references /static/app.js (auto-compiled)
    │   ├── login.html
    │   └── signup.html
    ├── tsconfig.json        ← paths: { "bm": ["./src/bm.d.ts"] }
    ├── src/
    │   └── bm.d.ts          ← per-app types (auto-regen on push)
    └── schema.prisma
    ```

    Each feature module exports an init function the entry calls:

    ```tsx
    // static/posts.tsx
    import bm, { type Post } from 'bm';
    export async function initPosts(): Promise<void> {
      const posts: Post[] = await bm.table('posts').list({ limit: 50 });
      // … render, wire events, subscribe to bm.live('posts', …)
    }
    ```

    ```tsx
    // static/app.tsx - entry
    import { initAuth } from './auth.tsx';
    import { initPosts } from './posts.tsx';
    async function boot() {
      const me = await initAuth();
      if (!me) return;
      await initPosts();
    }
    boot();
    ```

    **When to add a new file:** a new feature, a new domain concept, anything past ~100 lines in app.tsx. The 3-file scaffold is the floor; complex apps end up with 10+ modules. Three-tier split (entry → feature → UI helpers) is common for non-trivial apps. The HTML's `<script type="importmap">{"imports":{"bm":"/_internal/bm.js"}}</script>` resolves the `'bm'` specifier at runtime; the TypeScript compiler resolves it to `src/bm.d.ts` for type-checking. Both happen automatically.

44. **`src/bm.d.ts` auto-regenerates on every push that touches schema.prisma / app.yaml / flows.yaml / workflows.yaml / hooks.yaml / flows/*.yaml / i18n/*.yaml.** (v2.7.22+) Don't edit it by hand - the next push will overwrite. The placeholder dropped at scaffold time only has the SDK surface; per-app types (Message, Post, AggregateName union, WorkflowMap, Role union, etc) land after the first schema push. If you ever need to force-regenerate: `curl https://<app>.benmore.ai/_internal/bm.d.ts > src/bm.d.ts`. The fingerprint header at the top of the file (`// schema: <hash>`) lets `benmore check` warn when the workspace copy drifts from the deployed schema.

45. **POST `/api/<table>` returns the FULL inserted row** (v2.7.33+), not `{id, status}`. Every defaulted column (`id`, `created_at`, `updated_at`, `like_count: 0`, `status: 'open'`, plus every column with a Prisma `@default(...)`) is in the response body. Use it. Pre-v2.7.33 every agent did `const {id} = await create(); const full = await get(id)` - that second hop is gone. The SDK's `bm.table('x').create({...})` returns the full row; raw `bm.api.post('/api/x', body)` returns the same shape.

46. **Use `bm.table('x').count()` - NOT `(await list()).length`** (v2.7.33+). The auto-CRUD list endpoint defaults to 50 rows. `(await bm.table('articles').list()).length` returns at most 50 forever, even when the table has 50,000 rows. Either ask for the true count (`bm.table('articles').count()` / `?count=true`) or pass `?per_page=N` (max 500) / a `?cursor=` for keyset pagination. "I see 50 but the DB has 693" is always this bug.

47. **For chat / feed / live-doc patterns, reach for the SDK primitive first** (v2.7.35-v2.7.37+). Seven patterns that chat agents used to re-write from scratch are all SDK calls now. **Before writing the hand-rolled version**, check:

    - Live list dedupe? → `bm.live.scoped('table', refreshFn, { debounce: 60 })` instead of hand-rolling generation-counter + debounce + visibility-on-focus.
    - "X currently viewing"? → `bm.presence(slug)` instead of heartbeat + pagehide + server-sweep machinery (replaces ~60-80 LOC).
    - Like / favorite / read-status optimistic UI? → `bm.api.optimistic({apply, request, snapshot, revert})` instead of try/catch + manual snapshot/revert.
    - Pre-paint cached shell? → `bm.cache.namespaced('shell', version)` (sessionStorage) or `.persistent(name, version)` (localStorage). Self-busting by version key.
    - Render user-typed Markdown? → `bm.markdown(text)` (lazy-loads ~2KB module). Don't pull in marked.js (~80KB).
    - Avatar / file upload? → `bm.upload(file)` → returns `{path}`; CSRF + auth attached.

    Each has a dedicated topic - call `api({at:"presence"})`, `api({at:"optimistic"})`, etc. for the wire shape + JS snippet.

48. **`success_when:` on `run: api` for upstream APIs that lie about success** (v2.7.37+). Many APIs (rss2json, several CRMs, payment providers) return HTTP 200 with `{"status":"error","reason":"..."}` in the body. Without `success_when:`, the error envelope ingests cleanly downstream and your upsert step lands bad data; the failure surfaces N steps later. Add a predicate:

    ```yaml
    - id: fetch
      run: api
      with:
        url: https://api.rss2json.com/v1/api.json?rss_url=...
        success_when: "${{ steps.fetch.outputs.json.status }} == 'ok'"
    ```

    When the predicate evaluates false the step errors with `api: success_when failed (<expr>)` and the flow envelope carries `failed_type: "api"` + a step-type-specific hint. v2.7.39 fixed a double-wrap bug where the GHA-normalized LHS picked up extra `{{...}}` layers; if you're seeing `template_unresolved` on a valid recipe, you're on a pre-v2.7.39 build.

49. **`auto_memberships:` in app.yaml - the chat/forum/channel "every user joins automatically" shortcut** (v2.7.35+). For a multi-channel chat where every active user is auto-added to every new channel, declare it in app.yaml and the framework synthesizes the on_insert hook for you - no hand-written `INSERT INTO <parent>_members SELECT id FROM _benmore_users WHERE ...` boilerplate:

    ```yaml
    # app.yaml
    auto_memberships:
      channels:                       # parent table (the thing being created)
        table: channel_members        # join table (default: <parent>_members)
        parent: channel_id            # FK column (default: <parent_singular>_id)
        members: all_users            # default; OR a SQL WHERE fragment ("role = 'editor'")
    ```

    Verify at app boot: `benmore logs <app>` shows `auto_memberships: channels → channel_members (auto-enrol active users on insert)`. Inserting a new parent row immediately enrols every active user. Call `api({at:"auto_memberships"})` for the synthesized hook shape.

50. **Last-resort recovery surface - `benmore integrity-check`, `benmore restore`, `benmore delete-file`** (v2.7.31-v2.7.37+). When auto-recovery on boot isn't enough:

    ```bash
    benmore integrity-check <app>           # PRAGMA integrity_check report (read-only, safe alongside live traffic)
    benmore restore <app>                   # list .benmore/backups/ entries with verdicts (size, age, integrity)
    benmore restore <app> --from <name>.db  # swap a specific backup in as live data.db (DESTRUCTIVE)
    benmore delete-file <path> [--app NAME] # remove a file from the deployed app; auto-commits to per-app git
    ```

    `integrity-check` is the SQLite engine's structural-consistency walk - `{ok: true, result: ["ok"]}` when fine. `restore --from` is destructive: rows committed since the chosen backup are lost; the previous `data.db` moves to `data.db.<timestamp>.bak`. `delete-file` is idempotent - second call returns `{ok:true, existed:false}`. v2.7.32+ also fixed the DB-malformed silent-corruption issue at its root (an early bug made every push do a full restart instead of an in-process reload). Combined with VACUUM INTO for pre-migrate backups + WAL checkpoint on shutdown, the "rows vanish after flow ends" narrative is dead.

## When to ask the user

The CLI loop is fast - try things, read errors, iterate. Don't stall on clarifying questions about file shape; the validator teaches you the right shape on the first wrong write. Do ask the user when:

- **The change is destructive.** `benmore sql --write` of a DELETE/UPDATE that touches >1 row, `benmore git revert`, `benmore delete`, `benmore env unset` of a load-bearing key.
- **The change affects auth.** Flipping `auth.require_verified`, changing `identifier`, swapping OAuth providers - these strand existing users if done wrong.
- **You're about to go live.** Confirm `features.testing: false` is what they want before saving.
- **There are 2+ reasonable shapes.** Schema with hard tradeoffs (denormalize vs. join table), role/scope mapping, choice of cron cadence. Ask once, then commit.

Otherwise: pick sensible defaults and ship. The git history is granular; revert is cheap.

## SSR mode - opt-in, when SEO matters

For marketing / blog / public docs pages where Google needs server-rendered HTML at the request path, you can opt into the gotmpl (mustache + Go html/template) engine. The whole app uses one stack - `frontend.stack: html` (default) or `frontend.stack: gotmpl`.

```yaml
# app.yaml
frontend:
  stack: gotmpl
```

Pages use frontmatter + mustache:

```html
<page title="Pricing" auth="optional" description="Pricing plans">
  <query from="plans" where="active=1" as="plans">
  <div class="grid">
    {{#plans}}
      <div class="card">
        <h3>{{name}}</h3>
        <p>{{price | currency}}/{{period}}</p>
      </div>
    {{/plans}}
  </div>
</page>
```

Use `gotmpl` for crawler-visible marketing pages. Use `html` (the default) for everything else - authed dashboards and forms don't benefit from SSR.

## Trust the loop

Write what feels right. The validator's error includes the corrected shape inline. Read it, fix the file, save. The push happens automatically. Hit the live URL with curl. Check logs. Iterate.

You can build a complete CRUD app + auth + custom endpoint + scheduled job in under an hour with this loop. The framework absorbs everything else - auth, CRUD, real-time, audit, email, cron. You focus on the schema, the static pages, and the rare custom endpoint.
