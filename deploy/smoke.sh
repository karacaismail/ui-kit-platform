#!/usr/bin/env bash
# Checks a running stack through its HTTP entry point.
# Usage: deploy/smoke.sh http://127.0.0.1:8088
# STORYBOOK_AUTH=user:password additionally checks that valid credentials open Storybook (CI uses throwaway ones).
set -euo pipefail

base="${1:?usage: smoke.sh <base-url>}"
base="${base%/}"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

status() {
  curl --silent --output /dev/null --write-out '%{http_code}' "$@"
}

[ "$(status "$base/")" = 200 ] || fail "the site did not answer 200"
curl --fail --silent --show-error "$base/" | grep -q 'Component workspace' || fail "the site is not the UI Kit workspace"
curl --fail --silent --show-error "$base/api/health" | grep -q '"status":"ok"' || fail "the API is not healthy"
curl --fail --silent --show-error "$base/api/health/database" | grep -q '"status":"ok"' || fail "the API cannot reach PostgreSQL"
[ "$(status "$base/storybook/index.html")" = 401 ] || fail "Storybook answers without credentials"

if [ -n "${STORYBOOK_AUTH:-}" ]; then
  [ "$(status --user "$STORYBOOK_AUTH" "$base/storybook/index.html")" = 200 ] || fail "valid credentials do not open Storybook"
fi

echo "OK: site, API, database and Storybook protection verified at $base"
