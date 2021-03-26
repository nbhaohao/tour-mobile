import React from 'react';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { Hot } from './components/Hot';
import './index.less';
import { useHttpHook } from '@/hooks/useHttpHook';
import { Cities } from '@/types/city';
import { Houses } from '@/types/house';

const Home: React.FC = () => {
  const [cities, citiesLoading] = useHttpHook<Cities>({
    url: '/commons/cities',
    defaultValue: [],
    method: 'get',
  });
  const [houses] = useHttpHook<Houses>({
    url: '/houses/hot',
    defaultValue: [],
  });
  return (
    <div className="home">
      <Header />
      <Search cities={cities || []} citiesLoading={citiesLoading} />
      <Hot houses={houses || []} />
    </div>
  );
};

export default Home;
