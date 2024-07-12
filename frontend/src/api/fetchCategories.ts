import { BASE_URL } from '../constants/constants';
import { ICategory } from '../types/types';

async function fetchCategories(): Promise<ICategory[]> {
  const response = await fetch(`${BASE_URL}/admin/category`);
  const result = await response.json();
  return result.data;
}

async function fetchCategoryById(id: string): Promise<ICategory> {
  const response = await fetch(`${BASE_URL}/admin/category/${id}`);
  const data = await response.json();
  return data;
}

async function createCategory(createCategoryDto: Omit<ICategory, 'id'>) {
  const response = await fetch(`${BASE_URL}/admin/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createCategoryDto),
  });
  return response;
}

export { fetchCategories, fetchCategoryById, createCategory };
