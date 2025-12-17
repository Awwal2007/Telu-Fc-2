// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import image1 from "../assets/DSC_4789.png"
import image2 from "../assets/FB_IMG_1765561009727~3.jpg"
import image3 from "../assets/IMG-20251213-WA0058~2.jpg"
import image4 from "../assets/FB_IMG_1765561009727~2.jpg"
import image5 from "../assets/FB_IMG_1765561006646~2.jpg"
import image6 from "../assets/IMG-20251215-WA0074.jpg"
import image9 from "../assets/PXL_20251216_140743679.RAW-02.ORIGINALee.png"
import image10 from "../assets/IMG-20250725-WA0054.jpg"


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
        <SwiperSlide className='slide'>            
          <img loading='lazy' src={image1} alt={image1.name} />
          <div className='player-content'>
            <h2>Raji Sunday</h2>
            <b>Midfield</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>17</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>MID</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <img src={image2} alt={image2.name} />
          <div className='player-content'>
            <h2>Bello Ahmad</h2>
            <b>Defender</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>20</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>RB</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className='slide'>
          <img loading='lazy' src={image3} alt="" />
          <div className='player-content'>
            <h2>Bello Monsuru</h2>
            <b>Defender</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>20</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>CB</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <img loading='lazy' src={image4} alt="" />
          <div className='player-content'>
            <h2>Ibraheem Abdulkoyum</h2>
            <b>Defender</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>20</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>LB</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <img loading='lazy' src={image5} alt="" />
          <div className='player-content'>
            <h2>Olamilekan Muhayad</h2>
            <b>Forward</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>16</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>RWF</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <img loading='lazy' src={image6} alt="" />
          <div className='player-content'>
            <h2>Abideen Akeem</h2>
            <b>Midfield</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>21</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>DMF</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <img loading='lazy' src={image9} alt="" />
          <div className='player-content'>
            <h2>Dosumu Abdulquadri</h2>
            <b>Forward</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>21</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>LWF</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <img loading='lazy' src={image10} alt="" />
          <div className='player-content'>
            <h2>Adebiyi Buhari</h2>
            <b>Goal Keeper</b>
            <div className="player-stats-container">
              <div className='player-stats'>
                <b>23</b>
                <span>AGE</span>
              </div>
              <div className='player-stats'>
                <b>Nigeria</b>
                <span>NATIONALITY</span>
              </div>
              <div className='player-stats'>
                <b>GK</b>
                <span>POS</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}