import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import contohdetail from "../../../assets/contohdetail.png";
import thumb1 from "../../../assets/thumb1.png";
import thumb2 from "../../../assets/thumb2.png";
import thumb3 from "../../../assets/thumb3.png";

export default function MysteryBox() {
  const [style, setStyle] = useState("Coquette");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState("3 Coquette");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Gambar kiri */}
      <div className="flex flex-col items-center">
        <img
          src={contohdetail}
          alt="Style Bundles"
          className="rounded-xl border shadow w-full max-w-md"
        />
        <div className="flex space-x-4 mt-4 justify-center items-center w-[504px] h-[163px]">
          <ChevronLeft className="cursor-pointer" />
          <div className="flex space-x-2">
            <img
              src={thumb1}
              alt="thumb1"
              className="w-full h-full rounded-3xl object-cover"
            />
            <img
              src={thumb2}
              alt="thumb2"
              className="w-full h-full rounded-3xl object-cover"
            />
            <img
              src={thumb3}
              alt="thumb3"
              className="w-full h-full rounded-3xl object-cover"
            />
          </div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </div>

      {/* Form kanan */}
      <div className="rounded-xl border-2 border-black p-6 space-y-4 shadow bg-white max-w-[654px] items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[24px] font-bold font-poppins">
            Mysteri Box, Bagaimana ini bekerja?
          </h2>
          <p className="text-[16px] font-poppins text-gray-600">
            Pilih gaya dan kategori kamu
            <br />
            Kami akan memilih barang yang trendi
            <br />
            Kamu mendapatkan pakaian kehidupan kedua
          </p>
        </div>

        {/* Style */}
        <div>
          <label className="block font-medium mb-1">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full border rounded-3xl px-3 py-2 bg-[#CAE38D] font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option value="Coquette">Coquette</option>
            <option value="Grunge">Grunge</option>
            <option value="Streetwear">Streetwear</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block font-medium mb-1">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border rounded-3xl px-3 py-2 bg-[#2F67EA] font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>

        {/* Qty */}
        <div>
          <label className="block font-medium mb-1">Qty</label>
          <select
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full border rounded-3xl px-3 py-2 bg-[#E88430] font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option value="1 Coquette">1 Coquette</option>
            <option value="2 Coquette">2 Coquette</option>
            <option value="3 Coquette">3 Coquette</option>
          </select>
        </div>

        <button className="w-full max-w-[290px] font-poppins mx-auto bg-yellow-300 hover:bg-yellow-400 text-black font-bold text-md py-2 px-4 rounded-3xl flex items-center justify-center">
          <ShoppingCart className="mr-2" /> Tambahkan ke Keranjang
        </button>

        <div>
          <details>
            <summary className="cursor-pointer font-semibold font-poppins">
              Deskripsi
            </summary>
            <p className="text-sm mt-2 text-gray-600 font-poppins">
              Pakaian pilihan dengan gaya yang kamu pilih, dikurasi secara acak.
            </p>
          </details>
          <details className="mt-2">
            <summary className="cursor-pointer font-semibold font-poppins">
              Apa yang ada di Mysteri Box?
            </summary>
            <p className="text-sm mt-2 text-gray-600 font-poppins">
              Isi bisa berupa atasan, bawahan, aksesoris, dan lainnya.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
