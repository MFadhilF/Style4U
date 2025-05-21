// src/components/ProductCard.jsx
import React from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, onToggleFavorite }) {
  return (
    <div className="
        relative flex flex-col h-full w-64
        bg-white rounded-lg shadow-xl p-4
        overflow-hidden hover:shadow-md transition-shadow
      ">
      {/* BRAND */}
      <span className="absolute top-2 left-2 text-xs uppercase text-gray-500">
        {product.brand}
      </span>

      {/* FAVORITE BUTTON */}
      <button
        onClick={() => onToggleFavorite(product.id)}
        className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow hover:bg-red-50 focus:outline-none"
      >
        <Heart
          className={`w-5 h-5 ${
            product.isFavorite ? 'text-red-500' : 'text-gray-300'
          } transition-colors`}
        />
      </button>

      {/* IMAGE */}
      <div className="w-full flex-shrink-0 bg-gray-100 overflow-hidden rounded">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* INFO: dorong ke bawah */}
      <div className="mt-4">
        {/* Nama & Gender */}
        <div className="flex justify-between items-baseline">
          <h3 className="font-playfair text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <span className="text-sm text-gray-500 font-playfair">{product.gender}</span>
        </div>

        {/* Harga & Grade */}
        <div className="flex justify-between items-center mt-1">
          <span className="text-base font-semibold text-gray-800 font-playfair">
            Rp {product.price}
          </span>
          <span className="text-xs text-gray-400 font-playfair">
            Grade {product.grade}
          </span>
        </div>
      </div>
    </div>
  );
}
