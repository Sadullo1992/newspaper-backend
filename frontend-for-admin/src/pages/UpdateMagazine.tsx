import { useEffect, useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { IMagazine } from '../types/types';
import { fetchMagazineById } from '../api/fetchMagazines';
import { FormMagazine } from '../components/FormMagazine';

export const UpdateMagazine = () => {
  const { id } = useParams();
  const [magazine, setMagazine] = useState<IMagazine>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    id &&
      fetchMagazineById(id).then((data) => {
        setLoading(false);
        setMagazine(data);
      });
  }, [id]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2>Update Gazeta nashri</h2>
        <Link to={'/magazine'}>
          <Button icon={<LeftOutlined />}>Orqaga qaytish</Button>
        </Link>
      </div>
      {loading && <Spin />}
      {magazine && <FormMagazine initialData={magazine} />}
    </>
  );
};
