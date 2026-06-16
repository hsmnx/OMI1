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
    slug: 'lave-main',
    categoryId: 'lave-main',
    nameFr: 'Lave main',
    nameAr: 'غسول اليدين',
    size: '300ML',
    imageId: 2,
    imageSrc: '/images/products/img-lave-main.png',
    bg: '#F3E5F5',
  },
  {
    id: 3,
    slug: 'nettoyant-vitres',
    categoryId: 'vitres',
    nameFr: 'Nettoyant vitres',
    nameAr: 'منظف النوافذ',
    size: '500ml',
    imageId: 3,
    imageSrc: '/images/products/img-nettoyant-vitres.png',
    bg: '#EDE7F6',
  },
  {
    id: 5,
    slug: 'nettoyant-surface',
    categoryId: 'surface',
    nameFr: 'Nettoyant surface',
    nameAr: 'منظف السطح',
    size: '750ML / 1,5L / 5L',
    imageId: 5,
    imageSrc: '/images/products/img-nettoyant-surface.png',
    bg: '#FFFDE7',
  },
  {
    id: 8,
    slug: 'eau-de-javel',
    categoryId: 'javel',
    nameFr: 'Eau de Javel',
    nameAr: 'ماء جافيل',
    size: '1L / 5L',
    scent: 'original',
    imageId: 8,
    imageSrc: '/images/products/img-javel.png',
    bg: '#E8F5E9',
  },
  {
    id: 9,
    slug: 'detergent-poudre',
    categoryId: 'detergent',
    nameFr: 'Détergent poudre',
    nameAr: 'مسحوق غسيل ماكسي كلين',
    size: '15g / 25g',
    imageId: 9,
    imageSrc: '/images/products/img-detergent.png',
    bg: '#E3F2FD',
  },
  {
    id: 11,
    slug: 'savon-pates',
    categoryId: 'savon',
    nameFr: 'Savon pâtes',
    nameAr: 'معجون غسيل',
    size: '250g / 500g / 1kg',
    imageId: 11,
    imageSrc: '/images/products/img-savon-pates.png',
    bg: '#FFFDE7',
  },
  {
    id: 19,
    slug: 'power-gel-matic',
    categoryId: 'gel-matic',
    nameFr: 'Power Gel Matic',
    nameAr: 'باور جيل ماتيك',
    size: '3Kg',
    imageId: 0,
    imageSrc: '/images/products/power-gel-matic.png',
    bg: '#EDE7F6',
  },
  {
    id: 21,
    slug: 'maxi-plus-serviettes',
    categoryId: 'maxi-plus',
    nameFr: 'Maxi Plus Serviettes de Table',
    nameAr: 'ماكسي بلاس - مناديل المائدة',
    size: '',
    imageId: 0,
    imageSrc: '/images/products/maxi-plus-serviettes.png',
    bg: '#E8F5E9',
  },
  {
    id: 22,
    slug: 'maxi-plus-jumbo',
    categoryId: 'maxi-plus',
    nameFr: 'Maxi Plus Jumbo',
    nameAr: 'ماكسي بلاس - بكرة جامبو',
    size: '',
    imageId: 0,
    imageSrc: '/images/products/maxi-plus-jumbo.png',
    bg: '#E8F5E9',
  },
  {
    id: 23,
    slug: 'maxi-plus-classic-2',
    categoryId: 'maxi-plus',
    nameFr: 'Maxi Plus Classic ×2',
    nameAr: 'ماكسي بلاس كلاسيك - 2 رول',
    size: '×2',
    imageId: 0,
    imageSrc: '/images/products/maxi-plus-classic-2.png',
    bg: '#E8F5E9',
  },
  {
    id: 24,
    slug: 'maxi-plus-classic-6',
    categoryId: 'maxi-plus',
    nameFr: 'Maxi Plus Classic ×6',
    nameAr: 'ماكسي بلاس كلاسيك - 6 رول',
    size: '×6',
    imageId: 0,
    imageSrc: '/images/products/maxi-plus-classic-6.png',
    bg: '#E8F5E9',
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
