import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormCategory } from '../components/FormCategory';

export const AddCategory = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Add Kategoriya</h2>
        <Link to={'/admin/category'}>
          <Button icon={<LeftOutlined />}>Orqaga qaytish</Button>
        </Link>
      </div>
      <FormCategory />
    </>
  );
};
