// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import image1 from "../assets/DSC_4788.jpg"
import image2 from "../assets/FB_IMG_1765561009727~3.jpg"
import image3 from "../assets/IMG-20251213-WA0058~2.jpg"
import image4 from "../assets/FB_IMG_1765561009727~2.jpg"
import image5 from "../assets/FB_IMG_1765561006646~2.jpg"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';


export default function OurPlayersMobile() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false
        }}
        modules={[Pagination, Autoplay]}
        className="image-carousel"
      >
        <SwiperSlide>            
          <img loading='lazy' src={image1} alt={image1.name} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt={image2.name} />
        </SwiperSlide>
        <SwiperSlide>
          <img loading='lazy' src={image3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img loading='lazy' src={image4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img loading='lazy' src={image5} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}