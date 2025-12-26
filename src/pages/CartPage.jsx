import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddressModalPage from "./AddressModalPage "; // import the AddressModalPage component
import { MdLocationOn } from "react-icons/md";
import { fetchCartAPI, updateCartQuantityAPI } from "../redux/features/cart/cartSlice";

function CartPage() {

  //
  // modal state
  const [openAddressModal, setOpenAddressModal] = useState(false);

  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch data from store
  const  {items = [], totalItems, totalPrice}  = useSelector((state) => state.addToCartData);
  console.log("Redux cart:", items, totalPrice);
  // total discount
  const totalDiscount = items.map((i) => i?.productId?.originalPrice).reduce((total, item) => total + item, 0);
  console.log("totalDiscount",  totalDiscount);

  // get user details from store
  const { user } = useSelector((state) => state.auth);
  console.log("Redux user:", user);


const getItemCount = (productId) => {
  console.log("productId", productId);
  const foundItem = items.find(
    (i) => i?.productId?._id === productId
  );
  console.log("foundItem", foundItem?.quantity);
  return foundItem?.quantity || 0;
};


 

  // increase/decrease quantity
const handleQuantityChange = async (item) => {
  const productId = item?.productId?._id;

  //console.log("productId", productId);

  await dispatch(
    updateCartQuantityAPI({
      productId,                     
      quantity: getItemCount(productId) + 1,
    })
  );

  dispatch(fetchCartAPI());
};


  //handlePlaceOrder
  const handlePlaceOrder = () => {
    if (user) {
      navigate('/paymentPage')
      setOpenAddressModal(true);
      alert("Complete Payment to place order");
    } else {
      navigate("/login");
    }
  };

  // remove item
  const handleRemove = (id) => {
    setCartData((prev) => prev.filter((item) => item.id !== id));
  };




  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">

      
      {/* Cart Items */}
      <div className="flex-1 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item?.productId?.id}
            className="flex gap-4 p-4 border rounded-md bg-white"
          >
            <img src={`${import.meta.env.VITE_BASE_URL}${item?.productId?.images[0]}` } alt={item.name} className="w-24 h-24" />
            {console.log("images", item?.productId?.images[0])}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold">{item?.productId?.name}</h2>
                <p className="text-sm text-gray-500">Size: {item?.productId?.size}</p>
                <p className="text-sm text-gray-500">Seller: {item?.productId?.seller}</p>
                <p className="flex  gap-5 text-green-600 font-bold">
                  ₹{item.price ?? 330}{" "}
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item?.productId?.originalPrice}
                    {console.log("originalPrice", items?.productId?.originalPrice)}
                  </span>{" "}
                  {/* <p>{Math.floor((Number(item?.productId?.originalPrice) - Number(item.price))/Number(item?.productId?.originalPrice) * 100)}% Off</p> */}

                </p>
                <p className="text-sm text-gray-500">
                  Delivery by {item.delivery ?? "Thu Oct 9"}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center border rounded">
                  <button
                    className="px-2"
                    onClick={() => handleQuantityChange(item?.productId?._id)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity ?? 1}</span>
                  <button
                    className="px-2"
                    onClick={() => handleQuantityChange(item)}
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
            <Link to={"/category/itemDetails/"} state={{ item }}>
              <h5>View Product Details</h5>
            </Link>
          </div>
        ))}
      </div>

      {/* Price Details */}
      <div className="w-full lg:w-1/3 p-4 border rounded-md bg-white">

      <div className="p-4 -mx-4.5 border rounded-md bg-white mb-5 -mt-10">
        
        <div>
          <div className="flex items-center justify-between">
          <p className="text-red-600 font-semibold text-[14px]">Delivery Address:</p>
          <div className="flex items-center">
            <button onClick={() => setOpenAddressModal(true)} className="w-auto bg-red-700 text-white p-1 pr-4 text-[10px] rounded font-semibold hover:bg-green-800" >Location </button>
            <MdLocationOn className="-ml-4 text-white" />
          </div>
          
        </div>
          <p>DLE Industrial Area, Moti Nagar, New Delhi</p>
        </div>

        
      </div>
        <h2 className="font-semibold text-lg mb-4">PRICE DETAILS</h2>
        <div className="flex justify-between mb-2">
          <span>Total Payable ({totalItems} items)</span>
          <span>₹{totalPrice + 0}</span>
        </div>
        <div className="flex justify-between mb-2 text-green-600">
          <span>Total Discount</span>
          <span>− ₹{  totalDiscount}</span>
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
          You will save ₹{"discount: 0"} on this order.
        </p>

        {/* Place Order Button */}
        <button
          onClick={()=> handlePlaceOrder()}
          className="w-full bg-green-700 cursor-pointer text-white p-3 rounded font-semibold hover:bg-green-800"
        >
          PLACE ORDER
        </button>
      </div>

      {/* Address Modal */}
      <Modal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        aria-labelledby="address-modal"
        aria-describedby="enter-address-for-order"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "900px",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            outline: "none",
            overflow: "hidden",
          }}
        >
          <AddressModalPage onClose={() => setOpenAddressModal(false) } />
        </Box>
      </Modal>
    </div>
  );
}

export default CartPage;
