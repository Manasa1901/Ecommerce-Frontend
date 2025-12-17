import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <CartProvider>
      <App />
      <ToastContainer />
    </CartProvider>
  </BrowserRouter>
)
