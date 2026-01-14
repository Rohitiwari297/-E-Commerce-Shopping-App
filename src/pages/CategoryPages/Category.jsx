import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCartAPI } from "../../redux/features/cart/cartSlice";
import CategoryProduct from "./CategoryProduct";
import { getProductDetsils } from "../../redux/features/product/productSlice";

function Category() {
  const dispatch = useDispatch();

  const location = useLocation();
  const { catId } = location.state || {};

  const { catData } = useSelector((state) => state.cateData);
  const prodData =
    useSelector((state) => state.prodData?.prodDetails?.products) || [];

    console.log("prodData", prodData);

  /* =========================
     FETCH PRODUCTS BY CATEGORY
  ========================== */
  useEffect(() => {
    if (catId) {
      dispatch(getProductDetsils(catId));
    }
  }, [catId, dispatch]);

  /* =========================
     FETCH CART ONLY ONCE
  ========================== */
  useEffect(() => {
    dispatch(fetchCartAPI());
  }, [dispatch]);

  /* =========================
     FILTER PRODUCTS
  ========================== */
  const filterProducts = (id) => {
    if (id) {
      dispatch(getProductDetsils(id));
    }
  };

  if (!catData) {
    return <div>Loading...</div>;
  }

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
              className="min-w-[100px] max-w-[100px] md:w-full border rounded-lg shadow hover:scale-105 transition p-2 flex flex-col items-center cursor-pointer md:m-2"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}${cat.image}`}
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

      {/* Product Grid */}
      <div className="w-full md:w-3/4 lg:w-[85%]">
        <div className="flex items-center justify-center w-full bg-green-600 h-10 sticky top-0 z-10">
          <h3 className="text-xl text-white">Details of Selected Products</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {prodData.map((cat) => (
            // Link to the category page with the category ID
            <CategoryProduct key={cat._id} cat={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
