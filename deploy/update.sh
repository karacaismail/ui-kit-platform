#!/usr/bin/env bash
# Deploys the newest commit on main once CI has published its images.
# pen-update.timer starts this every two minutes. Running it by hand is safe.
#
# Pin a release (rollback or freeze): write a commit SHA to $PEN_DIR/pin. Remove the file to follow main again.
set -euo pipefail

registry=ghcr.io/karacaismail/ui-kit-platform

release() {
  local dir="$1" repo="$2" commit="$3"
  git -C "$repo" checkout --quiet --detach "$commit"
  PEN_IMAGE_TAG="sha-$commit" docker compose --env-file "$dir/.env" --file "$repo/deploy/compose.yaml" \
    up --detach --wait --remove-orphans
}

# Keeps the running release and the one before it; older images of this project are removed.
remove_old_images() {
  local name tag
  for name in web api; do
    docker image ls --format '{{.Tag}}' "$registry-$name" | while read -r tag; do
      if [ "$tag" != "sha-$1" ] && [ "$tag" != "sha-$2" ]; then
        docker image rm "$registry-$name:$tag" >/dev/null 2>&1 || true
      fi
    done
  done
}

main() {
  local dir="${PEN_DIR:-/opt/pen}"
  local repo="$dir/repo" state="$dir/state"
  local target current

  mkdir -p "$state"
  exec 9>"$state/lock"
  flock --nonblock 9 || exit 0

  git -C "$repo" fetch --quiet origin main
  if [ -s "$dir/pin" ]; then
    target="$(git -C "$repo" rev-parse --verify --quiet "$(tr -d '[:space:]' <"$dir/pin")^{commit}")" || {
      echo "$dir/pin does not name a commit of this repository." >&2
      exit 1
    }
  else
    target="$(git -C "$repo" rev-parse origin/main)"
  fi

  current="$(cat "$state/deployed" 2>/dev/null || true)"
  [ "$target" != "$current" ] || exit 0
  # A release that failed is not retried; the next commit (or a changed pin) is.
  [ "$target" != "$(cat "$state/failed" 2>/dev/null || true)" ] || exit 0

  # CI pushes images only after lint, tests and the stack smoke test pass, so a missing image means "not verified".
  if ! docker pull --quiet "$registry-web:sha-$target" >/dev/null 2>&1 ||
    ! docker pull --quiet "$registry-api:sha-$target" >/dev/null 2>&1; then
    if [ "$target" != "$(cat "$state/waiting" 2>/dev/null || true)" ]; then
      echo "$target" >"$state/waiting"
      echo "Images for $target are not available: CI is still running or failed, or the GHCR packages are not public."
    fi
    exit 0
  fi
  rm -f "$state/waiting"

  if release "$dir" "$repo" "$target"; then
    echo "$target" >"$state/deployed"
    rm -f "$state/failed"
    remove_old_images "$target" "$current"
    echo "Deployed $target"
    exit 0
  fi

  echo "$target" >"$state/failed"
  echo "Release $target did not become healthy." >&2
  if [ -n "$current" ]; then
    echo "Restoring $current" >&2
    release "$dir" "$repo" "$current" || echo "Restoring $current failed; see: docker compose --project-name pen logs" >&2
  fi
  exit 1
}

# The checkout above can replace this file, so bash must have read all of it before main runs
# and must not read on afterwards.
main "$@"
# shellcheck disable=SC2317
exit
