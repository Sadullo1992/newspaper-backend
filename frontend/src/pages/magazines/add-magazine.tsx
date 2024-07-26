import { message } from 'antd';
import { useState } from 'react';
import { FormMagazine } from '../../components/FormMagazine';
import { MagazineDto, useAddMagazine, useInvalidateMagazines } from '../../queries/magazines';
import { DataTypesEnum } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const AddMagazinePage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: addMagazine } = useAddMagazine();
  const invalidateMagazines = useInvalidateMagazines();

  const [isReset, setIsReset] = useState<boolean>(false);

  const onSubmit = async (values: MagazineDto) => {
    await addMagazine(values, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'Magazine created, successfully!',
        });
        setIsReset(true);
        invalidateMagazines();
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
      <SinglePageHeader title="Add Magazine" type={DataTypesEnum.MAGAZINE} />
      <FormMagazine onSubmit={onSubmit} isReset={isReset} setIsReset={setIsReset} />
    </>
  );
};
