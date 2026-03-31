import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

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

  // Update search query when URL params change
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setSearchQuery(searchParam);
  }, [searchParams]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-100 to-amber-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Discover Our Collection
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Find the perfect furniture pieces to transform your home into a cozy sanctuary
          </p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search for furniture..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-12 pr-12 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 text-lg"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams({});
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-400 hover:text-amber-600 transition duration-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Results Count */}
            {!loading && !error && products.length > 0 && (
              <div className="text-amber-700 font-medium">
                {filteredProducts.length} of {products.length} products
                {searchQuery && <span className="ml-1">for "{searchQuery}"</span>}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-20 bg-white rounded-xl shadow-sm border border-amber-200">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mb-4"></div>
            <span className="text-xl text-amber-700 font-medium">Loading beautiful furniture...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-6 text-lg">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                window.location.reload();
              }}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-200 font-semibold shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-12 text-center">
            <div className="text-6xl mb-4">🛋️</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">No Products Available</h2>
            <p className="text-amber-700 text-lg">We're working on adding amazing furniture pieces. Check back soon!</p>
          </div>
        )}

        {/* No Search Results State */}
        {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">No matches found</h2>
            <p className="text-amber-700 text-lg mb-4">We couldn't find any products matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchParams({});
              }}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-200 font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
