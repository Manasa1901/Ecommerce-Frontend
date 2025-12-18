import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (product) => {
  try {
    const token = localStorage.getItem("token");

    // 🔹 GUEST USER
    if (!token) {
      const localCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const existing = localCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        localCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(localCart));
      setCart(localCart);

      toast.success("Product added to cart 🛒");
      navigate("/cart");
      return;
    }

    // 🔹 LOGGED-IN USER
    const res = await axios.post(
      "https://ecommerce-backend-a1yo.onrender.com/cart",
      {
        productId: product._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCart(res.data.cart.products);
    toast.success("Product added to cart 🛒");
    navigate("/cart");
  } catch (err) {
    console.error(err);
    toast.error("Failed to add to cart");
  }
};

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
