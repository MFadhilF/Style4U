import React, { useState } from "react";
import style4ulogo from "../../components/assets/style4u-logo.png"; // Gambar ikon logo
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  List,
  FileText,
  Tag,
  User,
  Menu,
} from "lucide-react";

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  { icon: <Package size={20} />, label: "Produk", path: "/admin/produk" },
  { icon: <List size={20} />, label: "Kategori", path: "/admin/category" },
  { icon: <FileText size={20} />, label: "Pesanan", path: "/admin/pesanan" },
  { icon: <Tag size={20} />, label: "Penjualan", path: "/admin/penjualan" },
  { icon: <User size={20} />, label: "Users", path: "/admin/users" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#f3d8bd] text-[#6e3f1c] 
        transition-all duration-300 ease-in-out 
        ${isOpen ? "w-56" : "w-16"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20">
        <div className="flex items-center gap-2 px-3">
          <img
            src={style4ulogo}
            alt="Style4U Logo"
            className={`object-contain transition-all duration-300 ease-in-out ${
              isOpen ? "w-32 h-32" : "w-10 h-10"
            }`}
          />
          <span
            className={`text-lg font-semibold transition-all duration-300
              ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"}
              origin-left`}
          ></span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col items-start gap-4 px-2 mt-4">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.path)} // Navigasi saat diklik
            className={`flex items-center px-3 py-2 rounded-lg cursor-pointer 
      hover:bg-[#a1673f2d] transition-all duration-200 w-full
      ${location.pathname === item.path ? "bg-[#a1673f] text-white" : ""}`}
          >
            <div className="min-w-[20px]">{item.icon}</div>
            <span
              className={`ml-3 transition-all duration-300 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
              } whitespace-nowrap origin-left`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Bottom Menu Icon */}
      <div className="absolute bottom-5 left-0 w-full flex justify-center">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
