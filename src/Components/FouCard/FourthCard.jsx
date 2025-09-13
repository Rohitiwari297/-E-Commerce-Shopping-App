import React from 'react'

function FourthCard({img}) {

    const products = [
  {
    id: 1,
    name: "24 Mantra Organic Whole Corn Atta 500 Gm",
    price: 59,
    oldPrice: 65,
    discount: "9% off",
    image: "https://i.ibb.co/Q7sPLjC/cornflour.png", // replace with real
  },
  {
    id: 2,
    name: "Gur Desi 500 Gm",
    price: 39,
    oldPrice: 65,
    discount: "40% off",
    image: "https://i.ibb.co/5G0N74h/gur.png",
  },
  {
    id: 3,
    name: "Akb Bura/Powder Sugar 1 Kg",
    price: 75,
    oldPrice: 125,
    discount: "40% off",
    image: "https://i.ibb.co/jTwdVbS/sugar.png",
  },
  {
    id: 4,
    name: "Sugar Free Green Sweetener With Stevia 100 Pellets 10 Gm",
    price: 115,
    oldPrice: 120,
    discount: "4% off",
    image: "https://i.ibb.co/zQrkG3J/sugarfree.png",
  },
    ];

  return (
    <div className="bg-[#fff6d9] py-10 px-4 md:px-10">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Atta, Rice & Dals
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Discount Badge */}
            <div className="relative">
              <span className="absolute top-2 left-2 bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {item.discount}
              </span>
              <img
                src={img}
                alt={item.name}
                className="w-full h-52 object-contain p-4"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-sm md:text-base font-medium mb-2">
                {item.name}
              </h3>
              <div>
                <p className="text-lg font-bold text-green-800">₹ {item.price}</p>
                <p className="text-sm text-gray-500 line-through">₹ {item.oldPrice}</p>
              </div>
              <button className="mt-3 border border-green-700 text-green-700 rounded-full py-1 px-6 text-sm hover:bg-green-700 hover:text-white transition">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FourthCard