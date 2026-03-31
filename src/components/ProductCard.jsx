import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { getImageUrl, getFallbackUrls } from "../utils/imageUtils";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Debug: Log the product data and generated URL
  console.log('Product data:', product);
  console.log('Image URL:', getImageUrl(product.image));

  const handleAddToCart = async () => {
    const success = await addToCart(product);
    if (success) {
      navigate("/cart");
    }
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    const fallbackUrls = getFallbackUrls(product.image);
    const currentSrc = e.target.src;

    const currentIndex = fallbackUrls.findIndex(url => url === currentSrc);
    if (currentIndex < fallbackUrls.length - 1) {
      console.log('Trying fallback URL:', fallbackUrls[currentIndex + 1]);
      e.target.src = fallbackUrls[currentIndex + 1];
    } else {
      console.log('All URLs failed, using final placeholder');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-amber-100">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-xl text-amber-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-200">
            {product.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <span className="text-amber-400 text-lg">★</span>
              <span className="text-sm text-amber-600 ml-1 font-medium">
                {product.rating || 4}.0
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl font-bold text-amber-600">
              ₹{product.price}
            </p>
            {product.originalPrice && (
              <p className="text-lg line-through text-gray-500">
                ₹{product.originalPrice}
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="px-6 pb-6">
        <button
          onClick={handleAddToCart}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
  