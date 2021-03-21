import React, { useState } from 'react';
import { Tabs } from 'antd-mobile';
import './index.less';
import { Lists } from './components/Lists';
import { useHttpHook } from '@/hooks/useHttpHook';
import { CommonEnum } from '@/enums';
import { Orders, OrderType } from '@/types/order';

const Order: React.FC = () => {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const tabs = [
    {
      title: '未支付',
      sub: 0,
    },
    {
      title: '已支付',
      sub: 1,
    },
  ];
  const [orders] = useHttpHook<Orders>({
    url: '/order/lists',
    body: {
      ...page,
    },
    defaultValue: [],
  });
  return (
    <div className="order-page">
      <Tabs tabs={tabs}>
        <div className="tab">
          <Lists orders={orders} type={OrderType.NEED_PAY} />
        </div>
        <div className="tab">
          <Lists orders={orders} type={OrderType.PAY_COMPLETE} />
        </div>
      </Tabs>
    </div>
  );
};

export default Order;
