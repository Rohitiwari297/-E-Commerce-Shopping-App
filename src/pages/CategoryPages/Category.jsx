import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCartAPI } from '../../redux/features/cart/cartSlice';
import CategoryProduct from './CategoryProduct';
import { getProductDetsils } from '../../redux/features/product/productSlice';
import { getSubCategories } from '../../utils/Apis';

function Category() {
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCatId, setSelectedSubCatId] = useState(null);
  const dispatch = useDispatch();

  const location = useLocation();
  const { catId } = location.state || {};

  console.log('catId', catId);

  const { catData } = useSelector((state) => state.cateData);
  const prodData = useSelector((state) => state.prodData?.prodDetails?.products) || [];

  console.log('prodData', prodData);

  /* =========================
     API CALL TOFETCH SUB CATEGORIES BY CATEGORY ID
  ========================== */
  useEffect(() => {
    if (catId) {
      getSubCategories(catId)
        .then((data) => {
          setSubCategory(data);
          // Load saved subcategory from localStorage
          const savedSubCatId = localStorage.getItem(`selectedSubCat_${catId}`);
          if (savedSubCatId && data.some((cat) => cat._id === savedSubCatId)) {
            setSelectedSubCatId(savedSubCatId);
          } else if (data.length > 0) {
            // If no saved selection, select first one
            setSelectedSubCatId(data[0]._id);
          }
        })
        .catch((error) => {
          console.error('Error fetching subcategories:', error);
          setSubCategory([]);
        });
    }
  }, [catId]);

  console.log('subCategory', subCategory);

  /* =========================
     FETCH PRODUCTS BY CATEGORY
  ========================== */
  useEffect(() => {
    if (catId && selectedSubCatId) {
      dispatch(getProductDetsils(selectedSubCatId));
    }
  }, [catId, dispatch, selectedSubCatId]);

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
    setSelectedSubCatId(id);
    localStorage.setItem(`selectedSubCat_${catId}`, id);
    dispatch(getProductDetsils(id));
  };

  if (!subCategory?.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Categories Found</h2>
          <p className="text-gray-600">This category doesn't have any subcategories available yet.</p>
        </div>
      </div>
    );
  }

  console.log('catData', catData);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-[15%] md:sticky md:top-0 self-start bg-white z-20 border-r border-gray-200">
        <div className="w-full flex items-center justify-center bg-green-600 h-10 border-b md:border-b-0 md:border-r border-white">
          <h3 className="text-sm font-semibold text-white text-center p-2">Filter Category</h3>
        </div>

        <ul
          className="
        flex flex-row
        md:flex-col
        gap-2
        p-2
        md:p-0
        overflow-x-auto
        md:overflow-x-hidden
        md:overflow-y-auto
        md:max-h-[calc(100vh-40px)]
      "
        >
          {subCategory.map((cat) => (
            <li
              onClick={() => filterProducts(cat._id)}
              key={cat._id}
              className={`
              min-w-[80px]
              md:min-w-[50px]
              border-2
              rounded-lg
              shadow
              hover:scale-105
              transition
              p-2
              flex
              flex-col
              items-center
              cursor-pointer
              md:m-2
              ${selectedSubCatId === cat._id ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-white'}
            `}
            >
              <img src={`${import.meta.env.VITE_BASE_URL}${cat.image}`} alt={cat.name} className="w-12 h-12 object-contain mb-1" />
              <p
                className={`text-[10px] sm:text-xs font-medium text-center ${
                  selectedSubCatId === cat._id ? 'text-green-600' : 'text-black'
                }`}
              >
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

        {prodData?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-3 sm:p-4">
            {prodData.map((product) => (
              <CategoryProduct key={product._id} cat={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h2>
              <p className="text-gray-600">We couldn't find any products in this category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
