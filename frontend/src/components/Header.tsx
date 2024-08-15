import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, MenuProps, theme } from 'antd';
import { useAuth } from '../auth/AuthProvider';

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { logout } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => logout()}>Logout</a>,
      icon: <LogoutOutlined />,
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
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: 'App',
          },
        ]}
      />
      <Dropdown menu={{ items }}>
        <Avatar style={{ backgroundColor: '#0d3e2c' }} icon={<UserOutlined />} />
      </Dropdown>
    </Layout.Header>
  );
};
