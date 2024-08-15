import { createContext } from 'react';
import { LoginDto } from '../types/types';

export type TAuthContext = {
  isAuth: boolean;
  login: (loginDto: LoginDto) => void;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext>({
  isAuth: false,
  login: () => {},
  logout: () => {},
});
