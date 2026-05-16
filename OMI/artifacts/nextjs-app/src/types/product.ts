export type Scent = 'limon' | 'lavandra' | 'original';

export interface Category {
  id: string;
  slug: string;
  nameFr: string;
  nameAr: string;
}

export interface Product {
  id: number;
  slug: string;
  categoryId: string;
  nameFr: string;
  nameAr: string;
  size: string;
  scent?: Scent;
  imageId: number;
  bg: string;
}
