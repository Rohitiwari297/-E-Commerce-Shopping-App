import React from 'react'
import Header from '../Components/header/Header'
import img from '../../public/namk.png'
import { useDispatch, useSelector } from 'react-redux'

function ProductDetailing() {

    //select the data from store
    const data = useSelector((state) => state.allCards.carts[0]);
    console.log(data);

    

    // const cardData = useSelector((state)=> state.allCards)
    // console.log("InitialValuOfState :",cardData) 


  return (
    <section className='flex p-12 items-center justify-between border mb-5'>
       <div className='w-1/2'>
            <img src={data.image} alt="" className=' w-[400px]' />
       </div>
       <div className='w-1/2'>
            <p className='text-[10px] text-[#4b5563]'>{data.name}</p>
            <h1 className='text-xl font-semibold'>{data.name}</h1>
            <div className='flex flex-col mb-3'>
                <p className='text-2xl'>
                    ₹ 245
                </p>
                <p className='text-[10px] text-[#4b5563]'>
                    (Inclusive all taxes) <br />
                    <span> ₹49.00/kg </span>
                </p>
            </div>
            <div>
                <button type="button" className="py-1 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">5 Kg</button>
                <button type="button" className="py-1 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">1 Kg</button>

            </div>
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-1 w-36 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Add to Card</button>
            <div className=''>
                <h1 className='text-2xl font-semibold'>Description</h1>
                <p className='text-[15px] text-[#4b5563]'>
                    Sugar Loose 5 kg is a high-quality, pure granulated sugar perfect for all your sweetening needs. Ideal for baking, cooking, and beverages, it dissolves easily and enhances flavor. Packed in a 5 kg bag, it offers convenience for households and businesses. Free from additives, it ensures natural sweetness. Suitable for daily use in tea, coffee, desserts, and more. Store in a cool, dry place to maintain freshness. A versatile pantry staple for any kitchen.
                </p>
            </div>

       </div>
        
    </section>

  )
}

export default ProductDetailing