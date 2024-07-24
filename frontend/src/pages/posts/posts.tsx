import { GetProp, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { usePostsQuery } from '../../queries/posts';
import { DataTypesEnum, Post } from '../../types/types';
import { dateFormatter } from '../../utils/dateFormatter';
import { PageHeader } from '../components/PageHeader';
import { columns, PostTableDataType } from './data/columns';

type TablePagination = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

export const PostsPage = () => {
  const [posts, setPosts] = useState<PostTableDataType[]>([]);

  const [pagination, setPagination] = useState<TablePagination>({
    current: 1,
    pageSize: 10,
  });

  const { data, isLoading } = usePostsQuery({
    page: pagination.current,
    perPage: pagination.pageSize,
  });

  useEffect(() => {
    if (data?.data) {
      const posts = data?.data.map(transformToDataSource);
      setPagination({
        ...pagination,
        total: data.meta.total,
      });
      setPosts(posts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data]);

  const handleTableChange: TableProps['onChange'] = (pagination) => {
    setPagination(pagination);
  };

  return (
    <>
      <PageHeader title="All posts" type={DataTypesEnum.POST} />
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={posts}
        size="small"
        pagination={pagination}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};

function transformToDataSource(post: Post) {
  const { id, title, slug, category, createdAt, isFeatured, isActual, views } = post;

  const date = dateFormatter(createdAt);

  return {
    id,
    title,
    slug,
    category: category.name,
    createdAt: date,
    isFeatured,
    isActual,
    views,
  };
}
