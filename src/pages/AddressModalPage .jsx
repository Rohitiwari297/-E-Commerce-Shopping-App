import React from "react";

const AddressModalPage = ({ onClose }) => {
  return (
    <div className="w-full max-h-[90vh] flex flex-col lg:flex-row rounded-lg overflow-hidden bg-white">
      {/* Left side (Map + Location Info) */}
      <div className="w-full lg:w-1/2 relative">
        <iframe
          title="Address Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=6/13,+DLE+Industrial+Area,+Moti+Nagar,+New+Delhi&output=embed"
          className="h-[400px] lg:h-full"
        ></iframe>

        <div className="absolute bottom-0 left-0 right-0 bg-white p-3 border-t text-sm">
          <p className="font-semibold">Delivering your order to</p>
          <p className="text-gray-600">
            DLE Industrial Area, Moti Nagar, New Delhi
          </p>
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-blue-700">
            Enter complete address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Save address as */}
        <div className="flex gap-3 mb-4">
          {["Home", "Work", "Hotel", "Other"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 border rounded-md ${
                type === "Home" ? "bg-green-100 border-green-600" : ""
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Address form inputs */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Flat / House no / Building name *"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Floor (optional)"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Area / Sector / Locality *"
            className="border rounded-md p-2"
            defaultValue="DLE Industrial Area, Moti Nagar, New Delhi"
          />
          <input
            type="text"
            placeholder="Nearby landmark (optional)"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Your name *"
            className="border rounded-md p-2"
          />
          <input
            type="tel"
            placeholder="Your phone number *"
            className="border rounded-md p-2"
            defaultValue="0000000000"
          />
        </div>

        {/* Save button */}
        <button
          onClick={onClose}
          
          className="w-full bg-green-700 text-white py-3 mt-5 rounded-md font-semibold hover:bg-green-800"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressModalPage;
