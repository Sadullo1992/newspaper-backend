import { useEffect, useState } from 'react';
import { Form, Button, FormInstance } from 'antd';
import slugify from 'slugify';

type Props = React.PropsWithChildren<{
  form: FormInstance;
}>;

export const SubmitButton = ({ form, children }: Props) => {
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState<boolean>(false);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));

    const title = form.getFieldValue('title') || '';
    form.isFieldTouched('slug') || form.setFieldValue('slug', slugify(title));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};
