import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { BASE_URL } from '../constants/constants';
import { Category } from '../types/types';

export function useCategoriesQuery() {
  return useQuery<Category[], AxiosError>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/category`);
      return res.data;
    },
  });
}

export function useInvalidateCategories() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries({ queryKey: ['categories'], exact: true }),
    []
  );
}

export function useAddCategory() {
  return useMutation({
    mutationFn: async (values: Omit<Category, 'id'>) => {
      return await axios.post(`${BASE_URL}/admin/category`, values);
    },
  });
}

export function useGetCategory(id?: string) {
  return useQuery<Category, AxiosError>({
    queryKey: ['category', { id }],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/category/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: async ({ id, name, slug }: Partial<Category>) => {
      return await axios.put(`${BASE_URL}/admin/category/${id}`, {
        name,
        slug,
      });
    },
  });
}

export function useInvalidateCategory() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) => queryClient.invalidateQueries({ queryKey: ['category', { id }], exact: true }),
    []
  );
}

export function useRemoveCategory() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${BASE_URL}/admin/category/${id}`);
    },
  });
}

export function useRemoveCategoryCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) => queryClient.removeQueries({ queryKey: ['category', { id }], exact: true }),
    []
  );
}
