import { useState } from "react";
import ProductForm from "./ProductForm";  

export default function Admin() {
  const [products, setProducts] = useState([]);

  const addProducts = (newProduct) => {
    setProducts([...products, newProduct]);
    console.log("Product Added:", newProduct);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Admin Panel - Add Products
      </h1>

      <ProductForm addProducts={addProducts} /> {/* ⚡ Now it will show */}

      
    </div>
  );
}
