import React from "react";
import Banner1 from "../../assets/Banner1.png";
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
      <div className="absolute inset-0 bg-black/20" />

      {/* konten teks */}
      <div className="relative z-10 flex flex-col sm:flex-row h-full p-4 sm:p-6 md:p-8">
        <div className="w-full sm:w-3/5 md:w-1/2 text-black flex flex-col justify-center sm:justify-start">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight sm:leading-snug">
            Dapatkan 5 MYSTERY BOX
            <br className="hidden sm:block" />
            Dengan DISKON 5%
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base max-w-md">
            Bingung belanja apa? Kami mengirimkan mystery box agar kamu bisa
            memilih pakaian apa yang membuat kamu percaya diri. Coba sekarang
            tuk dapatkan diskon!{" "}
            <span className="font-bold block mt-1 sm:inline sm:mt-0">
              HANYA BULAN INI!!
            </span>
          </p>
        </div>

        <div className="hidden sm:block flex-1" />

        <div className="mt-6 sm:mt-0 flex flex-col justify-start sm:justify-end items-start sm:items-end">
          <button
            className="text-xs sm:text-sm font-medium text-black hover:underline bg-black/30 hover:bg-black/50 px-4 py-2 rounded-md transition-colors"
            onClick={() => navigate("/lebihlanjut")}
          >
            Info Lanjut →
          </button>
        </div>
      </div>
    </div>
  );
}
