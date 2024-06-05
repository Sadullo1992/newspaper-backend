import { useState, createElement, useEffect } from 'react';

import { Layout, Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  ProfileOutlined,
  AppstoreAddOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={'/'}>Dashboard</Link>,
    key: '/',
    icon: createElement(HomeOutlined),
  },
  {
    label: <Link to={'/category'}>Categories</Link>,
    key: '/category',
    icon: createElement(ProfileOutlined),
  },
  {
    label: <Link to={'/post'}>Posts</Link>,
    key: '/post',
    icon: createElement(AppstoreAddOutlined),
  },
  {
    label: <Link to={'/magazine'}>Magazines</Link>,
    key: '/magazine',
    icon: createElement(FilePdfOutlined),
  },
];

export const SideBar = () => {
  const location = useLocation();

  const [current, setCurrent] = useState('/');

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout.Sider breakpoint="lg" collapsedWidth="0">
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[current]}
        items={items}
        style={{ paddingTop: '32px' }}
        onClick={onClick}
      />
    </Layout.Sider>
  );
};
