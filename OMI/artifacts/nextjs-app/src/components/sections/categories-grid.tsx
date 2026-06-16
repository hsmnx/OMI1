'use client';

import React, { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import CategoryCard from '@/components/ui/category-card';

export default function CategoriesGrid() {
  const t = useTranslations('categories');
  const locale = useLocale();
  const shouldReduce = useReducedMotion();

  const countMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) {
      map[p.categoryId] = (map[p.categoryId] ?? 0) + 1;
    }
    return map;
  }, []);

  return (
    <section aria-labelledby="categories-heading" className="relative py-20 px-4 bg-[var(--background)] overflow-hidden">
      {/* Bubble decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="omi-bubble" style={{ width: 48, height: 48, left: '6%', bottom: '12%', '--bubble-dur': '7s', animationDelay: '0s' } as React.CSSProperties} />
        <div className="omi-bubble" style={{ width: 22, height: 22, left: '22%', bottom: '22%', '--bubble-dur': '5.5s', animationDelay: '1.8s' } as React.CSSProperties} />
        <div className="omi-bubble" style={{ width: 64, height: 64, left: '52%', bottom: '6%', '--bubble-dur': '9s', animationDelay: '3.2s' } as React.CSSProperties} />
        <div className="omi-bubble" style={{ width: 32, height: 32, left: '74%', bottom: '18%', '--bubble-dur': '6.5s', animationDelay: '0.6s' } as React.CSSProperties} />
        <div className="omi-bubble" style={{ width: 44, height: 44, left: '91%', bottom: '9%', '--bubble-dur': '8s', animationDelay: '2.4s' } as React.CSSProperties} />
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 id="categories-heading" className="text-3xl font-semibold text-white mb-3">
            {t('sectionTitle')}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={shouldReduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
            >
              <CategoryCard
                categoryId={cat.id}
                name={locale === 'ar' ? cat.nameAr : cat.nameFr}
                countLabel={t('productsCount', { count: countMap[cat.id] ?? 0 })}
                href={`/produits?categorie=${cat.id}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
