# ops — https://pen.atonota.net host tarafı (Hetzner)

Uygulama kurulumu ve CI/CD `deploy/` ve `docs/DEPLOY.md`'dedir; bu klasör onlara dokunmaz (İsmail Karaca onayıyla
eklendi; sahibi Hüseyin Cengiz — server/deploy). `deploy/install.sh` host proxy'sine dokunmadığı için yalnız host tarafını ekler:
**Caddy'de `pen.atonota.net` → TLS → `127.0.0.1:8088`.**

```
İsmail: git push main → GitHub Actions (astro check, Playwright, ruff, pytest, imaj build, stack smoke test)
        → GHCR sha-<commit> imajları
Sunucu: pen-update.timer (2 dk) → yeni imajı çeker, compose up --wait, smoke test; sağlıksızsa önceki sürüme döner
Caddy:  pen.atonota.net (public) → 127.0.0.1:8088 (web: Nginx — site, /api → FastAPI, /storybook Basic Auth)
```

## Kurulum (sunucuda, root)
```bash
git clone https://github.com/karacaismail/ui-kit-platform.git /opt/pen/repo
bash /opt/pen/repo/ops/setup.sh
```
`ops/setup.sh`: PUBLIC_IP + UFW 443 → `deploy/install.sh` (`/opt/pen`, Postgres parolası üretir, Storybook parolasını
**bir kez** gösterir, timer'ı açar, smoke test) → Caddy site dosyası → kabul testleri
(`/` 200, `/api/health` ok, `/storybook/` parolasız 401).

## İşletim
`docs/DEPLOY.md` → "İşletim" (sürüm, geri alma, pin, parola yenileme).
