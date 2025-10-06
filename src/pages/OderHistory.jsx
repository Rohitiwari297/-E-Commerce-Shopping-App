import React, { useState } from "react";
import img1 from "../assets/makha.png";
import img2 from "../assets/namk.png";
import img3 from "../assets/namk.png";

const OrderHistory = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Crunchy Makhana",
      description: "Healthy roasted fox nuts with a delicious flavor.",
      price: 120,
      image: img1,
    },
    {
      id: 2,
      name: "Spicy Namkeen",
      description: "Crispy and spicy Indian snack perfect for tea time.",
      price: 80,
      image: img2,
    },
    {
      id: 3,
      name: "Salted Peanuts",
      description: "Lightly roasted peanuts seasoned with salt.",
      price: 60,
      image: img3,
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 ">
        Order List
      </h2>

      {/* Compact Product Grid */}
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl  shadow hover:shadow-lg  transition-all duration-300 border border-gray-200"
          >
            {/* Product Image */}
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-20 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm font-bold text-green-600">
                  ₹{product.price}
                </span>
                <button className="bg-green-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700 transition-all">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
