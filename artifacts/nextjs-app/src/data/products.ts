import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    slug: 'nettoyant-vaisselle-limon-750ml',
    categoryId: 'vaisselle',
    nameFr: 'Nettoyant vaisselle limon',
    nameAr: 'منظف الأطباق بنكهة الليمون',
    size: '750ML',
    scent: 'limon',
    imageId: 1,
    bg: '#FFFDE7',
  },
  {
    id: 2,
    slug: 'lave-main-lavandra-300ml',
    categoryId: 'lave-main',
    nameFr: 'Lave main lavandra',
    nameAr: 'غسول اليدين برائحة اللافندر',
    size: '300ML',
    scent: 'lavandra',
    imageId: 2,
    bg: '#F3E5F5',
  },
  {
    id: 3,
    slug: 'nettoyant-vitres-lavandra-500ml',
    categoryId: 'vitres',
    nameFr: 'Nettoyant vitres lavandra',
    nameAr: 'منظف النوافذ برائحة اللافندر',
    size: '500ml',
    scent: 'lavandra',
    imageId: 3,
    bg: '#EDE7F6',
  },
  {
    id: 4,
    slug: 'nettoyant-vitres-original-500ml',
    categoryId: 'vitres',
    nameFr: 'Nettoyant vitre original',
    nameAr: 'منظف النوافذ الأصلي',
    size: '500ml',
    scent: 'original',
    imageId: 4,
    bg: '#E3F2FD',
  },
  {
    id: 5,
    slug: 'nettoyant-surface-limon-1-5l',
    categoryId: 'surface',
    nameFr: 'Nettoyant surface limon',
    nameAr: 'منظف السطح بنكهة الليمون',
    size: '1,5L',
    scent: 'limon',
    imageId: 5,
    bg: '#FFFDE7',
  },
  {
    id: 6,
    slug: 'nettoyant-surface-lavandra-1-5l',
    categoryId: 'surface',
    nameFr: 'Nettoyant surface lavandra',
    nameAr: 'منظف السطح برائحة اللافندر',
    size: '1,5L',
    scent: 'lavandra',
    imageId: 6,
    bg: '#F3E5F5',
  },
  {
    id: 7,
    slug: 'nettoyant-surface-original',
    categoryId: 'surface',
    nameFr: 'Nettoyant surface original',
    nameAr: 'منظف السطح الأصلي',
    size: '1,5L / 5L',
    scent: 'original',
    imageId: 7,
    bg: '#F5F5F5',
  },
  {
    id: 8,
    slug: 'eau-de-javel',
    categoryId: 'javel',
    nameFr: 'Eau de Javel',
    nameAr: 'ماء الجاوي',
    size: '1L / 5L',
    scent: 'original',
    imageId: 8,
    bg: '#E8F5E9',
  },
  {
    id: 9,
    slug: 'detergent-poudre',
    categoryId: 'detergent',
    nameFr: 'Détergent poudre',
    nameAr: 'مسحوق منظف',
    size: '15g / 25g',
    imageId: 9,
    bg: '#E3F2FD',
  },
  {
    id: 11,
    slug: 'savon-pates-citron',
    categoryId: 'savon',
    nameFr: 'Savon pâtes au citron',
    nameAr: 'صابون القوالب بالليمون',
    size: '250g / 500g / 1kg',
    scent: 'limon',
    imageId: 11,
    bg: '#FFFDE7',
  },
  {
    id: 13,
    slug: 'lave-main-original-300ml',
    categoryId: 'lave-main',
    nameFr: 'Lave main original',
    nameAr: 'غسول اليدين الأصلي',
    size: '300ML',
    scent: 'original',
    imageId: 13,
    bg: '#E3F2FD',
  },
  {
    id: 14,
    slug: 'savon-pates-original-1kg',
    categoryId: 'savon',
    nameFr: 'Savon pâtes original',
    nameAr: 'صابون القوالب الأصلي',
    size: '1kg',
    scent: 'original',
    imageId: 14,
    bg: '#F5F5F5',
  },
  {
    id: 17,
    // CLIENT_CONFIRMATION: FR site category=surface, AR site category=vaisselle
    slug: 'nettoyant-lavandra-750ml',
    categoryId: 'surface',
    nameFr: 'Nettoyant lavandra',
    nameAr: 'منظف برائحة اللافندر',
    size: '750ML',
    scent: 'lavandra',
    imageId: 17,
    bg: '#F3E5F5',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}
