import { Flex, Image, List, Space, Typography } from 'antd';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import React from 'react';

export const RecentPosts = () => {
    const data = [
      {
        title:
          'Ant Design Title 1 a design language for background applications a design language for background applications',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];
    return (
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image
                  style={{ width: 100, height: 'auto', aspectRatio: 16 / 9, borderRadius: '4px' }}
                  src={`https://uzunpro.uz/api/media/images/photo_2024-08-21_15-49-33.jpg`}
                />
              }
              title={
                <Typography.Link ellipsis href="https://ant.design">
                  {item.title}
                </Typography.Link>
              }
              description={
                <Flex gap={16}>
                  <IconText icon={EyeOutlined} text="156 Views" key="list-vertical-eye-o" />
                  <IconText
                    icon={CalendarOutlined}
                    text="29.08.2024"
                    key="list-vertical-like-o"
                  />
                </Flex>
              }
            />
          </List.Item>
        )}
      />
    );
}

export const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);