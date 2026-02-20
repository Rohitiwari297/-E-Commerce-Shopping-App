import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetsils } from '../../redux/features/product/productSlice.js';
import { addToCartAPI, clearCartAPI, fetchCartAPI, updateCartQuantityAPI } from '../../redux/features/cart/cartSlice.js';

function FourthCard() {
  const dispatch = useDispatch();
  const prodData = useSelector((state) => state.prodData?.prodDetails?.products) || [];
  console.log('prodData', prodData);

  const cartItems = useSelector((state) => state.addToCartData?.items) || [];
  console.log('cartItems', cartItems);

  // OPTIMIZATION: Select ONLY the quantity for this specific product.
  // This ensures the component ONLY re-renders if THIS product's quantity changes.
  const getItemQuantity = (productId) => {
    const foundItem = cartItems.find((i) => i?.productId?._id === productId._id);
    return Number(foundItem?.quantity || 0);
  };

  /* FETCH PRODUCTS BY CATEGORY */
  useEffect(() => {
    dispatch(getProductDetsils());
  }, [dispatch]);

  // Addition and removal handlers
  const handleAddItems = async (item) => {
    //alert("Abhi tumhari haisiyat mujhe karidane ki nhi mere bachhe!")
    await dispatch(
      updateCartQuantityAPI({
        productId: item._id,
        quantity: getItemQuantity(item) + 1,
      }),
    );
  };

  const handleDeleteItems = async (item) => {
    if (getItemQuantity(item) === 1) {
      const id = item._id;
      await dispatch(
        clearCartAPI(id), /// clearCartAPI re-randering issue -> working on it [10-jan-25]
      );
      dispatch(fetchCartAPI());
    }
    await dispatch(
      updateCartQuantityAPI({
        productId: item._id,
        quantity: getItemQuantity(item) - 1,
      }),
    );
  };

  const handleAddToCart = async (item) => {
    await dispatch(
      addToCartAPI({
        productId: item._id,
        quantity: 1,
        //productDetails: item, // Pass full details for optimistic/manual population
      }),
    );
    dispatch(fetchCartAPI());
  };

  return (
    <div className=" ">
      {/* Title */}
      <h1 className="text-2xl md:text-xl lg:text-1.5rem font-semibold text-center mb-3 -mt-3">Purchase Product</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 justify-center items-center">
        {prodData.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Discount Badge */}
              <div className="relative">
                <span className="absolute top-1  left-1 bg-green-700 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md z-10">
                  off {item.discountPercentage}%
                </span>
                <div className="h-35 overflow-hidden relative">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${item.images[0]}`} // Use the first image URL from the array of imagesitem.images[0]}
                    alt={item.name}
                    className="w-full shadow-1xs  items-center object-contain  rounded-tr-md rounded-tl-md"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-2 flex flex-col justify-between  flex-grow">
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-xs font-medium mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-black">{item.description.replace(/<[^>]+>/g, '').slice(0, 30)}...</p>
                </div>
                <div className="flex flex-row items-start mt-1 justify-between">
                  <div>
                    <p className="text-sm font-bold text-green-800">₹ {item.currentPrice}</p>
                    <p className="text-[11px] text-gray-500 line-through">₹ {item.originalPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black font-semibold">Stock: {item.stock}</p>
                    <p className="text-[12px] text-yellow-700 ">Rating: {item.rating}</p>
                  </div>
                </div>

                {/* Add / Counter Buttons */}
                {getItemQuantity(item) > 0 ? (
                  <div className="mt-2 flex items-center justify-between border border-green-700 rounded-full px-2">
                    <button
                      onClick={() => handleDeleteItems(item)}
                      className="px-2 py-0.5 text-green-700 hover:bg-green-700 hover:text-white rounded-full text-sm"
                    >
                      -
                    </button>
                    <span className="px-2 text-sm">{getItemQuantity(item)}</span>
                    <button
                      onClick={() => handleAddItems(item)}
                      className="px-2 py-0.5 text-green-700 hover:bg-green-700 hover:text-white rounded-full text-sm"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 border border-green-700 text-green-700 rounded-full py-0.5 px-3 text-xs hover:bg-green-700 hover:text-white transition"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FourthCard;
