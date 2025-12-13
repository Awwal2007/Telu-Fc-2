// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../assets/FB_IMG_1765561003897-removebg-preview.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';


 const PlayersMobile = ()=> {
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
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="slide">
                <div className='image-container'>
                    <img loading='lazy' src={image1} alt="" />
                </div>
                <div className='overlay'></div>
                <div className='player-info'>
                    <h2>12</h2>
                    <p>Adebayo</p>
                    {/* <button>View Profile</button> */}
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>
            <div className="slide">
                <div className='image-container'>
                    <img loading='lazy' src={image1} alt="" />
                </div>
                <div className='overlay'></div>
                <div className='player-info'>
                    <h2>12</h2>
                    <p>Adebayo</p>
                    {/* <button>View Profile</button> */}
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>
            <div className="slide">
                <div className='image-container'>
                    <img loading='lazy' src={image1} alt="" />
                </div>
                <div className='overlay'></div>
                <div className='player-info'>
                    <h2>12</h2>
                    <p>Adebayo</p>
                    {/* <button>View Profile</button> */}
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}

export default PlayersMobile