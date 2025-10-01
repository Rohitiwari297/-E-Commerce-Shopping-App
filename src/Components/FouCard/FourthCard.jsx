import React from "react";
import { useDispatch } from "react-redux";
import { addToForthCard } from "../../redux/features/forthCardSlicer";
import product from "../../data/data.js";



function FourthCard({ img }) {
  

  const dispatch = useDispatch()

  const addHandler = (item) => {
    console.log("item added", item)
    dispatch(addToForthCard(item))

  }



  return (
    <div className="bg-[#fff6d9] py-10 px-4 md:px-10">
      {/* Title */}
      <h2 className="text-2xl md:text-xl font-semibold text-center mb-8">
        Purchase Product
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 justify-center items-center">
        {product.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Discount Badge */}
            <div className="relative ml-6.5">
              <span className="absolute top-1 -ml-5 left-1 bg-green-700 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md">
                off {item.discountPercentage}%
              </span>
              <img
                src={item.thumbnail  }
                
                alt={item.name}
                className="w-[500px] h-40 shadow-1xs -ml-3 items-center  object-contain p-2"
              />
            </div>

            {/* Product Info */}
            <div className="p-2 flex flex-col justify-between flex-grow">
              <h3 className="text-xs font-medium mb-1 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-sm text-black">
                  {item.description.replace(/<[^>]+>/g, '').slice(0, 30)}...
                </p>
              <div className="flex flex-row items-start mt-1 justify-between">
                
                <div>
                  <p className="text-sm font-bold text-green-800">
                  ₹ {item.price}
                </p>
                <p className="text-[11px] text-gray-500 line-through">
                  ₹ {item.price + 100}
                </p>
                </div>
                <div>
                  <p className="text-sm text-black font-semibold">
                  Stock: {item.stock}
                </p>
                  <p className="text-[12px] text-yellow-700 ">
                  Rating: {item.rating}
                </p>
                </div>
                
              </div>
              <button onClick={() => addHandler(item)} className="mt-2 border border-green-700 text-green-700 rounded-full py-0.5 px-3 text-xs hover:bg-green-700 hover:text-white transition">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FourthCard;
