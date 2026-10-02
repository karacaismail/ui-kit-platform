#!/usr/bin/env bash
# One-time installer for the Pen (UI Kit platform) stack: site, Storybook, FastAPI and PostgreSQL.
# Target: a Debian host that already runs Docker Engine with the Compose plugin.
#
#   sudo bash deploy/install.sh
#
# Running it again is safe: the existing password file, database and settings are kept.
# It does not touch Docker itself, DNS, TLS, the firewall or the host reverse proxy.
#
# Optional settings, read from the environment on the first run:
#   PEN_DIR             install directory                  (default /opt/pen)
#   PEN_HTTP_PORT       loopback port the site listens on   (default 8088)
#   PEN_ORIGIN          public origin of the site           (default https://pen.atonota.net)
#   STORYBOOK_USER      Storybook Basic Auth user           (default storybook)
#   STORYBOOK_PASSWORD  Storybook Basic Auth password       (default: generated and shown once)
set -euo pipefail

repo_url=https://github.com/karacaismail/ui-kit-platform.git

die() {
  echo "install.sh: $*" >&2
  exit 1
}

random_secret() {
  openssl rand -hex 24
}

main() {
  local dir="${PEN_DIR:-/opt/pen}"
  local port origin missing=() tool

  [ "$(id -u)" = 0 ] || die "run as root (sudo)."
  [ "$(uname -s)" = Linux ] || die "this installer targets the Linux server, not a workstation."
  command -v systemctl >/dev/null || die "systemd is required."
  docker compose version >/dev/null 2>&1 ||
    die "Docker Engine with the Compose plugin is required. This script does not install or change Docker."

  for tool in git curl openssl flock; do
    command -v "$tool" >/dev/null || missing+=("$tool")
  done
  if [ "${#missing[@]}" -gt 0 ]; then
    command -v apt-get >/dev/null || die "missing tools: ${missing[*]}"
    echo "Installing: ${missing[*]}"
    apt-get update --quiet
    apt-get install --yes --no-install-recommends ca-certificates curl git openssl util-linux
  fi

  install -d -m 750 "$dir" "$dir/state"
  if [ -d "$dir/repo/.git" ]; then
    git -C "$dir/repo" fetch --quiet origin main
  else
    git clone --quiet "$repo_url" "$dir/repo"
  fi

  if [ ! -f "$dir/.env" ]; then
    port="${PEN_HTTP_PORT:-8088}"
    origin="${PEN_ORIGIN:-https://pen.atonota.net}"
    if command -v ss >/dev/null && ss -ltn "sport = :$port" | grep -q LISTEN; then
      die "port $port is already in use. Run again with PEN_HTTP_PORT=<free port>."
    fi
    (
      umask 077
      cat >"$dir/.env" <<ENV
POSTGRES_PASSWORD=$(random_secret)
PEN_ORIGIN=$origin
PEN_HTTP_PORT=$port
PEN_STORYBOOK_HTPASSWD=$dir/storybook.htpasswd
ENV
    )
    echo "Wrote $dir/.env"
  fi
  port="$(sed -n 's/^PEN_HTTP_PORT=//p' "$dir/.env")"
  origin="$(sed -n 's/^PEN_ORIGIN=//p' "$dir/.env")"

  if [ ! -f "$dir/storybook.htpasswd" ]; then
    local user="${STORYBOOK_USER:-storybook}" password="${STORYBOOK_PASSWORD:-}" generated=""
    if [ -z "$password" ]; then
      password="$(random_secret)"
      generated=yes
    fi
    # Holds only a salted hash. World-readable so the unprivileged web container can read the bind mount;
    # the directory itself is root-only.
    printf '%s:%s\n' "$user" "$(openssl passwd -apr1 -stdin <<<"$password")" >"$dir/storybook.htpasswd"
    chmod 644 "$dir/storybook.htpasswd"
    if [ -n "$generated" ]; then
      echo
      echo "Storybook login (shown only now; store it in the password manager):"
      echo "  user:     $user"
      echo "  password: $password"
      echo
    fi
  fi

  cat >/etc/systemd/system/pen-update.service <<UNIT
[Unit]
Description=Deploy the newest verified Pen release
Wants=network-online.target
After=network-online.target docker.service

[Service]
Type=oneshot
Environment=PEN_DIR=$dir
ExecStart=/bin/bash $dir/repo/deploy/update.sh
UNIT
  cat >/etc/systemd/system/pen-update.timer <<UNIT
[Unit]
Description=Check for a new Pen release every two minutes

[Timer]
OnBootSec=2min
OnUnitActiveSec=2min

[Install]
WantedBy=timers.target
UNIT
  systemctl daemon-reload
  systemctl enable --now pen-update.timer >/dev/null

  echo "Deploying the current release..."
  PEN_DIR="$dir" bash "$dir/repo/deploy/update.sh" || true

  if [ -s "$dir/state/deployed" ]; then
    bash "$dir/repo/deploy/smoke.sh" "http://127.0.0.1:$port"
    echo
    echo "Installed. Release $(cat "$dir/state/deployed") listens on http://127.0.0.1:$port"
    echo "New pushes to main are deployed automatically once CI passes (pen-update.timer)."
    echo "Remaining one-time step: point the host reverse proxy for $origin at 127.0.0.1:$port (docs/DEPLOY.md)."
  else
    echo
    echo "Installed, but no release is running yet. The timer retries every two minutes."
    echo "Follow it with: journalctl --unit pen-update --follow"
  fi
}

# Wrapped so a partially downloaded script cannot run.
main "$@"
