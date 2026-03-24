import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Referanslar | Toz Yapı Teknolojileri',
  description: '500+ tamamlanan proje ile güneş kırıcı sistemler ve cephe çözümleri alanında lider.',
};

export default function ReferencesPage() {
  const references = [
    {
      id: 1,
      name: 'Sapphire İstanbul',
      category: 'Konut',
      location: 'İstanbul',
      description: 'Lüks konut projesi için özel güneş kırıcı sistemler',
      image: '🏢',
    },
    {
      id: 2,
      name: 'Zorlu Center',
      category: 'AVM',
      location: 'İstanbul',
      description: 'Alışveriş merkezi cephe ve gölgeleme çözümleri',
      image: '🛍️',
    },
    {
      id: 3,
      name: 'Başakşehir Hastanesi',
      category: 'Sağlık',
      location: 'İstanbul',
      description: 'Şehir hastanesi için brise soleil sistemleri',
      image: '🏥',
    },
    {
      id: 4,
      name: 'Teknofest İstanbul',
      category: 'Etkinlik',
      location: 'İstanbul',
      description: 'Geçici yapılar için pergola sistemleri',
      image: '🎪',
    },
    {
      id: 5,
      name: 'Antalya Havalimanı',
      category: 'Ulaştırma',
      location: 'Antalya',
      description: 'Dış hatlar terminali cephe sistemleri',
      image: '✈️',
    },
    {
      id: 6,
      name: 'Vadistanbul Ofis',
      category: 'Ofis',
      location: 'İstanbul',
      description: 'A sınıfı ofis binası güneş kırıcı çözümleri',
      image: '🏢',
    },
  ];

  const categories = ['Tümü', 'Konut', 'AVM', 'Sağlık', 'Ofis', 'Ulaştırma', 'Etkinlik'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-references.svg')] bg-cover bg-center opacity-20"></div>
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
                className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {references.map((ref) => (
              <div key={ref.id} className="card overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-7xl">{ref.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                      {ref.category}
                    </span>
                    <span className="text-xs text-gray-500">{ref.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{ref.name}</h3>
                  <p className="text-gray-600 text-sm">{ref.description}</p>
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
