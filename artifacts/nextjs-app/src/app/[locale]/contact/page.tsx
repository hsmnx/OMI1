import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { CONTACT } from '@/data/siteContent';
import ContactForm from '@/components/sections/contact-form';

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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const address = locale === 'ar'
    ? `${CONTACT.addressAr}، ${CONTACT.cityAr}`
    : `${CONTACT.addressFr}, ${CONTACT.cityFr}`;

  return (
    <div>
      {/* Page hero */}
      <section className="bg-[#f8f7f5] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">{t('headline')}</h1>
          <p className="text-neutral-500">{t('subheadline')}</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{t('phoneLabel')}</span>
              <a href={CONTACT.phoneHref} className="text-lg font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{t('emailLabel')}</span>
              <a href={CONTACT.emailHref} className="text-lg font-medium text-neutral-900 hover:text-neutral-600 transition-colors break-all">
                {CONTACT.email}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{t('addressLabel')}</span>
              <address className="not-italic text-neutral-700 leading-relaxed">{address}</address>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
