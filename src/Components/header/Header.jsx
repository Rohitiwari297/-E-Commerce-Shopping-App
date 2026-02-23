import React, { useEffect, useState, useRef } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { TbCategory } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import logo from '../../assets/tazaCartLogo.png';
import { Link, useNavigate } from 'react-router-dom';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from 'react-redux';
import Location from '../../helper/Location';
import { getCategories, getProduct } from '../../utils/Apis';
import { getCat } from '../../redux/features/category/categotySlice';
import { UserCircle2 } from 'lucide-react';
import CartDrawer from '../CartDrawer/CartDrawer';
import UserDrawer from '../UserDrawer/UserDrawer';
import { getGuestCart } from '../../utils/guestCart';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [guestCartRefresh, setGuestCartRefresh] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  //DRAWER
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addition } = useSelector((state) => state.additionSlice) || [];
  const { allproducts } = useSelector((state) => state.forthCard) || [];
  const user = useSelector((state) => state.auth.user);

  // COUNT OF THE CART ITEM
  const { items = [] } = useSelector((state) => state.addToCartData || {});

  //console.log("Cart Itemssssss:", items);

  // GET LOCALSTORAGE CART - recalculate on guestCartRefresh changes
  const guestCart = getGuestCart();
  console.log('guestCart', guestCart, 'version:', guestCartRefresh);

  // Listen to localStorage changes to update badge in real-time
  useEffect(() => {
    const handleGuestCartUpdate = () => {
      setGuestCartRefresh((prev) => prev + 1);
    };

    window.addEventListener('guestCartUpdated', handleGuestCartUpdate);
    return () => window.removeEventListener('guestCartUpdated', handleGuestCartUpdate);
  }, []);

  // Calculate badge count: use Redux items for logged-in users, guest cart for guests
  const badgeCount = user ? (items?.length ?? 0) : (guestCart?.length ?? 0);

  const [categoryDetails, setCategoryDetails] = useState([]);

  const token = localStorage.getItem('token');

  // NEW: Ref for outside click
  const categoriesRef = useRef(null);

  useEffect(() => {
    if (token) setUserSession(token);
  }, [token]);

  // NEW: Close categories on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserSession(null);
    navigate('/Login');
  };

  // NEW: Handle search
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  //
  useEffect(() => {
    getCategories({ setCategoryDetails });
  }, [user]);

  /**
   * SET CATEGORIES LIST IN GLOBAL STATE
   *
   */
  useEffect(() => {
    //console.log("categoryDetails UPDATED:", categoryDetails);
    if (categoryDetails) {
      dispatch(getCat(categoryDetails));
    }
  }, [categoryDetails]);

  //get the category data from global state
  const categoryData = useSelector((state) => state);

  //console.log('categoryDetailsrrrrr',categoryData);

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <header className="flex items-center justify-between h-16 px-3 md:px-5 md:h-20 lg:h-24 gap-2 md:gap-4">
          {/* LOGO */}
          <div onClick={() => navigate('/')} className="flex items-center cursor-pointer hover:opacity-80 transition flex-shrink-0">
            <img src={logo} alt="logo" className="h-18 sm:h-18 md:h-16 lg:h-24 w-auto object-contain" />
          </div>

          {/* LOCATION (DESKTOP & MOBILE) */}
          <div className="flex text-xs md:text-sm flex-shrink-0">
            <Location />
          </div>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-xl group">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:border-green-600 outline-none transition-all duration-300"
              />
              <IoMdSearch className="absolute left-4 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
              <button
                onClick={handleSearch}
                className="absolute right-1.5 h-8 px-5 bg-green-600 text-white rounded-full text-xs font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-sm"
              >
                Search
              </button>
            </div>
          </div>

          {/* DESKTOP RIGHT MENU */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* ACCOUNT */}
            {userSession ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition">
                  <FaRegUser size={18} />
                  Account
                  <IoIosArrowDown size={14} />
                </MenuButton>

                <MenuItems className="absolute top-10 left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                  <div className="px-3 py-2 text-xs text-gray-500 border-b">{user.mobile}</div>
                  <MenuItem>
                    <button
                      onClick={() => navigate('/delivery/history')}
                      className="w-full text-left px-3 py-2 hover:bg-green-50 text-sm rounded transition"
                    >
                      My Orders
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => navigate('/Profile')}
                      className="w-full text-left px-3 py-2 hover:bg-green-50 text-sm rounded transition"
                    >
                      My Profile
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 text-sm rounded transition"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link to="/Login" className="text-gray-700 hover:text-green-600 transition flex items-center gap-2">
                <FaRegUser size={18} />
                Login
              </Link>
            )}

            {/* CART */}
            <Menu as="div" className="relative">
              <MenuButton onClick={openCart} className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition">
                <Badge badgeContent={badgeCount} color="error">
                  <IoCartOutline size={22} />
                </Badge>
              </MenuButton>

              {/* <MenuItems className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
              {items.length === 0 ? (
                
                <p className="text-center text-sm py-6 text-gray-400">
                  Cart is empty
                </p>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto">
                    {items.map((ele, idx) => (
                      <div key={idx} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded transition">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${ele.productId?.images?.[0]}`}
                          className="h-10 w-10 object-contain bg-gray-100 rounded"
                        />
                        <div className="flex-1 text-xs text-gray-700">
                          {ele.productId?.name}
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          ₹{ele.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/cartPage">
                    <button className="w-full mt-3 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                      View Cart
                    </button>
                  </Link>
                </>
              )}
            </MenuItems> */}
              <CartDrawer open={isCartOpen} onClose={closeCart} data={items} />
            </Menu>
          </div>

          {/* MOBILE ICONS */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cartPage" className="p-2 text-gray-700 hover:text-green-600 transition-colors bg-gray-50 rounded-full">
              <Badge badgeContent={badgeCount} color="error">
                <IoCartOutline size={24} />
              </Badge>
            </Link>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-700 hover:text-green-600 transition-colors bg-gray-50 rounded-full"
            >
              <UserCircle2 size={24} />
            </button>
          </div>
        </header>

        {/* MOBILE SEARCH */}
        <div className="md:hidden pb-4 px-2">
          <div className="relative flex items-center group">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:border-green-600 outline-none transition-all shadow-sm"
            />
            <IoMdSearch className="absolute left-4 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
            <button
              onClick={handleSearch}
              className="absolute right-1.5 h-8 px-4 bg-green-600 text-white rounded-full text-xs font-semibold hover:bg-green-700 transition-all active:scale-95"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      <UserDrawer 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        user={user} 
        onLogout={handleLogout} 
      />
    </div>
  );
}

export default Header;
