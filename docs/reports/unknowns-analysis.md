# Bilinmeyen bilinmeyenler analizi

Tarih: 2 Ekim 2026. Analiz Codex CLI (`gpt-5.6-sol`, çok ajanlı mod, salt okunur) tarafından commit `45ae541` üzerinde yapıldı; rapor bu paragraf ve aşağıdaki karşılık tablosu dışında değiştirilmeden duruyor. Bütün bulgular yol haritasına ve öncelik sırasına işlendi.

## Bulguların karşılığı

"Plana eklendi" yeni bir parça, "Plana işlendi" mevcut bir parçanın kapsamına eklenmesi demektir. Parça kodları yol haritasının güncel haline göre tutulur.

| Bulgu | Durum | Yol haritasındaki karşılığı |
|---|---|---|
| UU-01 | Plana eklendi | F0.20 Tek seferlik alan adı ve origin planı; F2.09 Korunan Storybook beta ortamı; F2.10 Korunan Storybook RC ortamı ve terfi |
| UU-02 | Plana eklendi, bir karar bekliyor | F0.20 Tek seferlik alan adı ve origin planı; F1.11 Önizlemenin ayrı origin’e taşınması |
| UU-03 | Plana işlendi | F2.20 Küratör için sınırlı içe aktarma |
| UU-04 | Plana işlendi | F1.12 Güvenilmeyen kod için tehdit modeli ve kaynak sınırları |
| UU-05 | Plana eklendi | F0.23 Talep doğrulaması |
| UU-06 | Plana işlendi | F2.21 Tohum içerik |
| UU-07 | Plana işlendi | F0.23 Talep doğrulaması; F2.24 Gizlilik dostu temel ölçüm; F5.07 Pazarlama hunisi ve hedefler |
| UU-08 | Plana eklendi | F5.06 İlk dış üreticilerin kazanılması |
| UU-09 | Plana eklendi | F4.18 AI maliyet defteri ve fatura mutabakatı |
| UU-10 | Plana eklendi | F4.19 Model kataloğu ve emeklilik planı |
| UU-11 | Plana eklendi | F7.12 İnsan, ajan ve servis kimliklerinin ayrılması |
| UU-12 | Plana eklendi | F4.17 AI çıktısının şemaya göre kabulü |
| UU-13 | Plana işlendi | F2.12 Yayın geri alma ve sürüm koruması |
| UU-14 | Plana işlendi | F1.23 Şema göçü, sunucu dışı yedek ve ilk geri yükleme provası |
| UU-15 | Plana eklendi | F0.17 Son yeşil sürümün kurulması |
| UU-16 | Plana eklendi | F0.18 Sağlık ucunun gerçek durumu bildirmesi |
| UU-17 | Plana eklendi | F0.19 PostgreSQL imajı ve sunucu birimlerinin sürüme bağlanması |
| UU-18 | Plana eklendi | F0.19 PostgreSQL imajı ve sunucu birimlerinin sürüme bağlanması |
| UU-19 | Plana işlendi | F2.20 Küratör için sınırlı içe aktarma; F3.13 Genel içe aktarma köprüsü |
| UU-20 | Plana eklendi | F6.12 Pro kaynağın herkese açık çıktılara girmemesi |
| UU-21 | Plana eklendi | F6.13 Hesap silmede aboneliğin kapatılması |
| UU-22 | Plana işlendi | F3.04 Gizlilik bildirimi ve veri yaşam döngüsü |
| UU-23 | Plana işlendi | F0.15 Karar kayıtlarının uzlaştırılması |
| UU-24 | Plana eklendi | F0.24 Bağımsız kabul incelemesi |
| UU-25 | Plana eklendi | F0.22 Hesap ve yayın yetkisinin yedeklenmesi |

## Yöntem

- Altı bakış açısı için altı bağımsız alt ajan iki paralel dalgada çalıştı: teknik ve güvenlik, ürün ve pazar, AI ve ajanlar, işletim, hukuk ve içerik, organizasyon.
- Varsayım haritası, pre-mortem, eski projeden ders, bağımlılık kırılması ve ikinci derece etki teknikleri kullanıldı.
- Yol haritası, iki karar kaydı, AGENTS.md, README, dağıtım belgeleri, güncel web ve API kodu, deploy betikleri ve GitHub Actions akışları incelendi.
- ComponentSocial için yalnız izin verilen kod, README, AGENTS, docs ve Prisma şeması okundu. Yasaklanan dosya ve klasörler açılmadı.
- Her aday önce `docs/roadmap-gap-analysis.md` içindeki GAP-01–GAP-38 ile karşılaştırıldı; aynı sorunu yeniden anlatanlar elendi.
- Bulgular dosya satırı veya karar kimliğiyle yeniden sınandı. Ağ, canlı sistem, test, container ve dış hizmet kullanılmadı.

## Özet

