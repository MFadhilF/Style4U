// src/components/Banner.jsx
import React from "react";
import Banner1 from "../../assets/Banner1.png"; // Pastikan path ini benar
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full 
        h-[60vh] sm:h-[70vh] md:h-[500px] {/* Tinggi responsif: 60% viewport height di mobile, 70% di sm, 500px di md ke atas */}
        bg-cover bg-center
        rounded-xl
        relative overflow-hidden mb-8
      "
      style={{ backgroundImage: `url(${Banner1})` }}
    >
      {/* overlay tipis */}
      <div className="absolute inset-0 bg-black/20" /> {/* Sedikit pertebal overlay untuk kontras teks */}

      {/* konten teks */}
      {/* Menggunakan flex-col di mobile, dan flex-row di sm ke atas */}
      <div className="relative z-10 flex flex-col sm:flex-row h-full p-4 sm:p-6 md:p-8"> {/* Padding responsif */}
        
        {/* 1. Kolom teks: full width di mobile, lalu menyesuaikan di layar lebih besar */}
        <div className="w-full sm:w-3/5 md:w-1/2 text-black flex flex-col justify-center sm:justify-start"> {/* text-white agar kontras dengan overlay gelap, atau sesuaikan */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight sm:leading-snug"> {/* Ukuran font & leading responsif */}
            Dapatkan 5 MYSTERY BOX
            <br className="hidden sm:block" /> {/* <br> hanya untuk layar sm ke atas agar tidak memaksa baris baru di mobile */}
            Dengan DISKON 5%
          </h2>
          {/* Deskripsi teks: WebkitLineClamp mungkin tidak ideal untuk semua kasus, pertimbangkan panjang teks atau cara lain untuk menampilkannya */}
          <p
            className="mt-2 text-xs sm:text-sm md:text-base max-w-md" // max-w-md agar tidak terlalu lebar di desktop
            // style={{ // Hapus WebkitLineClamp jika ingin teks mengalir lebih alami atau kelola dengan JS jika perlu
            //   display: "-webkit-box",
            //   WebkitLineClamp: 3, 
            //   WebkitBoxOrient: "vertical",
            //   overflow: "hidden", // Tambahkan overflow hidden jika menggunakan line clamp
            // }}
          >
            Bingung belanja apa? Kami mengirimkan mystery box agar kamu bisa
            memilih pakaian apa yang membuat kamu percaya diri. Coba sekarang
            tuk dapatkan diskon!{" "}
            <span className="font-bold block mt-1 sm:inline sm:mt-0"> {/* block di mobile agar di baris baru, inline di sm */}
              HANYA BULAN INI!!
            </span>
          </p>
        </div>

        {/* 2. Spacer: hanya aktif di sm ke atas saat layoutnya row */}
        <div className="hidden sm:block flex-1" />

        {/* 3. Tombol Info Lanjut: di bawah teks di mobile, di pojok kanan bawah di sm ke atas */}
        <div className="mt-6 sm:mt-0 flex flex-col justify-start sm:justify-end items-start sm:items-end"> {/* item-start di mobile */}
          <button // Mengubah <a> menjadi <button> jika ini adalah aksi, atau tetap <a> jika link
            className="text-xs sm:text-sm font-medium text-black hover:underline bg-black/30 hover:bg-black/50 px-4 py-2 rounded-md transition-colors" // text-white, sedikit background pada tombol
            onClick={() => navigate("/lebihlanjut")}
          >
            Info Lanjut →
          </button>
        </div>
      </div>
    </div>
  );
}