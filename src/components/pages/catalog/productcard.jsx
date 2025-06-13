// src/components/ProductCard.jsx
import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function ProductCard({ product, onToggleFavorite }) {
  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleFavoriteKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      onToggleFavorite(product.id);
    }
  };

  const productDetailPath = `/produk/${product.id}`;

  return (
    <Link
      to={productDetailPath}
      className="
        relative flex flex-col h-full 
        w-40 sm:w-48 md:w-56 lg:w-64
        bg-white rounded-lg shadow-lg hover:shadow-xl 
        p-3 sm:p-4
        overflow-hidden transition-shadow cursor-pointer group text-left
      "
      aria-label={`Lihat detail untuk ${product.name}`}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full flex-shrink-0 bg-gray-100 overflow-hidden rounded-md group aspect-square flex items-center justify-center mb-2 sm:mb-3 p-2 sm:p-3">
        <img
          src={product.img}
          alt={product.name}
          className="max-w-full max-h-full object-contain rounded group-hover:scale-105 transition-transform duration-200"
        />
        {/* BRAND */}
        <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[10px] sm:text-xs uppercase text-black-500 z-20">
          {product.brand}
        </span>

        {/* FAVORITE BUTTON */}
        <button
          onClick={handleFavoriteClick} 
          onKeyDown={handleFavoriteKeyDown} 
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 p-1 sm:p-1.5 rounded-full hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          aria-pressed={product.isFavorite}
          aria-label={
            product.isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"
          }
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-150 ease-in-out ${
              product.isFavorite
                ? "text-red-500 fill-red-500"
                : "text-gray-500 fill-none hover:text-red-400"
            }`}
          />
        </button>
      </div>

      {/* INFO */}
      <div className="mt-2 sm:mt-3">
        <div className="flex items-baseline">
          <h3
            className="font-playfair text-sm sm:text-base font-semibold text-gray-800 truncate"
            title={product.name}
          >
            {product.name}
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-500 font-playfair flex-shrink-0 ml-2">
            {product.gender}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-md sm:text-md mt-1 font-playfair">
          <span className="font-semibold text-gray-800">
            Rp {product.price}
          </span>
          <span className="text-[14px] sm:text-xs text-black-400 font-playfair mt-0.5 sm:mt-0">
            Grade {product.grade}
          </span>
        </div>
      </div>
    </Link>
  );
}