- En ağır güvenlik riski, korunan Storybook ve gelecekteki preview yüzeylerinin erişim denetimiyle yürütme yalıtımını karıştırmasıdır.
- Otomatik yayın bugün stateless uygulamada güvenli görünür; veritabanı göçleri başlayınca container rollback’i gerçek geri dönüş sağlamayabilir.
- Yol haritası teknik üretimi ayrıntılı ölçüyor, fakat kullanıcı talebini ve “kopyalanan bileşen gerçek projede çalıştı” sonucunu erken doğrulamıyor.
- AI planında kota ve değerlendirme var; maliyet muhasebesi, model emekliliği, temsilci ajan kimliği ve ham çıktının kanonik artefakta dönüşümü sınanmamış durumda.
- İçe aktarma, fork, AI dönüşümü ve dışa aktarım başarılı oldukça lisans, kaynak ve kaldırma yükümlülüklerinin izlenmesi zorlaşıyor.
- Tek geliştirici, kişisel GitHub namespace’i ve aynı kişinin karar, uygulama, test ve yayın yetkisini taşıması projenin en önemli organizasyonel bağımlılığıdır.

## Bulgular

| ID | Alan | Öncelik | Olasılık | Teknik | Bilinmeyen | Neden görünmüyordu | Erken sinyal | Ucuz erken deneme | Kanıt | İlgili faz |
|---|---|---|---|---|---|---|---|---|---|---|
| UU-01 | Teknik ve güvenlik | P0 | orta | Varsayım haritası | Üretim Storybook’u Pen ile aynı origin altında tam yetkili JavaScript çalıştırıyor. Gelecekte AI veya RC kaynaklı bir story, oturum açmış kullanıcının Pen depolamasına ve same-origin API uçlarına erişebilir. | Basic Auth yürütme yalıtımı gibi algılanmış; önceki GAP yalnız anonim erişim ve port bypass’ını ele almıştı. | Bir story’nin `localStorage` okuyabilmesi veya `/api/` çağrısı yapabilmesi. | Zararsız test story’sinden Pen depolamasına ve API’ye erişmeyi dene; erişimin reddini kabul koşulu yap. | `deploy/nginx.conf:24–33`; `docs/DEPLOY.md:23–29`; `apps/web/src/roadmap/data.ts:193–209` | F0, F2, F3 |
| UU-02 | Teknik ve güvenlik | P0 | orta | Varsayım haritası | Preview’ı kardeş bir `atonota.net` origin’ine taşımak çerez ve CSRF açısından tam site yalıtımı sağlamayabilir. Yanlış `Domain` veya `SameSite` seçimi, preview kodunun Pen oturumu adına yan etki üretmesine izin verebilir. | Plan origin ayrımını nihai güvenlik sınırı sayıyor; origin, site ve çerez kapsamı birlikte modellenmemiş. | Oturum çerezinde `Domain=atonota.net` bulunması veya mutasyon uçlarının yalnız CORS’a güvenmesi. | İki kardeş yerel hostla oturum PoC’si kur; preview’dan form ve kimlikli istekle mutasyon dene. | `apps/web/src/roadmap/data.ts:170–175,234–244`; `apps/api/app/main.py:15–21`; `karar.json:Q8` | F1, F3 |
| UU-03 | Teknik ve güvenlik | P1 | orta | Eski projeden ders | F2’deki ZIP içe aktarma, küçük sıkıştırılmış dosyanın worker belleğini tüketen büyük açılmış veriye dönüşmesiyle tek sunucuyu düşürebilir. | Eski kodda dosya sayısı ve sıkıştırılmış boyut limitlerinin bulunması güvenli olduğu izlenimini veriyor; gerçek inflate çıktısı sınırlanmıyor ve ZIP kuyruğa base64 olarak kopyalanıyor. | Küçük ZIP’te worker RSS artışı, büyük kuyruk payload’ı veya OOM yaklaşımı. | Yüksek sıkıştırma oranlı zararsız fixture ile gerçek açılmış bayt, oran, süre ve kuyruk payload sınırlarını sına. | `apps/web/src/roadmap/data.ts:218–221`; ComponentSocial `packages/backend/src/services/zip-import.ts:6–16,25–39,47–63`; `packages/backend/src/routes/imports.ts:27–49` | F2, F3 |
| UU-04 | Teknik ve güvenlik | P1 | orta | İkinci derece etki | Tek önizleme için konan CPU ve bellek kotası, katalogdaki çok sayıda canlı mini preview’ın toplam tüketimini sınırlamaz. Her iframe tekil kotanın altında kalırken sekme veya renderer kilitlenebilir. | Lazy load ve tekil runtime kotası toplam bütçe yerine kabul edilmiş. Sorun ancak 100 içerik ve canlı kartlar birlikte başarılı olduğunda ortaya çıkıyor. | Scroll sırasında aktif iframe, RAM ve CPU’nun doğrusal artması; görünüm dışındaki preview’ların çalışmaya devam etmesi. | Tekil sınırı aşmayan 100 ağır preview ile telefon ve masaüstü scroll testi yap; eşzamanlı aktif preview sayısını ölç. | `apps/web/src/roadmap/data.ts:174–175,193–219` | F1, F2, F5 |
| UU-05 | Ürün ve pazar | P0 | orta | Eski projeden ders | 165 parçalık yol haritası tamamlandığında hedef kullanıcıların düzenli bir ihtiyacı olmayabilir. | Faz çıkışları deploy, generator ve yayın hattını kullanıcı sonucu olarak kabul ediyor. Eski ComponentSocial geniş ürün yüzeyine rağmen şablon README ve derleme hatalarıyla arşivlenmiş. | Parça kapanış hızı yüksekken davetsiz kullanıcıların ikinci kullanım ve yedi günlük dönüş oranının çok düşük kalması. | Mevcut demoda 5–8 hedef kullanıcıya bir bileşeni bulup kendi projesine alma görevi ver; yardım ihtiyacını ve yedi günlük dönüşü ölç. | `apps/web/src/roadmap/data.ts:127–160,191–222`; ComponentSocial `docs/SITEMAP.md:3–140`; `README.md:1–3`; `AGENTS.md:27` | F0, F1, F2 |
| UU-06 | Ürün ve pazar | P1 | yüksek | Eski projeden ders | Eski arşivden alınacak 100 bileşen kataloğu doldurabilir fakat çoğu `not-tested` kalabilir; kanıt üretme maliyeti soğuk başlangıç hedefini aşabilir. | Seed adedi içerik kalitesi sayılmış. Eski içe aktarıcı yalnız sınırlı yorum metadata’sı okuyup HTML dosyalarını topluca ekliyordu. | Verified filtresinde çok az sonuç ve bileşen başına sürekli artan kabul süresi. | Arşivden katmanlı rastgele 20 aday seçip F1 metadata, adaptör ve kanıt sözleşmesinden geçir; geçme oranını ve süreyi ölç. | `apps/web/src/roadmap/data.ts:180,218–219`; ComponentSocial `packages/backend/scripts/seed-anim-library.ts:13–56,75–139`; `packages/backend/prisma/schema.prisma:51–83` | F1, F2 |
| UU-07 | Ürün ve pazar | P1 | yüksek | Varsayım haritası | Kopyalama olayı, bileşenin gerçek projede derlendiğini, bağımlılıklarının çözüldüğünü veya kullanıcının işini bitirdiğini göstermiyor. | Vizyon “kendi koduna almak” sonucunu hedeflerken temel ölçüm yalnız açma ve kopyalamayı kaydediyor. | Yüksek kopyalama yanında tekrar arama, tekrar kopyalama, entegrasyon desteği ve düşük geri dönüş. | On görevli oturumda kopyadan sonra temiz projede build ve render başarısını, süreyi ve yardım ihtiyacını ölç. | `apps/web/src/roadmap/data.ts:11–12,220–222,283–287`; ComponentSocial `packages/frontend/src/features/feed/FeedPage.tsx:130–135` | F2, F3 |
| UU-08 | Ürün ve pazar | P1 | yüksek | Bağımlılık kırılması | Küratör veya tek geliştirici içerik beslemeyi bırakırsa kullanıcı üretimi kendiliğinden başlamayabilir; üreticiye takip, itibar ve gelir karşılığı daha sonraki fazlarda geliyor. | Soğuk başlangıç içerik sayısıyla kapanıyor; sürdürülebilir arz döngüsü tanımlanmıyor. | Yeni içeriklerin çoğunun sistem hesabından gelmesi ve dış üreticilerin ikinci içerik yayımlamaması. | Beş dış üreticiye concierge yayın akışı ver; 14 gün içinde teşviksiz ikinci içerik getirip getirmediklerini ölç. | `apps/web/src/roadmap/data.ts:218–219,228–250,283–302,306–324` | F2, F3, F5, F6 |
| UU-09 | AI ve ajanlar | P1 | yüksek | Eski projeden ders | İç AI kullanım sayacı sağlayıcının faturalandırdığı token ve maliyeti temsil etmeyebilir; kota geçerken gerçek fatura büyüyebilir. | Plan ölçüm ve maliyet tavanı istiyor fakat muhasebe kaynağı, retries, cache ve fatura mutabakatını tanımlamıyor. Eski kod giriş tokenını sıfır, çıkışı karakter sayısı olarak kaydediyordu. | Sağlayıcı faturası ile iç kayıt arasında yüzde 10’dan fazla fark veya giriş tokenlarının sürekli sıfır görünmesi. | Sağlayıcı yanıt fixture’larıyla giriş, çıkış, cache, başarısız istek ve retry maliyet defteri oluşturup sentetik faturayla karşılaştır. | `apps/web/src/roadmap/data.ts:51–53,220,258–266`; ComponentSocial `packages/backend/src/routes/ai.ts:305–321`; `packages/backend/prisma/schema.prisma:329–340` | F2, F4, F6, F10 |
| UU-10 | AI ve ajanlar | P1 | yüksek | Bağımlılık kırılması | Model emekli edildiğinde veya yetenekleri değiştiğinde kaydedilmiş tercihler ve bekleyen işler yetim kalabilir; sessiz fallback kaliteyi, maliyeti veya veri yerleşimini değiştirebilir. | Çoklu sağlayıcı geçidi var, ancak model kataloğu sürümü, yetenek sözleşmesi ve tercih göçü yok. | `model not found` hataları, belirli modele bağlı bekleyen işler veya açıklanamayan kalite sıçraması. | Seçilmiş modeli iş beklerken sahte katalogdan kaldır; sistemin sessiz fallback yerine açık yeniden seçim durumu üretmesini doğrula. | `apps/web/src/roadmap/data.ts:262–267,408`; ComponentSocial `packages/backend/src/routes/ai.ts:11–58,65–85,140–148` | F4, F10 |
| UU-11 | AI ve ajanlar | P0 | orta | Varsayım haritası | İnsan, insan adına çalışan ajan, yayın botu ve takım ajanı aynı kullanıcı veya API anahtarı altında birleşirse yetki iptali, maliyet, lisans kabulü ve audit aktörü ayrılamaz. | “Kimliği doğrulanmış” ve “dar yetkili” ifadeleri uç kapsamını tanımlıyor, temsil ve delegasyon zincirini tanımlamıyor. | Audit kaydında yalnız `userId` bulunması veya maliyet ve lisans kabulinin hangi insana ait olduğunun cevaplanamaması. | İnsan, yetki devredilmiş ajan ve yayın servisi için üç asıl kişiyle iş başlat; insan yetkisini iş ortasında iptal et ve yeni yan etkinin reddini sına. | `apps/web/src/roadmap/data.ts:120–123,203–211,331–365`; `../../karar.json:1119–1122`; ComponentSocial `packages/backend/prisma/schema.prisma:19–47,329–340` | F2, F7, F8, F9 |
| UU-12 | AI ve ajanlar | P1 | yüksek | Eski projeden ders | Modelin “yalnız kod” talimatına uyacağı varsayılırsa Markdown çiti, yarım stream, açıklama veya eksik dosya doğrudan kullanıcı koduna uygulanabilir. Sandbox kodu sınırlar fakat geçerli artefakt olduğunu kanıtlamaz. | Ham sağlayıcı cevabı ile kanonik manifest arasında doğrulama, repair ve atomik kabul protokolü tanımlanmamış. | Kod çitlerinin editöre girmesi, yarım dosya veya başarılı model cevabının build’de düşmesi. | Çitli metin, yarım SSE, bilinmeyen bağımlılık ve çok dosyalı cevap fixture’larını ortak parser’a ver; yalnız şema ve build kontrolü geçen artefaktı uygula. | `apps/web/src/roadmap/data.ts:263–271`; ComponentSocial `packages/backend/src/routes/ai.ts:303–321,345–355`; `packages/frontend/src/features/playground/components/AiGenerateDialog.tsx:48–58` | F4, F7 |
| UU-13 | AI ve ajanlar | P1 | yüksek | İkinci derece etki | Başarılı RC’de bileşen silme, yeniden adlandırma ve çoklu güncelleme birlikte olduğunda ekleme odaklı idempotent yayın hayalet kayıt veya kısmi katalog oluşturabilir. | Plan tekrar ve sürüm gerilemesini ele alıyor; snapshot, tombstone, yeniden adlandırma kimliği ve batch transaction davranışını tanımlamıyor. | Storybook ve Pen bileşen sayılarının ayrışması, iki slug veya kaynakta olmayan katalog kaydı. | V1’de A ve B, V2’de yeniden adlandırılmış A ve silinmiş B manifesti kullan; ikinci işlemde hata vererek bütünüyle uygulama veya hiç uygulamama davranışını sına. | `apps/web/src/roadmap/data.ts:193–211`; `../../outputs/workbench-devops-cercevesi.md:68–79,143` | F2, F10 |
| UU-14 | İşletim | P0 | yüksek | İkinci derece etki | Yeni sürüm şemayı değiştirdikten sonra healthcheck düşerse betik eski uygulama imajına döner, fakat değişmiş PostgreSQL volume’u kalır. Eski uygulama da çalışmayabilir. | Migration ve rollback ayrı yol haritası başarıları; N−1 şema uyumluluğu birlikte sınanmıyor. | Migration’da drop, rename veya zorunlu kolon bulunması ve N−1 uyumluluk testinin olmaması. | N−1 verisi üzerinde N migration’ını uygula, N deploy’unu kasıtlı düşür ve otomatik N−1 dönüşünden sonra kritik okuma-yazmaları çalıştır. | `apps/web/src/roadmap/data.ts:186,200–210`; `deploy/compose.yaml:17–19`; `deploy/update.sh:87–100`; ComponentSocial `AGENTS.md:6–8` | F1, F2, F10 |
| UU-15 | İşletim | P1 | yüksek | İkinci derece etki | A commit’i yeşil olup imajları yayımlandıktan sonra B main’e gelir ve kırmızı kalırsa sunucu yalnız B’yi hedefler; kullanılabilir A hiç kurulmayabilir. | Dal ucu ile son doğrulanmış release aynı nesne varsayılmış. | `state/waiting` main SHA’sında kalırken önceki SHA’nın imajlarının mevcut ve `state/deployed` değerinin daha eski olması. | Yerel sahte repo ve tag envanterinde eski sürüm, yeşil A ve kırmızı B dizisini kur; güncelleyicinin A’yı seçip seçmediğini sına. | `.github/workflows/ci.yml:11–14,104–115`; `deploy/update.sh:51–75`; `docs/DEPLOY.md:8–15` | F0, F2 |
| UU-16 | İşletim | P1 | yüksek | Pre-mortem | PostgreSQL sonradan düşerse `/api/health/database` gövdede `unavailable` yazıp HTTP 200 döndürüyor; API container healthcheck’i ise veritabanını hiç sınamıyor. | Deploy smoke testi gövdeyi kontrol ettiği için çalışma zamanı sağlık sözleşmesindeki yanlış HTTP semantiği görünmüyor. | DB ucu `unavailable`, HTTP 200 ve container `healthy` durumlarının aynı anda görülmesi. | Disposable yığında PostgreSQL’i durdur; HTTP status, gövde, Docker health ve uyarı davranışını birlikte kaydet. | `apps/api/app/main.py:29–36`; `deploy/compose.yaml:31–35`; `deploy/smoke.sh:22–23` | F0, F2, F10 |
| UU-17 | İşletim | P1 | orta | Varsayım haritası | Normal updater yalnız Git checkout ve Compose çalıştırıyor; installer’a sonradan eklenen systemd, izin, env veya host entegrasyonu değişiklikleri kurulu sunucuda uygulanmayabilir. | Uygulama imajı ile deploy kontrol düzlemi aynı “deploy kodu” olarak düşünülmüş. | Repo SHA’sı aynıyken `/etc/systemd/system/pen-update.*`, proxy veya env davranışının sunucular arasında ayrışması. | Disposable Debian’da kurulum yap; zararsız unit değişikliğini main’e ekleyip normal updater’ın host unitini uzlaştırıp uzlaştırmadığını sına. | `deploy/install.sh:60–76,101–130`; `deploy/update.sh:17–24,51–91`; `docs/DEPLOY.md:37–75` | F0, F10 |
| UU-18 | İşletim | P0 | orta | Bağımlılık kırılması | `postgres:17-alpine` hareketli etiketi nedeniyle sıradan web veya API yayını review edilmemiş PostgreSQL patch ve Alpine katmanını da çekebilir. App rollback aynı hareketli DB etiketi ve ileri taşınmış volume’u kullanır. | SHA etiketli iki proje imajı tüm release’i değişmez gösteriyor; üçüncü runtime imajı release atomunun dışında kalıyor. | Aynı etiketin farklı digest çözmesi veya uygulama commit’i değişmeden DB sürümünün değişmesi. | Mevcut digestte veri üretip farklı fixture digestine yükselt; smoke ve eski uygulama rollback’ini dene. | `deploy/compose.yaml:5–19`; `deploy/update.sh:79–85`; `README.md:56–58` | F0, F1, F10 |
| UU-19 | Hukuk ve içerik | P0 | yüksek | Eski projeden ders | GitHub, ZIP, Gist veya CodePen’den alınan kod, kaynak lisansı ve sahibi korunmadan içe aktaran kullanıcının içeriği gibi görünebilir; fork ve AI dönüşümü lisanssız kodu meşrulaştırabilir. | Kullanıcı lisansı, import ve fork ayrı parçalar; kaynak commit ve dosya lisanslarının birlikte taşınacağı varsayılmış. | İçe aktarılan manifestte kaynak commit, SPDX lisansı, telif sahibi ve uyumluluk sonucunun bulunmaması. | MIT, Apache-2.0, GPL, lisanssız ve karma lisanslı fixture depoları içe aktar; kaynak ve lisans zincirini fork ve ZIP çıktısına kadar izle. | `apps/web/src/roadmap/data.ts:217–219,238,243,246`; ComponentSocial `packages/backend/src/services/github-import.ts:99–121`; `packages/backend/prisma/schema.prisma:51–83` | F2, F3, F7 |
| UU-20 | Hukuk ve içerik | P0 | yüksek | İkinci derece etki | Pro bileşen kaynakları public frontend, Storybook veya GHCR imajına girerse sunucu tarafı entitlement yalnız arayüzü kilitler; kaynak doğrudan artefakttan alınabilir. | Public repo ve imaj politikasıyla Pro teslim modeli farklı fazlarda ele alınıyor. Bugünkü Pro örnek kodu public `app.js` içinde bulunuyor. | Pro kaynak dosyasının Pages artefaktında, source map’te, Storybook indeksinde veya anonim çekilebilen imajda bulunması. | Sahte bir Pro fixture’ı build et; anonim Pages ve GHCR çıktısında kaynak metni ve sembollerini ara. | `apps/web/public/app.js:30–31,64–74`; `.github/workflows/pages.yml:42–45`; `docs/DEPLOY.md:29`; `apps/web/src/roadmap/data.ts:315,320` | F2, F6 |
| UU-21 | Hukuk ve içerik | P0 | orta | Eski projeden ders | Aktif Pro kullanıcısı hesabını sildiğinde yerel abonelik kaydı silinip ödeme sağlayıcısındaki abonelik canlı kalabilir; tahsilat sürer ve webhook sahipsiz düşer. | Hesap silme F3’te, ödeme F6’da planlandığı için iki yaşam döngüsünün telafi işlemi görünmüyor. | Hesap silindikten sonra sağlayıcı aboneliğinin `active` kalması veya silinmiş hesaba webhook gelmesi. | Test modunda aktif abonelik oluştur; hesap silme sonrası abonelik, gelecek fatura, webhook tekrarı ve iade durumunu doğrula. | `apps/web/src/roadmap/data.ts:248,310,317,322`; ComponentSocial `packages/backend/src/routes/gdpr.ts:98–109`; `packages/backend/src/routes/billing.ts:49–71,172–193` | F3, F6 |
| UU-22 | Hukuk ve içerik | P1 | yüksek | Eski projeden ders | F3’te yazılan “tüm veriyi dışa aktar ve sil” listesi, F4–F10’da eklenen AI kullanımı, abonelik, import, takım, audit, log ve yedek verisini sessizce dışarıda bırakabilir. | Veri yaşam döngüsü tek faz parçası; sonraki kullanıcı-bağlı veri kümeleriyle yapısal bağı yok. Eski uygulamanın “tüm veri” export’u sekiz grubu kapsarken başka kullanıcı tablolarını dışarıda bırakıyordu. | Yeni bir `userId` veya sağlayıcı müşteri kimliği alanı eklenmesine rağmen veri envanteri ve export testinin değişmemesi. | Her kullanıcı-bağlı tablo ve harici sistemde sentinel veri oluştur; export, silme, anonimleştirme ve hukuki saklama sonucunu envanterle karşılaştır. | `apps/web/src/roadmap/data.ts:237–248,265,381–384`; ComponentSocial `packages/backend/src/routes/gdpr.ts:13–40`; `packages/backend/prisma/schema.prisma:278–341,367–379` | F3, F4, F6, F8, F9, F10 |
| UU-23 | Organizasyon | P1 | yüksek | Varsayım haritası | “Bağlam repoda” olsa da karar kanıtlarının önemli bölümü geçici `/var/folders` ekran görüntülerine bağlı; temiz clone veya başka ajan bu delilleri göremez. | Karar metninin repoda olması, referans artefaktının da kalıcı olduğu varsayılmış. | Yeni oturumun karar gerekçesini yalnız prose’dan yeniden yorumlaması veya görsel kararların farklı uygulanması. | Temiz clone ortamında bütün `referanslar` yollarını çözmeye çalış; çözülemeyen her referansı bağlam kaybı olarak say. | `apps/web/src/roadmap/data.ts:70–72`; `karar.json:491–492,525,543,569,588,617–618,642,750,782,818,859–862` | F0, F1, F10 |
| UU-24 | Organizasyon | P1 | yüksek | Pre-mortem | Aynı kişi ürün kararını veriyor, ajanla kodu ve regresyon testini üretiyor, sonra main’e göndererek otomatik yayımlıyor. Yanlış varsayımı uygulama ve test paylaşırsa CI bağımsız semantik kapı oluşturmaz. | Çok tarayıcı, smoke ve CodeQL kapsamı bağımsız ürün doğrulaması gibi görünebilir. | Bütün testleri geçen fakat canlı kullanım veya sonradan ürün kararıyla geri alınan commitler. | Yüksek riskli bir değişikliği prompt ve uygulama bağlamını görmemiş bağımsız inceleyiciye gizli kabul vakalarıyla ver; ortak kör noktaları ölç. | `../../karar.json:1119–1122`; `.github/workflows/ci.yml:15–115`; `docs/DEPLOY.md:77–79`; `apps/web/src/roadmap/data.ts:161–162,355–356` | F0, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10 |
| UU-25 | Organizasyon | P0 | orta | Bağımlılık kırılması | Hüseyin Cengiz mevcut sürümü işletebilir, ancak kaynak, Pages ve GHCR kişisel `karacaismail` namespace’inde ve yeni yayın İsmail’in main push’una bağlı. İsmail’in hesabı veya erişimi kaybolursa güvenlik düzeltmesi yayımlanamayabilir. | Üç görev sahibi bulunması, ürün bakım yetkisinin de yedekli olduğu izlenimini veriyor. | Tek repo admini, tek paket sahibi, tek 2FA kurtarma seti veya sahibin yokluğunda bekleyen güvenlik güncellemesi. | İsmail’in 48 saat erişilemez olduğu salt okunur masa başı tatbikatında kaynak doğrulama, hotfix build, publish ve rollback yetkilerini çıkar. | `README.md:3,37–41,58–64`; `docs/DEPLOY.md:31–50,77–95`; `../../outputs/workbench-devops-cercevesi.md:13,140–146` | F0, F2, F10 |

