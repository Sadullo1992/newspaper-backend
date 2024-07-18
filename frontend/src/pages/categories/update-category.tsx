import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FormCategory } from '../../components/FormCategory';
import {
  useGetCategory,
  useInvalidateCategories,
  useInvalidateCategory,
  useUpdateCategory,
} from '../../queries/categories';
import { Category, DataTypesEnum } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const UpdateCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: category, isLoading } = useGetCategory(id);
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const invalidateCategories = useInvalidateCategories();
  const invalidateCategory = useInvalidateCategory();

  const onSubmit = async (values: Omit<Category, 'id'>) => {
    await updateCategory(
      { id, ...values },
      {
        onSuccess: () => {
          messageApi.open({
            type: 'success',
            content: 'Category updated, successfully!',
          });
          invalidateCategories();
          invalidateCategory(id);
          navigate('/admin/category');
        },
        onError: (error) => {
          messageApi.open({
            type: 'error',
            content: `Error occurred: ${error.message}`,
          });
        },
      }
    );
  };

  return (
    <>
      {contextHolder}
      <SinglePageHeader title="Update Category" type={DataTypesEnum.CATEGORY} />
      {isLoading && <Spin />}
      {category && <FormCategory updateCategoryData={category} onSubmit={onSubmit} />}
    </>
  );
};
