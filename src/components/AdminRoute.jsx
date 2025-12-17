import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const role = sessionStorage.getItem("role");

  if (isLoggedIn && role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