## Pre-mortem senaryoları

### Yeşil yayın, geri dönemeyen veritabanı

On sekizinci ayda sıradan bir frontend değişikliği hareketli PostgreSQL etiketini de güncelledi. Yeni sürüm migration uyguladıktan sonra healthcheck düştü; otomatik rollback yalnız uygulama imajlarını geri getirdi ve N−1 yeni şemada çalışmadı. DB sağlık ucu HTTP 200 verdiği için olay geç fark edildi. Bağlı bulgular: UU-14, UU-16, UU-18.

### Dolu katalog, zayıf kullanım

Yüz bileşen yayımlandı ancak çoğu kanıtsız kaldı. Kullanıcılar kodu kopyaladı fakat kendi projelerinde çalıştıramadı; buna rağmen açma ve kopyalama metrikleri başarı gösterdi. Küratör içerik üretmeyi bırakınca katalog yaşlandı. Bağlı bulgular: UU-05, UU-06, UU-07, UU-08.

### AI ajanları maliyeti ve yetkiyi sahipsiz bıraktı

Ajanlar aynı insan API anahtarını kullanarak retry döngülerine girdi. İç sayaç tokenları yanlış ölçtü; bir model emekli edilince bazı işler sessizce daha pahalı sağlayıcıya geçti. Audit kaydı hangi ajanın hangi insan adına işlem yaptığını gösteremedi. Bağlı bulgular: UU-09, UU-10, UU-11, UU-12.

