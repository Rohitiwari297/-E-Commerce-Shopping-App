import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/makha.png";
import img2 from "../assets/chal.png";
import img3 from "../assets/namk.png";

//invoice download
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/hel.png"; //  use store logo here

import { MapPin, LogOut, ShoppingBag, Settings, User, Bell, Mail, Lock, Target } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DeliveryPage from "./DeliveryPage";
import AddressModalPage from "./AddressModalPage";
import { GiRamProfile } from "react-icons/gi";
import Profile from "./Profile";
import { getUserDetails } from "../redux/features/user/userSlice";


const statusColor = {
  Delivered: "text-green-600 bg-green-100",
  "In Transit": "text-blue-600 bg-blue-100",
  Cancelled: "text-red-600 bg-red-100",
};

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

  // state for selected menu
  const [menu, setMenu] = useState("orders");

  // state for settings toggle
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: false,
    accountPrivacy: true,
    twoFactorAuth: false,
  });

  const handleSettingToggle = (id) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
  }, [user._id]);

  console.log("user data", userData);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar / Top Menu */}
      <aside className="bg-white md:w-72 shadow-xl shadow-gray-200/50 md:sticky md:top-20 md:h-[calc(100vh-80px)] z-10 transition-all duration-300">
        {/* User Info Card */}
        <div className="p-6 border-b border-gray-100 mb-2">
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

        {/* Navigation */}
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible p-3 md:p-4 text-sm no-scrollbar">
          {[
            { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
            { id: 'address', label: 'My Addresses', icon: <MapPin size={20} /> },
            { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
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

          <div className="md:mt-6 md:pt-6 md:border-t border-gray-100 px-1">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-600 font-bold bg-red-50/50 hover:bg-red-50 transition-all w-full group whitespace-nowrap"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" /> 
              Logout
            </button>
          </div>
        </nav>
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

          {menu === "settings" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <div>
                  <h2 className="text-2xl font-black text-gray-800">Account Settings</h2>
                  <p className="text-gray-400 font-medium text-sm mt-1">Manage your app experience and security</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'pushNotifications', title: 'Push Notifications', desc: 'Receive real-time order updates', icon: <Bell size={20} /> },
                  { id: 'emailAlerts', title: 'Email Alerts', desc: 'Product news and exclusive offers', icon: <Mail size={20} /> },
                  { id: 'accountPrivacy', title: 'Account Privacy', desc: 'Manage your data visibility', icon: <Lock size={20} /> },
                  { id: 'twoFactorAuth', title: 'Two-Factor Auth', desc: 'Secure your account with 2FA', icon: <Target size={20} /> },
                ].map((s) => (
                  <div key={s.id} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-between group hover:border-green-600/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${settings[s.id] ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'} transition-colors`}>
                        {s.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-[15px]">{s.title}</h4>
                        <p className="text-gray-400 text-xs font-medium">{s.desc}</p>
                      </div>
                    </div>
                    <div 
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${settings[s.id] ? 'bg-green-600' : 'bg-gray-200'}`}
                      onClick={() => handleSettingToggle(s.id)}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[s.id] ? 'left-7' : 'left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-3xl bg-red-50 border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-black text-red-800">Danger Zone</h4>
                  <p className="text-sm text-red-700/60 font-medium">Temporarily disable or permanently delete your account</p>
                </div>
                <button className="px-6 py-2.5 bg-white text-red-600 font-black text-xs uppercase tracking-widest rounded-xl shadow-sm hover:shadow-md transition-all">
                  Request Deletion
                </button>
              </div>
            </div>
          )}

          {menu === "profile" && <Profile />}
        </div>
      </main>
    </div>
  );
}

export default DeliveryHistory;
