import React from 'react';
import { Button } from 'antd-mobile';
import { House } from '@/types/house';
import timer from '@/utils/timer';

interface InfoProps {
  detail: House;
}

const Info: React.FC<InfoProps> = ({ detail }) => {
  return (
    <div className="info">
      <div className="info-title">{detail?.title}</div>
      <div className="info-msg">简介：{detail?.info}</div>
      <div className="info-price">价格：{detail?.price}</div>
      <div className="info-time">发布时间：{timer(detail?.publishTime)}</div>
      <div className="info-time">开始出租：{timer(detail?.startTime, '')}</div>
      <div className="info-time">结束出租：{timer(detail?.endTime, '')}</div>
      <Button className="info-btn" type="warning">
        预定
      </Button>
    </div>
  );
};

export { Info };
