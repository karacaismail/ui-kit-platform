import type { PartStatus, PartTag, Roadmap, RoadmapPart } from './model.ts';

const part = (title: string, detail: string, status: PartStatus = 'planned', tags: PartTag[] = []): RoadmapPart => ({
  title,
  detail,
  status,
  tags
});

export const roadmap: Roadmap = {
  vision:
    "Pen, vibecoding ile üretilen arayüz bileşenlerinin canlı önizleme ve düzenlenebilir kodla paylaşıldığı çalışma alanıdır. Hedef: bir bileşeni tasarımdan Storybook'a, oradan yayına insan eli değmeden taşımak ve onu bulan kişinin (ya da ajanın) saniyeler içinde kendi koduna alabilmesi.",

  requirements: [
    {
      title: 'Tek kaynaklı bileşen sözleşmesi',
      detail:
        'Katalog, arama, önizleme, Free/Pro ve uyumluluk bilgisi tek şemalı kaynaktan üretilmeli. Bu olmadan ajanlar aynı bileşeni farklı yerlerde farklı tarif eder.'
    },
    {
      title: 'Güvenli çalışma zamanı',
      detail:
        'Kullanıcı ve AI kodu yalnız ayrı origin üzerindeki sandbox içinde çalışmalı. Eski projede önizleme uygulamanın kendi origin’inde çalışıyordu; izolasyon yoktu.'
    },
    {
      title: "Storybook'tan Pen'e yayın hattı",
      detail:
        'Onaylı sürüm; kimlik, sürüm, commit ve sağlama toplamı taşıyan bir manifestle gelir. Tekrar eden veya yarım kalan yayın kataloğu bozmamalı, geri alınabilmeli.'
    },
    {
      title: 'Kimlik ve yetki',
      detail:
        'Kaydetme, fork, özel proje ve Pro erişimi hesap gerektirir. Görünürlük kuralı her uçta denetlenmeli; eski projede özel snippet kimliği bilen herkese açıktı.'
    },
    {
      title: 'Veri güvenliği',
      detail:
        'Şema göçü aracı, sunucu dışı yedek ve geri yükleme provası. Kullanıcı verisi tutulmaya başlamadan önce hazır olmalı.'
    },
    {
      title: 'Kalite kapıları',
      detail:
        'Tip denetimi, lint, tarayıcı testleri, görsel regresyon ve erişilebilirlik kontrolleri her değişiklikte çalışır. Başarısızlığı gizleyen kapı kabul edilmez.'
    },
    {
      title: 'Soğuk başlangıç içeriği',
      detail:
        'Boş platform kimseyi tutmaz. Küratör hesabıyla tohum içerik ve GitHub, ZIP, Gist, CodePen içe aktarma köprüsü gerekir.'
    },
    {
      title: 'AI için maliyet ve güvenlik sınırı',
      detail:
        'Kullanım ölçümü, kota, anahtarların sunucuda şifreli saklanması ve çıktıların değerlendirme setiyle sınanması. Sınırsız AI çağrısı gelirden önce maliyeti büyütür.'
    },
    {
      title: 'Gelir modelinin netliği',
      detail:
        'Free ile Pro arasındaki fark etiket değil yetki olmalı. Önce çekirdek döngü sağlamlaşır, sonra ödeme eklenir; eski proje bunun tersini yaptı.'
    },
    {
      title: 'Lisans ve içerik hakları',
      detail:
        'Projenin açık kaynak lisansı ve kullanıcıların paylaştığı kodun lisansı seçilmeden topluluk içeriği kabul edilemez.'
    },
    {
      title: 'İşletim görünürlüğü',
      detail: 'Metrik, kayıt ve uyarı olmadan otomatik yayın körlemesine çalışır. Tek sunucu aynı zamanda tek arıza noktasıdır.'
    },
    {
      title: 'Karar kaydı disiplini',
      detail:
        'Vibecoding’de bağlamı ajan değil repo taşır. Her ürün kararı karar.json’a, her kural AGENTS.md’ye yazılır; yazılmayan karar bir sonraki oturumda yoktur.'
    }
  ],

  personas: [
    {
      name: 'Vibecoder',
      who: 'Ajanlarla tek başına üreten, yaptığını açıkta paylaşan geliştirici.',
      need: 'Fikri hızla çalışır bileşene çevirmek, paylaşılabilir bir adres almak, başkasının işinden çatallamak.',
      ai: 'Prompt’tan bileşen üretimi, hatadan yama önerisi, “prompt olarak kopyala” ile kendi ajanına bağlam aktarma.'
    },
    {
      name: 'Frontend geliştirici',
      who: 'Bir ürün takımında bileşeni kendi kod tabanına alacak kişi.',
      need: 'Hangi tarayıcı, giriş yöntemi ve ekranda kanıtla çalıştığını bilmek; kodu kendi framework’üne uyarlamak.',
      ai: 'Framework dönüştürme, erişilebilirlik bulgusundan düzeltme, dokunma ve hover uyarlaması, anlamsal arama.'
    },
    {
      name: 'Tasarımcı / design engineer',
      who: 'Open Design, Penpot veya Storybook’ta bileşen geliştiren kişi.',
      need: 'Tasarladığını kod yazmadan yayına taşımak; tema ve durum varyantlarını yan yana görmek.',
      ai: 'Tasarımdan bileşen ve story üretimi, tema ve yoğunluk varyantları, otomatik açıklama ve etiket taslağı.'
    },
    {
      name: 'Kod bilmeyen üretici',
      who: 'AI ile ürün kuran kurucu, ürün sahibi veya içerik üreticisi.',
      need: 'Hazır bileşeni anlamak, küçük değişiklik yapmak ve bozmadan kullanmak.',
      ai: '“Açıkla” ile sade dilde anlatım, doğal dille değişiklik isteği, güvenli sandbox’ta deneme.'
    },
    {
      name: 'Takım lideri / design system sahibi',
      who: 'Bir takımın veya kurumun bileşen kütüphanesinden sorumlu kişi.',
      need: 'Onaylı bileşenler, özel kütüphane, erişim denetimi ve denetim kaydı.',
      ai: 'Değişiklik önerilerine otomatik ön inceleme, takım kurallarını bilen paylaşılan AI bağlamı, sağlayıcı politikası.'
    },
    {
      name: 'AI ajanı',
      who: 'Claude Code, Codex veya benzeri bir ajan; insan adına bileşen arar ve kullanır.',
      need: 'Makinece okunur katalog, kararlı adresler ve dar yetkili araçlar.',
      ai: 'MCP araçları (arama, getirme, yayın köprüsü), bileşen manifesti ve llms.txt.'
    }
  ],

  phases: [
    {
      key: 'poc',
      stage: 'PoC',
      name: 'Çalışan kanıt ve otomatik yayın',
      goal: 'Tasarımın gerçek bir sitede çalıştığını ve her gönderimin kendiliğinden yayına gittiğini kanıtlamak.',
      exit: 'pen.atonota.net açılır; main dalına gönderilen değişiklik insan adımı olmadan canlıya çıkar.',
      vibecoding:
        'Kurallar AGENTS.md’de, kararlar karar.json’da. Ajan yalnız kapıdan geçen değişikliği yayınlayabilir; sunucuya doğrudan erişimi yoktur.',
      parts: [
        part('Etkileşimli tasarımın Astro’ya taşınması', 'Statik derlenen dokümantasyon kabuğu; API olmadan tam çalışır.', 'done'),
        part('Bileşen kataloğu ve paylaşılabilir filtreler', '25 bileşen; kategori, Free/Pro, deneysel ve cihaz filtreleri adres çubuğunda tutulur.', 'done'),
        part('Düzenlenebilir kod ve yalıtılmış önizleme', 'Kod değişince önizleme yenilenir; iframe yalnız allow-scripts ile çalışır ve ağa çıkamaz.', 'done', ['quality']),
        part('Görünüm modları', 'Teknik kartta dark, light ve accessibility temaları.', 'done'),
        part('Klavye ile komut araması', 'Ctrl/⌘ K ile açılan, odağı sahiplenen arama.', 'done'),
        part('Storybook', 'Üretim tokenlarını ve stillerini doğrudan kullanan hikâyeler; erişilebilirlik eklentisi açık.', 'done'),
        part('FastAPI ve PostgreSQL başlangıç sınırı', 'Sağlık uçları ve boş /api/components ucu; alan modeli bilinçli olarak ertelendi.', 'done', ['infra']),
        part('Tarayıcı testleri', 'Chromium, Firefox ve WebKit; 320 pikselden 1440 piksele beş profil.', 'done', ['quality']),
        part('GitHub Pages demosu', 'Alt dizin altında çalışan herkese açık demo; site ve Storybook birlikte.', 'done', ['infra']),
        part('CI: lint, tip denetimi, testler, imaj ve duman testi', 'Kapılar geçmeden imaj yayınlanmaz; CodeQL ve Dependabot yanında çalışır.', 'done', ['infra', 'quality']),
        part('Tek seferlik kurulum betiği ve çekme tabanlı yayın', 'Sunucudaki zamanlayıcı main’i izler; sağlıksız sürümde öncekine döner. GitHub’da sunucu sırrı yoktur.', 'done', ['infra']),
        part('Yol haritası sayfası', 'Bu sayfa. Plan kodla aynı repoda durur ve aynı kapılardan geçer.', 'done'),
        part('Sunucuda ilk kurulum, DNS ve TLS', 'Kurulum betiğinin Hetzner’de bir kez çalıştırılması ve pen.atonota.net’in yönlendirilmesi.', 'next', ['infra']),
        part('Açık kaynak lisansının seçilmesi', 'Repo herkese açık ama lisanssız; katkı ve yeniden kullanım için lisans gerekir.', 'next', ['business'])
      ]
    },
    {
      key: 'pre-mvp',
      stage: 'MVP öncesi',
      name: 'Sözleşmeler ve tek kaynak',
      goal: 'Elle yazılmış katalog verisini şemalı tek kaynağa taşımak ve çalışma zamanını çoklu framework’e hazırlamak.',
      exit: 'Yeni bileşen eklemek tek bir tanım dosyası ve bir Markdown dosyası yazmaktır; katalog, arama ve önizleme bundan üretilir.',
      vibecoding:
        'Her parça tek değişiklik isteği ve önce başarısız testtir. Şema bir kez yazılır; ajan bileşen eklerken iframe, bundler veya mesajlaşma ayrıntısına dokunmaz.',
      parts: [
        part('Bileşen metadata şeması', 'Her bileşen için şema doğrulamalı TypeScript tanımı ve aynı kimliğe bağlı Markdown içerik.', 'next'),
        part('Monorepo paket sınırları', 'content-schema, example-runtime, design-tokens ve testing paketleri; tek yönlü bağımlılık.'),
        part('Mevcut 25 bileşenin şemaya taşınması', 'Elle yazılmış veri dosyasındaki katalog, davranış değişmeden yeni kaynağa aktarılır.'),
        part('Dosya içi metadata’dan katalog üretimi', 'Bileşen bilgisini dosyanın başındaki yorumdan okuyan tarayıcı; elle tutulan liste yok.', 'planned', ['legacy']),
        part('Önizleme motoru, katman 1', 'Sucrase ve esm.sh import map ile WASM indirmeden anında önizleme. Eski projede çalıştığı kanıtlandı.', 'planned', ['legacy']),
        part('Monaco editörün koşullu yüklenmesi', 'Editör yalnız düzenleme başladığında indirilir; ilk açılış paketi büyümez.'),
        part('Framework adaptörleri: React, Vue, Web Components', 'Framework başına bir iframe şablonu; sayfa ile postMessage üzerinden konuşur.', 'planned', ['legacy']),
        part('Önizlemenin ayrı origin’e taşınması', 'Kullanıcı kodu uygulamanın çerezlerine ve depolamasına hiçbir koşulda erişemez.', 'planned', ['legacy', 'quality']),
        part('İstemci tarafı arama indeksi', 'Derleme sırasında üretilen indeks; API anahtarı veya dış servis gerekmez.'),
        part('Kalıcı ve okunur adresler', 'Bileşen, bölüm ve framework anlamlı yol parçalarıyla ifade edilir; iç kimlik adrese çıkmaz.'),
        part('Uyumluluk kanıtının metadata’ya bağlanması', 'Bir kombinasyon yalnız bağlı test kanıtı varsa “supported” görünür; kanıtsız olan “not tested” kalır.', 'planned', ['quality']),
        part('Görsel regresyon ve axe kapıları', 'Sabit ortamda deterministik ekran karşılaştırması ve otomatik erişilebilirlik kontrolü.', 'planned', ['quality']),
        part('Performans bütçesi', 'Aktarılan bayt ve ilk etkileşim süresi profil başına ölçülür; aşan değişiklik birleşmez.', 'planned', ['quality']),
        part('Ajanlar için makinece okunur çıktı', 'Her bileşen için JSON manifest ve site kökünde llms.txt; ajan kataloğu kazımadan okur.', 'planned', ['ai']),
        part('Şema göçü aracı ve sunucu dışı yedek', 'Veritabanı değişiklikleri sürümlü göçlerle uygulanır; yedek başka bir yerde tutulur.', 'planned', ['infra']),
        part('Marka tokenlarının kesinleştirilmesi', 'Nötr koyu kimlik tek bir token setine bağlanır; referans alınan temalar kopyalanmaz.')
      ]
    },
    {
      key: 'mvp',
      stage: 'MVP',
      name: 'Storybook’tan Pen’e hat ve paylaşılabilir bileşen',
      goal: 'Storybook’ta onaylanan bileşenin kendiliğinden Pen’de yayınlanması ve her bileşenin tek adresle paylaşılabilmesi.',
      exit: 'Storybook RC’ye terfi eden bir bileşen, elle adım olmadan Pen kataloğunda görünür ve /s/ adresiyle paylaşılır.',
      vibecoding:
        'Yayın köprüsü dar yetkili tek araçtır; ajan serbest komut çalıştırmaz. Her yayın idempotenttir, bu yüzden ajan aynı işi iki kez gönderse de sonuç değişmez.',
      parts: [
        part('Bileşen yayın manifesti', 'Kimlik, sürüm, commit, sağlama toplamı, framework, tema ve uyumluluk bilgisini bağlayan tek belge.'),
        part('FastAPI yayın alma ucu', 'Kimliği doğrulanmış, idempotent yayın; aynı manifest ikinci kez gelirse kopya oluşmaz.', 'planned', ['infra']),
        part('Kataloğun API’den beslenmesi', '/api/components veritabanından okur; site API’ye ulaşamazsa statik veriye döner.'),
        part('Storybook RC terfisi ile otomatik yayın', 'Onaylı sürüm iki değişmez çıktı üretir: Storybook sitesi ve bileşen kaynak paketi.', 'planned', ['infra']),
        part('Storybook beta ortamı', 'Deneysel derleme; Pen’e yayın tetiklemez.'),
        part('Yayın geri alma ve sürüm koruması', 'Geç gelen veya eski sürümlü yayın kataloğu geriletmez; başarısız yayın Pen’i değiştirmez.'),
        part('MCP yayın köprüsü', 'components.sync_release adlı tek araç; yayın için her seferinde dil modeli gerekmez.', 'planned', ['ai', 'infra']),
        part('Kısa paylaşım adresi', '/s/<kimlik> biçiminde, kalıcı ve kopyalanabilir adres.', 'planned', ['legacy']),
        part('Gömme rotası', 'Başka sitelerin çerçeveleyebileceği önizleme; frame izinleri yalnız bu rotada açılır.', 'planned', ['legacy']),
        part('Katalog kartlarında canlı mini önizleme', 'Ekran görüntüsü yerine çalışan küçük önizleme; görünür olduğunda yüklenir.', 'planned', ['legacy']),
        part('Çok dosyalı bileşen', 'Birden çok dosya ve framework alanı ilk günden veri modelinde.', 'planned', ['legacy']),
        part('Dışa aktarım', 'Kopyala, .zip indir ve harici playground’a anahtarsız gönder.'),
        part('Tohum içerik', 'Küratör hesabıyla ilk 100 bileşen; eski animasyon arşivinden seçilenler dahil.', 'planned', ['legacy', 'business']),
        part('İlk AI özelliği: Açıkla', 'Seçili kodu sade dille anlatır. Kod çalıştırmaz, yalnız okur.', 'planned', ['ai', 'legacy']),
        part('Gizlilik dostu temel ölçüm', 'Hangi bileşenin açıldığı ve kopyalandığı; kişisel veri toplamadan.', 'planned', ['business']),
        part('Hata ve boş durum sayfaları', 'Bulunamayan bileşen, kapalı API ve derleme hatası için açık geri bildirim.', 'planned', ['quality'])
      ]
    },
    {
      key: 'post-mvp-x',
      stage: 'MVP sonrası · X',
      name: 'Hesaplar ve kendi çalışman',
      goal: 'Ziyaretçiyi üreticiye çevirmek: kaydetme, sürüm, fork ve içe aktarma.',
      exit: 'Bir kullanıcı giriş yapar, bir bileşeni çatallar, değiştirir, kaydeder ve özel tutabilir.',
      vibecoding:
        'Yetki kuralı tek yerde yazılır ve her uç için “yetkisiz istek reddedilir” testi vardır. Ajan yeni uç eklerken bu testi yazmadan kapıdan geçemez.',
      parts: [
        part('Kimlik doğrulama', 'OIDC ve GitHub ile giriş. Sağlayıcı seçimi karar gerektirir; eski projede Keycloak kurulumu sürekli sorun çıkardı.', 'planned', ['legacy']),
        part('Kendi snippet’ini kaydetme', 'Taslak ve yayınlanmış durum; sahibi dışında kimse düzenleyemez.', 'planned', ['legacy']),
        part('Her kayıtta sürüm geçmişi', 'Sürüm tüm dosyaları saklar. Eski projede yalnız tek dosya saklanıyor, çok dosyalı geçmiş kayboluyordu.', 'planned', ['legacy']),
        part('Fork ve soy bilgisi', 'Çatal; dosyaları, framework’ü ve kaynağını taşır.', 'planned', ['legacy']),
        part('Görünürlüğün her uçta zorlanması', 'Özel içerik okuma, fork ve gömme uçlarında da denetlenir.', 'planned', ['legacy', 'quality']),
        part('Profil sayfası', 'Kullanıcının herkese açık çalışmaları ve çatalları.', 'planned', ['legacy']),
        part('İçe aktarma köprüsü', 'GitHub deposu, ZIP, Gist ve CodePen’den içe aktarma.', 'planned', ['legacy']),
        part('Hız sınırı ve kötüye kullanım koruması', 'Okuma ve yazma için ayrı sınırlar.', 'planned', ['infra']),
        part('Veri dışa aktarma ve hesap silme', 'KVKK ve GDPR için kullanıcının kendi verisini alması ve silmesi.', 'planned', ['legacy']),
        part('Kullanıcı içeriği lisansı ve kullanım koşulları', 'Paylaşılan kodun hangi lisansla sunulduğu kayıt sırasında açıkça seçilir.', 'planned', ['business']),
        part('İşlemsel e-postalar', 'Doğrulama, parola ve güvenlik bildirimleri.'),
        part('Yönetim paneli, ilk sürüm', 'Kullanıcı, içerik ve işlem kaydı.', 'planned', ['legacy'])
      ]
    },
    {
      key: 'post-mvp-y',
      stage: 'MVP sonrası · Y',
      name: 'AI çalışma arkadaşı',
      goal: 'AI’yi süs değil, bileşen üretme ve uyarlama işinin parçası yapmak.',
      exit: 'Kullanıcı bir prompt ile bileşen üretir, hatasını düzelttirir ve başka bir framework’e çevirtir; her çağrı ölçülür.',
      vibecoding:
        'AI özellikleri değerlendirme setiyle gelir: sabit girdiler, beklenen özellikler ve geçme eşiği. Model veya prompt değişikliği bu setten geçmeden birleşmez.',
      parts: [
        part('AI geçidi', 'Sağlayıcıdan bağımsız tek giriş; kullanım ölçümü ve kullanıcı başına kota.', 'planned', ['ai', 'legacy']),
        part('Yerel model varsayılanı ve kendi anahtarını getir', 'Anahtarlar sunucuda gerçek anahtar yönetimiyle şifrelenir; tarayıcıya hiç gitmez.', 'planned', ['ai', 'legacy']),
        part('Düzelt', 'Konsol hatasından yama önerisi; değişiklik fark olarak gösterilir, kullanıcı onaylar.', 'planned', ['ai', 'legacy']),
        part('Prompt’tan bileşen üretimi', 'Çıktı şemaya uygun bir bileşen taslağıdır ve yalnız sandbox’ta çalışır.', 'planned', ['ai', 'legacy']),
        part('Varyant üretimi', 'Aynı bileşenin tema, yoğunluk ve durum varyantları.', 'planned', ['ai']),
        part('Framework dönüştürme', 'HTML, React, Vue ve Web Component arasında çeviri; sonuç önizlemede doğrulanır.', 'planned', ['ai']),
        part('Erişilebilirlik yardımcısı', 'axe bulgusunu açıklar ve düzeltme önerir.', 'planned', ['ai', 'quality']),
        part('Giriş yöntemi uyarlaması', 'Hover’a bağlı etkileşimi dokunma ve klavye için uyarlar.', 'planned', ['ai']),
        part('Anlamsal arama', 'Ne yaptığını tarif ederek bulma ve “buna benzer” önerisi.', 'planned', ['ai']),
        part('Otomatik etiket ve açıklama taslağı', 'Yayın öncesi etiket, açıklama ve kullanım notu önerisi; yazar onaylar.', 'planned', ['ai']),
        part('Prompt olarak kopyala', 'Bileşeni, kurallarını ve bağımlılıklarını Claude Code veya Codex’e verilecek bağlam paketi olarak kopyalar.', 'planned', ['ai']),
        part('AI Smart Paste', 'Yapıştırılan kodun framework’ünü ve bağımlılıklarını tanır.', 'planned', ['ai', 'legacy']),
        part('Değerlendirme seti ve kalite kapısı', 'AI çıktıları sabit örneklerle sınanır; gerileme birleşmeyi durdurur.', 'planned', ['ai', 'quality']),
        part('AI güvenlik sınırı', 'Üretilen kod yalnız sandbox’ta çalışır; modele sır, ortam değişkeni veya başka kullanıcının verisi gitmez.', 'planned', ['ai', 'quality'])
      ]
    },
    {
      key: 'post-mvp-z',
      stage: 'MVP sonrası · Z',
      name: 'Topluluk ve keşif',
      goal: 'Üretilen içeriğin bulunmasını ve üreticilerin geri gelmesini sağlamak.',
      exit: 'Yeni bir ziyaretçi arama motorundan bir bileşene gelir, benzerlerini keşfeder ve bir üreticiyi takip eder.',
      vibecoding:
        'Sosyal özellikler çekirdek döngü sağlamlaştıktan sonra gelir. Her özellik için ölçülecek davranış önceden yazılır; ölçülmeyen özellik eklenmez.',
      parts: [
        part('Beğeni, görüntülenme ve kaydetme', 'Temel etkileşim sayaçları.', 'planned', ['legacy']),
        part('Koleksiyonlar', 'Kullanıcının bileşenleri gruplaması ve paylaşması.', 'planned', ['legacy']),
        part('Takip ve akış', 'Trend, yeni ve takip edilenler sekmeleri.', 'planned', ['legacy']),
        part('Zaman ağırlıklı trend', 'Eski projede trend “en çok beğenilen”di; eski içerik hep üstte kalıyordu.', 'planned', ['legacy']),
        part('Yorumlar', 'Bileşene, satıra veya öğeye iliştirilen yorum.', 'planned', ['legacy']),
        part('Canlı bildirimler', 'Fork, yorum ve takip için anlık bildirim.', 'planned', ['legacy']),
        part('Meydan okumalar', 'Haftalık veya aylık konu ve gönderimler; içerik ve geri dönüş motoru.', 'planned', ['legacy']),
        part('Fork ağacı ve itibar', 'Bir bileşenin türevlerinin görsel soyağacı.', 'planned', ['legacy']),
        part('Sunucu tarafı arama', 'PostgreSQL tam metin ve trigram; ayrı arama motoru gerekene kadar yeterli.', 'planned', ['legacy']),
        part('Arama motoru iniş sayfaları', '/component/<framework>/<ad> biçiminde, her bileşen için dizine eklenebilir sayfa.', 'planned', ['legacy', 'business']),
        part('Karşılaştırma görünümü', 'İki bileşeni yan yana açma.', 'planned', ['legacy']),
        part('Bildirme ve moderasyon kuyruğu', 'Kullanıcı bildirimi, inceleme kuyruğu ve işlem kaydı.', 'planned', ['quality']),
        part('Zararlı kod taraması', 'Yayın öncesi otomatik tarama ve AI ile ön eleme; eski projede hiç yoktu.', 'planned', ['ai', 'quality']),
        part('Paylaşım kartları', 'Bağlantı paylaşıldığında bileşenin önizleme görseli.')
      ]
    },
    {
      key: 'post-mvp-a',
      stage: 'MVP sonrası · A',
      name: 'Pro ve gelir',
      goal: 'Free ile Pro farkını yetkiye bağlamak ve ilk geliri almak.',
      exit: 'Bir kullanıcı Pro’ya geçer, özel proje açar ve Pro bileşenin kodunu indirir; iptal ve iade çalışır.',
      vibecoding:
        'Plan sınırları veri olarak tutulur ve tek yerde denetlenir. Ödeme akışı sağlayıcının test moduyla uçtan uca sınanmadan canlıya çıkmaz.',
      parts: [
        part('Free/Pro anlamının yetkiye bağlanması', 'Bugün kilit yalnız arayüzde; kod erişimi sunucuda denetlenmeli.', 'planned', ['business']),
        part('Plan tablosu ve tek noktadan denetim', 'Sınırlar kodda değil veride; tek bir denetim katmanı.', 'planned', ['legacy']),
        part('Abonelik ödemesi', 'Ödeme, müşteri portalı ve webhook.', 'planned', ['legacy', 'business']),
        part('Özel projeler', 'Ana Pro özelliği.', 'planned', ['legacy']),
        part('Varlık barındırma', 'Görsel ve font yükleme; plan başına kota.', 'planned', ['legacy']),
        part('Pro bileşen teslimi', 'İndirme ve lisans kaydı.', 'planned', ['business']),
        part('AI kotalarının plana bağlanması', 'Günlük AI isteği sınırı plandan gelir.', 'planned', ['ai', 'business']),
        part('Fatura, vergi ve iade', 'Yasal belgeler ve iade süreci.', 'planned', ['business']),
        part('Gelir ve dönüşüm panosu', 'Deneme, dönüşüm ve kayıp oranları.', 'planned', ['business']),
        part('Kullanım bazlı fiyat denemesi', 'AI ve barındırma için kullandıkça öde seçeneği.', 'planned', ['legacy', 'business'])
      ]
    },
    {
      key: 'post-mvp-b',
      stage: 'MVP sonrası · B',
      name: 'Ekosistem ve araç entegrasyonları',
      goal: 'Bileşenleri insanların ve ajanların zaten çalıştığı araçlara taşımak.',
      exit: 'Bir ajan MCP üzerinden bileşen arar ve projeye ekler; bir tasarımcı tasarım aracından Pen’e yayınlar.',
      vibecoding:
        'Her entegrasyon ayrı ve dar yetkili bir adaptördür. Ekran kazıma yok; kaynak her zaman manifesttir.',
      parts: [
        part('MCP sunucusu: arama ve getirme', 'components.search ve components.get; salt okunur, kimlik doğrulamalı.', 'planned', ['ai']),
        part('Open Design’dan bileşen ve story üretimi', 'Tasarımdan bileşen kaynağı ve hikâye; beta ortamına düşer.', 'planned', ['ai']),
        part('Penpot ve Figma bağlantısı', 'Tasarım bileşeni ile kod bileşeni arasında eşleme.'),
        part('Telefondan talimatla bileşen', 'Talimat, kalıcı iş, sonuç adresi; telefon kapansa da iş sürer.', 'planned', ['ai']),
        part('VS Code eklentisi ve CLI', 'Editörden arama ve tek komutla projeye ekleme.', 'planned', ['legacy']),
        part('Paket olarak dışa aktarım', 'npm paketi, Web Component veya React bileşeni.', 'planned', ['legacy']),
        part('Sayfada durumlar ve kontroller', 'Storybook tarzı prop ve durum denetimleri bileşen sayfasında.', 'planned', ['legacy']),
        part('Genel API ve API anahtarları', 'Belgelenmiş, sürümlü ve hız sınırlı API.'),
        part('Webhook’lar', 'Yayın, fork ve yorum olayları.'),
        part('Ek framework adaptörleri', 'Angular, Svelte, Alpine ve three.js.'),
        part('WebContainer katmanı', 'Tam Node çalışma zamanı gerektiren örnekler için; yalnız gerektiğinde yüklenir.', 'planned', ['legacy']),
        part('Tek tıkla yayın', 'Bileşeni statik sayfa olarak barındırma.', 'planned', ['legacy'])
      ]
    },
    {
      key: 'post-mvp-c',
      stage: 'MVP sonrası · C',
      name: 'Takımlar ve birlikte çalışma',
      goal: 'Tek kişilik kullanımdan takım kütüphanesine geçmek.',
      exit: 'Bir takım özel kütüphanesini kurar, bir değişiklik önerir, inceler ve onaylı sürümü yayınlar.',
      vibecoding:
        'Takım kuralları ajanların okuyacağı biçimde saklanır. Ajan öneri açar; onay insandadır.',
      parts: [
        part('Çalışma alanları', 'Organizasyon, üyeler ve roller.'),
        part('Takıma özel bileşen kütüphanesi', 'Yalnız üyelerin gördüğü katalog.'),
        part('Gerçek zamanlı ortak düzenleme', 'Aynı bileşende eşzamanlı çalışma.', 'planned', ['legacy']),
        part('Değişiklik önerisi ve inceleme', 'Fark, yorum ve onay akışı.'),
        part('AI ön inceleme', 'Öneriye erişilebilirlik, token kullanımı ve kırıcı değişiklik açısından otomatik ön yorum.', 'planned', ['ai']),
        part('Takım token setleri', 'Bileşenleri takımın markasıyla önizleme.'),
        part('Onaylı bileşen rozetleri', 'İncelenmiş ve sürümü sabitlenmiş bileşenler.'),
        part('Paylaşılan AI bağlamı', 'Takımın kuralları ve tercihleri tüm AI çağrılarına eklenir.', 'planned', ['ai']),
        part('Özel npm kayıt defteri bağlantısı', 'Takımın kendi paketleriyle önizleme.', 'planned', ['legacy']),
        part('Koltuk bazlı takım faturası', 'Üye sayısına göre ücretlendirme.', 'planned', ['business'])
      ]
    },
    {
      key: 'enterprise',
      stage: 'Enterprise',
      name: 'Kurumsal',
      goal: 'Kurumların güvenlik, uyum ve dağıtım gereksinimlerini karşılamak.',
      exit: 'Bir kurum kendi sunucusuna kurar, kendi kimlik sağlayıcısıyla giriş yapar ve her işlemi denetim kaydında görür.',
      vibecoding:
        'Self-host dağıtımı bugünkü kurulum betiği ve Compose yığınının devamıdır; ayrı bir ürün dalı açılmaz.',
      parts: [
        part('SSO/SAML ve SCIM', 'Kurumsal giriş ve kullanıcı eşitleme.', 'planned', ['legacy']),
        part('Ayrıntılı rol ve yetki modeli', 'Kütüphane, koleksiyon ve bileşen düzeyinde yetki.', 'planned', ['legacy']),
        part('Denetim kaydı', 'Kim, neyi, ne zaman değiştirdi; dışa aktarılabilir.', 'planned', ['legacy']),
        part('Self-host dağıtımı', 'Mevcut kurulum betiği temelinde, kurumun kendi sunucusunda.', 'planned', ['legacy', 'infra']),
        part('Veri yerleşimi ve saklama politikaları', 'Verinin nerede ve ne kadar tutulacağı ayarlanabilir.'),
        part('AI politika denetimi', 'İzinli sağlayıcılar, özel model uç noktası ve AI çağrı kaydı.', 'planned', ['ai']),
        part('Güvenlik programı', 'SOC 2 hazırlığı ve bağımsız sızma testi.', 'planned', ['legacy', 'quality']),
        part('Özel alan adı ve beyaz etiket', 'Kurumun kendi adresi ve markası.', 'planned', ['legacy']),
        part('SLA, destek ve durum sayfası', 'Yanıt süresi taahhüdü ve herkese açık durum bilgisi.', 'planned', ['business']),
        part('Kurumsal sözleşme ve veri işleme eki', 'Hukuki belgeler ve lisans uyumu.', 'planned', ['business'])
      ]
    },
    {
      key: 'maturity',
      stage: 'Maturity',
      name: 'Olgunluk',
      goal: 'Platformu ölçülebilir, dayanıklı ve sürdürülebilir kılmak.',
      exit: 'Bir arıza uyarıyla fark edilir, yedekten geri dönülür ve sonuç ölçümlerle doğrulanır; hiçbiri tek kişinin hafızasına bağlı değildir.',
      vibecoding:
        'Olgunluk bir faz kadar bir alışkanlıktır: her fazın çıkışında bu listeden ilgili parçalar yeniden sınanır.',
      parts: [
        part('Gözlemlenebilirlik', 'Metrik, iz ve uyarı; yayın başarısızlığı kayıtta kalmaz, haber verilir.', 'planned', ['infra']),
        part('Geri yükleme provası ve felaket kurtarma', 'Yedekten dönüş düzenli olarak denenir.', 'planned', ['infra']),
        part('Yedekli mimari', 'Tek sunucudan birden çok örneğe geçiş.', 'planned', ['infra']),
        part('Sürekli performans ölçümü', 'Bütçeler gerçek kullanıcı verisiyle izlenir.', 'planned', ['quality']),
        part('Çok dilli içerik', 'Ana dil İngilizce; route ve içerik sistemi çok dile hazır.'),
        part('Bağımsız erişilebilirlik denetimi', 'Otomatik kontrolün ötesinde, gerçek yardımcı teknolojilerle.', 'planned', ['quality']),
        part('Gerçek cihaz test matrisi', 'iOS Safari, Android ve hedef cihazlar emülasyondan ayrı raporlanır.', 'planned', ['quality']),
        part('Sürümleme ve kullanımdan kaldırma politikası', 'SemVer 2.0; kırıcı değişiklik önceden duyurulur.'),
        part('AI kalite ve maliyet yönetişimi', 'Model değişikliklerinin kalite ve maliyet etkisi düzenli raporlanır.', 'planned', ['ai']),
        part('Topluluk yönetişimi', 'Katkı rehberi, davranış kuralları ve yol haritasına geri bildirim.'),
        part('Maliyet ve kapasite planı', 'Barındırma, AI ve depolama maliyetinin kullanıcı başına izlenmesi.', 'planned', ['business']),
        part('Karar kaydının gözden geçirilmesi', 'Geçersiz kalan kararlar işaretlenir; kayıt gerçeği yansıtmaya devam eder.')
      ]
    }
  ]
};
