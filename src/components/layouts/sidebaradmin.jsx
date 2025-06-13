import React, { useState, useRef } from "react";
import style4ulogo from "../../components/assets/style4u-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  List,
  FileText,
  Tag,
  User,
  Menu,
  LogOut,
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
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Hapus item dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    localStorage.removeItem("id_role");

    // Arahkan pengguna ke halaman login
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    // Tidak perlu ubah isOpen saat pindah halaman
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#f3d8bd] text-[#6e3f1c] 
        transition-all duration-300 ease-in-out 
        w-56`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20">
        <div className="flex items-center gap-2 px-3">
          <img
            src={style4ulogo}
            alt="Style4U Logo"
            className={`object-contain transition-all duration-300 ease-in-out 
              w-32 h-32`} // 4. Atur ukuran logo menjadi statis
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col items-start gap-4 px-2 mt-4">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={idx}
              onClick={() => handleNavigation(item.path)}
              className={`relative flex items-center h-10 px-3 py-2 w-full rounded-md cursor-pointer 
                transition-all duration-200 
                ${
                  isActive
                    ? "bg-[#6e3f1c] text-white font-semibold"
                    : "hover:bg-[#a1673f2d]"
                }`}
            >
              <div className="min-w-[20px]">{item.icon}</div>
              <span
                className={`ml-3 transition-all duration-300 
                  opacity-100 scale-100 // 5. Buat label menu selalu terlihat
                  whitespace-nowrap origin-left`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <div
          onClick={handleLogout}
          className={`relative flex items-center h-10 px-3 py-2 w-full rounded-md cursor-pointer 
            transition-all duration-200 hover:bg-[#a1673f2d]`}
        >
          <div className="min-w-[20px]">
            <LogOut size={20} />
          </div>
          <span className="ml-3 whitespace-nowrap">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
