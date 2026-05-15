#!/usr/bin/env bash
# Fail if loose screenshots, scratch notes, or other stray assets sit at repo root.
# Root markdown is limited to the canonical trio. PNGs/JPGs/GIFs/PDFs never live at root —
# they belong in docs/screenshots/ (dev) or public/assets/ (shipped).
set -euo pipefail

shopt -s nullglob

allowed_md=("README.md" "CHANGELOG.md" "CLAUDE.md" "LICENSE")
stray=()

for f in *.md; do
  keep=0
  for ok in "${allowed_md[@]}"; do
    [[ "$f" == "$ok" ]] && keep=1 && break
  done
  [[ $keep -eq 0 ]] && stray+=("$f")
done

for f in *.png *.jpg *.jpeg *.gif *.webp *.pdf; do
  stray+=("$f")
done

if (( ${#stray[@]} > 0 )); then
  echo "❌ Stray assets at repo root — move them into docs/screenshots/ or public/assets/:" >&2
  printf '   %s\n' "${stray[@]}" >&2
  exit 1
fi
