import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
