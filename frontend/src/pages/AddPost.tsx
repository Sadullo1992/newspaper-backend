import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormPost } from '../components/FormPost';

export const AddPost = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Add Maqola</h2>
        <Link to={'/admin/post'}>
          <Button icon={<LeftOutlined />}>Orqaga qaytish</Button>
        </Link>
      </div>
      <FormPost />
    </>
  );
};
