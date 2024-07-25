import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Space, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { DataTypesEnum, Magazine } from '../../../types/types';
import { dateFormatter } from '../../../utils/dateFormatter';

export type MagazineTableDataType = Omit<Magazine, 'filename'>;

export const columns: TableProps<MagazineTableDataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name }) => <span style={{ color: '#1677ff', fontWeight: 500 }}>{name}</span>,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: (value) => dateFormatter(value),
  },
  {
    title: 'File size',
    dataIndex: 'size',
    key: 'size',
    align: 'center',
  },
  {
    title: 'Downloads Count',
    dataIndex: 'downloadsCount',
    key: 'downloadsCount',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { id, name }) => (
      <Space>
        <Link to={`/admin/magazine/${id}/edit`}>
          <EditOutlined style={{ fontSize: 16 }} />
        </Link>
        <ConfirmModal data={{ id, name }} type={DataTypesEnum.MAGAZINE}>
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </ConfirmModal>
      </Space>
    ),
  },
];
