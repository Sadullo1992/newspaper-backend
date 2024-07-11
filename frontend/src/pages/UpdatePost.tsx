import { useEffect, useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { IPost } from '../types/types';
import { fetchPostById } from '../api/fetchPosts';
import { FormPost } from '../components/FormPost';

export const UpdatePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    id &&
      fetchPostById(id).then((data) => {
        setLoading(false);
        setPost(data);
      });
  }, [id]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Update Maqola</h2>
        <Link to={'/admin/post'}>
          <Button icon={<LeftOutlined />}>Orqaga qaytish</Button>
        </Link>
      </div>
      {loading && <Spin />}
      {post && <FormPost initialData={post} />}
    </>
  );
};
