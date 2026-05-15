#!/usr/bin/env bash
# Stitches docs/screenshots/weekly-frame-*.png into a single GIF via gifski.
# Install: brew install gifski
set -euo pipefail

FRAME_DIR="docs/screenshots/frames"
OUT_FILE="docs/screenshots/weekly-scroll.gif"

shopt -s nullglob
frames=("${FRAME_DIR}"/f-*.png)
if (( ${#frames[@]} == 0 )); then
  echo "No frames found in ${FRAME_DIR}. Run 'bun run capture:weekly' first." >&2
  exit 1
fi

gifski \
  --output "${OUT_FILE}" \
  --fps 14 \
  --quality 88 \
  --width 1100 \
  "${frames[@]}"

echo "Wrote ${OUT_FILE} (${#frames[@]} frames)"
