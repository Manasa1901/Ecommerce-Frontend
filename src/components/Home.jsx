import { Link } from "react-router";

const Home = () => {
  return (
    <div className="w-full">

      {/* 🔥 HERO SECTION */}
      <div
        className="relative w-full h-[90vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/b7/32/21/b73221a1ca9057f9b7b9ed83708b03bf.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Homeify <br />
            <span className="text-amber-300">Crafted for Comfort</span>
          </h1>

          <p className="text-lg md:text-xl text-amber-100 max-w-xl mb-8">
            Turn your house into a home with thoughtfully designed furniture
            that blends comfort, warmth, and timeless style.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-4">
            <Link
              to="/products"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-3 rounded-lg shadow-lg transition"
            >
              Shop Furniture
            </Link>

            <Link
              to="/products"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-8 py-3 rounded-lg transition"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      {/* ⭐ FEATURED PRODUCTS (UNCHANGED) */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <div className="shadow-lg rounded-xl p-4 border hover:scale-105 transition">
            <img
              src="https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=600"
              alt="Office Chair"
              className="rounded-lg mb-3"
            />
            <h3 className="font-bold text-lg">Office Chair</h3>
            <p className="text-rose-800 font-bold">₹5000</p>
          </div>

          <div className="shadow-lg rounded-xl p-4 border hover:scale-105 transition">
            <img
              src="https://images.unsplash.com/photo-1519961655809-34fa156820ff?w=600"
              alt="Couch"
              className="rounded-lg mb-3"
            />
            <h3 className="font-bold text-lg">Couch</h3>
            <p className="text-rose-800 font-bold">₹15000</p>
          </div>

          <div className="shadow-lg rounded-xl p-4 border hover:scale-105 transition">
            <img
              src="https://plus.unsplash.com/premium_photo-1684445034959-b3faeb4597d2?w=600"
              alt="Dining Table"
              className="rounded-lg mb-3"
            />
            <h3 className="font-bold text-lg">Dining Table</h3>
            <p className="text-rose-800 font-bold">₹25000</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;
