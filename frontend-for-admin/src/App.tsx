import React from 'react';
import { Layout, theme } from 'antd';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Categories } from './pages/Categories';
import { UpdateCategory } from './pages/UpdateCategory';
import { AddCategory } from './pages/AddCategory';
import { NotFound } from './pages/NotFound';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <SideBar />
      <Layout style={{ minHeight: '100vh' }}>
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
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/category/:id/edit" element={<UpdateCategory />} />
            <Route path="*" element={<NotFound />} />
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
