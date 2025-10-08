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
} from "lucide-react";


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

  // 🧾 Add Logo + Store Info
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

  // 🧍 Customer Info Section
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

  // 💾 Save PDF
  doc.save(`Invoice_${order.id}.pdf`);
};


function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const navigate = useNavigate();

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

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 lg:px-12">
        <h1 className="text-2xl font-bold mb-8 -mt-5 text-gray-800 flex items-center gap-3">
          <Package className="text-green-700" />
          Account & History
        </h1>

        {deliveries.length === 0 ? (
          <div className="text-center py-20">
            <Truck className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <p className="text-lg text-gray-500">No deliveries found yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {deliveries.map((order) => (
              <div
                key={order.id}
                className="bg-white px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition border"
              >
                {/* Header Row */}
                  <div className="flex justify-between items-center mb-2 ">
                    <h2 className="font-semibold text-[15px] text-gray-800" > Order ID: {order.id}</h2>
                    <div className="cursor-pointer text-green-900" onClick={()=> {navigate('/orderHistory')}}> → </div>
                  </div>
                <div className="flex flex-col lg:flex-row items-start border-t  lg:items-center justify-between">
                  
                  
                  <div className="flex mt-4 items-center  gap-2">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-15 h-15 rounded-md object-cover border border-gray-200 p-2"
                    />
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-15 h-15 rounded-md object-cover border border-gray-200 p-2"
                    />
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-15 h-15 rounded-md object-cover border border-gray-200 p-2"
                    />
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-15 h-15 rounded-md object-cover border border-gray-200 p-2"
                    />
                    <div>
                      <div onClick={()=> {navigate('/orderHistory')}} className="w-15 cursor-pointer flex items-center justify-center h-15 rounded-md bg-gray-100 object-cover border border-gray-200 p-2" >
                        <h2 className="font-semibold  text-lg text-gray-500">
                          +3 
                        </h2>
                      </div>
                    </div>
                    <div>
                      {/* <h2 className="font-semibold text-lg text-gray-800">
                        {order.productName}
                      </h2> */}
                      {/* <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-500">
                        Ordered on {order.date}
                      </p> */}
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 flex flex-col  lg:items-end text-sm">
                    <p
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor[order.status]}`}
                    >
                      {order.status === "Delivered" && (
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                      )}
                      {order.status === "In Transit" && (
                        <Clock className="w-4 h-4 mr-1" />
                      )}
                      {order.status === "Cancelled" && (
                        <XCircle className="w-4 h-4 mr-1" />
                      )}
                      {order.status}
                    </p>
                    <p className="mt-2 text-gray-700 font-semibold">
                      ₹{order.price}
                    </p>
                  </div>
                </div>

                {/* Footer Row */}
                <div className="mt-4 flex border-t flex-col lg:flex-row justify-between items-start lg:items-center text-sm text-gray-600">
                  {order.deliveredOn ? (
                    <p>
                      Delivered on:{" "}
                      <span className="font-medium">{order.deliveredOn}</span>
                    </p>
                  ) : order.status === "In Transit" ? (
                    <p>Expected delivery in 2–3 days</p>
                  ) : (
                    <p>Order was cancelled</p>
                  )}

                  <div className="mt-3 lg:mt-0 flex flex-wrap gap-4">
                    {order.status === "In Transit" && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-red-600 flex items-center gap-1 hover:underline"
                      >
                        <AlertCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                    )}
                    <button onClick={()=> setSelectOrder(order)} className="text-blue-600 hover:underline">
                      Track Order
                    </button>
          
                    

                    <button className="text-green-700 hover:underline">
                      View Details
                    </button>
                    <button onClick={()=>handleInvoice(order)} className="text-green-700 hover:underline">
                      Download Invoice
                    </button>
                    <button
                      onClick={() => navigate("/orderHistory")}
                      className="text-green-700 hover:underline"
                    >
                      View Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* order tracker */}
        {selectOrder && (
          <div className="fixed inset-0 bg-blend-luminosity bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Tracking Order – {selectOrder.id}
              </h3>
              <p className="text-gray-600 mb-2">
                Product: <span className="font-medium">{selectOrder.productName}</span>
              </p>
              <p className="text-gray-600 mb-2">
                Tracking ID: <span className="font-medium">{selectOrder.trackingId}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Status:{" "}
                <span className={`font-semibold ${statusColor[selectOrder.status]}`}>
                  {selectOrder.status}
                </span>
              </p>

              <button
                onClick={() => setSelectOrder(null)}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg"
              >
                ✕
              </button>

              <div className="text-sm text-gray-500 border-t pt-3 mt-4">
                Last updated: Oct 6, 2025
              </div>
            </div>
          </div>
        )}


      </main>
    </div>

  
  );
}

export default DeliveryHistory;
