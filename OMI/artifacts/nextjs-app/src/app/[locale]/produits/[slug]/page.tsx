import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { getCategoryById } from '@/data/categories';
import { CONTACT } from '@/data/siteContent';
import ProductCard from '@/components/sections/product-card';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const name = locale === 'ar' ? product.nameAr : product.nameFr;
  return { title: name };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: 'products' });
  const name = locale === 'ar' ? product.nameAr : product.nameFr;
  const cat = getCategoryById(product.categoryId);
  const categoryName = cat ? (locale === 'ar' ? cat.nameAr : cat.nameFr) : '';
  const description = t(`descriptions.${product.slug}` as Parameters<typeof t>[0]);
  const related = getRelatedProducts(product, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: `https://omi.mr/imageView.php?id=${product.imageId}`,
    description,
    brand: { '@type': 'Brand', name: 'OMI Mauritanie' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'OMI Mauritanie' },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ar' ? 'الرئيسية' : 'Accueil', item: `[FINAL_DOMAIN]/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('pageTitle'), item: `[FINAL_DOMAIN]/${locale}/produits` },
      { '@type': 'ListItem', position: 3, name, item: `[FINAL_DOMAIN]/${locale}/produits/${slug}` },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link href="/produits" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8 inline-flex items-center gap-1">
            <svg className="w-4 h-4 rotate-180 rtl:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {t('backToCatalog')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mt-4">
            {/* Product image */}
            <div
              className="relative aspect-square lg:aspect-[4/5] rounded-sm overflow-hidden lg:sticky lg:top-24 lg:self-start"
              style={{ backgroundColor: product.bg }}
            >
              <Image
                src={`https://omi.mr/imageView.php?id=${product.imageId}`}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10"
              />
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-6">
              {cat && (
                <Link
                  href={`/produits?categorie=${cat.id}`}
                  className="self-start bg-neutral-100 text-neutral-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  {categoryName}
                </Link>
              )}
              <h1 className="text-4xl font-bold text-neutral-900">{name}</h1>
              <span className="inline-flex self-start bg-neutral-900 text-white text-sm px-4 py-1.5 rounded-sm font-medium">
                {product.size}
              </span>
              <p className="text-neutral-600 leading-relaxed">{description}</p>
              <div className="pt-4 border-t border-neutral-100">
                <p className="text-sm text-neutral-500 mb-4">{t('contactForInfo')}</p>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center bg-neutral-900 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-700 transition-colors"
                >
                  <bdi dir="ltr">{CONTACT.phone}</bdi>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-[#f8f7f5]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-8">{t('relatedProducts')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rp) => {
                const rc = getCategoryById(rp.categoryId);
                const rcName = rc ? (locale === 'ar' ? rc.nameAr : rc.nameFr) : '';
                return <ProductCard key={rp.id} product={rp} locale={locale} categoryName={rcName} />;
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
