import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGuestCart, setGuestCart } from "../utils/guestCart";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { BaseURI } from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAPI,
  fetchCartAPI,
  updateCartQuantityAPI,
  clearCartAPI,
} from "../redux/features/cart/cartSlice.js";

function ProductDetailing() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * ALL STATES VARIABLE DECLARATION AND INITIALIZATION HERE
   */
  const [guestCartVersion, setGuestCartVersion] = React.useState(0);

  // Product received from navigation
  const catData = location.state?.homeProduct || location.state?.catData;

  // Selected variant state
  const [selectedVariantId, setSelectedVariantId] = React.useState(catData?.variants?.[0]?._id);

  const handleVariantChange = (e) => {
    setSelectedVariantId(e.target.value);
  };
  
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  console.log("catData", catData);

  // Fetch cart on mount to ensure we have latest state
  useEffect(() => {
    dispatch(fetchCartAPI());
  }, [dispatch]);

  /**
   * IMPLEMENTING ADD TO CART FUNCTIONALITY
   * AFTER CLICKING THE ADD TO CART BUTTON, GETTING THE DATA FROM THE STORE FOR THE UPDATED BUTTON UI
   */
  const user = useSelector((state) => state.auth.user);
  const additionHander = async () => {
    if (!user) {
      const cart = getGuestCart();
      const existing = cart.find((i) => i._id === catData._id && (!selectedVariantId || i.selectedVariantId === selectedVariantId));

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...catData, quantity: 1, selectedVariantId });
      }

      setGuestCart(cart);
      // Trigger a re-render
      setGuestCartVersion(v => v + 1);
      return;
    }

    await dispatch(
      addToCartAPI({
        productId: catData._id,
        quantity: 1,
        variantId: selectedVariantId,
        productDetails: catData, // Pass details for immediate UI update
      })
    );
    dispatch(fetchCartAPI());
  };

  // select data from cartSlicer
  const cart = useSelector((state) => state.addToCartData);
  const { items = [] } = cart;
  
  // Reactive quantity and cart status
  const currentQuantity = React.useMemo(() => {
    const id = catData?._id;
    if (user) {
      const item = items.find((item) => {
        const itemProdId = String(item.productId?._id || item.productId);
        if (itemProdId !== String(id)) return false;
        
        // Match selectedVariantId if it exists
        if (selectedVariantId && item.variants && item.variants.length > 0) {
          return item.variants.some(v => String(v?._id || v) === String(selectedVariantId));
        }
        
        // If no variant specified or matching failed, fallback to product match
        // to ensure the toggle at least happens for some variant
        return true; 
      });
      return item?.quantity || 0;
    }
 else {
      const gCart = getGuestCart();
      const item = gCart.find(i => {
        if (i?._id !== id) return false;
        if (selectedVariantId) {
          return i.selectedVariantId === selectedVariantId;
        }
        return !i.selectedVariantId;
      });
      return item?.quantity || 0;
    }
  }, [items, catData?._id, selectedVariantId, user, guestCartVersion]);

  const isInCart = currentQuantity > 0;

  /**
   * ALL FUNCTION DECLARATION HERE
   */
  const handleAddItems = async (catData) => {
    if (!user) {
      const cart = getGuestCart();
      const existing = cart.find((i) => i._id === catData._id && (!selectedVariantId || i.selectedVariantId === selectedVariantId));
      if (existing) {
        existing.quantity += 1;
        setGuestCart(cart);
        setGuestCartVersion(v => v + 1);
      }
      return;
    }

    const item = items.find((i) => {
      const itemProdId = String(i.productId?._id || i.productId);
      if (itemProdId !== String(catData._id)) return false;
      
      if (selectedVariantId && i.variants && i.variants.length > 0) {
        return i.variants.some(v => String(v?._id || v) === String(selectedVariantId));
      }
      return true;
    });

    if (!item) return;

    const newQty = item.quantity + 1;

    await dispatch(
      updateCartQuantityAPI({
        productId: catData._id,
        quantity: String(newQty),
        variantId: selectedVariantId,
        productDetails: catData,
      })
    );

    dispatch(fetchCartAPI());
  };

  const handleRemoveItems = async (catData) => {
    if (!user) {
      const cart = getGuestCart();
      const existing = cart.find((i) => String(i._id) === String(catData._id) && (!selectedVariantId || String(i.selectedVariantId) === String(selectedVariantId)));
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          const index = cart.indexOf(existing);
          cart.splice(index, 1);
        }
        setGuestCart(cart);
        setGuestCartVersion(v => v + 1);
      }
      return;
    }

    const item = items.find((i) => {
      const itemProdId = String(i.productId?._id || i.productId);
      if (itemProdId !== String(catData._id)) return false;
      
      if (selectedVariantId && i.variants && i.variants.length > 0) {
        return i.variants.some(v => String(v?._id || v) === String(selectedVariantId));
      }
      return true;
    });

    if (!item) return;

    const newQty = item.quantity - 1;

    if (newQty > 0) {
      await dispatch(
        updateCartQuantityAPI({
          productId: catData._id,
          quantity: String(newQty),
          variantId: selectedVariantId,
          productDetails: catData,
        })
      );
    } else {
      await dispatch(clearCartAPI(catData._id));
    }

    dispatch(fetchCartAPI());
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-6">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-6">
        {/* Breadcrumb / Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors group"
          >
            <span className="p-1.5 bg-white rounded-full shadow-sm group-hover:shadow-md group-hover:bg-green-50 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="font-bold text-xs">Back</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 p-4 md:p-8 bg-white border-r border-gray-50">
              <div className="sticky top-6">
                <div className="relative group">
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#16a34a",
                      "--swiper-pagination-color": "#16a34a",
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    className="rounded-2xl overflow-hidden aspect-square md:h-[380px] mb-3"
                  >
                    {(catData.images || []).map((img, index) => (
                      <SwiperSlide key={index} className="flex items-center justify-center bg-white">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${img}` || img}
                          alt={catData.name}
                          className="w-full h-full object-contain"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Thumbnails Swiper */}
                <div className="px-1">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={false}
                    spaceBetween={8}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    breakpoints={{
                        640: { slidesPerView: 6 },
                        1024: { slidesPerView: 6 }
                    }}
                    className="thumbnail-swiper swiper-thumbs"
                  >
                    {(catData.images || []).map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="aspect-square rounded-lg border-2 border-transparent hover:border-green-500 cursor-pointer overflow-hidden bg-gray-50 transition-all shadow-sm">
                                <img
                                    src={`${import.meta.env.VITE_BASE_URL}${img}` || img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-contain p-1"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="lg:col-span-6 p-4 md:p-8 bg-white flex flex-col h-full">
              <div className="flex-1">
                {/* Brand / Category Badge */}
                <div className="mb-3">
                  <span className="bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                    Premium Quality
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
                  {catData.name}
                </h1>

                {/* Price & Variant Section */}
                <div className="bg-gray-50/50 rounded-2xl p-5 mb-6 border border-gray-100">
                  <div className="flex flex-wrap items-end gap-5 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Our Price</span>
                      <div className="flex items-center gap-2.5">
                        <p className="text-3xl font-black text-green-600">
                          ₹{catData.variants?.find(v => v._id === selectedVariantId)?.currentPrice || catData.currentPrice}
                        </p>
                        {(() => {
                          const selectedVariant = catData.variants?.find(v => v._id === selectedVariantId);
                          const currentOriginalPrice = selectedVariant?.originalPrice || catData.originalPrice;
                          const currentPrice = selectedVariant?.currentPrice || catData.currentPrice;
                          
                          if (!currentOriginalPrice) return null;
                          
                          return (
                            <div className="flex flex-col">
                              <p className="text-sm line-through text-gray-400 decoration-red-400/40">
                                ₹{currentOriginalPrice}
                              </p>
                              {currentOriginalPrice > currentPrice && (
                                <span className="text-[9px] font-black text-orange-500">
                                  Save ₹{currentOriginalPrice - currentPrice}
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {catData.variants?.length > 0 && (
                      <div className="flex flex-col border-l border-gray-200 pl-5">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Quantity / Pack</span>
                        <div className="relative min-w-[120px]">
                          <select
                            value={selectedVariantId}
                            onChange={handleVariantChange}
                            className="w-full bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-gray-700 shadow-sm hover:border-green-500 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none appearance-none cursor-pointer transition-all"
                          >
                            {catData.variants.map((v) => (
                                <option key={v._id} value={v._id}>
                                  {v.unit}
                                </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-green-600">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stock Level */}
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${(catData.variants?.find(v => v._id === selectedVariantId)?.stock || 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-[10px] font-bold tracking-tight ${(catData.variants?.find(v => v._id === selectedVariantId)?.stock || 0) > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {(catData.variants?.find(v => v._id === selectedVariantId)?.stock || 0) > 0 
                        ? `${catData.variants?.find(v => v._id === selectedVariantId)?.stock} items remaining`
                        : 'Currently Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-6">
                  <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2 border-b-2 border-green-500 inline-block">Overview</h3>
                  <p className="text-gray-600 text-[13px] leading-relaxed font-medium">
                    {catData.description === "No Description"
                      ? "This premium product is carefully sourced to ensure the highest quality. Perfect for daily use."
                      : catData.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  {isInCart ? (
                    <div className="flex-1 flex items-center justify-between bg-white border-2 border-green-600 p-1 rounded-xl shadow-md transition-all">
                      <button
                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 active:scale-95 transition-all text-xl font-bold"
                        onClick={() => handleRemoveItems(catData)}
                      >
                        −
                      </button>
                      
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-green-600 uppercase">In Cart</span>
                        <span className="text-lg font-black text-gray-900">
                          {currentQuantity}
                        </span>
                      </div>

                      <button
                        disabled={(() => {
                          const currentStock = catData.variants?.find(v => v._id === selectedVariantId)?.stock || 0;
                          return currentQuantity >= currentStock;
                        })()}
                        className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 active:scale-95 transition-all text-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={() => handleAddItems(catData)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={
                        catData.variants?.length > 0 
                          ? (catData.variants.find(v => v._id === selectedVariantId)?.stock || 0) === 0
                          : (catData.stock || 0) === 0
                      }
                      className="flex-1 py-3.5 bg-green-600 hover:bg-green-700 text-white font-black text-base rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                      onClick={() => additionHander(catData)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {
                        (catData.variants?.length > 0 
                          ? (catData.variants.find(v => v._id === selectedVariantId)?.stock || 0)
                          : (catData.stock || 0)) === 0 
                          ? 'NOT AVAILABLE' 
                          : 'ADD TO CART'
                      }
                    </button>
                  )}
                </div>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-50">
                <div className="flex flex-col items-center text-center p-2 bg-blue-50/40 rounded-xl">
                  <img className="w-5 mb-1" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/10_minute_delivery.png" alt="" />
                  <h4 className="text-[8px] font-black text-blue-900 uppercase">Fast Delivery</h4>
                </div>

                <div className="flex flex-col items-center text-center p-2 bg-orange-50/40 rounded-xl">
                  <img className="w-5 mb-1" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=160/assets/web/blinkit-promises/Best_Prices_Offers.png" alt="" />
                  <h4 className="text-[8px] font-black text-orange-900 uppercase">Best Price</h4>
                </div>

                <div className="flex flex-col items-center text-center p-2 bg-green-50/40 rounded-xl">
                  <img className="w-5 mb-1" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Wide_Assortment.png" alt="" />
                  <h4 className="text-[8px] font-black text-green-900 uppercase">Fresh Items</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS PLACEHOLDER */}
        {/* 
        <div className="mt-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">People also bought</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            Related products items here
          </div>
        </div> 
        */}
      </section>
    </div>
  );
}

export default ProductDetailing;
