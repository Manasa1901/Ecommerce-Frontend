import dustbin from "../assets/dustbin.png";

const CartItem = ({ index, item, cart, setCart }) => {

  const increaseQuantity = () => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = () => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const handleRemove = () => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <div className="shadow-lg flex gap-10 border border-gray-200 p-4 rounded-xl mb-5 transform transition duration-400 hover:scale-105">
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md" />

      <div className="flex-col items-start">
        <p className="font-bold text-lg mb-1">{item.name}</p>

        <div className="flex items-center gap-4">
          <p className="text-xl font-bold">₹{item.sellingprice}</p>
          <p className="line-through text-red-500">₹{item.originalprice}</p>
        </div>

        <div className="flex items-center mt-3 gap-3">
          <button
            onClick={decreaseQuantity}
            className="bg-red-800 font-bold text-white text-sm px-4 py-2 rounded-md hover:bg-gray-300 hover:text-red-800"
          >
            -
          </button>

          <p className="bg-gray-100 font-bold text-sm px-4 py-2 rounded-md">
            {item.quantity}
          </p>

          <button
            onClick={increaseQuantity}
            className="bg-red-800 font-bold text-white text-sm px-4 py-2 rounded-md hover:bg-gray-300 hover:text-red-800"
          >
            +
          </button>

          <button onClick={handleRemove}>
            <img src={dustbin} alt="delete" className="w-8 h-8 hover:opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
