#!/usr/bin/env bash
# Capture /weekly/2026-W19 as 30 scrolling frames using the playwright-cli
# Claude skill (NOT the Playwright MCP, NOT @playwright/test). Frames land in
# docs/screenshots/frames/ for stitching by scripts/frames-to-gif.sh.
#
# Usage:
#   bun run capture:weekly
#   WEEKLY_URL=... FRAMES=... STEP=... bun run capture:weekly
set -euo pipefail

URL="${WEEKLY_URL:-http://localhost:5001/weekly/2026-W19}"
FRAMES="${FRAMES:-30}"
STEP="${STEP:-119}"
SESSION="weekly"
OUT_DIR="docs/screenshots/frames"

command -v playwright-cli >/dev/null || {
  echo "playwright-cli not found. Install with: npm install -g @playwright/cli@latest" >&2
  exit 1
}

mkdir -p "${OUT_DIR}"
rm -f "${OUT_DIR}"/f-*.png

playwright-cli -s="${SESSION}" close >/dev/null 2>&1 || true
playwright-cli -s="${SESSION}" open "${URL}" --browser=chrome >/dev/null
playwright-cli -s="${SESSION}" resize 1280 800 >/dev/null
playwright-cli -s="${SESSION}" eval \
  "() => { document.documentElement.setAttribute('data-theme','dark'); try{localStorage.setItem('theme','dark')}catch{} }" \
  >/dev/null
sleep 1

for i in $(seq 0 $((FRAMES - 1))); do
  y=$((i * STEP))
  playwright-cli -s="${SESSION}" eval "() => window.scrollTo(0, ${y})" >/dev/null
  playwright-cli -s="${SESSION}" screenshot \
    --filename="${OUT_DIR}/f-$(printf '%02d' "${i}").png" >/dev/null
done

playwright-cli -s="${SESSION}" close >/dev/null
echo "Wrote ${FRAMES} frames to ${OUT_DIR}"
