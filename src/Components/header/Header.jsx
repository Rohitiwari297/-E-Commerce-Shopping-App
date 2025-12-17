import React, { useEffect, useState, useRef } from "react";
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
import Location from "../../helper/Location";
import { getCategories } from "../../utils/Apis";
import { getCat } from "../../redux/features/category/categotySlice";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addition } = useSelector((state) => state.additionSlice) || [];
  const { allproducts } = useSelector((state) => state.forthCard) || [];
  const user = useSelector((state) => state.auth.user);

  // COUNT OF THE CART ITEM
  const cart = useSelector((state) => state.addToCartData || {});

  const { items = [] } = cart;
  console.log("rrrrrrrrrr", items?.[0]?.productId?.name);


  const totalItems = (addition?.length || 0) + (allproducts?.length || 0);
  const allCartItems = [...addition, ...allproducts];

  const [categoryDetails, setCategoryDetails] = useState([]);

  const token = localStorage.getItem("token");

  // NEW: Ref for outside click
  const categoriesRef = useRef(null);

  useEffect(() => {
    if (token) setUserSession(token);
  }, [token]);

  // NEW: Close categories on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserSession(null);
    navigate("/Login");
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
    <div className="shadow sticky top-0 z-50 bg-white">
      <div className="container mx-auto">
        <header className="flex items-center justify-between p-4 bg-white w-full">
          <div className="flex items-center w-[80px]">
            <img className="md:w-24" src={img} alt="logo" />
          </div>

          <div className="hidden md:flex flex-col text-sm cursor-pointer">
            <Location />
          </div>

          <div className="hidden md:flex items-center w-full max-w-md mx-6">
            <input
              className="rounded-l-md w-full h-10 border border-gray-300 text-sm p-2 focus:ring-2 focus:ring-green-600 outline-none"
              type="text"
              placeholder="Search for products, brands and more"
            />
            <div className="min-w-[40px] flex items-center justify-center h-10 rounded-r-md bg-green-700 text-white cursor-pointer hover:bg-green-800">
              <IoMdSearch size={20} />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm lg:text-base relative">
            {/*  NEW: Wrapped in ref */}
            <div ref={categoriesRef} className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-green-700 font-medium"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <TbCategory size={18} />
                <span>All Categories</span>
                <IoIosArrowDown size={16} />
              </div>

              {categoriesOpen && (
                <div className="absolute bg-white  text-gray-800 top-10 left-0 w-[200px] shadow-2xl rounded-md p-3 -ml-5 z-50 border border-gray-200 animate-fadeIn">
                  <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                    {categoryDetails.map((cat, idx) => (
                      <Link
                        key={idx}
                        to="/category"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <li
                          type="disk"
                          className="w-full text-left px-4 text-sm hover:bg-green-50 hover:text-gray-500"
                        >
                          {cat.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {userSession ? (
              <Menu
                as="div"
                onClick={() => setCategoriesOpen(false)}
                className="relative inline-block"
              >
                <MenuButton
                  className="flex items-center gap-2 cursor-pointer hover:text-green-700 font-medium 
  focus:outline-none focus:ring-0"
                >
                  <FaRegUser size={18} />
                  <span>Account</span>
                  <IoIosArrowDown size={16} />
                </MenuButton>

                <MenuItems className="absolute bg-white  text-gray-800 top-10 left-0 w-[200px] shadow-2xl rounded-md p-3 -ml-5 z-50 border border-gray-200 animate-fadeIn focus:outline-none focus:ring-0">
                  <div className=" w-full text-left selection:bg-none px-4 text-[15px] text-gray-600 border-b">
                    Mob: {user.mobile}
                  </div>
                  <MenuItem>
                    <button
                      onClick={() => navigate("/delivery/history")}
                      className="w-full text-left px-4 text-[15px] hover:bg-green-50 hover:text-gray-500"
                    >
                      Account & Orders
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full text-red-700 text-left px-4 text-[15px] hover:bg-green-50 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                to="/Login"
                className="flex items-center gap-2 cursor-pointer hover:text-green-700 font-medium"
              >
                <FaRegUser size={18} />
                Login
              </Link>
            )}

            <div className="flex items-center gap-2 cursor-pointer hover:text-green-700">
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100">
                  <Badge badgeContent={cart?.items?.length ?? 0} color="primary">
                    <IoCartOutline size={20} />
                  </Badge>
                  <ChevronDownIcon className="size-5 text-gray-400" />
                </MenuButton>

                <MenuItems className="absolute right-0 mt-2 w-80 rounded-md bg-gray-900 text-white shadow-xl py-2 animate-fadeIn">
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {items.length === 0 ? (
                      <div className="px-4 py-4 text-sm text-gray-300 text-center">
                        Cart is empty
                      </div>
                    ) : (
                      items.map((ele, idx) => (
                        <MenuItem key={ele.productId?._id || idx}>
                          <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-800">
                            <div className="flex items-center gap-2">
                              <img
                                src={
                                  ele.productId?.images?.[0]
                                    ? `${import.meta.env.VITE_BASE_URL}${
                                        ele.productId.images[0]
                                      }`
                                    : "/placeholder.png"
                                }
                                alt={ele.productId?.name}
                                className="h-10 w-10 object-contain rounded"
                              />
                              <span>{ele.productId?.name}</span>
                            </div>

                            <span className="text-green-400 font-semibold">
                              ₹{ele.price || '-'}
                            </span>
                          </div>
                        </MenuItem>
                      ))
                    )}
                  </div>

                  {allCartItems.length > 0 && (
                    <Link to="/cartPage" state={{ items: allCartItems }}>
                      <div className="p-3 border-t border-gray-800 flex justify-center">
                        <MenuItem>
                          <button className="w-1/2 py-2 text-center text-sm rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700">
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
