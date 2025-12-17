import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
