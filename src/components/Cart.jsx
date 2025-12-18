import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    try {
      setError(null);
      const res = await axios.get("https://ecommerce-backend-a1yo.onrender.com/cart", {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      setCartItems(res.data.cart.products || []);
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
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

  useEffect(() => {
    fetchCart();
  }, []);

  /* ================= INCREASE ================= */
  const increaseQuantity = async (item) => {
    await axios.put(
      "https://ecommerce-backend-a1yo.onrender.com/cart/update",
      {
        productId: item.product._id,
        quantity: item.quantity + 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  /* ================= DECREASE ================= */
  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) {
      removeItem(item);
      return;
    }

    await axios.put(
      "https://ecommerce-backend-a1yo.onrender.com/cart/update",
      {
        productId: item.product._id,
        quantity: item.quantity - 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  /* ================= REMOVE ================= */
  const removeItem = async (item) => {
    await axios.delete(
      `https://ecommerce-backend-a1yo.onrender.com/cart/remove/${item.product._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  /* ================= CHECKOUT ================= */
  const handleCheckout = async () => {
    try {
      await axios.post(
        "https://ecommerce-backend-a1yo.onrender.com/orders",
        { paymentMethod: "COD" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("🎉 Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("❌ Checkout failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Loading cart...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Cart</h2>
        <p className="text-red-600 mb-6 text-center max-w-md">{error}</p>
        <button 
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchCart();
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <button 
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* ================= CART ITEMS ================= */}
      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="flex gap-6 border-b pb-4 mb-4"
        >
          <img
            src={item.product.image}
            className="w-32 h-32 object-cover rounded"
          />

          <div className="flex-1">
            <h2 className="text-xl font-bold">
              {item.product.name}
            </h2>

            <div className="flex gap-3 items-center">
              <p className="text-lg font-bold text-yellow-600">
                ₹{item.product.price}
              </p>
              <p className="line-through text-gray-500">
                ₹{item.product.originalPrice}
              </p>
            </div>

            <p>Quantity: {item.quantity}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => increaseQuantity(item)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={() => decreaseQuantity(item)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                -
              </button>
              <button
                onClick={() => removeItem(item)}
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>

            <p className="font-semibold mt-2">
              Subtotal: ₹{item.product.price * item.quantity}
            </p>
          </div>
        </div>
      ))}

      {/* ================= ORDER SUMMARY ================= */}
      {summary && (
        <div className="bg-gray-100 p-5 rounded-xl mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Original Total</span>
            <span>₹{summary.originalTotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Selling Total</span>
            <span>₹{summary.sellingTotal}</span>
          </div>

          <div className="flex justify-between mb-2 text-green-600">
            <span>Discount</span>
            <span>-₹{summary.discount}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹{summary.shipping}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-xl font-bold">
            <span>Grand Total</span>
            <span>₹{summary.grandTotal}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="mt-6 bg-yellow-500 px-6 py-3 rounded font-bold float-right"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
