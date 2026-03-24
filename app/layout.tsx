import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LunaBot from "@/components/LunaBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toz Yapı Teknolojileri | Güneş Kırıcı Sistemler & Cephe Çözümleri",
  description: "Güneş kırıcı sistemler, brise soleil, pergola ve cephe kaplama çözümleri. Sürdürülebilir, enerji verimli ve estetik mimari çözümler için TOZ Yapı Teknolojileri.",
  keywords: "güneş kırıcı, brise soleil, pergola, cephe kaplama, alüminyum sistemler, sürdürülebilir mimari, enerji verimliliği",
  authors: [{ name: "Toz Yapı Teknolojileri" }],
  openGraph: {
    title: "Toz Yapı Teknolojileri | Güneş Kırıcı Sistemler & Cephe Çözümleri",
    description: "Güneş kırıcı sistemler, brise soleil, pergola ve cephe kaplama çözümleri.",
    url: "https://tozyapi.com.tr",
    siteName: "Toz Yapı Teknolojileri",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Toz Yapı Teknolojileri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toz Yapı Teknolojileri",
    description: "Güneş kırıcı sistemler, brise soleil, pergola ve cephe kaplama çözümleri.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://tozyapi.com.tr"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <LunaBot />
      </body>
    </html>
  );
}
