import React, { useState } from "react";
import img1 from '../assets/makha.png'
import img2 from '../assets/chal.png'
import img3 from '../assets/namk.png'
import { useNavigate } from "react-router-dom";


import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  AlertCircle,
} from "lucide-react";

// items List
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
//   {
//     id: "ORD987654",
//     date: "Sep 30, 2025",
//     status: "In Transit",
//     image: img2,
//     productName: "Smart Watch",
//     price: 2499,
//     deliveredOn: null,
//     trackingId: "TRK4567890",
//   },
//   {
//     id: "ORD564738",
//     date: "Aug 22, 2025",
//     status: "Cancelled",
//     image: img3,
//     productName: "Bluetooth Speaker",
//     price: 899,
//     deliveredOn: null,
//     trackingId: "TRK1234567",
//   },
];

//
const statusColor = {
  Delivered: "text-green-600 bg-green-100",
  "In Transit": "text-blue-600 bg-blue-100",
  Cancelled: "text-red-600 bg-red-100",
};



function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  // intance of Navigate
const navigate = useNavigate()

  const handleCancelOrder = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmCancel) {
      setDeliveries((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "Cancelled" } : order
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 lg:px-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
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
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border"
            >
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-20 h-20 rounded-md object-cover border"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {order.productName}
                    </h2>
                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-500">
                      Ordered on {order.date}
                    </p>
                  </div>
                </div>

                {/* Status & Price */}
                <div className="mt-4 lg:mt-0 flex flex-col lg:items-end text-sm">
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
              <div className="mt-4 flex flex-col lg:flex-row justify-between items-start lg:items-center text-sm text-gray-600">
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

                <div className="mt-3 lg:mt-0 flex gap-4">
                  {order.status === "In Transit" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-red-600 flex items-center gap-1 hover:underline"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Cancel Order
                    </button>
                  )}
                  <button className="text-blue-600 hover:underline">
                    Track Order
                  </button>
                  <button className="text-green-700 hover:underline">
                    View Details
                  </button>
                  <button className="text-green-700 hover:underline">
                    Download Invoice
                  </button>
                  <button onClick={() => navigate('/orderHistory')} className="text-green-700 hover:underline">
                    View Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeliveryHistory;
