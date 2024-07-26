import { GetProp, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { useMagazinesQuery } from '../../queries/magazines';
import { DataTypesEnum } from '../../types/types';
import { PageHeader } from '../components/PageHeader';
import { columns, MagazineTableDataType } from './data/columns';

type TablePagination = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

export const MagazinesPage = () => {
  const [magazines, setMagazines] = useState<MagazineTableDataType[]>([]);

  const [pagination, setPagination] = useState<TablePagination>({
    current: 1,
    pageSize: 10,
  });

  const { data, isLoading } = useMagazinesQuery({
    page: pagination.current,
    perPage: pagination.pageSize,
  });

  useEffect(() => {
    if (data?.data) {
      const magazines = data?.data.map(({ filename, ...rest }) => ({ ...rest }));
      setPagination({
        ...pagination,
        total: data.meta.total,
      });
      setMagazines(magazines);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data]);

  const handleTableChange: TableProps['onChange'] = (pagination) => {
    setPagination(pagination);
  };
  return (
    <>
      <PageHeader title="All Magazines" type={DataTypesEnum.MAGAZINE} />
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={magazines}
        pagination={pagination}
        size="middle"
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};
