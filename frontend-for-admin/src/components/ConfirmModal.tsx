import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { CategoryDataType } from '../pages/categories';

interface SubmitButtonProps {
  data: Omit<CategoryDataType, 'slug'>;
  type: 'kategoriya' | 'maqola';
}

export const ConfirmModal: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  data,
  type,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
