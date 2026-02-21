import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAPI, clearCartAPI, updateCartQuantityAPI } from '../../redux/features/cart/cartSlice';

const CategoryProduct = React.memo(
  ({ cat }) => {
    console.log('CategoryProduct RENDER:', cat._id, 'Images:', cat.images);
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
        }),
      );
    };

    const increaseQuantity = async (product) => {
      await dispatch(
        updateCartQuantityAPI({
          productId: product._id,
          quantity: quantity + 1,
        }),
      );
    };

    const handleDeleteItems = async (item) => {
      //const currentQty = getItemQuantity(item);
      if (quantity <= 1) {
        const id = item._id;
        await dispatch(clearCartAPI(id));
        await dispatch(fetchCartAPI());
        return;
      }
      await dispatch(
        updateCartQuantityAPI({
          productId: item._id,
          quantity: quantity - 1,
        }),
      );
    };

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col h-full group">
        <Link to={`/category/itemDetails`} state={{ catData: cat }} className="flex flex-col flex-1">
          {/* Image Container */}
          <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden group-hover:opacity-95 transition-opacity">
            <img
              src={`${import.meta.env.VITE_BASE_URL}${cat.images?.[0]}`}
              alt="product-img"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 p-3 flex flex-col gap-2">
            {/* Name */}
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{cat.name}</h3>

            {/* Description */}
            {cat.description && <p className="text-xs text-gray-500 line-clamp-1">{cat.description}</p>}

            {/* Price & Unit */}
            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex gap-1 items-center">
                <p className="text-sm font-bold text-green-600">₹{cat.currentPrice}</p>
                {cat.originalPrice && <p className="text-xs line-through text-gray-400">₹{cat.originalPrice}</p>}
              </div>

              {cat.unit && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{cat.unit}</span>}
            </div>
          </div>
        </Link>

        {/* Add/Remove Buttons */}
        <div className="p-3 border-t border-gray-100">
          {quantity > 0 ? (
            <div className="flex items-center justify-between gap-1">
              <button
                onClick={() => handleDeleteItems(cat)}
                className="px-2 py-1.5 bg-red-50 text-red-600 text-sm font-semibold rounded hover:bg-red-100 transition"
              >
                −
              </button>

              <span className="flex-1 text-center font-bold text-gray-700">{quantity}</span>

              <button
                onClick={() => increaseQuantity(cat)}
                className="px-2 py-1.5 bg-green-50 text-green-600 text-sm font-semibold rounded hover:bg-green-100 transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCartHandler(cat)}
              className="w-full px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition duration-200 shadow-sm hover:shadow"
              type="button"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.cat._id === nextProps.cat._id,
);

export default CategoryProduct;
