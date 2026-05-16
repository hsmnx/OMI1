'use client';

import { useState, useRef, useEffect } from 'react';
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
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

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
          <Image src="/logo.png" alt={t('brandLogoAlt')} width={60} height={44} priority className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              prefetch
              aria-current={isActive(href) ? 'page' : undefined}
              className={`relative transition-colors duration-150 hover:text-neutral-900 active:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm after:absolute after:bottom-[-2px] after:start-0 after:w-full after:h-[2px] after:bg-neutral-900 after:transition-transform after:duration-200 ${
                isActive(href)
                  ? 'text-neutral-900 font-semibold after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Lang dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label="Changer de langue / تغيير اللغة"
              className="flex items-center gap-1 text-sm px-3 py-1.5 border border-neutral-300 rounded-sm text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
            >
              {locale.toUpperCase()}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-150 ${langOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  role="listbox"
                  aria-label="Sélectionner la langue"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute end-0 top-full mt-1.5 bg-white border border-neutral-200 rounded-sm shadow-lg py-1 min-w-[130px] z-10"
                >
                  <button
                    role="option"
                    aria-selected={locale === 'fr'}
                    onClick={() => { router.push(pathname, { locale: 'fr' }); setLangOpen(false); }}
                    className={`block w-full text-start px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50 ${locale === 'fr' ? 'font-semibold text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
                  >
                    Français
                  </button>
                  <button
                    role="option"
                    aria-selected={locale === 'ar'}
                    onClick={() => { router.push(pathname, { locale: 'ar' }); setLangOpen(false); }}
                    className={`block w-full text-start px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50 ${locale === 'ar' ? 'font-semibold text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
                  >
                    عربي
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              <div className="pt-2 border-t border-neutral-100 mt-2 flex gap-2">
                <button
                  onClick={() => { router.push(pathname, { locale: 'fr' }); setMenuOpen(false); }}
                  className={`flex-1 text-center px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${locale === 'fr' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'}`}
                >
                  Français
                </button>
                <button
                  onClick={() => { router.push(pathname, { locale: 'ar' }); setMenuOpen(false); }}
                  className={`flex-1 text-center px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${locale === 'ar' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'}`}
                >
                  عربي
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
