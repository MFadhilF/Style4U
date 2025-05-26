// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import LogoImage from "../../components/assets/style4u-logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // Jika sudah discroll ke bawah
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
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
        <img src={LogoImage} alt="Style4U Logo" className="h-10" />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-lg font-medium text-gray-700">
        <a
          href="#produk"
          className="hover:text-gray-900 transition-colors duration-200"
        >
          Produk
        </a>
        <a
          href="#brand"
          className="hover:text-gray-900 transition-colors duration-200"
        >
          Brand
        </a>
      </div>

      {/* Login Button/Link */}
      <div>
        <button
          onClick={() => navigate("/login")}
          href="#login"
          className="
            px-6
            py-2
            text-lg
            font-medium
          "
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
