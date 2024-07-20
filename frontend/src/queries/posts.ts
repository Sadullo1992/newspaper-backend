import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { BASE_URL } from '../constants/constants';
import { IResponse, Post } from '../types/types';

type PaginationParams = {
  page?: number;
  perPage?: number;
};

export function usePostsQuery({ page = 1, perPage = 10 }: PaginationParams) {
  return useQuery<IResponse<Post>, AxiosError>({
    queryKey: ['posts', page, perPage],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/post?page=${page}&perPage=${perPage}`);
      return res.data;
    },
  });
}

export function useInvalidatePosts() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries({ queryKey: ['posts'], exact: true }),
    []
  );
}

export function useAddPost() {
  return useMutation({
    mutationFn: async (values: Omit<Post, 'id'>) => {
      return await axios.post(`${BASE_URL}/admin/post`, values);
    },
  });
}

export function useRemoveImageFile() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${BASE_URL}/media/images/${id}`);
    },
  });
}
