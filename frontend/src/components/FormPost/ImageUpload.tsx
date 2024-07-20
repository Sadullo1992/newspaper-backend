import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload } from 'antd';
import { useRemoveImageFile } from '../../queries/posts';

export const ImageUpload = (props: { [key: string]: any }) => {
  const { mutateAsync: removeImageFile } = useRemoveImageFile();

  const handleRemoveImage = async (file: any) => {
    const id = file.response.id;
    if (!!id) {
      await removeImageFile(id);
    }
  };

  return (
    <Form.Item
      {...props}
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
        onRemove={handleRemoveImage}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normFile(e: any) {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
}
