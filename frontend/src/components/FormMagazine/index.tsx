import { Button, DatePicker, DatePickerProps, Form, FormProps, Input, Space } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { MagazineDto } from '../../queries/magazines';
import { Magazine } from '../../types/types';
import { FileUpload } from './FileUpload';
import { SubmitButton } from './SubmitButton';

export type MagazineFieldType = {
  name: string;
  createdAt: Dayjs;
  magazineFile: UploadFile[];
};

interface Props {
  initialData?: Magazine;
  onSubmit: (values: MagazineDto) => Promise<void>;
  isReset?: boolean;
  setIsReset?: Dispatch<SetStateAction<boolean>>;
}

export const FormMagazine = ({ initialData, onSubmit, isReset, setIsReset }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isReset && form.resetFields();
    setIsReset && setIsReset(false);
  }, [isReset, setIsReset, form]);

  useEffect(() => {
    initialData &&
      form.setFieldsValue({
        name: initialData.name,
        createdAt: dayjs(initialData?.createdAt)
      });
  }, [form, initialData]);

  const handleOnChange: DatePickerProps<Dayjs>['onChange'] = (date) => {
    form.setFieldValue('createdAt', date);
  };

  const onFinish: FormProps<MagazineFieldType>['onFinish']= (values: MagazineFieldType) => {
    const magazineDto = {
      name: values.name,
      createdAt: values.createdAt.toDate().getTime().toString(),
      magazineFile: values.magazineFile[0].originFileObj as RcFile
    }

    onSubmit(magazineDto)
  };

  return (
    <Form<MagazineFieldType>
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      name="validateOnly"
      layout="horizontal"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {initialData && (
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <a href={initialData?.filename} target="_blank" rel="noreferrer">
            {initialData?.name}
          </a>
        </Form.Item>
      )}
      <FileUpload />
      <Form.Item label="Created At" name="createdAt" rules={[{ required: true }]}>
        <DatePicker
          onChange={handleOnChange}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          needConfirm={false}
        />
      </Form.Item>
      {initialData && (
        <>
          <Form.Item label="File size">
            <span>{initialData?.size}</span>
          </Form.Item>
          <Form.Item label="Downloads Count">
            <span>{initialData?.downloadsCount}</span>
          </Form.Item>
        </>
      )}
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
