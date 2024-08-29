import { Card, Col, Row, Typography } from 'antd';
import { lazy, Suspense } from 'react';

const PostsStatisticsPie = lazy(() =>
  import('./components/PostsStatisticsPie').then(({ PostsStatisticsPie }) => ({
    default: PostsStatisticsPie,
  }))
);

const PostViewsLine = lazy(() =>
  import('./components/PostViewsLine').then(({ PostViewsLine }) => ({
    default: PostViewsLine,
  }))
);

export const Dashboard = () => {
  return (
    <>
      <Typography.Title level={2}>Admin Dashboard</Typography.Title>
      <Row gutter={[20, 32]}>
        <Col span={24}>
          <Card title="Visitors">
            <Suspense fallback={<div>Loading...</div>}>
              <PostViewsLine />
            </Suspense>
          </Card>
        </Col>
        <Col span={24} lg={12}>
          <Card title="Post statistics by category">
            <Suspense fallback={<div>Loading...</div>}>
              <PostsStatisticsPie />
            </Suspense>
          </Card>
        </Col>
        <Col span={24} lg={12}>
          <Card title="Resent posts">Card content</Card>
        </Col>
      </Row>
    </>
  );
};
