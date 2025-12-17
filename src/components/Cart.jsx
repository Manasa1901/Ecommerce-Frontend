import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ================= INCREASE ================= */
  const increaseQuantity = async (item) => {
    await axios.put(
      "http://localhost:5000/cart/update",
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
      "http://localhost:5000/cart/update",
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
      `http://localhost:5000/cart/remove/${item.product._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  /* ================= CHECKOUT ================= */
const handleCheckout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/orders",
      { paymentMethod: "COD" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("🎉 Order placed successfully!");
    navigate("/orders");
  } catch (error) {
    toast.error("❌ Checkout failed");
  }
};


  /* ================= TOTAL ================= */
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Your cart is empty 🛒
      </h2>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

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
            <p>Price: ₹{item.product.price}</p>
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

      <h2 className="text-2xl font-bold text-right">
        Total: ₹{total}
      </h2>

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
