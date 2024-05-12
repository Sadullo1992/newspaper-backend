import { useState, useEffect } from 'react';
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  CloseCircleFilled,
  CheckCircleFilled,
} from '@ant-design/icons';
import { Button, Space, Table, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../components/ConfirmModal';
import { fetchPosts } from '../api/fetchPosts';

export interface PostDataType {
  key: string;
  name: string;
  category: string;
  created_at: string;
  is_featured: boolean;
  dolzarb: boolean;
  views: number;
}

const columns: TableProps<PostDataType>['columns'] = [
  {
    title: 'Sarlavha',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Kategoriya',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (_, { created_at }) => created_at.slice(0, -5).replace('T', ' '),
  },
  {
    title: 'Maxsus Post',
    key: 'is_featured',
    align: 'center',
    render: (_, { is_featured }) =>
      is_featured ? (
        <CheckCircleFilled style={{ color: '#52c41a' }} />
      ) : (
        <CloseCircleFilled style={{ color: '#ff4d4f' }} />
      ),
  },
  {
    title: 'Dolzarb',
    key: 'dolzarb',
    align: 'center',
    render: (_, { dolzarb }) =>
      dolzarb ? (
        <CheckCircleFilled style={{ color: '#52c41a' }} />
      ) : (
        <CloseCircleFilled style={{ color: '#ff4d4f' }} />
      ),
  },
  {
    title: 'Korishlar Soni',
    dataIndex: 'views',
    key: 'views',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space>
        <Link to={`/post/${record.key}/edit`}>
          <EditOutlined style={{ fontSize: 16 }} />
        </Link>
        <ConfirmModal data={record}>
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </ConfirmModal>
      </Space>
    ),
  },
];

export const Posts = () => {
  const [posts, setPosts] = useState<PostDataType[]>([]);
  useEffect(() => {
    fetchPosts().then((data) => {
      const dataSource = data.map(
        ({ id, title, category, created_at, is_featured, dolzarb, views }) => ({
          key: id,
          name: title,
          category: category.name,
          created_at,
          is_featured,
          dolzarb,
          views,
        })
      );
      setPosts(dataSource);
    });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Maqolalar</h2>
        <Link to={'/category/add'}>
          <Button type="primary" icon={<PlusOutlined />}>
            Maqola qo&#39;shish
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={posts} size="small" />
    </>
  );
};