import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddressModalPage from '../AddressModalPage'; // import the AddressModalPage component
import { MdCreditCard, MdLocationOn, MdPayments } from 'react-icons/md';
import { fetchCartAPI, updateCartQuantityAPI } from '../../redux/features/cart/cartSlice';
import CartItem from './CartItem';
import { getAddress, placeOrder, fetchWalletAmount, getCoupon, ApplyCoupon } from '../../utils/Apis';
import { getUserDetails } from '../../redux/features/user/userSlice';
import { getGuestCart } from '../../utils/guestCart';
import GuestCartItem from './GuestCartItem';
import toast from 'react-hot-toast';
import CouponModalPage from './CouponModalPage'; // Import CouponModalPage

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
  const { items = [], loading } = useSelector((state) => state.addToCartData);
  console.log('Redux cart items:', items);

  /**
   *
   * FETCHING DATA FROM REDUX OF USER
   * ================================
   *
   */
  const { user } = useSelector((state) => state.auth);
  const { user: userData } = useSelector((state) => state.user);
  console.log('Redux user (auth):', user);
  console.log('Redux userData (profile):', userData);

  // Pre-fetch cart on mount if logged in
  useEffect(() => {
    if (user) {
      dispatch(fetchCartAPI());
    }
  }, [user, dispatch]);

  /**
   * LOCAL CALCULATION FOR CONSISTENCY
   */
  // choose display items: server cart for logged-in user, guest cart for guests
  const guestCart = getGuestCart();
  const displayItems = user ? items : guestCart;

  // total Items
  const calculatedTotalItems = (displayItems || []).length;

  // subtotal (total of all items at current price)
  const calculatedTotalPrice = (displayItems || []).reduce((acc, i) => {
    const variant =
      i?.variants?.[0] ||
      i?.productId?.variants?.find((v) => v._id === i.variantId) ||
      (i.selectedVariantId ? i.variants?.find((v) => v._id === i.selectedVariantId) : null);
    const price = variant?.price || i?.productId?.price || i.price || 0;
    return acc + (price || 0) * (i.quantity || 1);
  }, 0);

  // total discount (original price sum)
  const totalOriginalPrice = (displayItems || []).reduce((acc, i) => {
    const variant =
      i?.variants?.[0] ||
      i?.productId?.variants?.find((v) => v._id === i.variantId) ||
      (i.selectedVariantId ? i.variants?.find((v) => v._id === i.selectedVariantId) : null);
    const orig = variant?.originalPrice || i?.productId?.originalPrice || i.originalPrice || 0;
    const price = variant?.price || i?.productId?.price || i.price || 0;
    // ensure we don't return 0 if originalPrice is missing
    const basePrice = (orig && orig > price) ? orig : price;
    return acc + (basePrice || 0) * (i.quantity || 1);
  }, 0);

  console.log('calculatedTotalPrice', calculatedTotalPrice);
  console.log('totalOriginalPrice', totalOriginalPrice);

  // REMOVING broken/redundant handlers since they are moved to CartItem
  // and handleRemove was using undefined setCartData.

  /**
   *
   * HANDLER FOR SELECTED ADDRESS
   * ============================
   */
  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem('selectedAddress', JSON.stringify(address));
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedAddress');
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
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    if (user && !userData) {
      dispatch(getUserDetails(user._id || user.id));
    }
  }, [user, userData, dispatch]);

  // Pre-fill from detailed userData (Profile)
  useEffect(() => {
    if (userData) {
      if (userData.name) setCustomerName(userData.name);
      if (userData.mobile) setCustomerMobile(userData.mobile);
    }
  }, [userData]);

  // Fallback to auth user if profile is not available
  useEffect(() => {
    if (user && !userData) {
      if (!customerName && user.name) setCustomerName(user.name);
      if (!customerMobile && user.mobile) setCustomerMobile(user.mobile);
    }
  }, [user, userData]);

  /**
   *
   * HANDLER FOR PAYMENT METHOD
   * ============================
   *
   */
  const handleSelectedPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  console.log('paymentMethod', paymentMethod);
  console.log('customerMobile', customerMobile);
  console.log('customerName', customerName);

  /**
   *
   * WALLET BALANCE STATE
   * ================================
   *
   */
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const fetchWallet = async () => {
      if (user) {
        const res = await fetchWalletAmount();
        setWalletBalance(res || 0);
      }
    };
    fetchWallet();
  }, [user]);

  /**
   *
   * HANDLER FOR PLACE ORDER
   * ============================
   *
   */
  const handlePlaceOrder = async () => {
    // Check if user is logged in
    if (!user) {
      toast.error('Please login first');
      return navigate('/login');
    }

    // Validate selected address
    if (!selectedAddress) {
      toast.error('Please select delivery address');
      return;
    }

    // Validate payment method
    if (!paymentMethod) {
      toast.error('Please select payment method');
      return;
    }

    // Wallet Balance Check
    const finalPayable = calculatedTotalPrice - couponDiscount;
    if (paymentMethod === 'Wallet') {
      if (finalPayable > walletBalance) {
        toast.error('Insufficient wallet balance!');
        const confirmAddMoney = window.confirm('Insufficient balance. Would you like to add money to your wallet?');
        if (confirmAddMoney) {
          navigate('/delivery/history', { state: { menu: 'wallet' } });
        }
        return;
      }
    }

    // Validate customer name (not empty and meaningful)
    if (!customerName || customerName.trim().length === 0) {
      toast.error('Please enter customer name');
      return;
    }

    // Validate customer mobile (not empty and at least 10 digits)
    if (!customerMobile || customerMobile.trim().length === 0) {
      toast.error('Please enter customer mobile number');
      return;
    }

    if (!/^\d{10}$/.test(customerMobile.replace(/\D/g, ''))) {
      toast.error('Please enter valid 10-digit mobile number');
      return;
    }

    // If all validations pass, place order
    try {
      const success = await placeOrder(selectedAddress, paymentMethod, customerMobile, customerName);
      if (success) {
        dispatch(fetchCartAPI());
        navigate('/delivery/history');
      }
    } catch (error) {
      console.error('Order placement error:', error);
    }
  };

  /**
   * COUPON STATE
   * ================================
   */
  const [coupon, setCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [openCouponModal, setOpenCouponModal] = useState(false);

  // Placeholder for setCoupons if still needed, though CouponModalPage handles its own fetch
  const [coupons, setCoupons] = useState([]);

  const handleApplyCouponSuccess = (discount, couponObj) => {
    setCouponDiscount(discount);
    setAppliedCoupon(couponObj);
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon(null);
    setCoupon('');
    toast.success('Coupon removed');
  };

  return (
    <div className="py-3 sm:py-4 lg:py-6">
      {(displayItems || []).length === 0 ? (
        /* EMPTY CART UI */
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center rounded-full bg-green-100">
            <MdPayments size={36} className="text-green-700" />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Your Cart is Empty</h2>

          <p className="text-sm sm:text-base text-gray-500 mb-6 px-4">Looks like you haven’t added anything yet.</p>

          <button
            onClick={() => navigate('/')}
            className="bg-green-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-800"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        /* CART WITH ITEMS */
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            {user
              ? items.map((item) => <CartItem key={item?.productId?._id || item.id} item={item} />)
              : displayItems.map((item) => (
                  <React.Suspense key={item._id || item.productId?._id} fallback={null}>
                    <GuestCartItem item={item} onChange={() => window.location.reload()} />
                  </React.Suspense>
                ))}
          </div>

          {/* Price Details */}
          <div className="w-full lg:w-1/3 p-3 sm:p-4 border rounded-md bg-white h-fit">
            <div className="p-3 sm:p-4 border rounded-md bg-white mb-3">
              <div className="flex items-center justify-between">
                <p className="text-red-600 font-semibold text-xs sm:text-sm">Delivery Address</p>
                <button
                  onClick={() => setOpenAddressModal(true)}
                  className="bg-green-500 text-white px-3 py-1 text-[11px] sm:text-xs rounded font-semibold hover:bg-green-600"
                >
                  Select Address
                </button>
              </div>

              {selectedAddress ? (
                <div className="text-[11px] sm:text-xs mt-2 leading-relaxed">
                  <p className="font-semibold">
                    {selectedAddress.locationType} {selectedAddress.name}
                  </p>
                  <p>
                    {selectedAddress.email}, {selectedAddress.mobile}
                  </p>
                  <p>
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-xs mt-2">No Address Selected</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-base sm:text-lg">PRICE DETAILS</h2>
              {appliedCoupon ? (
                <button
                  onClick={handleRemoveCoupon}
                  className="font-semibold text-[10px] text-white px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition-colors"
                >
                  REMOVE COUPON
                </button>
              ) : (
                <button
                  onClick={() => setOpenCouponModal(true)}
                  className="font-semibold text-[10px] text-white px-3 py-1 rounded bg-green-500 hover:bg-green-600 transition-colors"
                >
                  APPLY COUPON
                </button>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="flex justify-between text-sm">
              <span>Subtotal ({calculatedTotalItems} items)</span>
              <span>₹{calculatedTotalPrice}</span>
            </div>

            <div className="flex justify-between text-sm text-green-700">
              <span>Total Discount</span>
              <span>− ₹{totalOriginalPrice - calculatedTotalPrice}</span>
            </div>

            {/* Coupon */}
            {appliedCoupon && (
              <div className="flex justify-between text-sm text-green-700">
                <span className="flex items-center gap-1">
                  Coupon Applied (<span className="font-bold uppercase">{appliedCoupon.code}</span>)
                </span>
                <span>− ₹{couponDiscount}</span>
              </div>
            )}

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-base sm:text-lg">
              <span>Total Payable</span>
              <span>₹{calculatedTotalPrice - couponDiscount}</span>
            </div>

            {/* Payment */}
            <h2 className="font-semibold text-base sm:text-lg mb-3">SELECT PAYMENT METHOD</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm mb-4">
              <label
                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={handleSelectedPaymentMethod}
                  className="accent-green-700"
                />
                Cash on Delivery
              </label>

              <label
                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Online' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Online"
                  checked={paymentMethod === 'Online'}
                  onChange={handleSelectedPaymentMethod}
                  className="accent-green-700"
                />
                Online Payment
              </label>

              <label
                className={`flex items-center justify-between gap-2 p-2 border rounded-lg cursor-pointer transition-colors relative ${paymentMethod === 'Wallet' ? 'border-green-600 bg-green-50' : 'border-gray-200'} ${walletBalance < (calculatedTotalPrice - couponDiscount) ? 'opacity-70' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Wallet"
                    checked={paymentMethod === 'Wallet'}
                    onChange={handleSelectedPaymentMethod}
                    className="accent-green-700"
                  />
                  <span>Wallet</span>
                </div>
                <span className={`text-[10px] font-bold ${walletBalance < (calculatedTotalPrice - couponDiscount) ? 'text-red-500' : 'text-green-600'}`}>
                  ₹{walletBalance}
                </span>
                {paymentMethod === 'Wallet' && walletBalance < (calculatedTotalPrice - couponDiscount) && (
                  <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold whitespace-nowrap">Insufficient Balance!</p>
                )}
              </label>
            </div>
            <div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {customerName.trim().length === 0 && <p className="text-red-500 text-xs mt-1">Name is required</p>}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Mobile</label>
                <input
                  type="tel"
                  name="customerMobile"
                  placeholder="Enter 10-digit mobile number"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  maxLength="10"
                />
                {customerMobile.length > 0 && customerMobile.length < 10 && (
                  <p className="text-red-500 text-xs mt-1">Mobile number must be 10 digits</p>
                )}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-4 bg-green-700 text-white p-3 rounded font-semibold hover:bg-green-800 text-sm sm:text-base"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}

      {/* Address Modal */}
      <Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
        <Box
          sx={{
            width: { xs: '90%', sm: '70%', md: '60%' },
            p: 4,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AddressModalPage onClose={() => setOpenAddressModal(false)} onSelectAddress={handleSelectedAddress} />
        </Box>
      </Modal>

      {/* COUPON MODAL */}
      <Modal open={openCouponModal} onClose={() => setOpenCouponModal(false)}>
        <Box
          sx={{
            width: { xs: '90%', sm: '70%', md: '500px' },
            p: 0, // removed padding for custom modal styling
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          <CouponModalPage
            onClose={() => setOpenCouponModal(false)}
            onApply={handleApplyCouponSuccess}
            totalPrice={calculatedTotalPrice}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default CartPage;
