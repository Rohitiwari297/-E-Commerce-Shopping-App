import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetsils } from '../../redux/features/product/productSlice.js';
import { addToCartAPI, clearCartAPI, fetchCartAPI, updateCartQuantityAPI } from '../../redux/features/cart/cartSlice.js';
import { getGuestCart, setGuestCart } from '../../utils/guestCart.js';
import { Link } from 'react-router-dom';

function FourthCard() {
  const baseUrl = import.meta.env.VITE_BASE_URL?.replace(/\/$/, '');
  const dispatch = useDispatch();
  const prodDetails = useSelector((state) => state.prodData?.prodDetails) || {};
  const prodData = prodDetails?.data || [];
  const loading = prodDetails?.loading || false;
  const error = prodDetails?.error || null;

  console.log('Full prodDetails:', prodDetails);
  console.log('Parsed prodData:', prodData);

  const user = useSelector((state) => state.auth?.user);
  console.log('user', user);

  // GET LOCALSTORAGE CART
  const guestCart = getGuestCart();
  console.log('guestCart', guestCart);
  const [guestCartVersion, setGuestCartVersion] = React.useState(0);

  const refreshGuestCart = () => {
    setGuestCartVersion((prev) => prev + 1);
  };

  const cartItems = useSelector((state) => state.addToCartData?.items) || [];
  console.log('cartItems', cartItems);

  // State to track selected variant for each product
  const [selectedVariants, setSelectedVariants] = React.useState({});

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  // OPTIMIZATION: Select ONLY the quantity for this specific product.
  const getItemQuantity = (productOrId) => {
    const id = String(productOrId?._id || productOrId);
    const variants = productOrId?.variants || [];
    const selectedVariantId = selectedVariants[id] || (variants.length > 0 ? variants[0]._id : null);

    if (user) {
      const foundItem = cartItems.find((i) => {
        const itemProdId = String(i?.productId?._id || i?.productId);
        if (itemProdId !== id) return false;
        
        if (selectedVariantId && i.variants && i.variants.length > 0) {
          return i.variants.some(v => String(v?._id || v) === String(selectedVariantId));
        }
        
        return true;
      });
      return Number(foundItem?.quantity || 0);
    }

    try {
      const guest = getGuestCart() || [];
      const found = guest.find((i) => {
        if (String(i?._id) !== id) return false;
        if (selectedVariantId) {
          return String(i.selectedVariantId) === String(selectedVariantId);
        }
        return !i.selectedVariantId;
      });
      return Number(found?.quantity || 0);
    } catch (err) {
      return 0;
    }
  };

  /* FETCH PRODUCTS BY CATEGORY */
  useEffect(() => {
    dispatch(getProductDetsils());
  }, [dispatch]);

  // Addition and removal handlers
  const handleAddItems = async (item) => {
    const selectedVariantId = selectedVariants[item._id] || (item?.variants?.length > 0 ? item.variants[0]._id : null);
    if (!user) {
      const cart = getGuestCart();
      const existing = cart.find((i) => String(i._id) === String(item._id) && (!selectedVariantId || String(i.selectedVariantId) === String(selectedVariantId)));

      if (existing) {
        existing.quantity += 1;
        setGuestCart(cart);
        refreshGuestCart();
      }
      return;
    }

    await dispatch(
      updateCartQuantityAPI({
        productId: item._id,
        quantity: getItemQuantity(item) + 1,
        variants: selectedVariantId ? [selectedVariantId] : [],
        productDetails: item
      }),
    );
    dispatch(fetchCartAPI());
  };

  const handleDeleteItems = async (item) => {
    const selectedVariantId = selectedVariants[item._id] || (item?.variants?.length > 0 ? item.variants[0]._id : null);
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

    const currentQty = getItemQuantity(item);

    if (currentQty <= 1) {
      await dispatch(clearCartAPI(item._id));
      await dispatch(fetchCartAPI());
      return;
    }

    await dispatch(
      updateCartQuantityAPI({
        productId: item._id,
        quantity: currentQty - 1,
        variants: selectedVariantId ? [selectedVariantId] : [],
        productDetails: item
      }),
    );
    dispatch(fetchCartAPI());
  };

  const handleAddToCart = async (item) => {
    const selectedVariantId = selectedVariants[item._id] || (item?.variants?.length > 0 ? item.variants[0]._id : null);
    if (!user) {
      const cart = getGuestCart();
      const existing = cart.find((i) => String(i._id) === String(item._id) && (!selectedVariantId || String(i.selectedVariantId) === String(selectedVariantId)));

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1, selectedVariantId });
      }

      setGuestCart(cart);
      refreshGuestCart();
      return;
    }

    await dispatch(
      addToCartAPI({
        productId: item._id,
        quantity: 1,
        variants: selectedVariantId ? [selectedVariantId] : [],
        productDetails: item
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
                            <Link to={`/category/itemDetails`} state={{ homeProduct: product }}>
                              <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            </Link>
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

                          {/* Price & Variant Selection */}
                          <div className="flex flex-col gap-2 mt-auto pt-2">
                            <div className="flex items-center justify-between gap-2">
                              {/* Price */}
                              <div className="flex flex-col">
                                <p className="text-sm font-bold text-green-600">
                                  ₹{product?.variants?.find(v => v._id === (selectedVariants[product._id] || product.variants[0]._id))?.price || product.currentPrice || '0'}
                                </p>
                                {product.originalPrice && <p className="text-[10px] line-through text-gray-400 leading-none">₹{product.originalPrice}</p>}
                              </div>

                              {/* Variant Dropdown */}
                              {product?.variants?.length > 0 && (
                                <div className="flex flex-col items-end gap-1">
                                  <div className="relative min-w-[80px]">
                                    <select
                                      value={selectedVariants[product._id] || product.variants[0]._id}
                                      onChange={(e) => handleVariantChange(product._id, e.target.value)}
                                      className="w-full text-[11px] font-medium bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-green-500 appearance-none cursor-pointer pr-5 hover:bg-white transition-colors"
                                    >
                                      {product.variants.map((variant) => (
                                        <option key={variant._id} value={variant._id}>
                                          {variant.unit}
                                        </option>
                                      ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 pointer-events-none text-gray-400">
                                      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                  </div>
                                  {/* Stock Indicator */}
                                  <span className={`text-[10px] font-medium ${(product?.variants?.find(v => v._id === (selectedVariants[product._id] || product.variants[0]._id))?.stock || 0) > 0 ? 'text-gray-400' : 'text-red-500'}`}>
                                    {(product?.variants?.find(v => v._id === (selectedVariants[product._id] || product.variants[0]._id))?.stock || 0) > 0 
                                      ? `Stock: ${product?.variants?.find(v => v._id === (selectedVariants[product._id] || product.variants[0]._id))?.stock}` 
                                      : 'Out of Stock'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Add to Cart / Quantity Controls */}
                        <div className="p-3 border-t border-gray-100 bg-gray-50">
                          {/* Guest Badge */}

                          {qty > 0 ? (
                            <div className="flex flex-col gap-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
                                <button
                                  onClick={() => {
                                    handleDeleteItems(product);
                                    if (!user) refreshGuestCart();
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 transition active:scale-90"
                                >
                                  −
                                </button>

                                <span className="flex-1 text-center font-semibold text-gray-800">{qty}</span>

                                <button
                                  onClick={() => {
                                    handleAddItems(product);
                                    if (!user) refreshGuestCart();
                                  }}
                                  disabled={(product?.variants?.find(v => v._id === (selectedVariants[product._id] || product.variants[0]._id))?.stock || 0) <= qty}
                                  className={`w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed`}
                                >
                                  +
                                </button>
                              </div>

                              {/* Login Reminder */}
                              {!user && <p className="text-[10px] text-center text-gray-400">Login to save this cart permanently</p>}
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                handleAddToCart(product);
                                if (!user) refreshGuestCart();
                              }}
                              disabled={(product?.variants?.find(v => v._id === (selectedVariants[product._id] || product.variants[0]._id))?.stock || 0) === 0}
                              className={`w-full px-3 py-2 text-sm font-semibold rounded-md transition duration-200 shadow-sm active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
                                ${user ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                            >
                              {(product?.variants?.find(v => v._id === (selectedVariants[product._id] || product.variants[0]._id))?.stock || 0) === 0 ? 'Out of Stock' : 'Add to Cart'}
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
