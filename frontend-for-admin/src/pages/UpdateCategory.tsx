import { useEffect, useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FormCategory } from '../components/FormCategory';
import { ICategory } from '../types/types';
import { fetchCategoryById } from '../api/fetchCategories';

export const UpdateCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<ICategory>();
  useEffect(() => {
    id && fetchCategoryById(id).then((data) => setCategory(data));
  }, [id]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Update Kategoriya</h2>
        <Link to={'/category'}>
          <Button icon={<LeftOutlined />}>Orqaga qaytish</Button>
        </Link>
      </div>
      {category && <FormCategory initialData={category} />}
    </>
  );
};
