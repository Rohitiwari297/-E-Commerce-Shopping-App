import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddressModalPage from "../AddressModalPage "; // import the AddressModalPage component
import { MdCreditCard, MdLocationOn, MdPayments } from "react-icons/md";
import {
  fetchCartAPI,
  updateCartQuantityAPI,
} from "../../redux/features/cart/cartSlice";
import CartItem from "./CartItem";
import { getAddress, placeOrder } from "../../utils/Apis";
import toast from "react-hot-toast";

function CartPage() {
  /**
   *
   * UTILITIES INSTANCES
   * ==================================
   *
   */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   *
   * FETCHING ADDRESS FROM API
   * ================================
   */
  const [address, setAddress] = useState([]);
  useEffect(() => {
    getAddress(setAddress);
  }, []);

  /**
   *
   * SELECTED ADDRESS
   * ================================
   */
  const [selectedAddress, setSelectedAddress] = useState(null);

  /**
   *
   * MODAL STATE FOR ADDRESS
   * ================================
   *
   */
  const [openAddressModal, setOpenAddressModal] = useState(false);

  /**
   *
   * FETCHING DATA FROM REDUX OF CART
   * ================================
   *
   */
  const {
    items = [],
    totalItems,
    totalPrice,
  } = useSelector((state) => state.addToCartData);
  console.log("Redux cart:", items, totalPrice);
  // total discount
  const totalDiscount = items
    .map((i) => i?.productId?.originalPrice)
    .reduce((total, item) => total + item, 0);
  console.log("totalDiscount", totalDiscount);

  /**
   *
   * FETCHING DATA FROM REDUX OF USER
   * ================================
   *
   */
  const { user } = useSelector((state) => state.auth);
  console.log("Redux user:", user);

  // inside CartPage...

  // REMOVING broken/redundant handlers since they are moved to CartItem
  // and handleRemove was using undefined setCartData.

  /**
   *
   * HANDLER FOR SELECTED ADDRESS
   * ============================
   */
  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("selectedAddress");
    if (savedAddress) {
      setSelectedAddress(JSON.parse(savedAddress));
    }
  }, []);

  /**
   *
   * STATE FOR PAYMENT METHOD
   * ================================
   *
   */
  const [paymentMethod, setPaymentMethod] = useState(null);

  /**
   *
   * HANDLER FOR PAYMENT METHOD
   * ============================
   *
   */
  const handleSelectedPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  console.log("paymentMethod", paymentMethod);

  /**
   *
   * HANDLER FOR PLACE ORDER
   * ============================
   *
   */
  const handlePlaceOrder = async () => {
    if (user) {
      // navigate("/paymentPage");
      // setOpenAddressModal(true);
      if (selectedAddress === null || paymentMethod === null) {
        toast.error("Please select address and payment method");
      } else {
        await placeOrder(selectedAddress, paymentMethod);
        dispatch(fetchCartAPI());
        return navigate("/delivery/history");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {items.length === 0 ? (
        /* EMPTY CART UI */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-green-100">
            <MdPayments size={40} className="text-green-700" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        /* CART WITH ITEMS */
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <CartItem key={item?.productId?._id || item.id} item={item} />
            ))}
          </div>

          {/* Price Details */}
          <div className="w-full lg:w-1/3 p-4 border rounded-md bg-white">
            <div className="p-4 border rounded-md bg-white mb-2">
              <div className="flex items-center justify-between">
                <p className="text-red-600 font-semibold text-sm">
                  Delivery Address
                </p>
                <button
                  onClick={() => setOpenAddressModal(true)}
                  className="bg-green-700 text-white px-3 py-1 text-xs rounded font-semibold hover:bg-green-800"
                >
                  Select Address
                </button>
              </div>

              {selectedAddress ? (
                <div className="text-xs mt-2">
                  <p className="font-semibold">
                    {selectedAddress.locationType} {selectedAddress.name}
                  </p>
                  <p>
                    {selectedAddress.email}, {selectedAddress.mobile}
                  </p>
                  <p>
                    {selectedAddress.city}, {selectedAddress.state} -{" "}
                    {selectedAddress.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-xs mt-2">No Address Selected</p>
              )}
            </div>

            <h2 className="font-semibold text-lg mb-2">PRICE DETAILS</h2>

            <div className="flex justify-between text-sm">
              <span>Total Payable ({totalItems} items)</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between text-sm text-green-700">
              <span>Total Discount</span>
              <span>− ₹{totalDiscount}</span>
            </div>

            <hr className="my-2" />

            {/* Payment */}
            <h2 className="font-semibold text-lg mb-4">
              SELECT PAYMENT METHOD
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={handleSelectedPaymentMethod}
                  className="accent-green-700"
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={handleSelectedPaymentMethod}
                  className="accent-green-700"
                />
                Online Payment
              </label>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-4 bg-green-700 text-white p-3 rounded font-semibold hover:bg-green-800"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}

      {/* Address Modal */}
      <Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
        <Box  sx={{ width: "60%", p: 4, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} >
          <AddressModalPage
            onClose={() => setOpenAddressModal(false)}
            onSelectAddress={handleSelectedAddress}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default CartPage;
