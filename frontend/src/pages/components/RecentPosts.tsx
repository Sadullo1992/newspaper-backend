import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { Flex, Image, List, Space, Typography } from 'antd';
import React from 'react';
import { usePostsQuery } from '../../queries/posts';
import { dateFormatter } from '../../utils/dateFormatter';

export const RecentPosts = () => {
  const { data, isLoading } = usePostsQuery({
    page: 1,
    perPage: 10,
  });

  return (
    <List
      itemLayout="vertical"
      dataSource={data?.data}
      loading={isLoading}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Image
                style={{ width: 100, height: 'auto', aspectRatio: 16 / 9, borderRadius: '4px' }}
                src={`https://uzunpro.uz/api/media/images/${item?.images[0].imagename}`}
              />
            }
            title={
              <Typography.Link ellipsis href={`/admin/post/${item.id}/edit`}>
                {item.title}
              </Typography.Link>
            }
            description={
              <Flex gap={16}>
                <IconText
                  icon={EyeOutlined}
                  text={`${item.views} Views`}
                  key="list-vertical-eye-o"
                />
                <IconText
                  icon={CalendarOutlined}
                  text={dateFormatter(item.createdAt)}
                  key="list-vertical-like-o"
                />
              </Flex>
            }
          />
        </List.Item>
      )}
    />
  );
};

export const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
