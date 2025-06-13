import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id_user");

        if (!token || !id_user) return;

        const res = await axios.get(`http://localhost:3001/api/user/${id_user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(res.data.name);
      } catch (error) {
        console.error("Gagal mengambil nama user:", error.response?.data || error.message);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    localStorage.removeItem("id_role");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-end items-center border-b pb-4 mb-6 relative pt-5 pr-5">
      <span className="text-sm text-gray-600">
        Selamat Datang, <strong>{name || "..."}</strong>
      </span>
      <div className="relative ml-3">
        <div
          className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full cursor-pointer text-white text-sm"
          onClick={toggleDropdown}
        >
          👤
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
