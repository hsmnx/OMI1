import type { Metadata } from 'next';
import { Inter, Tajawal } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import '@/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-arabic',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });

  const titleTemplate = locale === 'ar' ? '%s | أومي موريتانيا' : '%s | OMI Mauritanie';

  return {
    title: {
      default: t('title'),
      template: titleTemplate,
    },
    description: t('description'),
    openGraph: {
      siteName: 'OMI Mauritanie',
      locale,
      type: 'website',
      images: [
        {
          url: 'https://omi.mr/assets/images/banner/banner-img-2.png',
          width: 1200,
          height: 630,
          alt: 'OMI Mauritanie',
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? tajawal.className : inter.className;

  return (
    <html lang={locale} dir={dir} className={fontClass}>
      <head>
        <link rel="preconnect" href="https://omi.mr" />
        <link rel="dns-prefetch" href="https://omi.mr" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
