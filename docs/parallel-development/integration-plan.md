# Birleştirme ve görev sırası

Bu belge plan çıktılarının konsolidasyonunu ve sonraki kod PR sırasını ayırır. Claude plan sonuçları kendi worktree’lerinden alınır; henüz ürün kodu veya branch merge yapılmış sayılmaz.

## Dalga sırası

1. WP-01, WP-04, WP-05, WP-06
2. WP-02, WP-07, WP-17, WP-27
3. WP-03, WP-08, WP-09, WP-11, WP-20
4. WP-10, WP-13, WP-15, WP-18, WP-19
5. WP-12, WP-16, WP-21
6. WP-14, WP-22, WP-25
7. WP-23, WP-26
8. WP-24
9. WP-28
10. WP-29, WP-31
11. WP-30
12. WP-32
13. WP-33
Bu topolojik sıra uygulama ön koşullarını gösterir. Plan üretimi salt okunur olduğu için 32 paket bağımlılık çıktısını beklemeden paralel araştırıldı. Kodda Kritik kabul kapısı geçilmeden daha sonraki kademeler yayıma açılmaz. Talep araştırması ve pazarlama keşfi önceden yapılabilir.

## Ortak dosya sahipliği

| Ortak alan | Birleştirme kuralı |
|---|---|
| karar.json | WP-06 kayıt bütünlüğü, ardından WP-07/20/27 gibi karar eklemeleri seri |
| deploy/update.sh ve compose | WP-01, ardından ilgili origin/veri/yayın paketleri; host kabulü ayrı |
| katalog, iframe, web tokenları | WP-08 sözleşmesi sabitlenir; WP-09/10/19/24 sözleşmeye göre ilerler |
| API yazma/kimlik/veri | WP-11 veri güvenliği, WP-12 onaylı aktarım, sonra WP-22/23/25/26 |
| CI ve test yapılandırması | WP-16 sahipliğinde düzenlenir; diğer paketler testlerini ortak komutlara ekler |

## Kod birleşmesi kapısı

Her dilim için RED/GREEN/REFACTOR kanıtı, bağımsız risk incelemesi ve birleşmiş sonuçta ilgili kontroller gerekir. Yalnız ilgili faz kabul edildiğinde roadmap durumu ilerletilir. Gizli değerler dışarıda, public repo ve kişisel Git guard korunur. Gerçek host/DNS/hesap işlemi plan çıktısından otomatik yetki almaz.

Codex rutin test/config kapsamını yönetir. Hüseyin Cengiz gerçek kurulum/deploy/rollback kabulünü, Asistan Hüseyin verilen DNS kayıtlarını yönetir. İsmail Karaca ürün/lisans kararlarını verir.

Güncel tekil sahiplik ve WP-33 düzeltmeleri için [Codex entegrasyon ekleri](./codex-overrides.md) bağlayıcıdır.