### Başarılı büyüme hukuki geri çağırmayı imkânsızlaştırdı

İçe aktarılan lisansı belirsiz bir bileşen fork, AI dönüşümü ve dışa aktarım zinciriyle yayıldı. Pro kaynakları public artefakta girdi; telif talebi geldiğinde türevlerin kaynağı belirlenemedi. Hesabını silen ücretli kullanıcının harici aboneliği çalışmaya devam etti. Bağlı bulgular: UU-19, UU-20, UU-21, UU-22.

### Tek hesap kaybı geliştirmeyi durdurdu

İsmail’in GitHub erişimi kayboldu. Hüseyin Cengiz çalışan sürümü pinleyebildi ancak yeni imaj yayımlayamadı. Geçici görsel referanslar başka ortamda açılamadığı için karar gerekçeleri de yeniden üretilemedi. Bağlı bulgular: UU-23, UU-24, UU-25.

## Sınanmamış varsayımlar

| Varsayım | Planda nerede | Nasıl sınanır |
|---|---|---|
| Korunan Storybook kodu güvenilir kabul edilebilir | F2 korunan Beta ve RC Storybook | Zararsız story ile Pen depolaması ve API erişimi denenir |
| Ayrı origin oturum çerezlerinden de ayrıdır | F1 ayrı-origin preview, F3 auth | Kardeş hostlar arasında cookie ve CSRF PoC’si yapılır |
| Tekil preview kotası katalog toplamını da sınırlar | F1 runtime sınırları, F2 mini preview | Yüz eşzamanlı preview ile toplam kaynak ölçülür |
| İlk 100 bileşen kanıt sözleşmesine ekonomik biçimde taşınabilir | F2 tohum içerik | Yirmi adaylık kuru geçişle süre ve başarı oranı çıkarılır |
| Kopyalama kullanıcı işinin tamamlandığını gösterir | F2 temel ölçüm | Temiz projede build ve render başarısı izlenir |
| İç AI sayacı sağlayıcı faturasıyla aynıdır | F2 ve F4 kota, F10 maliyet yönetişimi | Fixture fatura mutabakatı yapılır |
| İnsan hesabı ajan delegasyonunu temsil etmeye yeter | AI ajan personası ve MCP | Yetki iptalli insan, ajan ve servis kimliği deneyi yapılır |
| Her yeşil main commit’i sunucuya ulaşır | F0 otomatik yayın | Yeşil A ardından kırmızı B sıralaması denenir |
| App rollback’i veri rollback’i anlamına gelir | F1 migration, F2 rollback | N migration’ı sonrası zorunlu N−1 dönüşü denenir |
| Public artefaktta Pro kaynak bulunmadan entitlement uygulanabilir | F6 Pro teslimi | Anonim Pages ve GHCR artefakt taraması yapılır |
| Hesap silme harici ödeme yaşam döngüsünü de bitirir | F3 hesap silme, F6 ödeme | Test aboneliğiyle silme ve webhook deneyi yapılır |
| Repo bağlamı temiz bir oturumda yeniden üretilebilir | Karar kaydı disiplini | Temiz clone’da tüm normatif referanslar çözülür |

