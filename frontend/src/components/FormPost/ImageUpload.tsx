import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload, UploadFile } from 'antd';
import { useRemoveImageFile } from '../../queries/posts';

type ImageUploadProps = {
  fileList: UploadFile[]
}

export const ImageUpload = ({ fileList }: ImageUploadProps) => {
  const { mutateAsync: removeImageFile } = useRemoveImageFile();

  const handleRemoveImage = async (file: any) => {
    const id = file.response.id;
    if (!!id) {
      await removeImageFile(id);
    }
  };

  return (
    <Form.Item
      name="images"
      label="Photos"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[
        {
          required: true,
        },
        {
          transform: (images) =>
            images.filter((file: { status: string }) => file.status === 'done'),
          message: 'File is invalid!',
        },
      ]}
    >
      <Upload
        name="image"
        action="/api/upload/image"
        listType="picture"
        fileList={fileList}
        onRemove={handleRemoveImage}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
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
