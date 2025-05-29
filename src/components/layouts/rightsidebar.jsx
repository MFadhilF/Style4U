import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, ClipboardList, Heart } from "lucide-react";
import style4ulogo from "../../components/assets/style4u-logo.png";

export default function RightSidebar() {
  const navigate = useNavigate(); // Hook untuk redirect

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#CAE38D] p-6 shadow-lg flex flex-col space-y-6">
      {/* Logo & Header */}
      <div className="text-center">
        <img
          src={style4ulogo}
          alt="Logo"
          className="w-[156px] h-[77px] mx-auto"
        />
        <hr className="my-4 border-[#744B1F]" />
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-4 text-[#744B1F] text-sm gap-[30px]">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center space-x-2 cursor-pointer hover:font-semibold text-[20px] font-semibold focus:outline-none"
        >
          <UserCircle size={20} />
          <span>Data Pribadi</span>
        </button>
        <button
          onClick={() => navigate("/profile/orders")}
          className="flex items-center space-x-2 cursor-pointer hover:font-semibold text-[20px] font-semibold focus:outline-none"
        >
          <ClipboardList size={20} />
          <span>Pesanan Anda</span>
        </button>
        <button
          onClick={() => navigate("/profile/wishlist")}
          className="flex items-center space-x-2 cursor-pointer hover:font-semibold text-[20px] font-semibold focus:outline-none"
        >
          <Heart size={20} />
          <span>Wishlist</span>
        </button>
      </nav>
    </div>
  );
}
