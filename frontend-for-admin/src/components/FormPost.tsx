import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, FormProps, Input, Space, Select, Switch, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import slugify from 'slugify';
import { ICategory, IPost } from '../types/types';
import { fetchCategories } from '../api/fetchCategories';
import { PostEditor } from './PostEditor';

interface FormPostProps {
  initialData?: IPost;
}

interface SubmitButtonProps {
  form: FormInstance;
}

type FieldType = {
  name?: string;
  slug?: string;
};

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
    const title = form.getFieldValue('title') || '';
    form.isFieldTouched('slug') || form.setFieldValue('slug', slugify(title));
  }, [form, values]);

  const handleOnClick = () => console.log(values);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={handleOnClick}>
      {children}
    </Button>
  );
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const FormPost = ({ initialData }: FormPostProps) => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    initialData &&
      form.setFieldsValue({
        title: initialData.title,
        content: initialData.content,
        dolzarb: initialData.dolzarb,
        is_featured: initialData.is_featured,
        category: initialData?.category.slug,
      });
  }, [form, initialData]);

  const handleOnChange = (value: string) => {
    form.setFieldValue('content', value);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
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
      <Form.Item name="title" label="Sarlavha" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Maqola" name="content" rules={[{ required: true }]}>
        <PostEditor value={initialData?.content} onChange={handleOnChange} />
      </Form.Item>
      <Form.Item label="Kategoriya" name="category" rules={[{ required: true }]}>
        <Select>
          {categories.map((item) => (
            <Select.Option key={item.id} value={item.slug}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Dolzarb" name="dolzarb" initialValue={false} valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        label="Maxsus post"
        name="is_featured"
        initialValue={false}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Muallif">
        <Input />
      </Form.Item>
      <Form.Item label="Korishlar soni">
        <span>{initialData?.views}</span>
      </Form.Item>
      <Form.Item label="Created at">
        <span>{initialData?.created_at || '-'}</span>
      </Form.Item>
      <Form.Item label="Updated at">
        <span>{initialData?.updated_at || '-'}</span>
      </Form.Item>
      <Form.Item
        name="postimage_set"
        label="Rasm"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="Rasm" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
