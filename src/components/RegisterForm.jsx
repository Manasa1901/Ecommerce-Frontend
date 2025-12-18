import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await axios.post("https://ecommerce-backend-a1yo.onrender.com/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful! Please login 🎉", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.error || "Registration failed ❌",
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
        <h1 className="text-center font-bold text-3xl mb-8 text-amber-900">Register</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-lg font-medium text-amber-800">Name</label>
          <input
            type="text"
            className="w-full border border-amber-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            className="w-full border border-amber-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="block mb-2 text-lg font-medium text-amber-800">Confirm Password</label>
          <input
            type="password"
            className="w-full border border-amber-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-amber-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-200 shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-amber-800">
          Already have an account? <Link to="/login" className="text-amber-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;