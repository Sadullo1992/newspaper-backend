import { BASE_URL } from '../constants/constants';
import { ICategory } from '../types/types';

async function fetchCategories(): Promise<ICategory[]> {
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data.results;
}

async function fetchCategoryById(id: string): Promise<ICategory> {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  const data = await response.json();
  return data;
}

export { fetchCategories, fetchCategoryById };
