import React, { useEffect } from 'react';
import './index.less';
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
    },
  } = useStoreHook();

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
    getDetailAsync();
  }, []);
  useEffect(() => {
    getCommentsAsync({});
  }, [reloadCommentsNum]);
  return (
    <div className="house-page">
      <Banner banner={detail?.banner} />
      <Info detail={detail?.info} />
      <Lists showLoading={showLoading} lists={comments} />
      <Footer />
    </div>
  );
};

export default House;
