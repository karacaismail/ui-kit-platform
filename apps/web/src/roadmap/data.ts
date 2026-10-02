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
      title: 'Talep kanıtı',
      detail:
        'Ürün yüzeyi büyümeden önce hedef kullanıcıların bileşeni bulup kendi projesinde gerçekten çalıştırdığı gösterilmeli. Kopyalama sayısı bunun kanıtı değildir.'
    },
    {
      title: 'Pazarlanabilirlik',
      detail:
        'Tek ad, tek cümlelik konum, tanıtım sayfası, rehberler ve ölçülen bir huni olmadan lansman yapılmaz. Çalışan ama anlatılamayan ürün bulunamaz.'
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
      name: 'Küratör / moderatör',
      who: 'Tohum içeriği seçen, bildirimleri inceleyen ve kataloğun kalitesini koruyan kişi.',
      need: 'Toplu içe aktarma, inceleme kuyruğu, hızlı kaldırma ve her işlemin kaydı.',
      ai: 'Zararlı kod ve kopya için ön eleme, etiket ve açıklama taslağı, benzer içerik uyarısı.'
    },
    {
      name: 'Platform işletim sorumlusu',
      who: 'Sunucuyu, yayını ve güvenliği işleten DevOps mühendisi.',
      need: 'Tek komutla kurulum, görünür yayın durumu, geri alma ve olay anında izlenecek adımlar.',
      ai: 'Dar yetkili MCP araçlarıyla durum sorgulama; yayın ve silme kararları insanda kalır.'
    },
    {
      name: 'AI ajanı',
      who: 'Claude Code, Codex veya benzeri bir ajan; insan adına bileşen arar ve kullanır.',
      need: 'Makinece okunur katalog, kararlı adresler ve dar yetkili araçlar.',
      ai: 'MCP araçları (arama, getirme, yayın köprüsü), bileşen manifesti ve llms.txt.'
    }
  ],

  priorities: [
    {
      key: 'kritik',
      name: 'Kritik',
      gate: 'Sunucu Hüseyin Cengiz’in tek seferlik kurulumuyla çalışıyor, main’e her gönderim insan adımı olmadan canlıya çıkıyor, yayın yetkisi tek kişiye bağlı değil ve ürünün kime yaradığı ilk kullanıcılarla görüldü.',
      steps: [
        {
          title: 'Yayın döngüsünü kurulumdan önce düzelt',
          why: 'Kurulum bir kez yapılacak. Kurulumdan sonra bulunan bir döngü hatası Hüseyin Cengiz’i sunucuya geri çağırır.',
          owners: ['İsmail Karaca'],
          sources: ['UU-15', 'UU-16', 'UU-17', 'UU-18'],
          parts: ['Son yeşil sürümün kurulması', 'Sağlık ucunun gerçek durumu bildirmesi', 'PostgreSQL imajı ve sunucu birimlerinin sürüme bağlanması']
        },
        {
          title: 'Bütün adresleri ve yedek hedefini bir kerede iste',
          why: 'Storybook ve kullanıcı kodu için ayrı origin ile yedek hedefi sonradan istenirse DNS ve sunucu işi tekrarlanır. Kullanıcı kodunun ayrı bir kayıtlı alan adında çalışması oturum çerezini korur.',
          owners: ['İsmail Karaca', 'Hüseyin Cengiz', 'Asistan Hüseyin'],
          sources: ['UU-01', 'UU-02', 'GAP-18', 'GAP-26'],
          parts: ['Tek seferlik alan adı ve origin planı', 'Sunucu dışı yedek hedefi']
        },
        {
          title: 'Sunucuyu kur ve canlıda kabul et',
          why: 'Bugün hiçbir şey sunucuda çalışmıyor; otomatik yayın canlıda kanıtlanmadı.',
          owners: ['Hüseyin Cengiz', 'Asistan Hüseyin'],
          sources: ['GAP-03'],
          parts: ['Sunucuda ilk kurulum, DNS ve TLS']
        },
        {
          title: 'Talebi mevcut demoyla sına',
          why: 'MVP’ye kadar F1 ve F2’de 48 parça var. Hedef kullanıcıların bileşeni gerçekten kullanıp kullanmadığı bu yatırımdan önce görülmeli; kurulumla paralel yürür.',
          owners: ['İsmail Karaca'],
          sources: ['UU-05', 'UU-07'],
          parts: ['Talep doğrulaması']
        },
        {
          title: 'Tek kişiye bağlılığı kaldır',
          why: 'Bütün yayın yetkisi tek GitHub hesabında. Hesap kaybında güvenlik düzeltmesi bile yayınlanamaz.',
          owners: ['İsmail Karaca', 'Hüseyin Cengiz'],
          sources: ['UU-25'],
          parts: ['Hesap ve yayın yetkisinin yedeklenmesi']
        },
        {
          title: 'Karar kaydını tek kaynağa indir',
          why: 'İki karar.json ayrışmış; ajanlar çelişen kararlarla çalışıyor ve geçici yollardaki görsel kanıtlar temiz kopyada kayboluyor.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-01', 'UU-23'],
          parts: ['Karar kayıtlarının uzlaştırılması']
        }
      ]
    },
    {
      key: 'olmazsa-olmaz',
      name: 'Olmazsa olmaz',
      gate: 'İlk dış kullanıcı siteyi kullanabilir: kod ayrı alan adında güvenle çalışır, katalog tek kaynaktan gelir, Storybook’ta onaylanan bileşen kendiliğinden yayına çıkar, veri yedeklidir, adresler kalıcıdır ve gerçek kullanım ölçülür.',
      steps: [
        {
          title: 'Önündeki kararları ver',
          why: 'Bu kararlar olmadan backend ve önizleme işleri başlayamaz; lisans olmadan dışarıdan katkı ve içerik kabul edilemez.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-16', 'GAP-08'],
          parts: ['Açık kaynak lisansının seçilmesi', 'Backend olgunluk düzeyi ve yayın alan modeli onayı', 'Hafif önizleme katmanı kararı']
        },
        {
          title: 'Kataloğu tek kaynağa taşı',
          why: 'Katalog bugün elle yazılmış iki dosyada. Her yeni bileşen ve her yayın bu kaynağa dayanacak.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-07'],
          parts: ['Bileşen metadata şeması', 'Mevcut 26 bileşenin şemaya taşınması', 'Metadata dosyalarının taranmasıyla katalog üretimi']
        },
        {
          title: 'Kullanıcı kodunu yalıt',
          why: 'Dış kullanıcının kodu çalışmaya başlamadan önce kod ayrı alan adında ve kaynak sınırlarıyla çalışmalı.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-15', 'UU-02', 'UU-04'],
          parts: ['Önizlemenin ayrı origin’e taşınması', 'Güvenilmeyen kod için tehdit modeli ve kaynak sınırları']
        },
        {
          title: 'İlk adaptörü kanıtla',
          why: 'Adaptör sözleşmesi tek framework’le kanıtlanır, diğerleri aynı sözleşmenin üzerine eklenir. Karar kaydındaki listenin ilki React’tir.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-08'],
          parts: ['Derlenmiş kanonik önizleme', 'Framework adaptör sözleşmesi']
        },
        {
          title: 'Veriyi gelmeden önce koru',
          why: 'İlk kullanıcı verisi yazılmadan önce göç, eski sürümle uyum ve geri yükleme sınanmış olmalı.',
          owners: ['İsmail Karaca', 'Hüseyin Cengiz'],
          sources: ['GAP-26', 'UU-14'],
          parts: ['Şema göçü, sunucu dışı yedek ve ilk geri yükleme provası']
        },
        {
          title: 'Storybook’tan Pen’e otomatik yayını kur',
          why: 'Projenin ana sözü bu: Storybook’ta onaylanan bileşen insan eli değmeden Pen’e geçer.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-17', 'GAP-19', 'GAP-20', 'UU-13'],
          parts: ['Sürümleme temeli', 'Bileşen yayın manifesti', 'İmzalı artefakt ve köken doğrulaması', 'Yayın servisi kimliği ve anahtar rotasyonu', 'FastAPI yayın alma ucu', 'Kalıcı yayın işi ve worker', 'Kataloğun API’den beslenmesi', 'RC terfisi ile otomatik Pen yayını', 'Yayın geri alma ve sürüm koruması']
        },
        {
          title: 'Storybook’u kendi origin’ine al',
          why: 'Storybook kodu Pen ile aynı origin’de tam yetkiyle çalışıyor; Pen’e oturum ve API eklenmeden önce ayrılmalı.',
          owners: ['İsmail Karaca'],
          sources: ['UU-01', 'GAP-18'],
          parts: ['Korunan Storybook beta ortamı', 'Korunan Storybook RC ortamı ve terfi']
        },
        {
          title: 'Yayını görünür yap',
          why: 'Otomatik yayın sessizce başarısız olursa kimse fark etmez.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-31'],
          parts: ['Asgari gözlemlenebilirlik']
        },
        {
          title: 'Adresleri kalıcı hale getir',
          why: 'Paylaşılan ilk bağlantılar sonradan kırılmamalı; dil ve canonical kuralları adresler yayılmadan konur.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-12', 'GAP-13'],
          parts: ['Kalıcı adresler, canonical ve yapılandırılmış veri', 'Çok dile hazır route ve içerik sözleşmesi']
        },
        {
          title: 'Kalite kapılarını tamamla',
          why: 'Vibecoding değişiklikleri hızlı; kapılar eksikse bozulma kullanıcıya ulaşır.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-04', 'GAP-05', 'GAP-30'],
          parts: ['Görsel regresyon ve axe kapıları', 'Frontend lint ve biçim kapısı', 'Tarayıcı ve cihaz kabul matrisi']
        },
        {
          title: 'Bağımsız kabul incelemesini başlat',
          why: 'Kararı veren, kodu üreten ve yayınlayan aynı kişi; testler aynı kör noktayı paylaşabilir.',
          owners: ['İsmail Karaca'],
          sources: ['UU-24'],
          parts: ['Bağımsız kabul incelemesi']
        },
        {
          title: 'Gerçek kullanımı ölç',
          why: 'Kopyalama başarı değildir; kopyadan sonra kullanıcının projesinde derlenip derlenmediği ölçülür.',
          owners: ['İsmail Karaca'],
          sources: ['UU-07'],
          parts: ['Gizlilik dostu temel ölçüm']
        }
      ]
    },
    {
      key: 'onemli',
      name: 'Önemli',
      gate: 'Kullanıcılar kendi bileşenlerini güvenle kaydedip paylaşabilir: hesap, haklar, moderasyon ve içerik kaynağı yerinde; katalog kanıtlı içerikle dolu; ilk AI özelliği ölçülü ve sınırlı çalışır.',
      steps: [
        {
          title: 'Tohum içeriği kanıtla doldur',
          why: 'Boş katalog kimseyi tutmaz, kanıtsız 100 bileşen de güven vermez. Önce 20 adaylık pilot, sonra hedef.',
          owners: ['İsmail Karaca'],
          sources: ['UU-06', 'UU-19', 'UU-03'],
          parts: ['Bileşen üreteci ve örnek manifesti', 'Küratör için sınırlı içe aktarma', 'Tohum içerik']
        },
        {
          title: 'Hesap ve görünürlük kararlarını ver',
          why: 'Kimlik sağlayıcısı ve özel içeriğin hangi planda olduğu seçilmeden hesap işleri başlayamaz.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-37', 'GAP-29'],
          parts: ['Kimlik sağlayıcısı ve hesap yaşam döngüsü kararı', 'Görünürlük ve plan matrisi kararı']
        },
        {
          title: 'Hukuki zemini kur',
          why: 'Hesap açılmadan önce hangi verinin tutulduğu, kodun hangi lisansla paylaşıldığı ve nasıl silindiği yazılı olmalı.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-28', 'UU-22'],
          parts: ['Gizlilik bildirimi ve veri yaşam döngüsü', 'Kullanıcı içeriği lisansı ve kullanım koşulları', 'Veri dışa aktarma ve hesap silme']
        },
        {
          title: 'Kullanıcı içeriğini güvenle aç',
          why: 'İlk kullanıcı içeriği herkese açılmadan önce tarama, kaldırma ve yetki kuralları çalışıyor olmalı.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-27'],
          parts: ['Kimlik doğrulama', 'Görünürlüğün her uçta zorlanması', 'Yayın öncesi zararlı kod taraması', 'Bildirme, acil kaldırma ve telif itirazı', 'Hız sınırı ve kötüye kullanım koruması']
        },
        {
          title: 'Kaydet, sürümle ve çatalla',
          why: 'Vibecoder personasının temel işi: başkasının işinden çatallayıp kendi sürümünü paylaşmak.',
          owners: ['İsmail Karaca'],
          sources: ['UU-19'],
          parts: ['Kendi snippet’ini kaydetme', 'Her kayıtta sürüm geçmişi', 'Fork ve soy bilgisi', 'Genel içe aktarma köprüsü']
        },
        {
          title: 'Paylaşımı tamamla',
          why: 'Paylaşılan bağlantı ve gömme, ürünün kendini yaydığı yoldur; pazarlamadan önce çalışmalı.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-21', 'GAP-22', 'UU-04'],
          parts: ['Kısa paylaşım adresi', 'Gömme rotası', 'Katalog kartlarında canlı mini önizleme', 'Çok dosyalı bileşen', 'Dışa aktarım ve anahtarsız playground adaptörleri']
        },
        {
          title: 'AI’yi ölçülü başlat',
          why: 'İlk AI özelliği kota, ölçüm ve veri politikasıyla birlikte gelir; maliyet gelirden önce büyümez.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-23', 'GAP-25'],
          parts: ['AI sağlayıcı ve veri politikası kararı', 'Asgari AI geçidi', 'İlk AI özelliği: Açıkla']
        },
        {
          title: 'Ajan kimliğini insan kimliğinden ayır',
          why: 'MCP köprüsü açılmadan önce bir ajanın kimin adına, hangi yetkiyle çalıştığı kayda geçmeli.',
          owners: ['İsmail Karaca'],
          sources: ['UU-11'],
          parts: ['İnsan, ajan ve servis kimliklerinin ayrılması', 'MCP yayın köprüsü']
        }
      ]
    },
    {
      key: 'pazarlanabilirlik',
      name: 'Pazarlanabilirlik',
      gate: 'Ürün tek adla ve tek cümleyle anlatılıyor; ziyaretçi tanıtım sayfasından ilk bileşenini projesine alabiliyor, üretici ilk bileşenini yayınlayabiliyor ve huni hedef oranlarla ölçülüyor.',
      steps: [
        {
          title: 'Adı ve konumu netleştir',
          why: 'Sitede “ui / kit”, planda “Pen” geçiyor. Adı belirsiz bir ürün anlatılamaz.',
          owners: ['İsmail Karaca'],
          sources: [],
          parts: ['Ürün adı ve marka kararı', 'Konumlandırma ve rakip karşılaştırması']
        },
        {
          title: 'Kapıyı aç: tanıtım sayfası ve rehberler',
          why: 'Ziyaretçi ilk dakikada ne kazanacağını görmeli ve ilk bileşenini tek oturumda projesine alabilmeli.',
          owners: ['İsmail Karaca'],
          sources: [],
          parts: ['Tanıtım sayfası ve bekleme listesi', 'Başlarken ve bileşenini yayınla rehberleri']
        },
        {
          title: 'Bulunabilir ol',
          why: 'Arama motorları, sosyal paylaşımlar ve AI ajanları ürünü kendi başına bulabilmeli.',
          owners: ['İsmail Karaca'],
          sources: ['GAP-13'],
          parts: ['Paylaşım kartları', 'Büyüme amaçlı iniş sayfaları', 'Ajanlar için makinece okunur çıktı']
        },
        {
          title: 'Ölç ve hedef koy',
          why: 'Lansmanın başarısı önceden yazılmış oranlarla değerlendirilir.',
          owners: ['İsmail Karaca'],
          sources: ['UU-07', 'GAP-36'],
          parts: ['Pazarlama hunisi ve hedefler']
        },
        {
          title: 'Üreticileri kazan',
          why: 'İçerik tek küratöre bağlı kalırsa katalog yaşlanır; dış üreticiler ikinci içeriği kendiliğinden getirmeli.',
          owners: ['İsmail Karaca'],
          sources: ['UU-08'],
          parts: ['İlk dış üreticilerin kazanılması', 'Topluluk kanalı ve geri bildirim döngüsü']
        },
        {
          title: 'Lanse et',
          why: 'Hazırlık bittikten sonra tek planla ve ölçerek duyurulur.',
          owners: ['İsmail Karaca'],
          sources: [],
          parts: ['Lansman içerik paketi', 'Lansman planı ve kanallar']
        }
      ]
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
        part('Bileşen kataloğu ve paylaşılabilir filtreler', '26 bileşen; deneysel olan varsayılan görünümde gizlidir. Kategori, Free/Pro, deneysel ve cihaz filtreleri adres çubuğunda tutulur.', 'done'),
        part('Düzenlenebilir kod ve yalıtılmış önizleme', 'Kod değişince önizleme yenilenir; iframe yalnız allow-scripts ile çalışır ve ağa çıkamaz.', 'done', ['quality']),
        part('Görünüm modları', 'Teknik kartta dark, light ve accessibility temaları.', 'done'),
        part('Klavye ile komut araması', 'Ctrl/⌘ K ile açılan, odağı sahiplenen arama.', 'done'),
        part('Storybook', 'Üretim tokenlarını ve stillerini doğrudan kullanan hikâyeler; erişilebilirlik eklentisi açık.', 'done'),
        part('FastAPI ve PostgreSQL başlangıç sınırı', 'Sağlık uçları ve boş /api/components ucu; alan modeli bilinçli olarak ertelendi.', 'done', ['infra']),
        part('Tarayıcı testleri', 'Chromium, Firefox ve WebKit; 320, 390 ve 1440 piksel genişlikte beş profil. Tam kabul matrisi F1’dedir.', 'done', ['quality']),
        part('GitHub Pages demosu', 'Alt dizin altında çalışan herkese açık demo; site ve Storybook birlikte.', 'done', ['infra']),
        part('CI: tip denetimi, testler, imaj ve duman testi', 'Python için lint ve biçim denetimi, web için tip denetimi ve testler. Kapılar geçmeden imaj yayınlanmaz; CodeQL ve Dependabot yanında çalışır.', 'done', ['infra', 'quality']),
        part('Kurulum paketi ve çekme tabanlı yayın kodu', 'Kurulum betiği, güncelleme döngüsü ve geri dönüş mantığı hazır ve CI’da sınanıyor. Canlıda çalıştığı, sunucu kurulumu tamamlanınca kanıtlanır.', 'done', ['infra']),
        part('Yol haritası sayfası', 'Bu sayfa. Plan kodla aynı repoda durur ve aynı kapılardan geçer.', 'done'),
        part('Sunucuda ilk kurulum, DNS ve TLS', 'Kurulum betiğinin Hetzner’de bir kez çalıştırılması, pen.atonota.net’in yönlendirilmesi ve canlıda zamanlayıcı, geri dönüş ve duman testinin kabulü.', 'next', ['infra']),
        part('Açık kaynak lisansının seçilmesi', 'Repo herkese açık ama lisanssız; katkı ve yeniden kullanım için lisans gerekir.', 'planned', ['business', 'decision']),
        part('Karar kayıtlarının uzlaştırılması', 'İki ayrı karar.json ayrışmış durumda. Tek kayıt bağlayıcı olmalı; herkese açık demo Storybook ile korunan beta/RC çıktılarının sınırı tek kararla yazılmalı. Geçici /var/folders yollarıyla anılan görsel kanıtlar repoya alınır; temiz bir kopyada çözülemeyen referans kalmaz.', 'next', ['decision']),
        part('Yol haritası bağımlılık ve kabul modeli', 'Öncelik sırasındaki adımlar sahip ve kaynak bulgu taşıyor. Kalan iş: her parçaya bağımlılık ve kabul kanıtı alanı; sıra ve “tamam” iddiası veriden doğrulanır.'),
        part('Son yeşil sürümün kurulması', 'Sunucu main’in ucunu değil, imajları yayınlanmış en yeni commit’i kurar; kırmızı bir uç, önceki yeşil sürümü bekletmez.', 'next', ['infra']),
        part('Sağlık ucunun gerçek durumu bildirmesi', '/api/health/database veritabanına ulaşamazsa 503 döner; API container’ının sağlık kontrolü veritabanını da sınar.', 'next', ['infra', 'quality']),
        part('PostgreSQL imajı ve sunucu birimlerinin sürüme bağlanması', 'PostgreSQL imajı özetle (digest) sabitlenir; güncelleme döngüsü systemd birimlerini repodaki tanımla uzlaştırır. Kurulumdan sonraki değişiklikler sunucuya kendiliğinden ulaşır.', 'next', ['infra']),
        part('Tek seferlik alan adı ve origin planı', 'Gereken bütün adresler bir kerede istenir: pen.atonota.net, Storybook beta ve RC için kendi origin’leri, kullanıcı kodunun çalışacağı ayrı bir kayıtlı alan adı. Aynı site altındaki önizleme oturum çerezine ve CSRF korumasına dokunabilir.', 'next', ['infra', 'decision']),
        part('Sunucu dışı yedek hedefi', 'Yedeklerin gideceği sunucu dışı depolama ve zamanlayıcı ilk kurulumla birlikte hazırlanır.', 'next', ['infra']),
        part('Hesap ve yayın yetkisinin yedeklenmesi', 'GitHub deposu ve paketleri için ikinci yönetici, 2FA kurtarma düzeni ve İsmail Karaca erişilemezken güvenlik düzeltmesini yayınlama yolu.', 'next'),
        part('Talep doğrulaması', 'Mevcut demoyla 5–8 hedef kullanıcıya bir bileşeni bulup kendi projesine alma görevi verilir. Kopyadan sonra gerçek derleme başarısı, yardım ihtiyacı ve yedi günlük dönüş ölçülür; sonuç F1 ve F2 kapsamını belirler.', 'next', ['business']),
        part('Bağımsız kabul incelemesi', 'Yüksek riskli değişiklik, istemi ve uygulamayı görmemiş bir inceleyiciye gizli kabul vakalarıyla verilir. Aynı kişinin karar verip kodlaması, test edip yayınlaması tek başına kanıt sayılmaz.', 'planned', ['quality'])
      ]
    },
    {
      key: 'pre-mvp',
      stage: 'MVP öncesi',
      name: 'Sözleşmeler ve tek kaynak',
      goal: 'Elle yazılmış katalog verisini şemalı tek kaynağa taşımak ve çalışma zamanını çoklu framework’e hazırlamak.',
      exit: 'Tek komut yeni bileşenin metadata, Markdown, manifest, önizleme ve test iskeletini üretir; katalog, arama ve önizleme bu kaynaktan derlenir ve kabul matrisi geçer.',
      vibecoding:
        'Her parça tek değişiklik isteği ve önce başarısız testtir. Şema bir kez yazılır; ajan bileşen eklerken iframe, bundler veya mesajlaşma ayrıntısına dokunmaz.',
      parts: [
        part('Bileşen metadata şeması', 'Her bileşen için şema doğrulamalı TypeScript tanımı ve aynı kimliğe bağlı Markdown içerik. Yetkili kaynak budur.'),
        part('Monorepo paket sınırları', 'content-schema, example-runtime, design-tokens ve testing paketleri; tek yönlü bağımlılık.'),
        part('Mevcut 26 bileşenin şemaya taşınması', 'Elle yazılmış veri dosyalarındaki katalog, davranış değişmeden yeni kaynağa aktarılır.'),
        part('Metadata dosyalarının taranmasıyla katalog üretimi', 'Katalog TypeScript tanımlarından derlenir; elle tutulan liste yoktur. Eski plandaki dosya içi yorum fikri, ikinci bir kaynak yaratmamak için bu biçimde alındı.', 'planned', ['legacy']),
        part('Bileşen üreteci ve örnek manifesti', 'Tek komut metadata, Markdown, platformdan bağımsız örnek manifesti ve test iskeletini üretir.'),
        part('Derlenmiş kanonik önizleme', 'Bileşen sayfası açıldığında derleme sırasında hazırlanmış önizleme hemen görünür; çalışma zamanı beklenmez.'),
        part('Monaco ve WebContainer’ın koşullu yüklenmesi', 'Canlı düzenleme katmanı yalnız kullanıcı düzenlemeye niyet ettiğinde ve yalnız o örneğin adaptörüyle indirilir.'),
        part('Hafif önizleme katmanı kararı', 'Eski projede Sucrase ve esm.sh ile WASM indirmeden anında önizleme çalıştı. Karar kaydı WebContainer’ı seçti; hafif katmanın eklenmesi yeni karar gerektirir.', 'planned', ['legacy', 'decision']),
        part('Framework adaptör sözleşmesi', 'React, Vue, Angular, Web Components ve three.js. Listelenmek destek demek değildir; her adaptör sürüm, derleme, önizleme ve test kanıtı taşır.', 'planned', ['legacy']),
        part('Editör–önizleme durum makinesi', 'Gecikmeli uygulama, derleme durumları, eski sonucun yeni kodu ezmemesi, son başarılı önizleme, sıfırlama ve erişilebilir hata paneli.', 'planned', ['quality']),
        part('Önizlemenin ayrı origin’e taşınması', 'Kullanıcı kodu ayrı bir kayıtlı alan adında çalışır; uygulamanın çerezlerine, depolamasına ve oturum adına isteklere hiçbir koşulda erişemez.', 'planned', ['legacy', 'quality']),
        part('Güvenilmeyen kod için tehdit modeli ve kaynak sınırları', 'İşlemci, bellek ve süre kotası, ağ çıkış listesi, sır ve disk yalıtımı, kötü niyetli paket senaryosu. Tek önizleme kotasının yanında sayfanın toplam bütçesi: görünmeyen önizlemeler durur, aynı anda çalışan sayısı sınırlıdır. Bu geçmeden çoklu framework açılmaz.', 'planned', ['quality']),
        part('Arama indeksi', 'Fuse.js ile istemci tarafında; indeks derleme sırasında metadata ve Markdown’dan üretilir, boyutu ölçülür ve büyüdükçe parçalı yüklenir.'),
        part('Kalıcı adresler, canonical ve yapılandırılmış veri', 'Okunur ve kararlı yollar; filtre adresleri için canonical ve noindex kuralı; arama motorları için yapılandırılmış veri.'),
        part('Çok dile hazır route ve içerik sözleşmesi', 'Dil öneki, yedek dil, canonical ve hreflang kuralları ilk sürümden tanımlıdır; çevirinin kendisi sonraya kalır.'),
        part('Route envanteri, dosya sahipliği ve sürüm sabitleme politikası', 'Hangi sayfanın, modülün ve bağımlılığın kime ait olduğu ve sürümlerin nasıl sabitlendiği yazılıdır.'),
        part('Uyumluluk kanıtının metadata’ya bağlanması', 'Bir kombinasyon yalnız bağlı test kanıtı varsa “supported” görünür; kanıtsız olan “not tested” kalır.', 'planned', ['quality']),
        part('Görsel regresyon ve axe kapıları', 'Sabit ortamda deterministik ekran karşılaştırması ve otomatik erişilebilirlik kontrolü.', 'planned', ['quality']),
        part('Frontend lint ve biçim kapısı', 'TypeScript, JavaScript ve CSS için lint ve biçim denetimi; yerelde ve CI’da aynı komut.', 'planned', ['quality']),
        part('Tarayıcı ve cihaz kabul matrisi', '320, 360, 375, 390, yatay telefon, tablet ve bölünmüş ekran. Gerçek macOS Safari, iOS Safari ve Android Chrome emülasyondan ayrı raporlanır.', 'planned', ['quality']),
        part('Performans bütçesi', 'İlk sayfa, kanonik önizleme ve canlı editör aktarımları ayrı ölçülür; aşan değişiklik birleşmez.', 'planned', ['quality']),
        part('Ajanlar için makinece okunur çıktı', 'Her bileşen için JSON manifest ve site kökünde llms.txt; ajan kataloğu kazımadan okur.', 'planned', ['ai']),
        part('Şema göçü, sunucu dışı yedek ve ilk geri yükleme provası', 'Göçler sürümlüdür ve bir önceki uygulama sürümüyle uyumludur; otomatik geri dönüşte şema yeni kalsa da eski sürüm çalışır. Yedek sunucu dışındadır ve kullanıcı verisi gelmeden önce bir kez geri yüklenerek sınanır.', 'planned', ['infra']),
        part('Marka tokenlarının kesinleştirilmesi', 'Nötr koyu kimlik tek bir token setine bağlanır; referans alınan temalar kopyalanmaz.')
      ]
    },
    {
      key: 'mvp',
      stage: 'MVP',
      name: 'Storybook’tan Pen’e hat ve paylaşılabilir bileşen',
      goal: 'Storybook’ta onaylanan bileşenin kendiliğinden Pen’de yayınlanması ve her bileşenin tek adresle paylaşılabilmesi.',
      exit: 'Storybook RC’ye terfi eden bir bileşen, elle adım olmadan Pen kataloğunda görünür ve paylaşılır; aynı yayın iki kez gönderildiğinde katalog değişmez ve başarısız yayın uyarı üretir.',
      vibecoding:
        'Yayın köprüsü dar yetkili tek araçtır; ajan serbest komut çalıştırmaz. Her yayın idempotenttir, bu yüzden ajan aynı işi iki kez gönderse de sonuç değişmez.',
      parts: [
        part('Backend olgunluk düzeyi ve yayın alan modeli onayı', 'Proje sözleşmesi nihai alan şemasını onaysız yasaklıyor. Manifest, sürüm ve yayın işlemi modeli onaylanmadan bu fazın backend işleri başlamaz.', 'planned', ['decision']),
        part('Sürümleme temeli', 'Paketler SemVer 2.0 kullanır; onda bir ölçekli ürün etiketi ayrı alanda tutulur ve yayın manifestinde eşlenir.'),
        part('Bileşen yayın manifesti', 'Kimlik, sürüm, commit, sağlama toplamı, framework, tema ve uyumluluk bilgisini bağlayan tek belge.'),
        part('İmzalı artefakt ve köken doğrulaması', 'Yayın yalnız doğrulanmış commit, manifest ve özet eşleşmesiyle kabul edilir; güvenilmeyen derleme sır taşıyan ortamda çalışmaz.', 'planned', ['infra', 'quality']),
        part('Yayın servisi kimliği ve anahtar rotasyonu', 'Yayın hattının kendi dar yetkili kimliği vardır; kullanıcı girişinden bağımsızdır ve anahtarı yenilenebilir.', 'planned', ['infra']),
        part('FastAPI yayın alma ucu', 'Kimliği doğrulanmış, idempotent yayın; aynı manifest ikinci kez gelirse kopya oluşmaz.', 'planned', ['infra']),
        part('Kalıcı yayın işi ve worker', 'MCP bir iş kuyruğu değildir. Durum, yeniden deneme sınırı, iptal, zaman aşımı, yeniden başlatma sonrası kurtarma ve işlem kaydı.', 'planned', ['infra']),
        part('Kataloğun API’den beslenmesi', '/api/components veritabanından okur; site API’ye ulaşamazsa statik veriye döner. Bulunamayan bileşen ve kapalı API için açık geri bildirim.'),
        part('Korunan Storybook beta ortamı', '/sbbeta: deneysel derleme, kendi origin’inde; Pen’in depolamasına ve API’sine erişemez. Anonim erişim reddedilir; Pen’e yayın tetiklemez.', 'planned', ['infra']),
        part('Korunan Storybook RC ortamı ve terfi', '/sbrc: sınanmış ve açıkça terfi ettirilmiş sürüm, kendi origin’inde. Anonim erişimin ve arka kapı portunun reddi kabul testidir.', 'planned', ['infra']),
        part('RC terfisi ile otomatik Pen yayını', 'Onaylı sürüm iki değişmez çıktı üretir: Storybook sitesi ve bileşen kaynak paketi.', 'planned', ['infra']),
        part('Yayın geri alma ve sürüm koruması', 'Geç gelen veya eski sürümlü yayın kataloğu geriletmez; başarısız yayın Pen’i değiştirmez. Yayın bir anlık görüntüdür: silinen bileşen için silme kaydı, yeniden adlandırma için kalıcı kimlik; toplu yayın ya tamamen uygulanır ya hiç.'),
        part('MCP yayın köprüsü', 'components.sync_release adlı tek araç; yayın için her seferinde dil modeli gerekmez.', 'planned', ['ai', 'infra']),
        part('Asgari gözlemlenebilirlik', 'Yayın metriği, yapılandırılmış kayıt, uyarının birine ulaşması ve olay anında izlenecek adımlar.', 'planned', ['infra']),
        part('Kısa paylaşım adresi', '/s/<kimlik>. Okunur kalıcı adresin yerine geçmez; kimliğin okunur mu, opak mı olacağı karar gerektirir.', 'planned', ['legacy', 'decision']),
        part('Gömme rotası', 'Başka sitelerin çerçeveleyebileceği önizleme; frame izinleri yalnız bu rotada açılır.', 'planned', ['legacy']),
        part('Katalog kartlarında canlı mini önizleme', 'Ekran görüntüsü yerine çalışan küçük önizleme; görünür olduğunda yüklenir.', 'planned', ['legacy']),
        part('Çok dosyalı bileşen', 'Birden çok dosya ve framework alanı ilk günden veri modelinde.', 'planned', ['legacy']),
        part('Dışa aktarım ve anahtarsız playground adaptörleri', 'Kopyala ve .zip indir; StackBlitz zorunlu, CodePen uygun örneklerde, CodeSandbox doğrulanmış yöntem varsa. Hepsi aynı örnek manifestinden.'),
        part('Küratör için sınırlı içe aktarma', 'Tohum içeriği taşımak için GitHub deposu ve ZIP içe aktarma; yalnız küratöre açık. Kaynak commit, lisans ve sahip bilgisi taşınır; açılmış boyut ve sıkıştırma oranı sınırlıdır.', 'planned', ['legacy']),
        part('Tohum içerik', 'Önce arşivden rastgele 20 aday sözleşmeden geçirilir; geçme oranı ve süre ölçülür, 100 bileşen hedefi buna göre ayarlanır. Eski animasyon arşivinden seçilenler dahil.', 'planned', ['legacy', 'business']),
        part('Asgari AI geçidi', 'İlk AI özelliğinden önce: kullanım ölçümü, kota ve modele giden verinin süzülmesi.', 'planned', ['ai']),
        part('İlk AI özelliği: Açıkla', 'Seçili kodu sade dille anlatır. Kod çalıştırmaz, yalnız okur.', 'planned', ['ai', 'legacy']),
        part('Gizlilik dostu temel ölçüm', 'Hangi bileşenin açıldığı, kopyalandığı ve kopyadan sonra kullanıcının projesinde gerçekten derlendiği; kişisel veri toplamadan.', 'planned', ['business'])
      ]
    },
    {
      key: 'post-mvp-x',
      stage: 'MVP sonrası · X',
      name: 'Hesaplar ve kendi çalışman',
      goal: 'Ziyaretçiyi üreticiye çevirmek: kaydetme, sürüm, fork ve içe aktarma.',
      exit: 'Bir kullanıcı giriş yapar, bir bileşeni çatallar, değiştirir ve kaydeder; yetkisiz istek her uçta reddedilir ve bildirilen içerik kaldırılabilir.',
      vibecoding:
        'Yetki kuralı tek yerde yazılır ve her uç için “yetkisiz istek reddedilir” testi vardır. Ajan yeni uç eklerken bu testi yazmadan kapıdan geçemez.',
      parts: [
        part('Kimlik sağlayıcısı ve hesap yaşam döngüsü kararı', 'Sağlayıcı, oturum süresi, hesap bağlama, iptal ve kurtarma. Eski projede Keycloak kurulumu sürekli sorun çıkardı.', 'planned', ['legacy', 'decision']),
        part('Görünürlük ve plan matrisi kararı', 'Özel taslak Free’de var mı, özel proje yalnız Pro mu; kota, paylaşım ve erişim farkları.', 'planned', ['business', 'decision']),
        part('Kimlik doğrulama', 'OIDC ve GitHub ile giriş.', 'planned', ['legacy']),
        part('Gizlilik bildirimi ve veri yaşam döngüsü', 'Hangi verinin toplandığı, ne kadar saklandığı ve nasıl silindiği; hesap açılmadan önce yayında. Kullanıcıya bağlı her yeni veri kümesi envantere eklenir; dışa aktarma ve silme testi bu envanteri kullanır.', 'planned', ['business']),
        part('Kullanıcı içeriği lisansı ve kullanım koşulları', 'Paylaşılan kodun lisansı ilk yayından önce açıkça seçilir ve koşullar kabul edilir.', 'planned', ['business']),
        part('Kendi snippet’ini kaydetme', 'Taslak ve yayınlanmış durum; sahibi dışında kimse düzenleyemez.', 'planned', ['legacy']),
        part('Yayın öncesi zararlı kod taraması', 'Kullanıcı içeriği herkese açılmadan önce temel otomatik tarama; eski projede hiç yoktu.', 'planned', ['quality']),
        part('Bildirme, acil kaldırma ve telif itirazı', 'Kullanıcı bildirimi, hızlı kaldırma, telif talebi ve itiraz süreci; tekrar ihlal kuralı.', 'planned', ['quality']),
        part('Her kayıtta sürüm geçmişi', 'Sürüm tüm dosyaları saklar. Eski projede yalnız tek dosya saklanıyor, çok dosyalı geçmiş kayboluyordu.', 'planned', ['legacy']),
        part('Fork ve soy bilgisi', 'Çatal; dosyaları, framework’ü ve kaynağını taşır.', 'planned', ['legacy']),
        part('Görünürlüğün her uçta zorlanması', 'Özel içerik okuma, fork ve gömme uçlarında da denetlenir.', 'planned', ['legacy', 'quality']),
        part('Profil sayfası', 'Kullanıcının herkese açık çalışmaları ve çatalları.', 'planned', ['legacy']),
        part('Genel içe aktarma köprüsü', 'Her kullanıcı için GitHub deposu, ZIP, Gist ve CodePen’den içe aktarma. Kaynak commit, lisans ve sahip zinciri fork ve dışa aktarmaya kadar korunur; lisansı belirsiz kod herkese açık yayınlanmaz.', 'planned', ['legacy']),
        part('Hız sınırı ve kötüye kullanım koruması', 'Okuma ve yazma için ayrı sınırlar.', 'planned', ['infra']),
        part('Veri dışa aktarma ve hesap silme', 'KVKK ve GDPR için kullanıcının kendi verisini alması ve silmesi.', 'planned', ['legacy']),
        part('İşlemsel e-postalar', 'Doğrulama, parola ve güvenlik bildirimleri.'),
        part('Yönetim paneli, ilk sürüm', 'Kullanıcı, içerik ve işlem kaydı.', 'planned', ['legacy'])
      ]
    },
    {
      key: 'post-mvp-y',
      stage: 'MVP sonrası · Y',
      name: 'AI çalışma arkadaşı',
      goal: 'AI’yi süs değil, bileşen üretme ve uyarlama işinin parçası yapmak.',
      exit: 'Kullanıcı bir prompt ile bileşen üretir, hatasını düzelttirir ve başka bir framework’e çevirtir. Her çağrı ölçülür; değerlendirme setinin geçme eşiği ve çağrı başına maliyet tavanı karar kaydında sayıyla yazılıdır ve sağlanır.',
      vibecoding:
        'AI özellikleri değerlendirme setiyle gelir: sabit girdiler, beklenen özellikler ve geçme eşiği. Model veya prompt değişikliği bu setten geçmeden birleşmez.',
      parts: [
        part('AI sağlayıcı ve veri politikası kararı', 'Varsayılan model ve sağlayıcı; kullanıcı kodunun sağlayıcıya gönderilmesi, saklanması ve eğitimde kullanılmaması; kalite ve maliyet eşikleri.', 'planned', ['ai', 'decision']),
        part('Değerlendirme temeli ve kalite kapısı', 'AI çıktıları sabit örneklerle ve saldırgan girdilerle sınanır; gerileme birleşmeyi durdurur. Her yeni özellik kendi örneklerini ekler.', 'planned', ['ai', 'quality']),
        part('AI güvenlik sınırı', 'Üretilen kod yalnız sandbox’ta çalışır; modele sır, ortam değişkeni veya başka kullanıcının verisi gitmez. Prompt enjeksiyonu senaryoları sınanır.', 'planned', ['ai', 'quality']),
        part('AI veri yönetişimi ve çıktı hakları', 'Sağlayıcıya giden alanlar, saklama süresi, kullanıcı rızası, silme talebi ve üretilen kodun lisansı.', 'planned', ['ai', 'business']),
        part('Çoklu sağlayıcı geçidi ve plan bazlı kota', 'F2’deki asgari geçit sağlayıcıdan bağımsız hale gelir; kota kullanıcı ve plan başına uygulanır.', 'planned', ['ai', 'legacy']),
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
        part('AI çıktısının şemaya göre kabulü', 'Model cevabı doğrudan uygulanmaz: ayrıştırılır, şemaya ve derlemeye karşı denetlenir; yalnız geçen artefakt bütünüyle uygulanır.', 'planned', ['ai', 'quality']),
        part('AI maliyet defteri ve fatura mutabakatı', 'Giriş, çıkış, önbellek ve yeniden deneme maliyeti sağlayıcı cevabından kaydedilir ve faturayla karşılaştırılır.', 'planned', ['ai', 'business']),
        part('Model kataloğu ve emeklilik planı', 'Bir model emekli olduğunda sessiz geçiş yapılmaz; bekleyen işler ve kullanıcı tercihleri açıkça yeniden seçime düşer.', 'planned', ['ai'])
      ]
    },
    {
      key: 'post-mvp-z',
      stage: 'MVP sonrası · Z',
      name: 'Pazarlama, topluluk ve keşif',
      goal: 'Ürünü anlatılabilir ve bulunabilir yapmak; üretilen içeriğin keşfedilmesini ve üreticilerin geri gelmesini sağlamak.',
      exit: 'Keşif hunisi (arama motoru → bileşen → benzer bileşen → takip) ölçülür ve karar kaydında sayıyla yazılı hedef oranları sağlar.',
      vibecoding:
        'Sosyal özellikler çekirdek döngü sağlamlaştıktan sonra gelir. Her özellik için ölçülecek davranış önceden yazılır; ölçülmeyen özellik eklenmez.',
      parts: [
        part('Ürün adı ve marka kararı', 'Sitede “ui / kit”, planda “Pen”, adreste pen.atonota.net geçiyor. Pazarlamadan önce tek ad, tek alan adı ve tek görsel kimlik seçilir.', 'planned', ['marketing', 'decision']),
        part('Konumlandırma ve rakip karşılaştırması', 'Kime, hangi işi, neden daha iyi yaptığı tek cümlede; CodePen, StackBlitz, v0 ve bileşen kütüphaneleriyle farkın açıkça yazılması.', 'planned', ['marketing']),
        part('Tanıtım sayfası ve bekleme listesi', 'Değer önerisi, kısa demo ve tek çağrı. E-posta açık rızayla toplanır; gizlilik bildirimi yayındadır.', 'planned', ['marketing']),
        part('Başlarken ve bileşenini yayınla rehberleri', 'Ziyaretçinin ilk bileşeni projesine alması ve üreticinin ilk bileşenini yayınlaması için adım adım rehber.', 'planned', ['marketing']),
        part('Lansman içerik paketi', 'Demo videosu, öne çıkan on bileşen, ekran görüntüleri ve açıkta geliştirme yazıları.', 'planned', ['marketing']),
        part('İlk dış üreticilerin kazanılması', 'Beş dış üreticiyle elden yayın; on dört gün içinde teşviksiz ikinci içerik getirip getirmedikleri ölçülür.', 'planned', ['marketing']),
        part('Pazarlama hunisi ve hedefler', 'Ziyaret, bileşen, kopya, gerçek derleme başarısı ve yedi günlük dönüş; her adımın hedef oranı karar kaydına yazılır.', 'planned', ['marketing', 'business']),
        part('Topluluk kanalı ve geri bildirim döngüsü', 'Soruların ve isteklerin toplandığı tek kanal; gelen geri bildirim yol haritasına bağlanır.', 'planned', ['marketing']),
        part('Lansman planı ve kanallar', 'Product Hunt, Hacker News, X, Reddit ve geliştirici toplulukları için takvim, mesaj ve ölçüm.', 'planned', ['marketing']),
        part('Beğeni, görüntülenme ve kaydetme', 'Temel etkileşim sayaçları.', 'planned', ['legacy']),
        part('Koleksiyonlar', 'Kullanıcının bileşenleri gruplaması ve paylaşması.', 'planned', ['legacy']),
        part('Takip ve akış', 'Trend, yeni ve takip edilenler sekmeleri.', 'planned', ['legacy']),
        part('Zaman ağırlıklı trend', 'Eski projede trend “en çok beğenilen”di; eski içerik hep üstte kalıyordu.', 'planned', ['legacy']),
        part('Yorumlar', 'Bileşene, satıra veya öğeye iliştirilen yorum.', 'planned', ['legacy']),
        part('Canlı bildirimler', 'Fork, yorum ve takip için anlık bildirim.', 'planned', ['legacy']),
        part('Meydan okumalar', 'Haftalık veya aylık konu ve gönderimler; içerik ve geri dönüş motoru.', 'planned', ['legacy']),
        part('Fork ağacı ve itibar', 'Bir bileşenin türevlerinin görsel soyağacı.', 'planned', ['legacy']),
        part('Sunucu tarafı arama', 'PostgreSQL tam metin ve trigram; ayrı arama motoru gerekene kadar yeterli.', 'planned', ['legacy']),
        part('Büyüme amaçlı iniş sayfaları', '/component/<framework>/<ad> biçiminde konu sayfaları; teknik SEO temeli F1’de kuruludur.', 'planned', ['legacy', 'business']),
        part('Karşılaştırma görünümü', 'İki bileşeni yan yana açma.', 'planned', ['legacy']),
        part('Gelişmiş moderasyon kuyruğu', 'F3’teki bildirme ve kaldırmanın üzerine: önceliklendirme, moderatör rolleri ve işlem kaydı.', 'planned', ['quality']),
        part('AI ile ön eleme', 'Zararlı kod, kopya ve istenmeyen içerik için AI destekli ön eleme; karar moderatörde kalır.', 'planned', ['ai', 'quality']),
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
        part('Ödeme sağlayıcısı, satış coğrafyası ve vergi modeli kararı', 'Sağlayıcı, satıcı sorumluluğu, satış yapılacak ülkeler ve iade sahipliği.', 'planned', ['business', 'decision']),
        part('Free/Pro anlamının yetkiye bağlanması', 'Bugün kilit yalnız arayüzde; kod erişimi sunucuda denetlenmeli.', 'planned', ['business']),
        part('Plan tablosu ve tek noktadan denetim', 'Sınırlar kodda değil veride; tek bir denetim katmanı.', 'planned', ['legacy']),
        part('Abonelik ödemesi', 'Ödeme, müşteri portalı ve webhook.', 'planned', ['legacy', 'business']),
        part('Özel projeler', 'Ana Pro özelliği.', 'planned', ['legacy']),
        part('Varlık barındırma', 'Görsel ve font yükleme; plan başına kota.', 'planned', ['legacy']),
        part('Pro bileşen teslimi', 'İndirme ve lisans kaydı.', 'planned', ['business']),
        part('AI kotalarının plana bağlanması', 'Günlük AI isteği sınırı plandan gelir.', 'planned', ['ai', 'business']),
        part('Fatura, vergi ve iade', 'Yasal belgeler ve iade süreci.', 'planned', ['business']),
        part('Gelir ve dönüşüm panosu', 'Deneme, dönüşüm ve kayıp oranları.', 'planned', ['business']),
        part('Kullanım bazlı fiyat denemesi', 'AI ve barındırma için kullandıkça öde seçeneği.', 'planned', ['legacy', 'business']),
        part('Pro kaynağın herkese açık çıktılara girmemesi', 'Pro bileşen kaynağı Pages çıktısına, Storybook dizinine, kaynak haritalarına ve herkese açık imaja girmez; derleme sonrası tarama bunu doğrular.', 'planned', ['business', 'quality']),
        part('Hesap silmede aboneliğin kapatılması', 'Hesap silinince sağlayıcıdaki abonelik iptal edilir, gelecek tahsilat durur ve gelen webhook sahipsiz kalmaz.', 'planned', ['business'])
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
        part('Ek framework adaptörleri', 'Svelte, Alpine ve talep edilen diğerleri; her biri kendi kanıtıyla.'),
        part('Tek tıkla yayın', 'Bileşeni statik sayfa olarak barındırma.', 'planned', ['legacy']),
        part('İnsan, ajan ve servis kimliklerinin ayrılması', 'Bir ajan hangi insan adına, hangi yetkiyle çalıştığını taşır. İnsanın yetkisi iptal edilince ajanın yeni yan etkisi reddedilir; maliyet ve denetim kaydı doğru kişiye yazılır.', 'planned', ['ai'])
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
      exit: 'Arıza uyarıyla fark edilir ve yedekten dönülür; kurtarma süresi, veri kaybı sınırı ve uyarı teslim süresi karar kaydında sayıyla yazılıdır ve provada sağlanır.',
      vibecoding:
        'Olgunluk bir faz kadar bir alışkanlıktır: her fazın çıkışında bu listeden ilgili parçalar yeniden sınanır.',
      parts: [
        part('Dağıtık izleme ve kapasite uyarıları', 'F2’deki asgari gözlemlenebilirliğin üzerine: uçtan uca iz, kapasite eşikleri ve eğilim raporu.', 'planned', ['infra']),
        part('Düzenli geri yükleme provası ve felaket senaryosu', 'İlk prova F1’de yapılır; burada takvime bağlanır ve tam kayıp senaryosu denenir.', 'planned', ['infra']),
        part('Yedekli mimari', 'Tek sunucudan birden çok örneğe geçiş.', 'planned', ['infra']),
        part('Sürekli performans ölçümü', 'Bütçeler gerçek kullanıcı verisiyle izlenir.', 'planned', ['quality']),
        part('Çeviri kapsamının genişletilmesi', 'Sözleşme F1’de hazır; burada gerçek çeviriler ve dil başına kalite denetimi gelir.'),
        part('Periyodik bağımsız erişilebilirlik denetimi', 'Otomatik kontrolün ötesinde, gerçek yardımcı teknolojilerle ve düzenli aralıkla.', 'planned', ['quality']),
        part('Periyodik gerçek cihaz matrisi', 'İlk kabul F1’dedir; burada her sürüm öncesi yinelenir.', 'planned', ['quality']),
        part('Sürümleme politikasının yönetişimi', 'Temel F2’de kuruludur; burada kullanımdan kaldırma takvimi ve duyuru süreci gelir.'),
        part('AI kalite ve maliyet yönetişimi', 'Model değişikliklerinin kalite ve maliyet etkisi düzenli raporlanır.', 'planned', ['ai']),
        part('Topluluk yönetişimi', 'Katkı rehberi, davranış kuralları ve yol haritasına geri bildirim.'),
        part('Maliyet ve kapasite planı', 'Barındırma, AI ve depolama maliyetinin kullanıcı başına izlenmesi.', 'planned', ['business']),
        part('Karar kaydının gözden geçirilmesi', 'Geçersiz kalan kararlar işaretlenir; kayıt gerçeği yansıtmaya devam eder.')
      ]
    }
  ]
};
