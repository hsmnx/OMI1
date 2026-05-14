import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types/product';

type Props = {
  product: Product;
  locale: string;
  categoryName: string;
};

export default function ProductCard({ product, locale, categoryName }: Props) {
  const name = locale === 'ar' ? product.nameAr : product.nameFr;

  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group block"
    >
      <div
        className="relative aspect-[3/4] rounded-sm overflow-hidden mb-3"
        style={{ backgroundColor: product.bg }}
      >
        <Image
          src={`https://omi.mr/imageView.php?id=${product.imageId}`}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:-translate-y-1"
        />
        <span className="absolute start-4 top-4 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium px-2 py-1 rounded-sm">
          {categoryName}
        </span>
      </div>
      <div className="space-y-1">
        <p className="font-medium text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">
          {name}
        </p>
        <p className="text-sm text-neutral-500">{product.size}</p>
      </div>
    </Link>
  );
}
