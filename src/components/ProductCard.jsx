import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const success = await addToCart(product);
    if (success) {
      navigate("/cart");
    }
  };

  return (
    <div className="border-4 border-yellow-500 rounded-xl p-3 hover:shadow-xl transition">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-90 object-cover rounded-xl"
        />

        <h2 className="font-bold text-xl mt-3">{product.name}</h2>
      </Link>

      {/* ⭐ SINGLE STAR */}
      <div className="flex items-center mt-1">
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-sm text-gray-500 ml-1">
          {product.rating || 4}.0
        </span>
      </div>

      {/* 💰 PRICE */}
      <div className="flex items-center gap-3 mt-1">
        <p className="text-2xl font-bold text-yellow-500">
          ₹{product.price}
        </p>

        {product.originalPrice && (
          <p className="text-lg line-through text-red-500">
            ₹{product.originalPrice}
          </p>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full mt-4 border-2 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
  