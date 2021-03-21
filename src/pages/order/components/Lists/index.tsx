import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import { Item } from '../Item';
import { Orders, OrderType } from '@/types/order';
import { ShowLoading } from '@/components/ShowLoading';

interface ListsProps {
  orders: Orders;
  type: OrderType;
  showLoading: boolean;
}

const Lists: React.FC<ListsProps> = ({ orders, type, showLoading }) => {
  return (
    <div>
      {isEmpty(orders) ? (
        <ActivityIndicator toast />
      ) : (
        <div className="tab-lists">
          {orders.map((order) => {
            return <Item type={type} key={order.id} {...order} />;
          })}
          <ShowLoading showLoading={showLoading} />
        </div>
      )}
    </div>
  );
};

export { Lists };
