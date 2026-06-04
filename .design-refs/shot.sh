#!/usr/bin/env bash
# Headless screenshot helper (Playwright MCP unavailable in this session).
# Usage: shot.sh <url> <out.png> <width> <height> [delay_ms]
set -euo pipefail
URL="$1"; OUT="$2"; W="$3"; H="$4"; DELAY="${5:-2500}"
PROFILE="$(mktemp -d)"
google-chrome-stable \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --user-data-dir="$PROFILE" \
  --window-size="${W},${H}" \
  --virtual-time-budget="${DELAY}" \
  --screenshot="$OUT" \
  "$URL" >/dev/null 2>&1
rm -rf "$PROFILE"
echo "saved $OUT (${W}x${H})"
