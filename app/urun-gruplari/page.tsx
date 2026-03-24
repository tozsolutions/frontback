'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllProducts, getProductCategories } from '@/lib/products';

const products = getAllProducts();
const categories = ['Tümü', ...getProductCategories()];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  const filteredProducts = selectedCategory === 'Tümü'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-hover text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Ürün Gruplarımız
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            Modern mimari için kapsamlı cephe ve güneş kırıcı sistemleri çözümleri
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b bg-white sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
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
                  className="card overflow-hidden group"
                >
                  <div className="relative h-56 bg-gradient-to-br from-teal-100 to-cyan-100">
                    <div className="absolute inset-0 flex items-center justify-center text-7xl">
                      {iconMap[product.category] || '🏗️'}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-teal-600 font-semibold">
                      Detaylı Bilgi
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Projeniz İçin Özel Çözüm Arıyorsunuz?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Uzman ekibimizle iletişime geçin, size en uygun ürünü birlikte belirleyelim.
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
