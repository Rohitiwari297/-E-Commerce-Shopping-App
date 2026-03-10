import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SellerRegistrationsModal from './modals/SellerRegistrationsModal';

function SellOnPlatform() {
  const [showModal, setShowModal] = useState(false);

  const sellHandler = () => {
    setShowModal(true);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-8 p-5 mt-5 font-bold font-serif underline">
        <h1>Sell on Platform</h1>
      </div>
      <div className="md:flex  p-2 gap-2 ">
        {/* Add your content here */}
        <div className="w-full md:w-1/2 lg:w-1/2 p-10 ">
          <img
            src="https://imagex.ink.ovh/photo/2025-10-08/1757489ded2a81-be69-406c-889a-1dbc1a4d7a39.jpeg"
            alt="benifits"
            className="rounded-xl"
          />
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/2 p-5 items-center justify-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex facere enim, quos illo, debitis dolore, odio qui fugit est aliquam
            cupiditate. Minus doloribus quidem vero! Nesciunt nam quisquam nulla excepturi? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Ex facere enim, quos illo, debitis dolore, odio qui fugit est aliquam cupiditate. Minus doloribus quidem vero!
            Nesciunt nam quisquam nulla excepturi?
          </p>
        </div>
      </div>
      <div className=" md:flex p-2 gap-2 ">
        {/* Add your content here */}
        <div className="flex w-full md:w-1/2 lg:w-1/2 p-5 items-center justify-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex facere enim, quos illo, debitis dolore, odio qui fugit est aliquam
            cupiditate. Minus doloribus quidem vero! Nesciunt nam quisquam nulla excepturi? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Ex facere enim, quos illo, debitis dolore, odio qui fugit est aliquam cupiditate. Minus doloribus quidem vero!
            Nesciunt nam quisquam nulla excepturi?
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 p-10 ">
          <img
            src="https://imagex.ink.ovh/photo/2025-10-08/1757489ded2a81-be69-406c-889a-1dbc1a4d7a39.jpeg"
            alt="benifits"
            className="rounded-xl"
          />
        </div>
      </div>
      <div className=" md:flex p-2 gap-2 ">
        {/* Add your content here */}
        <div className=" w-full md:w-1/2 lg:w-1/2 p-10 ">
          <img
            src="https://imagex.ink.ovh/photo/2025-10-08/1757489ded2a81-be69-406c-889a-1dbc1a4d7a39.jpeg"
            alt="benifits"
            className="rounded-xl"
          />
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/2 p-5 items-center justify-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex facere enim, quos illo, debitis dolore, odio qui fugit est aliquam
            cupiditate. Minus doloribus quidem vero! Nesciunt nam quisquam nulla excepturi? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Ex facere enim, quos illo, debitis dolore, odio qui fugit est aliquam cupiditate. Minus doloribus quidem vero!
            Nesciunt nam quisquam nulla excepturi?
          </p>
        </div>
      </div>
      {showModal === false && 
      <div className=" flex  gap-2 justify-between items-center p-10">
        <button onClick={sellHandler} className="bg-green-600 hover:bg-green-500 rounded-sm text-white py-2 px-4 font-extralight">
          Register as a Seller
        </button>
        <button className="bg-gray-300 hover:bg-gray-200 rounded-sm text-gray-800 py-2 px-4 font-extralight">More Information</button>
      </div>
      }

      {/* Seller Registration Modal */}
     <SellerRegistrationsModal open={showModal} setOpen={setShowModal} />
    </div>
  );
}

export default SellOnPlatform;
