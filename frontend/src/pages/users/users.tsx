import { Table } from 'antd';
import { useUsersQuery } from '../../queries/user';
import { DataTypesEnum, User } from '../../types/types';
import { PageHeader } from '../components/PageHeader';
import { columns } from './data/columns';

export const UsersPage = () => {
  const { data, isFetching } = useUsersQuery();

  return (
    <>
      <PageHeader title="All Users" type={DataTypesEnum.USER} />
      <Table<User>
        rowKey={'id'}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isFetching}
      />
    </>
  );
};
