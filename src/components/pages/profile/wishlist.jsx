// src/components/WishlistPage.jsx
import React from "react";
import CardProduk from "../../layouts/cardproduk.jsx";
import denimrobek from "../../assets/denimrobek.png";
import jeanslukis from "../../assets/jeanslukis.png";
import jaketkulit from "../../assets/jaketkulit.png";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const cardProduk = [
  {
    id: 1,
    brand: "UNIQLO",
    nama: "Denim Robek",
    kategori: "Man",
    harga: "Rp 95.000",
    grade: "Grade A",
    gambar: denimrobek,
  },
  {
    id: 2,
    brand: "H&M",
    nama: "Jeans Lukis",
    kategori: "Man",
    harga: "Rp 80.000",
    grade: "Grade A",
    gambar: jeanslukis,
  },
  {
    id: 3,
    brand: "UNIQLO",
    nama: "Jaket Kulit",
    kategori: "Man",
    harga: "Rp 125.000",
    grade: "Grade A",
    gambar: jaketkulit,
  },
];

const WishlistPage = () => {
  return (
    <div className="px-10 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeftIcon className="w-5 h-5" />
        <h1 className="text-lg font-bold">Wishlist Anda</h1>
      </div>
      <div className="flex gap-6 flex-wrap">
        {cardProduk.map((produk) => (
          <CardProduk key={produk.id} produk={produk} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
