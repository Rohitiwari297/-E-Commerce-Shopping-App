import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [current, setCurrent] = useState(0);

  const slidesPerView = 5; // number of visible cards
  const totalSlides = Math.ceil(items.length / slidesPerView);

  // Auto-slide in one direction
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out gap-5"
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
            <div className="rounded-lg overflow-hidden shadow bg-[#35e4ff] flex flex-col justify-between p-6 h-50 w-100">
              {/* Text Section */}
              <div className="space-y-3">
                <h2 className="text-lg md:text-xl font-bold text-black leading-snug">
                  {item.title}
                </h2>
                <span className="inline-block bg-[#0D2451] text-white px-3 py-1 rounded-md text-xs md:text-sm font-semibold">
                  {item.size}
                </span>
                <p className="text-lg md:text-xl font-bold text-black">
                  {item.price}
                </p>
              </div>

              {/* Image */}
              <div className="mt-4 flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 md:h-36 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
