# TDD ve mimari uygulama sözleşmesi

## Ek kullanıcı gereksinimi: TDD, OOP, MVC/MVVM

TDD planı zorunlu: her davranış dilimi için önce başarısız test, neden başarısız olduğu, minimal uygulama ve refactor kabulü. Test türü, gerçek repo komutu, test dosyası ve entegrasyon bağımlılığını belirt. Planlanan test çalıştırılmış sayılmaz.
OOP sorumluluk, kapsülleme ve bağımlılık sınırlarıyla uygulanır; veri taşıyan her nesneye sınıf veya gereksiz kalıtım eklenmez. Astro'da mevcut Model → ViewModel → View ayrımı korunur; ViewModel testleri DOM'dan bağımsızdır. HTTP/API sınırında MVC sorumluluk ayrımı route/controller → gerekli iş davranışı → veri modeli şeklinde değerlendirilir; FastAPI bağımlılık enjeksiyonu ve Pydantic sözleşmeleri korunur. MVC ve MVVM aynı katmana üst üste eklenmez. Yeni servis/repository ancak gerçek sınır veya test ihtiyacı varsa eklenir. Minimal FastAPI ve faz kapıları korunur. Her pakette hangi desenin neden gerekli olduğunu veya kapsam dışı olduğunu açıkla.

İlk altı ajan bu ek talimat gönderildiğinde çalışmaya başlamıştı. Nihai entegrasyonda onların çıktıları da bu sözleşmeye karşı denetlenecek; eksik kapsam bağımsız incelemede raporlanacak.
