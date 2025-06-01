import React from "react";

const Dashboard = () => {
  const pesananData = [
    {
      id: 1,
      nama: "Renda Maharani",
      produk: "Jaket Casual Merah Uniqlo",
      tanggal: "12-4-2025",
      status: "Pesanan Diterima",
    },
    {
      id: 2,
      nama: "Betty Sentosa",
      produk: "Kemeja Hitam Gen Game",
      tanggal: "03-5-2025",
      status: "Pesanan Diterima",
    },
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

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#f3d8bd] text-[#6e3f1c] rounded-lg p-4 shadow-md">
          <p className="text-sm">Penghasilan Bulan Ini</p>
          <h2 className="text-2xl font-semibold mt-2">Rp 2.000.000</h2>
        </div>
        <div className="bg-[#a1673f] text-white rounded-lg p-4 shadow-md">
          <p className="text-sm">Jumlah Pesanan Bulan Ini</p>
          <h2 className="text-2xl font-semibold mt-2">
            {pesananData.length} Pesanan
          </h2>
        </div>
        <div className="bg-[#f3d8bd] text-[#6e3f1c] rounded-lg p-4 shadow-md">
          <p className="text-sm">Jumlah Produk Tersedia</p>
          <h2 className="text-2xl font-semibold mt-2">200 Produk</h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-[#6e3f1c] text-white">
            <tr>
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Nama Pembeli</th>
              <th className="py-2 px-4">Pesanan</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Detail Pesanan</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {pesananData.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4 border border-[#B08968]">{index + 1}</td>
                <td className="py-2 px-4 border border-[#B08968]">{item.nama}</td>
                <td className="py-2 px-4 border border-[#B08968]">{item.produk}</td>
                <td className="py-2 px-4 border border-[#B08968]">{item.tanggal}</td>
                <td className="py-2 px-4 border border-[#B08968] text-center">
                  <button className="bg-blue-500 w-[auto] h-[40px] hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px] font-bold ">
                    Selengkapnya
                  </button>
                </td>
                <td className="py-2 px-4 border border-[#B08968] text-center">
                  <span className="bg-green-500 w-[auto] h-[40px] hover:bg-green-600 text-white px-3 py-1 rounded text-[14px] font-bold">
                    {item.status}
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

export default Dashboard;
