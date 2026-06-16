'use client';

import { useMemo } from 'react';
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
    <section aria-labelledby="categories-heading" className="py-20 px-4 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 id="categories-heading" className="text-3xl font-semibold text-neutral-900 mb-3">
            {t('sectionTitle')}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto">
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
