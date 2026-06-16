import type { Metadata } from 'next';
import React, { Suspense } from 'react';
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

      <section className="relative bg-[var(--background)] py-16 px-4 overflow-hidden">
        {/* Bubble decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="omi-bubble" style={{ width: 36, height: 36, left: '5%', bottom: '15%', '--bubble-dur': '6s', animationDelay: '0s' } as React.CSSProperties} />
          <div className="omi-bubble" style={{ width: 56, height: 56, left: '40%', bottom: '8%', '--bubble-dur': '8.5s', animationDelay: '2s' } as React.CSSProperties} />
          <div className="omi-bubble" style={{ width: 24, height: 24, left: '70%', bottom: '20%', '--bubble-dur': '5s', animationDelay: '1s' } as React.CSSProperties} />
          <div className="omi-bubble" style={{ width: 42, height: 42, left: '88%', bottom: '10%', '--bubble-dur': '7.5s', animationDelay: '3.5s' } as React.CSSProperties} />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="omi-animate">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors mb-4">
              <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t_nav('home')}
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">{t('pageTitle')}</h1>
            <p className="text-white/80">{t('pageSubtitle')}</p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-12 px-4 max-w-6xl mx-auto"><div className="h-10 bg-neutral-100 rounded animate-pulse mb-8" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{Array.from({length: 8}).map((_,i) => <div key={i} className="aspect-[3/4] bg-neutral-100 rounded animate-pulse" />)}</div></div>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
