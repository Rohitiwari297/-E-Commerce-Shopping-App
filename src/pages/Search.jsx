import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProduct } from '../utils/Apis';
import CategoryProduct from './CategoryPages/CategoryProduct';

function Search() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Extract query from URL: /search?query=...
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true);
        try {
          const results = await getProduct(query);
          console.log('Search results received:', results);
          setProducts(Array.isArray(results) ? results : []);
        } catch (error) {
          console.error('Error searching products:', error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-green-600 py-6 px-4 mb-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {query ? `Search Results for "${query}"` : 'Search Products'}
          </h1>
          <p className="text-green-50 mt-1 italic">
            {products.length} {products.length === 1 ? 'item' : 'items'} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Searching for best products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <CategoryProduct key={product._id} cat={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-7xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
            <p className="text-gray-500 max-w-md text-center px-4">
              We couldn't find any products matching "{query}". Try different keywords or check for typos.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="mt-8 px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition shadow-md"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
