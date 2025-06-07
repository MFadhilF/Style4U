import React from "react";
import kaosImg from "../../../assets/testing-detail.png"; // gambar kaos
import bintangBg from "../../../assets/star-bg.png"; // gambar background bintang biru

export default function Detail() {
  return (
    <div className="flex justify-center items-center px-6 py-8">
      <div className="flex w-[1200px] h-[502px] bg-[#DCE7FF] rounded-lg overflow-hidden">
        {/* Bagian kiri (gambar) */}
        <div className="relative w-[520px] right-2 flex-shrink-0 flex items-center justify-center">
          <img
            src={bintangBg}
            alt="bg"
            className="absolute w-[500px] h-auto object-contain"
          />
          <img
            src={kaosImg}
            alt="kaos"
            className="relative z-10 w-[270px] h-auto object-contain"
          />
        </div>

        {/* Bagian kanan (konten) */}
        <div className="flex flex-col justify-between p-8 flex-1">
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">🤍</span> Lihat Fav &gt;
            </div>
          </div>
          <div>
            <h1 className="text-[50px] font-poppins font-medium leading-tight">
              Kaos Grafis Retro
            </h1>
            <p className="mt-2 text-sm text-black-600 font-bold">Vintage</p>
            <div className="flex gap-4 mt-4 mb-2">
              <button className="bg-blue-600 text-white px-4 py-1 rounded shadow">
                S
              </button>
              <button className="bg-white px-4 py-1 rounded shadow-lg">M</button>
              <button className="bg-white px-4 py-1 rounded shadow-lg">XL</button>
            </div>
            <p className="text-sm text-black-700 mt-2 mb-4">
              Pilihan terbaik untuk teman nongkrong kamu
            </p>
            <p className="text-2xl font-bold mb-6">Rp 25.000.00</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-full px-4 py-1">
              <button className="px-1">-</button>
              <span className="mx-2">2</span>
              <button className="px-1">+</button>
            </div>
            <button className="bg-yellow-400 text-black rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2">
              🛒 Tambahkan ke Keranjang
            </button>
            <button className="bg-purple-500 text-white rounded-full px-4 py-2 text-sm font-semibold">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
