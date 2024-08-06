import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';

type Props = {
  hasInitialData: boolean
}

export const FileUpload = ({ hasInitialData }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    maxCount: 1,
    onRemove: (file) => {
      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList
  };
  return (
    <Form.Item
      name="magazineFile"
      label="Magazine file"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[{ required: !hasInitialData }]}
    >
      <Upload {...props} name="magazine-file" listType="text">
        <Button icon={<UploadOutlined />}>Upload magazine file</Button>
      </Upload>
    </Form.Item>
  );
};

function normFile(e: { fileList: UploadFile[] }) {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
}
