#!/usr/bin/env bash
# Pen — https://pen.atonota.net  (Astro site + Storybook + FastAPI + PostgreSQL)
# Uygulama kurulumu ve CI/CD tamamen ui-kit-platform reposundadır (docs/DEPLOY.md):
#   main'e push → GitHub Actions (test + imaj + duman testi) → GHCR sha-<commit>
#   → sunucudaki pen-update.timer 2 dk içinde çeker, sağlıksızsa önceki sürüme döner.
# Bu script: o kurulumu çalıştırır + host Caddy'de pen.atonota.net → 127.0.0.1:<port> (TLS) ekler.
# Önkoşul: Docker, host Caddy (tls_dns/common snippet'leri), UFW. Diğer projelerden bağımsızdır.
# Kullanım (root) — repo, Pen'in kendi kurulum yolu olan /opt/pen/repo'ya klonlanır:
#   git clone https://github.com/karacaismail/ui-kit-platform.git /opt/pen/repo
#   bash /opt/pen/repo/ops/setup.sh                — tekrar çalıştırılabilir (install.sh de idempotent)
set -euo pipefail
OPS="$(cd "$(dirname "$0")" && pwd)"; REPO="$(dirname "$OPS")"
DOMAIN=pen.atonota.net
PEN_DIR=/opt/pen
log()  { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m[!] %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m[x] %s\033[0m\n' "$*"; exit 1; }
setenv() { touch "$1"; grep -q "^$2=" "$1" && sed -i "s|^$2=.*|$2=$3|" "$1" || echo "$2=$3" >> "$1"; }

[ "$(id -u)" -eq 0 ] || die "root olarak çalıştır"
for c in docker caddy ufw git curl; do command -v $c >/dev/null || die "$c yok"; done

log "1/4 Public erişim: PUBLIC_IP + UFW 443"
CENV=/etc/caddy/caddy.env
PUB=$(grep -s '^PUBLIC_IP=' "$CENV" | cut -d= -f2-)
[ -n "$PUB" ] || { PUB=$(curl -fsS -4 https://ifconfig.me); setenv "$CENV" PUBLIC_IP "$PUB"; chown root:caddy "$CENV"; chmod 640 "$CENV"; }
r=$(dig +short "$DOMAIN" A | tail -1); [ "$r" = "$PUB" ] || warn "$DOMAIN → '$r'; beklenen $PUB"
ufw allow 443/tcp comment 'public https' >/dev/null && echo "PUBLIC_IP=$PUB, UFW 443 açık"

log "2/4 Pen kurulumu (ui-kit-platform deploy/install.sh)"
echo "    İlk kurulumda Storybook parolası BİR KEZ ekrana yazılır: parola yöneticisine kaydedin, sohbete yapıştırmayın."
# install.sh repoyu $PEN_DIR/repo'da bulur (fetch eder); bu script de oradan çalışıyorsa ikinci klon oluşmaz.
[ "$REPO" = "$PEN_DIR/repo" ] || warn "Bu script $REPO içinden çalışıyor; Pen kurulumu $PEN_DIR/repo kullanır."
PEN_DIR="$PEN_DIR" PEN_ORIGIN="https://$DOMAIN" bash "$REPO/deploy/install.sh"
PORT=$(sed -n 's/^PEN_HTTP_PORT=//p' "$PEN_DIR/.env")
[ -n "$PORT" ] || die "$PEN_DIR/.env içinde PEN_HTTP_PORT yok"

log "3/4 Caddy: $DOMAIN → 127.0.0.1:$PORT"
sed "s|__PEN_PORT__|$PORT|g" "$OPS/caddy/$DOMAIN.caddy" > "/etc/caddy/sites/$DOMAIN.caddy"
chmod 644 "/etc/caddy/sites/$DOMAIN.caddy"
install -o caddy -g caddy -m 640 /dev/null "/var/log/caddy/$DOMAIN.log" 2>/dev/null || true
runuser -u caddy -- env HOME=/var/lib/caddy $(grep -v '^#' "$CENV" | xargs) \
  caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
chown -R caddy:caddy /var/log/caddy
systemctl restart caddy

log "4/4 Doğrulama (docs/DEPLOY.md kabul kriterleri)"
code() { curl -s -o /dev/null -w '%{http_code}' --resolve "$DOMAIN:443:$PUB" "$@"; }
for i in $(seq 1 12); do [ "$(code "https://$DOMAIN/")" = 200 ] && break; sleep 5; done
[ "$(code "https://$DOMAIN/")" = 200 ] && echo "OK  https://$DOMAIN/ → 200" || warn "https://$DOMAIN/ 200 değil (sertifika alınıyor olabilir)"
curl -s --resolve "$DOMAIN:443:$PUB" "https://$DOMAIN/api/health" | grep -q '"status":"ok"' && echo "OK  /api/health → ok" || warn "/api/health ok değil"
[ "$(code "https://$DOMAIN/storybook/")" = 401 ] && echo "OK  /storybook/ parolasız → 401" || warn "/storybook/ parolasız 401 değil!"
systemctl list-timers pen-update.timer --no-pager | head -2

cat <<MSG

Pen: https://$DOMAIN/   ·   API: https://$DOMAIN/api/health   ·   Storybook: https://$DOMAIN/storybook/ (parolalı)
Yayındaki sürüm:  cat $PEN_DIR/state/deployed
Güncelleme kaydı: journalctl --unit pen-update --since today
Diğer işletim komutları: $PEN_DIR/repo/docs/DEPLOY.md ("İşletim")
MSG
