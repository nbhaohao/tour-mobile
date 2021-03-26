import React, { memo } from 'react';
import { history } from 'umi';
import { House, Houses } from '@/types/house';

interface HotProps {
  houses: Houses;
}

const Hot: React.FC<HotProps> = memo(({ houses }) => {
  const handleClick = (id: number) => {
    history.push({
      pathname: '/house',
      query: {
        id: id.toString(),
      },
    });
  };

  const renderHouses = (houseList: Array<House>) => {
    return (
      <div className="hot-lists">
        {houseList.map((house) => {
          const { id, imgs, title, info, price } = house;
          return (
            <div
              className="hot-lists-item"
              key={id}
              onClick={() => handleClick(id)}
            >
              <img className="img" alt="img" src={imgs?.[0]?.url || ''} />
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
});

export { Hot };
