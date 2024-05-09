import { useState, createElement } from 'react';

import { Layout, Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  ProfileOutlined,
  AppstoreAddOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
<ProfileOutlined />;
<AppstoreAddOutlined />;
<FilePdfOutlined />;

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={'/'}>Dashboard</Link>,
    key: 'dashboard',
    icon: createElement(HomeOutlined),
  },
  {
    label: <Link to={'/category'}>Categories</Link>,
    key: 'categories',
    icon: createElement(ProfileOutlined),
  },
  {
    label: <Link to={'/post'}>Posts</Link>,
    key: 'posts',
    icon: createElement(AppstoreAddOutlined),
  },
  {
    label: <Link to={'/magazine'}>Magazines</Link>,
    key: 'magazines',
    icon: createElement(FilePdfOutlined),
  },
];

export const SideBar = () => {
  const [current, setCurrent] = useState('dashboard');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[current]}
        items={items}
        style={{ paddingTop: '32px' }}
        onClick={onClick}
      />
    </Sider>
  );
};
