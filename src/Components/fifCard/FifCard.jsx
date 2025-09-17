import React from 'react'

// Sample product data
const products = [
  {
    id: 1,
    brand: "akb",
    name: "BURA / POWDER SUGAR 1 KG",
    image: "/images/powder-sugar.png",
    price: 75,
    oldPrice: 125,
  },
  {
    id: 2,
    brand: "Maa Kansal Fresh",
    name: "MAA KANSAL FRESH POHA 500 GM",
    image: "/images/poha.png",
    price: 35,
    oldPrice: 105,
  },
  {
    id: 3,
    brand: "Nature Fresh",
    name: "NATURE FRESH ATTA 10 KG",
    image: "/images/atta.png",
    price: 425,
    oldPrice: null,
  },
  {
    id: 4,
    brand: "GS",
    name: "GEE ESS BESAN 500 GM",
    image: "/images/besan.png",
    price: 50,
    oldPrice: 100,
  },
];

function FifCard({img}) {
  return (
    <div className="bg-[#fff6d9]  ">
      <h2 className="text-center text-2xl font-semibold text-black mb-8">
        Today’s Deals
      </h2>

      <div className="  grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-lg relative p-4 flex flex-col items-center mb-5"
          >
            {/* Brand */}
            <div className="absolute -top-1 bg-red-600  px-1 -ml-57 rounded-r-full shadow">
              <span className=" text-white text-sm">15% Dis</span>
            </div>

            {/* Product Name */}
            <h3 className="text-center text-green-700 font-bold text-lg mt-6">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-center space-x-2 mt-2 bg-white px-4 py-1 rounded-full shadow">
              <span className="text-green-600 font-bold text-lg">
                ₹{product.price}
              </span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through font-medium">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            {/* Image */}
            <img
              src={img}
              alt={product.name}
              className="w-42 h-32 object-contain mt-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FifCard;