import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { CONTACT } from '@/data/siteContent';
import AnimatedSection from '@/components/ui/animated-section';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('pageTitle') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AProposPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OMI Mauritanie',
    url: '[FINAL_DOMAIN]',
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
      <section className="bg-[#f8f7f5] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">{t('headline')}</h1>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">{t('body')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Image + mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100">
              <Image
                src="https://omi.mr/assets/images/resource/about-1.jpg"
                alt="OMI usine Mauritanie"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('qualityTitle')}</h2>
              <p className="text-neutral-500 leading-relaxed">{t('qualityBody')}</p>
              <h2 className="text-2xl font-semibold text-neutral-900">{t('locationTitle')}</h2>
              <p className="text-neutral-500 leading-relaxed">{t('locationBody')}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-[#f8f7f5]">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <AnimatedSection>
            <p className="text-xl text-neutral-700 leading-relaxed font-medium">{t('mission')}</p>
            <Link
              href="/produits"
              className="inline-block mt-6 bg-neutral-900 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-700 transition-colors duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {t('discoverProducts')}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
