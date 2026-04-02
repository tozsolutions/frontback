import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  
  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ];
  },
  
  // Redirects for old routes
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/blog',
        permanent: false,
      },
    ];
  },
  
  // Output configuration for static export
  output: 'standalone',
  
  // Compression
  compress: true,
  
  // React strict mode
  reactStrictMode: true,
  
  // Powered by header removal
  poweredByHeader: false,
};

export default nextConfig;
