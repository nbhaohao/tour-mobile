import React from 'react';
import { Order, OrderType } from '@/types/order';
import timer from '@/utils/timer';
import { Button, Toast } from 'antd-mobile';
import { House } from '@/types/house';
import { Http } from '@/utils/http';

interface ItemProps {
  type: OrderType;
  house: House;
  order: Order;
}

const Item: React.FC<ItemProps> = ({ type, house, order }) => {
  const { imgs, name, price } = house;
  const { create_time } = order;
  const handlePay = async () => {
    const result = await Http({
      url: '/orders/pay',
      body: {
        id: order.id,
      },
    });
    if (result) {
      Toast.success('支付成功');
      window.location.reload();
      return;
    }
  };
  const renderPay = () => {
    switch (type) {
      case OrderType.NEED_PAY:
        return (
          <Button type="warning" size="small" onClick={handlePay}>
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
