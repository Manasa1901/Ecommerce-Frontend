import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-a1yo.onrender.com/cart",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const updateCartQty = (productId, quantity) =>
  API.put("/update", { productId, quantity });

export const removeFromCartDB = (productId) =>
  API.delete(`/remove/${productId}`);
