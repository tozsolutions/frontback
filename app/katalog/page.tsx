import { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Katalog | Toz Yapı Teknolojileri',
  description: 'Ürün kataloglarımızı indirin, teknik dokümanlara erişin.',
};

export default function CatalogPage() {
  const catalogs = [
    {
      id: 1,
      title: 'Güneş Kırıcı Sistemler Kataloğu',
      description: 'Brise soleil, dış cephe jaluzisi ve güneş kırıcı sistemler',
      pages: 48,
      size: '12 MB',
      icon: '☀️',
    },
    {
      id: 2,
      title: 'Pergola Sistemleri Kataloğu',
      description: 'Bioclimatic, rolling roof ve akıllı pergola çözümleri',
      pages: 36,
      size: '10 MB',
      icon: '🏡',
    },
    {
      id: 3,
      title: 'Cephe Kaplama Sistemleri',
      description: 'Alüminyum kompozit, HPL ve seramik cephe çözümleri',
      pages: 52,
      size: '15 MB',
      icon: '🏢',
    },
    {
      id: 4,
      title: 'Kapı ve Pencere Sistemleri',
      description: 'Alüminyum, PVC ve ahşap kapı pencere çözümleri',
      pages: 44,
      size: '11 MB',
      icon: '🚪',
    },
    {
      id: 5,
      title: 'Havuz Kapama Sistemleri',
      description: 'Yüksek ve alçak havuz kapakları',
      pages: 24,
      size: '8 MB',
      icon: '🏊',
    },
    {
      id: 6,
      title: 'Güvenlik Sistemleri',
      description: 'Kepenk, panjur ve bariyer sistemleri',
      pages: 32,
      size: '9 MB',
      icon: '🔒',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-catalog.svg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in-up">
            Katalog
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200 animate-fade-in-up stagger-1">
            Ürün kataloglarımızı indirin, teknik detayları inceleyin
          </p>
        </div>
      </section>

      {/* Catalogs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {catalogs.map((catalog) => (
              <div key={catalog.id} className="card overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-6xl">{catalog.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{catalog.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{catalog.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>{catalog.pages} Sayfa</span>
                    <span>•</span>
                    <span>{catalog.size}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Katalog İndir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIM Library */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              BIM Kütüphanesi
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Mimari projelerinizde kullanabileceğiniz BIM dosyalarımıza erişin.
              Revit, ArchiCAD ve diğer BIM yazılımları ile uyumlu dosyalar.
            </p>
            <Link
              href="/bim-kutuphanesi"
              className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
            >
              BIM Kütüphanesine Git
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Özel Bir Proje Mi Planlıyorsunuz?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Size özel teknik dokümantasyon ve çözümler için bizimle iletişime geçin.
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
