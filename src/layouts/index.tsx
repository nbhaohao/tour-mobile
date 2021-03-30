import React, { useMemo } from 'react';
import { useLocation } from 'umi';
import { MenuBar } from '@/components';
import { StoreProvider } from 'think-react-store';
import * as store from '@/stores';

const Index: React.FC = ({ children }) => {
  const location = useLocation();
  const needBarPaths = useMemo(() => ['/', '/order', '/user'], []);
  const pathname = location.hash.slice(1);
  const isShow = needBarPaths.includes(pathname);
  return (
    <StoreProvider store={store}>
      {children}
      <MenuBar pathname={pathname} show={isShow} />
    </StoreProvider>
  );
};

export default Index;
