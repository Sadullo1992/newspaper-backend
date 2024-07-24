import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Space, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { Category } from '../../../types/types';

export const columns: TableProps<Category>['columns'] = [
  {
    title: 'Category Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { id, name }) => (
      <Space size={50}>
        <Link to={`/admin/category/${id}/edit`}>
          <EditOutlined style={{ fontSize: 16, color: '#25ae7a' }} />
        </Link>
        <ConfirmModal data={{ id, name }} type="category">
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </ConfirmModal>
      </Space>
    ),
  },
];
