'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import CardGrid from '@/components/sections/card-grid';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
              {t('hero.headline')}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
              {t('hero.subheadline')}
            </p>
            <Button size="lg">{t('hero.cta')}</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-slate-800 mb-10 text-center"
          >
            {t('cards.title')}
          </motion.h2>
          <CardGrid />
        </div>
      </section>
    </div>
  );
}
