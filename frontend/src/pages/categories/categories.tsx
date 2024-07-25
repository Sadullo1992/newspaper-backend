import { Table } from 'antd';
import { useCategoriesQuery } from '../../queries/categories';
import { DataTypesEnum } from '../../types/types';
import { PageHeader } from '../components/PageHeader';
import { columns } from './data/columns';

export const CategoriesPage = () => {
  const { data, isFetching } = useCategoriesQuery();

  return (
    <>
      <PageHeader title="All categories" type={DataTypesEnum.CATEGORY} />
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isFetching}
      />
    </>
  );
};
