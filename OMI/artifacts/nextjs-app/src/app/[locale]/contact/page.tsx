import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { CONTACT } from '@/data/siteContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('pageTitle') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const PhoneIcon = () => (
  <svg className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const t_nav = await getTranslations({ locale, namespace: 'nav' });

  const address = locale === 'ar'
    ? `${CONTACT.addressAr}، ${CONTACT.cityAr}`
    : `${CONTACT.addressFr}, ${CONTACT.cityFr}`;

  return (
    <div>
      {/* Page hero */}
      <section className="bg-[var(--background)] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="omi-animate">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors mb-4"
            >
              <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t_nav('home')}
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">{t('headline')}</h1>
            <p className="text-white/80">{t('subheadline')}</p>
          </div>
        </div>
      </section>

      {/* Contact info — single centered column */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto omi-animate">
          <div className="flex flex-col gap-10">
            {/* Phone */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <PhoneIcon />
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{t('phoneLabel')}</span>
              </div>
              <a href={CONTACT.phoneHref} className="text-2xl font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">
                <bdi dir="ltr">{CONTACT.phone}</bdi>
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <EmailIcon />
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{t('emailLabel')}</span>
              </div>
              <a href={CONTACT.emailHref} className="text-2xl font-semibold text-neutral-900 hover:text-neutral-600 transition-colors break-all">
                {CONTACT.email}
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <MapPinIcon />
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{t('addressLabel')}</span>
              </div>
              <address className="not-italic text-xl font-medium text-neutral-700 leading-relaxed">{address}</address>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
