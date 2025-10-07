import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import img from "../../../public/hel.png";
import { Link, useNavigate } from "react-router-dom";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { removeFromAddition } from "../../redux/features/addition"; // adjust import path
import Location from "../../helper/Location";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addition } = useSelector((state) => state.additionSlice) || [];
  const { allproducts } = useSelector((state) => state.forthCard) || [];

  const totalItems = (addition?.length || 0) + (allproducts?.length || 0);
  const allCartItems = [...addition, ...allproducts];

  // ✅ Load user session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userSession");
    if (storedUser) {
      setUserSession(JSON.parse(storedUser)); // ✅ Correct: parse JSON, not stringify
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUserSession(null);
    navigate("/Login");
  };

  const categories = [
    "Atta, Rice & Dals",
    "Breakfast, Dips & Spreads",
    "Masalas, Oils & Dry Fruits",
    "Chips, Biscuits & Namkeens",
    "Hot & Cold Beverages",
    "Instant & Frozen Foods",
    "Health & Hygiene",
    "Men's Grooming",
    "Bath, Body & Hair",
    "Beauty & Cosmetics",
    "Detergents & Cleaning",
    "Kitchen, Pooja & Homeware",
    "Chocolate & Mithai",
    "Baby Care",
    "Pet Care",
  ];

  return (
    <div className="shadow sticky top-0 z-50 bg-white">
      <div className="container mx-auto">
        <header className="flex items-center justify-between p-4 bg-white w-full">
          {/* Logo */}
          <div className="flex items-center w-[80px]">
            <img className="md:w-28" src={img} alt="logo" />
          </div>

          {/* Location */}
          <div className="hidden md:flex flex-col text-sm cursor-pointer">
            <Location />
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center w-full max-w-md mx-6">
            <input
              className="rounded-tl-md rounded-bl-md w-full h-10 border border-gray-300 text-sm p-2"
              type="text"
              placeholder="Search for products, brands and more"
            />
            <div className="min-w-[40px] flex items-center justify-center h-10 rounded-tr-md rounded-br-md bg-[#0c721f] text-white cursor-pointer">
              <IoMdSearch size={20} />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm lg:text-base relative">
            {/* All Categories */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f]"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <TbCategory size={18} />
              <span>All Categories</span>
              <IoIosArrowDown size={16} />
            </div>

            {/* Categories Dropdown */}
            {categoriesOpen && (
              <div className="absolute top-10 left-0 w-60 bg-white shadow-lg rounded-md p-3 z-50">
                <ul className="flex flex-col gap-2 h-60 overflow-y-auto">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      to="/category"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                        {cat}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}

            {/* ✅ Login or Account Menu */}
            {userSession ? (
              <Menu as="div" className="relative inline-block">
                <MenuButton className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f]">
                  <FaRegUser size={18} />
                  <span>Account</span>
                  <IoIosArrowDown size={16} />
                </MenuButton>

                <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {userSession.email}
                  </div>
                  <MenuItem>
                    <button
                      onClick={() => navigate("/deliveryHistory")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Account
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => navigate("/deliveryHistory")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => navigate("/deliveryHistory")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Address
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                to="/Login"
                className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f]"
              >
                <FaRegUser size={18} />
                Login
              </Link>
            )}

            {/* 🛒 Cart */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f] relative">
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100">
                  <Badge badgeContent={totalItems} color="primary">
                    <IoCartOutline size={20} />
                  </Badge>
                  <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-gray-800 text-white shadow-lg">
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {allCartItems.length === 0 ? (
                      <div className="px-4 py-2 text-sm">Cart is empty</div>
                    ) : (
                      allCartItems.map((ele, idx) => (
                        <MenuItem key={idx}>
                          <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-700">
                            <div className="flex items-center gap-2">
                              <img
                                src={ele.image || ele.images}
                                alt={ele.name || ele.brand}
                                className="h-10 w-10 object-contain"
                              />
                              <span>{ele.name || ele.brand}</span>
                            </div>
                            <span className="text-green-500">Rs.{ele.price}</span>
                          </div>
                        </MenuItem>
                      ))
                    )}
                  </div>
                  {allCartItems.length > 0 && (
                    <Link to="/cartPage" state={{ items: allCartItems }}>
                      <div className="p-2 border-t border-gray-700 flex justify-center">
                        <MenuItem>
                          <button className="w-1/2 py-2 text-center items-center text-sm rounded-2xl font-semibold text-white bg-green-600 hover:bg-green-700">
                            View Cart
                          </button>
                        </MenuItem>
                      </div>
                    </Link>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
