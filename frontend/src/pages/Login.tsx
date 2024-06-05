import { Layout } from 'antd';
import { AuthForm } from '../components/AuthForm';

export const Login = () => {
  return (
    <Layout
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 12px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 600 }}>
        <h3 style={{ textAlign: 'center', marginBottom: 32 }}>Login</h3>
        <AuthForm />
      </div>
    </Layout>
  );
};
