import React, { useState } from "react";

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
import DeliveryHistory from "./DeliveryHistory";
import { useNavigate } from "react-router-dom";

function DeliveryPage({ deliveries }) {
  const statusColor = {
    Delivered: "text-green-600 bg-green-100",
    "In Transit": "text-blue-600 bg-blue-100",
    Cancelled: "text-red-600 bg-red-100",
  };

  //for modal
  const [selectOrder, setSelectOrder] = useState(null);
  console.log("selectOrder", selectOrder);

  const navigate = useNavigate();
  return (
    // <DeliveryHistory>
      <div>
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
                  <h2 className="font-semibold text-[15px] text-gray-800">
                    {" "}
                    Order ID: {order.id}
                  </h2>
                  <div
                    className="cursor-pointer text-green-900"
                    onClick={() => {
                      navigate("/orderHistory");
                    }}
                  >
                    {" "}
                    →{" "}
                  </div>
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
                      <div
                        onClick={() => {
                          navigate("/orderHistory");
                        }}
                        className="w-15 cursor-pointer flex items-center justify-center h-15 rounded-md bg-gray-100 object-cover border border-gray-200 p-2"
                      >
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
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        statusColor[order.status]
                      }`}
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
                    <button
                      onClick={() => setSelectOrder(order)}
                      className="text-blue-600 hover:underline"
                    >
                      Track Order
                    </button>

                    <button className="text-green-700 hover:underline">
                      View Details
                    </button>
                    <button
                      onClick={() => handleInvoice(order)}
                      className="text-green-700 hover:underline"
                    >
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
                Product:{" "}
                <span className="font-medium">{selectOrder.productName}</span>
              </p>
              <p className="text-gray-600 mb-2">
                Tracking ID:{" "}
                <span className="font-medium">{selectOrder.trackingId}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Status:{" "}
                <span
                  className={`font-semibold ${statusColor[selectOrder.status]}`}
                >
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
      </div>
    // </DeliveryHistory>
  );
}

export default DeliveryPage;
