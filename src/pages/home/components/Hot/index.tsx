import React from 'react';
import { House, Houses } from '@/types/house';

interface HotProps {
  houses: Houses;
}

const Hot: React.FC<HotProps> = ({ houses }) => {
  const renderHouses = (houseList: Array<House>) => {
    return (
      <div className="hot-lists">
        {houseList.map((house) => {
          const { id, img, title, info, price } = house;
          return (
            <div className="hot-lists-item" key={id}>
              <img className="img" alt="img" src={img} />
              <div className="title">{title}</div>
              <div className="info">{info}</div>
              <div className="price">¥{price}</div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="hot">
      <h1>最热民宿</h1>
      {renderHouses(houses)}
    </div>
  );
};

export { Hot };
