import type { Category } from '@/types/product';

export const categories: Category[] = [
  { id: 'detergent', slug: 'detergent', nameFr: 'Détergent poudre', nameAr: 'مسحوق الغسيل' },
  { id: 'lave-main', slug: 'lave-main', nameFr: 'Lave main liquide', nameAr: 'سائل غسيل اليدين' },
  { id: 'javel', slug: 'javel', nameFr: 'Javel', nameAr: 'المبيض' },
  { id: 'savon', slug: 'savon', nameFr: 'Savons en pâte', nameAr: 'صابون القوالب' },
  { id: 'vitres', slug: 'vitres', nameFr: 'Nettoyant vitres', nameAr: 'منظف الزجاج' },
  { id: 'surface', slug: 'surface', nameFr: 'Nettoyant surface', nameAr: 'منظف الأسطح' },
  { id: 'vaisselle', slug: 'vaisselle', nameFr: 'Nettoyant vaisselle', nameAr: 'منظف الأواني' },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
