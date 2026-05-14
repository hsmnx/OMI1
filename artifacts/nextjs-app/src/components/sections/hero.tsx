'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('hero');
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-[#f8f7f5] min-h-[85vh] flex items-center px-4 py-16">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-start gap-6"
        >
          <span className="bg-neutral-900 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-sm">
            {t('badge')}
          </span>
          <h1 className="text-5xl lg:text-[5.5rem] font-bold leading-none tracking-tight text-neutral-900">
            {t('headline')}
          </h1>
          <p className="text-lg text-neutral-500 max-w-md leading-relaxed">
            {t('subheadline')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/produits"
              className="inline-flex items-center justify-center bg-neutral-900 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-700 transition-colors"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href="/a-propos"
              className="inline-flex items-center justify-center border border-neutral-300 text-neutral-700 px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-100 transition-colors"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative h-[500px] lg:h-[600px] rounded-sm overflow-hidden"
        >
          <Image
            src="https://omi.mr/assets/images/banner/banner-img-2.png"
            alt="OMI produits de nettoyage"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
