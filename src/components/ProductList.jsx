import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LOAD PRODUCTS FROM JSON-SERVER
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://ecommerce-backend-a1yo.onrender.com/products", {
          timeout: 10000,
        });
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        if (err.code === 'ECONNABORTED') {
          setError("Request timed out. Please check your internet connection.");
        } else if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          setError("Network error: Unable to connect to server.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto w-[1200px] mt-5 p-4 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg text-gray-600">Loading products...</span>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Products</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              setLoading(true);
              setError(null);
              // Re-run the effect by changing a dependency, but since no deps, we can use a refetch function
              window.location.reload();
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 py-20">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
