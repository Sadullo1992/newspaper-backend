import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { LoginDto } from '../types/types';
import { useAuth } from '../auth/AuthProvider';

export const AuthForm: React.FC = () => {
  const { login } = useAuth();
  const onFinish: FormProps['onFinish'] = (values: LoginDto) => {
  login(values)
};

  return (
    <Form
      name="auth-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Login"
        name="login"
        rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
