import { message } from 'antd';
import { useState } from 'react';
import { FormPost } from '../../components/FormPost';
import { useAddPost, useInvalidatePosts } from '../../queries/posts';
import { DataTypesEnum, Post } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const AddPostPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: addPost } = useAddPost();
  const invalidatePosts = useInvalidatePosts();

  const [isReset, setIsReset] = useState<boolean>(false);

  const onSubmit = async (values: Omit<Post, 'id'>) => {
    await addPost(values, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'Post created, successfully!',
        });
        setIsReset(true);
        invalidatePosts();
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
      <SinglePageHeader title="Add Post" type={DataTypesEnum.POST} />
      <FormPost onSubmit={onSubmit} isReset={isReset} setIsReset={setIsReset} />
    </>
  );
};
