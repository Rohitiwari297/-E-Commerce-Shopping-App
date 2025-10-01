import React from 'react'
import namk from '../../assets/img.jpeg'
import chal from '../../assets/chal.png'
import Makha from '../../assets/makha.png'
import { TbHandFingerRight } from "react-icons/tb";


// Categories data
const categories = [
  {
    id: 1,
    name: "Atta, Rice & Dals",
    image: namk,
  },
  
  {
    id: 2,
    name: "Breakfast, Dips & Spreads",
    image: chal,
  },
  {
    id: 3,
    name: "Masalas, Oils & Dry Fruits",
    image: Makha,
  },
  {
    id: 4,
    name: "Chips, Biscuits & Namkeens",
    image: namk,
  },
  {
    id: 5,
    name: "Hot & Cold Beverages",
    image: chal,
  },
  {
    id: 6,
    name: "Instant & Frozen Foods",
    image: Makha,
  },
  {
    id: 7,
    name: "Health & Hygiene",
    image: namk,
  },
  {
    id: 8,
    name: "Men's Grooming",
    image: chal,
  },
  {
    id: 9,
    name: "Bath, Body & Hair",
    image: Makha,
  },
  {
    id: 10,
    name: "Beauty & Cosmetics",
    image: namk,
  },
  {
    id: 11,
    name: "Detergents & Cleaning",
    image: chal,
  },
  {
    id: 12,
    name: "Kitchen, Pooja & Homeware",
    image: Makha,
  },
  {
    id: 13,
    name: "Chocolate & Mithai",
    image: namk,
  },
  {
    id: 14,
    name: "Baby Care",
    image: chal,
  },
  {
    id: 15,
    name: "Pet Care",
    image: Makha,
  },
  {
    id: 1,
    name: "Atta, Rice & Dals",
    image: namk,
  },
];

function SecCard() {
  return (
    <div className="bg-[#f1e6c1]  shadow min-h-screen py-10">
      <h2 className="text-center text-xl font-semibold text-black mb-8">
        Shop By Categories
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 px-4 mb-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#f1f8fe] rounded-lg shadow hover:scale-105 transition p-4 flex flex-col items-center cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-24 h-24 object-contain mb-3"
            />
            <p className="text-[10px] font-medium text-center">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecCard