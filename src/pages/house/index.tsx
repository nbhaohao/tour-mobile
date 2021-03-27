import React, { useCallback, useEffect } from 'react';
import './index.less';
import { useLocation } from 'umi';
import { Banner } from '@/pages/house/components/Banner';
import { Footer } from '@/pages/house/components/Footer';
import { Info } from '@/pages/house/components/Info';
import { Lists } from '@/pages/house/components/Lists';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks/useObserverHook';
import { CommonEnum } from '@/enums';

const House: React.FC = () => {
  const {
    house: {
      detail,
      getDetailAsync,
      getCommentsAsync,
      comments,
      reloadComments,
      reloadCommentsNum,
      showLoading,
      resetData,
      order,
      hasOrderAsync,
      addOrderAsync,
      delOrderAsync,
    },
  } = useStoreHook();
  // @ts-ignore
  const { query } = useLocation();
  useObserverHook({
    element: `#${CommonEnum.LOADING_ID}`,
    callback: (entries) => {
      if (
        comments &&
        comments.length &&
        showLoading &&
        entries[0].isIntersecting
      ) {
        reloadComments();
      }
    },
    watch: [comments, showLoading],
  });
  useEffect(() => {
    hasOrderAsync({
      id: query?.id,
    });
  }, []);
  useEffect(() => {
    getDetailAsync({
      id: query?.id,
    });
  }, []);
  useEffect(() => {
    getCommentsAsync({
      houseId: query?.id,
    });
  }, [reloadCommentsNum]);
  useEffect(() => {
    return () => {
      resetData({
        detail: {},
      });
    };
  }, []);
  const handleOrder = useCallback(
    (id: number) => {
      if (!id) {
        addOrderAsync({
          id: query?.id,
        });
        return;
      }
      delOrderAsync({
        id,
      });
    },
    [addOrderAsync, delOrderAsync, query],
  );
  return (
    <div className="house-page">
      <Banner banner={detail?.banner} />
      <Info detail={detail?.info} order={order} onHandleOrder={handleOrder} />
      <Lists showLoading={showLoading} lists={comments} />
      <Footer />
    </div>
  );
};

export default House;
