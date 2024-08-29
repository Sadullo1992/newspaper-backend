import { Card, Col, Row, Typography } from 'antd';
import { lazy, Suspense } from 'react';
// import { PostsStatisticsPie } from './components/PostsStatisticsPie';

const PostsStatisticsPie = lazy(() =>
  import('./components/PostsStatisticsPie').then(({ PostsStatisticsPie }) => ({
    default: PostsStatisticsPie,
  }))
);

export const Dashboard = () => {
  return (
    <>
      <Typography.Title level={2}>Dashboard</Typography.Title>
      <Row gutter={20}>
        <Col span={12}>
          <Card title="Post statistics by category">
            <Suspense fallback={<div>Loading...</div>}>
              <PostsStatisticsPie />
            </Suspense>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Card title">Card content</Card>
        </Col>
      </Row>
    </>
  );
};
