import React from 'react';
import { Layout, theme } from 'antd';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Categories } from './pages/categories';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <SideBar />
      <Layout style={{ height: '100vh' }}>
        <Header />
        <Content
          style={{
            margin: '24px 16px 0',
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Categories />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
