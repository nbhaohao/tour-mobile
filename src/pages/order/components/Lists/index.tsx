import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import { Item } from '../Item';
import { Orders, OrderType } from '@/types/order';

interface ListsProps {
  orders: Orders;
  type: OrderType;
}

const Lists: React.FC<ListsProps> = ({ orders, type }) => {
  return (
    <div>
      {isEmpty(orders) ? (
        <ActivityIndicator toast />
      ) : (
        <div className="tab-lists">
          {orders.map((order) => {
            return <Item type={type} key={order.id} {...order} />;
          })}
        </div>
      )}
    </div>
  );
};

export { Lists };
