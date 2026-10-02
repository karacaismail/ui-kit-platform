# 33 worktree ile paralel geliştirme planı

Bu teslim, mevcut öncelik listesindeki 78 farklı roadmap parçasını 32 uygulama planı ve bir bağımsız inceleme paketine böler. Roadmap’in kalan parçaları bu 32 öncelik adımının kapsamı değildir; silinmedi veya tamamlanmış sayılmadı. Ürün özellikleri bu turda uygulanmadı. 33 gerçek Git worktree aynı başlangıç commit'inden açıldı. Claude giriş oturumu yenilendi; 33 görev kendi worktree’lerinde çalıştırıldı ve tamamlandı. Paket dosyaları Codex görev devirleridir; Claude sonuçları `results/` altında birleştirildi.

## İşletim sırası

1. Kritik: WP-01–06. WP-01, WP-04, WP-05 ve WP-06 planlaması paralel başlayabilir. Sunucu kurulumu WP-01/02 kabulünden sonra Hüseyin Cengiz tarafından yapılır.
2. Olmazsa olmaz: WP-07–18. Karar ve şema sözleşmeleri sabitlenmeden bunlara bağlı kod işleri başlamaz.
3. Önemli: WP-19–26. Kimlik, içerik ve AI işleri kendi karar kapılarına bağlıdır.
4. Pazarlanabilirlik: WP-27–32. Talep kanıtı erken toplanır; genel lansman kabulü ürün akışları tamamlandıktan sonradır.
5. WP-33 bağımsız inceleme: 32 gerçek çıktıyı görmeden başlayamaz.

33 worktree aynı anda 33 API isteği anlamına gelmez. Claude süreçleri altılı paralel dalgalar halinde çalıştırılır; her biri kendi TASK.md ve OUTPUT.md alanına sahiptir. Ajanlar çalışma ağacına erişir; teknik sandbox varsayılmaz. İzin verilen araçlar salt okunur araçlarla sınırlandırılır.

## TDD ve mobil kabul

Her uygulama paketi RED test kanıtı → minimal GREEN → refactor → bağımsız inceleme → ana ajanın entegrasyon testleri sırasını izler. Bu plan tesliminde RED/GREEN koşulduğu iddia edilmez. UI kabulü 320 CSS px ile başlar; eski iPhone 4 tarayıcısı desteklenmiş sayılmaz. Gerçek cihaz, görsel fark, ARIA/klavye, kaynak indirme ve geçiş testleri ayrı raporlanır.

## Çatışma ve birleştirme

Yalnız birbirinin dosya kapsamına dokunmayan uygulama işleri eşzamanlı düzenleme yapar. WP-01/02/03/11/12/13/14 aynı deploy dosyalarını; WP-08/10/15/16/18/19/24 aynı web sözleşmelerini; WP-12/18/19/21/22/23/25/26 aynı API sözleşmelerini paylaşabilir. Bu kümelerde arayüz devri ve seri birleştirme zorunludur. Plan çıktıları farklı Markdown dosyaları olduğu için paralel yazılabilir.

Claude commit atmaz. Codex OUTPUT.md sonuçlarını kendi worktree'lerinden okur, belirsiz iddia ve kararları denetler, ana repoda ayrı paket dosyalarına alır. Sonraki kod çalışmasında sadece kabul edilmiş paketler kişisel yazar/committer politikasıyla commit edilir; hook atlanmaz. Yeşil yerel test CI geçti anlamına gelmez.

## Durum ve kaynak

`work-packages.json`: 33 işin dalı, worktree'si, dosya kapsamı, sahipleri ve bağımlılıkları. `wp-01.md`–`wp-33.md`: görev devirleri. `TASK.md` worktree içinde aynı devri içerir. OUTPUT.md yalnız Claude gerçekten çalışıp tamamladığında oluşur.

Claude giriş doğrulaması başarılıdır. Gizli anahtar, sunucu veya hesap işlemi bu plana dahil değildir. Mevcut plan: https://karacaismail.github.io/ui-kit-platform/roadmap/#oncelik

## Paket indeksi

