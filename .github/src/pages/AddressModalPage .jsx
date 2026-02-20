import React, { useEffect, useState } from "react";
import { getAddress, saveAddress } from "../utils/Apis";
import { Pen, Trash } from "lucide-react";
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
  <div className="w-full max-h-[90vh] flex flex-col lg:flex-row rounded-xl overflow-hidden border bg-white">

    {/* LEFT : ADDRESS LIST */}
    <div
      className="
        w-full lg:w-[45%]
        h-[300px] sm:h-[350px] lg:h-auto
        overflow-y-auto
        p-3 sm:p-4 lg:m-6
        border border-gray-200
        rounded-xl
      "
    >
      {address.length > 0 ? (
        address.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectAddress(item)}
            className="p-3 mb-2 text-xs sm:text-sm rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="flex justify-between items-start">
              <p className="font-semibold">{item.name}</p>

              <div className="flex gap-2">
                <Button>
                  <Pen
                    onClick={() => toast.error("work is pending...")}
                    className="size-3 text-green-500"
                  />
                </Button>

                <Button onClick={() => toast.error("work is pending...")}>
                  <Trash className="size-3 text-red-500" />
                </Button>
              </div>
            </div>

            <p>{item.email}</p>
            <p>{item.mobile}</p>
            <p>
              {item.city}, {item.state} - {item.pincode}
            </p>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
          Please Add Address
        </div>
      )}
    </div>

    {/* RIGHT : ALWAYS VISIBLE */}
    <div className="w-full lg:w-[55%] p-4 sm:p-6 overflow-y-auto">

      {/* HEADER */}
      <div className="border rounded-md py-2 mb-4 text-center font-semibold">
        {showModal ? "Add New Address" : "Address Details"}
      </div>

      {/* 👉 WHEN NOT ADDING ADDRESS */}
      {!showModal && (
        <div className="h-full flex flex-col items-center justify-center text-center gap-4">
          <p className="text-gray-500 text-sm max-w-xs">
            Select an address from the left or add a new address to continue.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          >
            + Add New Address
          </button>
        </div>
      )}

      {/* 👉 ADD ADDRESS FORM */}
      {showModal && (
        <div className="max-w-md mx-auto">

          {/* LOCATION TYPE */}
          <div className="flex gap-6 mb-4 text-sm">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="locationType"
                value="home"
                checked={selectedOption.locationType === "home"}
                onChange={handleChange}
              />
              Home
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="locationType"
                value="work"
                checked={selectedOption.locationType === "work"}
                onChange={handleChange}
              />
              Work
            </label>
          </div>

          {/* INPUTS */}
          <div className="flex flex-col gap-3 text-sm">
            <input name="name" placeholder="Name*" value={selectedOption.name} onChange={handleChange} className="border p-2 rounded-md" />
            <input name="email" placeholder="Email*" value={selectedOption.email} onChange={handleChange} className="border p-2 rounded-md" />
            <input name="mobile" placeholder="Mobile*" value={selectedOption.mobile} onChange={handleChange} className="border p-2 rounded-md" />
            <input name="city" placeholder="City*" value={selectedOption.city} onChange={handleChange} className="border p-2 rounded-md" />
            <input name="state" placeholder="State*" value={selectedOption.state} onChange={handleChange} className="border p-2 rounded-md" />
            <input name="pincode" placeholder="Pincode*" value={selectedOption.pincode} onChange={handleChange} className="border p-2 rounded-md" />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleFormSubmit}
              className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
            >
              Save Address
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="flex-1 border py-3 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);



};

export default AddressModalPage;
