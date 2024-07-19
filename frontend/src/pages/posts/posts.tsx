import { PlusOutlined } from '@ant-design/icons';
import { Button, GetProp, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostsQuery } from '../../queries/posts';
import { columns, PostDataType } from './data/columns';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
}

export const PostsPage = () => {
  const [posts, setPosts] = useState<PostDataType[]>([]);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });

  const { data, isLoading } = usePostsQuery({
    page: tableParams.pagination?.current,
    perPage: tableParams.pagination?.pageSize,
  });
  console.log(data);

  useEffect(() => {
    if (data?.data) {
      const posts = data?.data.map(
        ({ id, title, slug, category, createdAt, isFeatured, isActual, views }) => ({
          id,
          title,
          slug,
          category: category.name,
          createdAt,
          isFeatured,
          isActual,
          views,
        })
      );
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: data.meta.total,
        },
      });
      setPosts(posts);
    }
    
  }, [data?.data]);

  const handleTableChange: TableProps['onChange'] = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Maqolalar</h2>
        <Link to={'/admin/post/add'}>
          <Button type="primary" icon={<PlusOutlined />}>
            Maqola qo&#39;shish
          </Button>
        </Link>
      </div>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={posts}
        size="small"
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};
