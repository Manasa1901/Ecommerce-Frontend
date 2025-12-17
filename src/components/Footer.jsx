const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Homeify
          </h2>
          <p className="text-sm">
            Crafted for Comfort. Discover furniture that brings warmth,
            elegance, and personality to your living spaces.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/orders" className="hover:text-white">Orders</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact Us
          </h3>
          <p className="text-sm">📧 support@homeify.com</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">📍 Coimbatore, Tamil Nadu</p>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-amber-700">
        © {new Date().getFullYear()} Homeify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
