import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getGuestCart, setGuestCart } from '../../utils/guestCart';

function GuestCartItem({ item, onChange }) {
  const navigate = useNavigate();

  const prodId = item._id || item.productId?._id;

  const changeQty = (delta) => {
    const guest = getGuestCart() || [];
    const idx = guest.findIndex((i) => i._id === prodId || i.productId?._id === prodId);
    if (idx === -1) return;
    const newQty = (guest[idx].quantity || 1) + delta;
    if (newQty <= 0) {
      guest.splice(idx, 1);
    } else {
      guest[idx] = { ...guest[idx], quantity: newQty };
    }
    setGuestCart(guest);
    if (onChange) onChange();
  };

  const removeItem = () => {
    const guest = getGuestCart() || [];
    const updated = guest.filter((i) => i._id !== prodId && i.productId?._id !== prodId);
    setGuestCart(updated);
    if (onChange) onChange();
  };

  return (
    <div className="flex p-4 border rounded-md bg-white gap-8">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${item?.images?.[0] || item?.productId?.images?.[0] || ''}`}
            alt={item?.name}
            className="w-24 h-24 object-contain"
          />
        </div>
        <div className="border border-gray-300 rounded w-fit">
          <button className="px-2 text-gray-500 text-xl" onClick={() => changeQty(-1)}>
            -
          </button>
          <span className="px-2 text-gray-500 ">{item.quantity ?? 1}</span>
          <button className="px-2 text-gray-500 text-xl" onClick={() => changeQty(1)}>
            +
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">{item?.name || item?.productId?.name}</h2>
            <p className="text-sm text-gray-500">Qty: {item.quantity ?? 1}</p>
            <p className="flex gap-5 text-green-600 font-bold">₹{item.currentPrice ?? item.price ?? 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button className="text-blue-600 hover:underline text-sm" onClick={removeItem}>
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuestCartItem;
