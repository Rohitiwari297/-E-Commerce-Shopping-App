import { Target, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileDetails } from "../redux/features/user/userAPI";
import { getUserDetails } from "../redux/features/user/userSlice";

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // // get user details from store
  const { user: userData, loading, error } = useSelector((state) => state.user);
  console.log("user data1", userData);


  // state for update profile
  const [updateProfile, setUpdateProfile] = useState({
    id: user._id,
    avatar: "",
    location: "",
    name: "",
  });

  // console.log("updateProfile", updateProfile);

  // handle save button
  const handleSaveButton = () => {
  setIsMenuOpen(false);
  updateProfileDetails({
    id: user._id,
    updateProfile,
    //setUser,      // pass this
  });
};


 

  return (
    <div className="">
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-800">Personal Information</h1>
            <p className="text-gray-400 font-medium text-sm mt-1">Manage your basic profile details here</p>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
          >
            Update Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Customer Name', value: userData?.name || "User Name", icon: <User size={18} /> },
            { label: 'Phone Number', value: `+91-${userData?.mobile}`, icon: <Target size={18} /> },
            { label: 'Email Address', value: userData?.email || "Email not set", icon: <Target size={18} /> },
            { label: 'Primary Location', value: userData?.location || "No location set", icon: <Target size={18} /> }
          ].map((info, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 group hover:bg-white hover:border-green-100 hover:shadow-xl hover:shadow-green-50/50 transition-all duration-300">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                {info.icon} {info.label}
              </span>
              <p className="text-[15px] font-bold text-gray-800">{info.value}</p>
            </div>
          ))}

          <div className="md:col-span-2 p-5 rounded-2xl bg-green-50 border border-green-100 flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-green-600">
              <Target size={24} />
            </div>
            <div>
              <h3 className="font-bold text-green-800">Quick Tip</h3>
              <p className="text-sm text-green-700/70 font-medium leading-relaxed">
                Keeping your profile updated helps us serve you better and ensures accurate deliveries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100] flex justify-center items-center px-4 animate-fadeIn">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg p-8 animate-slideUp border border-gray-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-800">Update Profile</h2>
                <p className="text-gray-400 text-sm font-medium">Update your account information</p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                &times;
              </button>
            </div>
            
            {/* Form Fields */}
            <div className="space-y-5 overflow-y-auto max-h-[60vh] pr-2 no-scrollbar">
              <div className="group">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Profile Photo</label>
                <div className="relative">
                  <input 
                    type="file" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all"
                    defaultValue={user?.profilePic}
                    onChange={(e) => setUpdateProfile({...updateProfile, avatar: e.target.value})}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all"
                  defaultValue={userData?.name}
                  onChange={(e) => setUpdateProfile({...updateProfile, name: e.target.value})}
                />
              </div>

              <div className="group">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Address</label>
                <textarea
                  placeholder="Street, locality, city..."
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all min-h-[100px] resize-none"
                  defaultValue={userData?.location}
                  onChange={(e) => setUpdateProfile({...updateProfile, location: e.target.value})}
                ></textarea>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 text-gray-500 font-bold hover:bg-gray-100 transition-all order-2 sm:order-1"
              >
                Go Back
              </button>
              <button
                className="flex-1 px-6 py-4 rounded-2xl bg-green-600 text-white font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all order-1 sm:order-2"
                onClick={() => handleSaveButton()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
