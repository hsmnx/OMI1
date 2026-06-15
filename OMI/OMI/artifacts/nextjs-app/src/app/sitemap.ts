import type { MetadataRoute } from 'next';
import { products } from '@/data/products';

const locales = ['fr', 'ar'];
const BASE = ''; // TODO: replace with [FINAL_DOMAIN] when confirmed

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/produits', '/a-propos', '/contact'];
  const productRoutes = products.map((p) => `/produits/${p.slug}`);
  const allRoutes = [...routes, ...productRoutes];

  return locales.flatMap((locale) =>
    allRoutes.map((route) => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
