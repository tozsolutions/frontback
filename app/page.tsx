'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products.json';

const features = [
  {
    icon: '⚡',
    title: 'Hızlı Teslimat',
    description: 'Projenize özel üretim ve zamanında teslimat',
  },
  {
    icon: '🛡️',
    title: '10 Yıl Garanti',
    description: 'Tüm ürünlerimizde uzun süreli garanti',
  },
  {
    icon: '🏆',
    title: 'Yüksek Kalite',
    description: 'Avrupa standartlarında üretim ve malzeme',
  },
  {
    icon: '💼',
    title: 'Uzman Kadro',
    description: '20+ yıllık deneyimli mühendis kadrosu',
  },
];

const stats = [
  { value: '500+', label: 'Tamamlanan Proje' },
  { value: '98%', label: 'Müşteri Memnuniyeti' },
  { value: '20+', label: 'Yıllık Deneyim' },
  { value: '50+', label: 'Ürün Grubu' },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/logos/Blog_Hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Güneş Kırıcı Sistemlerde{' '}
              <span className="text-gradient">İnovasyon</span> ve{' '}
              <span className="text-gradient">Sürdürülebilirlik</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto animate-fade-in-up stagger-2">
              Modern mimari için akıllı cephe çözümleri. Enerji tasarrufu, estetik tasarım ve uzun ömürlü performans.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up stagger-3">
              <Link
                href="/urun-gruplari"
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-10 py-5 rounded-xl font-bold hover:from-teal-600 hover:to-teal-800 transition-all shadow-2xl hover:shadow-3xl text-lg hover:-translate-y-1"
              >
                Ürünlerimizi Keşfedin
              </Link>
              <Link
                href="/iletisim"
                className="bg-white text-secondary px-10 py-5 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl text-lg hover:-translate-y-1 border-2 border-white"
              >
                Teklif Alın
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-3">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Ürün Gruplarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern yapılar için kapsamlı cephe ve güneş kırıcı sistemleri çözümleri
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
              }`}
            >
              Tümü
            </button>
            {categories.filter(c => c !== 'all').slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.slice(0, 9).map((product, index) => {
              const iconMap: Record<string, string> = {
                'Güneş Kırıcı Sistemler': '☀️',
                'Cephe Sistemleri': '🏢',
                'Dış Mekan': '🏡',
                'Güvenlik Sistemleri': '🔒',
                'Kapı Sistemleri': '🚪',
                'Pencere Sistemleri': '🪟',
                'Akıllı Sistemler': '💡',
                'Havuz Sistemleri': '🏊',
                'İklimlendirme': '🌡️',
                'İç Mekan': '🏠',
              };

              return (
                <Link
                  key={product.id}
                  href={`/urun-gruplari/${product.slug}`}
                  className="card group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 bg-gradient-to-br from-teal-100 to-cyan-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                      {iconMap[product.category] || '🏗️'}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-md">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center text-teal-600 font-bold group-hover:gap-3 gap-2 transition-all">
                      Detaylı Bilgi
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/urun-gruplari"
              className="inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white px-10 py-5 rounded-xl font-bold hover:from-teal-600 hover:to-teal-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Tüm Ürünleri Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Neden Toz Yapı?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              20 yılı aşkın deneyimimizle projelerinize değer katıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Projeniz İçin Özel Çözüm Arıyorsunuz?
          </h2>
          <p className="text-2xl text-teal-100 mb-12 max-w-3xl mx-auto">
            Güneş kırıcı sistemleri, cephe çözümleri ve akıllı gölgeleme teknolojileri 
            hakkında uzman ekibimizden ücretsiz danışmanlık alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/iletisim"
              className="bg-white text-teal-700 px-12 py-6 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl text-xl hover:-translate-y-1"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/katalog"
              className="bg-teal-800 text-white px-12 py-6 rounded-xl font-bold hover:bg-teal-900 transition-all shadow-2xl hover:shadow-3xl text-xl hover:-translate-y-1 border-2 border-white/30"
            >
              Katalog İndir
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Blog & Haberler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sektördeki son gelişmeler, teknik rehberler ve uzman görüşleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Güneş Kırıcı Sistemlerde Sürdürülebilirlik',
                excerpt: 'İklim değişikliği ve enerji maliyetlerinin artışı, güneş kırıcı sistemleri modern mimarinin en önemli bileşeni haline getiriyor.',
                date: '1 Mart 2026',
                slug: 'gunes-kirici-sistemlerde-surdurulebilirlik',
              },
              {
                title: 'Mimari Tasarımda Brise Soleil',
                excerpt: 'Le Corbusier tarafından popüler hale getirilen brise soleil, modern mimarinin en ikonik unsurlarından biri.',
                date: '5 Mart 2026',
                slug: 'mimari-tasarimda-brise-soleil',
              },
              {
                title: 'Pergola Sistemlerinde Son Teknolojiler',
                excerpt: 'Pergola sistemleri son 10 yılda dramatik bir evrim geçirdi. AI destekli, kendi enerjisini üreten high-tech yaşam alanları.',
                date: '8 Mart 2026',
                slug: 'pergola-sistemlerinde-son-teknolojiler',
              },
            ].map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="card overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="p-8">
                  <div className="text-sm text-teal-600 font-bold mb-3 uppercase tracking-wide">Blog</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">{post.date}</span>
                    <span className="text-teal-600 font-bold text-sm flex items-center group-hover:gap-3 gap-2 transition-all">
                      Devamını Oku
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/blog"
              className="inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white px-10 py-5 rounded-xl font-bold hover:from-teal-600 hover:to-teal-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Tüm Blog Yazıları
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-secondary-hover rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hemen Teklif Alın
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Projeniz için en uygun çözümü bulmak için uzman ekibimizle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="tel:+905367731404"
                className="inline-flex items-center justify-center bg-white text-secondary px-8 py-5 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +90 536 773 14 04
              </a>
              <a
                href="mailto:merhaba@tozyapi.com.tr"
                className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-700 text-white px-8 py-5 rounded-xl font-bold hover:from-teal-600 hover:to-teal-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-posta Gönder
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
