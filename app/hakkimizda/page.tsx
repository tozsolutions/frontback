import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hakkımızda | Toz Yapı Teknolojileri',
  description: '20 yılı aşkın deneyimimizle güneş kırıcı sistemler, cephe çözümleri ve akıllı gölgeleme teknolojilerinde lider.',
};

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Müşteri Odaklılık',
      description: 'Her projede müşterilerimizin ihtiyaçlarını en iyi şekilde anlamak ve karşılamak.',
    },
    {
      icon: '💡',
      title: 'İnovasyon',
      description: 'Sektördeki son teknolojileri takip ederek en yenilikçi çözümleri sunmak.',
    },
    {
      icon: '🌱',
      title: 'Sürdürülebilirlik',
      description: 'Çevre dostu ürünler ve enerji verimli çözümlerle geleceğe değer katmak.',
    },
    {
      icon: '🏆',
      title: 'Kalite',
      description: 'Avrupa standartlarında üretim ve 10 yıl garanti ile kaliteyi garanti etmek.',
    },
  ];

  const stats = [
    { value: '20+', label: 'Yıllık Deneyim' },
    { value: '500+', label: 'Tamamlanan Proje' },
    { value: '98%', label: 'Müşteri Memnuniyeti' },
    { value: '50+', label: 'Ürün Grubu' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/references/tse_ankara_merkez_kampusu.webp')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in-up">
            Hakkımızda
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200 animate-fade-in-up stagger-1">
            20 yılı aşkın deneyimimizle yapı teknolojileri sektöründe lider
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Toz Yapı Teknolojileri Kimdir?
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="mb-6">
                Toz Yapı Teknolojileri, güneş kırıcı sistemler, cephe çözümleri ve akıllı gölgeleme 
                teknolojileri alanında 20 yılı aşkın deneyime sahip öncü bir firmadır. Modern mimarinin 
                gereksinimlerini karşılayan, enerji verimli ve sürdürülebilir çözümler sunuyoruz.
              </p>
              <p className="mb-6">
                Geniş ürün gamımız arasında brise soleil sistemleri, pergola çözümleri, dış cephe 
                jaluzileri, havuz kapama sistemleri ve daha birçok inovatif ürün bulunmaktadır. 
                Her projeye özel yaklaşımımızla, müşterilerimizin ihtiyaçlarına en uygun çözümleri 
                geliştiriyoruz.
              </p>
              <p>
                Kalite, güvenilirlik ve müşteri memnuniyeti ilkelerinden ödün vermeden, Türkiye'nin 
                dört bir yanında ve uluslararası pazarlarda başarılı projelere imza atmaya devam 
                ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Projeniz İçin Birlikte Çalışalım
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Uzman ekibimizle tanışın ve projeniz için en uygun çözümleri birlikte belirleyelim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-block bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/urun-gruplari"
              className="inline-block bg-teal-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-900 transition-all shadow-lg hover:shadow-xl"
            >
              Ürünlerimizi İnceleyin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
