// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../assets/FB_IMG_1765561006646~3.jpg"
import image2 from "../assets/IMG-20251215-WA0056.jpg"
import image3 from "../assets/IMG-20251215-WA0062.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';


 const OurCoachesMobile = ()=> {
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
            <img loading='lazy' src={image1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img loading='lazy' src={image2} alt="" />          
        </SwiperSlide>
        <SwiperSlide>
            <img loading='lazy' src={image3} alt="" />          
        </SwiperSlide>
        <SwiperSlide>
            <img loading='lazy' src={image2} alt="" />          
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default OurCoachesMobile