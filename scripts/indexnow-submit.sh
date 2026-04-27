#!/usr/bin/env bash
# IndexNow direct submission to Bing/Yandex/Seznam.
# Run AFTER deploying so the key file at /<KEY>.txt is reachable.
# https://www.indexnow.org/documentation
set -euo pipefail

HOST="www.arkashj.com"
KEY="d6181e9a79154869b9a72fb056eecbb0"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

# Verify the key file is reachable on the live site before submitting.
echo "Verifying $KEY_LOCATION ..."
if ! curl -sf "$KEY_LOCATION" | grep -q "$KEY"; then
  echo "ERROR: $KEY_LOCATION did not return the expected key. Deploy first." >&2
  exit 1
fi
echo "✓ Key verified."

# Build URL list straight from the live sitemap.
URLS_JSON=$(curl -s "https://${HOST}/sitemap.xml" \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed -E 's,<\/?loc>,,g' \
  | python3 -c "import sys,json; print(json.dumps([u.strip() for u in sys.stdin if u.strip()]))")

PAYLOAD=$(python3 -c "
import json,sys
print(json.dumps({
  'host': '${HOST}',
  'key': '${KEY}',
  'keyLocation': '${KEY_LOCATION}',
  'urlList': json.loads('''${URLS_JSON}''')
}))
")

echo "Submitting $(echo $URLS_JSON | python3 -c "import json,sys; print(len(json.load(sys.stdin)))") URLs..."
curl -sS -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -H "Host: api.indexnow.org" \
  --data "$PAYLOAD" -w "\nHTTP %{http_code}\n"

# Mirrors — send to each engine directly too (belt-and-suspenders).
for endpoint in "https://www.bing.com/indexnow" "https://yandex.com/indexnow"; do
  echo "Mirror: $endpoint"
  curl -sS -X POST "$endpoint" \
    -H "Content-Type: application/json" \
    --data "$PAYLOAD" -w "  HTTP %{http_code}\n" || true
done
echo "Done."
