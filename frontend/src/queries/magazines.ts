import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { MagazineFieldType } from '../components/FormMagazine';
import { BASE_URL } from '../constants/constants';
import { IResponse, Magazine } from '../types/types';

type PaginationParams = {
  page?: number;
  perPage?: number;
};

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
    mutationFn: async (values: MagazineFieldType) => {
      const form = new FormData();
      for(const [key, value] of Object.entries(values)) {
        form.append(key, value);
      }
      return await axios.post(`${BASE_URL}/admin/post`, form);
    },
  });
}