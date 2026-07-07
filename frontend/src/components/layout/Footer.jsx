import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white">
            ServiceHub
          </h2>

          <p className="mt-4">
            Book trusted professionals for all your home services.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Company
          </h3>

          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/register">Become Provider</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Services
          </h3>

          <ul className="space-y-2">
            <li>Electrician</li>
            <li>Plumber</li>
            <li>Cleaning</li>
            <li>Carpenter</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>

          <p>Email: support@servicehub.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center">
        © 2026 ServiceHub. All Rights Reserved.
      </div>
    </footer>
  );
}