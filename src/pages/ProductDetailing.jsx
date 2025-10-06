import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addDataToCard } from "../redux/features/CartSlicer";

function ProductDetailing() {
  // Get product details from Link state
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Cart from redux
  const { carts } = useSelector((state) => state.allCards);

  const AddToCartHandler = (product) => {
    dispatch(addDataToCard(product));
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">
        {/* Left: Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-[400px] h-[400px] object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-between">
          {/* Product Title */}
          <div>
            <p className="text-sm text-gray-500">{item.category || "Grocery"}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {item.name}
            </h1>

            {/* Price Section */}
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-2xl font-semibold text-green-700">
                ₹ {item.price}
              </p>
              <p className="line-through text-gray-400 text-lg">
                ₹ {item.price + 50}
              </p>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-md font-medium">
                Save ₹50
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              (Inclusive of all taxes) <br />
              <span className="text-gray-700 font-medium">₹49.00 / kg</span>
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => AddToCartHandler(item)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow-md transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg shadow-md transition"
              >
                Back
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Product Description
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description ||
                "This is a premium product made with the finest quality ingredients. Perfect for daily use in your kitchen — enhances flavor, adds nutrition, and ensures freshness. Store in a cool, dry place."}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {carts.slice(-4).map((prod, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-sm p-3 flex flex-col items-center hover:shadow-md transition"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="w-28 h-28 object-contain mb-3"
              />
              <p className="text-sm font-medium text-center">{prod.name}</p>
              <p className="text-green-600 font-semibold">₹ {prod.price}</p>
              <button
                onClick={() => AddToCartHandler(prod)}
                className="mt-2 text-xs px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailing;  
