import React from 'react'
import Header from '../Components/header/Header'
import img from '../../public/namk.png'

function ProductDetailing() {
  return (
    <section className='flex p-12 items-center justify-between border '>
       <div className='w-1/2'>
            <img src={img} alt="" className=' w-[400px]' />
       </div>
       <div className='w-1/2'>
            <p>atta, rice & dals/salt, sugar & jaggery/sugar</p>
            <h1 className='text-xl font-semibold'>Namakin Bhujiya 5 kg</h1>
            <div>
                <p>
                    ₹ 245
                </p>
                <p>
                    (Inclusive all taxes) 
                    <span> ₹49.00/kg </span>
                </p>
            </div>
            <div>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">5 Kg</button>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">1 Kg</button>

            </div>
            <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 w-36 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to Card</button>
            <div className=''>
                <h1 className='text-2xl font-semibold'>Description</h1>
                <p>
                    Sugar Loose 5 kg is a high-quality, pure granulated sugar perfect for all your sweetening needs. Ideal for baking, cooking, and beverages, it dissolves easily and enhances flavor. Packed in a 5 kg bag, it offers convenience for households and businesses. Free from additives, it ensures natural sweetness. Suitable for daily use in tea, coffee, desserts, and more. Store in a cool, dry place to maintain freshness. A versatile pantry staple for any kitchen.
                </p>
            </div>

       </div>
        
    </section>

  )
}

export default ProductDetailing