import { useEffect, useState } from 'react';

import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { fetchCategoryById } from '../../api/fetchCategories';
import { FormCategory } from '../../components/FormCategory';
import { Category, DataTypesEnum } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const UpdateCategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category>();

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
      <SinglePageHeader title="Update Category" type={DataTypesEnum.CATEGORY} />
      {loading && <Spin />}
      {category && <FormCategory updateCategoryData={category} />}
    </>
  );
};
