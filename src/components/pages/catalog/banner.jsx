// src/components/Banner.jsx
import React from "react";
import Banner1 from "../../assets/Banner1.png";
import { useNavigate } from "react-router-dom";
export default function Banner() {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full h-[500px]
        bg-cover bg-center
        rounded-xl
        relative overflow-hidden mb-8
      "
      style={{ backgroundImage: `url(${Banner1})` }}
    >
      {/* overlay tipis */}
      <div className="absolute inset-0 bg-black/10" />

      {/* konten teks */}
      <div className="relative z-10 flex h-full px-8 py-6">
        {/* 1. Kolom teks kiri */}
        <div className="w-1/2 text-Black">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Dapatkan 5 MYSTERY BOX
            <br />
            Dengan DISKON 5%
          </h2>
          <p
            className="mt-2 text-sm md:text-base overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            Bingung belanja apa? Kami mengirimkan mystery box agar kamu bisa
            memilih pakaian apa yang membuat kamu percaya diri. Coba sekarang
            tuk dapatkan diskon!{" "}
            <span className="font-bold">HANYA BULAN INI!!</span>
          </p>
        </div>

        {/* 2. Spacer flex agar teks dan tombol terpisah */}
        <div className="flex-1" />

        {/* 3. Tombol Info Lanjut di pojok kanan bawah */}
        <div className="flex flex-col justify-end">
          <a
            className="text-sm font-medium text-black hover:underline"
            onClick={() => navigate("/lebihlanjut")}
          >
            Info Lanjut →
          </a>
        </div>
      </div>
    </div>
  );
}
