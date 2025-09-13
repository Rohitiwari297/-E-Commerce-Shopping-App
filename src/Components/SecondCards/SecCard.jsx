import React from 'react'
import namk from '../../../public/img.jpeg'

// Categories data
const categories = [
  {
    id: 1,
    name: "Atta, Rice & Dals",
    image: "/images/atta-rice.png",
  },
  {
    id: 2,
    name: "Breakfast, Dips & Spreads",
    image: "/images/breakfast.png",
  },
  {
    id: 3,
    name: "Masalas, Oils & Dry Fruits",
    image: "/images/masala.png",
  },
  {
    id: 4,
    name: "Chips, Biscuits & Namkeens",
    image: "/images/chips.png",
  },
  {
    id: 5,
    name: "Hot & Cold Beverages",
    image: "/images/beverages.png",
  },
  {
    id: 6,
    name: "Instant & Frozen Foods",
    image: "/images/frozen.png",
  },
  {
    id: 7,
    name: "Health & Hygiene",
    image: "/images/hygiene.png",
  },
  {
    id: 8,
    name: "Men's Grooming",
    image: "/images/grooming.png",
  },
  {
    id: 9,
    name: "Bath, Body & Hair",
    image: "/images/bath.png",
  },
  {
    id: 10,
    name: "Beauty & Cosmetics",
    image: "/images/beauty.png",
  },
  {
    id: 11,
    name: "Detergents & Cleaning",
    image: "/images/cleaning.png",
  },
  {
    id: 12,
    name: "Kitchen, Pooja & Homeware",
    image: "/images/kitchen.png",
  },
  {
    id: 13,
    name: "Chocolate & Mithai",
    image: "/images/chocolate.png",
  },
  {
    id: 14,
    name: "Baby Care",
    image: "/images/baby.png",
  },
  {
    id: 15,
    name: "Pet Care",
    image: "/images/pet.png",
  },
];

function SecCard() {
  return (
    <div className="bg-[#fff6d9] min-h-screen py-10">
      <h2 className="text-center text-2xl font-semibold text-black mb-8">
        Shop By Categories
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#DFF1FF] rounded-lg shadow hover:scale-105 transition p-4 flex flex-col items-center cursor-pointer"
          >
            <img
              src={namk}
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