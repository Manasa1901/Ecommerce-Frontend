import { useState } from "react";
import axios from "axios";

export default function ProductForm({ addProducts }) {
  const [pname, setName] = useState("");
  const [url, setURL] = useState("");
  const [sprice, setSPrice] = useState("");
  const [oprice, setOPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleAddProducts = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: pname,
      image: url,
      price: Number(sprice),           
      originalPrice: Number(oprice),   
      category: category
    };


    try {
      const res = await axios.post("https://ecommerce-backend-a1yo.onrender.com/products", newProduct);
      console.log("Product added:", res.data);

      // Update frontend list
      addProducts(res.data);  // sends backend response

      // Reset form
      setName("");
      setURL("");
      setSPrice("");
      setOPrice("");
      setCategory("");

      alert("Product added successfully!");

    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <form className="bg-white w-1/3 mx-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-xl mb-4">Add Products</h1>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={pname}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-gray-300 w-full p-2 rounded-lg mb-3"
        />

        <label className="block mb-2">Image URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          className="border-2 border-gray-300 w-full p-2 rounded-lg mb-3"
        />

        <label className="block mb-2">Selling Price</label>
        <input
          type="number"
          value={sprice}
          onChange={(e) => setSPrice(e.target.value)}
          className="border-2 border-gray-300 w-full p-2 rounded-lg mb-3"
        />

        <label className="block mb-2">Original Price</label>
        <input
          type="number"
          value={oprice}
          onChange={(e) => setOPrice(e.target.value)}
          className="border-2 border-gray-300 w-full p-2 rounded-lg mb-3"
        />

        <label className="block mb-2">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-gray-300 w-full p-2 rounded-lg mb-3"
        />

        <button
          type="submit"
          onClick={handleAddProducts}
          className="block mx-auto bg-rose-800 text-white rounded-lg px-4 py-2 mt-6"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
