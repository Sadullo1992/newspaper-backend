import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to={'/admin'}>
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
