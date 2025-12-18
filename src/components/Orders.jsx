import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://ecommerce-backend-a1yo.onrender.com/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Loading orders...</span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
        <Link to="/products" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Orders 📦</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* ORDER HEADER */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-bold text-lg text-gray-800">
                Order ID: <span className="text-blue-600">{order._id.slice(-8)}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Ordered on: {new Date(order.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              {order.status === "Processing" && (
                <p className="text-sm text-blue-600 mt-1">Estimated delivery: 3-5 business days</p>
              )}
            </div>

            <div className="text-right">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold inline-block
                  ${order.status === "Delivered"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                  }`}
              >
                {order.status}
              </span>
              {order.status === "Processing" && (
                <div className="mt-2 w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/3 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          {/* ITEMS */}
          <div className="border-t border-gray-200 pt-6">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* LEFT: IMAGE + DETAILS */}
                <div className="flex items-center gap-6">
                  <Link to={`/products/${item.product._id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover rounded-xl border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link to={`/products/${item.product._id}`}>
                      <p className="font-bold text-xl text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                        {item.product.name}
                      </p>
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Unit Price: ₹{item.price}
                    </p>
                    <button
                      onClick={() => handleReorder(item.product)}
                      className="mt-2 px-4 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Buy Again
                    </button>
                  </div>
                </div>

                {/* RIGHT: SUBTOTAL */}
                <div className="text-right">
                  <p className="font-bold text-xl text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>


          {/* FOOTER */}
          <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-700 font-medium">
                Payment Method: {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-700">
                Payment Status: <span className={order.isPaid ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {order.isPaid ? "Paid ✅" : "Pending ⏳"}
                </span>
              </p>
              <button className="mt-2 px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors">
                Contact Support
              </button>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">Order Total</p>
              <p className="text-3xl font-bold text-yellow-600">
                ₹{order.totalAmount}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
