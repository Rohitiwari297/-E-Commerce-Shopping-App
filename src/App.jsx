import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Components/header/Header';

import MainRouter from './mainRouter/MainRouter'
import Login from './pages/Login';
import Footer from './Components/footer/Footer';
import Register from './pages/Register';
import Category from './pages/Category';
import ProductDetailing from './pages/ProductDetailing';
import CartPage from './pages/CartPage'
import DeliveryHistory from './pages/DeliveryHistory';
import PaymentPage from './pages/PaymentPage';
import OrderHistory from './pages/OderHistory';
import AddressModalPage from './pages/AddressModalPage ';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCartAPI } from './redux/features/cart/cartSlice';



function App() {


/**
 * FETCHING CAT API DATA AND SAVING IT IN THE REDUX STORE 
 */
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) return;
    dispatch(fetchCartAPI());
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">  
      <Header  />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainRouter />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/category' element={<Category/>} />
          <Route path="/category/itemDetails" element={<ProductDetailing />} />
          <Route path='/cartPage' element={<CartPage/>} />
          <Route path='/delivery/history' element={<DeliveryHistory/>} />
          <Route path='/paymentPage' element={<PaymentPage/>} />
          <Route path='/orderHistory' element={<OrderHistory/>} />
          <Route path="/delivery/address" element={<AddressModalPage />} />
          <Route path="/delivery/profile" element={<Profile />} />


          

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
