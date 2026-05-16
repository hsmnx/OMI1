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
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('instagramLabel')}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
          <span>{t('rights')}</span>
        </div>
      </div>
    </footer>
  );
}
