import React from 'react';
import { Order, OrderType } from '@/types/order';
import timer from '@/utils/timer';
import { Button } from 'antd-mobile';

interface ItemProps extends Order {
  type: OrderType;
}

const Item: React.FC<ItemProps> = ({ type, img, title, price, createTime }) => {
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
      <img alt="order" src={img} />
      <div className="center">
        <div className="title">{title}</div>
        <div className="price">¥{price}</div>
        <div className="time">{timer(createTime)}</div>
      </div>
      <div className="pay">{renderPay()}</div>
    </div>
  );
};

export { Item };
