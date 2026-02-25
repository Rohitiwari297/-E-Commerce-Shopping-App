import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAPI, clearCartAPI, updateCartQuantityAPI, fetchCartAPI } from '../../redux/features/cart/cartSlice';
import { getGuestCart, setGuestCart } from '../../utils/guestCart';

function CategoryProduct({ cat }) {
    console.log('CategoryProduct RENDER:', cat._id, 'Images:', cat.images);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.user);
    const [guestCartVersion, setGuestCartVersion] = useState(0);

    const refreshGuestCart = () => {
      setGuestCartVersion((prev) => prev + 1);
    };

    // State to track selected variant
    const [selectedVariantId, setSelectedVariantId] = useState(cat?.variants?.[0]?._id);

    const handleVariantChange = (e) => {
      setSelectedVariantId(e.target.value);
    };

    // OPTIMIZATION: Select quantity for this specific product from Redux (logged-in) or guest cart
    const quantity = useSelector((state) => {
      const id = String(cat?._id);
      if (user) {
        const items = state.addToCartData?.items || [];
        const foundItem = items.find((i) => {
          const itemProdId = String(i?.productId?._id || i?.productId);
          if (itemProdId !== id) return false;
          
          if (selectedVariantId && i?.variants && i.variants.length > 0) {
            return i.variants.some(v => String(v?._id || v) === String(selectedVariantId));
          }
          
          return true;
        });
        return Number(foundItem?.quantity || 0);
      }
      
      const guest = getGuestCart() || [];
      const found = guest.find((i) => {
        if (String(i?._id) !== id) return false;
        if (selectedVariantId) {
          return String(i.selectedVariantId) === String(selectedVariantId);
        }
        return !i.selectedVariantId;
      });
      return Number(found?.quantity || 0);
    });

    const addToCartHandler = async (product) => {
      if (!user) {
        // Guest: add to localStorage
        const cart = getGuestCart();
        const existing = cart.find((i) => String(i._id) === String(product._id) && (!selectedVariantId || String(i.selectedVariantId) === String(selectedVariantId)));
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1, selectedVariantId });
        }
        setGuestCart(cart);
        refreshGuestCart();
        return;
      }
      // Logged-in: use API
      await dispatch(
        addToCartAPI({
          productId: product._id,
          quantity: 1,
          productDetails: product, // Pass full details for optimistic/manual population
          variantId: selectedVariantId,
        }),
      );
    };

    const increaseQuantity = async (product) => {
      if (!user) {
        const cart = getGuestCart();
        const existing = cart.find((i) => String(i._id) === String(product._id) && (!selectedVariantId || String(i.selectedVariantId) === String(selectedVariantId)));
        if (existing) {
          existing.quantity += 1;
          setGuestCart(cart);
          refreshGuestCart();
        }
        return;
      }
      await dispatch(
        updateCartQuantityAPI({
          productId: product._id,
          quantity: quantity + 1,
          variantId: selectedVariantId,
          productDetails: product,
        }),
      );
      dispatch(fetchCartAPI());
    };

    const handleDeleteItems = async (item) => {
      if (!user) {
        let cart = getGuestCart();
        const existing = cart.find((i) => String(i._id) === String(item._id) && (!selectedVariantId || String(i.selectedVariantId) === String(selectedVariantId)));
        if (!existing) return;
        if (existing.quantity <= 1) {
          cart = cart.filter((i) => !(String(i._id) === String(item._id) && (!selectedVariantId || String(i.selectedVariantId) === String(selectedVariantId))));
        } else {
          existing.quantity -= 1;
        }
        setGuestCart(cart);
        refreshGuestCart();
        return;
      }

      if (quantity <= 1) {
        await dispatch(clearCartAPI(item._id));
        await dispatch(fetchCartAPI());
        return;
      }
      await dispatch(
        updateCartQuantityAPI({
          productId: item._id,
          quantity: quantity - 1,
          variantId: selectedVariantId,
          productDetails: cat,
        }),
      );
      dispatch(fetchCartAPI());
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

            {/* Price & Variant Selection */}
            <div className="flex flex-col gap-2 mt-auto pt-2">
              <div className="flex items-center justify-between gap-2">
                {/* Price */}
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-green-600">
                    ₹{cat.variants?.find((v) => v._id === selectedVariantId)?.currentPrice || cat.currentPrice}
                  </p>
                  {cat.variants?.find((v) => v._id === selectedVariantId)?.originalPrice || cat.originalPrice ? (
                    <p className="text-[10px] line-through text-gray-400 leading-none">
                      ₹{cat.variants?.find((v) => v._id === selectedVariantId)?.originalPrice || cat.originalPrice}
                    </p>
                  ) : null}
                </div>

                {/* Variant Dropdown */}
                {cat.variants?.length > 0 && (
                  <div 
                    className="flex flex-col items-end gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <div className="relative min-w-[80px]">
                      <select
                        value={selectedVariantId}
                        onChange={handleVariantChange}
                        className="w-full text-[11px] font-medium bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-green-500 appearance-none cursor-pointer pr-5 hover:bg-white transition-colors"
                      >
                        {cat.variants.map((v) => (
                          <option key={v._id} value={v._id}>
                           {v.unit}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 pointer-events-none text-gray-400">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                    {/* Stock Indicator */}
                    <span className={`text-[10px] font-medium ${(cat.variants?.find(v => v._id === selectedVariantId)?.stock || 0) > 0 ? 'text-gray-400' : 'text-red-500'}`}>
                      {(cat.variants?.find(v => v._id === selectedVariantId)?.stock || 0) > 0 
                        ? `Stock: ${cat.variants?.find(v => v._id === selectedVariantId)?.stock}` 
                        : 'Out of Stock'}
                    </span>
                  </div>
                )}
              </div>
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
                disabled={(cat.variants?.find(v => v._id === selectedVariantId)?.stock || 0) <= quantity}
                className="px-2 py-1.5 bg-green-50 text-green-600 text-sm font-semibold rounded hover:bg-green-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCartHandler(cat)}
              disabled={(cat.variants?.find(v => v._id === selectedVariantId)?.stock || 0) === 0}
              className="w-full px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition duration-200 shadow-sm hover:shadow disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              type="button"
            >
              {(cat.variants?.find(v => v._id === selectedVariantId)?.stock || 0) === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    );
}

export default CategoryProduct;
