'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { categories } from '@/data/categories';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const targetLocale = locale === 'fr' ? 'ar' : 'fr';
  const switchLabel = t('switchLang');

  function handleLangSwitch() {
    router.push(pathname, { locale: targetLocale });
  }

  const navLinks = [
    { href: '/a-propos' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
          <span className="text-2xl font-semibold tracking-tight text-neutral-900">OMI</span>
          <span className="text-xs text-neutral-400 ms-1">MR</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {/* Products dropdown */}
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <Link
              href="/produits"
              className="hover:text-neutral-900 transition-colors py-5 flex items-center gap-1"
            >
              {t('products')}
              <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute start-0 top-full bg-white border border-neutral-200 rounded-sm shadow-lg py-2 min-w-[220px] z-50"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/produits?categorie=${cat.id}`}
                      className="block px-4 py-2.5 hover:bg-neutral-50 text-sm text-neutral-700 transition-colors"
                    >
                      {locale === 'ar' ? cat.nameAr : cat.nameFr}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-neutral-900 transition-colors">
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
              <Link href="/produits" className="px-3 py-2.5 rounded-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setMenuOpen(false)}>
                {t('products')}
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/produits?categorie=${cat.id}`}
                  className="px-3 py-2.5 rounded-sm text-neutral-500 hover:bg-neutral-50 ps-6"
                  onClick={() => setMenuOpen(false)}
                >
                  {locale === 'ar' ? cat.nameAr : cat.nameFr}
                </Link>
              ))}
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="px-3 py-2.5 rounded-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setMenuOpen(false)}>
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
