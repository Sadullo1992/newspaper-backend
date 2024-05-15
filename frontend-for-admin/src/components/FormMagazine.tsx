import React, { useEffect } from 'react';
import { DatePicker, FormInstance } from 'antd';
import { Button, Form, FormProps, Input, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IMagazine } from '../types/types';

interface FormPostProps {
  initialData?: IMagazine;
}

interface SubmitButtonProps {
  form: FormInstance;
}

type FieldType = {
  name?: string;
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
  }, [form, values]);

  const handleOnClick = () => console.log(values);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={handleOnClick}>
      {children}
    </Button>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const FormMagazine = ({ initialData }: FormPostProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    initialData &&
      form.setFieldsValue({
        name: initialData.name,
      });
  }, [form, initialData]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const handleOnChange = (value: string) => {
    form.setFieldValue('created_at', value);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      name="validateOnly"
      layout="horizontal"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item name="title" label="Nashr Nomi" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="magzine_file"
        label="Fayl"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="magzine_file" action="/upload.do" listType="text">
          <Button icon={<UploadOutlined />}>Gazeta faylini yuklash</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Yaratilgan vaqti">
        <DatePicker
          onChange={handleOnChange}
          value={initialData?.created_at}
          showTime
          needConfirm={false}
        />
      </Form.Item>
      <Form.Item label="Hajmi">
        <span>{initialData?.hajmi}</span>
      </Form.Item>
      <Form.Item label="Yuklanishlar soni">
        <span>{initialData?.downloads_count}</span>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
