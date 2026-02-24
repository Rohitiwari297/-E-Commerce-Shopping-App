import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCartAPI, fetchCartAPI, updateCartQuantityAPI } from '../../redux/features/cart/cartSlice.js';
import { MdOutlineArrowLeft, MdOutlineSubdirectoryArrowLeft } from 'react-icons/md';

const CartItem = React.memo(
  ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('CartItem RENDER:', item);

    /**
     *
     * INCREASING QUANTITY
     * ==========================
     *
     */
    const handleIncreaseQuantity = async () => {
      const productId = item?.productId?._id || item?.productId || item?.id;
      await dispatch(
        updateCartQuantityAPI({
          productId,
          quantity: (item.quantity || 1) + 1,
          variants: item.variants ? (item.variants.map(v => v._id || v)) : [],
          productDetails: item.productId // Pass details for better merging
        }),
      );
    };

    const handleDecreaseQuantity = async () => {
      const productId = item?.productId?._id || item?.productId || item?.id;
      await dispatch(
        updateCartQuantityAPI({
          productId,
          quantity: String((item.quantity || 1) - 1),
          variants: item.variants ? (item.variants.map(v => v._id || v)) : [],
          productDetails: item.productId
        }),
      );
    };

    /**
     *
     * REMOVING ITEMS FROM CART
     * ==========================
     *
     */
    const handleRemove = async () => {
      const productId = item?.productId?._id || item?.productId || item?.id;
      await dispatch(clearCartAPI(productId));
      await dispatch(fetchCartAPI());
    };

    const productId = item?.productId?._id || item?.productId;

    return (
      <div className="flex p-4 border rounded-md bg-white gap-8">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${item?.productId?.images?.[0] || ''}`}
              alt={item.name}
              className="w-24 h-24 object-contain"
            />
          </div>
          <div className="border border-gray-300 rounded w-fit">
            <button className="px-2 text-gray-500 text-xl" onClick={handleDecreaseQuantity}>
              -
            </button>
            <span className="px-2 text-gray-500 ">{item.quantity ?? 1}</span>
            <button className="px-2 text-gray-500 text-xl" onClick={handleIncreaseQuantity}>
              +
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">{item?.productId?.name}</h2>
               <p className="text-sm text-gray-500 font-bold uppercase">
                  Unit: {item.variants?.[0]?.unit || item?.productId?.unit || 'N/A'}
                </p>
              <p className="text-sm text-gray-500">Seller: {item?.productId?.seller}</p>
              <p className="flex gap-5 text-green-600 font-bold">
                ₹{item.price ?? 330} <span className="line-through text-gray-400 text-sm">₹{item?.productId?.originalPrice}</span>{' '}
              </p>
              <p className="text-sm text-gray-500">Delivery by {item.delivery ?? 'Thu Oct 9'}</p>
            </div>
            <div className=" h-full flex flex-col justify-between gap-10 items-center rounded">
              <div>
                <button className="text-blue-600 hover:underline -mt-32" onClick={() => navigate(-1)}>
                  {<MdOutlineSubdirectoryArrowLeft />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button className="text-blue-600 hover:underline text-sm" onClick={handleRemove}>
              REMOVE
            </button>
            <button className="text-blue-600 hover:underline text-sm">SAVE FOR LATER</button>
          </div>
        </div>
        {/* <Link to={"/category/itemDetails/"} state={{ List: item}}>
                <button>View Product Details</button>
            </Link> */}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparator for strict optimization
    // Only re-render if the Quantity changes or the Product ID changes.
    const prevId = prevProps.item?.productId?._id || prevProps.item?.productId;
    const nextId = nextProps.item?.productId?._id || nextProps.item?.productId;

    // Also check quantity
    const prevQty = prevProps.item?.quantity;
    const nextQty = nextProps.item?.quantity;

    return prevId === nextId && prevQty === nextQty;
  },
);

export default CartItem;
