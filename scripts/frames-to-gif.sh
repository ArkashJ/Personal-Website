#!/usr/bin/env bash
# Stitches docs/screenshots/weekly-frame-*.png into a single GIF via gifski.
# Install: brew install gifski
set -euo pipefail

OUT_DIR="docs/screenshots"
OUT_FILE="${OUT_DIR}/weekly-scroll.gif"

shopt -s nullglob
frames=("${OUT_DIR}"/weekly-frame-*.png)
if (( ${#frames[@]} == 0 )); then
  echo "No frames found in ${OUT_DIR}. Run 'bun run capture:weekly' first." >&2
  exit 1
fi

gifski \
  --output "${OUT_FILE}" \
  --fps 18 \
  --quality 90 \
  --width 1200 \
  "${frames[@]}"

echo "Wrote ${OUT_FILE} (${#frames[@]} frames)"
