import { Link, useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-4 text-amber-900">No Profile Data</h1>
          <p className="mb-6 text-amber-800">
            It looks like you are not logged in. Please login to view your profile.
          </p>
          <Link
            to="/login"
            className="inline-block bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-amber-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white border rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-sm uppercase text-amber-500 font-bold">Name</h2>
            <p className="text-lg text-amber-900">{user.name || "-"}</p>
          </div>
          <div>
            <h2 className="text-sm uppercase text-amber-500 font-bold">Email</h2>
            <p className="text-lg text-amber-900">{user.email || "-"}</p>
          </div>
          <div>
            <h2 className="text-sm uppercase text-amber-500 font-bold">Role</h2>
            <p className="text-lg text-amber-900">{user.role || "user"}</p>
          </div>
          <div>
            <h2 className="text-sm uppercase text-amber-500 font-bold">Joined</h2>
            <p className="text-lg text-amber-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
          <Link
            to="/"
            className="bg-amber-600 text-white px-5 py-2 rounded-md hover:bg-amber-700 transition duration-200"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
