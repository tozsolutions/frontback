'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <section className="relative bg-gradient-to-r from-secondary to-secondary-hover text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-products.svg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in-up">
            Ürün Gruplarımız
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200 animate-fade-in-up stagger-1">
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
                    ? 'bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
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
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/urun-gruplari/${product.slug}`}
                className="card overflow-hidden group animate-fade-in-up"
              >
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-md">
                      {product.category}
                    </span>
                  </div>
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
            ))}
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Projeniz İçin Özel Çözüm Arıyorsunuz?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Uzman ekibimizle iletişime geçin, size en uygun ürünü birlikte belirleyelim.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-teal-700 px-10 py-5 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
}
