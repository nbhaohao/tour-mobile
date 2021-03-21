import React from 'react';
import './index.less';
import { CommonEnum } from '@/enums';

interface ShowLoadingProps {
  showLoading: boolean;
}

const ShowLoading: React.FC<ShowLoadingProps> = ({ showLoading }) => {
  return (
    <div>
      {showLoading ? (
        <div id={CommonEnum.LOADING_ID} className="loading-info">
          loading
        </div>
      ) : (
        <div className="loading-info">没有更多的数据了</div>
      )}
    </div>
  );
};

export { ShowLoading };
