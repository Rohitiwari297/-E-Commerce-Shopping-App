import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/makha.png";
import img2 from "../assets/chal.png";
import img3 from "../assets/namk.png";

//invoice download
import jsPDF  from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/hel.png"; //  use store logo here


import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  AlertCircle,
  MapPin,
  Gift,
  Lock,
  LogOut,
  ShoppingBag,
  Settings,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import DeliveryPage from "./DeliveryPage";
import AddressModalPage from "./AddressModalPage ";
import { GiRamProfile } from "react-icons/gi";


const initialDeliveries = [
  {
    id: "ORD123456",
    date: "Sep 28, 2025",
    status: "Delivered",
    image: img1,
    productName: "Wireless Headphones",
    price: 1299,
    deliveredOn: "Oct 1, 2025",
    trackingId: "TRK7890123",
  },
];

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
  doc.
  doc.setFont("helvetica", "normal");
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
  doc.text("For assistance, contact support@baniyadihatti.com", 15, finalY + 41);
  doc.text("Authorized Signature", 150, finalY + 41);
  doc.line(150, finalY + 42, 190, finalY + 42);

  //  Save PDF
  doc.save(`Invoice_${order.id}.pdf`);
};


function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const navigate = useNavigate();

  // state for menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // state for selected menu 
  const [menu, setMenu] = useState("orders");

    // Get user details from store
    const user = useSelector((state) => state.auth.user);
    console.log('user',user)

  //for modal
  const [selectOrder , setSelectOrder] = useState(null)
  console.log('selectOrder', selectOrder)

  const handleCancelOrder = (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (confirmCancel) {
      setDeliveries((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "Cancelled" } : order
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6">
        <div className="text-center border-b mb-8">
          <p className="text-sm text-gray-600 font-medium" >{user.name || "Rohit Tripathi"}</p>
          <p className="text-sm text-gray-600 font-medium">+91-{user.mobile}</p>
        </div>
        <nav className="space-y-4 text-gray-700">
          <button onClick={() => setMenu("address")} className="flex items-center gap-3 w-full text-left hover:text-green-700">
            <MapPin size={18} /> Addresses
          </button>
          <button onClick={() => setMenu("orders")} className="flex items-center gap-3 w-full text-left hover:text-green-700">
            <ShoppingBag size={18} /> My Orders
          </button>
          <button onClick={() => setMenu("orders")} className="flex items-center gap-3 w-full text-left hover:text-green-700">
            <User size={18} /> Profile
          </button>
          <button onClick={() => setMenu("settings")} className="flex items-center gap-3 w-full text-left hover:text-green-700">
            <Settings size={18} /> Setting
          </button>
          
          <button className="flex items-center gap-3 w-full text-left text-red-600 hover:text-red-700 mt-6">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
    
        <main className="flex-1 py-10 px-4 lg:px-12">
          {menu === "orders" && (
          <DeliveryPage deliveries={deliveries} />
        )}

        {menu === "address" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
            {/* You can replace this with AddressPage component */}
            {/* <p>Address page content here...</p> */}
            <AddressModalPage />
          </div>
        )}

        {menu === "settings" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p>Settings content here...</p>
          </div>
        )}
        </main>
      
    </div>

  
  );
}

export default DeliveryHistory;
