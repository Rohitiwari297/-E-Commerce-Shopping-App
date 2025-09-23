import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";  
import { addDataToCard } from '../redux/features/CartSlicer';

function ProductDetailing() {
  // Get props from Link state
  const location = useLocation();
  const { id, name, price, img } = location.state || {};

  // Select cart data from redux
  const { carts } = useSelector((state) => state.allCards);

  console.log("product details from store:", carts);

  const latestIndex = carts.length - 1;     // number
  const latestProduct = carts[latestIndex]; // object

  // create dispatch instance
  const dispatch = useDispatch()
  // Handler function (dummy for now, should be connected to redux dispatch)
  const AddToCartHandler = (product) => {
    console.log("Add to cart:", product);
    // dispatch({ type: "ADD_TO_CART", payload: product }); // if redux is set up
    dispatch(addDataToCard(product))

  };

  return (
    <section className="flex p-12 items-center justify-between border mb-5">
      <div className="w-1/2">
        <img src={img} alt={name} className="w-[400px]" />
      </div>
      <div className="w-1/2">
        <p className="text-[10px] text-[#4b5563]">{name}</p>
        <h1 className="text-xl font-semibold">{name}</h1>

        <div className="flex flex-col mb-3">
          <p className="text-2xl">₹ {price}</p>
          <p className="text-[10px] text-[#4b5563]">
            (Inclusive all taxes) <br />
            <span>₹49.00/kg</span>
          </p>
        </div>

        <div>
          <button
            type="button"
            className="py-1 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            5 Kg
          </button>
          <button
            type="button"
            className="py-1 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            1 Kg
          </button>
        </div>

        <button
          onClick={() => AddToCartHandler(latestProduct || { id, name, price, img })}
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-1 w-36 text-center me-2 mb-2"
        >
          Add to Cart
        </button>

        <div>
          <h1 className="text-2xl font-semibold">Description</h1>
          <p className="text-[15px] text-[#4b5563]">
            Sugar Loose 5 kg is a high-quality, pure granulated sugar perfect
            for all your sweetening needs. Ideal for baking, cooking, and
            beverages, it dissolves easily and enhances flavor. Packed in a 5 kg
            bag, it offers convenience for households and businesses. Free from
            additives, it ensures natural sweetness. Suitable for daily use in
            tea, coffee, desserts, and more. Store in a cool, dry place to
            maintain freshness. A versatile pantry staple for any kitchen.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailing
