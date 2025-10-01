import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCard } from "../redux/features/CardSlice";
import { fetchProducts } from "../redux/features/productSlice";

// Assuming these images are correctly linked in your project
import makha from "../assets/makha.png";
import namk from "../assets/namk.png";
import chal from "../assets/chal.png";

// Categories data - Using this one for the sidebar
const categoriesData = [
  {
    id: 1,
    name: "Atta, Rice & Dals",
    image: namk,
  },
  {
    id: 2,
    name: "Breakfast, Dips & Spreads",
    image: chal,
  },
  {
    id: 3,
    name: "Masalas, Oils & Dry Fruits",
    image: makha,
  },
  {
    id: 4,
    name: "Chips, Biscuits & Namkeens",
    image: namk,
  },
  {
    id: 5,
    name: "Hot & Cold Beverages",
    image: chal,
  },
  {
    id: 6,
    name: "Instant & Frozen Foods",
    image: makha,
  },
  {
    id: 7,
    name: "Health & Hygiene",
    image: namk,
  },
  {
    id: 8,
    name: "Men's Grooming",
    image: chal,
  },
  {
    id: 9,
    name: "Bath, Body & Hair",
    image: makha,
  },
  {
    id: 10,
    name: "Beauty & Cosmetics",
    image: namk,
  },
  {
    id: 11,
    name: "Detergents & Cleaning",
    image: chal,
  },
  {
    id: 12,
    name: "Kitchen, Pooja & Homeware",
    image: makha,
  },
  {
    id: 13,
    name: "Chocolate & Mithai",
    image: namk,
  },
  {
    id: 14,
    name: "Baby Care",
    image: chal,
  },
  {
    id: 15,
    name: "Pet Care",
    image: makha,
  },
];

// Categories data - Using this one for the main product grid (categories in your original code)
const productGridCategories = [
  { id: 1, name: "Atta, Rice & Dals", image: namk },
  {
    id: 2,
    name: "Breakfast, Dips & Spreads",
    image: makha,
  },
  {
    id: 3,
    name: "Masalas, Oils & Dry Fruits",
    image: namk,
  },
  {
    id: 4,
    name: "Chips, Biscuits & Namkeens",
    image: chal,
  },
  { id: 5, name: "Hot & Cold Beverages", image: namk },
  { id: 6, name: "Instant & Frozen Foods", image: makha },
  { id: 7, name: "Health & Hygiene", image: chal },
  { id: 8, name: "Men's Grooming", image: namk },
  { id: 9, name: "Bath, Body & Hair", image: makha },
  { id: 10, name: "Beauty & Cosmetics", image: namk },
  { id: 11, name: "Detergents & Cleaning", image: chal },
  {
    id: 12,
    name: "Kitchen, Pooja & Homeware",
    image: chal,
  },
  { id: 13, name: "Chocolate & Mithai", image: makha },
  { id: 14, name: "Baby Care", image: namk },
  { id: 15, name: "Pet Care", image: chal },
];

function Category() {
  const dispatch = useDispatch(); // accessing useDispatch

  const [apiData, setApiData] = useState([]);

  // send the cart date to the addToCard Slice
  const getCardDetails = (data) => {
    console.log(" sweet test onClickGetCardDetails :", data);
    dispatch(addToCard(data)); // correct usage
  };

  const data = useSelector((state) => state.products);
  console.log("product data ", data);

  useEffect(() => {
    // Note: dispatch(fetchProducts()) returns a promise/thunk action, not the data itself.
    // The data should be accessed from the Redux store via useSelector.
    // setApiData will not hold the fetched data this way.
    // If you need to track the API status in local state, you should check the thunk's return.
    // For now, let's keep the dispatch to trigger the API call.
    dispatch(fetchProducts());
  }, []);

  return (
    // Base layout: column on small screen, row on medium and up
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Category List (Sidebar) 
        
        sm:w-full: Takes full width on small screens
        md:w-1/4 lg:w-[15%]: Takes 1/4 or 15% width on medium/large screens (acts as a sidebar)
        md:overflow-y-scroll: Enables vertical scroll on medium/large screens
        overflow-x-scroll: Enables horizontal scroll on small screens
      */}
      <div className="w-full md:w-1/4 lg:w-[15%] flex flex-col border-r h-full">
    
    {/* Header: Fixed Height, non-shrinking, and will not scroll */}
    <div className="min-w-max md:w-full flex items-center justify-center bg-green-600 h-10 border-r border-white flex-shrink-0">
        <h3 className="text-sm font-semibold text-white text-center p-2">
            Category wise Products
        </h3>
    </div>

    {/* Category List: Takes the remaining vertical space and handles the scroll */}
    <ul className="
        flex flex-row md:flex-col p-2 md:p-0 space-x-2 md:space-x-0 md:space-y-2 
        overflow-x-auto md:overflow-x-hidden 
        
        /* KEY FIX: Set the list's height to viewport height minus the header height (40px) */
        md:h-[calc(100vh-40px)] 
        
        /* Enable vertical scrolling only on medium/larger screens */
        md:overflow-y-auto
    ">
        {categoriesData.map((cat) => (
            <li
                key={cat.id}
                // Adjust width for horizontal scrolling list on small screens
                className="min-w-[100px] max-w-[100px] md:w-full border rounded-lg shadow hover:scale-105 transition p-2 flex flex-col items-center cursor-pointer md:m-2"
            >
                <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-12 h-12 object-contain mb-1"
                />
                <p className="text-[10px] text-black font-medium text-center">
                    {cat.name}
                </p>
            </li>
        ))}
    </ul>
</div>

      {/* Main Content (Product Details) */}
      {/* Takes full width on small screens, and the remaining width on medium/large */}
      <div className="w-full md:w-3/4 lg:w-[85%]">
        {/* Header */}
        <div className="flex items-center justify-center w-full bg-green-600 h-10 sticky top-0 z-10">
          <h3 className="text-xl text-white">Details of Selected Products</h3>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {productGridCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col justify-between items-center border rounded-2xl shadow-md hover:shadow-lg transition w-full h-auto min-h-60 p-3"
            >
              <img
                src={cat.image}
                alt="product-img"
                className="w-24 h-24 object-contain"
              />
              <p className="mt-3 text-center font-medium text-sm">
                {cat.name}
              </p>

              <Link
                to={{
                  pathname: "/category/itemDetails/",
                }}
                state={{ id: cat.id, name: cat.name, price: 250, img: cat.image }}
                className="w-full mt-3"
              >
                <button
                  onClick={() => getCardDetails(cat)}
                  className="w-full hover:bg-green-800 cursor-pointer h-auto p-2 bg-green-700 border rounded-xl text-white font-semibold text-sm"
                >
                  Buy
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;