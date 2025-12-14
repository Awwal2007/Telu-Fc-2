import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import image2 from "../assets/DSC_4776.jpg";
import image1 from "../assets/FB_IMG_1765560836447.jpg";
// import image3 from "../assets/DSC_4794-1.jpg";
import image4 from "../assets/FB_IMG_1765561012969.jpg";

const ImageCarousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="image-carousel"
    >
      {[image2, image1, , image4].map((img, index) => (
        <SwiperSlide key={index}>
          <img
            loading="lazy"
            src={img}
            alt='Iwo Land Images'
            style={{ width: "100%", height: "400px", objectFit: "cover",
              touchAction: "auto", }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
