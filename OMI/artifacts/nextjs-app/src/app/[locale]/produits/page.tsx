import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import ProductGrid from '@/components/sections/product-grid';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return { title: t('pageTitle') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProduitsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const t_nav = await getTranslations({ locale, namespace: 'nav' });

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

      <section className="bg-[var(--background)] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="omi-animate">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors mb-4">
              <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t_nav('home')}
            </Link>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">{t('pageTitle')}</h1>
            <p className="text-neutral-500">{t('pageSubtitle')}</p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-12 px-4 max-w-6xl mx-auto"><div className="h-10 bg-neutral-100 rounded animate-pulse mb-8" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{Array.from({length: 8}).map((_,i) => <div key={i} className="aspect-[3/4] bg-neutral-100 rounded animate-pulse" />)}</div></div>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
