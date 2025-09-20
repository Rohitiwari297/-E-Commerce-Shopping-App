import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCard } from "../redux/features/CardSlice";

function Category() {
  //
  const dispatch = useDispatch(); //accessing useDispatch

  // Categories data
  const categories = [
    { id: 1, name: "Atta, Rice & Dals", image: "../../public/img.jpeg" },
    {
      id: 2,
      name: "Breakfast, Dips & Spreads",
      image: "../../public/chal.png",
    },
    {
      id: 3,
      name: "Masalas, Oils & Dry Fruits",
      image: "../../public/makha.png",
    },
    {
      id: 4,
      name: "Chips, Biscuits & Namkeens",
      image: "../../public/img.jpeg",
    },
    { id: 5, name: "Hot & Cold Beverages", image: "../../public/chal.png" },
    { id: 6, name: "Instant & Frozen Foods", image: "../../public/makha.png" },
    { id: 7, name: "Health & Hygiene", image: "../../public/img.jpeg" },
    { id: 8, name: "Men's Grooming", image: "../../public/chal.png" },
    { id: 9, name: "Bath, Body & Hair", image: "../../public/img.jpeg" },
    { id: 10, name: "Beauty & Cosmetics", image: "../../public/img.jpeg" },
    { id: 11, name: "Detergents & Cleaning", image: "../../public/img.jpeg" },
    {
      id: 12,
      name: "Kitchen, Pooja & Homeware",
      image: "../../public/chal.png",
    },
    { id: 13, name: "Chocolate & Mithai", image: "../../public/makha.png" },
    { id: 14, name: "Baby Care", image: "../../public/img.jpeg" },
    { id: 15, name: "Pet Care", image: "../../public/chal.png" },
  ];

  // only use for debuging perpose
  // const data = useSelector((state) => state.allCards)
  // console.log(data)

  // send the cart date to the addToCard Slice
  const getCardDetails = (data) => {
    dispatch(addToCard(data)); //  correct usage
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-green-600 h-10">
        <h3 className="text-xl text-white">Details of Selected Products</h3>
      </div>

      {/* Responsive Grid */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 cursor-pointer">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col justify-between items-center border rounded-2xl shadow-md hover:shadow-lg transition w-full h-60 p-5"
          >
            <img
              src={cat.image}
              alt="product-img"
              className="w-24 h-24 object-contain"
            />
            <p className="mt-3 text-center font-medium">{cat.name}</p>

            <Link to={`/category/itemDetails/${cat.id}`} className="w-full">
              <button
                onClick={() => getCardDetails(cat)}
                className="w-full hover:bg-green-800 cursor-pointer h-auto p-1 bg-green-700 border rounded-2xl text-white"
              >
                Buy
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
