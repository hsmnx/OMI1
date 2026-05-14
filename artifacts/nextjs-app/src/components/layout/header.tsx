'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const targetLocale = t('switchLangLocale');

  function handleSwitch() {
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    router.push(segments.join('/') || `/${targetLocale}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a
          href={`/${locale}`}
          className="font-semibold text-slate-900 tracking-tight text-base"
        >
          Foundation
        </a>

        <nav className="flex items-center gap-4">
          <a
            href={`/${locale}`}
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            {t('home')}
          </a>

          <button
            onClick={handleSwitch}
            className="text-sm px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            aria-label="Switch language"
          >
            {t('switchLang')}
          </button>
        </nav>
      </div>
    </header>
  );
}
