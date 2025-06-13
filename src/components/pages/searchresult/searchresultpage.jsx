// searchresultpage.jsx (Versi Final dengan Kategori Dinamis)

import React from "react";
import ProductCard from "../catalog/productcard.jsx";
import { Search } from "lucide-react";

const CategoryButton = ({ label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${
      active
        ? "bg-yellow-400 text-black"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`}
  >
    {label}
  </button>
);

export default function SearchResultPage({
  products,
  categories, // Terima prop categories
  loading,
  error,
  filters,
  onFilterChange,
  onToggleFavorite,
}) {
  const handleFilterUpdate = (update) => {
    onFilterChange(update);
  };

  return (
    <main className="flex-1 p-8 bg-gray-50 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-md">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Gali Gaya dari hasil ini..."
              value={filters.search}
              onChange={(e) => handleFilterUpdate({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </form>
        </div>
      </header>

      {/* ======== Tombol Kategori Sekarang Dinamis ======== */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <CategoryButton
          label="Semua"
          active={!filters.category}
          onClick={() => handleFilterUpdate({ category: "" })}
        />
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            label={cat.name}
            active={filters.category === cat.name}
            onClick={() => handleFilterUpdate({ category: cat.name })}
          />
        ))}
      </div>

      {/* Tampilan Kondisional untuk Data */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Memuat produk...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            Tidak ada produk yang ditemukan dengan filter ini.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            // PERBAIKAN KECIL: Gunakan product.id yang sudah diterjemahkan sebagai key
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
