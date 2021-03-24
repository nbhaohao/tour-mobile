import React, { useEffect } from 'react';
import { List, Button } from 'antd-mobile';
import './index.less';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

const Index: React.FC = () => {
  const {
    user: { getUserAsync, logoutAsync, username, avatar, tel, sign },
  } = useStoreHook();
  const handleClick = () => {
    history.push({
      pathname: '/user/edit',
      query: {
        id: '10',
      },
    });
  };
  const handleLogout = () => {
    logoutAsync();
  };
  useEffect(() => {
    getUserAsync({
      id: 10,
    });
  }, []);
  return (
    <div className="user-page">
      <div className="info">
        <div className="set" onClick={handleClick}>
          设置
        </div>
        <div className="user">
          <img
            alt="user"
            src={
              avatar || 'https://www.dute.org/imgplaceholder/80x80?fontsize=12'
            }
          />
          <div className="tel">{tel}</div>
          <div className="sign">{sign}</div>
        </div>
      </div>
      <div className="lists">
        <List>
          <List.Item arrow="horizontal">用户协议</List.Item>
          <List.Item arrow="horizontal">常见问题</List.Item>
          <List.Item arrow="horizontal">联系客服</List.Item>
        </List>
      </div>
      <Button style={{ marginTop: '100px' }} onClick={handleLogout}>
        退出登录
      </Button>
    </div>
  );
};

export default Index;
