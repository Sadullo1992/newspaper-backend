import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeCategory } from '../api/fetchCategories';

interface SubmitButtonProps {
  data: { key: string; name: string };
  type: 'category' | 'post' | 'magazine';
}

export const ConfirmModal: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  data,
  type,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const sendMessage = (type: string, ok: boolean) => {
    if (ok) {
      messageApi.open({
        type: 'success',
        content: `${type.toUpperCase()} created, successfully!`,
      });

      navigate(0);
    } else {
      messageApi.open({
        type: 'error',
        content: `Error occured!`,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    switch (type) {
      case 'category':
        {
          const response = await removeCategory(data.key);
          sendMessage(type, response.ok);
        }
        break;
      default:
        console.log(`Wrong type: ${type}`);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button type="text" onClick={showModal}>
        {children}
      </Button>
      <Modal
        title={
          <Space>
            <ExclamationCircleFilled style={{ color: '#faad14' }} />
            <h4>O&#39;chirishga rozimisiz?</h4>
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Bekor qilish
          </Button>,
          <Button danger key="submit" type="primary" onClick={handleOk}>
            O&#39;chirish
          </Button>,
        ]}
      >
        <div style={{ marginLeft: 20 }}>
          <h4>
            {type.toUpperCase()}: <span style={{ color: '#1890ff' }}>{data.name}</span>
          </h4>
        </div>
      </Modal>
    </>
  );
};
