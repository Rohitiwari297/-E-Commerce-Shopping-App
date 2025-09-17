import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Kreak 'n' Krips",
    subtitle: "Non-Vegetarian Dog Biscuits",
    size: "500 gm",
    price: "₹81",
    oldPrice: "₹90",
    bg: "bg-red-200",
  },
  {
    id: 2,
    title: "Kreak 'n' Krips",
    subtitle: "Vegetarian Dog Biscuits",
    size: "2 Kg",
    price: "₹270",
    oldPrice: "₹310",
    bg: "bg-green-200",
  },
  {
    id: 3,
    title: "Toyaa",
    subtitle: "Spirulina Special Fish Food Floating Type",
    size: "100 gm",
    price: "₹65",
    oldPrice: "₹70",
    bg: "bg-pink-200",
  },
  {
    id: 4,
    title: "Kreak 'n' Krips",
    subtitle: "Non-Vegetarian Dog Biscuits",
    size: "1 Kg",
    price: "₹153",
    oldPrice: "₹170",
    bg: "bg-red-300",
  },
  {
    id: 5,
    title: "Kreak 'n' Krips",
    subtitle: "Dog & Cat Shampoo",
    size: "500 ml",
    price: "₹342",
    oldPrice: "₹380",
    bg: "bg-gray-300",
  },
];

//  Helper function to get random image each time
const getRandomImage = (id) => `https://picsum.photos/seed/${id}/200/200`;

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  const cardsPerView = 4;

  const nextSlide = () => {
    if (current < products.length - cardsPerView) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full bg-[#fff6d9] py-10 overflow-hidden">
      {/* Cards container */}
      <div
        className="flex transition-transform duration-700 ease-in-out gap-6 px-10"
        style={{
          transform: `translateX(-${current * (100 / cardsPerView)}%)`,
          width: `${(products.length / cardsPerView) * 100}%`,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex-shrink-0 ${product.bg} rounded-3xl shadow-md p-4 text-center relative`}
            style={{ width: `${100 / cardsPerView}%` }}
          >
            {/* Size Badge */}
            <span className="absolute top-3 right-3 bg-white text-black font-bold px-3 py-1 rounded-full text-sm shadow">
              {product.size}
            </span>

            {/* Product Image (Random) */}
            <img
              src={getRandomImage(product.id)}
              alt={product.title}
              className="h-44 mx-auto object-contain rounded-lg"
            />

            {/* Title */}
            <h2 className="mt-4 text-lg font-bold">{product.title}</h2>
            <p className="text-sm text-gray-700">{product.subtitle}</p>

            {/* Price Section */}
            <div className="mt-3 flex justify-center items-center gap-2">
              <span className="text-xl font-bold text-black">{product.price}</span>
              {product.oldPrice && (
                <span className="line-through text-gray-600">{product.oldPrice}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        disabled={current === 0}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-md disabled:opacity-50"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        disabled={current >= products.length - cardsPerView}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-md disabled:opacity-50"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
