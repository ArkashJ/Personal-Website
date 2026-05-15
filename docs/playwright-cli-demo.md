# /playwright-cli demo pipeline

Reproducible browser-capture + GIF pipeline for the weekly page. Built to showcase the `/playwright-cli` Claude skill on `arkashj.com`.

## What this produces

| File                                       | How it's made                                      |
| ------------------------------------------ | -------------------------------------------------- |
| `docs/screenshots/weekly-light.png`        | Playwright full-page screenshot, light theme       |
| `docs/screenshots/weekly-dark.png`         | Playwright full-page screenshot, dark theme        |
| `docs/screenshots/weekly-frame-NNN.png`    | 24 scroll-position frames, dark theme              |
| `docs/screenshots/weekly-scroll.gif`       | The frames stitched together via `gifski` (18 fps) |
| `docs/screenshots/playwright-cli-demo.gif` | vhs recording of the CLI itself                    |

`docs/screenshots/` is gitignored (PNGs whitelisted by `.gitignore`); GIFs stay out of the repo — share via Vercel blob, S3, or a one-off upload.

## Setup

```bash
bun add -D @playwright/test
bunx playwright install chromium
brew install gifski
brew install charmbracelet/tap/vhs
```

## Run

```bash
# 1. Start the dev server in another terminal
bun run dev

# 2. Capture screenshots + scroll frames
bun run capture:weekly

# 3. Stitch frames into a GIF
bun run demo:gif

# 4. Record the CLI flow itself (uses 1–3)
bun run demo:cli
```

## Configuration

- `WEEKLY_URL=https://www.arkashj.com/weekly/2026-W19-tuesday-reads bun run capture:weekly` — capture production instead of localhost.
- Edit `SCROLL_FRAMES` in `scripts/capture-weekly.ts` to trade GIF length for smoothness.
- Edit `--fps` / `--quality` / `--width` in `scripts/frames-to-gif.sh` to tune output size.

## Why this stack

- **Playwright** — deterministic, headless, supports `colorScheme` and `data-theme` injection so we can capture both light and dark in one script.
- **gifski** — neuquant-style perceptual GIF encoder; produces sharper text than `ffmpeg -palettegen` at the same file size.
- **vhs** (`charmbracelet/vhs`) — terminal-recorder driven by a `.tape` script. Deterministic, no manual screen recording.

Considered and skipped: **Remotion** (would require a Composition just to play a frame sequence; license tier on company use); **terminalizer** (slower, older); **ffmpeg-only** (worse GIF quality on screenshot-heavy frames).
