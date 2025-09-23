import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import img from "../../../public/hel.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  //
  // const { carts } = useSelector((state) => state.allCards);
  const {cart} = useSelector((state) => state.dataToCart);
  console.log("check store:  " , cart)


  // sample categories
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

  const AddToCartHandler = (data)=>{
    console.log(data)
  }

  return (
    <div className="shadow relative ">
      <div className="container mx-auto">
        <header className="flex items-center justify-between p-4 bg-white w-full">
          {/* Logo */}
          <div className="flex items-center w-[80px]">
            <img className=" md:w-28" src={img} alt="logo" />
          </div>

          {/* Search Bar (desktop) */}
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
            {/* All Categories with dropdown */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f] relative"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <TbCategory size={18} />
              <span>All Categories</span>
              <IoIosArrowDown size={16} />
            </div>

            {/* Categories Dropdown */}
            {categoriesOpen && (
              <div className="absolute top-10 left-0 w-60 bg-white shadow-lg rounded-md p-3 z-50">
                <ul className="flex flex-col gap-2 h-60 overflow-y-auto w-auto">
                  <Link to="/category">
                    {categories.map((cat, idx) => (
                      <li
                        key={idx}
                        className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        {cat}
                      </li>
                    ))}
                  </Link>
                  {menuOpen}
                </ul>
              </div>
            )}

            {/* Login */}
            <Link
              to="/Login"
              className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f]"
            >
              <FaRegUser size={18} />
              Login
            </Link>

            {/* Cart */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f] relative">
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                  <Badge badgeContent={cart.length} color="primary">
                    <IoCartOutline size={20} />
                    Cart
                  </Badge>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {cart.map((ele) => (
                      <MenuItem key={ele.id || ele.name}>
                        <Link to={'/CartPage'}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                        >
                          <div className="flex gap-2 justify-center items-center">
                            <div>
                             <img src={ele.image} style={{ height: "25px" }} alt={ele.name} />
                            </div>
                            <div>
                              {ele.name}
                            </div>
                            <div className="text-green-500">
                              Rs.330
                            </div>
                            
                          </div>

                        </Link>
                      </MenuItem>
                    ))}

                    <form action="#" method="POST"></form>
                  </div>
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

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 p-4 md:hidden z-50">
            {/* Search bar (mobile) */}
            <div className="flex w-full">
              <input
                className="rounded-tl-md rounded-bl-md w-full h-10 border border-gray-300 text-sm p-2"
                type="text"
                placeholder="Search..."
              />
              <div className="min-w-[40px] flex items-center justify-center h-10 rounded-tr-md rounded-br-md bg-[#0c721f] text-white cursor-pointer">
                <IoMdSearch size={20} />
              </div>
            </div>

            {/* All Categories mobile */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f]"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <TbCategory size={18} />
              All Categories
              <IoIosArrowDown size={16} />
            </div>
            {categoriesOpen && (
              <ul className="flex flex-col gap-2 w-full bg-gray-50 rounded-md p-2">
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}

            {/* Login */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f]">
              <FaRegUser size={18} />
              Login
            </div>

            {/* Cart */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#0c721f] relative">
              <IoCartOutline size={20} />
              <span>Cart</span>
              <span className="absolute -top-2 -right-3 bg-[#0c721f] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-semibold">
                0
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
