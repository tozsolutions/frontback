import blogData from '@/data/blog-posts.json';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  publishDate: string;
  readTime: string;
  excerpt: string;
  keywords: string[];
  content: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  image: string;
  author: string;
  canonical: string;
}

export interface Category {
  id: string;
  label: string;
  description: string;
  slug: string;
}

export function getAllPosts(): BlogPost[] {
  return blogData.blogPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  return blogData.blogPosts.find(post => post.slug === slug) || null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => post.category === category);
}

export function getCategories(): Category[] {
  return blogData.categories;
}

export function getCategoryBySlug(slug: string): Category | null {
  return blogData.categories.find(cat => cat.slug === slug) || null;
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];
  
  return getAllPosts()
    .filter(post => post.slug !== slug && post.category === currentPost.category)
    .slice(0, limit);
}

export function generateStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://tozyapi.com.tr${post.image}`,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://tozyapi.com.tr"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Toz Yapı Teknolojileri",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tozyapi.com.tr/images/logos/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.canonical
    },
    "keywords": post.keywords.join(", "),
    "articleSection": post.categoryLabel,
    "wordCount": post.content.length / 5,
    "timeRequired": `PT${parseInt(post.readTime)}M`
  };
}
