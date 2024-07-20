import { FormPost } from '../../components/FormPost';
import { DataTypesEnum } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const AddPostPage = () => {
  return (
    <>
      <SinglePageHeader title="Add Post" type={DataTypesEnum.POST} />
      <FormPost />
    </>
  );
};
