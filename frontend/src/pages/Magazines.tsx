import { useState, useEffect } from 'react';
import { DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps, GetProp } from 'antd';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../components/ConfirmModal';
import { fetchMagazines } from '../api/fetchMagazines';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
}

export interface MagazineDataType {
  key: number;
  name: string;
  created_at: string;
  hajmi: string;
  downloads_count: number;
}

const columns: TableProps<MagazineDataType>['columns'] = [
  {
    title: 'Nashr Nomi',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name }) => <span style={{ color: '#1677ff', fontWeight: 500 }}>{name}</span>,
  },
  {
    title: 'Yaratilgan Vaqti',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (_, { created_at }) => created_at.slice(0, -5).replace('T', ' '),
  },
  {
    title: 'Hajmi',
    dataIndex: 'hajmi',
    key: 'hajmi',
    align: 'center',
  },
  {
    title: 'Yuklanishlar Soni',
    dataIndex: 'downloads_count',
    key: 'downloads_count',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { key, name }) => (
      <Space>
        <Link to={`/admin/magazine/${key}/edit`}>
          <EditOutlined style={{ fontSize: 16 }} />
        </Link>
        <ConfirmModal data={{ key, name }} type="nashr">
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </ConfirmModal>
      </Space>
    ),
  },
];

export const Magazines = () => {
  const [magazines, setMagazines] = useState<MagazineDataType[]>([]);

  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    setLoading(true);
    fetchMagazines(tableParams.pagination?.current).then((data) => {
      setLoading(false);
      const dataSource = data.results.map(({ id, name, created_at, hajmi, downloads_count }) => ({
        key: id,
        name,
        created_at,
        hajmi,
        downloads_count,
      }));
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: data.total,
        },
      });
      setMagazines(dataSource);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams.pagination?.current]);

  const handleTableChange: TableProps['onChange'] = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Gazeta Nashrlari</h2>
        <Link to={'/admin/magazine/add'}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Gazeta Nashri
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={magazines}
        size="middle"
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={loading}
      />
    </>
  );
};
