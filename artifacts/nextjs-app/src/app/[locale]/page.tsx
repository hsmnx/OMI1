import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { products } from '@/data/products';
import { getCategoryById } from '@/data/categories';
import { CONTACT } from '@/data/siteContent';
import HeroSection from '@/components/sections/hero';
import MarqueeBanner from '@/components/sections/marquee-banner';
import ProductCard from '@/components/sections/product-card';
import WhyOMI from '@/components/sections/why-omi';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'featuredProducts' });
  const ta = await getTranslations({ locale, namespace: 'aboutSnippet' });
  const tc = await getTranslations({ locale, namespace: 'contactCta' });

  const featured = products.slice(0, 6);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OMI Mauritanie',
    url: '[FINAL_DOMAIN]',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      email: CONTACT.email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.addressFr,
      addressLocality: 'Nouakchott',
      addressCountry: 'MR',
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Hero */}
      <HeroSection />

      {/* Marquee */}
      <MarqueeBanner />

      {/* Featured products */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-semibold text-neutral-900">{t('sectionTitle')}</h2>
              <p className="text-neutral-500 mt-1">{t('sectionSubtitle')}</p>
            </div>
            <Link
              href="/produits"
              className="text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900 transition-colors hidden sm:block"
            >
              {t('viewAll')}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => {
              const cat = getCategoryById(product.categoryId);
              const categoryName = cat ? (locale === 'ar' ? cat.nameAr : cat.nameFr) : '';
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  categoryName={categoryName}
                />
              );
            })}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link href="/produits" className="text-sm font-medium underline underline-offset-4 text-neutral-700 hover:text-neutral-900">
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why OMI */}
      <WhyOMI />

      {/* About snippet */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-semibold text-neutral-900">{ta('tagline')}</h2>
          <p className="text-neutral-500 leading-relaxed">{ta('body')}</p>
          <Link
            href="/a-propos"
            className="border border-neutral-300 text-neutral-700 px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-100 transition-colors"
          >
            {ta('cta')}
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-semibold">{tc('headline')}</h2>
          <p className="text-neutral-400">{tc('body')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={CONTACT.phoneHref}
              className="text-white border border-neutral-600 px-6 py-3 text-sm font-medium rounded-sm hover:bg-neutral-800 transition-colors"
            >
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="bg-white text-neutral-900 px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-100 transition-colors"
            >
              {tc('cta')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
