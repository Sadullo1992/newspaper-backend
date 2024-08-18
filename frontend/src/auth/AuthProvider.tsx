import { message } from 'antd';
import { PropsWithChildren, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClearQueryCache, useLogin } from '../queries/user';
import { LoginDto } from '../types/types';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { mutateAsync: userLogin } = useLogin();
  const clearQueryCache = useClearQueryCache();

  const token = localStorage.getItem('token');
  const [isAuth, setIsAuth] = useState<boolean>(!!token);

  const login = async (loginDto: LoginDto) => {
    await userLogin(loginDto, {
      onSuccess: ({ data }) => {
        messageApi.open({
          type: 'success',
          content: 'User login, successfully!',
        });
        setIsAuth(true);
        localStorage.setItem('token', data.token);
        clearQueryCache();
        navigate('/admin');
      },
      onError: (e) => {
        messageApi.open({
          type: 'error',
          content: e.message,
        });
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    clearQueryCache();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {contextHolder} {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
