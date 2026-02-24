import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


//invoice download
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/hel.png"; //  use store logo here

import { MapPin, LogOut, ShoppingBag, Settings as SettingsIcon, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DeliveryPage from "./DeliveryPage";
import AddressModalPage from "./AddressModalPage";
import Profile from "./Profile";
import Settings from './Settings'
import { getUserDetails } from "../redux/features/user/userSlice";


// Handle Invoice Download
const handleInvoice = (order) => {
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

  //  Add Logo + Store Info
  const imgWidth = 25;
  const imgHeight = 25;
  doc.addImage(logo, "PNG", 15, 10, imgWidth, imgHeight);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Baniya Di Hatti", 45, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Near Hanuman Mandir, Delhi - 110085", 45, 25);
  doc.text("Phone: +91 9560613581 | support@baniyadihatti.com", 45, 31);

  // Line under header
  doc.setDrawColor(0);
  doc.line(15, 35, 195, 35);

  // Customer Info Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Billed To:", 15, 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Rohit Tripathi", 15, 52);
  doc.text("+91 9560613581", 15, 58);
  doc.text("Delhi, India", 15, 64);

  //  Order Info Section
  doc.setFont("helvetica", "bold");
  doc.text("Order Details:", 120, 45);
  doc.doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Order ID: ${order.id}`, 120, 52);
  doc.text(`Date: ${order.date}`, 120, 58);
  doc.text(`Status: ${order.status}`, 120, 64);
  if (order.deliveredOn)
    doc.text(`Delivered On: ${order.deliveredOn}`, 120, 70);

  //  Product Table
  autoTable(doc, {
    startY: 80,
    head: [["#", "Product", "Qty", "Price (Rs.)", "Total (Rs)"]],
    body: [[1, order.productName, 1, order.price, order.price]],
    theme: "grid",
    headStyles: { fillColor: [0, 102, 0], textColor: 255, fontStyle: "bold" },
    bodyStyles: { textColor: [40, 40, 40] },
    styles: { halign: "center" },
    columnStyles: {
      1: { halign: "left" },
    },
  });

  //  Total Section
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 150, finalY);
  doc.text(`Rs.${order.price}`, 200, finalY, { align: "right" });
  doc.text("Delivery Fee:", 150, finalY + 7);
  doc.text("Rs.0", 200, finalY + 7, { align: "right" });
  doc.text("Total Amount:", 150, finalY + 14);
  doc.text(`Rs.${order.price}`, 200, finalY + 14, { align: "right" });

  // Line above footer
  doc.line(15, finalY + 25, 195, finalY + 25);

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Thank you for shopping with Baniya Di Hatti!", 15, finalY + 35);
  doc.text(
    "For assistance, contact support@baniyadihatti.com",
    15,
    finalY + 41,
  );
  doc.text("Authorized Signature", 150, finalY + 41);
  doc.line(150, finalY + 42, 190, finalY + 42);

  //  Save PDF
  doc.save(`Invoice_${order.id}.pdf`);
};

function DeliveryHistory() {
  
  const navigate = useNavigate();
  const location = useLocation();

  // state for selected menu
  const [menu, setMenu] = useState("orders");


  // Get user details from store
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  //for modal
  const [selectOrder, setSelectOrder] = useState(null);
  console.log("selectOrder", selectOrder);

  const handleCancelOrder = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );
    if (confirmCancel) {
      setDeliveries((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "Cancelled" } : order,
        ),
      );
    }
  };

  // get user details from store
  const dispatch = useDispatch();

  const { user: userData, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails(user._id));
    
    // Check if a specific menu was requested via navigate state
    if (location.state?.menu) {
      setMenu(location.state.menu);
      // Optional: clear the state to prevent re-applying on refresh
      window.history.replaceState({}, document.title);
    }
  }, [user._id, location.state]);

  console.log("user data", userData);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar / Top Menu */}
      <aside className="bg-white md:w-72 shadow-xl shadow-gray-200/50 md:sticky md:top-20 md:h-[calc(100vh-80px)] z-10 transition-all duration-300 flex flex-col">
        {/* User Info Card */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3 border-4 border-green-50">
              <User size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight text-center">
              {userData?.name || "User Name"}
            </h3>
            <p className="text-sm font-semibold text-gray-400 mt-1">
              +91-{userData?.mobile || "XXXXXXXXXX"}
            </p>
          </div>
        </div>

        {/* Navigation Wrapper */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto p-3 md:p-4 text-sm no-scrollbar flex-1">
            {[
              { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
              { id: 'address', label: 'My Addresses', icon: <MapPin size={20} /> },
              { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
              { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setMenu(item.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 whitespace-nowrap font-bold group
                  ${menu === item.id 
                    ? "bg-green-600 text-white shadow-lg shadow-green-200" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
                  }`}
              >
                <span className={`${menu === item.id ? "text-white" : "text-gray-400 group-hover:text-green-600"}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout Section - Fixed at bottom on desktop */}
          <div className="p-3 md:p-4 border-t border-gray-100 bg-white">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-600 font-bold bg-red-50/50 hover:bg-red-50 transition-all w-full group whitespace-nowrap"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" /> 
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          {menu === "orders" && <DeliveryPage  />}

          {menu === "address" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">My Addresses</h2>
              <AddressModalPage />
            </div>
          )}

          {menu === "settings" && <Settings />}

          {menu === "profile" && <Profile />}
        </div>
      </main>
    </div>
  );
}

export default DeliveryHistory;
