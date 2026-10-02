# TDD uygulama ve entegrasyon planı

Durum: Plan. Aşağıdaki yeni regresyon testleri henüz yazılmadı veya çalıştırılmadı. Ajan raporu, testin geçtiğine ilişkin kanıt değildir.

## Her iş paketinin uygulama dilimi

1. Davranış ve başarısızlık koşulu: kullanıcı açısından gözlenebilir beklenti, mevcut kanıt, test dosyası ve çalıştırma dizini.
2. RED: test mevcut uygulamada beklenen nedenle başarısız olmalı. Bağımlılık, ortam veya sözdizimi hatası RED kanıtı değildir. Çıkış kodu ve hata saklanır.
3. GREEN: yalnız bu beklentiyi sağlayan minimal değişiklik. Sürüm, mevcut sözleşme ve faz kapısı korunur.
4. REFACTOR: dış davranışı değiştirmeden kapsülleme ve sorumluluk ayrımı. Aynı test tekrar çalışır.
5. Bağımsız inceleme: riskli mimari/ortak sözleşme için standards-reviewer; anlamlı UI için bağımsız QA. Uygulayıcı kendi görsel referansının tek onaylayıcısı olamaz.
6. Entegrasyon: ortak dosyalar seri birleştirilir; birleşmiş sonuçta ilgili testler tekrar çalışır. Yerel başarı CI veya gerçek cihaz başarısı sayılmaz.

## Önce kritik davranışlar

| Paket | RED senaryosu | GREEN kabulü | Test katmanı |
|---|---|---|---|
| WP-01 | main ucunun imajı yok, önceki uygun yeşil aday var | Son doğrulanmış uygun aday seçilir; pin değişmez; ağ hatası başarısız ürün sürümüyle karıştırılmaz | Sahte git/registry/compose ile izole shell entegrasyonu; gerçek Debian kabulü ayrıca |
| WP-01 | Veritabanı bağlantısı hata verir | DB sağlık ucu 503 döner; liveness sözleşmesi ayrı kalır | FastAPI TestClient ve bağımlılık ikamesi |
| WP-02 | Eksik/yanlış origin veya yedek hedefi | Kurulum öncesi açık doğrulama, secret çıktısı yok | Ayar doğrulaması; DNS/server değişikliği yapmadan |
| WP-03 | `/api/components` başarısızken smoke testi yeşil dönüyor | Başarısız uç kurulumu/yayını reddeder; rollback ve timer kabulü ayrı kanıtlanır | Sahte HTTP ile shell testi; gerçek Debian kabulü ayrıca |
| WP-04 | Hedef persona görevi tamamlayamıyor | Araştırma protokolü ve önceden belirlenmiş başarı eşiği | Ürün keşfi; sahte birim testiyle araştırma kanıtı üretilmez |
| WP-05 | İsmail erişilemezken güvenlik düzeltmesini yayımlayacak doğrulanmış yetkili yok | Yedek sorumlu ve yetkiler masa başı tatbikatında doğrulanır; kurtarma sırları rapora girmez | Süreklilik tatbikatı; dokümantasyon kontrolü davranış testi sayılmaz |
| WP-06 | Karar ve referans kaydı çözülemiyor | Tarih korunur; açık geçersizleme ve kaynak eşlemesi doğrulanır | Gerçek JSON'u okuyan birim testi |

WP-02–06 senaryoları görev çıktıları ve kabul edilmiş ürün kararlarıyla kesinleştirilir. Karar verilmiş Storybook varlığı yeniden onaya açılmaz.

## MVC/MVVM ve OOP

Astro belge kabuğu statik kalır. Mevcut `model.ts` veri sözleşmesi, `view-model.ts` sunum davranışı ve `.astro` view ayrımı yeni web özelliklerinde korunur. ViewModel iş davranışı testleri DOM ve ağdan bağımsız olmalı. Görünüm iş kurallarını taşımamalı.

FastAPI request/controller, doğrulama modeli ve gerekli iş davranışı sorumlulukları ayrılır. MVC bu sorumlulukları tanımlar; API için ayrı HTML view veya zorunlu repository katmanı eklenmez. OOP, state/invariant veya değiştirilebilir bir dış bağımlılığı kapsüllemek gerektiğinde uygulanır; composition tercih edilir. Shell deploy kodu yapay sınıflara taşınmaz.

## Gerçek repo komutları ve dizinleri

- Repo kökü: `pnpm --filter @ui-kit/web test:unit`, `pnpm check`.
- API paketi `apps/api`: `python3 -m pytest`.
- Repo kökü: `python3 -m ruff check apps/api`, `python3 -m ruff format --check apps/api`.
- Repo kökü: `pnpm --filter @ui-kit/web test` mevcut unit + Storybook/Astro build + Playwright zinciridir. Kurulu/sabitlenmiş Node/pnpm ile çalıştırılır.
- Önerilen shell regresyon düzeneği henüz repoda yok; kurulup CI'a eklenmeden komut hazır veya geçmiş sayılmaz.

## 320 CSS px kabul sırası

320 → 360 → 375 → 390 → kısa yatay telefon → tablet → masaüstü. 320 genişlik eski iPhone 4 OS/Safari desteği değildir. Temel yolculukta yatay taşma, tek görünür focus, klavye sırası, dokunma hedefi, marka tokenları, panel kapanması ve yeniden boyutlandırmada veri/odak korunması doğrulanır.

Mevcut Playwright projeleri Chromium 320, WebKit 390 ve üç masaüstü tarayıcıdır. WebKit/Firefox 320, ara genişlikler, yatay geçiş, gerçek iOS/Android ve kaynak izolasyonu henüz bu planla doğrulanmış değildir; UI paketlerinin teslim kapısına eklenir. Statik belge işlerine sahte RED testi eklenmez.

## Ajan çıktıları için bağlayıcı düzeltmeler

- Bağımlılık/modül import hatası, eksik screenshot referansı veya henüz yazılmamış script davranış RED kanıtı değildir. Önce çalışan test altyapısı kurulur; davranış değişikliğini yakalayan assertion mevcut davranışta başarısız gösterilir. Kalite kapılarında bilinen ihlalli bir test fixture'ı ile kapının gerçekten hata yakaladığı sınanır.
- Python komutlarının dizini ayrıdır: pytest `apps/api` içinde; `ruff ... apps/api` repo kökünde. Paket içinde aynı Ruff yolu kullanılmaz.
- Mevcut public repo/GHCR ve Storybook varlığı yeniden karar bekleyen iş değildir. Yeni lisans, domain/hesap yetkisi, backend olgunluk düzeyi gibi henüz verilmemiş ürün kararları ayrı kalır.
- Salt dosya kapsamını test/config dosyalarıyla genişletmek koordinatörün rutin uygulama kararıdır. Her genişletme için kullanıcıdan tekrar izin istenmez.
- Shell deploy testleri OOP katmanı gerektirmez. MVC/MVVM yalnız ilgili sorumluluklarda uygulanır.
- Eksik gerçek cihaz/CI/host kanıtı `not_run` veya `unknown` olarak kalır; görev sonucunun oluşması roadmap parçasını `done` yapmaz.
