'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { categories, getCategoryById } from '@/data/categories';
import ProductCard from '@/components/sections/product-card';
import CategoryFilter from '@/components/sections/category-filter';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const categorie = searchParams.get('categorie');
  const locale = useLocale();
  const t = useTranslations('products');

  const filtered = categorie
    ? products.filter((p) => p.categoryId === categorie)
    : products;

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <CategoryFilter categories={categories} locale={locale} />

        {filtered.length === 0 ? (
          <p className="text-neutral-500 py-12 text-center">{t('noResults')}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, index) => {
              const cat = getCategoryById(product.categoryId);
              const categoryName = cat ? (locale === 'ar' ? cat.nameAr : cat.nameFr) : '';
              return (
                <ProductCard key={product.id} product={product} locale={locale} categoryName={categoryName} priority={index < 6} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
