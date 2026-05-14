import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { products } from '@/data/products';
import { categories, getCategoryById } from '@/data/categories';
import ProductCard from '@/components/sections/product-card';
import CategoryFilter from '@/components/sections/category-filter';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ categorie?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return { title: t('pageTitle') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProduitsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { categorie } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'products' });

  const filtered = categorie
    ? products.filter((p) => p.categoryId === categorie)
    : products;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ar' ? 'الرئيسية' : 'Accueil', item: `[FINAL_DOMAIN]/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('pageTitle'), item: `[FINAL_DOMAIN]/${locale}/produits` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page hero */}
      <section className="bg-[#f8f7f5] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">{t('pageTitle')}</h1>
          <p className="text-neutral-500">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Category filter */}
          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter categories={categories} locale={locale} />
          </Suspense>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <p className="text-neutral-500 py-12 text-center">{t('noResults')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product) => {
                const cat = getCategoryById(product.categoryId);
                const categoryName = cat ? (locale === 'ar' ? cat.nameAr : cat.nameFr) : '';
                return (
                  <ProductCard key={product.id} product={product} locale={locale} categoryName={categoryName} />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
