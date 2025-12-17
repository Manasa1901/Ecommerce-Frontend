import { Link, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const isAdmin = isLoggedIn && sessionStorage.getItem("role") === "admin";

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="w-full bg-amber-100 shadow-md">
      <nav className="max-w-6xl mx-auto h-20 flex items-center justify-between px-6">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold text-amber-900">
          Homeify
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-6 text-lg text-amber-900 font-medium">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <Link to="/products" className="hover:text-amber-700">Products</Link>
          <Link to="/cart" className="hover:text-amber-700">Cart</Link>
          <Link to="/orders" className="hover:text-amber-700">Orders</Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-amber-700">Login</Link>
              <Link to="/register" className="bg-amber-700 text-white px-4 py-1 rounded-md hover:bg-amber-800 transition">Register</Link>
            </>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="bg-amber-700 text-white px-4 py-1 rounded-md hover:bg-amber-800 transition"
            >
              Admin
            </Link>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Header;
