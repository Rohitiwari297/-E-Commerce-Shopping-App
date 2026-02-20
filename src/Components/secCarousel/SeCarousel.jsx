import phone from '../../assets/taza-cart-1.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import './SeCarousel.css';


export default function SeCarousel() {
  const sliders = [
    {
      id: 1,
      image: phone,
      title: "Order Tasty Fruits",
      subtitle: "and Get Free Delivery!",
      description: "2500+ Fresh Products",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      image: phone,
      title: "Fresh Vegetables",
      subtitle: "Delivered to Your Door",
      description: "100% Organic Products",
      buttonText: "Order Now"
    },
    {
      id: 3,
      image: phone,
      title: "Premium Quality",
      subtitle: "Best Prices Guaranteed",
      description: "Same Day Delivery",
      buttonText: "Shop Now"
    }
  ];

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        spaceBetween={20}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="max-w-[1400px] mx-auto carousel-slider"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[200px] md:h-[300px] lg:h-[300px] rounded-3xl overflow-hidden">
              {/* Background Image */}
              <img 
                src={slide.image}
                alt="banner"
                className="w-full h-full object-cover"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3d6e3e] to-transparent opacity-80"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-14 lg:px-20">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
                  {slide.title}
                </h1>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {slide.subtitle}
                </h2>
                <p className="text-sm md:text-base text-white/90 mb-6">
                  {slide.description}
                </p>
                <button className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#2d5a2e] to-[#3d6e3e] text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <span>🛒</span>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
