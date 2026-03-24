'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Kurumsal', href: '/hakkimizda' },
  { name: 'Ürün Grupları', href: '/urun-gruplari' },
  { name: 'Referanslar', href: '/referanslar' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4" aria-label="Top">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logos/logo.svg"
              alt="Toz Yapı Teknolojileri"
              width={180}
              height={50}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Turquoise Color */}
          <div className="hidden lg:block">
            <Link
              href="/iletisim"
              className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-8 py-3.5 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Teklif Alın
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-teal-600 p-2"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-teal-600 hover:bg-gray-50 font-medium transition-colors px-4 py-3 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/iletisim"
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-800 transition-all shadow-md text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Teklif Alın
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
