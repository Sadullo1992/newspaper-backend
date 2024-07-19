import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/constants';
import { IResponse, Post } from '../types/types';

type PaginationParams = {
  page?: number;
  perPage?: number;
};

export function usePostsQuery({ page = 1, perPage = 10 }: PaginationParams) {
  return useQuery<IResponse<Post>, AxiosError>({
    queryKey: ['categories', page, perPage],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/post?page=${page}&perPage=${perPage}`);
      return res.data;
    },
  });
}
