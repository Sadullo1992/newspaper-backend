import { Button, Card, Col, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { RecentPosts } from './components/RecentPosts';

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
        <Col span={24} lg={12}>
          <Card title="Post statistics by category">
            <Suspense fallback={<div>Loading...</div>}>
              <PostsStatisticsPie />
            </Suspense>
          </Card>
        </Col>
        <Col span={24} lg={12}>
          <Card
            title="Resent Posts"
            extra={
              <Link to={`/admin/post/add`}>
                <Button type="primary" ghost icon={<PlusOutlined />}>
                  Add New
                </Button>
              </Link>
            }
          >
            <RecentPosts />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Visitors">
            <Suspense fallback={<div>Loading...</div>}>
              <PostViewsLine />
            </Suspense>
          </Card>
        </Col>
      </Row>
    </>
  );
};
