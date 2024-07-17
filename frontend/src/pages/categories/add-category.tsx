import { FormCategory } from '../../components/FormCategory';
import { DataTypesEnum } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const AddCategoryPage = () => {
  return (
    <>
      <SinglePageHeader title="Add Category" type={DataTypesEnum.CATEGORY} />
      <FormCategory />
    </>
  );
};
