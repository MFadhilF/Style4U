import React, { useState } from "react";

const DeskripsiDetail = () => {
  const [activeTab, setActiveTab] = useState("deskripsi");

  return (
    <div className="p-6 bg-white w-full h-full mx-auto">
      <div className="flex border-b mb-4 justify-between px-20 bg-[#DCE7FF]">
        <button
          className={`px-4 py-2 text-[20px] font-poppins font-semibold ${
            activeTab === "deskripsi"
              ? "border-b-2 border-blue-700"
              : "text-black"
          }`}
          onClick={() => setActiveTab("deskripsi")}
        >
          Deskripsi
        </button>
        <button
          className={`px-4 py-2 text-[20px] font-poppins font-semibold ${
            activeTab === "pertanyaan"
              ? "border-b-2 border-blue-700"
              : "text-black"
          }`}
          onClick={() => setActiveTab("pertanyaan")}
        >
          Pertanyaan
        </button>
      </div>

      {activeTab === "deskripsi" && (
        <div className="text-[14px] font-poppins space-y-4">
          <p>
            <span className="font-semibold">Bahan :</span> Loose fit
          </p>
          <p>
            <span className="font-semibold">Model :</span> Kaos
          </p>
          <p>
            <span className="font-semibold">Tahun Pembuatan :</span> 2023
          </p>

          <h2 className="font-semibold mt-4">
            Kaos Lengan Pendek - Gingham Hemline (Warna Abu-Abu)
          </h2>

          <p>
            Kaos lengan pendek Unisex dengan potongan loose fit yang nyaman
            digunakan untuk kegiatan sehari-hari. Didesain dengan detail hemline
            bermotif kotak-kotak (gingham) yang unik, menambah sentuhan modis
            pada penampilan santaimu. Cocok dipadukan dengan celana jeans, rok,
            atau celana bahan untuk tampilan casual hingga semi-formal.
          </p>
        </div>
      )}

      {activeTab === "pertanyaan" && (
        <div className="text-sm text-gray-500 italic">
          Belum ada pertanyaan untuk produk ini.
        </div>
      )}
    </div>
  );
};

export default DeskripsiDetail;
