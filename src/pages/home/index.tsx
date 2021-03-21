import React from 'react';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { Hot } from './components/Hot';
import './index.less';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <Search />
      <Hot />
    </div>
  );
};

export default Home;
