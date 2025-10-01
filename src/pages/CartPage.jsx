import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CartPage() {
  // fetch data from store
  const { cart } = useSelector((state) => state.dataToCart);
  console.log("Redux cart:", cart);

  const location = useLocation();
  const {id, name, img, price} = location.state || {};

  // local state for cart (initialize quantity safely)
  const [cartData, setCartData] = useState(
    cart.map((item) => ({
      ...item,
      quantity: item.quantity ?? 1, // default to 1 if missing
    }))
  );
  console.log("cartData:", cartData);

  // increase/decrease quantity
  const handleQuantityChange = (id, delta) => {
    setCartData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity ?? 1) + delta), // prevent NaN, minimum 1
            }
          : item
      )
    );
  };

  // remove item
  const handleRemove = (id) => {
    setCartData((prev) => prev.filter((item) => item.id !== id));
  };

  // calculate totals with safe fallbacks
  const totalPrice = cartData.reduce((acc, item) => {
    const price = Number(item.price ?? 330);
    const quantity = Number(item.quantity ?? 1);
    return acc + price * quantity;
  }, 0);

  const discount = cartData.reduce((acc, item) => {
    const originalPrice = Number(item.originalPrice ?? 1999);
    const price = Number(item.price ?? 330);
    const quantity = Number(item.quantity ?? 1);
    return acc + (originalPrice - price) * quantity;
  }, 0);

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Cart Items */}
      <div className="flex-1 flex flex-col gap-4">
        {cartData.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border rounded-md bg-white"
          >
          
            <img src={item.image} alt={item.name} className="w-24 h-24" />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Seller: {item.seller}</p>
                <p className="text-green-600 font-bold">
                  ₹{item.price ?? 330}{" "}
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.originalPrice ?? 1999}
                  </span>{" "}
                  {item.discount ?? 85}% Off
                </p>
                <p className="text-sm text-gray-500">
                  Delivery by {item.delivery ?? "Thu Oct 9"}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center border rounded">
                  <button
                    className="px-2"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity ?? 1}</span>
                  <button
                    className="px-2"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => handleRemove(item.id)}
                >
                  REMOVE
                </button>
                <button className="text-blue-600 hover:underline text-sm">
                  SAVE FOR LATER
                </button>
              </div>
            </div>
            <Link to={'/category/itemDetails/'} >
            <h5>View Product Details</h5>
            </Link>
          </div>
        ))}
      </div>

      {/* Price Details */}
      <div className="w-full lg:w-1/3 p-4 border rounded-md bg-white">
        <h2 className="font-semibold text-lg mb-4">PRICE DETAILS</h2>
        <div className="flex justify-between mb-2">
          <span>Price ({cartData.length} items)</span>
          <span>₹{totalPrice + discount}</span>
        </div>
        <div className="flex justify-between mb-2 text-green-600">
          <span>Discount</span>
          <span>− ₹{discount}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Coupons for you</span>
          <span>− ₹0</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Protect Promise Fee</span>
          <span>₹0</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>
        <p className="text-green-600 text-sm mb-4">
          You will save ₹{discount} on this order
        </p>
        <button className="w-full bg-green-700 text-white p-3 rounded font-semibold hover:bg-green-800">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default CartPage;
