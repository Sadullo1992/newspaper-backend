import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormMagazine } from '../components/FormMagazine';

export const AddMagazine = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Add Gazeta Nashri</h2>
        <Link to={'/magazine'}>
          <Button icon={<LeftOutlined />}>Orqaga qaytish</Button>
        </Link>
      </div>
      <FormMagazine />
    </>
  );
};
