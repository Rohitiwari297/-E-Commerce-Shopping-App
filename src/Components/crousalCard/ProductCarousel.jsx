import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import img from "../../assets/card2.png";
import { getBanners } from "../../utils/Apis";

const items = [
  {
    id: 1,
    title: "Every Tadka Smells Like Home.",
    size: "4.5 LTR",
    price: "₹2899",
    image: "/ghee1.png",
  },
  {
    id: 2,
    title: "Nuvi Masala – Taste That Talks!",
    size: "100 GM",
    price: "UPTO 20% OFF",
    image: "/masala.png",
  },
  {
    id: 3,
    title: "Danedar Ghee, Pure Desi Khushboo!",
    size: "880 ML",
    price: "₹799",
    image: "/ghee2.png",
  },
  {
    id: 4,
    title: "Extra Pure Ghee Special Edition",
    size: "1 LTR",
    price: "₹599",
    image: "/ghee3.png",
  },
  {
    id: 5,
    title: "Spicy Red Chilli Masala Pack",
    size: "200 GM",
    price: "₹199",
    image: "/masala2.png",
  },
  {
    id: 6,
    title: "Premium Coriander Powder",
    size: "250 GM",
    price: "₹149",
    image: "/masala3.png",
  },
  {
    id: 7,
    title: "Premium Coriander Powder",
    size: "250 GM",
    price: "₹149",
    image: "/masala3.png",
  },
  {
    id: 8,
    title: "Premium Coriander Powder",
    size: "250 GM",
    price: "₹149",
    image: "/masala3.png",
  },
];

export default function ProductCarousel() {
  // call the API to fetch the data
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    getBanners(setBannersData);
  }, []);
  console.log(" bannersData", bannersData);

  return (
    <div className="w-full bg-[#fff6d9] mb-3 md:mb-0 ">
      <h6 className="text-[20px] md:text-xl font-semibold text-center mb-4">
        Trending Deals
      </h6>

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
        className="px-5"
      >
        {bannersData.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className=" rounded-lg overflow-hidden shadow h-[200px] m-1 bg-cover bg-center flex flex-col justify-between p-6"
              style={{ backgroundImage: `url(${import.meta.env.VITE_BASE_URL}${item.image})` }}
            >
              {/* Text Section */}
              {/* <div className="space-y-3">
                <h2 className="text-base md:text-lg font-bold text-black leading-snug">
                  {item.title || "Product Title"}
                </h2>
                <span className="inline-block bg-[#0D2451] text-white px-3 py-1 rounded-md text-xs md:text-sm font-semibold">
                  {item.size}
                </span>
                <p className="text-base md:text-lg font-bold text-black">
                  {item.price || "Price"}
                </p>
              </div> */}

              {/* Image */}
              {/* <div className="mt-4 flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 md:h-28 lg:h-32 object-contain"
                />
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
