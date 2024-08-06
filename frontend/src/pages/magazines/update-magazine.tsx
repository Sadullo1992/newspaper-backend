import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FormMagazine } from '../../components/FormMagazine';
import {
  MagazineDto,
  useGetMagazine,
  useInvalidateMagazine,
  useInvalidateMagazines,
  useUpdateMagazine,
} from '../../queries/magazines';
import { DataTypesEnum } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const UpdateMagazinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: magazine, isLoading } = useGetMagazine(id);
  const { mutateAsync: updateMagazine } = useUpdateMagazine();
  const invalidateMagazines = useInvalidateMagazines();
  const invalidateMagazine = useInvalidateMagazine();

  const onSubmit = async (values: MagazineDto) => {
    await updateMagazine(
      { id, ...values },
      {
        onSuccess: () => {
          messageApi.open({
            type: 'success',
            content: 'Magazine updated, successfully!',
          });
          invalidateMagazines();
          invalidateMagazine(id);
          navigate('/admin/magazine');
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
      <SinglePageHeader title="Update Magazine" type={DataTypesEnum.MAGAZINE} />
      {isLoading && <Spin />}
      {magazine && <FormMagazine initialData={magazine} onSubmit={onSubmit} />}
    </>
  );
};
