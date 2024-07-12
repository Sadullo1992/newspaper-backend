import type { FormInstance } from 'antd';
import { Button, Form, FormProps, Input, message, Space } from 'antd';
import React, { useEffect } from 'react';

import slugify from 'slugify';
import { createCategory } from '../api/fetchCategories';
import { ICategory } from '../types/types';

interface FormCategoryProps {
  initialData?: ICategory;
}

interface SubmitButtonProps {
  form: FormInstance;
}

type FieldType = {
  name: string;
  slug: string;
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
    form.isFieldTouched('slug') || form.setFieldValue('slug', slugify(nameValue, { lower: true }));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export const FormCategory = ({ initialData }: FormCategoryProps) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    initialData && form.setFieldValue('name', initialData.name);
  }, [form, initialData]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const response = await createCategory(values);
    const data = await response.json();
    if(response.ok) {
      messageApi.open({
        type: 'success',
        content: 'Category created, successfully!',
      });
      form.resetFields();
    } else {
      const errorMesage = !data.error ? data.message : data.error;
      messageApi.open({
        type: 'error',
        content: `Error occured: ${errorMesage}`,
      });
    }
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
};
