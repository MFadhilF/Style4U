import React, { useRef } from "react";
import { Heart } from "lucide-react";

const API_BASE_URL = "http://localhost:3001";

export default function ProductScroller({ products, onActionClick }) {
  const scroller = useRef(null);

  const scroll = (distance) => {
    if (scroller.current) {
      scroller.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  const handleAction = (event) => {
    if (event) event.stopPropagation();
    onActionClick();
  };

  if (!products || products.length === 0) {
    return <div className="text-center py-10">Memuat produk...</div>;
  }

  return (
    <div className="relative max-w-full sm:max-w-6xl mx-auto py-8 px-0 sm:px-4">
      <button
        onClick={() => scroll(-250)}
        className="absolute left-1 sm:-left-4 md:-left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow-lg text-xl sm:text-2xl font-bold flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:bg-gray-100 transition-colors"
        aria-label="Scroll left"
      >
        ‹
      </button>
      <button
        onClick={() => scroll(250)}
        className="absolute right-1 sm:-right-4 md:-right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow-lg text-xl sm:text-2xl font-bold flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:bg-gray-100 transition-colors"
        aria-label="Scroll right"
      >
        ›
      </button>

      <div
        ref={scroller}
        className="overflow-x-auto hide-scrollbar scroll-smooth px-4 sm:px-8 md:px-10"
      >
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 py-2">
          {products.map((p) => (
            <div
              key={p.id_produk}
              onClick={handleAction}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAction();
                }
              }}
              aria-label={`Lihat detail untuk ${p.nama}`}
              className="relative group flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 bg-white rounded-lg shadow-lg hover:shadow-xl p-3 sm:p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out cursor-pointer"
            >
              <div className="relative bg-gray-100 rounded-md p-2 sm:p-3 mb-2 sm:mb-3 aspect-square flex items-center justify-center">
                <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[9px] sm:text-[10px] uppercase text-gray-500 z-20 font-sans">
                  {p.brand_name}
                </span>

                <img
                  src={`${API_BASE_URL}/uploads/${p.image_url}`}
                  alt={p.nama}
                  className="max-w-full max-h-full object-contain rounded group-hover:scale-105 transition-transform duration-200"
                />

                <button
                  onClick={handleAction}
                  className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 p-1 sm:p-1.5 rounded-full transition-colors"
                  aria-label={`Tambah ${p.nama} ke favorit`}
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 fill-none" />
                </button>
              </div>

              <div className="mt-2 sm:mt-3">
                <div className="flex items-baseline mb-1">
                  <h3
                    className="font-semibold font-playfair text-sm sm:text-base md:text-md truncate mr-2"
                    title={p.nama}
                  >
                    {p.nama}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-playfair flex-shrink-0 whitespace-nowrap">
                    {p.gender}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm font-playfair mt-1">
                  <span className="font-semibold text-gray-800">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(p.harga)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-semibold">
                    {p.nama_grade}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
