import React from 'react';
import './index.less';

const OrderSkeletons: React.FC = () => {
  const fakeData = new Array(4).fill('');
  return (
    <>
      {fakeData.map((_, index) => (
        <div className="order-skeletons" key={index}>
          <div className="order-item">
            <div className="skeletons left"></div>
            <div className="center">
              <div className="skeletons title"></div>
              <div className="skeletons price"></div>
              <div className="skeletons time"></div>
            </div>
            <div className="skeletons pay"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export { OrderSkeletons };
