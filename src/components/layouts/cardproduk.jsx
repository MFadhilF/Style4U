// src/components/CardProduk.jsx
import React, { useState } from "react";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

const CardProduk = ({ produk }) => {
  const [liked, setLiked] = useState(true); // karena wishlist, default true
  const toggleLike = () => setLiked(!liked);

  return (
    <div className="w-[220px] rounded-xl border p-3 flex flex-col items-center shadow-md hover:shadow-xl transition">
      <div className="relative w-full h-[200px] bg-gray-100 rounded-md">
        <img
          src={produk.gambar}
          alt={produk.nama}
          className="w-full h-full object-contain rounded-md"
        />
        <div className="absolute top-2 right-2">
          <button onClick={toggleLike}>
            {liked ? (
              <HeartSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartOutline className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
        <div className="absolute top-2 left-2">
          <p className="text-[11px] font-playfair">{produk.brand}</p>
        </div>
      </div>
      <div className="mt-2 text-start w-full">
        <h3 className="font-playfair font-bold text-sm">
          {produk.nama}{" "}
          <span className="text-[11px] font-normal">{produk.kategori}</span>
        </h3>
        <div className="flex flex-row justify-between text-[13px] mt-1">
          <p>{produk.harga}</p>
          <p className="text-right">{produk.grade}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProduk;
