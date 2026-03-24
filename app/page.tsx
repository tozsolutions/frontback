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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Güneş Kırıcı Sistemlerde{' '}
              <span className="text-gradient">İnovasyon</span> ve{' '}
              <span className="text-gradient">Sürdürülebilirlik</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Modern mimari için akıllı cephe çözümleri. Enerji tasarrufu, estetik tasarım ve uzun ömürlü performans.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/urun-gruplari"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                Ürünlerimizi Keşfedin
              </Link>
              <Link
                href="/iletisim"
                className="bg-white text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ürün Gruplarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern yapılar için kapsamlı cephe ve güneş kırıcı sistemleri
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Tümü
            </button>
            {categories.filter(c => c !== 'all').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.slice(0, 9).map((product) => (
              <Link
                key={product.id}
                href={`/urun-gruplari/${product.slug}`}
                className="card overflow-hidden group"
              >
                <div className="relative h-48 bg-gradient-to-br from-teal-100 to-cyan-100">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {product.category === 'Güneş Kırıcı Sistemler' && '☀️'}
                    {product.category === 'Cephe Sistemleri' && '🏢'}
                    {product.category === 'Dış Mekan' && '🏡'}
                    {product.category === 'Güvenlik Sistemleri' && '🔒'}
                    {product.category === 'Kapı Sistemleri' && '🚪'}
                    {product.category === 'Pencere Sistemleri' && '🪟'}
                    {product.category === 'Akıllı Sistemler' && '💡'}
                    {product.category === 'Havuz Sistemleri' && '🏊'}
                    {product.category === 'İklimlendirme' && '🌡️'}
                    {product.category === 'İç Mekan' && '🏠'}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center text-teal-600 font-semibold">
                    Detaylı Bilgi
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/urun-gruplari"
              className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
            >
              Tüm Ürünleri Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Toz Yapı?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              20 yılı aşkın deneyimimizle projelerinize değer katıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Projeniz İçin Özel Çözüm Arıyorsunuz?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Güneş kırıcı sistemleri, cephe çözümleri ve akıllı gölgeleme teknolojileri 
            hakkında uzman ekibimizden ücretsiz danışmanlık alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/katalog"
              className="bg-teal-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-900 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Katalog İndir
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
                className="card overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-sm text-teal-600 font-semibold mb-2">Blog</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-teal-600 font-semibold text-sm flex items-center">
                      Devamını Oku
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
            >
              Tüm Blog Yazıları
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-secondary-hover rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Hemen Teklif Alın
            </h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Projeniz için en uygun çözümü bulmak için uzman ekibimizle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+905367731404"
                className="inline-flex items-center justify-center bg-white text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +90 536 773 14 04
              </a>
              <a
                href="mailto:merhaba@tozyapi.com.tr"
                className="inline-flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
