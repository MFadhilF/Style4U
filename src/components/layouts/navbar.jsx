import { Search, ShoppingCart, ClipboardList, User } from "lucide-react";
import style4ulogo from "../../components/assets/style4u-logo.png";
import cartlogo from "../../components/assets/cart-logo.png";
import bookmarklogo from "../../components/assets/bookmark-logo.png";
import accountlogo from "../../components/assets/account-logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-3">
        <img src={style4ulogo} alt="Logo" className="h-10 w-auto" />

        <div className="text-left text-sm leading-tight"></div>
      </div>

      {/* Tengah: Search bar */}
      <div className="relative w-1/2 max-w-xl">
        <input
          type="text"
          placeholder="Cari"
          className="w-full rounded-full border border-black py-2 px-4 text-center text-sm font-semibold placeholder:text-center placeholder:font-semibold focus:outline-none focus:placeholder-transparent"
        />

        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] h-5 w-5" />
      </div>

      {/* Kanan: Icons */}
      <div className="flex items-center gap-6 text-black">
        <button className="cursor-pointer">
          <img src={cartlogo} alt="Cart" className="h-6 w-auto" />
        </button>
        <button className="cursor-pointer">
          <img src={bookmarklogo} alt="Cart" className="h-6 w-auto" />
        </button>
        <button className="cursor-pointer">
          <img src={accountlogo} alt="Cart" className="h-6 w-auto" />
        </button>
      </div>
    </header>
  );
}
