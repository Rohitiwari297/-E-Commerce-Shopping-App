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
    <div className="bg-[#fff6d9]  h-fit ">
      <h2 className="text-center text-xl font-semibold text-black mb-8">
        Shop By Categories
      </h2>

      <div className="flex flex-wrap bg-[#8bbe8e] shadow w-full rounded justify-start px-15 py-5 gap-4">
        {cateData.map((cat) => (
          // Link to the category page with the category ID
          <Link 
            to={`/category/`}
            state={{ catId: cat._id }}
          
          >
            <div
              key={cat._id}
              className="bg-[#f1fef1] rounded-lg shadow hover:scale-105 transition p-4 flex flex-col items-center cursor-pointer"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}${cat.image}`}
                alt={cat.name}
                className="w-24 h-24 object-contain mb-3"
              />
              <p className="text-[10px] font-medium text-center">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SecCard