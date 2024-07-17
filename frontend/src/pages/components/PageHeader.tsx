import { PlusOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DataTypesUnion } from '../../types/types';

type PageHeaderProps = {
  title: string;
  type: DataTypesUnion;
};

export const PageHeader = ({ title, type }: PageHeaderProps) => {
  return (
    <Flex justify={'space-between'}>
      <Typography.Title level={2}>{title}</Typography.Title>
      <Link to={`/admin/${type}/add`}>
        <Button type="primary" icon={<PlusOutlined />}>
          Add {type}
        </Button>
      </Link>
    </Flex>
  );
};

export const SinglePageHeader = ({ title, type }: PageHeaderProps) => {
  return (
    <Flex justify={'space-between'}>
      <Typography.Title level={2}>{title}</Typography.Title>
      <Link to={`/admin/${type}`}>
        <Button icon={<LeftOutlined />}>Go back!</Button>
      </Link>
    </Flex>
  );
};
