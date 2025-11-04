import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js 16 - Turbopack file system caching for faster builds
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // React 19.2 Compiler - Automatic memoization
  reactCompiler: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Cloudflare/Vercel Edge compatibility
  // output: 'standalone', // Comentado por error de permisos en Windows - Vercel lo maneja automáticamente
};

export default nextConfig;
