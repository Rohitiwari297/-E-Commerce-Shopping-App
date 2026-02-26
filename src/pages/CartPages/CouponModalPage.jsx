import React, { useEffect, useState } from 'react';
import { MdClose, MdContentCopy, MdLocalOffer } from 'react-icons/md';
import { getCoupon, ApplyCoupon } from '../../utils/Apis';
import toast from 'react-hot-toast';

function CouponModalPage({ onClose, onApply, totalPrice }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await getCoupon();
        // Since getCoupon now returns res.data.data (which is an array)
        if (Array.isArray(res)) {
          setCoupons(res);
        } else if (res?.success && Array.isArray(res.coupons)) {
          // Fallback just in case
          setCoupons(res.coupons);
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleApply = async (code) => {
    try {
      const res = await ApplyCoupon(code || couponCode);
      console.log('ApplyCoupon Response:', res);
      
      if (res?.success && res.data?.priceSummary) {
        toast.success(res.message || 'Coupon applied successfully!');
        
        const { discount, couponCode: appliedCode } = res.data.priceSummary;
        
        // Pass the actual discount provided by the backend
        const calculatedDiscount = discount || 0;
        const couponData = {
          code: appliedCode || code || couponCode,
          ...res.data.priceSummary
        };

        console.log("Calculated Discount Final (from API):", calculatedDiscount);
        onApply(calculatedDiscount, couponData);
        onClose();
      } else {
        toast.error(res?.message || 'Invalid coupon code');
      }
    } catch (error) {
      toast.error('Failed to apply coupon');
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <MdLocalOffer className="text-green-600" /> Available Coupons
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
          <MdClose size={24} className="text-gray-500" />
        </button>
      </div>

      {/* Manual Input */}
      <div className="p-4 border-b bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="flex-1 border rounded-lg px-3 py-2 uppercase font-semibold text-sm focus:ring-2 focus:ring-green-500 outline-none"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            onClick={() => handleApply()}
            disabled={!couponCode}
            className="bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            APPLY
          </button>
        </div>
      </div>

      {/* Coupon List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
          </div>
        ) : coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="border-2 border-dashed border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors relative group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-green-700 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                      {coupon.code}
                    </span>
                    {coupon.title && (
                      <span className="text-[10px] font-bold text-green-800 bg-green-200 px-2 py-0.5 rounded uppercase">
                        {coupon.title}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{coupon.description}</p>
                  <div className="flex gap-3 mt-2">
                    <p className="text-[10px] text-gray-600 font-medium">
                      Type: <span className="text-green-700">{coupon.discountType === 'PERCENT' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT`}</span>
                    </p>
                    {coupon.minimumOrderAmount > 0 && (
                      <p className="text-[10px] text-gray-500">Min Order: ₹{coupon.minimumOrderAmount}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleApply(coupon.code)}
                  className="bg-white text-green-700 border border-green-700 px-3 py-1 rounded-md font-bold text-xs hover:bg-green-700 hover:text-white transition-all ml-2"
                >
                  APPLY
                </button>
              </div>
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-r-2 border-dashed border-green-200"></div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-l-2 border-dashed border-green-200"></div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No coupons available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CouponModalPage;
