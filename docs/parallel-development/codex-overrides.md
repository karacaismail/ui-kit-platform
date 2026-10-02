# Codex entegrasyon düzeltmeleri

WP-33 bulguları plan düzeyinde aşağıdaki bağlayıcı eklerle ele alındı. Ham Claude sonuçları arşiv kanıtıdır; uygulama talimatı bu ekler + TDD sözleşmesi + güncel manifesttir. Henüz kod uygulanmadı veya bağımsız ikinci inceleme ile kapatma doğrulanmadı.

## Ortak port/origin sözlüğü

| Servis | Ortam değişkeni | Container listener | Önerilen loopback host varsayılanı |
|---|---|---|---|
| Pen | PEN_ORIGIN / PEN_HTTP_PORT | 8080 | 8088 |
| Preview | PEN_PREVIEW_ORIGIN / PEN_PREVIEW_HTTP_PORT | 8081 | 8089 |
| Storybook | PEN_STORYBOOK_ORIGIN / PEN_STORYBOOK_HTTP_PORT | 8082 | 8090 |

Mevcut kurulum portu değiştirilmez; tabloda Pen için değer yeni kurulum önerisidir. Bu tablo deploy yapılandırması değildir. WP-02 uygulanırken tüm dinleme noktalarında eşsiz port assertion, preflight doluluk kontrolü ve mevcut .env korunması sınanır. Origin/domain kararı ayrıca insana aittir.

## Ortak sorumluluklar

Shell test düzeneği: WP-01 `deploy/tests/run.sh` ve ortak `lib.sh`; WP-02/03/14 yeni altyapı kopyalamaz. Systemd uzlaştırma WP-01, durum izleme WP-14. Karar doğrulaması WP-06, sıralı id ataması Codex. Göç/DB CI WP-11; production istemci/build köprüsü WP-08; head/canonical WP-15; Provenance WP-19; Principal WP-22; preview bütçesi WP-09.

UI matris altyapısı WP-16 D3-D4 ön dilimidir. Ürün işleri WP-16 tamamını beklemek zorunda değildir; ilgili UI tesliminde 320 kabulünü bu altyapıyla veya yerel viewport spec ile gösterir.

## Paket düzeltmeleri

### WP-01

Shell düzeneği/systemd sürüm uzlaştırması bu paketin sahipliğinde. API MVC sınırı route/response ve mevcut veri erişimidir; sağlık sondası için dependency injection gerçek test sınırına yarıyorsa eklenir. Mevcut engine için monkeypatch de geçerli bir test tekniğidir; sırf desen adı için refactor zorunlu değildir. Liveness ayrı kalır; shell OOP gerektirmez.

### WP-02

Origin/port sözlüğünün tek sahibi WP-02. deploy-shell işi MVC/MVVM gerektirmez. Metin araması belge kontrolüdür. Test/config kapsamı Codex tarafından genişletilebilir.

### WP-03

GHCR public görünürlüğü yeniden ürün onayı değil teknik kabul kontrolüdür. Shell kapsamına MVC/MVVM uygulanmaz. WP-13 sonrasında Storybook yeni origin 401/200 kabulü ve eski URL davranışı yeniden sınanır.

### WP-04

Araştırma/ürün keşfi kapsamı: MVC/MVVM/OOP uygulanmaz, yapay RED veya test dosyası onayı kapısı yok. Önceden belirlenmiş görev başarı ölçütleri kullanılır.

### WP-05

Süreklilik kapsamı: masa başı tatbikatı kabul kanıtıdır; rg metin araması davranış testi değildir. MVC/MVVM/OOP kapsam dışıdır. Yetki/hesap taşıma kararı insanda kalır; upstream başka yazarın commit kimliği korunur.

### WP-06

Mevcut Storybook/public Pages kararı korunur; Beta/RC ayrımı ancak ayrıca çözülmemiş bir karar varsa ele alınır. Saf doğrulama fonksiyonları yeterli. Yeni karar id numarası sabit 20 olmaz; entegrasyonda sıradaki boş id Codex tarafından atanır. karar testinin sahibi WP-06.

### WP-07

karar.json ve karar testi WP-06 sonrasında seri düzenlenir; id numarası entegrasyonda atanır.

### WP-08

Katalog şeması ile src/ ViewModel/istemci kodunun production build üzerinden public/app.js akışına bağlanması bu paketin sahibi. Ham TS doğrudan tarayıcıya teslim edilmez; ağ/build kanıtı gerekir. Test/config kapsamı rutin koordinasyon kararıdır.

### WP-09

Port/origin adlarında WP-02 sözlüğü esas. Önizleme bütçesi ve uygulama sınırı WP-09 sahipliğinde; WP-24 aynı davranışı tüketir. Ayrı kayıtlı domain gereksinimi port ayırmakla karşılanmış sayılmaz.

### WP-11

Postgres digest WP-01. Göç aracı ve PostgreSQL CI test altyapısının sahibi WP-11. Tek seçim diğer API paketlerince tüketilir; yeniden araç kararı açılmaz. GHCR görünürlüğü teknik doğrulama; test/config kapsamını Codex yönetir.

### WP-12

Göç aracı WP-11, Storybook origin WP-13. İnsan oturum/kimlik sözleşmesi WP-22; yayın servis kimliği WP-12. Worker, schema ve kimlik işleri backend faz kapısından sonra uygulanır.

### WP-13

Storybook listener/host portu WP-02 sözlüğünden alınır; preview listener ile çakışamaz. Storybook kaldırılmaz. Eski pathin 404/redirect kararı ve yeni origin auth kabulü aynı smoke güncellemesinde tutarlı olmalı.

### WP-14

Systemd dosyaları/uzlaştırma WP-01; bu paket onun durum/izleme sözleşmesini tüketir. install.sh source guard ve shell düzeneği yeniden yazılmaz. WP-03 öncesi gerektiği söylenen systemd altyapısı WP-01 içine alınır.

### WP-15

Canonical/head metadata ve ortak HeadViewModel sahibi WP-15; WP-29 buna SEO alanlarını ekler. Bileşen rota biçimi burada tek sözleşmeye bağlanır; iki alternatif aynı anda yayımlanmaz.

### WP-16

Matris altyapısı D3-D4, UI uygulama paketlerinden önce bağımsız bir alt dilim olarak alınır. Bu, WP-16 bütün paketinin tamamlanması değildir. Başlangıç 320 Chromium/Firefox/WebKit; sonraki genişlikler ve gerçek cihaz kanıtı ayrıdır. Import/script/baseline eksikliği RED değildir.

### WP-18

Veri göçü WP-11; katalog/istemci üretim köprüsü WP-08. Ölçüm modeli tüketici sözleşmesi buna göre kurulur.

### WP-19

Katalog şeması WP-08; persona araştırması WP-04. Provenance sözleşmesinin sahibi WP-19; WP-23 tüketir.

### WP-20

Karar kayıt uzlaştırması WP-06. WP-07 ayrı açık ürün kararlarını kapsar.

### WP-21

Hukuki ürün kararları insanda; yazılım/data envanteri testleri geçerli davranış assertion kullanır. Boş module/import hatası RED değildir.

### WP-22

Principal sözleşmesinin sahibi WP-22; WP-26 insan ve ajan kimliği ayrımını bunun üzerinde genişletir. Göç aracı WP-11 tarafından seçilir.

### WP-23

WP-19 provenance ve arşiv sınırı ek ön koşuldur. Provenance yeniden tanımlanmaz.

### WP-24

Önizleme bütçesi WP-09, üretim istemci köprüsü WP-08; bu paket ortak uygulamayı tüketir.

### WP-25

Göç aracı ve veri entegrasyon ortamı WP-11. Yeni AI backend işi kendi olgunluk kapısı korunarak planlanır.

### WP-26

İnsan OIDC/Principal WP-22, yayın servis kimliği/uç WP-12, göç aracı WP-11. İki kimlik türü aynı rol/yetki gibi ele alınmaz.

### WP-27

Ad/konum kararı sahibi İsmail; yeni karar id entegrasyonda atanır. Dize araması davranış RED değildir. Roadmap done birleşmiş kabul sonrası.

### WP-28

320 dahil tüm giriş/durum kabulü UI tesliminde; yeni dosya ImportError RED değildir. Roadmap done birleşmiş kabul sonrası.

### WP-29

HeadViewModel/canonical sözleşmesi WP-15; tanıtım WP-28, ad/konum WP-27. Roadmap done birleşmiş kabul sonrası.

### WP-30

Ad/konum WP-27, tanıtım WP-28, bulunabilirlik WP-29. Modelin çalışır iskeletinden sonra davranış RED assertion gerekir.

### WP-32

Lansman kabul ölçümleri çalışan test altyapısında davranış assertion olmalı; eksik script RED değildir.
