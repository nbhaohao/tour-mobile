import React, { useState } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';

interface BannerProps {
  banner: string[];
}

const Banner: React.FC<BannerProps> = ({ banner }) => {
  const [config, setConfig] = useState({
    loop: true,
    autoplay: {
      delay: 1500,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });
  return (
    <AwesomeSwiper className="banner" config={config}>
      <div className="swiper-wrapper">
        {(banner || []).map((url) => (
          <div key={url} className="swiper-slide">
            <img alt="banner" src={url} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </AwesomeSwiper>
  );
};

export { Banner };
