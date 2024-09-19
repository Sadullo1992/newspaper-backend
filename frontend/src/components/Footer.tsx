import { Layout } from 'antd';

export const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      Bobotogtongi News ©{new Date().getFullYear()}. All Rights Reserved.
    </Layout.Footer>
  );
};
