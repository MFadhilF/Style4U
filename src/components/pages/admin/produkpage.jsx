import React from "react";
import { Plus } from "lucide-react";

const Produk = () => {
  // Data dummy produk
  const produkList = [
    {
      id: 1,
      nama: "Celana Vintage Bintang",
      stok: "1 Barang",
      harga: "Rp. 60.000",
    },
    // Tambahkan produk lain di sini jika perlu
  ];

  return (
    <div className="ml-16 md:ml-56 p-6">
      {/* Header */}
      <div className="flex justify-end items-center border-b pb-4 mb-6">
        <span className="text-sm text-gray-600">
          Selamat Datang, <strong>Alif</strong>
        </span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 rounded-full ml-3"
        />
      </div>

      {/* Tombol Tambah Produk */}
      <div className="mb-4">
        <button className="flex items-center gap-2 bg-[#6e3f1c] text-white px-4 py-2 rounded shadow hover:bg-[#5b3216] text-sm">
          <Plus size={16} />
          Tambah Produk
        </button>
      </div>

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-[#6e3f1c] text-white text-center">
            <tr>
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Nama Barang</th>
              <th className="py-2 px-4">Stok</th>
              <th className="py-2 px-4">Harga</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {produkList.map((produk, index) => (
              <tr key={produk.id} className="border-t border border-[#B08968]">
                <td className="py-2 px-4 border border-[#B08968]">{index + 1}</td>
                <td className="py-2 px-4 border border-[#B08968]">{produk.nama}</td>
                <td className="py-2 px-4  text-left border border-[#B08968]">{produk.stok}</td> 
                <td className="py-2 px-4  text-left border border-[#B08968]">{produk.harga}</td>
                <td className="py-2 px-4 flex flex-wrap gap-2 justify-center ">
                  <button className="bg-green-400 w-[110px] h-[40px] hover:bg-lime-500 text-white px-3 py-1 rounded text-[14px] font-bold">
                    Edit
                  </button>
                  <button className="bg-red-500 w-[110px] h-[40px] hover:bg-red-600 text-white px-3 py-1 rounded font-bold text-[14px]">
                    Hapus
                  </button>
                  <button className="bg-blue-500 w-[110px] h-[40px] hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px] font-bold">
                    Informasi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produk;
