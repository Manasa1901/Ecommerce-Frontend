import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Set session storage for authentication
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", res.data.user.role || "user");

      // Merge guest cart to user cart
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (localCart.length > 0) {
        for (const item of localCart) {
          try {
            await axios.post(
              "http://localhost:5000/cart",
              { productId: item._id, quantity: item.quantity },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } catch (err) {
            console.error("Failed to merge cart item", err);
          }
        }
        localStorage.removeItem("cart");
      }

      toast.success("Login successful 🎉", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.error || "Login failed ❌",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-amber-200">
        <h1 className="text-center font-bold text-3xl mb-8 text-amber-900">Login</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-lg font-medium text-amber-800">Email</label>
          <input
            type="email"
            className="w-full border border-amber-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-lg font-medium text-amber-800">Password</label>
          <input
            type="password"
            className="w-full border border-amber-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-amber-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
