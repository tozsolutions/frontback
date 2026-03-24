import { LUNA_WHATSAPP_LINK, LUNA_WHATSAPP_NUMBER } from "./data/constants";

type ProductItem = {
  slug: string;
  title: string;
  keywords: string[];
  short: string;
  cta: string;
};

type BlogItem = {
  slug: string;
  title: string;
  keywords: string[];
};

export const LUNA_PRODUCTS: ProductItem[] = [
  {
    slug: "/urunler/panjur-sistemleri",
    title: "Panjur Sistemleri",
    keywords: ["panjur", "monoblok", "gizli kutu", "lento", "kepenk kutu"],
    short:
      "Panjur sistemleri; güneş kontrolü, mahremiyet, güvenlik ve ısı konforu için uygundur.",
    cta: "Panjur sistemleri için detaylı yönlendirme yapabilirim.",
  },
  {
    slug: "/urunler/kepenk-sistemleri",
    title: "Kepenk Sistemleri",
    keywords: ["kepenk", "şeffaf kepenk", "çelik kepenk", "katlanır kepenk"],
    short:
      "Kepenk sistemleri özellikle güvenlik, mağaza kapanışı ve ticari alan korumasında öne çıkar.",
    cta: "Kepenk sistemleri için uygun çözümü belirleyebilirim.",
  },
  {
    slug: "/urunler/pergola-tente",
    title: "Pergola & Tente",
    keywords: ["pergola", "tente", "bioclimatic", "rolling roof", "teras"],
    short:
      "Pergola ve tente sistemleri dış mekanları daha kontrollü ve dört mevsim kullanılır hale getirir.",
    cta: "Pergola için kullanım alanınıza göre doğru yönlendirme yapabilirim.",
  },
  {
    slug: "/urunler/otomatik-kapi",
    title: "Otomatik Kapı",
    keywords: ["otomatik kapı", "fotoselli", "hermetik", "döner kapı", "akustik kapı"],
    short:
      "Otomatik kapılar; hastane, mağaza, ofis ve yoğun geçişli alanlarda güvenli ve konforlu geçiş sağlar.",
    cta: "Otomatik kapılar için kullanım senaryonuza göre yönlendirebilirim.",
  },
  {
    slug: "/urunler/giyotin-cam",
    title: "Giyotin & Cam Sistemleri",
    keywords: ["giyotin", "cam balkon", "sürme cam", "rüzgar kırıcı", "cam sistemleri"],
    short:
      "Giyotin ve cam sistemleri; balkon, teras ve ticari alanlarda estetik ve kontrollü kapanma sağlar.",
    cta: "Cam sistemleri için uygun ürün grubunu ayırabilirim.",
  },
  {
    slug: "/urunler/akilli-sistemler",
    title: "Akıllı Sistemler",
    keywords: ["akıllı", "otomasyon", "iot", "yapay zeka", "smart", "knx"],
    short:
      "Akıllı sistemler; kontrol, konfor, otomasyon ve merkezi yönetim ihtiyacı olan projelerde öne çıkar.",
    cta: "Akıllı sistemler için proje mantığına göre öneri sunabilirim.",
  },
];

export const LUNA_BLOGS: BlogItem[] = [
  {
    slug: "/blog/otomatik-kapilarda-guvenlik-standartlari",
    title: "Otomatik Kapılarda Güvenlik Standartları",
    keywords: ["güvenlik", "en 16005", "kapı standardı", "otomatik kapı güvenliği"],
  },
  {
    slug: "/blog/bioclimatic-pergola-nedir",
    title: "Bioclimatic Pergola Nedir?",
    keywords: ["bioclimatic", "pergola", "motorlu pergola", "pergola nedir"],
  },
  {
    slug: "/blog/zip-perde-sistemleri-ne-ise-yarar",
    title: "Zip Perde Sistemleri Ne İşe Yarar?",
    keywords: ["zip perde", "screen perde", "rüzgar dayanımı"],
  },
  {
    slug: "/blog/panjur-secerken-dikkat-edilmesi-gerekenler",
    title: "Panjur Seçerken Dikkat Edilmesi Gerekenler",
    keywords: ["panjur seçimi", "alüminyum panjur", "panjur motoru"],
  },
  {
    slug: "/blog/giyotin-cam-sistemleri-avantajlari",
    title: "Giyotin Cam Sistemlerinin Avantajları",
    keywords: ["giyotin cam", "cam sistemleri", "dikey cam"],
  },
];

