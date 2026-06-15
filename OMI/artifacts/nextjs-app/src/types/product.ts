export type Scent = 'limon' | 'lavandra' | 'original' | 'aquatique';

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
  imageSrc?: string;
  bg: string;
}
