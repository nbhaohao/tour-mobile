import React from 'react';
import './index.less';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm, FormComponentProps } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

interface LoginProps {}

const index: React.FC<LoginProps & FormComponentProps> = ({ form }) => {
  const {
    user: { loginAsync },
  } = useStoreHook();
  const { getFieldProps, validateFields } = form;
  const handleSubmit = () => {
    validateFields((error, values) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      }
      loginAsync(values);
    });
  };
  const handleClick = () => {
    history.push('/register');
  };
  return (
    <div className="login-page">
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
      </List>
      <Button type="warning" onClick={handleSubmit}>
        登录
      </Button>
      <div className="register" onClick={handleClick}>
        没有账户，去注册
      </div>
    </div>
  );
};

export default createForm()(index);
