import React, { useEffect, useState } from "react";
import { getAddress, saveAddress } from "../utils/Apis";
import { Pen, Trash, MapPin } from "lucide-react";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddressModalPage = ({ onClose, onSelectAddress }) => {
  const navigate = useNavigate();
  // All Address
  const [address, setAddress] = useState([]);
  useEffect(() => {
    getAddress(setAddress);
  }, []);

  // ADD NEW ADDRESS MODAL
  const [showModal, setShowModal] = useState(false);

  //Selected Address

  const [selectedOption, setSelectedOption] = useState({
    locationType: "",
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setSelectedOption({
      ...selectedOption,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    if (
      !selectedOption.locationType ||
      !selectedOption.name ||
      !selectedOption.email ||
      !selectedOption.mobile ||
      !selectedOption.city ||
      !selectedOption.state ||
      !selectedOption.pincode
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    e.preventDefault();
    setShowModal(false);
    saveAddress(selectedOption);
    onClose();
  };

  // Function to handle address selection
  const handleSelectAddress = (item) => {
    onSelectAddress(item);
    localStorage.setItem("selectedAddress", JSON.stringify(item));
    onClose();
  };

return (
  <div className="w-full flex flex-col gap-6">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT : ADDRESS LIST */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-gray-800">My Addresses</h2>
          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">
            {address.length} Saved
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
          {address.length > 0 ? (
            address.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelectAddress(item)}
                className="group p-5 rounded-3xl border border-gray-100 bg-white hover:border-green-600 hover:shadow-xl hover:shadow-green-50 shadow-sm cursor-pointer transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider rounded-md border border-green-100">
                      {item.locationType || "Home"}
                    </span>
                    <p className="font-bold text-gray-800">{item.name}</p>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toast.error("Work is pending..."); }}
                      className="p-2 bg-gray-50 hover:bg-green-50 text-green-600 rounded-xl transition-colors"
                    >
                      <Pen size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toast.error("Work is pending..."); }}
                      className="p-2 bg-gray-50 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-gray-500 font-medium relative z-10">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    {item.mobile}
                  </p>
                  <p className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5"></span>
                    {item.city}, {item.state} - {item.pincode}
                  </p>
                </div>
                
                {/* Decoration */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-50/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">No addresses saved yet</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT : FORM / ACTION */}
      <div className="w-full lg:w-1/2">
        <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 h-full">
          {!showModal ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-600 mb-6">
                <MapPin size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Need a new location?</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-[240px]">
                Add a new delivery address for a faster checkout experience.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2"
              >
                + Add New Address
              </button>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Add New Address</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-sm">Cancel</button>
              </div>

              {/* LOCATION TYPE */}
              <div className="flex gap-3 mb-6">
                {['home', 'work'].map((type) => (
                  <label key={type} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all font-bold capitalize text-sm
                    ${selectedOption.locationType === type 
                      ? "border-green-600 bg-green-50 text-green-700 shadow-sm" 
                      : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="locationType"
                      value={type}
                      className="hidden"
                      checked={selectedOption.locationType === type}
                      onChange={handleChange}
                    />
                    {type}
                  </label>
                ))}
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" placeholder="Full Name*" value={selectedOption.name} onChange={handleChange} className="bg-white border border-gray-100 p-3.5 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all" />
                <input name="mobile" placeholder="Mobile Number*" value={selectedOption.mobile} onChange={handleChange} className="bg-white border border-gray-100 p-3.5 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all" />
                <input name="email" placeholder="Email Address*" className="sm:col-span-2 bg-white border border-gray-100 p-3.5 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all" value={selectedOption.email} onChange={handleChange} />
                <input name="city" placeholder="City*" value={selectedOption.city} onChange={handleChange} className="bg-white border border-gray-100 p-3.5 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all" />
                <input name="state" placeholder="State*" value={selectedOption.state} onChange={handleChange} className="bg-white border border-gray-100 p-3.5 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all" />
                <input name="pincode" placeholder="Pincode*" value={selectedOption.pincode} onChange={handleChange} className="sm:col-span-2 bg-white border border-gray-100 p-3.5 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all" />
              </div>

              <button
                onClick={handleFormSubmit}
                className="w-full mt-8 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
              >
                Save Delivery Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);



};

export default AddressModalPage;
