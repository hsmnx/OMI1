import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CONTACT } from '@/data/siteContent';
import VideoHero from '@/components/sections/video-hero';
import MarqueeBanner from '@/components/sections/marquee-banner';
import CategoriesGrid from '@/components/sections/categories-grid';
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
  const ta = await getTranslations({ locale, namespace: 'aboutSnippet' });
  const tc = await getTranslations({ locale, namespace: 'contactCta' });

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

      {/* Video hero */}
      <VideoHero />

      {/* Marquee */}
      <MarqueeBanner />

      {/* Categories */}
      <CategoriesGrid />

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