## Erken uyarı göstergeleri

| Gösterge | Eşik | Hangi bulguya bağlı |
|---|---|---|
| Story kodunun Pen storage veya API erişimi | Tek başarılı erişim | UU-01 |
| Preview origin’inden kimlikli mutasyon | Tek başarılı mutasyon | UU-02 |
| Katalog scroll’unda aktif preview kaynakları | Görünüm dışına çıkan preview’ların çalışmaya devam etmesi | UU-04 |
| Tohum içerikte kanıt üretme oranı | Pilot örneklerin yüzde 20’sinden fazlasının bloke olması | UU-06 |
| Kopya sonrası gerçek build başarısı | Yüzde 80’in altı | UU-07 |
| Dış üreticilerin ikinci yayın oranı | On dört günde yüzde 20’nin altı | UU-08 |
| AI maliyet mutabakat farkı | Yüzde 10’dan fazla | UU-09 |
| Audit kaydında gerçek insan ve çalışan ajan | Bunlardan birinin tek işlemde eksik olması | UU-11 |
| Storybook ve Pen katalog farkı | Tek hayalet, çift slug veya kısmi batch | UU-13 |
| Otomatik rollback sonrası N−1 kritik işlem | Tek başarısız okuma veya yazma | UU-14 |
| Main başında kırmızı commit varken önceki yeşil sürüm | Bir timer çevriminden fazla atlanması | UU-15 |
| DB unavailable cevabının HTTP durumu | HTTP 200 görülmesi | UU-16 |
| PostgreSQL etiket digest değişimi | Uygulama commit’i değişmeden tek digest farkı | UU-18 |
| İçe aktarılan içerikte kaynak ve lisans | Tek eksik commit veya lisans kaydı | UU-19 |
| Pro kaynak anonim artefakta girmiş | Tek kaynak parçası veya source map sembolü | UU-20 |
| Silinen hesapta harici aktif abonelik | Tek olay | UU-21 |
| Temiz clone’da çözülemeyen karar referansı | Tek normatif referans | UU-23 |
| Güvenlik düzeltmesini yayımlayabilen bağımsız kişi | İsmail dışında sıfır kişi | UU-25 |

