import { Button, Form, FormProps, Input, Select, Space, Switch } from 'antd';
import { useEffect } from 'react';
import { useCategoriesQuery } from '../../queries/categories';
import { useRemoveImageFile } from '../../queries/posts';
import { Image, Post } from '../../types/types';
import { PostEditor } from '../PostEditor';
import { ImageUpload } from './ImageUpload';
import { SubmitButton } from './SubmitButton';

interface FormPostProps {
  initialData?: Post;
  onSubmit: (values: Omit<Post, 'id'>) => void;
  isReset?: boolean;
}

export const FormPost = ({ initialData, onSubmit, isReset }: FormPostProps) => {
  const [form] = Form.useForm();

  const { data: categories } = useCategoriesQuery();  
  const { mutateAsync: removeImageFile } = useRemoveImageFile();

  useEffect(() => {
    isReset && form.resetFields();
  }, [isReset, form]);

  useEffect(() => {
    initialData &&
      form.setFieldsValue({
        title: initialData.title,
        content: initialData.content,
        isActual: initialData.isActual,
        isFeatured: initialData.isFeatured,
        categoryId: initialData.categoryId,
        images: initialData.images
      });
  }, [form, initialData]);

  const handleOnChange = (value: string) => {
    form.setFieldValue('content', value);
  };

  const onFinish: FormProps['onFinish'] = async (values) => {
    const post = getImageFromFileObject(values);
    onSubmit(post);
  };

  const handleRemoveImage = async (file: any) => {
    const id = file.response.id;
    if (!!id) {
      await removeImageFile(id);
    }
  };

  const handleReset = () => {
    const images = form.getFieldValue('images');
    if (images.length > 0) {
      Promise.all(images.map(handleRemoveImage));
    }
    form.resetFields();
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      name="validateOnly"
      layout="horizontal"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Content" name="content" rules={[{ required: true }]}>
        <PostEditor value={initialData?.content} onChange={handleOnChange} />
      </Form.Item>
      <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
        <Select>
          {categories &&
            categories.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Actual post" name="isActual" initialValue={false} valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        label="Featured post"
        name="isFeatured"
        initialValue={false}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Author" initialValue={null}>
        <Input />
      </Form.Item>
      {initialData && (
        <>
          <Form.Item label="View Counts">
            <span>{initialData.views}</span>
          </Form.Item>
          <Form.Item label="Created at">
            <span>{initialData.createdAt}</span>
          </Form.Item>
          <Form.Item label="Updated at">
            <span>{initialData.updatedAt}</span>
          </Form.Item>
        </>
      )}
      <ImageUpload />
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImageFromFileObject(values: any) {
  const fileImages = values.images.filter((file: { status: string }) => file.status === 'done');
  const images = fileImages.map((file: { response: Image }) => file.response);
  return {
    ...values,
    images,
  };
}
