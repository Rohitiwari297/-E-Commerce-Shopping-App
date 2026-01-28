import phone from '../../assets/product3.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function SeCarousel() {
  return (
    <div className="md: hidden max-w-[1400px] mx-auto overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        speed={6000}              //  smooth continuous speed
        autoplay={{
          delay: 100,               //  no delay
          disableOnInteraction: false,
          reverseDirection: true  //  RIGHT direction
        }}
        allowTouchMove={true}    // optional: disable swipe
      >
        <SwiperSlide>
          <div className="w-full h-[150px]">
              <img src={phone} className="w-full h-full"   />
          </div>
          
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-[150px]">
              <img src={phone} className="w-full h-full"   />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-[150px]">
              <img src={phone} className="w-full h-full"   />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
