import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../components/SideBar';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function Admin() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <SideBar />
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout.Content
          style={{
            margin: '24px 16px 0',
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
