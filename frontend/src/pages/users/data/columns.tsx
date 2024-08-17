import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Space, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { DataTypesEnum, User } from '../../../types/types';
import { dateFormatter } from '../../../utils/dateFormatter';

export const columns: TableProps<User>['columns'] = [
  {
    title: 'Login',
    dataIndex: 'login',
    key: 'login',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: (value) => dateFormatter(value),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { id, login }) => (
      <Space size={50}>
        <Link to={`/admin/user/${id}/edit`}>
          <EditOutlined style={{ fontSize: 16, color: '#25ae7a' }} />
        </Link>
        <ConfirmModal data={{ id, name: login }} type={ DataTypesEnum.USER }>
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </ConfirmModal>
      </Space>
    ),
  },
];
