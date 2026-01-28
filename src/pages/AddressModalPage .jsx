import React, { useEffect, useState } from "react";
import {  getAddress, saveAddress } from "../utils/Apis";
import { Pen, Trash } from "lucide-react";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddressModalPage = ({ onClose, onSelectAddress  }) => {
  const navigate = useNavigate();
  // All Address
   const [address, setAddress] = useState([]);
      useEffect(()=> {
      getAddress(setAddress)
    },[])
    
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
    e.preventDefault();
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
    <div className="w-full max-h-[90vh] flex flex-col lg:flex-row rounded-lg overflow-hidden border bg-white">
      
      {/* LEFT : MAP */}
      <div className="w-full h-[400px] overflow-y-scroll lg:w-1/2 relative m-6 border border-gray-200 rounded-2xl">
          {address.length > 0 ?address.map((item, index) => (
          <div onClick={() => 
            { handleSelectAddress(item) }
          }  key={index} className="p-2 text-[12px] h-auto shadow cursor-pointer hover:bg-gray-100">
                <div className="flex justify-between">
                  <p className="font-semibold">{item.name}</p>
                <div className="flex gap-1 justify-end">
                  <Button>
                    <Pen onClick={()=> toast.error('work is pending...')} className="relative size-3 down-2 right-2 cursor-pointer text-green-500" />
                  </Button>
                  <Button onClick={()=> toast.error('work is pending...')} className="flex flex-col hover:bg-gray-100">
                    <Trash className="relative size-3 down-2 right-2 cursor-pointer text-red-500 " />
                  </Button>
                  

                </div>
                </div>
                  
                <p>{item.email}</p>
                <p>{item.mobile}</p>
                <p>{item.city}, {item.state} - {item.pincode}</p>
               
              
         
          </div>
        )):
        <div className="w-full h-full">
            Please Add Address
          </div>
        }
      </div>

      {/* RIGHT : FORM */}
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
        <h2 className="text-lg font-bold text-center border rounded-md py-1 mb-4">
          Enter complete address
        </h2>

        {/* LOCATION TYPE */}
        <div className="flex gap-4 mb-4">
          <label>
            <input
              type="radio"
              name="locationType"
              value="home"
              checked={selectedOption.locationType === "home"}
              onChange={handleChange}
            />{" "}
            Home
          </label>

          <label>
            <input
              type="radio"
              name="locationType"
              value="work"
              checked={selectedOption.locationType === "work"}
              onChange={handleChange}
            />{" "}
            Work
          </label>
        </div>

        {/* INPUTS */}
        <div className="flex flex-col gap-2">
          <input name="name" placeholder="Name*" value={selectedOption.name} onChange={handleChange} className="border p-1 rounded" />
          <input name="email" placeholder="Email*" value={selectedOption.email} onChange={handleChange} className="border p-1 rounded" />
          <input name="mobile" placeholder="Mobile*" value={selectedOption.mobile} onChange={handleChange} className="border p-1 rounded" />
          <input name="city" placeholder="City*" value={selectedOption.city} onChange={handleChange} className="border p-1 rounded" />
          <input name="state" placeholder="State*" value={selectedOption.state} onChange={handleChange} className="border p-1 rounded" />
          <input name="pincode" placeholder="Pincode*" value={selectedOption.pincode} onChange={handleChange} className="border p-1 rounded" />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleFormSubmit}
          className="w-full bg-green-700 text-white py-3 mt-5 rounded-md font-semibold hover:bg-green-800"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default AddressModalPage;