| Paket | İş | Kademe | Ön koşullar |
|---|---|---|---|
| [WP-01](./wp-01.md) | Yayın döngüsünü kurulumdan önce düzelt | Kritik | Yok |
| [WP-02](./wp-02.md) | Bütün adresleri ve yedek hedefini bir kerede iste | Kritik | WP-01 |
| [WP-03](./wp-03.md) | Sunucuyu kur ve canlıda kabul et | Kritik | WP-01, WP-02 |
| [WP-04](./wp-04.md) | Talebi mevcut demoyla sına | Kritik | Yok |
| [WP-05](./wp-05.md) | Tek kişiye bağlılığı kaldır | Kritik | Yok |
| [WP-06](./wp-06.md) | Karar kaydını tek kaynağa indir | Kritik | Yok |
| [WP-07](./wp-07.md) | Önündeki kararları ver | Olmazsa olmaz | WP-06 |
| [WP-08](./wp-08.md) | Kataloğu tek kaynağa taşı | Olmazsa olmaz | WP-07 |
| [WP-09](./wp-09.md) | Kullanıcı kodunu yalıt | Olmazsa olmaz | WP-02, WP-07 |
| [WP-10](./wp-10.md) | İlk adaptörü kanıtla | Olmazsa olmaz | WP-08, WP-09 |
| [WP-11](./wp-11.md) | Veriyi gelmeden önce koru | Olmazsa olmaz | WP-02, WP-07 |
| [WP-12](./wp-12.md) | Storybook’tan Pen’e otomatik yayını kur | Olmazsa olmaz | WP-07, WP-08, WP-11, WP-13 |
| [WP-13](./wp-13.md) | Storybook’u kendi origin’ine al | Olmazsa olmaz | WP-02, WP-09 |
| [WP-14](./wp-14.md) | Yayını görünür yap | Olmazsa olmaz | WP-03, WP-12 |
| [WP-15](./wp-15.md) | Adresleri kalıcı hale getir | Olmazsa olmaz | WP-08 |
| [WP-16](./wp-16.md) | Kalite kapılarını tamamla | Olmazsa olmaz | WP-08, WP-09, WP-10 |
| [WP-17](./wp-17.md) | Bağımsız kabul incelemesini başlat | Olmazsa olmaz | WP-01 |
| [WP-18](./wp-18.md) | Gerçek kullanımı ölç | Olmazsa olmaz | WP-04, WP-08 |
| [WP-19](./wp-19.md) | Tohum içeriği kanıtla doldur | Önemli | WP-04, WP-08 |
| [WP-20](./wp-20.md) | Hesap ve görünürlük kararlarını ver | Önemli | WP-07 |
| [WP-21](./wp-21.md) | Hukuki zemini kur | Önemli | WP-19, WP-20 |
| [WP-22](./wp-22.md) | Kullanıcı içeriğini güvenle aç | Önemli | WP-09, WP-19, WP-21 |
| [WP-23](./wp-23.md) | Kaydet, sürümle ve çatalla | Önemli | WP-11, WP-22 |
| [WP-24](./wp-24.md) | Paylaşımı tamamla | Önemli | WP-10, WP-15, WP-23 |
| [WP-25](./wp-25.md) | AI’yi ölçülü başlat | Önemli | WP-07, WP-18, WP-21 |
| [WP-26](./wp-26.md) | Ajan kimliğini insan kimliğinden ayır | Önemli | WP-12, WP-22, WP-25 |
| [WP-27](./wp-27.md) | Adı ve konumu netleştir | Pazarlanabilirlik | WP-04, WP-06 |
| [WP-28](./wp-28.md) | Kapıyı aç: tanıtım sayfası ve rehberler | Pazarlanabilirlik | WP-27, WP-24 |
| [WP-29](./wp-29.md) | Bulunabilir ol | Pazarlanabilirlik | WP-15, WP-24, WP-28 |
| [WP-30](./wp-30.md) | Ölç ve hedef koy | Pazarlanabilirlik | WP-18, WP-28, WP-29 |
| [WP-31](./wp-31.md) | Üreticileri kazan | Pazarlanabilirlik | WP-21, WP-23, WP-28 |
| [WP-32](./wp-32.md) | Lanse et | Pazarlanabilirlik | WP-28, WP-29, WP-30, WP-31 |
| [WP-33](./wp-33.md) | Bağımsız plan ve birleştirme incelemesi | İnceleme | WP-01, WP-02, WP-03, WP-04, WP-05, WP-06, WP-07, WP-08, WP-09, WP-10, WP-11, WP-12, WP-13, WP-14, WP-15, WP-16, WP-17, WP-18, WP-19, WP-20, WP-21, WP-22, WP-23, WP-24, WP-25, WP-26, WP-27, WP-28, WP-29, WP-30, WP-31, WP-32 |

