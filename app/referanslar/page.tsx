import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Referanslar | Toz Yapı Teknolojileri',
  description: '500+ tamamlanan proje ile güneş kırıcı sistemler ve cephe çözümleri alanında lider.',
};

export default function ReferencesPage() {
  const references = [
    {
      id: 1,
      name: '400 Yataklı Sincan Eğitim Araştırma Hastanesi',
      category: 'Sağlık',
      location: 'Ankara',
      description: 'Şehir hastanesi için brise soleil sistemleri',
      image: '/images/references/400_yatakli_sincan_egitim_arastirma_hahastanesi.webp',
    },
    {
      id: 2,
      name: 'Swissôtel Valorlu Pergola',
      category: 'Otel',
      location: 'İstanbul',
      description: 'Lüks otel için bioclimatic pergola sistemleri',
      image: '/images/references/swissotel_valorlu_pergola.webp',
    },
    {
      id: 3,
      name: 'Bülent Ecevit Üniversitesi',
      category: 'Eğitim',
      location: 'Zonguldak',
      description: 'Üniversite kampüsü için cephe çözümleri',
      image: '/images/references/bulent_ecevit_universitesi.webp',
    },
    {
      id: 4,
      name: 'Erzincan Şehir Stadyumu',
      category: 'Spor',
      location: 'Erzincan',
      description: 'Stadyum için güneş kırıcı sistemler',
      image: '/images/references/erzincan_sehir_stadyumu.webp',
    },
    {
      id: 5,
      name: 'Hırvatistan Villa Projesi',
      category: 'Konut',
      location: 'Hırvatistan',
      description: 'Lüks villa için pergola ve güneş kırıcı sistemler',
      image: '/images/references/hirvatistan_villa_projesi.webp',
    },
    {
      id: 6,
      name: 'TSE Ankara Merkez Kampüsü',
      category: 'Kamu',
      location: 'Ankara',
      description: 'Standart enstitüsü için cephe modernizasyonu',
      image: '/images/references/tse_ankara_merkez_kampusu.webp',
    },
    {
      id: 7,
      name: 'Bayburt Devlet Hastanesi',
      category: 'Sağlık',
      location: 'Bayburt',
      description: 'Devlet hastanesi için güneş kırıcı çözümler',
      image: '/images/references/bayburt_devlet_hastanesi.webp',
    },
    {
      id: 8,
      name: 'Hatay Hassa Devlet Hastanesi',
      category: 'Sağlık',
      location: 'Hatay',
      description: 'Modern hastane için cephe sistemleri',
      image: '/images/references/hatay_hassa_devlet_hastanesi.webp',
    },
    {
      id: 9,
      name: 'Yozgat Yerköy Devlet Hastanesi',
      category: 'Sağlık',
      location: 'Yozgat',
      description: 'Sağlık tesisi için güneş kontrol sistemleri',
      image: '/images/references/yozgat_yerkoy_devlet_hastanesi.webp',
    },
    {
      id: 10,
      name: 'Mugla AFAD',
      category: 'Kamu',
      location: 'Muğla',
      description: 'AFAD müdürlüğü için cephe çözümleri',
      image: '/images/references/mugla_afad.webp',
    },
    {
      id: 11,
      name: 'Kocatepe 1917',
      category: 'Konut',
      location: 'Afyon',
      description: 'Rezidans projesi için pergola sistemleri',
      image: '/images/references/kocatepe_1917.webp',
    },
    {
      id: 12,
      name: 'Value Village Pozitif ROI',
      category: 'Konut',
      location: 'Yurt Dışı',
      description: 'Konut projesi için sürdürülebilir çözümler',
      image: '/images/references/value_village_pozitif_roi.webp',
    },
  ];

  const categories = ['Tümü', 'Sağlık', 'Otel', 'Eğitim', 'Spor', 'Konut', 'Kamu'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/logos/referasnlar_hero.webp')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in-up">
            Referanslarımız
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200 animate-fade-in-up stagger-1">
            500+ tamamlanan proje ile güveninizi kazanıyoruz
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600">Tamamlanan Proje</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">98%</div>
              <div className="text-gray-600">Müşteri Memnuniyeti</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">20+</div>
              <div className="text-gray-600">Yıllık Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
              <div className="text-gray-600">Ürün Grubu</div>
            </div>
          </div>
        </div>
      </section>

      {/* References Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {references.map((ref) => (
              <div key={ref.id} className="card overflow-hidden animate-fade-in-up">
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <Image
                    src={ref.image}
                    alt={ref.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {ref.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{ref.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{ref.description}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.7a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {ref.location}
                  </div>
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
            Sizin Projeniz de Referanslarımız Arasında Olsun
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Projeniz için özel çözümler sunmak için hazırız.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
}
