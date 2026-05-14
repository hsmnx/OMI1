'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { AnimatePresence, motion } from 'motion/react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const targetLocale = locale === 'fr' ? 'ar' : 'fr';
  const switchLabel = t('switchLang');

  function handleLangSwitch() {
    router.push(pathname, { locale: targetLocale });
  }

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/produits' as const, label: t('products') },
    { href: '/a-propos' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
          <Image src="/logo.png" alt="OMI" width={60} height={44} priority className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`transition-colors duration-150 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm ${isActive(href) ? 'text-neutral-900 font-semibold' : ''}`}
            >
              {label}
            </Link>
          ))}

          {/* Lang switcher */}
          <button
            onClick={handleLangSwitch}
            className="text-sm px-3 py-1.5 border border-neutral-300 rounded-sm text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
            aria-label={`Switch to ${targetLocale === 'ar' ? 'Arabic' : 'French'}`}
          >
            {switchLabel}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-neutral-700 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-neutral-100 bg-white"
          >
            <nav className="px-4 py-4 flex flex-col gap-1 text-sm font-medium">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`px-3 py-2.5 rounded-sm hover:bg-neutral-50 transition-colors ${isActive(href) ? 'text-neutral-900 font-semibold bg-neutral-50' : 'text-neutral-700'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-neutral-100 mt-2">
                <button
                  onClick={() => { handleLangSwitch(); setMenuOpen(false); }}
                  className="w-full text-start px-3 py-2.5 rounded-sm text-neutral-700 hover:bg-neutral-50 font-medium"
                >
                  {switchLabel}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
