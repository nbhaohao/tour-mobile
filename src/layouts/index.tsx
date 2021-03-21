import React, { useMemo } from 'react';
import { useLocation } from 'umi';
import { MenuBar } from '@/components';

const Index: React.FC = ({ children }) => {
  const location = useLocation();
  const needBarPaths = useMemo(() => ['/', '/order', '/user'], []);
  const pathname = location.pathname;
  const isShow = needBarPaths.includes(pathname);
  return (
    <div>
      {children}
      <MenuBar pathname={pathname} show={isShow} />
    </div>
  );
};

export default Index;
