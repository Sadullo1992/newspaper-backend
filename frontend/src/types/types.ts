export enum DataTypesEnum {
  CATEGORY = 'category',
  POST = 'post',
  MAGAZINE = 'magazine',
}

export type DataTypesUnion = `${DataTypesEnum}`;

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface IResponse<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type TImage = {
  id: number;
  imagename: string;
  imageSize: string;
  postId: string;
};

export interface Post {
  id: string;
  title: string;
  categoryId: string | null;
  category: Category;
  slug: string;
  createdAt: string;
  updatedAt: string;
  isActual: boolean;
  isFeatured: boolean;
  views: number;
  images: TImage[];
  author: string | null;
}

export interface IMagazine {
  id: number;
  name: string;
  created_at: string;
  file: string;
  hajmi: string;
  downloads_count: number;
}
