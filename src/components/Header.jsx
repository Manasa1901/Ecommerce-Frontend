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

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <header className="w-full bg-amber-100 shadow-md">
      <nav className="max-w-6xl mx-auto h-20 flex items-center justify-between px-6">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold text-amber-900">
          Homeify
        </Link>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-6">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 hover:text-amber-800 transition duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* NAV LINKS */}
        <div className="flex gap-6 text-lg text-amber-900 font-medium">
          <Link to="/" className="hover:text-amber-700 transition-colors duration-200">Home</Link>
          <Link to="/products" className="hover:text-amber-700 transition-colors duration-200">Products</Link>
          <Link to="/cart" className="hover:text-amber-700 transition-colors duration-200">Cart</Link>
          <Link to="/orders" className="hover:text-amber-700 transition-colors duration-200">Orders</Link>
          {isLoggedIn && (
            <Link to="/profile" className="hover:text-amber-700 transition-colors duration-200">Profile</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200 shadow-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-amber-700 transition-colors duration-200">Login</Link>
              <Link to="/register" className="bg-amber-700 text-white px-4 py-1 rounded-md hover:bg-amber-800 transition duration-200">Register</Link>
            </>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="bg-amber-700 text-white px-4 py-1 rounded-md hover:bg-amber-800 transition duration-200"
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
