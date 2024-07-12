import { useState, useEffect } from 'react';

import { DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/fetchCategories';
import { ConfirmModal } from '../components/ConfirmModal';

export interface CategoryDataType {
  key: string;
  name: string;
  slug: string;
}

const columns: TableProps<CategoryDataType>['columns'] = [
  {
    title: 'Kategoriya Nomi',
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
    render: (_, { key, name }) => (
      <Space size={50}>
        <Link to={`/admin/category/${key}/edit`}>
          <EditOutlined style={{ fontSize: 16 }} />
        </Link>
        <ConfirmModal data={{ key, name }} type="kategoriya">
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </ConfirmModal>
      </Space>
    ),
  },
];

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryDataType[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCategories().then((data) => {
      setLoading(false);
      const dataSource = data.map(({ id, ...rest }) => ({ key: id, ...rest }));
      setCategories(dataSource);
    });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Kategoriyalar</h2>
        <Link to={'/admin/category/add'}>
          <Button type="primary" icon={<PlusOutlined />}>
            Kategoriya qo&#39;shish
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={categories} loading={loading} />
    </>
  );
};
