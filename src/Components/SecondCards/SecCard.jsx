import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


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
  <div className="bg-[#fff6d9] ">
    
    <h2 className="text-center text-lg sm:text-xl font-semibold text-black mb-6">
      Shop By Categories
    </h2>

    <div className="
      grid
      grid-cols-3
      sm:grid-cols-4
      md:grid-cols-6
      lg:grid-cols-8
      gap-4
      bg-white
      p-4
      rounded-xl
      shadow-[0_0_10px_rgba(0,0,0,0.1)]
    ">
      {cateData.map((cat) => (
        <Link
          key={cat._id}
          to="/category"
          state={{ catId: cat._id }}
          className="group"
        >
          <div className="
            bg-[#f1fef1]
            rounded-xl
            p-3
            flex
            flex-col
            items-center
            transition
            hover:shadow-lg
            hover:-translate-y-1
          ">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <img
                src={`${import.meta.env.VITE_BASE_URL}${cat.image}`}
                alt={cat.name}
                className="w-full h-full object-contain group-hover:scale-105 transition"
              />
            </div>

            <p className="text-[11px] sm:text-xs font-medium text-center mt-2 text-gray-800">
              {cat.name}
            </p>
          </div>
        </Link>
      ))}
    </div>

  </div>
);

}

export default SecCard