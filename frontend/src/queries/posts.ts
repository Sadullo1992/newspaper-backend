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
  return React.useCallback(() => queryClient.invalidateQueries({ queryKey: ['posts'] }), []);
}

export function useAddPost() {
  return useMutation({
    mutationFn: async (values: Omit<Post, 'id'>) => {
      return await axios.post(`${BASE_URL}/admin/post`, values);
    },
  });
}

export function useGetPost(id?: string) {
  return useQuery<Post, AxiosError>({
    queryKey: ['post', { id }],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/post/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdatePost() {
  return useMutation({
    mutationFn: async ({ id, ...rest }: Partial<Post>) => {
      return await axios.put(`${BASE_URL}/admin/post/${id}`, {
        ...rest
      });
    },
  });
}

export function useInvalidatePost() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) => queryClient.invalidateQueries({ queryKey: ['post', { id }], exact: true }),
    []
  );
}

// Post images
export function useRemoveImageFile() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${BASE_URL}/media/images/${id}`);
    },
  });
}

export function useRemoveImageFileCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) => queryClient.removeQueries({ queryKey: ['post', { id }], exact: true }),
    []
  );
}
