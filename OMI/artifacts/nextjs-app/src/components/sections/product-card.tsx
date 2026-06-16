import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types/product';

type Props = {
  product: Product;
  locale: string;
  categoryName: string;
  priority?: boolean;
};

export default function ProductCard({ product, locale, categoryName, priority }: Props) {
  const name = locale === 'ar' ? product.nameAr : product.nameFr;
  const viewLabel = locale === 'ar' ? 'عرض' : 'Voir';
  const imgSrc = product.imageSrc ?? `https://omi.mr/imageView.php?id=${product.imageId}`;
  const textDir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
    >
      <div
        className="relative aspect-[4/5] rounded-sm overflow-hidden mb-3 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl"
        style={{ backgroundColor: product.bg }}
      >
        <Image
          src={imgSrc}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:-translate-y-1"
        />
        {/* OMI logo watermark */}
        <div className="absolute bottom-2 end-2 z-10 pointer-events-none">
          <Image src="/logo.png" alt="" width={36} height={26} className="h-6 w-auto opacity-70" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none flex items-end justify-center pb-3">
          <span className="text-white text-xs font-semibold tracking-wide">
            {viewLabel} →
          </span>
        </div>
      </div>
      <div className="space-y-0.5">
        <p
          className="text-base font-semibold text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors"
          lang={locale}
          dir={textDir}
        >
          {name}
        </p>
        <p className="text-xs text-neutral-400 uppercase tracking-wide" lang={locale} dir={textDir}>
          {categoryName}
        </p>
      </div>
    </Link>
  );
}
