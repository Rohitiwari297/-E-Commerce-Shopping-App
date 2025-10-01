import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img from '../../assets/card2.png'

const items = [
  { id: 1, title: "Every Tadka Smells Like Home.", size: "4.5 LTR", price: "₹2899", image: "/ghee1.png" },
  { id: 2, title: "Nuvi Masala – Taste That Talks!", size: "100 GM", price: "UPTO 20% OFF", image: "/masala.png" },
  { id: 3, title: "Danedar Ghee, Pure Desi Khushboo!", size: "880 ML", price: "₹799", image: "/ghee2.png" },
  { id: 4, title: "Extra Pure Ghee Special Edition", size: "1 LTR", price: "₹599", image: "/ghee3.png" },
  { id: 5, title: "Spicy Red Chilli Masala Pack", size: "200 GM", price: "₹199", image: "/masala2.png" },
  { id: 6, title: "Premium Coriander Powder", size: "250 GM", price: "₹149", image: "/masala3.png" },
  { id: 7, title: "Premium Coriander Powder", size: "250 GM", price: "₹149", image: "/masala3.png" },
  { id: 8, title: "Premium Coriander Powder", size: "250 GM", price: "₹149", image: "/masala3.png" },
];

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(5);

  //  Adjust visible slides based on screen width
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);       // mobile
      else if (window.innerWidth < 768) setSlidesPerView(2);  // small tablets
      else if (window.innerWidth < 1024) setSlidesPerView(3); // tablets
      else if (window.innerWidth < 1280) setSlidesPerView(4); // small laptops
      else setSlidesPerView(5);                               // desktops
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const totalSlides = Math.ceil(items.length / slidesPerView);

  // Auto-slide (one direction)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? 0 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <div className=" relative w-full mx-auto overflow-hidden bg-[#fff6d9] ">
      <h6 className="text-sm md:text-xl font-semibold text-center mb-3 mt-3">
        Trending Deals
      </h6>
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-linear gap-5 mb-12"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${(items.length / slidesPerView) * 100}%`,
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 p-3"
            style={{ width: `${100 / slidesPerView}%` }}
          >
            <div className="rounded-lg overflow-hidden shadow bg-[url()] bg-cover bg-center flex flex-col justify-between p-6 h-50" 
            style={{ backgroundImage: `url(${img})` }}>
              {/* Text Section */}
              <div className="space-y-3">
                <h2 className="text-base md:text-lg font-bold text-black leading-snug">
                  {item.title}
                </h2>
                <span className="inline-block bg-[#0D2451] text-white px-3 py-1 rounded-md text-xs md:text-sm font-semibold">
                  {item.size}
                </span>
                <p className="text-base md:text-lg font-bold text-black">
                  {item.price}
                </p>
              </div>
              {/* Image */}
              <div className="mt-4 flex justify-center">
                <img src={item.image} alt={item.title} className="h-20 md:h-28 lg:h-32 object-contain" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/ bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/ bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
