import React, { useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="   -mt-10  ">
      
      <div className="bg-white shadow-xl rounded-2xl   p-8 w-full ">

        <div className="flex justify-between mb-6 ">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Personal Information
        </h1>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-green-700 hover:bg-green-600 text-white font-sm px-4 text-[15px] rounded-lg transition-all"
          >
            Update Profile
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <h2 className="text-gray-600 font-medium">Customer Name:</h2>
            <p className="text-gray-800 font-semibold">{user?.name || "Pinchuk"}</p>
          </div>

          <div className="flex justify-between border-b pb-2">
            <h2 className="text-gray-600 font-medium">Customer Number:</h2>
            <p className="text-gray-800 font-semibold">{user?.mobile}</p>
          </div>

          <div className="flex justify-between border-b pb-2">
            <h2 className="text-gray-600 font-medium">Customer Email:</h2>
            <p className="text-gray-800 font-semibold">{user?.email || "pinchuk@gmail.com"}</p>
          </div>

          {/* Address */}
          <div className="border-b pb-2">
            <h2 className="text-gray-600 font-medium mb-2">Addresses:</h2>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <h3 className="font-medium text-gray-700">Current Address:</h3>
                <p className="text-gray-800">
                  {user?.currentAddress || "DLE Industrial Area, Moti Nagar, New Delhi"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Home Address:</h3>
                <p className="text-gray-800">
                  {user?.homeAddress || "DLE Industrial Area, Moti Nagar, New Delhi"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Office Address:</h3>
                <p className="text-gray-800">
                  {user?.officeAddress || "DLE Industrial Area, Moti Nagar, New Delhi"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeInScale">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Update Profile</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Customer Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue={user?.name}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Customer Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue={user?.mobile}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Customer Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue={user?.email}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="2"
                  defaultValue={user?.address}
                ></textarea>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-200 text-gray-800"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-green-700 hover:bg-green-600 text-white"
                onClick={() =>
                  setIsMenuOpen(false) || alert("Add backend functionality here!")
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
