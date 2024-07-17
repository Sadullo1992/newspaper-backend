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
  links: {
    next: null;
    previous: null;
  };
  total: number;
  page: number;
  page_size: number;
  results: T;
}

export type TImage = {
  id: number;
  image: string;
  video: string;
};

export interface IArticle {
  id: string;
  title: string;
  category: Category;
  created_at: string;
  updated_at: string;
  dolzarb: boolean;
  is_featured: boolean;
  slug: string;
  views: number;
  postimage_set: TImage[];
  author: string;
}

export interface IPost extends IArticle {
  content: string;
}

export interface IMagazine {
  id: number;
  name: string;
  created_at: string;
  file: string;
  hajmi: string;
  downloads_count: number;
}
