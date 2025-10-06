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



function App() {

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
          <Route path='deliveryHistory' element={<DeliveryHistory/>} />
          <Route path='paymentPage' element={<PaymentPage/>} />
          <Route path='orderHistory' element={<OrderHistory/>} />

          

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
