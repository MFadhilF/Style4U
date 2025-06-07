import React from "react";

const Penjualan = () => {
  // Data dummy Penjualan
  const PenjualanList = [
    {
      id: 1, // ID unik untuk key
      nama: "Renda Maharani",
      pesanan: "Celana Vintage Bintang",
      jumlah: "1",
      tanggal: "12-04-2025",
      status: "Pesanan Diterima",
    },
    {
      id: 2, // ID unik untuk key
      nama: "Beny Sentosa",
      pesanan: "Kemeja Hitam Gem Game",
      jumlah: "1",
      tanggal: "03-05-2025",
      status: "Pesanan Diterima",
    },
    {
      id: 3, // ID unik untuk key
      nama: "Ridhan Fadhlil",
      pesanan: "Kemeja polos",
      jumlah: "1",
      tanggal: "08-05-2025",
      status: "Ditolak",
    },
    // Tambahkan Penjualan lain di sini jika perlu
  ];

  return (
    <div className="ml-16 md:ml-56 p-6"> {/* Sesuaikan margin kiri jika sidebar Anda memiliki lebar yang berbeda */}
      {/* Header Halaman */}
      <div className="flex justify-end items-center border-b border-gray-300 pb-4 mb-6">
        <span className="text-sm text-gray-600">
          Selamat Datang, <strong>Alif</strong>
        </span>
        <img
          src="https://i.pravatar.cc/40" // Placeholder image, ganti dengan avatar user jika ada
          alt="User"
          className="w-8 h-8 rounded-full ml-3 object-cover"
        />
      </div>

      {/* Judul Halaman */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Daftar Penjualan</h1>

      {/* Tabel Penjualan */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#6e3f1c] text-white text-center">
            <tr>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider ">No</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">Nama Pembeli</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">Pesanan</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">Jumlah</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">Tanggal</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">Detail Pesanan</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {PenjualanList.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  Tidak ada data penjualan saat ini.
                </td>
              </tr>
            )}
            {PenjualanList.map((penjualanItem, index) => (
              <tr key={penjualanItem.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-3 px-4 text-center text-gray-700 border border-[#B08968]">{index + 1}</td>
                <td className="py-3 px-4 text-gray-700 border border-[#B08968]">{penjualanItem.nama}</td>
                <td className="py-3 px-4 text-gray-700 border border-[#B08968]">{penjualanItem.pesanan}</td>
                <td className="py-3 px-4 text-left text-gray-700 border border-[#B08968]">{penjualanItem.jumlah}</td>
                <td className="py-3 px-4 text-left text-gray-700 border border-[#B08968]">{penjualanItem.tanggal}</td>
                <td className="py-3 px-4 text-center border border-[#B08968]">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-4 rounded-md text-xs transition-colors duration-150 shadow-sm hover:shadow-md"
                    onClick={() => alert(`Lihat detail untuk pesanan ID: ${penjualanItem.id}`)} // Ganti dengan navigasi atau modal
                  >
                    Selengkapnya
                  </button>
                </td>
                <td className="py-3 px-4 text-center border border-[#B08968]">
                  <span
                    className={`
                      inline-block         /* Agar padding dan min-width bekerja dengan baik */
                      min-w-[120px]        /* Lebar minimum untuk konsistensi, sesuaikan jika perlu */
                      text-center          /* Teks di dalam badge ditengahkan */
                      text-white font-bold /* Mengganti font-medium ke font-bold untuk penekanan */
                      py-1.5 px-3          /* Padding vertikal dan horizontal */
                      rounded-md
                      text-xs              /* Ukuran teks */
                      shadow-sm            /* Menambah sedikit bayangan */
                      ${
                        penjualanItem.status === "Ditolak"
                          ? "bg-red-500 hover:bg-red-600"
                          : penjualanItem.status === "Pesanan Diterima"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-500 hover:bg-gray-600" // Warna default jika ada status lain
                      }
                    `}
                  >
                    {penjualanItem.status}
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