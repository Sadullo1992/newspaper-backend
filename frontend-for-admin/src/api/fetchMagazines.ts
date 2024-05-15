import { BASE_URL } from '../constants/constants';
import { IMagazine, IResponse } from '../types/types';

async function fetchMagazines(currentPage = 1): Promise<IResponse<IMagazine[]>> {
  const response = await fetch(`${BASE_URL}/magazines/?page=${currentPage}`);
  const data = await response.json();
  return data;
}

async function fetchMagazineById(id: string): Promise<IMagazine> {
  const response = await fetch(`${BASE_URL}/magazines/${id}`);
  const data = await response.json();
  return data;
}

export { fetchMagazines, fetchMagazineById };
