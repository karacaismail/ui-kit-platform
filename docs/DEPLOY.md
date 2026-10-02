# Pen — kurulum ve otomatik yayın

Hedef: `pen.atonota.net`. Bu belge Hetzner sunucusuna tek seferlik kurulumu ve sonrasındaki otomatik güncellemeyi anlatır. Belgenin repoda olması sunucunun kurulduğu veya DNS'nin değiştiği anlamına gelmez.

## Nasıl çalışır

```text
İsmail Karaca: git push (main)
  → GitHub Actions: lint, tip denetimi, tarayıcı testleri, API testleri
  → imajlar derlenir, tüm yığın ayağa kaldırılıp duman testi yapılır
  → doğrulanan imajlar GHCR'ye sha-<commit> etiketiyle gönderilir
Sunucu: pen-update.timer iki dakikada bir main'e bakar
  → o commit'in imajları varsa çeker, yığını günceller, sağlık kontrolünü bekler
  → sağlıklı değilse önceki sürüme döner
```

Sunucu GitHub'a yalnız dışarı doğru bağlanır. GitHub'da sunucuya ait secret, SSH anahtarı veya webhook yoktur. CI'dan geçmeyen commit'in imajı oluşmaz; sunucu o commit'i kurmaz.

Yığın (`deploy/compose.yaml`):

| Servis | İçerik | Dışarı açılan |
| --- | --- | --- |
| `web` | Nginx: statik site, `/storybook/` (Basic Auth), `/api/` → `api` | yalnız `127.0.0.1:8088` |
| `api` | FastAPI (`/api/health`, `/api/health/database`, `/api/components`) | yok |
| `postgres` | PostgreSQL 17, kalıcı volume | yok |

Storybook herkese açık değildir. Parola denetimi `web` container'ının içindedir; host proxy'si atlanıp container portuna gidilse de sorulur. Parola dosyası yoksa `/storybook/` 403 döner.

## Görev sahipleri

### 1. İsmail Karaca — tek seferlik

- GHCR paketlerinin (`ui-kit-platform-web`, `ui-kit-platform-api`) herkese açık olduğunu doğrular. Kabul: `docker pull ghcr.io/karacaismail/ui-kit-platform-web:sha-<son commit>` oturum açmadan çalışır.

### 2. Hüseyin Cengiz — tek seferlik kurulum

Ön koşul: Debian, systemd, Docker Engine + Compose eklentisi. Betik Docker'ı, DNS'yi, TLS'yi, firewall'u ve host proxy'sini değiştirmez; yalnız eksikse `git`, `curl`, `openssl`, `util-linux` paketlerini kurar.

```sh
git clone https://github.com/karacaismail/ui-kit-platform.git
sudo bash ui-kit-platform/deploy/install.sh
```

İsteğe bağlı ayarlar ilk çalıştırmada ortam değişkeniyle verilir: `PEN_HTTP_PORT` (varsayılan 8088; doluysa betik durur), `PEN_ORIGIN`, `PEN_DIR` (varsayılan `/opt/pen`), `STORYBOOK_USER`, `STORYBOOK_PASSWORD`. Parola verilmezse üretilir ve yalnız o an ekrana yazılır; parola yöneticisine kaydedilir, Git'e veya sohbete yazılmaz.

Betik şunları yapar: repoyu `/opt/pen/repo` altına alır, `/opt/pen/.env` (0600, üretilmiş veritabanı parolası) ve `/opt/pen/storybook.htpasswd` dosyalarını yazar, `pen-update.timer` birimini kurar, ilk sürümü yayınlar ve duman testini çalıştırır. Yeniden çalıştırmak güvenlidir; mevcut parola, veri ve ayarlar korunur.

Kabul: betik `OK: site, API, database and Storybook protection verified` satırıyla biter ve `systemctl list-timers pen-update.timer` zamanlayıcıyı gösterir.

### 3. Hüseyin Cengiz → Asistan Hüseyin → Hüseyin Cengiz — DNS ve TLS

- Hüseyin Cengiz, `pen.atonota.net` için DNS kayıt türü/adı/değerini hazırlar ve Asistan Hüseyin'e iletir.
- Asistan Hüseyin kaydı GoDaddy'de uygular.
- Hüseyin Cengiz host reverse proxy'sinde TLS'yi kurar ve isteği `127.0.0.1:8088` adresine yönlendirir. Nginx için örnek:

```nginx
server {
  listen 443 ssl;
  server_name pen.atonota.net;
  # ssl_certificate ve ssl_certificate_key: sunucudaki mevcut sertifika düzeni

  location / {
    proxy_pass http://127.0.0.1:8088;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Kabul: `https://pen.atonota.net/` siteyi açar, `https://pen.atonota.net/api/health` `{"status":"ok",...}` döner, `https://pen.atonota.net/storybook/` parolasız 401 döner.

`wb.atonota.net/sbrc` aynı Storybook'u gösterecekse host proxy'sinde `/sbrc/` yolu `http://127.0.0.1:8088/storybook/` adresine yönlendirilir; parola denetimi aynen geçerlidir. Bu belge o yönlendirmeyi kurmaz.

### 4. İsmail Karaca — sürekli

`main` dalına gönderir. Başka adım yoktur. Durum: repo → Actions → "CI and release images".

## İşletim (Hüseyin Cengiz)

| İş | Komut |
| --- | --- |
| Hangi sürüm çalışıyor | `cat /opt/pen/state/deployed` |
| Güncelleme kayıtları | `journalctl --unit pen-update --since today` |
| Hemen güncelle | `sudo systemctl start pen-update.service` |
| Servis durumu ve kayıtları | `docker compose --project-name pen ps` / `logs` |
| Geri al veya sabitle | `echo <commit-sha> \| sudo tee /opt/pen/pin`, ardından hemen güncelle |
| Sabitlemeyi kaldır | `sudo rm /opt/pen/pin` |
| Otomatik güncellemeyi durdur | `sudo systemctl disable --now pen-update.timer` |

Geri alınacak commit'in imajı GHCR'de bulunmalıdır (CI'dan geçmiş her `main` commit'i için bulunur). Sağlıksız çıkan sürüm yeniden denenmez; yeni bir commit veya değişen `pin` denenir.

## Kapsam dışı

- Veritabanı yedeği ve geri yükleme provası yoktur. Şu an tabloda uygulama verisi tutulmuyor; veri tutulmaya başlanmadan önce off-host yedek eklenmelidir.
- Veritabanı şema göçü (migration) aracı yoktur. `apps/api/sql/001_initial.sql` yalnız boş volume'da çalışır.
- Storybook'tan Pen'e otomatik bileşen aktarımı yoktur. `/api/components` bu aktarımın bağlanacağı uçtur ve şimdilik boş liste döner; site kataloğu statik veriden gelir.
- GitHub Pages yayını (`karacaismail.github.io/ui-kit-platform`) Storybook'suz herkese açık demodur; API içermez.
