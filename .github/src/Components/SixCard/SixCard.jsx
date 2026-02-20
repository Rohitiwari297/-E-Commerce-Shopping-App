import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import caur from '../../assets/img.jpeg';
import chal from '../../assets/chal.png';
import makha from '../../assets/makha.png';
import namk from '../../assets/namk.png';

// Corrected products data with unique IDs (id: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
const products = [
  {
    id: 1,
    title: "Kreak 'n' Krips",
    subtitle: "Non-Vegetarian Dog Biscuits",
    size: "500 gm",
    price: "₹81",
    oldPrice: "₹90",
    bg: "bg-red-200",
    image: caur
  },
  {
    id: 2,
    title: "Kreak 'n' Krips",
    subtitle: "Vegetarian Dog Biscuits",
    size: "2 Kg",
    price: "₹270",
    oldPrice: "₹310",
    bg: "bg-green-200",
    image: namk
  },
  {
    id: 3,
    title: "Toyaa",
    subtitle: "Spirulina Special Fish Food Floating Type",
    size: "100 gm",
    price: "₹65",
    oldPrice: "₹70",
    bg: "bg-pink-200",
    image: makha
  },
  {
    id: 4,
    title: "Kreak 'n' Krips",
    subtitle: "Non-Vegetarian Dog Biscuits",
    size: "1 Kg",
    price: "₹153",
    oldPrice: "₹170",
    bg: "bg-red-300",
    image: chal
  },
  {
    id: 5,
    title: "Kreak 'n' Krips",
    subtitle: "Dog & Cat Shampoo",
    size: "500 ml",
    price: "₹342",
    oldPrice: "₹380",
    bg: "bg-gray-300",  
    image: namk
  },
  {
    id: 6,
    title: "Puppy Chew",
    subtitle: "Chicken Flavored Chews",
    size: "10 pcs",
    price: "₹120",
    oldPrice: "₹135",
    bg: "bg-yellow-200",
    image: makha
  },
  {
    id: 7,
    title: "Fish Flakes",
    subtitle: "Tropical Fish Food",
    size: "50 gm",
    price: "₹45",
    oldPrice: "₹50",
    bg: "bg-blue-200",
    image: chal
  },
  {
    id: 8,
    title: "Cat Litter",
    subtitle: "Scented Clay Litter",
    size: "5 Kg",
    price: "₹450",
    oldPrice: "₹500",
    bg: "bg-purple-200",
    image: caur
  },
  {
    id: 9,
    title: "Bird Seed",
    subtitle: "Premium Mixed Seeds",
    size: "1 Kg",
    price: "₹99",
    oldPrice: "₹110",
    bg: "bg-orange-200",
    image: namk
  },
  {
    id: 10,
    title: "Dog Leash",
    subtitle: "Heavy Duty Nylon",
    size: "5 ft",
    price: "₹180",
    oldPrice: "₹200",
    bg: "bg-teal-200",
    image: makha
  },
];

// Helper function to get random image each time for a multi-type grocery product look
const getRandomImage = (id) => `https://picsum.photos/seed/${id + 100}/200/200`;

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  // Controls how many products are visible at once
  const cardsPerView = 4;
  
  // 💡 KEY CHANGE: Scroll by 1 card per click
  const cardsToScroll = 1; 

  // The index of the first card in the last viewable set
  const maxIndex = products.length - cardsPerView;

  const nextSlide = () => {
    // Move forward by 1, but don't exceed the max index (which is 6 for 10 products, showing index 6, 7, 8, 9)
    setCurrent((prev) => Math.min(prev + cardsToScroll, maxIndex));
  };

  const prevSlide = () => {
    // Move back by 1, but don't go below index 0
    setCurrent((prev) => Math.max(prev - cardsToScroll, 0));
  };

  // Calculate the total width of the container
  const totalContainerWidth = (products.length / cardsPerView) * 100;
  
  // Calculate the amount to translate for the current slide.
  // We want to translate by a multiple of (100% / products.length).
  // E.g., if total products is 10, each card is 10% of the total container width.
  const cardWidthPercentageOfTotalContainer = 100 / products.length;
  const translateXValue = current * cardWidthPercentageOfTotalContainer;

  return (
    <div className="relative w-full bg-[#fff6d9] py-10 overflow-hidden">
      <h1 className="text-2xl md:text-xl font-semibold text-center mb-8">Featured Products 🛍️</h1>
      {/* Cards container */}
      <div
        className="flex transition-transform  duration-700 ease-in-out gap-6 px-10 "
        style={{
          // Apply the calculated translation. The slider moves by 10% (1/10th) of the total container width per click.
          transform: `translateX(-${translateXValue}%)`,
          // Set the total width of the inner flex container
          width: `${totalContainerWidth}%`,
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${product.bg} w-1 rounded-3xl shadow-lg p-4 text-center relative hover:scale-[1.10] transition-transform duration-600 ease-in-out`}
            // Each card takes up 1/10th of the total container width
            style={{ width: `${100 / products.length}%` }} 
          >
            {/* Size Badge */}
            <span className="absolute  top-1 right-2 bg-white text-black font-bold px-3 py-1 rounded-full text-xs shadow-md">
              {product.size}
            </span>
            
            {/* Product Image (Random Multi-Type Grocery) */}
            <img
              src={product.image}
              alt={product.title}
              className="h-35 mx-auto object-cover rounded-lg shadow-sm"
            />
            

            {/* Title */}
            <h2 className="mt-4 text-lg font-bold truncate">{product.title}</h2>
            <p className="text-sm text-gray-700 truncate">{product.subtitle}</p>

            {/* Price Section */}
            <div className="mt-3 flex justify-center items-center gap-2">
              <span className="text-xl font-bold text-black">{product.price}</span>
              {product.oldPrice && (
                <span className="line-through text-gray-600">{product.oldPrice}</span>
              )}
            </div>
            
             {/* Add to Cart Button */}
            <button className="mt-3 w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        disabled={current === 0}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-xl z-10 disabled:opacity-30 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        disabled={current >= maxIndex}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-xl z-10 disabled:opacity-30 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}