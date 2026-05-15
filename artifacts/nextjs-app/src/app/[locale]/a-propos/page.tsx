import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { CONTACT } from '@/data/siteContent';

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
  const t_nav = await getTranslations({ locale, namespace: 'nav' });

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

      {/* Section 1 — Dark hero with background image */}
      <section className="relative bg-neutral-900 py-24 px-4 overflow-hidden">
        <Image
          src="https://omi.mr/assets/images/banner/banner-img-2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-neutral-900/50" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white/90 transition-colors mb-6"
          >
            <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t_nav('home')}
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('headline')}</h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{t('body')}</p>
        </div>
      </section>

      {/* Section 2 — Stats bar */}
      <section className="bg-white border-b border-neutral-100 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-neutral-900">18</p>
            <p className="text-sm text-neutral-500 mt-1">{t('stats1Label')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-neutral-900">7</p>
            <p className="text-sm text-neutral-500 mt-1">{t('stats2Label')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">{locale === 'ar' ? 'نواكشوط' : 'Nouakchott'}</p>
            <p className="text-sm text-neutral-500 mt-1">{t('stats3Label')}</p>
          </div>
        </div>
      </section>

      {/* Section 3 — Image + story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="omi-animate">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100">
              <Image
                src="https://omi.mr/assets/images/resource/about-1.jpg"
                alt="OMI usine Mauritanie"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="omi-animate-d1">
            <div className="flex flex-col gap-6 border-s-4 border-neutral-100 ps-6">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('qualityTitle')}</h2>
              <p className="text-neutral-500 leading-relaxed">{t('qualityBody')}</p>
              <h2 className="text-2xl font-semibold text-neutral-900">{t('locationTitle')}</h2>
              <p className="text-neutral-500 leading-relaxed">{t('locationBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Mission CTA */}
      <section className="py-16 px-4 bg-[#f8f7f5]">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="omi-animate">
            <p className="text-xl text-neutral-700 leading-relaxed font-medium">{t('mission')}</p>
            <Link
              href="/produits"
              className="inline-block mt-6 bg-neutral-900 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-700 transition-colors duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {t('discoverProducts')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
