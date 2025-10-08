import React, { useState } from "react";
// Mock product images (ensure these paths are correct in your project)
import potatoImg from "../assets/makha.png"; 
import ladyFingerImg from "../assets/namk.png"; 
import tomatoImg from "../assets/namk.png"; 
import attaImg from "../assets/makha.png"; 
import brinjalImg from "../assets/namk.png"; 
import chiliImg from "../assets/namk.png";

// Lucide Icons for sidebar and back button
import {
  MapPin,
  ShoppingBag,
  Gift,
  Lock,
  LogOut,
  ArrowLeft,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA STRUCTURE (To match the UI) ---
const orderData = {
  status: "Arrived at 9:03 pm",
  totalItems: 6,
  items: [
    { name: "Potato Pack of 2", quantity: "2 x (0.95-1.05) kg", price: 55, image: potatoImg },
    { name: "Lady Finger", quantity: "250 g x 2", price: 26, image: ladyFingerImg },
    { name: "Green Chilli 100 g", quantity: "100 g x 1", price: 15, image: chiliImg },
    { name: "Desi Tomato", quantity: "500 g x 1", price: 40, image: tomatoImg },
    { name: "Fortune Chakki Fresh (100% Atta, 0% Maida) Atta", quantity: "5 kg x 1", price: 212, image: attaImg },
    { name: "Small Purple Brinjal", quantity: "(250-300) g x 2", price: 34, image: brinjalImg },
  ],
  bill: {
    mrp: 450,
    discount: -88,
    itemTotal: 362,
    handlingCharges: 70,
    deliveryCharges: 0,
    billTotal: 391,
  },
  details: {
    orderId: "ORD04036542045",
    payment: "Paid Online",
    address: "Ground floor, Quarter no 407 lancer road, Virendra public school Banarsi Das Estate, Timarpur, New Delhi",
    datePlaced: "Thu, 07 Aug'25, 8:48 pm",
  },
};

// --- REUSABLE COMPONENTS ---

// Component for a single item in the order list
const OrderItem = ({ item }) => (
  <div className="flex items-center justify-between py-3 border-t border-gray-100 first:border-t-0">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-800">{item.name}</div>
        <div className="text-xs text-gray-500">{item.quantity}</div>
      </div>
    </div>
    <div className="text-sm font-semibold text-gray-800">₹{item.price}</div>
  </div>
);

// Component for a single bill line
const BillLine = ({ label, value, isTotal = false }) => (
  <div className={`flex justify-between py-1 text-sm ${isTotal ? 'font-bold text-gray-800 pt-3 border-t border-gray-300 mt-2' : 'text-gray-600'}`}>
    <span>{label}</span>
    <span className={label === 'Product discount' ? 'text-red-600' : 'text-gray-800'}>
      {label === 'Product discount' ? '' : '₹'}
      {value}
    </span>
  </div>
);




// --- MAIN PAGE COMPONENT ---
const OderHistory = () => {

  const navigate = useNavigate()
  // Use a mock function for navigation, as 'useNavigate' isn't available outside Router
  const handleGoBack = () => {navigate(-1)};
  const [data] = useState(orderData); // Use the mock data

  return (
    <div className="min-h-screen bg-white flex">
      
      {/* ---------------------------
      // 1. Sidebar (Left Panel)
      // --------------------------- */}
      
      {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm p-6">
              <div className="text-center border-b mb-8">
                <p className="text-sm text-gray-600 font-medium" >Rohit Tripathi</p>
                <p className="text-sm text-gray-600 font-medium">+919560613581</p>
              </div>
              <nav className="space-y-4 text-gray-700">
                <button className="flex items-center gap-3 w-full text-left hover:text-green-700">
                  <MapPin size={18} /> My Addresses
                </button>
                <button className="flex items-center gap-3 w-full text-left hover:text-green-700">
                  <ShoppingBag size={18} /> My Orders
                </button>
                <button className="flex items-center gap-3 w-full text-left hover:text-green-700">
                  <Settings size={18} /> Setting
                </button>
                
                <button className="flex items-center gap-3 w-full text-left text-red-600 hover:text-red-700 mt-6">
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </aside>

      {/* ---------------------------
      // 2. Main Content (Order Details)
      // --------------------------- */}
      <main className="flex-1 max-w-full  mx-auto px-4 py-6 bg-white">
        
        {/* Header and Back Button */}
        <div className="flex items-center mb-6 border-b pb-4">
          <button onClick={handleGoBack} className="text-gray-600 hover:text-green-700 mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Order summary</h1>
        </div>

        {/* Order Status & Invoice Link */}
        <div className="mb-6">
          <p className="text-base font-semibold text-gray-800">{data.status}</p>
          {/* <button className="text-sm text-green-600 hover:underline">
            Download Invoice
          </button> */}
        </div>

        {/* ====================================
        // ORDER ITEMS SECTION
        // ==================================== */}
        <div className="mb-8 border border-gray-200 rounded-lg p-4">
          <h2 className="text-md font-bold mb-4 text-gray-800">
            {data.totalItems} items in this order
          </h2>
          {data.items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>

        {/* ====================================
        // BILL DETAILS SECTION
        // ==================================== */}
        <div className="mb-8 p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Bill details</h2>
          <BillLine label="MRP" value={data.bill.mrp} />
          <BillLine label="Product discount" value={data.bill.discount} />
          <BillLine label="Item total" value={data.bill.itemTotal} />
          <BillLine label="Handling charges" value={data.bill.handlingCharges} />
          <BillLine label="Delivery charges" value={data.bill.deliveryCharges} />
          <BillLine label="Bill total" value={data.bill.billTotal} isTotal={true} />
        </div>

        {/* ====================================
        // ORDER DETAILS SECTION
        // ==================================== */}
        <div className="mb-8 p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order details</h2>
          
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex justify-between">
              <span className="font-medium">Order ID</span>
              <span className="font-semibold text-gray-800 flex items-center gap-1">
                {data.details.orderId}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Payment</span>
              <span className="font-semibold text-green-600">{data.details.payment}</span>
            </p>
            <p>
              <span className="font-medium">Delivery Address</span>
              <br/>
              <span className="text-gray-800">{data.details.address}</span>
            </p>
            <p>
              <span className="font-medium">Order placed on</span>
              <br/>
              <span className="text-gray-800">{data.details.datePlaced}</span>
            </p>
          </div>
        </div>

        {/* ====================================
        // SUPPORT SECTION
        // ==================================== */}
        <div className="p-4 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Need help with your order?</h3>
          <button className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-200 hover:bg-green-100 transition">
            <MessageSquare size={18} />
            Chat with us
          </button>
          <p className="text-xs text-gray-500 mt-1 ml-1">
            About any issues related to your order
          </p>
        </div>

      </main>
    </div>
  );
};

export default OderHistory;