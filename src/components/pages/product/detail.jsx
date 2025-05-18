import React from "react";
import { Heart, Eye, ShoppingCart } from "lucide-react";

export default function Detail() {
  return (
    <div className="px-6 py-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image + button */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="relative border-4 border-blue-500 rounded-xl p-4">
            <img
              src="https://via.placeholder.com/300x400"
              alt="Produk"
              className="w-full h-auto"
            />
            <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button className="flex items-center gap-2 mt-2 text-blue-600 font-medium">
            <Eye className="w-4 h-4" /> Lihat Foto Lain
          </button>
        </div>

        {/* Right: Detail Produk */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-semibold">Kaos Grafis Retro</h1>
          <span className="text-sm text-gray-500">Vintage</span>

          {/* Size selector */}
          <div className="mt-4 flex gap-2">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Info */}
          <p className="text-sm text-gray-600 mt-2">
            Pilihan terbaik untuk teman nongkrong kamu.
          </p>

          {/* Harga */}
          <div className="mt-4">
            <p className="text-lg font-bold text-gray-800">Rp 25.000,00</p>
            <div className="mt-1">
              <span className="bg-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">
                Stok Tersedia
              </span>
              <span className="ml-2 bg-purple-300 px-2 py-1 rounded-full text-xs font-semibold">
                Kualitas Premium
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b">
        <div className="flex gap-6">
          <button className="pb-2 border-b-2 border-blue-500 font-medium">
            Deskripsi
          </button>
          <button className="pb-2 text-gray-500">Pertanyaan</button>
        </div>
      </div>

      {/* Deskripsi Konten */}
      <div className="mt-4 text-sm text-gray-700">
        <p>
          <strong>Bahan:</strong> Loose fit
        </p>
        <p>
          <strong>Model:</strong> Kaos
        </p>
        <p>
          <strong>Tahun Pembuatan:</strong> 2023
        </p>
        <p className="mt-2">
          Kaos lengan pendek Unisex dengan potongan loose fit nyaman digunakan
          untuk kegiatan sehari-hari. Didesain dengan elemen bermotif
          kotak-kotak (gingham), menambah sentuhan modis pada penampilan
          santaimu. Cocok dipadukan dengan celana jeans, rok, atau celana
          berbahan untuk tampilan casual hingga semi-formal.
        </p>
      </div>

      {/* Rekomendasi Produk */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Rekomendasi Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="border rounded-lg p-2">
              <div className="relative">
                <img
                  src="https://via.placeholder.com/150"
                  alt="produk rekomendasi"
                  className="w-full h-auto"
                />
                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <p className="mt-2 text-sm font-medium">Produk {i + 1}</p>
              <p className="text-sm text-gray-500">Rp 25.000</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Feature Icons */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <img src="/wash.svg" alt="wash" className="mx-auto mb-2" />
          <p className="font-medium text-sm">WASH BEFORE WEAR</p>
        </div>
        <div>
          <img
            src="/shipping.svg"
            alt="fast shipping"
            className="mx-auto mb-2"
          />
          <p className="font-medium text-sm">FAST SHIPPING</p>
        </div>
        <div>
          <img src="/eco.svg" alt="eco" className="mx-auto mb-2" />
          <p className="font-medium text-sm">SHOP SUSTAINABLY</p>
        </div>
      </div>
    </div>
  );
}
