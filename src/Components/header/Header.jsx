import React, { useEffect, useState, useRef } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";
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
import { CropIcon, CrossIcon, User, User2, UserCircle, UserCircle2, UserMinus } from "lucide-react";

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
  const { items = [] } = useSelector((state) => state.addToCartData || {});

  //console.log("Cart Itemssssss:", items);

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
  <div className="sticky top-0 z-50 bg-white shadow">
    <div className="max-w-7xl mx-auto px-1">
      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between h-16 px-5">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img
            src={img}
            alt="logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* LOCATION (DESKTOP) */}
        <div className="hidden md:block text-sm">
          <Location />
        </div>

        {/* SEARCH (DESKTOP) */}
        <div className="hidden md:flex flex-1 mx-6 max-w-lg">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full h-10 px-3 border rounded-l-md text-sm focus:ring-2 focus:ring-green-600 outline-none"
          />
          <button className="w-12 bg-green-600 text-white rounded-r-md flex items-center justify-center hover:bg-green-700">
            <IoMdSearch size={20} />
          </button>
        </div>

        {/* DESKTOP RIGHT MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          {/* CATEGORIES */}
          <div ref={categoriesRef} className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-1 hover:text-green-600"
            >
              <TbCategory size={18} />
              Categories
              <IoIosArrowDown size={14} />
            </button>

            {categoriesOpen && (
              <div className="absolute top-10 left-0 w-52 bg-white border rounded-lg shadow-lg p-2 z-50">
                <ul className="max-h-60 overflow-y-auto">
                  {categoryDetails.map((cat) => (
                    <Link
                      key={cat._id}
                      to="/category"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <li className="px-3 py-2 text-sm hover:bg-green-50 rounded">
                        {cat.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ACCOUNT */}
          {userSession ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-1 hover:text-green-600">
                <FaRegUser size={18} />
                Account
                <IoIosArrowDown size={14} />
              </MenuButton>

              <MenuItems className="absolute top-10 left-0 w-48 bg-white border rounded-lg shadow-lg p-2">
                <div className="px-3 py-2 text-xs text-gray-500 border-b">
                  {user.mobile}
                </div>
                <MenuItem>
                  <button
                    onClick={() => navigate("/delivery/history")}
                    className="w-full text-left px-3 py-2 hover:bg-green-50 text-sm"
                  >
                    Orders
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 text-sm"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <Link to="/Login" className="flex items-center gap-1 hover:text-green-600">
              <FaRegUser size={18} />
              Login
            </Link>
          )}

          {/* CART */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-1 hover:text-green-600">
              <Badge badgeContent={items?.length ?? 0} color="primary">
                <IoCartOutline size={22} />
              </Badge>
            </MenuButton>

            <MenuItems className="absolute right-0 top-10 w-80 bg-gray-900 text-white rounded-lg shadow-lg p-2">
              {items.length === 0 ? (
                <p className="text-center text-sm py-6 text-gray-400">
                  Cart is empty
                </p>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto">
                    {items.map((ele, idx) => (
                      <div key={idx} className="flex items-center gap-3 px-3 py-2">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${ele.productId?.images?.[0]}`}
                          className="h-10 w-10 object-contain bg-white rounded"
                        />
                        <div className="flex-1 text-xs">
                          {ele.productId?.name}
                        </div>
                        <span className="text-green-400 text-sm">
                          ₹{ele.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/cartPage">
                    <button className="w-full mt-2 py-2 bg-green-600 rounded text-sm hover:bg-green-700">
                      View Cart
                    </button>
                  </Link>
                </>
              )}
            </MenuItems>
          </Menu>
        </div>

        {/* MOBILE ICONS */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cartPage">
            <Badge badgeContent={items?.length ?? 0} color="primary">
              <IoCartOutline size={26} />
            </Badge>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <UserCircle2 size={24} />
          </button>
        </div>
      </header>

      {/* MOBILE SEARCH */}
      <div className="md:hidden flex gap-2 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 h-10 border rounded-md px-3 text-sm"
        />
        <button className="h-10 w-10 bg-green-600 text-white rounded-md flex items-center justify-center">
          <IoMdSearch size={18} />
        </button>
      </div>
    </div>

    {/* ================= MOBILE MENU ================= */}
    {menuOpen && (
      <div className="md:hidden bg-white border-t shadow-lg">

        <div className="px-4 py-3">
          {userSession ? (
            <>
              <button
                onClick={() => {navigate("/delivery/history"); setMenuOpen(false);}}
                className="block w-full text-left text-[20px] py-2"
              >

                My Orders
              </button>
              <button
                onClick={() => {navigate("/delivery/history"); setMenuOpen(false);}}
                className="block w-full text-left text-[20px] py-2"
              >
                My Profile
              </button>
              <button
                onClick={() => {navigate("/delivery/history"); setMenuOpen(false);}}
                className="block w-full text-left text-[20px] py-2"
              >
                My Addresses
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-[20px] py-2 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/Login"
              className="block text-sm py-2"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
        <button 
          onClick={() => setMenuOpen(false)}
          className=" flex w-full justify-center px-3 py-2 rounded-xl items-center bg-green-200 hover:bg-green-50 text-[20px] text-center text-white"
        >
          <IoMdClose  className="text-gray-600" size={24}/>
        </button>
      </div>
    )}
  </div>
);

}

export default Header;
