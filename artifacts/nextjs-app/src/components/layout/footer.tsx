import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CONTACT, SOCIAL } from '@/data/siteContent';

type Props = { locale: string };

export default async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '/' as const, label: tn('home') },
    { href: '/produits' as const, label: tn('products') },
    { href: '/a-propos' as const, label: tn('about') },
    { href: '/contact' as const, label: tn('contact') },
  ];

  const address = locale === 'ar'
    ? `${CONTACT.addressAr}، ${CONTACT.cityAr}`
    : `${CONTACT.addressFr}, ${CONTACT.cityFr}`;

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex rounded-sm bg-white px-3 py-2 mb-2 self-start">
            <Image src="/logo.png" alt={tn('brandLogoAlt')} width={80} height={60} className="h-10 w-auto" />
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">{t('aboutBody')}</p>
        </div>

        {/* Col 2 — Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">{t('navigate')}</h3>
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3 — Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">{t('reachUs')}</h3>
          <div className="flex flex-col gap-2 text-sm text-neutral-400">
            <a href={CONTACT.phoneHref} className="hover:text-white transition-colors">
              <bdi dir="ltr">{CONTACT.phone}</bdi>
            </a>
            <a href={CONTACT.emailHref} className="hover:text-white transition-colors break-all">
              {CONTACT.email}
            </a>
            <address className="not-italic leading-relaxed">{address}</address>
          </div>
        </div>

        {/* Col 4 — Social */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">{t('follow')}</h3>
          <div className="flex gap-4">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('facebookLabel')}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-sm bg-white/90 px-2 py-1">
              <Image src="/logo.png" alt={tn('brandLogoAlt')} width={40} height={29} className="h-5 w-auto opacity-80" />
            </div>
            <span>{t('copyright', { year })}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{t('rights')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('devCredit')}</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://wa.me/22247470606"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
              aria-label="WhatsApp 47470606"
            >
              <bdi dir="ltr">47470606</bdi>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
