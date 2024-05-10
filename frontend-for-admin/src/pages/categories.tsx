import { useState, useEffect } from 'react';

import { DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/fetchCategories';

interface DataType {
  key: string;
  name: string;
  slug: string;
}

const columns: TableProps<DataType>['columns'] = [
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
    render: (_, record) => (
      <Space size={50}>
        <Link to={`/category/${record.key}/edit`}>
          <EditOutlined style={{ fontSize: 16 }} />
        </Link>
        <Link to={`/category/${record.key}/remove`}>
          <DeleteFilled style={{ fontSize: 16, color: '#f5222d' }} />
        </Link>
      </Space>
    ),
  },
];

export const Categories = () => {
  const [categories, setCategories] = useState<DataType[]>([]);
  useEffect(() => {
    fetchCategories().then((data) => {
      const dataSource = data.map(({ id, ...rest }) => ({ key: id, ...rest }));
      setCategories(dataSource);
      console.log(data);
    });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Kategoriyalar</h2>
        <Link to={'/category/add'}>
          <Button type="primary" icon={<PlusOutlined />}>
            Kategoriya qo&#39;shish
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={categories} />
    </>
  );
};
