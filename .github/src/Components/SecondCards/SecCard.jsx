import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SecCard() {
  /**
   *FETCHING ALL CATEGORIES DATA FROM THE GLOBAL STATE
   */
  const cateData = useSelector((state) => state.cateData.catData);
  console.log('categories form card', cateData);

  /**
   * RETURN ALL CATEGORIES
   */
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-xl lg:text-1.5rem font-semibold text-center mb-3 -mt-3">Shop By Categories</h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
          {cateData.map((cat) => (
            <Link key={cat._id} to="/category" state={{ catId: cat._id,  }} className="group">
              <div className="flex flex-col items-center justify-center">
                <div
                  className="w-full aspect-square bg-gradient-to-br from-[#f3f9fb] to-[#e8f5f7] rounded-2xl
                    p-2 md:p-4
                    flex
                    flex-col
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    hover:shadow-xl
                    hover:-translate-y-2
                    hover:bg-gradient-to-br
                    hover:from-[#e0f2f7]
                    hover:to-[#d0e8f0]
                    cursor-pointer
                    border border-gray-100
                    hover:border-green-200"
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${cat.image}`}
                    alt={cat.name}
                    className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-center mt-2 md:mt-3 text-gray-700 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecCard;
