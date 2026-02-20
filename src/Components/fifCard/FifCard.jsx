import React, { useState } from 'react';

import chal from '../../assets/chal.png';
import namak from '../../assets/namk.png';
import poha from '../../assets/img.jpeg';
import powder from '../../assets/chal.png';
import atta from '../../assets/chal.png';

// Sample product data
const products = [
  {
    id: 1,
    brand: 'akb',
    name: 'BURA / POWDER SUGAR 1 KG',
    image: chal,
    price: 75,
    oldPrice: 125,
  },
  {
    id: 2,
    brand: 'Maa Kansal Fresh',
    name: 'MAA KANSAL FRESH POHA 500 GM',
    image: namak,
    price: 35,
    oldPrice: 105,
  },
  {
    id: 3,
    brand: 'Nature Fresh',
    name: 'NATURE FRESH ATTA 10 KG',
    image: poha,
    price: 425,
    oldPrice: null,
  },
  {
    id: 4,
    brand: 'Nature Namakin',
    name: 'NATURE NAMAKIN 10 KG',
    image: namak,
    price: 125,
    oldPrice: null,
  },
  {
    id: 1,
    brand: 'akb',
    name: 'BURA / POWDER SUGAR 1 KG',
    image: powder,
    price: 75,
    oldPrice: 125,
  },
  {
    id: 2,
    brand: 'Maa Kansal Fresh',
    name: 'MAA KANSAL FRESH POHA 500 GM',
    image: poha,
    price: 35,
    oldPrice: 105,
  },
  {
    id: 3,
    brand: 'Nature Fresh',
    name: 'NATURE FRESH ATTA 10 KG',
    image: atta,
    price: 425,
    oldPrice: null,
  },
  {
    id: 4,
    brand: 'Nature Namakin',
    name: 'NATURE NAMAKIN 10 KG',
    image: namak,
    price: 125,
    oldPrice: null,
  },
  {
    id: 1,
    brand: 'akb',
    name: 'BURA / POWDER SUGAR 1 KG',
    image: powder,
    price: 75,
    oldPrice: 125,
  },
  {
    id: 2,
    brand: 'Maa Kansal Fresh',
    name: 'MAA KANSAL FRESH POHA 500 GM',
    image: poha,
    price: 35,
    oldPrice: 105,
  },
  {
    id: 3,
    brand: 'Nature Fresh',
    name: 'NATURE FRESH ATTA 10 KG',
    image: atta,
    price: 425,
    oldPrice: null,
  },
  {
    id: 4,
    brand: 'Nature Namakin',
    name: 'NATURE NAMAKIN 10 KG',
    image: namak,
    price: 125,
    oldPrice: null,
  },
  {
    id: 1,
    brand: 'akb',
    name: 'BURA / POWDER SUGAR 1 KG',
    image: powder,
    price: 75,
    oldPrice: 125,
  },
  {
    id: 2,
    brand: 'Maa Kansal Fresh',
    name: 'MAA KANSAL FRESH POHA 500 GM',
    image: poha,
    price: 35,
    oldPrice: 105,
  },
  {
    id: 3,
    brand: 'Nature Fresh',
    name: 'NATURE FRESH ATTA 10 KG',
    image: atta,
    price: 425,
    oldPrice: null,
  },
  {
    id: 4,
    brand: 'Nature Namakin',
    name: 'NATURE NAMAKIN 10 KG',
    image: namak,
    price: 125,
    oldPrice: null,
  },
  {
    id: 1,
    brand: 'akb',
    name: 'BURA / POWDER SUGAR 1 KG',
    image: powder,
    price: 75,
    oldPrice: 125,
  },
  {
    id: 2,
    brand: 'Maa Kansal Fresh',
    name: 'MAA KANSAL FRESH POHA 500 GM',
    image: poha,
    price: 35,
    oldPrice: 105,
  },
  {
    id: 3,
    brand: 'Nature Fresh',
    name: 'NATURE FRESH ATTA 10 KG',
    image: atta,
    price: 425,
    oldPrice: null,
  },
  {
    id: 4,
    brand: 'Nature Namakin',
    name: 'NATURE NAMAKIN 10 KG',
    image: namak,
    price: 125,
    oldPrice: null,
  },
  // ...rest of products
];

function FifCard() {
  return (
    <div className="bg-[#fff6d9]">
      <h2 className="text-center text-xl font-semibold text-black mb-8">Today’s Deals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// 👇 Each product manages its own state independently
function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemove = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg relative p-4 flex flex-col items-center mb-5">
      <div className="absolute -top-5 bg-white px-3 py-1 rounded-full shadow">
        <span className="font-bold text-yellow-700 text-sm">{product.brand}</span>
      </div>

      {/* Product Name */}
      <h3 className="text-center text-green-700 font-bold text-sm mt-6">{product.name}</h3>

      {/* Image */}
      <img src={product.image} alt={product.name} className="w-32 h-28 object-contain mt-4" />
      <p className="text-[10px] text-gray-600 mt-2 text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, amet obcaecati aliquam veritatis odio corrupti nisi
      </p>

      {/* Price & Add to Cart */}
      <div className="flex flex-row items-center mt-4 w-full justify-center">
        <div className="space-x-2 bg-white px-4 py-1 rounded-full shadow">
          <span className="text-green-600 font-bold text-base">₹{product.price}</span>
          {product.oldPrice && <span className="text-gray-500 line-through text-sm">₹{product.oldPrice}</span>}
        </div>

        <div className="ml-4">
          {!isAdded ? (
            <button
              onClick={() => {
                setIsAdded(true);
                setQuantity(1); // start with 1 when added
              }}
              className="border border-green-700 text-green-700 rounded-full py-1 px-6 text-sm hover:bg-green-700 hover:text-white transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between space-x-2 bg-white px-4 py-1 rounded-full shadow">
              <button onClick={handleRemove} className="text-green-600 font-bold text-xl hover:bg-green-50 hover:text-green-700 transition">
                -
              </button>
              <span className="mx-2 text-green-600">{quantity}</span>
              <button onClick={handleAdd} className="text-green-600 font-bold text-xl hover:bg-green-50 hover:text-green-700 transition">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FifCard;
