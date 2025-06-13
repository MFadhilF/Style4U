// components/pages/product/detail/deskripsi-detail.jsx (VERSI FINAL)

import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

// Data untuk FAQ, bisa Anda pindahkan ke file lain jika perlu
const faqData = [
  {
    id: "q1",
    question: "Apa itu Mystery Box?",
    answer:
      "Mystery Box adalah paket kejutan berisi item-item fashion pilihan yang dikurasi oleh tim kami sesuai dengan gaya yang Anda pilih. Anda tidak tahu persis isinya sampai paketnya tiba!",
  },
  {
    id: "q2",
    question: "Apakah ukuran bisa disesuaikan?",
    answer:
      "Ukuran akan tersedia saat Anda mengklik pakaian untuk detail lebih lanjut. Jika tidak terdapat ukuran yang Anda inginkan di sebuah produk, maka Anda bisa memilih ukuran lain atau membeli produk lain dari rekomendasi kami.",
  },
  {
    id: "q3",
    question: "Apakah bisa memilih isi Mystery Box?",
    answer:
      "Tidak, kejutannya adalah bagian dari keseruannya! Anda hanya memilih gaya (style) dan ukuran, sisanya biarkan kami yang memilihkan item terbaik untuk Anda.",
  },
  {
    id: "q4",
    question: "Apakah bisa tukar barang jika tidak cocok?",
    answer:
      "Karena sifatnya yang preloved dan untuk menjaga keberlanjutan, semua penjualan bersifat final dan tidak bisa ditukar atau dikembalikan kecuali jika ada kerusakan yang signifikan dan tidak disebutkan.",
  },
  {
    id: "q5",
    question: "Apakah pakaian masih layak pakai?",
    answer:
      "Tentu saja! Semua pakaian telah melewati proses kurasi dan quality control yang ketat untuk memastikan kondisinya masih sangat baik dan layak pakai. Kami menyebutnya 'pakaian kehidupan kedua'.",
  },
  {
    id: "q6",
    question: "Berapa lama pengiriman?",
    answer:
      "Kami mengirimkan dalam 1-2 hari kerja setelah pembayaran dikonfirmasi. Estimasi waktu tiba tergantung pada lokasi dan layanan kurir yang Anda pilih saat checkout.",
  },
  {
    id: "q7",
    question: "Berapa banyak item Mystery Box?",
    answer:
      "Jumlah item tergantung pada paket Mystery Box yang Anda pilih. Opsi ini akan tersedia di halaman Mystery Box, biasanya antara 1 hingga 3 item berkualitas.",
  },
  {
    id: "q8",
    question: "Apakah bisa dikirim di seluruh Indonesia?",
    answer:
      "Ya, kami mendukung pengiriman ke seluruh wilayah di Indonesia melalui berbagai partner logistik terpercaya kami.",
  },
];

// Komponen kecil untuk setiap item FAQ
const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div
      className="bg-blue-100 rounded-lg p-4 cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{item.question}</h3>
        {isOpen ? (
          <MinusIcon className="h-5 w-5 text-blue-700" />
        ) : (
          <PlusIcon className="h-5 w-5 text-blue-700" />
        )}
      </div>
      {/* Tampilkan jawaban jika 'isOpen' adalah true */}
      {isOpen && <p className="mt-3 text-gray-600 pr-6">{item.answer}</p>}
    </div>
  );
};

// Komponen Utama
const DeskripsiDetail = ({ product }) => {
  const [activeTab, setActiveTab] = useState("pertanyaan"); // Default ke 'pertanyaan' untuk pratinjau

  // State untuk melacak FAQ mana yang sedang terbuka
  const [openFaqId, setOpenFaqId] = useState("q2"); // Default item yang terbuka sesuai gambar

  const handleFaqToggle = (id) => {
    // Jika ID yang diklik sama dengan yang sudah terbuka, tutup. Jika tidak, buka yang baru.
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="p-6 bg-white w-full h-full mx-auto font-poppins">
      <div className="flex border-b mb-6 justify-center gap-8">
        <button
          className={`px-4 py-2 text-lg md:text-[24px] font-semibold transition-colors ${
            activeTab === "deskripsi"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-black"
          }`}
          onClick={() => setActiveTab("deskripsi")}
        >
          Deskripsi
        </button>
        <button
          className={`px-4 py-2 text-lg md:text-[24px] font-semibold transition-colors ${
            activeTab === "pertanyaan"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-black"
          }`}
          onClick={() => setActiveTab("pertanyaan")}
        >
          Pertanyaan
        </button>
      </div>

      {activeTab === "deskripsi" && (
        <div className="text-[14px] space-y-4">
          <p>
            {product?.deskripsi || "Deskripsi untuk produk ini belum tersedia."}
          </p>
          <p className="mt-4">
            <span className="font-semibold">Gender :</span>{" "}
            {product?.gender || "N/A"}
          </p>
        </div>
      )}

      {activeTab === "pertanyaan" && (
        <div>
          <h2 className="text-xl font-bold text-center mb-6">
            Pertanyaan yang sering diajukan
          </h2>
          {/* Layout grid untuk FAQ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqData.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openFaqId === item.id}
                onClick={() => handleFaqToggle(item.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeskripsiDetail;
