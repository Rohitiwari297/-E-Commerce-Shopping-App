import React from 'react';
import { Drawer, IconButton, Divider } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { 
  UserCircle2, 
  ShoppingBag, 
  User, 
  LogOut, 
  ChevronRight,
  Settings,
  Heart
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

function UserDrawer({ open, onClose, user, onLogout }) {
  const navigate = useNavigate();

  const menuItems = [
    { 
      label: 'My Orders', 
      icon: <ShoppingBag size={20} />, 
      path: '/delivery/history',
      color: 'text-blue-600'
    },
    { 
      label: 'My Profile', 
      icon: <User size={20} />, 
      path: '/Profile',
      color: 'text-green-600'
    },
    { 
      label: 'Wishlist', 
      icon: <Heart size={20} />, 
      path: '/wishlist',
      color: 'text-red-600'
    },
    { 
      label: 'Settings', 
      icon: <Settings size={20} />, 
      path: '/settings',
      color: 'text-gray-600'
    },
  ];

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '80%',
          maxWidth: '320px',
          backgroundColor: '#fff',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <div className="flex flex-col h-full bg-gray-50/30">
        {/* Header */}
        <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Account</h2>
          <IconButton onClick={onClose} className="hover:bg-gray-100 transition-colors">
            <IoMdClose size={24} className="text-gray-500" />
          </IconButton>
        </div>

        {/* User Info Section */}
        <div className="p-6 bg-white mb-3 shadow-sm">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 border-2 border-green-50">
                <UserCircle2 size={32} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Welcome back,</p>
                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                  {user.name || user.mobile}
                </h3>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">Login to manage your orders and profile</p>
              <button
                onClick={() => handleNav('/Login')}
                className="w-full py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 active:scale-95 transition-all"
              >
                Login / Register
              </button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        {user && (
          <div className="flex-1 bg-white px-3 py-4 shadow-sm">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
            <div className="space-y-1">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNav(item.path)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-gray-50 group transition-all"
                >
                  <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="flex-1 text-left text-[15px] font-semibold text-gray-700 group-hover:text-green-600 transition-colors">
                    {item.label}
                  </span>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-green-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer / Logout */}
        {user && (
          <div className="p-4 bg-white mt-auto border-t border-gray-100">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-3 py-3.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-bold transition-all active:scale-95"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default UserDrawer;
