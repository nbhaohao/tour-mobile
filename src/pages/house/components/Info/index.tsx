import React, { useCallback } from 'react';
import { Button } from 'antd-mobile';
import { House } from '@/types/house';
import timer from '@/utils/timer';
import { Order, OrderType } from '@/types/order';

interface InfoProps {
  detail: House;
  order: Order;
  onHandleOrder?: (id: number) => void;
}

const Info: React.FC<InfoProps> = ({ detail, order, onHandleOrder }) => {
  const handleOrder = useCallback(
    (id?) => {
      onHandleOrder && onHandleOrder(id);
    },
    [onHandleOrder],
  );
  const renderButton = useCallback(() => {
    if (!order?.id) {
      return (
        <Button
          className="info-btn"
          type="warning"
          onClick={() => handleOrder()}
        >
          预定
        </Button>
      );
    }
    if (order?.is_payed === OrderType.NEED_PAY) {
      return (
        <Button
          className="info-btn"
          type="ghost"
          onClick={() => handleOrder(order.id)}
        >
          取消预定
        </Button>
      );
    }
    if (order?.is_payed === OrderType.PAY_COMPLETE) {
      return (
        <Button className="info-btn" type="ghost">
          居住中
        </Button>
      );
    }
    return null;
  }, [handleOrder, detail, order]);
  return (
    <div className="info">
      <div className="info-title">{detail?.name}</div>
      <div className="info-msg">访问量：{detail?.show_count}</div>
      <div className="info-msg">简介：{detail?.info}</div>
      <div className="info-price">价格：{detail?.price}</div>
      <div className="info-time">发布时间：{timer(detail?.publishTime)}</div>
      <div className="info-time">开始出租：{timer(detail?.startTime, '')}</div>
      <div className="info-time">结束出租：{timer(detail?.endTime, '')}</div>
      {renderButton()}
    </div>
  );
};

export { Info };
