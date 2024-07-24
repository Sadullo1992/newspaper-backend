import { Button, Form, FormProps, Input, Select, Space, Switch, UploadFile } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCategoriesQuery } from '../../queries/categories';
import { useRemoveImageFile } from '../../queries/posts';
import { Image, Post } from '../../types/types';
import { PostEditor } from '../PostEditor';
import { ImageUpload } from './ImageUpload';
import { SubmitButton } from './SubmitButton';

interface FormPostProps {
  initialData?: Post;
  onSubmit: (values: Omit<Post, 'id'>) => Promise<void>;
  isReset?: boolean;
  setIsReset?: Dispatch<SetStateAction<boolean>>;
}

export const FormPost = ({ initialData, onSubmit, isReset, setIsReset }: FormPostProps) => {
  const [form] = Form.useForm();

  const { data: categories } = useCategoriesQuery();
  const { mutateAsync: removeImageFile } = useRemoveImageFile();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    isReset && form.resetFields();
    setIsReset && setIsReset(false);
  }, [isReset, setIsReset, form]);

  useEffect(() => {
    if (initialData) {
      const files = generateFileList(initialData.images);
      setFileList(files);

      form.setFieldsValue({
        title: initialData.title,
        content: initialData.content,
        isActual: initialData.isActual,
        isFeatured: initialData.isFeatured,
        categoryId: initialData.categoryId,
        images: files,
      });
    }
  }, [form, initialData]);

  const handleOnChange = (value: string) => {
    form.setFieldValue('content', value);
  };

  const onFinish: FormProps['onFinish'] = async (values) => {
    const post = getImageFromFileObject(values);
    await onSubmit(post);
  };

  const handleRemoveImage = async (file: UploadFile<Image>) => {
    const id = file.response?.id;
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
      <ImageUpload fileList={fileList} />
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

function getImageFromFileObject(values: { images: UploadFile<Image>[] }) {
  const fileImages = values.images.filter((file: UploadFile) => file.status === 'done');
  const imageFiles = fileImages.map((file: UploadFile<Image>) => file.response as Image);
  return {
    ...values,
    images: imageFiles,
  } as Post;
}

function generateFileList(images: Image[]): UploadFile[] {
  const fileList = images.map(({ id, imagename }) => {
    return {
      uid: id,
      name: imagename,
      status: 'done',
      url: `/api/media/images/${imagename}`,
      response: {
        id,
        imagename,
      },
    } as UploadFile;
  });

  return fileList;
}
