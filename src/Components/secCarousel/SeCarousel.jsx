
import { useState, useEffect } from "react";
import img from '../../../public/cloth.png'
import phone from '../../assets/product3.jpg'



const categories = ["grocery", "fmcg", "snacks", "electronics", "fashion", "mobile"];

// Use Picsum Photos for reliable random images
const getRandomBanners = (count = 6) => {
  return Array.from({ length: count }).map((_, idx) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      id: idx + 1,
      image: `https://picsum.photos/1600/100?random=${idx + 1}`, //  height = 100px
      alt: `Random ${category} Banner ${idx + 1}`,
    };
  });
};

export default function SeCarousel() {
  const [current, setCurrent] = useState(0);
  const [banners] = useState(getRandomBanners(6));

  //  Auto-slide only LEFT direction
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3000); // 3s interval
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="bg-[#a7d5a7] relative  max-w-[1400px] mx-auto overflow-hidden">
      {/* Slides */}
      <div
      
        className="flex transition-transform duration-700 ease-linear "
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full flex-shrink-0">
            <img
              src={phone }
              alt={banner.alt}
              className="w-[1300px] h-[150px] object-cover shadow-2xl" // fixed height
            />
          </div>
        ))}
      </div>
    </div>
  );
}
