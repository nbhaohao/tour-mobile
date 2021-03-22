import React from 'react';
import './index.less';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm, FormComponentProps } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

interface LoginProps {}

const index: React.FC<LoginProps & FormComponentProps> = ({ form }) => {
  const {
    user: { registerAsync },
  } = useStoreHook();
  const { getFieldProps, validateFields } = form;
  const handleSubmit = () => {
    validateFields((error, values: any) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      }
      if (values.password !== values.password2) {
        Toast.fail('密码和确认密码必须一致');
        return;
      }
      registerAsync(values);
    });
  };
  const handleClick = () => {
    history.push('/login');
  };
  return (
    <div className="register-page">
      <List renderHeader={() => '用户登录'}>
        <List.Item>
          <InputItem
            placeholder="用户名"
            {...getFieldProps('username', {
              rules: [{ required: true }],
            })}
          >
            用户名：
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            placeholder="密码"
            {...getFieldProps('password', {
              rules: [{ required: true }],
            })}
          >
            密码：
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            placeholder="确认密码"
            {...getFieldProps('password2', {
              rules: [{ required: true }],
            })}
          >
            确认密码：
          </InputItem>
        </List.Item>
      </List>
      <Button type="warning" onClick={handleSubmit}>
        注册
      </Button>
      <div className="login" onClick={handleClick}>
        已有账户，去登录
      </div>
    </div>
  );
};

export default createForm()(index);
