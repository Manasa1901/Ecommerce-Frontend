import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Admin from "./components/Admin";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="*"
          element={
            <h1 className="text-center p-10 text-2xl font-bold">
              Page Not Found
            </h1>
          }
        />
      </Routes>

      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
      </>
  );
}

export default App;
