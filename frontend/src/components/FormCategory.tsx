import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import React, { useEffect } from 'react';

import slugify from 'slugify';
import { Category } from '../types/types';

interface FormCategoryProps {
  updateCategoryData?: Category;
  onSubmit: (values: Omit<Category, 'id'>) => void;
  isReset?: boolean;
}

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));

    const nameValue = form.getFieldValue('name') || '';

    form.isFieldTouched('slug') || form.setFieldValue('slug', slugify(nameValue, { lower: true }));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export const FormCategory = ({ updateCategoryData, onSubmit, isReset }: FormCategoryProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isReset && form.resetFields();
  }, [isReset]);

  useEffect(() => {
    updateCategoryData &&
      form.setFieldsValue({ name: updateCategoryData.name, slug: updateCategoryData.slug });
  }, [form, updateCategoryData]);

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      onFinish={onSubmit}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
