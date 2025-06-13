// sidebarfilter.jsx (Versi Lengkap Final)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Minus, ChevronLeft } from "lucide-react";

const FilterSection = ({ title, children }) => (
  <div className="border-b border-gray-600 py-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex items-center gap-2">
        <Minus size={16} className="cursor-pointer" />
        <Plus size={16} className="cursor-pointer" />
      </div>
    </div>
    {children}
  </div>
);

export default function SidebarFilter({ filters, onFilterChange }) {
  // State untuk menampung daftar brand dari API
  const [brands, setBrands] = useState([]);

  // useEffect untuk mengambil data brand saat komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil daftar brand:", error);
      });
  }, []); // Array kosong berarti efek ini hanya berjalan sekali

  const handleInputChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  // Daftar gender yang statis
  const genderOptions = ["Man", "Woman", "Unisex"];

  return (
    <aside className="w-64 bg-[#B2D876] text-gray-800 p-6 flex-shrink-0 flex flex-col min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-xl text-white">
          M
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Filter</h2>

      <FilterSection title="Harga">
        <input
          type="number"
          name="min_price"
          placeholder="Harga Min"
          value={filters.min_price}
          onChange={handleInputChange}
          className="w-full p-1 rounded border mb-2 text-sm"
        />
        <input
          type="number"
          name="max_price"
          placeholder="Harga Max"
          value={filters.max_price}
          onChange={handleInputChange}
          className="w-full p-1 rounded border text-sm"
        />
      </FilterSection>

      <FilterSection title="Grade">
        <div className="mt-2 space-y-1">
          {["A", "B", "C"].map((grade) => (
            <label
              key={grade}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="grade"
                value={grade}
                checked={filters.grade === grade}
                onChange={() => onFilterChange({ grade })}
              />{" "}
              Grade {grade}
            </label>
          ))}
          <button
            onClick={() => onFilterChange({ grade: "" })}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            Semua
          </button>
        </div>
      </FilterSection>

      {/* ======== FILTER GENDER BARU ======== */}
      <FilterSection title="Gender">
        <div className="mt-2 space-y-1">
          {genderOptions.map((gender) => (
            <label
              key={gender}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={filters.gender === gender}
                onChange={() => onFilterChange({ gender })}
              />{" "}
              {gender}
            </label>
          ))}
          <button
            onClick={() => onFilterChange({ gender: "" })}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            Semua
          </button>
        </div>
      </FilterSection>

      {/* ======== FILTER BRAND BARU ======== */}
      <FilterSection title="Brand">
        <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
          {brands.map((brand) => (
            <label
              key={brand.id_brand}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="brand"
                value={brand.nama}
                checked={filters.brand === brand.nama}
                onChange={() => onFilterChange({ brand: brand.nama })}
              />{" "}
              {brand.nama}
            </label>
          ))}
        </div>
        <button
          onClick={() => onFilterChange({ brand: "" })}
          className="text-sm text-blue-600 hover:underline mt-1"
        >
          Semua
        </button>
      </FilterSection>

      <div className="flex-grow"></div>
      <div className="mt-auto">
        <a
          href="/productlistpage"
          className="flex items-center gap-2 font-semibold hover:underline"
        >
          <ChevronLeft size={20} />
          Semua
        </a>
      </div>
    </aside>
  );
}
