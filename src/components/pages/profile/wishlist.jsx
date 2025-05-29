// src/components/WishlistPage.jsx
import React from "react";
import CardProduk from "../../layouts/cardproduk.jsx"; // Pastikan path ini benar
import denimrobek from "../../assets/denimrobek.png";
import jeanslukis from "../../assets/jeanslukis.png";
import jaketkulit from "../../assets/jaketkulit.png";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const cardProdukData = [ // Mengganti nama variabel agar tidak bentrok jika ada komponen bernama sama
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
  // Perkirakan lebar sidebar Anda.
  // Contoh: jika sidebar Anda sekitar 250px, Anda bisa menggunakan ml-[250px] atau kelas Tailwind yang sesuai.
  // umum: w-48 (192px), w-56 (224px), w-60 (240px), w-64 (256px).
  // Dari gambar, sidebar Anda terlihat cukup lebar, mungkin sekitar 'w-60' atau 'w-64' (240px - 256px).
  // Mari kita gunakan nilai arbitrer [260px] sebagai contoh. Sesuaikan dengan lebar sidebar Anda.
  const sidebarWidthClass = "ml-[260px]"; // Ganti nilai ini sesuai kebutuhan

  return (
    // 1. Hapus `mx-auto` jika konten tidak dimaksudkan untuk lebih sempit dari area yang tersedia.
    // 2. Tambahkan `margin-left` yang sesuai dengan lebar sidebar.
    // 3. `px-10` bisa dipertahankan untuk padding internal, dan tambahkan `py-10` untuk padding vertikal.
    <div className={`px-10 py-10 ${sidebarWidthClass}`}>
      <div className="flex items-center gap-2 mb-6"> {/* Beri sedikit lebih banyak margin bawah */}
        <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
        <h1 className="text-xl font-bold">Wishlist Anda</h1> {/* Sedikit perbesar judul */}
      </div>
      <div className="flex gap-6 flex-wrap">
        {cardProdukData.map((produk) => (
          <CardProduk key={produk.id} produk={produk} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;