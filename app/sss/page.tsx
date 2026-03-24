import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Toz Yapı Teknolojileri',
  description: 'Güneş kırıcı sistemler, pergola ve cephe çözümleri hakkında sıkça sorulan sorular.',
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Genel',
      questions: [
        {
          q: 'Toz Yapı Teknolojileri hangi alanlarda hizmet veriyor?',
          a: 'Güneş kırıcı sistemler, brise soleil, pergola çözümleri, cephe kaplama, havuz kapama sistemleri ve daha birçok yapı teknolojisi alanında hizmet veriyoruz. 50+ ürün grubumuz ile kapsamlı çözümler sunuyoruz.'
        },
        {
          q: 'Garanti süreniz nedir?',
          a: 'Tüm ürünlerimizde standart olarak 10 yıl garanti sunuyoruz. Bu garanti, üretim hataları ve malzeme kusurlarını kapsamaktadır.'
        },
        {
          q: 'Hangi bölgelere hizmet veriyorsunuz?',
          a: 'Türkiye\'nin tüm illerine hizmet veriyoruz. Ayrıca uluslararası projeler için de çözüm ortaklığı yapıyoruz.'
        },
      ],
    },
    {
      category: 'Güneş Kırıcı Sistemler',
      questions: [
        {
          q: 'Güneş kırıcı sistemler ne kadar enerji tasarrufu sağlar?',
          a: 'Doğru tasarlanmış güneş kırıcı sistemler soğutma maliyetlerinde %40-60, toplam enerji tüketiminde %25-45 tasarruf sağlayabilir.'
        },
        {
          q: 'Brise soleil sistemleri hangi malzemelerden üretilir?',
          a: 'Alüminyum, paslanmaz çelik, ahşap ve kompozit malzemeler kullanıyoruz. Proje gereksinimlerine göre en uygun malzeme önerisini sunuyoruz.'
        },
        {
          q: 'Sistemler rüzgara dayanıklı mı?',
          a: 'Evet, tüm sistemlerimiz TS EN 13561 standardına uygun olarak test edilmiştir. Konuma ve proje gereksinimlerine göre rüzgar yükü hesaplaması yapıyoruz.'
        },
      ],
    },
    {
      category: 'Pergola Sistemleri',
      questions: [
        {
          q: 'Bioclimatic pergola nedir?',
          a: 'Bioclimatic pergola, açılır-kapanır lamelleri ile hava koşullarına uyum sağlayan akıllı pergola sistemidir. Yağmur, rüzgar ve güneş sensörleri ile otomatik çalışabilir.'
        },
        {
          q: 'Pergola sistemleri kışın kullanılabilir mi?',
          a: 'Evet, ısıtmalı pergola seçeneklerimiz ile kış aylarında da konforlu kullanım sağlayabilirsiniz. Yan cephe kapamaları ile rüzgardan korunma da mümkündür.'
        },
        {
          q: 'Montaj süresi ne kadardır?',
          a: 'Standart bir pergola sisteminin montajı 1-3 gün arasında tamamlanır. Proje büyüklüğüne ve hava koşullarına göre bu süre değişebilir.'
        },
      ],
    },
    {
      category: 'Fiyatlandırma',
      questions: [
        {
          q: 'Fiyat teklifi nasıl alabilirim?',
          a: 'İletişim sayfamızdaki formu doldurarak, telefonla veya WhatsApp üzerinden bize ulaşarak ücretsiz fiyat teklifi alabilirsiniz.'
        },
        {
          q: 'Ödeme seçenekleri nelerdir?',
          a: 'Nakit, kredi kartı ve banka havalesi ile ödeme kabul ediyoruz. Büyük projeler için taksit seçenekleri de sunuyoruz.'
        },
        {
          q: 'Keşif hizmeti veriyor musunuz?',
          a: 'Evet, İstanbul ve çevre illerde ücretsiz keşif hizmeti sunuyoruz. Uzak mesafeli projeler için sembolik bir keşif ücreti uygulanabilir.'
        },
      ],
    },
    {
      category: 'Teknik Destek',
      questions: [
        {
          q: 'Montaj sonrası destek veriyor musunuz?',
          a: 'Evet, tüm projelerimizde montaj sonrası teknik destek ve periyodik bakım hizmeti sunuyoruz.'
        },
        {
          q: 'Yedek parça temini nasıl oluyor?',
          a: 'Tüm ürünlerimiz için yedek parça stoğumuz bulunmaktadır. Garanti süresi sonrasında da uygun fiyatlarla yedek parça temin edebilirsiniz.'
        },
        {
          q: 'Teknik dokümanlara nasıl ulaşabilirim?',
          a: 'Katalog sayfamızdan ürün kataloglarımızı ve teknik dokümanlarımızı indirebilirsiniz. Özel projeler için ek dokümantasyon da hazırlıyoruz.'
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-faq.svg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in-up">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200 animate-fade-in-up stagger-1">
            Merak ettikleriniz burada
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-teal-500">
                  {section.category}
                </h2>
                <div className="space-y-6">
                  {section.questions.map((faq, faqIdx) => (
                    <div key={faqIdx} className="card p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                        <span className="text-teal-500 flex-shrink-0">Q:</span>
                        {faq.q}
                      </h3>
                      <p className="text-gray-700 pl-8">
                        <span className="text-teal-500 font-bold mr-2">A:</span>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Başka Sorunuz Mu Var?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Uzman ekibimiz size yardımcı olmaktan memnuniyet duyar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-block bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              İletişime Geçin
            </Link>
            <a
              href="https://wa.me/905367731404"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp'tan Sor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
