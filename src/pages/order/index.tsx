import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd-mobile';
import './index.less';
import { Lists } from './components/Lists';
import { CommonEnum } from '@/enums';
import { Orders, OrderType } from '@/types/order';
import { Http } from '@/utils/http';
import { isEmpty } from 'project-libs';
import { useObserverHook } from '@/hooks/useObserverHook';
import { Models } from 'rmc-tabs/lib/Models';

const Order: React.FC = () => {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [orders, setOrders] = useState<Orders>([]);
  const [showLoading, setShowLoading] = useState(true);
  const [type, setType] = useState(OrderType.NEED_PAY);
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

  const handleChange = (e: Models.TabData) => {
    setType(e.sub);
    setPage(CommonEnum.PAGE);
    setOrders([]);
    setShowLoading(true);
  };

  const handleFetchOrder = async (
    pageNum: number,
    callback: (result: Orders) => any,
  ) => {
    const result = await Http<Orders>({
      url: '/order/lists',
      body: {
        ...page,
        pageNum,
        type,
      },
    });
    if (!isEmpty(result) && result.length === page.pageSize) {
      setOrders(result);
      callback && callback(result);
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  };
  const fetchOrder = async (pageNum: number) => {
    return handleFetchOrder(pageNum, (result: Orders) => {
      setOrders(result);
    });
  };

  useObserverHook({
    element: `#${CommonEnum.LOADING_ID}`,
    callback: async (entries) => {
      if (entries[0].isIntersecting) {
        handleFetchOrder(page.pageNum + 1, (result) => {
          setOrders([...orders, ...result]);
          setPage({
            ...page,
            pageNum: page.pageNum + 1,
          });
        });
      }
    },
  });

  useEffect(() => {
    void fetchOrder(1);
  }, [type]);
  return (
    <div className="order-page">
      <Tabs tabs={tabs} onChange={handleChange}>
        <div className="tab">
          <Lists
            showLoading={showLoading}
            orders={orders}
            type={OrderType.NEED_PAY}
          />
        </div>
        <div className="tab">
          <Lists
            showLoading={showLoading}
            orders={orders}
            type={OrderType.PAY_COMPLETE}
          />
        </div>
      </Tabs>
    </div>
  );
};

export default Order;
