import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, MenuProps, Space, theme, Typography } from 'antd';
import { useAuth } from '../auth/AuthProvider';

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { logout, username } = useAuth();

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => logout()}>Logout</a>,
      icon: <LogoutOutlined />,
    },
  ];

  const breadcrumbItems = [
    {
      title: 'Home',
    },
    {
      title: 'App',
    },
  ];

  return (
    <Layout.Header
      style={{
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Breadcrumb items={breadcrumbItems} />
      <Space>
        <Typography.Text>{username}</Typography.Text>
        <Dropdown menu={{ items: menuItems }}>
          <Avatar style={{ backgroundColor: '#0d3e2c' }} icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};
