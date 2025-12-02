import { useSelector } from 'react-redux';


function SecCard() {
  /**
   *FETCHING ALL CATEGORIES DATA FROM THE GLOBAL STATE
   */
      const cateData = useSelector((state) => state.cateData.catData);
      console.log('categories form card',cateData);


  /**
   * RETURN ALL CATEGORIES
   */
  return (
    <div className="bg-[#f1e6c1]  shadow min-h-screen py-10">
      <h2 className="text-center text-xl font-semibold text-black mb-8">
        Shop By Categories
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 px-4 mb-10">
        {cateData.map((cat) => (
          <div
            key={cat._id}
            className="bg-[#f1f8fe] rounded-lg shadow hover:scale-105 transition p-4 flex flex-col items-center cursor-pointer"
          >
            <img
              src={`${import.meta.env.VITE_BASE_URL}${cat.image}`}
              alt={cat.name}
              className="w-24 h-24 object-contain mb-3"
            />
            <p className="text-[10px] font-medium text-center">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecCard