import { Breadcrumb, Layout, theme } from 'antd';

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout.Header style={{ padding: 24, background: colorBgContainer }}>
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
    </Layout.Header>
  );
};
