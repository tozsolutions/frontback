import productData from '@/data/products.json';

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  applications: string[];
  image: string;
  technicalDocs: string;
}

export function getAllProducts(): Product[] {
  return productData.products;
}

export function getProductBySlug(slug: string): Product | null {
  return productData.products.find(product => product.slug === slug) || null;
}

export function getProductsByCategory(category: string): Product[] {
  return productData.products.filter(product => product.category === category);
}

export function getProductCategories(): string[] {
  return productData.categories;
}

export function getCategoryBySlug(slug: string): string | null {
  return productData.categories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, '-').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c') === slug
  ) || null;
}

export function getRelatedProducts(slug: string, limit: number = 4): Product[] {
  const currentProduct = getProductBySlug(slug);
  if (!currentProduct) return [];
  
  return getAllProducts()
    .filter(product => product.slug !== slug && product.category === currentProduct.category)
    .slice(0, limit);
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": `https://tozyapi.com.tr${product.image}`,
    "brand": {
      "@type": "Organization",
      "name": "Toz Yapı Teknolojileri",
      "url": "https://tozyapi.com.tr"
    },
    "category": product.category,
    "features": product.features,
    "application": product.applications,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Toz Yapı Teknolojileri"
      }
    }
  };
}
