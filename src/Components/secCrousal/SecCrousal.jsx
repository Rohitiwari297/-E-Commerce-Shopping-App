import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const products = [
  {
    id: 1,
    title: "Dhania Powder (Popular Quality)",
    size: "200 GM",
    price: "₹55",
    oldPrice: "₹110",
    discount: "50% OFF",
    image: "/dhania.png",
  },
  {
    id: 2,
    title: "Phool Makhane / Fox Nut",
    size: "100 GM",
    price: "₹160",
    oldPrice: "₹320",
    discount: "50% OFF",
    image: "/makhana.png",
  },
  {
    id: 3,
    title: "Pansari Oreol Canola Oil",
    size: "1 LTR",
    price: "₹210",
    oldPrice: null,
    discount: null,
    image: "/oil.png",
  },
  {
    id: 4,
    title: "Premium Garam Masala",
    size: "100 GM",
    price: "₹120",
    oldPrice: "₹200",
    discount: "40% OFF",
    image: "/garammasala.png",
  },
];

function SecCrousal({img}) {
  const [current, setCurrent] = useState(0);
  const cardsPerView = 3;

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
    <div className="relative bg-[#fff6d9] py-10 w-full overflow-hidden">
      {/* Cards container */}
      <div
        className="flex transition-transform duration-700 ease-in-out gap-5 -ml-5 px-10 mt-5 h-52"
        style={{
          transform: `translateX(-${current * (100 / cardsPerView)}%)`,
          width: `${(products.length / cardsPerView) * 83}%`,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 bg-[url('../../../public/bgCrousel.png')] bg-cover bg-center rounded-xl shadow-lg px-8  relative flex items-center justify-between"
            style={{ width: `${90 / cardsPerView}%` }} // reduced width
          >
            {/* Left: Text */}
            <div className="flex flex-col justify-between  text-left w-2/3">
              {/* Discount Badge */}
              {product.discount && (
                <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-r-full">
                  {product.discount}
                </span>
              )}

              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {product.title}
              </h2>

              <span className="inline-block bg-purple-600 text-white px-3 w-20 py-1 rounded-md text-xs font-semibold mb-2">
                {product.size}
              </span>

              <div className="flex items-center gap-2 mb-2">
                <p className="text-lg font-bold text-black">{product.price}</p>
                {product.oldPrice && (
                  <p className="text-gray-500 line-through">
                    {product.oldPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Image */}
            <div className="w-1/3 flex justify-end h-full">
              <img
                src={`${img}`}
                alt={product.title}
                className="  w-40 max-h-40 mt-6 shadow-cyan-950 rounded-2xl "
              />
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        disabled={current === 0}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md disabled:opacity-50"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        disabled={current >= products.length - cardsPerView}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md disabled:opacity-50"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default SecCrousal;
