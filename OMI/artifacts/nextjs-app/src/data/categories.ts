import type { Category } from '@/types/product';

export const categories: Category[] = [
  { id: 'detergent', slug: 'detergent', nameFr: 'Détergent poudre', nameAr: 'مسحوق الغسيل' },
  { id: 'lave-main', slug: 'lave-main', nameFr: 'Lave main liquide', nameAr: 'سائل غسيل اليدين' },
  { id: 'javel', slug: 'javel', nameFr: 'Javel', nameAr: 'المبيض' },
  { id: 'savon', slug: 'savon', nameFr: 'Savons en pâte', nameAr: 'معجون الغسيل' },
  { id: 'vitres', slug: 'vitres', nameFr: 'Nettoyant vitres', nameAr: 'منظف الزجاج' },
  { id: 'surface', slug: 'surface', nameFr: 'Nettoyant surface', nameAr: 'منظف الأسطح' },
  { id: 'vaisselle', slug: 'vaisselle', nameFr: 'Nettoyant vaisselle', nameAr: 'منظف الأواني' },
  { id: 'gel-matic', slug: 'gel-matic', nameFr: 'Power Gel Matic', nameAr: 'باور جيل ماتيك' },
  { id: 'maxi-plus', slug: 'maxi-plus', nameFr: 'Maxi Plus', nameAr: 'ماكسي بلاس' },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
