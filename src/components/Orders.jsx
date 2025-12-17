import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/orders/my-orders", {
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

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-10">Loading orders...</h2>;
  }

  if (orders.length === 0) {
    return (
      <h2 className="text-center mt-10 text-xl">
        You have no orders 📦
      </h2>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-xl p-5 mb-6 shadow-md"
        >
          {/* ORDER HEADER */}
          <div className="flex justify-between mb-3">
            <div>
              <p className="font-semibold">
                Order ID:{" "}
                <span className="text-gray-600">{order._id}</span>
              </p>
              <p className="text-sm text-gray-500">
                Ordered on:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-bold
                ${
                  order.status === "Delivered"
                    ? "bg-green-200 text-green-800"
                    : order.status === "Cancelled"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
            >
              {order.status}
            </span>
          </div>

          {/* ITEMS */}
          <div className="border-t pt-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between mb-2"
              >
                <div>
                  <p className="font-semibold">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                Payment: {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-600">
                Paid: {order.isPaid ? "Yes" : "No"}
              </p>
            </div>

            <p className="text-xl font-bold text-yellow-600">
              Total: ₹{order.totalAmount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
