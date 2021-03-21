import React, { useState } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';

const Banner: React.FC = () => {
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
        <div className="swiper-slide">
          <img
            alt="banner"
            src="https://via.placeholder.com/360x220?text=slide 1"
          />
        </div>
        <div className="swiper-slide">
          <img
            alt="banner"
            src="https://via.placeholder.com/360x220?text=slide 2"
          />
        </div>
        <div className="swiper-slide">
          <img
            alt="banner"
            src="https://via.placeholder.com/360x220?text=slide 3"
          />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </AwesomeSwiper>
  );
};

export { Banner };
