import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { BASE_URL, headers } from '../constants/constants';
import { LoginDto, User } from '../types/types';

export function useLogin() {
  return useMutation({
    mutationFn: async (values: LoginDto) => {
      return await axios.post<{ token: string }>(`${BASE_URL}/admin/auth/login`, values);
    },
  });
}

export function useUsersQuery() {
  return useQuery<User[], AxiosError>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/admin/user`, {
        headers,
      });
      return res.data;
    },
  });
}

export function useInvalidateUsers() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries({ queryKey: ['users'], exact: true }),
    []
  );
}

export function useClearQueryCache() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.getQueryCache().clear(), []);
}
