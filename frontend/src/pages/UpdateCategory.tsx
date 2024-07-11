import { useEffect, useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FormCategory } from '../components/FormCategory';
import { ICategory } from '../types/types';
import { fetchCategoryById } from '../api/fetchCategories';

export const UpdateCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<ICategory>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    id &&
      fetchCategoryById(id).then((data) => {
        setLoading(false);
        setCategory(data);
      });
  }, [id]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Update Kategoriya</h2>
        <Link to={'/admin/category'}>
          <Button icon={<LeftOutlined />}>Orqaga qaytish</Button>
        </Link>
      </div>
      {loading && <Spin />}
      {category && <FormCategory initialData={category} />}
    </>
  );
};
