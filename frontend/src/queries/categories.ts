import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/constants';
import { Category } from '../types/types';

export function useCategoriesQuery() {
  return useQuery<Category[], AxiosError>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/category`);
      return res.data.data;
    },
  });
}
