import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/header/Header';

import MainRouter from './mainRouter/MainRouter';
import Login from './pages/Login';
import Footer from './Components/footer/Footer';
import Register from './pages/Register';
import Category from './pages/CategoryPages/Category';
import ProductDetailing from './pages/ProductDetailing';
import CartPage from './pages/CartPages/CartPage';
import DeliveryHistory from './pages/DeliveryHistory';
import PaymentPage from './pages/PaymentPage';
import OrderHistory from './pages/OderHistory';
import AddressModalPage from './pages/modals/AddressModalPage';
import Profile from './pages/Profile';
import Search from './pages/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCartAPI } from './redux/features/cart/cartSlice';
import { mergeGuestCartToUserCart } from './utils/guestCartHelper';
import Settings from './pages/Settings';
import PrivacyNotice from './pages/PrivacyNotice';
import TermsAndConditions from './pages/TermsAndConditions';
import AboutUs from './pages/AboutUs';

function App() {
  /**
   * FETCHING CAT API DATA AND SAVING IT IN THE REDUX STORE
   */
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) return;

    const syncGuestCart = async () => {
      // merge guest cart into user cart on login/startup
      try {
        await mergeGuestCartToUserCart();
      } catch (err) {
        console.error('Error merging guest cart:', err);
      }

      // fetch the updated server cart
      dispatch(fetchCartAPI());
    };

    syncGuestCart();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<MainRouter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/itemDetails" element={<ProductDetailing />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/delivery/history" element={<DeliveryHistory />} />
          <Route path="/paymentPage" element={<PaymentPage />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/delivery/address" element={<AddressModalPage />} />
          <Route path="/delivery/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/orderHistory/:id" element={<OrderHistory />} />
          <Route path="/privacy-notice" element={<PrivacyNotice />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
