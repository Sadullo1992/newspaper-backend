import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RcFile } from 'antd/es/upload';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { BASE_URL } from '../constants/constants';
import { IResponse, Magazine } from '../types/types';

type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type MagazineDto = {
  name: string;
  createdAt: string;
  magazineFile?: RcFile;
};

type UpdateMagazineDto = MagazineDto & { id?: string }

export function useMagazinesQuery({ page = 1, perPage = 10 }: PaginationParams) {
  return useQuery<IResponse<Magazine>, AxiosError>({
    queryKey: ['magazines', page, perPage],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/magazine?page=${page}&perPage=${perPage}`);
      return res.data;
    },
  });
}

export function useInvalidateMagazines() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.invalidateQueries({ queryKey: ['magazines'] }), []);
}

export function useAddMagazine() {
  return useMutation({
    mutationFn: async (values: MagazineDto) => {
      const form = new FormData();
      for (const [key, value] of Object.entries(values)) {
        form.append(key, value);
      }

      return await axios.post(`${BASE_URL}/admin/magazine`, form);
    },
  });
}

export function useGetMagazine(id?: string) {
  return useQuery<Magazine, AxiosError>({
    queryKey: ['magazine', { id }],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/magazine/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdateMagazine() {
  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateMagazineDto) => {
      const form = new FormData();
      for (const [key, value] of Object.entries(rest)) {
        form.append(key, value);
      }

      return await axios.put(`${BASE_URL}/admin/magazine/${id}`, form);
    },
  });
}

export function useInvalidateMagazine() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) => queryClient.invalidateQueries({ queryKey: ['magazine', { id }], exact: true }),
    []
  );
}

export function useRemoveMagazine() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${BASE_URL}/admin/magazine/${id}`);
    },
  });
}

export function useRemoveMagazineCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) => queryClient.removeQueries({ queryKey: ['magazine', { id }], exact: true }),
    []
  );
}