## Kodlama sözleşmeleri

- [TDD planı](./tdd-plan.md): RED/GREEN/REFACTOR, gerçek komutlar, kritik regresyonlar ve ajan çıktıları için düzeltmeler.
- [OOP ve MVC/MVVM sözleşmesi](./coding-contract.md): framework sorumlulukları, sınıf sınırları ve 320 CSS px kabulü.

Ajan ham çıktılarındaki öneriler bu sözleşmeleri geçersiz kılmaz. Rutin teknik kapsamı Codex yönetir; mevcut kullanıcı kararı yeniden izin kapısı haline getirilmez.

## Claude sonuçları

32 görev çıktısı kendi worktree’lerinden `results/` altında toplandı. Bunlar ham ajan önerileridir; [TDD düzeltmeleri](./tdd-plan.md) ve bağımsız inceleme ile birlikte okunur. Test veya uygulama tamamlanması anlamına gelmez.

- [Birleştirme ve uygulama dalgaları](./integration-plan.md)
- [WP-01 — Yayın döngüsünü kurulumdan önce düzelt](./results/wp-01.md)
- [WP-02 — Bütün adresleri ve yedek hedefini bir kerede iste](./results/wp-02.md)
- [WP-03 — Sunucuyu kur ve canlıda kabul et](./results/wp-03.md)
- [WP-04 — Talebi mevcut demoyla sına](./results/wp-04.md)
- [WP-05 — Tek kişiye bağlılığı kaldır](./results/wp-05.md)
- [WP-06 — Karar kaydını tek kaynağa indir](./results/wp-06.md)
- [WP-07 — Önündeki kararları ver](./results/wp-07.md)
- [WP-08 — Kataloğu tek kaynağa taşı](./results/wp-08.md)
- [WP-09 — Kullanıcı kodunu yalıt](./results/wp-09.md)
- [WP-10 — İlk adaptörü kanıtla](./results/wp-10.md)
- [WP-11 — Veriyi gelmeden önce koru](./results/wp-11.md)
- [WP-12 — Storybook’tan Pen’e otomatik yayını kur](./results/wp-12.md)
- [WP-13 — Storybook’u kendi origin’ine al](./results/wp-13.md)
- [WP-14 — Yayını görünür yap](./results/wp-14.md)
- [WP-15 — Adresleri kalıcı hale getir](./results/wp-15.md)
- [WP-16 — Kalite kapılarını tamamla](./results/wp-16.md)
- [WP-17 — Bağımsız kabul incelemesini başlat](./results/wp-17.md)
- [WP-18 — Gerçek kullanımı ölç](./results/wp-18.md)
- [WP-19 — Tohum içeriği kanıtla doldur](./results/wp-19.md)
- [WP-20 — Hesap ve görünürlük kararlarını ver](./results/wp-20.md)
- [WP-21 — Hukuki zemini kur](./results/wp-21.md)
- [WP-22 — Kullanıcı içeriğini güvenle aç](./results/wp-22.md)
- [WP-23 — Kaydet, sürümle ve çatalla](./results/wp-23.md)
- [WP-24 — Paylaşımı tamamla](./results/wp-24.md)
- [WP-25 — AI’yi ölçülü başlat](./results/wp-25.md)
- [WP-26 — Ajan kimliğini insan kimliğinden ayır](./results/wp-26.md)
- [WP-27 — Adı ve konumu netleştir](./results/wp-27.md)
- [WP-28 — Kapıyı aç: tanıtım sayfası ve rehberler](./results/wp-28.md)
- [WP-29 — Bulunabilir ol](./results/wp-29.md)
- [WP-30 — Ölç ve hedef koy](./results/wp-30.md)
- [WP-31 — Üreticileri kazan](./results/wp-31.md)
- [WP-32 — Lanse et](./results/wp-32.md)

## Bağımsız inceleme sonucu

- [WP-33 bağımsız inceleme](./results/wp-33.md)
- [Codex entegrasyon düzeltmeleri](./codex-overrides.md): port çakışmaları, ortak sahiplik, yanlış WP bağımlılıkları, 320 matrisi ve TDD eksikleri.

Bulgular plan düzeyinde ele alındı; ikinci bağımsız kapanış incelemesi ve uygulama testleri yapılmadı. Bu teslim 33 worktree çıktısının belge konsolidasyonudur; ürün branch merge, deploy veya GitHub Pages yayını değildir.
