import { message } from 'antd';
import { useState } from 'react';
import { FormCategory } from '../../components/FormCategory';
import { useAddCategory, useInvalidateCategories } from '../../queries/categories';
import { Category, DataTypesEnum } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const AddCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: addCategory } = useAddCategory();
  const invalidateCategories = useInvalidateCategories();

  const [isReset, setIsReset] = useState<boolean>(false);

  const onSubmit = async (values: Omit<Category, 'id'>) => {
    await addCategory(values, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'Category created, successfully!',
        });
        setIsReset(true);
        invalidateCategories();
      },
      onError: (error) => {
        messageApi.open({
          type: 'error',
          content: `Error occurred: ${error.message}`,
        });
      },
    });
  };
  return (
    <>
      {contextHolder}
      <SinglePageHeader title="Add Category" type={DataTypesEnum.CATEGORY} />
      <FormCategory onSubmit={onSubmit} isReset={isReset} />
    </>
  );
};
