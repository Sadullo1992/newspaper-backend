import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FormPost } from '../../components/FormPost';
import {
  useGetPost,
  useInvalidatePost,
  useInvalidatePosts,
  useUpdatePost,
} from '../../queries/posts';
import { DataTypesEnum, Post } from '../../types/types';
import { SinglePageHeader } from '../components/PageHeader';

export const UpdatePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: post, isLoading } = useGetPost(id);
  const { mutateAsync: updatePost } = useUpdatePost();
  const invalidatePosts = useInvalidatePosts();
  const invalidatePost = useInvalidatePost();

  const onSubmit = async (values: Omit<Post, 'id'>) => {
    await updatePost(
      { id, ...values },
      {
        onSuccess: () => {
          messageApi.open({
            type: 'success',
            content: 'Post updated, successfully!',
          });
          invalidatePosts();
          invalidatePost(id);
          navigate('/admin/post');
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
      <SinglePageHeader title="Update Post" type={DataTypesEnum.POST} />
      {isLoading && <Spin />}
      {post && <FormPost initialData={post} onSubmit={onSubmit} />}
    </>
  );
};
