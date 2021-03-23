import React, { useEffect } from 'react';
import { Link } from 'umi';
import { cookie } from 'project-libs';

const Header: React.FC = React.memo(() => {
  useEffect(() => {});
  const userFromCookie: any = cookie.get('user');
  return (
    <div className="header">
      <div className="header_title">民宿</div>
      <div className="header_login">
        {userFromCookie ? (
          userFromCookie.username
        ) : (
          <>
            <Link to="/login">登录</Link>
            <Link to="/register">注册</Link>
          </>
        )}
      </div>
    </div>
  );
});

export { Header };
