import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { cookie } from 'project-libs';

const Header: React.FC = React.memo(() => {
  const [username] = useState(localStorage.getItem('username'));
  useEffect(() => {});
  return (
    <div className="header">
      <div className="header_title">民宿</div>
      <div className="header_login">
        {username || (
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
