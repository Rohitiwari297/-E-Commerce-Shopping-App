import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BaseURI } from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAPI,
  clearCartAPI,
  fetchCartAPI,
  updateCartQuantityAPI,
} from "../redux/features/cart/cartSlice.js";

function ProductDetailing() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * ALL STATES VARIABLE DECLARATION AND INITIALIZATION HERE
   */
  // state variable to handle the button UI
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  // Product received from navigation
  const { catData } = location.state;
  console.log("catData", catData);

  /**
   * IMPLEMENTING ADD TO CART FUNCTIONALITY
   * AFTER CLICKING THE ADD TO CART BUTTON, GETTING THE DATA FROM THE STORE FOR THE UPDATED BUTTON UI
   */
  const user = useSelector((state) => state.auth.user);
  const additionHander = (cartData) => {
    if (!user) {
      navigate("/login");
      return;
    }
    // console.log("cartData", cartData);
    // console.log("cartData", cartData._id);
    dispatch(
      addToCartAPI({
        productId: catData._id,
        quantity: 1,
      })
    );
    alert("Product added to cart!");
    dispatch(fetchCartAPI()); // refresh the cart
  };

  // select data from cartSlicer
  const cart = useSelector((state) => state.addToCartData);
  const { items = [] } = cart;
  console.log("cart from redux", cart);

  // check if the product is already in the cart
  useEffect(() => {
    if (!cart?.items || !catData?._id) return;

    const isInCart = cart.items.some(
      (item) => item.productId?._id === catData._id
    );

    setIsAddedToCart(isInCart);
  }, [cart?.items, catData?._id]);

  console.log("isAddedToCart", isAddedToCart);

  /**
   * ALL FUNCTION DECLARATION HERE
   */
  const handleAddItems = async (catData) => {
    const item = items.find((i) => i.productId?._id === catData._id);

    if (!item) return;

    const newQty = item.quantity + 1;

    await dispatch(
      updateCartQuantityAPI({
        productId: catData._id,
        quantity: String(newQty),
      })
    );

    dispatch(fetchCartAPI());
    alert("Product added from cart!");
  };

  const handleRemoveItems = async (catData) => {
    const item = items.find((i) => i.productId?._id === catData._id);

    if (!item) return;

    const newQty = item.quantity - 1;

    if (newQty > 0) {
      return dispatch(
        clearCartAPI({
          productId: catData._id,
          quantity: String(0),
        })
      )
    };

    await dispatch(
      updateCartQuantityAPI({
        productId: catData._id,
        quantity: String(newQty),
      })
    );

    dispatch(fetchCartAPI());
    alert("Product removed from cart!");
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">
        {/* Product Images Swiper */}
        <div className="flex flex-col justify-between">
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="rounded-xl "
            >
              {(catData.images || []).map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${img}` || img}
                    alt={catData.name}
                    className="w-full h-[400px] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className=" shadow-gray-400 rounded-2xl shadow p-5 mt-2">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="rounded-xl"
              slidesPerView={6}
            >
              {(catData.images || []).map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${img}` || img}
                    alt={catData.name}
                    className="w-full h-[80px] rounded-2xl object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{catData.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-semibold text-green-700">
                ₹ {catData.currentPrice}
              </p>

              {catData.originalPrice && (
                <p className="line-through text-gray-400">
                  ₹ {catData.originalPrice}
                </p>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-6">
              {catData.description === "No Description"
                ? "Product description content is marketing copy explaining what a product is, its features, and why a customer should buy it, blending benefits, specifications (size, material, color), brand voice, and sensory language to help shoppers visualize use, solve problems, and drive sales, often using bullet points for scannability and SEO for visibility. "
                : catData.description}
            </p>

            <div className="flex gap-4">
              {isAddedToCart === true ? (
                //buttons for increment and decrement
                <div className="flex gap-4 border border-gray-200 p-2 rounded-2xl shadow-green-500">
                  <button
                    className="px-4  bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    onClick={() => handleRemoveItems(catData)}
                  >
                    -
                  </button>
                  {/* total count of selected product */}
                  <p className="text-[14px] font-semibold">
                    {items.find((item) => item.productId?._id === catData._id)
                      ?.quantity || 0}
                  </p>

                  <button
                    className="px-4  bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    onClick={() => handleAddItems(catData)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  onClick={() => additionHander(catData)}
                >
                  Add to Cart
                </button>
              )}

              <button
                onClick={() => navigate(-1)}
                className="px-4 -py-2  bg-gray-200 hover:bg-gray-300 rounded-2xl"
              >
                ←
              </button>
            </div>
          </div>
          <div className="w-full h-full  mt-[24px] px-5  ">
            <h1 className=" text-[14px] font-semibold pb-2">
              why Shop from Baniya Di hatti
            </h1>
            <div className="flex gap-4 justify-center items-center">
              <div>
                <img
                  className="w-[80%]"
                  src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/10_minute_delivery.png"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-[14px] font-semibold">
                  Superfast Delivery
                </h1>
                <h5 className="text-[14px]">
                  Get your order delivered to your doorstep at the earliest from
                  dark stores near you.
                </h5>
              </div>
            </div>
            <div className="flex gap-8 justify-center items-center">
              <div>
                <img
                  className=""
                  src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=160/assets/web/blinkit-promises/Best_Prices_Offers.png"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-[14px] font-semibold">
                  Best Prices & Offers
                </h1>
                <h5 className="text-[14px]">
                  Best price destination with offers directly from the
                  manufacturers. genuine products Wide Assortment Choose from
                  5000+ products across food, personal care, household & other
                  categories.
                </h5>
              </div>
            </div>
            <div className="flex gap-5 justify-center items-center">
              <div>
                <img
                  className="w-[80%]"
                  src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Wide_Assortment.png"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-[14px] font-semibold">Wide Assortment</h1>
                <h5 className="text-[14px]">
                  Choose from 5000+ products across food, personal care,
                  household & other categories.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailing;
