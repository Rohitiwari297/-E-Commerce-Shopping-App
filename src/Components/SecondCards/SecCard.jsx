import React from 'react'
import namk from '../../../public/img.jpeg'
import chal from '../../../public/chal.png'
import Makha from '../../../public/makha.png'
import { TbHandFingerRight } from "react-icons/tb";


// Categories data
const categories = [
  {
    id: 1,
    name: "Atta, Rice & Dals",
    image: "../../../public/img.jpeg",
  },
  {
    id: 2,
    name: "Breakfast, Dips & Spreads",
    image: "../../../public/chal.png",
  },
  {
    id: 3,
    name: "Masalas, Oils & Dry Fruits",
    image: "../../../public/makha.png",
  },
  {
    id: 4,
    name: "Chips, Biscuits & Namkeens",
    image: "../../../public/img.jpeg",
  },
  {
    id: 5,
    name: "Hot & Cold Beverages",
    image: "../../../public/chal.png",
  },
  {
    id: 6,
    name: "Instant & Frozen Foods",
    image: "../../../public/makha.png",
  },
  {
    id: 7,
    name: "Health & Hygiene",
    image: "../../../public/img.jpeg",
  },
  {
    id: 8,
    name: "Men's Grooming",
    image: "../../../public/chal.png",
  },
  {
    id: 9,
    name: "Bath, Body & Hair",
    image: "../../../public/img.jpeg",
  },
  {
    id: 10,
    name: "Beauty & Cosmetics",
    image: "../../../public/img.jpeg",
  },
  {
    id: 11,
    name: "Detergents & Cleaning",
    image: "../../../public/img.jpeg",
  },
  {
    id: 12,
    name: "Kitchen, Pooja & Homeware",
    image: "../../../public/chal.png",
  },
  {
    id: 13,
    name: "Chocolate & Mithai",
    image: "../../../public/makha.png",
  },
  {
    id: 14,
    name: "Baby Care",
    image: "../../../public/img.jpeg",
  },
  {
    id: 15,
    name: "Pet Care",
    image: "../../../public/chal.png",
  },
];

function SecCard() {
  return (
    <div className="bg-[#a7d5a7] min-h-screen py-10">
      <h2 className="text-center text-2xl font-semibold text-black mb-8">
        Shop By Categories
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
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
            <p className="text-sm font-medium text-center">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecCard