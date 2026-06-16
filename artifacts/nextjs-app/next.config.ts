import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isDev = process.env.NODE_ENV !== 'production';

const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://omi.mr",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self'",
  "media-src 'self'",
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'omi.mr' }],
    minimumCacheTTL: 2592000,
  },

  async redirects() {
    return [
      { source: '/:locale/produits/detergent-poudre-15g', destination: '/:locale/produits/detergent-poudre', permanent: true },
      { source: '/:locale/produits/detergent-poudre-25g', destination: '/:locale/produits/detergent-poudre', permanent: true },
      { source: '/:locale/produits/nettoyant-surface-original-5l', destination: '/:locale/produits/nettoyant-surface-original', permanent: true },
      { source: '/:locale/produits/nettoyant-surface-original-1-5l', destination: '/:locale/produits/nettoyant-surface-original', permanent: true },
      { source: '/:locale/produits/savon-pates-citron-0-25kg', destination: '/:locale/produits/savon-pates-citron', permanent: true },
      { source: '/:locale/produits/savon-pates-citron-0-5kg', destination: '/:locale/produits/savon-pates-citron', permanent: true },
      { source: '/:locale/produits/savon-pates-citron-1kg', destination: '/:locale/produits/savon-pates-citron', permanent: true },
      { source: '/:locale/produits/eau-de-javel-original-5l', destination: '/:locale/produits/eau-de-javel', permanent: true },
      { source: '/:locale/produits/eau-de-javel-original-1l', destination: '/:locale/produits/eau-de-javel', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'Content-Security-Policy', value: cspHeader },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
