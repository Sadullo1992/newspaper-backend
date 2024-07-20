import { BASE_URL } from '../constants/constants';
import { Category } from '../types/types';

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/admin/category`);
  const result = await response.json();
  return result.data;
}

async function fetchCategoryById(id: string): Promise<Category> {
  const response = await fetch(`${BASE_URL}/admin/category/${id}`);
  const data = await response.json();
  return data;
}

async function createCategory(createCategoryDto: Omit<Category, 'id'>) {
  const response = await fetch(`${BASE_URL}/admin/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createCategoryDto),
  });
  return response;
}

async function updateCategory(updateCategoryDto: Omit<Category, 'id'>, id: string) {
  const response = await fetch(`${BASE_URL}/admin/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCategoryDto),
  });
  return response;
}

async function removeCategory(id: string) {
  const response = await fetch(`${BASE_URL}/admin/category/${id}`, {
    method: 'DELETE',
  });
  return response;
}

export { fetchCategories, fetchCategoryById, createCategory, updateCategory, removeCategory };
