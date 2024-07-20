import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
  EditOutlined,
} from '@ant-design/icons';

import { Space, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../../../components/ConfirmModal';

export interface PostTableDataType {
  id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
  isActual: boolean;
  views: number;
}

export const columns: TableProps<PostTableDataType>['columns'] = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (_, { title }) => <span style={{ fontWeight: 500 }}>{title}</span>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Featured Post',
    key: 'is_featured',
    align: 'center',
    render: (_, { isFeatured }) =>
      isFeatured ? (
        <CheckCircleFilled style={{ color: '#52c41a' }} />
      ) : (
        <CloseCircleFilled style={{ color: '#ff4d4f' }} />
      ),
  },
  {
    title: 'Actual Post',
    key: 'isActual',
    align: 'center',
    render: (_, { isActual }) =>
      isActual ? (
        <CheckCircleFilled style={{ color: '#52c41a' }} />
      ) : (
        <CloseCircleFilled style={{ color: '#ff4d4f' }} />
      ),
  },
  {
    title: 'View Counts',
    dataIndex: 'views',
    key: 'views',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { id, title, slug }) => (
      <Space>
        <Link to={`/admin/post/${slug}/edit`}>
          <EditOutlined style={{ fontSize: 16 }} />
        </Link>
        <ConfirmModal data={{ id, name: title }} type="post">
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </ConfirmModal>
      </Space>
    ),
  },
];
