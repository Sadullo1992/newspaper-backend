import { Layout } from 'antd';

export const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      Bobotogtongi ©{new Date().getFullYear()} Created by Uzunsoft
    </Layout.Footer>
  );
};
