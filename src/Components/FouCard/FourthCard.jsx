import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetsils } from '../../redux/features/product/productSlice.js';
import { addToCartAPI, clearCartAPI, fetchCartAPI, updateCartQuantityAPI } from '../../redux/features/cart/cartSlice.js';

function FourthCard() {
  const baseUrl = import.meta.env.VITE_BASE_URL?.replace(/\/$/, '');
  const dispatch = useDispatch();
  const prodDetails = useSelector((state) => state.prodData?.prodDetails) || {};
  const prodData = prodDetails?.data || [];
  const loading = prodDetails?.loading || false;
  const error = prodDetails?.error || null;

  console.log('Full prodDetails:', prodDetails);
  console.log('Parsed prodData:', prodData);

  const cartItems = useSelector((state) => state.addToCartData?.items) || [];
  console.log('cartItems', cartItems);

  // OPTIMIZATION: Select ONLY the quantity for this specific product.
  // This ensures the component ONLY re-renders if THIS product's quantity changes.
  const getItemQuantity = (productOrId) => {
    const id = productOrId?._id || productOrId;
    const foundItem = cartItems.find((i) => i?.productId?._id === id);
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
    const currentQty = getItemQuantity(item);
    if (currentQty <= 1) {
      const id = item._id;
      await dispatch(clearCartAPI(id));
      await dispatch(fetchCartAPI());
      return;
    }
    await dispatch(
      updateCartQuantityAPI({
        productId: item._id,
        quantity: currentQty - 1,
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

  console.log('baseUrl', baseUrl);

  return (
    <div className=" ">
      {/* Title */}
      {/* <h1 className="text-2xl md:text-xl font-semibold text-center mb-4 -mt-2">Purchase Product</h1> */}

      {/* Loading State */}
      {loading && <div className="text-center py-8 text-gray-500">Loading products...</div>}

      {/* Error State */}
      {error && <div className="text-center py-8 text-red-500">Error loading products: {error}</div>}

      {/* Empty State */}
      {!loading && !error && prodData.length === 0 && <div className="text-center py-8 text-gray-500">No products available</div>}

      {/* Categories & Products Grid */}
      <div className="space-y-6">
        {prodData.map((categoryBlock) => {
          const categoryId = categoryBlock?.category?._id || categoryBlock?._id;
          const categoryName = categoryBlock?.category?.name || categoryBlock?.name || 'Category';
          const products = categoryBlock?.products || [];

          return (
            <section key={categoryId} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">{categoryName}</h2>
                <span className="text-sm text-gray-500">{products.length} items</span>
              </div>

              {products.length === 0 ? (
                <p className="text-gray-400 text-sm">No products in this category</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {products.map((product) => {
                    const qty = getItemQuantity(product);
                    const imageUrl = product?.images?.length > 0 ? `${baseUrl}/${product.images[0]}` : '';
                    // Limit description to 50 characters
                    const truncateDesc = (text, limit = 50) => {
                      if (!text) return '';
                      return text.length > limit ? text.substring(0, limit) + '...' : text;
                    };

                    return (
                      <article
                        key={product._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col h-full group"
                      >
                        {/* Image Container */}
                        <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden group-hover:opacity-95 transition-opacity">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400"
                            style={{ display: imageUrl ? 'none' : 'flex' }}
                          >
                            No Image
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 p-3 flex flex-col gap-2">
                          {/* Name */}
                          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>

                          {/* Description - Limited */}
                          {product.description && (
                            <p className="text-xs text-gray-500 line-clamp-1">{truncateDesc(product.description, 50)}</p>
                          )}

                          {/* Price & Unit */}
                          <div className="flex items-center justify-between mt-auto pt-2">
                            <div className="flex gap-1 items-center">
                              <p className="text-sm font-bold text-green-600">₹{product.currentPrice || '0'}</p>
                              {product.originalPrice && <p className="text-xs line-through text-gray-400">₹{product.originalPrice}</p>}
                            </div>
                            {product.unit && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.unit}</span>}
                          </div>
                        </div>

                        {/* Add to Cart / Quantity Controls */}
                        <div className="p-3 border-t border-gray-100">
                          {qty > 0 ? (
                            <div className="flex items-center justify-between gap-1">
                              <button
                                onClick={() => handleDeleteItems(product)}
                                className="px-2 py-1.5 bg-red-50 text-red-600 text-sm font-semibold rounded hover:bg-red-100 transition"
                              >
                                −
                              </button>
                              <span className="flex-1 text-center font-bold text-gray-700">{qty}</span>
                              <button
                                onClick={() => handleAddItems(product)}
                                className="px-2 py-1.5 bg-green-50 text-green-600 text-sm font-semibold rounded hover:bg-green-100 transition"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition duration-200 shadow-sm hover:shadow"
                            >
                              Add to cart
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default FourthCard;
