import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { MapPin, LogOut, ShoppingBag, Settings as SettingsIcon, User, Wallet as WalletIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryPage from './DeliveryPage';
import AddressModalPage from './AddressModalPage';
import Profile from './Profile';
import Settings from './Settings';
import Wallet from './Wallet';
import { getUserDetails } from '../redux/features/user/userSlice';

// Handle Invoice Download

function DeliveryHistory() {
  const navigate = useNavigate();
  const location = useLocation();

  // state for selected menu
  const [menu, setMenu] = useState('orders');

  // Get user details from store
  const user = useSelector((state) => state.auth.user);
  console.log('user', user);

  //for modal
  const [selectOrder, setSelectOrder] = useState(null);
  console.log('selectOrder', selectOrder);

  const handleCancelOrder = (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (confirmCancel) {
      setDeliveries((prev) => prev.map((order) => (order.id === id ? { ...order, status: 'Cancelled' } : order)));
    }
  };

  // get user details from store
  const dispatch = useDispatch();

  const { user: userData, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails(user._id));

    // Check if a specific menu was requested via navigate state
    if (location.state?.menu) {
      setMenu(location.state.menu);
      // Optional: clear the state to prevent re-applying on refresh
      window.history.replaceState({}, document.title);
    }
  }, [user._id, location.state]);

  console.log('user data', userData);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar / Top Menu */}
      <aside className="bg-white md:w-72 shadow-xl shadow-gray-200/50 md:sticky md:top-20 md:h-[calc(100vh-80px)] z-10 transition-all duration-300 flex flex-col">
        {/* User Info Card */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3 border-4 border-green-50">
              <User size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight text-center">{userData?.name || 'User Name'}</h3>
            <p className="text-sm font-semibold text-gray-400 mt-1">+91-{userData?.mobile || 'XXXXXXXXXX'}</p>
          </div>
        </div>

        {/* Navigation Wrapper */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto p-3 md:p-4 text-sm no-scrollbar flex-1">
            {[
              { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
              { id: 'address', label: 'My Addresses', icon: <MapPin size={20} /> },
              { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
              { id: 'wallet', label: 'My Wallet', icon: <WalletIcon size={20} /> },
              { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setMenu(item.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 whitespace-nowrap font-bold group
                  ${
                    menu === item.id
                      ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'
                  }`}
              >
                <span className={`${menu === item.id ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}`}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout Section - Fixed at bottom on desktop */}
          <div className="p-3 md:p-4 border-t border-gray-100 bg-white">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-600 font-bold bg-red-50/50 hover:bg-red-50 transition-all w-full group whitespace-nowrap"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          {menu === 'orders' && <DeliveryPage />}

          {menu === 'address' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">My Addresses</h2>
              <AddressModalPage />
            </div>
          )}

          {menu === 'wallet' && <Wallet />}

          {menu === 'settings' && <Settings />}

          {menu === 'profile' && <Profile />}
        </div>
      </main>
    </div>
  );
}

export default DeliveryHistory;
