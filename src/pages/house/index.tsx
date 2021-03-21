import React from 'react';
import './index.less';
import { Banner } from '@/pages/house/components/Banner';
import { Footer } from '@/pages/house/components/Footer';
import { Info } from '@/pages/house/components/Info';
import { Lists } from '@/pages/house/components/Lists';

const House: React.FC = () => {
  return (
    <div className="house-page">
      <Banner />
      <Info />
      <Lists />
      <Footer />
    </div>
  );
};

export default House;
