import { Search } from "lucide-react";
import style4ulogo from "../../components/assets/style4u-logo.png";
import cartlogo from "../../components/assets/cart-logo.png";
import bookmarklogo from "../../components/assets/bookmark-logo.png";
import accountlogo from "../../components/assets/account-logo.png";
import { useState, useEffect, useRef } from "react";
import Cart from "./cart.jsx";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    // Fungsi ini akan dijalankan saat form di-submit (Enter ditekan)
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(
        `/hasil-pencarian?search=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    localStorage.removeItem("id_role");
    navigate("/login");
  };

  // close dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-md bg-white">
        {/* Kiri: Logo */}
        <div className="flex items-center gap-3">
          <img src={style4ulogo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Tengah: Search bar */}
        <form onSubmit={handleSearch} className="relative w-1/2 max-w-xl">
          <input
            type="text"
            placeholder="Cari Kemeja, Dress, dll."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-black py-2 px-4 text-center text-sm font-semibold placeholder:text-center placeholder:font-semibold focus:outline-none focus:placeholder-transparent"
          />
          <button type="submit">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] h-5 w-5" />
          </button>
        </form>

        {/* Kanan: Icons */}
        <div
          className="flex items-center gap-6 text-black relative"
          ref={dropdownRef}
        >
          <button className="cursor-pointer" onClick={() => setShowCart(true)}>
            <img src={cartlogo} alt="Cart" className="h-6 w-auto" />
          </button>

          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/profile/wishlist");
            }}
          >
            <img src={bookmarklogo} alt="Bookmark" className="h-6 w-auto" />
          </button>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer"
          >
            <img src={accountlogo} alt="Account" className="h-6 w-auto" />
          </button>

          {showDropdown && (
            <div className="absolute top-12 right-0 bg-white border rounded shadow-md py-2 w-32 z-50">
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Profil
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Cart muncul di luar header */}
      {showCart && <Cart show={showCart} onClose={() => setShowCart(false)} />}
    </>
  );
}
