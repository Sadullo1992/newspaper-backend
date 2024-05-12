import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, FormProps, Input, Space, Select, Switch, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import slugify from 'slugify';
import { ICategory } from '../types/types';
import { fetchCategories } from '../api/fetchCategories';

interface FormCategoryProps {
  initialData?: ICategory;
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
    const nameValue = form.getFieldValue('name') || '';
    form.isFieldTouched('slug') || form.setFieldValue('slug', slugify(nameValue));
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

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

export const FormPost = ({ initialData }: FormCategoryProps) => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    initialData && form.setFieldValue('name', initialData.name);
  }, [form, initialData]);
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);
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
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Maqola" name="content" rules={[{ required: true }]}>
        <Input.TextArea />
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
        <span>0</span>
      </Form.Item>
      <Form.Item label="Created at">
        <span>-</span>
      </Form.Item>
      <Form.Item label="Updated at">
        <span>-</span>
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
