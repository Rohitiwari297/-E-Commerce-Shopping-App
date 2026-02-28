import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Package, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOrderHistory } from '../utils/Apis';
import { handleInvoice } from '../helper/genPdf';

function DeliveryPage() {
  const statusColor = {
    Delivered: 'text-green-600 bg-green-100',
    'In Transit': 'text-blue-600 bg-blue-100',
    Cancelled: 'text-red-600 bg-red-100',
  };

  //for modal
  const [selectOrder, setSelectOrder] = useState(null);
  console.log('selectOrder', selectOrder);

  const navigate = useNavigate();

  /**
   *
   * ORDER HISTORY DETAILS API USING REACT QUERY
   *
   */
  const { isLoading, data, isError } = useQuery({
    queryKey: ['orderHistoryDetails'],
    queryFn: getOrderHistory,
  });

  console.log('orderHistoryDetails', data?.data);

  return (
    // <DeliveryHistory>
    <div className="">
      {data?.data.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Truck className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <p className="text-lg font-bold text-gray-400">No deliveries found yet.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data?.data.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              {/* Header Info */}
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <Package className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800 text-[15px]">Order #{order.orderId}</h2>
                    <p className="text-[12px] text-gray-400 font-medium">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize flex items-center gap-1.5 
                    ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'pending'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'shipped'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status === 'delivered' && <CheckCircle2 size={14} />}
                    {order.status === 'pending' && <Clock size={14} />}
                    {order.status === 'shipped' && <Truck size={14} />}
                    {order.status === 'cancelled' && <XCircle size={14} />}
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Product Preview */}
              <div className="p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-4 hover:space-x-2 transition-all duration-500">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="relative z-[idx] w-16 h-16 rounded-2xl bg-white border-4 border-white shadow-sm overflow-hidden group-hover:rotate-3 transition-all"
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${item?.product?.images?.[0] || ''}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center text-gray-400 font-bold text-sm">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex w-full lg:w-auto md:flex-col lg:flex-col">
                    <div>
                      <p className="text-sm font-bold text-gray-700"> {order.items.length} Items</p>
                      <p className="text-lg font-black text-green-600">₹{order.totalPrice}</p>
                    </div>
                    <div className="">
                      <p className="text-sm font-bold text-gray-700">
                        {' '}
                        Scheduled Slot: <span className=" font-black text-green-600">{order.scheduledSlot?.label}</span>
                      </p>
                      <p className="text-sm font-bold text-gray-700">
                        {' '}
                        Payment Method: <span className="font-black text-green-600">{order.paymentMethod}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-auto grid grid-cols-2 lg:flex gap-3">
                  <button
                    onClick={() => handleInvoice(order)}
                    className="flex-1 lg:flex-none justify-center px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                  >
                    Invoice
                  </button>
                  <button
                    onClick={() => setSelectOrder(order)}
                    className="flex-1 lg:flex-none justify-center px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-100 border border-green-600 transition-all flex items-center gap-2"
                  >
                    Track
                  </button>
                </div>
              </div>

              {/* Delivery Status Info */}
              <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  {order.status === 'delivered' ? (
                    <p className="text-green-600 font-bold flex items-center gap-2">
                      <CheckCircle2 size={16} /> Delivered successfully
                    </p>
                  ) : order.status === 'cancelled' ? (
                    <p className="text-red-500 font-bold flex items-center gap-2">
                      <XCircle size={16} /> Order Cancelled
                    </p>
                  ) : (
                    <p className="text-blue-600 font-bold flex items-center gap-2 italic">
                      <Clock size={16} /> Delivery reaching soon
                    </p>
                  )}
                </div>

                <button
                  onClick={() => navigate('/orderHistory/' + order._id)}
                  className="text-xs font-bold text-gray-400 hover:text-green-600 transition-colors uppercase tracking-widest"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FOR ORDER TRACKING */}
      {selectOrder && (
        <div className="fixed inset-0 bg-blend-luminosity bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Tracking Order – {selectOrder.orderId}</h3>
            <p className="text-gray-600 mb-2">
              Total Products: <span className="font-medium">{selectOrder.items.length} items</span>
            </p>
            <p className="text-gray-600 mb-2">
              Delivery Address Id: <span className="font-medium text-[15px]">{selectOrder.shippingAddress}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Order Status: <span className={`font-semibold ${statusColor[selectOrder.status]}`}>{selectOrder.status}</span>
            </p>

            <button onClick={() => setSelectOrder(null)} className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg">
              ✕
            </button>

            <div className="text-sm text-gray-500 border-t pt-3 mt-4">Last updated: {selectOrder.updatedAt}</div>
          </div>
        </div>
      )}
    </div>
    // </DeliveryHistory>
  );
}

export default DeliveryPage;
