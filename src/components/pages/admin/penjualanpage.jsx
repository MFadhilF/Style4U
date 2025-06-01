import React from "react";

const Penjualan = () => {
  // Data dummy Penjualan
  const PenjualanList = [
    {
      id: 1,
      nama: "Renda Maharani",
      pesanan: "Celana Vintage Bintang",
      jumlah: "1",
      tanggal: "12-04-2025",
      status: "Pesanan Diterima",
    },

      {
      id: 1,
      nama: "Beny Sentosa",
      pesanan: "Kemeja Hitam Gem Game",
      jumlah: "1",
      tanggal: "03-05-2025",
      status: "Pesanan Diterima",
    },
    // Tambahkan Penjualan lain di sini jika perlu
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

      {/* Tabel Penjualan */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border border-[#B08968] border-collapse">
          <thead className="bg-[#6e3f1c] text-white text-center divide-x">
            <tr>
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Nama Pembeli</th>
              <th className="py-2 px-4">Pesanan</th>
              <th className="py-2 px-4">Jumlah</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Detail Pesanan</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {PenjualanList.map((Penjualan, index) => (
              <tr key={Penjualan.id} className="border-t border border-[#B08968]">
                <td className="py-2 px-4 text-center border border-[#B08968]">{index + 1}</td>
                <td className="py-2 px-4 text-center border border-[#B08968]">{Penjualan.nama}</td>
                <td className="py-2 px-4 text-center border border-[#B08968]">{Penjualan.pesanan}</td>
                <td className="py-2 px-4 text-center border border-[#B08968]">{Penjualan.jumlah}</td>
                <td className="py-2 px-4 text-center border border-[#B08968]">{Penjualan.tanggal}</td>
                <td className="py-2 px-4 flex flex-wrap gap-2 justify-center ">
                    <td className="py-2 px-4 flex gap-2 justify-center ">
                  <button className="bg-blue-500 w-[auto] h-[40px] hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px] font-bold">
                    Selengkapnya
                  </button>
                    </td>
                </td>
                <td className="py-2 px-4 text-center  border border-[#B08968]">
                  <span className="bg-green-500 w-[auto] h-[40px] hover:bg-green-600 text-white px-3 py-1 rounded text-[14px] font-bold">
                    {Penjualan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Penjualan;