export const PRICE_REDIRECT_MESSAGE =
  "Fiyatlandırma; ölçü, ürün tipi, uygulama alanı ve teknik detaylara göre değişmektedir. Net bilgi ve projenize özel teklif için WhatsApp hattımız üzerinden bizimle hemen iletişime geçebilirsiniz.";

export function normalizeText(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .trim();
}

export function isPriceIntent(text: string) {
  const q = normalizeText(text);
  const tokens = [
    "fiyat",
    "ucret",
    "maliyet",
    "ne kadar",
    "kac para",
    "teklif",
    "butce",
    "m2",
    "metrekare",
    "m²",
    "fiyatlandirma",
  ];
  return tokens.some((t) => q.includes(t));
}

export function isContactIntent(text: string) {
  const q = normalizeText(text);
  const tokens = ["iletisim", "whatsapp", "telefon", "aranmak", "ulasmak", "gorusmek"];
  return tokens.some((t) => q.includes(t));
}

export function matchProduct(text: string) {
  const q = normalizeText(text);
  return LUNA_PRODUCTS.find((p) => p.keywords.some((k) => q.includes(normalizeText(k))));
}

export function matchBlog(text: string) {
  const q = normalizeText(text);
  return LUNA_BLOGS.find((b) => b.keywords.some((k) => q.includes(normalizeText(k))));
}

export function createLunaReply(message: string) {
  const product = matchProduct(message);
  const blog = matchBlog(message);

  if (isPriceIntent(message)) {
    return {
      text: `${PRICE_REDIRECT_MESSAGE}`,
      whatsappText:
        "Merhaba, proje detaylarıma göre net teklif almak istiyorum. Yardımcı olur musunuz?",
      product,
      blog,
    };
  }

  if (isContactIntent(message)) {
    return {
      text:
        "Uzman ekibimizle hızlı iletişim kurmanız için sizi doğrudan WhatsApp hattımıza yönlendirebilirim.",
      whatsappText: "Merhaba, bilgi almak istiyorum.",
      product,
      blog,
    };
  }

  if (product && blog) {
    return {
      text: `${product.title} için kısa yönlendirme yapayım: ${product.short} Konuyla ilgili blog içeriğimiz de var: “${blog.title}”. Teknik detay ve projenize uygun yönlendirme için WhatsApp üzerinden uzman ekibimizle görüşebilirsiniz.`,
      whatsappText: `Merhaba, ${product.title} hakkında bilgi almak istiyorum.`,
      product,
      blog,
    };
  }

  if (product) {
    return {
      text: `${product.short} ${product.cta} Teknik detayları netleştirmek ve projenize uygun çözüm almak için WhatsApp üzerinden uzman ekibimizle iletişime geçebilirsiniz.`,
      whatsappText: `Merhaba, ${product.title} hakkında bilgi almak istiyorum.`,
      product,
      blog: null,
    };
  }

  if (blog) {
    return {
      text: `Bu konuyla ilgili içerik olarak “${blog.title}” başlığımız size yardımcı olabilir. Ancak en doğru yönlendirme için proje tipinizi bizimle paylaşmanız daha doğru olur.`,
      whatsappText: `Merhaba, ${blog.title} ile ilgili bilgi almak istiyorum.`,
      product: null,
      blog,
    };
  }

  return {
    text:
      "Size en doğru yönlendirmeyi yapabilmem için ürün grubu ya da uygulama alanını kısaca yazın. Örneğin panjur, pergola, zip perde, otomatik kapı, giyotin cam veya akıllı sistemler diyebilirsiniz.",
    whatsappText: "Merhaba, projem için bilgi almak istiyorum.",
    product: null,
    blog: null,
  };
}