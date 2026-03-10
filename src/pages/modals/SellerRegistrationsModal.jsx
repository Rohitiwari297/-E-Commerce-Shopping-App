import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { SellerRegister } from '../../utils/Apis';

function SellerRegistrationsModal({ open, setOpen }) {
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registeredData, setRegisteredData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    aadharNumber: '',
    aadharImage: null,
    panNumber: '',
    panImage: null,
    gstNumber: '',
    gstImage: null,
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    passbookImage: null,
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisteredData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setRegisteredData((prev) => ({ ...prev, [name]: file }));
      if (name === 'profile') {
        setProfilePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.keys(registeredData).forEach(key => {
        if (registeredData[key] !== null && registeredData[key] !== undefined) {
          formData.append(key, registeredData[key]);
        }
      });

      const res = await SellerRegister(formData);

      if (res.status === 201 || res.data?.success) {
        toast.success(res.data?.message || 'Seller registration submitted successfully!');
        setOpen(false);
      } else {
        const errorMsg = res.data?.message || res.message || 'Registration failed';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Submit Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-8 text-center text-green-700">Seller Registration</h2>

        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <input type="file" id="profile" name="profile" className="hidden" onChange={handleFileChange} accept="image/*" />
            <label
              htmlFor="profile"
              className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-green-300 rounded-full cursor-pointer hover:border-green-500 transition-colors overflow-hidden"
            >
              {profilePreview ? (
                <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-gray-400">
                  <Avatar sx={{ width: 64, height: 64, margin: '0 auto', bgcolor: '#e2e8f0' }} />
                  <span className="text-xs block mt-1">Upload Photo</span>
                </div>
              )}
            </label>
            <p className="text-sm text-gray-500 mt-2">Profile Picture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600 border-b pb-1">Basic Information</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                value={registeredData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                value={registeredData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                value={registeredData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                value={registeredData.password}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Business Address"
                className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none h-24"
                value={registeredData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Documents & Identification */}
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600 border-b pb-1">Documents & Identification</h3>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="aadharNumber"
                  placeholder="Aadhaar Number"
                  className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={registeredData.aadharNumber}
                  onChange={handleChange}
                  required
                />
                <div className="relative">
                  <input
                    type="file"
                    name="aadharImage"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    required
                  />
                  <div className="border p-2.5 rounded text-sm text-gray-500 truncate bg-gray-50">
                    {registeredData.aadharImage ? registeredData.aadharImage.name : 'Upload Aadhaar'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="panNumber"
                  placeholder="PAN Number"
                  className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={registeredData.panNumber}
                  onChange={handleChange}
                  required
                />
                <div className="relative">
                  <input
                    type="file"
                    name="panImage"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    required
                  />
                  <div className="border p-2.5 rounded text-sm text-gray-500 truncate bg-gray-50">
                    {registeredData.panImage ? registeredData.panImage.name : 'Upload PAN'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="gstNumber"
                  placeholder="GST Number"
                  className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={registeredData.gstNumber}
                  onChange={handleChange}
                />
                <div className="relative">
                  <input
                    type="file"
                    name="gstImage"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="border p-2.5 rounded text-sm text-gray-500 truncate bg-gray-50">
                    {registeredData.gstImage ? registeredData.gstImage.name : 'Upload GST'}
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <h3 className="font-semibold text-green-600 border-b pb-1 mt-6">Bank Details</h3>
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                value={registeredData.bankName}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Account Number"
                  className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={registeredData.accountNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="ifscCode"
                  placeholder="IFSC Code"
                  className="w-full border p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={registeredData.ifscCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="file"
                  name="passbookImage"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  required
                />
                <div className="border p-2.5 rounded text-sm text-gray-500 truncate bg-gray-50">
                  {registeredData.passbookImage ? registeredData.passbookImage.name : 'Upload Passbook/Cheque'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-12 py-3 rounded-lg shadow-md hover:shadow-lg transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register as Seller"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerRegistrationsModal;
