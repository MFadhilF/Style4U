import React, { useState, useEffect } from "react";
import LogoImage from "../assets/style4u-logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
        w-full
        p-4
        flex
        items-center
        justify-between
        ${
          isSticky
            ? "sticky top-0 bg-white shadow-md z-50 transition-all duration-300"
            : "relative bg-white"
        }
      `}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/">
          {" "}
          {/* Logo mengarah ke halaman utama */}
          <img src={LogoImage} alt="Style4U Logo" className="h-10" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-lg font-medium text-gray-700">
        <Link
          to="/productlistpage"
          className="hover:text-gray-900 transition-colors duration-200"
        >
          Produk
        </Link>
        <a
          onClick={() => navigate("/login")}
          className="hover:text-gray-900 transition-colors duration-200"
        >
          Brand
        </a>
      </div>

      {/* Login Button/Link */}
      <div>
        <button
          onClick={() => navigate("/login")}
          className="
            px-6
            py-2
            text-lg
            font-medium
            text-gray-700 hover:text-gray-900 transition-colors duration-200
          " // Menambahkan styling yang mirip dengan link navigasi
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
