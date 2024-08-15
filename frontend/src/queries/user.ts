import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { LoginDto } from '../types/types';

export function useLogin() {
  return useMutation({
    mutationFn: async (values: LoginDto) => {
      return await axios.post<{ token: string }>(`${BASE_URL}/admin/auth/login`, values);
    },
  });
}
