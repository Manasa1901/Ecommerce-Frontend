import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        No product found
      </h1>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[600px] object-cover rounded-xl shadow-lg"
      />

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

        <p className="text-gray-600 mb-3">
          ⭐ {product.rating || 4} / 5
        </p>

        <p className="text-3xl font-bold text-yellow-500 mb-3">
          ₹{product.price}
          <span className="text-gray-400 line-through text-xl ml-3">
            ₹{product.originalPrice}
          </span>
        </p>

        <p className="text-gray-700 mb-6">
          Premium quality furniture crafted for comfort and durability.
        </p>

        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
