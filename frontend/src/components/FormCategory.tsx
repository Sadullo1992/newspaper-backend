import React, { useEffect } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, FormProps, Input, Space } from 'antd';

import slugify from 'slugify';
import { ICategory } from '../types/types';

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

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

export const FormCategory = ({ initialData }: FormCategoryProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    initialData && form.setFieldValue('name', initialData.name);
  }, [form, initialData]);
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
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
