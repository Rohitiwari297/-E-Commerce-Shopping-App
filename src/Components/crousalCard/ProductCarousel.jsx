import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { getBanners } from '../../utils/Apis';

export default function ProductCarousel() {
  // call the API to fetch the data
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    getBanners(setBannersData);
  }, []);
  console.log(' bannersData', bannersData);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay]}
        className="px-0"
      >
        {bannersData.map(
          (item) =>
            item.device === 'desktop' && (
              <SwiperSlide key={item._id}>
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
