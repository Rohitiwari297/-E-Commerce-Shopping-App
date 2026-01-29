import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getOrderHistory } from "../utils/Apis";

function DeliveryPage() {
  const statusColor = {
    Delivered: "text-green-600 bg-green-100",
    "In Transit": "text-blue-600 bg-blue-100",
    Cancelled: "text-red-600 bg-red-100",
  };

  //for modal
  const [selectOrder, setSelectOrder] = useState(null);
  console.log("selectOrder", selectOrder);

  const navigate = useNavigate();

  /**
   *
   * ORDER HISTORY DETAILS API USING REACT QUERY
   *
   */
  const { isLoading, data, isError } = useQuery({
    queryKey: ["orderHistoryDetails"],
    queryFn: getOrderHistory,
  });

  console.log("orderHistoryDetails", data?.data);

  return (
    // <DeliveryHistory>
    <div className="px-3 sm:px-6 lg:px-10">
      <h1 className="text-2xl font-bold mb-8 -mt-5  text-gray-800 flex items-center gap-3">
        <Package className="text-green-700" />
        Account & History
      </h1>

      {data?.data.length === 0 ? (
        <div className="text-center py-20">
          <Truck className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <p className="text-lg text-gray-500">No deliveries found yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data?.data.map((order) => (
            <div
              key={order.id}
              className="bg-white px-3 sm:px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition border"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <h2 className="font-semibold text-[15px] text-gray-800">
                  {" "}
                  Order ID: {order.orderId}
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
              <div className="flex flex-col lg:flex-row items-start border-t  lg:items-center justify-between ">
                <div className="flex mt-4 items-center gap-2">
                  {order.items.slice(0, 3).map((item) => (
                    <img
                      key={item.id}
                      src={`${import.meta.env.VITE_BASE_URL}${item?.product?.images?.[0] || ""}`}
                      alt={item.name}
                      className="w-15 h-15 rounded-md object-cover border border-gray-200 p-2"
                    />
                  ))}

                  {order.items.length > 3 && (
                    <div
                      onClick={() => navigate("/orderHistory")}
                      className="w-15 h-15 cursor-pointer flex items-center justify-center rounded-md bg-gray-100 border border-gray-200 p-2"
                    >
                      <h2 className="font-semibold text-lg text-gray-500">
                        +{order.items.length - 3}
                      </h2>
                    </div>
                  )}
                </div>

                <div className="mt-4 lg:mt-0 flex flex-col  lg:items-end text-sm">
                  <p
                    className={`inline-flex items-center px-3 text-gray-500 py-1 rounded-full text-sm font-medium ${
                      statusColor[order.status]
                    }`}
                  >
                    {order.status === "delivered" && (
                      <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" />
                    )}
                    {order.status === "shipped" && (
                      <Clock className="w-4 h-4 mr-1 text-yellow-600" />
                    )}
                    {order.status === "cancelled" && (
                      <XCircle className="w-4 h-4 mr-1 text-red-600" />
                    )}
                    {order.status === "pending" && (
                      <Clock className="w-4 h-4 mr-1 text-blue-600" />
                    )}
                    {order.status}
                  </p>
                  <p className="mt-2 text-gray-500 font-semibold">
                    Total: <span className="text-green-600">₹{order.totalPrice}</span>
                  </p>
                </div>
              </div>

              {/* Footer Row */}
              <div className="mt-4 flex border-t flex-col lg:flex-row justify-between items-start lg:items-center text-sm text-gray-600">
                
                {/* THIS ONE IS PENDING NOT IMPLEMENTED BY THE BACKEND */}

                {order.deliveredOn ? (
                  <p>
                    Delivered on:{" "}
                    <span className="font-medium">{order.deliveredOn}</span>
                  </p>
                ) : order.status === "shipped" || order.status === "pending" ? (
                  <p className="text-blue-700">Expected delivery in 2–3 days</p>
                ) : order.status === "delivered" ?(
                  <p className="text-green-700">Delivered</p>
                ):order.status === "cancelled" ?(
                  <p>Cancelled</p>
                ): null}


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

      {/* MODAL FOR ORDER TRACKING */}
      {selectOrder && (
        <div className="fixed inset-0 bg-blend-luminosity bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Tracking Order – {selectOrder.orderId}
            </h3>
            <p className="text-gray-600 mb-2">
              Total Products:{" "}
              <span className="font-medium">{selectOrder.items.length} items</span>
            </p>
            <p className="text-gray-600 mb-2">
              Delivery Address Id:{" "}
              <span className="font-medium text-[15px]">{selectOrder.shippingAddress}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Order Status:{" "}
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
              Last updated: {selectOrder.updatedAt}
            </div>
          </div>
        </div>
      )}
    </div>
    // </DeliveryHistory>
  );
}

export default DeliveryPage;
