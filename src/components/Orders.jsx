import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your orders");
        return;
      }

      const res = await axios.get(
        "https://ecommerce-backend-a1yo.onrender.com/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders || []);
      setError(null);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ================= CALL API ON MOUNT =================
  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= REORDER =================
  const handleReorder = async (product) => {
    const success = await addToCart(product);
    if (success) {
      toast.success("Item added to cart! 🛒", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("Failed to add item to cart", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Loading orders...</span>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          Error Loading Orders
        </h2>
        <p className="text-red-600 mb-6 text-center max-w-md">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchOrders();
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ================= NO ORDERS =================
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Orders Yet
        </h2>
        <p className="text-gray-600 mb-6">
          Start shopping to see your orders here!
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // ================= ORDERS LIST =================
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Orders 📦
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* ORDER HEADER */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-bold text-lg text-gray-800">
                Order ID:{" "}
                <span className="text-blue-600">
                  {order._id.slice(-8)}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Ordered on:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-bold
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
            >
              {order.status}
            </span>
          </div>

          {/* ITEMS */}
          <div className="border-t border-gray-200 pt-6">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-6">
                  <Link to={`/products/${item.product._id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover rounded-xl border"
                    />
                  </Link>

                  <div>
                    <Link to={`/products/${item.product._id}`}>
                      <p className="font-bold text-xl hover:text-blue-600">
                        {item.product.name}
                      </p>
                    </Link>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.price}
                    </p>
                    <button
                      onClick={() => handleReorder(item.product)}
                      className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Buy Again
                    </button>
                  </div>
                </div>

                <p className="font-bold text-xl">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Payment: {order.paymentMethod}
            </p>
            <p className="text-3xl font-bold text-yellow-600">
              ₹{order.totalAmount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
