import React from 'react';
import { Order, OrderType } from '@/types/order';
import timer from '@/utils/timer';
import { Button } from 'antd-mobile';
import { House } from '@/types/house';

interface ItemProps {
  type: OrderType;
  house: House;
  order: Order;
}

const Item: React.FC<ItemProps> = ({ type, house, order }) => {
  const { imgs, name, price } = house;
  const { create_time } = order;
  const renderPay = () => {
    switch (type) {
      case OrderType.NEED_PAY:
        return (
          <Button type="warning" size="small">
            去支付
          </Button>
        );
      case OrderType.PAY_COMPLETE:
        return <Button size="small">已完成</Button>;
      default:
        break;
    }
  };

  return (
    <div className="order-item">
      <img alt="order" src={imgs?.[0]?.url || ''} />
      <div className="center">
        <div className="title">{name}</div>
        <div className="price">¥{price}</div>
        <div className="time">{timer(create_time)}</div>
      </div>
      <div className="pay">{renderPay()}</div>
    </div>
  );
};

export { Item };
