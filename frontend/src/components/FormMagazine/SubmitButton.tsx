import { Button, Form, FormInstance } from "antd";
import React from "react";


type Props = React.PropsWithChildren<{
  form: FormInstance;
}>;

export const SubmitButton = ({ form, children }: Props) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};
