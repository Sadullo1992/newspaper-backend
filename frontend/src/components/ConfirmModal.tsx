import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Flex, message, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import {
  useInvalidateCategories,
  useRemoveCategory,
  useRemoveCategoryCache,
} from '../queries/categories';
import { useInvalidateMagazines, useRemoveMagazine, useRemoveMagazineCache } from '../queries/magazines';
import { useInvalidatePosts, useRemovePost, useRemovePostCache } from '../queries/posts';
import { DataTypesEnum, DataTypesUnion } from '../types/types';

type Props = React.PropsWithChildren<{
  data: { id: string; name: string };
  type: DataTypesUnion;
}>;
export const ConfirmModal = ({ data, type, children }: Props) => {
  const { id, name } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: removeCategory } = useRemoveCategory();
  const removeCategoryCache = useRemoveCategoryCache();
  const invalidateCategories = useInvalidateCategories();

  const { mutateAsync: removePost } = useRemovePost();
  const removePostCache = useRemovePostCache();
  const invalidatePosts = useInvalidatePosts();

  const { mutateAsync: removeMagazine } = useRemoveMagazine();
  const removeMagazineCache = useRemoveMagazineCache();
  const invalidateMagazines = useInvalidateMagazines();

  const sendMessage = (type: string, ok: boolean) => {
    if (ok) {
      messageApi.open({
        type: 'success',
        content: `${type.toUpperCase()} deleted, successfully!`,
      });
    } else {
      messageApi.open({
        type: 'error',
        content: `Error occurred!`,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    switch (type) {
      case DataTypesEnum.CATEGORY:
        {
          await removeCategory(id, {
            onSuccess: () => {
              sendMessage(type, true);
              removeCategoryCache(id);
              invalidateCategories();
            },
            onError: () => {
              sendMessage(type, false);
            },
          });
        }
        break;
      case DataTypesEnum.POST:
        {
          await removePost(id, {
            onSuccess: () => {
              sendMessage(type, true);
              removePostCache(id);
              invalidatePosts();
            },
            onError: () => {
              sendMessage(type, false);
            },
          });
        }
        break;
      case DataTypesEnum.MAGAZINE:
        {
          await removeMagazine(id, {
            onSuccess: () => {
              sendMessage(type, true);
              removeMagazineCache(id);
              invalidateMagazines();
            },
            onError: () => {
              sendMessage(type, false);
            },
          });
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
          <Flex gap={10} align={'center'}>
            <ExclamationCircleFilled style={{ color: '#faad14' }} />
            <Typography.Title level={5} style={{ marginBottom: 0 }}>
              Are you sure to delete?
            </Typography.Title>
          </Flex>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button danger key="submit" type="primary" onClick={handleOk}>
            Delete
          </Button>,
        ]}
      >
        <Typography.Title level={5} style={{ paddingLeft: 20 }}>
          {type.toLocaleUpperCase()}:{' '}
          <Typography.Text style={{ color: '#1890ff' }}>{name}</Typography.Text>
        </Typography.Title>
        <div style={{ marginLeft: 20 }}></div>
      </Modal>
    </>
  );
};
