import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCartAPI,
  updateCartQuantityAPI,
} from "../../redux/features/cart/cartSlice";

const CategoryProduct = React.memo(({ cat }) => {
  console.log("CategoryProduct RENDER:", cat._id, "Images:", cat.images);
  const dispatch = useDispatch();

  // OPTIMIZATION: Select ONLY the quantity for this specific product.
  // This ensures the component ONLY re-renders if THIS product's quantity changes.
  const quantity = useSelector((state) => {
    const items = state.addToCartData?.items || [];
    const foundItem = items.find((i) => {
      const productId = i?.productId?._id || i?.productId;
      return productId === cat._id;
    });
    return Number(foundItem?.quantity || 0);
  });

  const addToCartHandler = async (product) => {
    await dispatch(
      addToCartAPI({
        productId: product._id,
        quantity: 1,
        productDetails: product, // Pass full details for optimistic/manual population
      })
    );
  };

  const increaseQuantity = async (product) => {
    await dispatch(
      updateCartQuantityAPI({
        productId: product._id,
        quantity: quantity + 1,
      })
    );
  };

  const decreaseQuantity = async (product) => {
    await dispatch(
      updateCartQuantityAPI({
        productId: product._id,
        quantity: String(quantity - 1),
      })
    );
  };

  return (
    <div className="flex flex-col hover:scale-105 justify-between items-center border rounded-2xl shadow-md hover:shadow-lg transition w-full h-auto min-h-60 p-3">
      <Link to={`/category/itemDetails`} state={{ catData: cat }}>
      <div className="flex justify-center items-center text-center w-full">

          <img
            src={`${import.meta.env.VITE_BASE_URL}${cat.images?.[0]}`}
            alt="product-img"
            className="object-contain h-30 items-center rounded-t-sm"
          />
      </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm mt-2 font-semibold">{cat.name}</p>
          <p className="text-center text-gray-800 text-[12px]">
            {cat.description}
          </p>
        </div>
        <div className="w-full flex space-x-2 justify-center items-center">
          <p className="mt-2 text-center font-medium text-[15px] text-green-900">
            Rs.{cat.currentPrice}
          </p>
          <p className="mt-2 text-center font-medium text-[12px] text-gray-600 line-through">
            Rs.{cat.originalPrice}
          </p>
        </div>
      </Link>

      {/* Add/Remove Buttons */}
      {quantity > 0 ? (
        <div className="flex justify-between border  border-gray-300 rounded w-full   ">
          <button
            onClick={() => decreaseQuantity(cat)}
            className="px-2 text-gray-500 text-xl"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => increaseQuantity(cat)}
            className="px-2 text-gray-500 text-xl   "
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCartHandler(cat)}
          className="w-full hover:bg-green-800 cursor-pointer h-auto p-2 bg-green-700 border rounded-xl text-white font-semibold text-sm mt-3"
          type="button"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}, (prevProps, nextProps) => prevProps.cat._id === nextProps.cat._id);

export default CategoryProduct;
