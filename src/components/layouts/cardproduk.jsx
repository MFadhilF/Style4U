import React, { useState } from "react";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom'; 

const CardProduk = ({ produk, onToggleFavorite }) => {

  const [liked, setLiked] = useState(produk.isFavorite || false); 

  const handleToggleLike = (e) => {
    e.preventDefault(); 
    
    const newLikedState = !liked;
    setLiked(newLikedState);
    if (onToggleFavorite) {
      onToggleFavorite(produk.id, newLikedState);
    }
  };

  const productDetailPath = `/produk/${produk.id}`; 

  return (
    <Link
      to={productDetailPath}
      className="
        relative flex flex-col h-full 
        w-40 sm:w-48 md:w-56 lg:w-64
        bg-white rounded-lg shadow-lg hover:shadow-xl 
        p-3 sm:p-4
        overflow-hidden transition-shadow duration-300 cursor-pointer group text-left
      "
      aria-label={`Lihat detail untuk ${produk.nama}`}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full flex-shrink-0 bg-gray-100 overflow-hidden rounded-md group aspect-square flex items-center justify-center mb-2 sm:mb-3 p-2 sm:p-3">
        <img
          src={produk.gambar}
          alt={produk.nama}
          className="max-w-full max-h-full object-contain rounded group-hover:scale-105 transition-transform duration-200"
        />
        {/* BRAND */}
        <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[10px] sm:text-xs uppercase text-gray-600 z-10 font-playfair">
          {produk.brand}
        </span>
        
        {/* FAVORITE BUTTON */}
        <button
          onClick={handleToggleLike}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 p-1 sm:p-1.5 rounded-full hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          aria-pressed={liked}
          aria-label={liked ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          {liked ? (
            <HeartSolid className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          ) : (
            <HeartOutline className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 fill-none hover:text-red-400" />
          )}
        </button>
      </div>
      
      {/* INFO */}
      <div className="mt-2 sm:mt-3"> 
        <div className="flex items-baseline">
          <h3 className="font-playfair text-sm sm:text-base font-semibold text-gray-800 truncate transition-colors" title={produk.nama}>
            {produk.nama}
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-500 font-playfair flex-shrink-0 ml-2">{produk.kategori}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-md sm:text-md mt-1 font-playfair">
          <span className="font-semibold text-gray-800">
            {produk.harga}
          </span>
          <span className="text-[14px] sm:text-xs text-gray-600 font-playfair mt-0.5 sm:mt-0">
            {produk.grade}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardProduk;