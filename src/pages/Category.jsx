import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/productSlice";
import { addToAddition, removeFromAddition } from "../redux/features/addition";
import { useLocation } from "react-router-dom";

// Example images (replace with your actual imports)

import { getProductDetsils } from "../redux/features/product/productSlice";



function Category() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.additionSlice.addition); // cart items
  const [apiData, setApiData] = useState([]);

  /**
   * GET CATEGORY ID FROM THE URL
   * FOR GETTING DATA FROM THE API
   */
    const location = useLocation();
    const { catId } = location.state || {};
    console.log("catId", catId);

  

   /**
   * GET ALL CATEGORIES DATA FROM THE GLOBAL STATE
   * FOR THE SIDEBAR / FILTER
   */
    const {catData} = useSelector((state) => state.cateData);

  /**
   * GET ALL PRODUCTS DATA FROM THE GLOBAL STATE
   */
    const prodData = useSelector(state => state.prodData?.prodDetails?.products || []);

    console.log("prodListtttt", prodData);

    useEffect(() => {
      if (catId) {
        dispatch(getProductDetsils(catId));
      }
    }, [catId ]);

    /// function to filter the products based on category id which is for the sidebar
    const filterProducts = (id) => {
      console.log("id", id);
      
      if (id) {
        alert(id);
        dispatch(getProductDetsils(id));
      }
    
    }
    



  // // Fetch products from Redux store
  // const data = useSelector((state) => state.products);
  // const respons = data.items;
  // console.log('respons',respons);
  
  // useEffect(() => {
  //   if (respons && respons.length > 0) {
  //     setApiData(respons);
  //   }
  // }, [respons]);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  // Add item to cart
  const handleAdd = (item) => {
    dispatch(addToAddition(item));
  };

  // Remove item from cart
  const handleRemove = (item) => {
    console.log("Removing item:", item);
    dispatch(removeFromAddition(item));
  };

  // Count how many times item exists in cart
  const getItemCount = (id) => {
    return cartData.filter((item) => item.id === id).length;
  };

 

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-[15%] sticky top-0 flex flex-col border-r h-screen">
        <div className="min-w-max md:w-full flex items-center justify-center bg-green-600 h-10 border-r border-white flex-shrink-0">
          <h3 className="text-sm font-semibold text-white text-center p-2">
            Filter Category
          </h3>
        </div>
        <ul className="flex flex-row md:flex-col p-2 md:p-0 space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-hidden ml-9 md:h-[calc(100vh-40px)] md:overflow-y-auto">
          {catData.map((cat) => (
            <li 
              onClick={() => filterProducts(cat._id)}
              key={cat._id} 
              className="min-w-[100px] max-w-[100px] md:w-full border rounded-lg shadow hover:scale-105 transition p-2 flex flex-col items-center cursor-pointer md:m-2">
              <img src={`${import.meta.env.VITE_BASE_URL}${cat.image}`} alt={cat.name} className="w-12 h-12 object-contain mb-1" />
              <p className="text-[10px] text-black font-medium text-center">{cat.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Grid */}
      <div className="w-full md:w-3/4 lg:w-[85%]">
        <div className="flex items-center justify-center w-full bg-green-600 h-10 sticky top-0 z-10">
          <h3 className="text-xl text-white">Details of Selected Products</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {prodData.map((cat) => (
            <div key={cat._id} className="flex flex-col hover:scale-105 justify-between items-center border rounded-2xl shadow-md hover:shadow-lg transition w-full h-auto min-h-60 p-3">
              <img src={`${import.meta.env.VITE_BASE_URL}${cat.images[0]}`} alt="product-img" className="w-24 h-24 object-contain" />
              <p className="text-sm mt-2 font-semibold">{cat.name}</p>
              <p className="text-center text-gray-800 text-[12px]">{cat.description}</p>
              <div className="w-full flex space-x-2 justify-center items-center">
              <p className="mt-2 text-center font-medium text-[15px] text-green-900">Rs.{cat.currentPrice}</p>
              <p className="mt-2 text-center font-medium text-[12px] text-gray-600 line-through">Rs.{cat.originalPrice}</p>

              </div>

              {/* Add/Remove Buttons */}
              {getItemCount(cat.id) > 0 ? (
                <div className="flex justify-center items-center space-x-2 w-full mt-3 ">
                  <button onClick={() => handleRemove(cat)} className="bg-red-500 text-white rounded-[8px] text-xl w-10 h- flex items-center justify-center">-</button>
                  <p>{getItemCount(cat.id)}</p>
                  <button onClick={() => handleAdd(cat)} className="bg-green-500 text-white rounded-[8px] text-xl w-10 h- flex items-center justify-center">+</button>
                </div>
              ) : (
                <button onClick={() => handleAdd(cat)} className="w-full hover:bg-green-800 cursor-pointer h-auto p-2 bg-green-700 border rounded-xl text-white font-semibold text-sm mt-3">
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