## Kontrol edilip sorun bulunmayan alanlar

- Bugünkü F0 preview iframe’i yalnız `allow-scripts` kullanıyor; CSP ağ bağlantısını, form gönderimini ve base URL değişimini kapatıyor.
- Storybook üretim stillerini doğrudan kullanıyor; ayrı bir görsel tema taşımıyor.
- CI action sürümleri commit SHA ile sabitlenmiş ve checkout kimlik bilgileri kalıcılaştırılmıyor.
- Sunucu iki proje imajını da çekmeden deploy’a başlamıyor; iki imajın ardışık yayınlanması tek başına yarım release oluşturmuyor.
- Güncelleyici `flock` ile eşzamanlı çalışmayı engelliyor ve servisleri yalnız loopback’e açıyor.
- FastAPI sınırı bugün minimal; frontend API veya veritabanı olmadan statik çalışabiliyor.
- Önceki GAP’te ele alınan genel gözlemlenebilirlik, tek sunucu, imzalı artefakt, OIDC seçimi, lisans seçimi, yedek zamanlaması ve iki karar kaydı doğrudan yeniden bulgu yapılmadı.

## İncelenemeyenler

- GitHub, GHCR, Pages, Actions, branch protection, Hetzner, DNS, TLS, timer ve canlı container durumları; ağ ve dış sistem kullanımı yasaktı.
- Gerçek kullanıcı talebi, kullanım metrikleri, ödeme sağlayıcısı kayıtları, AI sağlayıcı faturaları ve model sözleşmeleri mevcut değildi.
- Gerçek macOS Safari, iOS, Android, WebContainer, Monaco ve farklı MCP istemcileri çalıştırılmadı.
- Sunucudaki host proxy, systemd birimleri, yedekler, parola yöneticisi, hesap sahipliği ve 2FA kurtarma düzeni repo dışı olduğu için doğrulanamadı.
- ComponentSocial’daki `.env`, PEM, anahtar dosyaları, `indirilenler w5` ve adında `Şifre` veya `Kullanıcılar` geçen dosyalar talimat gereği açılmadı.
- Test, build, container, migration, restore veya dağıtım komutları çalıştırılmadı; sonuçlar statik kaynak incelemesiyle sınırlıdır.
