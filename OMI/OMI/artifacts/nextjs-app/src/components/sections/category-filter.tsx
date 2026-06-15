'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import type { Category } from '@/types/product';

type Props = {
  categories: Category[];
  locale: string;
};

export default function CategoryFilter({ categories, locale }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('categorie');

  function select(id: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('categorie', id);
    } else {
      params.delete('categorie');
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const allLabel = t('products.filterAll');

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={t('products.filterBy')}>
      <button
        onClick={() => select(null)}
        className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-150 cursor-pointer active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-1 ${
          !active
            ? 'bg-neutral-900 text-white border-neutral-900'
            : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50'
        }`}
      >
        {allLabel}
      </button>
      {categories.map((cat) => {
        const name = locale === 'ar' ? cat.nameAr : cat.nameFr;
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => select(cat.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-150 cursor-pointer active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-1 ${
              isActive
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50'
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
